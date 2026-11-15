import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AppState, BloodTest, ChatMessage, CrewProfile, DailyAssessment, Thresholds } from "@/types";
import { buildInitialState, newCrewSim, nextCode, restoreDemoState, seedNewCrewData } from "@/data/demo";
import { demoAvatar } from "@/data/avatars";
import { deletePhoto, loadAllPhotos, loadState, savePhoto, saveState } from "./storage";
import { emptyData, snapshotFor, type Snapshot } from "./health";
import { buildNotifications, type Notification } from "./notifications";
import { uid } from "./util";
import { MISSIONS, type MissionId } from "@/data/missions";

export type ProfileInput = Omit<CrewProfile, "id" | "code" | "createdAt" | "demo">;

interface Toast {
  id: string;
  text: string;
  tone: "ok" | "info" | "warn";
}

interface Store {
  ready: boolean;
  state: AppState | null;
  now: number;
  photoOf: (id: string) => string | undefined;
  snapshot: (id: string) => Snapshot | null;
  selected: Snapshot | null;
  notifications: Notification[];
  unread: number;
  toasts: Toast[];
  register: (p: ProfileInput, photo: string) => Promise<void>;
  addCrew: (p: ProfileInput, photo: string) => Promise<string>;
  updateProfile: (id: string, p: ProfileInput, photo?: string) => Promise<void>;
  selectCrew: (id: string) => void;
  addAssessment: (id: string, v: Omit<DailyAssessment, "id" | "ts">) => void;
  addBloodTest: (id: string, b: Omit<BloodTest, "id" | "ts">) => void;
  logTask: (id: string, taskId: string) => void;
  logSleep: (id: string, hours: number) => void;
  explore: (id: string, key: string) => void;
  pushChat: (id: string, msgs: ChatMessage[]) => void;
  clearChat: (id: string) => void;
  markRead: (ids: string[]) => void;
  setThresholds: (t: Thresholds) => void;
  setMission: (id: MissionId) => void;
  restoreDemo: () => Promise<void>;
  toast: (text: string, tone?: Toast["tone"]) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState | null>(null);
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const first = useRef(true);

  useEffect(() => {
    setState(loadState());
    loadAllPhotos().then((p) => {
      setPhotos(p);
      setReady(true);
    });
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (state) saveState(state);
  }, [state]);

