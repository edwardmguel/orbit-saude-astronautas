import { useEffect, useState } from "react";
import { ArrowRight, RotateCcw, UserPlus, X } from "lucide-react";
import { useApp } from "@/lib/store";
import { navigate } from "@/lib/router";
import { STATUS_META, type Snapshot } from "@/lib/health";
import { ProfileForm } from "@/components/ProfileForm";
import { Modal, PageTitle, STATUS_ICON, StatusBadge, StatusDot } from "@/components/ui";
import { cn } from "@/lib/util";
import type { Status } from "@/types";

function AlertSign({ status }: { status: Status }) {
  const Icon = STATUS_ICON[status];
  const color = STATUS_META[status].color;
  const flagged = STATUS_META[status].rank >= 1;
  return (
    <span
      className={cn("absolute right-2.5 top-2.5 flex items-center justify-center rounded-full backdrop-blur-[3px]", flagged ? "h-9 w-9 alert-pulse" : "h-7 w-7")}
      style={{ background: `${color}${flagged ? "40" : "2e"}`, border: `1.5px solid ${color}aa`, ["--pulse-color" as string]: `${color}99` }}
      title={`${STATUS_META[status].label}: ${STATUS_META[status].desc}`}
      aria-label={`Status: ${STATUS_META[status].label}`}
    >
      <Icon size={flagged ? 18 : 14} color={color} strokeWidth={2.4} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </span>
  );
}

