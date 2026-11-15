/**
 * Physics and physiology calculations used by the mission model.
 * Formulas follow docs/04 (A1, A7) of the research repository plus standard
 * respiratory physiology. Each function documents its equation.
 */
import type { MissionProfile } from "@/data/missions";
import { REF } from "@/data/missions";

export const G0 = 9.80665; // m/s²
export const MMHG_PER_KPA = 7.50062;
export const KPA_PER_MMHG = 0.133322;
export const MMHG_PER_PSIA = 51.7149;
export const WATER_VAPOR_37C = 47; // mmHg, saturated at 37 °C
export const PACO2 = 40; // mmHg, arterial CO2 (eucapnia)
export const RQ = 0.8; // respiratory quotient
export const A_a_GRADIENT = 5; // mmHg, healthy young adult
export const BLOOD_DENSITY = 1060; // kg/m³
export const HEART_TO_FEET_FRACTION = 0.72; // heart height ≈ 72% of stature (anthropometric approximation)
export const AU_KM = 149_597_870.7;
export const C_KM_S = 299_792.458;
export const MOON_KM = 384_400;

/** PIO2 = (Pb − 47) × ppO2 / Pb  (OCHMO-TB-003; docs/04 A1). */
export function pio2(totalMmHg: number, ppO2MmHg: number) {
  return ((totalMmHg - WATER_VAPOR_37C) * ppO2MmHg) / totalMmHg;
}

/** Alveolar gas equation (simplified): PAO2 = PIO2 − PaCO2 / RQ. */
export function alveolarPO2(pio2MmHg: number) {
  return pio2MmHg - PACO2 / RQ;
}

/** Severinghaus (1979) oxyhemoglobin dissociation: SO2 = 100 / (1 + 23400 / (P³ + 150·P)). */
export function severinghaus(pao2: number) {
  return 100 / (1 + 23400 / (pao2 ** 3 + 150 * pao2));
}

/** Expected SpO2 of a healthy adult breathing the cabin atmosphere. */
export function expectedSpo2(totalMmHg: number, ppO2MmHg: number) {
  const pi = pio2(totalMmHg, ppO2MmHg);
  const pa = alveolarPO2(pi);
  return { pio2: pi, pao2Alv: pa, pao2Art: pa - A_a_GRADIENT, spo2: severinghaus(pa - A_a_GRADIENT) };
}

/** Sea-level reference: (760 − 47) × 0.2095 = 149.4 mmHg PIO2. */
export const SEA_LEVEL = expectedSpo2(760, 760 * 0.2095);

/** Altitude on Earth whose ambient air gives the same PIO2 (standard atmosphere, ICAO). */
export function equivalentAltitudeM(pio2MmHg: number) {
  const pb = pio2MmHg / 0.2095 + WATER_VAPOR_37C;
  return Math.max(0, 44330.8 * (1 - Math.pow(pb / 760, 1 / 5.25588)));
}

/** Volume fraction of a gas: % = pp / Pb × 100 (docs/04 A1). */
export function volumePercent(ppMmHg: number, totalMmHg: number) {
  return (ppMmHg / totalMmHg) * 100;
}

/** Hydrostatic pressure from heart to feet: ΔP = ρ · g · h (mmHg). */
export function hydrostaticMmHg(heightCm: number, gMs2: number) {
  const h = (heightCm / 100) * HEART_TO_FEET_FRACTION;
  return (BLOOD_DENSITY * gMs2 * h) / 133.322;
}

/** Weight: W = m · g (N). */
export function weightN(massKg: number, gMs2: number) {
  return massKg * gMs2;
}

/* ---------------- Communications ---------------- */

export type ContactMode = "real-time" | "store-and-forward" | "no contact";

export interface CommsState {
  oneWaySec: number;
  roundTripSec: number;
  mode: ContactMode;
  detail: string;
  distanceKm: number;
  elongationDeg?: number;
  method: string;
}

/** Mars opposition reference epoch: 2025-01-16 (heliocentric conjunction of Earth and Mars longitudes). */
const MARS_OPPOSITION = Date.UTC(2025, 0, 16, 2, 38);
const EARTH_PERIOD = 365.256;
const MARS_PERIOD = 686.98;
const MARS_A = 1.5237; // AU

/**
 * Earth–Mars distance with circular, coplanar orbits:
 * θ = 2π · t · (1/T_E − 1/T_M);  d = √(1 + a² − 2a·cos θ)  (AU)
 * Sun–Earth–Mars elongation: cos E = (1 + d² − a²) / (2d).
 * Error vs. ephemeris is up to ~±15% because Mars' eccentricity (0.093) is ignored.
 */
export function earthMars(now: number) {
  const days = (now - MARS_OPPOSITION) / 86_400_000;
  const theta = 2 * Math.PI * days * (1 / EARTH_PERIOD - 1 / MARS_PERIOD);
  const dAu = Math.sqrt(1 + MARS_A ** 2 - 2 * MARS_A * Math.cos(theta));
  const elong = (Math.acos(Math.min(1, Math.max(-1, (1 + dAu ** 2 - MARS_A ** 2) / (2 * dAu)))) * 180) / Math.PI;
  return { dAu, elongationDeg: elong };
}

