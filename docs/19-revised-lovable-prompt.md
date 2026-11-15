# 19. Revised ORBITA prompt for Lovable

> Audience: whoever will paste the prompt into Lovable, and the development team.
> What it is: the team's prompt (the "Development Prompt" tab of the Future Foundation document, read on 15/11/2026 at 10:35; copy in [`../pesquisa/prompt-orbita-equipe.md`](../pesquisa/prompt-orbita-equipe.md)) with the eight corrections from [`17-orbita-prompt-review.md`](17-orbita-prompt-review.md) applied inside each section. The 19-section structure, the tone and the ORBITA name are the team's.
> Design: the layout of each screen, at the four screen sizes, is in [`18-orbita-responsive-design.md`](18-orbita-responsive-design.md) and the drawings are in [`wireframes/orbita-responsive.html`](wireframes/orbita-responsive.html). Owner's decision on 15/11: ORBITA is a responsive web app (phone, tablet, laptop and large screen), and the Overview also opens on a shared monitor and on the presentation big screen.
> Where the numbers are: ranges, units and color rules come from [`../prototipo/config/indicadores.json`](../prototipo/config/indicadores.json) and from [`03-indicators-and-thresholds.md`](03-indicators-and-thresholds.md); cross-referencing rules, from [`04-data-cross-referencing.md`](04-data-cross-referencing.md); scales, from [`../pesquisa/bruto/08-autoavaliacoes-implementaveis.md`](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md); guidance, from [`../pesquisa/bruto/10-orientacoes-contramedidas.md`](../pesquisa/bruto/10-orientacoes-contramedidas.md).

---

## Before pasting: quick guide

### 1. How to paste

The prompt is long. If Lovable rejects the whole message, paste it in five parts, in this order, and wait for each part to finish before the next. Start each new part with the sentence: "Continue the same ORBITA project; do not redo what already exists and keep the data contract from section 6."

| Part | What to paste | Why |
| --- | --- | --- |
| 1. Identity and navigation | Prompt opening and sections 1, 6, 7, 16, 17 and 18 | Tokens, color states, data contract, menu and general rules first; everything else depends on them |
| 2. Main screens | Sections 2, 3, 4, 13 and 14 | Sign-up, animation, overview (personal panel and mission panel on a large screen), assessment, alert detail and demo data |
| 3. Body map | Sections 5 and 12 | The 12 regions point to the space risks |
| 4. Lookup screens | Sections 8, 9, 10, 11 and 15 | ORBITA AI, reports, routine, gamification and sources |
| 5. Review | Section 19 | Final checklist |

### 2. Files to attach or paste

| Repository file | What for | Where to put it in the Lovable project |
| --- | --- | --- |
| `prototipo/config/indicadores.json` (37 indicators, 6 cross-referencing rules) | The only place for color numbers; the app reads from here | `public/config/indicadores.json` |
| `prototipo/config/orbita-ia-base.json` (65 entries) | Local ORBITA AI knowledge base, with sources | `public/config/orbita-ia-base.json` |
| `prototipo/config/perfis-simulacao.rascunho.json` | Demo profiles: fictional crew members, baselines and scenarios C1 to C5 | `public/config/perfis-simulacao.json` |
| `prototipo/dados/amostras-reais/` (optional) | Public ISS telemetry and NOAA data recorded on 15/11/2026, for the environment panel | `public/dados/amostras-reais/` |
| Official ORBITA icon in SVG | Animation and header | `public/marca/orbita-icone.svg` (not sent yet; see item 4) |

If Lovable does not accept attachments of this size, connect the project to GitHub and copy the files to `public/config/`. As a last resort, the "Data contract" table in section 6 already carries all the numbers used on the screens.

### 3. Build order (about 13 hours, until submission at 23:59)

P0, P1 and P2 priorities from [`17-orbita-prompt-review.md`](17-orbita-prompt-review.md), section 5.

| Phase | Time | Screens | Done when |
| --- | --- | --- | --- |
| Base | 1 h | Tokens, breakpoints (phone, tablet, laptop and large screen), M18 Side menu, bottom bar, local storage, JSON loading, color engine | The engine passes the `exemplosTeste` (test examples) from `indicadores.json` and the worked z-score example (3.24); navigation switches correctly at the four sizes |
| P0 | 6 h | M01 Sign-up, M02 Orbital startup, M03 Overview on phone, **M03 Overview on large screen (mission panel, 1920 by 1080, the big-screen view)**, M04 Health assessment, M05 Body map, M06 Region panel, M07 Indicator and alert detail | The demo shows three yellows and the alert "Possible effect of elevated CO2" (section 14) on the phone and on the mission panel, with no scrolling on the big screen |
| P1 | 3 h 30 | M08 Lab exams, M09 ORBITA AI, M10 Reports, M11 Mission routine, M13 Space risks, M14 Notifications, M15 Profile and privacy, M16 Crew as a list on the phone | Every menu entry opens a working screen, with no decorative button |
| P2 | 1 h 30 | M12 Mission: Health on Track, M17 Sleep and Orbit glasses | Simple, honest screens; whatever is missing gets an "under construction" notice outside the demo |
| Wrap-up | 1 h | "Restore initial data" button, demo rehearsal on the phone and on the big screen, recording and submission | The story in section 14 runs from start to finish in under 3 minutes, and the mission panel is legible from the back of the room |

### 4. Decisions already applied and open decisions

