import { useEffect, useState, type FormEvent } from "react";
import { CalendarClock, ChevronDown, FlaskConical, Plus, X } from "lucide-react";
import { BLOOD_FIELDS, BLOOD_INTERVAL_DAYS, BLOOD_REF, evalBlood, type Snapshot } from "@/lib/health";
import { useApp } from "@/lib/store";
import { cn, fmtDate } from "@/lib/util";
import { ProgressBar, StatusBadge } from "../ui";
import type { BloodTest } from "@/types";

type FormVals = Record<"date" | "rbc" | "hb" | "hct" | "wbc" | "plt" | "other", string>;

const today = () => new Date().toISOString().slice(0, 10);

export function BloodPanel({ snap }: { snap: Snapshot }) {
  const { state, addBloodTest, toast } = useApp();
  const [open, setOpen] = useState(false);
  const [showHist, setShowHist] = useState(false);
  const [vals, setVals] = useState<FormVals>({ date: today(), rbc: "", hb: "", hct: "", wbc: "", plt: "", other: "" });
  const [errs, setErrs] = useState<Partial<Record<keyof FormVals, string>>>({});
  useEffect(() => {
    setOpen(false);
    setShowHist(false);
  }, [snap.profile.id]);

  const sex = snap.profile.sex;
  const ref = BLOOD_REF[sex];
  const last = snap.latestBlood;
  const ev = last ? evalBlood(last, sex, state.thresholds) : null;
  const tests = [...(state.data[snap.profile.id]?.bloodTests ?? [])].sort((a, b) => b.ts - a.ts);
  const elapsed = Math.min(1, Math.max(0, 1 - snap.bloodDaysLeft / BLOOD_INTERVAL_DAYS));
  const ind = snap.indicators.blood;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: typeof errs = {};
    if (!vals.date || vals.date > today()) er.date = "Invalid date.";
    const num = (k: keyof FormVals, lo: number, hi: number, req = true) => {
      const v = vals[k].replace(",", ".");
      if (!v) {
        if (req) er[k] = "Required.";
        return undefined;
      }
      const n = Number(v);
      if (Number.isNaN(n) || n < lo || n > hi) er[k] = `Between ${lo} and ${hi}.`;
      return n;
    };
    const rbc = num("rbc", 1, 9, false);
    const hb = num("hb", 3, 25);
    const hct = num("hct", 10, 70);
    const wbc = num("wbc", 0.5, 50);
    const plt = num("plt", 10, 1500);
    setErrs(er);
    if (Object.keys(er).length) return;
    addBloodTest(snap.profile.id, { date: vals.date, rbc, hb: hb!, hct: hct!, wbc: wbc!, plt: plt!, other: vals.other.trim() });
    toast(`Blood count recorded · Astronaut ${snap.profile.code}`);
    setOpen(false);
    setVals({ date: today(), rbc: "", hb: "", hct: "", wbc: "", plt: "", other: "" });
  };

  const valueOf = (b: BloodTest, k: string) => b[k as keyof BloodTest] as number | undefined;

  return (
    <div id="bloodcount" className="glass scroll-mt-24 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-navy/60 text-cyan">
            <FlaskConical size={17} />
          </span>
          <div>
            <div className="section-title text-[12px] text-ink">Blood count</div>
            <div className="text-[12px] text-mist">Periodic assessment · every {BLOOD_INTERVAL_DAYS} days</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={ind.status} />
          <button className={open ? "btn-ghost" : "btn-primary !py-2"} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={15} /> : <Plus size={15} />} {open ? "Cancel" : "Record results"}
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="space-y-4">
          <div>
            <div className="label">Last exam</div>
            <div className="mt-1 font-display text-lg font-semibold">{last ? fmtDate(last.ts) : "—"}</div>
          </div>
          <div>
            <div className="label flex items-center gap-1.5">
              <CalendarClock size={12} /> Next exam
            </div>
            <div className="mt-1 font-display text-lg font-semibold">{fmtDate(snap.nextBloodDue)}</div>
            <div className={cn("text-[12px]", snap.bloodDaysLeft < 0 ? "text-st-alert" : snap.bloodDaysLeft <= 3 ? "text-st-attention" : "text-mist")}>
              {snap.bloodDaysLeft < 0 ? `Overdue by ${Math.abs(snap.bloodDaysLeft)} day(s)` : snap.bloodDaysLeft === 0 ? "Due today" : `In ${snap.bloodDaysLeft} day(s)`}
            </div>
            <ProgressBar value={elapsed} className="mt-2" color={snap.bloodDaysLeft <= 3 ? "#FACC15" : "#21C5EF"} />
          </div>
          <div>
            <div className="label">Follow-up status</div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-mist">{ind.reason}</p>
          </div>
        </div>

        <div>
          {open ? (
            <form onSubmit={submit} className="grid grid-cols-2 gap-3 animate-fade-up sm:grid-cols-3" noValidate>
              <div className="col-span-2 sm:col-span-1">
                <label className="label mb-1 block" htmlFor="b-date">Exam date</label>
                <input id="b-date" type="date" max={today()} className="field" value={vals.date} onChange={(e) => setVals({ ...vals, date: e.target.value })} aria-invalid={!!errs.date} />
                {errs.date && <p className="mt-1 text-[11px] text-st-critical">{errs.date}</p>}
              </div>
              {BLOOD_FIELDS.map((f) => (
                <div key={f.key}>
                  <label className="label mb-1 block !tracking-[0.1em]" htmlFor={`b-${f.key}`}>
                    {f.label} <span className="normal-case tracking-normal text-faint">({f.unit}){f.key === "rbc" ? " · optional" : ""}</span>
                  </label>
                  <input
                    id={`b-${f.key}`}
                    inputMode="decimal"
                    className="field tabular"
                    placeholder={`${ref[f.key][0]}–${ref[f.key][1]}`}
                    value={vals[f.key]}
                    onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}
                    aria-invalid={!!errs[f.key]}
                  />
                  {errs[f.key] && <p className="mt-1 text-[11px] text-st-critical">{errs[f.key]}</p>}
                </div>
              ))}
              <div className="col-span-2 sm:col-span-3">
                <label className="label mb-1 block" htmlFor="b-other">Other available parameters</label>
                <input id="b-other" className="field" placeholder="e.g., MCV 88 fL; ferritin 60 ng/mL" value={vals.other} onChange={(e) => setVals({ ...vals, other: e.target.value })} maxLength={200} />
              </div>
              <div className="col-span-2 flex justify-end sm:col-span-3">
                <button type="submit" className="btn-primary">Save blood count</button>
              </div>
            </form>
          ) : last ? (
            <div className="animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-[12.5px]">
                  <thead>
                    <tr className="text-left text-faint">
                      <th className="label pb-2 font-semibold">Parameter</th>
                      <th className="label pb-2 text-right font-semibold">Result</th>
                      <th className="label pb-2 text-right font-semibold">Reference</th>
                      <th className="label pb-2 text-right font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {BLOOD_FIELDS.map((f) => {
                      const v = valueOf(last, f.key);
                      const out = ev?.outOfRange.find((o) => o.key === f.key);
                      return (
                        <tr key={f.key}>
                          <td className="py-2 text-ink/90">{f.label}</td>
                          <td className="py-2 text-right font-display font-semibold tabular">{v != null ? `${v.toLocaleString("en-US")} ` : "—"}<span className="text-[11px] font-normal text-faint">{v != null ? f.unit : ""}</span></td>
                          <td className="py-2 text-right text-mist tabular">{ref[f.key][0]}–{ref[f.key][1]}</td>
                          <td className="py-2 text-right">
                            {v == null ? <span className="text-faint">—</span> : out ? <span className="text-st-attention">{out.dir === "low" ? "Below" : "Above"}</span> : <span className="text-st-normal">In range</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {last.other && <p className="mt-2 text-[12px] text-mist">Other: {last.other}</p>}
              <p className="mt-3 text-[11px] leading-relaxed text-faint">
                Demonstration laboratory references ({sex === "M" ? "male" : "female"}). ORBITA does not provide diagnoses: results must be interpreted against laboratory references and with professional follow-up.
              </p>
            </div>
          ) : (
            <p className="text-sm text-mist">No blood count recorded. Use “Record results” to enter the first exam.</p>
          )}
        </div>
      </div>

      {tests.length > 0 && (
        <div className="mt-4 border-t border-line pt-3">
          <button onClick={() => setShowHist((s) => !s)} className="flex items-center gap-1.5 text-[12.5px] text-cyan" aria-expanded={showHist}>
            <ChevronDown size={14} className={cn("transition", showHist && "rotate-180")} /> Results history ({tests.length})
          </button>
          {showHist && (
            <div className="mt-3 overflow-x-auto animate-fade-in">
              <table className="w-full min-w-[520px] text-[12px]">
                <thead>
                  <tr className="text-left">
                    <th className="label pb-2">Date</th>
                    {BLOOD_FIELDS.map((f) => (
                      <th key={f.key} className="label pb-2 text-right">{f.label}</th>
                    ))}
                    <th className="label pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {tests.map((b) => (
                    <tr key={b.id}>
                      <td className="py-1.5 text-mist tabular">{fmtDate(b.ts)}</td>
                      {BLOOD_FIELDS.map((f) => (
                        <td key={f.key} className="py-1.5 text-right tabular">{valueOf(b, f.key)?.toLocaleString("en-US") ?? "—"}</td>
                      ))}
                      <td className="py-1.5 text-right">
                        <StatusBadge status={evalBlood(b, sex, state.thresholds).status} size="xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
