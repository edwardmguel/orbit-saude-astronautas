# 14. Answered questions

> For whom: the whole team.
> Where the questions come from: the "Dúvidas" (Questions) tab and the "Precedentes" (Precedents) section of "Step 0" of the [initial document](../pesquisa/documento-inicial.md).
> How to read: each section gives the short answer in bold, the explanation and the sources (official URL and the document that goes deeper). Where the research showed that the initial document was imprecise, the correction is marked as **Correction**.
> Confidence labels as in [`00-reading-guide.md`](00-reading-guide.md). Facts verified on 11/15/2026 by the research in [`../pesquisa/bruto/`](../pesquisa/bruto/).

---

## 0. Corrections to the initial document, in one table

| The initial document said | The research showed | Section |
| --- | --- | --- |
| "70% to 81% of astronauts" have a SANS sign and "15% to 20%" have a concerning level | NASA reports about 70% with at least one sign and about 18% clinically concerning. The 81% (52 of 64) comes from another cohort, with varied methods. It is not a single range | 2 |
| "47% to 48% of eyes" need optical correction | 48.2% of eyes (27 of 56) had a mean hyperopic shift of +0.12 diopter. Changing the prescription is not the same as needing a new correction | 2 |
| Ophthalmoscope, OCT and tonometer serve to mitigate SANS | They are surveillance and diagnostic instruments, not mitigation | 2 |
| Dose of 80 to 160 mSv in six months | Range from a study proposal; the later NASA technical summary gives 50 to 100 mSv | 3 |
| Astroskin measures blood pressure | It estimates only systolic pressure, from pulse transit time, without a cuff | 1 |
| Astroskin monitors basic life functions | It is a research wearable used in sessions, not a continuous crew monitor | 1 |
| Tempus PRO appears as ISS medical equipment | It is a candidate for exploration, tested on the ground; not confirmed as operational on the ISS | 4 and 5 |
| CAD "the size of two AA batteries" | NOT FOUND in the research sources | 3 |
| Body data presented "in real time" | On the ISS only the environment is continuous; body data arrives by session, exam or sample | 13 |

---

## 1. How does the Astroskin garment work? And what is the difference from the Bio-Monitor?

**Astroskin is an instrumented shirt from Carré Technologies (Hexoskin family), with a headband for SpO2 and a module that records ECG, breathing, SpO2, estimated systolic pressure, skin temperature and movement. The Bio-Monitor is the Canadian Space Agency (CSA) system taken to the ISS in December 2018; the sources do not allow stating that they are the same device.**

