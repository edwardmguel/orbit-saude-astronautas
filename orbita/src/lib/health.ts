import type {
  AppState,
  Appetite,
  BloodTest,
  CrewData,
  CrewProfile,
  DailyAssessment,
  DayPoint,
  IndicatorEval,
  IndicatorKey,
  Sex,
  SimParams,
  Status,
  Thresholds,
} from "@/types";
import { DAY_MS, baselineOf, doseFactor, eogPattern, generateSeries, missionDay } from "./sim";
import { MISSIONS, type MissionProfile } from "@/data/missions";
import { CAREER_LIMIT_MSV, expectedSpo2, pio2, priorDose, projectedMissionDose } from "./physics";

export const BLOOD_INTERVAL_DAYS = 15;

export const DEFAULT_THRESHOLDS: Thresholds = {
  hr: { devAttention: 15, devAlert: 25, devCritical: 35, min: 50, max: 100, critMin: 40, critMax: 120 },
  spo2: { attention: 95, alert: 93, critical: 90 },
  // × the mission's expected effective dose rate (ISS 0.42, Moon 1.37, Mars 0.64 mSv/day)
  dose: { attention: 1.5, alert: 3, critical: 10 },
  eog: { attention: 45, alert: 60, critical: 75 },
  hydration: { attention: 2.0, alert: 1.5, critical: 1.0 },
  fatigue: { attention: 5, alert: 7, critical: 9 },
  sleep: { attention: 7, alert: 6, critical: 5 },
  blood: { alertPct: 10, criticalPct: 25 },
};

export const STATUS_META: Record<Status, { label: string; color: string; desc: string; rank: number }> = {
  normal: { label: "Normal", color: "#22C55E", rank: 0, desc: "Indicator within the criteria defined for individual monitoring." },
  attention: { label: "Attention", color: "#FACC15", rank: 1, desc: "Mild change or trend that deserves monitoring." },
  alert: { label: "Alert", color: "#F97316", rank: 2, desc: "Relevant change that needs to be evaluated." },
  critical: { label: "Critical", color: "#EF4444", rank: 3, desc: "Medical escalation criterion reached. Follow the mission protocol." },
  no_data: { label: "No data", color: "#64748B", rank: -1, desc: "Information not available or not updated." },
};

export const APPETITE_LABEL: Record<Appetite, string> = {
  normal: "Normal",
  reduced: "Reduced",
  very_reduced: "Very reduced",
};

export const INDICATOR_LABEL: Record<IndicatorKey, string> = {
  hr: "Heart rate",
  dose: "Radiation dosimetry",
  spo2: "Pulse oximetry",
  eog: "Eye attention (EOG)",
  hydration: "Hydration",
  fatigue: "Fatigue",
  appetite: "Appetite",
  blood: "Blood count",
  sleep: "Sleep",
  bp: "Blood pressure",
  glucose: "Blood glucose",
  temp: "Body temperature",
  mood: "Mood",
};

/**
 * Earth reference ranges from docs/03 (tagged [EARTH GUIDELINE] there — not flight limits).
 * Outside the range → Attention ("needs review"); docs/03 assigns no numeric red/orange cut
 * to these signs: escalation comes from symptoms and the CMO.
 */
export const VITAL_REF = {
  sbp: [90, 120] as [number, number], // mmHg, MedlinePlus vital signs
  dbp: [60, 80] as [number, number], // mmHg
  glucoseNormalBelow: 100, // mg/dL fasting, ADA
  glucoseConfirmFrom: 126, // mg/dL, ≥126 requires confirmation (ADA)
  temp: [36.5, 37.3] as [number, number], // °C oral, MedlinePlus
  moodScale: [1, 5] as [number, number], // authored 1–5 scale (docs/03 `humor`)
};

export const MOOD_LABEL: Record<number, string> = { 1: "Very low", 2: "Low", 3: "Neutral", 4: "Good", 5: "Very good" };

export function evalBp(sbp: number, dbp: number) {
  const [sLo, sHi] = VITAL_REF.sbp;
  const [dLo, dHi] = VITAL_REF.dbp;
  const out = sbp < sLo || sbp > sHi || dbp < dLo || dbp > dHi;
  return {
    status: (out ? "attention" : "normal") as Status,
    reason: out
      ? `Outside the Earth reference ${sLo}–${sHi} / ${dLo}–${dHi} mmHg: rest and repeat the measurement; not a flight limit.`
      : `Within the Earth reference ${sLo}–${sHi} / ${dLo}–${dHi} mmHg (not a flight limit).`,
  };
}

