import { useEffect, useState } from "react";
import { Activity, BarChart3, Bot, CalendarCheck2, ClipboardPlus, LayoutDashboard, PersonStanding, ShieldAlert, UserRound, Users, X } from "lucide-react";
import { OrbitaLogo } from "../OrbitaLogo";
import { Avatar, StatusDot } from "../ui";
import { useApp } from "@/lib/store";
import { navigate, type Route } from "@/lib/router";
import { cn, pad3 } from "@/lib/util";

export const MENU = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, to: "/" },
  { key: "crew", label: "Crew", icon: Users, to: "/crew" },
  { key: "map", label: "Body map", icon: PersonStanding, to: "/?s=map" },
  { key: "assessment", label: "Health assessment", icon: ClipboardPlus, to: "/?s=assessment" },
  { key: "ai", label: "ORBITA AI", icon: Bot, to: "/ai" },
  { key: "reports", label: "Reports", icon: BarChart3, to: "/reports" },
  { key: "routine", label: "Mission routine", icon: CalendarCheck2, to: "/routine" },
  { key: "risks", label: "Space risks", icon: ShieldAlert, to: "/risks" },
  { key: "profile", label: "Astronaut profile", icon: UserRound, to: "/profile" },
] as const;

function activeKey(r: Route) {
  if (r.page !== "overview") return r.page;
  const s = r.params.get("s");
  return s === "map" ? "map" : s === "assessment" || s === "bloodcount" ? "assessment" : "overview";
}

export function Sidebar({ open, onClose, route }: { open: boolean; onClose: () => void; route: Route }) {
  const { selected, state, photoOf } = useApp();
  const [online, setOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(navigator.onLine);
    window.addEventListener("online", on);
    window.addEventListener("offline", on);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", on);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open, onClose]);

  const act = activeKey(route);
  return (
    <>
      <div
        className={cn("fixed inset-0 z-40 bg-[#030810]/60 backdrop-blur-[2px] transition-opacity duration-300", open ? "opacity-100" : "pointer-events-none opacity-0")}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[290px] max-w-[86vw] flex-col border-r border-line bg-[#091725]/95 backdrop-blur-xl transition-transform duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)]",
          open ? "translate-x-0 shadow-[30px_0_80px_-30px_rgba(33,197,239,0.25)]" : "-translate-x-full",
        )}
        aria-label="Navigation menu"
        aria-hidden={!open}
        {...(!open ? { inert: "" } : {})}
      >
        <div className="flex items-center justify-between px-5 pb-4 pt-5">
          <div className="flex items-center gap-2.5">
            <OrbitaLogo size={32} />
            <span className="font-display text-[17px] font-semibold tracking-[0.28em]">ORBITA</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-mist hover:bg-white/5 hover:text-ink" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <nav className="scroll-thin flex-1 overflow-y-auto px-3 py-2">
          {MENU.map((m, i) => {
            const Icon = m.icon;
            const on = act === m.key;
            return (
              <button
                key={m.key}
                onClick={() => {
                  navigate(m.to);
                  onClose();
                }}
                className={cn(
                  "group relative mb-0.5 flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition",
                  on ? "bg-cyan/10 text-ink" : "text-mist hover:bg-white/[0.04] hover:text-ink",
                )}
                style={{ transitionDelay: open ? `${i * 18}ms` : "0ms" }}
                aria-current={on ? "page" : undefined}
              >
                {on && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_#21c5ef]" />}
                <Icon size={18} className={on ? "text-cyan" : "text-faint group-hover:text-cyan/80"} strokeWidth={1.8} />
                {m.label}
              </button>
            );
          })}
        </nav>
        {selected && state && (
          <div className="m-3 rounded-xl border border-line bg-navy/60 p-3.5">
            <div className="flex items-center gap-3">
              <Avatar src={photoOf(selected.profile.id)} alt={selected.profile.name} size={40} status={selected.overall} />
              <div className="min-w-0">
                <div className="label !text-[10px]">Astronaut {selected.profile.code}</div>
                <div className="truncate text-sm font-medium">{selected.profile.name}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <div className="text-faint">Mission</div>
                <div className="font-display font-semibold tracking-wider">{state.missionName}</div>
              </div>
              <div>
                <div className="text-faint">Day</div>
                <div className="font-display font-semibold tracking-wider">{pad3(selected.day)}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[11px] text-mist">
              <StatusDot status="normal" size={7} pulse />
              <span className="flex-1">Local system active</span>
              <span className="flex items-center gap-1 text-faint">
                <Activity size={11} /> {online ? "Network online" : "Offline mode"}
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
