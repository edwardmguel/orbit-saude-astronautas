/**
 * Orbit IA: offline assistant.
 * Intent-based answer engine + retrieval from the local knowledge base
 * (NASA HRP risk library). Uses no external API and performs no diagnoses.
 */
import type { AppState, IndicatorKey } from "@/types";
import { ALL_RISKS, RISK_BY_ID } from "@/data/risks";
import { GUIDANCE } from "@/data/guidance";
import { APPETITE_LABEL, STATUS_META, fmt1, fmt2, snapshotFor, type Snapshot } from "./health";
import { eogPattern } from "./sim";
import { CAREER_LIMIT_MSV, G0, boneEstimate, commsFor, eclssBudget, equivalentAltitudeM, expectedSpo2, fmtDelay, hydrostaticMmHg, volumePercent } from "./physics";
import { fmtDate, normalize } from "./util";

export interface AiAnswer {
  text: string;
  refs: string[];
}

export const SUGGESTIONS = [
  "How is my health today?",
  "Which indicators need attention?",
  "Why did my heart rate change?",
  "What are the effects of microgravity?",
  "What is SANS?",
  "How does space radiation affect the body?",
  "When should I do my next assessment?",
  "Which crew members have indicators that need attention?",
  "How does this mission's environment affect me?",
];

const DISCLAIMER = "_This information is educational and does not replace evaluation by the mission medical team._";

const has = (q: string, ...words: string[]) => words.some((w) => q.includes(w));

function statusWord(s: keyof typeof STATUS_META) {
  return STATUS_META[s].label.toUpperCase();
}

function summary(s: Snapshot): string {
  const i = s.indicators;
  const line = (k: IndicatorKey) => `• **${i[k].label}:** ${i[k].value} — ${statusWord(i[k].status)}`;
  return [line("hr"), line("bp"), line("spo2"), line("temp"), line("glucose"), line("dose"), line("eog"), line("sleep"), line("mood"), line("hydration"), line("fatigue"), line("appetite"), line("blood")].join("\n");
}

function intentHealthToday(s: Snapshot): AiAnswer {
  const name = s.profile.name.split(" ")[0];
  const head =
    s.alerts.length === 0
      ? `${name}, your indicators are within the monitoring criteria today (mission day ${s.day}). Overall status: **${statusWord(s.overall)}**.`
      : `${name}, on mission day ${s.day} your overall status is **${statusWord(s.overall)}**, with ${s.alerts.length} flagged indicator(s).`;
  const pending = !s.assessmentFresh ? "\n\nYour **daily assessment** is pending — log hydration, fatigue, appetite and mood in the Personal Assessment section." : "";
  return { text: `${head}\n\n${summary(s)}${pending}\n\nAutomatic data is **SIMULATED** in this prototype.\n${DISCLAIMER}`, refs: [] };
}

function intentAttention(s: Snapshot): AiAnswer {
  if (!s.alerts.length)
    return { text: `None of ${s.profile.name.split(" ")[0]}'s indicators need attention right now. Keep up the assessment routine.${!s.assessmentFresh ? "\n\nNote: the daily assessment has not been logged in the last 24 h." : ""}`, refs: [] };
  const list = s.alerts
    .map((a) => `• **${a.label}** (${statusWord(a.status)}): ${a.value}. ${a.reason}\n  ↳ **Do now:** ${GUIDANCE[a.key].doNow[0]}\n  ↳ **Call the CMO when:** ${GUIDANCE[a.key].escalateWhen}`)
    .join("\n");
  const refs = Array.from(new Set(s.alerts.map((a) => INDICATOR_RISK[a.key]).filter((x): x is string => !!x)));
  return { text: `Indicators that need attention:\n\n${list}\n\nTap any flagged indicator on the Overview to see prevention and the full guidance.\n${DISCLAIMER}`, refs };
}

const INDICATOR_RISK: Partial<Record<IndicatorKey, string>> = {
  hr: "risk-cardiovascular",
  spo2: "risk-hypoxia",
  dose: "hazard-radiation",
  eog: "risk-sleep",
  sleep: "risk-sleep",
  fatigue: "risk-sleep",
  hydration: "risk-nutrition",
  appetite: "risk-nutrition",
  blood: "risk-immune",
  bp: "risk-cardiovascular",
  glucose: "risk-nutrition",
  temp: "risk-immune",
  mood: "risk-behavioral",
};

