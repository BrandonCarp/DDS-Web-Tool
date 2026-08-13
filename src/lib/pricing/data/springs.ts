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

export const EXTENSION_SPRINGS: PartCategory = category(EXTENSION_CATEGORY);
export const STOCK_TORSION_SPRINGS: PartCategory = category(TORSION_CATEGORY);

/** What the Parts tab browses and searches — the shelf, springs excluded. */
export const SHELF_PART_CATEGORIES: PartCategory[] = PART_CATEGORIES.filter(
  (c) => c.name !== EXTENSION_CATEGORY && c.name !== TORSION_CATEGORY,
);

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
