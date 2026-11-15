import { useEffect, useRef, useState } from "react";
import { DOT_T0, OrbitaLogo } from "@/components/OrbitaLogo";
import { prefersReducedMotion } from "@/lib/util";

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
  life: number;
}

/**
 * Startup animation: static icon → the small circle travels exactly 360° along the ellipse
 * of the orbit with a subtle glow → the icon dissolves into luminous particles → main screen.
 */
export function OrbitalIntro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const reduced = prefersReducedMotion();
  const STATIC = reduced ? 200 : 700;
  const ORBIT_MS = reduced ? 600 : 2600;
  const HOLD = reduced ? 50 : 250;
  const DISSOLVE = reduced ? 400 : 1500;

  const [t, setT] = useState(DOT_T0);
  const [glow, setGlow] = useState(0);
  const [trail, setTrail] = useState<number[]>([]);
  const [phase, setPhase] = useState<"static" | "orbit" | "dissolve">("static");
  const [bgFade, setBgFade] = useState(1);
  const logoWrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const done = useRef(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    let dissolveStarted = false;
    let particles: Particle[] = [];
    let dissolveT0 = 0;

    const startDissolve = async () => {
      dissolveStarted = true;
      setPhase("dissolve");
      onReveal();
      dissolveT0 = performance.now();
      const svg = logoWrap.current?.querySelector("svg");
      const canvas = canvasRef.current;
      if (!svg || !canvas) return;
      const rect = svg.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const xml = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
      try {
        await img.decode();
      } catch {
        return;
      }
      const S = Math.round(rect.width);
      const off = document.createElement("canvas");
      off.width = S;
      off.height = S;
      const octx = off.getContext("2d")!;
      octx.drawImage(img, 0, 0, S, S);
      const data = octx.getImageData(0, 0, S, S).data;
      const step = Math.max(3, Math.round(S / 70));
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      for (let y = 0; y < S; y += step) {
        for (let x = 0; x < S; x += step) {
          const i = (y * S + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 40 || r + g + b < 160) continue; // ignore the icon's navy background
          const px = rect.left + x;
          const py = rect.top + y;
          const ang = Math.atan2(py - cy, px - cx) + (Math.random() - 0.5) * 0.8;
          const sp = 0.4 + Math.random() * 2.2;
          particles.push({ x: px * dpr, y: py * dpr, vx: Math.cos(ang) * sp * dpr, vy: (Math.sin(ang) * sp - 0.6) * dpr, r: (0.8 + Math.random() * 1.8) * dpr, c: `rgb(${r},${g},${b})`, life: 0.75 + Math.random() * 0.25 });
        }
      }
    };

    const frame = (now: number) => {
      const el = now - start;
      if (el < STATIC) {
        setPhase("static");
      } else if (el < STATIC + ORBIT_MS) {
        setPhase("orbit");
        const p = (el - STATIC) / ORBIT_MS;
        const tt = DOT_T0 + easeInOut(p) * Math.PI * 2;
        setT(tt);
        setGlow(Math.sin(p * Math.PI));
        setTrail([0.07, 0.14, 0.21, 0.28, 0.35].map((d) => tt - d * Math.min(1, Math.sin(p * Math.PI) * 2)));
      } else if (el < STATIC + ORBIT_MS + HOLD) {
        setT(DOT_T0);
        setGlow(0);
        setTrail([]);
      } else if (!dissolveStarted) {
        startDissolve();
      } else {
        const dp = Math.min(1, (now - dissolveT0) / DISSOLVE);
        setBgFade(1 - easeInOut(dp));
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx && particles.length) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.globalCompositeOperation = "lighter";
          for (const pt of particles) {
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.vx *= 0.985;
            pt.vy = pt.vy * 0.985 - 0.015;
            const alpha = Math.max(0, pt.life - dp * 1.05);
            if (alpha <= 0) continue;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = pt.c;
            ctx.shadowColor = "#21C5EF";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        if (dp >= 1) {
          if (!done.current) {
            done.current = true;
            onDone();
          }
          return;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      particles = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dissolving = phase === "dissolve";
  return (
    <div className="fixed inset-0 z-[100]" aria-live="polite" aria-label="Initializing Orbit">
      <div className="absolute inset-0 bg-navy" style={{ opacity: bgFade }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: dissolving ? bgFade : 1 }}>
        <div
          ref={logoWrap}
          className="animate-fade-in"
          style={{
            opacity: dissolving ? 0 : 1,
            filter: dissolving ? "blur(6px)" : "none",
            transform: dissolving ? "scale(1.06)" : "scale(1)",
            transition: "opacity .35s ease, filter .35s ease, transform .6s ease",
          }}
        >
          <OrbitaLogo size={168} t={t} glow={glow} trail={trail} />
        </div>
        <div className="mt-8 font-display text-lg font-semibold tracking-[0.5em] text-ink/90" style={{ opacity: dissolving ? 0 : 1, transition: "opacity .4s" }}>
          ORBIT
        </div>
        <div className="mt-2 text-[11px] tracking-[0.25em] text-mist" style={{ opacity: dissolving ? 0 : 1, transition: "opacity .4s" }}>
          {phase === "static" ? "INITIALIZING SYSTEM" : "SYNCHRONIZING ORBIT"}
        </div>
      </div>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}