How each sensor works [OFFICIAL](https://www.asc-csa.gc.ca/eng/funding-programs/funding-opportunities/ao/2018-lsrs.asp) [OFFICIAL](https://ntrs.nasa.gov/api/citations/20150021842/downloads/20150021842.pdf):

| Signal | How it measures | Unit | Published rate |
| --- | --- | --- | --- |
| Electrocardiogram (ECG) | Textile electrodes on the chest pick up the heart's electrical activity (two leads in the Astroskin) | mV; heart rate in bpm | 256 Hz |
| Breathing | Sensors in the fabric over chest and abdomen pick up the expansion | breaths/min; tidal volume in mL; ventilation in L/min | 128 Hz |
| SpO2 | Optical sensor in the headband | % and pulse in bpm | At least 64 Hz (Bio-Monitor) |
| Blood pressure | **Estimated** from the transit time between the ECG and the pulse wave; systolic only | mmHg | 1 Hz (Astroskin study) |
| Skin temperature | Sensor in contact with the skin | °C | Updated at 1 Hz |
| Movement | Triaxial accelerometer in the module | g | At least 64 Hz |

| Difference | Astroskin (NASA documents) | Bio-Monitor (CSA, on the ISS) |
| --- | --- | --- |
| Where it was used | NASA Ames and CSA evaluations on the ground and in analogs [OFFICIAL](https://ntrs.nasa.gov/api/citations/20205009977/downloads/NASA_TM_20205009977.pdf) | Arrived on the ISS in December 2018, commissioned in 2019 [OFFICIAL](https://www.nasa.gov/blogs/stationreport/2019/02/28/iss-daily-summary-report-2-28-2019/) |
| Recording | Up to 24 h, four AA batteries | Up to 48 h of continuous recording [OFFICIAL](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) |
| Application | Mobile app over Bluetooth Low Energy; laptop software imports the session | Dedicated tablet |
| File | CSV in the NASA study | Raw format NOT FOUND |
| Output to the ground | Download to a computer after the session | Module on the base, then downlink through the station communications |
| Use | Research | Research (Vascular Aging, Space Health, Vascular Calcium); not medical telemetry for everyone |

**Correction.** The initial document lists "blood pressure" and calls the shirt a monitor of "basic life functions". In fact the pressure is only estimated systolic, without a cuff, and the use is per research session, not continuous monitoring. For the software, this becomes the "recorded, awaiting transfer" states of `Leitura.disponibilidade` (Reading availability) in [`06-data-model.md`](06-data-model.md).

**Sources:** [CSA, Bio-Monitor](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp); [CSA, 2018 specification](https://www.asc-csa.gc.ca/eng/funding-programs/funding-opportunities/ao/2018-lsrs.asp); [NASA, Astroskin evaluation](https://ntrs.nasa.gov/api/citations/20205009977/downloads/NASA_TM_20205009977.pdf); [NASA, Astroskin sampling study](https://ntrs.nasa.gov/api/citations/20150021842/downloads/20150021842.pdf). Go deeper: [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), section D3.

---

## 2. What is done to mitigate or reduce SANS?

**Today NASA monitors and corrects: eye exams in fixed mission windows (acuity, Amsler grid, fundus exam, OCT, ultrasound and tonometry) and glasses of different prescriptions for the vision change. The research sources do not record an approved preventive countermeasure, and the cause of SANS is still not fully known.**

Spaceflight Associated Neuro-ocular Syndrome (SANS) combines optic disc edema, posterior flattening of the globe, chorioretinal folds and refraction changes in some crew members on long missions. The hypothesis is the redistribution of fluids toward the head; the pathogenesis remains incompletely understood. [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) [OFFICIAL](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105)

**Correction of the numbers.** The NASA technical brief (OCHMO-MTB-001) says that about **70%** of long-mission crew have at least one sign and about **18%** have clinically concerning SANS. A historical NASA/ESA cohort found at least one criterion in **81%** (52 of 64 astronauts), with varied methods and exam timings. These are estimates from different cohorts and definitions. [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) [PAPER](https://pmc.ncbi.nlm.nih.gov/articles/PMC13462731/) The "47% to 48% of eyes" figure comes from a study in which 27 of 56 eyes (48.2%) had a mean **hyperopic shift** of +0.12 diopter; this does not mean those eyes needed correction. [PAPER](https://pubmed.ncbi.nlm.nih.gov/40194644/) The NASA brief reports a change of at least 0.75 diopter in about 15% of eyes or participants and no incurable visual loss in the survey. [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)

What exists today:

| Measure | What it is | Detail |
| --- | --- | --- |
| Scheduled surveillance | Exams at FD30, FD90, then every 90 days, R-30 and post-flight | Acuity and Amsler can be done by the crew member; OCT, fundus exam and tonometry require equipment and a protocol [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |
| Optical correction | Each crew member carries at least three pairs of lenses of different prescriptions ("Space Anticipation Glasses") | Compensates the hyperopic shift; does not treat the cause [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |
| Post-flight management | An increase of at least 55 µm in peripapillary retinal thickness and/or Frisén grade I or higher edema leads to considering a lumbar puncture | Post-flight criterion, not an in-flight alarm [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |

**Correction of the role of the instruments.** Ophthalmoscope (fundus exam), OCT and tonometer do not mitigate: they detect and track. The tonometer measures **intraocular** pressure, not intracranial. [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)

In Orbit Health: scenario C3 ([`05-software-architecture.md`](05-software-architecture.md), 3.3) uses Amsler and acuity as self-assessment and suggests an exam with the flight surgeon; it never diagnoses. No complaint does not mean no SANS, because there are objective signs with little perception [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf), and there is no evidence that the glasses' EOG detects SANS ([section 11](#11-does-nasa-already-use-eeg-and-eog-portable-or-in-a-module)).

**Sources:** [NASA OCHMO-MTB-001, SANS](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf); [NASA HRR, SANS risk](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105); [cohort of 64 astronauts](https://pmc.ncbi.nlm.nih.gov/articles/PMC13462731/); [refraction study](https://pubmed.ncbi.nlm.nih.gov/40194644/). Go deeper: [`../pesquisa/bruto/03-riscos-indicadores-limiares.md`](../pesquisa/bruto/03-riscos-indicadores-limiares.md) (SANS) and [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), 4.2.

---

## 3. How is radiation measured on the ISS?

**In three layers: area instruments, active (RAD, REM, HERA, DOSTEL) and passive (RAM, Area PADLES); personal dosimeters (CAD active and CPD passive, read on Earth); and the analysis by the Space Radiation Analysis Group (SRAG), at Johnson Space Center, which turns the measurements into organ dose and effective dose. For six months, the most recent NASA technical summary gives 50 to 100 mSv, not 80 to 160 mSv.**

| Layer | Instrument | How it works and status |
| --- | --- | --- |
| Area, active | ISS-RAD (RAD) | Charged particles and fast neutrons; made by Southwest Research Institute; in LAB106 since May 2020; can generate a local dose rate alarm [OFFICIAL](https://ntrs.nasa.gov/api/citations/20250008430/downloads/ISS-RAD_SC25_WRMISS-2025-V2.pdf) [OFFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm) |
| Area, active | REM and HERA (Timepix technology) | Silicon pixels record each particle; REM on the ISS since 2012; HERA, made for the Orion alert, has collected data on the ISS since April 2021 [OFFICIAL](https://three.jsc.nasa.gov/articles/CurrentActiveDetectors.pdf) [OFFICIAL](https://techport.nasa.gov/projects/10581) |
| Area, active and passive | DOSIS-3D and DOSTEL (ESA/DLR) | 11 passive points in Columbus and active silicon telescopes [OFFICIAL](https://sdg.esa.int/activity/dosis-3d-4039) |
| Area, passive | RAM and Area PADLES (JAXA) | Accumulate dose in place and are read on Earth; no real-time reading [OFFICIAL](https://ntrs.nasa.gov/api/citations/20180006494/downloads/20180006494.pdf) [OFFICIAL](https://iss.jaxa.jp/en/kiboexp/pm/padles/) |
| Personal, active | Crew Active Dosimeter (CAD) | Direct Ion Storage: radiation changes the charge on a transistor and calibration translates it into dose. It has an e-paper display and Bluetooth; measures accumulated absorbed dose and recent rate. Made by Mirion (Instadose technology), in use since 2020 (Crew-1). Data goes to laptops and down to the SRAG; it does not calculate effective dose [OFFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm) [OFFICIAL](https://ntrs.nasa.gov/api/citations/20230009510/downloads/Barzilla_ICES2023_RGaza_compressed.pdf) [PAPER](https://three.jsc.nasa.gov/bibliography/) |
| Personal, passive | Crew Passive Dosimeter (CPD) | TLD, OSLD and PNTD worn all the time, including during EVA; read in a laboratory after the flight [OFFICIAL](https://ntrs.nasa.gov/api/citations/20090021477/downloads/20090021477.pdf) |
| Analysis | SRAG (JSC) | Combines detectors, magnetic field models and orbit; expanded support during solar events and EVA [OFFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm) |

The LIDAL, cited in the initial document, is in Columbus and returned to EXPRESS Rack 3 in September 2021; there is no open proof that it is still active in November 2026. [OFFICIAL](https://www.nasa.gov/blogs/stationreport/2021/09/10/iss-daily-summary-report-9-10-2021/) The size of the CAD cited in the initial document ("two AA batteries") is NOT FOUND in the sources.

Units: gray (Gy) measures **absorbed** dose; sievert (Sv) measures **equivalent** or **effective** dose. One does not become the other without the radiation type factor. [OFFICIAL](https://ntrs.nasa.gov/citations/20080026203)

**Correction of the dose.** The range of 80 to 160 mSv in six months appears in a NIAC proposal; a later NASA technical summary gives 50 to 100 mSv, about 0.28 to 0.56 mSv per day of mean effective dose. The value changes with solar cycle, orbit and shielding. [OFFICIAL](https://ntrs.nasa.gov/api/citations/20250002403/downloads/NIAC_2022_PhI_DOnghia_CREWHat.pdf) [OFFICIAL](https://ntrs.nasa.gov/api/citations/20240008451/downloads/PASM_070124_to%20pubpress_Final.pdf) Career limit: less than 600 mSv effective. 30-day limits per organ: bone marrow 0.25 Gy-eq, lens 1.0 and skin 1.5. [OFFICIAL](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf?attachment=true) In a solar event, NOAA warns the SRAG, which coordinates with mission control and the flight surgeon; the crew can shelter in the Crew Quarters, in the US Lab or in the aft part of the Service Module. [OFFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm)

**Sources:** [NASA SRAG](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm); [radiation protection summary](https://ntrs.nasa.gov/api/citations/20240008451/downloads/PASM_070124_to%20pubpress_Final.pdf); [OCHMO-STD-100.1A](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf?attachment=true). Go deeper: [`../pesquisa/bruto/01-eclss-ambiente-radiacao.md`](../pesquisa/bruto/01-eclss-ambiente-radiacao.md), D3; RadLab data in [`12-open-data-sources.md`](12-open-data-sources.md), 2.2.

---

## 4. How is oximetry measured?

**By pulse oximeter: red light (about 660 nm) and infrared light (about 940 nm) pass through the tissue, and the ratio between the pulsatile part of the two absorptions, applied to a calibration curve, gives the saturation (SpO2). On the ISS there is an oximeter in the physical exam kit and an SpO2 channel in the Bio-Monitor; the measurement is spot or per session, not continuous.**

Oxyhemoglobin and deoxyhemoglobin absorb the two lights differently. The device calculates R = (AC660/DC660) ÷ (AC940/DC940) and converts R into SpO2 by an empirical curve made by comparison with arterial blood. It does not measure CO2, ventilation or cabin pressure. [PAPER](https://pubs.asahq.org/anesthesiology/article-pdf/70/1/98/317265/0000542-198901000-00019.pdf) [OFFICIAL](https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters)

| Equipment | Status on the ISS | Detail |
| --- | --- | --- |
| Oximeter in the physical exam kit | Confirmed in training material [OFFICIAL](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf) | Model and rate: NOT FOUND; used for a symptom or emergency, at the CMO's decision |
| Bio-Monitor | Research sessions [OFFICIAL](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) | Sensor in the headband, at least 64 Hz, engineering range of 30% to 100% |
| Tempus PRO | **Not confirmed on the ISS**; candidate for exploration, ground-tested in HESTIA in 2023 [OFFICIAL](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/) | Multiparameter monitor (ECG, pressure, SpO2, temperature) |
| Portable Oxygen Monitor | Used in EVA pre-breathe [OFFICIAL](https://ntrs.nasa.gov/api/citations/20260003925/downloads/20260003925.pdf) | Measures **ambient** O2, not the person's saturation |

Limitations: low perfusion, cold, movement, skin pigmentation, nail polish, ambient light and anemia alter the reading; a discrepant value should be repeated. [OFFICIAL](https://www.fda.gov/media/176236/download) The terrestrial reference of 95% to 100% at rest is not a flight threshold. [OFFICIAL](https://www.medlineplus.gov/lab-tests/pulse-oximetry/)

**Sources:** [FDA, oximeters](https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters); [NASA, medical kit](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf); [CSA, Bio-Monitor](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp). Go deeper: [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), "Pulse oximetry".

---

## 5. What are the medical measurement or life support equipment of the environment?

**Environment: the Environmental Control and Life Support System (ECLSS) generates oxygen, removes CO2 and contaminants, controls temperature and humidity, recycles water and detects fire, and analyzers such as the MCA measure the atmosphere continuously. Medicine: the Crew Health Care System (CHeCS), with three parts (HMS for medical care, EHS for environmental health and CMS for exercise), plus kits, ultrasound and OCT.**

Environment (details in [`../pesquisa/bruto/01-eclss-ambiente-radiacao.md`](../pesquisa/bruto/01-eclss-ambiente-radiacao.md)):

| Equipment | Function | Measures what, in what unit | Continuous? |
| --- | --- | --- | --- |
| OGA (USOS) and Elektron-VM (ROS) | Generate O2 by water electrolysis; OGA up to 9.25 kg per day [OFFICIAL](https://ntrs.nasa.gov/api/citations/20240007995/downloads/ICES2024141%20ISS%20ECLS%20Presentaton%20RevA.pdf) | They are not sensors | Operate on command |
| CDRA and 4B CO2 (USOS), Vozdukh (ROS) | Remove CO2; the 4B CO2 appears as primary removal in 2026 [OFFICIAL](https://ntrs.nasa.gov/citations/20260007665) | They are not sensors | Cycles |
| TCCS | Removes trace contaminants [OFFICIAL](https://ntrs.nasa.gov/citations/20030065986) | Does not measure | Continuous |
| CCAA | Temperature and humidity, 200 to 400 ft³/min [OFFICIAL](https://ntrs.nasa.gov/api/citations/20240007333/downloads/ICES_085_Presentation_Final.pdf) | °C, % | Continuous |
| WPA, UPA and BPA | Recycle water; 98% recovery demonstrated in 2023 [OFFICIAL](https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/) | Levels and states | Continuous |
| Major Constituent Analyzer (MCA) | Mass spectrometer [OFFICIAL](https://ntrs.nasa.gov/citations/20060023360) | N2, O2, H2, CO2, CH4, vapor; mmHg or torr | **Yes** |
| AQM, ANITA-2, SAM | Volatile organic compounds [OFFICIAL](https://ntrs.nasa.gov/citations/20170002579) [OFFICIAL](https://www.esa.int/sv/articles/anita-air-quality-monitoring-for-the-international-space-station) | ppm or ppb per compound | No (AQM twice a week; the original ANITA, 6 min cycle) |
| CSA-CP | Combustion products [OFFICIAL](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20170002222.pdf) | CO, HCl, HCN in ppm | On demand |
| Smoke detectors | Fire alarm [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf) | Discrete alarm | Yes |
| TOCA, water microbiology kit, air and surface samplers | Water quality and microbes [OFFICIAL](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf) | mg/L, pH, µS/cm, CFU | No; sample and incubation |
| Acoustic monitor SV102A+ | Noise [OFFICIAL](https://ntrs.nasa.gov/api/citations/20240006442/downloads/ICES-2024-354%20ISS%20Acoustics.pdf?attachment=true) | dBA | Spot or campaign |
| SSLA lighting | LED with 4500 K, 6500 K and 2700 K modes [OFFICIAL](https://ntrs.nasa.gov/api/citations/20160006727/downloads/20160006727.pdf) | K | By routine |

Medicine (CHeCS) [OFFICIAL](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf):

| Part | Equipment |
| --- | --- |
| HMS, medical care | ALSP, AMP, CMRS, RSP kits, defibrillator (AED) [OFFICIAL](https://ntrs.nasa.gov/api/citations/20100022009/downloads/20100022009.pdf?attachment=true) and Medical Kit with pressure, glucose, visual acuity, oximeter, thermometer and stethoscope [OFFICIAL](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf); ultrasound U2 (since 2011) and U3 (delivered in 2025, checkout in February 2026, will replace the U2) [OFFICIAL](https://www.nasa.gov/blogs/spacestation/2026/02/05/dragon-preps-artificial-intelligence-and-medical-gear-fill-crews-day/); OCT, fundus camera and tonometer [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |
| EHS, environmental health | Chemical and microbiological quality of air, water and surfaces (table above) |
| CMS, countermeasures | ARED (resistance, since 2008), CEVIS (bicycle, since 2001), T2 (treadmill, since 2009), heart rate and pressure monitor [OFFICIAL](https://www.nasa.gov/missions/station/iss-research/astronaut-exercise/) |
| Others | SLAMMD (mass by F = m·a, precision of 0.5 lb) [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2023/11/roi-iss-facilities-june2023.pdf?emrc=698425c585f1b); PFS for respiratory gases; KUDUwave for hearing |

**Correction.** The Tempus PRO, listed on the "Links" tab as ISS equipment, is not confirmed as operational on the station ([section 4](#4-how-is-oximetry-measured)).

**Sources:** [NASA, ECLSS](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/); [NASA, ISS Familiarization](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf). Go deeper: [`../pesquisa/bruto/01-eclss-ambiente-radiacao.md`](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) and [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md).

---

## 6. What are the astronauts' personal information collection equipment?

**Few are for daily use: the CAD dosimeter and the iPad with ISS FIT (food and fluid logging). The other wearables (Bio-Monitor, Actiwatch, Holter, temperature sensors, EEG headbands) are used in research sessions or campaigns, and the medical kit is used on a spot basis.**

| Equipment | Measures | How it delivers | Use |
| --- | --- | --- | --- |
| CAD [OFFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm) | Radiation dose and rate | Display, Bluetooth to laptop, downlink to the SRAG | During the mission |
| CPD [OFFICIAL](https://ntrs.nasa.gov/api/citations/20090021477/downloads/20090021477.pdf) | Integrated dose | Read in a laboratory after the flight | Continuous, no onboard reading |
| iPad with ISS FIT [OFFICIAL](https://www.nasa.gov/directorates/esdmd/hhp/nutritional-biochemistry/) | Foods, kcal, protein, sodium, fluids in mL | Weekly submission to nutritionists and physicians | Daily, since 2016 |
| Bio-Monitor [OFFICIAL](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) | ECG, breathing, SpO2, estimated systolic pressure, skin, movement | Base and downlink after the session | Sessions of up to 48 h |
| Actiwatch Spectrum [OFFICIAL](https://ntrs.nasa.gov/api/citations/20200001281/downloads/20200001281.pdf) | Movement and light (sleep estimate) | File synced to the ground | Two-week campaigns |
| Holter (ESA Cardiolab) [OFFICIAL](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Cardiolab) | Ambulatory ECG | Download for ground analysis | Studies of about 24 h |
| Thermolab and Double Sensor [OFFICIAL](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Circadian_Rhythms) | Skin temperature (circadian rhythm) | Analysis with sleep diary | Studies |
| Personal CO2 Monitor [OFFICIAL](https://www.nasa.gov/missions/station/iss-research/wearable-tech-for-space-station-research/) | CO2 near the face | iPad (2016) | Demonstration |
| Smart Flight Suit 2 [OFFICIAL](https://www.nasa.gov/blogs/stationreport/2024/01/25/iss-daily-summary-report-1-25-2024/) | ECG, pressure and temperature | Demonstration | 2024 |
| Dreem headband and in-ear EEG [OFFICIAL](https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023/) | Sleep EEG | Data to the science team | Experiments of 2021 and 2023 |
| Medical kit (oximeter, cuff, thermometer, glucometer) [OFFICIAL](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf) | Vital signs and glucose | Reading recorded by the CMO | Symptom or emergency |
| Laptop tests (WinSCAT, Reaction Self Test) [OFFICIAL](https://ntrs.nasa.gov/api/citations/20080009715/downloads/20080009715.pdf) | Cognition, reaction time, lapses | Result sent to the ground | Monthly or per protocol |

In the software, each one becomes a `Dispositivo` (Device) with its own `tipo` and readings with the right `disponibilidade` ([`06-data-model.md`](06-data-model.md)).

**Sources:** the URLs in the table. Go deeper: [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), D2 and master table.

---

## 7. How does blood measurement work? How far is it analyzed in orbit, and what are the challenges?

**Most of the blood collected in orbit is centrifuged, frozen at down to minus 80 °C in the MELFI freezer and analyzed on Earth, with results days or months later. Onboard, only spot and limited tests: the i-STAT with cartridges (basic chemistry and troponin, according to a NASA report), urine strips and the kit glucometer. HemoCue and rHEALTH ONE were demonstrations, not routine.**

How it is done: trained crew members do assisted venous collection or self-collection, with body restraint. The first blood collection on the ISS was in October 2006, on Expedition 14. The tube goes to the Refrigerated Centrifuge, is aliquoted, frozen and returns on a cargo vehicle; NASA records delivery to researchers about 72 hours after the Dragon reentry. [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2023/03/human-adaptation-2020-final.pdf) [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf)

When: in the Spaceflight Standard Measures, collections at FD30 and around R-30 [OFFICIAL](https://ntrs.nasa.gov/citations/20230014025); in the Biochemical Profile study, FD15, FD30, FD60, FD120, FD180 and R-14. These are research protocols, not a clinical obligation for everyone. [OFFICIAL](https://nlsp.nasa.gov/search/data/details/2a30c3f0-93d8-5060-b546-ba229f740cc3?dataType=EXPERIMENTS)

| Resource | What it does onboard | Status |
| --- | --- | --- |
| i-STAT | Disposable cartridges; result in minutes | In the kit, cited for troponin and basic chemistry [OFFICIAL](https://ntrs.nasa.gov/api/citations/20250001074/downloads/NASA%20SP-20250001074%20REV1.pdf?attachment=true); current cartridge list NOT FOUND |
| Urine strips | pH, density, glucose, blood, protein, ketones | Spot visual reading [PAPER](https://academic.oup.com/clinchem/article/69/5/442/7113323) |
| HemoCue WBC DIFF | Leukocytes and differential | Demonstration in 2020 and 2021 [OFFICIAL](https://ntrs.nasa.gov/citations/20240004905) |
| rHEALTH ONE | Flow cytometry with about 10 µL | Demonstration in May 2022 [OFFICIAL](https://ntrs.nasa.gov/citations/20230001079) |
| Saliva | Cortisol, latent viruses (EBV, VZV, CMV) | Analyzed only on Earth [OFFICIAL](https://ntrs.nasa.gov/citations/20100040666) |

Challenges: in microgravity the liquid does not fall into the tube (surface tension, bubbles, capillarity); there is biohazard and sharps risk; the sample identification chain must be preserved; freezer space and return depend on cargo logistics; and the result arrives late, which prevents immediate clinical use. [OFFICIAL](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/in-situ-lab-analysis/)

In the software: the reading is born `pendente_laboratorio` (pending laboratory) and the result enters later, with `instanteUtc` of the collection and `instanteDisponivelUtc` of the arrival ([`06-data-model.md`](06-data-model.md)). Point-of-care results and laboratory reports are kept separate.

**Sources:** [NASA, In-Situ Lab Analysis](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/in-situ-lab-analysis/); [NASA, Human Adaptation to Spaceflight](https://www.nasa.gov/wp-content/uploads/2023/03/human-adaptation-2020-final.pdf). Go deeper: [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), "Blood, urine, saliva".

---

## 8. Is everyone awake on the ISS or is there a rotation?

**There is no fixed rotation. The crew follows a common day in GMT/UTC, with a planned sleep window for everyone (reference: 21:30 to 06:00 GMT). Sleep changes or is split in exceptions, such as vehicle arrival and departure, EVA and contingencies. Those who stay awake are at Mission Control, which operates 24 hours a day in shifts.**

Reference day published by NASA: wake up around 06:00 GMT, work from 08:00 to 17:00, start of the sleep window around 21:30. [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2018/04/iss-operating_an_outpost-tagged.pdf) The NASA-STD-3001 standard recommends a sleep opportunity of 8.5 hours and avoiding critical tasks in nominal sleep. [OFFICIAL](https://www.nasa.gov/reference/6-0-medical-operations/) The station makes about 16 orbits of the Earth per day, with 16 sunrises; controlled light and schedule set the rhythm. [OFFICIAL](https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp)

| Data | Value | Source |
| --- | --- | --- |
| Sleep measured by actigraphy in flight | 6.09 ± 0.67 h per night (21 astronauts) | [PAPER](https://pubmed.ncbi.nlm.nih.gov/25127232/) |
| Self-reported sleep on six-month missions | 6.5 ± 1.4 h; only 5.9% of nights within the 8.5 h | [PAPER](https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197/) |
| Sleep split by vehicle operations | 8 of 19 crew members, 11 episodes; 2.89 h and 4.30 h on average | [OFFICIAL](https://ntrs.nasa.gov/citations/20240002094) |
| Sleep medication use | 12 of 16 astronauts (75%) at least once | [PAPER](https://pubmed.ncbi.nlm.nih.gov/25127232/) |

Each person has an individual compartment the size of a phone booth, and earplugs and eye masks are common. [OFFICIAL](https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp) The SSLA lighting changes to 2700 K before sleep. [OFFICIAL](https://ntrs.nasa.gov/api/citations/20160006727/downloads/20160006727.pdf) This feeds `Tripulante.horarioSono` (Crew member sleep schedule) in `docs/06` and scenario C4 (sleep debt before EVA).

**Sources:** [ESA, An astronaut's rhythm](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts/An_astronaut_s_rhythm); [NASA, Sleep Shifting](https://ntrs.nasa.gov/citations/20240002094); [NASA, Mission Control Center](https://www.nasa.gov/johnson/jsc-mission-control-center/). Go deeper: [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), section 5.

---

## 9. What open databases does NASA make available about astronaut life support?

**The main ones are the Open Science Data Repository (OSDR, with GeneLab, ALSDA, EDA and RadLab), the NASA Life Sciences Portal (NLSP) with LSDA and LSAH (these by request), data.nasa.gov, the NTRS and the DONKI API; outside NASA, the NOAA SWPC. None provides individual astronaut medical data in the open.**

| Database | What it has | Access |
| --- | --- | --- |
| OSDR [OFFICIAL](https://science.nasa.gov/biological-physical/data/osdr/) | Biological and human research studies; REST API tested | Open; part controlled |
| EDA and RadLab (in the OSDR) [OFFICIAL](https://visualization.osdr.nasa.gov/eda/) | Historical ISS environment and radiation | Open |
| NLSP, LSDA, LSAH [OFFICIAL](https://nlsp.nasa.gov/) | Human research and longitudinal health | Open catalog; data by formal request and ethics review |
| data.nasa.gov and NTRS [OFFICIAL](https://data.nasa.gov/) [OFFICIAL](https://ntrs.nasa.gov/) | Dataset catalog and technical reports (including ECLSS) | Open |
| DONKI [OFFICIAL](https://ccmc.gsfc.nasa.gov/tools/DONKI/) | Space weather events | Open; the old api.nasa.gov route returned 404 |
| NOAA SWPC [OFFICIAL](https://www.swpc.noaa.gov/products/goes-proton-flux) | GOES protons, Kp, alerts | Open |
| ISS Live [SECONDARY](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript) | Part of the ECLSS telemetry | Open, no official dictionary |

The "Links" tab got the privacy rule right (aggregate free, individual by request and ethics committee). Two adjustments: the OSDR's "cabin environmental telemetry" is historical, by campaign, and not a live feed; and the count of "more than 500 studies" was not checked by the research. [OFFICIAL](https://github.com/nasa/OSDR_Tutorials/blob/main/source/pages/guides/environmental_data_application.md)

**Sources:** those in the table. Go deeper: [`12-open-data-sources.md`](12-open-data-sources.md), with fields, formats, licenses and tested responses.

---

## 10. Does NASA already use bone conduction glasses?

**It uses them in research, not in operation. In 2024 NASA evaluated five commercial bone conduction headsets for received voice in the xEMU suit (the PDF on the "Links" tab), measuring only fit and comfort in five engineers, without testing intelligibility, sleep or well-being. The research did not find in-flight use by astronauts.**

| Aspect | What the ICES-2024-209 study (Cavanaugh, NASA JSC) reported |
| --- | --- |
| Reason | Echo in the helmet: the microphone picked up the audio from the speakers; bone conduction would be the fallback for received audio |
| Devices | Code Red Battle Zero-M, Motorola RMN5114A, PMLN4585A, RMN5048B and Shokz OpenComm |
| Method | 5 participants (3 men, 2 women), 6 hours per headset, comfort questionnaires |
| Result | Three tied on fit; the Shokz was the most comfortable, but the Bluetooth battery did not meet a long EVA |
| Not tested | Intelligibility (proposed goal of 90% for a future test), music, sleep, psychological effect |
| Design | Lateral point near the condyle, contact force of about 4.9 N, best sensitivity near 1 kHz |

[OFFICIAL](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf)

Other bone conduction precedents: the Dreem sleep headband, used on the ISS, has bone transducers, turned off in the published validation and with no demonstrated sound use in flight [PAPER](https://pmc.ncbi.nlm.nih.gov/articles/PMC7751170/); the MIT AttentivU prototype uses a bone conduction piezoelectric and flew on a parabolic aircraft in 2022 [PAPER](https://www.abstractscorecard.com/uploads/Tasks/upload/21810/DPPWZUCK-1650206-1-PDF.pdf). No study found measured bone conduction in microgravity. [INFERENCE](https://pubmed.ncbi.nlm.nih.gov/8214826/)

For the Orbit glasses: historical noise of 56 to 69 dBA in the modules [OFFICIAL](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20100031889.pdf) and NASA-STD-3001 alarm and personal audio rules [OFFICIAL](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/) require pausing the sound immediately and never masking alarms.

**Sources:** [Cavanaugh, ICES-2024-209](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf). Go deeper: [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), section 1.

---

## 11. Does NASA already use EEG and EOG, portable or in a module?

**Yes, but only in experiments: since Skylab (1973), through Neurolab (1998), Mir and Neurospat (62-electrode cap in the Columbus module, 2009 to 2013), up to recent wearables such as the Dreem headband (2021 and 2023) and the in-ear EEG of Sleep in Orbit (2023). None is a routine monitor, and no EOG in a glasses frame has been used on the ISS.**

| Type | Precedent | What it was |
| --- | --- | --- |
| Onboard laboratory | Skylab M133, NASA, 1973 | Cap with EEG and EOG and a panel in the sleep cabin that estimated the sleep stage; one astronaut per mission [OFFICIAL](https://ntrs.nasa.gov/citations/19750019675) |
| Onboard laboratory | Neurolab, space shuttle STS-90, 1998 | 20-channel polysomnography (4 EEG, 2 EOG); 4 astronauts, 16 sleep recordings [OFFICIAL](https://ntrs.nasa.gov/api/citations/20020073385/downloads/20020073385.pdf) |
| Onboard laboratory | Son-3, Mir station | EEG, EOG, EMG and ECG of the Russian-Bulgarian program [OFFICIAL](https://ntrs.nasa.gov/api/citations/19910017355/downloads/19910017355.pdf) |
| ISS module | Neurospat, ESA, 2009 to 2013 | 62-electrode cap in Columbus, five astronauts [OFFICIAL](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/PromISSe/Neurospat) |
| ISS module, camera | Eye Tracking Device, Expeditions 9, 11, 13, 14 and 16 | Camera eye tracking, 31 astronauts; it is not EOG [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf) |
| Portable | Nightcap, Mir, 1990s | Eyelid and body movement for wake, REM and non-REM; 5 participants [OFFICIAL](https://www.nasa.gov/wp-content/uploads/static/history/SP-4225/science/issphase1sci.pdf) |
| Portable | Dreams with Dreem, CNES, 2021 and 2023 | Dry EEG headband used on the ISS [OFFICIAL](https://cnes.fr/en/projects/mission-alpha) [OFFICIAL](https://www.nasa.gov/blogs/stationreport/2023/07/10/iss-daily-summary-report-7-10-2023/) |
| Portable | Sleep in Orbit, ESA and Aarhus, 2023 | EEG in molded ear pieces; 20 nights with good signal [OFFICIAL](https://www.esa.int/articles/about-us/directorates/human-and-robotic-exploration/health-science-in-orbit) |
| Portable | Neurowellness in Space, NASA, 2022 | Portable EEG headset; channels and results not published [OFFICIAL](https://www.nasa.gov/blogs/stationreport/2022/04/12/iss-daily-summary-report-4-12-2022/) |
| Portable, outside the ISS | AttentivU (MIT) and JINS MEME | Glasses with EEG and EOG (AttentivU, parabolic flight) and with EOG (JINS MEME, ground only) [PAPER](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf) [MANUFACTURER](https://jins-meme.github.io/jinsmeme-platform/en/hardware.html) |

What can be promised: EEG estimates sleep stages and is an estimate, not polysomnography; EOG captures blinks and eye movement as an auxiliary drowsiness signal. There is no evidence that EOG detects SANS. [INFERENCE](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) For the pitch: AttentivU already combines EEG, EOG and bone conduction in one frame, so the combination alone is not unprecedented; the differentiator is the integration with the health dashboard, offline, with sounds chosen by the crew member. [INFERENCE](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf)

**Sources:** those in the table. Go deeper: [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), sections 2, 3 and 8.

---

## 12. What health software does NASA use? Who developed it, when, and is it still in use?

**There is no single application. Onboard: CHeCS with the MEC computer, SSC laptops, WinSCAT (cognition, since Expedition 1, monthly until 2025), OnePortal (exercise), ISS FIT (diet, since 2016), KUDUwave (hearing, replaced the EarQ in 2021) and the IPV procedure viewer. On the ground, the MIST suite. The decision support projects (MDA, CDSS, xEHR) do not yet fly as an operational system.**

| Software | Who | Since | Still in use? | Replaced |
| --- | --- | --- | --- | --- |
| CHeCS and MEC | NASA JSC | Catalogs of 2008 and 2011 | Function confirmed in 2025 [OFFICIAL](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf) | |
| WinSCAT | NASA JSC | Expedition 1 | Yes until 2025 [OFFICIAL](https://ntrs.nasa.gov/api/citations/20250011491/downloads/BHP%20Operations%20Overview_Navy_Revised.pdf) | |
| Cognition (CTB) | University of Pennsylvania for the HRP | 2016 | Research | Does not replace WinSCAT |
| Reaction Self Test | NASA and University of Pennsylvania | Project concluded in 2024 [OFFICIAL](https://techport.nasa.gov/projects/23201) | Not confirmed | |
| ISS FIT | NASA with Topcoder | 2016 | Until 2024 [OFFICIAL](https://www.nasa.gov/directorates/esdmd/hhp/nutritional-biochemistry/) | Spreadsheets and questionnaires |
| OnePortal | NASA JSC | First use on MED-2 | Active [OFFICIAL](https://www.nasa.gov/reference/jsc-exercise-countermeasures/) | |
| OOHA with KUDUwave | NASA | EarQ from 2000 to 2021 | Yes (2023) [PAPER](https://ntrs.nasa.gov/citations/20240009887) | EarQ |
| MIST (ground) | NASA JSC | Described in 2023 | Yes [OFFICIAL](https://www.nasa.gov/general/medical-information-systems-and-tools-mist/) | |
| IMM and MEDPRAT | NASA HRP and ExMC | IMM updated in 2026 | IMM is the accepted standard [OFFICIAL](https://ntrs.nasa.gov/citations/20240012058) | MEDPRAT evolves the IMM |
| OPTIMIS | NASA JSC | 2015 | Yes [OFFICIAL](https://ntrs.nasa.gov/api/citations/20230007636/downloads/AsMa%20CSpine%20Presentation%20-%20Markings%20Removed%20v3.pdf) | OSTPV |
| IPV | NASA and partners | IPV 4.1.2 in 2024 | Yes in 2024 | |
| MDA, CDSS, CHP-IDA, xEHR | NASA ExMC and HRP | Prototypes and requirements from 2018 to 2023 | In development [OFFICIAL](https://ntrs.nasa.gov/citations/20220017869) | |
| CIMON | DLR, Airbus and IBM | 2018 | Demonstration [OFFICIAL](https://www.nasa.gov/image-article/robot-colleagues-meet-aboard-international-space-station/) | |

In 2024 NASA still recorded scattered health data downloaded by hand; this is the gap that Orbit Health attacks. [OFFICIAL](https://ntrs.nasa.gov/citations/20240008508)

**Sources:** those in the table. Go deeper: [`12-open-data-sources.md`](12-open-data-sources.md), section 6 (full table) and [`../pesquisa/bruto/06-dados-abertos-software-fluxo.md`](../pesquisa/bruto/06-dados-abertos-software-fluxo.md), section 2.

---

## 13. Is there real-time monitoring of basic life support functions?

**Yes for the environment: the ECLSS is tracked continuously by the ETHOS controllers and by the Biomedical Engineer (BME) in Mission Control. Not for vital signs: in routine, body measurements are spot, per session or per sample. The exceptions are EVA (suit telemetry and ECG), medical emergencies and research sessions.**

| What | Real time? | Who follows |
| --- | --- | --- |
| Atmosphere, pressure, water, ventilation, fire | Yes | ETHOS (a control position, not software) and BME [OFFICIAL](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/) [OFFICIAL](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/) |
| Vital signs in routine | No; separate devices, periodic use [OFFICIAL](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/) | Crew member, CMO, flight surgeon |
| EVA | Yes, during the activity: ECG, heart rate, metabolism, suit state [OFFICIAL](https://standards.nasa.gov/sites/default/files/standards/NASA/B/0/nasa-std-3001_vol_2_rev_b.pdf) | Flight control and physician |
| Medical emergency | Measurements directed to the case [OFFICIAL](https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf) | CMO with the flight surgeon |
| Exercise, Bio-Monitor | Per session, with download afterward | Specialists and researchers |
| Medical conversation | Weekly PMC, private [OFFICIAL](https://www.nasa.gov/directorates/esdmd/hhp/flight-surgeons/) | Flight surgeon |

This defines the role of Orbit Health: showing the crew member themself, onboard and without a network, what today is scattered, with each data point marked by its origin and age.

**Sources:** those in the table. Go deeper: [`12-open-data-sources.md`](12-open-data-sources.md), section 5, and [`../pesquisa/bruto/06-dados-abertos-software-fluxo.md`](../pesquisa/bruto/06-dados-abertos-software-fluxo.md), section 3.
