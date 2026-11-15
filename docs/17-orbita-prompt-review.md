# 17. ORBITA prompt review: connecting features and research

> For whom: the development team and whoever will run the code in Lovable.
> What it is: a section-by-section analysis of the prompt "ORBITA: Intelligent Astronaut Health Monitoring System" ("Development Prompt" tab of the Fundação Futuro document, read on 11/15/2026 at 10:35), compared with the research and documentation in this repository.
> Result: what to keep, what to fix and why. The design of each screen is in [`18-orbita-responsive-design.md`](18-orbita-responsive-design.md) and the drawings in [`wireframes/orbita-responsive.html`](wireframes/orbita-responsive.html). The corrected prompt, ready to paste into Lovable, is in [`19-revised-lovable-prompt.md`](19-revised-lovable-prompt.md).

---

## 1. Summary

**The prompt is very well thought out and already gets right the essentials that the research recommends:** individual baseline, marked simulated data, color code with text and icon, configurable criteria that do not pretend to be NASA limits, offline AI with no diagnosis and no medication, gamification that rewards action and not outcome, educational body map and official Human Research Program sources. The structure, the name **ORBITA** and the visual identity stay as they are.

**Eight corrections are needed for ORBITA to be consistent with the research and with the official challenge:**

| # | Correction | Why |
| --- | --- | --- |
| 1 | Include the indicators the challenge itself cites: **blood pressure, glucose (mg/dL), temperature, hours of sleep and mood** | The official Space Apps 2026 text gives these examples; today the prompt asks for none of them in the daily assessment (stream 7) |
| 2 | Add a **Module environment** card (CO2, O2, pressure, space weather) | Cross-referencing body plus environment is the project's main differentiator and already has recorded real data from the ISS and NOAA (streams 1, 3, 11; `docs/04`, rule R-CO2-01) |
| 3 | Add the **Crew** screen (general monitor with consent) | Explicit request from the project owner on 11/15; it is designed in `docs/07` (T1) |
| 4 | Fix the **dosimetry**: 0.42 mSv is not the accumulated dose of 45 days | On the ISS the typical dose is about 0.28 to 0.56 mSv per day (50 to 100 mSv in 6 months, stream 1). 0.42 mSv is the dose of **one day**; over 45 days the accumulated total is close to 19 mSv |
| 5 | Map **orange** to our level 3 and keep the NASA alarm rules: nothing blinks, nothing sounds, labels with "Health:" | Red, blinking and sound belong to the ISS Caution and Warning system (stream 7, NASA-STD-3001 Vol 2 Rev F) |
| 6 | Use the **validated scales** already chosen: fatigue from 1 to 7 (Samn-Perelli), mood from 1 to 5 | They are the scales of `indicadores.json` and of the readiness index (`docs/04`, A12); the 0 to 10 scale has no validation or source (stream 8) |
| 7 | **Blood count** with real states: collection scheduled, sample collected, result available | Blood in orbit is frozen and analyzed on Earth; the result arrives later (stream 2, `docs/06`, field `disponibilidade`) |
| 8 | Add the **quick tests** for vision (Amsler and near acuity) and reaction (3-minute PVT) | They are how the astronaut tracks SANS and fatigue alone; the PVT is the paradigm of the test used on the ISS (streams 3 and 8, rules R-SANS-01 and R-SONO-01) |

**One decision for the team:** the demonstration mission is called **MARS-01**, but all the real data we have (telemetry, modules, radiation, South Atlantic Anomaly passes) is from the **ISS**. We recommend calling the demonstration mission **ISS EXP-01** and showing Mars on the "Designed for Mars" slide (`docs/16`). If the team prefers to keep MARS-01, the daily dose becomes about 1.8 mSv per day (transit) and the environment panel stops citing ISS modules.

---

## 2. Section-by-section analysis

Legend: ✅ keep · 🔧 adjust · ➕ add.

