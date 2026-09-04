// Ported 1:1 from the production single-file tool: buildCommQuote() +
// commStockCheck() + the complete-door description builder. Server-side only.

import { collapseUpcharges } from "./types";
import { COMM_MATRIX, COMM_SECTIONS, COMM_SECTION_STOCK, COMM_SLAB, STOCK_COMM, GRADE_COMM } from "./data/commercial";
import { COMM_COMPLETE, maxWindows, roundedFeet, SECTION_MAX_WIDTH_IN, maxWidthLabel, sectionColors } from "./data/commercial-meta";

export interface CommQuoteLine { name: string; value: number; kind: "base" | "add" | "minus" }
export interface CommQuote {
  priced: boolean;
  incomplete?: string;
  warn?: string;
  lines: CommQuoteLine[];
  unitPrice: number;
  sub: string;
  description?: string;
  stock?: { inStock: boolean };
}

export interface CommCompleteInput {
  order: "complete";
  mfr: string; model: string;
  size: string;                       // matrix size label, e.g. "8′2″ × 8′0″"
  glass: "solid" | "glass";
  track: "15R" | "FV" | "LHR";
  mount: "continuous" | "reverse";
  cspring: "torsion" | "extension";
  clock: "none" | "slide";
  color?: string;
  /** Which section the windows sit in, 1-based. Defaults to the third. */
  winSection?: number;
}
export interface CommSectionInput {
  order: "section";
  mfr: string; model: string;
  manFt?: number; manIn?: number;     // customer's width — any size
  secKind: "bt" | "int";
  secHeight: "21" | "24";
  windows?: number;                   // intermediate sections only
  retainer?: boolean;                 // DEPRECATED — ignored; retainer is always included on bottom sections
  stile?: "none" | "single" | "double"; // per-foot only
  color?: "White" | "Brown";          // DESCRIPTION ONLY — individual sections come in white or brown
                                      // at the same price. No colour data exists in the source books;
                                      // if brown ever carries an upcharge it must come from a parsed
                                      // sheet, not a hand-typed constant.
}
export type CommInput = CommCompleteInput | CommSectionInput;

// size labels are like 8′2″ × 8′0″ ; width token = "8.2"
function commWidthToken(label: string): string {
  const m = String(label).match(/(\d+)′(\d+)″/);
  return m ? `${m[1]}.${m[2]}` : "";
}
/**
 * Ribbed-steel wording, by model.
 *
 * These six read differently from the rest of the commercial range: the
 * material leads the description rather than a grade word, and the insulated
 * variants call out the backer. Anything not listed here keeps the generic
 * wording it always had.
 *
 * V and S differ only by the colour they are usually sold in, not by
 * construction, so they share a phrase — colour stays a separate choice and is
 * never assumed from the model.
 */
const RIBBED: Record<string, { material: string; backer: boolean }> = {
  "524": { material: "hollow steel ribbed", backer: false },
  "2415": { material: "hollow steel ribbed", backer: false },
  "524V": { material: "steel ribbed", backer: true },
  "2415V": { material: "steel ribbed", backer: true },
  "524S": { material: "steel ribbed", backer: true },
  "2415S": { material: "steel ribbed", backer: true },
};

/** Window counts read as words on these lines: "two 24x12 windows". */
const COUNT_WORDS = ["", "one", "two", "three", "four", "five", "six", "seven", "eight"];
function countWord(n: number): string {
  return COUNT_WORDS[n] ?? String(n);
}

export function commStockCheck(model: string, sizeLabel: string): { inStock: boolean } {
  const wtok = commWidthToken(sizeLabel);
  const hit = STOCK_COMM.find((s) => s.model === String(model) && s.widths.includes(wtok));
  return { inStock: !!hit };
}

/** 3 -> "third". Commercial doors top out well under ten sections. */
const ORDINALS = [
  "first", "second", "third", "fourth", "fifth",
  "sixth", "seventh", "eighth", "ninth", "tenth",
];
function ordinal(n?: number): string {
  const i = Math.trunc(n ?? 3);
  return ORDINALS[i - 1] ?? `${i}th`;
}

