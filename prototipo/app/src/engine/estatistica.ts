/**
 * Estatística do `docs/04`, parte A. Funções puras; os números dos exemplos resolvidos do documento
 * são o gabarito dos testes.
 */

/** Peso da leitura mais recente na EWMA (`docs/04`, A4: padrão 0,3). */
export const LAMBDA_EWMA = 0.3;

/** Média: μ = (x₁ + x₂ + … + xₙ) ÷ n. Lista vazia dá NaN. */
export function media(valores: readonly number[]): number {
  if (valores.length === 0) return Number.NaN;
  let soma = 0;
  for (const v of valores) soma += v;
  return soma / valores.length;
}

/** Desvio padrão amostral: σ = raiz( Σ (xᵢ menos μ)² ÷ (n menos 1) ). Com menos de 2 valores dá NaN. */
export function desvioPadraoAmostral(valores: readonly number[]): number {
  if (valores.length < 2) return Number.NaN;
  const mu = media(valores);
  let soma = 0;
  for (const v of valores) soma += (v - mu) ** 2;
  return Math.sqrt(soma / (valores.length - 1));
}

/**
 * z = (x menos μ) ÷ σ. Com σ igual a zero e valor diferente da média o desvio é infinito
 * (qualquer mudança foge de um padrão sem variação); com valor igual à média, z é 0.
 */
export function zScore(valor: number, mu: number, sigma: number): number {
  if (sigma === 0) return valor === mu ? 0 : Math.sign(valor - mu) * Number.POSITIVE_INFINITY;
  return (valor - mu) / sigma;
}

/** Série suavizada: Sₜ = λ × xₜ + (1 menos λ) × Sₜ₋₁, com S₀ = x₀. */
export function ewmaSerie(valores: readonly number[], lambda: number = LAMBDA_EWMA): number[] {
  const saida: number[] = [];
  for (const [i, x] of valores.entries()) {
    const anterior = saida[i - 1];
    saida.push(anterior === undefined ? x : lambda * x + (1 - lambda) * anterior);
  }
  return saida;
}

/** Último valor da EWMA; lista vazia dá NaN. */
export function ewma(valores: readonly number[], lambda: number = LAMBDA_EWMA): number {
  return ewmaSerie(valores, lambda).at(-1) ?? Number.NaN;
}

export interface RegressaoLinear {
  inclinacao: number;
  intercepto: number;
}

/** Regressão linear simples: b = Σ((xᵢ menos x̄)(yᵢ menos ȳ)) ÷ Σ((xᵢ menos x̄)²); a = ȳ menos b × x̄. */
export function regressaoLinear(xs: readonly number[], ys: readonly number[]): RegressaoLinear {
  if (xs.length !== ys.length || xs.length < 2) {
    throw new RangeError("A regressão linear precisa de pelo menos 2 pares (x, y) com o mesmo tamanho.");
  }
  const xBarra = media(xs);
  const yBarra = media(ys);
  let numerador = 0;
  let denominador = 0;
  for (const [i, x] of xs.entries()) {
    const y = ys[i] ?? Number.NaN;
    numerador += (x - xBarra) * (y - yBarra);
    denominador += (x - xBarra) ** 2;
  }
  const inclinacao = numerador / denominador;
  return { inclinacao, intercepto: yBarra - inclinacao * xBarra };
}

/**
 * Dias até a reta cruzar o limite L: (L menos (a + b × hoje)) ÷ b. Devolve `null` quando a reta
 * é plana ou aponta para longe do limite (a projeção não cruza no futuro).
 */
export function diasAteLimite(reta: RegressaoLinear, hoje: number, limite: number): number | null {
  if (reta.inclinacao === 0) return null;
  const dias = (limite - (reta.intercepto + reta.inclinacao * hoje)) / reta.inclinacao;
  return dias > 0 ? dias : null;
}

/** Δ% = (atual menos base) ÷ base × 100. */
export function variacaoPercentual(atual: number, base: number): number {
  return ((atual - base) / base) * 100;
}

/** RMSSD de intervalos RR em ms: raiz( média de (RRᵢ₊₁ menos RRᵢ)² ) (`docs/04`, A9). */
export function rmssd(intervalosRrMs: readonly number[]): number {
  if (intervalosRrMs.length < 2) return Number.NaN;
  const quadrados: number[] = [];
  for (let i = 1; i < intervalosRrMs.length; i += 1) {
    quadrados.push(((intervalosRrMs[i] ?? 0) - (intervalosRrMs[i - 1] ?? 0)) ** 2);
  }
  return Math.sqrt(media(quadrados));
}

/** Arredonda para `casas` casas decimais (para texto e evidência, nunca para decidir nível). */
export function arredondar(valor: number, casas: number): number {
  const fator = 10 ** casas;
  return Math.round(valor * fator) / fator;
}
