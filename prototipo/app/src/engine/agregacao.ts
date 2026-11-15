/**
 * Agregação: do estado de cada indicador ao nível de cada região, de cada bloco da tripulação e do
 * tripulante. Regras (`docs/18`, M05; `docs/19`, seção 6; `docs/17`, correção 5):
 *
 * - a região assume o pior estado entre os indicadores dela que têm leitura válida, os sintomas
 *   ligados a ela (`docs/18`, seção 7, item 7) e os alertas de cruzamento que a elevam (o R-CO2-01
 *   liga Pulmões); sem nenhum deles, fica cinza (0, "sem dado");
 * - leitura de ambiente sozinha não colore o corpo;
 * - Mente é o pior entre fadiga, humor e estresse;
 * - o nível geral é o pior entre as 12 regiões.
 */

import {
  BLOCOS_TRIPULACAO,
  INDICADORES_DA_MENTE,
  REGIOES,
  nivelMaximo,
} from "../domain/constantes";
import type { BlocoTripulacao, EstadoIndicador, EstadoTripulante, Nivel } from "../domain/estado";
import { SINTOMAS_DA_MENTE, SINTOMA_POR_ID, normalizarTexto, type SintomaRelatado } from "../domain/sintomas";
import type { Alerta, Indicador, RegiaoId, Tripulante } from "../domain/tipos";

/** Nível mínimo que um sintoma relatado dá à sua região quando a configuração não traz nível próprio (atenção). */
const NIVEL_DO_SINTOMA_SEM_REGRA: Nivel = 2;

/** Nível de um sintoma sobre a sua região: o maior das entradas de `regraCor.sintomas` ligadas a ele, no mínimo atenção. */
export function nivelDoSintomaNaRegiao(
  sintomaId: SintomaRelatado["sintomaId"],
  indicadorPorId: Readonly<Record<string, Indicador>>,
  regrasAtivas: readonly string[],
): Nivel {
  let nivel: Nivel = 0;
  for (const ligacao of SINTOMA_POR_ID[sintomaId].ligacoes) {
    const entradas = indicadorPorId[ligacao.indicadorId]?.regraCor.sintomas ?? [];
    for (const entrada of entradas) {
      if (!normalizarTexto(entrada.sintoma).includes(normalizarTexto(ligacao.trecho))) continue;
      if (entrada.aplicaSomenteEmRegra && !regrasAtivas.includes(entrada.aplicaSomenteEmRegra)) continue;
      nivel = nivelMaximo(nivel, entrada.nivel);
    }
  }
  return nivel > 0 ? nivel : NIVEL_DO_SINTOMA_SEM_REGRA;
}

export interface EntradaAgregacao {
  tripulante: Tripulante;
  indicadorPorId: Readonly<Record<string, Indicador>>;
  estados: Readonly<Record<string, EstadoIndicador>>;
  sintomas: readonly SintomaRelatado[];
  /** Alertas que valem para este tripulante: os dele e os de toda a tripulação, sem os contextuais. */
  alertas: readonly Alerta[];
  regrasAtivas: readonly string[];
  /** Ignora fadiga, humor e os sintomas da Mente: nível para quem não recebeu o dado `mente`. */
  semMente?: boolean;
}

export function nivelDasRegioes(e: EntradaAgregacao): Record<RegiaoId, Nivel> {
  const regioes = {} as Record<RegiaoId, Nivel>;
  for (const regiao of REGIOES) {
    let nivel: Nivel = 0;
    for (const indicadorId of regiao.indicadores) {
      if (e.semMente && INDICADORES_DA_MENTE.includes(indicadorId)) continue;
      nivel = nivelMaximo(nivel, e.estados[indicadorId]?.nivel ?? 0);
    }
    for (const sintoma of e.sintomas) {
      if (SINTOMA_POR_ID[sintoma.sintomaId].regiao !== regiao.id) continue;
      if (e.semMente && SINTOMAS_DA_MENTE.includes(sintoma.sintomaId)) continue;
      nivel = nivelMaximo(nivel, nivelDoSintomaNaRegiao(sintoma.sintomaId, e.indicadorPorId, e.regrasAtivas));
    }
    for (const alerta of e.alertas) {
      if (alerta.regioes.includes(regiao.id)) nivel = nivelMaximo(nivel, alerta.nivel);
    }
    regioes[regiao.id] = nivel;
  }
  return regioes;
}

export function nivelDosBlocos(
  estados: Readonly<Record<string, EstadoIndicador>>,
): Record<BlocoTripulacao, { nivel: Nivel; indicadorId?: string }> {
  const blocos = {} as Record<BlocoTripulacao, { nivel: Nivel; indicadorId?: string }>;
  for (const bloco of BLOCOS_TRIPULACAO) {
    let nivel: Nivel = 0;
    let decisor: string | undefined;
    for (const indicadorId of bloco.indicadores) {
      const estado = estados[indicadorId];
      if (!estado) continue;
      if (estado.nivel > nivel || (decisor === undefined && estado.leitura)) {
        nivel = nivelMaximo(nivel, estado.nivel);
        decisor = indicadorId;
      }
    }
    blocos[bloco.id] = decisor === undefined ? { nivel } : { nivel, indicadorId: decisor };
  }
  return blocos;
}

export function agregarTripulante(e: EntradaAgregacao): EstadoTripulante {
  const regioes = nivelDasRegioes(e);
  const regioesSemMente = nivelDasRegioes({ ...e, semMente: true });
  const maior = (r: Record<string, Nivel>): Nivel => nivelMaximo(...Object.values(r));
  return {
    tripulanteId: e.tripulante.id,
    nivelGeral: maior(regioes),
    nivelGeralSemMente: maior(regioesSemMente),
    moduloId: e.tripulante.moduloAtual,
    indicadores: { ...e.estados },
    regioes,
    blocos: nivelDosBlocos(e.estados),
  };
}