export function quoteCommercial(input: CommInput): CommQuote {
  const base: CommQuote = { priced: false, lines: [], unitPrice: 0, sub: "" };
  const model = input.model;

  // 1) Complete door — Clopay matrix (3200 / 524)
  if (input.order === "complete") {
    const cat = COMM_MATRIX[model];
    if (!cat) return { ...base, incomplete: "No complete-door pricing for this model" };
    if (!input.size) return { ...base, incomplete: "Select a size" };
    const row = cat.sizes[input.size];
    if (!row) return { ...base, incomplete: "Select a size" };
    const key = input.glass + input.track;
    const val = row[key];
    const ref = row[input.glass + "15R"];
    if (val == null) return { ...base, incomplete: "Option not offered for this size" };
    const warn =
      ref != null && val < ref * 0.6
        ? "This price looks wrong in the source sheet — verify with Clopay before quoting."
        : undefined;
    const glassNm = input.glass === "solid" ? "Solid" : "Glass";
    const trackNm = { "15R": "15R standard", FV: "Full view", LHR: "Low headroom" }[input.track];
    // The matrix size label carries typographic marks (8′2″ × 8′0″). QuickBooks
    // gets plain ASCII, same as the torsion descriptions.
    const dimTxt = String(input.size)
      .replace(/\u2032/g, "'")
      .replace(/\u2033/g, '"')
      .replace(/\s*[x\u00d7]\s*/i, " x ");
    const cgrade = GRADE_COMM[model] || "insulated";

    // Windows are called out by the section they sit in — "in the third
    // section" — because that is what the installer needs off the line. Plain
    // ASCII inch marks throughout: this string is pasted into QuickBooks.
    const ribbed = RIBBED[model];
    const winTxt =
      input.glass === "glass"
        ? `${model === "3200" ? "insulated 24x12" : cgrade} windows in the ${ordinal(input.winSection)} section`
        : "solid, no windows";
    const colorTxt = `in the color ${(input.color || "White").toLowerCase()}`;
    // Ribbed models lead with the material and drop the grade wording; the
    // model prefix and the track/spring/lock tail are unchanged.
    const bodyTxt = ribbed
      ? [ribbed.material, ribbed.backer ? "insulated steel backer" : null,
         input.glass === "glass" ? winTxt : null].filter(Boolean).join(", ")
      : `${colorTxt}, ${winTxt}`;
    const mountTxt = input.mount === "reverse" ? '2" angle mount track to steel' : '2" angle mount track to wood';
    // FV is FULL VERTICAL LIFT. It read "full view" here, which is a different
    // product entirely — a full-view door is aluminium and glass. The dropdown
    // has always said "Full vertical" and the parts catalogue says "FULL
    // VERTICAL LIFT", so the description was the only place it was wrong.
    const radiusTxt = { "15R": '15" radius track', FV: "full vertical lift track", LHR: "low headroom track" }[input.track];
    const cspringTxt = input.cspring === "extension" ? "extension springs" : "torsion springs";
    const clockTxt = input.clock === "slide" ? "inside slide lock" : "no lock";
    return {
      priced: true,
      warn,
      lines: [{ name: `${glassNm}, ${trackNm}`, value: val, kind: "base" }],
      unitPrice: val,
      sub: `${input.size} · ${glassNm} · ${trackNm}`,
      stock: commStockCheck(model, input.size),
      description: RIBBED[model]
        ? `${input.mfr || "Clopay"} Model ${model}, ${dimTxt}, ${bodyTxt}, ${colorTxt}, ${mountTxt}, ${radiusTxt}, ${cspringTxt}, ${clockTxt}`
        : `${input.mfr || "Clopay"} Model ${model}, ${dimTxt}, ${colorTxt}, ${winTxt}, ${mountTxt}, ${radiusTxt}, ${cspringTxt}, ${clockTxt}`,
    };
  }

  // 2) Replacement section — the customer's width can be ANY size (per the
  //    slab pricing sheet). Models with a per-foot rate price rate × feet
  //    (5″+ rounds up); Clopay panel models without a rate price from the
  //    stock-cost table at the next standard width UP, at the section margin.
  const hasCost = !!COMM_SECTIONS.cost[model];
  const hasRate = COMM_SLAB.rate[model] != null;
  const stockSec = COMM_SECTION_STOCK.price[model];

  const ft = Math.trunc(Number(input.manFt));
  const inch = Math.trunc(Number(input.manIn)) || 0;
  if (!Number.isFinite(ft) || ft <= 0) return { ...base, incomplete: "Enter the door width" };
  // Inches are inches: 0-11. An 8′20″ section used to price happily.
  if (inch < 0 || inch > 11) return { ...base, incomplete: "Inches must be 0-11" };
  // T125 and T200 are white only; picking Brown there is an ordering error.
  const allowed = sectionColors(model);
  const wantColor = input.color === "Brown" ? "Brown" : "White";
  if (!allowed.includes(wantColor)) {
    return { ...base, incomplete: `${model} sections are ${allowed.join(" / ")} only` };
  }
  const maxIn = SECTION_MAX_WIDTH_IN[model];
  if (maxIn != null && ft * 12 + inch > maxIn) {
    return { ...base, incomplete: `${model} sections go up to ${maxWidthLabel(maxIn)}` };
  }
  const widthLabel = `${ft}′${inch ? inch + "″" : ""}`;
  const rFeet = roundedFeet(ft, inch);
  const kindNm = input.secKind === "bt" ? "Bottom" : "Intermediate";
  const sub = `${widthLabel} · ${kindNm} · ${input.secHeight}″`;
  const lines: CommQuoteLine[] = [];

  if (stockSec) {
    // Stocked sizes only — exact match, no rounding up to the next width. An
    // unstocked size is a special order and must be quoted on that screen.
    const key = `${ft}.${inch}`;
    const hit = stockSec[key];
    if (!hit) {
      const sizes = Object.keys(stockSec)
        .map((k) => k.replace(".", "′") + "″")
        .join(", ");
      return {
        ...base,
        sub,
        incomplete: `${model} sections are stocked in ${sizes} only — this size must be entered in the Special Order category`,
      };
    }
    lines.push({ name: `${kindNm} section · ${widthLabel}`, value: hit[input.secKind], kind: "base" });
    // The sheet price already includes a single end stile, so double adds only
    // the difference — not the full double adder on top of a price that has one.
    if (input.stile === "double")
      lines.push({
        name: "Double end stiles",
        value: COMM_SLAB.adders.stile_double - COMM_SLAB.adders.stile_single,
        kind: "add",
      });
  } else if (hasRate) {
    const rate = COMM_SLAB.rate[model];
    lines.push({ name: `${kindNm} section · ${rFeet}′ × $${rate}/ft`, value: rate * rFeet, kind: "base" });
    // Bottom retainer & rubber is ALWAYS included on a bottom section — it is
    // no longer a selectable option (the input.retainer flag is ignored).
    if (input.secKind === "bt")
      lines.push({ name: `Bottom retainer & rubber · ${rFeet}′`, value: COMM_SLAB.adders.retainer * rFeet, kind: "add" });
    if (input.stile === "single") lines.push({ name: "Single end stiles", value: COMM_SLAB.adders.stile_single, kind: "add" });
    if (input.stile === "double") lines.push({ name: "Double end stiles", value: COMM_SLAB.adders.stile_double, kind: "add" });
  } else if (hasCost) {
    // round UP to the next standard width with a cost (e.g. 9′4″ -> 10′2″ section)
    const want = ft + inch / 12;
    const keys = Object.keys(COMM_SECTIONS.cost[model])
      .map((k) => ({ k, v: parseInt(k.split(".")[0], 10) + parseInt(k.split(".")[1] || "0", 10) / 12 }))
      .sort((a, b) => a.v - b.v);
    const hit = keys.find((x) => x.v >= want - 1e-9);
    if (!hit) return { ...base, sub, incomplete: `Too wide — sections top out at ${keys[keys.length - 1].k.replace(".", "′")}″` };
    const cost = COMM_SECTIONS.cost[model][hit.k][input.secKind];
    const stdLabel = hit.k.replace(".", "′") + "″";
    lines.push({
      name: `${kindNm} section${hit.v > want + 1e-9 ? ` · priced as ${stdLabel} standard` : ""}`,
      value: cost / (1 - COMM_SECTIONS.margin / 100), kind: "base",
    });
  } else {
    return { ...base, sub, incomplete: "No section pricing for this model" };
  }
  // windows on any intermediate section
  if (input.secKind === "int") {
    const n = Math.trunc(Number(input.windows)) || 0;
    const mx = maxWindows(rFeet);
    if (n > 0) lines.push({ name: `Windows ×${Math.min(n, mx)}`, value: COMM_SLAB.adders.window * Math.min(n, mx), kind: "add" });
  }
  const unitPrice = lines.reduce((a, l) => a + (l.kind === "minus" ? -l.value : l.value), 0);

  // Description for a replacement section. Written in the counter's own order —
  // manufacturer, model, size, what the section IS, colour, stiles — so it can
  // be pasted straight onto a QuickBooks estimate line.
  const nWin = input.secKind === "int" ? Math.min(Math.trunc(Number(input.windows)) || 0, maxWindows(rFeet)) : 0;
  const asciiWidth = `${ft}'${inch ? inch + '"' : '0"'}`;
  const ribbed = RIBBED[model];
  // Ribbed models: material, then the section, then the backer, then the
  // windows, then the colour. Everything else keeps its old wording.
  const kindPhrase = ribbed
    ? [
        `${ribbed.material} ${input.secKind === "bt" ? "bottom" : "intermediate"} section`,
        ribbed.backer ? "insulated steel backer" : null,
        nWin > 0 ? `${countWord(nWin)} 24x12 windows` : null,
      ].filter(Boolean).join(", ")
    : input.secKind === "bt"
      ? "bottom section"
      : nWin > 0
        ? `${nWin} 24x12 window section`
        : "solid intermediate section";
  const stilePhrase =
    input.stile === "double" ? "double end stiles" : input.stile === "single" ? "single end stiles" : null;
  const color = input.color === "Brown" ? "Brown" : "White";
  const description =
    `${input.mfr || "Clopay"} Model ${model}, ${asciiWidth} x ${input.secHeight}", ` +
    `${kindPhrase}, in the color ${color}` +
    (stilePhrase ? `, ${stilePhrase}` : "");

  return { priced: true, lines: collapseUpcharges(lines), unitPrice, sub, description };
}