### Section 1. Visual identity

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| ORBITA name and subtitle | ✅ | The app is now called ORBITA and the glasses remain Orbit; the documents use "ORBITA" from here on |
| Navy blue and cyan palette | ✅ | Consistent with the dark theme of `docs/07` (low light before sleep). Cyan `#21C5EF` becomes the accent color |
| State colors (green, yellow, orange, red) | 🔧 | Add the exact values and the gray. Orange = level 3 (CMO and flight surgeon), red = level 4 (only by alarm symptom). Tokens in `docs/18` |
| Dark interface, cards, cyan in moderation | ✅ | Same as the design in `docs/07` |
| Smooth animations | 🔧 | Allowed in navigation and on opening; **forbidden in alerts** (nothing blinks, stream 7). Respect the system preference for reduced motion |
| Smartphone only, 6 to 6.8 inches | 🔧 | **Owner's decision (11/15, 11:00): responsive web app**, designed first for the phone and working on tablet and laptop (the ISS crew uses iPads and laptops, stream 7). The **Overview** gets its own layout for **large screens** (the station's shared monitor and the presentation big screen), with environment, crew and alerts in the same frame. Breakpoints and navigation in `docs/18` |

### Section 2. Registration

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Name, sex, weight, height, notes | ✅ | Sex also selects the hemoglobin reference range, which differs by sex (stream 9) |
| Personal notes (pre-existing conditions) | 🔧 | This is sensitive medical data: store only on the device, mark as private and never show on the Crew screen (NASA-STD-3001 Vol 1, V1 7003) |
| Mission data | ➕ | Add mission name and start date (the app computes the mission day, FD) and scheduled sleep time in GMT (ISS reference: 21:30 to 06:00) |
| Sharing with the crew | ➕ | One simple question: what colleagues can see (state per system; values; mood). Conservative default, demonstration with everything shared (`docs/07`, T1) |
| "Weight" | 🔧 | Write "body mass (kg)"; in space you measure mass, not weight (stream 5) |

### Section 3. Startup animation

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Cyan circle running along the icon's orbit, dissolve and transition | ✅ | Great for the identity |
| Duration | 🔧 | At most 2.5 s, with tap to skip; after first access, a 1 s version |
| Icon file | ➕ | The official icon must be in the repository as SVG (`prototipo/marca/orbita-icone.svg`) so the animation follows the real geometry; it has not been sent yet |

### Section 4. Dashboard

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Header with astronaut, mission and day | ✅ | Add GMT time (official ISS time) and the "simulated data" badge |
| Heart rate compared with the individual standard | ✅ | It is exactly the baseline z-score (`docs/04`, A3). With 86 bpm and a baseline of 64 bpm, the card turns yellow by personal deviation, even though it is within the terrestrial reference of 60 to 100 bpm. **It is the best demonstration of the concept** |
| Dosimetry | 🔧 | Show the day's rate and the mission accumulated against the career limit of 600 mSv (NASA-STD-3001 Vol 1, V1 4030). Fix the value (see summary, item 4) |
| Oximetry | ✅ | Terrestrial reference of 95 to 100%, with the label "terrestrial reference, not a flight limit"; at or below 92% calls the CMO (`indicadores.json`) |
| Eye attention (EOG) | 🔧 | Correct not to call it a diagnosis. Indicate the origin: **Orbit glasses (proposed)**, simulated data. Color only by deviation from the baseline, never by threshold. **EOG does not detect SANS** (stream 4) |
| Module environment | ➕ | Compact card with CO2 (mmHg), O2 and pressure, and space weather (GOES protons). Recorded real data available (`prototipo/dados/amostras-reais/`) |
| Daily personal assessment (hydration, fatigue, appetite) | 🔧 | Keep and add **sleep (hours)** and **mood**. Fatigue from 1 to 7, mood from 1 to 5. Hydration in liters on screen, milliliters in the data |
| Manual vital signs | ➕ | Blood pressure, glucose and temperature as an optional record ("when measured with the kit"), because they are examples from the official challenge |
| Blood count every 15 days | 🔧 | See summary, item 7. Configurable periodicity (default 15 days); the reference range comes from the laboratory report; never automatic red |
| Persistent records, most recent first | ✅ | Same as the data model (`docs/06`) |