export function Crew() {
  const { state, snapshot, photoOf, selectCrew, addCrew, restoreDemo, toast } = useApp();
  const [armed, setArmed] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [fresh, setFresh] = useState<string | null>(null);

  const snaps = state.crew.map((c) => snapshot(c.id)).filter(Boolean) as Snapshot[];
  const armedSnap = snaps.find((s) => s.profile.id === armed) ?? null;

  useEffect(() => {
    const on = (e: KeyboardEvent) => e.key === "Escape" && setArmed(null);
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  const open = (s: Snapshot) => {
    selectCrew(s.profile.id);
    setArmed(null);
    navigate("/");
  };

  const onCard = (s: Snapshot) => {
    // CASE 2: no indicators needing attention → dashboard on the first click
    if (s.alerts.length === 0) return open(s);
    // CASE 1: with indicators → first click lists the indicators; second click opens
    if (armed === s.profile.id) return open(s);
    setArmed(s.profile.id);
  };

  const counts = snaps.reduce(
    (acc, s) => {
      const r = STATUS_META[s.overall].rank;
      if (r >= 1) acc.flag++;
      else acc.ok++;
      return acc;
    },
    { ok: 0, flag: 0 },
  );

  return (
    <div>
      <PageTitle
        title="CREW"
        subtitle="Individual health monitoring of the crew."
        right={
          <div className="flex items-center gap-3 text-[12px] text-mist">
            <span className="flex items-center gap-1.5"><StatusDot status="normal" size={7} /> {counts.ok} within criteria</span>
            <span className="flex items-center gap-1.5"><StatusDot status="alert" size={7} /> {counts.flag} flagged</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {snaps.map((s, i) => {
          const isSel = state.selectedCrewMemberId === s.profile.id;
          const isArmed = armed === s.profile.id;
          return (
            <button
              key={s.profile.id}
              onClick={() => onCard(s)}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[16px] border bg-navy-2 text-left transition duration-300 animate-fade-up hover:-translate-y-0.5",
                isArmed ? "border-cyan/80 shadow-[0_0_0_1px_rgba(33,197,239,.5),0_20px_50px_-20px_rgba(33,197,239,.55)]" : isSel ? "border-cyan/45" : "border-line hover:border-cyan/35",
                fresh === s.profile.id && "ring-2 ring-cyan/60",
              )}
              style={{ animationDelay: `${i * 50}ms` }}
              aria-label={`${s.profile.name}, astronaut ${s.profile.code}, status ${STATUS_META[s.overall].label}${s.alerts.length ? `, ${s.alerts.length} indicators need attention` : ""}`}
              aria-expanded={s.alerts.length ? isArmed : undefined}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <img src={photoOf(s.profile.id)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" draggable={false} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-2/70 via-transparent to-transparent" />
                {STATUS_META[s.overall].rank >= 1 && (
                  <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen" style={{ background: `radial-gradient(circle at 88% 10%, ${STATUS_META[s.overall].color}33, transparent 45%)` }} />
                )}
                <AlertSign status={s.overall} />
                {isSel && (
                  <span className="absolute bottom-2.5 left-2.5 rounded-full border border-cyan/40 bg-navy/75 px-2 py-0.5 font-display text-[9.5px] font-semibold tracking-[0.16em] text-cyan backdrop-blur">
                    MONITORING
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-line px-3 py-2.5">
                <div className="min-w-0">
                  <div className="truncate text-[13.5px] font-medium text-ink">{s.profile.name}</div>
                  <div className="font-display text-[10.5px] tracking-[0.16em] text-faint">ASTRONAUT {s.profile.code}</div>
                </div>
                <StatusDot status={s.overall} size={8} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button className="btn-primary" onClick={() => setAdding(true)}>
          <UserPlus size={16} /> Add crew member
        </button>
        <button className="btn-ghost" onClick={() => setConfirmReset(true)}>
          <RotateCcw size={14} /> Restore demo data
        </button>
      </div>
      <p className="mt-4 text-center text-[11.5px] text-faint">
        Tap a photo to open monitoring. Flagged crew members first show the indicators that need attention.
      </p>

      {/* Alert panel (non-blocking: allows the second click on the photo) */}
      {armedSnap && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[430px] sm:p-0">
          <div className="glass sheet-up !bg-[#0b1b2b]/97 shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)]" role="dialog" aria-label="Indicators that need attention">
            <div className="flex items-start gap-3 border-b border-line p-4">
              <img src={photoOf(armedSnap.profile.id)} alt="" className="h-12 w-12 rounded-[10px] border border-line object-cover" />
              <div className="min-w-0 flex-1">
                <div className="font-display text-[12px] font-semibold tracking-[0.14em] text-ink">ASTRONAUT {armedSnap.profile.code} — INDICATORS THAT NEED ATTENTION</div>
                <div className="mt-0.5 flex items-center gap-2 text-[12px] text-mist">
                  {armedSnap.profile.name} <StatusBadge status={armedSnap.overall} size="xs" />
                </div>
              </div>
              <button onClick={() => setArmed(null)} className="rounded-lg p-1 text-faint hover:bg-white/5 hover:text-ink" aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <ul className="scroll-thin max-h-[42dvh] space-y-2 overflow-y-auto p-4">
              {armedSnap.alerts.map((a, i) => {
                const Icon = STATUS_ICON[a.status];
                return (
                  <li key={a.key} className="flex gap-3 rounded-xl border border-line bg-navy/50 p-3 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                    <Icon size={17} color={STATUS_META[a.status].color} className="mt-0.5 shrink-0" strokeWidth={2.3} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[13px] font-medium">{a.label}</span>
                        <span className="font-display text-[12.5px] font-semibold tabular" style={{ color: STATUS_META[a.status].color }}>
                          {a.value.split(" · ")[0]}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[12px] leading-snug text-mist">{a.reason}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between gap-3 border-t border-line p-4">
              <span className="text-[11px] text-faint">or click the photo again</span>
              <button className="btn-primary" onClick={() => open(armedSnap)}>
                Access monitoring <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal open={adding} onClose={() => setAdding(false)} title="ADD CREW MEMBER">
        <p className="-mt-1 mb-5 text-[13px] text-mist">Fill in the details to create the profile and start individual monitoring of the new crew member.</p>
        <ProfileForm
          submitLabel="Register crew member"
          onSubmit={async (p, photo) => {
            const id = await addCrew(p, photo);
            setAdding(false);
            setFresh(id);
            setTimeout(() => setFresh(null), 2600);
            toast(`${p.name} added to the crew`);
          }}
        />
      </Modal>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="RESTORE DEMO DATA">
        <p className="text-[13px] leading-relaxed text-mist">
          Demo profiles, avatars and initial indicators will be restored. Crew members added and records made during the demonstration will be removed. Your profile (Astronaut 001) and photo will be kept.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
          <button
            className="btn-primary"
            onClick={async () => {
              await restoreDemo();
              setConfirmReset(false);
              setArmed(null);
              toast("Demo data restored");
            }}
          >
            <RotateCcw size={14} /> Restore
          </button>
        </div>
      </Modal>
    </div>
  );
}
