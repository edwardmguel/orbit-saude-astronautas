import type { DayPoint, SimParams } from "@/types";
import { MISSIONS, type MissionProfile } from "@/data/missions";
import { expectedSpo2, priorDose } from "./physics";

export const DAY_MS = 86_400_000;

/** Deterministic noise in [-1, 1] from seed, day and channel. */
export function noise(seed: number, day: number, channel: number): number {
  let h = (seed * 374761393 + day * 668265263 + channel * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return ((h >>> 0) / 4294967295) * 2 - 1;
}

export function missionDay(missionStart: number, now = Date.now()): number {
  return Math.max(1, Math.floor((now - missionStart) / DAY_MS) + 1);
}

const round1 = (n: number) => Math.round(n * 10) / 10;
const round2 = (n: number) => Math.round(n * 100) / 100;

/** Ramp that concentrates the change in the last days of the series. */
function ramp(day: number, current: number, span = 6) {
  return Math.min(1, Math.max(0, (day - (current - span)) / span));
}

/** Reference daily dose of the demo parameters (SimParams.doseBase is relative to it). */
const DOSE_REF = 0.54;

/** Individual dosimeter factor: position, shielding and activity relative to the crew mean. */
export function doseFactor(p: SimParams) {
  return p.doseBase / DOSE_REF;
}

/**
 * Simulated daily series of the automatic indicators, adapted to the mission environment.
 * Deterministic: the same astronaut in the same mission always generates the same values.
 *  - SpO₂: Severinghaus prediction for the cabin PIO₂ + individual offset (spo2Base − 98).
 *  - Dose: mission effective dose rate × individual factor (±12% orbital/solar modulation),
 *    accumulated on top of the outbound transit dose (docs/04 A7: D = Σ dᵢ).
 */
export function generateSeries(p: SimParams, missionStart: number, currentDay: number, mission: MissionProfile = MISSIONS.iss): DayPoint[] {
  const out: DayPoint[] = [];
  const f = doseFactor(p);
  const spo2Expected = expectedSpo2(mission.cabin.totalMmHg, mission.cabin.ppO2MmHg).spo2;
  const spo2Offset = p.spo2Base - 98;
  let cum = priorDose(mission) * f;
  for (let d = 1; d <= currentDay; d++) {
    const r = ramp(d, currentDay);
    const rLate = ramp(d, currentDay, 2);
    const hr = Math.round(p.hrBase + noise(p.seed, d, 1) * 3 + p.hrDrift * r);
    const spo2 = Math.min(100, Math.round(spo2Expected + spo2Offset + noise(p.seed, d, 2) * 0.6 - p.spo2Drop * r));
    const dose = round2(Math.max(0.05, mission.doseRate * f * (1 + noise(p.seed, d, 3) * 0.12) + p.doseSpike * (mission.doseRate / DOSE_REF) * rLate));
    cum += dose;
    const blink = Math.round(p.blinkBase + noise(p.seed, d, 4) * 2 - p.eogDrift * r * 0.12);
    const eog = Math.round(Math.min(100, Math.max(0, p.eogBase + noise(p.seed, d, 5) * 4 + p.eogDrift * r)));
    const sleep = round1(Math.max(3, p.sleepBase + noise(p.seed, d, 6) * 0.35 - p.sleepDrop * r));
    out.push({ day: d, ts: missionStart + (d - 1) * DAY_MS, hr, spo2, dose, doseCum: round1(cum), blink, eog, sleep });
  }
  return out;
}

/** Individual baseline: average of the first 14 mission days. */
export function baselineOf(series: DayPoint[]) {
  const base = series.slice(0, Math.min(14, series.length));
  const avg = (k: keyof DayPoint) => base.reduce((s, x) => s + (x[k] as number), 0) / Math.max(1, base.length);
  // Sample standard deviation σ = √(Σ(xᵢ − μ)² / (n − 1))  (docs/04 A2)
  const sd = (k: keyof DayPoint) => {
    const mu = avg(k);
    return Math.sqrt(base.reduce((s, x) => s + ((x[k] as number) - mu) ** 2, 0) / Math.max(1, base.length - 1));
  };
  return {
    hrMean: round2(avg("hr")),
    hrSd: Math.max(1, round2(sd("hr"))),
    hr: Math.round(avg("hr")),
    spo2: Math.round(avg("spo2")),
    blink: Math.round(avg("blink")),
    eog: Math.round(avg("eog")),
    sleep: round1(avg("sleep")),
    dose: round2(avg("dose")),
  };
}

export function eogPattern(eog: number): string {
  if (eog < 40) return "Stable saccadic movements";
  if (eog < 60) return "Mild fixation variation";
  if (eog < 75) return "Prolonged fixations";
  return "Saccadic slowing";
}

export function randomNormalParams(seed: number): SimParams {
  const r = (c: number) => noise(seed, 999, c);
  return {
    seed,
    hrBase: Math.round(64 + r(1) * 5),
    hrDrift: 0,
    spo2Base: 98,
    spo2Drop: 0,
    doseBase: round2(0.52 + r(2) * 0.06),
    doseSpike: 0,
    blinkBase: Math.round(16 + r(3) * 2),
    eogBase: Math.round(26 + r(4) * 5),
    eogDrift: 0,
    sleepBase: round1(7.3 + r(5) * 0.3),
    sleepDrop: 0,
  };
}
