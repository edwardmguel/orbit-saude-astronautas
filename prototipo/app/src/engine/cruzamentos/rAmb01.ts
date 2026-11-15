/**
 * R-AMB-01. Ambiente explica o sintoma (regra genérica). `docs/04`, parte B.
 *
 * Para cada sintoma relatado no check-in, procura grandezas ambientais fora do verde no módulo onde
 * o tripulante passou mais tempo nas últimas 6 horas (e o sono da última noite, quando a tabela
 * cita) e lista como "fatores ambientais possíveis". Só contextualiza: não muda nível, não afirma
 * causa. Roda depois da avaliação dos indicadores, porque lê os estados já calculados.
 */

import type { EstadoIndicador } from "../../domain/estado";
import type { SintomaId } from "../../domain/sintomas";
import { MS_POR_MINUTO, paraMs } from "../../domain/tempo";
import type { Alerta, Evidencia, Tripulante } from "../../domain/tipos";
import {
  evidenciaDeLeitura,
  evidenciaDeSintoma,
  montarAlerta,
  sintomasRelatados,
  tituloDaHipotese,
  type ContextoCruzamento,
} from "./comum";

export const ID_R_AMB_01 = "R-AMB-01";

/** Tabela sintoma → grandezas a verificar (`docs/04`, R-AMB-01). Luz, qualidade do ar e movimento não são monitorados. */
export const GRANDEZAS_POR_SINTOMA: Readonly<Partial<Record<SintomaId, readonly string[]>>> = {
  dor_cabeca: ["ppco2_modulo", "temperatura_cabine"],
  dificuldade_concentracao: ["ppco2_modulo", "ruido_trabalho", "sono_tst"],
  sono_ruim: ["ruido_dormitorio", "temperatura_cabine"],
  irritacao_olhos_pele: ["umidade_cabine"],
};

/** Módulo onde o tripulante mais ficou nas últimas 6 h (janela da regra); sem histórico, o módulo atual. */
export function moduloMaisOcupado(ctx: ContextoCruzamento, tripulante: Tripulante, janelaMin: number): string {
  const fim = paraMs(ctx.agoraUtc);
  const inicio = fim - janelaMin * MS_POR_MINUTO;
  const minutos = new Map<string, number>();
  for (const p of ctx.entrada.presencas ?? []) {
    if (p.tripulanteId !== tripulante.id) continue;
    const de = Math.max(paraMs(p.inicioUtc), inicio);
    const ate = Math.min(p.fimUtc ? paraMs(p.fimUtc) : fim, fim);
    if (ate > de) minutos.set(p.moduloId, (minutos.get(p.moduloId) ?? 0) + (ate - de) / MS_POR_MINUTO);
  }
  let melhor = tripulante.moduloAtual;
  let maior = 0;
  for (const [moduloId, m] of minutos) {
    if (m > maior) {
      maior = m;
      melhor = moduloId;
    }
  }
  return melhor;
}

export interface EstadosParaAmbiente {
  /** `ambientePorModulo[moduloId][indicadorId]`, já com as regras de cruzamento ativas aplicadas. */
  ambientePorModulo: Readonly<Record<string, Readonly<Record<string, EstadoIndicador>>>>;
  /** Indicadores do próprio tripulante, para o sono da última noite. */
  indicadoresDoTripulante: Readonly<Record<string, EstadoIndicador>>;
}

export function avaliarRAmb01(ctx: ContextoCruzamento, tripulante: Tripulante, estados: EstadosParaAmbiente): Alerta | null {
  const regra = ctx.regraPorId[ID_R_AMB_01];
  if (!regra) return null;
  const { agoraUtc } = ctx;

  const sintomas = sintomasRelatados(ctx.entrada.autoavaliacoes, tripulante.id, agoraUtc).filter(
    (s) => (GRANDEZAS_POR_SINTOMA[s.sintomaId] ?? []).length > 0,
  );
  if (sintomas.length === 0) return null;

  const moduloId = moduloMaisOcupado(ctx, tripulante, regra.janelaMin ?? 360);
  const fatores: Evidencia[] = [];
  const jaCitados = new Set<string>();
  for (const sintoma of sintomas) {
    for (const indicadorId of GRANDEZAS_POR_SINTOMA[sintoma.sintomaId] ?? []) {
      if (jaCitados.has(indicadorId)) continue;
      const estado =
        indicadorId === "sono_tst"
          ? estados.indicadoresDoTripulante[indicadorId]
          : estados.ambientePorModulo[moduloId]?.[indicadorId];
      if (!estado?.leitura || estado.nivel < 2) continue;
      jaCitados.add(indicadorId);
      fatores.push(
        evidenciaDeLeitura(estado.leitura, `fator_de_${sintoma.sintomaId}`, estado.leitura.valor, estado.leitura.unidade, estado.nivel),
      );
    }
  }
  if (fatores.length === 0) return null;

  const alerta = montarAlerta({
    regra,
    nivel: 1,
    tripulanteId: tripulante.id,
    moduloId,
    titulo: tituloDaHipotese(regra.hipotese),
    evidencias: [...sintomas.map(evidenciaDeSintoma), ...fatores],
    criadoUtc: sintomas[0]?.instanteUtc ?? agoraUtc,
    agoraUtc,
    contextual: true,
  });
  alerta.fatoresAmbientais = fatores;
  return alerta;
}
