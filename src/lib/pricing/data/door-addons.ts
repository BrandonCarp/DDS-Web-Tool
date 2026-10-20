/**
 * The add-ons a stock door's quote suggests under its vinyl molding (Brandon,
 * 20/10/2026): an operator bracket — ARB or ORB, off the shelf — and struts,
 * so many of them, the strut the door's width. Each goes on the QuickBooks
 * copy as a PARTS line under the door, as the Parts tab would write it.
 */

import { SHELF_PART_CATEGORIES } from "./springs";
import { withPieceCount } from "./part-pricing";
import type { Part } from "./parts";
import { QB_PARTS } from "./quickbooks";

export type OperatorBracket = "none" | "ARB" | "ORB";
export const OPERATOR_BRACKETS: { value: OperatorBracket; label: string }[] = [
  { value: "none", label: "No" }, { value: "ARB", label: "ARB" }, { value: "ORB", label: "ORB" },
];

function shelf(category: string, name: string): Part | null {
  return SHELF_PART_CATEGORIES.find((c) => c.name === category)?.items.find((p) => p.name === name) ?? null;
}

/** The ARB or ORB bracket off the shelf; null for none. */
export function operatorBracketPart(bracket: OperatorBracket): Part | null {
  return bracket === "none" ? null : shelf("ARB", bracket);
}

/**
 * The strut for a door's width: the shortest 2-1/4" strut the shelf carries
 * at or over it (8, 9, 10, 12, 14, 15, 16 and 18FT), and past 18'0" the 3"
 * 20FT or 24FT. Null for a width no strut reaches.
 */
export function strutForWidth(widthFt: number, widthIn = 0): Part | null {
  const w = widthFt + widthIn / 12;
  if (!(w > 0)) return null;
  const struts = SHELF_PART_CATEGORIES.find((c) => c.name === "STRUTS")?.items ?? [];
  const feet = (p: Part) => Number(p.name.match(/^(\d+)FT/)?.[1] ?? 0);
  const plain = struts.filter((p) => !/- 3"$/.test(p.name)).sort((a, b) => feet(a) - feet(b));
  const three = struts.filter((p) => /- 3"$/.test(p.name)).sort((a, b) => feet(a) - feet(b));
  return plain.find((p) => feet(p) >= w) ?? three.find((p) => feet(p) >= w) ?? null;
}

/** A QuickBooks line for an add-on: the part's wording, counted where the line counts its pieces. */
export function addonLine(part: Part, qty: number): { item: string; description: string; qty: number; rate: number } {
  const n = Math.max(1, Math.trunc(qty));
  return { item: QB_PARTS, description: withPieceCount(part.desc, n), qty: n, rate: part.price };
}
