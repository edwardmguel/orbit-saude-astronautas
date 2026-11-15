/**
 * R-HID-01. Hidratação baixa e risco renal (cenário C5). `docs/04`, parte B.
 *
 * Condições: ingestão registrada abaixo de 1.200 mL em 24 h por 2 dias seguidos (parâmetro de
 * demonstração, não é meta) E cor da urina 6 ou mais na escala de 8 pontos. Nível 2, sem vermelho
 * automático. O agravante de perda óssea esperada não altera o nível.
 */

import { dataUtc, MS_POR_DIA, paraMs } from "../../domain/tempo";
import type { Alerta, Evidencia, Leitura, Tripulante } from "../../domain/tipos";
import { dentroDaValidade, ehDisponivel, naJanela, selecionarLeituras, valorNaUnidadeDoIndicador } from "../leituras";
import {
  evidenciaDeLeitura,
  maisRecente,
  montarAlerta,
  tituloDaHipotese,
  valorDaCondicao,
  type ContextoCruzamento,
} from "./comum";

export const ID_R_HID_01 = "R-HID-01";

export function avaliarRHid01(ctx: ContextoCruzamento, tripulante: Tripulante): Alerta | null {
  const regra = ctx.regraPorId[ID_R_HID_01];
  const agua = ctx.indicadorPorId["agua_ingerida"];
  const urina = ctx.indicadorPorId["cor_urina"];
  if (!regra || !agua || !urina) return null;

  const limiteAgua = valorDaCondicao(regra, "total_24h");
  const limiteUrina = valorDaCondicao(regra, "escala_cor");
  const dias = valorDaCondicao(regra, "repeticao_dias");
  const { agoraUtc } = ctx;
  const filtro = { tripulanteId: tripulante.id, agoraUtc } as const;

  // Total de cada dia: a última leitura de cada data UTC; precisa de `dias` datas seguidas.
  const doAgua = selecionarLeituras(ctx.entrada.leituras, { ...filtro, indicadorId: agua.id }).filter(ehDisponivel);
  const ultimaAgua = doAgua.at(-1);
  if (!ultimaAgua || !dentroDaValidade(ultimaAgua, agua, agoraUtc)) return null;
  const totalPorData = new Map<string, Leitura>();
  for (const l of doAgua) totalPorData.set(dataUtc(l.instanteUtc), l);
  const totais = [...totalPorData.values()].slice(-dias);
  if (totais.length < dias) return null;
  for (let i = 1; i < totais.length; i += 1) {
    const anterior = totais[i - 1];
    const atual = totais[i];
    if (!anterior || !atual) return null;
    const diferenca = Math.round((paraMs(dataUtc(atual.instanteUtc)) - paraMs(dataUtc(anterior.instanteUtc))) / MS_POR_DIA);
    if (diferenca !== 1) return null;
  }
  const mL = (l: Leitura): number => valorNaUnidadeDoIndicador(l, agua) ?? l.valor;
  if (!totais.every((l) => mL(l) < limiteAgua)) return null;

  // Cor da urina 6 ou mais, registrada dentro do mesmo período.
  const doUrina = selecionarLeituras(ctx.entrada.leituras, { ...filtro, indicadorId: urina.id }).filter(ehDisponivel);
  const ultimaUrina = naJanela(doUrina, agoraUtc, dias * 24 * 60).at(-1);
  if (!ultimaUrina || !(ultimaUrina.valor >= limiteUrina)) return null;

  const evidencias: Evidencia[] = totais.map((l) => evidenciaDeLeitura(l, "total_24h", mL(l), "mL", 2));
  evidencias.push(evidenciaDeLeitura(ultimaUrina, "escala_cor", ultimaUrina.valor, "categoria de 1 a 8", 2));

  return montarAlerta({
    regra,
    nivel: 2,
    tripulanteId: tripulante.id,
    titulo: tituloDaHipotese(regra.hipotese),
    evidencias,
    criadoUtc: maisRecente([ultimaUrina.instanteUtc, ...totais.map((l) => l.instanteUtc)]),
    agoraUtc,
  });
}
