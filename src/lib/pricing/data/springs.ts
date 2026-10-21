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
import { COMMERCIAL_TRACK_PARTS, COMMERCIAL_TRACK_SUB } from "./commercial-track";
import { torsionPrice } from "./torsion";

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
/**
 * A torsion spring line separates its fields with a comma and TWO spaces
 * (torsion.ts, FIELD_SEP), so a stock spring and a cut-to-size one line up on
 * the same estimate. The sheet's 160, 170 and 180LBS 7FT rows have one space
 * before the length; every stock line gets the two (Brandon, 16/10/2026).
 */
export function springFieldSpacing(desc: string): string {
  return desc.replace(/,\s*/g, ",  ");
}
/**
 * A stock torsion spring sells at what the cut-to-size configurator charges
 * for the same spring (Brandon, 21/10/2026): its inside diameter, wire and
 * length read off its own line — "TORSION SPRINGS,  2" ID,  218 WIRE,
 * 23-1/4" LONG" — and priced as torsionPrice prices a cut one, a fraction of
 * an inch as the next whole inch, up to .95. A line the rule cannot read, or
 * a spring the cut-to-size table does not price, keeps the sheet's price.
 */
export function stockSpringAsCut(p: Part): Part {
  const m = /^TORSION SPRINGS,\s*([\d\-/]+)" ID,\s*(\d+) WIRE,\s*(\d+)(?:-(\d)\/(\d))?" LONG/i.exec(p.desc);
  if (!m) return p;
  const id = { "2": "2", "2-5/8": "2.625", "3-3/4": "3.75", "6": "6" }[m[1]];
  const length = Number(m[3]) + (m[4] ? Number(m[4]) / Number(m[5]) : 0);
  const price = id ? torsionPrice(`0.${m[2]}`, id, length) : null;
  return price == null ? p : { ...p, price };
}

