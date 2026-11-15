import { Component, lazy, Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, Hand, MousePointerClick, Move3d, X } from "lucide-react";
import type { IndicatorKey, Status } from "@/types";
import { GuidanceCard } from "../GuidanceCard";
import { BODY_REGIONS, REGION_BY_ID, type RegionId } from "@/data/bodyRegions";
import { STATUS_META, worst, type Snapshot } from "@/lib/health";
import { useApp } from "@/lib/store";
import { navigate } from "@/lib/router";
import { cn } from "@/lib/util";
import { StatusBadge, StatusDot } from "../ui";

const BodyModel3D = lazy(() => import("./BodyModel3D"));

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

class GLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    return this.state.err ? this.props.fallback : this.props.children;
  }
}

export function regionStatuses(snap: Snapshot): Record<RegionId, Status> {
  const out = {} as Record<RegionId, Status>;
  for (const r of BODY_REGIONS) out[r.id] = r.indicators.length ? worst(...r.indicators.map((k) => snap.indicators[k].status)) : "no_data";
  return out;
}

export function BodyMap({ snap }: { snap: Snapshot }) {
  const { explore } = useApp();
  const [sel, setSel] = useState<RegionId | null>(null);
  const [guide, setGuide] = useState<IndicatorKey | null>(null);
  useEffect(() => setGuide(null), [sel]);
  const [gl] = useState(webglAvailable);
  const statuses = useMemo(() => regionStatuses(snap), [snap]);

  useEffect(() => setSel(null), [snap.profile.id]);

  const select = (r: RegionId) => {
    setSel((cur) => (cur === r ? null : r));
    explore(snap.profile.id, r);
  };
  const region = sel ? REGION_BY_ID[sel] : null;

  const fallback = (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-mist">
      <Move3d className="text-cyan" />
      3D view unavailable on this device. Select regions from the list.
    </div>
  );

  return (
    <div className="glass overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="relative h-[460px] border-b border-line sm:h-[540px] lg:h-[600px] lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(33,197,239,0.10),transparent_65%)]" />
          {gl ? (
            <GLBoundary fallback={fallback}>
              <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-mist">Loading 3D model…</div>}>
                <BodyModel3D sex={snap.profile.sex} selected={sel} onSelect={select} statuses={statuses} />
              </Suspense>
            </GLBoundary>
          ) : (
            fallback
          )}
          <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1">
            <span className="label !text-[10px]">{snap.profile.sex === "M" ? "Male" : "Female"} model</span>
            <span className="text-[12px] text-ink/80">Astronaut {snap.profile.code} · {snap.profile.name.split(" ")[0]}</span>
          </div>
          <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-faint">
            <span className="flex items-center gap-1.5"><Hand size={12} /> Drag to rotate</span>
            <span className="flex items-center gap-1.5"><Move3d size={12} /> Scroll or pinch to zoom</span>
            <span className="flex items-center gap-1.5"><MousePointerClick size={12} /> Tap a region</span>
          </div>
        </div>

        <div className="flex min-h-[320px] flex-col p-4 sm:p-5">
          <div className="label mb-2.5">Interactive regions</div>
          <div className="flex flex-wrap gap-1.5">
            {BODY_REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => select(r.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition",
                  sel === r.id ? "border-cyan/70 bg-cyan/12 text-ink shadow-[0_0_14px_-4px_#21c5ef]" : "border-line text-mist hover:border-cyan/35 hover:text-ink",
                )}
                aria-pressed={sel === r.id}
              >
                <StatusDot status={statuses[r.id]} size={6} />
                {r.name}
              </button>
            ))}
          </div>

          {region ? (
            <div key={region.id} className="mt-5 flex flex-1 flex-col animate-fade-up">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-semibold tracking-[0.12em] text-cyan">{region.title}</div>
                  <div className="text-[12.5px] text-mist">{region.name}</div>
                </div>
                <button onClick={() => setSel(null)} className="rounded-lg p-1 text-faint hover:bg-white/5 hover:text-ink" aria-label="Close panel">
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4">
                <div className="label mb-1.5">Possible risks</div>
                <ul className="space-y-1">
                  {region.risks.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[13px] text-ink/90">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-mist">{region.explanation}</p>

              <div className="mt-4">
                <div className="label mb-1.5">Related indicators</div>
                <div className="space-y-1.5">
                  {region.indicators.map((k) => {
                    const ind = snap.indicators[k];
                    const open = guide === k;
                    return (
                      <div key={k}>
                        <button
                          onClick={() => setGuide(open ? null : k)}
                          aria-expanded={open}
                          className={cn("flex w-full items-center justify-between gap-2 rounded-lg border bg-navy/50 px-3 py-2 text-left transition hover:border-cyan/35", open ? "border-cyan/50" : "border-line")}
                        >
                          <div className="min-w-0">
                            <div className="text-[12.5px] text-ink/90">{ind.label}</div>
                            <div className="truncate text-[11px] text-faint">{ind.value} · <span className="text-cyan/80">what to do</span></div>
                          </div>
                          <StatusBadge status={ind.status} size="xs" />
                        </button>
                        {open && (
                          <div className="mt-1.5">
                            <GuidanceCard ind={ind} compact />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <div className="label mb-1.5">Specialized assessments</div>
                <div className="flex flex-wrap gap-1.5">
                  {region.evaluations.map((e) => (
                    <span key={e} className="rounded-md border border-line px-2 py-1 text-[11.5px] text-mist">{e}</span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="text-[11px] text-faint">Educational content · not a diagnosis</span>
                <button className="btn-primary !py-2" onClick={() => navigate(`/risks?r=${region.riskId}`)}>
                  Learn more <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-line p-6 text-center">
              <MousePointerClick className="text-cyan" />
              <p className="mt-2 max-w-xs text-[13px] text-mist">Select a body region to see the possible spaceflight risks and related indicators.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {(["normal", "attention", "alert", "critical", "no_data"] as Status[]).map((s) => (
                  <span key={s} className="flex items-center gap-1.5 text-[11px] text-faint">
                    <StatusDot status={s} size={6} /> {STATUS_META[s].label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
