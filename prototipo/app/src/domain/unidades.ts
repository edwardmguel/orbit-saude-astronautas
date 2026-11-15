/**
 * Conversões de unidade do `docs/04`, A1. Toda leitura entra na unidade canônica do `docs/06`
 * (seção 3); o adaptador converte e guarda o valor e a unidade originais.
 */

export const KPA_POR_MMHG = 0.133322;
export const MMHG_POR_KPA = 7.50062;
export const KPA_POR_PSIA = 6.89476;
export const KG_POR_LB = 0.453592;
export const MG_DL_POR_MMOL_L = 18.016;

/** Pressão de vapor d'água a 37 °C: ocupa 47 mmHg do ar inspirado (OCHMO-TB-003). */
export const PRESSAO_VAPOR_AGUA_MMHG = 47;

export const kPaParaMmHg = (kpa: number): number => kpa * MMHG_POR_KPA;
export const mmHgParaKPa = (mmhg: number): number => mmhg * KPA_POR_MMHG;
export const psiaParaKPa = (psia: number): number => psia * KPA_POR_PSIA;
export const kPaParaPsia = (kpa: number): number => kpa / KPA_POR_PSIA;
export const fahrenheitParaCelsius = (f: number): number => ((f - 32) * 5) / 9;
export const celsiusParaFahrenheit = (c: number): number => (c * 9) / 5 + 32;
export const libraParaKg = (lb: number): number => lb * KG_POR_LB;
export const kgParaLibra = (kg: number): number => kg / KG_POR_LB;
export const glicoseMgDlParaMmolL = (mgdl: number): number => mgdl / MG_DL_POR_MMOL_L;
export const glicoseMmolLParaMgDl = (mmoll: number): number => mmoll * MG_DL_POR_MMOL_L;

/** Pressão parcial em mmHg como fração (%) da atmosfera: % = (pp ÷ pressão total) × 100. */
export const pressaoParcialParaPorcentagem = (ppMmHg: number, pressaoTotalMmHg: number): number =>
  (ppMmHg / pressaoTotalMmHg) * 100;

/** Fração (%) para ppm: ppm = % × 10.000. */
export const porcentagemParaPpm = (pct: number): number => pct * 10_000;
export const ppmParaPorcentagem = (ppm: number): number => ppm / 10_000;

/**
 * PIO2, a pressão parcial inspirada de O2 (mmHg): (pressão total menos 47) × ppO2 ÷ pressão total.
 * Não é a ppO2 da cabine: o ar inspirado é umedecido e o vapor d'água ocupa 47 mmHg.
 * Exemplo (`docs/04`, A1): (757,64 menos 47) × 150,67 ÷ 757,64 = 141,3 mmHg = 18,84 kPa.
 */
export function pio2DePpO2(ppO2MmHg: number, pressaoTotalMmHg: number): number {
  if (!(pressaoTotalMmHg > PRESSAO_VAPOR_AGUA_MMHG)) {
    throw new RangeError(
      `A pressão total da cabine (${pressaoTotalMmHg} mmHg) precisa passar de ${PRESSAO_VAPOR_AGUA_MMHG} mmHg para calcular a PIO2.`,
    );
  }
  return ((pressaoTotalMmHg - PRESSAO_VAPOR_AGUA_MMHG) * ppO2MmHg) / pressaoTotalMmHg;
}

/** PIO2 já em kPa, a unidade canônica do indicador `pio2_cabine`. */
export const pio2DePpO2EmKPa = (ppO2MmHg: number, pressaoTotalMmHg: number): number =>
  mmHgParaKPa(pio2DePpO2(ppO2MmHg, pressaoTotalMmHg));

type Conversor = (valor: number) => number;

const CONVERSORES: Record<string, Conversor> = {
  "kPa>mmHg": kPaParaMmHg,
  "mmHg>kPa": mmHgParaKPa,
  "psia>kPa": psiaParaKPa,
  "kPa>psia": kPaParaPsia,
  "°F>°C": fahrenheitParaCelsius,
  "°C>°F": celsiusParaFahrenheit,
  "lb>kg": libraParaKg,
  "kg>lb": kgParaLibra,
  "mg/dL>mmol/L": glicoseMgDlParaMmolL,
  "mmol/L>mg/dL": glicoseMmolLParaMgDl,
  "%>ppm": porcentagemParaPpm,
  "ppm>%": ppmParaPorcentagem,
};

/** Converte entre duas unidades conhecidas; devolve `null` quando não existe conversão direta. */
export function converterUnidade(valor: number, de: string, para: string): number | null {
  if (de === para) return valor;
  const conversor = CONVERSORES[`${de}>${para}`];
  return conversor ? conversor(valor) : null;
}

/**
 * Parte curta de uma unidade descritiva do JSON ("pontos, escala interna 1 a 7" vira "pontos";
 * "pfu para prótons de 10 MeV ou mais" vira "pfu"), usada para comparar com a unidade da leitura.
 */
export function unidadeBase(unidade: string): string {
  const antesDaVirgula = unidade.split(",")[0] ?? unidade;
  const primeiroTermo = antesDaVirgula.trim().split(/\s+/)[0] ?? antesDaVirgula;
  return primeiroTermo.replace(/\/dia$/, "");
}
