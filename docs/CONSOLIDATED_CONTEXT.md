# Consolidated context: Orbit Health

> Detailed version for the team. For non-negotiable domain rules, see `AGENTS.md`.
> For the lean summary for AI sessions, see `CLAUDE.md`.
> Last updated: 11/15/2026.

---

## 1. Summary of each file

### docs/00-reading-guide.md
Reading order by profile (dev, design, presentation, domain). Confidence label system: OFFICIAL (verified primary source), PAPER (peer-reviewed article), SECONDARY, INFERENCE, MANUFACTURER, EARTH-GUIDELINE. Inference never enters the pitch as fact.

### docs/01-mission-context.md
21 HRR risks in 3 categories (physiology, behavior/human factors, radiation). 5 RIDGE hazards. Daily routine on the ISS (wake up 06:00 GMT, work 08:00 to 17:00, sleep from 21:30). 6-month expeditions. EVA lasts up to 8 hours. SANS is the main health risk identified by NASA (about 70% of the crew with at least one sign). Sleep data measured by actigraphy: 6.09 hours plus or minus 0.67 h per night (21 astronauts).

### docs/02-equipment-and-data.md
Master table of all equipment with what it measures, unit and how it delivers. Highlights:
- MCA: mass spectrometer; measures N2, O2, CO2, CH4, vapor in mmHg; continuous.
- CSA Bio-Monitor: ECG, respiration, SpO2, estimated systolic pressure, temperature, movement; sessions of up to 48h.
- CAD (Crew Active Dosimeter): absorbed dose and radiation rate; Bluetooth; in use since 2020.
- Actiwatch Spectrum: movement and light for sleep estimation; 2-week campaigns.
- i-STAT: basic chemistry and troponin onboard in minutes.
- iPad with ISS FIT: food and fluid logging (mL) since 2016.
- Correction: Astroskin only estimates systolic pressure (no cuff). Bio-Monitor and Astroskin may be different devices.
- Correction: Tempus PRO is not confirmed as operational on the ISS (candidate for exploration).

### docs/03-indicators-and-thresholds.md
73 documented indicators; 35 in the executable JSON. 4 classes:
- `requisito_oficial`: threshold with a published NASA source (ppCO2, bone density, muscle strength, VO2max, radiation dose, proton flux).
- `referencia_terrestre`: threshold from general literature, without a NASA standard (HR, blood pressure, SpO2, temperature, glycemia, blood count).
- `linha_de_base`: personal deviation only, no fixed cutoff (mood, cognition, HRV).
- `gatilho_sintoma`: qualitative self-assessment (headache, blurred vision, tiredness).

**Thresholds with a NASA source (may have a fixed-threshold color):**
- `ppco2_modulo`: green = 1h mean <= 3 mmHg (NASA V2 6004 Table 6.4.5-2).
- `densidade_ossea`: hip/spine >= 95%, femoral neck >= 90% of baseline (V1 4027).
- `forca_muscular`: >= 80% of baseline (V1 4024).
- `vo2max`: 32.9 mL/kg/min (women) and 36.5 mL/kg/min (men); >= 80% of baseline (V1 4001 to 4003).
- `dose_acumulada_carreira`: < 600 mSv effective (OCHMO-STD-100.1A).
- `dose_30dias_medula`: < 0.25 Gy-eq; lens < 1.0; skin < 1.5 (same source).
- `fluxo_protons_goes`: S1 starts at 10 pfu for protons >= 10 MeV (NOAA SWPC).

**Thresholds without a NASA source (personal baseline only):**
Resting HR, blood pressure, SpO2, temperature, glycemia, blood count, sleep (number of hours), mood (scale).

### docs/04-data-cross-referencing.md
Formulas with worked numeric examples (the numbers are the reference for the unit tests).
- Baseline: mean and sample standard deviation (n >= 7, exclude yellow/red days).
- Z-score: z = (x - mean) / sigma. |z| >= 2 = yellow; |z| > 3 in 2 consecutive measurements = persistent yellow. Z-score alone never generates red.
- EWMA: St = 0.3 * xt + 0.7 * St-1 (lambda = 0.3).
- Readiness index A12: weighted mean (sleep 0.30, fatigue 0.20, PVT 0.20, HRV 0.15, mood 0.15).
- 6 cross-reference rules (R-CO2-01 to R-AMB-01) with id, conditions, time window, resulting level, hypothesis and guidance.

### docs/05-software-architecture.md
Complete stack. Folder structure. Design decisions (offline IndexedDB, no remote backend). Scenarios C1 to C5 with a step-by-step script. Questions K1 to K8 for the kickoff (design and stack decisions).