| Decision | What the prompt uses | If the team decides otherwise |
| --- | --- | --- |
| Mission name | ISS EXP-01, day 45 (recommendation of `docs/17`): all the real data we have comes from the ISS | With MARS-01, change the name, use about 1.8 mSv per day (transit) in dosimetry and remove the ISS module names from the environment panel |
| Body map | High-quality SVG figure first; 3D only if time remains | Nothing changes in the data contract |
| Format | Responsive web app, mobile first, with four breakpoints (phone, tablet, laptop and large screen); the Overview has a second layout, the mission panel, for a shared monitor and big screen (owner's decision on 15/11) | Nothing changes in the data contract |
| Icon | The official SVG is missing from `prototipo/marca/orbita-icone.svg` | Until it arrives, the app uses a provisional marker that is not treated as a logo |

---

## The prompt (copy from the line below)

---

# OFFICIAL PROMPT: ORBITA (version revised on 15/11/2026)

## Intelligent Astronaut Health Monitoring System

### NASA SPACE APPS CHALLENGE 2026

I want you to develop a responsive web app called **ORBITA**, intended for monitoring the health of astronauts during short- and long-duration space missions. It is designed phone-first and also works well on tablet, laptop and large screens (the station's shared monitor and the presentation big screen).

The project will be presented at the NASA Space Apps Challenge 2026 and aims to help astronauts track their physical and behavioral health, compare each indicator with their own pattern (individual baseline), cross-reference body data with the module environment, receive preventive guidance and know when to call the CMO (Crew Medical Officer, the crew member responsible for medical care on board) and the flight surgeon.

**IMPORTANT: follow the proposal in this document rigorously. Do not change the concept, do not invent features that deviate from the main idea and do not turn the application into a generic medical dashboard.**

I want an application with a technological, futuristic and space identity, but one that keeps a minimalist, organized and intuitive interface. The astronaut must be able to understand their health information quickly, without having to navigate overloaded screens.

Actually develop the prototype, with screens, interactions, navigation, animations and demonstration data. I do not want just a static image or an interface plan.

**The ranges, units and color rules in this prompt come from the `indicadores.json` file (attached) and are copied into section 6. Do not invent, round or change any of them.** Each screen has a code (M01 to M18) to make conversation easier.

---

# 1. ORBITA VISUAL IDENTITY

The name of the application will be:

**ORBITA**

Subtitle:

Health Monitoring System for Astronauts on Space Missions.

The app is called ORBITA. The glasses with bone-conduction audio, EEG and EOG, proposed by the same team, are called **Orbit glasses**; they appear in the app as a proposed data source, always with a simulated-data badge.

Use the official ORBITA icon that will be sent as a visual reference (file `orbita-icone.svg`).

**It is ESSENTIAL to preserve the icon's identity.** Do not redesign it, do not change its geometry and do not create another logo. Until the official SVG is in the project, use a simple provisional marker (central circle, elliptical ring and a small cyan circle), identified in the code as provisional, and replace it with the official SVG as soon as it arrives.

### Color palette

The whole interface must follow the colors of the icon. Define them as CSS variables and in `tailwind.config`:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#07111F` (deep navy blue) | Screen background |
| `--surface` | `#0B1B2B` (secondary navy blue) | Cards, menu and bars |
| `--primary` | `#21C5EF` (main cyan) | Highlight, main action, chart series |
| `--primary-2` | `#16A9C4` (turquoise blue) | Secondary highlight |
| `--text` | `#F4F8FC` (white) | Main text |
| `--muted` | `#91A4B8` (bluish gray) | Secondary text |
| `--border` | `#91A4B8` at 20% opacity | Discreet borders |

There are five state colors, always with an icon and a word (details and rules in section 6):

| Level | Color | Token and value | Icon (Lucide) | Label on screen |
| --- | --- | --- | --- | --- |
| 0 | Gray | `--estado-sem-dado` `#A3ADBA` | `CircleHelp` (?) | No data |
| 1 | Green | `--estado-normal` `#22C55E` | `CircleCheck` (✓) | Health: normal |
| 2 | Yellow | `--estado-atencao` `#F5B800` | `CircleAlert` (!) | Health: attention |
| 3 | Orange | `--estado-alerta` `#F97316` | `CircleX` (✕) | Health: alert, call CMO |
| 4 | Red | `--estado-critico` `#FF6B6B` | `OctagonX` | Health: critical, contact CMO now |

Use the state colors only on the corresponding indicators and notices. Routine reminders use gray or cyan, never the state colors.

### Visual style

The application must present:

- A predominantly dark interface (less light near bedtime).
- Rounded elements.
- Cards with discreet borders and a neutral surface; the state appears in the outline, the icon and the word, never as a colored background.
- Cyan lighting effects, used sparingly.
- Smooth, fluid animations in navigation and on opening. **On alerts and health states, no animation: nothing blinks, nothing pulses, nothing emits sound or vibration.** Respect the system preference for reduced motion (`prefers-reduced-motion`).
- Minimalist icons (Lucide).
- Modern charts.
- Technological and extremely legible typography: large numbers at 26 px with the smaller unit beside them, text at 14 px, labels of at least 12 px, minimum contrast of 6:1 between text and background.
- Transitions between pages.
- A very well defined visual hierarchy.

Do not use excess information, too many cards or exaggerated glow effects.

The goal is to convey the feeling of scientific software used on a real space mission.

### Format: responsive web app, mobile first

ORBITA is a responsive web app. Design for the phone first and adapt to the other sizes. The ISS crew uses iPads and laptops, and the Overview will also be opened on large screens: the station's shared monitor, a laptop connected to a projector and the presentation big screen.

| Size | Width | Navigation | Overview |
| --- | --- | --- | --- |
| Phone | 360 to 430 px (screens of about 6 to 6.8 inches) | Bottom bar with 4 shortcuts and menu opened by the logo (side drawer) | Astronaut's personal panel, in one column |
| Tablet | 768 to 1024 px | Fixed, collapsible side menu (icons only when collapsed) | Personal panel in two columns |
| Laptop | from 1280 px | Fixed, collapsible side menu | Personal panel in three columns, with the body map beside it |
| Large screen | from 1920 px (reference: 1920 by 1080) | Display mode, no menu | Mission panel for a shared monitor (section 4, layout 2) |

Between these ranges, the layout follows the nearest size, with no horizontal scrolling. Use `clamp()` on fonts so they grow with the screen.

---

# 2. FIRST ACCESS: SIGN-UP SCREEN (M01)

When opening the application for the first time, the astronaut must find a personal sign-up screen.

This step will be mandatory to start monitoring.

### Screen elements

At the top:

- ORBITA logo.
- Title: Astronaut Sign-up.
- Description: Create your profile to personalize the monitoring of your health during the mission.

### Required fields

1. Full name.
2. Sex: Male or Female. Defines the body model of the map and the hemoglobin reference range, which differs by sex.
3. Body mass (kg). Write "body mass", not "weight": in space you measure mass.
4. Height (cm).
5. Mission name (default: ISS EXP-01).
6. Mission start date. The app calculates the mission day (FD, Flight Day) from it.
7. Scheduled sleep time, in GMT (default: 21:30 to 06:00, the reference published by NASA for the ISS).

### Optional field

8. Personal notes (restrictions, preexisting conditions or relevant observations). This is sensitive medical data: keep it only on the device, show the "private" badge and never display it on the Crew screen or send it anywhere else.

### Sharing with the crew

A simple question, with three switches: "What can your crewmates see on the Crew screen?"

- State per system (color and icon, no numbers).
- Values (vital signs, sleep, hydration, radiation) and the module where I am.
- Mind and mood (state only).

Conservative default for a new crew member: state per system visible only to the CMO and the flight surgeon; values, module and mood set to "only me". The text explains the purpose, the effect and that consent can be revoked at any time in Profile and privacy. The demo profile shares everything with the crew.

### Button

**SAVE AND CONTINUE**

### Behavior

- All required fields must be validated (filled in, numeric where applicable, with the unit visible).
- The selected sex will determine the body model shown later.
- The profile must be stored locally.
- The information must remain saved when the application is closed and reopened.
- The sign-up must not appear again once completed, unless the user chooses to edit their profile.

The design must be clean, with well-distributed fields and no excess information.

---

# 3. ORBITA STARTUP ANIMATION (M02)

After the sign-up is filled in and confirmed, an exclusive startup screen must appear.

This screen is extremely important for the application's identity.

Use the official ORBITA icon sent as a reference.

### Desired animation

The icon must appear centered on a deep navy blue background.

The smaller blue circular element, located at the end of the orbital symbol, must complete a full 360-degree turn following precisely the elliptical ring that surrounds the central circle.

The animation must:

1. Show the icon initially static.
2. Make the small cyan circle travel the whole orbital path.
3. Complete a 360-degree turn.
4. Create a small glow effect during the movement.
5. Finish the orbit.
6. Make the whole icon dissolve smoothly, like particles or light fading away.
7. Reveal the main ORBITA screen through a smooth transition.

The animation must be elegant and fluid, without looking like a conventional loading animation.

**Do not change the structure of the original symbol.** The movement must respect the geometry of the icon sent.

Use CSS or SVG animations to ensure fluidity on the phone and on large screens.

Duration: at most 2.5 seconds, with a tap anywhere to skip. After the first access, use a short 1-second version. With `prefers-reduced-motion`, show only the static icon with a simple fade.

---

# 4. MAIN SCREEN: HEALTH OVERVIEW (M03)

After the animation, the astronaut will be directed to the central screen of the application.

This will be the most used screen during the mission.

The Overview has **two layouts**, with the same data and the same engine:

- **Layout 1, personal panel** (phone, tablet and laptop): the astronaut's own health. It is described in parts A to C below.
- **Layout 2, mission panel** (large screen, 1920 by 1080): the station and the whole crew on a shared monitor or on the presentation big screen. It is described at the end of this section.

Layout 2 opens automatically, with no menu, when the window is 1920 px wide or more. At any size, a **"Display mode"** switch in the header (and in the menu) opens the mission panel without a menu, for example on a laptop connected to the projector; the same switch returns to the personal panel.

## Layout 1: personal panel

### Header

At the top:

- Official ORBITA icon and the ORBITA name. On the phone, tapping the icon or the name opens the side menu (section 7) and, beside it, a visible menu icon (three lines) helps those who do not know the logo opens the menu. On tablet and laptop the menu is already fixed on the left.
- "Display mode" switch, which opens the mission panel (layout 2).
- Notification bell with a counter.
- Short identification of the astronaut. Example:

ASTRONAUT 001 · MISSION ISS EXP-01 · DAY 045

- Official ISS time in the format "GMT day of year / hh:mm" (example: GMT 319 / 08:20). All data is stored in UTC.
- Fixed "SIMULATED DATA" badge while there is demonstration data on the screen.

If there is an active alert, right below the header a strip appears with a neutral surface, an outline in the level color, an icon and text, for example "! Health: attention. Possible effect of elevated CO2 in Node 3". Tapping opens the alert detail (M07). The strip does not blink.

### A. Automatic monitoring

Create a top panel called:

**AUTOMATIC MONITORING**

Present four indicators in compact, visually organized cards. Each card shows: name, value with unit, mini chart of the last 7 days, state (color, icon and word), comparison with the individual pattern, data age ("updated 5 min ago") and origin badge. On the ISS body data is not continuous (it arrives per session, exam or sample), so the data age always appears; after the indicator's validity expires, the card turns gray.

**1. Heart rate** (`fc_repouso`)

- Value in bpm.
- Summarized history.
- Indicator state.
- Comparison with the individual pattern, for example "86 bpm today · your pattern: 64 bpm". This is the best example of the concept: 86 bpm is within the terrestrial reference of 60 to 100 bpm and is still yellow, because it is far above this person's normal.
- Small text: "terrestrial reference, not a flight limit".

**2. Radiation dosimetry** (`dose_acumulada`)

- Estimated effective dose of the day, in mSv (example: 0.42 mSv today), calculated as the daily difference of `dose_acumulada`. Never convert `taxa_dose_radiacao` (µGy/h, absorbed dose) directly into mSv: the conversion depends on the quality factor reported by the instrument (`docs/04`, A1 and A7).
- Mission total in mSv and a progress bar against NASA's career limit of 600 mSv (NASA-STD-3001 Vol. 1, requirement V1 4030). Example: 18.9 mSv, 3.2% of the limit.
- History.
- Tracking state.
- On the ISS the typical dose is close to 0.28 to 0.56 mSv per day (50 to 100 mSv in six months). Never convert gray to sievert on your own.

**3. Oximetry** (`spo2`)

- Oxygen saturation as a percentage.
- Last record.
- History.
- Indicator state.
- Small text: "terrestrial reference of 95 to 100%, not a flight limit".

**4. Eye attention (EOG)** (`eog_piscadas`)

- Blink rate per minute.
- Badge: "Orbit glasses (proposed) · simulated · experimental".
- Tracking state, decided **only** by the deviation from the personal baseline, never by a threshold.
- Fixed text: "Experimental drowsiness signal. It is not a diagnosis of inattention and does not detect SANS."

The values must initially be simulated and identified as demonstration data.

### A2. Module environment

Right below, a compact card called **MODULE ENVIRONMENT**, with the module where the astronaut is (example: Node 3):

- Module CO2 (`ppco2_modulo`), in mmHg, with a trend arrow.
- Module O2 (`pio2_cabine`), in kPa: it is the PIO2 calculated from ppO2 and total pressure (`docs/04`, A1), never the raw ppO2.
- Cabin pressure (`pressao_cabine`), in kPa.
- Space weather: protons from the GOES satellite (`fluxo_protons_goes`, in pfu) and the Kp index (`kp`).

Each value with state, data age and origin badge. The O2, pressure and space weather values in the demo are real, recorded from public ISS telemetry and from NOAA on 15/11/2026 ("real recorded" badge). A "live" switch, off by default, can fetch current data when a network is available; with no network, the app always uses the recorded file.

Small text in the card footer: "ORBITA does not command any equipment and does not replace the station alarm." Tapping the card opens the environment detail, with the chart of the last hours for each quantity.

### B. Personal assessment (M04)

Right below, create a section called:

**PERSONAL ASSESSMENT**

This section must gather all the data filled in manually by the astronaut. The records must always stay in the same place, allowing previous values to be consulted and the information to be updated. Each answer becomes a reading with origin "manual", UTC time and unit.

Organize the indicators in three blocks.

#### Daily assessment: last 24 hours (goal: 2 minutes)

**Sleep** (`sono_tst`)

- Hours of sleep last night (the screen shows hours; the data is stored in minutes).
- Comparison with the scheduled time and with the personal pattern; sleep debt of the last few days.

**Fatigue** (`fadiga`)

- Scale from 1 to 7, in seven positions (Samn-Perelli format), where a higher number means more tiredness.
- Selection by a control with seven large buttons. Do not reproduce the anchor texts of the original scale (license not confirmed); use only the numbers and the extremes "little tired" and "very tired".

**Mood** (`humor`)

- Original scale from 1 to 5, with five large buttons. Private by default.

**Hydration** (`agua_ingerida`)

- Amount of water drunk. The screen shows liters; the data is stored in milliliters.
- Shortcut buttons of +250 mL and the ability to edit the record.
- Urine color, optional, on the team's own scale from 1 to 8 (do not copy published charts).

**Appetite** (`apetite`)

- Normal (1).
- Reduced (2).
- Greatly reduced (3).

**Symptoms** (optional)

- Quick-tap list, with a "none" option. Each symptom is a separate item, never summed. Alarm symptoms lead to orange or red according to the "Symptoms that change the level" table in section 6.

These indicators must ask for an update every 24 hours.

After saving, show the recorded values directly in the Personal Assessment cards, with the date and GMT time of the last record and the private "Talk to the CMO" button.

#### Vital signs: when to measure with the kit

Optional record, because they are examples cited in the challenge's official text:

- Systolic and diastolic blood pressure (`pa_sistolica`, `pa_diastolica`), in mmHg, with the posture recorded.
- Glucose (`glicose`), in mg/dL, with the "fasting" mark (the color rule applies only to fasting).
- Body temperature (`temperatura_corporal`), in °C, oral.

#### Quick tests: weekly, if the flight surgeon approves

- **Vision test:** Amsler grid and near acuity (`amsler_distorcao`, `acuidade_perto`), one eye at a time, always with the same distance (35 to 40 cm), light and glasses. Use the team's original stimuli; do not copy the AAO grid or licensed charts. Record per eye the type of change and the area touched. Label: "screening test, not a diagnosis".
- **Reaction test, 3-minute PVT** (`pvt_tempo_reacao`, `pvt_lapsos`): the crew member taps the screen as soon as the stimulus appears, with a randomized interval of 1 to 4 seconds. Store the mean reaction time in ms, the lapses (responses of 355 ms or more and, separately, of 500 ms or more) and the false starts (taps without a stimulus). Measure time with `performance.now()`. None of these numbers is a clinical threshold.

The weekly frequency is a prototype proposal, not a NASA cadence; the screen says "subject to flight surgeon approval".

#### Periodic assessment: Lab exams (M08)

Create a **Lab exams** card that opens screen M08. In orbit, almost all blood is centrifuged, frozen and analyzed on Earth, and the result arrives days or months later. For this reason the blood count has three real states:

1. **Collection scheduled** (with the expected date).
2. **Sample collected, analysis on Earth** (with the collection date).
3. **Result available** (with the collection date and the date the result arrived).

The M08 screen must:

- Tell when the next collection is due. Configurable periodicity, default of 15 days.
- Allow recording the collection (changes to "sample collected") and then entering the result.
- Fields: hemoglobin (g/dL), hematocrit (%), leukocytes (cells/µL), platelets (unit from the report) and "other parameters" with name, value and unit.
- For each field, also store the reference range printed on the laboratory report.
- Store previous results and show the evolution of each parameter over time.

Color: only hemoglobin has a rule in `indicadores.json` (yellow outside the terrestrial range for the sex in the sign-up; never automatic red). Hematocrit, leukocytes and platelets show value, unit, trend and the report's own range, with no automatic color. Results must be interpreted by the medical team, with no automatic diagnoses.

After the record, the data must keep appearing in the same card, with the indication of the last collection, the current state and the next request.

### Record behavior

- Data must not disappear after being filled in.
- The most recent records must appear first.
- The astronaut can consult previous records.
- The daily assessment must restart its fill-in request every new 24-hour period.
- The blood count must have periodicity control (default 15 days) and the three states above.

### C. Indicator and alert detail (M07)

Tapping any card, region or notification opens the detail.

**Indicator detail:** value and unit, state (color, icon and word), chart with the personal baseline range and, when there is one, the sourced range, "Why it matters in space" (field `explicacao`), "What to do now" (field `orientacoes.amarelo` or `orientacoes.vermelho`, according to the level), "How to help a crewmate" (`orientacoes.colega`), "When to escalate" (`orientacoes.gatilhoParaSubir`), source with link, origin and data age.

**Alert detail:** four fixed blocks, always in the same order:

1. **Header:** level with color, icon and who acts; short title with "possible" (example: "Possible effect of elevated CO2 in Node 3"); astronaut, module and GMT time.
2. **Why I am seeing this:** each piece of data that triggered the rule, with value, unit and state, and the id of the cross-referencing rule (example: R-CO2-01).
3. **What to do now:** numbered steps and the trigger that would make the alert escalate.
4. **Rule source and who already knows:** official reference and notification state (you, CMO, ground).

At the bottom, a chart with the signals involved overlaid and the threshold line. Every alert stores the evidence, the rule id and the source.

## Layout 2: mission panel on a large screen (M03, 1920 by 1080)

This is the screen of the station's shared monitor and of the presentation big screen. Everything fits on a single screen, **with no scrolling**, and is legible from a distance.

Organization, from top to bottom:

1. **Mission bar:** ORBITA logo, mission (ISS EXP-01), mission day, time "GMT day of year / hh:mm", ground communication state, "SIMULATED DATA" badge and the "Display mode" switch.
2. **"Needs support" strip**, only when someone in the crew is orange or red: who, for how long and what to do ("Offer support", "Call CMO"). Neutral surface, outline in the level color, no red background and no blinking. The symptom or value only appears if the person shared that data with the crew.
3. **Station environment:** a strip with the module of each reading and CO2, O2, cabin pressure, GOES protons and Kp index, with state, data age and origin badge.
4. **Whole crew:** one card per astronaut, side by side (4 cards in the demo: Astronaut 001 and Crew members A, B and C), with the same content as the Crew screen (section 7): code name, module, overall state badge, mini human figure with the colored regions and the Heart, Oxygenation, Temperature, Sleep, Hydration, Radiation and Mind blocks. Each card shows **only what that person consented to share with the crew**; the rest appears as "not shared", in neutral text. No clinical detail, no personal notes, no questionnaire.
5. **Open alerts:** a short list with level (color, icon and word), title with "possible", crew member (if shared), module and time, for example "! Health: attention. Possible effect of elevated CO2 in Node 3, Astronaut 001, 40 min ago".

Mission panel rules:

- **Legible from a distance:** large numbers and short labels. Start with numbers of about 56 px and labels of about 24 px at 1920 px width and check on the real big screen: the NASA standard asks for labels of at least 0.4 degree of visual angle at the viewing distance (NASA-STD-3001 Vol. 2, V2 10066), and CSS pixel size does not prove that.
- **No clinical interaction:** tapping or clicking a card does not open a record or clinical detail; at most it shows what is already visible at a larger size. The alert detail (M07) only opens on the person's own device.
- **Full screen is activated on purpose**, by the "Full screen" button in the mission bar, never on its own. After a few minutes without use, the panel hides the values and keeps only the states (color, icon and word).
- The same color rules: nothing blinks, nothing sounds, "not shared" never becomes an alert color.

---

# 5. INTERACTIVE BODY MAP (M05 and M06)

This will be one of ORBITA's areas of greatest visual prominence.

Below the monitoring panels on the main screen, there must be a section called:

**BODY MAP**

Its function will be to present the human body, allowing the astronaut to explore the risks related to different regions and systems of the organism and see the current state of each.

### Body model

The system must present a human model selected according to the sex entered in the sign-up:

- Male.
- Female.

The representation must be centered and have a technological anatomical look, with cyan lighting and bluish tones.

**Start with a high-quality SVG figure, front and back, with each region as its own `<path>` and a cyan glow.** Replace it with a 3D model (Three.js or React Three Fiber) only if time remains after all the P0 and P1 screens. Do not replace the map with a simple text list.

### Interactive regions

There are 12 regions. Each region takes the color of its **worst** indicator (highest level). A region with no indicator monitored in the prototype stays gray with the phrase "no indicator in the prototype", never green.

| # | Region (id) | Possible risks | Indicators in ORBITA | LEARN MORE |
| --- | --- | --- | --- | --- |
| 1 | Head and brain (`cerebro`) | Neurological, behavioral and cognitive changes; inadequate sleep; possible effect of CO2 on concentration | Sleep, fatigue, mood, PVT, Orbit glasses blinks (experimental) | [Behavior](https://www.nasa.gov/reference/risk-of-behavioral-conditions-and-psychiatric-disorders/), [sleep](https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/) |
| 2 | Eyes and vision (`olhos`) | SANS; changes in eye pressure and structure; visual changes linked to microgravity | Amsler grid, near acuity | [SANS](https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans/) |
| 3 | Heart and cardiovascular system (`coracao`) | Cardiovascular adaptations; circulatory changes; dizziness on standing up after return | Heart rate, blood pressure | [Cardiovascular](https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/) |
| 4 | Lungs and respiratory system (`pulmoes`) | Hypoxia; oxygenation changes; CO2 and cabin contaminants | SpO2, module CO2, module O2 | [Hypoxia](https://www.nasa.gov/reference/risk-of-hypoxia/) |
| 5 | Immune system and blood (`sangue`) | Altered immune responses; interaction with microorganisms; spaceflight anemia | Glucose, blood count | [Immunity](https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/), [microorganisms](https://www.nasa.gov/reference/risk-of-host-microorganism-interactions/) |
| 6 | Abdomen and digestive system (`digestao`) | Inadequate eating; insufficient nutrition; appetite changes; nausea in the first days | Appetite, body mass | [Nutrition](https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/) |
| 7 | Bones (`ossos`) | Loss of bone mineral density; fracture risk | Bone density (measured before and after flight: gray, "not measured in flight") | [Bones](https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/) |
| 8 | Muscles and limbs (`musculos`) | Loss of strength and fitness; injuries in EVA; injuries from dynamic loads | Exercise time | [Fitness](https://www.nasa.gov/reference/risk-of-reduced-cardiorespiratory-and-musculoskeletal-fitness/), [EVA](https://www.nasa.gov/reference/risk-of-injury-and-compromised-performance-from-extravehicular-activity-eva/) |
| 9 | Whole body (`corpo`) | Space radiation; isolation and confinement; hostile environments; decompression sickness | Accumulated dose, body temperature | [Radiation](https://www.nasa.gov/hrp/hazard-space-radiation/), [radiation-induced cancer](https://www.nasa.gov/reference/risk-of-radiation-induced-cancers/) |
| 10 | Vestibular system and balance (`vestibular`) | Balance changes; dizziness; spatial orientation; adaptation to gravitational fields | No indicator in the prototype (record dizziness and nausea in the symptoms) | [Sensorimotor and vestibular](https://www.nasa.gov/reference/risk-of-altered-sensorimotor-and-vestibular-function/) |
| 11 | Kidneys and hydration (`rins`) | Kidney stones, favored by calcium released from bone and by little water | Water intake, urine color | [Kidney stones](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=81) |
| 12 | Ears (`ouvidos`) | Hearing loss from the continuous noise of fans and pumps | No indicator in the prototype (module noise as context) | [Acoustics, OCHMO-TB-035](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-035-acoustics.pdf) |

The text of each risk, in plain language, is in the ORBITA AI base (`orbita-ia-base.json`, `regiao-...` entries); use that text in the panel.

### How the interaction works (region panel, M06)

When a region is tapped:

1. The corresponding point must show a luminous highlight (without blinking).
2. The region must be visually identified on the model.
3. A panel must rise from the bottom (bottom sheet) with the region name.
4. The panel must show the possible risks.
5. It must present a simple explanation of each risk.
6. It must list the related indicators, **each with its current state** (color, icon, word, value and data age), with a tap to the detail (M07).
7. It must provide the LEARN MORE option, with the official NASA link from the table above.

Example:

The astronaut selects the eyes.

The system presents:

EYE REGION · ✓ Health: normal

SANS: Spaceflight Associated Neuro-ocular Syndrome.

Description:

A condition associated with neuro-ocular changes observed in astronauts during spaceflight, which may involve changes in eye structure and vision. NASA monitors it with eye exams on fixed mission dates.

Related indicators:

- Amsler grid: no new distortion · ✓ normal · last test 6 days ago.
- Near acuity: same as your pattern · ✓ normal · last test 6 days ago.
- Specialized ophthalmological exams (OCT, fundus exam): done by the medical team, outside the app.

The system must present a similar explanation for the other regions.

**IMPORTANT:** the body map is an educational panel that supports monitoring. It must not state that all risks can be detected directly by the indicators, and it never states a diagnosis.

---

# 6. COLOR CODE AND DATA CONTRACT

The application must use a visual color standard to make the astronaut's health easier to interpret.

The color code must appear discreetly on indicator cards, on the body map, on the Crew screen and in the reports.

### States

**GRAY: NO DATA (level 0)**

There is no valid reading, the data is invalid or it is past the indicator's display validity. Gray is never "normal".

**GREEN: HEALTH: NORMAL (level 1)**

The indicator has a valid reading, is within the sourced range and has not moved away from the individual pattern.

**YELLOW: HEALTH: ATTENTION (level 2)**

A mild change or a trend was identified that deserves follow-up by the astronaut: outside a sourced range, different from the personal pattern or an active cross-referencing rule.

**ORANGE: HEALTH: ALERT, CALL CMO (level 3)**

There is a relevant change that must be assessed by the CMO and the flight surgeon, according to the mission protocols.

**RED: HEALTH: CRITICAL, CONTACT CMO NOW (level 4)**

An alarm symptom was reported. The astronaut must contact the CMO now and open the official procedure. The screen shows two buttons: "Contact CMO now" and "Open official procedure".

The color code must be accompanied by text and icons, never depending exclusively on color perception.

### Rules that do not change

1. **Red only comes from a reported alarm symptom.** No isolated vital-sign number generates red.
2. **Orange comes from an exceeded official requirement** (examples: module CO2 with a 1-hour average above 3 mmHg; career dose of 600 mSv or more), **from a sourced clinical cutoff** (SpO2 at or below 92%), from a symptom that calls for the CMO or from the escalation of a cross-referencing rule.
3. **Yellow comes from a sourced range, from deviation from the personal baseline or from a cross-referencing rule.** Personal deviation alone never goes above yellow.
4. **Final color = highest level** among sourced range, personal deviation, symptom and cross-referencing rules. The body region takes the color of its worst indicator.
5. **Nothing blinks, nothing sounds, nothing vibrates** at any level. The labels start with "Health:". Never use the English words of the station's alarm system (Caution, Warning, Emergency): blinking red, sound and light belong to the ISS Caution and Warning system, and ORBITA must not resemble it.
6. **Supportive language, not diagnostic:** "possible", "suggests", "compatible with". Every yellow, orange and red has a "what to do" and the trigger to escalate.
7. The criteria live in `indicadores.json` (configurable) and must not be presented as official NASA limits when there is no corresponding reference. When the range is terrestrial, the screen writes "terrestrial reference, not a flight limit". Values marked `valorDeDemonstracao` appear with the "demonstration value" badge.

### How the engine decides the color

- **Validity:** with no valid reading within the validity period, the state is gray. Display validity: 1 hour for environment data, 24 hours for personal data and 2,160 hours (90 days) for the vision tests.
- **Sourced range:** the engine evaluates `regraCor.regras` in the declared order; each satisfied condition proposes its level.
- **Baseline:** mean and sample standard deviation of at least 7 valid readings. z = (value minus mean) divided by the standard deviation. |z| of 2 or more generates yellow ("different from your normal"); |z| above 3 in 2 consecutive readings generates persistent yellow, with a suggestion to talk to the CMO. The baseline is not updated with yellow or higher days. With fewer than 7 readings, the screen shows "baseline forming" and only the sourced range applies. Respect the `direcao` (direction) field (for appetite, only the higher category calls for attention).
- **Environment:** color by the exponentially weighted moving average (EWMA) with λ = 0.3; the chart shows the raw value.
- **Symptoms and cross-referencing rules:** evaluated separately; the final state is the highest level.
- **Mandatory engine test:** resting heart rate for 7 mornings (56, 58, 57, 60, 55, 59 and 57 bpm) gives a mean of 57.43 bpm and a standard deviation of 1.72 bpm; a reading of 63 bpm gives z = 3.24.

### Data contract: indicators used by ORBITA

Numbers copied from `regraCor` in `indicadores.json`. Level 2 is yellow, 3 is orange and 4 is red. "Baseline only" means: no numeric threshold, yellow by |z| of 2 or more, never red from the baseline. The demonstration values are explained in section 14.

| id | Name on screen | Unit | Origin in the prototype | How the color is decided (`regraCor`) | Demonstration value |
| --- | --- | --- | --- | --- | --- |
| `fc_repouso` | Heart rate | bpm | Simulated (wearable) | Level 2 outside 60 to 100 bpm (terrestrial reference); baseline; level 4 only with a symptom: chest pain, syncope, significant shortness of breath or instability | 86 bpm; pattern of 64 bpm → yellow |
| `dose_acumulada` | Dosimetry | mSv | Simulated (estimated effective dose) | Level 3 at 600 mSv career or more (NASA-STD-3001 Vol. 1, V1 4030); below that, green | 0.42 mSv today; 18.9 mSv on the mission; 3.2% of the limit → green |
| `spo2` | Oximetry | % | Simulated | Level 3 with immediate urgency at or below 88%; level 3 at or below 92%; level 2 outside 95 to 100% (terrestrial reference); level 4 only with a symptom: significant breathing difficulty or signs compatible with hypoxia | 97% → green |
| `eog_piscadas` | Eye attention (EOG) | blinks/min | Simulated; Orbit glasses (proposed); experimental | Baseline only; never red; no threshold | 12.4 blinks/min, within the pattern → green |
| `ppco2_modulo` | Module CO2 | mmHg | Simulated (scenario C1); peak equal to the real value recorded in Node 3 on 15/11/2026 | Level 3 with a 1 h average above 3 mmHg (NASA-STD-3001 Vol. 2, V2 6004); level 2 with EWMA above 2.8 mmHg **only inside rule R-CO2-01** (demonstration value); level 3 with severe headache or dizziness in the CO2 context | 2.95 mmHg in Node 3 → attention via alert R-CO2-01 |
| `pio2_cabine` | Module O2 (PIO2, calculated from ppO2 and total pressure; it is not the ppO2) | kPa | Real recorded (ppO2 from Node 3 and pressure from the US Lab, ISS) | Level 2 outside the normoxia target of 19.33 to 20.67 kPa (145 to 155 mmHg); level 3 with a 1 h average below 16.93 kPa (127 mmHg), any reading below 16.27 kPa (122 mmHg) or above 47.46 kPa (356 mmHg) | 18.84 kPa (141.3 mmHg) → yellow |
| `pressao_cabine` | Cabin pressure | kPa | Real recorded (US Lab, ISS) | Level 3 at or below 34.47 kPa or above 103.42 kPa (5 to 15 psia) | 101.0 kPa (757.6 mmHg) → green |
| `fluxo_protons_goes` | GOES protons, 10 MeV or more | pfu | Real recorded (NOAA) | Level 2 at 10 pfu or more (start of NOAA level S1); it is not a personal dose and not red | 0.21 pfu (15/11/2026, 05:35 UTC) → green |
| `kp` | Kp index | dimensionless | Real recorded (NOAA) | Baseline only; environmental context | 1 → green |
| `sono_tst` | Last night's sleep | min (screen in h) | Manual | Baseline only; level 3 only with a symptom: inability to perform a critical task safely | 5.4 h; pattern of 7.5 h → yellow |
| `fadiga` | Fatigue | points, 1 to 7 | Manual | Baseline only; level 3 only with a symptom: inability to perform a critical task safely | 6 of 7; pattern of 2 of 7 → yellow |
| `humor` | Mood | points, 1 to 5 | Manual | Baseline only; level 4 only with a reported immediate risk (immediate human contact) | 3 of 5; pattern of 4 of 5 → green (within personal variation) |
| `agua_ingerida` | Hydration | mL (screen in L) | Manual | Baseline; less than 1,200 mL in 24 h for 2 days applies **only inside rule R-HID-01** (demonstration value, not a target) | 1.8 L → green |
| `cor_urina` | Urine color (optional) | category 1 to 8 | Manual | Baseline; category 6 or more applies **only inside rule R-HID-01** (demonstration value) | No record in the demo |
| `apetite` | Appetite | category 1 to 3 | Manual | Baseline only (only the higher category calls for attention); level 3 only with a symptom: inability to eat or drink with clinical worsening | 2, reduced, within the pattern → green |
| `pa_sistolica` | Systolic pressure | mmHg | Manual (kit) | Level 2 outside 90 to 120 mmHg (terrestrial reference); level 4 only with a symptom: syncope, confusion, chest pain or neurological deficit | 120 mmHg → green |
| `pa_diastolica` | Diastolic pressure | mmHg | Manual (kit) | Level 2 outside 60 to 80 mmHg (terrestrial reference); level 4 only with the same symptoms | 80 mmHg → green |
| `glicose` | Fasting glucose | mg/dL | Manual (kit) | Level 2 from 100 to 125 mg/dL; level 2 at 126 mg/dL or more, asking for confirmation (terrestrial reference); no red by number | 90 mg/dL → green |
| `temperatura_corporal` | Temperature | °C | Manual (kit) | Level 2 outside 36.5 to 37.3 °C oral (terrestrial reference); level 3 with fever or suspected hypothermia together with symptoms | 36.8 °C → green |
| `acuidade_perto` | Near acuity | chart scale, per eye | Manual (test in the app) | Baseline only; feeds rule R-SANS-01 | Last test 6 days ago, same as pattern → green |
| `amsler_distorcao` | Amsler grid | response per eye | Manual (test in the app) | Baseline only; feeds rule R-SANS-01 | No new distortion → green |
| `pvt_tempo_reacao` | Reaction test | ms | Manual (test in the app) | Baseline only; worsening above 10% applies **only inside rule R-CO2-01** (demonstration value) | Last test 6 days ago: 268 ms; pattern of 270 ms → green |
| `pvt_lapsos` | Lapses in the reaction test | events per session | Manual (test in the app) | Baseline only | 1 lapse → green |
| `hemoglobina` | Hemoglobin | g/dL | Exam | Level 2 outside 13 to 18 g/dL (men) or 12 to 16 g/dL (women), according to the sex in the sign-up; never automatic red; level 3 only with syncope or dyspnea at rest | Last result 14.8 g/dL (collection on day 23); new sample collected on day 38, analysis on Earth |
| `massa_corporal` | Body mass | kg | Manual | Baseline only | 78 kg (sign-up) → baseline forming |
| `tempo_exercicio` | Exercise | min | Manual | Baseline only | 120 min today (typical value of the simulation profile) → green |
| `densidade_ossea` | Bone density | % of baseline | Exam (before and after flight) | Level 3 below 95% at the hip or spine, or 90% at the femoral neck (V1 4027) | Not measured in flight → gray |

The other indicators in `indicadores.json` (for example, noise, cabin temperature and humidity, dose rate) remain available for the environment detail and for future versions; they do not need their own screen now.

### Symptoms that change the level

The symptoms in the daily assessment are separate items. These change the level of the indicator linked to them:

| Reported symptom | Level | Where the rule comes from |
| --- | --- | --- |
| Chest pain | 4, red | `fc_repouso`, `pa_sistolica`, `dor` |
| Fainting or near-fainting | 4, red | `fc_repouso`, `pa_sistolica` |
| Significant shortness of breath | 4, red | `fc_repouso`, `spo2`, `frequencia_respiratoria` |
| Confusion, sudden loss of strength or speech | 4, red | `pa_sistolica`, `pa_diastolica` |
| "I need support now" (immediate risk to myself) | 4, red, with immediate human contact | `humor` |
| Sudden loss of vision or double vision | 3, orange | escalation of R-SANS-01 |
| Fever with malaise | 3, orange | `temperatura_corporal` |
| "I cannot perform a critical task safely" | 3, orange | `sono_tst`, `fadiga` |
| "I cannot eat or drink" | 3, orange | `apetite` |
| Headache, with intensity from 0 to 10 | 2 if new or persistent; 3 if 7 or more together with high CO2 (R-CO2-01, demonstration value) | `dor` |
| Dizziness | Feeds R-CO2-01 (rises to 3 with high CO2) and R-AMB-01 | Cross-referencing rules |
| Difficulty concentrating | Feeds R-CO2-01 and R-AMB-01 | Cross-referencing rules |
| Blurred vision, nausea, eye or skin irritation, poor sleep | Record; R-AMB-01 lists possible environmental factors | Cross-referencing rules |

### Cross-referencing rules (all in `indicadores.json`)

| id | When it fires | Level | Text on screen |
| --- | --- | --- | --- |
| R-CO2-01 | Module CO2 EWMA above 2.8 mmHg in a 3 h window and at least one of: headache, difficulty concentrating or PVT more than 10% slower than the pattern (demonstration numbers). Rises to 3 with headache of 7 or more out of 10, dizziness or a 1 h average above 3 mmHg | 2 | "Possible effect of elevated CO2 in the module" |
| R-RAD-01 | GOES protons at 10 pfu or more (S1) or a solar particle alert in DONKI, while the event lasts; applies to the whole crew | 2 | "Solar event in progress: the radiation dose may rise" |
| R-SANS-01 | Worsening of near acuity or new distortion on the Amsler in 2 consecutive tests, up to 14 days apart. Rises to 3 with persistent headache, double vision or sudden loss of vision | 2 | "Change in vision: consider moving up the eye exam with the flight surgeon" |
| R-SONO-01 | Sleep debt in the last 3 days and a critical activity (EVA, vehicle arrival, robotic arm) in the next 2 days; no automatic red | 2 | "Sleep below schedule before a critical activity" |
| R-HID-01 | Water below 1,200 mL in 24 h for 2 days and urine color 6 or more on the scale of 8 (demonstration numbers); no automatic red | 2 | "Hydration record below the demonstration parameter; review individual plan" |
| R-AMB-01 | Reported symptom and an environmental quantity outside green in the busiest module in the last 6 h | Does not change the level | Attaches "possible environmental factors" to the detail |

The guidance for each rule (what to do, how to help a crewmate and when to escalate) is in the `orientacoes` field of each rule in `indicadores.json`.

---

# 7. NAVIGATION MENU: ORBITA ICON (M18)

On all inner screens, the header must show the official icon beside the word ORBITA.

Navigation changes with the screen size (section 1):

- **Phone:** when the icon, the logo area or the visible menu icon beside it is clicked, a side menu (drawer) opens with the navigation options. It opens with a smooth animation, sliding in from the side of the screen. At the bottom, the fixed bar with 4 shortcuts.
- **Tablet and laptop:** the same menu stays fixed on the left and can be collapsed to a column of icons only; no bottom bar.
- **Large screen:** display mode, no menu (mission panel, section 4, layout 2). The "Display mode" switch returns to the layout with a menu.

### Menu organization

At the top:

- ORBITA logo.
- Application name.
- Button to close the menu.

Then:

1. Overview (M03).
2. Body map (M05).
3. Health assessment (M04).
4. Lab exams (M08).
5. ORBITA AI (M09).
6. Reports (M10).
7. Mission routine (M11).
8. Crew (M16).
9. Sleep and Orbit glasses (M17).
10. Space risks (M13).
11. Mission: Health on Track (M12).
12. Profile and privacy (M15).

Notifications (M14) live in the header bell, not in the menu.

At the bottom:

- Astronaut identification.
- Current mission.
- Mission day.
- Connectivity status, on two separate lines: "Offline: working locally" and "Ground communication: real time", "store and forward" or "no contact". The health color never changes because of the network.

The menu must present minimalist icons and visually indicate which page is selected.

### Bottom bar (phone only)

A fixed bar with 4 shortcuts: **Home**, **Map**, **Assess** and **AI**. Avoid excessively complex navigation.

### Crew screen (M16): general monitor with consent

On the phone, the Crew screen is a list of cards, one per person, in a single column. On tablet and laptop, the cards sit side by side. On a large screen, Crew becomes the mission panel (section 4, layout 2), which brings these same cards together with the station environment and the open alerts. The content of each card is the same at all sizes, always with the same blocks in the same order. In the demo: Astronaut 001 and Crew members A, B and C, all fictional.

- **Card header:** code name, module where they are now (if shared) and overall state badge (color, icon and word).
- **Mini human figure** with the colored regions, using the same logic as the map.
- **Blocks:** Heart (bpm), Oxygenation (%), Temperature (°C), Last night's sleep, Hydration, Radiation (mission dose in mSv) and Mind (state only: the worst among fatigue, mood and stress, the same as the Head and brain region of the map; in the demo, Astronaut 001 appears with Mind in attention because of the fatigue of 6 of 7). Whoever shares only the state appears with the state icon and word and the text "state only" in place of the value.
- **Footer:** data age and, if there is an alert, a sentence about what is happening and what the crewmate can do to help (field `orientacoes.colega`).
- **"Needs support" strip**, at the top of the screen, only when someone is orange or red: who, for how long and the "Offer support" and "Call CMO" buttons. The symptom or value only appears if the person shared that data; without consent, the strip says only "Crew member C: CMO attention requested". "On the way" only appears after the crewmate accepts the help. The strip uses a neutral surface, no red background.
- **Compact environment strip:** CO2, O2, pressure and GOES protons.
- **Mutual care bar:** the day's cooperative goal (section 11), with no ranking.

Privacy rules (mandatory):

- Each person only appears with what they consented to share, with whom and until when. The filter happens in the engine, before the data reaches the screen.
- "Not shared" is neutral text, with no state color, no alert icon and no click.
- Clinical details, personal notes, questionnaires and medical conversations never appear.
- There is no hard-coded unrestricted emergency access in the app.

Demonstration: Crew member A shares everything; Crew member B shares only the state per system (the values appear as "not shared"); Crew member C shares everything except the mind ("not shared"). The three members' values for today are the baselines of the fictional crew members `trip-a`, `trip-b` and `trip-c` from the profiles file, and all three are at "Health: normal"; Astronaut 001 appears at "Health: attention", with the CO2 alert.

### Sleep and Orbit glasses screen (M17)

- Cards: last night's sleep, sleep efficiency and sleeping-quarters noise (gray, "no data", while there is no measurement).
- Estimated hypnogram of last night, labeled "demonstration estimate, not polysomnography" (public Sleep-EDF dataset when available in the project; otherwise simulated and labeled).
- Soundscape of the day: cultural profile chosen by the astronaut (example: Atlantic Forest) and the schedule by period (morning, afternoon, pre-sleep, sleeping).
- Glasses signals: blinks per minute (EOG) and alpha power (EEG), with the badge "Orbit glasses (proposed) · simulated · experimental".
- Fixed text: "The sound pauses immediately at any station alarm and never covers alarms. There is no study yet showing that the glasses improve sleep."

---

# 8. ORBITA AI: OFFLINE VIRTUAL ASSISTANT (M09)

Create an exclusive area called:

**ORBITA AI**

Subtitle:

Intelligent space health assistant.

This tool will be responsible for answering the astronaut's questions about their health, indicators and risks related to the space environment.

### Concept

ORBITA AI must work locally, without depending on an internet connection and without an API key.

Its knowledge base is the `orbita-ia-base.json` file (attached), assembled from the scientific content and official materials of the NASA Human Research Program and NASA standards, with the source of each answer. Each entry has `id`, `perguntas` (variations and keywords), `resposta`, `maisDetalhes` (optional), `indicadores`, `regioes` and `fontes`.

The intent is to let the astronaut consult information even when far from Earth or with limited communication.

### Interface

Create a conversation screen similar to a virtual assistant.

Elements:

- ORBITA AI icon.
- Offline operation indicator ("Offline: local base").
- Message box.
- Field to type questions.
- Send button.
- Suggestions of frequent questions (the 10 below, as buttons).
- Below each answer: the sources as links and the "More details" button when it exists.
- Fixed notice at the top, with the `aviso` field from the file.

### Questions the astronaut can ask

- How is my health today?
- Which indicators need attention?
- Why did my heart rate change?
- What is the SANS risk?
- What are the effects of microgravity on the body?
- How does space radiation affect the body?
- Why do I need to track my hydration?
- What are the risks of sleeping inadequately?
- When should I do my next assessment?
- What does the alert shown on my body map mean?

### How to answer

1. Normalize the question (lowercase, no accents and no punctuation) and compare it with the `perguntas` field of each entry, by shared words. Choose the entry with the highest score.
2. If the question has an emergency word (emergency, fire, blaze, depressurization, toxic atmosphere, alarm, help, chest pain), answer first with the `emergencia` entry and show the "Contact CMO now" and "Open official procedure" buttons.
3. If no entry has a sufficient score, answer: "I did not find that in ORBITA's local base. I can talk about:" and show three suggestions. Never invent.
4. Some answers have markers in braces, which the app fills with the current states calculated by the engine (never by the AI). A marker with no data becomes "no data"; an empty list becomes "none".

| Marker | What the app inserts |
| --- | --- |
| `{missao}`, `{diaMissao}`, `{horaGmt}` | Mission, mission day and "GMT day of year / hh:mm" |
| `{qtdVerde}`, `{qtdAmarelo}`, `{qtdLaranja}`, `{qtdVermelho}`, `{qtdSemDado}` | Number of indicators at each level |
| `{indicadoresAmarelos}`, `{indicadoresLaranja}`, `{indicadoresVermelhos}`, `{indicadoresSemDado}` | List with name, value and unit, for example "heart rate 86 bpm, above your pattern of 64 bpm" |
| `{alertasAtivos}` | Title and id of each active alert |
| `{listaAtencao}`, `{oQueFazerAtencao}` | Indicators at yellow or above and the first step of `orientacoes` for each |
| `{fcValor}`, `{fcLinhaDeBase}`, `{fcEstado}` | Today's heart rate, baseline mean and state |
| `{proximaAvaliacaoDiaria}`, `{estadoHemograma}`, `{proximoHemograma}`, `{proximoTesteVisao}`, `{proximoPvt}` | Dates and states from the Mission routine |
| `{regiaoSelecionada}`, `{estadoRegiao}`, `{indicadoresDaRegiao}` | Map region, state and its indicators |
| `{alertaTitulo}`, `{alertaRegra}`, `{alertaEvidencias}`, `{alertaOQueFazer}`, `{alertaGatilho}`, `{alertaFonte}` | The four blocks of the alert detail (M07) |

Answers must be grounded in the available information.

Do not invent scientific information, do not prescribe medications or doses and do not present medical diagnoses.

### Offline operation

For the prototype:

- Use the local base `orbita-ia-base.json`.
- Implement contextual answers through local search and rules.
- Allow predefined questions and typed questions.
- Present answers related to the astronaut's context (markers).
- Always show the sources consulted.

The architecture must allow future integration with locally run AI models, but the prototype must work even without an API KEY and without internet.

---

# 9. REPORTS: DYNAMIC CHARTS (M10)

Create a page called:

**HEALTH REPORTS**

It must present the evolution of the astronaut's indicators throughout the mission.

The purpose is to allow identifying gradual changes and comparing results between different days.

### Charts

Create dynamic charts (Recharts) for:

1. Heart rate.
2. Accumulated dosimetry.
3. Oximetry.
4. EOG indicators.
5. Hydration.
6. Fatigue.
7. Appetite.
8. Blood count, according to the recorded exams.

And also for sleep, mood, blood pressure, glucose, temperature and module CO2.

Each chart shows:

- The personal baseline range (mean and 2 standard deviations up and down), dotted.
- The sourced range, when there is one, with the source label ("terrestrial reference, not a flight limit" when applicable).
- Events marked on the time axis: solar event, EVA, blood collection, alert start.
- Points in the state color of each reading, with an icon on tap.

### Organization

Allow selecting:

- Last 7 days.
- Last 15 days.
- Last 30 days.
- Whole mission.

The charts must be interactive.

When a given day is selected, show the values recorded in that period.

Allow switching between indicators without leaving the page.

### History table

Below the charts, present a simple table with:

- Date and time (GMT).
- Indicator.
- Recorded value, with unit.
- State (color, icon and word).
- Origin (simulated, manual, exam, real recorded).
- Notes.

The data must be persisted and updated automatically after new records.

The blood count must have its own history, respecting the configured periodicity and the collection states.

The charts must allow identifying trends, but must not interpret a simple isolated variation as a diagnosis.

---

# 10. MISSION ROUTINE: REMINDERS AND ACTIONS (M11)

ORBITA must have an area called:

**MISSION ROUTINE**

Its function will be to ask the astronaut to perform specific assessments or actions in certain periods.

All times in GMT, following the ISS reference routine: wake up around 06:00, work from 08:00 to 17:00, pre-sleep from 19:30 and sleep window from 21:30 to 06:00 (or the time from the sign-up).

### Daily activities

- 2-minute daily assessment: sleep, fatigue, mood, hydration, appetite and symptoms.
- Record hydration throughout the day.
- Check the automatic indicators and the module environment.
- Record vital signs when measured with the kit.

### Periodic activities

- Blood count, default 15 days, with the states "collection scheduled", "sample collected, analysis on Earth" and "result available".
- Vision test (Amsler and near acuity), weekly, as a proposal subject to flight surgeon approval. NASA's official SANS eye exams are at FD30, FD90 and then every 90 days.
- Reaction test (3-minute PVT), weekly, as a proposal.
- Periodic review of the history.

### Interface

Each activity must present:

- Name.
- Description.
- Periodicity.
- GMT time or deadline.
- State: pending or completed (the blood count uses its three states).

When an activity is completed, the system must automatically update the task state.

Create a daily progress bar showing how many activities were completed.

The goal is to help the astronaut keep an organized routine of tracking their own health.

Reminders must respect the mission schedule: **no reminder in the sleep window or during critical activities marked in the plan** (EVA, vehicle arrival). Reminders use gray or cyan, never the state colors.

---

# 11. GAMIFICATION: ASTRONAUT ENGAGEMENT (M12)

Add a complementary area called:

**MISSION: HEALTH ON TRACK**

Gamification must encourage the astronaut to keep the monitoring routine and perform preventive actions.

It must not look like a children's game.

It must have a professional, technological aesthetic related to space exploration.

### Features

- Experience points (XP).
- Progress levels.
- Achievements.
- Streak of days with assessments completed.
- Routine challenges.
- **Crew goal:** one cooperative goal per day (example: "the whole crew recorded hydration today"), with no ranking and no comparison between crewmates.
- **Link to the Orbit glasses:** achievements unlock new sounds from the chosen cultural profile for the soundscape.

Examples of achievements:

**CONSISTENT HYDRATION**

Record hydration for five consecutive days.

**ROUTINE ON TRACK**

Complete all daily assessments for seven days.

**HEALTH EXPLORER**

Consult and follow all categories of indicators.

**MONITORED SLEEP**

Record sleep data for seven days.

Display:

- Current level.
- Accumulated XP.
- Next level.
- Unlocked achievements.
- Mission challenges.

Points must be granted for tracking and prevention actions, never for presenting health results considered better. There are no numeric intake or training goals created by the app: the goal is to complete the individual plan.

---

# 12. SPACE RISKS: NASA SCIENTIFIC BASE (M13)

Create an area called:

**SPACEFLIGHT RISKS**

This section must present the five main hazards identified by the NASA Human Research Program (acronym RIDGE):

1. Space radiation.
2. Isolation and confinement.
3. Distance from Earth.
4. Gravity fields.
5. Hostile and closed environments.

Each risk must have:

- Illustrative icon.
- Title.
- Short description (use the `perigo-...` entries from `orbita-ia-base.json`).
- Possible health impacts.
- Associated indicators in ORBITA.
- Link to the official NASA material (section 15).

Besides the five hazards, organize the specific risks and relate them to the body map regions (a tap leads to the region):

| Risk | Map region |
| --- | --- |
| Altered immune system responses | `sangue` |
| Sensorimotor and vestibular function | `vestibular`, `musculos` |
| Cardiovascular adaptations | `coracao` |
| Decompression sickness | `corpo` |
| Host-microorganism interactions | `sangue` |
| Hypoxia | `pulmoes` |
| Inadequate food and nutrition | `digestao` |
| Injury and performance in spacewalks | `musculos` |
| Reduced cardiorespiratory and musculoskeletal fitness | `musculos`, `coracao` |
| SANS | `olhos` |
| Bone changes | `ossos` |
| Behavioral changes and psychiatric disorders | `cerebro` |
| Inadequate teamwork | `cerebro` (collective risk; see Crew screen) |
| Inadequate sleep and irregular schedules | `cerebro` |
| Inadequate support for system operations | None (mission context) |
| Injuries related to dynamic loads | `musculos`, `ossos` |
| Radiation-induced cancer | `corpo` |
| Kidney stones | `rins` |
| Noise-induced hearing loss | `ouvidos` |

Organize the risks by category (the five hazards).

The scientific content must be presented in plain language, preserving NASA's original grounding.

---

# 13. NOTIFICATIONS AND ALERTS (M14)

Create a visual notification system in the application, accessed through the header bell.

Examples:

- Your daily assessment is pending.
- Your next blood count is approaching.
- Your heart rate is different from your usual pattern.
- Your hydration assessment is pending.
- There is a new exam result to consult.
- Possible effect of elevated CO2 in Node 3: see what to do.

Rules:

- Health notifications have the level color, icon and word (section 6). Routine reminders use gray or cyan, never the state colors.
- **No sound, no vibration and nothing blinking**, at any level.
- When a health notification is tapped, open the alert or indicator detail (M07), with the why, what to do and the rule source. When a reminder is tapped, open the related page.
- Notification history, most recent first, with GMT time.

---

# 14. PROTOTYPE DEMONSTRATION DATA

The system must start with a fictional profile to make the presentation to the judges easier. All body data is fictional and appears with the simulated-data badge.

### Demonstration profile

| Field | Value |
| --- | --- |
| Name | Astronaut 001 |
| Sex | Male |
| Body mass | 78 kg |
| Height | 180 cm |
| Mission | ISS EXP-01 |
| Mission day | 45 (the start date is "today minus 44 days", so that day 45 always appears) |
| Sleep schedule | 21:30 to 06:00 GMT |
| Current module | Node 3 |
| Sharing | Everything with the crew (demonstration profile) |

All demonstration times are relative to the moment the data is restored.

### Simulated automatic data

| Indicator | Today | Baseline (previous 7 days) | State |
| --- | --- | --- | --- |
| Heart rate | 86 bpm | 60, 62, 64, 68, 66, 62 and 66 bpm (mean 64 bpm) | Yellow: different from your pattern |
| Dosimetry | 0.42 mSv today (estimated effective dose) | 0.42 mSv per day; accumulated 18.9 mSv in 45 days, 3.2% of the 600 mSv career limit (no previous missions) | Green |
| Oximetry | 97% | 97, 98, 97, 96, 97, 98 and 97% | Green |
| Eye attention (EOG) | 12.4 blinks/min (Orbit glasses, simulated) | 13.0; 12.1; 13.5; 12.8; 11.9; 12.6 and 13.2 | Green |

### Module environment (Node 3)

| Quantity | Value | Origin | State |
| --- | --- | --- | --- |
| CO2 | Base of 1.9 mmHg; 2 hours ago it rose to 2.95 mmHg and stayed there (scenario C1; the same value appears in the public ISS telemetry recorded on 15/11/2026). With readings every 10 minutes and λ = 0.3, the EWMA passes 2.8 mmHg in about 60 minutes; the 1-hour average stays at 2.95 mmHg, below the 3 mmHg requirement | Simulated | Attention via alert R-CO2-01 |
| O2 (PIO2) | 141.3 mmHg (18.84 kPa), calculated from the Node 3 ppO2 of 150.67 mmHg and the total pressure of 757.64 mmHg: PIO2 = (total pressure minus 47) × ppO2 ÷ total pressure (`docs/04`, A1) | Real recorded | Yellow: outside the normoxia target of 145 to 155 mmHg, well above the limits of 127 and 122 mmHg. Text: "O2 slightly below target in Node 3; check the sensor and follow the trend" |
| Cabin pressure | 757.6 mmHg (101.0 kPa), US Lab | Real recorded | Green |
| GOES protons, 10 MeV or more | 0.21 pfu; 7-day maximum, 0.48 pfu | Real recorded (NOAA) | Green |
| Kp index | 1 | Real recorded (NOAA) | Green |

### Simulated manual data (today's assessment)

| Indicator | Today | Baseline (previous 7 days) | State |
| --- | --- | --- | --- |
| Sleep | Last night 5.4 h | 440, 455, 450, 465, 445, 450 and 445 min (mean 7.5 h) | Yellow: sleep debt |
| Fatigue | 6 of 7 | 2, 2, 3, 2, 1, 2 and 2 (mean 2 of 7) | Yellow |
| Mood | 3 of 5 | 4, 4, 5, 4, 3, 4 and 4 (mean 4 of 5) | Green (variation within the pattern) |
| Hydration | 1.8 L | 2,000, 1,900, 2,100, 1,800, 2,000, 2,200 and 1,900 mL | Green |
| Appetite | Reduced (2) | 1, 1, 2, 1, 1, 2 and 1 | Green (within the pattern) |
| Symptoms | Difficulty concentrating, reported 40 minutes ago | | Feeds rule R-CO2-01 |
| Blood pressure | 120 by 80 mmHg | Baseline forming | Green |
| Fasting glucose | 90 mg/dL | Baseline forming | Green |
| Temperature | 36.8 °C | Baseline forming | Green |
| Exercise | 120 min | Baseline forming | Green |
| Vision test | Last 6 days ago: no new distortion; acuity same as pattern | | Green |
| Reaction test | Last 6 days ago: 268 ms, 1 lapse; pattern of 270 ms | | Green |
| Blood count | Collection on day 38 (7 days ago): "sample collected, analysis on Earth". Previous result (collection on day 23): hemoglobin 14.8 g/dL, within the terrestrial reference of 13 to 18 g/dL for men. Next collection on day 53 | | The 22-day-old result appears with the data age, without turning green |

The blood pressure, glucose, temperature, exercise and reaction test values come from the typical values in the simulation profiles file.

### Demonstration story

With these values, the home screen shows **three yellows** on the body (heart rate, fatigue and sleep), **one explainable CO2 alert**, the **Node 3 O2 in yellow** on the environment card (real data: the same module with higher CO2 and O2 below target suggests local ventilation, a matter for environmental control) and everything else in green, plus the honest gray where there is no in-flight measurement (bones, ears and vestibular on the map).

The alert appears like this in the detail (M07):

1. **Header:** "! Health: attention. Possible effect of elevated CO2 in Node 3" · who acts: you, with notice to the CMO and environmental control · GMT time.
2. **Why I am seeing this:** Node 3 CO2 with EWMA above 2.8 mmHg for more than 1 hour (peak of 2.95 mmHg; 1-hour average below the 3 mmHg requirement, NASA-STD-3001 Vol. 2, V2 6004); difficulty concentrating reported 40 minutes ago; rule R-CO2-01. Possible factors (R-AMB-01): module CO2 and short sleep last night (5.4 h). Also different from your pattern today: heart rate of 86 bpm and fatigue of 6 of 7.
3. **What to do now:** (1) check the module, the sensor and the ventilation; (2) if authorized, go to a module with a lower reading; (3) hydrate according to the plan; (4) repeat the reaction test in 2 hours; (5) notify environmental control and the CMO. Escalates to orange if: headache of 7 or more out of 10, dizziness or a 1-hour average above 3 mmHg. How a crewmate can help: offer to accompany the person or notify environmental control.
4. **Source and who already knows:** rule R-CO2-01 (prototype demonstration values); NASA OCHMO-TB-004 and NASA-STD-3001 Vol. 2 Rev. F, V2 6004. You: notified; CMO: queued; ground: queued for the next pass.

On the map, Heart and Head and brain turn yellow from the indicators, and Lungs turns yellow from the module CO2 alert.

**On the big screen (mission panel, 1920 by 1080):** the environment strip shows Node 3 with CO2 of 2.95 mmHg and O2 (PIO2) of 18.84 kPa in attention; the four crew cards appear side by side (Astronaut 001 at "Health: attention" and Crew members A, B and C at "Health: normal", with the "not shared" items in neutral text); the open alerts list shows "Possible effect of elevated CO2 in Node 3". The "needs support" strip does not appear, because nobody is orange or red; it appears when the demonstration records SpO2 of 92% or the symptom "chest pain" (next paragraph).

To show escalation to the judges, the demonstration allows changing values: recording SpO2 of 92% turns oximetry orange ("call CMO"); marking the symptom "chest pain" turns the heart red with "Contact CMO now" and "Open official procedure", with no blinking and no sound.

Create a demonstration button called:

**RESTORE INITIAL DATA**

This button must allow repeating the scenario during the presentation, recalculating all times from the current moment.

It must also be possible to change the values to demonstrate how the application reacts to new records.

---

# 15. OFFICIAL NASA SOURCES

Use the following materials as the basis for the application's knowledge library.

**Five hazards of spaceflight:**

https://www.nasa.gov/hrp/hazards/

**Space radiation:**

https://www.nasa.gov/hrp/hazard-space-radiation/

**Isolation and confinement:**

https://www.nasa.gov/hrp/hazard-isolation-and-confinement/

**Distance from Earth:**

https://www.nasa.gov/hrp/hazard-distance-from-earth/

**Gravity fields:**

https://www.nasa.gov/hrp/hazard-gravity-fields/

**Hostile and closed environments:**

https://www.nasa.gov/hrp/hazard-hostile-closed-environments/

**Risks of human spaceflight:**

https://www.nasa.gov/hrp/risks/

**Immune system:**

https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/

**Sensorimotor and vestibular function:**

https://www.nasa.gov/reference/risk-of-altered-sensorimotor-and-vestibular-function/

**Cardiovascular risks:**

https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/

**Decompression sickness:**

https://www.nasa.gov/reference/risk-of-decompression-sickness/

**Host-microorganism interaction:**

https://www.nasa.gov/reference/risk-of-host-microorganism-interactions/

**Hypoxia:**

https://www.nasa.gov/reference/risk-of-hypoxia/

**Food and nutrition:**

https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/

**Extravehicular activities:**

https://www.nasa.gov/reference/risk-of-injury-and-compromised-performance-from-extravehicular-activity-eva/

**Cardiorespiratory and musculoskeletal fitness:**

https://www.nasa.gov/reference/risk-of-reduced-cardiorespiratory-and-musculoskeletal-fitness/

**SANS:**

https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans/

**Bone changes:**

https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/

**Behavioral changes:**

https://www.nasa.gov/reference/risk-of-behavioral-conditions-and-psychiatric-disorders/

**Teamwork:**

https://www.nasa.gov/reference/risk-of-inadequate-teamwork/

**Inadequate sleep:**

https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/

**System operations support:**

https://www.nasa.gov/reference/risk-of-inadequate-systems-operations-support/

**Injuries from dynamic loads:**

https://www.nasa.gov/reference/risk-of-injury-from-dynamic-loads/

**Radiation-induced cancer:**

https://www.nasa.gov/reference/risk-of-radiation-induced-cancers/

**The human body in space:**

https://www.nasa.gov/humans-in-space/the-human-body-in-space/

### Standards and briefs that provide the numbers

**NASA-STD-3001 Vol. 1 Rev. C** (crew health; career radiation limit V1 4030, bone target V1 4027, privacy):

https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf

https://www.nasa.gov/reference/4-0-human-performance/

**NASA-STD-3001 Vol. 2 Rev. F** (cabin environment: CO2 V2 6004, O2, pressure; alarms and displays):

https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf

**OCHMO SANS brief (OCHMO-MTB-001):**

https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf

**Other OCHMO briefs used in the rules:** CO2 (OCHMO-TB-004), https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/ ; sleep (OCHMO-TB-041), https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-041-sleep-accommodations.pdf ; urinary health (OCHMO-MTB-003), https://www.nasa.gov/ochmo-mtb-003-urinary-health-2/ ; acoustics (OCHMO-TB-035), https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-035-acoustics.pdf

**Kidney stones (Kidneys region):**

https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=81

**Space weather (NOAA):**

https://www.swpc.noaa.gov/products/notifications-timeline

**Terrestrial references used with the label "terrestrial reference, not a flight limit":** MedlinePlus, vital signs, https://medlineplus.gov/ency/article/002341.htm ; MedlinePlus, oximetry, https://www.medlineplus.gov/lab-tests/pulse-oximetry/ ; MedlinePlus, blood count, https://medlineplus.gov/ency/article/003642.htm ; American Diabetes Association, https://diabetes.org/about-diabetes/diagnosis?loc=db-slabnav

These sources must be available in the risks section, in the detail of each indicator and in the ORBITA AI library.

Do not invent information or present hypotheses as if they were official NASA results.

---

# 16. PROTOTYPE OPERATING RULES

The application must be functional, even without integration with real medical equipment.

In this first version:

- The automatic indicators will use simulated data.
- Environment data will use the real recorded file, with an optional "live" switch that is off by default.
- Manual data will be entered by the user.
- The form must save the records.
- The history must be updated.
- The charts must react to new records.
- Reminders must respect the defined periods.
- The body map must allow selecting the regions.
- ORBITA AI must answer using the local knowledge base.
- The menu must allow navigating between all pages.
- Gamification must update XP according to the tasks completed.

Use local storage to preserve data and allow the demonstration without depending on complex infrastructure. **The whole app works with the network turned off.**

All interactive elements must work.

Do not create decorative buttons with no action.

Do not simulate real connections to sensors or equipment when they are not implemented.

Clearly differentiate, with a badge on each reading (field `origem`):

| `origem` | Badge on screen |
| --- | --- |
| `simulada` | Simulated |
| `manual` | Recorded by you |
| `automatica` | Equipment (future integration) |
| `exame` | Lab exam |
| `historica` | Real recorded (date) |
| `ao_vivo` | Live |

And also the availability of each reading: "available", "recorded, awaiting transfer" or "sample collected, analysis on Earth". The engine only evaluates available readings.

Other rules:

- Every number appears with a unit, on screen, in the data and in the tests. Ranges in words: "60 to 100 bpm".
- Every time is stored in UTC (ISO 8601) and shown as "GMT day of year / hh:mm".
- ORBITA shows and points to the procedure, but does not replace the station alarm and does not command anything. Fire, depressurization and toxic atmosphere have their own ISS alarm: the app never says it detected these emergencies.
- Privacy: the Crew screen shows only what each person consented to share; the filter lives in the engine, before the screen.
- No medication, no dose, no diagnosis. Supportive language: "possible", "suggests", "compatible with".
- Interface text in English, in a dictionary (no fixed text scattered in the components).

The application is a monitoring and decision-support tool, not a medical diagnosis system.

---

# 17. NAVIGATION EXPERIENCE

The experience must be very simple.

The main flow must be:

**FIRST ACCESS**

ORBITA opening → Astronaut sign-up (M01) → Orbital animation (M02) → Overview (M03).

**DAILY USE**

Overview → Check of the automatic indicators and the environment → 2-minute daily assessment (M04) → Update of the records → Body map consultation (M05 and M06) → Alert detail, if any (M07).

**LOOKUP**

ORBITA icon or bottom bar → Side menu → ORBITA AI / Reports / Mission routine / Lab exams / Space risks / Mission: Health on Track / Sleep and Orbit glasses.

**MUTUAL CARE**

Menu → Crew (M16) → see who needs support → "Offer support" or "Call CMO".

**SHARED MONITOR AND PRESENTATION**

Screen of 1920 px or more (or the "Display mode" switch) → Mission panel (layout 2), no menu → "Full screen" button → station environment, whole crew and open alerts, with no scrolling.

**FOLLOW-UP**

Reports → Period selection → Chart viewing → Consultation of the changes.

The astronaut must be able to access the features without constantly having to return to the home screen.

---

# 18. TECHNICAL AND QUALITY REQUIREMENTS

Develop the project using a modern architecture suited to Lovable.

Preferably:

- React.
- Strict TypeScript.
- Tailwind CSS.
- Reusable components.
- Lucide Icons.
- Recharts for charts.
- Body map in SVG; Three.js or React Three Fiber only as an optional improvement, if there is time.

Do not make the architecture excessively complex.

Prioritize fast loading, good performance and smooth animations.

Responsiveness: define in `tailwind.config` the four breakpoints from section 1 (phone from 360 to 430 px, tablet from 768 to 1024 px, laptop from 1280 px and large screen from 1920 px) and test each screen at those sizes. The mission panel is tested at 1920 by 1080 with no scrolling.

Minimum organization:

- `src/domain/`: types with the data model names (`Leitura`, `Indicador`, `Alerta`, `Tripulante`, `indicadorId`, `origem`, `disponibilidade`, `compartilhamento`).
- `src/engine/`: pure calculation functions (baseline, z-score, EWMA, `regraCor` evaluation, cross-referencing rules, consent filter), with unit tests using the worked examples (z = 3.24) and the `exemplosTeste` from `indicadores.json`.
- `src/adapters/`: one adapter per source (simulator, real recorded file, manual entry). The adapter never decides color; it only delivers readings.
- `src/i18n/`: English dictionary.
- `public/config/`: `indicadores.json`, `orbita-ia-base.json` and `perfis-simulacao.json`, read at startup, with no network.
- Screen components do not calculate state: they receive the ready state from the engine.

Use independent components for:

- Sign-up.
- Orbital animation.
- Overview: personal panel and mission panel on a large screen, with the "Display mode" switch.
- Indicators and module environment.
- Manual assessments and quick tests.
- Lab exams.
- Body map.
- Region details.
- Indicator and alert detail.
- ORBITA AI.
- Reports.
- Routine.
- Gamification.
- Crew.
- Sleep and Orbit glasses.
- Side menu (drawer on the phone, fixed and collapsible on tablet and laptop) and bottom bar.

Persist the profile and the records in local storage, ensuring the user can close and open the application without losing data.

If it is not possible to fully implement some advanced feature, deliver a simplified but functional version, keeping the intended behavior and visual identity.

Do not leave empty pages, broken links or controls without functionality.

---

# 19. EXPECTED FINAL RESULT

I want a responsive web app that is complete in visual experience and navigation flow, with a futuristic and scientific identity: mobile first, good on tablet and laptop, and with the mission panel on a large screen.

ORBITA must look like software developed specifically for health monitoring on space missions, and not a conventional health application with a space identity applied superficially.

The interface must be minimalist, elegant and technological.

The highlights must be:

1. Personalized astronaut sign-up, with mission data and consent.
2. Exclusive ORBITA icon animation.
3. Overview with automatic indicators, module environment and personal assessment on the phone, and the mission panel (station environment, whole crew with consent and open alerts) on a large screen, legible from a distance and with no scrolling.
4. Interactive body map with 12 regions and the current state of each.
5. 5-level color code, with color, icon and word, no blinking and no sound.
6. Explainable alert: why, what to do, when to escalate and the source.
7. ORBITA AI working offline, with sources.
8. Reports with dynamic charts, baseline and sourced ranges.
9. Mission routine in GMT, respecting sleep.
10. Crew with consent and mutual care.
11. Gamification to encourage prevention, with no ranking.
12. Scientific library based on NASA references.

Final check before delivering:

- The story in section 14 runs from start to finish: three yellows, the "Possible effect of elevated CO2" alert with the four blocks, and the "Restore initial data" button repeats everything.
- The mission panel opens at 1920 by 1080 with no scrolling and no menu, and each screen works on the phone, the tablet and the laptop.
- No range number different from `indicadores.json`; every reading with unit, origin and data age.
- Nothing blinks, nothing sounds, no red without an alarm symptom, no colored "not shared".
- The app opens and works with the network turned off.

**MOST IMPORTANT GUIDELINE: DO NOT DEVIATE FROM THE STRUCTURE AND CONCEPT PRESENTED IN THIS PROMPT.**

Do not turn the project into an excessively complex platform. Do not add random modules. Do not overload the screens.

I want a visually very well executed product, with interactive features and a convincing presentation for the judges of the NASA Space Apps Challenge 2026.

Start by developing the visual identity and the navigation structure. Then implement the screens in the order P0, P1 and P2, keeping consistency across all of them.

**The result must be ORBITA: an intelligent health copilot for astronauts during space missions.**
