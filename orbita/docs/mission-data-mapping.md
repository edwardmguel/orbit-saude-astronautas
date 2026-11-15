# ORBITA — Mission data mapping (ISS · Moon · Mars)

How the research repository (`edwardmguel/orbit-saude-astronautas`) feeds the ORBITA dashboard, and how each value changes with the mission selected in the header.

Source tags: **[REPO doc]** = project research document; **[REAL]** = real data captured on 2026-11-15; **[PAPER]** = peer-reviewed measurement; **[DESIGN REF]** = NASA design reference not yet flown; **[INFERENCE]** = deduction, explained.

## 1. Mission profiles (`src/data/missions.ts`)

| Parameter | ISS EXP-01 | ARTEMIS SURFACE-01 (Moon) | MARS-01 | Source |
| --- | --- | --- | --- | --- |
| Gravity | ~10⁻⁶ g (0 in calcs) | 1.62 m/s² (1/6 g) | 3.72 m/s² (3/8 g) | REPO 16 |
| Phase | 180-day increment | 90-day surface stay (concept) | 500-day surface stay after 180-day transit | REPO 16; NASA DRA 5.0 [INFERENCE] |
| Effective dose rate | 0.42 mSv/day (0.28–0.56) | 1.369 mSv/day | 0.64 mSv/day | REPO 02/17; Zhang 2020 [PAPER]; Hassler 2014 [PAPER] |
| Transit dose | — | 4 d × 1.84 mSv/day | 180 d × 1.84 mSv/day | Zeitlin 2013 [PAPER] |
| Cabin total pressure | 757.64 mmHg (101.01 kPa) | 424.06 mmHg (8.2 psia) | 424.06 mmHg | ISS Live [REAL]; EAWG [DESIGN REF] |
| Cabin ppO₂ | 150.67 mmHg (Node 3) | 144.18 mmHg (34%) | 144.18 mmHg | ISS Live [REAL]; EAWG |
| ppCO₂ | 2.95 mmHg (Node 3), 2.44 (US Lab) | 2.2 mmHg (simulated) | 2.4 mmHg (simulated) | ISS Live [REAL] |
| One-way signal | 0.24 s (TDRS relay) | 1.28 s; 30–50 min blackouts | 4–24 min, computed for today's date | REPO 16 |
| Contact mode | Real time | Real time, blackout behind the Moon | Store-and-forward (EIMO); no contact in conjunction (<2°) | REPO 16 |
| Day counter | Day | Day | Sol (24 h 39 min 35 s) | — |

## 2. Calculations (`src/lib/physics.ts`)

| Calculation | Formula | Worked example | Source |
| --- | --- | --- | --- |
| Inspired O₂ | PIO₂ = (Pb − 47) × ppO₂ / Pb | ISS Node 3: (757.64 − 47) × 150.67 / 757.64 = **141.3 mmHg**; exploration: (424.06 − 47) × 0.34 = **128.2 mmHg** | REPO 04 A1; OCHMO-TB-003 |
| Alveolar O₂ | PAO₂ = PIO₂ − PaCO₂ / RQ (40 / 0.8) | 141.3 − 50 = 91.3 mmHg | Standard physiology |
| Expected SpO₂ | Severinghaus: 100 / (1 + 23400 / (P³ + 150P)), P = PAO₂ − 5 | ISS 96.6% · Moon/Mars 94.5% · sea level 97.4% | Severinghaus 1979 |
| Earth-equivalent altitude | Pb = PIO₂ / 0.2095 + 47 → ICAO standard atmosphere | ISS 437 m · Moon/Mars 1,187 m | — |
| CO₂ fraction | % = pp / Pb × 100 | 2.95 / 757.64 = 0.39%; the 3 mmHg limit is 0.71% at 8.2 psia | REPO 04 A1 |
| Personal deviation | z = (x − μ) / σ (first 14 days, sample σ) | \|z\| ≥ 2 → attention; z alone never escalates further | REPO 04 A2–A3 |
| Accumulated dose | D = D_transit + Σ dᵢ; career use = D / 600 mSv | ISS day 45: 45 × 0.42 = 18.9 mSv = 3.2% | REPO 04 A7; V1 4030 |
| Projected mission dose | 2 × transit + phase days × rate | ISS 75.6 mSv (13%) · Moon 137.9 mSv (23%) · Mars 982.4 mSv (**164%**) | — |
| Hydrostatic load | ΔP = ρ g h (ρ = 1060 kg/m³, h = 0.72 × stature) | 1.75 m: Earth 98.2 · Mars 37.3 · Moon 16.2 mmHg | Standard physics |
| Bone (hip BMD) | 100 − months in µg × 1.25% | Mars after 180-day transit: 92.6% (< 95% target) | REPO 01; V1 4027 |
| Earth–Mars distance | d = √(1 + a² − 2a·cos θ), θ from the 2025-01-16 opposition | 2026-11-15: 1.196 AU → 9 min 54 s | Circular orbits, ±15% [INFERENCE] |
| ECLSS budget | O₂ = crew × 0.82 kg/day; water = crew × 2.5 L/day × (1 − 0.98) | 4 crew: 3.28 kg/day O₂ = 35% of OGA max (9.25 kg/day) | BVAD; ICES 2024; V2 6109; NASA 98% milestone |