function intentHr(s: Snapshot): AiAnswer {
  const last7 = s.series.slice(-7);
  const first = last7[0]?.hr ?? s.current.hr;
  const dev = ((s.current.hr - s.baseline.hr) / s.baseline.hr) * 100;
  const trend = s.current.hr - first;
  const contrib: string[] = [];
  if (["attention", "alert", "critical"].includes(s.indicators.sleep.status)) contrib.push(`sleep below your personal pattern (${s.indicators.sleep.value})`);
  if (["attention", "alert", "critical"].includes(s.indicators.fatigue.status)) contrib.push(`elevated fatigue (${s.indicators.fatigue.value})`);
  if (["attention", "alert", "critical"].includes(s.indicators.hydration.status)) contrib.push(`reduced hydration (${s.indicators.hydration.value})`);
  if (["attention", "alert", "critical"].includes(s.indicators.spo2.status)) contrib.push(`reduced oxygen saturation (${s.indicators.spo2.value})`);
  const changed = Math.abs(dev) >= 10 || Math.abs(trend) >= 6;
  let text = `Your current heart rate is **${s.current.hr} bpm**; your individual baseline (first 14 days) is **${s.baseline.hr} bpm** (${dev >= 0 ? "+" : ""}${dev.toFixed(0)}%). Over the last 7 days, the change was ${trend >= 0 ? "+" : ""}${trend} bpm.\n\n`;
  text += changed
    ? "In the knowledge base, factors associated with heart rate changes in spaceflight include **fluid redistribution** in microgravity, **cardiovascular deconditioning**, physical exertion, stress, sleep deprivation and dehydration."
    : "The change is small relative to your pattern. In microgravity, heart rate can fluctuate with fluid redistribution, exercise and the sleep cycle.";
  if (contrib.length) text += `\n\nYour recent records also show: ${contrib.join("; ")}. These data do not indicate a cause, but deserve joint monitoring.`;
  text += `\n\nSuggestion: repeat the measurement at rest and check the trend on the Reports page.\n${DISCLAIMER}`;
  return { text, refs: ["risk-cardiovascular", "hazard-gravity"] };
}

function intentNextAssessment(s: Snapshot): AiAnswer {
  const daily = s.assessmentFresh && s.latestAssessment
    ? `The next **daily assessment** opens in ${Math.max(1, Math.round((s.latestAssessment.ts + 86_400_000 - Date.now()) / 3_600_000))} h (24 h window).`
    : "Your **daily assessment** is pending: log hydration, fatigue, appetite and mood now (vital signs are optional, when measured with the medical kit).";
  const blood =
    s.bloodDaysLeft < 0
      ? `Your **blood count** is overdue by ${Math.abs(s.bloodDaysLeft)} day(s).`
      : `Your next **blood count** is due on ${fmtDate(s.nextBloodDue)} — in ${s.bloodDaysLeft} day(s). It is requested every 15 days.`;
  return { text: `${daily}\n\n${blood}\n\nSupplementary assessments (vision and periodic exams) appear on the Mission Routine page.`, refs: [] };
}

function intentCrew(state: AppState, now: number): AiAnswer {
  const snaps = state.crew.map((c) => snapshotFor(state, c.id, now)).filter(Boolean) as Snapshot[];
  const flagged = snaps.filter((s) => s.alerts.length).sort((a, b) => STATUS_META[b.overall].rank - STATUS_META[a.overall].rank);
  if (!flagged.length) return { text: `None of the ${snaps.length} crew members has indicators that need attention right now.`, refs: [] };
  const lines = flagged.map((s) => `• **Astronaut ${s.profile.code} — ${s.profile.name}** (${statusWord(s.overall)}): ${s.alerts.map((a) => a.label.charAt(0).toLowerCase() + a.label.slice(1)).join(", ")}`);
  const ok = snaps.filter((s) => !s.alerts.length).map((s) => `${s.profile.name} (${s.profile.code})`);
  return {
    text: `Considering the ${snaps.length} registered profiles, ${flagged.length} have flagged indicators:\n\n${lines.join("\n")}${ok.length ? `\n\nWithin criteria: ${ok.join(", ")}.` : ""}\n\nOpen the Crew page to see each astronaut's details.`,
    refs: [],
  };
}

