// Ported 1:1 from the production single-file tool: buildCommQuote() +
// commStockCheck() + the complete-door description builder. Server-side only.

import { collapseUpcharges } from "./types";
import { COMM_MATRIX, COMM_SECTIONS, COMM_SECTION_STOCK, COMM_SLAB, STOCK_COMM, GRADE_COMM } from "./data/commercial";
import { ADDONS } from "./data/addons";
import {
  COMM_COMPLETE, panelCount, panelsPhrase, joinAnd, roundedFeet, slabBilledFeet, SLAB_MIN_FEET, SECTION_MAX_WIDTH_IN, maxWidthLabel, sectionColors,
  sectionWindowSizes, stileLocationCount,
} from "./data/commercial-meta";

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
  /** The panels of that section with windows, 1-based from the left; every panel when not given (15/10/2026). */
  windowPanels?: number[];
  /** The windows' size, from sectionWindowSizes; the model's first where not given. */
  windowSize?: string;
}
export interface CommSectionInput {
  order: "section";
  mfr: string; model: string;
  manFt?: number; manIn?: number;     // customer's width — any size
  secKind: "bt" | "int";
  secHeight: "21" | "24";
  windows?: number;                   // intermediate sections only: a count, where the panels are not named
  /** The panels with windows, 1-based from the left (15/10/2026); their count is the windows. */
  windowPanels?: number[];
  /** The windows' size, from sectionWindowSizes (24x12, 24x6, 24x8); the model's first where not given. */
  windowSize?: string;
  retainer?: boolean;                 // DEPRECATED — ignored; retainer is always included on bottom sections
  stile?: "none" | "single" | "double"; // per-foot only
  /** The stile measurements, left to right, as typed — a 524 or 2415 (stileLocationCount), any added by hand among them. */
  stileLocations?: string[];
  /**
   * A lock on an intermediate section with no windows (Brandon, 20/10/2026):
   * a lockbar assembly or a lockbar installed, at the add-on figures the
   * residential doors carry; "slide" is the inside slide lock of the 16th,
   * wording only. A section with windows takes none.
   */
  lock?: "none" | "slide" | "lockbar" | "lockbar_installed";
  /** The locations are still to come: the line ends "stile locations needed". */
  stileLocationsNeeded?: boolean;
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
 * The 524 and 2415 sections, worded as they go on the invoice — Brandon,
 * 14/10/2026 (reworded from the 7th):
 *   Wayne Dalton Model 2415V, 8'2" x 24", steel ribbed bottom section, in the color white, insulated with vinyl back cover, single end stiles
 *   Clopay Model 524, 8'2" x 24", steel ribbed intermediate section, in the color white, solid no windows, non insulated, single end stiles
 *   Wayne Dalton Model 2415V, 8'2" x 24", steel ribbed intermediate section, in the color white, two 24x12 insulated glass windows, insulated with vinyl back cover, single end stiles
 * The section, the colour, the windows (an intermediate says SOLID NO WINDOWS
 * without them), the insulation, the stiles. The plain models are non
 * insulated and their glass is double strength b grade; V has a vinyl back
 * cover and S a steel one, and their glass is insulated. Colour stays a
 * separate choice, never assumed.
 *
 * A complete 524 door says just the insulation (9/10/2026 — it had kept an
 * older "hollow steel ribbed" from September), then runs on like any other door:
 *   CLOPAY MODEL 524, 8'2" X 8'0", NON INSULATED, IN THE COLOR WHITE, SOLID NO WINDOWS, 2" ANGLE MOUNT TRACK TO WOOD, ...
 */
const RIBBED_SECTION_INSULATION: Record<string, string> = {
  "524": "non insulated",
  "2415": "non insulated",
  "524V": "insulated with vinyl back cover",
  "2415V": "insulated with vinyl back cover",
  "524S": "insulated with steel back cover",
  "2415S": "insulated with steel back cover",
};
/** The glass in a section's windows: insulated on an insulated door, the book's grade on the rest. */
function sectionGlassWord(model: string): string {
  const insulation = RIBBED_SECTION_INSULATION[model];
  if (insulation) return insulation === "non insulated" ? "double strength b grade" : "insulated";
  return GRADE_COMM[model] || "insulated";
}

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
    // section" — because that is what the installer needs off the line, and
    // by the panels of it when not every panel has one: "one 24x12 window in
    // the middle of the third section" (15/10/2026). Plain ASCII inch marks
    // throughout: this string is pasted into QuickBooks.
    const insulation = RIBBED_SECTION_INSULATION[model];
    // A complete door's windows are 24x12 unless another size is picked \u2014 the
    // line has always read so; the section lines lead with the model's first.
    const sizes = sectionWindowSizes(model);
    const winSize = input.windowSize && sizes.includes(input.windowSize) ? input.windowSize : sizes.includes("24x12") ? "24x12" : sizes[0];
    const dw = String(input.size).match(/(\d+)\u2032(\d+)\u2033/);
    const panels = dw ? panelCount(Number(dw[1]), Number(dw[2])) : 0;
    const picked = [...new Set((input.windowPanels ?? []).map((n) => Math.trunc(n)))].filter((n) => n >= 1 && n <= panels);
    const partial = picked.length > 0 && picked.length < panels;
    const glassWord = model === "3200" ? "insulated " : insulation ? "" : `${cgrade} `;
    // "solid no windows" with no comma, as the door lines read everywhere
    // (Brandon, 9/10/2026).
    const winTxt =
      input.glass === "glass"
        ? partial
          ? `${countWord(picked.length)} ${glassWord}${winSize} ${picked.length === 1 ? "window" : "windows"} ${panelsPhrase(panels, picked)} of the ${ordinal(input.winSection)} section`
          : `${glassWord}${winSize} windows in the ${ordinal(input.winSection)} section`
        : "solid no windows";
    const colorTxt = `in the color ${(input.color || "White").toLowerCase()}`;
    // Ribbed models say the insulation and no grade word; then the colour and
    // the windows (or SOLID NO WINDOWS) like any other door, and the
    // track/spring/lock tail. "Steel ribbed" is for the section lines only.
    const leadTxt = insulation ? `${insulation}, ` : "";
    const mountTxt = input.mount === "reverse" ? '2" angle mount track to steel' : '2" angle mount track to wood';
    // FV is FULL VERTICAL LIFT. It read "full view" here, which is a different
    // product entirely — a full-view door is aluminium and glass. The dropdown
    // has always said "Full vertical" and the parts catalogue says "FULL
    // VERTICAL LIFT", so the description was the only place it was wrong.
    const radiusTxt = { "15R": '15" radius track', FV: "full vertical lift track", LHR: "low headroom track" }[input.track];
    // Torsion springs are front torsion springs on every door quote (Brandon, 21/10/2026); no rear torsion track here.
    const cspringTxt = input.cspring === "extension" ? "extension springs" : "front torsion springs";
    const clockTxt = input.clock === "slide" ? "inside slide lock" : "no lock";
    return {
      priced: true,
      warn,
      lines: [{ name: `${glassNm}, ${trackNm}`, value: val, kind: "base" }],
      unitPrice: val,
      sub: `${input.size} · ${glassNm} · ${trackNm}`,
      stock: commStockCheck(model, input.size),
      description: `${input.mfr || "Clopay"} Model ${model}, ${dimTxt}, ${leadTxt}${colorTxt}, ${winTxt}, ${mountTxt}, ${radiusTxt}, ${cspringTxt}, ${clockTxt}`,
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
    // Under 8′ bills as 8′. The retainer follows the same billed width, so a
    // short slab does not get a full-price slab with a short retainer.
    const bFeet = slabBilledFeet(ft, inch);
    const minNote = bFeet > rFeet ? ` (${SLAB_MIN_FEET}′ minimum)` : "";
    lines.push({ name: `${kindNm} section · ${bFeet}′ × $${rate}/ft${minNote}`, value: rate * bFeet, kind: "base" });
    // Bottom retainer & rubber is ALWAYS included on a bottom section — it is
    // no longer a selectable option (the input.retainer flag is ignored).
    if (input.secKind === "bt")
      lines.push({ name: `Bottom retainer & rubber · ${bFeet}′`, value: COMM_SLAB.adders.retainer * bFeet, kind: "add" });
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
  // Windows on an intermediate section: one a panel, the panels chosen from
  // the left (15/10/2026), or a plain count where none are named.
  const panels = panelCount(ft, inch);
  const picked = input.secKind !== "int" ? []
    : [...new Set((input.windowPanels ?? []).map((n) => Math.trunc(n)))].filter((n) => n >= 1 && n <= panels).sort((a, b) => a - b);
  const nWin = input.secKind !== "int" ? 0 : input.windowPanels ? picked.length : Math.min(Math.trunc(Number(input.windows)) || 0, panels);
  if (nWin > 0) lines.push({ name: `Windows ×${nWin}`, value: COMM_SLAB.adders.window * nWin, kind: "add" });
  // A lockbar on a windowless intermediate section, at the residential add-on figures.
  const lock = input.secKind === "int" && nWin === 0 ? input.lock ?? "none" : "none";
  if (lock === "lockbar") lines.push({ name: "Lockbar assembly", value: ADDONS.lockbar_assembly, kind: "add" });
  if (lock === "lockbar_installed") lines.push({ name: "Lockbar installed", value: ADDONS.lockbar_installed, kind: "add" });
  const unitPrice = lines.reduce((a, l) => a + (l.kind === "minus" ? -l.value : l.value), 0);

  // Description for a replacement section. Written in the counter's own order —
  // manufacturer, model, size, what the section IS, colour, windows, stiles —
  // so it can be pasted straight onto a QuickBooks estimate line.
  const asciiWidth = `${ft}'${inch ? inch + '"' : '0"'}`;
  const insulation = RIBBED_SECTION_INSULATION[model];
  // The windows: "two 24x12 double strength b grade glass windows" — the size
  // the model's sections take (24x12 or 24x6 on a 524 or 2415, 24x8 or 24x12
  // on a 3200), the glass insulated on an insulated door (Brandon, 14/10/2026)
  // — and where not every panel has one, which: "one 24x12 ... window in the
  // middle panel" (15/10/2026).
  const sizes = sectionWindowSizes(model);
  const winSize = input.windowSize && sizes.includes(input.windowSize) ? input.windowSize : sizes[0];
  // Windows that sit in the middle of the section — a run of panels either
  // side of its centre, not every one — are "in center of section"; any other
  // part-set names its panels (Brandon's estimate of 16/10/2026).
  const centered = picked.length > 0 && picked.length < panels
    && picked[picked.length - 1] - picked[0] + 1 === picked.length && picked[0] - 1 === panels - picked[picked.length - 1];
  const where = picked.length > 0 && picked.length < panels ? (centered ? " in center of section" : ` ${panelsPhrase(panels, picked)}`) : "";
  // The 524 and 2415 say the glass and "windows" — "two 24x12 double strength
  // b grade windows" — then lay the section out panel by panel,
  // "solid-glass-glass-solid" (16/10/2026); the other models keep "glass windows".
  const windowsPhrase = nWin > 0
    ? `${countWord(nWin)} ${winSize} ${sectionGlassWord(model)}${insulation ? "" : " glass"} ${nWin === 1 ? "window" : "windows"}${where}`
    : null;
  const layout = insulation && picked.length > 0 ? Array.from({ length: panels }, (_, i) => (picked.includes(i + 1) ? "glass" : "solid")).join("-") : null;
  const color = input.color === "Brown" ? "Brown" : "White";
  // The stile locations of a 524 or 2415, one a stile, left to right, as typed
  // — "stile locations 59"  82-1/4" and 90-1/2"", two spaces between them and
  // "and" before the last, like the vinyl (Brandon, 15/10/2026) — or "stile
  // locations needed" when none are typed (16/10/2026). The sheet's count by
  // width is what the counter is shown; a stile typed past it is written too.
  const stileCount = stileLocationCount(model, ft, inch);
  const typed = stileCount > 0 ? (input.stileLocations ?? []).slice(0, 10).map((x) => String(x ?? "").trim()).filter(Boolean) : [];
  const stileLocations = stileCount > 0
    ? input.stileLocationsNeeded || !typed.length ? "stile locations needed" : `stile locations ${joinAnd(typed, "  ")}`
    : null;
  // A lock goes on an intermediate section only: after the windows on a 524
  // or 2415, before the stiles; last on the other models.
  const lockTxt = ({ slide: "inside slide lock", lockbar: "lockbar assembly", lockbar_installed: "lockbar installed" } as Record<string, string>)[lock] ?? null;
  const description = insulation
    // The 524 and 2415 — Brandon's estimate of 16/10/2026: the section, the
    // colour, the insulation, the windows (or SOLID NO WINDOWS) and the
    // panel-by-panel layout on an intermediate, the end stile, the stile
    // locations, the lock.
    ? [
        `${input.mfr || "Clopay"} Model ${model}`,
        `${asciiWidth} x ${input.secHeight}"`,
        input.secKind === "bt" ? "steel ribbed bottom section" : "steel ribbed intermediate section",
        `in the color ${color.toLowerCase()}`,
        insulation,
        input.secKind === "bt" ? null : windowsPhrase ?? "solid no windows",
        input.secKind === "bt" ? null : layout,
        lockTxt, // before any mention of stiles (Brandon, 16/10/2026)
        input.stile === "double" ? "double end stiles" : input.stile === "single" ? "single end stile" : null,
        stileLocations,
      ].filter(Boolean).join(", ")
    : `${input.mfr || "Clopay"} Model ${model}, ${asciiWidth} x ${input.secHeight}", ` +
      `${input.secKind === "bt" ? "bottom section" : nWin > 0 ? "intermediate section" : "solid intermediate section"}, in the color ${color}` +
      (windowsPhrase ? `, ${windowsPhrase}` : "") +
      // One end stile is singular on these lines; two stay plural (Brandon, 6/10/2026).
      (input.stile === "double" ? ", double end stiles" : input.stile === "single" ? ", single end stile" : "") +
      (lockTxt ? `, ${lockTxt}` : "");

  return { priced: true, lines: collapseUpcharges(lines), unitPrice, sub, description };
}
