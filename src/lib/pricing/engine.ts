// Residential pricing engine. Pure functions, no I/O — safe to run on the server
// (which is where we want it: the catalog never ships to the browser).
//
// Ported 1:1 from the production single-file tool: resSizeCode + stockPriceFor.

import { RESIDENTIAL_PRICES } from "./data/residential-prices";
import { STOCK_PRICES } from "./data/stock-prices";
import { ADDONS, ULTRAGRAIN, GRADE_RES, COLLECTIONS_RES } from "./data/addons";
import { dataKey, expandModels } from "./model-groups";
import { windowDesigns, designName } from "./data/inserts";
import { RES_SECTIONS } from "./data/res-sections";
import { colorInStock } from "./data/stock-colors";
import type { Dimensions, PriceResult, PriceTriple, Quote, QuoteOptions, SizeCode, Tier, WindowStyle, QuoteLine } from "./types";

/**
 * Upper bound (total inches) of each Clopay height band, in order. 16'0" = 192"
 * is the tallest door either book prices; anything above still returns null and
 * lands on Special Order.
 *
 * History: this function once returned "9" for ANY height, so a 16-ft door
 * quoted silently at the 9-ft price — badly under. It was then capped at 9'0"
 * to stop the misquote. The four tall bands are now loaded for real (generated
 * by scripts/gen_tall_tiers.py), so the cap moves up to the book's own ceiling.
 */
const TIER_MAX_IN: ReadonlyArray<readonly [number, Tier]> = [
  [84, "7"], //  6'0" to 7'0"
  [96, "8"], //  7'6" to 8'0"
  [108, "9"], //  8'3" to 9'0"
  [120, "10"], //  9'3" to 10'0"
  [144, "12"], // 10'3" to 12'0"
  [168, "14"], // 12'3" to 14'0"
  [192, "16"], // 14'3" to 16'0"
];

/** Height (in total inches) -> door height tier, or null above 16'0". */
export function tierForHeight(totalInches: number): Tier | null {
  for (const [maxIn, tier] of TIER_MAX_IN) {
    if (totalInches <= maxIn) return tier;
  }
  return null;
}

/**
 * Resolve typed width/height to a model's grid key.
 * Exact even-foot -> "{ft}"; the X'6"/X'8" half-foot group -> "{ft}.6";
 * otherwise the nominal foot band. Returns null if width/height is missing.
 */
export function resolveSizeCode(model: string, dim: Dimensions): SizeCode | null {
  const wf = Number.isFinite(dim.widthFt) ? Math.trunc(dim.widthFt) : NaN;
  const wi = Number.isFinite(dim.widthIn) ? Math.trunc(dim.widthIn) : 0;
  const hf = Number.isFinite(dim.heightFt) ? Math.trunc(dim.heightFt) : NaN;
  const hi = Number.isFinite(dim.heightIn) ? Math.trunc(dim.heightIn) : 0;
  if (Number.isNaN(wf) || Number.isNaN(hf)) return null;

  const tier = tierForHeight(hf * 12 + hi);
  if (tier === null) return null; // taller than the book — Special Order
  const grid = RESIDENTIAL_PRICES[dataKey(model)] ?? {};
  const widthsForTier = Object.keys(grid)
    .filter((k) => k.endsWith("x" + tier))
    .map((k) => k.split("x")[0]);

  const candidates: string[] = [];
  if (wi === 0) candidates.push(String(wf));
  else candidates.push(`${wf}.${wi}`);
  if (wi === 6 || wi === 8) candidates.push(`${wf}.6`);
  candidates.push(String(wf));

  let widthCode: string | null = null;
  for (const c of candidates) {
    if (widthsForTier.includes(c)) {
      widthCode = c;
      break;
    }
  }
  if (widthCode === null) widthCode = wi === 0 ? String(wf) : `${wf}.${wi}`;

  return { code: `${widthCode}x${tier}`, widthCode, tier, wf, wi, hf, hi };
}

/**
 * Exact stock-size override. Stock doors are exact even-foot widths (plus 7'6")
 * at 7' or 8' tall. Everything else (in-between odd widths, 9' tall, non-stock
 * widths) returns null so the caller falls back to the standard/odd price.
 */
export function stockPriceFor(model: string, size: SizeCode): PriceTriple | null {
  const modelStock = STOCK_PRICES[dataKey(model)];
  if (!modelStock) return null;
  // Tiers 7/8 come from the stock-item book; tier 9 from the strict 9-ft price
  // book. A size simply missing from STOCK_PRICES falls through to the
  // standard/odd grid, so no tier gate is needed.

  let widthKey: string | null = null;
  if (size.wi === 0) widthKey = String(size.wf);
  else if (size.wf === 7 && size.wi === 6) widthKey = "7.6";
  if (widthKey === null) return null;

  return modelStock[widthKey]?.[size.tier] ?? null;
}

