import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useApp } from "@/lib/store";
import type { Route } from "@/lib/router";
import { navigate } from "@/lib/router";
import { STATUS_META } from "@/lib/health";
import { AutoMonitoring } from "@/components/dashboard/AutoMonitoring";
import { PersonalAssessment } from "@/components/dashboard/PersonalAssessment";
import { HabitatPanel } from "@/components/dashboard/HabitatPanel";
import { GuidanceCard } from "@/components/GuidanceCard";
import type { IndicatorKey } from "@/types";
import { BodyMap } from "@/components/body/BodyMap";
import { CriteriaEditor } from "@/components/CriteriaEditor";
import { Avatar, Modal, SectionHeader, SimTag, StatusBadge, StatusLegend } from "@/components/ui";

export function Dashboard({ route }: { route: Route }) {
  const { selected: s, photoOf, state, now } = useApp();
  const [criteria, setCriteria] = useState(false);
  const [guideKey, setGuide] = useState<IndicatorKey | null>(null);
  useEffect(() => setGuide(null), [s?.profile.id]);
  const section = route.params.get("s");

  useEffect(() => {
    if (!section) return;
    const id = section === "map" ? "map" : section === "bloodcount" ? "bloodcount" : "assessment";
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    return () => clearTimeout(t);
  }, [section, route]);

  if (!s) return null;
  const firstName = s.profile.name.split(" ")[0];

  return (
    <div key={s.profile.id} className="space-y-10">
      {/* Selected crew member summary */}
      <div className="glass relative overflow-hidden p-4 animate-fade-up sm:p-5">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center gap-4">
          <Avatar src={photoOf(s.profile.id)} alt={s.profile.name} size={60} />
          <div className="min-w-0 flex-1">
            <div className="label">Astronaut {s.profile.code} · Individual monitoring</div>
            <div className="mt-0.5 font-display text-xl font-semibold sm:text-2xl">{s.profile.name}</div>
            <div className="mt-0.5 text-[12.5px] text-mist">
              {s.alerts.length === 0
                ? `${firstName}'s indicators are within the monitoring criteria.`
                : `${s.alerts.length} of ${firstName}'s indicator(s) need monitoring.`}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <StatusBadge status={s.overall} />
            {s.alerts.length > 0 && (
              <button onClick={() => navigate("/reports")} className="flex items-center gap-1 text-[12px] text-cyan hover:underline">
                View trends <ChevronRight size={13} />
              </button>
            )}
          </div>
        </div>
        {s.alerts.length > 0 && (
          <div className="relative mt-4 border-t border-line pt-4">
            <div className="mb-2 text-[11.5px] text-faint">Tap an indicator to see what to do</div>
            <div className="flex flex-wrap gap-2">
              {s.alerts.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setGuide((g) => (g === a.key ? null : a.key))}
                  aria-expanded={guideKey === a.key}
                  className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[12px] transition hover:brightness-125"
                  style={{ borderColor: `${STATUS_META[a.status].color}${guideKey === a.key ? "aa" : "40"}`, background: `${STATUS_META[a.status].color}${guideKey === a.key ? "1f" : "0d"}` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_META[a.status].color }} />
                  <span className="text-ink/90">{a.label}</span>
                  <span className="text-faint">{a.value.split(" · ")[0]}</span>
                </button>
              ))}
            </div>
            {guideKey && s.indicators[guideKey] && (
              <div className="mt-3">
                <GuidanceCard ind={s.indicators[guideKey]} />
              </div>
            )}
          </div>
        )}
      </div>

      <section>
        <SectionHeader
          title="Automatic monitoring"
          subtitle="Onboard sensors · demonstration values with no integration to real equipment"
          right={
            <div className="flex items-center gap-3">
              <SimTag />
            </div>
          }
        />
        <AutoMonitoring snap={s} />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
          <StatusLegend onConfigure={() => setCriteria(true)} />
          <span className="text-[11px] text-faint">EOG is an experimental indicator of fatigue and alertness — not a diagnosis of inattention.</span>
        </div>
      </section>

      <section id="habitat" className="scroll-mt-24">
        <SectionHeader title="Habitat & life support" subtitle={`ECLSS, radiation and gravity for ${s.mission.code} · values recalculated for the selected mission`} />
        <HabitatPanel snap={s} crewSize={state.crew.length} now={now} />
      </section>

      <section id="assessment" className="scroll-mt-24">
        <SectionHeader title="Personal assessment" subtitle="Manual data · fill in → save → review the results" />
        <PersonalAssessment snap={s} />
      </section>

      <section id="map" className="scroll-mt-24">
        <SectionHeader title="Body map" subtitle="Interactive 3D human model · spaceflight risks by region" />
        <BodyMap snap={s} />
      </section>

      <Modal open={criteria} onClose={() => setCriteria(false)} title="COLOR CODE · CRITERIA" wide>
        <div className="mb-5 grid gap-2 sm:grid-cols-2">
          {(Object.keys(STATUS_META) as (keyof typeof STATUS_META)[]).map((k) => (
            <div key={k} className="flex items-start gap-3 rounded-xl border border-line p-3">
              <StatusBadge status={k} size="xs" />
              <p className="text-[12px] text-mist">{STATUS_META[k].desc}</p>
            </div>
          ))}
        </div>
        <CriteriaEditor onSaved={() => setCriteria(false)} />
      </Modal>
    </div>
  );
}
