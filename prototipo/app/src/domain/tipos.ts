/**
 * Entidades do `docs/06` (modelo de dados) e formato do `prototipo/config/indicadores.json`.
 * Nomes de domínio em português, iguais aos do documento. Horários sempre em UTC (ISO 8601).
 */

import type { Nivel } from "./estado";
import type { SintomaId } from "./sintomas";

/** Ids das 12 regiões do mapa corporal (`docs/18`, M05; `docs/07`, T2; `vestibular` é novo). */
export type RegiaoId =
  | "cerebro"
  | "olhos"
  | "ouvidos"
  | "vestibular"
  | "coracao"
  | "pulmoes"
  | "sangue"
  | "digestao"
  | "rins"
  | "ossos"
  | "musculos"
  | "corpo";

export type Plataforma = "ISS" | "Gateway" | "Lua" | "Marte";
export type Sexo = "feminino" | "masculino";

/** `docs/06`, 2.1. */
export interface Missao {
  id: string;
  nome: string;
  plataforma: Plataforma;
  inicioUtc: string;
  atrasoComunicacaoSeg: number;
}

/** `docs/06`, 2.3. */
export interface Modulo {
  id: string;
  nome: string;
  segmento: "USOS" | "ROS";
}

export type Audiencia = "so_eu" | "cmo" | "medico_voo" | "buddy" | "tripulacao";
export type DadoCompartilhavel = "estado_sistemas" | "valores" | "modulo" | "mente";

/** `docs/06`, 2.2: o que o tripulante deixa uma audiência ver. `so_eu` não concede nada a ninguém. */
export interface Consentimento {
  dado: DadoCompartilhavel;
  audiencia: Audiencia;
  buddyId?: string;
  validoAteUtc?: string;
  atualizadoUtc: string;
}

/** Horário programado de sono em GMT, formato "hh:mm" (`docs/06`, 2.2). */
export interface HorarioSono {
  inicio: string;
  fim: string;
}

/** `docs/06`, 2.2, com `sexo` e `alturaCm` do cadastro do ORBITA (`docs/18`, M01). */
export interface Tripulante {
  id: string;
  codinome: string;
  funcao: string;
  agencia: string;
  massaPreVooKg: number;
  sexo: Sexo;
  alturaCm: number;
  perfilSonoro: string;
  usaOculosOrbit: boolean;
  horarioSono: HorarioSono;
  moduloAtual: string;
  compartilhamento: Consentimento[];
}

export type TipoDispositivo = "vestivel" | "eclss" | "radiacao" | "medico" | "exercicio" | "orbit" | "manual";

/** `docs/06`, 2.4. */
export interface Dispositivo {
  id: string;
  tipo: TipoDispositivo;
  nome: string;
  tripulanteId?: string;
  moduloId?: string;
}

export type Origem = "automatica" | "manual" | "exame" | "simulada" | "ao_vivo" | "historica";
export type QualidadeLeitura = "boa" | "duvidosa" | "invalida";
export type Disponibilidade = "disponivel" | "aguardando_transferencia" | "pendente_laboratorio";
export type SitioOsseo = "quadril" | "coluna" | "colo_femoral";

/** Banda de oitava de uma medida de ruído (Hz e dB). */
export interface BandaRuido {
  frequenciaHz: number;
  db: number;
}

/**
 * Contexto que algumas regras de `regraCor` exigem além do valor (`indicadores.json`):
 * sítio da densidade óssea, frequência ou bandas do ruído.
 */
export interface ContextoLeitura {
  sitio?: SitioOsseo;
  frequenciaHz?: number;
  bandas?: BandaRuido[];
}

/** `docs/06`, 2.5: toda medida, venha de onde vier, vira uma `Leitura`. */
export interface Leitura {
  id: string;
  indicadorId: string;
  valor: number;
  unidade: string;
  valorOriginal?: number;
  unidadeOriginal?: string;
  instanteUtc: string;
  tripulanteId?: string;
  moduloId?: string;
  dispositivoId?: string;
  origem: Origem;
  conjuntoDados?: string;
  qualidade?: QualidadeLeitura;
  disponibilidade?: Disponibilidade;
  instanteDisponivelUtc?: string;
  protocolo?: string;
  contexto?: ContextoLeitura;
}

// ---------------------------------------------------------------------------
// Indicador e regraCor (formato real de prototipo/config/indicadores.json)
// ---------------------------------------------------------------------------

