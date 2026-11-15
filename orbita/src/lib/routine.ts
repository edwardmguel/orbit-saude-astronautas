import type { CrewData } from "@/types";
import type { Snapshot } from "./health";
import { BLOOD_INTERVAL_DAYS } from "./health";
import { DAY_MS } from "./sim";

export type TaskKind = "auto" | "manual" | "sleep";

export interface RoutineTask {
  id: string;
  title: string;
  description: string;
  periodicity: string;
  group: "daily" | "periodic";
  kind: TaskKind;
  done: boolean;
  deadline: string;
  lastDone?: number;
  route?: string;
  xp: number;
}

const H = 3_600_000;

function lastLog(data: CrewData, taskId: string) {
  return data.taskLogs.filter((l) => l.taskId === taskId).sort((a, b) => b.ts - a.ts)[0]?.ts;
}

function dueText(last: number | undefined, intervalMs: number, now: number) {
  if (!last) return "Pending — complete now";
  const due = last + intervalMs;
  const left = due - now;
  if (left <= 0) return "Overdue";
  if (left < DAY_MS) return `Next in ${Math.max(1, Math.round(left / H))} h`;
  return `Next in ${Math.ceil(left / DAY_MS)} day(s)`;
}

export function buildRoutine(snap: Snapshot, data: CrewData, now = Date.now()): RoutineTask[] {
  const a = snap.latestAssessment;
  const aFresh = snap.assessmentFresh;
  const aTs = a?.ts;
  const daily = (done: boolean, last?: number) => (done ? dueText(last, DAY_MS, now) : "Today · 24 h window");

  const sleepLast = data.sleepLogs.map((s) => s.ts).sort((x, y) => y - x)[0];
  const sleepDone = !!sleepLast && now - sleepLast < DAY_MS;
  const checkLast = lastLog(data, "check");
  const checkDone = !!checkLast && now - checkLast < DAY_MS;

  const tasks: RoutineTask[] = [
    { id: "hydration", title: "Log hydration", description: "Enter the amount of water consumed in the last 24 hours.", periodicity: "Daily", group: "daily", kind: "auto", done: aFresh, deadline: daily(aFresh, aTs), lastDone: aTs, route: "/?s=assessment", xp: 0 },
    { id: "fatigue", title: "Report fatigue", description: "Record the perceived fatigue level on a scale of 0 to 10.", periodicity: "Daily", group: "daily", kind: "auto", done: aFresh, deadline: daily(aFresh, aTs), lastDone: aTs, route: "/?s=assessment", xp: 0 },
    { id: "appetite", title: "Update appetite", description: "Indicate whether appetite is normal, reduced or very reduced.", periodicity: "Daily", group: "daily", kind: "auto", done: aFresh, deadline: daily(aFresh, aTs), lastDone: aTs, route: "/?s=assessment", xp: 0 },
    { id: "assessment", title: "Complete personal assessment", description: "Finish and save the full daily assessment on the main dashboard.", periodicity: "Daily", group: "daily", kind: "auto", done: aFresh, deadline: daily(aFresh, aTs), lastDone: aTs, route: "/?s=assessment", xp: 50 },
    { id: "check", title: "Review automatic indicators", description: "Review heart rate, dosimetry, pulse oximetry and EOG on the dashboard.", periodicity: "Daily", group: "daily", kind: "manual", done: checkDone, deadline: daily(checkDone, checkLast), lastDone: checkLast, route: "/", xp: 20 },
    { id: "sleep", title: "Log sleep", description: "Enter hours slept, when available.", periodicity: "Daily", group: "daily", kind: "sleep", done: sleepDone, deadline: daily(sleepDone, sleepLast), lastDone: sleepLast, xp: 20 },
  ];

  // Repeat the measurement when an automatic indicator is at attention or above
  const autoFlag = (["hr", "spo2", "dose", "eog"] as const).filter((k) => ["attention", "alert", "critical"].includes(snap.indicators[k].status));
  if (autoFlag.length) {
    const last = lastLog(data, "remeasure");
    const done = !!last && now - last < 12 * H;
    tasks.push({
      id: "remeasure",
      title: `Repeat measurement: ${autoFlag.map((k) => snap.indicators[k].label.split(" (")[0].toLowerCase()).join(", ")}`,
      description: "Indicator outside the monitoring criteria. Repeat the measurement at rest to confirm the reading.",
      periodicity: "Every 12 h while flagged",
      group: "daily",
      kind: "manual",
      done,
      deadline: done ? dueText(last, 12 * H, now) : "Recommended now",
      lastDone: last,
      xp: 20,
    });
  }

  const bloodDone = snap.bloodDaysLeft > 0;
  tasks.push({
    id: "blood",
    title: "Blood count",
    description: "Record the periodic blood count results on the Blood Count card.",
    periodicity: `Every ${BLOOD_INTERVAL_DAYS} days`,
    group: "periodic",
    kind: "auto",
    done: bloodDone && snap.bloodDaysLeft > 3,
    deadline: snap.bloodDaysLeft < 0 ? `Overdue by ${Math.abs(snap.bloodDaysLeft)} day(s)` : `Next in ${snap.bloodDaysLeft} day(s)`,
    lastDone: snap.latestBlood?.ts,
    route: "/?s=bloodcount",
    xp: 80,
  });
  const visionLast = lastLog(data, "vision");
  const visionDone = !!visionLast && now - visionLast < 7 * DAY_MS;
  tasks.push({
    id: "vision",
    title: "Supplementary assessment — vision",
    description: "Visual acuity test and Amsler grid for SANS monitoring.",
    periodicity: "Weekly",
    group: "periodic",
    kind: "manual",
    done: visionDone,
    deadline: dueText(visionLast, 7 * DAY_MS, now),
    lastDone: visionLast,
    xp: 30,
  });
  const examsLast = lastLog(data, "exams");
  const examsDone = !!examsLast && now - examsLast < 7 * DAY_MS;
  tasks.push({
    id: "exams",
    title: "Periodic exam update",
    description: "Review personal dosimeter, body mass and exercise records.",
    periodicity: "Weekly",
    group: "periodic",
    kind: "manual",
    done: examsDone,
    deadline: dueText(examsLast, 7 * DAY_MS, now),
    lastDone: examsLast,
    xp: 30,
  });
  return tasks;
}

