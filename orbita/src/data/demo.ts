import type { AppState, Appetite, BloodTest, CrewData, CrewProfile, DailyAssessment, SimParams } from "@/types";
import { DAY_MS, noise, randomNormalParams } from "@/lib/sim";
import { DEFAULT_THRESHOLDS, emptyData } from "@/lib/health";
import { uid } from "@/lib/util";
import { DEFAULT_MISSION, MISSIONS, type MissionId } from "./missions";

export const DEMO_START_DAY = 45;

type Condition = "normal" | "attention" | "critical";

const DEMO_CREW: { profile: Omit<CrewProfile, "createdAt">; sim: SimParams; cond: Condition }[] = [
  {
    profile: { id: "astronaut-002", code: "002", name: "Helena Duarte", sex: "F", weightKg: 61, heightCm: 168, notes: "Flight engineer. No restrictions on record.", demo: true },
    sim: { seed: 202, hrBase: 62, hrDrift: 0, spo2Base: 98, spo2Drop: 0, doseBase: 0.54, doseSpike: 0, blinkBase: 17, eogBase: 24, eogDrift: 0, sleepBase: 7.5, sleepDrop: 0 },
    cond: "normal",
  },
  {
    profile: { id: "astronaut-003", code: "003", name: "Rafael Moreau", sex: "M", weightKg: 78, heightCm: 181, notes: "Mission specialist. History of mild migraine.", demo: true },
    sim: { seed: 303, hrBase: 64, hrDrift: 13, spo2Base: 98, spo2Drop: 0, doseBase: 0.56, doseSpike: 0, blinkBase: 16, eogBase: 30, eogDrift: 4, sleepBase: 7.3, sleepDrop: 0.9 },
    cond: "attention",
  },
  {
    profile: { id: "astronaut-004", code: "004", name: "Yuki Tanaka", sex: "F", weightKg: 57, heightCm: 162, notes: "Flight surgeon. Nutritional follow-up in progress.", demo: true },
    sim: { seed: 404, hrBase: 66, hrDrift: 22, spo2Base: 97, spo2Drop: 8, doseBase: 0.55, doseSpike: 0.85, blinkBase: 17, eogBase: 34, eogDrift: 31, sleepBase: 7.0, sleepDrop: 1.8 },
    cond: "critical",
  },
];

const r1 = (n: number) => Math.round(n * 10) / 10;

function seedAssessments(seed: number, cond: Condition, day: number, now: number, includeToday: boolean): DailyAssessment[] {
  const out: DailyAssessment[] = [];
  for (let d = 1; d <= day; d++) {
    const ago = day - d; // days ago
    if (ago === 0 && !includeToday) continue;
    if (ago > 1 && noise(seed, d, 11) > 0.78) continue; // some days without a record
    const late = Math.max(0, 1 - ago / 6); // recent trend
    let hyd = 2.4 + noise(seed, d, 12) * 0.3;
    let fat = 3 + noise(seed, d, 13) * 1.2;
    let app: Appetite = "normal";
    if (cond === "attention") {
      hyd = 2.2 + noise(seed, d, 12) * 0.2;
      fat = 3 + 3.2 * late + noise(seed, d, 13) * 0.6;
    }
    if (cond === "critical") {
      hyd = 2.3 - 1.1 * late + noise(seed, d, 12) * 0.15;
      fat = 3 + 5 * late + noise(seed, d, 13) * 0.4;
      app = ago <= 2 ? "very_reduced" : ago <= 6 ? "reduced" : "normal";
    }
    // Mood (1–5) and kit vital signs: simulated demo values inside the docs/03 Earth references,
    // except the scripted deviations of the attention/critical scenarios.
    let mood = Math.round(4 + noise(seed, d, 15) * 0.45);
    if (cond === "attention") mood = ago <= 1 ? 3 : mood;
    if (cond === "critical") mood = ago <= 1 ? 2 : ago <= 4 ? 3 : mood;
    const vitals = ago === 0 || d % 3 === 0;
    const sbp = Math.round(114 + noise(seed, d, 16) * 4);
    const dbp = Math.round(73 + noise(seed, d, 17) * 3);
    const glucose = Math.round(88 + noise(seed, d, 18) * 6);
    const tempC = r1(cond === "critical" && ago <= 1 ? 37.5 : 36.8 + noise(seed, d, 19) * 0.2);
    out.push({
      id: uid(),
      ts: now - ago * DAY_MS - (ago === 0 ? 2 : 1.5 + Math.abs(noise(seed, d, 14))) * 3_600_000 - (includeToday ? 0 : 2 * 3_600_000),
      hydrationL: r1(Math.max(0.4, hyd)),
      fatigue: Math.round(Math.min(10, Math.max(0, fat))),
      appetite: app,
      mood: Math.min(5, Math.max(1, mood)),
      ...(vitals ? { sbp, dbp, glucose, tempC } : {}),
    });
  }
  return out;
}

