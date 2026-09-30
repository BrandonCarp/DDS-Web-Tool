// Views over the generated parts data — see data/parts.ts.
//
// Extension springs and stock torsion springs used to sit at the bottom of the
// parts shelf. They now have their own homes: extension springs are a tab of
// their own, stock torsion springs sit under the cut-to-size configurator on
// the Torsion Springs tab. Nothing about the DATA moved — parts.ts is still
// generated whole by scripts/gen_parts.py and must not be hand-edited, so the
// split happens here, at read time. Re-running the generator keeps working.
//
// Prices, descriptions and QuickBooks item are unchanged by the move: both
// categories still bill to PARTS through partDescription/partPrice/partQuantity.

import { PART_CATEGORIES, type Part, type PartCategory } from "./parts";

export const EXTENSION_CATEGORY = "EXTENSION SPRINGS";
export const TORSION_CATEGORY = "TORSION SPRINGS";

/** Never `!`-dereference a generated lookup — a renamed category would ship a
 *  runtime crash that tsc and next build both wave through. Empty instead: the
 *  tab renders "nothing here" and springs.test.ts fails loudly in CI. */
function category(name: string): PartCategory {
  return PART_CATEGORIES.find((c) => c.name === name) ?? { name, items: [] };
}

const EXTENSION_ALL = category(EXTENSION_CATEGORY);
const TORSION_ALL = category(TORSION_CATEGORY);

/**
 * Kits are the rows a spring sheet files under no height heading: 7FT and 8FT
 * EXT KIT, 7FT and 8FT TOR KIT. They sell from the Parts tab (Brandon,
 * 30/9/2026), so the spring tabs list springs only.
 */
const isKit = (p: Part) => !p.sub;
export const EXTENSION_SPRINGS: PartCategory = {
  name: EXTENSION_CATEGORY, items: EXTENSION_ALL.items.filter((p) => !isKit(p)),
};
export const STOCK_TORSION_SPRINGS: PartCategory = {
  name: TORSION_CATEGORY, items: TORSION_ALL.items.filter((p) => !isKit(p)),
};
export const EXTENSION_KITS_CATEGORY = "EXTENSION KITS";
export const TORSION_KITS_CATEGORY = "TORSION KITS";

/**
 * What the shelf holds: every category but the two spring sheets, plus the
 * kits as two categories of their own, slotted in alphabetically (DRUMS stays
 * first, as the sheet has it). The Parts, Track and Cables tabs split this.
 */
export const SHELF_PART_CATEGORIES: PartCategory[] = (() => {
  const shelf = PART_CATEGORIES.filter((c) => c.name !== EXTENSION_CATEGORY && c.name !== TORSION_CATEGORY);
  const kits: PartCategory[] = [
    { name: EXTENSION_KITS_CATEGORY, items: EXTENSION_ALL.items.filter(isKit) },
    { name: TORSION_KITS_CATEGORY, items: TORSION_ALL.items.filter(isKit) },
  ];
  for (const kit of kits) {
    const at = shelf.findIndex((c, i) => i > 0 && c.name.localeCompare(kit.name) > 0);
    shelf.splice(at < 0 ? shelf.length : at, 0, kit);
  }
  return shelf;
})();

/**
 * Tracks and cables have their own tabs (Brandon, 29/9/2026), so the Parts tab
 * leaves them out. SHELF_PART_CATEGORIES still holds everything on the shelf —
 * Inventory counts from it — and the three tab lists below split it without
 * losing anything (springs.test.ts checks).
 */
export const TRACK_CATEGORY = "TRACKS";
export const CABLE_CATEGORY = "CABLES";
export const PARTS_TAB_CATEGORIES: PartCategory[] = SHELF_PART_CATEGORIES.filter(
  (c) => c.name !== TRACK_CATEGORY && c.name !== CABLE_CATEGORY,
);
export const TRACK_CATEGORIES: PartCategory[] = SHELF_PART_CATEGORIES.filter((c) => c.name === TRACK_CATEGORY);
export const CABLE_CATEGORIES: PartCategory[] = SHELF_PART_CATEGORIES.filter((c) => c.name === CABLE_CATEGORY);

export interface SpringGroup {
  /** Chip label: "7FT", "8FT", "9FT", or "KITS" for the unfiled rows. */
  label: string;
  items: Part[];
}

export const KITS_GROUP = "KITS";

/** "EXTENSION SPRINGS, 7FT" -> "7FT". The sheet repeats the category name in
 *  every sub-heading; only the tail tells the counter anything. */
function groupLabel(sub: string): string {
  const tail = sub.split(",").pop()?.trim();
  return tail && tail.length > 0 ? tail : sub.trim();
}

/**
 * Split a spring category into door-height groups, kits first.
 *
 * Order follows the sheet rather than an alphabetical sort, so 7FT/8FT/9FT come
 * out in the order the counter thinks in.
 */
export function springGroups(cat: PartCategory): SpringGroup[] {
  const groups: SpringGroup[] = [];
  const byLabel = new Map<string, SpringGroup>();
  for (const item of cat.items) {
    const label = item.sub ? groupLabel(item.sub) : KITS_GROUP;
    let group = byLabel.get(label);
    if (!group) {
      group = { label, items: [] };
      byLabel.set(label, group);
      groups.push(group);
    }
    group.items.push(item);
  }
  // Kits are two rows and belong at the front, wherever the sheet put them.
  // Array.sort is stable, so everything else keeps its sheet order.
  const rank = (g: SpringGroup) => (g.label === KITS_GROUP ? 0 : 1);
  return groups.sort((a, b) => rank(a) - rank(b));
}
