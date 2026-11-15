import type { AppState } from "@/types";
import { DEFAULT_MISSION, MISSIONS } from "@/data/missions";
import { DEFAULT_THRESHOLDS } from "./health";

const KEY = "orbita:state:v2";

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as AppState;
    if (!(s && s.version === 1 && s.registered)) return null;
    // Migration: states saved before mission profiles existed
    if (!s.missionId || !MISSIONS[s.missionId]) {
      s.missionId = DEFAULT_MISSION;
      s.missionName = MISSIONS[DEFAULT_MISSION].code;
      s.thresholds = { ...s.thresholds, dose: { ...DEFAULT_THRESHOLDS.dose } };
    }
    return s;
  } catch {
    return null;
  }
}

export function saveState(s: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch (e) {
    console.warn("ORBITA: failed to save local state", e);
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

/* ---------- Photos: IndexedDB ---------- */
const DB = "orbita-photos";
const STORE = "photos";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T> | void): Promise<T | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const req = fn(t.objectStore(STORE));
    t.oncomplete = () => resolve(req ? (req.result as T) : undefined);
    t.onerror = () => reject(t.error);
  });
}

export async function savePhoto(id: string, dataUrl: string) {
  try {
    await tx("readwrite", (s) => s.put(dataUrl, id));
  } catch (e) {
    console.warn("ORBITA: IndexedDB unavailable, using localStorage", e);
    try {
      localStorage.setItem(`orbita:photo:${id}`, dataUrl);
    } catch {
      /* ignore */
    }
  }
}

export async function deletePhoto(id: string) {
  try {
    await tx("readwrite", (s) => s.delete(id));
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(`orbita:photo:${id}`);
  } catch {
    /* ignore */
  }
}

export async function loadAllPhotos(): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const t = db.transaction(STORE, "readonly");
      const req = t.objectStore(STORE).openCursor();
      req.onsuccess = () => {
        const c = req.result;
        if (c) {
          out[String(c.key)] = c.value as string;
          c.continue();
        }
      };
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
    });
  } catch {
    /* ignore */
  }
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith("orbita:photo:")) out[k.slice(13)] ??= localStorage.getItem(k) ?? "";
    }
  } catch {
    /* ignore */
  }
  return out;
}
