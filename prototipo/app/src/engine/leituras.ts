/**
 * Seleção de leituras para o motor. Uma leitura só entra na avaliação se a qualidade não é
 * inválida, se já aconteceu e já chegou ao software (`instanteDisponivelUtc`) em relação a `agoraUtc`.
 */

import type { Indicador, Leitura } from "../domain/tipos";
import { MS_POR_MINUTO, minutosEntre, paraMs } from "../domain/tempo";
import { converterUnidade, unidadeBase } from "../domain/unidades";

export interface FiltroLeituras {
  indicadorId?: string;
  tripulanteId?: string | null;
  moduloId?: string;
  agoraUtc: string;
}

export const ehDisponivel = (l: Leitura): boolean => (l.disponibilidade ?? "disponivel") === "disponivel";

/** Leituras do filtro que já existem em `agoraUtc`, sem as inválidas, em ordem crescente de horário. */
export function selecionarLeituras(leituras: readonly Leitura[], filtro: FiltroLeituras): Leitura[] {
  const agora = paraMs(filtro.agoraUtc);
  return leituras
    .filter((l) => {
      if (filtro.indicadorId !== undefined && l.indicadorId !== filtro.indicadorId) return false;
      if (filtro.tripulanteId !== undefined) {
        if (filtro.tripulanteId === null ? l.tripulanteId !== undefined : l.tripulanteId !== filtro.tripulanteId) return false;
      }
      if (filtro.moduloId !== undefined && l.moduloId !== filtro.moduloId) return false;
      if (l.qualidade === "invalida") return false;
      if (paraMs(l.instanteUtc) > agora) return false;
      if (l.instanteDisponivelUtc !== undefined && paraMs(l.instanteDisponivelUtc) > agora) return false;
      return true;
    })
    .sort((a, b) => paraMs(a.instanteUtc) - paraMs(b.instanteUtc));
}

/** Última leitura disponível do filtro (ignora amostras ainda sem resultado). */
export function ultimaDisponivel(leituras: readonly Leitura[], filtro: FiltroLeituras): Leitura | undefined {
  return selecionarLeituras(leituras, filtro).filter(ehDisponivel).at(-1);
}

/** Idade da leitura em minutos em relação a `agoraUtc`. */
export const idadeEmMinutos = (leitura: Leitura, agoraUtc: string): number => minutosEntre(leitura.instanteUtc, agoraUtc);

/** A leitura ainda vale para exibição? A validade vem de `validadeHoras` do indicador. */
export function dentroDaValidade(leitura: Leitura, indicador: Indicador, agoraUtc: string): boolean {
  return idadeEmMinutos(leitura, agoraUtc) <= indicador.validadeHoras * 60;
}

/** Grandezas com unidade física conhecida: só nelas uma unidade diferente é erro ou pede conversão. */
const UNIDADES_FISICAS = new Set([
  "mmHg",
  "kPa",
  "psia",
  "°C",
  "°F",
  "kg",
  "lb",
  "mg/dL",
  "mmol/L",
  "ppm",
  "bpm",
  "ms",
  "mL",
  "min",
  "g/dL",
  "mSv",
  "µGy/h",
  "pfu",
  "dB",
  "dBA",
]);

const familiaDb = (u: string): boolean => u === "dB" || u === "dBA";

/**
 * Valor da leitura na unidade canônica do indicador: converte quando existe conversão (kPa e mmHg,
 * °F e °C...) e devolve `null` quando as unidades são físicas, diferentes e sem conversão.
 * Unidades descritivas (escalas, categorias) passam sem conversão.
 */
export function valorNaUnidadeDoIndicador(leitura: Leitura, indicador: Indicador): number | null {
  const daLeitura = unidadeBase(leitura.unidade);
  const doIndicador = unidadeBase(indicador.unidade);
  if (daLeitura === doIndicador || (familiaDb(daLeitura) && familiaDb(doIndicador))) return leitura.valor;
  if (UNIDADES_FISICAS.has(daLeitura) && UNIDADES_FISICAS.has(doIndicador)) {
    return converterUnidade(leitura.valor, daLeitura, doIndicador);
  }
  return leitura.valor;
}

/** Leituras dos últimos `minutos` até `ate`, inclusive no limite final e exclusive no inicial. */
export function naJanela(leituras: readonly Leitura[], ate: string, minutos: number): Leitura[] {
  const fim = paraMs(ate);
  const inicio = fim - minutos * MS_POR_MINUTO;
  return leituras.filter((l) => {
    const t = paraMs(l.instanteUtc);
    return t > inicio && t <= fim;
  });
}
