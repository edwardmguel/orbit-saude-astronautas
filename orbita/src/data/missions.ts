/**
 * Mission environment profiles: ISS, Moon and Mars.
 *
 * Every number carries its source. Values from the project's research repository
 * (docs 02, 03, 04, 17 and the raw research notes 11 and 16) are tagged with the
 * document; peer-reviewed measurements outside the repository are tagged [PAPER];
 * design-reference values that have not flown are tagged [DESIGN REF];
 * deductions are tagged [INFERENCE]. None of these are crew-specific medical limits.
 */

export type MissionId = "iss" | "moon" | "mars";

export interface SourceRef {
  label: string;
  url: string;
}

export interface CabinAtmosphere {
  /** Total cabin pressure (mmHg). */
  totalMmHg: number;
  /** Dry partial pressure of O2 in the cabin (mmHg). */
  ppO2MmHg: number;
  /** Typical ppCO2 of the monitored module (mmHg). */
  ppCO2MmHg: number;
  /** Secondary module reading, when the mission has one. */
  secondary?: { module: string; ppO2MmHg: number; ppCO2MmHg: number };
  module: string;
  label: string;
  origin: "real" | "design";
  source: SourceRef;
}

export interface MissionProfile {
  id: MissionId;
  code: string;
  name: string;
  location: string;
  phase: string;
  /** Short label used in the header selector. */
  short: string;
  /** Surface or orbital acceleration (m/s²). 0 for microgravity in the habitat frame. */
  gravityMs2: number;
  gravityLabel: string;
  /** Planned duration of the current phase (days). */
  phaseDays: number;
  /** Microgravity transit before and after the phase (days each way). */
  transitDays: number;
  /** Effective dose rate during the phase (mSv/day). */
  doseRate: number;
  doseRateRange: [number, number];
  doseSource: SourceRef;
  /** Effective dose rate in deep-space transit (mSv/day). */
  transitDoseRate: number;
  shielding: string;
  cabin: CabinAtmosphere;
  comms: "iss" | "moon" | "mars";
  /** Day counter label in the header. */
  dayLabel: "Day" | "Sol";
  dominantRisks: string[];
  priorityIndicators: string[];
}

/** Source references used across the mission model. */
export const REF = {
  std3001v1: { label: "NASA-STD-3001 Vol. 1 Rev. C (V1 4030, 4027, 4024)", url: "https://www.nasa.gov/reference/4-0-human-performance/" },
  std3001v2: { label: "NASA-STD-3001 Vol. 2 Rev. F (V2 6003, 6004, 6109, 7003)", url: "https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" },
  tb002: { label: "OCHMO-TB-002 ECLSS (normoxia target 145–155 mmHg PIO₂)", url: "https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-002-eclss.pdf" },
  tb003: { label: "OCHMO-TB-003 Habitable Atmosphere (PIO₂ formula)", url: "https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf" },
  tb004: { label: "OCHMO-TB-004 Carbon Dioxide", url: "https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/" },
  isslive: { label: "ISS Live telemetry, Node 3 / US Lab MCA, captured 2026-11-15", url: "https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript" },
  eawg: { label: "NASA Exploration Atmospheres Working Group, NASA/TP-2006-213726 (8.2 psia / 34% O₂)", url: "https://ntrs.nasa.gov/search?q=Recommendations%20for%20Exploration%20Spacecraft%20Internal%20Atmospheres" },
  issDose: { label: "ISS dosimetry, ~0.28–0.56 mSv/day (SRAG; CAD crew dosimeters)", url: "https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm" },
  moonDose: { label: "Zhang et al. 2020, Sci. Adv. 6:eaaz1334 — Chang'e-4 LND, 1,369 µSv/day dose equivalent [PAPER]", url: "https://www.science.org/doi/10.1126/sciadv.aaz1334" },
  marsDose: { label: "Hassler et al. 2014, Science 343:1244797 — MSL RAD, 0.64 mSv/day on the Mars surface [PAPER]", url: "https://www.science.org/doi/10.1126/science.1244797" },
  cruiseDose: { label: "Zeitlin et al. 2013, Science 340:1080 — MSL RAD cruise, 1.84 mSv/day [PAPER]", url: "https://www.science.org/doi/10.1126/science.1235989" },
  noaaS: { label: "NOAA SWPC S-scale (≥10 MeV protons: S1 = 10 pfu)", url: "https://www.swpc.noaa.gov/noaa-scales-explanation" },
  comms: { label: "NASA Space Communications; Mars 4–24 min one way", url: "https://www.nasa.gov/centers-and-facilities/goddard/space-communications-7-things-you-need-to-know/" },
  partialG: { label: "NASA human adaptation evidence — no long-duration human data at 1/6 g or 3/8 g", url: "https://ntrs.nasa.gov/citations/20210019591" },
  bone: { label: "NASA NTRS — hip/spine BMD loss ~1–1.5% per month in microgravity", url: "https://ntrs.nasa.gov/citations/20150010417" },
  ogA: { label: "ICES 2024 ISS ECLS status — OGA 20.4 lb/day (9.25 kg/day) max", url: "https://ntrs.nasa.gov/api/citations/20240007995/downloads/ICES2024141%20ISS%20ECLS%20Presentaton%20RevA.pdf" },
  water98: { label: "NASA — 98% water recovery milestone (UPA + BPA + WPA), 2023", url: "https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/" },
  bvad: { label: "NASA Baseline Values and Assumptions Document, NASA/TP-2015-218570 (O₂ 0.82 kg/CM-day)", url: "https://ntrs.nasa.gov/search?q=Baseline%20Values%20and%20Assumptions%20Document" },
  dust: { label: "NASA-STD-3001 Vol. 2 Rev. F — lunar dust <10 µm 0.3 mg/m³; Martian dust 0.1 mg/m³", url: "https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf" },
} satisfies Record<string, SourceRef>;

