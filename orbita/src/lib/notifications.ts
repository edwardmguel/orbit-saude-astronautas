import type { AppState, Status } from "@/types";
import { STATUS_META, snapshotFor } from "./health";
import { buildRoutine } from "./routine";
import { emptyData } from "./health";

export interface Notification {
  id: string;
  crewId: string;
  crewLabel: string;
  kind: "pending" | "bloodcount" | "indicator" | "alert" | "task" | "record";
  title: string;
  body: string;
  status: Status;
  route: string;
  ts: number;
}

export function buildNotifications(state: AppState, now = Date.now()): Notification[] {
  const out: Notification[] = [];
  for (const c of state.crew) {
    const snap = snapshotFor(state, c.id, now);
    if (!snap) continue;
    const label = `Astronaut ${c.code} · ${c.name.split(" ")[0]}`;
    const day = snap.day;
    if (STATUS_META[snap.overall].rank >= 2)
      out.push({ id: `alert-${c.id}-${snap.overall}-${day}`, crewId: c.id, crewLabel: label, kind: "alert", title: "New health alert", body: `Overall status: ${STATUS_META[snap.overall].label}. ${snap.alerts.length} indicator(s) flagged.`, status: snap.overall, route: "/crew", ts: now - 60_000 });
    for (const a of snap.alerts.filter((x) => ["hr", "spo2", "dose", "eog"].includes(x.key)))
      out.push({ id: `ind-${c.id}-${a.key}-${a.status}-${day}`, crewId: c.id, crewLabel: label, kind: "indicator", title: `Change: ${a.label}`, body: `${a.value}. ${a.reason}`, status: a.status, route: "/reports", ts: now - 120_000 });
    if (!snap.assessmentFresh)
      out.push({ id: `daily-${c.id}-${day}`, crewId: c.id, crewLabel: label, kind: "pending", title: "Daily assessment pending", body: "Log hydration, fatigue, appetite and mood for the last 24 h.", status: "no_data", route: "/?s=assessment", ts: now - 180_000 });
    if (snap.bloodDaysLeft <= 3)
      out.push({ id: `blood-${c.id}-${snap.latestBlood?.id ?? "none"}-${snap.bloodDaysLeft < 0 ? "late" : "soon"}`, crewId: c.id, crewLabel: label, kind: "bloodcount", title: snap.bloodDaysLeft < 0 ? "Blood count overdue" : "Blood count due soon", body: snap.bloodDaysLeft < 0 ? `Deadline passed ${Math.abs(snap.bloodDaysLeft)} day(s) ago.` : `Next blood count in ${snap.bloodDaysLeft} day(s).`, status: snap.bloodDaysLeft < 0 ? "attention" : "no_data", route: "/?s=bloodcount", ts: now - 240_000 });
    const routine = buildRoutine(snap, state.data[c.id] ?? emptyData(), now);
    const pending = routine.filter((t) => t.group === "daily" && !t.done && t.kind !== "auto");
    if (pending.length)
      out.push({ id: `task-${c.id}-${day}-${pending.map((p) => p.id).join(".")}`, crewId: c.id, crewLabel: label, kind: "task", title: "Mission task not completed", body: pending.map((p) => p.title).join(" · "), status: "no_data", route: "/routine", ts: now - 300_000 });
  }
  for (const e of state.events.slice(-12)) {
    const c = state.crew.find((x) => x.id === e.crewId);
    if (!c) continue;
    out.push({ id: `rec-${e.id}`, crewId: c.id, crewLabel: `Astronaut ${c.code} · ${c.name.split(" ")[0]}`, kind: "record", title: "New record available", body: e.title, status: "normal", route: e.route, ts: e.ts });
  }
  return out.sort((a, b) => b.ts - a.ts);
}
