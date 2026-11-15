import type { IndicatorKey } from "@/types";

export type RegionId = "head" | "eyes" | "heart" | "lungs" | "immune" | "abdomen" | "bones" | "muscles" | "body";

export interface BodyRegion {
  id: RegionId;
  name: string;
  title: string;
  risks: string[];
  explanation: string;
  indicators: IndicatorKey[];
  evaluations: string[];
  riskId: string;
}

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: "head",
    name: "Head and brain",
    title: "CEPHALIC REGION",
    risks: ["Neurological changes", "Behavioral changes", "Cognitive changes", "Sensorimotor and vestibular changes"],
    explanation:
      "In microgravity, the vestibular system loses its gravity reference and fluids shift toward the head. Isolation, irregular sleep and radiation are also studied for their effects on cognition and behavior.",
    indicators: ["mood", "eog", "fatigue", "sleep"],
    evaluations: ["Periodic cognitive tests", "Balance and coordination assessment", "Behavioral follow-up"],
    riskId: "risk-sensorimotor",
  },
  {
    id: "eyes",
    name: "Eyes and vision",
    title: "OCULAR REGION",
    risks: ["SANS — Spaceflight Associated Neuro-ocular Syndrome", "Visual changes", "Changes in eye structure", "Microgravity-related changes"],
    explanation:
      "SANS groups changes seen on long missions, such as optic disc edema, flattening of the eyeball and refractive shifts, which can make near vision difficult. Fluid redistribution toward the head is one of the hypotheses studied.",
    indicators: ["eog"],
    evaluations: ["Optical coherence tomography (OCT)", "Fundoscopy", "Visual acuity test", "Amsler grid", "Tonometry"],
    riskId: "risk-sans",
  },
  {
    id: "heart",
    name: "Heart and cardiovascular system",
    title: "CARDIAC REGION",
    risks: ["Cardiovascular adaptations", "Circulatory changes", "Reduced cardiorespiratory fitness"],
    explanation:
      "Without gravity, blood redistributes to the upper body and the heart adapts to a different load. On return to gravity, there may be difficulty maintaining blood pressure while standing (orthostatic intolerance).",
    indicators: ["hr", "bp", "spo2"],
    evaluations: ["Electrocardiogram", "Cardiac ultrasound", "Periodic stress test"],
    riskId: "risk-cardiovascular",
  },
  {
    id: "lungs",
    name: "Lungs",
    title: "PULMONARY REGION",
    risks: ["Hypoxia", "Oxygenation changes", "Environment-related respiratory problems"],
    explanation:
      "Oxygenation depends on the controlled cabin atmosphere and suits. Life support failures, reduced pressure or air contaminants can affect breathing and oxygen saturation.",
    indicators: ["spo2", "hr"],
    evaluations: ["Continuous pulse oximetry", "Spirometry", "Environmental O₂ and CO₂ monitoring"],
    riskId: "risk-hypoxia",
  },
  {
    id: "immune",
    name: "Immune system",
    title: "IMMUNE SYSTEM",
    risks: ["Altered immune response", "Host–microorganism interactions", "Infection-related risks"],
    explanation:
      "Stress, irregular sleep, radiation and the closed environment can change immunity. At the same time, microorganisms may behave differently in space, calling for attention to hygiene and monitoring.",
    indicators: ["blood", "temp", "fatigue", "sleep"],
    evaluations: ["Blood count with white cell count", "Environmental microbiological monitoring", "Clinical symptom assessment"],
    riskId: "risk-immune",
  },
  {
    id: "abdomen",
    name: "Abdomen and digestive system",
    title: "ABDOMINAL REGION",
    risks: ["Inadequate nutrition", "Appetite changes", "Insufficient food intake"],
    explanation:
      "Appetite changes, menu monotony and nutrient loss in food over time can reduce intake. Hydration and appetite logged daily help track this risk.",
    indicators: ["appetite", "hydration", "glucose", "blood"],
    evaluations: ["Food log", "Body mass tracking", "Nutritional lab tests"],
    riskId: "risk-nutrition",
  },
  {
    id: "bones",
    name: "Bones",
    title: "SKELETAL SYSTEM",
    risks: ["Spaceflight-induced bone changes", "Reduced bone mineral density", "Osteopenia and osteoporosis"],
    explanation:
      "Without mechanical load, weight-bearing bones — hip, spine and legs — lose mineral density. Resistive exercise and adequate nutrition are the main countermeasures.",
    indicators: ["appetite", "fatigue"],
    evaluations: ["Bone densitometry (DXA) pre- and post-flight", "Bone turnover markers", "Resistive exercise log"],
    riskId: "risk-bone",
  },
  {
    id: "muscles",
    name: "Muscles and limbs",
    title: "MUSCLES AND LIMBS",
    risks: ["Reduced musculoskeletal fitness", "Loss of strength", "Motor changes", "Injuries related to extravehicular activities"],
    explanation:
      "In microgravity, postural muscles are less challenged and lose strength and volume without exercise. Extravehicular activities demand intense effort from the hands and shoulders inside the pressurized suit.",
    indicators: ["fatigue", "hr"],
    evaluations: ["Muscle strength tests", "Functional assessment", "Exercise and EVA log"],
    riskId: "risk-fitness",
  },
  {
    id: "body",
    name: "Whole body",
    title: "WHOLE BODY",
    risks: ["Space radiation", "Isolation and confinement", "Hostile and closed environments", "Exposure to mission environmental factors"],
    explanation:
      "Some hazards affect the body as a whole. Ionizing radiation passes through tissue, while isolation, confinement and the closed environment of the spacecraft influence sleep, mood and immunity.",
    indicators: ["dose", "temp", "mood", "sleep"],
    evaluations: ["Continuous personal dosimetry", "Behavioral follow-up", "Cabin environmental monitoring"],
    riskId: "hazard-radiation",
  },
];

export const REGION_BY_ID = Object.fromEntries(BODY_REGIONS.map((r) => [r.id, r])) as Record<RegionId, BodyRegion>;
