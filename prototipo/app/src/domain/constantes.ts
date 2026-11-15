/**
 * Constantes do domínio: as 12 regiões do mapa (`docs/18`, M05), os 7 blocos da tripulação
 * (`docs/19`, seção 7) e os 5 níveis de estado (`docs/18`, seção 2.2).
 * Textos de tela ficam em `src/i18n/`; aqui só ids, ligações e símbolos.
 */

import type { BlocoTripulacao, Nivel } from "./estado";
import type { RegiaoId } from "./tipos";

export interface LinkHrp {
  /** Identificador estável do risco no Human Research Program (último trecho da URL). */
  id: string;
  url: string;
}

export interface DefinicaoRegiao {
  id: RegiaoId;
  /** Posição na lista de 12 regiões da M05. */
  ordem: number;
  /** Indicadores do tripulante ligados à região (`regiaoCorpo` do `indicadores.json`). */
  indicadores: readonly string[];
  /** Indicadores de ambiente que só aparecem como contexto, sem colorir o corpo. */
  contexto: readonly string[];
  hrp: readonly LinkHrp[];
}

const hrp = (caminho: string): LinkHrp => {
  const partes = caminho.split("/").filter(Boolean);
  return { id: partes[partes.length - 1] ?? caminho, url: `https://www.nasa.gov/${caminho}/` };
};

/** As 12 regiões do mapa corporal, na ordem da M05. `vestibular` é novo; `pele` saiu da versão mobile. */
export const REGIOES: readonly DefinicaoRegiao[] = [
  {
    id: "cerebro",
    ordem: 1,
    indicadores: ["fadiga", "sono_tst", "sono_eficiencia", "humor", "pvt_tempo_reacao", "pvt_lapsos", "eog_piscadas"],
    contexto: [],
    hrp: [
      hrp("reference/risk-of-behavioral-conditions-and-psychiatric-disorders"),
      hrp("reference/risk-from-inadequate-sleep-and-irregular-schedules"),
    ],
  },
  {
    id: "olhos",
    ordem: 2,
    indicadores: ["acuidade_perto", "amsler_distorcao"],
    contexto: [],
    hrp: [hrp("reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans")],
  },
  {
    id: "ouvidos",
    ordem: 3,
    indicadores: [],
    contexto: ["ruido_trabalho", "ruido_dormitorio"],
    hrp: [hrp("hrp/hazard-hostile-closed-environments")],
  },
  {
    id: "vestibular",
    ordem: 4,
    indicadores: [],
    contexto: [],
    hrp: [hrp("reference/risk-of-altered-sensorimotor-and-vestibular-function"), hrp("hrp/hazard-gravity-fields")],
  },
  {
    id: "coracao",
    ordem: 5,
    indicadores: ["fc_repouso", "hrv_rmssd", "pa_sistolica", "pa_diastolica"],
    contexto: [],
    hrp: [hrp("reference/risk-of-cardiovascular-adaptations")],
  },
  {
    id: "pulmoes",
    ordem: 6,
    indicadores: ["spo2", "frequencia_respiratoria"],
    contexto: ["ppco2_modulo", "pio2_cabine"],
    hrp: [hrp("reference/risk-of-hypoxia"), hrp("reference/risk-of-decompression-sickness")],
  },
  {
    id: "sangue",
    ordem: 7,
    indicadores: ["hemoglobina", "glicose"],
    contexto: [],
    hrp: [
      hrp("reference/risk-of-altered-immune-system-responses"),
      hrp("reference/risk-of-host-microorganism-interactions"),
    ],
  },
  {
    id: "digestao",
    ordem: 8,
    indicadores: ["apetite", "massa_corporal"],
    contexto: [],
    hrp: [hrp("reference/risk-of-inadequate-food-and-nutrition")],
  },
  {
    id: "rins",
    ordem: 9,
    indicadores: ["agua_ingerida", "cor_urina"],
    contexto: [],
    hrp: [hrp("reference/risk-of-spaceflight-induced-bone-changes"), hrp("humans-in-space/the-human-body-in-space")],
  },
  {
    id: "ossos",
    ordem: 10,
    indicadores: ["densidade_ossea"],
    contexto: [],
    hrp: [hrp("reference/risk-of-spaceflight-induced-bone-changes")],
  },
  {
    id: "musculos",
    ordem: 11,
    indicadores: ["tempo_exercicio", "carga_ared"],
    contexto: [],
    hrp: [
      hrp("reference/risk-of-reduced-cardiorespiratory-and-musculoskeletal-fitness"),
      hrp("reference/risk-of-injury-and-compromised-performance-from-extravehicular-activity-eva"),
      hrp("reference/risk-of-injury-from-dynamic-loads"),
    ],
  },
  {
    id: "corpo",
    ordem: 12,
    indicadores: ["dose_acumulada", "temperatura_corporal", "dor"],
    contexto: [],
    hrp: [
      hrp("hrp/hazard-space-radiation"),
      hrp("reference/risk-of-radiation-induced-cancers"),
      hrp("hrp/hazard-isolation-and-confinement"),
    ],
  },
];

