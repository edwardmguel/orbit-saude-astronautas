/**
 * Peças comuns das regras de cruzamento (`docs/04`, parte B). Cada regra é uma função pura que
 * recebe o contexto (leituras, autoavaliações, plano da missão) e devolve `Alerta | null` com as
 * evidências, o id da regra e a fonte. Os números vêm de `regrasCruzamento` e de `regraCor` do
 * `indicadores.json`; nada é fixo aqui.
 */

import { REGIOES_DA_REGRA } from "../../domain/constantes";
import type { EntradaMotor, Nivel } from "../../domain/estado";
import type { SintomaId, SintomaRelatado } from "../../domain/sintomas";
import { VALIDADE_SINTOMA_HORAS } from "../../domain/sintomas";
import { minutosEntre, paraMs } from "../../domain/tempo";
import type {
  Alerta,
  Autoavaliacao,
  CondicaoCruzamentoSimples,
  DestinoNotificacao,
  Evidencia,
  Indicador,
  Leitura,
  Modulo,
  RegraCruzamento,
  Tripulante,
} from "../../domain/tipos";

export interface ContextoCruzamento {
  agoraUtc: string;
  entrada: EntradaMotor;
  indicadorPorId: Readonly<Record<string, Indicador>>;
  regraPorId: Readonly<Record<string, RegraCruzamento>>;
  moduloPorId: Readonly<Record<string, Modulo>>;
}

export function criarContexto(entrada: EntradaMotor): ContextoCruzamento {
  return {
    agoraUtc: entrada.agoraUtc,
    entrada,
    indicadorPorId: Object.fromEntries(entrada.indicadores.map((i) => [i.id, i])),
    regraPorId: Object.fromEntries(entrada.regrasCruzamento.map((r) => [r.id, r])),
    moduloPorId: Object.fromEntries(entrada.modulos.map((m) => [m.id, m])),
  };
}

/** Todas as condições de uma regra, achatando as `alternativas`. */
function condicoesDaRegra(regra: RegraCruzamento): CondicaoCruzamentoSimples[] {
  const todas: CondicaoCruzamentoSimples[] = [];
  for (const c of regra.condicoes) {
    if (c.alternativas) todas.push(...c.alternativas);
    if (c.campo !== undefined && c.operador !== undefined && c.valor !== undefined) {
      todas.push(c as CondicaoCruzamentoSimples);
    }
  }
  return todas;
}

/** Valor numérico da condição de `campo` na regra (por exemplo `ewma_ppco2` vale 2,8). */
export function valorDaCondicao(regra: RegraCruzamento, campo: string): number {
  const condicao = condicoesDaRegra(regra).find((c) => c.campo === campo);
  if (!condicao || typeof condicao.valor !== "number") {
    throw new Error(`A regra ${regra.id} não tem a condição numérica "${campo}" no indicadores.json.`);
  }
  return condicao.valor;
}

/** Limite de demonstração de uma regra de `regraCor` que vale só dentro de `regraId` (por exemplo dor >= 7 no R-CO2-01). */
export function valorDeRegraDemo(indicador: Indicador | undefined, regraId: string): number | undefined {
  const regra = indicador?.regraCor.regras.find((r) => r.aplicaSomenteEmRegra === regraId);
  return regra && typeof regra.valor === "number" ? regra.valor : undefined;
}

/** Nome do módulo sem o apelido entre parênteses: "Node 3 (Tranquility)" vira "Node 3". */
export function nomeCurtoDoModulo(modulo: Modulo | undefined, moduloId: string): string {
  return (modulo?.nome ?? moduloId).replace(/\s*\(.*\)\s*$/, "");
}

/** Sintomas do check-in mais recente que ainda vale (últimas 24 horas, `docs/19`, seção 4, B). */
export function sintomasRelatados(
  autoavaliacoes: readonly Autoavaliacao[],
  tripulanteId: string,
  agoraUtc: string,
): SintomaRelatado[] {
  const checkins = autoavaliacoes
    .filter((a) => a.tripulanteId === tripulanteId && a.tipo === "checkin" && paraMs(a.instanteUtc) <= paraMs(agoraUtc))
    .sort((a, b) => paraMs(a.instanteUtc) - paraMs(b.instanteUtc));
  const ultimo = checkins.at(-1);
  if (!ultimo || minutosEntre(ultimo.instanteUtc, agoraUtc) > VALIDADE_SINTOMA_HORAS * 60) return [];

  const ids = new Set<SintomaId>(ultimo.respostas.sintomas ?? []);
  const dor = ultimo.respostas.dorCabeca;
  if (typeof dor === "number" && dor > 0) ids.add("dor_cabeca");
  return [...ids].map((sintomaId) => {
    const relatado: SintomaRelatado = { sintomaId, instanteUtc: ultimo.instanteUtc, autoavaliacaoId: ultimo.id };
    if (sintomaId === "dor_cabeca" && typeof dor === "number") relatado.intensidade = dor;
    return relatado;
  });
}