/** Price a residential base door (stock price when the exact size is stock, else standard). */
export function priceResidential(
  model: string,
  dim: Dimensions,
  style: WindowStyle,
): PriceResult {
  const size = resolveSizeCode(model, dim);
  if (!size) {
    return { model, style, size: null, price: null, priced: false, isStock: false, source: "none", triple: null };
  }
  const standard = RESIDENTIAL_PRICES[dataKey(model)]?.[size.code] ?? null;
  const stock = stockPriceFor(model, size);
  const triple = stock ?? standard;
  if (!triple) {
    return { model, style, size, price: null, priced: false, isStock: false, source: "none", triple: null };
  }
  return {
    model,
    style,
    size,
    price: triple[style],
    priced: true,
    isStock: stock !== null,
    source: stock ? "stock" : "standard",
    triple,
  };
}

/** Models that have a residential price grid. */
export function listModels(): string[] {
  return expandModels(Object.keys(RESIDENTIAL_PRICES));
}

const STYLE_NAME: Record<WindowStyle, string> = {
  solid: "Solid",
  glass: "Glass",
  inserts: "Glass + inserts",
};
const TRACK_NAME: Record<string, string> = {
  r10: "10″ radius track",
  r12: "12″ radius track",
  r15: "15″ radius track",
  low_headroom: "Low headroom track",
  r20: "20″ radius track",
  r32: "32″ radius track",
  no_tracks: "No tracks",
};
const LOCK_NAME: Record<string, string> = {
  slide: "Inside slide lock",
  lockbar: "Lockbar",
  lockbar_installed: "Lockbar installed",
};
const LOCK_VALUE: Record<string, number> = {
  slide: ADDONS.slidelock,
  lockbar: ADDONS.lockbar_assembly,
  lockbar_installed: ADDONS.lockbar_installed,
};
const dims = (s: SizeCode) => `${s.wf}'${s.wi}" x ${s.hf}'${s.hi}"`;

/**
 * Full residential quote for a COMPLETE DOOR — base door plus the same line-item
 * upcharges index.html applies (Ultra Grain, track, torsion, lock). unitPrice is the
 * sum of the lines; the quote total is unitPrice × quantity (done in the UI).
 * Ported 1:1 from buildResQuote's complete-door path.
 */
export function quoteResidential(model: string, dim: Dimensions, opts: QuoteOptions): Quote {
  const empty: Quote = {
    model, size: null, priced: false, isStock: false, source: "none",
    lines: [], unitPrice: 0, description: "",
  };
  const size = resolveSizeCode(model, dim);
  if (!size) return empty;
  const standard = RESIDENTIAL_PRICES[dataKey(model)]?.[size.code] ?? null;
  const stock = stockPriceFor(model, size);
  const triple = stock ?? standard;
  if (!triple) return { ...empty, size };

  const lines = [];
  lines.push({ name: `Base door (${STYLE_NAME[opts.style]})`, value: triple[opts.style] });

  // Ultra Grain color upcharge (single < 12', double >= 12')
  const ug = ULTRAGRAIN[dataKey(model)];
  if (ug && opts.color === "Ultra Grain") {
    const isDouble = size.wf >= 12;
    lines.push({
      name: `Ultra Grain (${isDouble ? "double" : "single"})`,
      value: isDouble ? ug.double : ug.single,
      kind: "add" as const,
    });
  }

  // Track adjustment (r10 / r12 / r15 are the no-charge defaults)
  if (opts.track && opts.track !== "r12" && opts.track !== "r15" && opts.track !== "r10") {
    const adj = (ADDONS.track as Record<string, number>)[opts.track] ?? 0;
    lines.push({
      name: TRACK_NAME[opts.track] ?? opts.track,
      value: adj,
      kind: (adj < 0 ? "minus" : "add") as "add" | "minus",
    });
  }

  // Springs. Extension springs are only offered up to 8' high — the book prints
  // Extension columns for the 6'0"-7' and 7'6"-8' bands and nothing above. Every
  // taller band is torsion, included at no charge. This used to test tier === "9"
  // only, which was correct while 9'0" was the ceiling; once the 10/12/14/16
  // bands were loaded a 12-foot door could be quoted on extension springs and
  // charged the torsion adder on top.
  const torsionOnly = size.tier !== "7" && size.tier !== "8";
  if (torsionOnly) lines.push({ name: "Torsion springs (included)", value: 0 });
  else if (opts.spring === "torsion")
    lines.push({ name: "Torsion springs", value: ADDONS.torsion, kind: "add" as const });

  // Lock
  if (opts.lock && opts.lock !== "none")
    lines.push({ name: LOCK_NAME[opts.lock], value: LOCK_VALUE[opts.lock], kind: "add" as const });

  const unitPrice = lines.reduce((sum, l) => sum + (l.value || 0), 0);

  // Door description (matches index.html wording)
  const grade = GRADE_RES[dataKey(model)] || "";
  let winTxt = "solid, no windows";
  if (opts.style !== "solid") {
    const validDesigns = windowDesigns(model, opts.style, size.widthCode).map((d) => d.id);
    const dn = opts.windesign && validDesigns.includes(opts.windesign) ? designName(opts.windesign) : null;
    winTxt = `${grade ? grade + " windows" : "windows"} in the top section${dn ? ", " + dn + " inserts" : ""}`;
  }
  const springTxt = torsionOnly || opts.spring === "torsion" ? "torsion springs" : "extension springs";
  const lockTxt =
    ({ none: "no lock", slide: "inside slide lock", lockbar: "lockbar", lockbar_installed: "lockbar installed" } as Record<string, string>)[opts.lock] ||
    "no lock";
  const trackTxt = (TRACK_NAME[opts.track] || "12″ radius track").toLowerCase();
  const coll = COLLECTIONS_RES[dataKey(model)] === "Gallery Collection" ? COLLECTIONS_RES[dataKey(model)] : "";
  // A door is only IN STOCK if the size resolves from the stock tables AND the
  // chosen color is one DDS actually stocks (COLORS IN STOCK, per model — most
  // series are White-only). A stock-size door in a non-stocked color still
  // PRICES from the stock sheet (source stays "stock"), but reads as a special
  // order in the badge and description.
  const inStock = stock !== null && colorInStock(model, opts.color, size.wf);
  // The stock/special status is NOT in the description — it is shown in the
  // stock badge on screen. The description is copied verbatim into QuickBooks,
  // where the status is a DDS-internal fact, not part of the product line.
  const description = `Clopay ${coll ? coll + ", " : ""}Model ${model}, ${dims(size)}, in the color ${opts.color}, ${winTxt}, ${trackTxt}, ${springTxt}, ${lockTxt}`;

  return {
    model, size, priced: true, isStock: inStock,
    source: stock ? "stock" : "standard",
    lines, unitPrice, description,
  };
}

