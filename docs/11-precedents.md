# 11. Precedents

> Audience: the presenters to NASA and the project owner.
> Question it answers: does NASA already do something similar? Where is our differentiator?
> How to use: section 1 is the answer to open the conversation. Sections 2 to 5 bring the evidence by theme (glasses, software, medical AI, peer care). Section 6 pulls everything into a matrix. Section 7 has ready-made phrases for the slide, each with a source, and section 8 lists what the research could not confirm.
> Sources: [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md) (track 4, sections 1 to 4 and 8), [`../pesquisa/bruto/06-dados-abertos-software-fluxo.md`](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) (sections 2 and 3), [`../pesquisa/bruto/07-desafio-oficial-padroes-interface.md`](../pesquisa/bruto/07-desafio-oficial-padroes-interface.md) (D3 and D5) and [`../pesquisa/bruto/13-ia-medica-embarcada.md`](../pesquisa/bruto/13-ia-medica-embarcada.md) (D1, D2 and D5). Only external source: a TechCrunch report on the CMO Digital Assistant, marked [SECONDARY]. Confidence labels as in [`00-reading-guide.md`](00-reading-guide.md).
> Reading rule: "used in space" means that a source records flight or operation. A demonstration is not operational adoption, certification or proof of efficacy. **NOT FOUND** describes the result of the research searches, not proof that the thing does not exist.

---

## 1. Short answer

**NASA and other agencies have already tested almost every piece of Orbit, but each one separately.
Bone conduction: NASA evaluated commercial headsets for voice in the xEMU suit in 2024, on the ground only and only for comfort.
EEG and EOG have measured sleep in flight since Skylab (1973); the Dreem headband (2021) and Sleep in Orbit (2023) took wearable EEG to the ISS.
The glasses combination is not unprecedented: AttentivU, from MIT, already combined EEG, EOG and bone conduction in one frame and flew on a parabolic flight in 2022.
On the software side, NASA has separate health systems, risk models and decision-support prototypes, but no single application that brings together all sensors, and the crew's vital signs are not monitored continuously.
The defensible differentiator is integration: glasses tied to the health dashboard, offline operation, an alert explained with its source, cultural personalization chosen by the crew member, mutual care with consent and progressive validation up to the mission.**

| Already exists, with precedent | What Orbit proposes and the research did not find ready-made |
| --- | --- |
| Bone conduction in a NASA suit study | Glasses with sensors tied to the crew health dashboard |
| EEG and EOG for sleep in flight experiments | Nature sounds chosen by the person, with immediate pause and respect for alarms |
| EEG, EOG and bone conduction together in one frame (AttentivU) | Collective monitor with consent per indicator, audience and period |
| Health systems on board and on the ground, separate | A single offline dashboard with body and environment, and evidence and source in each alert |
| AI prototypes to support the onboard physician (CMO-DA) | Personal baseline displayed on a human figure, with the next step in plain language |

The right-hand column is an [INFERENCE] from the comparison made in tracks 4 and 13 ([raw 04, section 8.2](../pesquisa/bruto/04-precedentes-oculos-sono.md); [raw 13, D5](../pesquisa/bruto/13-ia-medica-embarcada.md)): no cited precedent demonstrates this complete combination in a mission. It is a product hypothesis, not a validated result.

