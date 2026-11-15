/**
 * Estado entregue às telas (plano técnico, seção 3.2). É contrato: as interfaces abaixo só
 * ganham campos opcionais, nunca são renomeadas. As telas recebem o estado pronto do motor e
 * não calculam nível.
 */

import type {
  Alerta,
  Audiencia,
  AtividadeCritica,
  Autoavaliacao,
  EventoClimaEspacial,
  Indicador,
  Leitura,
  Missao,
  Modulo,
  Origem,
  PresencaModulo,
  RegraCruzamento,
  SessaoSono,
  Tripulante,
} from "./tipos";

/** 0 cinza (sem dado), 1 verde, 2 amarelo, 3 laranja, 4 vermelho. Estado de interface, sem unidade física. */
export type Nivel = 0 | 1 | 2 | 3 | 4;

export type BlocoTripulacao =
  | "coracao"
  | "oxigenacao"
  | "temperatura"
  | "sono"
  | "hidratacao"
  | "radiacao"
  | "mente";

export type MotivoEstado = "faixa" | "linha_de_base" | "sintoma" | "sem_dado" | "vencido" | "indisponivel";

export interface EstadoIndicador {
  indicadorId: string;
  tripulanteId: string | null; // null para indicador de ambiente
  nivel: Nivel;
  leitura?: Leitura; // a leitura avaliada (valor, unidade, origem, horário)
  linhaDeBase?: {
    media: number;
    dp: number;
    n: number;
    z?: number;
    /** |z| acima de `zPersistenteAcima` em leituras consecutivas: amarelo persistente (`docs/04`, A3). */
    persistente?: boolean;
  };
  motivo: MotivoEstado;
  textoRegra?: string; // texto da regra de regraCor que decidiu
  fonteUrl?: string;
  idadeMin?: number;
  /** Amostra coletada e ainda sem resultado (`pendente_laboratorio` ou `aguardando_transferencia`). */
  leituraPendente?: Leitura;
  /** Regra de cruzamento que fez este estado valer (`aplicaSomenteEmRegra`), quando houver. */
  regraAtivaId?: string;
}

export interface EstadoTripulante {
  tripulanteId: string;
  nivelGeral: Nivel;
  /** Nível geral sem a contribuição do bloco Mente, para audiências que não receberam a mente. */
  nivelGeralSemMente?: Nivel;
  moduloId?: string;
  indicadores: Record<string, EstadoIndicador>;
  regioes: Record<string, Nivel>; // as 12 regiões do docs/18, M05
  blocos: Record<BlocoTripulacao, { nivel: Nivel; indicadorId?: string }>;
}

export interface EstadoMissao {
  agoraUtc: string;
  tripulantes: Record<string, EstadoTripulante>;
  ambiente: Record<string, EstadoIndicador>; // por indicadorId, com o módulo na leitura
  /** Todos os módulos: `ambientePorModulo[moduloId][indicadorId]`. `ambiente` guarda o pior de cada indicador. */
  ambientePorModulo?: Record<string, Record<string, EstadoIndicador>>;
  alertas: Alerta[]; // Alerta do docs/06, 2.11, com evidências
}

/** Tudo o que o motor precisa para avaliar a missão. O relógio entra aqui: o motor nunca lê `Date.now()`. */
export interface EntradaMotor {
  agoraUtc: string;
  missao: Missao;
  tripulantes: Tripulante[];
  modulos: Modulo[];
  indicadores: Indicador[];
  regrasCruzamento: RegraCruzamento[];
  leituras: Leitura[];
  autoavaliacoes: Autoavaliacao[];
  sessoesSono?: SessaoSono[];
  eventosClima?: EventoClimaEspacial[];
  atividadesCriticas?: AtividadeCritica[];
  presencas?: PresencaModulo[];
}

/** Um bloco da tripulação como a audiência pode vê-lo. Sem consentimento, só `compartilhado: false`. */
export interface BlocoVisivel {
  bloco: BlocoTripulacao;
  /** false: a tela escreve "não compartilhado" em texto neutro, sem cor, sem clique, sem inferência. */
  compartilhado: boolean;
  nivel?: Nivel;
  /** Presentes só quando o tripulante compartilhou `valores` com a audiência. */
  valor?: number;
  unidade?: string;
  instanteUtc?: string;
  origem?: Origem;
}

/** Visão de um tripulante para uma audiência. Não carrega indicadores, leituras, sintomas nem observações. */
export interface EstadoTripulanteVisivel {
  tripulanteId: string;
  audiencia: Audiencia;
  /** Ausente quando o estado dos sistemas não foi compartilhado. */
  nivelGeral?: Nivel;
  /** Ausente quando o módulo não foi compartilhado. */
  moduloId?: string;
  blocos: Record<BlocoTripulacao, BlocoVisivel>;
  /** Faixa "Precisa de apoio" do Monitor geral: só com consentimento do estado e nível 3 ou 4. */
  precisaApoio: boolean;
  /** Nível 3 ou 4 sem consentimento: o app só diz que a atenção do CMO foi solicitada (`docs/18`, M16). */
  atencaoCmoSolicitada: boolean;
}
