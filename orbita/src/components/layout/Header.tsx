import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, ChevronDown, ChevronRight, Menu } from "lucide-react";
import { MISSIONS, MISSION_ORDER } from "@/data/missions";
import { commsFor, fmtDelay } from "@/lib/physics";
import { OrbitaLogo } from "../OrbitaLogo";
import { Avatar, STATUS_ICON } from "../ui";
import { useApp } from "@/lib/store";
import { STATUS_META } from "@/lib/health";
import { navigate } from "@/lib/router";
import { cn, pad3, relTime } from "@/lib/util";

export function Header({ onMenu }: { onMenu: () => void }) {
  const { selected, state, photoOf, now } = useApp();
  if (!selected) return null;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-navy/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-1.5 px-3 sm:gap-3 sm:px-6">
        {/* Explicit menu button: the logo also opens the menu, but not everyone discovers that. */}
        <button
          onClick={onMenu}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-line px-2 py-2 text-mist transition hover:bg-white/[0.05] hover:text-ink sm:px-3"
          aria-label="Open navigation menu"
        >
          <Menu size={20} strokeWidth={2} />
          <span className="hidden text-[13px] font-medium sm:inline">Menu</span>
        </button>
        <button
          onClick={onMenu}
          className="group flex items-center gap-2.5 rounded-xl px-1.5 py-1.5 transition hover:bg-white/[0.04]"
          aria-label="Open navigation menu"
          tabIndex={-1}
        >
          <span className="transition-transform duration-300 group-hover:rotate-[-8deg] group-active:scale-95">
            <OrbitaLogo size={34} />
          </span>
          <span className="font-display text-[14px] font-semibold tracking-[0.14em] text-ink min-[400px]:text-[15px] min-[400px]:tracking-[0.2em] sm:text-[17px] sm:tracking-[0.28em]">ORBIT</span>
        </button>

        <div className="mx-2 hidden h-7 w-px bg-line md:block" />

        <button onClick={() => navigate("/profile")} className="flex min-w-0 items-center gap-2.5 rounded-xl px-1.5 py-1 text-left transition hover:bg-white/[0.04]">
          <Avatar src={photoOf(selected.profile.id)} alt={selected.profile.name} size={34} status={selected.overall} className="!hidden sm:!inline-block" />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-[10.5px] font-semibold tracking-[0.1em] text-ink sm:text-[11.5px] sm:tracking-[0.18em]">
              <span className="hidden min-[400px]:inline">ASTRONAUT </span>
              <span className="min-[400px]:hidden">ASTR. </span>
              {selected.profile.code}
            </div>
            <div className="hidden truncate text-[12px] text-mist sm:block">{selected.profile.name}</div>
          </div>
        </button>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-4">
          <MissionSelector />
          <div className="hidden h-7 w-px bg-line md:block" />
          <div className="text-right leading-tight">
            <div className="label !text-[10px]">{selected.mission.dayLabel}</div>
            <div className="font-display text-[13px] font-semibold tracking-[0.16em] tabular">
              {pad3(selected.mission.dayLabel === "Sol" ? marsSol(state.missionStart, now) : selected.day)}
            </div>
          </div>
          <NotificationCenter />
        </div>
      </div>
    </header>
  );
}

/** Mars solar day: 24 h 39 min 35.244 s. */
const SOL_MS = 88_775_244;
function marsSol(missionStart: number, now: number) {
  return Math.max(1, Math.floor((now - missionStart) / SOL_MS) + 1);
}

