import { Eye, HeartPulse, Radiation, Wind } from "lucide-react";
import type { Snapshot } from "@/lib/health";
import { STATUS_META, fmt1, fmt2 } from "@/lib/health";
import { eogPattern } from "@/lib/sim";
import { CAREER_LIMIT_MSV, expectedSpo2 } from "@/lib/physics";
import { navigate } from "@/lib/router";
import { SimTag, Sparkline, StatusBadge } from "../ui";
import type { IndicatorKey, Status } from "@/types";
import type { ReactNode } from "react";

function Card({
  icon,
  title,
  status,
  value,
  unit,
  lines,
  spark,
  sparkLabel,
  delay,
  k,
}: {
  icon: ReactNode;
  title: string;
  status: Status;
  value: string;
  unit: string;
  lines: [string, string][];
  spark: number[];
  sparkLabel: string;
  delay: number;
  k: IndicatorKey;
}) {
  const color = STATUS_META[status].color;
  return (
    <button
      onClick={() => navigate(`/reports?i=${k}`)}
      className="glass glass-hover group relative flex flex-col overflow-hidden p-4 text-left animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
      aria-label={`${title}: ${value} ${unit}, status ${STATUS_META[status].label}. Open report`}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}aa, transparent)` }} />
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-mist">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-navy/60 text-cyan">{icon}</span>
          <span className="text-[12.5px] font-medium leading-tight text-ink/90">{title}</span>
        </div>
        <StatusBadge status={status} size="xs" />
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-[32px] font-semibold leading-none tracking-tight tabular">{value}</span>
        <span className="text-[13px] text-mist">{unit}</span>
      </div>
      <dl className="mt-2.5 space-y-1 text-[11.5px]">
        {lines.map(([a, b]) => (
          <div key={a} className="flex justify-between gap-2">
            <dt className="text-faint">{a}</dt>
            <dd className="truncate text-right text-mist tabular">{b}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3">
        <Sparkline data={spark} color={color === STATUS_META.normal.color ? "#21C5EF" : color} />
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[10.5px] text-faint">{sparkLabel}</span>
        <SimTag />
      </div>
    </button>
  );
}

export function AutoMonitoring({ snap }: { snap: Snapshot }) {
  const s = snap.series;
  const last14 = s.slice(-14);
  const last7 = s.slice(-7);
  const i = snap.indicators;
  const minmax = (k: "hr" | "spo2") => `${Math.min(...last7.map((p) => p[k]))}–${Math.max(...last7.map((p) => p[k]))}`;
  const m = snap.mission;
  const ox = expectedSpo2(m.cabin.totalMmHg, m.cabin.ppO2MmHg);
  const z = snap.hrZ ?? 0;
  const careerPct = (snap.current.doseCum / CAREER_LIMIT_MSV) * 100;
  const projPct = (snap.doseProjected / CAREER_LIMIT_MSV) * 100;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        k="hr"
        delay={0}
        icon={<HeartPulse size={15} />}
        title="Heart rate"
        status={i.hr.status}
        value={String(snap.current.hr)}
        unit="bpm"
        lines={[
          ["Individual baseline", `${snap.baseline.hr} bpm · σ ${fmt1(snap.baseline.hrSd)}`],
          ["Personal z-score", `${z >= 0 ? "+" : "−"}${fmt1(Math.abs(z))}σ · range ${minmax("hr")}`],
        ]}
        spark={last14.map((p) => p.hr)}
        sparkLabel="Trend · 14 days"
      />
      <Card
        k="dose"
        delay={60}
        icon={<Radiation size={15} />}
        title="Radiation dosimetry"
        status={i.dose.status}
        value={fmt1(snap.current.doseCum)}
        unit="mSv accumulated"
        lines={[
          ["Today · expected " + m.short, `${fmt2(snap.current.dose)} · ${fmt2(m.doseRate)} mSv`],
          ["Career limit 600 mSv", `${fmt1(careerPct)}% · mission ${projPct.toFixed(0)}%`],
        ]}
        spark={last14.map((p) => p.dose)}
        sparkLabel="Daily exposure · 14 days"
      />
      <Card
        k="spo2"
        delay={120}
        icon={<Wind size={15} />}
        title="Pulse oximetry"
        status={i.spo2.status}
        value={String(snap.current.spo2)}
        unit="% SpO₂"
        lines={[
          [`Expected · PIO₂ ${ox.pio2.toFixed(0)} mmHg`, `${fmt1(ox.spo2)}%`],
          ["7-day range", `${minmax("spo2")}%`],
        ]}
        spark={last14.map((p) => p.spo2)}
        sparkLabel="History · 14 days"
      />
      <Card
        k="eog"
        delay={180}
        icon={<Eye size={15} />}
        title="Eye attention (EOG)"
        status={i.eog.status}
        value={String(snap.current.blink)}
        unit="blinks/min"
        lines={[
          ["Eye pattern", eogPattern(snap.current.eog)],
          ["Experimental index", `${snap.current.eog}/100`],
        ]}
        spark={last14.map((p) => p.eog)}
        sparkLabel="Fatigue index · experimental"
      />
    </div>
  );
}