### Section 5. 3D body map

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Model by sex, technological, with clickable regions | ✅ | Heart of the proposal, requested in the challenge itself |
| 10 regions | 🔧 | Add **kidneys and hydration** (kidney stones, linked to bone loss) and **ears** (station noise). Keep vestibular, which we did not have and is good. Final list of 12 regions in `docs/18` |
| Panel with risks, explanation and indicators | 🔧 | Also show the **current state** of each related indicator (the region takes the color of its worst indicator, `docs/07`) and the risk link in the Human Research Program |
| 3D model with Three.js | 🔧 | Risky within today's deadline. Start with a high-quality SVG figure (front and back, cyan glow) and switch to 3D only if time remains, as the prompt itself allows |
| "Educational, does not detect everything" | ✅ | Consistent with the research |

### Section 6. Color code

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Green, yellow, orange, red, gray with text and icon | ✅ | Mapping: gray = level 0, green = 1, yellow = 2, orange = 3, red = 4 |
| Configurable criteria, not presented as NASA limits without a reference | ✅ | It is the class policy of `docs/03` (official requirement, terrestrial reference, baseline, symptom) |
| "Critical" red | 🔧 | Only by a reported alarm symptom (`docs/06`: `gatilhosSintoma` is the only path to level 4); an exceeded official requirement is orange (level 3); never red from an isolated vital-sign number. Labels with "Health:" so it does not look like the station's alarm |

### Section 7. Side menu

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Drawer opened by the ORBITA icon | 🔧 | Keep, but add a visible menu icon next to the logo (discoverable) and a bottom bar with 4 shortcuts (Home, Map, Assess, AI) |
| Menu items | ➕ | Add **Crew** and **Sleep and Orbit glasses**; Notifications stays on the header bell |
| Connectivity status | ✅ | Show "Offline: working locally" and "Ground communication" (see `docs/12`, station and ground flow) |

### Section 8. Offline ORBITA AI

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Local assistant, no API key, no diagnosis, with sources | ✅ | It is what stream 13 recommends. The NASA precedent (CMO assistant, 2025) runs in the cloud; offline ORBITA is a differentiator |
| Knowledge base | ➕ | Use the content already researched: `docs/01`, `docs/03`, `docs/14` and the guidance from stream 10. The base ready for the prototype is in `prototipo/config/orbita-ia-base.json` |
| "How is my health today?" | 🔧 | The answer reads the engine's current states and cites the rule and source; it never invents |

### Section 9. Reports

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Charts for 8 indicators, periods of 7, 15, 30 days and mission, table | ✅ | Same as T7 in `docs/07` |
| Bands on the chart | ➕ | Show the personal baseline band and, when there is one, the band with a source; mark events (for example a solar event) |
| Recharts | ✅ | Replaces the previously suggested ECharts; no problem |

### Section 10. Mission routine

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Daily and periodic tasks, progress | ✅ | Consistent with the check-in in `docs/07` (T3) |
| Schedules | 🔧 | In GMT, respecting the ISS routine (wake around 06:00, sleep around 21:30); no reminders during the sleep period or critical activities (stream 4) |
| Tasks | ➕ | Add weekly vision test and PVT; blood count with collection state |

### Section 11. Gamification

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| XP, levels, achievements, streaks; points for action and never for outcome | ✅ | Excellent and aligned with `docs/07` |
| Crew goals | ➕ | One cooperative goal (for example, the whole crew logged hydration today), no ranking among colleagues |
| Link to the glasses | ➕ | Achievements unlock sounds from the cultural profile on the Orbit glasses |

### Section 12. Space risks

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| 5 hazards and specific risks with NASA links | ✅ | Same as `docs/01`. The URLs in section 15 are official Human Research Program pages |
| Relate to body region | ✅ | Use the region table in `docs/18` |

### Section 13. Notifications

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Alerts with color and destination | ✅ | |
| Sound and vibration | 🔧 | No sound and no blinking for a health alert (stream 7); routine reminders in gray or cyan, not in the state colors |
| Explainable alert | ➕ | Tapping an alert opens the detail: why, what to do, rule source (`docs/07`, T4) |

### Section 14. Demonstration data

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Fictional profile, baseline, "Restore initial data" button | ✅ | Great for the judges |
| Values | 🔧 | See the table in section 4 of this document |
| Demonstration story | ➕ | Tie the data to a scenario: heart rate above the standard, high fatigue and short sleep, with module CO2 at 2.95 mmHg. The app shows the alert "Possible effect of elevated CO2" (scenario C1 in `docs/05`) |

