/**
 * R-RAD-01. Evento de partículas solares (cenário C2). `docs/04`, parte B.
 *
 * Condições: fluxo de prótons do GOES (10 MeV ou mais) em 10 pfu ou mais (início do nível S1 da
 * NOAA) OU alerta de SEP ativo na DONKI. Dura enquanto durar o evento. Nível 2 para toda a
 * tripulação: não há valor público universal de taxa de dose para subir, então o motor não escala
 * sozinho (o patamar é definido e aprovado pela missão).
 */

import type { Nivel } from "../../domain/estado";
import { paraMs } from "../../domain/tempo";
import type { Alerta, Evidencia, EventoClimaEspacial, Origem } from "../../domain/tipos";
import { avaliarRegrasCor } from "../avaliarIndicador";
import { dentroDaValidade, ehDisponivel, selecionarLeituras, valorNaUnidadeDoIndicador } from "../leituras";
import { evidenciaDeLeitura, maisAntigo, montarAlerta, tituloDaHipotese, valorDaCondicao, type ContextoCruzamento } from "./comum";

export const ID_R_RAD_01 = "R-RAD-01";

const origemDoEvento = (e: EventoClimaEspacial): Origem => (e.fonte === "simulada" ? "simulada" : "historica");

/** Alerta global: vale para toda a tripulação, então não traz `tripulanteId`. */
export function avaliarRRad01(ctx: ContextoCruzamento): Alerta | null {
  const regra = ctx.regraPorId[ID_R_RAD_01];
  const fluxo = ctx.indicadorPorId["fluxo_protons_goes"];
  if (!regra || !fluxo) return null;

  const limiteFluxo = valorDaCondicao(regra, "fluxo_10MeV");
  const { agoraUtc } = ctx;
  const evidencias: Evidencia[] = [];
  const inicios: string[] = [];

  const leituras = selecionarLeituras(ctx.entrada.leituras, { indicadorId: fluxo.id, agoraUtc }).filter(ehDisponivel);
  const ultima = leituras.at(-1);
  if (ultima && dentroDaValidade(ultima, fluxo, agoraUtc)) {
    const valor = valorNaUnidadeDoIndicador(ultima, fluxo) ?? ultima.valor;
    if (valor >= limiteFluxo) {
      const nivel = Math.max(2, avaliarRegrasCor(fluxo, { instantaneo: valor }, { regrasAtivas: [] }).nivel) as Nivel;
      evidencias.push(evidenciaDeLeitura(ultima, "fluxo_10MeV", valor, "pfu", nivel));
      // Início do trecho final de leituras no limite ou acima dele.
      let i = leituras.length - 1;
      while (i > 0) {
        const anterior = leituras[i - 1];
        if (!anterior || (valorNaUnidadeDoIndicador(anterior, fluxo) ?? anterior.valor) < limiteFluxo) break;
        i -= 1;
      }
      inicios.push(leituras[i]?.instanteUtc ?? ultima.instanteUtc);
    }
  }

  const agora = paraMs(agoraUtc);
  for (const evento of ctx.entrada.eventosClima ?? []) {
    if (evento.tipo !== "SEP" || paraMs(evento.inicioUtc) > agora || paraMs(evento.fimUtc) < agora) continue;
    evidencias.push({
      indicadorId: "alerta_sep_donki",
      campo: "alerta_sep_donki",
      valor: "ativo",
      unidade: "evento DONKI",
      nivel: 2,
      instanteUtc: evento.inicioUtc,
      origem: origemDoEvento(evento),
    });
    inicios.push(evento.inicioUtc);
  }

  if (evidencias.length === 0) return null;
  return montarAlerta({
    regra,
    nivel: 2,
    titulo: tituloDaHipotese(regra.hipotese),
    evidencias,
    criadoUtc: maisAntigo(inicios),
    agoraUtc,
  });
}
