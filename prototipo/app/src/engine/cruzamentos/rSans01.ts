/**
 * R-SANS-01. Possíveis sinais visuais compatíveis com SANS (cenário C3). `docs/04`, parte B.
 *
 * Condições: piora confirmada da acuidade de perto contra a linha de base pessoal OU distorção nova
 * na grade de Amsler, em 2 testes seguidos, com até 14 dias entre eles (borda inclusiva: os dias 90
 * e 104 do C3 contam). Nível 2. Sobe para 3 com perda súbita de visão, visão dupla ou dor de cabeça
 * junto de visão borrada.
 */

import type { Nivel } from "../../domain/estado";
import { dataUtc, minutosEntre, paraMs } from "../../domain/tempo";
import type { Alerta, Evidencia, Leitura, Tripulante } from "../../domain/tipos";
import { ehDisponivel, selecionarLeituras } from "../leituras";
import { analisarLinhaDeBase } from "../linhaDeBase";
import { arredondar } from "../estatistica";
import {
  evidenciaDeLeitura,
  montarAlerta,
  sintomasRelatados,
  tituloDaHipotese,
  valorDaCondicao,
  type ContextoCruzamento,
} from "./comum";

export const ID_R_SANS_01 = "R-SANS-01";

interface TesteVisual {
  data: string;
  instanteUtc: string;
  sinalizados: Evidencia[];
}

export function avaliarRSans01(ctx: ContextoCruzamento, tripulante: Tripulante): Alerta | null {
  const regra = ctx.regraPorId[ID_R_SANS_01];
  const acuidade = ctx.indicadorPorId["acuidade_perto"];
  const amsler = ctx.indicadorPorId["amsler_distorcao"];
  if (!regra || !acuidade || !amsler) return null;

  const testesSeguidos = valorDaCondicao(regra, "testes_consecutivos");
  const janelaMin = regra.janelaMin ?? 14 * 24 * 60;
  const { agoraUtc } = ctx;
  const filtro = { tripulanteId: tripulante.id, agoraUtc } as const;

  const doAcuidade = selecionarLeituras(ctx.entrada.leituras, { ...filtro, indicadorId: acuidade.id }).filter(ehDisponivel);
  const doAmsler = selecionarLeituras(ctx.entrada.leituras, { ...filtro, indicadorId: amsler.id }).filter(ehDisponivel);

  // Piora confirmada: valor acima da linha de base pessoal (logMAR maior é pior), com |z| de zAmarelo ou mais.
  const parametrosBase = acuidade.regraCor.linhaDeBase;
  const pioraPorLeitura = new Map<string, number>();
  if (parametrosBase) {
    const analise = analisarLinhaDeBase(doAcuidade, {
      minimo: parametrosBase.minimoLeiturasValidas,
      zAmarelo: parametrosBase.zAmarelo,
      direcao: "acima",
    });
    for (const ponto of analise.pontos) {
      if (ponto.base && ponto.z !== undefined && ponto.z >= parametrosBase.zAmarelo) {
        pioraPorLeitura.set(ponto.leitura.id, ponto.leitura.valor - ponto.base.media);
      }
    }
  }

  const testes = new Map<string, TesteVisual>();
  const registrar = (leitura: Leitura, evidencia: Evidencia | undefined): void => {
    const data = dataUtc(leitura.instanteUtc);
    const teste = testes.get(data) ?? { data, instanteUtc: leitura.instanteUtc, sinalizados: [] };
    if (paraMs(leitura.instanteUtc) > paraMs(teste.instanteUtc)) teste.instanteUtc = leitura.instanteUtc;
    if (evidencia) teste.sinalizados.push(evidencia);
    testes.set(data, teste);
  };
  for (const l of doAcuidade) {
    const piora = pioraPorLeitura.get(l.id);
    registrar(
      l,
      piora === undefined ? undefined : evidenciaDeLeitura(l, "mudanca_vs_linha de base", arredondar(piora, 2), l.unidade, 2),
    );
  }
  for (const l of doAmsler) {
    registrar(l, l.valor > 0 ? evidenciaDeLeitura(l, "distorcao_nova", "relatada", "resposta por olho", 2) : undefined);
  }

  const ordenados = [...testes.values()].sort((a, b) => paraMs(a.instanteUtc) - paraMs(b.instanteUtc));
  const ultimos = ordenados.slice(-testesSeguidos);
  if (ultimos.length < testesSeguidos || ultimos.some((t) => t.sinalizados.length === 0)) return null;

  const primeiro = ultimos[0];
  const ultimo = ultimos[ultimos.length - 1];
  if (!primeiro || !ultimo) return null;
  if (minutosEntre(primeiro.instanteUtc, ultimo.instanteUtc) > janelaMin) return null;
  if (minutosEntre(ultimo.instanteUtc, agoraUtc) > acuidade.validadeHoras * 60) return null;

  const sintomas = sintomasRelatados(ctx.entrada.autoavaliacoes, tripulante.id, agoraUtc);
  const tem = (id: string): boolean => sintomas.some((s) => s.sintomaId === id);
  const escala = tem("perda_visual_subita") || tem("visao_dupla") || (tem("dor_cabeca") && tem("visao_borrada"));
  const nivel: Nivel = escala ? 3 : 2;

  const evidencias: Evidencia[] = ultimos.flatMap((t) => t.sinalizados);
  evidencias.push({
    indicadorId: "repeticao",
    campo: "testes_consecutivos",
    valor: ultimos.length,
    unidade: "testes",
    nivel: 2,
    instanteUtc: ultimo.instanteUtc,
    origem: "manual",
  });

  return montarAlerta({
    regra,
    nivel,
    tripulanteId: tripulante.id,
    titulo: tituloDaHipotese(regra.hipotese),
    evidencias,
    criadoUtc: ultimo.instanteUtc,
    agoraUtc,
  });
}