### Section 15. Official sources

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Human Research Program links | ✅ | |
| Threshold standards | ➕ | Add NASA-STD-3001 Vol 1 and Vol 2 and the SANS brief (OCHMO), which are the source of the numbers (`docs/03`, `docs/15`) |

### Sections 16 to 19. Rules, navigation, technical and result

| Item | Assessment | Adjustment and basis |
| --- | --- | --- |
| Distinguish simulated, manual, equipment and exam | ✅ | Same as rule 11 of `AGENTS.md` (field `origem`) |
| Local storage, nothing decorative, no fake connection | ✅ | |
| React, TypeScript, Tailwind, Lucide, Recharts | ✅ | Same as the stack in `docs/05` |
| Three.js | 🔧 | Optional; see section 5 |
| Deadline | 🔧 | Submission closes today at 23:59. The recommended build order is in `docs/19` |

---

## 3. The two connected journeys

Each prompt feature, linked to what the research delivers.

| ORBITA feature | Document | Data (`indicadorId`) | Color rule | Source of the number |
| --- | --- | --- | --- | --- |
| Heart rate | `docs/03`, `docs/04` A3 | `fc_repouso` | Baseline (z-score) and terrestrial reference | MedlinePlus [EARTH-GUIDELINE] |
| Dosimetry | `docs/03`, `docs/14` | `taxa_dose_radiacao`, `dose_acumulada` | Official requirement (career below 600 mSv) | NASA-STD-3001 Vol 1, V1 4030 |
| Oximetry | `docs/03` | `spo2` | Terrestrial reference; 92% calls the CMO | MedlinePlus [EARTH-GUIDELINE] |
| Eye attention (EOG) | `docs/09`, stream 14 | `eog_piscadas` (new) | Baseline only | Experimental, no threshold |
| Module environment | `docs/02`, `docs/12` | `ppco2_modulo`, `pio2_cabine`, `pressao_cabine`, `fluxo_protons_goes` | Official requirement | NASA-STD-3001 Vol 2 Rev F; NOAA |
| Hydration | `docs/04` R-HID-01 | `agua_ingerida` | Baseline; demonstration value 1.2 L | [INFERENCE] marked |
| Fatigue | `docs/03`, stream 8 | `fadiga` (1 to 7) | Baseline | Samn-Perelli |
| Appetite | stream 8, stream 10 | `apetite` (new) | Baseline | No threshold |
| Sleep | `docs/04` A8 | `sono_tst` | Baseline; 8.5 h scheduled | NASA-STD-3001 Vol 1 |
| Mood | `docs/03` | `humor` (1 to 5) | Baseline | Authorial |
| Pressure, glucose, temperature | `docs/03` | `pa_sistolica`, `pa_diastolica`, `glicose`, `temperatura_corporal` | Terrestrial reference | MedlinePlus, ADA [EARTH-GUIDELINE] |
| Blood count | `docs/02` section 4.5 | `hemoglobina` and others from the report | Reference range from the report itself; never automatic red | Laboratory |
| Vision tests | `docs/04` R-SANS-01 | `acuidade_perto`, `amsler_distorcao` | Two worse tests within 14 days | OCHMO-MTB-001 |
| PVT | `docs/04` A10 | `pvt_tempo_reacao`, `pvt_lapsos` | Baseline | Stream 8 |
| Body map | `docs/07` T2, `docs/01` | All, by `regiaoCorpo` | Worst state of the region | `docs/03` |
| ORBITA AI | `docs/14`, stream 10, stream 13 | Engine states | Does not decide color | Local base with sources |
| Crew | `docs/07` T1 | States with consent | Same as the cards | `docs/06` (sharing) |
| Sleep and Orbit glasses | `docs/09`, streams 14 and 15 | `SessaoSono` | Baseline | Sleep-EDF (demonstration) |

The two new indicators (`apetite` and `eog_piscadas`) enter `docs/03` and `indicadores.json` as baseline only, with no numeric threshold, following rule 1 of `AGENTS.md`.

---

## 4. Revised demonstration values

