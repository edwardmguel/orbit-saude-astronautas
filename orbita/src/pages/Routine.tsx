import { useState } from "react";
import { ArrowRight, Award, Check, CircleDashed, Lock, Moon, Sparkles, Target, Trophy } from "lucide-react";
import { useApp } from "@/lib/store";
import { navigate } from "@/lib/router";
import { buildGamification, buildRoutine, type RoutineTask } from "@/lib/routine";
import { emptyData } from "@/lib/health";
import { PageTitle, ProgressBar, SectionHeader } from "@/components/ui";
import { cn, relTime } from "@/lib/util";

export default function Routine() {
  const { selected: s, state, logTask, logSleep, toast } = useApp();
  const data = state.data[s.profile.id] ?? emptyData();
  const tasks = buildRoutine(s, data);
  const game = buildGamification(data, tasks);
  const daily = tasks.filter((t) => t.group === "daily");
  const periodic = tasks.filter((t) => t.group === "periodic");
  const done = tasks.filter((t) => t.done).length;

  const complete = (t: RoutineTask) => {
    logTask(s.profile.id, t.id);
    toast(`Activity completed · +${t.xp} XP`);
  };

  return (
    <div>
      <PageTitle title="MISSION ROUTINE" subtitle={`Assessments and periodic actions · Astronaut ${s.profile.code} — ${s.profile.name}`} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <div className="glass p-4 animate-fade-up sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="label">Activity progress</div>
                <div className="mt-1 font-display text-3xl font-semibold tabular">
                  {done}
                  <span className="text-lg text-faint">/{tasks.length}</span>
                </div>
              </div>
              <div className="text-right text-[12px] text-mist">
                Daily: {daily.filter((t) => t.done).length}/{daily.length} · Periodic: {periodic.filter((t) => t.done).length}/{periodic.length}
              </div>
            </div>
            <ProgressBar value={done / tasks.length} className="mt-3 !h-2" />
          </div>

          <section>
            <SectionHeader title="Daily activities" subtitle="24-hour window" />
            <div className="space-y-2">
              {daily.map((t, i) => (
                <TaskRow key={t.id} t={t} i={i} onComplete={() => complete(t)} onSleep={(h) => { logSleep(s.profile.id, h); toast(`Sleep logged: ${h} h · +20 XP`); }} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Periodic activities" subtitle="Blood count, supplementary assessments and exams" />
            <div className="space-y-2">
              {periodic.map((t, i) => (
                <TaskRow key={t.id} t={t} i={i} onComplete={() => complete(t)} onSleep={() => undefined} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="glass relative overflow-hidden p-5 animate-fade-up">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/10 blur-3xl" />
            <div className="section-title flex items-center gap-2 text-[12.5px] text-cyan">
              <Target size={15} /> Mission: Health on Track
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                <svg viewBox="0 0 80 80" className="absolute inset-0 -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(145,164,184,.12)" strokeWidth="5" />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="#21C5EF"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${((game.xp - game.levelStart) / (game.levelNext - game.levelStart)) * 213.6} 213.6`}
                    style={{ filter: "drop-shadow(0 0 6px #21c5ef)", transition: "stroke-dasharray .8s ease" }}
                  />
                </svg>
                <div className="text-center leading-none">
                  <div className="text-[9px] tracking-[0.2em] text-faint">LEVEL</div>
                  <div className="font-display text-2xl font-semibold">{game.level}</div>
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display text-[15px] font-semibold">{game.levelName}</div>
                <div className="mt-0.5 font-display text-2xl font-semibold text-cyan tabular">{game.xp.toLocaleString("en-US")} XP</div>
                <div className="text-[11px] text-faint">{(game.levelNext - game.xp).toLocaleString("en-US")} XP to level {game.level + 1}</div>
              </div>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-faint">Points are awarded for completing assessments and follow-up tasks — never for physiological results.</p>
          </div>

          <div className="glass p-5">
            <div className="label mb-3 flex items-center gap-1.5"><Sparkles size={12} /> Challenges</div>
            <div className="space-y-3.5">
              {game.challenges.map((c) => (
                <div key={c.id}>
                  <div className="flex justify-between gap-2 text-[12.5px]">
                    <span>{c.title}</span>
                    <span className="text-mist tabular">{c.current}/{c.target}</span>
                  </div>
                  <ProgressBar value={c.target ? c.current / c.target : 0} className="mt-1.5" color={c.current >= c.target ? "#22C55E" : "#21C5EF"} />
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-5">
            <div className="label mb-3 flex items-center gap-1.5"><Trophy size={12} /> Achievements</div>
            <div className="grid grid-cols-2 gap-2">
              {game.achievements.map((a) => (
                <div key={a.id} className={cn("rounded-xl border p-3 transition", a.unlocked ? "border-cyan/40 bg-cyan/[0.06]" : "border-line opacity-70")} title={a.desc}>
                  <div className="flex items-center justify-between">
                    {a.unlocked ? <Award size={17} className="text-cyan" /> : <Lock size={14} className="text-faint" />}
                    {!a.unlocked && <span className="text-[10px] text-faint tabular">{Math.round(a.progress * 100)}%</span>}
                  </div>
                  <div className={cn("mt-2 font-display text-[10.5px] font-semibold uppercase leading-tight tracking-[0.1em]", a.unlocked ? "text-ink" : "text-mist")}>{a.title}</div>
                  <div className="mt-1 text-[10.5px] leading-snug text-faint">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TaskRow({ t, i, onComplete, onSleep }: { t: RoutineTask; i: number; onComplete: () => void; onSleep: (h: number) => void }) {
  const [hours, setHours] = useState("7.0");
  const [err, setErr] = useState(false);
  return (
    <div className={cn("glass flex flex-col gap-3 p-3.5 animate-fade-up sm:flex-row sm:items-center sm:p-4", t.done && "!border-st-normal/20")} style={{ animationDelay: `${i * 35}ms` }}>
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition", t.done ? "border-st-normal bg-st-normal/15 text-st-normal" : "border-line text-faint")}>
          {t.done ? <Check size={13} strokeWidth={3} /> : <CircleDashed size={13} />}
        </span>
        <div className="min-w-0">
          <div className={cn("text-[13.5px] font-medium", t.done && "text-ink/70")}>{t.title}</div>
          <div className="text-[12px] text-mist">{t.description}</div>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-faint">
            <span>{t.periodicity}</span>
            <span className={cn(!t.done && /Overdue|now|Recommended/.test(t.deadline) && "text-st-attention")}>Deadline: {t.deadline}</span>
            {t.lastDone && <span>Last: {relTime(t.lastDone)}</span>}
            {t.xp > 0 && <span className="text-cyan/70">+{t.xp} XP</span>}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2 pl-9 sm:pl-0">
        <span className={cn("rounded-full px-2 py-0.5 font-display text-[10px] font-semibold tracking-[0.14em]", t.done ? "bg-st-normal/10 text-st-normal" : "bg-st-attention/10 text-st-attention")}>
          {t.done ? "COMPLETED" : "PENDING"}
        </span>
        {!t.done && t.kind === "manual" && (
          <button className="btn-ghost !py-1.5 text-[12px]" onClick={onComplete}>
            <Check size={13} /> Complete
          </button>
        )}
        {!t.done && t.kind === "auto" && t.route && (
          <button className="btn-ghost !py-1.5 text-[12px]" onClick={() => navigate(t.route!)}>
            Log <ArrowRight size={13} />
          </button>
        )}
        {!t.done && t.kind === "sleep" && (
          <form
            className="flex items-center gap-1.5"
            onSubmit={(e) => {
              e.preventDefault();
              const h = Number(hours.replace(",", "."));
              if (Number.isNaN(h) || h < 0 || h > 16) return setErr(true);
              setErr(false);
              onSleep(Math.round(h * 10) / 10);
            }}
          >
            <Moon size={14} className="text-cyan" />
            <input className="field !w-16 !py-1.5 text-center tabular" value={hours} onChange={(e) => setHours(e.target.value)} aria-label="Hours of sleep" aria-invalid={err} inputMode="decimal" />
            <span className="text-[11.5px] text-mist">h</span>
            <button type="submit" className="btn-ghost !py-1.5 text-[12px]">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
