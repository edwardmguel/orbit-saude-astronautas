/**
 * Linha de base pessoal (`docs/04`, A2 e A3): "o normal desta pessoa".
 *
 * - Precisa de um mínimo de leituras (7 no `indicadores.json`); antes disso a tela mostra "linha de
 *   base em formação" e vale só a faixa com fonte.
 * - Não incorpora dias em atenção: uma leitura que foge do padrão (|z| de 2 ou mais) ou que cai
 *   fora de uma faixa com fonte não entra na base, senão o "anormal" viraria o novo normal.
 * - O desvio pessoal sozinho nunca passa de amarelo.
 */

import type { DirecaoIndicador, Leitura, LinhaDeBase } from "../domain/tipos";
import { paraMs } from "../domain/tempo";
import { desvioPadraoAmostral, media, zScore } from "./estatistica";

export interface OpcoesLinhaDeBase {
  /** Mínimo de leituras aceitas para a base estar pronta (`regraCor.linhaDeBase.minimoLeiturasValidas`). */
  minimo: number;
  /** |z| a partir do qual o desvio vira amarelo (`regraCor.linhaDeBase.zAmarelo`). */
  zAmarelo: number;
  /** |z| acima do qual o desvio é "persistente" (`regraCor.linhaDeBase.zPersistenteAcima`). */
  zPersistente?: number;
  /** Leituras seguidas acima de `zPersistente` para chamar de persistente (`repeticoesParaPersistente`). */
  repeticoes?: number;
  direcao: DirecaoIndicador;
  /** Marca leituras em atenção por faixa com fonte; elas também ficam fora da base. */
  emAtencao?: (leitura: Leitura) => boolean;
}

export interface BaseEstatistica {
  media: number;
  dp: number;
  n: number;
}

export interface PontoLinhaDeBase {
  leitura: Leitura;
  /** Base aceita até então; indefinida enquanto a base estava em formação. */
  base?: BaseEstatistica;
  /** z contra a base aceita até então; indefinido enquanto a base estava em formação. */
  z?: number;
  aceita: boolean;
}

export interface AnaliseLinhaDeBase {
  pontos: PontoLinhaDeBase[];
  /** Base usada para comparar a última leitura (as aceitas antes dela); ausente em formação. */
  baseDaUltima?: BaseEstatistica;
  zDaUltima?: number;
  emFormacao: boolean;
  persistente: boolean;
}

/** Só o lado ruim do indicador conta: `acima` só z positivo, `abaixo` só z negativo, `ambos` os dois. */
export function desvioRelevante(z: number, direcao: DirecaoIndicador, limite: number): boolean {
  if (Number.isNaN(z)) return false;
  if (direcao === "acima") return z >= limite;
  if (direcao === "abaixo") return z <= -limite;
  return Math.abs(z) >= limite;
}

function ordenarPorInstante(leituras: readonly Leitura[]): Leitura[] {
  return [...leituras].sort((a, b) => paraMs(a.instanteUtc) - paraMs(b.instanteUtc));
}

/**
 * Percorre as leituras em ordem de tempo, decidindo uma a uma se entra na base. A última leitura
 * da lista é a que se quer avaliar; ela é comparada com a base aceita antes dela.
 */
export function analisarLinhaDeBase(leituras: readonly Leitura[], opcoes: OpcoesLinhaDeBase): AnaliseLinhaDeBase {
  const ordenadas = ordenarPorInstante(leituras);
  const aceitas: number[] = [];
  const pontos: PontoLinhaDeBase[] = [];
  let baseDaUltima: BaseEstatistica | undefined;
  let zDaUltima: number | undefined;

  for (const [i, leitura] of ordenadas.entries()) {
    const ehUltima = i === ordenadas.length - 1;
    let z: number | undefined;
    let base: BaseEstatistica | undefined;
    if (aceitas.length >= opcoes.minimo) {
      base = { media: media(aceitas), dp: desvioPadraoAmostral(aceitas), n: aceitas.length };
      z = zScore(leitura.valor, base.media, base.dp);
    }
    const foraDoPadrao = z !== undefined && desvioRelevante(z, opcoes.direcao, opcoes.zAmarelo);
    const aceita = !foraDoPadrao && !(opcoes.emAtencao?.(leitura) ?? false);
    pontos.push(base && z !== undefined ? { leitura, base, z, aceita } : { leitura, aceita });
    if (aceita) aceitas.push(leitura.valor);
    if (ehUltima) {
      baseDaUltima = base;
      zDaUltima = z;
    }
  }

  let persistente = false;
  const { zPersistente, repeticoes } = opcoes;
  if (zPersistente !== undefined && repeticoes !== undefined && pontos.length >= repeticoes && repeticoes > 0) {
    persistente = pontos
      .slice(-repeticoes)
      .every((p) => p.z !== undefined && desvioRelevante(p.z, opcoes.direcao, zPersistente) && Math.abs(p.z) > zPersistente);
  }

  const analise: AnaliseLinhaDeBase = {
    pontos,
    emFormacao: baseDaUltima === undefined,
    persistente,
  };
  if (baseDaUltima !== undefined) analise.baseDaUltima = baseDaUltima;
  if (zDaUltima !== undefined) analise.zDaUltima = zDaUltima;
  return analise;
}

/**
 * A `LinhaDeBase` do `docs/06` (2.7) com todas as leituras aceitas até agora. `em_formacao` até
 * ter o mínimo de leituras; nesse caso média e desvio saem do que existe (NaN se não houver nada).
 */
export function calcularLinhaDeBase(
  tripulanteId: string,
  indicadorId: string,
  leituras: readonly Leitura[],
  opcoes: OpcoesLinhaDeBase,
): LinhaDeBase {
  const { pontos } = analisarLinhaDeBase(leituras, opcoes);
  const aceitas = pontos.filter((p) => p.aceita).map((p) => p.leitura);
  const valores = aceitas.map((l) => l.valor);
  const primeira = aceitas[0];
  const ultima = aceitas[aceitas.length - 1];
  return {
    tripulanteId,
    indicadorId,
    media: media(valores),
    desvioPadrao: desvioPadraoAmostral(valores),
    n: valores.length,
    periodo: { inicioUtc: primeira?.instanteUtc ?? "", fimUtc: ultima?.instanteUtc ?? "" },
    estado: valores.length >= opcoes.minimo ? "pronta" : "em_formacao",
  };
}

/** Nível pelo desvio pessoal: amarelo (2) com |z| de `zAmarelo` ou mais, senão verde (1). Nunca passa de 2. */
export function nivelPorZScore(z: number, direcao: DirecaoIndicador, zAmarelo: number): 1 | 2 {
  return desvioRelevante(z, direcao, zAmarelo) ? 2 : 1;
}