| Data | Original prompt | Revised | Why |
| --- | --- | --- | --- |
| Mission | MARS-01, day 45 | ISS EXP-01, day 45 (recommended) | Consistency with real ISS data |
| Heart rate | 86 bpm, baseline 64 | Same | Demonstrates personal deviation (yellow) |
| Dosimetry | 0.42 mSv | 0.42 mSv/day today; 18.9 mSv accumulated; 3.2% of the career limit | 0.42 mSv is a typical ISS daily dose |
| Oximetry | 97% | Same | Green |
| EOG | 12.4 per minute | Same, labeled "Orbit glasses, simulated" | |
| Hydration | 1.8 L | Same | Green |
| Fatigue | 8/10, baseline 2/10 | 6 of 7, baseline 2 of 7 | Samn-Perelli scale |
| Appetite | Reduced | Same | |
| Sleep | Baseline 7.5 h | Last night 5.4 h, baseline 7.5 h | Shows sleep debt (yellow) |
| Mood | Baseline 8/10 | 3 of 5, baseline 4 of 5 | Scale from `indicadores.json` |
| Module CO2 | Absent | 2.95 mmHg in Node 3 | Triggers R-CO2-01 together with the difficulty concentrating reported 40 minutes ago (the rule requires a symptom or a worse PVT); heart rate and fatigue enter as context for the alert |
| Module O2 | Absent | PIO2 of 141.3 mmHg (18.84 kPa) in Node 3, computed from the real ppO2 of 150.67 mmHg and the total pressure of 757.64 mmHg | Yellow: outside the normoxia target of 145 to 155 mmHg and well above the exposure limits; real data, shows the conversion of ppO2 to PIO2 (`docs/04`, A1) |
| Blood count | 7 days ago | Collection 7 days ago, "sample collected, analysis on Earth"; previous result of 14.8 g/dL hemoglobin | Real states |

With these values, the home screen shows three yellows on the body (heart rate, fatigue, sleep), one explainable CO2 alert, the Node 3 O2 in yellow on the environment card and everything else green (with gray where there is no in-flight measurement). It is a clear story for the judges.

---

## 5. Screen inventory

Codes used in `docs/18`, in the drawings and in `docs/19`.

| Code | Screen | Origin | Priority today |
| --- | --- | --- | --- |
| M01 | Registration | Prompt section 2, adjusted | P0 |
| M02 | Orbital startup | Prompt section 3 | P0 |
| M03 | Overview (dashboard): personal panel on the phone and mission panel on large screens | Prompt section 4, adjusted; large screen by owner's decision | P0 |
| M04 | Health assessment (daily, vital signs, tests) | Prompt section 4B, expanded | P0 |
| M05 | Body map | Prompt section 5 | P0 |
| M06 | Region panel (bottom sheet) | Prompt section 5 | P0 |
| M07 | Indicator and alert detail | `docs/07` T4 | P0 |
| M08 | Laboratory exams (blood count) | Prompt section 4B, adjusted | P1 |
| M09 | ORBITA AI | Prompt section 8 | P1 |
| M10 | Reports | Prompt section 9 | P1 |
| M11 | Mission routine | Prompt section 10 | P1 |
| M12 | Mission: Health on Track (gamification) | Prompt section 11 | P2 |
| M13 | Space risks | Prompt section 12 | P1 |
| M14 | Notifications | Prompt section 13 | P1 |
| M15 | Profile and privacy | Prompt section 7, item 9 | P1 |
| M16 | Crew (general monitor): list on the phone, crew board inside the Overview on large screens | Owner's request, `docs/07` T1 | P1 (the large-screen board is P0, together with M03) |
| M17 | Sleep and Orbit glasses | `docs/07` T6, `docs/09` | P2 |
| M18 | Side menu | Prompt section 7 | P0 |

---

## 6. Decisions for the team

| Decision | Recommendation |
| --- | --- |
| Name of the demonstration mission | ISS EXP-01 (consistent real data); Mars on the slide |
| 3D or SVG body map | High-quality SVG first; 3D if time remains |
| App format | **Decided by the owner on 11/15:** responsive (phone, tablet and laptop), with the Overview also in a large-screen layout (1920 x 1080) for the shared monitor and the presentation big screen |
| ORBITA icon file | Send the official SVG to the repository (`prototipo/marca/`) before starting the animation |
