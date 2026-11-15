/**
 * Motor de saúde do ORBITA: funções puras, sem React e sem relógio do sistema. A tela recebe o
 * `EstadoMissao` pronto; o relógio entra por `EntradaMotor.agoraUtc` (plano técnico, D6 e D7).
 *
 * Ordem do cálculo:
 * 1. regras de cruzamento sobre as leituras brutas (R-CO2-01, R-RAD-01, R-SANS-01, R-SONO-01, R-HID-01);
 * 2. estado de cada indicador, já com as regras de cruzamento ativas (uma regra de demonstração
 *    como o EWMA acima de 2,8 mmHg só vale dentro do R-CO2-01);
 * 3. R-AMB-01, que lê os estados e anexa os fatores ambientais possíveis ao alerta do tripulante;
 * 4. regiões do mapa, blocos da tripulação e nível geral.
 */

import type { EstadoIndicador, EstadoMissao, EstadoTripulante, EntradaMotor } from "../domain/estado";
import { diaDaMissao } from "../domain/tempo";
import type { Alerta, Evidencia, Leitura } from "../domain/tipos";
import { sintomasRelatados } from "./cruzamentos/comum";
import { avaliarCruzamentos, avaliarRAmb01, criarContexto } from "./cruzamentos";
import { agregarTripulante } from "./agregacao";
import { avaliarIndicador } from "./avaliarIndicador";
import { ehDisponivel, selecionarLeituras } from "./leituras";

export { avaliarIndicador, avaliarRegrasCor, agregacaoDaRegra, nivelPorSintomas } from "./avaliarIndicador";
export { filtrarParaAudiencia, compartilhou } from "./consentimento";
export { agregarTripulante, nivelDasRegioes, nivelDosBlocos } from "./agregacao";
export { avaliarCruzamentos, avaliarRCo201, avaliarRRad01, avaliarRSans01, avaliarRSono01, avaliarRHid01, avaliarRAmb01 } from "./cruzamentos";
export * from "./estatistica";
export { analisarLinhaDeBase, calcularLinhaDeBase, nivelPorZScore } from "./linhaDeBase";

/** Chave de `ambientePorModulo` para leituras sem módulo (clima espacial vale para a estação toda). */
export const MODULO_ESTACAO = "estacao";

const PAR_DO_POLIGONO: Readonly<Record<string, string>> = {
  temperatura_cabine: "umidade_cabine",
  umidade_cabine: "temperatura_cabine",
};

function piorEstado(estados: readonly EstadoIndicador[]): EstadoIndicador | undefined {
  let pior: EstadoIndicador | undefined;
  for (const e of estados) {
    if (!pior || e.nivel > pior.nivel) pior = e;
  }
  return pior;
}

function evidenciaDoDia(estado: EstadoIndicador): Evidencia | undefined {
  const { leitura } = estado;
  if (!leitura) return undefined;
  return {
    leituraId: leitura.id,
    indicadorId: estado.indicadorId,
    campo: "contexto_do_dia",
    valor: leitura.valor,
    unidade: leitura.unidade,
    nivel: estado.nivel,
    instanteUtc: leitura.instanteUtc,
    origem: leitura.origem,
  };
}