export const REGIAO_IDS: readonly RegiaoId[] = REGIOES.map((r) => r.id);

export const REGIAO_POR_ID: Readonly<Record<RegiaoId, DefinicaoRegiao>> = Object.fromEntries(
  REGIOES.map((r) => [r.id, r]),
) as Record<RegiaoId, DefinicaoRegiao>;

export interface DefinicaoBloco {
  id: BlocoTripulacao;
  regiao: RegiaoId;
  /** Indicadores que decidem o bloco; o nível é o pior entre eles. */
  indicadores: readonly string[];
}

/**
 * Os 7 blocos do cartão da tripulação, sempre na mesma ordem (`docs/19`, seção 7). Mente é o pior
 * entre fadiga, humor e estresse; o `indicadores.json` ainda não tem indicador de estresse, então
 * hoje são fadiga e humor.
 */
export const BLOCOS_TRIPULACAO: readonly DefinicaoBloco[] = [
  { id: "coracao", regiao: "coracao", indicadores: ["fc_repouso"] },
  { id: "oxigenacao", regiao: "pulmoes", indicadores: ["spo2"] },
  { id: "temperatura", regiao: "corpo", indicadores: ["temperatura_corporal"] },
  { id: "sono", regiao: "cerebro", indicadores: ["sono_tst"] },
  { id: "hidratacao", regiao: "rins", indicadores: ["agua_ingerida"] },
  { id: "radiacao", regiao: "corpo", indicadores: ["dose_acumulada"] },
  { id: "mente", regiao: "cerebro", indicadores: ["fadiga", "humor"] },
];

export const BLOCO_IDS: readonly BlocoTripulacao[] = BLOCOS_TRIPULACAO.map((b) => b.id);

/** Indicadores que pertencem à Mente e por isso não contam no nível geral de quem não a compartilhou. */
export const INDICADORES_DA_MENTE: readonly string[] = ["fadiga", "humor"];

export interface DefinicaoNivel {
  nivel: Nivel;
  id: "sem_dado" | "normal" | "atencao" | "alerta" | "critico";
  /** Token de cor em `tokens.css` (`docs/18`, seção 2.2); a cor nunca aparece sozinha. */
  token: string;
  /** Símbolo de reserva: cor nunca sozinha (✓ normal, ! atenção, ✕ acionar médico, ? sem dado). */
  simbolo: "?" | "✓" | "!" | "✕";
  /** Nome do ícone Lucide. */
  icone: string;
}

export const NIVEIS: Readonly<Record<Nivel, DefinicaoNivel>> = {
  0: { nivel: 0, id: "sem_dado", token: "--estado-sem-dado", simbolo: "?", icone: "CircleHelp" },
  1: { nivel: 1, id: "normal", token: "--estado-normal", simbolo: "✓", icone: "CircleCheck" },
  2: { nivel: 2, id: "atencao", token: "--estado-atencao", simbolo: "!", icone: "CircleAlert" },
  3: { nivel: 3, id: "alerta", token: "--estado-alerta", simbolo: "✕", icone: "CircleX" },
  4: { nivel: 4, id: "critico", token: "--estado-critico", simbolo: "✕", icone: "OctagonX" },
};

/** Regiões que cada regra de cruzamento eleva (`docs/18`, M05: o R-CO2-01 liga Pulmões). R-AMB-01 só contextualiza. */
export const REGIOES_DA_REGRA: Readonly<Record<string, readonly RegiaoId[]>> = {
  "R-CO2-01": ["pulmoes"],
  "R-RAD-01": ["corpo"],
  "R-SANS-01": ["olhos"],
  "R-SONO-01": ["cerebro"],
  "R-HID-01": ["rins"],
  "R-AMB-01": [],
};

export function nivelMaximo(...niveis: Nivel[]): Nivel {
  let maior: Nivel = 0;
  for (const n of niveis) if (n > maior) maior = n;
  return maior;
}
