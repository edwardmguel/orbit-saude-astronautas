/**
 * Tempo em UTC. A ISS usa GMT/UTC como horário oficial: guardamos tudo em ISO 8601 e mostramos
 * "GMT dia-do-ano / hh:mm". Nenhuma função daqui lê o relógio do sistema; quem precisa de "agora"
 * recebe `agoraUtc` como parâmetro (o relógio da demonstração é `AGORA_DEMO`).
 */

export const MS_POR_MINUTO = 60_000;
export const MS_POR_HORA = 3_600_000;
export const MS_POR_DIA = 86_400_000;

/** Relógio fixo da demonstração: GMT 319 / 06:40, dia 45 da ISS EXP-01 (plano técnico, D6). */
export const AGORA_DEMO = "2026-11-15T06:40:00Z";

/** Início da missão da demonstração: 44 dias antes de `AGORA_DEMO`, para o dia 45 aparecer sempre (`docs/19`, seção 14). */
export const INICIO_MISSAO_DEMO = "2026-10-02T06:40:00Z";

/** Milissegundos desde 1970 para um ISO 8601; falha com texto claro se o ISO for inválido. */
export function paraMs(iso: string): number {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) throw new RangeError(`Horário UTC inválido: "${iso}".`);
  return ms;
}

export function deMs(ms: number): string {
  return new Date(ms).toISOString().replace(".000Z", "Z");
}

export function somarMinutos(iso: string, minutos: number): string {
  return deMs(paraMs(iso) + minutos * MS_POR_MINUTO);
}

/** Minutos de `de` até `ate` (positivo quando `ate` é depois). */
export function minutosEntre(de: string, ate: string): number {
  return (paraMs(ate) - paraMs(de)) / MS_POR_MINUTO;
}

/** Dia do ano em UTC, de 1 a 366. 15/11/2026 é o dia 319. */
export function diaDoAno(iso: string): number {
  const d = new Date(paraMs(iso));
  const inicioDoAno = Date.UTC(d.getUTCFullYear(), 0, 1);
  const inicioDoDia = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return Math.round((inicioDoDia - inicioDoAno) / MS_POR_DIA) + 1;
}

/** Data em UTC no formato `aaaa-mm-dd`. */
export function dataUtc(iso: string): string {
  return new Date(paraMs(iso)).toISOString().slice(0, 10);
}

const doisDigitos = (n: number): string => String(n).padStart(2, "0");

/** "GMT 319 / 06:40": dia do ano e hora em UTC. */
export function formatarGmt(iso: string): string {
  const d = new Date(paraMs(iso));
  return `GMT ${diaDoAno(iso)} / ${doisDigitos(d.getUTCHours())}:${doisDigitos(d.getUTCMinutes())}`;
}

/** Dia de missão (FD, Flight Day): dias completos desde o início mais 1 (`docs/06`, 2.1). */
export function diaDaMissao(inicioUtc: string, agoraUtc: string): number {
  return Math.floor((paraMs(agoraUtc) - paraMs(inicioUtc)) / MS_POR_DIA) + 1;
}

/** Horário "hh:mm" (GMT) em minutos desde a meia-noite. */
export function minutosDoDia(hhmm: string): number {
  const partes = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!partes) throw new RangeError(`Horário "hh:mm" inválido: "${hhmm}".`);
  return Number(partes[1]) * 60 + Number(partes[2]);
}

/** Duração em minutos entre dois "hh:mm", atravessando a meia-noite quando preciso (21:30 a 06:00 = 510). */
export function duracaoEntreHorarios(inicio: string, fim: string): number {
  const diferenca = minutosDoDia(fim) - minutosDoDia(inicio);
  return diferenca > 0 ? diferenca : diferenca + 24 * 60;
}
