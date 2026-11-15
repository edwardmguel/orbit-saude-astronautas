/**
 * Formato dos três JSON de `prototipo/config/` (importados pelo alias `@config`).
 * `indicadores.json` usa os tipos de `src/domain/tipos.ts`; aqui ficam os outros dois arquivos.
 */

import type { Indicador, RegraCruzamento, Sexo } from "../domain/tipos";

export interface ArquivoIndicadores {
  indicadores: Indicador[];
  regrasCruzamento: RegraCruzamento[];
}

// --- perfis-simulacao.rascunho.json -----------------------------------------------------------

export interface PerfilIndicadorSimulacao {
  indicadorId: string;
  unidade: string;
  tipico: number | null;
  dpEntrePessoas: number | null;
  dpEntrePessoasSimulador: number | null;
  dpDiaADia: number | null;
  dpDiaADiaSimulador: number | null;
  ruido: number | null;
  ruidoSimulador: number | null;
  frequenciaRealMin: number | null;
  frequenciaSimuladorMin: number | null;
  fonte: string;
  [outros: string]: unknown;
}

export interface TripulanteFicticio {
  id: string;
  codinome: string;
  sexo: Sexo;
  idadeAnos: number;
  massaPreVooKg: number;
  evidencia: string;
  /** Valor típico de cada indicador na linha de base do tripulante (null: sem valor). */
  linhaDeBase: Record<string, number | null>;
  disponibilidadeHemoglobinaEmVoo?: string;
  [outros: string]: unknown;
}

export interface CenarioC1 {
  indicadorId: string;
  evento: {
    valorBase: number;
    valorEvento: number;
    unidade: string;
    duracaoMin: number;
    delta: number;
    deltaPercentual: number;
  };
  coocorrencia: { pvtTempoReacaoDeltaPercentual: number; dorCabecaPontos: number; status: string };
  janelaRegraHoras: number;
  regraProjeto: string;
}

export interface CenarioC2 {
  indicadorId: string;
  gatilho: {
    diaMissao: number;
    inicioHoraGmt: string;
    duracaoHoras: number;
    fluxoProtonsGoesMax: number;
    unidade: string;
    eventoDonki: string;
  };
}

export interface CenarioC3 {
  indicadores: string[];
  eventos: Array<{ dia: number; acuidadeDelta: number; unidadeAcuidade: string; amsler: string }>;
  janelaRegra: { dias: number; bordaInclusiva: boolean; nota: string };
}

export interface CenarioC4 {
  indicadores: string[];
  sono: { baseMin: number; eventoMin: number; noites: number; oportunidadeMin: number; unidade: string };
  ruido: { valor: number; unidade: string; duracaoMin: number; nota: string };
  pvtTempoReacaoDeltaPercentual: number;
  evaProxima: { dia: number; diaRelativo: string };
}

export interface CenarioC5 {
  indicadores: string[];
  agua: { baseMlDia: number; eventoMlDia: number; duracaoDias: number };
  urina: { baseCategoria: number; eventoCategoria: number; escala: string; atrasoHorasMin: number; atrasoHorasMax: number };
}

export interface CenariosSimulacao {
  C1: CenarioC1;
  C2: CenarioC2;
  C3: CenarioC3;
  C4: CenarioC4;
  C5: CenarioC5;
}

export interface PerfisSimulacao {
  esquema: string;
  descricao: string;
  indicadores: PerfilIndicadorSimulacao[];
  linhaDeBaseAmbiental: Record<string, unknown>;
  tripulantesFicticios: {
    modo4: string[];
    modo7: string[];
    lista: TripulanteFicticio[];
  };
  roteiroMissao: Record<string, unknown>;
  cenarios: CenariosSimulacao;
}

// --- orbita-ia-base.json ----------------------------------------------------------------------

export interface EntradaBaseIa {
  id: string;
  perguntas: string[];
  resposta: string;
  maisDetalhes?: string;
  indicadores: string[];
  regioes: string[];
  fontes: Array<{ titulo: string; url: string }>;
}

export interface OrbitaIaBase {
  versao: string;
  geradoEm: string;
  aviso: string;
  entradas: EntradaBaseIa[];
}

// --- resultado de carregarConfig() ------------------------------------------------------------

export interface ConfigOrbita {
  indicadores: Indicador[];
  indicadorPorId: Readonly<Record<string, Indicador>>;
  regrasCruzamento: RegraCruzamento[];
  regraPorId: Readonly<Record<string, RegraCruzamento>>;
  perfis: PerfisSimulacao;
  iaBase: OrbitaIaBase;
}
