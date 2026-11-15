export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function fmtDateTime(ts: number) {
  return new Date(ts).toLocaleString("en-US", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}
export function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
}
export function fmtShortDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });
}
export function relTime(ts: number, now = Date.now()) {
  const diff = Math.round((now - ts) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff} min ago`;
  const h = Math.round(diff / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}
export function pad3(n: number) {
  return String(n).padStart(3, "0");
}

export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s₂]/g, " ");
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