/* ================= Residential replacement sections ================= */
// Priced from the SECTIONS blocks in the 2026 V2 workbook (sell prices, per
// section, 18"/21" heights share one price). Stock widths only — the UI offers
// a dropdown, never a typed width.

export interface ResSectionInput {
  widthKey: string;          // e.g. "8", "16", "7.6" — a RES_SECTION_WIDTHS key
  height: "18" | "21";       // label only; both heights share one price
  kind: "bt" | "int";
  glazed?: boolean;          // intermediate sections only
  lockbar?: boolean;         // lockbar INSTALLED — solid intermediate sections only
  color?: string;
}

export function quoteResidentialSection(model: string, input: ResSectionInput): Quote {
  const empty: Quote = {
    model, size: null, priced: false, isStock: false, source: "none",
    lines: [], unitPrice: 0, description: "",
  };
  const table = RES_SECTIONS[dataKey(model)];
  if (!table) return empty;
  // Stocked 7'6" doors take their sections at the 8'0" price (Brandon, 7/9/2026) —
  // this deliberately bypasses the sheet's own higher 7'6" rows.
  const priceKey = input.widthKey === "7.6" ? "8" : input.widthKey;
  const row = table[priceKey];
  if (!row) return empty;
  const glazed = input.kind === "int" && !!input.glazed;
  const base = input.kind === "bt" ? row.bottom : glazed ? row.glazed : row.inter;
  const [wft, win] = input.widthKey.split(".");
  const widthTxt = `${wft}'${win ?? 0}"`;
  const kindNm = input.kind === "bt" ? "Bottom" : "Intermediate";
  const lines: QuoteLine[] = [
    { name: `${kindNm} section${input.kind === "int" ? (glazed ? " (glazed)" : " (solid)") : ""} · ${input.height}″ · ${widthTxt}`, value: base },
  ];
  const lockbar = input.kind === "int" && !glazed && !!input.lockbar;
  if (lockbar) lines.push({ name: "Lockbar installed", value: ADDONS.lockbar_installed, kind: "add" });
  const unitPrice = lines.reduce((a, l) => a + (l.kind === "minus" ? -l.value : l.value), 0);
  const secStock = colorInStock(model, input.color || "White");
  const desc =
    `Clopay Model ${model}, ${kindNm.toLowerCase()} replacement section` +
    (input.kind === "int" ? (glazed ? " with glass" : ", solid") : "") +
    `, ${input.height}" high, ${widthTxt} wide, in the color ${input.color || "White"}` +
    (lockbar ? ", lockbar installed" : "") +
    ` — sections only`;
  return { model, size: null, priced: true, isStock: secStock, source: "standard", lines, unitPrice, description: desc };
}
