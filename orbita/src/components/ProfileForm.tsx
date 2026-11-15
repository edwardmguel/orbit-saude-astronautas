import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { Sex } from "@/types";
import type { ProfileInput } from "@/lib/store";
import { PhotoField } from "./PhotoCapture";
import { cn } from "@/lib/util";

interface Props {
  initial?: Partial<ProfileInput>;
  initialPhoto?: string;
  submitLabel?: string;
  onSubmit: (p: ProfileInput, photo: string) => Promise<void> | void;
}

type Errors = Partial<Record<"photo" | "name" | "sex" | "weight" | "height", string>>;

/** Single registration form: first access, new crew members and profile editing. */
export function ProfileForm({ initial, initialPhoto, submitLabel = "Save and continue", onSubmit }: Props) {
  const [photo, setPhoto] = useState<string | undefined>(initialPhoto);
  const [name, setName] = useState(initial?.name ?? "");
  const [sex, setSex] = useState<Sex | "">(initial?.sex ?? "");
  const [weight, setWeight] = useState(initial?.weightKg ? String(initial.weightKg) : "");
  const [height, setHeight] = useState(initial?.heightCm ? String(initial.heightCm) : "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!photo || !/^data:image\/(jpeg|png|webp|svg\+xml)/.test(photo)) e.photo = "Add a valid photo.";
    if (name.trim().length < 3) e.name = "Enter the full name.";
    else if (!/^[\p{L}][\p{L}\s.'-]+$/u.test(name.trim())) e.name = "Use letters only in the name.";
    if (!sex) e.sex = "Select a sex.";
    const w = Number(weight.replace(",", "."));
    if (!weight || Number.isNaN(w) || w < 30 || w > 200) e.weight = "Weight between 30 and 200 kg.";
    const h = Number(height.replace(",", "."));
    if (!height || Number.isNaN(h) || h < 120 || h > 230) e.height = "Height between 120 and 230 cm.";
    return e;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    try {
      await onSubmit(
        {
          name: name.trim().replace(/\s+/g, " "),
          sex: sex as Sex,
          weightKg: Math.round(Number(weight.replace(",", ".")) * 10) / 10,
          heightCm: Math.round(Number(height.replace(",", "."))),
          notes: notes.trim(),
        },
        photo!,
      );
    } finally {
      setBusy(false);
    }
  };

  const err = (k: keyof Errors) => errors[k] && <p className="mt-1 text-xs text-st-critical">{errors[k]}</p>;

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <PhotoField value={photo} onChange={(d) => { setPhoto(d); setErrors((x) => ({ ...x, photo: undefined })); }} invalid={!!errors.photo} />
        {errors.photo && <p className="mt-2 text-center text-xs text-st-critical">{errors.photo}</p>}
      </div>

      <div>
        <label className="label mb-1.5 block" htmlFor="pf-name">Full name</label>
        <input id="pf-name" className="field" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} placeholder="e.g., Jane Smith" autoComplete="name" maxLength={60} />
        {err("name")}
      </div>

      <div>
        <span className="label mb-1.5 block">Sex</span>
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-invalid={!!errors.sex}>
          {(["M", "F"] as Sex[]).map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={sex === s}
              onClick={() => setSex(s)}
              className={cn(
                "rounded-[10px] border px-3 py-2.5 text-sm font-medium transition",
                sex === s ? "border-cyan/70 bg-cyan/10 text-ink shadow-[0_0_20px_-8px_#21c5ef]" : "border-line bg-navy/70 text-mist hover:border-cyan/30",
                errors.sex && !sex && "border-st-critical/60",
              )}
            >
              {s === "M" ? "Male" : "Female"}
            </button>
          ))}
        </div>
        {err("sex")}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label mb-1.5 block" htmlFor="pf-w">Weight (kg)</label>
          <input id="pf-w" className="field tabular" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} aria-invalid={!!errors.weight} placeholder="70" />
          {err("weight")}
        </div>
        <div>
          <label className="label mb-1.5 block" htmlFor="pf-h">Height (cm)</label>
          <input id="pf-h" className="field tabular" inputMode="numeric" value={height} onChange={(e) => setHeight(e.target.value)} aria-invalid={!!errors.height} placeholder="175" />
          {err("height")}
        </div>
      </div>

      <div>
        <label className="label mb-1.5 block" htmlFor="pf-n">
          Notes <span className="normal-case tracking-normal text-faint">(optional)</span>
        </label>
        <textarea id="pf-n" className="field min-h-20 resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={400} placeholder="Information relevant to individual monitoring" />
      </div>

      <button type="submit" className="btn-primary w-full !py-3" disabled={busy}>
        {busy ? "Saving…" : submitLabel}
        {!busy && <ArrowRight size={16} />}
      </button>
    </form>
  );
}
