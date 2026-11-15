import type { MissionId } from "@/data/missions";

export type Sex = "M" | "F";
export type Status = "normal" | "attention" | "alert" | "critical" | "no_data";
export type Appetite = "normal" | "reduced" | "very_reduced";

export interface CrewProfile {
  id: string; // e.g. "astronaut-002"
  code: string; // e.g. "002"
  name: string;
  sex: Sex;
  weightKg: number;
  heightCm: number;
  notes: string;
  createdAt: number;
  demo: boolean;
}

/** Simulated data generator parameters (deterministic per astronaut). */
export interface SimParams {
  seed: number;
  hrBase: number;
  hrDrift: number;
  spo2Base: number;
  spo2Drop: number;
  doseBase: number; // mSv/day
  doseSpike: number;
  blinkBase: number; // blinks/min
  eogBase: number; // experimental index 0–100
  eogDrift: number;
  sleepBase: number; // hours
  sleepDrop: number;
}

export interface DailyAssessment {
  id: string;
  ts: number;
  hydrationL: number;
  fatigue: number;
  appetite: Appetite;
  /** Self-reported mood, 1 (very low) to 5 (very good) — docs/03 `humor`. */
  mood?: number;
  /** Optional vital signs measured with the medical kit. */
  sbp?: number; // mmHg
  dbp?: number; // mmHg
  glucose?: number; // mg/dL, fasting
  tempC?: number; // °C, oral
}

export interface BloodTest {
  id: string;
  ts: number;
  date: string; // yyyy-mm-dd
  rbc?: number; // million/µL
  hb: number; // g/dL
  hct: number; // %
  wbc: number; // thousand/µL
  plt: number; // thousand/µL
  other?: string;
}

export interface SleepLog {
  id: string;
  ts: number;
  hours: number;
}

export interface TaskLog {
  id: string;
  taskId: string;
  ts: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  ts: number;
  refs?: string[];
}

export interface RecordEvent {
  id: string;
  ts: number;
  crewId: string;
  title: string;
  route: string;
}

export interface CrewData {
  assessments: DailyAssessment[];
  bloodTests: BloodTest[];
  sleepLogs: SleepLog[];
  taskLogs: TaskLog[];
  chat: ChatMessage[];
  explored: string[];
}

export interface Thresholds {
  hr: { devAttention: number; devAlert: number; devCritical: number; min: number; max: number; critMin: number; critMax: number };
  spo2: { attention: number; alert: number; critical: number };
  /** Multiples of the mission's expected daily dose rate. */
  dose: { attention: number; alert: number; critical: number };
  eog: { attention: number; alert: number; critical: number };
  hydration: { attention: number; alert: number; critical: number };
  fatigue: { attention: number; alert: number; critical: number };
  sleep: { attention: number; alert: number; critical: number };
  blood: { alertPct: number; criticalPct: number };
}

export interface AppState {
  version: 1;
  registered: boolean;
  missionId: MissionId;
  missionName: string;
  missionStart: number;
  crew: CrewProfile[];
  sim: Record<string, SimParams>;
  data: Record<string, CrewData>;
  selectedCrewMemberId: string;
  thresholds: Thresholds;
  readNotifications: string[];
  events: RecordEvent[];
}

export type IndicatorKey =
  | "hr"
  | "dose"
  | "spo2"
  | "eog"
  | "hydration"
  | "fatigue"
  | "appetite"
  | "blood"
  | "sleep"
  | "bp"
  | "glucose"
  | "temp"
  | "mood";

export interface IndicatorEval {
  key: IndicatorKey;
  label: string;
  value: string;
  status: Status;
  reason: string;
  updatedAt?: number;
}

export interface DayPoint {
  day: number;
  ts: number;
  hr: number;
  spo2: number;
  dose: number; // daily dose (mSv)
  doseCum: number; // accumulated (mSv)
  blink: number;
  eog: number;
  sleep: number;
}