function intentMicrogravity(): AiAnswer {
  return {
    text:
      "According to the NASA Human Research Program, microgravity affects several systems:\n\n• **Body fluids** shift toward the head (facial puffiness, congestion).\n• **Heart and vessels** adapt to the new blood distribution; on return, orthostatic intolerance may occur.\n• **Weight-bearing bones** lose mineral density.\n• **Muscles** lose strength and volume without exercise.\n• **Vestibular system** must readapt, which can cause nausea and disorientation.\n• **Eyes** may show changes associated with SANS.\n\nDaily exercise, adequate nutrition and continuous monitoring are the main countermeasures.",
    refs: ["hazard-gravity", "risk-bone", "risk-sensorimotor", "risk-sans"],
  };
}

function intentSans(s: Snapshot): AiAnswer {
  return {
    text: `**SANS — Spaceflight Associated Neuro-ocular Syndrome** groups changes seen in astronauts on long missions, such as optic disc edema, posterior flattening of the eyeball, choroidal folds and refractive shifts (difficulty seeing up close). Fluid redistribution toward the head is one of the hypotheses studied.\n\nMonitoring uses specialized exams: optical coherence tomography (OCT), fundoscopy, visual acuity and tonometry.\n\nIn Orbit, the (experimental) **EOG** indicator is at ${s.indicators.eog.value} (${statusWord(s.indicators.eog.status)}). It does not assess SANS and is not a diagnosis.\n${DISCLAIMER}`,
    refs: ["risk-sans"],
  };
}

function intentRadiation(s: Snapshot): AiAnswer {
  const m = s.mission;
  const pct = (s.current.doseCum / CAREER_LIMIT_MSV) * 100;
  const proj = (s.doseProjected / CAREER_LIMIT_MSV) * 100;
  return {
    text: `Outside the protection of the atmosphere and magnetosphere, the crew receives radiation from **galactic cosmic rays** and **solar particle events**. This ionizing radiation can damage DNA and other cellular structures. The main effects studied are increased lifetime cancer risk, possible effects on the central nervous and cardiovascular systems and, at very high exposures, acute effects.\n\n**${m.code} environment:** expected ${fmt2(m.doseRate)} mSv/day (${m.doseSource.label}). ${m.shielding}.${m.transitDays ? ` Outbound transit: ${m.transitDays} days × ${fmt2(m.transitDoseRate)} mSv/day = ${fmt1(m.transitDays * m.transitDoseRate)} mSv.` : ""}\n\nYour dosimetry: **${s.indicators.dose.value}** — ${statusWord(s.indicators.dose.status)} (simulated).\n• Career use: D ÷ 600 mSv = ${fmt1(s.current.doseCum)} ÷ 600 = **${fmt1(pct)}%** (NASA-STD-3001 V1 4030).\n• Projected whole mission: **${fmt1(s.doseProjected)} mSv** (${proj.toFixed(0)}% of the limit).\n\nProtection combines shielding, operational planning and continuous dosimetry; shelter decisions belong to flight control and SRAG.`,
    refs: ["hazard-radiation", "risk-cancer"],
  };
}