export function avaliarMissao(entrada: EntradaMotor): EstadoMissao {
  const ctx = criarContexto(entrada);
  const { agoraUtc } = entrada;
  const dia = diaDaMissao(entrada.missao.inicioUtc, agoraUtc);

  // 1. Cruzamentos sobre as leituras brutas.
  const alertas: Alerta[] = avaliarCruzamentos(ctx);
  const ativasDoTripulante = (id: string): string[] =>
    alertas.filter((a) => a.tripulanteId === id || (a.tripulanteId === undefined && a.moduloId === undefined)).map((a) => a.regraId);
  const ativasDoModulo = (moduloId: string): string[] =>
    alertas.filter((a) => a.moduloId === moduloId || (a.tripulanteId === undefined && a.moduloId === undefined)).map((a) => a.regraId);

  // 2a. Ambiente, por módulo e indicador.
  const ambientePorModulo: Record<string, Record<string, EstadoIndicador>> = {};
  const ambiente: Record<string, EstadoIndicador> = {};
  for (const indicador of entrada.indicadores.filter((i) => i.escopo === "ambiente")) {
    const doIndicador = selecionarLeituras(entrada.leituras, { indicadorId: indicador.id, tripulanteId: null, agoraUtc });
    const porModulo = new Map<string, Leitura[]>();
    for (const l of doIndicador) {
      const chave = l.moduloId ?? MODULO_ESTACAO;
      porModulo.set(chave, [...(porModulo.get(chave) ?? []), l]);
    }
    const estadosDoIndicador: EstadoIndicador[] = [];
    for (const [moduloId, leituras] of porModulo) {
      const idPar = PAR_DO_POLIGONO[indicador.id];
      const leituraPareada = idPar
        ? selecionarLeituras(entrada.leituras, { indicadorId: idPar, moduloId, agoraUtc }).filter(ehDisponivel).at(-1)
        : undefined;
      const estado = avaliarIndicador({
        indicador,
        tripulanteId: null,
        leituras,
        agoraUtc,
        diaDaMissao: dia,
        regrasAtivas: ativasDoModulo(moduloId),
        ...(leituraPareada ? { leituraPareada } : {}),
      });
      (ambientePorModulo[moduloId] ??= {})[indicador.id] = estado;
      estadosDoIndicador.push(estado);
    }
    ambiente[indicador.id] =
      piorEstado(estadosDoIndicador) ?? avaliarIndicador({ indicador, tripulanteId: null, leituras: [], agoraUtc });
  }

  // 2b. Tripulantes: estado de cada indicador do corpo.
  const estadosPorTripulante: Record<string, Record<string, EstadoIndicador>> = {};
  const sintomasPorTripulante: Record<string, ReturnType<typeof sintomasRelatados>> = {};
  for (const tripulante of entrada.tripulantes) {
    const sintomas = sintomasRelatados(entrada.autoavaliacoes, tripulante.id, agoraUtc);
    sintomasPorTripulante[tripulante.id] = sintomas;
    const regrasAtivas = ativasDoTripulante(tripulante.id);
    const doTripulante = selecionarLeituras(entrada.leituras, { tripulanteId: tripulante.id, agoraUtc });
    const estados: Record<string, EstadoIndicador> = {};
    for (const indicador of entrada.indicadores.filter((i) => i.escopo === "tripulante")) {
      estados[indicador.id] = avaliarIndicador({
        indicador,
        tripulanteId: tripulante.id,
        leituras: doTripulante.filter((l) => l.indicadorId === indicador.id),
        agoraUtc,
        sexo: tripulante.sexo,
        diaDaMissao: dia,
        sintomas,
        regrasAtivas,
      });
    }
    estadosPorTripulante[tripulante.id] = estados;
  }

  // 3. R-AMB-01: fatores ambientais possíveis, anexados ao alerta do tripulante (ou sozinhos).
  for (const tripulante of entrada.tripulantes) {
    const contextual = avaliarRAmb01(ctx, tripulante, {
      ambientePorModulo,
      indicadoresDoTripulante: estadosPorTripulante[tripulante.id] ?? {},
    });
    if (!contextual) continue;
    const alvo = alertas.find((a) => a.tripulanteId === tripulante.id && !a.contextual);
    if (alvo) alvo.fatoresAmbientais = [...(alvo.fatoresAmbientais ?? []), ...(contextual.fatoresAmbientais ?? [])];
    else alertas.push(contextual);
  }

  // 4. Contexto do dia: o que mais foge do padrão hoje e não disparou a regra.
  for (const alerta of alertas) {
    if (alerta.contextual || alerta.tripulanteId === undefined) continue;
    const citados = new Set([...alerta.evidencias, ...(alerta.fatoresAmbientais ?? [])].map((ev) => ev.indicadorId));
    const contexto = Object.values(estadosPorTripulante[alerta.tripulanteId] ?? {})
      .filter((e) => e.nivel >= 2 && !citados.has(e.indicadorId))
      .flatMap((e) => evidenciaDoDia(e) ?? []);
    if (contexto.length > 0) alerta.contextoDoDia = contexto;
  }

  // 5. Regiões, blocos e nível geral.
  const tripulantes: Record<string, EstadoTripulante> = {};
  const indicadorPorId = ctx.indicadorPorId;
  for (const tripulante of entrada.tripulantes) {
    tripulantes[tripulante.id] = agregarTripulante({
      tripulante,
      indicadorPorId,
      estados: estadosPorTripulante[tripulante.id] ?? {},
      sintomas: sintomasPorTripulante[tripulante.id] ?? [],
      alertas: alertas.filter((a) => !a.contextual && (a.tripulanteId === tripulante.id || a.tripulanteId === undefined)),
      regrasAtivas: ativasDoTripulante(tripulante.id),
    });
  }

  alertas.sort((a, b) => b.nivel - a.nivel || b.criadoUtc.localeCompare(a.criadoUtc) || a.id.localeCompare(b.id));
  return { agoraUtc, tripulantes, ambiente, ambientePorModulo, alertas };
}