export type DirecaoIndicador = "acima" | "abaixo" | "ambos";
export type ClasseIndicador = "requisito_oficial" | "referencia_terrestre" | "linha_de_base" | "gatilho_sintoma";
export type TipoRegraCor = "limiar" | "linha_de_base" | "somente_sintoma";
export type OrigemRegra = "OFICIAL" | "DIRETRIZ-TERRA" | "[INFERÊNCIA]";

export interface Intervalo {
  min: number;
  max: number;
}

export interface PontoPoligono {
  temperaturaC: number;
  umidadePct: number;
}

export interface CurvaRuido {
  frequenciasHz: number[];
  limitesDb: number[];
}

export interface CurvaRuidoAplicavel {
  frequenciasHz: number[];
  NC50Ate30DiasDb: number[];
  NC40Mais30DiasDb: number[];
}

interface RegraCorBase {
  /** Nível proposto quando a condição é satisfeita (2 amarelo, 3 laranja). Vermelho só vem de sintoma. */
  nivel: Nivel;
  unidade: string;
  origem: OrigemRegra;
  texto: string;
  fonteUrl: string;
  requisito?: string;
  nivelDeUrgencia?: string;
  /** Número que não é limiar da NASA e só existe para a demonstração (`docs/03`, seção 5). */
  valorDeDemonstracao?: boolean;
  /** A regra só vale dentro da regra de cruzamento citada (por exemplo `R-CO2-01`). */
  aplicaSomenteEmRegra?: string;
  justificativa?: string;
  contextoNecessario?: string;
  repeticoes?: number;
  unidadeRepeticoes?: string;
  criterio?: string;
  dependencias?: string[];
  fechamentoDoPoligono?: string;
  operadorDeCurva?: string;
  natureza?: string;
  nivelMaximoSemSintomaDaRegra?: number;
}

export type OperadorComparacao = "<" | "<=" | ">" | ">=";

/** Cada operador existente no JSON, com o formato do seu `valor`. */
export type RegraCorRegra = RegraCorBase &
  (
    | { operador: OperadorComparacao; valor: number }
    | { operador: "fora_do_intervalo_inclusivo" | "entre_inclusivo"; valor: Intervalo }
    | { operador: "fora_da_faixa_por_contexto"; valor: { homens: Intervalo; mulheres: Intervalo } }
    | { operador: "abaixo_do_alvo_por_sitio"; valor: { quadril: number; coluna: number; coloFemoral: number } }
    | { operador: "fora_do_poligono"; valor: PontoPoligono[] }
    | { operador: "qualquer_banda_acima_da_curva"; valor: CurvaRuido }
    | { operador: "qualquer_banda_acima_da_curva_aplicavel"; valor: CurvaRuidoAplicavel }
  );

export type OperadorRegraCor = RegraCorRegra["operador"];

/** Parâmetros da comparação com a linha de base pessoal (`docs/04`, A2 e A3). */
export interface LinhaDeBaseRegra {
  zAmarelo: number;
  zPersistenteAcima: number;
  repeticoesParaPersistente: number;
  unidadeZScore: string;
  unidadeRepeticoes: string;
  minimoLeiturasValidas: number;
  unidadeMinimoLeiturasValidas: string;
  nuncaVermelho: boolean;
  fonte: string;
  fonteUrl: string;
}

export interface SintomaRegra {
  sintoma: string;
  nivel: Nivel;
  origem: string;
  fonteUrl: string;
  texto: string;
  valorDeDemonstracao?: boolean;
  aplicaSomenteEmRegra?: string;
}

/** Camada numérica que o motor executa; o único caminho para o nível 4 são os `sintomas`. */
export interface RegraCor {
  tipo: TipoRegraCor;
  regras: RegraCorRegra[];
  nivelMaximoSemSintoma: number;
  linhaDeBase: LinhaDeBaseRegra | null;
  sintomas?: SintomaRegra[];
}

export interface FonteIndicador {
  etiqueta: string;
  referencia: string;
  url: string;
}

export interface OrientacoesIndicador {
  amarelo: string[];
  vermelho: string[];
  colega: string;
  gatilhoParaSubir: string;
}