function intentMission(s: Snapshot, crew: number, now: number): AiAnswer {
  const m = s.mission;
  const ox = expectedSpo2(m.cabin.totalMmHg, m.cabin.ppO2MmHg);
  const c = commsFor(m, now);
  const g = m.gravityMs2;
  const bone = boneEstimate(m, s.day);
  const e = eclssBudget(crew);
  const text = [
    `**${m.code} — ${m.name}** · ${m.phase}. ${m.gravityLabel}.`,
    `**Cabin atmosphere** (${m.cabin.label}): PIO₂ = (${fmt1(m.cabin.totalMmHg)} − 47) × ${fmt1(m.cabin.ppO2MmHg)} / ${fmt1(m.cabin.totalMmHg)} = **${fmt1(ox.pio2)} mmHg** (normoxia target 145–155). Alveolar PO₂ ≈ ${fmt1(ox.pao2Alv)} mmHg → expected SpO₂ **${fmt1(ox.spo2)}%** (Severinghaus), equivalent to ${Math.round(equivalentAltitudeM(ox.pio2)).toLocaleString("en-US")} m altitude on Earth.`,
    `**CO₂:** ${fmt2(m.cabin.ppCO2MmHg)} mmHg = ${fmt2(volumePercent(m.cabin.ppCO2MmHg, m.cabin.totalMmHg))}% by volume; limit 3 mmHg (1-h average, V2 6004).`,
    `**Gravity:** heart-to-feet hydrostatic pressure for your height ≈ **${fmt1(hydrostaticMmHg(s.profile.heightCm, g))} mmHg** (Earth ${fmt1(hydrostaticMmHg(s.profile.heightCm, G0))}). Hip BMD estimate ${fmt1(bone.estPct)}% of baseline after ${bone.microgDays} microgravity days (1–1.5%/month).${bone.partialGravityNote ? ` ${bone.partialGravityNote}` : ""}`,
    `**Ground link:** ${fmtDelay(c.oneWaySec)} one way, ${fmtDelay(c.roundTripSec)} round trip — ${c.mode}. ${c.detail}.`,
    `**Life support for ${crew} crew:** O₂ ${fmt2(e.o2DemandKgDay)} kg/day (${e.ogaUtilMaxPct.toFixed(0)}% of OGA max), water ${fmt1(e.waterLDay)} L/day with 98% recovery.`,
    `**Priority indicators here:** ${m.priorityIndicators.join(", ")}.`,
  ].join("\n\n");
  return { text: `${text}\n\n${DISCLAIMER}`, refs: ["hazard-gravity", "hazard-radiation", "hazard-environment"] };
}

function indicatorQuestion(q: string, s: Snapshot): AiAnswer | null {
  const map: [string[], IndicatorKey][] = [
    [["blood pressure", "pressure", "systolic", "diastolic"], "bp"],
    [["glucose", "glycemia", "sugar"], "glucose"],
    [["temperature", "fever"], "temp"],
    [["mood", "feeling", "emotional", "sad", "stress"], "mood"],
    [["oximetry", "spo2", "saturation", "oxygen"], "spo2"],
    [["hydration", "water", "hydrated"], "hydration"],
    [["fatigue", "tired", "tiredness"], "fatigue"],
    [["sleep", "slept"], "sleep"],
    [["appetite", "hungry", "hunger", "eating"], "appetite"],
    [["eog", "ocular", "blink", "eye attention"], "eog"],
    [["blood count", "hemoglobin", "leukocyte", "white blood", "platelet", "blood"], "blood"],
    [["dosimetry", "dose"], "dose"],
  ];
  for (const [words, key] of map) {
    if (!has(q, ...words)) continue;
    const ind = s.indicators[key];
    const risk = RISK_BY_ID[INDICATOR_RISK[key] ?? ""];
    let extra = "";
    if (key === "eog") extra = `\n\nEOG measures eye movements and blinks (${s.current.blink} blinks/min, pattern: ${eogPattern(s.current.eog).toLowerCase()}). It is an **experimental indicator** associated with fatigue and alertness — not a diagnosis of inattention.`;
    if (key === "appetite" && s.latestAssessment) extra = `\n\nLast record: ${APPETITE_LABEL[s.latestAssessment.appetite]}.`;
    if (key === "blood" && s.latestBlood) extra = `\n\nLast exam on ${fmtDate(s.latestBlood.ts)}: hemoglobin ${fmt1(s.latestBlood.hb)} g/dL, hematocrit ${fmt1(s.latestBlood.hct)}%, white blood cells ${fmt1(s.latestBlood.wbc)} thousand/µL, platelets ${s.latestBlood.plt} thousand/µL. Results should be interpreted against laboratory references and with professional follow-up.`;
    const g = GUIDANCE[key];
    const guide = `\n\n**What to do:** ${g.doNow.join(" ")}\n**Prevention:** ${g.prevention.join(" ")}\n**Call the CMO / flight surgeon when:** ${g.escalateWhen}`;
    return {
      text: `**${ind.label}** for ${s.profile.name.split(" ")[0]}: ${ind.value} — ${statusWord(ind.status)}.\n${ind.reason}${extra}${guide}${risk ? `\n\nRelated risk: ${risk.name}. ${risk.summary}` : ""}\n${DISCLAIMER}`,
      refs: risk ? [risk.id] : [],
    };
  }
  return null;
}

