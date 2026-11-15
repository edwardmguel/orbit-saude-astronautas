/**
 * R-CO2-01. Possível efeito de CO2 elevado (cenário C1). `docs/04`, parte B.
 *
 * Condições: EWMA do ppCO2 do módulo onde o tripulante está acima do limite de atenção (2,8 mmHg,
 * valor de demonstração) E pelo menos um entre dor de cabeça relatada, PVT mais de 10% mais lento
 * que o padrão e dificuldade de concentração relatada, tudo na janela de 3 horas.
 * Nível 2. Sobe para 3 com dor de cabeça de 7 ou mais, tontura ou média de 1 h acima de 3 mmHg.
 */

import type { Nivel } from "../../domain/estado";
import { minutosEntre, paraMs } from "../../domain/tempo";
import type { Alerta, Evidencia, Indicador, Leitura, Tripulante } from "../../domain/tipos";
import { avaliarRegrasCor } from "../avaliarIndicador";
import { arredondar, ewmaSerie, variacaoPercentual } from "../estatistica";
import { dentroDaValidade, ehDisponivel, naJanela, selecionarLeituras, valorNaUnidadeDoIndicador } from "../leituras";
import { analisarLinhaDeBase } from "../linhaDeBase";
import {
  evidenciaDeLeitura,
  evidenciaDeSintoma,
  maisAntigo,
  maisRecente,
  montarAlerta,
  nomeCurtoDoModulo,
  sintomasRelatados,
  tituloDaHipotese,
  valorDaCondicao,
  valorDeRegraDemo,
  type ContextoCruzamento,
} from "./comum";

export const ID_R_CO2_01 = "R-CO2-01";

