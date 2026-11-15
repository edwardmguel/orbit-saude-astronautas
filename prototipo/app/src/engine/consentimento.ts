/**
 * Filtro de consentimento (`docs/06`, 2.2; `docs/18`, M16; `AGENTS.md`, regra 9). Toda filtragem
 * acontece aqui, no motor, antes de o dado chegar à tela: a tela nunca recebe o que o tripulante
 * não compartilhou com aquela audiência.
 *
 * - "Não compartilhado" é só `compartilhado: false`: sem nível, sem cor, sem valor, sem inferência.
 * - Detalhes clínicos nunca saem: a visão não carrega indicadores, leituras, sintomas nem observações.
 * - Quem não recebeu a `mente` também não recebe o nível geral calculado com ela.
 * - Não existe acesso emergencial irrestrito. Sem consentimento do estado, o máximo é o aviso
 *   `atencaoCmoSolicitada` quando o nível geral é 3 ou 4 (`docs/18`, M16).
 */

import { BLOCOS_TRIPULACAO } from "../domain/constantes";
import type { BlocoTripulacao, BlocoVisivel, EstadoTripulante, EstadoTripulanteVisivel } from "../domain/estado";
import { paraMs } from "../domain/tempo";
import type { Audiencia, Consentimento, DadoCompartilhavel } from "../domain/tipos";

export interface OpcoesFiltro {
  /** Relógio do motor: consentimento com `validoAteUtc` só vale antes dele; sem relógio, não vale. */
  agoraUtc?: string;
  /** Quem está olhando, para a audiência `buddy` (o consentimento aponta o `buddyId`). */
  visualizadorId?: string;
}

/** O tripulante compartilhou `dado` com esta audiência? `so_eu` (o próprio dono) vê tudo. */
export function compartilhou(
  consentimentos: readonly Consentimento[],
  dado: DadoCompartilhavel,
  audiencia: Audiencia,
  opcoes: OpcoesFiltro = {},
): boolean {
  if (audiencia === "so_eu") return true;
  return consentimentos.some((c) => {
    if (c.dado !== dado || c.audiencia !== audiencia) return false;
    if (audiencia === "buddy" && (c.buddyId === undefined || c.buddyId !== opcoes.visualizadorId)) return false;
    if (c.validoAteUtc !== undefined) {
      if (opcoes.agoraUtc === undefined) return false;
      if (paraMs(c.validoAteUtc) <= paraMs(opcoes.agoraUtc)) return false;
    }
    return true;
  });
}

export function filtrarParaAudiencia(
  t: EstadoTripulante,
  c: readonly Consentimento[],
  a: Audiencia,
  opcoes: OpcoesFiltro = {},
): EstadoTripulanteVisivel {
  const estado = compartilhou(c, "estado_sistemas", a, opcoes);
  const valores = compartilhou(c, "valores", a, opcoes);
  const modulo = compartilhou(c, "modulo", a, opcoes);
  const mente = compartilhou(c, "mente", a, opcoes);

  const blocos = {} as Record<BlocoTripulacao, BlocoVisivel>;
  for (const definicao of BLOCOS_TRIPULACAO) {
    const bloco = t.blocos[definicao.id];
    const ehMente = definicao.id === "mente";
    const visivel = ehMente ? mente : estado;
    if (!visivel) {
      blocos[definicao.id] = { bloco: definicao.id, compartilhado: false };
      continue;
    }
    const saida: BlocoVisivel = { bloco: definicao.id, compartilhado: true, nivel: bloco.nivel };
    const leitura = bloco.indicadorId ? t.indicadores[bloco.indicadorId]?.leitura : undefined;
    if (!ehMente && valores && leitura) {
      saida.valor = leitura.valor;
      saida.unidade = leitura.unidade;
      saida.instanteUtc = leitura.instanteUtc;
      saida.origem = leitura.origem;
    }
    blocos[definicao.id] = saida;
  }

  const visao: EstadoTripulanteVisivel = {
    tripulanteId: t.tripulanteId,
    audiencia: a,
    blocos,
    precisaApoio: false,
    atencaoCmoSolicitada: false,
  };
  if (estado) {
    const nivelGeral = mente ? t.nivelGeral : (t.nivelGeralSemMente ?? t.nivelGeral);
    visao.nivelGeral = nivelGeral;
    visao.precisaApoio = nivelGeral >= 3;
  } else if (t.nivelGeral >= 3) {
    visao.atencaoCmoSolicitada = true;
  }
  if (modulo && t.moduloId !== undefined) visao.moduloId = t.moduloId;
  return visao;
}