export interface ExemplosTeste {
  verde: number | null;
  amarelo: number | null;
  vermelho: number | null;
  unidade: string;
  contexto: string;
  fonteUrl: string;
  campoAvaliado?: string;
  valorPareado?: number;
  unidadePareada?: string;
  frequenciaTeste?: number;
  unidadeFrequenciaTeste?: string;
  diasNaMissaoTeste?: number;
  unidadeDiasNaMissaoTeste?: string;
  contextoVerde?: string;
  contextoAmarelo?: string;
  contextoVermelho?: string;
  motivoSemExemploVerde?: string;
  motivoSemExemploAmarelo?: string;
  motivoSemExemploVermelho?: string;
  demonstracaoSeparada?: string;
}

export interface FaixasIndicador {
  valoresPublicados?: Record<string, unknown>;
  etiqueta: string;
  rotulo?: string;
  verde?: { criterio: string; fonteDoValor: string };
  amarelo?: { criterio: string; fonteDoValor: string };
  vermelho?: { criterio: string; fonteDoValor: string };
  demonstracao?: Record<string, unknown>;
  justificativa?: string;
}

/** `docs/06`, 2.6, com os campos acrescentados na consolidação dos limiares. */
export interface Indicador {
  id: string;
  nome: string;
  escopo: "tripulante" | "ambiente";
  regiaoCorpo: string;
  unidade: string;
  direcao: DirecaoIndicador;
  classe: ClasseIndicador;
  usaLinhaDeBase: boolean;
  validadeHoras: number;
  fonte: FonteIndicador;
  explicacao: string;
  orientacoes: OrientacoesIndicador;
  faixas?: FaixasIndicador;
  gatilhosSintoma?: string[];
  regraCor: RegraCor;
  exemplosTeste: ExemplosTeste;
  valorDeDemonstracao?: boolean;
  demonstracao?: Record<string, unknown>;
  observacaoEscala?: string;
  experimental?: boolean;
  observacaoOrigem?: string;
  conversaoEntrada?: {
    formula: string;
    entradas: string[];
    constante: string;
    exemplo: string;
    fonteUrl: string;
  };
}

// ---------------------------------------------------------------------------
// Regras de cruzamento (array `regrasCruzamento` do indicadores.json)
// ---------------------------------------------------------------------------

export interface CondicaoCruzamentoSimples {
  indicadorId?: string;
  campo: string;
  operador: string;
  valor: number | boolean;
  unidade?: string;
  etiqueta?: string;
  valorDeDemonstracao?: boolean;
}

export interface CondicaoCruzamento extends Partial<CondicaoCruzamentoSimples> {
  grupo?: string;
  alternativas?: CondicaoCruzamentoSimples[];
}

export interface OrientacoesCruzamento {
  amarelo: string[];
  vermelho: string[];
  colega: string;
  gatilhoParaSubir: string;
}

export interface FonteRegra extends FonteIndicador {
  especificacaoLocal?: string;
}

/** Regra de cruzamento em formato declarativo (`docs/04`, parte B). */
export interface RegraCruzamento {
  id: string;
  condicoes: CondicaoCruzamento[];
  janelaMin: number | null;
  nivel: Nivel | null;
  hipotese: string;
  duracao?: string;
  escalonamento?: { nivel: Nivel | null; quando: string[] };
  valoresDeDemonstracao?: Array<Record<string, unknown>>;
  valorDeDemonstracao?: boolean;
  orientacoes: OrientacoesCruzamento;
  fonte: FonteRegra;
  contextoOpcional?: string;
  agravante?: string;
  apenasContextualiza?: boolean;
}

// ---------------------------------------------------------------------------
// Linha de base, autoavaliação, sono, clima espacial
// ---------------------------------------------------------------------------

/** `docs/06`, 2.7. */
export interface LinhaDeBase {
  tripulanteId: string;
  indicadorId: string;
  media: number;
  desvioPadrao: number;
  n: number;
  periodo: { inicioUtc: string; fimUtc: string };
  estado: "em_formacao" | "pronta";
}

export type TipoAutoavaliacao = "checkin" | "pvt" | "amsler" | "acuidade" | "foto_urina" | "hidratacao";

export interface RespostasAutoavaliacao {
  sono?: number;
  fadiga?: number;
  humor?: number;
  /** Sintomas marcados no check-in; cada sintoma é um item separado, nunca somado. */
  sintomas?: SintomaId[];
  /** Intensidade da dor de cabeça, de 0 a 10. */
  dorCabeca?: number;
  [campo: string]: number | string | boolean | string[] | undefined;
}