  const toast = useCallback((text: string, tone: Toast["tone"] = "ok") => {
    const id = uid();
    setToasts((t) => [...t.slice(-2), { id, text, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  const mutate = useCallback((fn: (s: AppState) => AppState) => setState((s) => (s ? fn(s) : s)), []);
  const mutateData = useCallback(
    (id: string, fn: (d: AppState["data"][string]) => AppState["data"][string], event?: { title: string; route: string }) =>
      mutate((s) => ({
        ...s,
        data: { ...s.data, [id]: fn(s.data[id] ?? emptyData()) },
        events: event ? [...s.events, { id: uid(), ts: Date.now(), crewId: id, ...event }].slice(-30) : s.events,
      })),
    [mutate],
  );

  const photoOf = useCallback((id: string) => photos[id] ?? demoAvatar(id), [photos]);

  const register = useCallback(async (p: ProfileInput, photo: string) => {
    const s = buildInitialState(p);
    await savePhoto("astronaut-001", photo);
    setPhotos((ph) => ({ ...ph, "astronaut-001": photo }));
    saveState(s);
    setState(s);
  }, []);

  const addCrew = useCallback(
    async (p: ProfileInput, photo: string) => {
      if (!state) return "";
      const code = nextCode(state.crew);
      const id = `astronaut-${code}`;
      const profile: CrewProfile = { ...p, id, code, createdAt: Date.now(), demo: false };
      await savePhoto(id, photo);
      setPhotos((ph) => ({ ...ph, [id]: photo }));
      mutate((s) => ({
        ...s,
        crew: [...s.crew, profile],
        sim: { ...s.sim, [id]: newCrewSim(code) },
        data: { ...s.data, [id]: seedNewCrewData(profile, s.missionStart) },
        events: [...s.events, { id: uid(), ts: Date.now(), crewId: id, title: `New crew member registered: ${p.name}`, route: "/crew" }],
      }));
      return id;
    },
    [state, mutate],
  );

  const updateProfile = useCallback(
    async (id: string, p: ProfileInput, photo?: string) => {
      if (photo) {
        await savePhoto(id, photo);
        setPhotos((ph) => ({ ...ph, [id]: photo }));
      }
      mutate((s) => ({ ...s, crew: s.crew.map((c) => (c.id === id ? { ...c, ...p } : c)) }));
    },
    [mutate],
  );

  const restoreDemo = useCallback(async () => {
    if (!state) return;
    for (const c of state.crew) if (c.id !== "astronaut-001") await deletePhoto(c.id);
    setPhotos((ph): Record<string, string> => (ph["astronaut-001"] ? { "astronaut-001": ph["astronaut-001"] } : {}));
    const fresh = restoreDemoState(state);
    saveState(fresh);
    setState(fresh);
  }, [state]);

  const store = useMemo<Store>(() => {
    const snapshot = (id: string) => (state ? snapshotFor(state, id, now) : null);
    const notifications = state ? buildNotifications(state, now) : [];
    const read = new Set(state?.readNotifications ?? []);
    return {
      ready,
      state,
      now,
      photoOf,
      snapshot,
      selected: state ? snapshot(state.selectedCrewMemberId) : null,
      notifications,
      unread: notifications.filter((n) => !read.has(n.id)).length,
      toasts,
      register,
      addCrew,
      updateProfile,
      restoreDemo,
      toast,
      selectCrew: (id) => mutate((s) => ({ ...s, selectedCrewMemberId: id })),
      addAssessment: (id, v) => {
        mutateData(id, (d) => ({ ...d, assessments: [...d.assessments, { id: uid(), ts: Date.now(), ...v }] }), { title: "Daily assessment recorded", route: "/?s=assessment" });
        setNow(Date.now());
      },
      addBloodTest: (id, b) => {
        const ts = new Date(`${b.date}T12:00:00`).getTime();
        mutateData(id, (d) => ({ ...d, bloodTests: [...d.bloodTests, { id: uid(), ...b, ts: Math.min(ts, Date.now()) }] }), { title: "Blood count recorded", route: "/?s=bloodcount" });
        setNow(Date.now());
      },
      logTask: (id, taskId) => {
        mutateData(id, (d) => ({ ...d, taskLogs: [...d.taskLogs, { id: uid(), taskId, ts: Date.now() }] }));
        setNow(Date.now());
      },
      logSleep: (id, hours) => {
        mutateData(id, (d) => ({ ...d, sleepLogs: [...d.sleepLogs, { id: uid(), ts: Date.now(), hours }] }), { title: `Sleep logged: ${hours} h`, route: "/routine" });
        setNow(Date.now());
      },
      explore: (id, key) => mutateData(id, (d) => (d.explored.includes(key) ? d : { ...d, explored: [...d.explored, key] })),
      pushChat: (id, msgs) => mutateData(id, (d) => ({ ...d, chat: [...d.chat, ...msgs].slice(-80) })),
      clearChat: (id) => mutateData(id, (d) => ({ ...d, chat: [] })),
      markRead: (ids) => mutate((s) => ({ ...s, readNotifications: Array.from(new Set([...s.readNotifications, ...ids])).slice(-400) })),
      setThresholds: (t) => mutate((s) => ({ ...s, thresholds: t })),
      setMission: (id) => {
        mutate((s) => ({
          ...s,
          missionId: id,
          missionName: MISSIONS[id].code,
          events: [...s.events, { id: uid(), ts: Date.now(), crewId: s.selectedCrewMemberId, title: `Mission profile switched to ${MISSIONS[id].code}`, route: "/" }].slice(-30),
        }));
        toast(`Mission profile: ${MISSIONS[id].code} · ${MISSIONS[id].gravityLabel}`, "info");
      },
    };
  }, [state, now, ready, photoOf, toasts, register, addCrew, updateProfile, restoreDemo, toast, mutate, mutateData]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}

/** Shortcut for pages that require loaded state. */
export function useApp() {
  const s = useStore();
  return { ...s, state: s.state as AppState, selected: s.selected as Snapshot };
}
