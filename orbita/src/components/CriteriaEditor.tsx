import { useState } from "react";
import { RotateCcw, Save } from "lucide-react";
import type { Thresholds } from "@/types";
import { DEFAULT_THRESHOLDS } from "@/lib/health";
import { useApp } from "@/lib/store";

type Group = keyof Thresholds;
const ROWS: { g: Group; label: string; unit: string; fields: { k: string; label: string }[]; note: string }[] = [
  { g: "hr", label: "Heart rate", unit: "% vs. baseline", fields: [{ k: "devAttention", label: "Attention ≥" }, { k: "devAlert", label: "Alert ≥" }, { k: "devCritical", label: "Critical ≥" }], note: "Percentage deviation from the individual baseline." },
  { g: "hr", label: "Absolute HR", unit: "bpm", fields: [{ k: "min", label: "Normal min." }, { k: "max", label: "Normal max." }, { k: "critMin", label: "Critical <" }, { k: "critMax", label: "Critical >" }], note: "Absolute resting range." },
  { g: "spo2", label: "Pulse oximetry", unit: "% SpO₂", fields: [{ k: "attention", label: "Attention <" }, { k: "alert", label: "Alert <" }, { k: "critical", label: "Critical <" }], note: "Earth reference. In reduced-pressure habitats the attention cut follows the expected SpO₂ for the cabin PIO₂ (Severinghaus) minus 2 points." },
  { g: "dose", label: "Dosimetry", unit: "× expected mission rate", fields: [{ k: "attention", label: "Attention ≥" }, { k: "alert", label: "Alert ≥" }, { k: "critical", label: "Critical ≥" }], note: "Multiples of the mission's expected daily dose (ISS 0.42 · Moon 1.37 · Mars 0.64 mSv/day). The 600 mSv career limit (NASA-STD-3001 V1 4030) is always applied." },
  { g: "eog", label: "EOG (experimental)", unit: "index 0–100", fields: [{ k: "attention", label: "Attention ≥" }, { k: "alert", label: "Alert ≥" }, { k: "critical", label: "Critical ≥" }], note: "" },
  { g: "hydration", label: "Hydration", unit: "L/24 h", fields: [{ k: "attention", label: "Attention <" }, { k: "alert", label: "Alert <" }, { k: "critical", label: "Critical <" }], note: "" },
  { g: "fatigue", label: "Fatigue", unit: "0–10", fields: [{ k: "attention", label: "Attention ≥" }, { k: "alert", label: "Alert ≥" }, { k: "critical", label: "Critical ≥" }], note: "" },
  { g: "sleep", label: "Sleep", unit: "hours", fields: [{ k: "attention", label: "Attention <" }, { k: "alert", label: "Alert <" }, { k: "critical", label: "Critical <" }], note: "" },
  { g: "blood", label: "Blood count", unit: "% outside reference", fields: [{ k: "alertPct", label: "Alert ≥" }, { k: "criticalPct", label: "Critical ≥" }], note: "Any value outside the reference indicates Attention." },
];

/** Demonstration, configurable indicator criteria. */
export function CriteriaEditor({ onSaved }: { onSaved?: () => void }) {
  const { state, setThresholds, toast } = useApp();
  const [t, setT] = useState<Thresholds>(structuredClone(state.thresholds));
  const set = (g: Group, k: string, v: string) => setT((cur) => ({ ...cur, [g]: { ...cur[g], [k]: v === "" ? NaN : Number(v.replace(",", ".")) } }));
  const valid = Object.values(t).every((g) => Object.values(g).every((v) => typeof v === "number" && !Number.isNaN(v)));
  return (
    <div>
      <p className="mb-4 text-[12.5px] leading-relaxed text-mist">
        The criteria below are <strong className="text-ink">demonstrative</strong> and configurable, as they do not replace official medical limits. Changes immediately update cards, charts, the body map, notifications and crew status.
      </p>
      <div className="space-y-3">
        {ROWS.map((r) => (
          <div key={r.label} className="rounded-xl border border-line bg-navy/40 p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[13px] font-medium">{r.label}</span>
              <span className="text-[11px] text-faint">{r.unit}</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {r.fields.map((f) => (
                <label key={f.k} className="text-[11px] text-mist">
                  {f.label}
                  <input
                    className="field mt-1 !py-1.5 tabular"
                    inputMode="decimal"
                    value={Number.isNaN((t[r.g] as Record<string, number>)[f.k]) ? "" : String((t[r.g] as Record<string, number>)[f.k])}
                    onChange={(e) => set(r.g, f.k, e.target.value)}
                  />
                </label>
              ))}
            </div>
            {r.note && <p className="mt-1.5 text-[10.5px] text-faint">{r.note}</p>}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <button className="btn-ghost" onClick={() => setT(structuredClone(DEFAULT_THRESHOLDS))}>
          <RotateCcw size={14} /> Default values
        </button>
        <button
          className="btn-primary"
          disabled={!valid}
          onClick={() => {
            setThresholds(t);
            toast("Indicator criteria updated");
            onSaved?.();
          }}
        >
          <Save size={14} /> Save criteria
        </button>
      </div>
    </div>
  );
}