export function avaliarRCo201(ctx: ContextoCruzamento, tripulante: Tripulante): Alerta | null {
  const regra = ctx.regraPorId[ID_R_CO2_01];
  const co2 = ctx.indicadorPorId["ppco2_modulo"];
  if (!regra || !co2) return null;

  const limiteEwma = valorDaCondicao(regra, "ewma_ppco2");
  const limitePvtPct = valorDaCondicao(regra, "deltaPercentual");
  const janelaMin = regra.janelaMin ?? 180;
  const { agoraUtc } = ctx;
  const moduloId = tripulante.moduloAtual;

  // 1. EWMA do ppCO2 do módulo onde o tripulante está.
  const leiturasCo2 = selecionarLeituras(ctx.entrada.leituras, { indicadorId: co2.id, moduloId, agoraUtc }).filter(ehDisponivel);
  const ultimaCo2 = leiturasCo2.at(-1);
  if (!ultimaCo2 || !dentroDaValidade(ultimaCo2, co2, agoraUtc)) return null;
  const valores = leiturasCo2.map((l) => valorNaUnidadeDoIndicador(l, co2) ?? l.valor);
  const serieEwma = ewmaSerie(valores);
  const ewmaAtual = serieEwma.at(-1) ?? Number.NaN;
  if (!(ewmaAtual > limiteEwma)) return null;

  let inicioDaSequencia = serieEwma.length - 1;
  while (inicioDaSequencia > 0 && (serieEwma[inicioDaSequencia - 1] ?? 0) > limiteEwma) inicioDaSequencia -= 1;
  const cruzouEm = leiturasCo2[inicioDaSequencia]?.instanteUtc ?? ultimaCo2.instanteUtc;

  // 2. Gatilhos na janela: sintoma do check-in ou PVT mais lento.
  const sintomas = sintomasRelatados(ctx.entrada.autoavaliacoes, tripulante.id, agoraUtc).filter(
    (s) => minutosEntre(s.instanteUtc, agoraUtc) <= janelaMin,
  );
  const dorCabeca = sintomas.find((s) => s.sintomaId === "dor_cabeca");
  const concentracao = sintomas.find((s) => s.sintomaId === "dificuldade_concentracao");
  const tontura = sintomas.find((s) => s.sintomaId === "tontura");

  let evidenciaPvt: Evidencia | undefined;
  const pvt = ctx.indicadorPorId["pvt_tempo_reacao"];
  if (pvt?.regraCor.linhaDeBase) {
    const leiturasPvt = selecionarLeituras(ctx.entrada.leituras, {
      indicadorId: pvt.id,
      tripulanteId: tripulante.id,
      agoraUtc,
    }).filter(ehDisponivel);
    const recentes = naJanela(leiturasPvt, agoraUtc, janelaMin);
    const ultimaPvt = recentes.at(-1);
    if (ultimaPvt) {
      const analise = analisarLinhaDeBase(
        leiturasPvt.filter((l) => paraMs(l.instanteUtc) <= paraMs(ultimaPvt.instanteUtc)),
        {
          minimo: pvt.regraCor.linhaDeBase.minimoLeiturasValidas,
          zAmarelo: pvt.regraCor.linhaDeBase.zAmarelo,
          direcao: pvt.direcao,
        },
      );
      if (analise.baseDaUltima && analise.baseDaUltima.media !== 0) {
        const delta = variacaoPercentual(ultimaPvt.valor, analise.baseDaUltima.media);
        if (delta > limitePvtPct) {
          evidenciaPvt = evidenciaDeLeitura(ultimaPvt, "deltaPercentual", arredondar(delta, 1), "%", 2);
        }
      }
    }
  }

  if (!dorCabeca && !concentracao && !evidenciaPvt) return null;

  // 3. Nível: 2, ou 3 com dor de cabeça de 7 ou mais, tontura ou média de 1 h acima do requisito.
  const limiteDor = valorDeRegraDemo(ctx.indicadorPorId["dor"], ID_R_CO2_01);
  const media1h = media(naJanela(leiturasCo2, ultimaCo2.instanteUtc, 60), co2);
  const acimaDoRequisito =
    avaliarRegrasCor(co2, { instantaneo: ultimaCo2.valor, media1h, ewma: ewmaAtual }, { regrasAtivas: [] }).nivel >= 3;
  const dorIntensa = limiteDor !== undefined && (dorCabeca?.intensidade ?? 0) >= limiteDor;
  const nivel: Nivel = dorIntensa || tontura || acimaDoRequisito ? 3 : 2;

  // 4. Evidências: o que dispara a regra, com valor, unidade, estado e horário.
  const nivelMedia = avaliarRegrasCor(co2, { instantaneo: ultimaCo2.valor, media1h }, { regrasAtivas: [] }).nivel;
  const evidencias: Evidencia[] = [
    evidenciaDeLeitura(ultimaCo2, "ewma_ppco2", arredondar(ewmaAtual, 2), "mmHg", 2),
    evidenciaDeLeitura(ultimaCo2, "media_1h_ppco2", arredondar(media1h, 2), "mmHg", nivelMedia >= 2 ? (nivelMedia as Nivel) : 1),
  ];
  for (const s of [concentracao, dorCabeca, tontura]) if (s) evidencias.push(evidenciaDeSintoma(s));
  if (evidenciaPvt) evidencias.push(evidenciaPvt);

  const instantesDosGatilhos = [...[concentracao, dorCabeca].flatMap((s) => (s ? [s.instanteUtc] : [])), ...(evidenciaPvt ? [evidenciaPvt.instanteUtc] : [])];
  const criadoUtc = maisRecente([cruzouEm, maisAntigo(instantesDosGatilhos)]);

  const nomeModulo = nomeCurtoDoModulo(ctx.moduloPorId[moduloId], moduloId);
  return montarAlerta({
    regra,
    nivel,
    tripulanteId: tripulante.id,
    moduloId,
    titulo: tituloDaHipotese(regra.hipotese).replace("no módulo informado", `no ${nomeModulo}`),
    evidencias,
    criadoUtc,
    agoraUtc,
  });
}

function media(leituras: readonly Leitura[], co2: Indicador): number {
  const valores = leituras.map((l) => valorNaUnidadeDoIndicador(l, co2) ?? l.valor);
  return valores.reduce((a, b) => a + b, 0) / valores.length;
}
