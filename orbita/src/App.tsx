import { lazy, Suspense, useEffect, useState } from "react";
import { CircleCheck, Info, Sparkles, TriangleAlert } from "lucide-react";
import { StoreProvider, useStore } from "@/lib/store";
import { useRoute } from "@/lib/router";
import { Registration } from "@/screens/Registration";
import { OrbitalIntro } from "@/screens/OrbitalIntro";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { OrbitaLogo } from "@/components/OrbitaLogo";
import { Dashboard } from "@/pages/Dashboard";
import { Crew } from "@/pages/Crew";
import { cn } from "@/lib/util";

const OrbitaAI = lazy(() => import("@/pages/OrbitaAI"));
const Reports = lazy(() => import("@/pages/Reports"));
const Routine = lazy(() => import("@/pages/Routine"));
const Risks = lazy(() => import("@/pages/Risks"));
const Profile = lazy(() => import("@/pages/Profile"));

type Phase = "boot" | "register" | "intro" | "main";

function Shell() {
  const { ready, state } = useStore();
  const [phase, setPhase] = useState<Phase>("boot");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (ready && phase === "boot") setPhase(state ? "main" : "register");
  }, [ready, state, phase]);

  if (phase === "boot")
    return (
      <div className="space-bg flex min-h-dvh items-center justify-center">
        <OrbitaLogo size={56} className="animate-fade-in" />
      </div>
    );
  if (phase === "register") return <Registration onDone={() => setPhase("intro")} />;
  return (
    <>
      {(phase === "main" || revealed) && state && <Main fadeIn={phase === "intro"} />}
      {phase === "intro" && (
        <OrbitalIntro
          onReveal={() => setRevealed(true)}
          onDone={() => {
            setPhase("main");
            setRevealed(false);
          }}
        />
      )}
      <Toasts />
    </>
  );
}

function Main({ fadeIn }: { fadeIn: boolean }) {
  const route = useRoute();
  const [menu, setMenu] = useState(false);
  const { state } = useStore();

  useEffect(() => {
    if (!route.params.get("s")) window.scrollTo({ top: 0 });
  }, [route.page, route.params]);

  if (!state) return null;
  const page = (() => {
    switch (route.page) {
      case "crew":
        return <Crew />;
      case "ai":
        return <OrbitaAI />;
      case "reports":
        return <Reports />;
      case "routine":
        return <Routine />;
      case "risks":
        return <Risks route={route} />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard route={route} />;
    }
  })();

  return (
    <div className={cn("space-bg min-h-dvh", fadeIn && "animate-fade-in")}>
      <Header onMenu={() => setMenu(true)} />
      <Sidebar open={menu} onClose={() => setMenu(false)} route={route} />
      <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 sm:pt-8" key={route.page}>
        <Suspense fallback={<div className="py-24 text-center text-sm text-mist">Loading…</div>}>{page}</Suspense>
      </main>
      <footer className="mx-auto max-w-[1400px] space-y-1.5 border-t border-line px-4 pb-8 pt-4 text-[11px] text-faint sm:px-6">
        <p>Orbit: Astronaut Health Monitoring System · NASA Space Apps Challenge 2026 · Automatic data is SIMULATED · Does not provide medical diagnoses.</p>
        <p className="flex items-center gap-1.5">
          <Sparkles size={12} className="shrink-0 text-cyan" />
          This software and the Orbit logo were created with the assistance of artificial intelligence (AI).
        </p>
      </footer>
    </div>
  );
}

function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:pr-6">
      {toasts.map((t) => {
        const Icon = t.tone === "ok" ? CircleCheck : t.tone === "warn" ? TriangleAlert : Info;
        return (
          <div key={t.id} role="status" className="glass sheet-up pointer-events-auto flex max-w-sm items-center gap-3 !bg-[#0d2135]/95 px-4 py-3 text-sm">
            <Icon size={17} className={t.tone === "warn" ? "text-st-attention" : "text-cyan"} />
            <span>{t.text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
