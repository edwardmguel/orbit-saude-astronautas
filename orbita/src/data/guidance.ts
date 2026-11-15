/**
 * Per-indicator guidance, translated from the research repository:
 *  - "Do now", "Clinical path", "Escalate when" and "Crewmate" come from the `orientacoes`
 *    block of prototipo/config/indicadores.json (yellow, red, gatilhoParaSubir, colega).
 *  - "Who acts" comes from the master table of docs/03.
 *  - "Prevention" comes from the NASA countermeasure library (raw research note 10, section D1).
 * Orbit never prescribes medication or changes vehicle systems.
 */
import type { IndicatorKey } from "@/types";

export interface Guidance {
  whoActs: string;
  doNow: string[];
  clinical: string;
  escalateWhen: string;
  crewmate: string;
  prevention: string[];
  source: { label: string; url: string };
}

const WHO_PERSONAL = "Crew member; CMO when the change persists or there are symptoms";

const CARDIO_YELLOW = "Rest and repeat with the indicated method; record posture and symptoms and report a persistent deviation to the CMO.";
const CARDIO_RED = "The CMO confirms the measurement and assesses symptoms; instability follows the emergency procedure.";
const CARDIO_TRIGGER = "Chest pain, fainting, significant shortness of breath, confusion, neurological deficit or an approved individual limit.";
const CARDIO_MATE = "Ask privately whether the person wants help repeating the measurement or calling the CMO.";

const LAB_YELLOW = "Confirm method, time and context; clinical review considers trend and protocol — no diagnosis from an isolated reading.";
const LAB_RED = "The CMO confirms with the clinical method and follows the approved procedure for symptoms or a critical result.";
const LAB_TRIGGER = "Alarm symptoms or an individual criterion approved by the flight surgeon.";
const LAB_MATE = "Help organize the measurement or sample collection if asked, without interpreting the result.";

const BEHAV_YELLOW = "Record sleep, shift and workload context; compare with your own series and tell the CMO if it persists.";
const BEHAV_RED = "The baseline alone never produces red; the CMO assesses task safety according to procedure.";
const BEHAV_TRIGGER = "Inability to perform a critical task safely, or an immediate risk reported.";
const BEHAV_MATE = "Help protect the rest window or organize the task if the person asks.";

const EXERCISE = "Follow the approved exercise session and load (ARED resistive, T2 treadmill, CEVIS cycle — about 2 h/day on ISS); do not make up a missed session with extra load.";
const NUTRITION = "Eat and log food according to the individual nutrition plan; do not start supplements or cut salt, calcium, iron or calories on your own.";
const SLEEP = "Protect the 8.5-h sleep window plus 2 h pre-sleep and 1.5 h post-sleep (NASA medical standard); reduce light and noise before sleep; use eye mask and earplugs as needed.";
const HYDRATION = "Log intake according to the individual plan, spread drinking across the agreed period and follow the water and exercise plan that also lowers kidney-stone risk.";

const SRC_IND = { label: "Research repo · indicadores.json guidance + docs/03 master table", url: "https://github.com/edwardmguel/orbit-saude-astronautas" };

