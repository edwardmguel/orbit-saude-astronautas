import { useState } from "react";
import { Pencil, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useApp } from "@/lib/store";
import { navigate } from "@/lib/router";
import { STATUS_META } from "@/lib/health";
import { ProfileForm } from "@/components/ProfileForm";
import { CriteriaEditor } from "@/components/CriteriaEditor";
import { Modal, PageTitle, StatusBadge } from "@/components/ui";
import { fmtDate } from "@/lib/util";

export default function Profile() {
  const { selected: s, photoOf, updateProfile, restoreDemo, toast, state } = useApp();
  const [edit, setEdit] = useState(false);
  const [criteria, setCriteria] = useState(false);
  const [reset, setReset] = useState(false);
  const p = s.profile;
  const bmi = p.weightKg / Math.pow(p.heightCm / 100, 2);

  const facts: [string, string][] = [
    ["Identification", `Astronaut ${p.code}`],
    ["System ID", p.id],
    ["Sex", p.sex === "M" ? "Male" : "Female"],
    ["Body weight", `${p.weightKg.toLocaleString("en-US")} kg`],
    ["Height", `${p.heightCm} cm`],
    ["BMI", bmi.toLocaleString("en-US", { maximumFractionDigits: 1 })],
    ["Mission", `${state.missionName} · day ${String(s.day).padStart(3, "0")}`],
    ["Registered", fmtDate(p.createdAt)],
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <PageTitle
        title="ASTRONAUT PROFILE"
        subtitle="Personal data and individual baseline"
        right={
          <button className="btn-primary" onClick={() => setEdit(true)}>
            <Pencil size={14} /> Edit profile
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[280px_minmax(0,1fr)]">
        <div className="glass overflow-hidden animate-fade-up">
          <img src={photoOf(p.id)} alt={p.name} className="aspect-square max-h-64 w-full object-cover md:max-h-none" />
          <div className="border-t border-line p-4">
            <div className="font-display text-[11px] tracking-[0.18em] text-faint">ASTRONAUT {p.code}</div>
            <div className="mt-0.5 text-lg font-medium">{p.name}</div>
            <div className="mt-2">
              <StatusBadge status={s.overall} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass p-5 animate-fade-up">
            <div className="label mb-3">Personal data</div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] text-faint">{k}</dt>
                  <dd className="text-[13.5px] tabular">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border-t border-line pt-3">
              <dt className="text-[11px] text-faint">Notes</dt>
              <dd className="mt-0.5 text-[13px] text-mist">{p.notes || "No notes recorded."}</dd>
            </div>
          </div>

          <div className="glass p-5 animate-fade-up">
            <div className="label mb-3">Individual baseline · first 14 days</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Heart rate", `${s.baseline.hr} bpm`],
                ["SpO₂", `${s.baseline.spo2}%`],
                ["Blinks (EOG)", `${s.baseline.blink}/min`],
                ["Sleep", `${s.baseline.sleep.toLocaleString("en-US")} h`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-navy/40 p-3">
                  <div className="text-[11px] text-faint">{k}</div>
                  <div className="font-display text-lg font-semibold tabular">{v}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-faint">Simulated values used as a personal reference to identify changes.</p>
          </div>

          <div className="glass flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="text-[13.5px] font-medium">Indicator criteria</div>
              <div className="text-[12px] text-mist">Demonstration, configurable limits of the color code.</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn-ghost" onClick={() => setCriteria(true)}>
                <SlidersHorizontal size={14} /> Configure criteria
              </button>
              <button className="btn-ghost" onClick={() => setReset(true)}>
                <RotateCcw size={14} /> Restore demo data
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 px-1 text-[11px] text-faint">
            {(Object.keys(STATUS_META) as (keyof typeof STATUS_META)[]).map((k) => (
              <span key={k}>
                <span style={{ color: STATUS_META[k].color }}>■</span> {STATUS_META[k].label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Modal open={edit} onClose={() => setEdit(false)} title="EDIT PROFILE">
        <ProfileForm
          initial={p}
          initialPhoto={photoOf(p.id)}
          submitLabel="Save changes"
          onSubmit={async (np, photo) => {
            await updateProfile(p.id, np, photo !== photoOf(p.id) ? photo : undefined);
            setEdit(false);
            toast("Profile updated");
          }}
        />
      </Modal>
      <Modal open={criteria} onClose={() => setCriteria(false)} title="INDICATOR CRITERIA" wide>
        <CriteriaEditor onSaved={() => setCriteria(false)} />
      </Modal>
      <Modal open={reset} onClose={() => setReset(false)} title="RESTORE DEMO DATA">
        <p className="text-[13px] leading-relaxed text-mist">
          Restores the initial demo profiles, avatars and indicators. Crew members added and records made during the demonstration will be removed. The Astronaut 001 profile is kept.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={() => setReset(false)}>Cancel</button>
          <button
            className="btn-primary"
            onClick={async () => {
              await restoreDemo();
              setReset(false);
              toast("Demo data restored");
              navigate("/");
            }}
          >
            <RotateCcw size={14} /> Restore
          </button>
        </div>
      </Modal>
    </div>
  );
}
