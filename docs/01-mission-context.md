# 01. Mission context

> Audience: the whole team, including people who have never studied space medicine, and whoever will present. It is the first domain document in the reading order ([`00-reading-guide.md`](00-reading-guide.md)); it takes about 15 minutes.
> Sources: [`../pesquisa/bruto/03-riscos-indicadores-limiares.md`](../pesquisa/bruto/03-riscos-indicadores-limiares.md) (hazards, HRP risks, condition inventory, mechanisms and escalation), [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), section 5 (routine, schedule, sleep and lighting), and [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), section D1 (onboard medical care) and excerpts from D2 (exercise and body mass). Each important fact carries the official link copied from the research. Labels such as [PAPER] and [INFERENCE] follow the legend in the reading guide.
> What is **not** here: the green, yellow and red thresholds. They live in [`03-indicators-and-thresholds.md`](03-indicators-and-thresholds.md), with sources. This document explains the why; `03` says how much.

---

## 1. The ISS in 2 minutes

The International Space Station (ISS) is where NASA (National Aeronautics and Space Administration) and its partners keep crews for months at a time. It is the source of the real data that our prototype imitates.

| What to know | Why it matters for Orbit Health |
| --- | --- |
| **Where it is.** In Low Earth Orbit (LEO). For NASA's Human Research Roadmap (HRR), a "long" LEO mission runs from 30 days to 1 year, a range that includes the 6-month and 12-month ISS stays ([HRR, architecture](https://humanresearchroadmap.nasa.gov/architecture/)). | It is the reference mission closest to current reality. |
| **How long people stay.** Sleep studies follow missions of roughly six months ([Flynn-Evans et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197/)) [PAPER], and NASA's reference medical schedule is written for 180 days ([OCHMO-STD-100.1A, Table 8](https://www.nasa.gov/wp-content/uploads/2024/09/ochmo-std-100-1a-rev-a-signed.pdf)). | The software needs a baseline and a trend spanning months, not just the day's reading. |
| **How many people.** The sources for this document do not fix how many crew members are aboard at the same time. The prototype sizes the general monitor (Monitor geral) for up to 7 people ([`07`](07-interface-design.md), T1b); number to be confirmed in an official source (section 9). | Defines how many cards fit on screen T1. |
| **What time it is.** The ISS lives on a 24-hour day in GMT (Greenwich Mean Time), equivalent to UTC (Coordinated Universal Time) in operational use ([NASA, ISS Operating an Outpost](https://www.nasa.gov/wp-content/uploads/2018/04/iss-operating_an_outpost-tagged.pdf)). | All data is stored in UTC and the top bar shows GMT ([`../AGENTS.md`](../AGENTS.md), rule 3). |
| **Day and night.** The station circles the Earth about 16 times a day; the crew sees 16 sunrises and 16 sunsets every 24 hours ([CSA, Sleeping in space](https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp); [ESA, An astronaut's rhythm](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts/An_astronaut_s_rhythm)). | The window is no clock. The body's rhythm depends on schedule, artificial light and routine; that is why night mode follows the clock, not the Sun. |
| **Two segments.** The research distinguishes the American segment (USOS, United States Orbital Segment), with the exercise devices ARED (Advanced Resistive Exercise Device, resistive exercise), CEVIS (Cycle Ergometer with Vibration Isolation and Stabilization, bicycle) and T2 (treadmill), from the Russian segment, with the BD-2 treadmill and the VELO cycle ergometer ([NASA, exercise](https://www.nasa.gov/missions/station/iss-research/astronaut-exercise/); [NASA, BD-2](https://gipoc.grc.nasa.gov/pims/pimsdocs/public/ISS%20Handbook/hb_vib_crew_BD-2_Treadmill_Exercise_2022-11-01.pdf)). Body mass is measured by the SLAMMD (Space Linear Acceleration Mass Measurement Device) or by the Russian mass meter (MMD, Mass Measurement Device) ([OCHMO-STD-100.1A](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf)). Records from the two sides have no demonstrated common format. | One adapter per source, and the original unit always stored ([`06`](06-data-model.md)). |
| **Noisy modules.** Measurements published in 2010 show typical noise of 56 to 69 dBA in the modules and 77 dBA near the treadmill, with use of ear protection ([NASA, Acoustic Issues](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20100031889.pdf)). It is a historical value, not a current measurement of each module. | Noise enters the module map (T5) and the sleep analysis (T6). |
| **Where people sleep.** Each person has an individual compartment, roughly the size of a phone booth, with a sleeping bag fixed to the wall, ventilation, light and a computer; earplugs and eye masks are common ([CSA](https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp)). | The sleeping cabin has its own noise and light, which the software cross-references with sleep. |
| **Earth is awake.** Mission Control (Johnson Space Center, Houston) operates 24 hours a day, 7 days a week, in shifts ([NASA Johnson](https://www.nasa.gov/johnson/jsc-mission-control-center/)). | On the ISS there is ground oversight at any hour; on Mars there will be no real-time conversation (section 7). |
| **Data does not arrive in a single stream.** The ISS has no single physiological stream: there is direct reading on the device, a file transferred by the crew member, manual entry in an application, a frozen sample for ground analysis and a voice conversation in a medical conference ([HRR, gap Med-07](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). | This is the problem Orbit Health solves: bringing everything into one place and showing the age of each piece of data. |

## 2. A day on the station

Reference schedule published by NASA ([ISS Operating an Outpost](https://www.nasa.gov/wp-content/uploads/2018/04/iss-operating_an_outpost-tagged.pdf)), with the time reservations from the NASA-STD-3001 standard ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)):

| GMT time (approximate) | What happens |
| --- | --- |
| 06:00 | Wake up. The standard reserves 1.5 hours after waking for transition and personal routine. |
| 08:00 | Start of work: experiments, maintenance, planning and conferences with the ground. |
| Throughout the day | Meals, personal time and the exercise block, about 2 hours on the schedule, counting preparation, equipment changeover and hygiene ([NASA ASCR](https://www.nasa.gov/directorates/esdmd/hhp/astronaut-strength-conditioning-and-rehabilitation/)). |
| 17:00 | End of work. |
| 19:30 (our calculation: 2 h before sleep) | The 2-hour pre-sleep period reserved by the standard begins. |
| 21:30 | Start of the sleep window, which runs until 06:00: exactly the recommended 8.5 hours. |

The schedule of each day varies. The 21:30 to 06:00 window is a contemporary ISS reference, not a guarantee for every mission or person ([NASA, Sleep Shifting](https://ntrs.nasa.gov/citations/20240002094)).

### 2.1 Scheduled sleep is not slept sleep

NASA-STD-3001 recommends an **8.5-hour sleep opportunity** and asks that planning avoid critical tasks during nominal sleep and minimize operations during the biological night ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)). In practice, the crew sleeps considerably less:

| Study | Who and how | Result |
| --- | --- | --- |
| [Barger et al., 2014](https://pubmed.ncbi.nlm.nih.gov/25127232/) [PAPER] | 21 astronauts on 13 expeditions, actigraphy (a wrist watch that estimates sleep from movement) | 6.09 ± 0.67 h per night in flight, versus 6.95 ± 1.04 h in the first week after returning. 12 of 16 astronauts (75%) used sleep medication at least once; this is a proportion of people, not of nights. |
| [Flynn-Evans et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197/) [PAPER] | 24 astronauts, missions of about 6 months, self-report | 6.5 ± 1.4 h per night; only on 5.9% of nights did they sleep within the scheduled 8.5 h. Less sleep came with worse neurobehavioral function and more stress. |

Summary for the presentation: the schedule offers 8.5 hours and the crew sleeps on average 6 to 6.5 hours, about 2 hours less (our calculation). The numbers describe the groups studied, not each person's normal: the software never automatically paints "6 h" green. The Actiwatch Spectrum Plus is used in flight to estimate sleep from movement and light ([NASA, Sleep on Station](https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023/)). The historical use of medication does not authorize Orbit to suggest any drug, dose or melatonin; there is no primary source for routine melatonin use on board ([NASA, Fatigue Countermeasures Laboratory](https://www.nasa.gov/human-systems-integration-division/human-performance/fatigue-countermeasures-laboratory/)).

### 2.2 When a spacecraft arrives: sleep shifting

In a 2024 NASA study of 19 crew members wearing a wrist accelerometer, 8 people had 11 episodes of **split sleep** around the arrival, relocation or departure of visiting vehicles. Time in bed averaged 2.89 hours in the first chunk and 4.30 hours in the second ([Jansen et al., NASA NTRS](https://ntrs.nasa.gov/citations/20240002094)). It is an operational exception, not a shift schedule.

### 2.3 Does everyone sleep at the same time?

> **As a rule, yes.** The crew has a nominal day aligned to GMT and a jointly planned sleep window; there is no permanent rotating night shift as the standard. Vehicle arrivals, launches, landings, dockings, vehicle relocation, extravehicular activity (EVA) and contingencies may require a schedule change or split sleep. While the crew sleeps, Mission Control continues in shifts ([ESA](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts/An_astronaut_s_rhythm); [NASA, Sleep Shifting](https://ntrs.nasa.gov/citations/20240002094); [NASA Mission Control](https://www.nasa.gov/johnson/jsc-mission-control-center/)).

Consequence for the product: at night, the Monitor geral shows almost everyone asleep, and "vehicle arrival" enters as a critical activity in scenario C4 ([`05`](05-software-architecture.md), section 3.3).

### 2.4 Light as a countermeasure

The Solid State Lighting Assembly (SSLA) replaced fluorescent lamps with LEDs of adjustable intensity and spectrum, in three reference modes: 4500 K for general lighting, blue-enriched 6500 K for alertness or for shifting the biological clock, and low-blue 2700 K before sleep. In the Lighting Effects study, pre-sleep was described as 2700 K at up to 50 lux ([NASA, Lighting Effects](https://ntrs.nasa.gov/api/citations/20160006727/downloads/20160006727.pdf); [NASA, SSLA](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20160005080.pdf)). It is the same reasoning as the amber night mode ([`07`](07-interface-design.md), section 5.1) and the soundscape of the glasses. Note: light is an existing countermeasure; this does **not** prove that Orbit sounds improve sleep.

## 3. Who looks after health

### 3.1 The system: CHeCS

The Crew Health Care System (CHeCS) is the set of health hardware, supplies and software on the ISS, in three parts ([NASA, ISS Familiarization, section 14](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf)):

| Part | Purpose |
| --- | --- |
| HMS, Health Maintenance System | Prevent, assess and treat illness and injury: medical kits, drugs, vital signs, ECG (electrocardiogram), ultrasound and in-flight exams. |
| EHS, Environmental Health System | Chemical and microbiological quality of air, water and surfaces. |
| CMS, Countermeasures System | Exercise: assess fitness, prescribe and monitor (ARED, treadmill, cycle ergometer, heart rate and blood pressure monitors). |

None of the three parts is a continuous sensor that gathers all exams. On board there is also an advanced life support pack, an ambulatory pack, respiratory support, an automated external defibrillator and a kit with drugs, a blood pressure monitor, a glucometer, an oximeter, a thermometer and a visual acuity chart ([NASA, CHeCS list](https://ntrs.nasa.gov/api/citations/20100022009/downloads/20100022009.pdf?attachment=true); [NASA, Expedition 55 kit](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf)). Details of each device in [`02-equipment-and-data.md`](02-equipment-and-data.md).

### 3.2 The people

| Who | Where | What they do |
| --- | --- | --- |
| **CMO** (Crew Medical Officer) | On board | Crew member designated as medical caregiver. **Does not need to be a physician.** Examines and treats colleagues with trained equipment and procedures, following the flight surgeon ([NASA-STD-3001 Vol. 1, V1 5003](https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf)). Published training varies: about 25 h pre-flight in one source ([NASA, CMO training](https://ntrs.nasa.gov/api/citations/20240001015/downloads/Med%20Ops%20Crew%20Training%20%20Ground%20Support%20Training.pdf)), 7 to 13 h in another, depending on prior experience ([NASA, EIMO](https://ntrs.nasa.gov/api/citations/20240000152/downloads/EIMO_TIM_TRAINING_MeetingSummary_FINAL.pdf)); they are different cuts, do not add them. |
| **Flight surgeon** (Flight Surgeon) | Houston | Clinical lead, with a Deputy Flight Surgeon on the Flight Medicine team. Considers clinical condition, recent data, physical readiness and task, and assesses the crew member before each EVA, requirement V1 6006 ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/); [NASA, Health and Medical Care](https://www.nasa.gov/reference/3-0-health-and-medical-care/)). |
| **BME** (Biomedical Engineer) | Mission Control | Technical and operational support for CHeCS ([NASA, Biomedical Flight Controllers](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/)). |
| **BHP** (Behavioral Health and Performance) | Ground | Behavioral health professional who conducts the private psychological conference. |
| **International Medical Group** | Ground | Interface between medical operations and flight control; the Crew Surgeon coordinates and the medical team holds clinical authority ([OCHMO-TB-044](https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf)). |

### 3.3 Private conversations

- **PMC (Private Medical Conference), weekly.** Daily in the first 5 days after docking, then weekly, lasting about 15 minutes, plus calls before and after EVA and near return. It tracks well-being, sleep, diet, symptoms and questions. It is an interview, not continuous telemetry ([OCHMO-STD-100.1A](https://www.nasa.gov/wp-content/uploads/2024/09/ochmo-std-100-1a-rev-a-signed.pdf); [NASA, Crew Health Consoles](https://www.nasa.gov/podcasts/houston-we-have-a-podcast/mission-control-crew-health-consoles/)). The periodicity is set by the flight surgeon and real-time communication is preferred, requirement V1 6002 ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)).
- **PPC (Private Psychological Conference), every 14 days**, with the BHP professional; the frequency can be adjusted ([OCHMO-STD-100.1A](https://www.nasa.gov/wp-content/uploads/2024/09/ochmo-std-100-1a-rev-a-signed.pdf)).
- **Privacy is a requirement.** Medical and psychological information sent to the ground is private, requirements V1 6003 and V1 6011 ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)). That is why the Monitor geral never shows conference, diary or questionnaire content ([`../AGENTS.md`](../AGENTS.md), rule 9).

### 3.4 Exam schedule (example of a 180-day mission)

Synthesis of Table 8 of [OCHMO-STD-100.1A](https://www.nasa.gov/wp-content/uploads/2024/09/ochmo-std-100-1a-rev-a-signed.pdf), a standard from the OCHMO (Office of the Chief Health and Medical Officer, NASA's chief medical office). It is an example, not a guaranteed schedule. Legend: L = launch, FD = Flight Day, R = return (R-30 is 30 days before return; R+3, 3 days after).

| Window | What happens |
| --- | --- |
| L-180 to L-90 | Clinical baseline, fitness and samples; actigraphy in 2-week blocks; vision, hearing, oral health and sleep. |
| L-90 to L-1 | Aerobic capacity test, eyes, hearing and pre-launch physical exam. |
| FD1 to FD7 | Daily PMC for the first 5 days after docking; weekly afterwards. |
| First week and monthly | Body mass and nutritional assessment. |
| FD14, FD75 and FD165 | Aerobic capacity test; at FD14, also a health assessment by the CMO. |
| Up to FD21, then every 3 months | On-orbit hearing assessment (OOHA, On-Orbit Hearing Assessment) ([NTRS version](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf)). |
| FD30, FD90, every 90 days and R-30 | SANS eye exams: vision, retinal photo, OCT (Optical Coherence Tomography), ocular ultrasound and tonometry ([OCHMO-MTB-001](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)). |
| FD30 and near R-30 | Spaceflight Standard Measures, the HRP standardized research: cognition, immunity, blood and urine, sleep ([NASA NTRS, Standard Measures](https://ntrs.nasa.gov/citations/20230014025)). |
| Every 14 days | PPC. |
| Daily and weekly | Daily intake log in the ISS FIT (Food Intake Tracker); weekly diet questionnaire; strength and conditioning tracked at least every 30 days. |
| R-14 to R+14 | Aerobic test before and after; after landing, hearing at R+3, aerobic at R+5, daily posture until stable and bone densitometry (DXA). |

The published table also lists FD255, a date that does not fit a 180-day mission; it is an inconsistency in the example itself.

## 4. The five hazards (RIDGE)

The Human Research Program (HRP, NASA's human research program) organizes health risks into five hazards, acronym **RIDGE**: Radiation, Isolation and confinement, Distance from Earth, Gravity fields and Hostile/closed environments ([HRR, Evidence](https://humanresearchroadmap.nasa.gov/Evidence/)).

### 4.1 R: Radiation

| Question | Answer |
| --- | --- |
| What it is | Ionizing radiation: galactic cosmic rays, solar particles and trapped radiation. It can cause cell damage, cancer and effects on organs and the nervous system ([NASA-STD-3001 Vol. 1, ch. 4](https://www.nasa.gov/reference/4-0-human-performance/)). |
| Concrete example | A solar particle event can raise the dose quickly; day to day, the dose accumulates over an entire career. |
| What it depends on | Orbit, shielding, solar activity and location inside the vehicle. |
| What can be monitored | Accumulated and event dose, official solar alerts, time in shelter. A wearable alone does not measure the biological risk, and symptoms do not reliably estimate dose. |

### 4.2 I: Isolation and confinement

| Question | Answer |
| --- | --- |
| What it is | A small group, with limited privacy and social contact for months or years. Affects mood, sleep, cooperation, cognition and behavior ([HRR, Evidence](https://humanresearchroadmap.nasa.gov/Evidence/)). |
| Concrete example | Work schedule, light, noise and routine changes can reduce sleep; fatigue increases attention lapses; under stress, team communication can worsen. |
| What can be monitored | Sleep, confidential self-report, workload and psychosocial indicators, always with context and privacy protection. |

### 4.3 D: Distance from Earth

| Question | Answer |
| --- | --- |
| What it is | The farther away, the greater the delay and interruption of communication; rapid evacuation and resupply cease to exist and medical care needs autonomy ([HRR, risk Medical Conditions](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). |
| Concrete example | On Mars, a question to the doctor and the answer can take 8 to 48 minutes just for the signal round trip (section 7). |
| What can be monitored | Communication status, medical inventory and crew capability. The software must remain useful while disconnected. |

### 4.4 G: Gravity fields

| Question | Answer |
| --- | --- |
| What it is | Microgravity, transitions and partial gravity (Moon, Mars) alter fluids, bone, muscle, balance, motor control and tolerance on return to gravity ([NASA, OCHMO Technical Briefs](https://www.nasa.gov/ochmo/hsa-standards/ochmo-technical-briefs/)). |
| Concrete example | Puffy face and thin legs right at the start of flight; bone losing density month after month; near vision changing (SANS); dizziness on standing after landing. |
| What can be monitored | Vital signs, functional tests, exercise load, vision, balance symptoms and hydration, always tied to the mission phase. |

### 4.5 E: Hostile and closed environments

| Question | Answer |
| --- | --- |
| What it is | The cabin and the suit are closed systems: pressure, air composition, noise, temperature, contaminants and limited resources. Environmental failure is an acute risk; chronic exposure also affects health ([NASA-STD-3001 Vol. 2, ch. 6](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/)). |
| Concrete example | ISS data associated higher CO2 with headache ([OCHMO-TB-004](https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/)); fans and pumps make noise all day; EVA exposes crew to decompression sickness. |
| What can be monitored | Validated environmental sensors and symptoms. A condition outside the vehicle's limits triggers the station's own alarm. |

## 5. What happens to the body (expanded list of pain points)

The initial document ([`../pesquisa/documento-inicial.md`](../pesquisa/documento-inicial.md), tab "Pain points and relievers") had 15 pain points and asked for the list to be expanded. Five of them (Space radiation, Isolation and confinement, Distance from Earth, Gravity fields, Hostile and closed environments) are the RIDGE hazards themselves and became the groups below. The other ten are marked in the "On the list?" column:

- **Original**: was on the initial list (the original name in quotes when it changed).
- **Splits out**: new item that details an original item.
- **New**: added by the research.

The "T2 region" column uses the ids of the human figure ([`07`](07-interface-design.md), section 4). The "When it appears" windows are surveillance windows, consistent with the literature and protocols, not predictions for one person ([research, D3](../pesquisa/bruto/03-riscos-indicadores-limiares.md)). A clinical item does not automatically become a formal HRP risk.

### 5.1 Radiation

| Condition | On the list? | What it is | When it appears | T2 region |
| --- | --- | --- | --- | --- |
| Radiation-induced cancer | New | Genetic damage that raises lifetime cancer risk; depends on dose, organ, age, sex and risk model, not on symptoms ([HRR i=96](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=96)). | Years later: it is a future risk from the accumulated dose. | `corpo` |
| Acute radiation syndrome in a solar event | New | A large, fast exposure can affect bone marrow, skin and lens; triage comes from the event dosimetry and the doctor, not from self-diagnosis ([V1, ch. 4](https://www.nasa.gov/reference/4-0-human-performance/)). | Acute: accompanies a solar particle event, which can be fast. | `corpo` |
| Effects on the heart and vessels | Splits out "Vascular problem" | NASA limits the dose to the circulatory system because of non-cancer effects; it is exposure protection, not a prediction of individual disease ([V1 Rev C](https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf)). | Long term, from accumulated dose. | `coracao` |
| Effects on the central nervous system | New | Radiation, microgravity, sleep and stress can add up in their effects on cognition; there is no validated short test that attributes a deficit to radiation in flight ([HRR i=96](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=96)). | Accumulates during the mission. | `cerebro` |

### 5.2 Isolation and confinement

| Condition | On the list? | What it is | When it appears | T2 region |
| --- | --- | --- | --- | --- |
| Behavioral and psychiatric conditions | Original ("Emotional problems") | Isolation, confinement, workload and sleep can affect mood, anxiety, cognition and functioning; scales serve for trends and confidential screening, not for diagnosis ([HRR i=99](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=99)). | Over months of isolation, with no fixed clock. | `cerebro` |
| Team conflicts and psychosocial adaptation | New | Cooperation, communication and coordination can worsen under stress; the risk is collective and cannot be taken from an individual scale ([HRR i=101](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=101)). | Throughout the mission. | `cerebro` |
| Sleep loss and circadian misalignment | New | Schedule, light, noise, stress and routine change shorten sleep or shift the biological clock; fatigue increases attention lapses ([HRR i=100](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=100)). | From the first bad night; chronic deprivation accumulates. | `cerebro` |
| Cognitive and performance changes | New | Attention, working memory, reaction time and decision-making change with sleep, stress, illness, workload and environment; only noticeable by comparing with the baseline ([HRR i=99](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=99)). | As early as the day after a bad night. | `cerebro` |

### 5.3 Distance from Earth

| Condition | On the list? | What it is | When it appears | T2 region |
| --- | --- | --- | --- | --- |
| Limited onboard medical capability | New | Small team, limited supplies and delayed communication to assess, treat and stabilize; it is a system risk, in addition to the clinical condition ([HRR i=175](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=175)). | Any time; weighs more the farther from Earth (section 6). | None (mission context) |
| Medication failure or toxicity | New | Shelf life, temperature, radiation, packaging and body changes can reduce efficacy or increase adverse effects ([HRR i=177](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=177)). | Depends on the drug, the batch and storage. | None (medication log) |
| Tooth, injury and acute illness | New | Toothache, infection, trauma or illness may require intervention far from an office and without rapid evacuation ([HRR i=95](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). | Any time (acute). | `corpo` |

### 5.4 Gravity fields

| Condition | On the list? | What it is | When it appears | T2 region |
| --- | --- | --- | --- | --- |
| Fluid changes: puffy face and "bird legs" | Splits out "Vascular problem" | Without gravity, the body's fluid moves up to the head and trunk: the face swells and the legs thin. Congestion and headache can also come from CO2 ([OCHMO-MTB-001](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)). | Early, right at the start of flight. | `coracao` |
| SANS (spaceflight-associated neuro-ocular syndrome) | Original ("SANS risk") | Optic disc edema, retinal folds, globe flattening and change in refractive error. The NASA brief points to about 70% with some sign and about 18% clinically concerning; a cohort of 64 astronauts found 81% ([OCHMO-MTB-001](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf); [NASA/ESA cohort](https://pmc.ncbi.nlm.nih.gov/articles/PMC13462731/)). | During long missions; exams at FD30, FD90 and then every 90 days. | `olhos` |
| Bone loss and fracture risk | Original ("Osteoporosis") | Without load, bone loses density, especially in the hip and spine. Reported average of about 1 to 1.5% per month, a literature description and not a threshold ([NASA NTRS](https://ntrs.nasa.gov/citations/20150010417)). The active risk is called fracture; "osteoporosis" is a historical name ([HRR i=77](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=77)). | Months of flight. | `ossos` |
| Loss of muscle, strength and aerobic capacity | Original ("Motor functions") | Less load reduces strength, endurance and VO2max (maximal oxygen uptake); some historical series observed a loss of 10 to 30% of aerobic capacity ([V1, ch. 4](https://www.nasa.gov/reference/4-0-human-performance/); [HRR i=180](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=180)). | Accumulates during the mission; shows up more in testing, EVA and return. | `musculos` |
| Space motion sickness and sensorimotor change | Original ("Motor functions") | Conflict between the inner ear, vision and body perception can cause nausea, malaise, disorientation and temporary worsening of motor tasks ([HRR i=88](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=88)). | During adaptation to flight and on return to gravity. | `digestao` (sickness) and `cerebro` |
| Cardiovascular adaptation and arrhythmias | Original ("Vascular problem") | Deconditioning, fluid redistribution and radiation affect the heart; a rhythm change requires a professional, and there is no generic NASA threshold that diagnoses arrhythmia ([HRR i=179](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=179)). | Evolves over the mission. | `coracao` |
| Orthostatic intolerance | Splits out "Vascular problem" | On return to gravity, changes in the heart and circulating blood volume can cause dizziness, near-fainting or fainting on standing ([HRR i=179](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=179)). | On return. | `coracao` |
| Spaceflight anemia | New | Increased destruction of red blood cells (hemolysis): mean hemoglobin fell 8.8% four days after landing and 5 of 13 astronauts reached clinical anemia, in a small sample ([Trudel et al., 2022](https://www.nature.com/articles/s41591-021-01637-7)) [PAPER]. | Measured after landing in the study; track as a time series. | `sangue` |
| Kidney stone | New | Calcium released from bone, salt, little water and little urine can favor crystal formation; flank pain, blood in the urine or difficulty urinating call for a doctor ([HRR i=81](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=81); [OCHMO-MTB-003](https://www.nasa.gov/ochmo-mtb-003-urinary-health-2/)). | No fixed clock; depends on urine and hydration. | `rins` |
| Low back pain and spine lengthening | New | The discs decompress, height temporarily increases and there may be back pain; the concern about disc injury is marked inactive in the HRP ([HRR, Evidence](https://humanresearchroadmap.nasa.gov/Evidence/); [NASA NTRS](https://ntrs.nasa.gov/citations/20240005190)). | During flight and on return to gravity. | `musculos` |
| Reconditioning after return | New | Strength, balance, mobility and postural tolerance may remain reduced after landing; recovery is monitored by professionals ([V1, ch. 3](https://www.nasa.gov/reference/3-0-health-and-medical-care/)). | Days or more after landing. | `musculos` |

### 5.5 Hostile and closed environments

| Condition | On the list? | What it is | When it appears | T2 region |
| --- | --- | --- | --- | --- |
| Hypoxia | Original | Low partial pressure of O2 in the breathed air affects oxygenation, cognition, sleep and performance. The environmental limit is not the same thing as the person's oxygen saturation (SpO2) ([HRR i=173](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=173)). | Acute, after an environmental failure. | `pulmoes` |
| High CO2 and headache | New | ISS data associated CO2 exposure with headache; a cognitive effect is possible, with no established individual cutoff ([OCHMO-TB-004](https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/)). | Hours to days (NASA works with 1-hour and 7-day averages). | `pulmoes` and `cerebro` |
| Depressurization and decompression sickness | Original ("Decompression sickness") | Pressure change, especially in EVA, can form gas bubbles in the body (DCS, Decompression Sickness), with joint, neurological or cardiopulmonary symptoms ([HRR i=168](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=168)). | Acute, tied to EVA and decompression. | `corpo` |
| Dust from the Moon and other bodies | New | Particles can irritate or injure eyes, skin and lungs; toxicity varies with composition ([HRR i=82](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=82)). | During and after surface activity; does not apply to the ISS. | `pulmoes`, `olhos` and `pele` |
| Cabin toxicants and contaminants | New | Combustion products, volatile organic compounds, gases and cabin materials can irritate or poison depending on concentration and duration ([V2, ch. 6](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/)). | Acute after a failure or combustion, or through prolonged exposure. | `pulmoes` |
| Microorganisms and host-microbe interaction | Original ("Microorganisms") | Cabin and crew microbes interact with immunity, skin and mucous membranes ([HRR i=80](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=80)). | Continuous, throughout the mission. | `sangue` and `pele` |
| Immune changes and inflammation | Original ("Immune system") | Immune cells and function change with flight, stress, exercise, sleep, nutrition and infection; there is no single NASA range to judge an isolated result ([HRR i=85](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=85)). | During the mission. | `sangue` |
| Reactivation of latent viruses | Splits out "Immune system" | Viruses that already lived in the body (EBV, VZV and CMV: Epstein-Barr, varicella-zoster and cytomegalovirus) can be detected again in saliva; detecting is not the same as being sick ([HRR i=85](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=85)). | During the mission; requires serial samples. | `sangue` |
| Food, hydration and body mass | Original ("Food and nutrition") | Eating and drinking too little affects energy, recovery, bone, immunity and work; appetite, limited menu and heavy schedule weigh in. The need is individual, with no universal percentage of weight loss ([HRR i=176](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=176)). | Varies day to day; what matters is the trend. | `digestao` and `rins` |
| Noise-induced hearing loss | New | Accumulated noise harms hearing; the 24-hour criterion uses dose, and an isolated dBA reading is not a daily dose ([V2, ch. 6](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/)). | Cumulative, day after day. | `ouvidos` |
| Skin and nails | New | Pressure, humidity, friction, microtrauma and dust can affect skin and nails; a photo documents the evolution but does not diagnose ([HRR i=95](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). | Any time. | `pele` |
| Hand and nail injuries in EVA | New | Pressurized gloves and repetitive work can cause pain, swelling, bruising or nail injury ([HRR i=84](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=84)). | During or after EVA. | `pele` and `musculos` |
| Dynamic loads and injuries | New | Acceleration, vibration, landing, cargo handling and suited tasks can cause injury ([HRR i=167](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=167)). | Launch, landing and tasks with cargo. | `musculos` and `ossos` |
| Human-system interaction error | New | Interfaces, alarms, automation and procedures can induce error; the standard asks for error detection and recovery ([V2, ch. 6](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/); [HRR i=175](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=175)). | Any time. | None: applies to the software itself, which must show the source, time and confidence of the data. |

**Expansion scoreboard:** 15 pain points on the initial list became 5 groups and 36 conditions: 11 original rows, 4 splits and 21 new ones. Notes:

- **"Vascular problem"** was split into four rows because it bundles different causes; the research also cites thrombosis as a possible cause, without its own row ([research, classification notes](../pesquisa/bruto/03-riscos-indicadores-limiares.md)).
- **Spaceflight anemia** was grouped under gravity by us; the research does not assign a RIDGE hazard to it.
- **Correction of numbers from the initial document.** The initial text said "70% to 81%" with SANS signs, "15% to 20%" clinically concerning and "47% to 48% of eyes" needing optical correction. The research corrected this: 70% and about 18% come from the NASA brief; 81% comes from another cohort, of 64 astronauts, with different methods; and 48.2% (27 of 56 eyes) was a mean **hyperopic shift** of +0.12 diopter in one sample, not a need for new glasses ([study](https://pubmed.ncbi.nlm.nih.gov/40194644/)). The NASA brief reports a refractive change of at least 0.75 diopter in about 15% of eyes and no crew member with incurable vision loss in that survey ([OCHMO-MTB-001](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)).

## 6. The HRP risk portfolio

The portfolio consulted by the research has 21 active risks in the HRR. Each one receives an **LxC** score (likelihood × consequence), approved by the Human System Risk Board (HSRB) for each design reference mission (DRM) ([HRR, architecture](https://humanresearchroadmap.nasa.gov/architecture/); [HSRB risk matrix](https://ntrs.nasa.gov/api/citations/20240009961/downloads/AIB_Intro_IMEA.pdf)).

> **LxC is program risk, not a clinical traffic light.** It answers "how likely and how severe is this problem for a mission of type X", looking at the crew and current countermeasures. It does not say whether crew member A is well today, and it does not authorize painting green, yellow or red from it ([HRR, architecture](https://humanresearchroadmap.nasa.gov/architecture/)). The software's colors come from [`03`](03-indicators-and-thresholds.md).

How to read: 5 by 5 matrix; the first number is likelihood and the second is consequence, the higher the worse. Each cell carries two pairs: **OPS** (impact on mission operations) / **LTH** (Long-Term Health). Long LEO runs from 30 days to 1 year and does not separate 6-month and 12-month ISS stays; preparatory Mars is under 1 year; planetary Mars runs from 730 to 1224 days.

| Risk (short title in the HRR) | In English | Long LEO (ISS) | Long Moon (orbit and surface) | Preparatory Mars | Planetary Mars | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| [Medical Conditions](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95) | Medical conditions in mission | 4x2 / 4x2 | 5x4 / 4x4 | 5x4 / 4x4 | 5x4 / 5x4 | 05/2021 |
| [Pharm](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=177) | Ineffective or toxic medications | 1x1 / 1x1 | 4x2 / 2x2 | 4x3 / 3x2 | 5x3 / 5x3 | 12/2021 |
| [Renal Stone](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=81) | Kidney stone | 3x4 / 2x3 | 3x4 / 2x3 | 3x4 / 3x4 | 4x4 / 4x4 | 04/2022 |
| [Dynamic Loads](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=167) | Injuries from dynamic loads | 4x3 / 3x2 | 4x4 / 4x4 | 4x3 / 3x2 | 4x4 / 4x4 | 12/2023 |
| [DCS](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=168) | Decompression sickness | 2x2 / 2x1 | 5x3 / 2x1 | 2x2 / 2x1 | 5x3 / 2x1 | 07/2023 |
| [Food and Nutrition](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=176) | Inadequate food and nutrition | 5x2 / 3x2 | 5x4 / 4x3 | 5x4 / 5x3 | 5x5 / 5x3 | 07/2022 |
| [Hypoxia](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=173) | Hypoxia | 3x2 / 2x2 | 3x3 / 2x2 | 3x3 / 2x2 | 3x3 / 2x2 | 11/2022 |
| [Bone Fracture](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=77) | Fracture from bone changes | 1x2 / 2x2 | 3x3 / 4x2 | 2x2 / 4x2 | 4x4 / 5x2 | 05/2022 |
| [Immune](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=85) | Altered immune response | 4x2 / 4x1 | 4x3 / 4x2 | 4x3 / 4x2 | 4x3 / 4x2 | 11/2023 |
| [SANS](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105) | Neuro-ocular syndrome | 4x3 / 4x3 | 4x3 / 4x3 | 4x3 / 4x3 | 4x4 / 4x5 | 07/2022 |
| [Fitness](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=180) | Reduced physical fitness | 5x1 / 5x2 | 5x3 / 5x2 | 5x2 / 5x2 | 5x4 / 5x3 | 04/2024 |
| [Sleep](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=100) | Sleep loss, rhythm and overload | 5x2 / 3x1 | 5x2 / 3x1 | 5x2 / 4x2 | 5x2 / 4x2 | 03/2022 |
| [Dust](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=82) | Dust from celestial bodies | Not applicable | 3x3 / 3x4 | Not applicable | 4x4 / 4x4 | 03/2024 |
| [EVA](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=84) | EVA injuries and performance | 4x2 / 5x2 | 5x4 / 5x2 | 4x3 / 5x2 | 5x4 / 5x2 | 12/2023 |
| [Carcinogenesis](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=96) | Radiation cancer (old 3x4 matrix) | 1x1 / 3x2 | 1x1 / 3x2 | 1x1 / 3x3 | 1x1 / 3x3 | Current 5x5 score NOT FOUND |
| [Cardiovascular](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=179) | Cardiovascular adaptations | 4x3 / 1x2 | 4x3 / 1x2 | 4x3 / 1x2 | 4x4 / 2x4 | 05/2024 |
| [Behavioral Health](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=99) | Behavioral health and cognition | 5x2 / 2x3 | 5x2 / 2x3 | 5x3 / 2x3 | 5x3 / 2x5 | 07/2024 |
| [Team](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=101) | Team cooperation and communication | 4x2 / N/A | 5x3 / N/A | 5x4 / N/A | 5x5 / N/A | 04/2024 |
| [EIHSO](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=175) | Operating independently of Earth | 5x2 / N/A | 5x3 / N/A | 5x4 / N/A | 5x5 / N/A | 02/2023 |
| [Microhost](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=80) | Host-microorganism interaction | 2x3 / 2x2 | 2x3 / 2x2 | 2x3 / 2x2 | 4x3 / 4x3 | 12/2024 |
| [Sensorimotor](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=88) | Sensorimotor and vestibular function | 1x2 / 2x2 | 3x5 / 2x2 | 1x2 / 1x2 | 4x5 / 2x2 | 11/2024 |

Reading cautions:

- The scores were approved on different dates; they are not a snapshot of the same moment.
- **Carcinogenesis** still uses the old 3 by 4 matrix; do not compare it with the 5 by 5 rows.
- **Behavioral Health:** the Evidence Report shows 2x2 in the LTH of long LEO, and the risk page shows 2x3; the table follows the page, with the divergence to be confirmed ([Evidence Report](https://humanresearchroadmap.nasa.gov/Evidence/other/HRP-ER-BMED-HFBP-20250210.pdf)).
- **Team and EIHSO** have N/A in LTH in the HRR itself; long-term effects sit in other risks.
- **EIHSO is not EIMO.** EIHSO (Earth Independent Human-Systems Operations) is the risk of operating without Earth; EIMO (Earth Independent Medical Operations) is the medical concept in section 7.
- **Idea for the presentation:** risks grow with distance. Medical Conditions goes from 4x2 on the ISS to 5x4 on Mars; Team and EIHSO go from 4x2 and 5x2 to 5x5.

## 7. From the ISS to Mars

| Aspect | ISS today | Mars |
| --- | --- | --- |
| Communication delay | Real-time medical conversation is preferred (V1 6002) and Mission Control operates 24 hours ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)). | 4 to 24 minutes one way, or 8 to 48 minutes for question and answer, depending on orbital distance ([NASA, Space Communications](https://www.nasa.gov/missions/tech-demonstration/space-communications-7-things-you-need-to-know/)); NASA analyses point to about 4 to 22 minutes ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20240011265/downloads/12-3-24%2020240011265.pdf?attachment=true)). |
| Periods without contact | Not addressed in the sources for this document. | Windows and blackouts that depend on mission architecture and solar alignment ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20240011265/downloads/12-3-24%2020240011265.pdf?attachment=true)). |
| Evacuation | The standard requires the ability to take the patient to a higher level of care (V1 3007), but return depends on vehicle, orbital dynamics and resources ([NASA, Health and Medical Care](https://www.nasa.gov/reference/3-0-health-and-medical-care/)). | Distance prevents rapid evacuation and resupply ([HRR i=95](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). |
| Who decides in an emergency | The ground medical team holds clinical authority and coordinates with flight control ([OCHMO-TB-044](https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf)). | The urgent decision must be made on board, with the mission procedures; the ground enters store-and-forward mode ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)). |
| CMO training | 7 to 13 h or about 25 h, depending on the source (section 3.2). | Proposals of 80 to 120 h were discussed for missions with more autonomy; it is not the nominal training ([NASA, EIMO](https://ntrs.nasa.gov/api/citations/20240000152/downloads/EIMO_TIM_TRAINING_MeetingSummary_FINAL.pdf)). |

**Earth Independent Medical Operations (EIMO)** is the crew's capability to recognize, prevent, assess and treat conditions with growing autonomy. NASA is studying a Clinical Decision Support System (CDSS) that would combine passive and active monitoring with real-time local guidance; the publication is feasibility research, not a certified autonomous medical system ([NASA Ames, CDSS for EIMO](https://www.nasa.gov/centers-and-facilities/ames/ames-science/ames-space-biosciences/a-clinical-decision-support-system-for-earth-independent-medical-operations/); [HRR i=175](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=175)).

**Why this justifies offline software that explains the data to the crew itself:**

1. **With no immediate answer from Earth, the first reading is the crew's.** With 8 to 48 minutes round trip, the astronaut needs to understand alone what the number means and what to do now.
2. **The CMO is not a physician.** They need organized evidence, local procedures and a ready summary, not raw data scattered across several devices.
3. **Nothing can depend on a network.** The research recommends versioned local procedures, a symptom form, a safe queue to synchronize later and states that show the contact mode: "with real-time support", "store and forward" or "no contact" [INFERENCE from the research, based on the delay and the EIMO concept] ([research, D6](../pesquisa/bruto/03-riscos-indicadores-limiares.md)).
4. **Explaining builds trust and prevents error.** The human-system interaction risk itself asks that the software show the source, time and confidence of the data (section 5.5).

## 8. How this becomes our software

The thresholds for each indicator are in [`03`](03-indicators-and-thresholds.md); the cross-referencing rules, in [`04`](04-data-cross-referencing.md); the screens, in [`07`](07-interface-design.md).

1. **Radiation → screen T5 and region `corpo`.** Dose rate, accumulated dose and space weather; scenario C2 (rule R-RAD-01). The software shows and explains; the shelter decision belongs to mission control, and symptoms never estimate dose.
2. **Isolation, individual side → check-in T3, sleep T6 and region `cerebro`.** Sleep measured against the scheduled 8.5 h and against the person's normal, reaction test (PVT, Psychomotor Vigilance Test), fatigue and mood feed the readiness index; scenario C4. Mind and mood stay private by default in the Monitor geral, like the real private conferences.
3. **Isolation, collective side → Monitor geral T1.** The team risk is collective: goals for the whole crew, no ranking, and mutual care with the "I'm going to check on them" button.
4. **Distance → offline and queue for the ground.** Everything runs on board; the top bar shows the communication status; the red alert generates the summary for the next PMC and, on Mars, opens the autonomous protocol ([`05`](05-software-architecture.md), section 2.2).
5. **Gravity, eyes → region `olhos` and quick tests.** Amsler grid, near acuity and visual symptoms, which are part of NASA's SANS protocol, plus the reminder of the eye exam schedule; scenario C3. An ordinary camera classifies nothing on its own.
6. **Gravity, unloaded body → regions `ossos`, `musculos`, `rins` and `coracao`.** Exercise adherence (ARED, CEVIS, T2), monthly body mass, hydration (scenario C5), heart rate and its variability against the baseline.
7. **Hostile environment → T5 and cross-referencing rules.** CO2, O2, pressure, temperature, humidity and noise per module; high CO2 with headache and slower reaction becomes scenario C1 (R-CO2-01). Fire, depressurization and toxic atmosphere belong to the station alarm: the software points to the procedure and commands nothing.
8. **Immunity, microbes and skin → regions `sangue` and `pele`.** Symptoms in the check-in, temperature and photos as a record; lab exams arrive late and always appear with the age of the data.

A rule that runs through everything: where the research says NOT FOUND, the indicator appears only with trend and personal baseline, without a fixed threshold color, and missing data is gray, never green ([`../AGENTS.md`](../AGENTS.md), rules 1 and 7).

## 9. What the research left open

- **Crew size on board:** not stated in the sources for this document; the value of 7 used in [`07`](07-interface-design.md) needs a source.
- **Unpublished flight thresholds** for bone markers, urinary calcium, acceptable mass loss, SpO2, heart rate, blood pressure, arrhythmias, blood count, viral load, intraocular pressure, psychological symptoms and urine color by camera ([research, gaps](../pesquisa/bruto/03-riscos-indicadores-limiares.md)).
- **Current LxC score for Carcinogenesis** and the Behavioral Health divergence (section 6).
- **FD255** in the 180-day schedule (section 3.4).
- **Validation of camera, EEG (electroencephalogram), EOG (electrooculogram) and wearables** for SANS, skin, hydration, emotion and urgency does not yet exist; in Orbit, they are research hypotheses, not approved clinical measurement.