**Caution with the human figure.** The figure with clickable parts is the central example in the challenge statement itself [SECONDARY, [local copy of the challenge](https://hackathlone.com/challenges/health-monitoring-software)]. Other teams will probably have one. By itself it does not differentiate Orbit Health; what differentiates is what is behind it (personal baseline, station environment, evidence and source for each state).

---

## 2. Glasses precedents

### 2.1 Bone conduction: only in a suit study

The paper by Bridget Cavanaugh (NASA Johnson Space Center, ICES-2024-209, July 2024) studied bone conduction as an alternative for the audio received in the xEMU suit helmet, because open speakers and microphones caused echo. The text treats bone conduction as a **backup solution under development**, not as adopted equipment. There were five commercial headsets, five engineering staff (not astronauts) and six hours with each headset. The study measured fit, stability, pressure points and comfort; it did **not** measure intelligibility, music, sleep or therapeutic effect. [OFFICIAL, [Cavanaugh, ICES-2024-209](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf)]

**NOT FOUND:** validation of a bone conduction headset in astronauts in flight or a measurement of bone transmission in microgravity. A head-down tilt study (terrestrial analog) found no clinically significant hearing change, but it does not answer the question in flight. [PAPER, [microgravity analog](https://pubmed.ncbi.nlm.nih.gov/8214826/)]

Two other precedents already combine bone conduction with sensors: the Dreem headband has bone transducers, turned off in the published validation [PAPER, [Debellemanière et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC7751170/)], and AttentivU uses a bone conduction piezoelectric for auditory feedback [PAPER, [Kosmyna et al., 2019](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf)]. Physics, contact points and noise limits are in [`09-orbit-glasses.md`](09-orbit-glasses.md), section 7.

### 2.2 EEG and EOG in flight: bounded experiments, never a routine monitor

The history is long. On **Skylab** (1973), an EEG and EOG cap and a panel in the sleep cabin estimated sleep stage on board, with one astronaut studied per mission [OFFICIAL, [NASA M133 report](https://ntrs.nasa.gov/citations/19750019675)]. On **Neurolab** (STS-90, 1998), a polysomnography with four EEG channels, two EOG, two EMG (electromyography) and cardiorespiratory channels generated 16 sleep recordings from four astronauts [OFFICIAL, [NASA PI-in-a-Box](https://ntrs.nasa.gov/api/citations/20020073385/downloads/20020073385.pdf)]. On **Mir**, the Soviet and Russian program recorded sleep EEG, EOG, EMG and ECG with the Bulgarian Son-3 device [OFFICIAL, [NASA, translation of Soviet literature](https://ntrs.nasa.gov/api/citations/19910017355/downloads/19910017355.pdf)], and NASA's **Nightcap** classified wakefulness, REM (rapid eye movement sleep) and non-REM by eyelid and body movement, with 120 nights in flight from five participants [OFFICIAL, [NASA Phase 1 Science Report](https://www.nasa.gov/wp-content/uploads/static/history/SP-4225/science/issphase1sci.pdf)].

On the ISS, ESA used EEG in cognitive research (**NeuroCOG**, 2002) and a 62-electrode cap in the Columbus module (**Neurospat**, 2009 to 2013, five astronauts) [OFFICIAL, [ESA Neurospat](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/PromISSe/Neurospat)]. Wearables came later: Thomas Pesquet used the **Dreem** dry EEG headband in 2021, in three sessions of two nights, and NASA recorded new use in 2023 [OFFICIAL, [CNES, Alpha mission](https://cnes.fr/en/projects/mission-alpha); [NASA, 10 Jul 2023](https://www.nasa.gov/blogs/stationreport/2023/07/10/iss-daily-summary-report-7-10-2023/)]. In 2023, **Sleep in Orbit** (ESA and Aarhus University, Andreas Mogensen's Huginn mission) recorded in-ear EEG, in custom-molded pieces, with 20 nights of good signal quality [OFFICIAL, [ESA](https://www.esa.int/articles/about-us/directorates/human-and-robotic-exploration/health-science-in-orbit)]. NASA also demonstrated a portable EEG headset in 2022 (**Neurowellness in Space**), without publishing channels or results [OFFICIAL, [NASA, 12 Apr 2022](https://www.nasa.gov/blogs/stationreport/2022/04/12/iss-daily-summary-report-4-12-2022/)].

The **Eye Tracking Device (ETD)** measures the eyes with **cameras** in a headset, not with EOG; 31 astronauts were observed on Expeditions 9, 11, 13, 14 and 16 [OFFICIAL, [NASA, ISS Research Results](https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf)]. And NASA's routine sleep collection (Spaceflight Standard Measures) uses wrist actigraphy with questionnaires, which does not measure brain waves [OFFICIAL, [NASA, Sleep on Station](https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023/)].

Conclusion from track 4: there has been EEG and EOG for sleep since Skylab, but in bounded experiments with small samples, **not as a continuous personal monitor for the whole crew**. [OFFICIAL, [Skylab M133](https://ntrs.nasa.gov/citations/19750019675); PAPER, [Dijk et al., Neurolab](https://journals.physiology.org/doi/full/10.1152/ajpregu.2001.281.5.R1647)]

### 2.3 Smart glasses, augmented reality and lenses

NASA and ESA have already taken glasses and headsets to the ISS, but for **procedures**, not for health: the HoloLens of Project Sidekick (NASA/JPL and Microsoft, arrival in December 2015 and new tests in 2021), T2AR for treadmill maintenance (2021) and mobiPV with Google Glass (ESA, Andreas Mogensen's iriss mission, 2015). None of them integrated EEG, EOG, nature audio and crew health software. [OFFICIAL, [NASA, AR and VR on the ISS](https://www.nasa.gov/missions/station/nine-ways-we-use-ar-and-vr-on-the-international-space-station/); [ESA, Saving time in space](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Saving_time_in_space); INFERENCE, track 4, section 4.1] **NOT FOUND:** primary record of Vuzix or Epson Moverio use on the ISS.

Outside space, there are glasses with sensors: the JINS MEME has three EOG electrodes in the frame, no spaceflight located and direct sales ended on 27 March 2024 [MANUFACTURER, [JINS MEME Platform](https://jins-meme.github.io/jinsmeme-platform/en/hardware.html); [JINS FAQ](https://faq-jp.jins.com/jp/faq/glasses/faq_detail.html?category=3043&id=1639&page=1)]. AttentivU has two EEG channels on the temples (TP9 and TP10), two EOG electrodes on the nose pads, a reference on the bridge (Fpz), 1,000 Hz sampling, Bluetooth and bone conduction; in May 2022, six people used it on a parabolic flight with 20 parabolas, with NASA support [PAPER, [Kosmyna et al., 2019](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf); [AIAA 2023-4656](https://www.abstractscorecard.com/uploads/Tasks/upload/21810/DPPWZUCK-1650206-1-PDF.pdf)].

**Anticipation lenses.** The whole crew carries at least three pairs of prescription lenses of different powers, and the "Space Anticipation Glasses" are corrective lenses, not glasses with sensors, camera or display [OFFICIAL, [NASA OCHMO, SANS briefing](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)]. That is where the argument "the frame is already in the kit" comes from ([`09-orbit-glasses.md`](09-orbit-glasses.md), section 2).

### 2.4 Table of glasses precedents

| Device or experiment | Agency | Year | What it did | Status | Source |
| --- | --- | --- | --- | --- | --- |
| Bone conduction for the xEMU | NASA JSC | 2024 | Fit and comfort of five commercial headsets for voice in the suit, in five engineers | Ground research, backup solution, no adoption | [ICES-2024-209](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf) |
| Skylab M133 | NASA | 1973 | EEG and EOG cap and on-board sleep stage estimate; three participants | Historical experiment | [NASA M133](https://ntrs.nasa.gov/citations/19750019675) |
| Sleep and Respiration, Neurolab | NASA and academic team | 1998 | 20-channel polysomnography (4 EEG, 2 EOG); 4 astronauts, 16 recordings | Completed experiment | [NASA](https://ntrs.nasa.gov/api/citations/20020073385/downloads/20020073385.pdf) |
| Son-K and Son-3, Mir | Soviet and Russian program, with Bulgaria | NASA reports of 1991 and 1993 | Sleep EEG, EOG, EMG and ECG, with later processing | Historical research | [NASA](https://ntrs.nasa.gov/api/citations/19910017355/downloads/19910017355.pdf) |
| Nightcap (E663), Mir | NASA and Massachusetts Mental Health Center | 1990s (Mir 23 and 24) | Wakefulness, REM and non-REM by eyelid and body movement; 5 participants | Historical; reanalysis published in 2025 | [NASA Phase 1](https://www.nasa.gov/wp-content/uploads/static/history/SP-4225/science/issphase1sci.pdf) |
| NeuroCOG | ESA | 2002 | EEG in spatial perception tasks | Mission research | [ESA](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Cervantes_Mission/Life_sciences) |
| Neurospat | ESA | 2009 to 2013 | 62-electrode cap in Columbus; 5 astronauts | Research, not a monitor | [ESA](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/PromISSe/Neurospat) |
| Dreams with Dreem | CNES/CADMOS, CHU Toulouse and Dreem | 2021 (Pesquet); use recorded in 2023 | Dry EEG headband; the product has bone conduction, with no sound use demonstrated in flight | Tested on the ISS | [CNES](https://cnes.fr/en/projects/mission-alpha); [NASA](https://www.nasa.gov/blogs/stationreport/2023/07/10/iss-daily-summary-report-7-10-2023/) |
| Neurowellness in Space | NASA | 2022 | Portable EEG headset | Demonstration with no public results | [NASA](https://www.nasa.gov/blogs/stationreport/2022/04/12/iss-daily-summary-report-4-12-2022/) |
| Sleep in Orbit | ESA and Aarhus University | 2023 | In-ear EEG; 20 nights with good signal | Demonstration and research | [ESA](https://www.esa.int/articles/about-us/directorates/human-and-robotic-exploration/health-science-in-orbit); [Aarhus](https://ece.au.dk/forskning/forskningscentre/center-for-ear-eeg/projects/sleep-in-orbit) |
| Eye Tracking Device | DLR/ESA and Charité | Expeditions 9, 11, 13, 14 and 16 | Camera eye tracking; 31 astronauts; not EOG | In-flight eye research | [NASA](https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf) |
| Actiwatch, Standard Measures | NASA | Longitudinal collection | Wrist actigraphy and questionnaires on sleep, mood and team | Part of routine collection | [NASA](https://www.nasa.gov/humans-in-space/spaceflight-standard-measures-characterizing-how-humans-adapt-in-space/) |
| AttentivU and P-POP | MIT Media Lab, with NASA support on the flight | 2019 and 2022 | EEG, EOG and bone conduction in one frame; parabolic flight with 6 people | Prototype; did not go to the ISS; focus on attention | [Kosmyna](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf); [AIAA](https://www.abstractscorecard.com/uploads/Tasks/upload/21810/DPPWZUCK-1650206-1-PDF.pdf) |
| JINS MEME | JINS (manufacturer) | 2010s | Three EOG electrodes in the frame; blinks and drowsiness | Terrestrial; direct sales ended in 2024 | [JINS](https://jins-meme.github.io/jinsmeme-platform/en/hardware.html) |
| Project Sidekick (HoloLens) | NASA/JPL and Microsoft | 2015 to 2016; 2021 | Mixed reality for procedures and remote support | Demonstration, no biometric sensor | [NASA](https://www.nasa.gov/news-release/nasa-microsoft-collaborate-to-bring-science-fiction-to-science-fact/) |
| T2AR | NASA | 2021 | Augmented reality for T2 treadmill maintenance | Demonstration | [NASA](https://www.nasa.gov/blogs/stationreport/2021/05/12/iss-daily-summary-report-5-12-2021/) |
| mobiPV with Google Glass | ESA, Space Applications Services and Skytek | 2015 | Hands-free procedures and astronaut's view to the ground | Operational test, not health | [ESA](https://blogs.esa.int/iriss/2015/09/11/introducing-mobipv/) |
| VAMB (VR Mental Care) | ESA | 2023 | 360-degree video with sounds for relaxation | Demonstration; efficacy not published | [NASA](https://www.nasa.gov/blogs/stationreport/2023/12/06/iss-daily-summary-report-12-06-2023/) |
| Space Anticipation Glasses | NASA | 2024 briefing | Corrective lenses of varied powers | In use; no sensors | [NASA OCHMO](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |

### 2.5 What this changes in the pitch

- **Do not say the combination is unprecedented.** AttentivU already integrates EEG, EOG and bone conduction in one frame and flew on parabolas; Dreem already combines dry EEG and bone conduction and was on the ISS. [INFERENCE, track 4, section 3.4]
- **Say what the research did not find demonstrated:** glasses with these signals and sounds chosen by the person, tied to crew health monitoring, in operation on the ISS. [INFERENCE, track 4, section 3.4]
- **Do not say that EOG detects SANS** (spaceflight-associated neuro-ocular syndrome). The research found no evidence of this; SANS is followed with fundoscopy, OCT (optical coherence tomography), ultrasound and acuity. [INFERENCE, distinction drawn from [NASA OCHMO](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)]

---

## 3. Software precedents

### 3.1 Health software used on the ISS and on the ground

Status reading, as in track 6: "confirmed" when a recent NASA source shows use; "last evidence" when the source is historical; "not confirmed" when there was no public proof of use in 2025 or 2026. The full table is in [`12-open-data-sources.md`](12-open-data-sources.md), section 6; here are the items that matter for the differentiator.

| Name | Function | Who developed it | Since when | Still in use | Source |
| --- | --- | --- | --- | --- | --- |
| CHeCS and Medical Equipment Computer (MEC) | Onboard health architecture (health, environment, countermeasures); the MEC is the medical operations laptop for records and transfer | NASA JSC; software vendor not named | 2008 and 2011 catalogs | Function confirmed in 2025; current version not public | [catalog](https://ntrs.nasa.gov/api/citations/20090021477/downloads/20090021477.pdf); [ISS Familiarization](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf) |
| Station Support Computer (SSC; the LSDA source writes Space Station Computer) | General laptop where WinSCAT, KUDUwave and the procedure viewer run | NASA JSC maintains | Cited in flight requirements | Yes; not a single clinical application | [LSDA](https://nlsp.nasa.gov/explore/api/v1/getfiles3?alias=lsda&id=IDP-LSDA_DOCUMENT-0000000000002936&type=lsda_document) |
| Medical Information Systems and Tools (MIST) | Ground suite: electronic health record, images, LSAH database, mission repository, exercise, radiation | NASA JSC | Description published in 2023 | Function confirmed; version not | [NASA](https://www.nasa.gov/general/medical-information-systems-and-tools-mist/) |
| WinSCAT | Self-administered cognitive screening | NASA JSC, medical operations | Expedition 1 | Yes through 2025, monthly; 2026 not confirmed | [PAPER](https://ntrs.nasa.gov/citations/20100036584); [OFFICIAL](https://ntrs.nasa.gov/api/citations/20250011491/downloads/BHP%20Operations%20Overview_Navy_Revised.pdf) |
| Cognition Test Battery (CTB) | Ten cognitive research tests | University of Pennsylvania for the HRP | In flight since 2016 | Research; routine 2025/26 not confirmed; does not replace WinSCAT | [NASA](https://www.nasa.gov/humans-in-space/spaceflight-standard-measures-characterizing-how-humans-adapt-in-space/); [HRP](https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf) |
| Reaction Self Test (RST) | Psychomotor vigilance test (PVT) of about 3 min, plus self-reported sleep, fatigue and stress | NASA with University of Pennsylvania | Study with 24 astronauts; project completed (TechPort, 2024) | Routine 2025/26 not confirmed | [TechPort](https://techport.nasa.gov/projects/23201) |
| ISS Food Intake Tracker (ISS FIT) | iPad app to log food, with weekly sending to nutritionists | NASA with Topcoder and Astronaut Office | ISS in 2016 | Confirmed through 2024 | [NASA](https://www.nasa.gov/directorates/esdmd/hhp/nutritional-biochemistry/) |
| OnePortal | Common interface for exercise equipment (ARED, T2, CEVIS, MED-2) | NASA JSC | First use on MED-2 | Active | [NASA](https://www.nasa.gov/reference/jsc-exercise-countermeasures/) |
| On-Orbit Hearing Assessment (OOHA) | Onboard audiometry, reviewed on the ground | NASA; KUDUwave on the SSC | EarQ from 2000 to 2021, then KUDUwave | KUDUwave used in 2023 | [PAPER](https://ntrs.nasa.gov/citations/20240009887); [NASA](https://www.nasa.gov/blogs/stationreport/2023/06/21/iss-daily-summary-report-6-21-2023/) |
| Bio-Monitor | Physiological wearable (Hexoskin) with tablet, sessions of up to 48 h | Canadian Space Agency (CSA) with industry | Commissioned in 2019 | Research instrument | [CSA](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) |
| Integrated Medical Model (IMM) | Probabilistic model of medical risk and kit before flight, with about 100 conditions | NASA HRP | 2000s | Yes, accepted standard for risk quantification (2025) | [NASA](https://www.nasa.gov/nasa-integrated-medical-model-imm-overview/); [NTRS](https://ntrs.nasa.gov/citations/20240012058) |
| MEDPRAT (and IMPACT) | Discrete-event simulation; engine of IMPACT, the IMM successor under development | ExMC with NASA Glenn, Johnson, Banner Quality Management and Aegis Aerospace | Versions 1.0 and 2.0 evaluated in 2025 | Scenario engineering; did not replace the IMM | [NTRS](https://ntrs.nasa.gov/citations/20240012058) |
| Medical Data Architecture (MDA) and CDSS | Architecture to gather records, sensors and images, control access and sustain clinical decision support | NASA ExMC | Prototypes in 2018; architecture in 2023 | Recommendation, not a flight system; task closed and handed to CHP-IDA | [NTRS](https://ntrs.nasa.gov/citations/20220017869); [HRR](https://humanresearchroadmap.nasa.gov/Tasks/task.aspx?i=2134) |
| CHP-IDA | Integration of health and performance data for flight and ground | HRP with NASA JSC/ExMC | Requirements in FY22 | In development; technology demonstration in 2025 | [NTRS](https://ntrs.nasa.gov/citations/20240008508); [IWS 2025](https://ntrs.nasa.gov/api/citations/20250000330/downloads/CHP-IDSP%20Project%20Updates_IWS%202025.pdf) |
| Exploration EHR (xEHR) | Onboard health record with asynchronous sending | NASA JSC | Requirements in 2023 | Project; the 2023 record was ground-only | [NTRS](https://ntrs.nasa.gov/citations/20230003216) |

### 3.2 Real-time monitoring today

**The environment is continuous; the crew's vital signs are not.** The life support system (ECLSS) controls air, water, ventilation and pressure, and in Mission Control the ETHOS (Environmental and Thermal Operating Systems) position follows the environmental and thermal systems; ETHOS is a control position, not a software name, and its software is not public. [OFFICIAL, [NASA, ECLSS](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/); [NTRS](https://ntrs.nasa.gov/api/citations/20160012370/downloads/20160012370.pdf); [ICES-2025-125](https://ntrs.nasa.gov/api/citations/20250003953/downloads/ICES-2025-125%20Final_Rev%20C.pdf)] The BME (Biomedical Engineer), technical representative of CHeCS, monitors bioenvironmental data such as CO2 and O2 in real time and forwards physiological and hardware data to specialists. [OFFICIAL, [NASA, BME](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/)]

For the body, however, NASA describes separate medical devices, used periodically; there is no continuous monitoring of all vital signs of each astronaut in ISS routine. [OFFICIAL, [NASA Glenn, medical devices](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/)] The exceptions are occasional:

| Situation | What is monitored | Limit | Source |
| --- | --- | --- | --- |
| Extravehicular activity (EVA) | ECG and heart rate, metabolism (historically estimated every 2 minutes), suit state, suit O2 and CO2 | Only during EVA; Russian Orlan suit: **NOT FOUND** | [NASA-STD-3001 Vol. 2 Rev. B](https://standards.nasa.gov/sites/default/files/standards/NASA/B/0/nasa-std-3001_vol_2_rev_b.pdf); [PAPER](https://ntrs.nasa.gov/citations/20210024317) |
| Exercise | ECG or heart rate, performance and prescription, via OnePortal and CHeCS | Per session | [NASA](https://www.nasa.gov/reference/jsc-exercise-countermeasures/) |
| Medical emergency | ECG, pressure, SpO2, temperature and ultrasound, depending on the kit | Triggered by symptom | [NASA OCHMO](https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf) |
| Bio-Monitor sessions | ECG, respiration, skin temperature, SpO2 and activity, up to 48 h | Research; data downloaded later | [CSA](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) |
| Smart Flight Suit 2 | ECG vest and pressure and temperature wristband, in 2024 | Demonstration, not a permanent system | [NASA](https://www.nasa.gov/blogs/stationreport/2024/01/25/iss-daily-summary-report-1-25-2024/) |
| Artemis II (ARCHeR) | Wristbands recorded movement and sleep continuously | Actigraphy is not a vital sign | [NASA](https://www.nasa.gov/reference/archer/) |

### 3.3 Mission Control medical consoles

The Flight Surgeon coordinates the clinical response on the ground with the BME and specialists. Among the published BME activities are monitoring CO2 and O2, forwarding exam results, radiation doses and exercise data, tracking air and water quality and noise, and remotely operating CHeCS equipment. [OFFICIAL, [NASA, Mission Control Crew Health Consoles](https://www.nasa.gov/podcasts/houston-we-have-a-podcast/mission-control-crew-health-consoles/); [NASA, BME](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/)] A 2000 analysis of the Flight Surgeon console records the need to integrate data from several sources with timely, reliable and secure delivery; it is a historical record, not the current screen. [PAPER, [NASA NTRS](https://ntrs.nasa.gov/api/citations/20030064063/downloads/20030064063.pdf)]

**NOT FOUND:** current captures of clinical dashboards with individual data, their fields, thresholds or access rules. And note: these consoles have a different user, a different purpose and a different access regime. They are not precedent for showing everyone's vital signs to the crew. [INFERENCE, track 7, D3]

### 3.4 Direct answer

There is no single NASA application, in 2025 or 2026, that receives all sensors and prescribes treatment. There are separate flight systems (CHeCS/MEC, SSC, OnePortal, procedures), ground suites (MIST) and integration projects (MDA, CHP-IDA). In 2024, NASA still recorded ISS health data in separate places and downloaded by hand. [OFFICIAL, [NTRS, CHP-IDA](https://ntrs.nasa.gov/citations/20240008508); INFERENCE, [MDA](https://ntrs.nasa.gov/citations/20220017869)] It is in this gap that Orbit Health positions itself, without claiming equivalence to a certified system.

---

## 4. Medical AI precedents

### 4.1 CMO Digital Assistant and Doc-in-a-Box

On 7 August 2025, Google Public Sector described with NASA the **Crew Medical Officer Digital Assistant (CMO-DA)**, a multimodal proof of concept to support the Crew Medical Officer (CMO) when communication with the ground is limited, trained on space medicine literature and evaluated in scenarios in the OSCE format (objective structured clinical examination). The publication does not state the model, hardware, numerical metrics or proof of offline operation. [MANUFACTURER, [Google Cloud](https://cloud.google.com/blog/topics/public-sector/how-google-and-nasa-are-testing-ai-for-medical-care-in-space/)] The press reports that the system runs on Google Cloud's Vertex AI platform [SECONDARY, [TechCrunch, 8 Aug 2025](https://www.techcrunch.com/2025/08/08/nasa-and-google-are-building-an-ai-medical-assistant-to-keep-mars-bound-astronauts-healthy/)]; **the official source does not confirm offline operation.**

In 2026, a NASA summary describes the CMO-DA integrating space medicine models, the Integrated Medical Evidence Library, probabilistic risk, Butterfly iQ3 ultrasound and AMOS, with a demonstration in a **simulated** space mission. [OFFICIAL, [NTRS, 2026](https://ntrs.nasa.gov/citations/20260001797)] The AsMA 2026 program cites an edge computer demonstration with MedGemma and an image classifier with 98% accuracy for kidney stone; the 98% belongs to that classifier, not to the whole CMO-DA, and the demonstration does not prove flight-qualified equipment. [PAPER, [AsMA 2026](https://asma.org/wp-content/uploads/2026/04/AsMA_Program-Book_edited_draft-1.pdf)]

**Doc-in-a-Box**, from the LuCCI project, is an 8-billion-parameter language model, reduced from the 80-billion OpenBio LLM and trained on aerospace medicine books. In the OSCE evaluation, three physicians gave 68 to 83 points out of 100 (mean 76), with difficulty on atypical cases and a lower score in therapy. The summary writes "no significant difference (p < 0.05)", an inconsistent wording; do not repeat that statistical result without clarification. Nothing proves it is the same model as the CMO-DA. [PAPER, [NTRS, AsMA 2025](https://ntrs.nasa.gov/api/citations/20240012747/downloads/AsMA%202025%20OSCE%20for%20AI%20project_EC.pdf)]

### 4.2 ExMC, CDSS, MDA, EIMO and AMOS

**EIMO** (Earth-Independent Medical Operations) is the gradual transfer of medical decision-making to onboard resources, as communication delay grows and evacuation becomes impossible; NASA describes the ISS as dependent on the ground in near real time. [OFFICIAL, [NTRS](https://ntrs.nasa.gov/citations/20240001402); [NASA Ames, CDSS for EIMO](https://www.nasa.gov/centers-and-facilities/ames/ames-science/ames-space-biosciences/a-clinical-decision-support-system-for-earth-independent-medical-operations/)] **ExMC** (Exploration Medical Capability) treats onboard clinical support as a combination of data, equipment, procedures, knowledge and training, not just an AI model; the use case document is a requirements basis, not an approved virtual physician. [OFFICIAL, [ExMC, CDS use cases](https://ntrs.nasa.gov/api/citations/20220017885/downloads/HRP-48069%20ExMC%20CDS%20Use%20Cases%20Doc%20Rev.%20B%20-%20MK%20BB%20BE%20AM%20signed.pdf)]

The **MDA** is the closest precedent to the Orbit Health dashboard: Test Bed 1.5 combined biometric data from a wearable (Astroskin) via telemetry with environmental data from an ECLSS simulator, in a ground test at NASA Johnson. The report calls the products prototypes and does not report clinical validation in astronauts. [OFFICIAL, [MDA status, 2018](https://www.nasa.gov/wp-content/uploads/2018/04/medical_data_architecture_project_status-_m._krihak.pdf)]

**AMOS** (Autonomous Medical Officer Support) is the demonstration with the strongest operational evidence: step-by-step guidance for renal and bladder ultrasound, demonstrated on the ISS in April 2020 and June 2022 with operators without specific training. It guides the procedure; it does not receive all the data or decide treatment. [OFFICIAL, [NTRS, 2024](https://ntrs.nasa.gov/citations/20240012964)]

### 4.3 CIMON: the cloud lesson

CIMON (Crew Interactive MObile companioN), from Airbus for the DLR, with IBM Watson and LMU Munich, demonstrated voice interaction and task support on the ISS in 2018, with no medical function. Speech depended on the IBM Cloud over a satellite link, so the design **was not offline**. CIMON-2 went to the ISS in December 2019; operation in 2025 and 2026 not confirmed. [OFFICIAL, [DLR, 2018](https://www.dlr.de/en/latest/news/2018/4/20181116_cimon-alexander-gerst-iss); [DLR, 2020](https://www.dlr.de/en/latest/news/2020/02/20200415_cimon-2-makes-its-debut-on-the-iss/)]

### 4.4 Table of AI precedents

| Name | Who | Year | What it does | Offline? | Status | Source |
| --- | --- | --- | --- | --- | --- | --- |
| CMO-DA | NASA HRP, Google Public Sector and clinical partners | 2025 to 2026 | Multimodal support for the CMO, with image and procedures | Not confirmed by the official source; press cites Vertex AI [SECONDARY]; edge test in 2026 without qualification | Proof of concept and simulated mission | [Google](https://cloud.google.com/blog/topics/public-sector/how-google-and-nasa-are-testing-ai-for-medical-care-in-space/); [NASA](https://ntrs.nasa.gov/citations/20260001797); [TechCrunch](https://www.techcrunch.com/2025/08/08/nasa-and-google-are-building-an-ai-medical-assistant-to-keep-mars-bound-astronauts-healthy/) |
| Doc-in-a-Box | LuCCI project (NASA, KBR, universities) | 2025 | 8-billion-parameter language model tested in OSCE | NOT FOUND | Preliminary evaluation | [NTRS](https://ntrs.nasa.gov/api/citations/20240012747/downloads/AsMA%202025%20OSCE%20for%20AI%20project_EC.pdf) |
| ExMC CDSS and MDA | NASA ExMC/HRP | 2017 to 2023 | Architecture for clinical data, sensors, environment and decision support | Onboard concept; connectivity not published | Prototypes and requirements | [MDA](https://www.nasa.gov/wp-content/uploads/2018/04/medical_data_architecture_project_status-_m._krihak.pdf) |
| EIMO | NASA | Ongoing | Bring medical decision-making on board | It is the objective itself | Research paradigm | [NTRS](https://ntrs.nasa.gov/citations/20240001402) |
| AMOS | NASA JSC/ExMC and KBR | 2020 to 2024 | Step-by-step ultrasound guidance | Compatible with autonomy; offline implementation not published | Demonstrated on the ISS; no routine use | [NTRS](https://ntrs.nasa.gov/citations/20240012964) |
| IMCA | NASA SBIR contractor | 2021 to 2026 | Voice assistant with procedures, AR/VR and risk ML | NOT FOUND | Completed; no flight | [TechPort](https://techport.nasa.gov/projects/113303) |
| MedICS | NASA Ames and SGT | 2020 | Deep networks for images and records, with terrestrial data | NOT FOUND | Development in 2020 | [NTRS](https://ntrs.nasa.gov/citations/20200000615) |
| CIMON and CIMON-2 | DLR, Airbus, IBM and LMU | 2018 to 2020 | Conversational robot, no diagnosis | No: speech depended on the IBM Cloud | Historical demonstration | [DLR](https://www.dlr.de/en/latest/news/2018/4/20181116_cimon-alexander-gerst-iss) |

### 4.5 What this changes in the pitch

Do not say "first space medical AI", "unprecedented" or "runs on the ISS computer". NASA has already documented integrated medical architecture and clinical support for autonomy, and the CMO-DA works with multimodal information. The defensible framing is the way the experience is organized: personal baseline with readings from the body and the environment, on a human figure, with state, evidence, data origin and next step. [INFERENCE, track 13, D5; OFFICIAL, [ExMC](https://ntrs.nasa.gov/api/citations/20220017885/downloads/HRP-48069%20ExMC%20CDS%20Use%20Cases%20Doc%20Rev.%20B%20-%20MK%20BB%20BE%20AM%20signed.pdf)] The prototype explains alerts with approved rules and evidence, without freely generated text; a local language model is left for the operational vision. [INFERENCE, track 13, D2; [`05-software-architecture.md`](05-software-architecture.md), section 4]

---

## 5. Monitoring among peers

### 5.1 What exists

| Precedent | What it shows | What it does not authorize | Source |
| --- | --- | --- | --- |
| Crew Medical Officer (CMO) | Designated crew member, with specific medical training; may or may not be a physician; at least two trained CMOs per vehicle or platform | Unrestricted access by everyone to medical records | [OFFICIAL, V1 5003 and V1 3006](https://www.nasa.gov/reference/5-0-training/) |
| CMO at JAXA | Performs medical tests and attends to a sick or injured colleague, following the Flight Surgeon on the ground | Care without professional support from the ground | [OFFICIAL, JAXA](https://humans-in-space.jaxa.jp/en/biz-lab/med-in-space/healthcare/medops/system/) |
| General medical training | Each crew member trains to care for themselves and others | Collective monitor of identified vital signs | [OFFICIAL, V1 5002](https://www.nasa.gov/reference/5-0-training/) |
| Buddy system in EVA | EV1 and EV2 work together; safety is a shared responsibility | Routine clinical data visible to everyone | [PAPER, NTRS](https://ntrs.nasa.gov/api/citations/20140013480/downloads/20140013480.pdf?attachment=true) |
| SIRIUS (ground isolation) | One crew member plays the physician role; daily checks go straight to the doctors; there is a private conference; whoever notices a deviation warns the medical team | Turning everyone's dashboard into a collective medical record | [PAPER, MDPI](https://www.mdpi.com/2226-4310/10/6/518) |
| Antarctic stations | The doctor asks the patient whether they want to share medical information with the community, and how much | Universal agency rule (it is one physician's account) | [PAPER, account](https://journals.sagepub.com/doi/10.1580/1080-6032-020.004.0383) |

### 5.2 The missing rule

NASA requires secure handling of health records and, citing the Privacy Act of 1974, says they may not be disclosed without consent (V1 7003); medical and psychological communications with the ground are private (V1 6003 and V1 6011). [OFFICIAL, [NASA-STD-3001 Vol. 1, records](https://www.nasa.gov/reference/7-0-crew-health-records/); [medical operations](https://www.nasa.gov/reference/6-0-medical-operations/)] The National Academies' ethics guidance for long missions warns that exposure can cause stigma and that fear of disclosure can reduce willingness to report health problems. [EARTH-GUIDELINE, [National Academies, 2014](https://www.nationalacademies.org/read/18576/chapter/7)]

**NOT FOUND:** a public NASA rule authorizing individual clinical data to be shown on a collective monitor; a general exception letting the CMO ignore the privacy setting; a public ISS policy on which indicators peers may see; a study in HERA, SIRIUS or NEEMO that tests a collective health dashboard and measures stigma or underreporting. This is neither permission nor prohibition; it is the absence of a public rule. [OFFICIAL, [V1 6008 and V1 6009](https://www.nasa.gov/reference/6-0-medical-operations/); INFERENCE, track 7, D5]

### 5.3 Consequence in Orbit Health

Since there is no public rule, the Monitor geral (T1) only shows what each person chose to share, with whom (only me, CMO, flight surgeon, chosen colleague or crew) and for how long. "Not shared" is neutral text, never an alert color; filtering happens in the engine; there is no hard-coded unrestricted emergency access. Details in [`07-interface-design.md`](07-interface-design.md), T1, and rule 9 of [`../AGENTS.md`](../AGENTS.md). This is a real differentiator: the peer care precedents are roles and conversations, none is a digital tool with granular consent. [INFERENCE, track 7, D5]

---

## 6. Differentiator matrix

Legend: ✓ covered; ◐ partial, or demonstrated without validation for the proposed use; empty: does not cover or the source does not say. In the "Mission validation" column, ✓ is use or testing in spaceflight and ◐ is only an analog, parabolic flight, simulated mission or flight without published efficacy results. The matrix compares the demonstrated function, not the mere presence of a part. [INFERENCE, from sections 2 to 5 and [track 4, section 8.2](../pesquisa/bruto/04-precedentes-oculos-sono.md)]

| Precedent | Body and environment dashboard | Offline | Explainable with source | Human figure | Peers with consent | Bone conduction | EEG | EOG | Cultural sounds | Mission validation |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| NASA xEMU (2024) | | | | | | ✓ voice in the suit | | | | |
| Skylab M133 (1973) | | | | | | | ✓ | ✓ | | ✓ |
| Neurolab (1998) | | | | | | | ✓ | ✓ | | ✓ |
| Nightcap, Mir | | | | | | | | ◐ eyelid and body | | ✓ |
| Dreem / Dreams (2021) | | | | | | ◐ in the product, no use in flight | ✓ | | ◐ pre-sleep sounds, no nature or culture | ✓ |
| Sleep in Orbit (2023) | | | | | | | ✓ in the ear | | | ✓ |
| AttentivU / P-POP | | | | | | ✓ | ✓ | ✓ | ◐ audio feedback | ◐ parabolic flight |
| ISS ETD | | | | | | | | ◐ camera, not EOG | | ✓ |
| JINS MEME | | | | | | | | ✓ in the frame | | |
| ESA VAMB (2023) | | | | | | | | | ◐ nature in video and sound, no culture | ◐ no published efficacy |
| CHeCS/MEC and BME console | ◐ separate systems, data to the ground | | | | | | | | | ✓ in operation |
| MDA and CHP-IDA | ◐ wearable and ECLSS simulator on the ground | ◐ onboard concept | ◐ recommends data lineage | | | | | | | |
| CMO-DA (NASA and Google) | | ◐ edge test, no qualification | | | | | | | | ◐ simulated mission |
| AMOS | | ◐ not published | | | | | | | | ✓ ISS, 2020 and 2022 |
| CIMON | | no, IBM cloud | | | | | | | | ✓ no medical function |
| CMO and EVA buddy | | | | | ◐ roles, no tool | | | | | ✓ |
| SIRIUS | | | | | ◐ peers warn the medical team | | | | | ◐ analog |
| Antarctica (medical account) | | | | | ◐ patient chooses what to share | | | | | ◐ analog |
| **Orbit (proposal)** | **✓ proposed** | **✓ proposed** | **✓ rule, readings and source** | **✓ suggested by the challenge** | **✓ per indicator, audience and period** | **✓ optional, to be validated** | **✓ to be validated against PSG** | **✓ auxiliary, no SANS** | **✓ person's choice, no validation** | **◐ plan: ground, analog and flight** |

How to read:

1. **The Orbit row is a proposal, not a demonstration.** The ✓ there means "the project proposes", with authorization, privacy, validation and clinical protocol still to be defined. [INFERENCE, track 4, section 8.2] The validation plan is in [`09-orbit-glasses.md`](09-orbit-glasses.md), section 9.
2. **No precedent crosses the hardware and software columns.** The glasses experiments have no dashboard or mutual care; the software systems have no sensors on the face; the peer care precedents have no digital tool. The closest overlaps are AttentivU and Dreem (glasses) and the MDA and CMO-DA (software).
3. **Explainable with source and granular consent** are the emptiest columns. They are also the ones that depend most on project rules ([`../AGENTS.md`](../AGENTS.md), rules 1, 7 and 9) and least on hardware, which makes them demonstrable already in the prototype.

---

## 7. Phrases for the slide

Each phrase fits on a slide and has the source next to it.

1. **"On the ISS, the environment is tracked all the time; each astronaut's vital signs, only periodically, with separate devices."** [OFFICIAL, [NASA, BME](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/); [NASA Glenn](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/)]
2. **"In 2024, NASA itself recorded ISS health data in different places and downloaded by hand. Orbit Health brings body and environment together on a single screen."** [OFFICIAL, [NTRS, CHP-IDA](https://ntrs.nasa.gov/citations/20240008508)]
3. **"The farther from Earth, the more medicine needs to work on board; NASA calls this EIMO. Orbit Health was designed to work without a network."** [OFFICIAL, [NTRS, EIMO](https://ntrs.nasa.gov/citations/20240001402); [`05-software-architecture.md`](05-software-architecture.md), P1]
4. **"EEG, EOG and bone conduction in one frame already exist (AttentivU, MIT). Our step is to connect the glasses to the crew health dashboard, offline, with sounds that each person chooses."** [PAPER, [Kosmyna et al., 2019](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf); INFERENCE, track 4, section 8.2]
5. **"NASA treats medical communication as private and has no public rule for a collective health monitor. In Orbit, each crew member decides what to show, to whom and for how long."** [OFFICIAL, [V1 7003](https://www.nasa.gov/reference/7-0-crew-health-records/); [V1 6003](https://www.nasa.gov/reference/6-0-medical-operations/); NOT FOUND, track 7, D5]
6. **"NASA and Google have been testing an AI assistant for the onboard physician since 2025, still as a proof of concept. Orbit does not diagnose: each alert shows the readings, the rule and the source."** [MANUFACTURER, [Google Cloud](https://cloud.google.com/blog/topics/public-sector/how-google-and-nasa-are-testing-ai-for-medical-care-in-space/); OFFICIAL, [NTRS, 2026](https://ntrs.nasa.gov/citations/20260001797); [`../AGENTS.md`](../AGENTS.md), rules 5 and 7]

Phrases to avoid, with the reason: "unprecedented combination of EEG, EOG and bone conduction" (AttentivU); "first space medical AI" or "unprecedented" (CMO-DA, MDA, AMOS); "detects SANS" (no evidence); "runs on the ISS computer", "approved by NASA" or "certified" (nothing was qualified); "sound therapy" or "improves sleep" (no study with astronauts). [INFERENCE, track 4, sections 3.4 and 6.1; track 13, D5]

---

## 8. Gaps

What the research could not confirm. None of this goes into the pitch as fact.

- **Bone conduction in microgravity:** no hearing test with a bone transducer on a crew in flight. Alarm intelligibility, sound leakage and comfort in long use are missing.
- **EOG and SANS:** no evidence that EOG in a frame predicts optic disc edema or another SANS manifestation.
- **Sounds and culture:** no study located tested nature sound via bone conduction as a sleep intervention with astronauts, nor sounds chosen by culture as a health intervention. Searches in HERA, Mars-500, SIRIUS and HI-SEAS did not find an isolated sound intervention.
- **CMO-DA:** model, size, hardware, offline inference and consolidated metrics were not found. The Vertex AI platform appears only in the press [SECONDARY]. It is not known whether Doc-in-a-Box is the same model.
- **Doc-in-a-Box:** the sentence about statistical significance ("no significant difference" alongside "p < 0.05") is ambiguous; do not reinterpret without the authors.
- **Status in 2025 and 2026:** WinSCAT in 2026, ISS FIT, CTB and RST in 2025/26, AMOS routine, CIMON-2 operation and CHP-IDA deployment are not confirmed in a public source.
- **Consoles and internal software:** current Flight Surgeon and BME screens, ETHOS software and CHeCS and MIST APIs are not public. Do not invent a product name or screen.
- **Russian Orlan suit:** biomedical fields and frequency: NOT FOUND.
- **Market glasses on the ISS:** Vuzix and Epson Moverio: NOT FOUND.
- **Collective monitor:** public rule for a peer health monitor, CMO emergency access and a usability study measuring stigma or underreporting: NOT FOUND (section 5.2).
- **Product validation:** none of the differentiators in section 6 was tested with crew members. The proposed path is ground, then analog (HERA or a polar station such as Concordia; NEEMO discontinued in 2023 and CHAPEA 2 ended on 31/10/2026, see [`16-next-steps-and-impact.md`](16-next-steps-and-impact.md)) and only then flight. [INFERENCE, track 4, section 7.3]

**Divergences between the sources, for whoever maintains this document:**

- Track 13 labels the Google blog on the CMO-DA as [MANUFACTURER] in D1 and in the precedents table, but as [OFFICIAL] in the D5 table and in the executive summary. This document uses [MANUFACTURER], because it is a partner publication and not a NASA report.
- On the MDA, track 6 describes it as "recommendation, not a flight system", track 7 says the task was closed and the work passed to CHP-IDA, and track 13 says the same page still classifies the product as a data architecture prototype. The three readings are compatible: closed prototype, succeeded by CHP-IDA.
- AMOS appears in track 6 as a "demonstration on the ISS" without a date; track 13 gives April 2020 and June 2022. This document uses the dates from track 13.
