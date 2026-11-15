import { AlertTriangle, ListChecks, ShieldCheck, Stethoscope, UserRound, Users } from "lucide-react";
import type { ReactNode } from "react";
import { GUIDANCE } from "@/data/guidance";
import { STATUS_META } from "@/lib/health";
import type { IndicatorEval } from "@/types";
import { StatusBadge } from "./ui";

function Row({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 shrink-0 text-cyan">{icon}</span>
      <div className="min-w-0">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-faint">{title}</div>
        <div className="text-[12.5px] leading-relaxed text-ink/90">{children}</div>
      </div>
    </div>
  );
}

/** "What to do" for one indicator: guidance from the research repository, never a prescription. */
export function GuidanceCard({ ind, compact }: { ind: IndicatorEval; compact?: boolean }) {
  const g = GUIDANCE[ind.key];
  const flagged = STATUS_META[ind.status].rank >= 1;
  return (
    <div className="rounded-xl border border-line bg-navy/50 p-3.5 animate-fade-up sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[13px] font-medium">What to do · {ind.label}</div>
          <div className="text-[11.5px] text-mist">
            {ind.value} — {ind.reason}
          </div>
        </div>
        <StatusBadge status={ind.status} size="xs" />
      </div>
      <div className={compact ? "mt-3 space-y-2.5" : "mt-3 grid gap-3 md:grid-cols-2"}>
        <Row icon={<ListChecks size={14} />} title={flagged ? "Do now" : "If it changes"}>
          <ul className="space-y-1">
            {g.doNow.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Row>
        <Row icon={<ShieldCheck size={14} />} title="Prevention · NASA countermeasures">
          <ul className="space-y-1">
            {g.prevention.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Row>
        <Row icon={<AlertTriangle size={14} />} title="Call the CMO / flight surgeon when">
          {g.escalateWhen}
        </Row>
        <Row icon={<Stethoscope size={14} />} title="Clinical path">
          {g.clinical}
        </Row>
        {!compact && (
          <>
            <Row icon={<UserRound size={14} />} title="Who acts">
              {g.whoActs}
            </Row>
            <Row icon={<Users size={14} />} title="Crewmate">
              {g.crewmate}
            </Row>
          </>
        )}
      </div>
      <div className="mt-3 text-[10.5px] text-faint">
        Guidance from the mission research library · ORBITA never prescribes medication or changes vehicle systems.
      </div>
    </div>
  );
}
