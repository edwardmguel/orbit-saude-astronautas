/**
 * Construtores pequenos para os testes do motor: leituras, check-ins e uma `EntradaMotor` mínima
 * sobre a configuração real (`@config`). Nenhum número de faixa nasce aqui.
 */

import { carregarConfig } from "../../config/carregarConfig";
import type { EntradaMotor } from "../../domain/estado";
import type { SintomaId } from "../../domain/sintomas";
import { MS_POR_DIA, MS_POR_MINUTO, deMs, paraMs } from "../../domain/tempo";
import type {
  AtividadeCritica,
  Autoavaliacao,
  Consentimento,
  EventoClimaEspacial,
  Leitura,
  Missao,
  Modulo,
  Tripulante,
} from "../../domain/tipos";

export const MODULOS_TESTE: Modulo[] = [
  { id: "node3", nome: "Node 3 (Tranquility)", segmento: "USOS" },
  { id: "node1", nome: "Node 1 (Unity)", segmento: "USOS" },
  { id: "us_lab", nome: "Lab (Destiny)", segmento: "USOS" },
];

export function leitura(
  parcial: Pick<Leitura, "indicadorId" | "valor" | "unidade" | "instanteUtc"> & Partial<Leitura>,
): Leitura {
  const dono = parcial.tripulanteId ?? parcial.moduloId ?? "estacao";
  return {
    id: `lei:${parcial.indicadorId}:${dono}:${parcial.instanteUtc}`,
    origem: "simulada",
    qualidade: "boa",
    disponibilidade: "disponivel",
    ...parcial,
  };
}

/** Uma leitura por dia, `valores[0]` no dia mais antigo, todas às `hhmm` UTC, terminando em `ultimoDia` (aaaa-mm-dd). */
export function serieDiaria(
  indicadorId: string,
  unidade: string,
  valores: readonly number[],
  ultimoDia: string,
  hhmm: string,
  extras: Partial<Leitura> = {},
): Leitura[] {
  const fim = paraMs(`${ultimoDia}T${hhmm}:00Z`);
  return valores.map((valor, i) =>
    leitura({
      indicadorId,
      valor,
      unidade,
      instanteUtc: deMs(fim - (valores.length - 1 - i) * MS_POR_DIA),
      ...extras,
    }),
  );
}

/** Leituras a cada `passoMin` minutos, de `inicioUtc` até `fimUtc` inclusive, com o valor dado por `valorEm(i)`. */
export function serieEmMinutos(
  indicadorId: string,
  unidade: string,
  inicioUtc: string,
  fimUtc: string,
  passoMin: number,
  valorEm: (indice: number, instanteUtc: string) => number,
  extras: Partial<Leitura> = {},
): Leitura[] {
  const saida: Leitura[] = [];
  const fim = paraMs(fimUtc);
  for (let i = 0, t = paraMs(inicioUtc); t <= fim; i += 1, t += passoMin * MS_POR_MINUTO) {
    const instanteUtc = deMs(t);
    saida.push(leitura({ indicadorId, valor: valorEm(i, instanteUtc), unidade, instanteUtc, ...extras }));
  }
  return saida;
}

export function checkin(
  id: string,
  tripulanteId: string,
  instanteUtc: string,
  respostas: Autoavaliacao["respostas"],
): Autoavaliacao {
  return { id, tripulanteId, instanteUtc, tipo: "checkin", respostas };
}

export const COMPARTILHA_TUDO_COM_TRIPULACAO: Consentimento[] = (
  ["estado_sistemas", "valores", "modulo", "mente"] as const
).map((dado) => ({ dado, audiencia: "tripulacao", atualizadoUtc: "2026-10-02T06:40:00Z" }));

/** Tripulante fictício do `perfis-simulacao.rascunho.json` com cadastro de teste. */
export function tripulanteDoPerfil(id: string, parcial: Partial<Tripulante> = {}): Tripulante {
  const perfil = carregarConfig().perfis.tripulantesFicticios.lista.find((t) => t.id === id);
  if (!perfil) throw new Error(`Tripulante fictício "${id}" não existe em perfis-simulacao.rascunho.json.`);
  return {
    id: perfil.id,
    codinome: perfil.codinome,
    funcao: "Especialista de missão",
    agencia: "NASA",
    massaPreVooKg: perfil.massaPreVooKg,
    sexo: perfil.sexo,
    alturaCm: 175,
    perfilSonoro: "mata-atlantica",
    usaOculosOrbit: true,
    horarioSono: { inicio: "21:30", fim: "06:00" },
    moduloAtual: "node3",
    compartilhamento: COMPARTILHA_TUDO_COM_TRIPULACAO,
    ...parcial,
  };
}

export const MISSAO_TESTE: Missao = {
  id: "exp-teste",
  nome: "Missão de teste (simulada)",
  plataforma: "ISS",
  inicioUtc: "2026-01-01T00:00:00Z",
  atrasoComunicacaoSeg: 1,
};

export interface OpcoesEntrada {
  agoraUtc: string;
  tripulantes: Tripulante[];
  leituras?: Leitura[];
  autoavaliacoes?: Autoavaliacao[];
  eventosClima?: EventoClimaEspacial[];
  atividadesCriticas?: AtividadeCritica[];
  missao?: Missao;
}

/** `EntradaMotor` com os indicadores e as regras reais de `indicadores.json`. */
export function entradaDeTeste(opcoes: OpcoesEntrada): EntradaMotor {
  const config = carregarConfig();
  return {
    agoraUtc: opcoes.agoraUtc,
    missao: opcoes.missao ?? MISSAO_TESTE,
    tripulantes: opcoes.tripulantes,
    modulos: MODULOS_TESTE,
    indicadores: config.indicadores,
    regrasCruzamento: config.regrasCruzamento,
    leituras: opcoes.leituras ?? [],
    autoavaliacoes: opcoes.autoavaliacoes ?? [],
    eventosClima: opcoes.eventosClima ?? [],
    atividadesCriticas: opcoes.atividadesCriticas ?? [],
  };
}

export type { SintomaId };