### docs/06-data-model.md
Canonical TypeScript types with all fields and units. Main entities: `Missao`, `Tripulante`, `Modulo`, `Dispositivo`, `Leitura`, `Indicador`, `LinhaDeBase`, `Autoavaliacao`, `SessaoSono`, `EventoClimaEspacial`, `Regra`, `Alerta`. `Leitura` has traceability fields: `origem` (simulada / ao_vivo / historica / manual / automatica / exame), `qualidade`, `disponibilidade`, `instanteUtc`, `instanteDisponivelUtc`, `protocolo`.

### docs/07-interface-design.md
Color tokens (dark theme). Visual rules: color never alone (always color + icon + word). Nothing blinks, nothing emits sound, no label uses Caution/Warning/Emergency. States with the "Health:" prefix. Screens T1 to T7 in detail. Clickable regions in T2 (12 ids). Icon system.

### docs/08-prototype-plan-20h.md
Plan for 3 devs (A, B, C). P0/P1/P2 scope with suggested owner. Mermaid schedule. Compressed 13-hour plan (version used in the hackathon). Definition of done. Schedule risks. Suggested 7-minute script.

### docs/09-orbit-glasses.md
Glasses specification: EEG (electroencephalogram), EOG (electro-oculogram), bone-conduction audio. Signal pipeline. Physical requirements (mass, battery life, temperature, noise, Bluetooth). Pilot study protocol. Applicable standards (NASA-STD-3001 Vol. 2, JSC-20793). Precedents: AttentivU (MIT), Dreem on the ISS (2021 and 2023), Sleep in Orbit (2023).

### docs/10-mass-energy-launch.md
Numbers for the feasibility slide: mass of the Orbit glasses estimated at less than 50 g (reference: Shokz OpenRun Pro 29 g). Launch cost: about USD 3,000 to USD 10,000 per kilogram on Dragon. App consumption on the ISS laptop: estimated at less than 5 W.

### docs/11-precedents.md
Existing systems the team must know: CMO-DA (NASA + Google, proof of concept 2025), WinSCAT (cognition, Expedition 1 until 2025), ISS FIT (diet, iPad, 2016), Dreem on the ISS, AttentivU (parabolic flight 2022), EEG on Skylab (1973). Defensible differentiators of Orbit Health: integration of body and environment on one screen, offline, personal baseline, alert explained with evidence and source, mutual care with granular consent. Phrases the team must NOT use (see section 7 of the file).

### docs/12-open-data-sources.md
Public APIs and files for the prototype:
- NOAA SWPC: GOES proton flux (public JSON/text, working URL confirmed).
- DONKI (CCMC/NASA): space weather events; the old API at api.nasa.gov returned 404; use the CCMC endpoint.
- OSDR (NASA): historical ISS environment and radiation data (EDA and RadLab).
- ISS Live (Lightstreamer): part of the ECLSS telemetry; no official dictionary.
- LSDA/LSAH: open catalog; individual data by formal request.
Fields, formats, licenses and tested responses for each source.

### docs/13-glossary.md
Domain acronyms: SANS, RIDGE, HRR, CMO, EVA, ECLSS, MCA, CAD, SRAG, EWMA, PVT, HRV, ISS FIT, EIMO, CHeCS, HERA, etc.

### docs/14-answered-questions.md
13 team questions answered with verified sources. Table of corrections to documento-inicial.md (8 inaccuracies corrected, including: Astroskin only estimates systolic pressure; Tempus PRO not confirmed on the ISS; radiation dose in 6 months is 50 to 100 mSv, not 80 to 160 mSv; body data arrives per session, not in real time).

### docs/16-next-steps-and-impact.md
Artemis II (launch Apr 1, 2026, splashdown Apr 10, 2026, 9 days). Artemis III is a low Earth orbit demonstration (2027); lunar landing on Artemis IV (2028). Gateway (lunar orbit, intermittent occupation). Mars: 4 to 24 minutes per leg, solar conjunction of 13 days to 3 weeks, EIMO (Earth Independent Medical Operations). Path to fly on the ISS (there is no single entry point; estimated timeline of 3 to 6 years). Applications on Earth (Amazon, indigenous territories, offshore, submarines). Regulation (Anvisa, LGPD). Ready-made paragraphs for slides.

### pesquisa/bruto/ (19 files)
Primary research with verified citations. Files 01 to 19 cover: ECLSS/environment/radiation, medical equipment, risks/thresholds, precedents/glasses/sleep, mass/computing/launch, open data/software/flow, official challenge/standards/interface, implementable self-assessments, simulated profiles and data, guidance and countermeasures, real samples, onboard medical AI, glasses signal pipeline, audio and sound library, Artemis and Mars, path to flying, applications on Earth and impact, cross-check.

