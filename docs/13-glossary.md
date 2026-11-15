# 13. Glossary

> For whom: the whole team, including the development AI.
> Question it answers: what does each acronym or technical term used in the documents and in the research mean?
> How to use: look up the term in the table, in alphabetical order. The "Where it appears" column leads to the document in which the term is most used or explained.

## How the list was built

- A sweep of all documents in `docs/` (00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 14, 16) and of the research in `pesquisa/bruto/` (fronts 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 13, 14, 15, 16, 17, 18, 19; there is no front 12), done on 15/11/2026. All words with two or more capital letters or with a capital letter and a number were extracted, then filtered by hand to remove code ids, component names, evidence tags and common words in capitals.
- **Expansion** only appears when it is written in one of the documents. When the document gives only the translation, the column shows the English expansion. When no document expands the term, the column says "expansion not recorded in the documents". Proper names, units and words that are not acronyms are marked "not an acronym".
- **What it is** summarizes, in one sentence, what the documents themselves say about the term. It is not an official definition.
- **Where it appears**: number of the document in `docs/` or of the front in `pesquisa/bruto/`. The `docs/` document with the most occurrences of the term applies; when it appears only once in `docs/`, the research front with the most occurrences applies. For terms with two meanings and for central acronyms, the document that explains the term was fixed.
- Terms with two meanings (AR, HERA, REM, T2) have one row for each meaning.
- Terms that are Portuguese words in the source documents (actigrafia, linha de base, condução óssea, hipnograma, microgravidade, grade de Amsler) are listed under their English name, with the Portuguese term in parentheses where it matters.
- The evidence tags ([OFFICIAL], [PAPER], [MANUFACTURER], [EARTH-GUIDELINE], [TESTED], [SECONDARY], [INFERENCE]) are explained in [`00-reading-guide.md`](00-reading-guide.md) and are not repeated here.
- Acronyms that were requested but do not appear in any document (for example AOS and LOS) were left out.

Total: **470 terms**, of which 137 have no recorded expansion and 61 are not acronyms.

## Table