/** Evidência apoiada numa leitura: valor com unidade, estado e horário. */
export function evidenciaDeLeitura(
  leitura: Leitura,
  campo: string,
  valor: number | string,
  unidade: string,
  nivel: Nivel,
): Evidencia {
  return {
    leituraId: leitura.id,
    indicadorId: leitura.indicadorId,
    campo,
    valor,
    unidade,
    nivel,
    instanteUtc: leitura.instanteUtc,
    origem: leitura.origem,
  };
}

/** Evidência de um sintoma relatado no check-in (não vem de uma `Leitura`). */
export function evidenciaDeSintoma(relatado: SintomaRelatado): Evidencia {
  const comIntensidade = relatado.intensidade !== undefined;
  return {
    autoavaliacaoId: relatado.autoavaliacaoId,
    indicadorId: "sintomas_checkin",
    campo: relatado.sintomaId,
    valor: comIntensidade ? (relatado.intensidade as number) : "relatado",
    unidade: comIntensidade ? "pontos, escala de 0 a 10" : "sintoma do check-in",
    nivel: 2,
    instanteUtc: relatado.instanteUtc,
    origem: "manual",
  };
}

export const tituloDaHipotese =(hipotese: string): string => hipotese.replace(/\.$/, "");

const DESTINOS_POR_REGRA: Readonly<Record<string, readonly DestinoNotificacao[]>> = {
  "R-CO2-01": ["tripulante", "cmo", "controle_ambiental", "medico_voo"],
  "R-RAD-01": ["tripulante", "cmo", "medico_voo"],
  "R-SANS-01": ["tripulante", "cmo", "medico_voo"],
  "R-SONO-01": ["tripulante", "cmo"],
  "R-HID-01": ["tripulante", "cmo"],
  "R-AMB-01": ["tripulante"],
};

export interface DadosAlerta {
  regra: RegraCruzamento;
  nivel: Nivel;
  tripulanteId?: string;
  moduloId?: string;
  titulo: string;
  evidencias: Evidencia[];
  criadoUtc: string;
  agoraUtc: string;
  contextual?: boolean;
}

/** Monta o `Alerta` com orientações, gatilho, fonte e fila de notificações vindos da regra. */
export function montarAlerta(dados: DadosAlerta): Alerta {
  const { regra, nivel } = dados;
  const destinos = DESTINOS_POR_REGRA[regra.id] ?? ["tripulante"];
  const sufixo = [dados.tripulanteId ?? "tripulacao", dados.moduloId].filter(Boolean).join(".");
  const alerta: Alerta = {
    id: `${regra.id}.${sufixo}`,
    nivel,
    tipo: "cruzamento",
    regraId: regra.id,
    regioes: [...(REGIOES_DA_REGRA[regra.id] ?? [])],
    titulo: dados.titulo,
    evidencias: dados.evidencias,
    orientacoes: [...(nivel >= 3 ? regra.orientacoes.vermelho : regra.orientacoes.amarelo)],
    gatilhoParaSubir: regra.orientacoes.gatilhoParaSubir,
    orientacaoColega: regra.orientacoes.colega,
    fonte: { etiqueta: regra.fonte.etiqueta, referencia: regra.fonte.referencia, url: regra.fonte.url },
    estado: "aberto",
    notificacoes: destinos.map((destino) => ({
      destino,
      estado: destino === "tripulante" ? ("enviado" as const) : ("na_fila" as const),
    })),
    criadoUtc: dados.criadoUtc,
    atualizadoUtc: dados.agoraUtc,
  };
  if (dados.tripulanteId !== undefined) alerta.tripulanteId = dados.tripulanteId;
  if (dados.moduloId !== undefined) alerta.moduloId = dados.moduloId;
  if (dados.contextual) alerta.contextual = true;
  return alerta;
}

/** Maior de uma lista de instantes ISO. */
export function maisRecente(instantes: readonly string[]): string {
  return instantes.reduce((a, b) => (paraMs(a) >= paraMs(b) ? a : b));
}

/** Menor de uma lista de instantes ISO. */
export function maisAntigo(instantes: readonly string[]): string {
  return instantes.reduce((a, b) => (paraMs(a) <= paraMs(b) ? a : b));
}

export type RegraDeCruzamento = (ctx: ContextoCruzamento, tripulante: Tripulante) => Alerta | null;