### prototipo/config/indicadores.json
35 indicators with `id`, `nome`, `unidade`, `regiaoCorpo`, `classe`, `regraCor` (only for indicators with a source), `fonte`. 6 cross-reference rules. Single source of truth for thresholds in the code.

### prototipo/config/perfis-simulacao.rascunho.json
4 fictional crew members with baseline, 180-day script and the 5 demo scenarios (C1 to C5) with timestamps and values that trigger each rule.

### prototipo/dados/amostras-reais/
Recorded files: NOAA proton flux, DONKI events, environment telemetry. Used as an offline fallback when the live feed is unavailable.

---

## 2. Thresholds with a source (may use a fixed-threshold color in the JSON)

| Indicator                        | Green                           | Yellow                              | Red                           | Source                    |
| -------------------------------- | ------------------------------- | ----------------------------------- | ----------------------------- | ------------------------- |
| ppCO2 in the module              | 1h mean <= 3.0 mmHg             | 3.1 to 5.2 mmHg                     | > 5.3 mmHg                    | NASA V2 6004 Tab. 6.4.5-2 |
| Bone density (hip/spine)         | >= 95% of baseline              | 90 to 94%                           | < 90%                         | NASA V1 4027              |
| Bone density (femoral neck)      | >= 90% of baseline              | 85 to 89%                           | < 85%                         | NASA V1 4027              |
| Muscle strength                  | >= 80% of baseline              | 70 to 79%                           | < 70%                         | NASA V1 4024              |
| VO2max (women)                   | >= 32.9 mL/kg/min and >= 80% baseline | 80 to 99% of baseline or below the cutoff | < 80% of baseline       | NASA V1 4001 to 4003      |
| VO2max (men)                     | >= 36.5 mL/kg/min and >= 80% baseline | same                          | same                          | NASA V1 4001 to 4003      |
| Accumulated career dose          | < 300 mSv (< 50%)               | 300 to 480 mSv (50 to 80%)          | >= 480 mSv (> 80% of 600 mSv) | OCHMO-STD-100.1A          |
| 30-day dose (marrow)             | < 0.125 Gy-eq (< 50%)           | 0.125 to 0.20 Gy-eq                 | >= 0.20 Gy-eq                 | OCHMO-STD-100.1A          |
| GOES proton flux (>= 10 MeV)     | < 10 pfu                        | 10 to 99 pfu (S1)                   | >= 100 pfu (S2+)              | NOAA SWPC S scale         |

**Thresholds WITHOUT a NASA source (personal baseline only, no fixed-threshold color):**
Resting HR, blood pressure, SpO2, body temperature, glycemia, complete blood count, hours of sleep, mood, HRV, cognition.

---

## 3. Identified conflicts

### C-01: Interface language
- `prompt-claude.md`: interface in English (presentation for NASA).
- `AGENTS.md` (writing rule): interface in Brazilian Portuguese, with an English dictionary in `src/i18n/`.
- **Technical suggestion:** use i18n architecture from the start; set the default language to English for the demo, but keep the strings in PT-BR in the dictionary. Final decision with the owner.

### C-02: Pulse/blink animations
- `prompt-claude.md`: yellow dots pulse slowly; red ones pulse fast with a radar effect.
- `AGENTS.md` (rule 10): nothing blinks, nothing emits sound; red and blinking are reserved for the ISS C&W system.
- **Technical suggestion:** replace the pulse with a static visual indicator (thicker colored border, alert icon) that does not imitate the station alarm. Final decision with the owner.

### C-03: Supabase backend
- `prompt-claude.md`: mentions Supabase as the backend (coming from the Lovable project).
- `AGENTS.md` (rule 4): 100% offline, no remote database; IndexedDB via Dexie.js.
- **Technical suggestion:** remove Supabase; there is no app code yet in `prototipo/app/`, so there is no migration. Final decision with the owner.

### C-04: Color levels (4 vs. 5)
- `prompt-claude.md`: 4 levels (green, yellow, red, gray).
- `docs/05` and `docs/07`: 5 levels (0=gray, 1=green, 2=yellow, 3=red, 4=static red "Contact CMO now").
- **Technical suggestion:** use the 5 levels (documents win); level 4 rarely appears and does not complicate the demo.

### C-05: Project name
- `prompt-claude.md`: "Órbita".
- `AGENTS.md` and all `docs/`: "Orbit Health".
- **Technical suggestion:** "Orbit Health" is the name used in all the research material; keep it.

