import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Area, Bar, CartesianGrid, ComposedChart, Line, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useApp } from "@/lib/store";
import { useRoute } from "@/lib/router";
import {
  APPETITE_LABEL,
  BLOOD_FIELDS,
  BLOOD_REF,
  INDICATOR_LABEL,
  STATUS_META,
  evalAppetite,
  evalBlood,
  evalDose,
  evalEog,
  evalFatigue,
  evalHr,
  evalHydration,
  evalSpo2,
  evalSleep,
  doseBands,
  spo2Cuts,
  evalBp,
  evalGlucose,
  evalTemp,
  MOOD_LABEL,
  VITAL_REF,
  fmt1,
  fmt2,
} from "@/lib/health";
import { DAY_MS } from "@/lib/sim";
import { PageTitle, SimTag, StatusBadge } from "@/components/ui";
import { cn, fmtDate } from "@/lib/util";
import type { IndicatorKey, Status } from "@/types";

type Period = 7 | 15 | 30 | 0;
const PERIODS: { v: Period; l: string }[] = [
  { v: 7, l: "7 days" },
  { v: 15, l: "15 days" },
  { v: 30, l: "30 days" },
  { v: 0, l: "Entire mission" },
];

const C = { cyan: "#21C5EF", teal: "#16A9C4", mist: "#91A4B8", grid: "rgba(145,164,184,0.08)" };
const BAND = (s: Status) => STATUS_META[s].color;

interface Band {
  y1: number;
  y2: number;
  s: Status;
}

