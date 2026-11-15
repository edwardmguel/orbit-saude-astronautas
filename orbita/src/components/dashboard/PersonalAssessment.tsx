import { useEffect, useState, type ReactNode } from "react";
import { Activity, Droplet, Droplets, Gauge, Minus, Plus, Save, Smile, Thermometer, Utensils } from "lucide-react";
import type { Appetite, IndicatorEval } from "@/types";
import { APPETITE_LABEL, MOOD_LABEL, STATUS_META, evalAppetite, evalFatigue, evalHydration, fmt1, type Snapshot } from "@/lib/health";
import { useApp } from "@/lib/store";
import { cn, fmtDateTime, fmtShortDate } from "@/lib/util";
import { StatusBadge, StatusDot } from "../ui";
import { BloodPanel } from "./BloodPanel";

export function PersonalAssessment({ snap }: { snap: Snapshot }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <DailyForm snap={snap} />
        <DailyResults snap={snap} />
      </div>
      <BloodPanel snap={snap} />
    </div>
  );
}

function DailyForm({ snap }: { snap: Snapshot }) {
  const { addAssessment, toast, state } = useApp();
  const last = snap.latestAssessment;
  const [hyd, setHyd] = useState(last?.hydrationL ?? 2.0);
  const [fat, setFat] = useState(last?.fatigue ?? 3);
  const [app, setApp] = useState<Appetite>(last?.appetite ?? "normal");
  const [mood, setMood] = useState<number>(last?.mood ?? 4);
  const [vit, setVit] = useState({ sbp: "", dbp: "", glucose: "", tempC: "" });
  const [err, setErr] = useState<string | null>(null);
  const [vErr, setVErr] = useState<string | null>(null);

  useEffect(() => {
    setHyd(last?.hydrationL ?? 2.0);
    setFat(last?.fatigue ?? 3);
    setApp(last?.appetite ?? "normal");
    setMood(last?.mood ?? 4);
    setVit({ sbp: "", dbp: "", glucose: "", tempC: "" });
    setErr(null);
    setVErr(null);
    // reset when switching astronaut
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snap.profile.id]);

  const num = (s: string) => (s.trim() === "" ? undefined : Number(s.replace(",", ".")));

  const save = () => {
    if (Number.isNaN(hyd) || hyd < 0 || hyd > 10) {
      setErr("Enter hydration between 0 and 10 liters.");
      return;
    }
    setErr(null);
    const sbp = num(vit.sbp);
    const dbp = num(vit.dbp);
    const glucose = num(vit.glucose);
    const tempC = num(vit.tempC);
    // Plausibility checks only (input validation, not clinical limits)
    if ((sbp == null) !== (dbp == null)) return setVErr("Enter both systolic and diastolic pressure.");
    if (sbp != null && dbp != null && (Number.isNaN(sbp) || Number.isNaN(dbp) || sbp < 50 || sbp > 260 || dbp < 30 || dbp > 160 || dbp >= sbp)) return setVErr("Check the blood pressure values (systolic must be greater than diastolic).");
    if (glucose != null && (Number.isNaN(glucose) || glucose < 20 || glucose > 600)) return setVErr("Enter glucose in mg/dL (20–600).");
    if (tempC != null && (Number.isNaN(tempC) || tempC < 30 || tempC > 43)) return setVErr("Enter body temperature in °C (30–43).");
    setVErr(null);
    addAssessment(snap.profile.id, {
      hydrationL: Math.round(hyd * 10) / 10,
      fatigue: fat,
      appetite: app,
      mood,
      ...(sbp != null && dbp != null ? { sbp: Math.round(sbp), dbp: Math.round(dbp) } : {}),
      ...(glucose != null ? { glucose: Math.round(glucose) } : {}),
      ...(tempC != null ? { tempC: Math.round(tempC * 10) / 10 } : {}),
    });
    setVit({ sbp: "", dbp: "", glucose: "", tempC: "" });
    toast(`Daily assessment recorded · Astronaut ${snap.profile.code}`);
  };

  const fatStatus = evalFatigue(fat, state.thresholds).status;
  return (
    <div className="glass p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="section-title text-[12px] text-ink">Daily assessment</div>
          <div className="mt-0.5 text-[12px] text-mist">24-hour period</div>
        </div>
        {snap.assessmentFresh ? (
          <span className="rounded-full border border-st-normal/30 bg-st-normal/10 px-2.5 py-1 text-[11px] text-st-normal">Recorded · {fmtDateTime(last!.ts)}</span>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full border border-st-attention/30 bg-st-attention/10 px-2.5 py-1 text-[11px] text-st-attention">
            <StatusDot status="attention" size={6} pulse /> Pending in the last 24 h
          </span>
        )}
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label className="mb-2 flex items-center gap-2 text-[13px] font-medium" htmlFor="hyd">
            <Droplets size={15} className="text-cyan" /> Hydration <span className="text-[11.5px] font-normal text-faint">· water intake (L)</span>
          </label>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-ghost !px-3" onClick={() => setHyd((h) => Math.max(0, Math.round((h - 0.1) * 10) / 10))} aria-label="Decrease by 0.1 L">
              <Minus size={14} />
            </button>
            <input
              id="hyd"
              type="number"
              step="0.1"
              min="0"
              max="10"
              className="field max-w-28 text-center font-display text-lg font-semibold tabular"
              value={Number.isNaN(hyd) ? "" : hyd}
              onChange={(e) => setHyd(parseFloat(e.target.value))}
              aria-invalid={!!err}
            />
            <button type="button" className="btn-ghost !px-3" onClick={() => setHyd((h) => Math.min(10, Math.round((h + 0.1) * 10) / 10))} aria-label="Increase by 0.1 L">
              <Plus size={14} />
            </button>
            <span className="text-sm text-mist">liters</span>
          </div>
          {err && <p className="mt-1.5 text-xs text-st-critical">{err}</p>}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-[13px] font-medium" htmlFor="fat">
              <Gauge size={15} className="text-cyan" /> Fatigue <span className="text-[11.5px] font-normal text-faint">· scale of 0 to 10</span>
            </label>
            <span className="font-display text-xl font-semibold tabular" style={{ color: STATUS_META[fatStatus].color }}>
              {fat}
              <span className="text-xs text-faint">/10</span>
            </span>
          </div>
          <input id="fat" type="range" min={0} max={10} step={1} value={fat} onChange={(e) => setFat(Number(e.target.value))} className="range" style={{ ["--pct" as string]: `${fat * 10}%` }} />
          <div className="mt-1 flex justify-between text-[10.5px] text-faint">
            <span>No fatigue</span>
            <span>Extreme fatigue</span>
          </div>
        </div>

        <div>
          <span className="mb-2 flex items-center gap-2 text-[13px] font-medium">
            <Utensils size={15} className="text-cyan" /> Appetite
          </span>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Appetite">
            {(Object.keys(APPETITE_LABEL) as Appetite[]).map((a) => (
              <button
                key={a}
                type="button"
                role="radio"
                aria-checked={app === a}
                onClick={() => setApp(a)}
                className={cn(
                  "rounded-[10px] border px-2 py-2 text-[12.5px] transition",
                  app === a ? "border-cyan/70 bg-cyan/10 text-ink" : "border-line bg-navy/60 text-mist hover:border-cyan/30",
                )}
              >
                {APPETITE_LABEL[a]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 flex items-center gap-2 text-[13px] font-medium">
            <Smile size={15} className="text-cyan" /> Mood <span className="text-[11.5px] font-normal text-faint">· scale of 1 to 5</span>
          </span>
          <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Mood">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={mood === v}
                onClick={() => setMood(v)}
                className={cn(
                  "rounded-[10px] border px-1 py-1.5 text-center transition",
                  mood === v ? "border-cyan/70 bg-cyan/10 text-ink" : "border-line bg-navy/60 text-mist hover:border-cyan/30",
                )}
              >
                <div className="font-display text-[15px] font-semibold">{v}</div>
                <div className="text-[9.5px] leading-tight">{MOOD_LABEL[v]}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-navy/40 p-3">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-1">
            <span className="flex items-center gap-2 text-[13px] font-medium">
              <Activity size={15} className="text-cyan" /> Vital signs
            </span>
            <span className="text-[11px] text-faint">Optional · when measured with the medical kit</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <VitalInput id="sbp" label="Systolic" unit="mmHg" value={vit.sbp} onChange={(v) => setVit((x) => ({ ...x, sbp: v }))} placeholder="118" />
            <VitalInput id="dbp" label="Diastolic" unit="mmHg" value={vit.dbp} onChange={(v) => setVit((x) => ({ ...x, dbp: v }))} placeholder="76" />
            <VitalInput id="glu" label="Glucose (fasting)" unit="mg/dL" value={vit.glucose} onChange={(v) => setVit((x) => ({ ...x, glucose: v }))} placeholder="90" />
            <VitalInput id="tmp" label="Temperature (oral)" unit="°C" value={vit.tempC} onChange={(v) => setVit((x) => ({ ...x, tempC: v }))} placeholder="36.8" />
          </div>
          <p className="mt-2 text-[10.5px] leading-snug text-faint">
            Earth references (not flight limits): BP 90–120 / 60–80 mmHg · fasting glucose &lt; 100 mg/dL · oral temperature 36.5–37.3 °C. Measure at rest.
          </p>
          {vErr && <p className="mt-1.5 text-xs text-st-critical">{vErr}</p>}
        </div>

        <button onClick={save} className="btn-primary w-full">
          <Save size={15} /> {snap.assessmentFresh ? "Update assessment" : "Save assessment"}
        </button>
      </div>
    </div>
  );
}

function VitalInput({ id, label, unit, value, onChange, placeholder }: { id: string; label: string; unit: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label htmlFor={id} className="text-[11px] text-mist">
      {label}
      <div className="relative mt-1">
        <input id={id} inputMode="decimal" className="field !py-1.5 !pr-12 tabular" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10.5px] text-faint">{unit}</span>
      </div>
    </label>
  );
}

function ResultCard({ ind, icon, history }: { ind: IndicatorEval; icon: ReactNode; history: { ts: number; label: string; status: IndicatorEval["status"] }[] }) {
  return (
    <div className="glass flex flex-col p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink/90">
          <span className="text-cyan">{icon}</span>
          {ind.label}
        </span>
        <StatusBadge status={ind.status} size="xs" />
      </div>
      <div key={ind.value + ind.updatedAt} className="mt-2 font-display text-2xl font-semibold tabular animate-fade-up">{ind.value}</div>
      <div className="mt-1 text-[11px] text-faint">{ind.updatedAt ? `Last assessment: ${fmtDateTime(ind.updatedAt)}` : "No record"}</div>
      <div className="mt-3 flex items-end gap-1" aria-label="Latest records">
        {history.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1" title={`${fmtShortDate(h.ts)} · ${h.label}`}>
            <span className="h-1.5 w-full rounded-full" style={{ background: STATUS_META[h.status].color, opacity: 0.35 + (i / history.length) * 0.65 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniResult({ ind, icon }: { ind: IndicatorEval; icon: ReactNode }) {
  return (
    <div className="glass p-3" title={ind.reason}>
      <div className="flex items-center justify-between gap-1.5">
        <span className="flex min-w-0 items-center gap-1.5 truncate text-[11.5px] font-medium text-ink/90">
          <span className="text-cyan">{icon}</span>
          {ind.label}
        </span>
        <StatusDot status={ind.status} size={7} />
      </div>
      <div key={ind.value + ind.updatedAt} className="mt-1.5 font-display text-[17px] font-semibold tabular animate-fade-up">{ind.value}</div>
      <div className="mt-0.5 line-clamp-2 text-[10.5px] leading-snug text-faint">{ind.updatedAt ? fmtDateTime(ind.updatedAt) : ind.reason}</div>
    </div>
  );
}

function DailyResults({ snap }: { snap: Snapshot }) {
  const { state } = useApp();
  const t = state.thresholds;
  const recent = [...(state.data[snap.profile.id]?.assessments ?? [])].sort((a, b) => a.ts - b.ts).slice(-7);
  const all = [...(state.data[snap.profile.id]?.assessments ?? [])].sort((a, b) => b.ts - a.ts).slice(0, 4);
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        <ResultCard ind={snap.indicators.hydration} icon={<Droplets size={14} />} history={recent.map((a) => ({ ts: a.ts, label: `${fmt1(a.hydrationL)} L`, status: evalHydration(a.hydrationL, t).status }))} />
        <ResultCard ind={snap.indicators.fatigue} icon={<Gauge size={14} />} history={recent.map((a) => ({ ts: a.ts, label: `${a.fatigue}/10`, status: evalFatigue(a.fatigue, t).status }))} />
        <ResultCard ind={snap.indicators.appetite} icon={<Utensils size={14} />} history={recent.map((a) => ({ ts: a.ts, label: APPETITE_LABEL[a.appetite], status: evalAppetite(a.appetite).status }))} />
      </div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <MiniResult ind={snap.indicators.mood} icon={<Smile size={13} />} />
        <MiniResult ind={snap.indicators.bp} icon={<Activity size={13} />} />
        <MiniResult ind={snap.indicators.glucose} icon={<Droplet size={13} />} />
        <MiniResult ind={snap.indicators.temp} icon={<Thermometer size={13} />} />
      </div>
      <div className="glass flex-1 p-4">
        <div className="label mb-2">Previous records</div>
        {all.length === 0 && <p className="text-[12.5px] text-mist">No assessment recorded yet.</p>}
        <ul className="divide-y divide-line">
          {all.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-2 py-2 text-[12.5px] animate-fade-in">
              <span className="text-faint tabular">{fmtDateTime(a.ts)}</span>
              <span className="flex flex-wrap justify-end gap-x-3 text-mist tabular">
                <span>{fmt1(a.hydrationL)} L</span>
                <span>Fatigue {a.fatigue}</span>
                <span>{APPETITE_LABEL[a.appetite]}</span>
                {a.mood != null && <span>Mood {a.mood}/5</span>}
                {a.sbp != null && <span>{a.sbp}/{a.dbp}</span>}
                {a.glucose != null && <span>{a.glucose} mg/dL</span>}
                {a.tempC != null && <span>{fmt1(a.tempC)} °C</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