/** ISS nominal: Node 3 MCA reading from the 2026-11-15 ISS Live capture. */
const ISS_CABIN: CabinAtmosphere = {
  totalMmHg: 757.64,
  ppO2MmHg: 150.67,
  ppCO2MmHg: 2.95,
  secondary: { module: "US Lab", ppO2MmHg: 165.85, ppCO2MmHg: 2.44 },
  module: "Node 3",
  label: "ISS sea-level atmosphere · 14.7 psia nominal",
  origin: "real",
  source: REF.isslive,
};

/** Exploration atmosphere: 8.2 psia (424.06 mmHg) with 34% O2. */
const EXPLORATION_TOTAL = 8.2 * 51.7149;
const explorationCabin = (module: string, ppCO2MmHg: number): CabinAtmosphere => ({
  totalMmHg: EXPLORATION_TOTAL,
  ppO2MmHg: EXPLORATION_TOTAL * 0.34,
  ppCO2MmHg,
  module,
  label: "Exploration atmosphere · 8.2 psia / 34% O₂",
  origin: "design",
  source: REF.eawg,
});

export const MISSIONS: Record<MissionId, MissionProfile> = {
  iss: {
    id: "iss",
    code: "ISS EXP-01",
    name: "International Space Station",
    short: "ISS",
    location: "Low Earth orbit · ~420 km, 51.6°",
    phase: "6-month increment",
    gravityMs2: 0,
    gravityLabel: "Microgravity (~10⁻⁶ g)",
    phaseDays: 180,
    transitDays: 0,
    doseRate: 0.42,
    doseRateRange: [0.28, 0.56],
    doseSource: REF.issDose,
    transitDoseRate: 0,
    shielding: "Geomagnetic field + hull; dose peaks on South Atlantic Anomaly passes",
    cabin: ISS_CABIN,
    comms: "iss",
    dayLabel: "Day",
    dominantRisks: ["Bone and muscle deconditioning", "SANS (vision)", "Sleep and circadian", "Closed-cabin CO₂", "Noise"],
    priorityIndicators: ["Exercise dose", "Bone and muscle", "Vision (SANS)", "Sleep", "Hydration", "Behavioral health"],
  },
  moon: {
    id: "moon",
    code: "ARTEMIS SURFACE-01",
    name: "Lunar surface habitat",
    short: "Moon",
    location: "Lunar south polar region",
    phase: "Long-stay surface concept · 90 days",
    gravityMs2: 1.62,
    gravityLabel: "1/6 g (1.62 m/s²)",
    phaseDays: 90,
    transitDays: 4,
    doseRate: 1.369,
    doseRateRange: [1.2, 1.4],
    doseSource: REF.moonDose,
    transitDoseRate: 1.84,
    shielding: "No magnetosphere; regolith/habitat shielding required; SPE shelter",
    cabin: explorationCabin("Surface habitat", 2.2),
    comms: "moon",
    dayLabel: "Day",
    dominantRisks: ["Radiation beyond geomagnetic shielding", "Gravity transition, balance and mobility", "Lunar dust", "Loss of contact behind the Moon"],
    priorityIndicators: ["Personal dose and shelter", "Post-landing orthostatic tolerance", "Balance and gait", "Dust exposure", "EVA capacity (VO₂)"],
  },
  mars: {
    id: "mars",
    code: "MARS-01",
    name: "Mars surface habitat",
    short: "Mars",
    location: "Jezero crater region",
    phase: "Surface stay after 180-day transit",
    gravityMs2: 3.721,
    gravityLabel: "3/8 g (3.72 m/s²)",
    phaseDays: 500,
    transitDays: 180,
    doseRate: 0.64,
    doseRateRange: [0.6, 0.7],
    doseSource: REF.marsDose,
    transitDoseRate: 1.84,
    shielding: "Thin CO₂ atmosphere (~20 g/cm²) halves GCR; no global magnetic field",
    cabin: explorationCabin("Surface habitat", 2.4),
    comms: "mars",
    dayLabel: "Sol",
    dominantRisks: ["Accumulated radiation (transit + surface)", "Earth-independent medical operations", "Isolation and confinement", "Martian dust", "No rapid evacuation"],
    priorityIndicators: ["Accumulated dose", "Bone and muscle after transit", "Orthostatic tolerance", "Sleep and behavior", "Consumables and medication"],
  },
};

export const MISSION_ORDER: MissionId[] = ["iss", "moon", "mars"];

export const DEFAULT_MISSION: MissionId = "iss";

/** Real space-weather sample (NOAA SWPC JSON captured 2026-11-15, raw research notes 11). */
export const SPACE_WEATHER_SAMPLE = {
  capturedAt: "2026-11-15 05:43 UTC",
  goes10MeVPfu: 0.209,
  goes10MeVMax7d: 0.481,
  sScale: 0,
  rScale: 0,
  gScale: 0,
  kp: 1.33,
  s1Prob: 5,
  gForecast: "G1 (minor) forecast for 2026-11-17",
};