function TooltipBox({ active, payload, label, fmt }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: number; fmt: (n: string, v: number) => string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line-strong bg-[#07111f]/95 px-3 py-2 text-[12px] shadow-xl">
      <div className="label mb-1 !text-[10px]">Day {String(label).padStart(3, "0")}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-mist">{p.name}:</span>
          <span className="font-semibold tabular">{fmt(p.name, p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function ChartCard({ id, title, unit, picked, children, empty, highlight, extra }: { id: string; title: string; unit: string; picked?: string | null; children: ReactNode; empty?: boolean; highlight?: boolean; extra?: ReactNode }) {
  return (
    <div id={`chart-${id}`} className={cn("glass scroll-mt-24 p-4 animate-fade-up", highlight && "!border-cyan/50 shadow-[0_0_0_1px_rgba(33,197,239,.25)]")}>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-[13.5px] font-medium">{title}</div>
          <div className="text-[11px] text-faint">{unit}</div>
        </div>
        <div className="text-right">
          {picked ? <div className="rounded-md border border-cyan/30 bg-cyan/10 px-2 py-1 text-[11.5px] text-cyan tabular animate-fade-in">{picked}</div> : <div className="text-[10.5px] text-faint">Tap a point</div>}
        </div>
      </div>
      {extra}
      <div className="h-[200px]">
        {empty ? <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-line text-[12.5px] text-mist">No records in the selected period.</div> : children}
      </div>
    </div>
  );
}

const axisProps = { stroke: C.mist, tick: { fontSize: 10.5, fill: "#5d7189" }, tickLine: false, axisLine: false } as const;

export default function Reports() {
  const { state, selected: s } = useApp();
  const route = useRoute();
  const focus = route.params.get("i") as IndicatorKey | null;
  const [period, setPeriod] = useState<Period>(15);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [bloodParam, setBloodParam] = useState<"hb" | "hct" | "wbc" | "plt" | "rbc">("hb");
  const [filter, setFilter] = useState<IndicatorKey | "all">("all");
  const [rows, setRows] = useState(40);
  const t = state.thresholds;

  useEffect(() => {
    setPicked({});
    setRows(40);
  }, [s.profile.id, period]);

  useEffect(() => {
    if (!focus) return;
    const id = focus === "sleep" ? "fatigue" : focus;
    const tm = setTimeout(() => document.getElementById(`chart-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
    return () => clearTimeout(tm);
  }, [focus]);

  const data = state.data[s.profile.id];
  const fromDay = period === 0 ? 1 : Math.max(1, s.day - period + 1);
  const series = s.series.filter((p) => p.day >= fromDay);
  const dayOf = (ts: number) => Math.floor((ts - state.missionStart) / DAY_MS) + 1;

  const manual = useMemo(() => {
    const byDay = new Map<number, (typeof data.assessments)[number]>();
    for (const a of [...(data?.assessments ?? [])].sort((x, y) => x.ts - y.ts)) byDay.set(dayOf(a.ts), a);
    return [...byDay.entries()].filter(([d]) => d >= fromDay).map(([day, a]) => ({ day, hyd: a.hydrationL, fat: a.fatigue, app: a.appetite === "normal" ? 2 : a.appetite === "reduced" ? 1 : 0, mood: a.mood, sbp: a.sbp, dbp: a.dbp, glu: a.glucose, temp: a.tempC, raw: a }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fromDay, state.missionStart]);

  const blood = useMemo(
    () => {
      const all = [...(data?.bloodTests ?? [])].sort((a, b) => a.ts - b.ts).map((b) => ({ day: dayOf(b.ts), ...b }));
      const inPeriod = all.filter((b) => b.day >= fromDay);
      // Blood count is biweekly: keep the most recent earlier exam as a reference in short periods
      const prev = all.filter((b) => b.day < fromDay).pop();
      return prev && period !== 0 ? [prev, ...inPeriod] : inPeriod;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, fromDay, period, state.missionStart],
  );

  const b = s.baseline.hr;
  const hrBands: Band[] = [
    { y1: b * (1 + t.hr.devCritical / 100), y2: 200, s: "critical" },
    { y1: b * (1 + t.hr.devAlert / 100), y2: b * (1 + t.hr.devCritical / 100), s: "alert" },
    { y1: b * (1 + t.hr.devAttention / 100), y2: b * (1 + t.hr.devAlert / 100), s: "attention" },
    { y1: b * (1 - t.hr.devAttention / 100), y2: b * (1 + t.hr.devAttention / 100), s: "normal" },
    { y1: b * (1 - t.hr.devAlert / 100), y2: b * (1 - t.hr.devAttention / 100), s: "attention" },
  ];
  const lowBands = (th: { attention: number; alert: number; critical: number }, top: number, bottom: number): Band[] => [
    { y1: th.attention, y2: top, s: "normal" },
    { y1: th.alert, y2: th.attention, s: "attention" },
    { y1: th.critical, y2: th.alert, s: "alert" },
    { y1: bottom, y2: th.critical, s: "critical" },
  ];
  const highBands = (th: { attention: number; alert: number; critical: number }, top: number, bottom = 0): Band[] => [
    { y1: bottom, y2: th.attention, s: "normal" },
    { y1: th.attention, y2: th.alert, s: "attention" },
    { y1: th.alert, y2: th.critical, s: "alert" },
    { y1: th.critical, y2: top, s: "critical" },
  ];
  const bands = (list: Band[]) => list.map((x, i) => <ReferenceArea key={i} y1={x.y1} y2={x.y2} fill={BAND(x.s)} fillOpacity={0.06} stroke="none" ifOverflow="hidden" />);

  const click = (key: string, fmt: (p: Record<string, number>) => string) => (e: { activePayload?: { payload: Record<string, number> }[] } | null) => {
    const p = e?.activePayload?.[0]?.payload;
    if (p) setPicked((cur) => ({ ...cur, [key]: `Day ${String(p.day).padStart(3, "0")} · ${fmt(p)}` }));
  };

  const hrMin = Math.min(...series.map((p) => p.hr), b * 0.8);
  const hrMax = Math.max(...series.map((p) => p.hr), b * 1.3);
  const ref = BLOOD_REF[s.profile.sex][bloodParam];
  const bf = BLOOD_FIELDS.find((f) => f.key === bloodParam)!;
  const bVals = blood.map((x) => x[bloodParam] as number | undefined).filter((v): v is number => v != null);
  const anim = { isAnimationActive: true, animationDuration: 900 } as const;
  const vitals = manual.filter((m) => m.sbp != null && m.dbp != null);
  const moods = manual.filter((m) => m.mood != null);
  const doseB = doseBands(t, s.mission);
  const spo2C = spo2Cuts(t, s.mission);

  /* ---------- History table ---------- */
  const table = useMemo(() => {
    const out: { ts: number; day: number; key: IndicatorKey; value: string; status: Status; obs: string }[] = [];
    for (const p of series) {
      out.push({ ts: p.ts, day: p.day, key: "hr", value: `${p.hr} bpm`, status: evalHr(p.hr, b, t, { mean: s.baseline.hrMean, sd: s.baseline.hrSd }).status, obs: `Baseline ${b} bpm · simulated` });
      out.push({ ts: p.ts, day: p.day, key: "dose", value: `${fmt2(p.dose)} mSv · accum. ${fmt1(p.doseCum)}`, status: evalDose(p.dose, t, s.mission, { cumulative: p.doseCum, projected: s.doseProjected }).status, obs: `Simulated · ${s.mission.short}` });
      out.push({ ts: p.ts, day: p.day, key: "spo2", value: `${p.spo2}%`, status: evalSpo2(p.spo2, t, s.mission).status, obs: `Simulated · ${s.mission.short} cabin` });
      out.push({ ts: p.ts, day: p.day, key: "eog", value: `${p.eog}/100 · ${p.blink}/min`, status: evalEog(p.eog, t).status, obs: "Experimental · simulated" });
      out.push({ ts: p.ts, day: p.day, key: "sleep", value: `${fmt1(p.sleep)} h`, status: evalSleep(p.sleep, s.baseline.sleep, t).status, obs: "Simulated actigraphy" });
    }
    for (const m of manual) {
      out.push({ ts: m.raw.ts, day: m.day, key: "hydration", value: `${fmt1(m.hyd)} L`, status: evalHydration(m.hyd, t).status, obs: "Daily assessment" });
      out.push({ ts: m.raw.ts, day: m.day, key: "fatigue", value: `${m.fat}/10`, status: evalFatigue(m.fat, t).status, obs: "Daily assessment" });
      out.push({ ts: m.raw.ts, day: m.day, key: "appetite", value: APPETITE_LABEL[m.raw.appetite], status: evalAppetite(m.raw.appetite).status, obs: "Daily assessment" });
      const r = m.raw;
      if (r.mood != null) out.push({ ts: r.ts, day: m.day, key: "mood", value: `${r.mood}/5 · ${MOOD_LABEL[r.mood]}`, status: "normal", obs: "Daily assessment · personal baseline" });
      if (r.sbp != null && r.dbp != null) out.push({ ts: r.ts, day: m.day, key: "bp", value: `${r.sbp}/${r.dbp} mmHg`, status: evalBp(r.sbp, r.dbp).status, obs: "Medical kit · Earth reference" });
      if (r.glucose != null) out.push({ ts: r.ts, day: m.day, key: "glucose", value: `${r.glucose} mg/dL`, status: evalGlucose(r.glucose).status, obs: "Glucometer, fasting · Earth reference" });
      if (r.tempC != null) out.push({ ts: r.ts, day: m.day, key: "temp", value: `${fmt1(r.tempC)} °C`, status: evalTemp(r.tempC).status, obs: "Oral thermometer · Earth reference" });
    }
    for (const x of blood.filter((y) => y.day >= fromDay)) {
      const e = evalBlood(x, s.profile.sex, t);
      out.push({ ts: x.ts, day: x.day, key: "blood", value: `Hb ${fmt1(x.hb)} · Hct ${fmt1(x.hct)} · WBC ${fmt1(x.wbc)} · Plt ${x.plt}`, status: e.status, obs: x.other || (e.outOfRange.length ? "Values outside reference" : "Within reference") });
    }
    return out.sort((a, c) => c.ts - a.ts || a.key.localeCompare(c.key));
  }, [series, manual, blood, b, t, s.profile.sex, s.baseline, s.mission, s.doseProjected]);
  const filtered = filter === "all" ? table : table.filter((r) => r.key === filter);

  return (
    <div>
      <PageTitle
        title="HEALTH REPORTS"
        subtitle={`Indicator trends · Astronaut ${s.profile.code} — ${s.profile.name}`}
        right={
          <div className="flex rounded-xl border border-line bg-navy/60 p-1" role="tablist" aria-label="Period">
            {PERIODS.map((p) => (
              <button key={p.v} role="tab" aria-selected={period === p.v} onClick={() => setPeriod(p.v)} className={cn("rounded-lg px-3 py-1.5 text-[12.5px] transition", period === p.v ? "bg-cyan/15 text-ink shadow-[inset_0_0_0_1px_rgba(33,197,239,.4)]" : "text-mist hover:text-ink")}>
                {p.l}
              </button>
            ))}
          </div>
        }
      />

      <div key={`${s.profile.id}-${period}`} className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <ChartCard id="hr" title="Heart rate" unit="bpm · dashed line = individual baseline" picked={picked.hr} highlight={focus === "hr"}>
          <ResponsiveContainer>
            <ComposedChart data={series} onClick={click("hr", (p) => `${p.hr} bpm`)} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              {bands(hrBands)}
              <XAxis dataKey="day" {...axisProps} />
              <YAxis domain={[Math.floor(hrMin - 4), Math.ceil(hrMax + 4)]} {...axisProps} />
              <ReferenceLine y={b} stroke={C.mist} strokeDasharray="4 4" />
              <Tooltip content={<TooltipBox fmt={(_, v) => `${v} bpm`} />} />
              <Area dataKey="hr" name="HR" stroke={C.cyan} strokeWidth={2} fill={C.cyan} fillOpacity={0.08} dot={false} activeDot={{ r: 5, fill: C.cyan, stroke: "#07111f", strokeWidth: 2 }} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard id="dose" title="Radiation dosimetry" unit={`mSv/day (bars) · accumulated incl. transit (line) · dashed = expected ${s.mission.short} rate`} picked={picked.dose} highlight={focus === "dose"} extra={<SimTag className="mb-2 inline-block" />}>
          <ResponsiveContainer>
            <ComposedChart data={series} onClick={click("dose", (p) => `${fmt2(p.dose)} mSv · accum. ${fmt1(p.doseCum)} mSv`)} margin={{ top: 6, right: 0, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="day" {...axisProps} />
              <YAxis yAxisId="d" domain={[0, (max: number) => Math.max(max, doseB.attention) * 1.15]} {...axisProps} tickFormatter={(v) => v.toFixed(1)} />
              <YAxis yAxisId="c" orientation="right" {...axisProps} width={36} />
              <ReferenceLine yAxisId="d" y={s.mission.doseRate} stroke={C.mist} strokeDasharray="4 4" />
              {highBands(doseB, 99).map((x, i) => <ReferenceArea key={i} yAxisId="d" y1={x.y1} y2={x.y2} fill={BAND(x.s)} fillOpacity={0.06} stroke="none" ifOverflow="hidden" />)}
              <Tooltip content={<TooltipBox fmt={(n, v) => (n === "Accumulated" ? `${fmt1(v)} mSv` : `${fmt2(v)} mSv`)} />} />
              <Bar yAxisId="d" dataKey="dose" name="Daily dose" fill={C.teal} radius={[3, 3, 0, 0]} maxBarSize={14} {...anim} />
              <Line yAxisId="c" dataKey="doseCum" name="Accumulated" stroke={C.cyan} strokeWidth={2} dot={false} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard id="spo2" title="Pulse oximetry" unit="SpO₂ %" picked={picked.spo2} highlight={focus === "spo2"}>
          <ResponsiveContainer>
            <ComposedChart data={series} onClick={click("spo2", (p) => `${p.spo2}%`)} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              {bands(lowBands(spo2C, 101, 80))}
              <XAxis dataKey="day" {...axisProps} />
              <YAxis domain={[(min: number) => Math.min(min - 2, t.spo2.critical - 2), 100]} {...axisProps} />
              <Tooltip content={<TooltipBox fmt={(_, v) => `${v}%`} />} />
              <Line dataKey="spo2" name="SpO₂" stroke={C.cyan} strokeWidth={2} dot={{ r: 2, fill: C.cyan }} activeDot={{ r: 5 }} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard id="eog" title="EOG indicators" unit="experimental fatigue index (0–100) · blinks/min (dashed)" picked={picked.eog} highlight={focus === "eog"}>
          <ResponsiveContainer>
            <ComposedChart data={series} onClick={click("eog", (p) => `index ${p.eog} · ${p.blink} blinks/min`)} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              {bands(highBands(t.eog, 100))}
              <XAxis dataKey="day" {...axisProps} />
              <YAxis domain={[0, 100]} {...axisProps} />
              <Tooltip content={<TooltipBox fmt={(n, v) => (n === "Blinks" ? `${v}/min` : `${v}/100`)} />} />
              <Line dataKey="eog" name="Index" stroke={C.cyan} strokeWidth={2} dot={false} activeDot={{ r: 5 }} {...anim} />
              <Line dataKey="blink" name="Blinks" stroke={C.mist} strokeDasharray="4 3" strokeWidth={1.5} dot={false} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard id="hydration" title="Hydration" unit="liters in 24 h · daily assessment" picked={picked.hydration} empty={!manual.length} highlight={focus === "hydration"}>
          <ResponsiveContainer>
            <ComposedChart data={manual} onClick={click("hydration", (p) => `${fmt1(p.hyd)} L`)} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              {bands(lowBands(t.hydration, 6, 0))}
              <XAxis dataKey="day" {...axisProps} />
              <YAxis domain={[0, (max: number) => Math.max(3, Math.ceil(max + 0.5))]} {...axisProps} />
              <Tooltip content={<TooltipBox fmt={(_, v) => `${fmt1(v)} L`} />} />
              <Bar dataKey="hyd" name="Hydration" fill={C.cyan} fillOpacity={0.75} radius={[3, 3, 0, 0]} maxBarSize={16} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard id="fatigue" title="Fatigue" unit="scale 0–10 · daily assessment" picked={picked.fatigue} empty={!manual.length} highlight={focus === "fatigue" || focus === "sleep"}>
          <ResponsiveContainer>
            <ComposedChart data={manual} onClick={click("fatigue", (p) => `${p.fat}/10`)} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              {bands(highBands(t.fatigue, 10.5))}
              <XAxis dataKey="day" {...axisProps} />
              <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} {...axisProps} />
              <Tooltip content={<TooltipBox fmt={(_, v) => `${v}/10`} />} />
              <Line dataKey="fat" name="Fatigue" stroke={C.cyan} strokeWidth={2} dot={{ r: 2.5, fill: C.cyan }} activeDot={{ r: 5 }} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard id="appetite" title="Appetite" unit="normal · reduced · very reduced" picked={picked.appetite} empty={!manual.length} highlight={focus === "appetite"}>
          <ResponsiveContainer>
            <ComposedChart data={manual} onClick={click("appetite", (p) => (p.app === 2 ? "Normal" : p.app === 1 ? "Reduced" : "Very reduced"))} margin={{ top: 6, right: 8, left: 16, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <ReferenceArea y1={1.5} y2={2.3} fill={BAND("normal")} fillOpacity={0.06} />
              <ReferenceArea y1={0.5} y2={1.5} fill={BAND("attention")} fillOpacity={0.06} />
              <ReferenceArea y1={-0.3} y2={0.5} fill={BAND("alert")} fillOpacity={0.06} />
              <XAxis dataKey="day" {...axisProps} />
              <YAxis domain={[-0.3, 2.3]} ticks={[0, 1, 2]} tickFormatter={(v) => (v === 2 ? "Normal" : v === 1 ? "Reduced" : "V. reduced")} {...axisProps} width={70} />
              <Tooltip content={<TooltipBox fmt={(_, v) => (v === 2 ? "Normal" : v === 1 ? "Reduced" : "Very reduced")} />} />
              <Line type="stepAfter" dataKey="app" name="Appetite" stroke={C.cyan} strokeWidth={2} dot={{ r: 2.5, fill: C.cyan }} activeDot={{ r: 5 }} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard id="bp" title="Blood pressure" unit="mmHg · systolic (solid) and diastolic (dashed) · green bands = Earth reference" picked={picked.bp} empty={!vitals.length} highlight={focus === "bp"}>
          <ResponsiveContainer>
            <ComposedChart data={vitals} onClick={click("bp", (p) => `${p.sbp}/${p.dbp} mmHg`)} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <ReferenceArea y1={VITAL_REF.sbp[0]} y2={VITAL_REF.sbp[1]} fill={BAND("normal")} fillOpacity={0.06} />
              <ReferenceArea y1={VITAL_REF.dbp[0]} y2={VITAL_REF.dbp[1]} fill={BAND("normal")} fillOpacity={0.06} />
              <XAxis dataKey="day" {...axisProps} />
              <YAxis domain={[50, 140]} {...axisProps} />
              <Tooltip content={<TooltipBox fmt={(_, v) => `${v} mmHg`} />} />
              <Line dataKey="sbp" name="Systolic" stroke={C.cyan} strokeWidth={2} dot={{ r: 2.5, fill: C.cyan }} activeDot={{ r: 5 }} {...anim} />
              <Line dataKey="dbp" name="Diastolic" stroke={C.mist} strokeDasharray="4 3" strokeWidth={1.5} dot={{ r: 2 }} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard id="mood" title="Mood" unit="scale 1–5 · compared with the personal baseline" picked={picked.mood} empty={!moods.length} highlight={focus === "mood"}>
          <ResponsiveContainer>
            <ComposedChart data={moods} onClick={click("mood", (p) => `${p.mood}/5 · ${MOOD_LABEL[p.mood]}`)} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="day" {...axisProps} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} {...axisProps} />
              <Tooltip content={<TooltipBox fmt={(_, v) => `${v}/5 · ${MOOD_LABEL[v]}`} />} />
              <Line type="monotone" dataKey="mood" name="Mood" stroke={C.cyan} strokeWidth={2} dot={{ r: 2.5, fill: C.cyan }} activeDot={{ r: 5 }} {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          id="blood"
          title="Blood count"
          unit={`${bf.label} (${bf.unit}) · green band = demonstration reference`}
          picked={picked.blood}
          empty={!bVals.length}
          highlight={focus === "blood"}
          extra={
            <div className="mb-2 flex flex-wrap gap-1.5">
              {BLOOD_FIELDS.map((f) => (
                <button key={f.key} onClick={() => setBloodParam(f.key)} className={cn("rounded-full border px-2.5 py-0.5 text-[11.5px] transition", bloodParam === f.key ? "border-cyan/60 bg-cyan/10 text-ink" : "border-line text-mist hover:text-ink")}>
                  {f.label}
                </button>
              ))}
            </div>
          }
        >
          <ResponsiveContainer>
            <ComposedChart data={blood} onClick={click("blood", (p) => `${(p[bloodParam] as number)?.toLocaleString("en-US")} ${bf.unit}`)} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <ReferenceArea y1={ref[0]} y2={ref[1]} fill={BAND("normal")} fillOpacity={0.08} />
              <XAxis dataKey="day" type="number" domain={[Math.min(fromDay, blood[0]?.day ?? fromDay), s.day]} {...axisProps} />
              <YAxis domain={[Math.min(ref[0], ...bVals) * 0.85, Math.max(ref[1], ...bVals) * 1.08]} tickFormatter={(v) => (v >= 100 ? Math.round(v).toString() : v.toFixed(1))} {...axisProps} />
              <Tooltip content={<TooltipBox fmt={(_, v) => `${v.toLocaleString("en-US")} ${bf.unit}`} />} />
              <Line dataKey={bloodParam} name={bf.label} stroke={C.cyan} strokeWidth={2} dot={{ r: 4, fill: C.cyan, stroke: "#07111f", strokeWidth: 2 }} activeDot={{ r: 6 }} connectNulls {...anim} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="glass mt-6 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="section-title text-[12.5px]">History table</div>
            <div className="text-[11.5px] text-faint">{filtered.length} records · {PERIODS.find((p) => p.v === period)?.l.toLowerCase()}</div>
          </div>
          <div className="flex gap-2">
            <select className="field !w-auto !py-2 text-[13px]" value={filter} onChange={(e) => { setFilter(e.target.value as IndicatorKey | "all"); setRows(40); }} aria-label="Filter indicator">
              <option value="all">All indicators</option>
              {(Object.keys(INDICATOR_LABEL) as IndicatorKey[]).map((k) => (
                <option key={k} value={k}>{INDICATOR_LABEL[k]}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-[12.5px]">
            <thead>
              <tr className="text-left">
                <th className="label pb-2">Date</th>
                <th className="label pb-2">Indicator</th>
                <th className="label pb-2">Value</th>
                <th className="label pb-2">Status</th>
                <th className="label pb-2">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.slice(0, rows).map((r, i) => (
                <tr key={i} className="transition hover:bg-white/[0.02]">
                  <td className="whitespace-nowrap py-2 pr-3 text-mist tabular">{fmtDate(r.ts)} <span className="text-faint">· D{String(r.day).padStart(3, "0")}</span></td>
                  <td className="py-2 pr-3">{INDICATOR_LABEL[r.key]}</td>
                  <td className="py-2 pr-3 tabular">{r.value}</td>
                  <td className="py-2 pr-3"><StatusBadge status={r.status} size="xs" /></td>
                  <td className="py-2 text-faint">{r.obs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows < filtered.length && (
          <div className="mt-3 text-center">
            <button className="btn-ghost" onClick={() => setRows((r) => r + 60)}>Show more</button>
          </div>
        )}
      </div>
    </div>
  );
}