export function evalGlucose(v: number) {
  if (v >= VITAL_REF.glucoseConfirmFrom)
    return { status: "attention" as Status, reason: `≥ ${VITAL_REF.glucoseConfirmFrom} mg/dL fasting requires confirmation by the clinical method (Earth guideline).` };
  if (v >= VITAL_REF.glucoseNormalBelow)
    return { status: "attention" as Status, reason: `${VITAL_REF.glucoseNormalBelow}–125 mg/dL fasting requires interpretation with context and trend (Earth guideline).` };
  return { status: "normal" as Status, reason: `Below ${VITAL_REF.glucoseNormalBelow} mg/dL fasting, Earth normal range (not a flight limit).` };
}

export function evalTemp(v: number) {
  const [lo, hi] = VITAL_REF.temp;
  const out = v < lo || v > hi;
  return {
    status: (out ? "attention" : "normal") as Status,
    reason: out ? `Outside the oral Earth reference ${fmt1(lo)}–${fmt1(hi)} °C: repeat the measurement and note symptoms.` : `Within the oral Earth reference ${fmt1(lo)}–${fmt1(hi)} °C.`,
  };
}

/** Mood: personal baseline only (docs/03 `linha_de_base`); needs 7 readings; |z| ≥ 2 → Attention, never higher. */
export function evalMood(v: number, history: number[]) {
  if (history.length < 7) return { status: "normal" as Status, reason: `Baseline forming (${history.length}/7 readings). No fixed cut-off exists for mood.`, z: undefined as number | undefined };
  const mu = history.reduce((a, b) => a + b, 0) / history.length;
  const sd = Math.max(0.5, Math.sqrt(history.reduce((a, b) => a + (b - mu) ** 2, 0) / (history.length - 1)));
  const z = (v - mu) / sd;
  return {
    status: (z <= -2 ? "attention" : "normal") as Status,
    reason: z <= -2 ? `Below your personal baseline (${fmt1(mu)}/5, z = ${fmt1(z)}σ).` : `Within your personal baseline (${fmt1(mu)}/5).`,
    z,
  };
}

export function worst(...s: Status[]): Status {
  let best: Status = "no_data";
  for (const x of s) if (STATUS_META[x].rank > STATUS_META[best].rank) best = x;
  return best;
}

/** Lower value is worse. */
function lowerIsWorse(v: number, t: { attention: number; alert: number; critical: number }): Status {
  if (v < t.critical) return "critical";
  if (v < t.alert) return "alert";
  if (v < t.attention) return "attention";
  return "normal";
}
/** Higher value is worse. */
function higherIsWorse(v: number, t: { attention: number; alert: number; critical: number }): Status {
  if (v >= t.critical) return "critical";
  if (v >= t.alert) return "alert";
  if (v >= t.attention) return "attention";
  return "normal";
}

const fmt1 = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmt2 = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export { fmt1, fmt2 };

/** z = (x − μ) / σ  (docs/04 A3). */
export function zScore(x: number, mean: number, sd: number) {
  return (x - mean) / Math.max(1, sd);
}

export function evalHr(hr: number, baseline: number, t: Thresholds, stats?: { mean: number; sd: number }): { status: Status; reason: string; z?: number } {
  const dev = ((hr - baseline) / baseline) * 100;
  const a = Math.abs(dev);
  let s: Status = a >= t.hr.devCritical ? "critical" : a >= t.hr.devAlert ? "alert" : a >= t.hr.devAttention ? "attention" : "normal";
  // Personal deviation (docs/04 A3): |z| ≥ 2 → attention; z alone never escalates beyond attention
  const z = stats ? zScore(hr, stats.mean, stats.sd) : undefined;
  if (z != null && Math.abs(z) >= 2) s = worst(s, "attention");
  if (hr > t.hr.critMax || hr < t.hr.critMin) s = worst(s, "critical");
  else if (hr > t.hr.max || hr < t.hr.min) s = worst(s, "attention");
  const sign = dev >= 0 ? "+" : "−";
  const zTxt = z != null ? ` · z = ${z >= 0 ? "+" : "−"}${Math.abs(z).toFixed(1)}σ` : "";
  const reason =
    s === "normal"
      ? `Within the individual baseline (${baseline} bpm${zTxt}).`
      : `Change from baseline: ${sign}${Math.abs(dev).toFixed(0)}% (baseline ${baseline} bpm${zTxt}).`;
  return { status: s, reason, z };
}