export function commsFor(m: MissionProfile, now: number): CommsState {
  if (m.comms === "iss") {
    const km = 2 * 35_786; // ISS → TDRS (GEO) → White Sands
    return {
      oneWaySec: km / C_KM_S,
      roundTripSec: (2 * km) / C_KM_S,
      mode: "real-time",
      distanceKm: km,
      detail: "TDRS relay via geostationary orbit · continuous medical support from the ground",
      method: "Path ISS → TDRS (35,786 km) → ground station, at the speed of light",
    };
  }
  if (m.comms === "moon") {
    return {
      oneWaySec: MOON_KM / C_KM_S,
      roundTripSec: (2 * MOON_KM) / C_KM_S,
      mode: "real-time",
      distanceKm: MOON_KM,
      detail: "Real-time contact; 30–50 min radio blackouts when out of line of sight (≈40 min on Artemis II)",
      method: "Mean Earth–Moon distance 384,400 km ÷ c",
    };
  }
  const { dAu, elongationDeg } = earthMars(now);
  const km = dAu * AU_KM;
  const one = km / C_KM_S;
  const blackout = elongationDeg < 2;
  return {
    oneWaySec: one,
    roundTripSec: 2 * one,
    mode: blackout ? "no contact" : "store-and-forward",
    distanceKm: km,
    elongationDeg,
    detail: blackout
      ? "Solar conjunction: Sun–Earth–Mars angle below 2°; ~2–3 weeks without direct link"
      : "Earth-independent medical operations (EIMO): urgent decisions stay on board",
    method: "Circular-orbit Earth–Mars distance for today's date ÷ c (±15%)",
  };
}

export function fmtDelay(sec: number) {
  if (sec < 10) return `${sec.toFixed(2)} s`;
  if (sec < 120) return `${sec.toFixed(0)} s`;
  const m = Math.floor(sec / 60);
  const s = Math.round(sec - m * 60);
  return `${m} min ${String(s).padStart(2, "0")} s`;
}

/* ---------------- Radiation ---------------- */

export const CAREER_LIMIT_MSV = 600; // NASA-STD-3001 V1 4030

/** Dose accumulated before the current phase (outbound transit). D = Σ dᵢ (docs/04 A7). */
export function priorDose(m: MissionProfile) {
  return m.transitDays * m.transitDoseRate;
}

/** Whole-mission projection: outbound + phase + return. */
export function projectedMissionDose(m: MissionProfile, phaseRate = m.doseRate) {
  return 2 * m.transitDays * m.transitDoseRate + m.phaseDays * phaseRate;
}

/* ---------------- Bone ---------------- */

/** Hip/spine BMD loss in microgravity: 1–1.5% per month (midpoint 1.25%). */
export const BONE_LOSS_PCT_MONTH: [number, number] = [1.0, 1.5];
export const BMD_TARGET_PCT = 95; // V1 4027: hip and spine ≥ 95% of baseline

export function boneEstimate(m: MissionProfile, day: number) {
  const microgDays = m.gravityMs2 === 0 ? day : m.transitDays;
  const months = microgDays / 30.44;
  const mid = (BONE_LOSS_PCT_MONTH[0] + BONE_LOSS_PCT_MONTH[1]) / 2;
  const loss = months * mid;
  const est = 100 - loss;
  const monthsToTarget = m.gravityMs2 === 0 ? Math.max(0, (100 - BMD_TARGET_PCT - loss) / mid) : null;
  return {
    microgDays,
    lossPct: loss,
    lossRange: [months * BONE_LOSS_PCT_MONTH[0], months * BONE_LOSS_PCT_MONTH[1]] as [number, number],
    estPct: est,
    belowTarget: est < BMD_TARGET_PCT,
    monthsToTarget,
    partialGravityNote:
      m.gravityMs2 === 0
        ? null
        : `No long-duration human data at ${m.gravityLabel.split(" (")[0]}; NASA evidence suggests < 0.4 g may not preserve bone. Surface loss is not quantified.`,
    source: REF.bone,
  };
}

/* ---------------- Life support (ECLSS) ---------------- */

export const ECLSS = {
  o2DemandKgPerCmDay: 0.82, // BVAD nominal metabolic O2
  ogaMaxKgDay: 9.25, // OGA 20.4 lb/day at 100%
  ogaAvgKgDay: 2.62, // cumulative mean 5.78 lb/day to Jun 2024
  waterProvisionLPerCmDay: 2.5, // V2 6109
  waterEvaMlPerH: 240, // V2 6109
  waterRecovery: 0.98, // UPA + BPA + WPA, 2023
  kcalPerCmDay: 3035, // V2 7003 average provision
  co2LimitMmHg: 3, // V2 6004, 1-h average
  co2DemoMarkerMmHg: 2.8, // R-CO2-01 demonstration marker (docs/03 §5)
  pio2Target: [145, 155] as [number, number], // OCHMO-TB-002 normoxia
  pio2Limit1h: 127, // V2 6003, 1-h average
  pio2LimitAbs: 122, // V2 6003, any reading
  pressureEnvelopeKpa: [34.47, 103.42] as [number, number], // > 5 to 15 psia
};

export function eclssBudget(crew: number) {
  const o2 = crew * ECLSS.o2DemandKgPerCmDay;
  const water = crew * ECLSS.waterProvisionLPerCmDay;
  return {
    crew,
    o2DemandKgDay: o2,
    ogaUtilMaxPct: (o2 / ECLSS.ogaMaxKgDay) * 100,
    waterLDay: water,
    makeupWaterLDay: water * (1 - ECLSS.waterRecovery),
    kcalDay: crew * ECLSS.kcalPerCmDay,
  };
}