/** `docs/06`, 2.8. */
export interface Autoavaliacao {
  id: string;
  tripulanteId: string;
  instanteUtc: string;
  tipo: TipoAutoavaliacao;
  respostas: RespostasAutoavaliacao;
  resultado?: Record<string, number>;
  leiturasGeradas?: string[];
}

export type EstagioSono = "W" | "N1" | "N2" | "N3" | "REM";

/** `docs/06`, 2.9. */
export interface SessaoSono {
  tripulanteId: string;
  inicioUtc: string;
  fimUtc: string;
  epocas: Array<{ t: number; estagio: EstagioSono }>;
  fonte: "orbit" | "actigrafia" | "simulada";
  metricas: { tstMin: number; eficienciaPct: number; latenciaMin: number; wasoMin: number };
  condicaoEstudo: "com_orbit" | "sem_orbit" | "fora_do_estudo";
  paisagemSonora?: { perfil: string; inicioUtc: string; fimUtc: string };
}

/** `docs/06`, 2.10. */
export interface EventoClimaEspacial {
  id: string;
  tipo: "SEP" | "FLR" | "CME" | "GST" | "FLUXO_PROTONS";
  inicioUtc: string;
  fimUtc: string;
  intensidade: number;
  unidade: string;
  fonte: "NOAA_SWPC" | "NASA_DONKI" | "simulada";
  urlOrigem?: string;
}

/** Atividade crítica do plano da missão (EVA, chegada de veículo, braço robótico), `docs/04`, R-SONO-01. */
export interface AtividadeCritica {
  id: string;
  tipo: "EVA" | "chegada_veiculo" | "braco_robotico" | "outra";
  inicioUtc: string;
  /** Vazio ou ausente: vale para toda a tripulação. */
  tripulanteIds?: string[];
}

/** Onde o tripulante esteve; serve ao "módulo mais ocupado nas últimas 6 h" da R-AMB-01. */
export interface PresencaModulo {
  tripulanteId: string;
  moduloId: string;
  inicioUtc: string;
  fimUtc?: string;
}

// ---------------------------------------------------------------------------
// Alerta (`docs/06`, 2.11)
// ---------------------------------------------------------------------------

export type TipoAlerta = "limiar" | "linha_de_base" | "tendencia" | "cruzamento" | "anomalia";
export type EstadoAlerta = "aberto" | "reconhecido" | "resolvido";
export type DestinoNotificacao = "tripulante" | "cmo" | "medico_voo" | "controle_ambiental";

/** O dado que sustenta o alerta: valor com unidade, estado e horário. */
export interface Evidencia {
  leituraId?: string;
  autoavaliacaoId?: string;
  indicadorId: string;
  /** Campo da condição em `regrasCruzamento` (por exemplo `ewma_ppco2`). */
  campo?: string;
  valor: number | string;
  unidade: string;
  nivel: Nivel;
  instanteUtc: string;
  origem?: Origem;
}

export interface Alerta {
  id: string;
  nivel: Nivel;
  tipo: TipoAlerta;
  regraId: string;
  tripulanteId?: string;
  moduloId?: string;
  /** Regiões do mapa que o alerta eleva (`docs/18`, M05: o R-CO2-01 liga Pulmões). */
  regioes: RegiaoId[];
  titulo: string;
  evidencias: Evidencia[];
  orientacoes: string[];
  gatilhoParaSubir: string;
  /** Frase "Como ajudar" do Monitor geral (`orientacoes.colega`). */
  orientacaoColega?: string;
  fonte: FonteIndicador;
  estado: EstadoAlerta;
  notificacoes: Array<{ destino: DestinoNotificacao; estado: "enviado" | "na_fila" | "nao_aplicavel" }>;
  criadoUtc: string;
  atualizadoUtc: string;
  /** R-AMB-01: só contextualiza, não muda nível nem conta como alerta aberto. */
  contextual?: boolean;
  /** Fatores ambientais possíveis (R-AMB-01) anexados ao alerta do mesmo tripulante. */
  fatoresAmbientais?: Evidencia[];
  /** Outros indicadores fora do padrão hoje, que não disparam a regra (contexto do dia, `docs/19`, seção 14). */
  contextoDoDia?: Evidencia[];
}
