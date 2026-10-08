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
/**
 * Stock springs in order (Brandon, 8/10/2026): door height first — 7FT, then
 * 8FT, then 9FT — and the lightest spring to the heaviest within each. The
 * sheet sorts the names as text, which put 80 and 90 after 220.
 */
const doorFeet = (p: Part) => Number(/(\d+)\s*FT\b/.exec(p.sub ?? "")?.[1] ?? Infinity);
// Torsion names lead with the weight ("100LBS,  2 X 218 X 23-1/4\""); extension
// codes end with it ("25-42-100,  TAN").
const springWeight = (p: Part) =>
  Number(/^(\d+)\s*LBS\b/.exec(p.name)?.[1] ?? /^\d+-\d+-(\d+)\b/.exec(p.name)?.[1] ?? Infinity);
export function inSpringOrder(items: Part[]): Part[] {
  // Array.sort is stable: a row the rules cannot read keeps its sheet place.
  return [...items].sort((a, b) => doorFeet(a) - doorFeet(b) || springWeight(a) - springWeight(b));
}

export const EXTENSION_SPRINGS: PartCategory = {
  name: EXTENSION_CATEGORY, items: inSpringOrder(EXTENSION_ALL.items.filter((p) => !isKit(p))),
};
export const STOCK_TORSION_SPRINGS: PartCategory = {
  name: TORSION_CATEGORY, items: inSpringOrder(TORSION_ALL.items.filter((p) => !isKit(p))),
};
export const EXTENSION_KITS_CATEGORY = "EXTENSION KITS";
export const TORSION_KITS_CATEGORY = "TORSION KITS";

/**
 * What the shelf holds: every category but the two spring sheets, plus the
 * kits as two categories of their own, slotted in alphabetically (DRUMS stays
 * first, as the sheet has it). The Parts, Track and Cables tabs split this.
 */
/**
 * Parts the price sheet does not carry yet, added by hand — Brandon, 30/9/2026.
 * They belong in NEW_PARTS_LIST.xlsx: once they are in it and gen_parts.py has
 * been re-run, delete them here, or they will show twice.
 */
/** A hand-added part may be listed before it has a price: see priceNotSet. */
export type ShelfPart = Part & { priceNotSet?: boolean };

export const HAND_ADDED_PARTS: Record<string, ShelfPart[]> = {
  TRACKS: [
    { name: '36" ADDER PIECE', desc: '36" ADDER PIECE', price: 129.95, sub: "ADDER PIECES" },
    { name: '54" ADDER PIECE', desc: '54" ADDER PIECE', price: 149.95, sub: "ADDER PIECES" },
    // Pierced track is sold in pairs; the price is the pair's (30/9/2026).
    { name: '76" PIERCED TRACK', desc: '76" PIERCED TRACK,  PAIR', price: 29.95, sub: "PIERCED TRACK" },
    { name: '88" PIERCED TRACK', desc: '88" PIERCED TRACK,  PAIR', price: 34.95, sub: "PIERCED TRACK" },
    { name: '100" PIERCED TRACK', desc: '100" PIERCED TRACK,  PAIR', price: 39.95, sub: "PIERCED TRACK" },
    { name: '112" PIERCED TRACK', desc: '112" PIERCED TRACK,  PAIR', price: 45.95, sub: "PIERCED TRACK" },
  ],
  // Sleeves, stops and thimbles for cable, bags of 100 (30/9/2026).
  CABLES: [
    { name: '1/8" SLEEVES', desc: '1/8" SLEEVES,  BAG OF 100', price: 19.95, sub: "CABLE HARDWARE" },
    { name: '1/8" STOPS', desc: '1/8" STOPS,  BAG OF 100', price: 19.95, sub: "CABLE HARDWARE" },
    { name: '1/8" THIMBLES', desc: '1/8" THIMBLES,  BAG OF 100', price: 19.95, sub: "CABLE HARDWARE" },
    { name: '5/32" SLEEVES', desc: '5/32" SLEEVES,  BAG OF 100', price: 24.95, sub: "CABLE HARDWARE" },
    { name: '5/32" STOPS', desc: '5/32" STOPS,  BAG OF 100', price: 24.95, sub: "CABLE HARDWARE" },
    { name: '5/32" THIMBLES', desc: '5/32" THIMBLES,  BAG OF 100', price: 24.95, sub: "CABLE HARDWARE" },
    { name: '3/16" SLEEVES', desc: '3/16" SLEEVES,  BAG OF 100', price: 29.95, sub: "CABLE HARDWARE" },
    { name: '3/16" STOPS', desc: '3/16" STOPS,  BAG OF 100', price: 29.95, sub: "CABLE HARDWARE" },
    { name: '3/16" THIMBLES', desc: '3/16" THIMBLES,  BAG OF 100', price: 29.95, sub: "CABLE HARDWARE" },
    // Cable rolls: 250FT only, priced 6/10/2026 — the 500FT rolls were dropped.
    { name: '1/8" CABLE, 250FT ROLL', desc: '1/8" CABLE,  250FT ROLL', price: 99.95, sub: "CABLE ROLLS" },
    { name: '5/32" CABLE, 250FT ROLL', desc: '5/32" CABLE,  250FT ROLL', price: 149.95, sub: "CABLE ROLLS" },
    { name: '3/16" CABLE, 250FT ROLL', desc: '3/16" CABLE,  250FT ROLL', price: 199.95, sub: "CABLE ROLLS" },
  ],
};

