# ORBITA — Astronaut Health Monitoring System

Health monitoring system for astronauts on space missions · **NASA Space Apps Challenge 2026**.

Functional prototype built with React + TypeScript + Tailwind CSS + Recharts + React Three Fiber. All automatic data is **SIMULATED**; ORBITA does not provide medical diagnoses.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build: `npm run build` (output in `dist/`).

## Demo walkthrough

1. **First access** → Astronaut Registration (photo by camera or upload, full name, sex, weight, height, notes) → **Save and continue**.
2. **Orbital animation**: the small circle travels 360° along the orbit ellipse and the icon dissolves into particles.
3. **Overview** (Astronaut 001): automatic monitoring, personal assessment (daily and blood count) and 3D body map.
4. **Crew**: Helena (002, normal) opens the dashboard on the first click; Rafael (003, attention) and Yuki (004, critical) first show the list of indicators — **Access monitoring** or a second click on the photo.
5. **Add crew member**: same form as the registration; generates the next identifier (`astronaut-005`…).
6. **ORBITA AI**, **Reports** (7/15/30 days/mission), **Mission routine** (with *Mission: Health on Track*), **Space risks**, **Profile**.
7. **Restore demo data** (Crew or Profile) to repeat the demonstration.

## Structure

- `src/lib/health.ts` — configurable demonstration criteria, color code and indicator evaluation.
- `src/lib/sim.ts` — deterministic generator of simulated series and individual baseline.
- `src/lib/store.tsx` / `storage.ts` — global state (`selectedCrewMemberId`), `localStorage` and photos in IndexedDB.
- `src/lib/ai.ts` — offline ORBITA AI (intents + local NASA HRP knowledge base).
- `src/lib/routine.ts` — mission routine and gamification; `notifications.ts` — notification center.
- `src/data/` — demo crew, avatars, NASA HRP risks and body map regions.
- `src/components/body/BodyModel3D.tsx` — 3D human model (male/female) with clickable regions.
- `src/screens/OrbitalIntro.tsx` — ORBITA icon animation.