/* ---------- Gamification: HEALTH ON TRACK MISSION ---------- */
const LEVELS = [0, 150, 400, 750, 1200, 1800, 2600, 3600];
const LEVEL_NAMES = ["Orbital Recruit", "Crew Member", "Onboard Specialist", "Navigator", "Routine Commander", "Orbital Veteran", "Health Sentinel", "Mission Legend"];

export interface Gamification {
  xp: number;
  level: number;
  levelName: string;
  levelStart: number;
  levelNext: number;
  achievements: { id: string; title: string; desc: string; unlocked: boolean; progress: number }[];
  challenges: { id: string; title: string; current: number; target: number }[];
}

function streak(data: CrewData, now: number) {
  const days = new Set(data.assessments.map((a) => Math.floor((now - a.ts) / DAY_MS)));
  let s = 0;
  const start = days.has(0) ? 0 : 1;
  while (days.has(start + s)) s++;
  return s;
}

export function buildGamification(data: CrewData, routine: RoutineTask[], now = Date.now()): Gamification {
  // Points are earned only for completing assessments and tasks — never for physiological results.
  const xp =
    data.assessments.length * 50 +
    data.bloodTests.length * 80 +
    data.sleepLogs.length * 20 +
    data.taskLogs.reduce((s, l) => s + (l.taskId === "vision" || l.taskId === "exams" ? 30 : 20), 0) +
    data.explored.length * 10;
  let level = 0;
  while (level + 1 < LEVELS.length && xp >= LEVELS[level + 1]) level++;
  const levelStart = LEVELS[level];
  const levelNext = LEVELS[level + 1] ?? LEVELS[level] + 1000;

  const hydDays = new Set(data.assessments.filter((a) => now - a.ts < 7 * DAY_MS).map((a) => Math.floor((now - a.ts) / DAY_MS))).size;
  const dailyTasks = routine.filter((t) => t.group === "daily");
  const dailyDone = dailyTasks.filter((t) => t.done).length;
  const explored = data.explored.length;
  const regions = data.explored.filter((e) => !e.startsWith("risk-")).length;
  const sleepN = data.sleepLogs.length;
  const st = streak(data, now);

  return {
    xp,
    level: level + 1,
    levelName: LEVEL_NAMES[level],
    levelStart,
    levelNext,
    achievements: [
      { id: "hyd", title: "Consistent hydration", desc: "Hydration logged on 5 of the last 7 days.", unlocked: hydDays >= 5, progress: Math.min(1, hydDays / 5) },
      { id: "routine", title: "Routine on track", desc: "All daily activities completed.", unlocked: dailyTasks.length > 0 && dailyDone === dailyTasks.length, progress: dailyTasks.length ? dailyDone / dailyTasks.length : 0 },
      { id: "explorer", title: "Health explorer", desc: "Explore 5 body map regions or space risks.", unlocked: explored >= 5, progress: Math.min(1, explored / 5) },
      { id: "sleep", title: "Sleep monitored", desc: "Log sleep on 3 occasions.", unlocked: sleepN >= 3, progress: Math.min(1, sleepN / 3) },
      { id: "lab", title: "Lab follow-up", desc: "Record one periodic blood count.", unlocked: data.bloodTests.length >= 1, progress: Math.min(1, data.bloodTests.length) },
      { id: "seq", title: "7-day streak", desc: "Daily assessment for 7 days in a row.", unlocked: st >= 7, progress: Math.min(1, st / 7) },
    ],
    challenges: [
      { id: "c1", title: "Complete the daily routine", current: dailyDone, target: dailyTasks.length },
      { id: "c2", title: "Daily assessment for 7 days in a row", current: Math.min(7, st), target: 7 },
      { id: "c3", title: "Explore all 9 body map regions", current: Math.min(9, regions), target: 9 },
    ],
  };
}