/**
 * SpO₂ cut-offs adapted to the cabin atmosphere. The attention band follows the Severinghaus
 * prediction for the cabin PIO₂ (2 points below expected), never above the configured Earth reference;
 * the alert (≤ 92%, CMO contact) and critical bands stay absolute.
 */
export function spo2Cuts(t: Thresholds, mission: MissionProfile) {
  const expected = expectedSpo2(mission.cabin.totalMmHg, mission.cabin.ppO2MmHg).spo2;
  return { expected, attention: Math.min(t.spo2.attention, Math.round(expected) - 2), alert: t.spo2.alert, critical: t.spo2.critical };
}

export function evalSpo2(v: number, t: Thresholds, mission: MissionProfile = MISSIONS.iss) {
  const c = spo2Cuts(t, mission);
  const s = lowerIsWorse(v, c);
  const exp = `expected ${fmt1(c.expected)}% for cabin PIO₂ ${fmt1(pio2(mission.cabin.totalMmHg, mission.cabin.ppO2MmHg))} mmHg`;
  return { status: s, reason: s === "normal" ? `Saturation ≥ ${c.attention}% (${exp}).` : `Saturation below ${c.attention}% (${exp}).` };
}

/** Absolute daily-dose bands (mSv/day) = configured multiples × mission expected rate. */
export function doseBands(t: Thresholds, mission: MissionProfile) {
  return { attention: t.dose.attention * mission.doseRate, alert: t.dose.alert * mission.doseRate, critical: t.dose.critical * mission.doseRate };
}

export interface DoseContext {
  cumulative: number;
  projected: number;
}

export function evalDose(v: number, t: Thresholds, mission: MissionProfile = MISSIONS.iss, ctx?: DoseContext) {
  let s = higherIsWorse(v, doseBands(t, mission));
  const ratio = v / mission.doseRate;
  let reason =
    s === "normal"
      ? `Daily rate ${fmt2(v)} mSv/day = ${fmt1(ratio)}× the expected ${mission.short} rate (${fmt2(mission.doseRate)} mSv/day).`
      : `Daily rate ${fmt2(v)} mSv/day = ${fmt1(ratio)}× the expected ${mission.short} rate — check EVA, SAA or solar particle event.`;
  if (ctx) {
    const pct = (ctx.cumulative / CAREER_LIMIT_MSV) * 100;
    const projPct = (ctx.projected / CAREER_LIMIT_MSV) * 100;
    if (ctx.cumulative >= CAREER_LIMIT_MSV) {
      s = worst(s, "alert");
      reason = `Accumulated ${fmt1(ctx.cumulative)} mSv exceeds the 600 mSv career limit (NASA-STD-3001 V1 4030). ` + reason;
    } else if (ctx.projected > CAREER_LIMIT_MSV) {
      s = worst(s, "attention");
      reason = `Projected mission total ${fmt1(ctx.projected)} mSv = ${projPct.toFixed(0)}% of the 600 mSv career limit (V1 4030); radiation program review required. ` + reason;
    } else {
      reason += ` Career use ${pct.toFixed(1)}% of 600 mSv.`;
    }
  }
  return { status: s, reason };
}
export function evalEog(v: number, t: Thresholds) {
  const s = higherIsWorse(v, t.eog);
  return {
    status: s,
    reason:
      s === "normal"
        ? "Stable eye pattern (experimental indicator)."
        : `Elevated experimental eye-fatigue index (${v}/100). Not a diagnosis of inattention.`,
  };
}
export function evalHydration(v: number, t: Thresholds) {
  const s = lowerIsWorse(v, t.hydration);
  return { status: s, reason: s === "normal" ? "Adequate intake in the last 24 h." : `Intake below ${fmt1(t.hydration.attention)} L in 24 h.` };
}
export function evalFatigue(v: number, t: Thresholds) {
  const s = higherIsWorse(v, t.fatigue);
  return { status: s, reason: s === "normal" ? "Low self-reported fatigue." : `Elevated fatigue (${v}/10).` };
}
export function evalAppetite(v: Appetite) {
  const s: Status = v === "normal" ? "normal" : v === "reduced" ? "attention" : "alert";
  return { status: s, reason: s === "normal" ? "Appetite preserved." : `Appetite ${APPETITE_LABEL[v].toLowerCase()}.` };
}
export function evalSleep(v: number, base: number, t: Thresholds) {
  const s = lowerIsWorse(v, t.sleep);
  return { status: s, reason: s === "normal" ? "Sleep within personal pattern." : `Below personal pattern (${fmt1(base)} h).` };
}

