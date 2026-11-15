/**
 * Sintomas do check-in (`docs/19`, seção 6, "Sintomas que mudam o nível") e como cada um liga a
 * uma região do mapa (`docs/18`, seção 7, item 7) e às entradas `regraCor.sintomas` do
 * `indicadores.json`. Cada sintoma é um item separado, nunca somado.
 */

import type { RegiaoId } from "./tipos";

export type SintomaId =
  | "dor_peito"
  | "desmaio"
  | "falta_ar"
  | "confusao_deficit"
  | "apoio_agora"
  | "perda_visual_subita"
  | "visao_dupla"
  | "febre_mal_estar"
  | "tarefa_critica_insegura"
  | "nao_consigo_comer_beber"
  | "dor_cabeca"
  | "tontura"
  | "dificuldade_concentracao"
  | "visao_borrada"
  | "nausea"
  | "irritacao_olhos_pele"
  | "sono_ruim";

/**
 * Ligação com uma entrada de `regraCor.sintomas`. O `trecho` precisa aparecer (sem acento e sem
 * diferença de caixa) no campo `sintoma` da entrada do indicador; um teste garante que cada
 * ligação existe no JSON.
 */
export interface LigacaoSintoma {
  indicadorId: string;
  trecho: string;
}

export interface DefinicaoSintoma {
  id: SintomaId;
  regiao: RegiaoId;
  ligacoes: LigacaoSintoma[];
}

export const SINTOMAS: readonly DefinicaoSintoma[] = [
  {
    id: "dor_peito",
    regiao: "coracao",
    ligacoes: [
      { indicadorId: "fc_repouso", trecho: "toracica" },
      { indicadorId: "pa_sistolica", trecho: "toracica" },
      { indicadorId: "pa_diastolica", trecho: "toracica" },
      { indicadorId: "dor", trecho: "toracica" },
    ],
  },
  {
    id: "desmaio",
    regiao: "coracao",
    ligacoes: [
      { indicadorId: "fc_repouso", trecho: "sincope" },
      { indicadorId: "pa_sistolica", trecho: "sincope" },
      { indicadorId: "pa_diastolica", trecho: "sincope" },
      { indicadorId: "dor", trecho: "sincope" },
    ],
  },
  {
    id: "falta_ar",
    regiao: "pulmoes",
    ligacoes: [
      { indicadorId: "fc_repouso", trecho: "falta de ar" },
      { indicadorId: "spo2", trecho: "respiratoria" },
      { indicadorId: "frequencia_respiratoria", trecho: "respiratoria" },
    ],
  },
  {
    id: "confusao_deficit",
    regiao: "cerebro",
    ligacoes: [
      { indicadorId: "pa_sistolica", trecho: "confusao" },
      { indicadorId: "pa_diastolica", trecho: "confusao" },
      { indicadorId: "dor", trecho: "perda subita" },
    ],
  },
  { id: "apoio_agora", regiao: "cerebro", ligacoes: [{ indicadorId: "humor", trecho: "risco imediato" }] },
  {
    id: "perda_visual_subita",
    regiao: "olhos",
    ligacoes: [
      { indicadorId: "acuidade_perto", trecho: "perda visual subita" },
      { indicadorId: "amsler_distorcao", trecho: "perda visual repentina" },
    ],
  },
  { id: "visao_dupla", regiao: "olhos", ligacoes: [{ indicadorId: "acuidade_perto", trecho: "diplopia" }] },
  { id: "febre_mal_estar", regiao: "corpo", ligacoes: [{ indicadorId: "temperatura_corporal", trecho: "febre" }] },
  {
    id: "tarefa_critica_insegura",
    regiao: "cerebro",
    ligacoes: [
      { indicadorId: "sono_tst", trecho: "incapacidade de cumprir" },
      { indicadorId: "fadiga", trecho: "incapacidade de cumprir" },
    ],
  },
  {
    id: "nao_consigo_comer_beber",
    regiao: "digestao",
    ligacoes: [{ indicadorId: "apetite", trecho: "incapacidade de comer" }],
  },
  { id: "dor_cabeca", regiao: "cerebro", ligacoes: [{ indicadorId: "dor", trecho: "dor nova ou persistente" }] },
  { id: "tontura", regiao: "vestibular", ligacoes: [] },
  { id: "dificuldade_concentracao", regiao: "cerebro", ligacoes: [] },
  { id: "visao_borrada", regiao: "olhos", ligacoes: [] },
  { id: "nausea", regiao: "vestibular", ligacoes: [] },
  { id: "irritacao_olhos_pele", regiao: "olhos", ligacoes: [] },
  { id: "sono_ruim", regiao: "cerebro", ligacoes: [] },
];

export const SINTOMA_POR_ID: Readonly<Record<SintomaId, DefinicaoSintoma>> = Object.fromEntries(
  SINTOMAS.map((s) => [s.id, s]),
) as Record<SintomaId, DefinicaoSintoma>;

/** Sintomas que pertencem à Mente: não saem para quem não recebeu o dado `mente` (`docs/06`). */
export const SINTOMAS_DA_MENTE: readonly SintomaId[] = ["apoio_agora", "dificuldade_concentracao"];

/**
 * Validade do check-in diário: "Avaliação diária: últimas 24 horas" (`docs/19`, seção 4, B).
 * Vale para sintomas sem ligação com indicador; os demais usam a `validadeHoras` do indicador.
 */
export const VALIDADE_SINTOMA_HORAS = 24;

/** Sintoma relatado e ainda dentro da validade. */
export interface SintomaRelatado {
  sintomaId: SintomaId;
  instanteUtc: string;
  autoavaliacaoId: string;
  /** Intensidade de 0 a 10, quando o sintoma tem escala (dor de cabeça). */
  intensidade?: number;
}

/** Minúsculas e sem acento, para comparar o `trecho` com o texto do JSON. */
export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
