import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, ExternalLink, Globe2, Orbit, Radiation, Users, Wind } from "lucide-react";
import { HAZARDS, HRP_RISKS_URL, RISK_BY_ID, SPECIFIC_RISKS, type Risk } from "@/data/risks";
import { useApp } from "@/lib/store";
import { navigate, type Route } from "@/lib/router";
import { Modal, PageTitle, SectionHeader } from "@/components/ui";

const HAZARD_ICON: Record<string, typeof Radiation> = {
  "hazard-radiation": Radiation,
  "hazard-isolation": Users,
  "hazard-distance": Globe2,
  "hazard-gravity": Orbit,
  "hazard-environment": Wind,
};

export default function Risks({ route }: { route: Route }) {
  const { selected, explore } = useApp();
  const [open, setOpen] = useState<Risk | null>(null);
  const param = route.params.get("r");

  useEffect(() => {
    if (param && RISK_BY_ID[param]) {
      setOpen(RISK_BY_ID[param]);
      explore(selected.profile.id, param);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  const show = (r: Risk) => {
    setOpen(r);
    explore(selected.profile.id, r.id);
  };

  return (
    <div>
      <PageTitle title="SPACEFLIGHT RISKS" subtitle="Library based on the NASA Human Research Program · educational content" />

      <section>
        <SectionHeader title="The five main hazards" subtitle="NASA Human Research Program classification" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {HAZARDS.map((h, i) => {
            const Icon = HAZARD_ICON[h.id];
            return (
              <button key={h.id} onClick={() => show(h)} className="glass glass-hover group flex flex-col p-4 text-left animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/25 bg-cyan/[0.06] text-cyan">
                    <Icon size={19} />
                  </span>
                  <span className="font-display text-[11px] tracking-[0.2em] text-faint">0{i + 1}</span>
                </div>
                <div className="mt-4 font-display text-[15px] font-semibold leading-tight">{h.name}</div>
                <div className="text-[11px] text-faint">{h.english}</div>
                <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-mist">{h.summary}</p>
                <span className="mt-3 flex items-center gap-1 text-[12px] text-cyan opacity-80 group-hover:opacity-100">
                  Learn more <ArrowUpRight size={13} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader
          title="Specific risks"
          subtitle="Description, possible impacts, related indicators and official reference"
          right={
            <a href={HRP_RISKS_URL} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[12px] text-cyan hover:underline">
              <BookOpen size={13} /> NASA HRP — Risks <ExternalLink size={11} />
            </a>
          }
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIFIC_RISKS.map((r, i) => (
            <button key={r.id} onClick={() => show(r)} className="glass glass-hover group flex items-start gap-3 p-4 text-left animate-fade-up" style={{ animationDelay: `${i * 25}ms` }}>
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan shadow-[0_0_8px_#21c5ef]" />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-medium">{r.name}</div>
                <p className="mt-0.5 line-clamp-2 text-[12px] text-mist">{r.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {r.indicators.slice(0, 3).map((x) => (
                    <span key={x} className="rounded border border-line px-1.5 py-0.5 text-[10.5px] text-faint">{x}</span>
                  ))}
                </div>
              </div>
              <ArrowUpRight size={15} className="shrink-0 text-faint transition group-hover:text-cyan" />
            </button>
          ))}
        </div>
      </section>

      <Modal
        open={!!open}
        onClose={() => {
          setOpen(null);
          if (param) navigate("/risks");
        }}
        title={open ? open.name.toUpperCase() : ""}
        wide
      >
        {open && (
          <div className="space-y-5">
            <div className="text-[11.5px] tracking-wide text-faint">{open.english} · {open.hazard ? "Main hazard" : "Specific risk"}</div>
            <p className="text-[14px] leading-relaxed text-ink/90">{open.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-navy/40 p-4">
                <div className="label mb-2">Possible impacts</div>
                <ul className="space-y-1.5">
                  {open.impacts.map((x) => (
                    <li key={x} className="flex gap-2 text-[13px] text-mist">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-navy/40 p-4">
                <div className="label mb-2">Related indicators</div>
                <div className="flex flex-wrap gap-1.5">
                  {open.indicators.map((x) => (
                    <span key={x} className="rounded-md border border-cyan/25 bg-cyan/[0.05] px-2 py-1 text-[12px] text-ink/85">{x}</span>
                  ))}
                </div>
              </div>
            </div>
            <a href={open.refUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-xl border border-line p-4 transition hover:border-cyan/40">
              <span className="flex items-center gap-3">
                <BookOpen size={17} className="text-cyan" />
                <span>
                  <span className="label block !text-[10px]">Official NASA reference</span>
                  <span className="text-[13px]">{open.refTitle}</span>
                </span>
              </span>
              <ExternalLink size={15} className="text-faint" />
            </a>
            <p className="text-[11px] text-faint">Educational plain-language summary. Consult the official source for complete information. ORBITA does not provide diagnoses.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