function seedBlood(seed: number, sex: "M" | "F", cond: Condition, day: number, now: number): BloodTest[] {
  const out: BloodTest[] = [];
  const days = [1, 16, 31].filter((d) => d < day);
  days.forEach((d, i) => {
    const ts = now - (day - d) * DAY_MS - 5 * 3_600_000;
    const n = (c: number) => noise(seed, d, 20 + c);
    let hb = (sex === "M" ? 15.2 : 13.6) + n(1) * 0.4;
    let wbc = 6.4 + n(2) * 0.8;
    if (cond === "critical") {
      hb = 13.1 - i * 1.1;
      wbc = 5.4 - i * 0.9;
    }
    const hct = hb * 2.95 + n(3);
    out.push({
      id: uid(),
      ts,
      date: new Date(ts).toISOString().slice(0, 10),
      rbc: Math.round((sex === "M" ? 5.1 : 4.5) * (hb / (sex === "M" ? 15.2 : 13.6)) * 100) / 100,
      hb: r1(hb),
      hct: r1(hct),
      wbc: r1(wbc),
      plt: Math.round(250 + n(4) * 40 - (cond === "critical" ? i * 20 : 0)),
      other: i === days.length - 1 && cond === "critical" ? "Ferritin requested to complement the assessment." : "",
    });
  });
  return out;
}

function demoDataFor(id: string, sex: "M" | "F", seed: number, cond: Condition, day: number, now: number, includeToday: boolean): CrewData {
  const data = emptyData();
  data.assessments = seedAssessments(seed, cond, day, now, includeToday);
  data.bloodTests = seedBlood(seed, sex, cond, day, now);
  if (id === "astronaut-002") {
    data.sleepLogs = [4, 3, 2, 1].map((a) => ({ id: uid(), ts: now - a * DAY_MS - 3 * 3_600_000, hours: r1(7.3 + noise(seed, a, 30) * 0.4) }));
    data.taskLogs = [
      { id: uid(), taskId: "vision", ts: now - 3 * DAY_MS },
      { id: uid(), taskId: "exams", ts: now - 2 * DAY_MS },
      { id: uid(), taskId: "check", ts: now - 3 * 3_600_000 },
    ];
    data.explored = ["eyes", "heart", "bones", "lungs", "risk-sans", "risk-bone"];
  }
  if (id === "astronaut-003") {
    data.taskLogs = [{ id: uid(), taskId: "vision", ts: now - 5 * DAY_MS }];
    data.explored = ["head", "risk-sleep"];
  }
  if (id === "astronaut-004") {
    data.taskLogs = [{ id: uid(), taskId: "exams", ts: now - 4 * DAY_MS }];
    data.explored = ["lungs"];
  }
  return data;
}

export function nextCode(crew: CrewProfile[]): string {
  const max = crew.reduce((m, c) => Math.max(m, parseInt(c.code, 10) || 0), 0);
  return String(max + 1).padStart(3, "0");
}

export function newCrewSim(code: string): SimParams {
  return randomNormalParams(1000 + parseInt(code, 10) * 37);
}

/** Creates the initial state on first access: the registered astronaut (001) + demo crew. */
export function buildInitialState(user: Omit<CrewProfile, "id" | "code" | "createdAt" | "demo">, now = Date.now(), missionId: MissionId = DEFAULT_MISSION): AppState {
  const missionStart = now - (DEMO_START_DAY - 1) * DAY_MS - 3 * 3_600_000;
  const me: CrewProfile = { ...user, id: "astronaut-001", code: "001", createdAt: now, demo: false };
  const state: AppState = {
    version: 1,
    registered: true,
    missionId,
    missionName: MISSIONS[missionId].code,
    missionStart,
    crew: [me],
    sim: { [me.id]: randomNormalParams(101) },
    data: { [me.id]: demoDataFor(me.id, me.sex, 101, "normal", DEMO_START_DAY, now, false) },
    selectedCrewMemberId: me.id,
    thresholds: structuredClone(DEFAULT_THRESHOLDS),
    readNotifications: [],
    events: [],
  };
  for (const d of DEMO_CREW) {
    state.crew.push({ ...d.profile, createdAt: now });
    state.sim[d.profile.id] = { ...d.sim };
    state.data[d.profile.id] = demoDataFor(d.profile.id, d.profile.sex, d.sim.seed, d.cond, DEMO_START_DAY, now, true);
  }
  return state;
}

/** Restores demo profiles, avatars and indicators while keeping astronaut 001's profile. */
export function restoreDemoState(prev: AppState): AppState {
  const me = prev.crew.find((c) => c.id === "astronaut-001") ?? prev.crew[0];
  const fresh = buildInitialState({ name: me.name, sex: me.sex, weightKg: me.weightKg, heightCm: me.heightCm, notes: me.notes }, Date.now(), prev.missionId ?? DEFAULT_MISSION);
  fresh.crew[0] = { ...fresh.crew[0], createdAt: me.createdAt };
  return fresh;
}

/** Initializes the monitoring data of a new crew member. */
export function seedNewCrewData(profile: CrewProfile, missionStart: number, now = Date.now()): CrewData {
  const day = Math.max(1, Math.floor((now - missionStart) / DAY_MS) + 1);
  const seed = 1000 + parseInt(profile.code, 10) * 37;
  const data = emptyData();
  data.bloodTests = seedBlood(seed, profile.sex, "normal", day, now).slice(-1);
  return data;
}