export const GUIDANCE: Record<IndicatorKey, Guidance> = {
  hr: {
    whoActs: WHO_PERSONAL,
    doNow: [CARDIO_YELLOW],
    clinical: CARDIO_RED,
    escalateWhen: CARDIO_TRIGGER,
    crewmate: CARDIO_MATE,
    prevention: [EXERCISE, "Before returning to gravity, follow the approved fluid-loading and compression-garment plan (orthostatic intolerance countermeasure)."],
    source: SRC_IND,
  },
  bp: {
    whoActs: WHO_PERSONAL,
    doNow: [CARDIO_YELLOW],
    clinical: CARDIO_RED,
    escalateWhen: CARDIO_TRIGGER,
    crewmate: CARDIO_MATE,
    prevention: [EXERCISE, "Before returning to gravity, follow the approved fluid-loading and compression-garment plan; stay supported or reclined during the transition."],
    source: SRC_IND,
  },
  glucose: {
    whoActs: WHO_PERSONAL,
    doNow: [LAB_YELLOW],
    clinical: LAB_RED,
    escalateWhen: LAB_TRIGGER,
    crewmate: LAB_MATE,
    prevention: [NUTRITION],
    source: SRC_IND,
  },
  temp: {
    whoActs: WHO_PERSONAL,
    doNow: [LAB_YELLOW, "Repeat the reading and note symptoms."],
    clinical: LAB_RED,
    escalateWhen: LAB_TRIGGER,
    crewmate: LAB_MATE,
    prevention: ["Keep hygiene and the habitat's environmental monitoring routine; report persistent symptoms early to the CMO."],
    source: SRC_IND,
  },
  mood: {
    whoActs: WHO_PERSONAL,
    doNow: [BEHAV_YELLOW, "Use the private channels: private psychological conference, family conference, or a private talk with the CMO."],
    clinical: BEHAV_RED,
    escalateWhen: BEHAV_TRIGGER,
    crewmate: "Offer presence and listening without pressing for clinical details; help protect rest time if asked.",
    prevention: ["Reserve time for leisure and mission-compatible social contact; Earth observation and plant care are wellness options (not proven treatment).", SLEEP],
    source: SRC_IND,
  },
  spo2: {
    whoActs: WHO_PERSONAL,
    doNow: ["Confirm the signal and resting condition; record symptoms and report a repeated change to the CMO."],
    clinical: "The CMO assesses the person and follows the approved respiratory procedure; significant difficulty requires an immediate response.",
    escalateWhen: "Significant breathing difficulty, acute deterioration or an approved medical criterion.",
    crewmate: "Offer help repeating the measurement and contacting the CMO.",
    prevention: ["Check the module's CO₂ and local ventilation per checklist; if authorized, use an approved portable fan or move the task to a module with a lower reading. Never block ducts or ignore alarms."],
    source: SRC_IND,
  },
  sleep: {
    whoActs: WHO_PERSONAL,
    doNow: [BEHAV_YELLOW],
    clinical: BEHAV_RED,
    escalateWhen: BEHAV_TRIGGER,
    crewmate: BEHAV_MATE,
    prevention: [SLEEP, "Naps and schedule changes follow the fatigue-management plan; never take medication on the software's suggestion."],
    source: SRC_IND,
  },
  fatigue: {
    whoActs: WHO_PERSONAL,
    doNow: [BEHAV_YELLOW],
    clinical: BEHAV_RED,
    escalateWhen: BEHAV_TRIGGER,
    crewmate: BEHAV_MATE,
    prevention: [SLEEP, EXERCISE],
    source: SRC_IND,
  },
  eog: {
    whoActs: WHO_PERSONAL,
    doNow: ["Check contact and signal quality of the Orbit glasses; compare with the day's sleep, fatigue and PVT and, if the change persists, mention it to the CMO — the number is not a diagnosis."],
    clinical: "The baseline alone never produces red; difficulty in a critical task or a symptom follows the fatigue procedure with the CMO.",
    escalateWhen: "Inability to perform a critical task safely or an urgent symptom; EOG alone never raises the level.",
    crewmate: "Offer help protecting the rest window or reorganizing the task, if the person asks.",
    prevention: [SLEEP],
    source: SRC_IND,
  },
  hydration: {
    whoActs: WHO_PERSONAL,
    doNow: ["Check the record and the individual plan; hydration follows the target approved for the person."],
    clinical: "Intake or urine color never produce red alone; the CMO assesses symptoms through the clinical procedure.",
    escalateWhen: "Urgent kidney or systemic symptom, or an approved clinical criterion. Report pain, blood in urine, vomiting or reduced urination.",
    crewmate: "Offer private support and water according to the individual plan.",
    prevention: [HYDRATION, "Do not force fluids above the plan, and do not change salt, calcium or medication on your own."],
    source: SRC_IND,
  },
  appetite: {
    whoActs: WHO_PERSONAL,
    doNow: ["Check that meal records are complete; report low appetite or difficulty eating to the CMO and ask for a nutrition review before changing the diet. Do not start supplements or reduce calories, salt, calcium or iron on your own."],
    clinical: "The baseline alone never produces red; inability to eat or drink with clinical worsening follows urgent assessment with the CMO, who refers to the flight surgeon and nutrition team.",
    escalateWhen: "Inability to take food or fluids, dehydration or an acute clinical symptom.",
    crewmate: "Offer help organizing the planned meal, without judging food choices.",
    prevention: [NUTRITION],
    source: SRC_IND,
  },
  blood: {
    whoActs: WHO_PERSONAL,
    doNow: [LAB_YELLOW, "Use the reference range printed on the laboratory report; samples in orbit may be frozen and analyzed on Earth."],
    clinical: LAB_RED,
    escalateWhen: "Fainting or shortness of breath at rest, alarm symptoms, or an individual criterion approved by the flight surgeon.",
    crewmate: LAB_MATE,
    prevention: [NUTRITION + " Iron is followed in the context of in-flight blood changes."],
    source: SRC_IND,
  },
  dose: {
    whoActs: "Crew member and the radiation requirement authority (SRAG); CMO as needed",
    doNow: ["Check location, time and source; follow flight-control instructions and record the event dose."],
    clinical: "CMO and radiation protection follow the official procedure and inform the flight surgeon and flight control.",
    escalateWhen: "Mission-approved dose threshold or an emergency operational order.",
    crewmate: "Help confirm the instruction and accompany the crew to the indicated location.",
    prevention: ["During a solar event, follow the shelter order and route (on ISS: Node 2 crew quarters, US Lab, Service Module aft area); stop or postpone EVA when ordered; resume only when cleared. Shelter decisions belong to flight control with SRAG."],
    source: SRC_IND,
  },
};
