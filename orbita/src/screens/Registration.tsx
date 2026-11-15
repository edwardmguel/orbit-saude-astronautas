import { OrbitaLogo } from "@/components/OrbitaLogo";
import { ProfileForm } from "@/components/ProfileForm";
import { useStore } from "@/lib/store";

export function Registration({ onDone }: { onDone: () => void }) {
  const { register } = useStore();
  return (
    <div className="space-bg flex min-h-dvh items-start justify-center px-4 py-8 sm:items-center sm:py-12">
      <div className="w-full max-w-md animate-fade-up">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <OrbitaLogo size={44} />
            <span className="font-display text-2xl font-semibold tracking-[0.3em] text-ink">ORBIT</span>
          </div>
          <h1 className="mt-6 font-display text-xl font-semibold tracking-[0.08em] text-ink">Astronaut Registration</h1>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
            Fill in your details to start personalized health monitoring during your mission.
          </p>
        </div>
        <div className="glass p-5 sm:p-7">
          <ProfileForm
            onSubmit={async (p, photo) => {
              await register(p, photo);
              onDone();
            }}
          />
        </div>
        <p className="mt-4 text-center text-[11px] text-faint">Data stored locally on this device · NASA Space Apps Challenge 2026</p>
        <p className="mt-1 text-center text-[11px] text-faint">This software and the Orbit logo were created with the assistance of artificial intelligence (AI).</p>
      </div>
    </div>
  );
}