export const BLOOD_REF: Record<Sex, Record<"rbc" | "hb" | "hct" | "wbc" | "plt", [number, number]>> = {
  M: { rbc: [4.5, 5.9], hb: [13.5, 17.5], hct: [41, 53], wbc: [4.0, 11.0], plt: [150, 400] },
  F: { rbc: [4.0, 5.2], hb: [12.0, 15.5], hct: [36, 46], wbc: [4.0, 11.0], plt: [150, 400] },
};
export const BLOOD_FIELDS = [
  { key: "rbc", label: "Red blood cells", unit: "million/µL", step: 0.01 },
  { key: "hb", label: "Hemoglobin", unit: "g/dL", step: 0.1 },
  { key: "hct", label: "Hematocrit", unit: "%", step: 0.1 },
  { key: "wbc", label: "White blood cells", unit: "thousand/µL", step: 0.1 },
  { key: "plt", label: "Platelets", unit: "thousand/µL", step: 1 },
] as const;

export function evalBlood(b: BloodTest, sex: Sex, t: Thresholds) {
  const ref = BLOOD_REF[sex];
  const out: { key: string; label: string; dev: number; dir: "low" | "high" }[] = [];
  for (const f of BLOOD_FIELDS) {
    const v = b[f.key as keyof BloodTest] as number | undefined;
    if (v == null || Number.isNaN(v)) continue;
    const [lo, hi] = ref[f.key];
    if (v < lo) out.push({ key: f.key, label: f.label, dev: ((lo - v) / lo) * 100, dir: "low" });
    else if (v > hi) out.push({ key: f.key, label: f.label, dev: ((v - hi) / hi) * 100, dir: "high" });
  }
  const max = Math.max(0, ...out.map((o) => o.dev));
  const s: Status = out.length === 0 ? "normal" : max >= t.blood.criticalPct ? "critical" : max >= t.blood.alertPct ? "alert" : "attention";
  const reason =
    out.length === 0
      ? "Parameters within the demonstration laboratory reference."
      : out.map((o) => `${o.label} ${o.dir === "low" ? "below" : "above"} reference`).join("; ") + ".";
  return { status: s, reason, outOfRange: out };
}

export function emptyData(): CrewData {
  return { assessments: [], bloodTests: [], sleepLogs: [], taskLogs: [], chat: [], explored: [] };
}

export interface Snapshot {
  mission: MissionProfile;
  /** Dose accumulated before the current phase (outbound transit). */
  doseBefore: number;
  /** Projected whole-mission dose at the individual dosimeter factor. */
  doseProjected: number;
  hrZ?: number;
  profile: CrewProfile;
  day: number;
  series: DayPoint[];
  current: DayPoint;
  baseline: ReturnType<typeof baselineOf>;
  latestAssessment?: DailyAssessment;
  assessmentFresh: boolean;
  latestBlood?: BloodTest;
  nextBloodDue: number; // timestamp
  bloodDaysLeft: number;
  sleepHours: number;
  sleepSource: "record" | "simulated";
  indicators: Record<IndicatorKey, IndicatorEval>;
  alerts: IndicatorEval[];
  overall: Status;
}

const cache = new Map<string, { key: string; snap: Snapshot }>();