## 3. What changes in the dashboard

| Area | Change |
| --- | --- |
| Header | Mission selector (ISS / Moon / Mars); the Day counter becomes Sol on Mars |
| Heart rate card | Baseline σ and personal z-score (docs/04 A3) |
| Dosimetry card and evaluation | Daily rate shown as a multiple of the mission's expected rate; career use against 600 mSv; a projected mission total above the limit → attention, an accumulated dose above it → alert |
| SpO₂ card and evaluation | Expected SpO₂ for the cabin PIO₂; the attention cut follows the atmosphere; ≤ 92% (CMO contact) stays absolute |
| New section "Habitat & life support" | Inspired O₂, CO₂, radiation environment (real NOAA GOES/Kp sample), gravity load and bone, ground link, O₂ demand vs OGA, water loop, space weather. Each card shows its formula and source, tagged REAL DATA or DESIGN REF |
| Reports | Dose bands and the dashed expected-rate line follow the mission; SpO₂ bands follow the cabin atmosphere |
| ORBITA AI | New question "How does this mission's environment affect me?"; the radiation answer includes career-use and projection math |
| Criteria editor | Dose criteria expressed as multiples of the mission rate |

## 4. Challenge indicators and guidance

| Item | Value used | Where | Source |
| --- | --- | --- | --- |
| Blood pressure | 90–120 / 60–80 mmHg Earth reference; outside → Attention | Daily assessment (vital signs), Overview, Reports chart + table, body map (heart), AI | docs/03 `pa_sistolica`, `pa_diastolica` (MedlinePlus) |
| Fasting glucose | < 100 mg/dL normal; 100–125 needs interpretation; ≥ 126 needs confirmation → Attention | Daily assessment, Overview, Reports table, body map (abdomen), AI | docs/03 `glicose` (ADA) |
| Body temperature | 36.5–37.3 °C oral; outside → Attention | Daily assessment, Overview, Reports table, body map (immune, whole body), AI | docs/03 `temperatura_corporal` |
| Mood | 1–5 authored scale; personal baseline (≥ 7 readings), z ≤ −2 → Attention, never higher | Daily assessment, Overview, Reports chart + table, body map (head, whole body), AI | docs/03 `humor`; docs/04 A2–A3 |
| "What to do" guidance | Do now, prevention, when to call the CMO, clinical path, who acts, crewmate | Overview (tap a flagged indicator), body map (tap an indicator), AI answers | `indicadores.json` guidance; docs/03 master table; NASA countermeasure library (raw research note 10, D1) |

None of these signs gets an automatic orange or red from a number: docs/03 reserves escalation for symptoms and the CMO.

## 5. Deliberate limits (from the research)

- No mission-specific heart-rate offset: NASA publishes no in-flight cut-off and there are no long-duration human data at partial gravity.
- No human data on bone loss at 1/6 g or 3/8 g. Only microgravity days are counted, and the gap is shown on screen.
- Moon and Mars habitat atmospheres follow the NASA Exploration Atmospheres Working Group design reference (8.2 psia / 34% O₂). This is not flown hardware.
- Environment values are context only. Cabin alarms, Caution & Warning and shelter decisions stay with the vehicle, flight control and SRAG.