function retrieve(q: string): AiAnswer | null {
  const tokens = q.split(/\s+/).filter((t) => t.length > 3);
  let best: { id: string; score: number } | null = null;
  for (const r of ALL_RISKS) {
    let score = 0;
    for (const k of r.keywords) if (q.includes(normalize(k))) score += 3;
    const hay = normalize(`${r.name} ${r.summary} ${r.description}`);
    for (const t of tokens) if (hay.includes(t)) score += 1;
    if (!best || score > best.score) best = { id: r.id, score };
  }
  if (!best || best.score < 3) return null;
  const r = RISK_BY_ID[best.id];
  return {
    text: `**${r.name}** (${r.english})\n\n${r.description}\n\n**Possible impacts:**\n${r.impacts.map((i) => `• ${i}`).join("\n")}\n\n**Related indicators:** ${r.indicators.join(", ")}.`,
    refs: [r.id],
  };
}

export function answer(question: string, state: AppState, selectedId: string, now = Date.now()): AiAnswer {
  const q = normalize(question);
  const s = snapshotFor(state, selectedId, now);
  if (!s) return { text: "No astronaut selected.", refs: [] };

  if (has(q, "diagnos", "medicine", "medication", "drug", "i have a disease", "am i sick", "treatment", "prescri"))
    return { text: `I cannot make diagnoses or recommend treatments. I can explain the indicators and spaceflight risks based on the local NASA library. For any symptom, follow the mission protocol and contact the medical team.\n\n${DISCLAIMER}`, refs: [] };
  if (has(q, "crew", "team", "other astronaut", "colleague", "everyone")) return intentCrew(state, now);
  if (has(q, "heart rate", "heartbeat", "pulse", "heart") && has(q, "chang", "why", "increas", "rose", "dropped", "different", "alter")) return intentHr(s);
  if (has(q, "next assessment", "next exam", "next blood", "when should", "when do i", "deadline", "when is")) return intentNextAssessment(s);
  if (has(q, "need attention", "needs attention", "attention indicators", "flagged", "in alert", "alterations", "which indicators")) return intentAttention(s);
  if (has(q, "how is my health", "my health", "how am i", "overall status", "summary", "health today")) return intentHealthToday(s);
  if (has(q, "sans", "neuro ocular", "neuro-ocular")) return intentSans(s);
  if (has(q, "microgravity", "zero gravity", "zero g", "weightless", "absence of gravity")) return intentMicrogravity();
  if (has(q, "radiation", "cosmic ray")) return intentRadiation(s);
  if (has(q, "environment", "habitat", "life support", "eclss", "cabin", "atmosphere", "gravity", "moon", "lunar", "mars", "martian", " iss", "space station", "delay", "communication"))
    return intentMission(s, state.crew.length, now);
  if (has(q, "heart rate", "heartbeat")) return intentHr(s);
  const ind = indicatorQuestion(q, s);
  if (ind) return ind;
  const r = retrieve(q);
  if (r) return r;
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(q))
    return { text: `Hello, ${s.profile.name.split(" ")[0]}. I'm Orbit IA, working offline with the local knowledge base. I can summarize your health, explain indicators and spaceflight risks, or report the crew's status.`, refs: [] };
  return {
    text: "I couldn't find that information in the local knowledge base. To avoid inaccurate information, I'd rather not answer. Try asking about your indicators, the crew, or risks such as radiation, SANS, microgravity, sleep, bones or nutrition.",
    refs: [],
  };
}