### C-06: Vital sign thresholds without a NASA source
- `prompt-claude.md`: brings specific thresholds for HR (50 to 90 bpm green), pressure (< 130/85 green), temperature (36.0 to 37.4 green), glycemia (70 to 99 green), SpO2 (>= 95% green).
- `docs/03`: these indicators are class `referencia_terrestre`; no threshold with a published NASA source.
- Domain rule 1: without a source, the indicator appears only with trend and personal baseline, never with a fixed-threshold color.
- **Technical suggestion:** use z-score and trend for these indicators; show "no mission threshold; comparing with your baseline" in T4. But accept the `referencia_terrestre` marking if the owner prefers to have color (explicitly marked as unofficial).

### C-07: Demo scope (7 screens vs. compressed plan)
- `prompt-claude.md`: 7-minute script with T1, T1b, T2, T3, T4, T5, T6.
- `docs/08` (compressed plan): T1b, T6, gamification and interactive Amsler fall out of scope.
- **Technical suggestion:** follow the compressed plan as a reference; T1b and T6 only enter if time is left over.

---

## 4. Gaps in the NASA questions not yet fully answered

The 5 NASA questions (section 1 of `prompt-claude.md`) are answered at a high level in the documents. The gaps below are about implementation, not research:

| NASA question | Status |
| --- | --- |
| 1. What measurements can be performed in space? | Documented in docs/02 and docs/06 (`Leitura` origins). |
| 2. Why is an exam necessary? | Documented in docs/01 (HRR and RIDGE risks). |
| 3. How do the risks affect the indicators? | Documented in docs/03 (thresholds and sources). |
| 4. When does a result warrant attention? | Implemented in docs/04 (z-score, EWMA, cross-reference rules). |
| 5. What actions prevent a critical condition? | Partially in docs/10 (guidance and countermeasures); not yet implemented in the engine. |

**Main implementation gap:** the per-indicator guidance (field `oqueFazer` in the alerts) is not yet mapped for all 35 indicators in `indicadores.json`.

---

## 5. Current state of the code

| Folder/File | Status |
| --- | --- |
| `prototipo/config/indicadores.json` | Exists; content not verified line by line in this session |
| `prototipo/config/perfis-simulacao.rascunho.json` | Exists |
| `prototipo/dados/amostras-reais/` | Folder exists; content not verified |
| `prototipo/app/` | DOES NOT EXIST yet; the app has not been started |
| `docs/15-*.md` | Not found; docs skips from 14 to 16 |

The app needs to be created from scratch. There is no React, TypeScript or Tailwind code in the repository.

---

## 6. Proposed implementation order (awaiting approval)

### P0: Essential base for the demo

1. **Create the React + Vite + TypeScript + Tailwind app** in `prototipo/app/` with the navigation skeleton and color tokens.
2. **Domain types in TypeScript** in `src/domain/` mirroring docs/06 (`Leitura`, `Alerta`, `Tripulante`, `Indicador`, `LinhaDeBase`).
3. **Rules engine** reading `config/indicadores.json`; classify each `Leitura` into level 0 to 4.
4. **Simulated data generator** with 4 crew members and the 5 demo scenarios, including a complete C1.
5. **T1 Crew overview monitor** with crew member cards, colors coming from the engine, environment strip, data age.
6. **T2 Human figure** with clickable SVG and details panel with indicators and z-score.
7. **T4 Alert detail** with evidence (value, unit, state), rule id, source and what to do.
8. **Personal baseline and z-score** in `src/engine/` with tests using the examples from docs/04.
9. **Scenario C1 end to end**: CO2 rises, EWMA crosses the threshold, headache reported, R-CO2-01 triggers Level 2.

### P1: Strong demo

10. **T3 Daily check-in** with scales, chips and a 3-minute PVT (timed sequential clicks).
11. **T5 Environment and radiation** with module map and recorded NOAA proton file (scenario C2).
12. **Cross-reference rules** R-CO2-01, R-RAD-01, R-SANS-01 implemented as pure functions in `src/engine/cruzamentos/`.
13. **Scenarios C2 and C3** triggering the correct alerts.
14. **T6 Sleep and Orbit glasses** with precomputed hypnogram and night mode (amber mode).
15. **Sharing configuration** per crew member (what each colleague sees in T1).

### P2: If time is left

16. Live mode: real NOAA proton feed.
17. Interactive Amsler grid.
18. Gamification: check-in streak, daily mission.
19. T7 Trends.
20. T1b Overview monitor in matrix mode.