export const STOCK_TORSION_SPRINGS: PartCategory = {
  name: TORSION_CATEGORY,
  items: inSpringOrder(TORSION_ALL.items.filter((p) => !isKit(p))).map((p) => stockSpringAsCut({ ...p, desc: springFieldSpacing(p.desc) })),
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
/**
 * A hand-added part may be listed before it has a price: see priceNotSet.
 * priceNote is what the counter sees in the price's place — "CONTACT CJ FOR
 * PRICING" (16/10/2026) — in place of the plain "Price not set".
 */
export type ShelfPart = Part & { priceNotSet?: boolean; priceNote?: string };

export const HAND_ADDED_PARTS: Record<string, ShelfPart[]> = {
  TRACKS: [
    { name: '36" ADDER PIECE', desc: '36" ADDER PIECE', price: 129.95, sub: "ADDER PIECES" },
    { name: '54" ADDER PIECE', desc: '54" ADDER PIECE', price: 149.95, sub: "ADDER PIECES" },
    // Pierced track is sold in pairs; the price is the pair's (30/9/2026), and
    // the button says so (16/10/2026).
    { name: '76" PIERCED TRACK (PAIR)', desc: '76" PIERCED TRACK,  PAIR', price: 29.95, sub: "PIERCED TRACK" },
    { name: '88" PIERCED TRACK (PAIR)', desc: '88" PIERCED TRACK,  PAIR', price: 34.95, sub: "PIERCED TRACK" },
    { name: '100" PIERCED TRACK (PAIR)', desc: '100" PIERCED TRACK,  PAIR', price: 39.95, sub: "PIERCED TRACK" },
    { name: '112" PIERCED TRACK (PAIR)', desc: '112" PIERCED TRACK,  PAIR', price: 45.95, sub: "PIERCED TRACK" },
  ],
  // Retainers CJ prices on request (Brandon, 16/10/2026): listed so the counter
  // sees them, with no price to paste until CJ gives one.
  RETAINERS: [
    { name: '2" ALUMINUM L RETAINERS', desc: '2" ALUMINUM L RETAINERS', price: 0, priceNotSet: true, priceNote: "CONTACT CJ FOR PRICING" },
    { name: '2" PLASTIC FLAT RETAINER', desc: '2" PLASTIC FLAT RETAINER', price: 0, priceNotSet: true, priceNote: "CONTACT CJ FOR PRICING" },
    { name: '1-3/8" PLASTIC FLAT RETAINER', desc: '1-3/8" PLASTIC FLAT RETAINER', price: 0, priceNotSet: true, priceNote: "CONTACT CJ FOR PRICING" },
  ],
  // Spreader bars, with the collars and couplings (Brandon, 16/10/2026).
  "COLLAR / COUPLING": [
    { name: '1" TO 1" SPREADER BAR', desc: '1" TO 1" SPREADER BAR', price: 74.95 },
    { name: '1-1/4" TO 1-1/4" SPREADER BAR', desc: '1-1/4" TO 1-1/4" SPREADER BAR', price: 84.95 },
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
  // Tek screws for retainers, bag of 100 — Brandon, 12/10/2026; sold from the
  // Parts tab with the other tek screws.
  FASTENERS: [
    { name: "RETAINER TEK", desc: "RETAINER TEK,  BAG OF 100", price: 10.95 },
  ],
};

/**
 * Prices changed ahead of the price sheet — Brandon, 7/10/2026. Keyed
 * "CATEGORY|NAME". Once NEW_PARTS_LIST.xlsx carries them and gen_parts.py has
 * been re-run, delete them here: springs.test.ts flags any the sheet already
 * matches.
 */
export const HAND_PRICES: Record<string, number> = {
  // 10FT and 12FT struts moved again 13/10/2026 (were 22.95 and 25.95).
  "STRUTS|10FT STRUT": 24.95,
  "STRUTS|12FT STRUT": 29.95,
  "STRUTS|14FT STRUT": 34.95,
  "TUBE SHAFT|10FT TUBE SHAFT": 24.95,
  "TUBE SHAFT|14FT TUBE SHAFT": 34.95,
  // Lock bar assembly 49.95 — Brandon, 9/10/2026 (the same figure the door
  // add-on in addons.ts moved to the same day).
  "LOCKS|LOCK BAR ASSEMBLY": 49.95,
};
/**
 * Parts the sheet lists each but DDS sells by the foot — the solid shafts
 * (Brandon, 13/10/2026): cut to the inch, billed as the 12'6" or the 24FT
 * stick (part-pricing.ts). Keyed "CATEGORY|NAME", as HAND_PRICES is.
 */
export const HAND_PER_FOOT = new Set<string>(['TUBE SHAFT|1" SOLID SHAFT', 'TUBE SHAFT|1-1/4" SOLID SHAFT']);
/**
 * Tube shafts are cut 9" over the nominal length, and the line says so
 * (Brandon, 13/10/2026), and that they are galvanized (14/10/2026): the
 * sheet's "10FT TUBE SHAFT" pastes as 10'9" GALVANIZED TUBE SHAFT. The name
 * the counter picks stays the sheet's.
 */
export function tubeShaftDesc(desc: string): string {
  return desc.replace(/^(\d+)FT TUBE SHAFT/, "$1'9\" GALVANIZED TUBE SHAFT");
}
/** Drums are sold as a pair, and the line says so (Brandon, 14/10/2026): "400-8 DRUMS,  PAIR". */
export function drumDesc(desc: string): string {
  return /\bPAIR\b/i.test(desc) ? desc : `${desc.replace(/,\s*$/, "")},  PAIR`;
}
/**
 * Struts say what they are and count the piece (Brandon, 16/10/2026): the
 * sheet's "12FT STRUT" pastes as 2-1/4" GALVANIZED STRUT, [1] - 12FT, and
 * its 3" struts as 3" GALVANIZED STRUT, [1] - 16FT. The names stay the sheet's.
 */
export function strutDesc(desc: string): string {
  const three = desc.match(/^3",\s*(\d+)FT STRUT$/);
  if (three) return `3" GALVANIZED STRUT, [1] - ${three[1]}FT`;
  const plain = desc.match(/^(\d+)FT STRUT$/);
  if (plain) return `2-1/4" GALVANIZED STRUT, [1] - ${plain[1]}FT`;
  return desc;
}
/**
 * Lines reworded by hand (Brandon, 14 and 16/10/2026), keyed "CATEGORY|NAME"
 * like HAND_PRICES: the U retainers and the 1-3/8" and 2" L retainers say
 * what they are, the 1-3/4" L retainer keeps the sheet's words without its
 * doubled spaces, and part-pricing.ts writes each one's stick as "[1] - 8FT".
 * The names the counter picks stay the sheet's.
 */
export const HAND_DESCS: Record<string, string> = {
  'RETAINERS|2" U RETAINER': '2" PLASTIC U RETAINER WITH RUBBER',
  'RETAINERS|1-3/8" U RETAINER': '1-3/8" PLASTIC U RETAINER WITH RUBBER',
  'RETAINERS|2" L RETAINER': '2" PLASTIC L RETAINER',
  'RETAINERS|1-3/8" L RETAINER': '1-3/8" PLASTIC L RETAINER',
  'RETAINERS|1-3/4" L RETAINER': '1-3/4" L RETAINER',
};
function withHandPrices(c: PartCategory): PartCategory {
  return {
    ...c,
    items: c.items.map((p) => {
      const key = `${c.name}|${p.name}`;
      const price = HAND_PRICES[key];
      let out = price === undefined ? p : { ...p, price };
      if (HAND_PER_FOOT.has(key)) out = { ...out, perFoot: true };
      if (HAND_DESCS[key]) out = { ...out, desc: HAND_DESCS[key] };
      if (c.name === "TUBE SHAFT") out = { ...out, desc: tubeShaftDesc(out.desc) };
      if (c.name === "DRUMS") out = { ...out, desc: drumDesc(out.desc) };
      if (c.name === "STRUTS") out = { ...out, desc: strutDesc(out.desc) };
      return out;
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
  // The commercial sets come from the track sheet of 12/10/2026
  // (commercial-track.ts), not NEW_PARTS_LIST's older, shorter list.
  const sheet = c.items.filter((p) => p.sub !== COMMERCIAL_TRACK_SUB);
  const items = [...sheet.map((p) => (p.sub ? p : { ...p, sub: "RAW TRACK" })), ...(HAND_ADDED_PARTS.TRACKS ?? []), ...COMMERCIAL_TRACK_PARTS];
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