/**
 * Prices changed ahead of the price sheet — Brandon, 7/10/2026. Keyed
 * "CATEGORY|NAME". Once NEW_PARTS_LIST.xlsx carries them and gen_parts.py has
 * been re-run, delete them here: springs.test.ts flags any the sheet already
 * matches.
 */
export const HAND_PRICES: Record<string, number> = {
  "STRUTS|10FT STRUT": 22.95,
  "STRUTS|12FT STRUT": 25.95,
  "STRUTS|14FT STRUT": 34.95,
  "TUBE SHAFT|10FT TUBE SHAFT": 24.95,
  "TUBE SHAFT|14FT TUBE SHAFT": 34.95,
};
function withHandPrices(c: PartCategory): PartCategory {
  return {
    ...c,
    items: c.items.map((p) => {
      const price = HAND_PRICES[`${c.name}|${p.name}`];
      return price === undefined ? p : { ...p, price };
    }),
  };
}

/**
 * The Track tab reads residential sets first, then the adders, commercial sets
 * and raw track, each under its own heading (30/9/2026). The sheet lists raw
 * track with no heading, so it gets one here. Sorting is stable: within a
 * heading the sheet's order holds.
 */
const TRACK_ORDER = ["RESIDENTIAL TRACKS", "ADDER PIECES", "PIERCED TRACK", "COMMERCIAL TRACKS", "RAW TRACK"];
function trackCategory(c: PartCategory): PartCategory {
  const items = [...c.items.map((p) => (p.sub ? p : { ...p, sub: "RAW TRACK" })), ...(HAND_ADDED_PARTS.TRACKS ?? [])];
  const rank = (p: Part) => {
    const i = TRACK_ORDER.indexOf(p.sub ?? "");
    return i < 0 ? TRACK_ORDER.length : i;
  };
  return { name: c.name, items: items.sort((a, b) => rank(a) - rank(b)) };
}

export const SHELF_PART_CATEGORIES: PartCategory[] = (() => {
  const shelf = PART_CATEGORIES
    .filter((c) => c.name !== EXTENSION_CATEGORY && c.name !== TORSION_CATEGORY)
    .map(withHandPrices)
    .map((c) => (c.name === "TRACKS" ? trackCategory(c) : { ...c, items: [...c.items, ...(HAND_ADDED_PARTS[c.name] ?? [])] }));
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
