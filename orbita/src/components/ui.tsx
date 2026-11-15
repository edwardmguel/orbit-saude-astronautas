import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CircleAlert, CircleCheck, CircleDashed, OctagonAlert, TriangleAlert, X } from "lucide-react";
import type { Status } from "@/types";
import { STATUS_META } from "@/lib/health";
import { cn } from "@/lib/util";

export const STATUS_ICON = {
  normal: CircleCheck,
  attention: CircleAlert,
  alert: TriangleAlert,
  critical: OctagonAlert,
  no_data: CircleDashed,
} as const;

export function StatusBadge({ status, size = "sm", className }: { status: Status; size?: "xs" | "sm"; className?: string }) {
  const m = STATUS_META[status];
  const Icon = STATUS_ICON[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border font-display font-semibold uppercase",
        size === "xs" ? "px-2 py-0.5 text-[10px] tracking-[0.12em]" : "px-2.5 py-1 text-[10.5px] tracking-[0.14em]",
        className,
      )}
      style={{ color: m.color, borderColor: `${m.color}55`, background: `${m.color}14` }}
    >
      <Icon size={size === "xs" ? 11 : 12} strokeWidth={2.4} aria-hidden />
      {m.label}
    </span>
  );
}

export function StatusDot({ status, size = 8, pulse }: { status: Status; size?: number; pulse?: boolean }) {
  const c = STATUS_META[status].color;
  return (
    <span
      className={cn("inline-block shrink-0 rounded-full", pulse && "soft-blink")}
      style={{ width: size, height: size, background: c, boxShadow: `0 0 ${size}px ${c}88` }}
      aria-label={STATUS_META[status].label}
    />
  );
}

export function SimTag({ className }: { className?: string }) {
  return (
    <span className={cn("rounded border border-cyan/25 bg-cyan/5 px-1.5 py-0.5 font-display text-[9.5px] font-semibold tracking-[0.18em] text-cyan/80", className)}>
      SIMULATED
    </span>
  );
}

export function SectionHeader({ title, subtitle, right, id }: { title: string; subtitle?: string; right?: ReactNode; id?: string }) {
  return (
    <div id={id} className="mb-4 flex scroll-mt-24 flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className="h-4 w-[3px] rounded-full bg-gradient-to-b from-cyan to-teal shadow-[0_0_10px_#21c5ef]" />
          <h2 className="section-title text-[13px] text-ink sm:text-sm">{title}</h2>
        </div>
        {subtitle && <p className="mt-1.5 pl-[15px] text-[13px] text-mist">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function PageTitle({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-[0.06em] text-ink sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-mist">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  wide?: boolean;
  labelledBy?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", on);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", on);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div className="absolute inset-0 bg-[#030810]/75 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        className={cn(
          "glass sheet-up relative max-h-[92dvh] w-full overflow-y-auto rounded-b-none !bg-[#0b1b2b] sm:rounded-b-[14px]",
          wide ? "sm:max-w-3xl" : "sm:max-w-lg",
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-[#0b1b2b]/95 px-5 py-4 backdrop-blur">
          <div className="min-w-0 font-display text-sm font-semibold tracking-[0.12em] text-ink">{title}</div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-mist transition hover:bg-white/5 hover:text-ink" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export function Sparkline({ data, color = "#21C5EF", height = 36 }: { data: number[]; color?: string; height?: number }) {
  if (data.length < 2) return <div style={{ height }} />;
  const w = 120;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, height - 4 - ((v - min) / span) * (height - 8)]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const id = `sp${color.slice(1)}${data.length}`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${w} ${height} L0 ${height} Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.6" fill={color} />
    </svg>
  );
}

export function Avatar({ src, alt, size = 36, status, className }: { src?: string; alt: string; size?: number; status?: Status; className?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full rounded-[10px] border border-line object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-[10px] border border-line bg-navy-2 text-xs text-mist">{alt.slice(0, 1)}</span>
      )}
      {status && (
        <span className="absolute -right-1 -top-1 rounded-full border-2 border-navy">
          <StatusDot status={status} size={9} />
        </span>
      )}
    </span>
  );
}

export function ProgressBar({ value, color = "#21C5EF", className }: { value: number; color?: string; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]", className)}>
      <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%`, background: color, boxShadow: `0 0 10px ${color}88` }} />
    </div>
  );
}

export function StatusLegend({ compact, onConfigure }: { compact?: boolean; onConfigure?: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {(Object.keys(STATUS_META) as Status[]).map((s) => {
        const Icon = STATUS_ICON[s];
        return (
          <span key={s} className="inline-flex items-center gap-1.5 text-[11.5px] text-mist" title={STATUS_META[s].desc}>
            <Icon size={13} color={STATUS_META[s].color} strokeWidth={2.4} aria-hidden />
            {compact ? STATUS_META[s].label : `${STATUS_META[s].label}`}
          </span>
        );
      })}
      {onConfigure && (
        <button onClick={onConfigure} className="text-[11.5px] text-cyan underline-offset-4 hover:underline">
          Demonstration criteria
        </button>
      )}
    </div>
  );
}
