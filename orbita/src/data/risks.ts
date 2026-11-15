/**
 * Spaceflight risk library — NASA Human Research Program (HRP).
 * Short plain-language summaries for educational purposes. Always consult the official source.
 */
export interface Risk {
  id: string;
  name: string;
  english: string;
  hazard: boolean;
  summary: string;
  description: string;
  impacts: string[];
  indicators: string[];
  refTitle: string;
  refUrl: string;
  keywords: string[];
}

export const HRP_RISKS_URL = "https://www.nasa.gov/hrp/risks/";
export const HRP_HAZARDS_URL = "https://www.nasa.gov/hrp/hazards/";

export const HAZARDS: Risk[] = [
  {
    id: "hazard-radiation",
    name: "Space radiation",
    english: "Space Radiation",
    hazard: true,
    summary: "Outside the protection of Earth's atmosphere and magnetic field, the crew is exposed to ionizing radiation.",
    description:
      "In deep space, astronauts receive radiation from galactic cosmic rays and particles emitted by the Sun. This radiation can pass through tissue and damage cellular structures. Accumulated dose over the mission is tracked by dosimeters and considered in planning, together with shielding and operational procedures.",
    impacts: ["Increased lifetime cancer risk", "Possible central nervous system effects (under study)", "Possible cardiovascular and degenerative effects (under study)", "Acute effects at very high exposures"],
    indicators: ["Radiation dosimetry", "Accumulated dose", "Daily exposure rate"],
    refTitle: "NASA HRP — Hazard: Space Radiation",
    refUrl: "https://www.nasa.gov/hrp/hazard-space-radiation/",
    keywords: ["radiation", "dose", "dosimetry", "cosmic rays", "solar", "msv", "sievert"],
  },
  {
    id: "hazard-isolation",
    name: "Isolation and confinement",
    english: "Isolation and Confinement",
    hazard: true,
    summary: "Long periods in confined spaces with a small crew affect behavior, sleep and teamwork.",
    description:
      "On long missions, the crew lives and works in a small space, with limited contact with Earth and intense routines. These conditions can affect mood, stress, sleep and circadian rhythm, as well as team cohesion and communication.",
    impacts: ["Mood changes and stress", "Fatigue and reduced sleep quality", "Circadian rhythm misalignment", "Communication and team cohesion challenges"],
    indicators: ["Fatigue", "Sleep", "Eye attention (EOG)"],
    refTitle: "NASA HRP — Hazard: Isolation and Confinement",
    refUrl: "https://www.nasa.gov/hrp/hazard-isolation-and-confinement/",
    keywords: ["isolation", "confinement", "loneliness", "stress", "mood", "psychological"],
  },
  {
    id: "hazard-distance",
    name: "Distance from Earth",
    english: "Distance from Earth",
    hazard: true,
    summary: "Communication delays and the impossibility of a quick return require onboard medical autonomy.",
    description:
      "On a mission to Mars, messages can take several minutes to reach Earth and there is no quick return in an emergency. The crew needs local protocols, onboard medical resources and information available without a connection — which is why tools like ORBITA work offline.",
    impacts: ["Limited real-time medical support", "Greater reliance on local protocols and resources", "Supply and food planning", "Need for onboard decision support"],
    indicators: ["Local records", "Mission routine", "Notifications"],
    refTitle: "NASA HRP — Hazard: Distance from Earth",
    refUrl: "https://www.nasa.gov/hrp/hazard-distance-from-earth/",
    keywords: ["distance", "earth", "communication", "delay", "autonomy", "mars", "offline"],
  },
  {
    id: "hazard-gravity",
    name: "Gravity fields",
    english: "Gravity Fields",
    hazard: true,
    summary: "Microgravity and transitions between gravity fields affect the heart, muscles, bones, balance and vision.",
    description:
      "In microgravity, body fluids shift toward the head, bones and muscles bear less load and the vestibular system loses its usual reference. Afterward, the body must readapt to the gravity of Mars or Earth.",
    impacts: ["Cardiovascular adaptations", "Bone and muscle loss", "Balance and coordination changes", "Eye changes (SANS)"],
    indicators: ["Heart rate", "Eye attention (EOG)", "Fatigue"],
    refTitle: "NASA HRP — Hazard: Gravity Fields",
    refUrl: "https://www.nasa.gov/hrp/hazard-gravity-fields/",
    keywords: ["gravity", "microgravity", "gravitational", "fluids", "weightlessness"],
  },
  {
    id: "hazard-environment",
    name: "Hostile and closed environments",
    english: "Hostile and Closed Environments",
    hazard: true,
    summary: "The vehicle is a closed ecosystem: air, temperature, microorganisms and life support must be controlled.",
    description:
      "The crew depends on the life support system to breathe and maintain temperature. Air quality, CO₂, humidity, noise and microorganisms can affect health; extravehicular activities add pressure and oxygen risks.",
    impacts: ["Exposure to air contaminants", "Immune system changes", "Interactions with microorganisms", "Risk of hypoxia and decompression sickness in specific operations"],
    indicators: ["Pulse oximetry", "Blood count (white blood cells)"],
    refTitle: "NASA HRP — Hazard: Hostile and Closed Environments",
    refUrl: "https://www.nasa.gov/hrp/hazard-hostile-closed-environments/",
    keywords: ["environment", "closed", "hostile", "air", "co2", "life support", "cabin"],
  },
];