function MissionSelector() {
  const { state, setMission, now } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const on = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", on);
    window.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", on);
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  const cur = MISSIONS[state.missionId];
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Mission ${cur.code}. Change mission profile`}
        className={cn("flex shrink-0 items-center gap-1 rounded-xl px-1.5 py-1 text-right leading-tight transition hover:bg-white/[0.05] sm:gap-1.5 sm:px-2", open && "bg-white/[0.05]")}
      >
        <div>
          <div className="label !text-[10px] !tracking-[0.1em] sm:!tracking-[0.16em]">Mission</div>
          <div className="whitespace-nowrap font-display text-[11.5px] font-semibold tracking-[0.06em] sm:text-[13px] sm:tracking-[0.16em]">
            <span className="md:hidden">{cur.short.toUpperCase()}</span>
            <span className="hidden md:inline">{cur.code}</span>
          </div>
        </div>
        <ChevronDown size={13} className={cn("mt-2.5 shrink-0 text-mist transition-transform", open && "rotate-180 text-cyan")} />
      </button>
      {open && (
        <div role="listbox" aria-label="Mission profile" className="glass sheet-up fixed inset-x-3 top-[68px] z-50 !bg-[#0b1b2b]/98 p-1.5 sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-[360px]">
          <div className="px-3 pb-1.5 pt-2 text-[10.5px] text-faint">Readings and criteria adapt to the selected environment</div>
          {MISSION_ORDER.map((id) => {
            const m = MISSIONS[id];
            const active = id === state.missionId;
            const c = commsFor(m, now);
            return (
              <button
                key={id}
                role="option"
                aria-selected={active}
                onClick={() => {
                  if (!active) setMission(id);
                  setOpen(false);
                }}
                className={cn("flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[0.04]", active && "bg-cyan/[0.07] shadow-[inset_0_0_0_1px_rgba(33,197,239,.3)]")}
              >
                <span className={cn("mt-1 h-2.5 w-2.5 shrink-0 rounded-full border", active ? "border-cyan bg-cyan shadow-[0_0_8px_#21c5ef]" : "border-mist/50")} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-[13px] font-semibold tracking-[0.12em]">{m.short.toUpperCase()}</span>
                    <span className="truncate font-display text-[10.5px] tracking-[0.12em] text-mist">{m.code}</span>
                  </div>
                  <div className="text-[11.5px] text-mist">{m.name}</div>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-faint tabular">
                    <span>{m.gravityLabel}</span>
                    <span>{m.doseRate.toFixed(2)} mSv/day</span>
                    <span>Signal {fmtDelay(c.oneWaySec)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NotificationCenter() {
  const { notifications, unread, state, markRead, selectCrew } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const on = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", on);
    window.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", on);
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  const read = new Set(state.readNotifications);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn("relative ml-1 rounded-xl p-2.5 text-mist transition hover:bg-white/[0.05] hover:text-ink", open && "bg-white/[0.05] text-ink")}
        aria-label={`Notifications (${unread} unread)`}
        aria-expanded={open}
      >
        <Bell size={19} />
        {unread > 0 && (
          <span className="absolute right-1 top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-cyan px-1 text-[10px] font-bold text-navy shadow-[0_0_10px_#21c5ef]">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="glass sheet-up fixed inset-x-3 top-[68px] z-50 !bg-[#0b1b2b]/98 sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-[400px]">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="section-title text-[12px]">Notification center</span>
            <button onClick={() => markRead(notifications.map((n) => n.id))} className="flex items-center gap-1 text-[11.5px] text-cyan hover:underline">
              <CheckCheck size={13} /> Mark all as read
            </button>
          </div>
          <div className="scroll-thin max-h-[65dvh] overflow-y-auto p-1.5">
            {notifications.length === 0 && <p className="p-6 text-center text-sm text-mist">No notifications.</p>}
            {notifications.map((n) => {
              const Icon = STATUS_ICON[n.status];
              const unreadN = !read.has(n.id);
              return (
                <button
                  key={n.id}
                  onClick={() => {
                    markRead([n.id]);
                    selectCrew(n.crewId);
                    navigate(n.route);
                    setOpen(false);
                  }}
                  className="group flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[0.04]"
                >
                  <Icon size={16} color={STATUS_META[n.status].color} className="mt-0.5 shrink-0" strokeWidth={2.2} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={cn("truncate text-[13px] font-medium", unreadN ? "text-ink" : "text-mist")}>{n.title}</span>
                      {unreadN && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />}
                    </div>
                    <div className="mt-0.5 line-clamp-2 text-[12px] text-mist">{n.body}</div>
                    <div className="mt-1 flex items-center gap-2 text-[10.5px] text-faint">
                      <span className="font-display tracking-[0.12em]">{n.crewLabel.toUpperCase()}</span>
                      <span>·</span>
                      <span>{relTime(n.ts)}</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="mt-1 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-cyan" />
                </button>
              );
            })}
          </div>
          <div className="border-t border-line px-4 py-2 text-[10.5px] text-faint">Notifications for the whole crew · generated locally</div>
        </div>
      )}
    </div>
  );
}
