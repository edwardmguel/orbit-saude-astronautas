import type { ReactNode } from "react";
import { Activity, Droplets, Gauge, Radio, Radiation, Weight, Wind } from "lucide-react";
import type { Snapshot } from "@/lib/health";
import { STATUS_META, fmt1, fmt2, worst } from "@/lib/health";
import { REF, SPACE_WEATHER_SAMPLE } from "@/data/missions";
import {
  BMD_TARGET_PCT,
  ECLSS,
  G0,
  KPA_PER_MMHG,
  MMHG_PER_PSIA,
  boneEstimate,
  commsFor,
  eclssBudget,
  equivalentAltitudeM,
  expectedSpo2,
  fmtDelay,
  hydrostaticMmHg,
  volumePercent,
  weightN,
} from "@/lib/physics";
import { StatusBadge } from "../ui";
import type { Status } from "@/types";

function EnvCard({
  icon,
  title,
  status,
  value,
  unit,
  lines,
  formula,
  origin,
  delay,
}: {
  icon: ReactNode;
  title: string;
  status: Status;
  value: string;
  unit: string;
  lines: [string, string][];
  formula: string;
  origin: { text: string; real: boolean; href: string };
  delay: number;
}) {
  const color = STATUS_META[status].color;
  return (
    <div className="glass relative flex flex-col overflow-hidden p-4 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}aa, transparent)` }} />
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-navy/60 text-cyan">{icon}</span>
          <span className="text-[12.5px] font-medium leading-tight text-ink/90">{title}</span>
        </div>
        <StatusBadge status={status} size="xs" />
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-[30px] font-semibold leading-none tracking-tight tabular">{value}</span>
        <span className="text-[12.5px] text-mist">{unit}</span>
      </div>
      <dl className="mt-2.5 space-y-1 text-[11.5px]">
        {lines.map(([a, b]) => (
          <div key={a} className="flex justify-between gap-2">
            <dt className="text-faint">{a}</dt>
            <dd className="text-right text-mist tabular">{b}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 rounded-lg border border-line bg-navy/50 px-2.5 py-1.5 font-mono text-[10.5px] leading-snug text-mist">{formula}</div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <a href={origin.href} target="_blank" rel="noreferrer" className="truncate text-[10.5px] text-faint hover:text-cyan hover:underline" title={origin.text}>
          {origin.text}
        </a>
        <span
          className={`shrink-0 rounded px-1.5 py-0.5 font-display text-[9px] font-semibold tracking-[0.14em] ${origin.real ? "bg-st-normal/10 text-st-normal" : "bg-cyan/10 text-cyan"}`}
        >
          {origin.real ? "REAL DATA" : "DESIGN REF"}
        </span>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, sub }: { icon: ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span className="mt-0.5 text-cyan">{icon}</span>
      <div className="min-w-0">
        <div className="text-[10.5px] uppercase tracking-[0.12em] text-faint">{label}</div>
        <div className="font-display text-[15px] font-semibold tabular">{value}</div>
        <div className="text-[11px] leading-snug text-mist">{sub}</div>
      </div>
    </div>
  );
}

export function HabitatPanel({ snap, crewSize, now }: { snap: Snapshot; crewSize: number; now: number }) {
  const m = snap.mission;
  const c = m.cabin;
  const ox = expectedSpo2(c.totalMmHg, c.ppO2MmHg);
  const kpa = c.totalMmHg * KPA_PER_MMHG;
  const psia = c.totalMmHg / MMHG_PER_PSIA;
  const alt = equivalentAltitudeM(ox.pio2);

  // PIO₂: V2 6003 exposure limits → alert (level 3); outside the normoxia target → attention (docs/03)
  const o2Status: Status =
    ox.pio2 < ECLSS.pio2LimitAbs || ox.pio2 < ECLSS.pio2Limit1h || ox.pio2 > 356
      ? "alert"
      : ox.pio2 < ECLSS.pio2Target[0] || ox.pio2 > ECLSS.pio2Target[1]
        ? "attention"
        : "normal";
  const pStatus: Status = kpa < ECLSS.pressureEnvelopeKpa[0] || kpa > ECLSS.pressureEnvelopeKpa[1] ? "alert" : "normal";

  // ppCO₂: V2 6004 1-h average ≤ 3 mmHg; above → level 3 (docs/03)
  const co2Status: Status = c.ppCO2MmHg > ECLSS.co2LimitMmHg ? "alert" : "normal";
  const co2Pct = volumePercent(c.ppCO2MmHg, c.totalMmHg);
  const co2LimitPct = volumePercent(ECLSS.co2LimitMmHg, c.totalMmHg);

  const sw = SPACE_WEATHER_SAMPLE;
  const radStatus: Status = sw.goes10MeVPfu >= 10 ? "attention" : "normal";

  const g = m.gravityMs2;
  const hydro = hydrostaticMmHg(snap.profile.heightCm, g);
  const hydroEarth = hydrostaticMmHg(snap.profile.heightCm, G0);
  const bone = boneEstimate(m, snap.day);
  const gStatus: Status = bone.belowTarget ? "attention" : "normal";

  const comms = commsFor(m, now);
  const eclss = eclssBudget(crewSize);

  const panelStatus = worst(o2Status, pStatus, co2Status, radStatus, gStatus);

  return (
    <div className="space-y-3">
      <div className="glass flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 animate-fade-up">
        <div className="min-w-0">
          <div className="label !text-[10px]">{m.code} · {m.phase}</div>
          <div className="font-display text-[15px] font-semibold">{m.name}</div>
          <div className="text-[11.5px] text-mist">{m.location}</div>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-line px-2.5 py-1 text-[11.5px] text-mist">{m.gravityLabel}</span>
          <span className="rounded-lg border border-line px-2.5 py-1 text-[11.5px] text-mist">{c.label}</span>
          <StatusBadge status={panelStatus} size="xs" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <EnvCard
          delay={0}
          icon={<Wind size={15} />}
          title={`Inspired O₂ · ${c.module}`}
          status={worst(o2Status, pStatus)}
          value={fmt1(ox.pio2)}
          unit="mmHg PIO₂"
          lines={[
            ["ppO₂ · total pressure", `${fmt1(c.ppO2MmHg)} · ${fmt1(c.totalMmHg)} mmHg`],
            ["Cabin pressure", `${fmt2(kpa)} kPa · ${fmt1(psia)} psia`],
            ["Normoxia target", `${ECLSS.pio2Target[0]}–${ECLSS.pio2Target[1]} mmHg`],
            ["Earth-equivalent altitude", `${Math.round(alt).toLocaleString("en-US")} m`],
          ]}
          formula={`PIO₂ = (Pb − 47) × ppO₂ / Pb = (${fmt1(c.totalMmHg)} − 47) × ${fmt1(c.ppO2MmHg)} / ${fmt1(c.totalMmHg)}`}
          origin={{ text: c.source.label, real: c.origin === "real", href: c.source.url }}
        />
        <EnvCard
          delay={60}
          icon={<Gauge size={15} />}
          title={`CO₂ partial pressure · ${c.module}`}
          status={co2Status}
          value={fmt2(c.ppCO2MmHg)}
          unit="mmHg ppCO₂"
          lines={[
            ["Volume fraction", `${fmt2(co2Pct)}% · ${Math.round(co2Pct * 10_000).toLocaleString("en-US")} ppm`],
            ["Limit V2 6004 (1-h avg)", `3.00 mmHg = ${fmt2(co2LimitPct)}%`],
            ["Margin to limit", `${fmt2(ECLSS.co2LimitMmHg - c.ppCO2MmHg)} mmHg`],
            c.secondary ? [`${c.secondary.module} reading`, `${fmt2(c.secondary.ppCO2MmHg)} mmHg`] : ["Removal", "Zeolite 4-bed swing (4BCO₂ heritage)"],
          ]}
          formula={`% = pp / Pb × 100 = ${fmt2(c.ppCO2MmHg)} / ${fmt1(c.totalMmHg)} × 100`}
          origin={{ text: c.origin === "real" ? REF.isslive.label : `${REF.tb004.label} · simulated level`, real: c.origin === "real", href: c.origin === "real" ? REF.isslive.url : REF.tb004.url }}
        />
        <EnvCard
          delay={120}
          icon={<Radiation size={15} />}
          title="Radiation environment"
          status={radStatus}
          value={fmt2(m.doseRate)}
          unit="mSv/day expected"
          lines={[
            ["GOES ≥10 MeV protons", `${fmt2(sw.goes10MeVPfu)} pfu · S${sw.sScale}`],
            ["NOAA S1 threshold", "10 pfu (R-RAD-01)"],
            ["Transit before phase", m.transitDays ? `${m.transitDays} d × ${fmt2(m.transitDoseRate)} = ${fmt1(m.transitDays * m.transitDoseRate)} mSv` : "None (LEO)"],
            ["Shielding", m.shielding.split(";")[0]],
          ]}
          formula={`D = D_transit + Σ dᵢ ; career use = D / 600 mSv (V1 4030)`}
          origin={{ text: m.doseSource.label, real: true, href: m.doseSource.url }}
        />
        <EnvCard
          delay={180}
          icon={<Weight size={15} />}
          title="Gravity load · bone"
          status={gStatus}
          value={g === 0 ? "≈0" : fmt2(g / G0)}
          unit={g === 0 ? "g · microgravity" : "g"}
          lines={[
            ["Weight here", `${fmt1(weightN(snap.profile.weightKg, g))} N (Earth ${fmt1(weightN(snap.profile.weightKg, G0))} N)`],
            ["Heart-to-feet ΔP", `${fmt1(hydro)} mmHg (Earth ${fmt1(hydroEarth)})`],
            ["Hip BMD est. (µg days " + bone.microgDays + ")", `${fmt1(bone.estPct)}% of baseline`],
            ["V1 4027 target", `≥ ${BMD_TARGET_PCT}% ${bone.monthsToTarget != null ? `· ~${fmt1(bone.monthsToTarget)} mo margin` : bone.belowTarget ? "· below after transit" : ""}`],
          ]}
          formula={`ΔP = ρ·g·h = 1060 × ${fmt2(g)} × ${fmt2((snap.profile.heightCm / 100) * 0.72)} m ; BMD −1.25%/mo in µg`}
          origin={{ text: bone.partialGravityNote ?? REF.bone.label, real: false, href: bone.partialGravityNote ? REF.partialG.url : REF.bone.url }}
        />
      </div>

      <div className="glass grid grid-cols-1 gap-4 p-4 animate-fade-up sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          icon={<Radio size={15} />}
          label={`Ground link · ${comms.mode}`}
          value={`${fmtDelay(comms.oneWaySec)} one way`}
          sub={`Round trip ${fmtDelay(comms.roundTripSec)} · ${comms.detail}`}
        />
        <Stat
          icon={<Activity size={15} />}
          label="O₂ demand vs OGA"
          value={`${fmt2(eclss.o2DemandKgDay)} kg/day`}
          sub={`${crewSize} crew × ${ECLSS.o2DemandKgPerCmDay} kg (BVAD) = ${eclss.ogaUtilMaxPct.toFixed(0)}% of OGA max ${ECLSS.ogaMaxKgDay} kg/day`}
        />
        <Stat
          icon={<Droplets size={15} />}
          label="Water loop"
          value={`${fmt1(eclss.waterLDay)} L/day`}
          sub={`${ECLSS.waterProvisionLPerCmDay} L/crew (V2 6109) · ${ECLSS.waterRecovery * 100}% recovery → ${fmt2(eclss.makeupWaterLDay)} L/day make-up`}
        />
        <Stat
          icon={<Activity size={15} />}
          label="Space weather (NOAA, real)"
          value={`Kp ${fmt2(sw.kp)} · R${sw.rScale} S${sw.sScale} G${sw.gScale}`}
          sub={`${sw.capturedAt} · S1 prob. ${sw.s1Prob}% · ${sw.gForecast}`}
        />
      </div>
      <p className="px-1 text-[11px] text-faint">
        {comms.method}. Environment values inform context only; cabin alarms and Caution &amp; Warning stay with the vehicle. ISS values come from the ISS Live capture of
        2026-11-15; Moon and Mars habitats use NASA's exploration-atmosphere design reference.
      </p>
    </div>
  );
}