export const SPECIFIC_RISKS: Risk[] = [
  {
    id: "risk-immune",
    name: "Immune system changes",
    english: "Altered Immune System Responses",
    hazard: false,
    summary: "Spaceflight can alter the immune response and favor reactivation of latent viruses.",
    description:
      "Stress, sleep changes, radiation and the closed environment can change how the immune system works. Studies have observed changes in the distribution of immune cells and reactivation of latent viruses during missions.",
    impacts: ["Altered immune response", "Reactivation of latent viruses", "Greater susceptibility to infections", "Possible hypersensitivity reactions"],
    indicators: ["Blood count — white blood cells", "Fatigue", "Sleep"],
    refTitle: "Risk of Altered Immune System Responses",
    refUrl: "https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/",
    keywords: ["immune", "immunity", "defense", "infection", "white blood cells", "leukocytes", "virus"],
  },
  {
    id: "risk-sensorimotor",
    name: "Sensorimotor and vestibular function",
    english: "Altered Sensorimotor and Vestibular Function",
    hazard: false,
    summary: "Balance, spatial orientation and coordination adapt to changes in gravity.",
    description:
      "The vestibular system, responsible for balance, loses its gravity reference. This can cause space motion sickness and disorientation early in the mission, and balance and coordination difficulties after gravity transitions such as landings.",
    impacts: ["Space motion sickness", "Disorientation", "Coordination and motor control changes", "Balance difficulty after landing"],
    indicators: ["Eye attention (EOG)", "Fatigue"],
    refTitle: "Risk of Altered Sensorimotor and Vestibular Function",
    refUrl: "https://www.nasa.gov/reference/risk-of-altered-sensorimotor-and-vestibular-function/",
    keywords: ["vestibular", "balance", "nausea", "dizziness", "coordination", "motor", "sensorimotor", "disorientation"],
  },
  {
    id: "risk-cardiovascular",
    name: "Cardiovascular problems",
    english: "Cardiovascular Adaptations",
    hazard: false,
    summary: "The heart and vessels adapt to the fluid redistribution of microgravity.",
    description:
      "Without gravity pulling blood toward the legs, fluids shift to the upper body and the cardiovascular system readjusts. Reduced blood volume, rhythm changes and orthostatic intolerance on return to gravity may occur. Radiation is studied as a long-term cardiovascular risk factor.",
    impacts: ["Heart rate changes", "Reduced plasma volume", "Orthostatic intolerance after return", "Possible long-term radiation effects"],
    indicators: ["Heart rate", "Individual baseline", "Pulse oximetry"],
    refTitle: "Risk of Cardiovascular Adaptations",
    refUrl: "https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/",
    keywords: ["heart", "cardiac", "cardiovascular", "heart rate", "pulse", "blood pressure", "circulation", "bpm"],
  },
  {
    id: "risk-decompression",
    name: "Decompression sickness",
    english: "Decompression Sickness",
    hazard: false,
    summary: "Rapid pressure changes, such as preparing for EVA, can form gas bubbles in the body.",
    description:
      "Spacesuits operate at a lower pressure than the cabin. If the transition is not adequate, nitrogen dissolved in the body can form bubbles, causing joint pain and other symptoms. Oxygen pre-breathe protocols reduce this risk.",
    impacts: ["Joint pain", "Neurological symptoms in severe cases", "Limitation of extravehicular activities"],
    indicators: ["Pulse oximetry", "Extravehicular activity log"],
    refTitle: "Risk of Decompression Sickness",
    refUrl: "https://www.nasa.gov/reference/risk-of-decompression-sickness/",
    keywords: ["decompression", "bubbles", "nitrogen", "pre breathe", "suit pressure", "bends"],
  },
  {
    id: "risk-microorganism",
    name: "Host–microorganism interactions",
    english: "Host-Microorganism Interactions",
    hazard: false,
    summary: "Microorganisms in a closed environment can behave differently in space.",
    description:
      "The spacecraft harbors microorganisms brought by the crew and cargo. In space, some microorganisms may change their behavior while the crew's immunity may also be altered — a combination that calls for environmental monitoring and hygiene care.",
    impacts: ["Increased risk of infection", "Contamination of surfaces, water and air", "Microbiome changes"],
    indicators: ["Blood count — white blood cells", "Fatigue"],
    refTitle: "Risk of Host-Microorganism Interactions",
    refUrl: "https://www.nasa.gov/reference/risk-of-host-microorganism-interactions/",
    keywords: ["microorganism", "microorganisms", "bacteria", "fungi", "microbiome", "contamination", "host"],
  },
  {
    id: "risk-hypoxia",
    name: "Hypoxia",
    english: "Hypoxia",
    hazard: false,
    summary: "Inadequate oxygen supply in the cabin or suit can reduce the body's oxygenation.",
    description:
      "Hypoxia occurs when tissues receive less oxygen than they need. On missions, it may be related to reduced-pressure cabin atmospheres, life support failures or suit operations. Pulse oximetry helps track oxygen saturation.",
    impacts: ["Reduced cognitive performance", "Fatigue and shortness of breath", "Impaired performance on critical tasks"],
    indicators: ["Pulse oximetry (SpO₂)", "Heart rate"],
    refTitle: "Risk of Hypoxia",
    refUrl: "https://www.nasa.gov/reference/risk-of-hypoxia/",
    keywords: ["hypoxia", "oxygen", "oximetry", "spo2", "saturation", "breathing", "lung", "lungs"],
  },
  {
    id: "risk-nutrition",
    name: "Inadequate food and nutrition",
    english: "Inadequate Food and Nutrition",
    hazard: false,
    summary: "Ensuring safe, nutritious and acceptable food throughout the mission.",
    description:
      "On long missions, food must retain quality and nutrients for a long time. Appetite changes, menu fatigue and nutrient loss can lead to insufficient intake, affecting weight, performance and health.",
    impacts: ["Insufficient calorie intake", "Weight and muscle loss", "Nutritional deficiencies", "Performance impact"],
    indicators: ["Appetite", "Hydration", "Body weight", "Blood count"],
    refTitle: "Risk of Inadequate Food and Nutrition",
    refUrl: "https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/",
    keywords: ["nutrition", "food", "appetite", "eating", "diet", "weight", "hydration", "water", "digestive"],
  },
  {
    id: "risk-eva",
    name: "Injuries during extravehicular activities",
    english: "Injury and Compromised Performance from EVA",
    hazard: false,
    summary: "Activities outside the vehicle demand intense physical effort inside pressurized suits.",
    description:
      "During EVAs, the pressurized suit limits movement and demands strength, mainly from the hands and shoulders. Injuries from suit contact, muscle fatigue and reduced performance may occur.",
    impacts: ["Injuries to hands, nails and shoulders", "Muscle fatigue", "Thermal discomfort", "Reduced performance"],
    indicators: ["Fatigue", "Heart rate", "Pulse oximetry"],
    refTitle: "Risk of Injury and Compromised Performance from EVA",
    refUrl: "https://www.nasa.gov/reference/risk-of-injury-and-compromised-performance-from-extravehicular-activity-eva/",
    keywords: ["eva", "extravehicular", "suit", "spacewalk", "gloves", "injury"],
  },
  {
    id: "risk-fitness",
    name: "Reduced cardiorespiratory and musculoskeletal fitness",
    english: "Reduced Cardiorespiratory and Musculoskeletal Fitness",
    hazard: false,
    summary: "Without gravity load, muscles and physical conditioning decline without adequate exercise.",
    description:
      "In microgravity, postural muscles and the cardiorespiratory system are less challenged. Without resistive and aerobic exercise countermeasures, strength, muscle mass and aerobic capacity are lost.",
    impacts: ["Loss of strength and muscle mass", "Reduced aerobic capacity", "Greater fatigue during physical tasks"],
    indicators: ["Heart rate", "Fatigue", "Body weight"],
    refTitle: "Risk of Reduced Cardiorespiratory and Musculoskeletal Fitness",
    refUrl: "https://www.nasa.gov/reference/risk-of-reduced-cardiorespiratory-and-musculoskeletal-fitness/",
    keywords: ["muscle", "muscular", "strength", "conditioning", "exercise", "aerobic", "atrophy", "fitness"],
  },
  {
    id: "risk-sans",
    name: "SANS — Neuro-ocular Syndrome",
    english: "Spaceflight Associated Neuro-ocular Syndrome",
    hazard: false,
    summary: "Eye and neurological changes observed in astronauts on long missions.",
    description:
      "SANS (Spaceflight Associated Neuro-ocular Syndrome) groups changes seen in long-duration astronauts, such as optic disc edema, flattening of the eyeball, choroidal folds and refractive shifts. Fluid redistribution toward the head is one of the hypotheses studied. Monitoring relies on specialized exams.",
    impacts: ["Optic disc edema", "Posterior flattening of the eyeball", "Choroidal folds", "Refractive shifts (near vision)"],
    indicators: ["Eye attention (EOG)", "Periodic vision assessment", "Optical coherence tomography (OCT)"],
    refTitle: "Risk of Spaceflight Associated Neuro-ocular Syndrome (SANS)",
    refUrl: "https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans/",
    keywords: ["sans", "eye", "eyes", "vision", "ocular", "neuro ocular", "retina", "optic disc", "seeing", "sight"],
  },
  {
    id: "risk-bone",
    name: "Bone changes",
    english: "Spaceflight-Induced Bone Changes",
    hazard: false,
    summary: "Weight-bearing bones lose mineral density without gravitational load.",
    description:
      "Without mechanical load, the body reduces bone formation and increases resorption, mainly in the hip, spine and legs. Without countermeasures such as resistive exercise and adequate nutrition, bone mineral density drops, with risk of osteopenia, osteoporosis and fractures.",
    impacts: ["Reduced bone mineral density", "Osteopenia and osteoporosis", "Higher fracture risk", "Kidney stone risk from calcium release"],
    indicators: ["Exercise routine", "Nutrition and appetite", "Periodic exams"],
    refTitle: "Risk of Spaceflight-Induced Bone Changes",
    refUrl: "https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/",
    keywords: ["bone", "bones", "skeletal", "density", "osteoporosis", "osteopenia", "fracture", "calcium"],
  },
  {
    id: "risk-behavioral",
    name: "Behavioral changes",
    english: "Behavioral Conditions and Psychiatric Disorders",
    hazard: false,
    summary: "Isolation, confinement and stress can affect behavioral health.",
    description:
      "Crew behavioral health can be affected by isolation, distance from family, workload and prolonged coexistence. Monitoring mood, sleep and fatigue helps identify pattern changes early.",
    impacts: ["Mood changes", "Anxiety and stress", "Reduced motivation", "Interpersonal conflicts"],
    indicators: ["Fatigue", "Sleep", "Eye attention (EOG)"],
    refTitle: "Risk of Behavioral Conditions and Psychiatric Disorders",
    refUrl: "https://www.nasa.gov/reference/risk-of-behavioral-conditions-and-psychiatric-disorders/",
    keywords: ["behavior", "behavioral", "mood", "anxiety", "psychiatric", "mental", "cognitive"],
  },
  {
    id: "risk-sleep",
    name: "Inadequate sleep",
    english: "Inadequate Sleep and Irregular Schedules",
    hazard: false,
    summary: "Sleep loss and irregular schedules compromise performance and safety.",
    description:
      "Noise, lighting, workload and the absence of a natural day-night cycle can reduce sleep quantity and quality. Sleep deprivation affects attention, reaction time and mood.",
    impacts: ["Reduced attention", "Longer reaction time", "Accumulated fatigue", "Circadian misalignment"],
    indicators: ["Sleep", "Fatigue", "Eye attention (EOG)"],
    refTitle: "Risk from Inadequate Sleep and Irregular Schedules",
    refUrl: "https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/",
    keywords: ["sleep", "sleeping", "insomnia", "circadian", "tired", "tiredness", "rest"],
  },
  {
    id: "risk-human-factors",
    name: "Human factors",
    english: "Human Factors and Systems Integration",
    hazard: false,
    summary: "Interfaces, procedures and workload influence crew errors and performance.",
    description:
      "Systems, tools and interfaces must be designed for human capabilities, considering fatigue, workload and autonomy from Earth. Clear interfaces reduce errors in critical tasks.",
    impacts: ["Higher chance of operational error", "Work overload", "Difficulty with critical tasks"],
    indicators: ["Fatigue", "Eye attention (EOG)", "Sleep"],
    refTitle: "Risk of Inadequate Systems Operations Support",
    refUrl: "https://www.nasa.gov/reference/risk-of-inadequate-systems-operations-support/",
    keywords: ["human factors", "error", "interface", "workload", "performance", "ergonomics"],
  },
  {
    id: "risk-cancer",
    name: "Radiation-induced cancer",
    english: "Radiation-Induced Cancers",
    hazard: false,
    summary: "Exposure to space radiation increases lifetime cancer risk.",
    description:
      "Ionizing radiation can damage DNA. For this reason, accumulated exposure is limited and tracked throughout an astronaut's career. Shielding, mission planning and continuous dosimetry are part of the protection strategy.",
    impacts: ["Increased lifetime cancer risk", "Career exposure limits"],
    indicators: ["Radiation dosimetry", "Accumulated dose"],
    refTitle: "Risk of Radiation-Induced Cancers",
    refUrl: "https://www.nasa.gov/reference/risk-of-radiation-induced-cancers/",
    keywords: ["cancer", "tumor", "dna", "radiation", "accumulated dose"],
  },
];

export const ALL_RISKS = [...HAZARDS, ...SPECIFIC_RISKS];
export const RISK_BY_ID: Record<string, Risk> = Object.fromEntries(ALL_RISKS.map((r) => [r.id, r]));