export function snapshotFor(state: AppState, id: string, now = Date.now()): Snapshot | null {
  const profile = state.crew.find((c) => c.id === id);
  const sim: SimParams | undefined = state.sim[id];
  if (!profile || !sim) return null;
  const data = state.data[id] ?? emptyData();
  const day = missionDay(state.missionStart, now);
  const hourKey = Math.floor(now / 60_000);
  const mission = MISSIONS[state.missionId] ?? MISSIONS.iss;
  const key = `${mission.id}|${day}|${hourKey}|${JSON.stringify(profile)}|${data.assessments.length}|${data.bloodTests.length}|${data.sleepLogs.length}|${JSON.stringify(state.thresholds)}|${state.missionStart}`;
  const hit = cache.get(id);
  if (hit && hit.key === key) return hit.snap;

  const t = state.thresholds;
  const series = generateSeries(sim, state.missionStart, day, mission);
  const current = series[series.length - 1];
  const baseline = baselineOf(series);
  const f = doseFactor(sim);
  const doseBefore = priorDose(mission) * f;
  const doseProjected = projectedMissionDose(mission) * f;

  const assessments = [...data.assessments].sort((a, b) => b.ts - a.ts);
  const latestAssessment = assessments[0];
  const assessmentFresh = !!latestAssessment && now - latestAssessment.ts < DAY_MS;
  const blood = [...data.bloodTests].sort((a, b) => b.ts - a.ts);
  const latestBlood = blood[0];
  const nextBloodDue = (latestBlood ? latestBlood.ts : state.missionStart) + BLOOD_INTERVAL_DAYS * DAY_MS;
  const bloodDaysLeft = Math.ceil((nextBloodDue - now) / DAY_MS);

  const sleepLog = [...data.sleepLogs].sort((a, b) => b.ts - a.ts)[0];
  const sleepFromLog = sleepLog && now - sleepLog.ts < DAY_MS;
  const sleepHours = sleepFromLog ? sleepLog.hours : current.sleep;

  const ind = {} as Record<IndicatorKey, IndicatorEval>;
  const hr = evalHr(current.hr, baseline.hr, t, { mean: baseline.hrMean, sd: baseline.hrSd });
  ind.hr = { key: "hr", label: INDICATOR_LABEL.hr, value: `${current.hr} bpm`, status: hr.status, reason: hr.reason, updatedAt: now };
  const dose = evalDose(current.dose, t, mission, { cumulative: current.doseCum, projected: doseProjected });
  ind.dose = { key: "dose", label: INDICATOR_LABEL.dose, value: `${fmt2(current.dose)} mSv/day · ${fmt1(current.doseCum)} mSv accumulated`, ...dose, updatedAt: now };
  const spo2 = evalSpo2(current.spo2, t, mission);
  ind.spo2 = { key: "spo2", label: INDICATOR_LABEL.spo2, value: `${current.spo2}%`, ...spo2, updatedAt: now };
  const eog = evalEog(current.eog, t);
  ind.eog = { key: "eog", label: INDICATOR_LABEL.eog, value: `Index ${current.eog}/100 · ${current.blink} blinks/min · ${eogPattern(current.eog)}`, ...eog, updatedAt: now };
  const sl = evalSleep(sleepHours, baseline.sleep, t);
  ind.sleep = { key: "sleep", label: INDICATOR_LABEL.sleep, value: `${fmt1(sleepHours)} h`, ...sl, updatedAt: sleepFromLog ? sleepLog.ts : now };

  if (latestAssessment) {
    const stale = !assessmentFresh;
    const h = evalHydration(latestAssessment.hydrationL, t);
    const f = evalFatigue(latestAssessment.fatigue, t);
    const a = evalAppetite(latestAssessment.appetite);
    const staleReason = "Daily assessment pending (last record over 24 h ago).";
    ind.hydration = { key: "hydration", label: INDICATOR_LABEL.hydration, value: `${fmt1(latestAssessment.hydrationL)} L`, status: stale ? "no_data" : h.status, reason: stale ? staleReason : h.reason, updatedAt: latestAssessment.ts };
    ind.fatigue = { key: "fatigue", label: INDICATOR_LABEL.fatigue, value: `${latestAssessment.fatigue}/10`, status: stale ? "no_data" : f.status, reason: stale ? staleReason : f.reason, updatedAt: latestAssessment.ts };
    ind.appetite = { key: "appetite", label: INDICATOR_LABEL.appetite, value: APPETITE_LABEL[latestAssessment.appetite], status: stale ? "no_data" : a.status, reason: stale ? staleReason : a.reason, updatedAt: latestAssessment.ts };
  } else {
    for (const k of ["hydration", "fatigue", "appetite"] as const)
      ind[k] = { key: k, label: INDICATOR_LABEL[k], value: "—", status: "no_data", reason: "No assessment recorded." };
  }

  // Mood (daily assessment) and vital signs (medical kit). Display validity 24 h (docs/03).
  const fresh = (ts: number) => now - ts < DAY_MS;
  const withMood = assessments.filter((a) => a.mood != null);
  const lastMood = withMood[0];
  if (lastMood) {
    const hist = withMood.slice(1, 31).map((a) => a.mood as number);
    const m = evalMood(lastMood.mood as number, hist);
    ind.mood = { key: "mood", label: INDICATOR_LABEL.mood, value: `${lastMood.mood}/5 · ${MOOD_LABEL[lastMood.mood as number]}`, status: fresh(lastMood.ts) ? m.status : "no_data", reason: fresh(lastMood.ts) ? m.reason : "Mood not logged in the last 24 h.", updatedAt: lastMood.ts };
  } else ind.mood = { key: "mood", label: INDICATOR_LABEL.mood, value: "—", status: "no_data", reason: "No mood recorded." };

  const lastBp = assessments.find((a) => a.sbp != null && a.dbp != null);
  if (lastBp) {
    const e = evalBp(lastBp.sbp as number, lastBp.dbp as number);
    ind.bp = { key: "bp", label: INDICATOR_LABEL.bp, value: `${lastBp.sbp}/${lastBp.dbp} mmHg`, status: fresh(lastBp.ts) ? e.status : "no_data", reason: fresh(lastBp.ts) ? e.reason : "Last measurement older than 24 h — measure with the medical kit.", updatedAt: lastBp.ts };
  } else ind.bp = { key: "bp", label: INDICATOR_LABEL.bp, value: "—", status: "no_data", reason: "Not measured. Use the medical kit cuff at rest." };

  const lastGlu = assessments.find((a) => a.glucose != null);
  if (lastGlu) {
    const e = evalGlucose(lastGlu.glucose as number);
    ind.glucose = { key: "glucose", label: INDICATOR_LABEL.glucose, value: `${lastGlu.glucose} mg/dL`, status: fresh(lastGlu.ts) ? e.status : "no_data", reason: fresh(lastGlu.ts) ? e.reason : "Last measurement older than 24 h.", updatedAt: lastGlu.ts };
  } else ind.glucose = { key: "glucose", label: INDICATOR_LABEL.glucose, value: "—", status: "no_data", reason: "Not measured. Fasting reading with the glucometer." };

  const lastTemp = assessments.find((a) => a.tempC != null);
  if (lastTemp) {
    const e = evalTemp(lastTemp.tempC as number);
    ind.temp = { key: "temp", label: INDICATOR_LABEL.temp, value: `${fmt1(lastTemp.tempC as number)} °C`, status: fresh(lastTemp.ts) ? e.status : "no_data", reason: fresh(lastTemp.ts) ? e.reason : "Last measurement older than 24 h.", updatedAt: lastTemp.ts };
  } else ind.temp = { key: "temp", label: INDICATOR_LABEL.temp, value: "—", status: "no_data", reason: "Not measured. Oral thermometer reading." };

  if (latestBlood) {
    const b = evalBlood(latestBlood, profile.sex, t);
    let status: Status = b.status;
    let reason = b.reason;
    if (bloodDaysLeft < 0) {
      status = worst(status, "attention");
      reason = `Blood count overdue by ${Math.abs(bloodDaysLeft)} day(s). ` + reason;
    }
    ind.blood = {
      key: "blood",
      label: INDICATOR_LABEL.blood,
      value: `Hb ${fmt1(latestBlood.hb)} g/dL · Hct ${fmt1(latestBlood.hct)}%`,
      status,
      reason,
      updatedAt: latestBlood.ts,
    };
  } else {
    ind.blood = { key: "blood", label: INDICATOR_LABEL.blood, value: "—", status: "no_data", reason: "No blood count recorded." };
  }

  const alerts = (Object.values(ind) as IndicatorEval[])
    .filter((i) => STATUS_META[i.status].rank >= 1)
    .sort((a, b) => STATUS_META[b.status].rank - STATUS_META[a.status].rank);
  const overall = worst(...(Object.values(ind) as IndicatorEval[]).map((i) => i.status));

  const snap: Snapshot = {
    mission,
    doseBefore,
    doseProjected,
    hrZ: hr.z,
    profile,
    day,
    series,
    current,
    baseline,
    latestAssessment,
    assessmentFresh,
    latestBlood,
    nextBloodDue,
    bloodDaysLeft,
    sleepHours,
    sleepSource: sleepFromLog ? "record" : "simulated",
    indicators: ind,
    alerts,
    overall,
  };
  cache.set(id, { key, snap });
  return snap;
}
