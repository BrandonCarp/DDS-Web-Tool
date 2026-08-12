/**
 * Cut-to-length torsion cables.
 *
 * Cables are made up and sold in PAIRS — a door has one down each side — so the
 * price quoted is always for two, and the description says so.
 *
 * Length is charged by the foot, rounded UP once the leftover reaches 5 inches
 * and dropped below that. The description keeps the size as measured, because
 * that is what gets cut and what the customer asked for; only the charge moves
 * to a whole foot.
 *
 *   10'6" of 1/8"  ->  11 billable feet x $1.00 x 2 cables  =  $22.00
 */

export interface CableGauge {
  /** As it reads on the tag and in the description. */
  label: string;
  /** Net price per foot, per cable. */
  perFoot: number;
}

export const CABLE_GAUGES: CableGauge[] = [
  { label: '1/8"', perFoot: 1.0 },
  { label: '5/32"', perFoot: 1.25 },
  { label: '3/16"', perFoot: 1.5 },
];

/** Inches of leftover at which the foot is charged rather than dropped. */
const ROUND_UP_AT_IN = 5;

export interface CableQuote {
  gauge: string;
  feet: number;
  inches: number;
  /** Whole feet actually charged, after the 5-inch rule. */
  billableFeet: number;
  perFoot: number;
  /** Price for the pair. */
  total: number;
  description: string;
}

/** Whole feet charged for a measured length. */
export function billableFeet(feet: number, inches: number): number {
  const ft = Math.max(0, Math.trunc(feet) || 0);
  const inch = Math.max(0, Math.trunc(inches) || 0);
  return inch >= ROUND_UP_AT_IN ? ft + 1 : ft;
}

/**
 * Price and describe a pair of cut cables, or null if the length is not usable.
 */
export function cableQuote(gaugeLabel: string, feet: number, inches: number): CableQuote | null {
  const gauge = CABLE_GAUGES.find((g) => g.label === gaugeLabel);
  if (!gauge) return null;

  const ft = Math.max(0, Math.trunc(feet) || 0);
  const inch = Math.max(0, Math.trunc(inches) || 0);
  if (inch > 11) return null;
  if (ft <= 0 && inch <= 0) return null;

  const billed = billableFeet(ft, inch);
  if (billed <= 0) return null;

  // Two cables to a door, so the pair is twice the run.
  const total = Math.round(gauge.perFoot * billed * 2 * 100) / 100;
  const size = `${ft}'${inch}"`;

  return {
    gauge: gauge.label,
    feet: ft,
    inches: inch,
    billableFeet: billed,
    perFoot: gauge.perFoot,
    total,
    description: `${gauge.label} TORSION CABLES,  ${size} LONG,  PAIR`,
  };
}