| Acronym or term | English expansion (when available) | What it is | Where it appears |
| --- | --- | --- | --- |
| **4B CO2** | Four Bed CO2 Scrubber | CO2 remover of the US segment with zeolite beds; appears as the primary CO2 removal in 2026. | [02](02-equipment-and-data.md) |
| **4BMS** | expansion not recorded in the documents | Another name used for the Four Bed CO2 Scrubber (4B CO2). | [02](02-equipment-and-data.md) |
| **AAO** | American Academy of Ophthalmology | American academy of ophthalmology, cited for visual acuity, the Amsler grid and intraocular pressure. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **AASM** | expansion not recorded in the documents | Source of the EEG and EOG filtering criteria cited as terrestrial guidance. | [front 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **ACI** | As Clinically Indicated | Marks, in the medical calendar, an exam done when clinically indicated. | [02](02-equipment-and-data.md) |
| **ACS** | Atmosphere Control and Supply | ECLSS subsystem that controls cabin pressure and adds O2 and N2. | [02](02-equipment-and-data.md) |
| **actigraphy** | not an acronym | Wrist-watch recording that estimates sleep from movement (and, in some models, from light). | [01](01-mission-context.md) |
| **Actiwatch** | not an acronym | Actigraph watch used in flight to estimate sleep from movement and light. | [02](02-equipment-and-data.md) |
| **ADA** | American Diabetes Association | American diabetes association, source of the terrestrial glucose ranges used as reference. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ADS1299** | not an acronym | Texas Instruments circuit that digitizes EEG and EOG at 24 bits; the 4-channel version is the AFE planned for the glasses. | [09](09-orbit-glasses.md) |
| **AEB** | expansion not recorded in the documents | Brazilian agency that records a 1997 arrangement with the US for ISS equipment and payloads, currently suspended. | [16](16-next-steps-and-impact.md) |
| **AED** | Automated External Defibrillator | Automated external defibrillator in the ISS medical response kits. | [02](02-equipment-and-data.md) |
| **AFE** | analog front end | Circuit that captures and digitizes the EEG and EOG signals of the glasses. | [09](09-orbit-glasses.md) |
| **Ag/AgCl** | expansion not recorded in the documents | Gel electrode, the clinical reference for EEG; prolonged use on the frame requires comfort and drying tests. | [front 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **AIAA** | expansion not recorded in the documents | Appears in the code of paper AIAA 2023-4656, on wireless EEG and EOG glasses in parabolic flight. | [11](11-precedents.md) |
| **ALARA** | expansion not recorded in the documents | Criterion of the radiation exposure plan into which the dose per organ must be integrated. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ALSDA** | Ames Life Sciences Data Archive | Life sciences data archive of the Ames center, now integrated into the OSDR. | [12](12-open-data-sources.md) |
| **ALSP** | Advanced Life Support Pack | Advanced life support kit of the ISS. | [02](02-equipment-and-data.md) |
| **ALTEA** | expansion not recorded in the documents | Radiation detector in the Columbus module to which LIDAL adds the measurement of light ions. | [02](02-equipment-and-data.md) |
| **AMO** | Autonomous Medical Operations | NASA project to support the CMO in medical operations with more autonomy. | [front 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **AMOS** | Autonomous Medical Officer Support | Project supporting onboard medical procedures, used in demonstrations of medical AI in a simulated mission. | [11](11-precedents.md) |
| **AMP** | Ambulatory Medical Pack; also Assisted Medical Procedures | In the ISS kits, the ambulatory medical pack; in another context, a NASA project on assisted medical procedures. | [02](02-equipment-and-data.md) |
| **Amsler grid** | not an acronym | Test in which one looks at a grid and marks wavy, blurred or missing lines; part of the SANS protocol. | [03](03-indicators-and-thresholds.md) |
| **ANAM** | Automated Neuropsychological Assessment Metrics | Brief five-task neurocognitive screening that measures speed and accuracy. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **ANITA** | expansion not recorded in the documents | ESA FTIR spectrometer that analyzes 32 air contaminants; ANITA-2 is the compact version launched in 2021. | [02](02-equipment-and-data.md) |
| **ANPD** | expansion not recorded in the documents | Brazilian authority cited on the legal bases for processing health data under the LGPD. | [16](16-next-steps-and-impact.md) |
| **AO** | expansion not recorded in the documents | Research call, such as the CSA calls for ISS life sciences (2024 and 2026) and the ESA call for Concordia (AO-2026). | [16](16-next-steps-and-impact.md) |
| **API** | expansion not recorded in the documents | Programming interface through which the software queries data such as DONKI, OSDR and RadLab. | [12](12-open-data-sources.md) |
| **AQM** | Air Quality Monitor | Monitor that measures volatile organic compounds in the air by GC-DMS. | [02](02-equipment-and-data.md) |
| **AR** | Atmosphere Revitalization | Part of the ECLSS that removes CO2, water and contaminants from the air; includes CDRA, TCCS and OGA. | [02](02-equipment-and-data.md) |
| **AR** | augmented reality | Technology of glasses and headsets already taken to the ISS for procedures and maintenance, not for health. | [11](11-precedents.md) |
| **ARCHeR** | Artemis Research for Crew Health and Readiness | Artemis II study that recorded crew movement and sleep with wristbands. | [16](16-next-steps-and-impact.md) |
| **ARED** | Advanced Resistive Exercise Device | Resistive exercise device of the US segment. | [01](01-mission-context.md) |
| **Artemis II** | not an acronym | Crewed lunar flyby mission (April 2026, about 9 days) that flew with HERA sensors and sleep wristbands. | [16](16-next-steps-and-impact.md) |
| **ASCR** | Astronaut Strength, Conditioning and Rehabilitation | Team that prescribes and evaluates astronaut exercise. | [02](02-equipment-and-data.md) |
| **AsMA** | expansion not recorded in the documents | Organization whose 2026 program cites a demonstration of CMO-DA on an edge computer with MedGemma. | [11](11-precedents.md) |
| **Astroskin** | not an acronym | Monitoring garment from Carré Technologies evaluated by NASA; it must not be confused with the Bio-Monitor. | [14](14-answered-questions.md) |
| **ATS** | American Thoracic Society | American society cited as the source of the SSS scale and of the GAD-7. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **AttentivU** | not an acronym | Research glasses with EEG in the temples, aimed at attention and engagement, not sleep. | [09](09-orbit-glasses.md) |
| **ATU** | Audio Terminal Units | ISS audio terminals with microphone, speaker, keypad and conference circuits. | [front 04](../pesquisa/bruto/04-precedentes-oculos-sono.md) |
| **AUA** | American Urological Association | American urology association, source of terrestrial guidelines on kidney stones and urine volume. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **AUC** | expansion not recorded in the documents | Classifier performance measure (AUC ROC) cited in anomaly detection studies. | [front 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **AWS** | Amazon Web Services | Cloud where a copy of the OSDR open data is hosted. | [12](12-open-data-sources.md) |
| **Ax-1, Ax-4** | expansion not recorded in the documents | Private Axiom Space missions to the ISS; Ax-1 demonstrated urine analysis and Ax-4 is cited as a commercial research route. | [16](16-next-steps-and-impact.md) |
| **B2B** | Business-to-Business | ISS National Lab commercial route in which the customer pays its own costs and the provider's. | [front 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **BAA** | expansion not recorded in the documents | NASA announcement in whose annexes the SBIR and STTR topics are published. | [front 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **baseline (linha de base)** | not an acronym | The normal of each crew member, computed with the mean and standard deviation of their own readings; the software compares each value against it. | [04](04-data-cross-referencing.md) |
| **BD-2** | expansion not recorded in the documents | Treadmill of the Russian segment. | [02](02-equipment-and-data.md) |
| **BEAM** | expansion not recorded in the documents | ISS module where six RAM radiation monitors stayed until December 2017. | [02](02-equipment-and-data.md) |
| **BHP** | Behavioral Health and Performance | Behavioral health professional on the ground who conducts the PPC. | [01](01-mission-context.md) |
| **BiLSTM** | bidirectional recurrent LSTM network | Type of neural network used in DeepSleepNet together with convolutional networks. | [front 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **Bio-Monitor** | not an acronym | CSA garment (instrumented shirt and headband) that records signals for up to 48 h. | [02](02-equipment-and-data.md) |
| **BLE** | Bluetooth Low Energy | Low-power radio of the glasses microcontroller and of wearables. | [09](09-orbit-glasses.md) |
| **BMD** | expansion not recorded in the documents | Bone indicator that decreases without the normal mechanical load, which raises urinary calcium. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **BME** | Biomedical Engineer | Mission Control controller who gives technical and operational support to the CHeCS. | [01](01-mission-context.md) |
| **BMMD** | expansion not recorded in the documents | Name sometimes used for the Russian mass meter (MMD); NASA does not confirm that it is the current name. | [02](02-equipment-and-data.md) |
| **bone conduction** | not an acronym | Way of playing audio used by the Orbit glasses; NASA studied it as an alternative for audio in the xEMU suit helmet. | [09](09-orbit-glasses.md) |
| **BPA** | Brine Processor Assembly | Extracts water from the urine brine; with it the ISS demonstrated recovering 98% of the water. | [02](02-equipment-and-data.md) |
| **bpm** | expansion not recorded in the documents | Beats per minute, unit of heart rate. | [02](02-equipment-and-data.md) |
| **BSAP** | bone-specific alkaline phosphatase | Laboratory marker of bone formation. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **BSFS** | Bristol Stool Form Scale | Scale that classifies stools into seven types. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **C&W** | Caution and Warning | ISS alarm system, owner of red, blinking and sound; Orbit Health does not imitate it. | [07](07-interface-design.md) |
| **C1 to C5** | expansion not recorded in the documents | Scripted demonstration scenarios; each must trigger the described alert (C1 is high CO2 with headache and slow reaction). | [05](05-software-architecture.md) |
| **CAD** | Crew Active Dosimeter | Personal wearable dosimeter that measures radiation continuously. | [02](02-equipment-and-data.md) |
| **CADMOS** | expansion not recorded in the documents | CNES partner in coordinating the Dreams sleep study with the Dreem headband on the ISS. | [front 04](../pesquisa/bruto/04-precedentes-oculos-sono.md) |
| **CASAI** | expansion not recorded in the documents | Indigenous health care unit where telehealth was deployed, according to a CGU report. | [16](16-next-steps-and-impact.md) |
| **CASIS** | expansion not recorded in the documents | Entity linked to the ISS National Lab, which publishes competitive research calls. | [front 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **CBC** | complete blood count | Blood test present in mission data atlases, such as SOMA. | [front 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **CC BY, CC0** | Creative Commons | Open licenses: CC BY allows use and adaptation with credit; CC0 is equivalent to public domain. | [12](12-open-data-sources.md) |
| **CCAA** | Common Cabin Air Assembly | Assembly that circulates cabin air, removes heat and condenses moisture. | [02](02-equipment-and-data.md) |
| **CCMC** | Community Coordinated Modeling Center | NASA center responsible for the DONKI space weather database. | [12](12-open-data-sources.md) |
| **CDB** | Coliform Detection Bag | Bag in the microbiology kit that tests for coliforms in water. | [02](02-equipment-and-data.md) |
| **CDC** | expansion not recorded in the documents | Health agency whose technical documentation is cited for trend detection; appears together with NIOSH. | [front 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **CDRA** | Carbon Dioxide Removal Assembly | Equipment that removes CO2 from the air with zeolite beds. | [02](02-equipment-and-data.md) |
| **CDS** | Clinical Decision Support | Clinical decision support, the theme of the ExMC use cases. | [front 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **CDSS** | Clinical Decision Support System | Clinical decision support system that NASA studies for missions with growing medical autonomy. | [01](01-mission-context.md) |
| **CÉAMS** | expansion not recorded in the documents | Montreal institution that maintains the MASS sleep database. | [front 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **CEVIS** | Cycle Ergometer with Vibration Isolation and Stabilization | Exercise bicycle of the US segment. | [01](01-mission-context.md) |
| **CFU** | colony forming units | Unit for counting microorganisms in culture, per mL or per 100 mL of water. | [02](02-equipment-and-data.md) |
| **CGU** | expansion not recorded in the documents | Agency whose monitoring report describes the telehealth deployed in indigenous health care. | [16](16-next-steps-and-impact.md) |
| **CHAPEA** | Crew Health and Performance Exploration Analog | Terrestrial analog of an exploration mission, cited as a place to test the glasses. | [16](16-next-steps-and-impact.md) |
| **CHeCS** | Crew Health Care System | Set of health hardware, supplies and software of the ISS, divided into HMS, EHS and CMS. | [01](01-mission-context.md) |
| **CHIPS** | Charcoal HEPA Integrated Particle Scrubbers | Charcoal and HEPA filters of temperature and humidity control. | [02](02-equipment-and-data.md) |
| **CHP-IDA** | Crew Health and Performance Integrated Data Architecture | HRP architecture to integrate health and performance data in flight and on the ground. | [11](11-precedents.md) |
| **CHU** | University Hospital (Centre Hospitalier Universitaire, of Toulouse) | Partner hospital of the Dreams sleep study on the ISS. | [09](09-orbit-glasses.md) |
| **CIMON** | Crew Interactive MObile companioN | Airbus voice assistant for the DLR, tested on the ISS without a medical function; illustrates the risk of depending on the cloud. | [11](11-precedents.md) |
| **CME** | coronal mass ejections | Coronal mass ejections, one of the space weather event types in DONKI. | [12](12-open-data-sources.md) |
| **CMO** | Crew Medical Officer | Crew member designated as the medical caregiver on board; does not need to be a physician. | [01](01-mission-context.md) |
| **CMO-DA** | Crew Medical Officer Digital Assistant | Google AI prototype, with NASA, to support the CMO in clinical decision making. | [11](11-precedents.md) |
| **CMP** | comprehensive metabolic panel | Blood test from the Inspiration4 set in the OSDR. | [12](12-open-data-sources.md) |
| **CMRS** | Crew Medical Restraint System | Item of the ISS emergency medical response kits, listed with ALSP, AMP, RSP and AED. | [02](02-equipment-and-data.md) |
| **CMS** | Countermeasures System | Part of the CHeCS for exercise: assessing fitness, prescribing and monitoring. | [01](01-mission-context.md) |
| **CMV** | cytomegalovirus | Cytomegalovirus, one of the latent viruses that can be detected again in saliva during flight. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **CNES** | expansion not recorded in the documents | Institution that, with CADMOS, coordinated the Dreams sleep study on the ISS (Alpha mission, 2021). | [11](11-precedents.md) |
| **CNN** | convolutional neural networks | Type of neural network used in sleep staging models. | [10](10-mass-energy-launch.md) |
| **CNPq** | expansion not recorded in the documents | Brazilian funding agency whose PROANTAR can fund Antarctic research. | [16](16-next-steps-and-impact.md) |
| **CNT** | counts | Raw unit in which some public telemetry temperatures appear, instead of °C. | [12](12-open-data-sources.md) |
| **CO** | expansion not recorded in the documents | Combustion gas measured in ppm by the CSA-CP after a suspected fire. | [02](02-equipment-and-data.md) |
| **CO2** | carbon dioxide | Gas exhaled by the crew that accumulates in the cabin; linked to headache and the basis of scenario C1. | [02](02-equipment-and-data.md) |
| **COLBERT** | expansion not recorded in the documents | Another name for the T2 treadmill of the US segment. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **Columbus** | not an acronym | ESA laboratory module on the ISS. | [02](02-equipment-and-data.md) |
| **Concordia** | not an acronym | Antarctic station used as an analog for isolation, confinement, seasonal light and sleep. | [16](16-next-steps-and-impact.md) |
| **COTS** | commercial off-the-shelf computing | Ordinary commercial equipment, such as the Spaceborne Computer-2 servers, tested against radiation errors. | [front 05](../pesquisa/bruto/05-massa-computacao-lancamento.md) |
| **CPD** | Crew Passive Dosimeter; also Charged Particle Detector | Personal passive dosimeter (TLD, OSLD and PNTD) read in the laboratory; in the RAD, it is the charged particle detector. | [02](02-equipment-and-data.md) |
| **CPU** | central processing unit | Ordinary computer processor, where filters, FFT and sleep staging fit. | [10](10-mass-energy-launch.md) |
| **CR-39** | expansion not recorded in the documents | Plastic particle track detector used in the Area PADLES. | [02](02-equipment-and-data.md) |
| **CRS** | Commercial Resupply Services | NASA cargo contracts for the ISS (Dragon and Cygnus), the basis of the cost per kg calculations. | [10](10-mass-energy-launch.md) |
| **CSA** | Canadian Space Agency | Canadian space agency, owner of the Bio-Monitor. | [02](02-equipment-and-data.md) |
| **CSA-CP** | Compound Specific Analyzer for Combustion Products | Portable analyzer of CO, HCl, HCN and O2 used after suspected combustion. | [02](02-equipment-and-data.md) |
| **CSD** | Consensus Sleep Diary | Consensus sleep diary, with a core of nine fields. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **CSP** | Commercial Service Provider | Commercial provider through which one enters the ISS National Lab B2B route. | [16](16-next-steps-and-impact.md) |
| **CSV** | expansion not recorded in the documents | Plain-text table format, used for example in exporting study data. | [02](02-equipment-and-data.md) |
| **CTB** | Cognition Test Battery | Battery of ten cognitive tests from the University of Pennsylvania used by the HRP. | [11](11-precedents.md) |
| **CTX** | expansion not recorded in the documents | Bone remodeling marker measured in urine or blood. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **Cupola** | not an acronym | ISS module cited in noise measurements (49.2 dBA). | [02](02-equipment-and-data.md) |
| **Cygnus** | not an acronym | Cargo vehicle that carries supplies and equipment to the ISS (for example the U3 ultrasound). | [10](10-mass-energy-launch.md) |
| **dB HL** | decibels Hearing Level | Hearing threshold per frequency recorded in the audiogram. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **dBA** | expansion not recorded in the documents | A-weighted noise level, in decibels; ISS modules recorded 56 to 69 dBA. | [02](02-equipment-and-data.md) |
| **DCS** | Decompression Sickness | Decompression sickness: gas bubbles in the body after a pressure change, especially in EVA. | [01](01-mission-context.md) |
| **DeepSleepNet** | not an acronym | Sleep staging model with CNN and BiLSTM, heavy (21 to 24.7 million parameters). | [10](10-mass-energy-launch.md) |
| **Destiny** | not an acronym | American laboratory (US Lab) of the ISS, where air revitalization equipment is located. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **DGCS** | Display and Graphics Commonality Standard | ISS display standard (SSP 50313) that regulates alert colors. | [front 07](../pesquisa/bruto/07-desafio-oficial-padroes-interface.md) |
| **DLR** | expansion not recorded in the documents | German institution that commissioned CIMON and takes part in radiation experiments (DOSIS-3D, DOSTEL). | [11](11-precedents.md) |
| **DMS** | differential mobility spectrometry | Part of the AQM GC-DMS that identifies compounds by ion mobility. | [02](02-equipment-and-data.md) |
| **Doc-in-a-Box (DIB)** | Doc-in-a-Box | Medical language model with 8 billion parameters from the LuCCI project. | [11](11-precedents.md) |
| **DOD** | Dreem Open Datasets | Dreem open sleep datasets (DOD-H, healthy people, and DOD-O). | [front 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **DONKI** | Database Of Notifications, Knowledge, Information | NASA (CCMC) database of space weather events: FLR, SEP, CME and GST. | [12](12-open-data-sources.md) |
| **DORELI** | expansion not recorded in the documents | Radiation dataset in RadLab with 300 s resolution. | [02](02-equipment-and-data.md) |
| **DOSIS-3D** | expansion not recorded in the documents | ESA and DLR experiment with passive dosimeters at 11 points in Columbus. | [02](02-equipment-and-data.md) |
| **DOSTEL** | Dose Telescope | Active silicon telescope that measures radiation in Columbus. | [02](02-equipment-and-data.md) |
| **Dragon** | not an acronym | SpaceX cargo vehicle used in the CRS contracts. | [10](10-mass-energy-launch.md) |
| **Dreem** | not an acronym | Headband with dry EEG used in the Dreams study on the ISS in 2021. | [11](11-precedents.md) |
| **DRM** | Design Reference Mission | Design reference mission for which the HSRB approves the risk rating. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **DSEI** | expansion not recorded in the documents | Units through which the SUS organizes indigenous health care (34 in total). | [16](16-next-steps-and-impact.md) |
| **DTI** | diffusion tensor imaging | Brain imaging technique used in the Brain-DTI study. | [front 04](../pesquisa/bruto/04-precedentes-oculos-sono.md) |
| **DXA** | Dual-energy X-ray absorptiometry | Bone mineral density exam done on Earth, before and after flight. | [02](02-equipment-and-data.md) |
| **EACF** | Estação Antártica Comandante Ferraz (Comandante Ferraz Antarctic Station) | Brazilian Antarctic station that keeps a physician and a nurse throughout the year. | [16](16-next-steps-and-impact.md) |
| **EarQ** | expansion not recorded in the documents | Audiometry system used on the ISS from 2000 to 2021, before the KUDUwave. | [14](14-answered-questions.md) |
| **EAU** | European Association of Urology | European urology association, source of terrestrial criteria for urine and kidney stones. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **EBV** | Epstein-Barr virus | Latent virus that can be detected again in saliva during flight. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ECG** | electrocardiogram | Recording of the electrical activity of the heart. | [12](12-open-data-sources.md) |
| **ECLSS** | Environmental Control and Life Support System | ISS environmental control and life support system: atmosphere, water, temperature, humidity and fire response. | [02](02-equipment-and-data.md) |
| **EDA** | Environmental Data Application | Historical ISS environmental dataset (temperature, CO2, RH and dose per mission). | [12](12-open-data-sources.md) |
| **EDF** | expansion not recorded in the documents | Biosignal file format (EDF, EDF+ and EDF++) used in sleep databases such as Sleep-EDF. | [12](12-open-data-sources.md) |
| **EEG** | electroencephalography (electroencephalogram) | Recording of the electrical activity of the brain; in the glasses, used for sleep and fatigue. | [09](09-orbit-glasses.md) |
| **EHR** | Electronic Health Record | Electronic health record; NASA's in 2023 was ground-only (see xEHR). | [12](12-open-data-sources.md) |
| **EHS** | Environmental Health System | Part of the CHeCS for chemical and microbiological quality of air, water and surfaces. | [01](01-mission-context.md) |
| **EIHSO** | Earth Independent Human-Systems Operations | HRP risk of operating independently of Earth; not the same as EIMO. | [01](01-mission-context.md) |
| **EIMO** | Earth Independent Medical Operations | Medical operations independent of Earth, needed in distant missions. | [16](16-next-steps-and-impact.md) |
| **Elektron** | not an acronym | Russian segment equipment that supplies O2 by water electrolysis, in Zvezda. | [02](02-equipment-and-data.md) |
| **EMG** | electromyography | Recording of the electrical activity of muscles, used in sleep staging. | [11](11-precedents.md) |
| **EMI and EMC** | electromagnetic interference and compatibility | Tests required of onboard equipment (SSP 30237 to 30245). | [09](09-orbit-glasses.md) |
| **EMSI** | expansion not recorded in the documents | Cited with indigenous agents as part of indigenous health care in the DSEI. | [front 18](../pesquisa/bruto/18-aplicacoes-terra-impacto.md) |
| **EMU** | expansion not recorded in the documents | Extravehicular activity suit, cited so its fields are not confused with those of the Orlan suit. | [front 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **EOG** | electrooculography (electro-oculogram) | Recording of the electrical potential of the eyes; in the glasses, used for blinks, eye movements and fatigue. | [09](09-orbit-glasses.md) |
| **ESA** | expansion not recorded in the documents | Space agency that owns the Columbus module and experiments such as ANITA, MyotonPRO and Neurospat. | [11](11-precedents.md) |
| **ETD** | Eye Tracking Device | Device that measured the eyes on the ISS, cited as a precedent for the glasses. | [09](09-orbit-glasses.md) |
| **ETHOS** | Environmental and Thermal Operating Systems | Mission Control position that monitors environmental and thermal systems. | [12](12-open-data-sources.md) |
| **EVA** | Extravehicular Activity | Extravehicular activity, the spacewalk. | [01](01-mission-context.md) |
| **EWMA** | exponentially weighted moving average | Average that weights recent readings more; the engine uses it to smooth signals such as ppCO2. | [04](04-data-cross-referencing.md) |
| **ExMC** | Exploration Medical Capability | HRP element that deals with clinical support in exploration missions. | [11](11-precedents.md) |
| **Falcon 9** | not an acronym | SpaceX launcher used as the reference for launch price per kg. | [10](10-mass-energy-launch.md) |
| **FC** | expansion not recorded in the documents | Abbreviation used in the documents for heart rate (frequência cardíaca), measured in bpm. | [02](02-equipment-and-data.md) |
| **FD** | Flight Day | Flight day counted from launch (FD30 is the 30th day). | [01](01-mission-context.md) |
| **FDA** | expansion not recorded in the documents | Regulatory agency cited on oximeters and clinical decision support software. | [16](16-next-steps-and-impact.md) |
| **FDS** | Fire Detection and Suppression | Fire detection and suppression of the ECLSS. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **FFT** | fast Fourier transform | Calculation that converts the signal into frequencies; cheap for EEG and EOG. | [10](10-mass-energy-launch.md) |
| **FIT** | Food Intake Tracker | Daily record of food intake on the ISS (ISS FIT). | [01](01-mission-context.md) |
| **float32 and int8** | not an acronym | Number formats of a model's parameters: float32 uses 4 bytes and int8 uses 1 byte. | [10](10-mass-energy-launch.md) |
| **FLOPs** | expansion not recorded in the documents | Count of calculation operations of a model; not found for several sleep models. | [10](10-mass-energy-launch.md) |
| **FLR** | flares | Solar flares recorded in DONKI. | [12](12-open-data-sources.md) |
| **FND** | Fast Neutron Detector | Fast neutron detector of the RAD. | [02](02-equipment-and-data.md) |
| **FNJV** | Fonoteca Neotropical Jacques Vielliard (Jacques Vielliard Neotropical Sound Archive) | Unicamp sound archive with protected recordings, which requires a researcher request. | [front 15](../pesquisa/bruto/15-oculos-audio-acervo.md) |
| **Fpz, TP9, TP10** | expansion not recorded in the documents | EEG electrode positions on the head, used by AttentivU and Dreem and considered for the frame. | [09](09-orbit-glasses.md) |
| **FTIR** | Fourier transform infrared spectrometer | ANITA technique for measuring air contaminants. | [02](02-equipment-and-data.md) |
| **GAD-7** | Generalized Anxiety Disorder-7 | Terrestrial clinical questionnaire with seven items (total from 0 to 21); not part of the check-in without a license and clinical governance. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **Gateway** | not an acronym | Small lunar station, intermittently occupied, operated remotely when empty. | [16](16-next-steps-and-impact.md) |
| **GC-DMS** | gas chromatography with differential mobility spectrometry | AQM technique for separating and identifying VOCs. | [02](02-equipment-and-data.md) |
| **GC/MS** | gas chromatograph and mass spectrometer | SAM technique, miniaturized by the JPL. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **GCR** | Galactic Cosmic Rays | Galactic cosmic rays, continuous radiation background. | [front 09](../pesquisa/bruto/09-perfis-dados-simulados.md) |
| **GeneLab** | not an acronym | Space biology database integrated into the OSDR. | [12](12-open-data-sources.md) |
| **GMT** | Greenwich Mean Time | Official ISS time, equivalent to UTC in operational use; the app bar shows GMT day-of-year / hh:mm. | [01](01-mission-context.md) |
| **GO/NO-GO** | expansion not recorded in the documents | Fitness decision on whether or not to proceed with a task; NASA PVT+ warns that it is not suitable for this. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **GOES** | expansion not recorded in the documents | NOAA satellites whose proton flux (channel of 10 MeV or more) defines the S scale. | [12](12-open-data-sources.md) |
| **GPU** | graphics processing unit | Graphics processor; not a requirement of Orbit, it only expands capacity for vision and language. | [front 05](../pesquisa/bruto/05-massa-computacao-lancamento.md) |
| **GST** | geomagnetic storms | Geomagnetic storms, DONKI event type with a Kp series. | [12](12-open-data-sources.md) |
| **Gy** | gray | Unit of absorbed dose (with mGy and µGy); on its own it does not tell the biological damage. | [02](02-equipment-and-data.md) |
| **HALO** | expansion not recorded in the documents | Gateway module that, with the PPE, will receive the first radiation research sets. | [front 16](../pesquisa/bruto/16-artemis-marte.md) |
| **HCl and HCN** | expansion not recorded in the documents | Combustion gases measured in ppm by the CSA-CP. | [02](02-equipment-and-data.md) |
| **HemoCue** | not an acronym | Portable analyzer that reads hemoglobin or leukocytes with differential in a microcuvette. | [02](02-equipment-and-data.md) |
| **HEPA** | expansion not recorded in the documents | Type of particle filter present in the CHIPS. | [02](02-equipment-and-data.md) |
| **HERA** | Human Exploration Research Analog | NASA terrestrial isolation analog used in studies of sleep, mood, cognition and performance. | [12](12-open-data-sources.md) |
| **HERA** | Hybrid Electronic Radiation Assessor | Timepix radiation sensor made for the Orion C&W and tested on the ISS. | [02](02-equipment-and-data.md) |
| **HERO** | expansion not recorded in the documents | HRP research calls published in NSPIRES. | [16](16-next-steps-and-impact.md) |
| **HI-SEAS** | expansion not recorded in the documents | Isolation analog cited in the search for sound interventions. | [front 04](../pesquisa/bruto/04-precedentes-oculos-sono.md) |
| **HIDH** | Human Integration Design Handbook | NASA handbook of design for human integration, cited for colors and exercise. | [front 07](../pesquisa/bruto/07-desafio-oficial-padroes-interface.md) |
| **HMS** | Health Maintenance System | Part of the CHeCS for preventing, assessing and treating illness and injury. | [01](01-mission-context.md) |
| **HoloLens** | not an acronym | Mixed reality headset of Project Sidekick (NASA/JPL and Microsoft) taken to the ISS in 2015. | [11](11-precedents.md) |
| **HREDA** | Human and Robotic Exploration Data Archive | ESA data archive that holds, for example, Mars-500 data. | [front 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **HRMRB** | Human Research Multilateral Review Board | Multilateral committee that approves studies with crew members. | [16](16-next-steps-and-impact.md) |
| **HRP** | Human Research Program | NASA Human Research Program, which organizes health risks into the five RIDGE hazards. | [01](01-mission-context.md) |
| **HRR** | Human Research Roadmap | HRP roadmap with the risks, the evidence and the LxC ratings. | [01](01-mission-context.md) |
| **HRV** | heart rate variability | Variation of the interval between beats, in ms (for example, RMSSD). | [04](04-data-cross-referencing.md) |
| **HSRB** | Human System Risk Board | NASA board that approves the LxC ratings of the risks. | [01](01-mission-context.md) |
| **hypnogram** | not an acronym | Sequence of sleep stages over the night (awake, N1, N2, N3 and REM). | [front 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **i-STAT** | not an acronym | Portable blood analyzer with disposable cartridges. | [02](02-equipment-and-data.md) |
| **IA** | artificial intelligence | Models that learn from data, cited for clinical support, sleep staging and explanation. | [11](11-precedents.md) |
| **IBGE** | expansion not recorded in the documents | Brazilian agency cited for biomes and internet access in households and UBS. | [16](16-next-steps-and-impact.md) |
| **IBMP** | expansion not recorded in the documents | Institution that conducts the NEK, SIRIUS and Mars-500 analogs with NASA and ESA. | [12](12-open-data-sources.md) |
| **ICES** | International Conference on Environmental Systems | Conference where NASA publishes ECLSS status reports and the xEMU audio study. | [02](02-equipment-and-data.md) |
| **IEC** | expansion not recorded in the documents | Prefix of technical standards cited for acoustic simulators (IEC 60318). | [front 15](../pesquisa/bruto/15-oculos-audio-acervo.md) |
| **IMCA** | Intelligent Medical Crew Assistant | Voice assistant contracted through a NASA SBIR, with procedures, AR/VR and risk ML. | [front 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **IMM** | Integrated Medical Model | Probabilistic model of medical and kit risk before flight, with about 100 conditions. | [14](14-answered-questions.md) |
| **IMPACT** | Informing Mission Planning via Analysis of Complex Tradespaces | Successor tool to the IMM under development, with MEDPRAT as the engine. | [11](11-precedents.md) |
| **IMU** | inertial measurement unit | Motion sensor (accelerometer and gyroscope) of the glasses. | [09](09-orbit-glasses.md) |
| **IMV** | Intermodule Ventilation | Ventilation that moves air between modules. | [02](02-equipment-and-data.md) |
| **IPEV and PNRA** | expansion not recorded in the documents | Institutions that, with ESA, opened in 2026 a call for biomedical and psychological experiments at Concordia. | [16](16-next-steps-and-impact.md) |
| **IPV** | International Procedure Viewer | Onboard procedure viewer on the SSC. | [14](14-answered-questions.md) |
| **IRB** | Institutional Review Board | Institutional ethics committee that approves research with humans. | [16](16-next-steps-and-impact.md) |
| **ISA** | Investigation, Study, Assay | OSDR metadata hierarchy. | [front 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **ISO** | expansion not recorded in the documents | Prefix of technical standards; ISO 8601 is the UTC date and time format used in the project. | [06](06-data-model.md) |
| **Isolation Forest** | not an acronym | Multivariate anomaly detection method planned as an option in the engine. | [05](05-software-architecture.md) |
| **ISS** | International Space Station | International Space Station, in low Earth orbit. | [01](01-mission-context.md) |
| **ISS-Mimic** | not an acronym | Community project that maps the public ISS telemetry. | [02](02-equipment-and-data.md) |
| **ISS-RAD (RAD)** | ISS Radiation Assessment Detector | Active radiation detector with CPD and FND, made by SwRI and operated by SRAG. | [02](02-equipment-and-data.md) |
| **ISSLIVE** | expansion not recorded in the documents | NASA ISS Live service that publishes part of the ISS telemetry via Lightstreamer. | [12](12-open-data-sources.md) |
| **IV&V** | independent verification and validation | Software assurance practice required by NASA. | [front 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **JAXA** | expansion not recorded in the documents | Japanese space agency, owner of the Kibo module and of the Area PADLES. | [16](16-next-steps-and-impact.md) |
| **JEM** | expansion not recorded in the documents | Another name for the Kibo module, of JAXA. | [02](02-equipment-and-data.md) |
| **Jetson** | not an acronym | NVIDIA computing module (Orin NX or Orin Nano) of the dedicated Orbit configuration. | [10](10-mass-energy-launch.md) |
| **JINS MEME** | not an acronym | Commercial glasses with EOG, used as the frame mass reference for Orbit. | [09](09-orbit-glasses.md) |
| **JPL** | Jet Propulsion Laboratory | NASA laboratory that made the SAM and took part in Project Sidekick. | [02](02-equipment-and-data.md) |
| **JSC** | Johnson Space Center | NASA center where the SRAG, which analyzes crew radiation, is located. | [02](02-equipment-and-data.md) |
| **JSC-20793** | expansion not recorded in the documents | Battery safety requirement for crewed vehicles (Rev. D, 2017). | [16](16-next-steps-and-impact.md) |
| **JSC-63414** | expansion not recorded in the documents | Document of the water exposure guidelines (SWEG). | [02](02-equipment-and-data.md) |
| **JSON** | expansion not recorded in the documents | Text data format used in NOAA feeds and in the prototype configuration files. | [12](12-open-data-sources.md) |
| **kappa** | not an acronym | Agreement measure used to evaluate sleep staging models. | [10](10-mass-energy-launch.md) |
| **Kibo** | not an acronym | Japanese ISS module (JEM), where the Area PADLES is located. | [02](02-equipment-and-data.md) |
| **Kp** | expansion not recorded in the documents | Planetary index of geomagnetic activity, on a dimensionless NOAA scale. | [12](12-open-data-sources.md) |
| **kPa** | expansion not recorded in the documents | Unit of pressure; in the project, the canonical unit of PIO2 (145 to 155 mmHg are equivalent to about 19.33 to 20.67 kPa). | [04](04-data-cross-referencing.md) |
| **KSS** | Karolinska Sleepiness Scale | Sleepiness scale from 1 to 9. | [03](03-indicators-and-thresholds.md) |
| **KUDUwave** | not an acronym | Audiometry system used in the OOHA since 2021, in place of the EarQ. | [12](12-open-data-sources.md) |
| **L and R (L-90, R+3)** | L = launch; R = return | Day count before launch (L-90) or relative to return (R-30 before, R+3 after) in the medical calendar. | [01](01-mission-context.md) |
| **LBNP** | lower body negative pressure | Countermeasure studied for SANS, not yet approved as routine. | [front 10](../pesquisa/bruto/10-orientacoes-contramedidas.md) |
| **LED** | expansion not recorded in the documents | Solid-state lights of the SSLA. | [02](02-equipment-and-data.md) |
| **LEO** | Low Earth Orbit | Low Earth orbit, where the ISS is located. | [01](01-mission-context.md) |
| **LET** | Linear Energy Transfer | Measure of radiation quality, in keV/µm; it is not dose. | [02](02-equipment-and-data.md) |
| **LGPD** | expansion not recorded in the documents | Brazilian data protection law (Law No. 13,709/2018), which treats health data as a protected category. | [16](16-next-steps-and-impact.md) |
| **LIDAL** | Light Ions Detector for ALTEA | Addition to ALTEA that measures light ions in Columbus. | [02](02-equipment-and-data.md) |
| **Lightstreamer** | not an acronym | Streaming server through which NASA publishes the ISSLIVE telemetry. | [12](12-open-data-sources.md) |
| **LiOH** | lithium hydroxide | Chemical CO2 removal reserve in the Russian segment. | [02](02-equipment-and-data.md) |
| **LLM** | large language model | Large language model, such as the OpenBio LLM from which Doc-in-a-Box derives. | [front 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **LSAH** | Lifetime Surveillance of Astronaut Health | Long-term surveillance of astronaut health. | [12](12-open-data-sources.md) |
| **LSDA** | Life Sciences Data Archive | NASA life sciences data archive. | [12](12-open-data-sources.md) |
| **LSM6DSOX** | not an acronym | STMicroelectronics IMU (accelerometer and gyroscope) planned for the glasses. | [09](09-orbit-glasses.md) |
| **LSTM** | expansion not recorded in the documents | Type of recurrent neural network used in TinySleepNet and, in bidirectional form, in DeepSleepNet. | [10](10-mass-energy-launch.md) |
| **LTH** | Long-Term Health | Long-term health, second half of the LxC rating pair (OPS / LTH). | [01](01-mission-context.md) |
| **LuCCI** | Lunar Command and Control Interoperability | Project in which Doc-in-a-Box was developed. | [11](11-precedents.md) |
| **lux** | expansion not recorded in the documents | Unit of illuminance; pre-sleep was described with up to 50 lux. | [02](02-equipment-and-data.md) |
| **LxC** | likelihood x consequence | HRP risk rating: likelihood times consequence. | [01](01-mission-context.md) |
| **M133** | expansion not recorded in the documents | Skylab sleep experiment (1973), precedent for EEG in flight. | [11](11-precedents.md) |
| **Mars-500** | not an acronym | Long-duration terrestrial isolation of the IBMP, used as an analog. | [12](12-open-data-sources.md) |
| **MAS** | Microbial Air Sampler | Device that draws air over culture medium to detect bacteria and fungi. | [02](02-equipment-and-data.md) |
| **MASS** | Montreal Archive of Sleep Studies | Polysomnography database of the CÉAMS. | [12](12-open-data-sources.md) |
| **Matryoshka-R** | not an acronym | Mannequin filled with dosimeters to study the dose inside the body. | [02](02-equipment-and-data.md) |
| **MCA** | Major Constituent Analyzer | Mass spectrometer that tracks N2, O2, H2, CO2, CH4 and water vapor. | [02](02-equipment-and-data.md) |
| **MCC** | Mission Control Center (MCC-H: Mission Control Center Houston) | Mission Control on the ground, which coordinates diagnosis and response with the crew. | [02](02-equipment-and-data.md) |
| **MCTI** | expansion not recorded in the documents | Brazilian ministry with an agreement with NASA (precipitation calibration) and a role alongside the AEB in partnerships. | [16](16-next-steps-and-impact.md) |
| **MCU** | microcontroller | Chip that runs the glasses (nRF52840, with BLE). | [09](09-orbit-glasses.md) |
| **MDA** | Medical Data Architecture | NASA architecture to gather records, sensors and images and sustain clinical support. | [11](11-precedents.md) |
| **MDSS** | Medical Decision Support System | NASA project to support CMO decisions. | [12](12-open-data-sources.md) |
| **MEC** | Medical Equipment Computer | Medical laptop of the CHeCS. | [11](11-precedents.md) |
| **MedGemma** | not an acronym | Medical AI model used in the CMO-DA demonstration on an edge computer. | [front 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **MEDPRAT** | Medical Extensible Dynamic Probabilistic Risk Assessment Tool | Discrete-event medical risk simulator, the engine of IMPACT. | [14](14-answered-questions.md) |
| **MELFI** | Minus Eighty-Degree Laboratory Freezer for ISS | Sample freezer at about minus 80 °C. | [02](02-equipment-and-data.md) |
| **MeV** | expansion not recorded in the documents | Unit of particle energy; the proton channel of 10 MeV or more defines the S scale. | [03](03-indicators-and-thresholds.md) |
| **mGy-Eq** | Gy-equivalent | Unit of dose per organ used in the limits for non-cancer effects; it is not added to mSv. | [03](03-indicators-and-thresholds.md) |
| **microgravity** | not an acronym | Condition in orbit in which buoyancy does not generate natural convection, which requires forced ventilation and changes the body. | [02](02-equipment-and-data.md) |
| **MIMIC-IV** | not an acronym | PhysioNet hospital ICU database, with controlled access. | [front 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **MIST** | Medical Information Systems and Tools | Ground suite with electronic health record, images and the LSAH database. | [11](11-precedents.md) |
| **MIT-BIH** | expansion not recorded in the documents | ECG database with 48 recordings on PhysioNet. | [12](12-open-data-sources.md) |
| **ML** | machine learning | Models that learn from data; in the prototype, z-score, EWMA and Isolation Forest. | [05](05-software-architecture.md) |
| **MMD** | Mass Measurement Device | Russian mass meter, which derives mass from the oscillation period of a spring. | [02](02-equipment-and-data.md) |
| **mmHg** | expansion not recorded in the documents | Unit of pressure in which NASA standards express CO2 and PIO2. | [02](02-equipment-and-data.md) |
| **mobiPV** | expansion not recorded in the documents | ESA mobile procedure system with Google Glass, tested on the ISS in 2015. | [11](11-precedents.md) |
| **MSFC** | Marshall Space Flight Center | NASA center that developed ECLSS systems, such as OGA and WRS. | [02](02-equipment-and-data.md) |
| **mSv** | sievert (Sv) | Unit of equivalent and effective dose; the effective dose in mSv is used in the career limit. | [02](02-equipment-and-data.md) |
| **MyotonPRO** | not an acronym | ESA device that gives a mechanical tap on the muscle and measures the response vibration. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **N1, N2, N3** | expansion not recorded in the documents | Non-REM sleep stages in the hypnogram. | [05](05-software-architecture.md) |
| **NASA** | National Aeronautics and Space Administration | Agency that, with its partners, keeps crews on the ISS; it is the main source of the documents. | [01](01-mission-context.md) |
| **NASA PVT+** | expansion not recorded in the documents | NASA PVT application, which warns that it is not a fitness test nor a GO/NO-GO tool. | [09](09-orbit-glasses.md) |
| **NASA-STD-3001** | expansion not recorded in the documents | NASA standard for human health and performance in flight (Vol. 1, crew; Vol. 2, design), source of several thresholds. | [03](03-indicators-and-thresholds.md) |
| **NASA-STD-6001** | expansion not recorded in the documents | Standard for flammability and outgassing of materials. | [front 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **NASA-TLX** | NASA Task Load Index | Subjective workload assessment. | [03](03-indicators-and-thresholds.md) |
| **NC-40 and NC-50** | Noise Criteria | Noise curves per band: NC-50 for work areas and NC-40 for sleep areas. | [02](02-equipment-and-data.md) |
| **NEEMO** | expansion not recorded in the documents | Missions in the Aquarius underwater laboratory, used as an analog and discontinued in 2023. | [16](16-next-steps-and-impact.md) |
| **NEK** | Nezemnyy Eksperimental’nyy Kompleks | IBMP terrestrial complex where the SIRIUS isolations take place. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **NESC** | expansion not recorded in the documents | NASA group whose analysis gave the test reference of 50 µGy/min, which is not a shelter threshold. | [02](02-equipment-and-data.md) |
| **NeuroCOG** | expansion not recorded in the documents | ESA cognitive research with EEG on the ISS (2002). | [11](11-precedents.md) |
| **Neurospat** | expansion not recorded in the documents | ESA experiment with a 62-electrode EEG cap in Columbus (2009 to 2013). | [11](11-precedents.md) |
| **NIAC** | expansion not recorded in the documents | Origin of a proposal that estimates 80 to 160 mSv of dose in six months; not a universal value. | [02](02-equipment-and-data.md) |
| **NIH** | expansion not recorded in the documents | Health institution that publishes MedlinePlus, cited for oximetry and exams. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **NIOSH** | expansion not recorded in the documents | Agency that relates work fatigue to worse reaction time, attention, memory and judgment. | [16](16-next-steps-and-impact.md) |
| **NLSP** | NASA Life Sciences Portal | Portal for discovering and requesting NASA life sciences data. | [12](12-open-data-sources.md) |
| **NOAA** | expansion not recorded in the documents | Agency that maintains the SWPC and the GOES space weather satellites. | [12](12-open-data-sources.md) |
| **Node 3 (Tranquility)** | not an acronym | US segment module where the WPA, the UPA and the WHC compartment are located. | [02](02-equipment-and-data.md) |
| **NODE3000xxx and USLAB0000xx** | expansion not recorded in the documents | Item identifiers of the public ISSLIVE telemetry, known from community maps. | [02](02-equipment-and-data.md) |
| **NORS** | Nitrogen/Oxygen Recharge System | Tanks that recharge nitrogen and oxygen in the Quest Airlock. | [02](02-equipment-and-data.md) |
| **NPR** | expansion not recorded in the documents | NASA internal standard; NPR 7100.1C deals with the protection of human research participants. | [16](16-next-steps-and-impact.md) |
| **NR (NR-22, NR-30, NR-37)** | expansion not recorded in the documents | Labor ministry standards cited for terrestrial applications; NR-37 requires a health professional and an infirmary on offshore platforms according to the number of workers. | [16](16-next-steps-and-impact.md) |
| **nRF52840** | not an acronym | Nordic microcontroller with BLE planned for the glasses (Cortex-M4F, 1 MB of flash). | [09](09-orbit-glasses.md) |
| **NRHO** | expansion not recorded in the documents | Gateway orbit, designed to maintain communication visibility with Earth. | [front 16](../pesquisa/bruto/16-artemis-marte.md) |
| **NRS** | numeric rating scale | Self-reported pain scale from 0 to 10. | [03](03-indicators-and-thresholds.md) |
| **NSPIRES** | expansion not recorded in the documents | System where NASA publishes research calls such as HRP/HERO. | [front 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **NTRS** | NASA Technical Reports Server | NASA technical report repository. | [02](02-equipment-and-data.md) |
| **NTx** | N-telopeptide | Laboratory marker of bone resorption. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **NutrISS** | not an acronym | Research protocol for body composition by bioimpedance on the ISS. | [02](02-equipment-and-data.md) |
| **O2** | expansion not recorded in the documents | Oxygen; the inspired partial pressure of cabin O2 (PIO2) has a normoxic range defined by NASA. | [02](02-equipment-and-data.md) |
| **OCHMO** | Office of the Chief Health and Medical Officer | NASA chief medical office, author of standards and technical briefs. | [01](01-mission-context.md) |
| **OCHMO-STD-100.1A** | expansion not recorded in the documents | OCHMO standard with the reference medical calendar for a 180-day mission. | [02](02-equipment-and-data.md) |
| **OCHMO-TB and OCHMO-MTB** | Technical Brief (TB) | OCHMO technical summaries by topic; for example, TB-004 deals with CO2 and MTB-001 with SANS. | [03](03-indicators-and-thresholds.md) |
| **OCT** | Optical Coherence Tomography | Optical coherence tomography, an eye imaging exam used in SANS follow-up. | [01](01-mission-context.md) |
| **ODC-By** | Open Data Commons Attribution | Open license with mandatory attribution, used by Sleep-EDF and MIT-BIH. | [12](12-open-data-sources.md) |
| **OGA** | Oxygen Generation Assembly | Generates O2 by water electrolysis in the US segment. | [02](02-equipment-and-data.md) |
| **OGS** | Oxygen Generation System | Oxygen generation system of which the OGA is part, launched in 2006. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **OIG** | Office of Inspector General | NASA internal audit, source of the cargo costs per kg. | [10](10-mass-energy-launch.md) |
| **ONSD** | optic nerve sheath diameter | Measurement by ocular ultrasound, an indirect marker studied in relation to intracranial pressure. | [02](02-equipment-and-data.md) |
| **OOHA** | On-Orbit Hearing Assessment | On-orbit hearing assessment. | [02](02-equipment-and-data.md) |
| **OPTIMIS** | expansion not recorded in the documents | Scheduling system for the crew and controllers. | [12](12-open-data-sources.md) |
| **Orion** | not an acronym | Crewed Artemis II vehicle, which flew with six internal HERA sensors. | [16](16-next-steps-and-impact.md) |
| **OSCE** | Objective Structured Clinical Examination | Structured clinical exam format used to evaluate Doc-in-a-Box. | [11](11-precedents.md) |
| **OSD-575** | expansion not recorded in the documents | Identifier of the Inspiration4 set in the OSDR. | [12](12-open-data-sources.md) |
| **OSDR** | Open Science Data Repository | NASA open repository with space biology and astronaut data. | [12](12-open-data-sources.md) |
| **OSI** | expansion not recorded in the documents | Organization whose open licenses are required by the Space Apps terms (Apache 2.0 as the default). | [08](08-prototype-plan-20h.md) |
| **OSLD** | Optically Stimulated Luminescence Dosimeter | Passive dosimeter that is part of the CPD. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **OSTPV** | Onboard Short Term Plan Viewer | Onboard viewer of the short-term schedule. | [12](12-open-data-sources.md) |
| **P1NP** | expansion not recorded in the documents | Bone remodeling marker measured in urine or blood. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **PADLES** | Passive Dosimeter for Life Science Experiments in Space | JAXA passive dosimeters in Kibo (TLD and CR-39). | [02](02-equipment-and-data.md) |
| **PANAS** | Positive and Negative Affect Schedule | Positive and negative affect scale. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PBA** | Portable Breathing Apparatus | O2 cylinder with mask for fire, depressurization or contamination. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **PCA** | Pressure Control Assembly | Controls cabin pressure and adds O2 and N2. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **PCR** | expansion not recorded in the documents | Laboratory method that measures viruses in samples as presence or copies per volume. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **PFE** | Periodic Fitness Evaluation | Periodic aerobic capacity test. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **PFS and PPFS** | Pulmonary Function System; Portable PFS | Analyze inspired and expired gases, ventilation and oxygen consumption. | [02](02-equipment-and-data.md) |
| **pfu** | expansion not recorded in the documents | Unit of particle flux: particles/(cm²·s·sr); 10 pfu of protons of 10 MeV or more marks S1. | [12](12-open-data-sources.md) |
| **PHQ-9** | Patient Health Questionnaire-9 | Terrestrial clinical questionnaire with nine items on depression symptoms; not part of the check-in without a license and clinical governance. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PhysioNet** | not an acronym | Repository of physiological signal databases (Sleep-EDF, MIT-BIH, MIMIC-IV). | [12](12-open-data-sources.md) |
| **PI** | principal investigator | Researcher responsible for a proposal; for a Brazilian team, the research suggests a PI and an institution in the US. | [16](16-next-steps-and-impact.md) |
| **PIO2** | inspired partial pressure of O2 | Oxygen available in the breathed air; normoxic range of 145 to 155 mmHg. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **PMC** | Private Medical Conference | Private weekly medical conversation between the crew member and the flight surgeon. | [01](01-mission-context.md) |
| **PNTD** | Plastic Nuclear Track Detector | Plastic track detector that is part of the CPD. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **POC** | point-of-care | Exam done on site, with a result in minutes. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **POMS** | Profile of Mood States | Mood state questionnaire (POMS-2 is licensed). | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PPC** | Private Psychological Conference | Private conversation every 14 days with the BHP professional. | [01](01-mission-context.md) |
| **ppCO2** | partial pressure of CO2 | Part of the air pressure due to CO2; basis of rule R-CO2-01. | [02](02-equipment-and-data.md) |
| **PPE** | expansion not recorded in the documents | Gateway module that, with the HALO, will receive the first radiation research sets. | [front 16](../pesquisa/bruto/16-artemis-marte.md) |
| **PPG** | expansion not recorded in the documents | Optical pulse sensor of watches; on its own, it can generate artifacts and does not diagnose arrhythmia. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ppO2 and ppN2** | partial pressure of O2 and of N2 | Parts of the air pressure due to O2 and N2, published in the ISSLIVE telemetry. | [02](02-equipment-and-data.md) |
| **PROANTAR** | expansion not recorded in the documents | CNPq line of funding for Antarctic research. | [front 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **PSD** | power spectral density | EEG power per frequency, in µV²/Hz. | [front 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **PSG** | polysomnography | Reference sleep exam against which the glasses must be validated. | [09](09-orbit-glasses.md) |
| **psia** | expansion not recorded in the documents | Unit of pressure in which public telemetry lists ppO2, ppN2 and ppCO2; the cabin is near 14.7 psia. | [12](12-open-data-sources.md) |
| **PSQI** | Pittsburgh Sleep Quality Index | Sleep quality questionnaire, with rights held by the University of Pittsburgh. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PSS** | Perceived Stress Scale | Perceived stress scale; the PSS-10 version has ten items. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PUIList** | not an acronym | Dictionary (PUIList.xml) of the Lightstreamer sample client that lists the telemetry items and units. | [12](12-open-data-sources.md) |
| **PVT** | Psychomotor Vigilance Test (also Task) | Reaction time test to stimuli, used in the readiness index and in scenario C4. | [03](03-indicators-and-thresholds.md) |
| **PVT-B** | expansion not recorded in the documents | PVT version that defines a lapse as a reaction time of at least 355 ms. | [03](03-indicators-and-thresholds.md) |
| **PWD and xPWD** | Potable Water Dispenser | Dispenser of potable water, hot or ambient. | [02](02-equipment-and-data.md) |
| **QCT** | expansion not recorded in the documents | Bone imaging exam cited together with DXA. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **Quest** | not an acronym | US segment airlock, where high-pressure gas tanks are located. | [02](02-equipment-and-data.md) |
| **R-CO2-01 and other rules** | expansion not recorded in the documents | Ids of the engine's cross-referencing rules (CO2, radiation, SANS, sleep, environment and hydration). | [04](04-data-cross-referencing.md) |
| **RadLab** | not an acronym | NASA radiation data service, with an API and historical datasets. | [02](02-equipment-and-data.md) |
| **RAM** | Radiation Area Monitor | Passive area dosimeter, without power, that accumulates dose at the point where it sits. | [02](02-equipment-and-data.md) |
| **Raspberry Pi 5** | not an acronym | Small computer used as a reference for processing capacity. | [10](10-mass-energy-launch.md) |
| **RDC** | expansion not recorded in the documents | Anvisa resolutions, such as RDC 657/2022 (SaMD) and RDC 751/2022 (risk classes). | [16](16-next-steps-and-impact.md) |
| **REM** | rapid eye movements | Sleep stage in the hypnogram; the glasses are not a REM sleep detector. | [09](09-orbit-glasses.md) |
| **REM** | Radiation Environment Monitor | Timepix radiation detector on the ISS (REM and REM-2). | [02](02-equipment-and-data.md) |
| **REST** | expansion not recorded in the documents | API style used by OSDR and DONKI. | [12](12-open-data-sources.md) |
| **rHEALTH** | expansion not recorded in the documents | Miniaturized flow cytometer (rHEALTH ONE) demonstrated on the ISS. | [02](02-equipment-and-data.md) |
| **RIDGE** | Radiation, Isolation and confinement, Distance from Earth, Gravity fields and Hostile/closed environments | The five hazards of human spaceflight according to the HRP. | [01](01-mission-context.md) |
| **RMSSD** | expansion not recorded in the documents | Heart rate variability measure, in ms, compared with the personal baseline. | [04](04-data-cross-referencing.md) |
| **RNFL** | expansion not recorded in the documents | Measurement made on the OCT, cited in SANS follow-up. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ROS** | Russian Orbital Segment | Russian segment of the ISS, with its own life support. | [02](02-equipment-and-data.md) |
| **RSP** | Respiratory Support Pack | Respiratory support kit of the ISS. | [02](02-equipment-and-data.md) |
| **RST** | Reaction Self Test | 3-minute reaction test documented for the ISS. | [03](03-indicators-and-thresholds.md) |
| **S1 to S5 and G1 to G5** | expansion not recorded in the documents | NOAA radiation storm (S, which starts at 10 pfu) and geomagnetic (G) scales. | [03](03-indicators-and-thresholds.md) |
| **SAA** | South Atlantic Anomaly | South Atlantic Anomaly: stretch of the orbit with higher dose, predictable from position. | [12](12-open-data-sources.md) |
| **Sabatier** | not an acronym | Reactor that combines the OGA H2 with CO2 to recover part of the oxygen; it had been out of service since 2017. | [02](02-equipment-and-data.md) |
| **SAM** | Spacecraft Atmosphere Monitor | JPL demonstration of a miniaturized GC/MS (also called SCRAM-2). | [02](02-equipment-and-data.md) |
| **SaMD** | software as a medical device | Anvisa regulatory category for software with a medical purpose. | [16](16-next-steps-and-impact.md) |
| **Samn-Perelli** | not an acronym | Fatigue scale from 1 to 7, in which 7 is exhaustion. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **SANS** | Spaceflight Associated Neuro-ocular Syndrome | Spaceflight associated neuro-ocular syndrome: changes in the eye and in vision in long missions. | [14](14-answered-questions.md) |
| **SAS** | Space Adaptation Sickness | Space adaptation sickness, with its own scale cited by NASA. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **SBC-1 and SBC-2** | Spaceborne Computer-1 and Spaceborne Computer-2 | HPE commercial computers tested on the ISS against radiation errors. | [10](10-mass-energy-launch.md) |
| **SBIR and STTR** | expansion not recorded in the documents | NASA funding programs: SBIR requires a small US company; STTR also requires a partner research institution. | [16](16-next-steps-and-impact.md) |
| **SciSpacE CORA** | expansion not recorded in the documents | ESA channel for proposals of human health experiments on the ISS. | [16](16-next-steps-and-impact.md) |
| **SDK** | expansion not recorded in the documents | Client library; the research used the Lightstreamer Node.js Client SDK. | [front 11](../pesquisa/bruto/11-amostras-reais.md) |
| **SEP** | Solar Energetic Particles | Solar energetic particles, a DONKI event type and trigger of rule R-RAD-01. | [12](12-open-data-sources.md) |
| **SESAI** | expansion not recorded in the documents | Ministry of Health structure responsible for indigenous health care. | [16](16-next-steps-and-impact.md) |
| **SFOG** | Solid Fuel Oxygen Generator | Chemical cartridge that releases O2 in a contingency (TGK in the Russian segment). | [02](02-equipment-and-data.md) |
| **SHHS** | Sleep Heart Health Study | PhysioNet polysomnography database. | [front 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **SIRIUS** | expansion not recorded in the documents | IBMP terrestrial isolations with NASA (SIRIUS-17, 19 and 21). | [11](11-precedents.md) |
| **SLAMMD** | Space Linear Acceleration Mass Measurement Device | Measures body mass in microgravity. | [02](02-equipment-and-data.md) |
| **Sleep-EDF** | not an acronym | Public PhysioNet polysomnography database used for the prototype hypnogram. | [12](12-open-data-sources.md) |
| **SMAC** | Spacecraft Maximum Allowable Concentration | Concentration limit of each compound in the air, which depends on duration; there is no general SMAC. | [02](02-equipment-and-data.md) |
| **SOMA** | Space Omics and Medical Atlas | Atlas that integrates mission data, such as Twins Study and Inspiration4. | [12](12-open-data-sources.md) |
| **SPE** | Solar Particle Event | Solar particle event, episodic. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **SpO2** | oxygen saturation | Blood oxygen saturation measured by oximeter; not the same as cabin O2. | [02](02-equipment-and-data.md) |
| **SRAG** | Space Radiation Analysis Group | JSC group that analyzes crew radiation. | [02](02-equipment-and-data.md) |
| **SSC** | Station Support Computer | Station support laptop, already approved, candidate to run Orbit Health. | [10](10-mass-energy-launch.md) |
| **SSLA** | Solid State Lighting Assembly | LED luminaires with modes for routine, pre-sleep and alert. | [02](02-equipment-and-data.md) |
| **SSP** | expansion not recorded in the documents | ISS program documents, such as SSP 30237 (EMC) and SSP 50313 (displays). | [front 05](../pesquisa/bruto/05-massa-computacao-lancamento.md) |
| **SSS** | Stanford Sleepiness Scale | Seven-position sleepiness scale. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **STARwatch** | not an acronym | Actigraphy and sleep work funded by the HRP through SBIR. | [16](16-next-steps-and-impact.md) |
| **SUS** | expansion not recorded in the documents | Brazilian health system cited as a destination for terrestrial applications (telehealth, indigenous health). | [16](16-next-steps-and-impact.md) |
| **SWEG** | Spacecraft Water Exposure Guidelines | Limits per compound for onboard water (JSC-63414). | [02](02-equipment-and-data.md) |
| **SWPC** | Space Weather Prediction Center | NOAA center that publishes GOES protons, Kp and alerts. | [12](12-open-data-sources.md) |
| **SwRI** | Southwest Research Institute | Institute that manufactured the RAD. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **T1 to T7** | expansion not recorded in the documents | Prototype screens: T1 General monitor, T2 My body, T3 Check-in, T4 Alert detail, T5 Environment and radiation, T6 Sleep and glasses, T7 Trends. | [07](07-interface-design.md) |
| **T2** | Second Generation Treadmill | US segment treadmill (also called COLBERT), which replaced the TVIS in 2009. | [01](01-mission-context.md) |
| **T2AR** | expansion not recorded in the documents | Augmented reality application tested in 2021 for T2 treadmill maintenance. | [11](11-precedents.md) |
| **TCCS** | Trace Contaminant Control Subassembly | Removes trace contaminants from the air. | [02](02-equipment-and-data.md) |
| **TDRS** | Tracking and Data Relay Satellite | Geostationary satellites of the Space Network that link the ISS to the ground. | [12](12-open-data-sources.md) |
| **TDU1 and TDU2** | expansion not recorded in the documents | SAM units: TDU1 measured main gases and TDU2, VOCs. | [02](02-equipment-and-data.md) |
| **TEPC** | Tissue Equivalent Proportional Counter | Gas chamber with a tissue-equivalent wall that estimates the energy deposited. | [02](02-equipment-and-data.md) |
| **THC** | Temperature and Humidity Control | Temperature and humidity control of the ECLSS. | [02](02-equipment-and-data.md) |
| **TIB** | time in bed | End minus start of the period in bed. | [04](04-data-cross-referencing.md) |
| **TinySleepNet** | not an acronym | Small sleep staging model (CNN and LSTM, about 1.3 million parameters). | [10](10-mass-energy-launch.md) |
| **TLD** | Thermoluminescent Dosimeter | Thermoluminescent dosimeter, used in the CPD and in the Area PADLES. | [02](02-equipment-and-data.md) |
| **TOC** | total organic carbon | Water measurement made by the TOCA, in mg/L. | [02](02-equipment-and-data.md) |
| **TOCA** | Total Organic Carbon Analyzer | Analyzer of total organic carbon, pH and conductivity of water. | [02](02-equipment-and-data.md) |
| **Tono-Pen** | not an acronym | Flight tonometer that estimates the pressure inside the eye by touching the cornea. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **TOPS** | trillions of operations per second | Measure of AI accelerators, such as the Jetson. | [10](10-mass-energy-launch.md) |
| **torr** | expansion not recorded in the documents | Unit of pressure used by the MCA and by public telemetry. | [02](02-equipment-and-data.md) |
| **TPA2012D2** | not an acronym | Texas Instruments class D audio amplifier planned for bone conduction. | [09](09-orbit-glasses.md) |
| **TST** | total sleep time | Number of sleep epochs times 0.5 min. | [04](04-data-cross-referencing.md) |
| **TVIS** | expansion not recorded in the documents | Old treadmill replaced by the T2 in 2009. | [02](02-equipment-and-data.md) |
| **TWA** | time-weighted average level | Time-averaged noise level, in dBA; the reference is 75 dBA in 8 h. | [02](02-equipment-and-data.md) |
| **U2 and U3** | Ultrasound 2; Ultrasound 3 | ISS ultrasounds: the U2 images organs, vessels, muscles and the eye; the U3 is the successor, delivered in 2025. | [02](02-equipment-and-data.md) |
| **UBS** | expansion not recorded in the documents | Health units used as a basis for comparing connectivity in the Legal Amazon. | [16](16-next-steps-and-impact.md) |
| **UCD** | Urine Collection Device | Bag with a valve for urine collection. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **UPA** | Urine Processor Assembly | Pretreats and distills urine for the water cycle. | [02](02-equipment-and-data.md) |
| **UR (RH)** | relative humidity | Cabin air humidity, in %. | [02](02-equipment-and-data.md) |
| **USOS** | United States Orbital Segment | US segment of the ISS. | [02](02-equipment-and-data.md) |
| **UTAS** | United Technologies Aerospace Systems | NASA partner company on the OGA. | [02](02-equipment-and-data.md) |
| **UTC** | Coordinated Universal Time | Time standard in which all project data is stored (ISO 8601). | [01](01-mission-context.md) |
| **V1 and V2** | expansion not recorded in the documents | Prefixes of the requirements of volumes 1 and 2 of NASA-STD-3001 (for example, V1 5003). | [03](03-indicators-and-thresholds.md) |
| **VAS** | visual analog scale | Visual scale between two extremes defined for the question. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **VELO** | expansion not recorded in the documents | Cycle ergometer of the Russian segment. | [02](02-equipment-and-data.md) |
| **VGE** | expansion not recorded in the documents | Assessment used in chamber tests of decompression protocols. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **VO2max and VO2peak** | maximum oxygen consumption | Aerobic capacity; the VO2peak is the peak measured in the PFE test. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **VOC** | volatile organic compounds | Air contaminants measured by the AQM. | [02](02-equipment-and-data.md) |
| **Vozdukh** | not an acronym | Equipment that removes CO2 in the Russian segment, with LiOH as a reserve. | [02](02-equipment-and-data.md) |
| **VR** | virtual reality | Used in an Antarctic restoration study with nature or city scenes. | [11](11-precedents.md) |
| **VZV** | varicella-zoster virus | Varicella-zoster virus, latent, which can be detected again in flight. | [front 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **W3C** | expansion not recorded in the documents | Source of the Event Timing and Frame Timing web specifications, cited for measuring on-screen reaction. | [front 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **WASO** | wake after sleep onset | Time awake between the first and the last sleep. | [front 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **WBC** | expansion not recorded in the documents | Leukocyte count with differential done by the HemoCue WBC DIFF. | [front 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **WFDB** | expansion not recorded in the documents | PhysioNet file format used by the MIT-BIH database. | [front 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **WHC** | Waste and Hygiene Compartment | Node 3 compartment that collects urine and solid waste. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **WinSCAT** | Spaceflight Cognitive Assessment Tool for Windows | Brief cognitive battery on the laptop (memory, attention), monthly until 2025. | [11](11-precedents.md) |
| **WMK** | Water Microbiology Kit | Water microbiology kit, with MCD and CDB. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **WPA** | Water Processor Assembly | Treats condensate and distilled urine to produce potable water. | [02](02-equipment-and-data.md) |
| **WRM** | Water Recovery and Management | ECLSS subsystem for water recovery and management (WPA, UPA, BPA). | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **WRS** | Water Recovery System | ISS water recovery system, in operation since 2008. | [front 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **xEHR** | Exploration Electronic Health Record | Proposal for an onboard health record with asynchronous sending. | [14](14-answered-questions.md) |
| **xEMU** | expansion not recorded in the documents | NASA suit in which bone conduction audio in the helmet was evaluated (ICES-2024-209). | [09](09-orbit-glasses.md) |
| **YASA** | expansion not recorded in the documents | Published sleep staging algorithm based on EEG features, light enough for a CPU. | [10](10-mass-energy-launch.md) |
| **z-score** | not an acronym | How many standard deviations a reading departs from the personal baseline; on its own it never produces red. | [04](04-data-cross-referencing.md) |
| **Zvezda** | not an acronym | Service module of the Russian segment, where Elektron and Vozdukh are located. | [02](02-equipment-and-data.md) |
