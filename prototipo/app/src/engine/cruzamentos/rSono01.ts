/**
 * R-SONO-01. Dívida de sono antes de atividade crítica (cenário C4). `docs/04`, parte B.
 *
 * Condições: dívida de sono (A8: soma de sono programado menos TST) acima de 0 min nos últimos
 * 3 dias (valor de demonstração) E atividade crítica no plano dos próximos 2 dias (EVA, chegada de
 * veículo, braço robótico). Nível 2, sem vermelho automático. O ruído na cabine de dormir fora do
 * envelope entra só como fator possível, nunca como violação a partir de uma leitura isolada.
 */

import { diaDaMissao, dataUtc, duracaoEntreHorarios, MS_POR_DIA, paraMs } from "../../domain/tempo";
import type { Alerta, Evidencia, Leitura, Tripulante } from "../../domain/tipos";
import { avaliarIndicador } from "../avaliarIndicador";
import { ehDisponivel, naJanela, selecionarLeituras, valorNaUnidadeDoIndicador } from "../leituras";
import {
  evidenciaDeLeitura,
  maisRecente,
  montarAlerta,
  tituloDaHipotese,
  valorDaCondicao,
  type ContextoCruzamento,
} from "./comum";

export const ID_R_SONO_01 = "R-SONO-01";

export function avaliarRSono01(ctx: ContextoCruzamento, tripulante: Tripulante): Alerta | null {
  const regra = ctx.regraPorId[ID_R_SONO_01];
  const sono = ctx.indicadorPorId["sono_tst"];
  if (!regra || !sono) return null;

  const limiteDivida = valorDaCondicao(regra, "divida_sono_min");
  const diasDeAntecedencia = valorDaCondicao(regra, "atividade_critica_planejada");
  const janelaMin = regra.janelaMin ?? 3 * 24 * 60;
  const { agoraUtc } = ctx;
  const programadoMin = duracaoEntreHorarios(tripulante.horarioSono.inicio, tripulante.horarioSono.fim);

  // Uma leitura por noite (a última de cada data) dentro dos últimos 3 dias.
  const leituras = selecionarLeituras(ctx.entrada.leituras, { indicadorId: sono.id, tripulanteId: tripulante.id, agoraUtc }).filter(
    ehDisponivel,
  );
  const porData = new Map<string, Leitura>();
  for (const l of naJanela(leituras, agoraUtc, janelaMin)) porData.set(dataUtc(l.instanteUtc), l);
  const noites = [...porData.values()];
  if (noites.length === 0) return null;

  const tstDe = (l: Leitura): number => valorNaUnidadeDoIndicador(l, sono) ?? l.valor;
  const divida = noites.reduce((soma, l) => soma + (programadoMin - tstDe(l)), 0);
  if (!(divida > limiteDivida)) return null;

  // Atividade crítica nos próximos `diasDeAntecedencia` dias, para este tripulante ou para todos.
  const agora = paraMs(agoraUtc);
  const proximas = (ctx.entrada.atividadesCriticas ?? [])
    .filter((a) => {
      const inicio = paraMs(a.inicioUtc);
      const paraEle = !a.tripulanteIds || a.tripulanteIds.length === 0 || a.tripulanteIds.includes(tripulante.id);
      return paraEle && inicio > agora && inicio <= agora + diasDeAntecedencia * MS_POR_DIA;
    })
    .sort((a, b) => paraMs(a.inicioUtc) - paraMs(b.inicioUtc));
  const proxima = proximas[0];
  if (!proxima) return null;

  const ultimaNoite = noites[noites.length - 1] as Leitura;
  const evidencias: Evidencia[] = noites.map((l) =>
    evidenciaDeLeitura(l, "tst", tstDe(l), "min", tstDe(l) < programadoMin ? 2 : 1),
  );
  evidencias.push({
    leituraId: ultimaNoite.id,
    indicadorId: sono.id,
    campo: "divida_sono_min",
    valor: divida,
    unidade: "min em 3 dias",
    nivel: 2,
    instanteUtc: ultimaNoite.instanteUtc,
    origem: ultimaNoite.origem,
  });
  evidencias.push({
    indicadorId: "atividade_critica",
    campo: "atividade_critica_planejada",
    valor: Math.round(((paraMs(proxima.inicioUtc) - agora) / MS_POR_DIA) * 10) / 10,
    unidade: "dias até a atividade",
    nivel: 2,
    instanteUtc: proxima.inicioUtc,
    origem: "simulada",
  });

  const alerta = montarAlerta({
    regra,
    nivel: 2,
    tripulanteId: tripulante.id,
    titulo: tituloDaHipotese(regra.hipotese),
    evidencias,
    criadoUtc: maisRecente([ultimaNoite.instanteUtc]),
    agoraUtc,
  });

  // Contexto, não dispara sozinho: ruído na cabine de dormir fora do envelope aprovado.
  const ruido = ctx.indicadorPorId["ruido_dormitorio"];
  if (ruido) {
    const doModulo = selecionarLeituras(ctx.entrada.leituras, {
      indicadorId: ruido.id,
      moduloId: tripulante.moduloAtual,
      agoraUtc,
    });
    const estado = avaliarIndicador({
      indicador: ruido,
      tripulanteId: null,
      leituras: doModulo,
      agoraUtc,
      diaDaMissao: diaDaMissao(ctx.entrada.missao.inicioUtc, agoraUtc),
    });
    if (estado.nivel >= 2 && estado.leitura) {
      alerta.fatoresAmbientais = [
        evidenciaDeLeitura(estado.leitura, "ruido_fora_do_envelope", estado.leitura.valor, estado.leitura.unidade, estado.nivel),
      ];
    }
  }
  return alerta;
}
