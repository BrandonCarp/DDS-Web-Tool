import { SPECIAL, modelGroupsOf } from "./data/special-orders";
import { windowDesigns } from "./data/inserts";
import { describe, it, expect } from "vitest";
import {
  specialDoorQuote, hasGrid, griddedHeights, griddedWidths, compareWidths, offeredHeights,
  groupMembers, groupHasWidthLimits, minWidthFor, excludedWidthsFor, shouldSplitGroup,
  parseModelSelection, modelSelectionValue,
} from "./data/special-door-pricing";
import { SPECIAL_DOORS } from "./data/special-doors";
import { ADDONS } from "./data/addons";
import { priceResidential, quoteResidential } from "./engine";
import { STOCK_PRICES } from "./data/stock-prices";
import { glassAdderSell } from "./data/so-glass";

const M = "4050/4051/4053/4132";
const base = { model: M, height: "7", color: "White", track: "r12" as const, spring: "extension" as const, lock: "none" as const };
// A stocked size is the stock book's price on this tab too (Brandon,
// 21/10/2026) — the 4050, 4051 and 4053 at the whole feet, 7', 8' and 9'
// high — so the sheet's own figures are read off the 4132, which DDS does
// not stock, or at an odd width.
const SHEET = { ...base, variant: "4132" };
const STOCK = STOCK_PRICES["4050-4051-4053"];

/**
 * CJ's Premium Steel workbook of 16/10/2026 prices the 4050 family at list x
 * .776 x 0.99 / (1 - 0.0265), and the app sells that at the family's 43:
 * the figures below are the sheet's list cells put through that.
 */
const K = 0.99 / (1 - 0.0265);
const sheet = (list: number, mult = 0.776, margin = 43) => Math.round((list * mult * K) / (1 - margin / 100) * 100) / 100;
/** The windows: the count times the sheet's price a window, kept in cents as cost (premium-glass.ts), then lifted. */
const windows = (n: number, list: number, mult = 0.776, margin = 43) =>
  Math.round(Math.round(n * list * mult * K * 100) / 100 / (1 - margin / 100) * 100) / 100;

describe("special order door grid", () => {
  it("grids the 4050 family at 7'0\", 8'0\", 9'0\" and 10'0\", 72 widths each, from 6'2\" (CJ's workbook, 16/10/2026)", () => {
    expect(hasGrid(M)).toBe(true);
    expect(griddedHeights(M)).toEqual(["7", "8", "9", "10"]);
    const w = griddedWidths(M, "7");
    expect(w).toHaveLength(72);
    expect(w[0]).toBe("6.2");
    expect(w[w.length - 1]).toBe("18");
  });

  it("quotes the SELL column straight, with no further margin", () => {
    // The grid is already at 43M. Applying the margin again here would be the
    // single most expensive mistake available in this file.
    expect(specialDoorQuote({ ...SHEET, width: "8", style: "solid" }).quote?.unitPrice).toBe(sheet(540));
    expect(specialDoorQuote({ ...SHEET, width: "8", style: "solid" }).quote?.unitPrice).toBe(747.62);
    expect(specialDoorQuote({ ...SHEET, width: "18", style: "solid" }).quote?.unitPrice).toBe(sheet(1176));
    // Windows are the sheet's price a window times the windows the width
    // carries, over the solid door: 16'0" takes eight short single strength
    // windows with inserts at 49 list each (single strength is the glass
    // unless another is picked — the grade the grid's own column carries).
    expect(specialDoorQuote({ ...SHEET, width: "16", style: "inserts" }).quote?.unitPrice).toBe(sheet(973) + windows(8, 49));
  });

  it("prices a stocked door at the stock book's figure, in every style, as the residential tab does (Brandon, 21/10/2026)", () => {
    // The 4050 at 8'0" x 7'0" is stocked: 723.25 solid, and its GLASS and
    // INSERTS columns with single strength short windows; any other glass is
    // the sheet's adder over the stocked solid door.
    expect(specialDoorQuote({ ...base, width: "8", style: "solid" }).quote?.unitPrice).toBe(STOCK["8"]["7"].solid);
    expect(specialDoorQuote({ ...base, width: "8", style: "glass" }).quote?.unitPrice).toBe(STOCK["8"]["7"].glass);
    expect(specialDoorQuote({ ...base, width: "8", style: "inserts", windesign: "509" }).quote?.unitPrice).toBe(STOCK["8"]["7"].inserts);
    expect(specialDoorQuote({ ...base, width: "8", style: "glass", glassType: "dsb" }).quote?.unitPrice).toBeCloseTo(STOCK["8"]["7"].solid + windows(4, 35), 2);
    expect(specialDoorQuote({ ...base, width: "8", style: "glass", panelStyle: "long" }).quote?.unitPrice).toBeCloseTo(STOCK["8"]["7"].solid + glassAdderSell(M, "long", "8", "ssb")!, 2);
    for (const [w, h] of [["8", "7"], ["16", "8"], ["12", "9"], ["7.6", "8"]]) {
      for (const style of ["solid", "glass", "inserts"] as const) {
        const r = quoteResidential("4050", { widthFt: Number(w.split(".")[0]), widthIn: Number(w.split(".")[1] ?? 0), heightFt: Number(h), heightIn: 0 }, { style, color: "White", track: "r12", spring: "extension", lock: "none", windesign: style === "inserts" ? "509" : undefined });
        expect(specialDoorQuote({ ...base, width: w, height: h, style, windesign: style === "inserts" ? "509" : undefined }).quote?.unitPrice, `${w}x${h} ${style}`).toBe(r.unitPrice);
      }
    }
    // The 4051 and 4053 are the same stocked door; the 4132 is not stocked.
    expect(specialDoorQuote({ ...base, variant: "4053", width: "8", style: "solid" }).quote?.unitPrice).toBe(STOCK["8"]["7"].solid);
    expect(specialDoorQuote({ ...base, variant: "4132", width: "8", style: "solid" }).quote?.unitPrice).toBe(747.62);
    // Nothing is stocked at 10' high, or at an odd width.
    expect(STOCK["8"]["10"]).toBeUndefined();
    expect(specialDoorQuote({ ...base, width: "8", height: "10", style: "solid" }).quote?.unitPrice).toBe(SPECIAL_DOORS[M]["10"]["8"].solid);
    expect(specialDoorQuote({ ...base, width: "8.2", style: "solid" }).quote?.unitPrice).toBeCloseTo(747.62 + 200, 2);
  });

  it("prices off CJ's sheet where DDS does not stock the door, and the stock tab keeps its own book", () => {
    // The stock tab (residential-prices.ts) carries the stock book: a stocked
    // 8'0" x 7'0" 4050 is $723.25 there, and on this tab too since 21/10/2026;
    // the sheet's $747.62 is what the 4132 — never stocked — prices at.
    expect(priceResidential("4050", { widthFt: 8, widthIn: 0, heightFt: 7, heightIn: 0 }, "solid").price).toBe(723.25);
    expect(specialDoorQuote({ ...base, width: "8", style: "solid" }).quote?.unitPrice).toBe(723.25);
    expect(specialDoorQuote({ ...SHEET, width: "8", style: "solid" }).quote?.unitPrice).toBe(747.62);
  });

  it("adds the same option money a stock door pays on a stocked model, and the sheet's on the 4132 (Brandon, 21/10/2026)", () => {
    // The stocked 4050: the stock book's door and the stock book's options.
    const plain = specialDoorQuote({ ...base, width: "8", style: "solid" }).quote!;
    const loaded = specialDoorQuote({
      ...base, width: "8", style: "solid",
      spring: "torsion", track: "low_headroom", lock: "lockbar_installed",
    }).quote!;
    expect(loaded.base).toBe(plain.base);
    expect(loaded.unitPrice - plain.unitPrice).toBeCloseTo(
      ADDONS.track.low_headroom + ADDONS.torsion + ADDONS.lockbar_installed, 2,
    );
    expect(loaded.unitPrice).toBeCloseTo(723.25 + ADDONS.track.low_headroom + ADDONS.torsion + ADDONS.lockbar_installed, 2);
    // The 4132, never stocked: the sheet's low headroom (39.06 cost at the 43%) and torsion (45), the lock the same.
    const sheetPlain = specialDoorQuote({ ...SHEET, width: "8", style: "solid" }).quote!;
    const sheetLoaded = specialDoorQuote({ ...SHEET, width: "8", style: "solid", spring: "torsion", track: "low_headroom", lock: "lockbar_installed" }).quote!;
    expect(sheetLoaded.base).toBe(sheetPlain.base);
    expect(sheetLoaded.unitPrice).toBeCloseTo(747.62 + Math.round((39.06 / 0.57) * 100) / 100 + 45 + ADDONS.lockbar_installed, 2);
  });

  it("refuses anything off the grid, and says to use the manual total", () => {
    for (const off of [
      { ...base, height: "10.6", width: "8", style: "solid" as const },
      { ...base, width: "19", style: "solid" as const },
      // The Gallery was the no-grid example until its sheet landed (8/10/2026),
      // the Coachman until its own did (12/10/2026); the Coachman's CG still
      // prices from a typed total only.
      { model: "CG", height: "7", width: "8", style: "solid" as const, color: "White",
        track: "r12" as const, spring: "extension" as const, lock: "none" as const },
    ]) {
      const r = specialDoorQuote(off);
      expect(r.quote).toBeUndefined();
      expect(r.reason).toMatch(/total below/);
    }
  });

  it("carries a price for every style at every gridded width", () => {
    const holes: string[] = [];
    for (const [width, triple] of Object.entries(SPECIAL_DOORS[M]["7"])) {
      for (const style of ["solid", "glass", "inserts"] as const) {
        if (typeof triple[style] !== "number") holes.push(`${width} ${style}`);
      }
    }
    expect(holes).toEqual([]);
  });

  it("prices a standard width below the odd sizes in its band", () => {
    // Clopay's structure, and it is not intuitive: standard widths are stocked
    // and cheap, while any odd width prices at the band above. An 8'2" door is
    // $936.05 against $808.54 for a 9'0" — the odd size costs MORE than the
    // next standard size UP. Asserting "wider is dearer" would be wrong, and
    // asserting nothing would let a transposed row through.
    // …which is how CJ's sheet lists them, and not how they are sold: an odd
    // width is the whole-foot door below it plus a flat $200 on the sell
    // price (Brandon, 19/10/2026), so the sheet's odd rows are never read.
    // Read off the 4132 (not stocked): on the stocked 4050 the whole feet are
    // the stock book's, and an odd width is still the sheet's whole-foot door and 200.
    const solid = (w: string) =>
      specialDoorQuote({ ...SHEET, width: w, style: "solid" }).quote!.unitPrice;
    for (const [std, odd] of [["8", "8.2"], ["8", "8.10"], ["9", "9.2"], ["9", "9.6"], ["10", "10.2"], ["10", "11"], ["10", "11.10"], ["12", "12.2"], ["12", "13"], ["14", "14.10"], ["15", "15.6"], ["16", "16.6"], ["17", "17.2"]]) {
      expect(solid(odd), `${odd} is the ${std} and 200`).toBeCloseTo(solid(std) + 200, 2);
    }
    expect(solid("8.2")).toBe(747.62 + 200);
    expect(specialDoorQuote({ ...base, width: "8.2", style: "solid" }).quote?.unitPrice).toBe(747.62 + 200);
    expect(solid("8.2")).not.toBe(sheet(676.1));
    // Whole feet with a row of their own are their own price; under 8'0" the
    // sheet's one band stands, there being no whole foot below it.
    expect(solid("9")).toBe(sheet(584));
    expect(solid("10")).toBe(sheet(663));
    expect(solid("12")).toBe(sheet(804));
    expect(solid("7.10")).toBe(sheet(625.5));
    expect(solid("7")).toBe(sheet(625.5));
  });

  it("prices every odd width in a band the same", () => {
    const solid = (w: string) =>
      specialDoorQuote({ ...base, width: w, style: "solid" }).quote!.unitPrice;
    for (const band of [["8.2", "8.4", "8.6", "8.8", "8.10"], ["9.2", "9.4", "9.6", "9.8", "9.10"], ["10.2", "10.6", "11", "11.6", "11.10"]]) {
      const prices = new Set(band.map(solid));
      expect([...prices], `band ${band[0]}–${band[band.length - 1]}`).toHaveLength(1);
    }
  });
});

describe("width key ordering", () => {
  it("sorts ten-inch widths above two-inch ones", () => {
    // The bug this exists to prevent: Number("6.10") is 6.1, which files 6'10"
    // below 6'2". Six widths on this grid end in ten inches.
    expect(compareWidths("6.10", "6.2")).toBeGreaterThan(0);
    expect(compareWidths("6.2", "6.10")).toBeLessThan(0);
    expect(compareWidths("7", "6.10")).toBeGreaterThan(0);
    expect([...["6.10", "6.2", "6", "7"]].sort(compareWidths)).toEqual(["6", "6.2", "6.10", "7"]);
  });

  it("gives every gridded width a distinct key", () => {
    const w = griddedWidths(M, "7");
    expect(new Set(w).size).toBe(w.length);
  });
});

describe("gridded door verbiage", () => {
  const d = (o: Partial<Parameters<typeof specialDoorQuote>[0]> = {}) =>
    specialDoorQuote({ ...base, width: "8", style: "solid", ...o }).quote!.description;

  it("words a door exactly as the residential tab words the same door", () => {
    // Both land in the same QuickBooks column and the counter reads both, so a
    // difference in phrasing between them is a difference with no meaning.
    expect(d()).toBe(
      `Clopay Model 4050/4051/4053/4132, 8'0" x 7'0", in the color White, solid no windows, ` +
      `12\u2033 radius track, extension springs, no lock`,
    );
  });

  it("carries colour, options and the insert design through", () => {
    expect(d({ color: "Black", track: "low_headroom", spring: "torsion", lock: "lockbar_installed" }))
      .toContain("in the color Black, solid no windows, low headroom track, front torsion springs, lockbar installed");
    // A lockbar assembly says so, as the stock tab's line does (Brandon, 20/10/2026: it said "lockbar").
    expect(d({ lock: "lockbar" })).toMatch(/, extension springs, lockbar assembly$/);
    expect(d({ lock: "slide" })).toMatch(/, inside slide lock$/);
    expect(d({ width: "9", style: "inserts", windesign: "509" }))
      .toContain("windows in the top section, Colonial 509 inserts");
  });

  it("says NO INSERTS rather than trailing off, same as residential", () => {
    expect(d({ width: "9", style: "inserts" })).toContain("windows in the top section, no inserts");
    // Plain glass reads by its grade, as the stock tab writes it (8/10/2026).
    expect(d({ width: "9", style: "glass" })).toContain("single strength b grade windows in the top section, no inserts");
  });

  it("writes ten-inch widths correctly", () => {
    // "8.10" is 8 feet 10 inches, not 8.1 feet.
    expect(d({ width: "8.10" })).toContain(`8'10" x 7'0"`);
    expect(d({ width: "8.2" })).toContain(`8'2" x 7'0"`);
  });
});

describe("the 6'2\"-7'10\" band", () => {
  // One row on CJ's sheet: 625.5 list at 7FT, so one price, every style.
  const BAND = { solid: sheet(625.5), glass: sheet(625.5) + windows(3, 33), inserts: sheet(625.5) + windows(3, 49) };
  const WIDTHS = ["6.2", "6.4", "6.6", "6.8", "6.10", "7", "7.2", "7.4", "7.6", "7.8", "7.10"];

  it("prices every width in the band identically, in all three styles — the stocked 7'0\" and 7'6\" aside, the stock book's", () => {
    for (const width of WIDTHS) {
      for (const [style, expected] of Object.entries(BAND)) {
        expect(
          specialDoorQuote({ ...SHEET, width, style: style as "solid" }).quote?.unitPrice,
          `${width} ${style}`,
        ).toBe(expected);
        const stocked = STOCK[width]?.["7"];
        expect(
          specialDoorQuote({ ...base, width, style: style as "solid" }).quote?.unitPrice,
          `4050 ${width} ${style}`,
        ).toBe(stocked ? stocked[style as "solid"] : expected);
      }
    }
  });

  it("has no 6'0\" row: the sheet starts at 6'2\"", () => {
    expect(griddedWidths(M)).not.toContain("6");
    expect(specialDoorQuote({ ...base, width: "6", style: "solid" }).quote).toBeUndefined();
  });

  it("drops back down at 8'0\", where the stocked size takes over", () => {
    expect(specialDoorQuote({ ...SHEET, width: "8", style: "solid" }).quote?.unitPrice).toBe(747.62);
    expect(specialDoorQuote({ ...base, width: "8", style: "solid" }).quote?.unitPrice).toBe(723.25);
    expect(BAND.solid).toBeGreaterThan(747.62);
  });
});

describe("offered heights", () => {
  it("offers the residential heights, filtered by what each model grids", () => {
    // The T50S grids 7, 8 and 9ft (UPDATED_PRICING_9-8); the 4050 family goes
    // to 10ft on CJ's sheet, so it offers 9'6" and 10'0" as well.
    expect(offeredHeights("T50S/T50L")).toEqual(["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8", "8.3", "8.6", "8.9", "9"]);
    expect(offeredHeights(M)).toEqual(["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8", "8.3", "8.6", "8.9", "9", "9.6", "10"]);
  });

  it("bands an in-between height to its tier, like residential", () => {
    // Clopay grids 7'0" and 8'0"; everything between prices off the nearer one
    // at or above it. 6'6" is a 7' door as far as the book is concerned.
    const at = (h: string, variant = "4132") =>
      specialDoorQuote({ model: M, variant, width: "9", height: h, color: "White", style: "solid",
        track: "r12", spring: "extension", lock: "none" }).quote!.unitPrice;
    for (const h of ["6", "6.3", "6.6", "6.9", "7"]) expect(at(h), h).toBe(sheet(584));
    for (const h of ["7.6", "7.9", "8"]) expect(at(h), h).toBe(sheet(713));
    // 8'3" to 8'9" price as 9'0" (28/9/2026); 9'6" as 10'0".
    for (const h of ["8.3", "8.6", "8.9"]) expect(at(h), h).toBe(at("9"));
    expect(at("9")).toBe(sheet(965));
    expect(at("9.6")).toBe(at("10"));
    expect(at("10")).toBe(sheet(1028));
    // The stocked 4050 bands the same way, to the stock book's tiers.
    for (const h of ["6", "6.6", "7"]) expect(at(h, "4050"), h).toBe(STOCK["9"]["7"].solid);
    for (const h of ["7.6", "8"]) expect(at(h, "4050"), h).toBe(STOCK["9"]["8"].solid);
    for (const h of ["8.3", "9"]) expect(at(h, "4050"), h).toBe(STOCK["9"]["9"].solid);
    expect(at("10", "4050")).toBe(sheet(1028));
  });

  it("writes the height ordered, not the tier it priced from", () => {
    const d = specialDoorQuote({ model: M, width: "9", height: "6.6", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" }).quote!.description;
    expect(d).toContain(`9'0" x 6'6"`);
    expect(d).not.toContain(`x 7'0"`);
  });

  it("quotes every gridded height on both models", () => {
    for (const [model, heights, widths] of [[M, ["7", "8", "9", "10"], 72], ["T50S/T50L", ["7", "8", "9"], 73]] as const) {
      expect(griddedHeights(model), model).toEqual(heights);
      for (const height of heights) {
        expect(griddedWidths(model, height), `${model} ${height}`).toHaveLength(widths);
        const q = specialDoorQuote({
          model, width: "9", height, color: "White", style: "solid",
          track: "r12", spring: "extension", lock: "none",
        });
        expect(q.quote?.unitPrice, `${model} ${height}`).toBeGreaterThan(0);
      }
    }
  });

  it("prices 8'0\" above 7'0\" on the same width", () => {
    const at = (height: string) =>
      specialDoorQuote({ model: M, variant: "4132", width: "9", height, color: "White", style: "solid",
        track: "r12", spring: "extension", lock: "none" }).quote!.unitPrice;
    expect(at("8")).toBeGreaterThan(at("7"));
    expect(at("7")).toBe(808.54);
    expect(at("8")).toBe(987.13);
  });

  it("names every gridded height when refusing one that is not", () => {
    // The message is what sends the counter to the manual box, so it has to
    // list what IS available rather than a hardcoded 7'0".
    // 10'0" is the T50S's limit; 10'6" is past the 4050 family's.
    const r = specialDoorQuote({ model: "T50S/T50L", width: "9", height: "10", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" });
    expect(r.quote).toBeUndefined();
    expect(r.reason).toContain(`6'0"`);
    expect(r.reason).toContain(`9'0"`);
    expect(r.reason).toMatch(/total below/);
    const tall = specialDoorQuote({ model: M, width: "9", height: "10.6", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" });
    expect(tall.quote).toBeUndefined();
    expect(tall.reason).toContain(`10'0"`);
  });
});

describe("per-model width limits", () => {
  const q = (width: string, variant?: string) =>
    specialDoorQuote({ model: M, width, height: "7", color: "White", style: "solid",
      track: "r12", spring: "extension", lock: "none", variant });

  it("starts the 4053 at 8'0\", not 6'2\" like its group", () => {
    // The grid is keyed by margin group, but Clopay does not build a 4053
    // narrower than 8'0". Offering 6'2" would quote a door nobody can order.
    expect(griddedWidths(M, "7", "4053")[0]).toBe("8");
    expect(griddedWidths(M, "7", "4053")).toHaveLength(55); // 72 less 11 narrow, less the 15' band
    expect(q("6.2", "4053").quote).toBeUndefined();
    expect(q("7.6", "4053").quote).toBeUndefined();
    expect(q("8", "4053").quote?.unitPrice).toBe(723.25);   // stocked: the stock book's (21/10/2026)
    expect(q("8", "4132").quote?.unitPrice).toBe(747.62);   // the sheet's
  });

  it("leaves the 4050, 4051 and 4132 on the full range", () => {
    for (const v of ["4050", "4051", "4132"]) {
      expect(griddedWidths(M, "7", v), v).toHaveLength(72);
      expect(q("6.2", v).quote?.unitPrice, v).toBe(sheet(625.5));
    }
  });

  it("says why, and points at the manual box", () => {
    const r = q("6.2", "4053");
    expect(r.reason).toContain("4053");
    expect(r.reason).toContain(`8'0"`);
    expect(r.reason).toMatch(/total below/);
  });

  it("only asks which model where the group's members differ", () => {
    // A picker on a group whose members share a range is a question with one
    // right answer, which is a question not worth asking.
    expect(groupHasWidthLimits(M)).toBe(true);
    expect(groupHasWidthLimits("T50S/T50L")).toBe(false);
    expect(groupMembers(M)).toEqual(["4050", "4051", "4053", "4132"]);
    expect(groupMembers("T50S/T50L")).toEqual(["T50S", "T50L"]);
  });

  it("names the specific model on the line once one is chosen", () => {
    expect(q("8", "4053").quote?.description).toContain("Model 4053,");
    expect(q("8", "4053").quote?.description).not.toContain("4050/4051/4053");
    // With none chosen the group name stands, as before.
    expect(q("8").quote?.description).toContain("Model 4050/4051/4053/4132,");
  });

  it("prices identically whichever member is chosen, where both are built", () => {
    expect(q("9", "4053").quote?.unitPrice).toBe(q("9", "4050").quote?.unitPrice);
  });
});

describe("9'0\" includes torsion", () => {
  const q = (height: string, spring: string) =>
    specialDoorQuote({ model: "T50S/T50L", width: "10", height, color: "White", style: "solid",
      track: "r12", spring: spring as "torsion", lock: "none" }).quote!;

  it("charges no adder at 9'0\", because the book already did", () => {
    // Clopay prints no extension column above 8'. Charging the torsion adder on
    // top of a price that includes torsion bills it twice.
    expect(q("9", "extension").unitPrice).toBe(q("9", "torsion").unitPrice);
    expect(q("9", "extension").unitPrice).toBe(1140.14);
    expect(q("9", "extension").torsionIncluded).toBe(true);
  });

  it("still charges it at 7'0\" and 8'0\"", () => {
    for (const h of ["7", "8"]) {
      expect(q(h, "torsion").unitPrice - q(h, "extension").unitPrice, h).toBeCloseTo(ADDONS.torsion, 2);
      expect(q(h, "extension").torsionIncluded, h).toBe(false);
    }
  });

  it("says torsion springs at 9'0\" whatever was selected", () => {
    // The customer is getting torsion either way, so the line has to say so.
    expect(q("9", "extension").description).toContain("front torsion springs");
    expect(q("9", "extension").description).not.toContain("extension springs");
  });

  it("says where the torsion springs sit: front, or rear on a low headroom rear torsion track (Brandon, 21/10/2026)", () => {
    const q = (track: string, spring: string, variant = "4138") =>
      specialDoorQuote({ model: variant === "4138" ? "4138" : "4050/4051/4053/4132", variant, width: "8", height: "7", color: "White", style: "solid", track, spring, lock: "none" } as never).quote!.description;
    expect(q("r12", "torsion")).toContain(", 12″ radius track, front torsion springs, no lock");
    expect(q("reverse_low_headroom", "torsion")).toContain(", low headroom rear torsion track, rear torsion springs, no lock");
    expect(q("reverse_low_headroom", "galvanized")).toContain(", low headroom rear torsion track, galvanized rear torsion springs, no lock");
    expect(q("low_headroom", "galvanized")).toContain(", low headroom track, galvanized front torsion springs, no lock");
    expect(q("reverse_low_headroom", "torsion", "4050")).toContain(", low headroom rear torsion track, rear torsion springs, no lock");
    expect(q("r12", "extension", "4050")).toContain(", 12″ radius track, extension springs, no lock");
  });

  it("matches the residential tab at 9'0\"", () => {
    const res = quoteResidential("T50S", { widthFt: 10, widthIn: 0, heightFt: 9, heightIn: 0 },
      { style: "solid", color: "White", track: "r12", spring: "extension", lock: "none" });
    expect(q("9", "extension").unitPrice).toBe(res.unitPrice);
  });
});

describe("the 8'0\" minimum applies to all four models", () => {
  it("floors 4053, 4310, 9133 and 9203 at 8'0\"", () => {
    for (const m of ["4053", "4310", "9133", "9203"]) {
      expect(minWidthFor(m), m).toBe("8");
    }
  });

  it("leaves their group-mates alone", () => {
    for (const m of ["4050", "4051", "4132", "4300", "4301", "4302", "4305", "9130", "9131", "9132", "9200", "9201", "9202", "9205", "T50S", "T50L"]) {
      expect(minWidthFor(m), m).toBeNull();
    }
  });

  it("puts a model picker on every group that now has a limit", () => {
    for (const g of ["4050/4051/4053/4132", "4300/4301/4302/4305/4310", "9130/9131/9132/9133", "9200/9201/9202/9203/9205"]) {
      expect(groupHasWidthLimits(g), g).toBe(true);
    }
    expect(groupHasWidthLimits("T50S/T50L")).toBe(false);
  });
});

describe("width and height are independent", () => {
  it("lists every gridded width with no height chosen", () => {
    // The counter often knows the opening width before the height. Making the
    // width dropdown wait on a height asked for information in an order the
    // data does not require.
    expect(griddedWidths(M)).toHaveLength(72);
    expect(griddedWidths("T50S/T50L")).toHaveLength(73);
  });

  it("gives the same list with or without a height", () => {
    // Clopay grids the same widths at every height it publishes, so the two
    // must agree. If a future sheet grids a height differently, this fails and
    // the dropdown needs to narrow again.
    for (const model of [M, "T50S/T50L"]) {
      const union = griddedWidths(model);
      for (const h of griddedHeights(model)) {
        expect(griddedWidths(model, h), `${model} ${h}`).toEqual(union);
      }
    }
  });

  it("still narrows by model where the members differ", () => {
    expect(griddedWidths(M, undefined, "4053")).toHaveLength(55);
    expect(griddedWidths(M, undefined, "4053")[0]).toBe("8");
    expect(griddedWidths(M, undefined, "4050")).toHaveLength(72);
  });

  it("still refuses a width the chosen height does not carry", () => {
    // Ungating the dropdown does not loosen the quote: the pair is checked.
    const r = specialDoorQuote({ model: M, width: "19", height: "7", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" });
    expect(r.quote).toBeUndefined();
    expect(r.reason).toMatch(/not on the grid/);
  });
});

describe("4053 skips 15'0\"", () => {
  const q = (width: string, variant: string) =>
    specialDoorQuote({ model: M, width, height: "7", color: "White", style: "solid",
      track: "r12", spring: "extension", lock: "none", variant });

  it("drops the whole 15' band while keeping the widths either side", () => {
    // A hole in the range, not a floor — the 4053 is built either side of it.
    const w = griddedWidths(M, undefined, "4053");
    for (const x of ["15", "15.2", "15.4", "15.6", "15.8", "15.10"]) expect(w, x).not.toContain(x);
    expect(w).toContain("14.10");
    expect(w).toContain("16");
    expect(excludedWidthsFor("4053")).toEqual(["15", "15.2", "15.4", "15.6", "15.8", "15.10"]);
  });

  it("sends an excluded 4053 width to the manual total", () => {
    for (const [w, label] of [["15", `15'0"`], ["15.2", `15'2"`], ["15.6", `15'6"`], ["15.10", `15'10"`]] as const) {
      expect(q(w, "4053").quote, w).toBeUndefined();
      expect(q(w, "4053").reason, w).toContain(`not built at ${label}`);
      expect(q(w, "4053").reason, w).toMatch(/total below/);
    }
  });

  it("words the floor and the hole differently", () => {
    // "not built narrower than 8'0\"" and "not built at 15'0\"" are different
    // facts and the counter should be able to tell them apart.
    expect(q("6.2", "4053").reason).toContain("narrower than");
    expect(q("15", "4053").reason).not.toContain("narrower than");
  });

  it("leaves the 4050 and 4051 across the whole 15' band", () => {
    for (const v of ["4050", "4051"]) {
      for (const w of ["15", "15.2", "15.4", "15.6", "15.8", "15.10"]) {
        expect(q(w, v).quote?.unitPrice, `${v} ${w}`).toBeGreaterThan(0);
      }
    }
  });
});

describe("split model dropdown", () => {
  it("splits groups whose members are not interchangeable", () => {
    for (const g of ["4050/4051/4053/4132", "4300/4301/4302/4305/4310", "9130/9131/9132/9133", "9200/9201/9202/9203/9205", "T50S/T50L"]) {
      expect(shouldSplitGroup(g), g).toBe(true);
    }
  });

  it("splits a group once it has a grid", () => {
    // T52S/T52L was collapsed while it had no grid — the member changed nothing
    // so a dropdown for it was noise. With the 7ft sheet in, the member names
    // the line on the quote and picks the panel style, so it splits.
    expect(shouldSplitGroup("T52S/T52L")).toBe(true);
  });

  it("prices a split selection off the group, not the member", () => {
    // The member narrows sizes and names the line; the margin still comes from
    // the group, because that is how Clopay prices them.
    const asMember = specialDoorQuote({ model: M, width: "9", height: "7", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none", variant: "4051" });
    const asGroup = specialDoorQuote({ model: M, width: "9", height: "7", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" });
    expect(asMember.quote?.unitPrice).toBe(asGroup.quote?.unitPrice);
    expect(asMember.quote?.description).toContain("Model 4051,");
    expect(asGroup.quote?.description).toContain("Model 4050/4051/4053/4132,");
  });
});

describe("model selection parsing", () => {
  it("splits a group:member value", () => {
    expect(parseModelSelection("4050/4051/4053/4132:4051")).toEqual({ group: "4050/4051/4053/4132", member: "4051" });
    expect(parseModelSelection("T50S/T50L:T50L")).toEqual({ group: "T50S/T50L", member: "T50L" });
  });

  it("leaves a plain group key alone", () => {
    expect(parseModelSelection("9130/9131/9132/9133")).toEqual({ group: "9130/9131/9132/9133", member: "" });
    expect(parseModelSelection("")).toEqual({ group: "", member: "" });
  });

  it("round-trips through the value builder", () => {
    for (const [g, m] of [["4050/4051/4053/4132", "4053"], ["T50S/T50L", ""]] as const) {
      const v = modelSelectionValue(g, m || undefined);
      expect(parseModelSelection(v)).toEqual({ group: g, member: m });
    }
  });

  it("gives every dropdown option a non-empty width list", () => {
    // The bug this exists to prevent: the raw "group:member" value was passed
    // where a grid key was expected, so SPECIAL_DOORS had no entry and the
    // width dropdown rendered empty with no error anywhere.
    for (const model of [M, "T50S/T50L"]) {
      const values = shouldSplitGroup(model)
        ? groupMembers(model).map((m) => modelSelectionValue(model, m))
        : [model];
      for (const v of values) {
        const { group, member } = parseModelSelection(v);
        expect(griddedWidths(group, undefined, member || undefined).length, v).toBeGreaterThan(0);
      }
    }
  });

  it("does not treat a raw selection value as a grid key", () => {
    expect(griddedWidths("4050/4051/4053/4132:4051")).toEqual([]);
    expect(griddedWidths(parseModelSelection("4050/4051/4053/4132:4051").group)).toHaveLength(72);
  });
});

describe("restricted models keep the manual total as a first-class path", () => {
  const restricted = (m: string) => minWidthFor(m) !== null || excludedWidthsFor(m).length > 0;

  it("marks only the models the configurator cannot fully cover", () => {
    expect(restricted("4053")).toBe(true);
    for (const m of ["4050", "4051", "T50S", "T50L"]) expect(restricted(m), m).toBe(false);
  });

  it("leaves the 4053 short of its group by 17 widths", () => {
    // 72 in the grid, less 11 below 8'0", less the six-wide 15' band. Enough
    // real orders land outside it that the total entry should not read as an
    // afterthought below the configurator.
    expect(griddedWidths(M, undefined, "4053")).toHaveLength(55);
    expect(griddedWidths(M, undefined, "4050")).toHaveLength(72);
  });

  it("quotes every width the 4053 does cover", () => {
    for (const w of griddedWidths(M, undefined, "4053")) {
      const r = specialDoorQuote({ model: M, width: w, height: "7", color: "White",
        style: "solid", track: "r12", spring: "extension", lock: "none", variant: "4053" });
      expect(r.quote?.unitPrice, w).toBeGreaterThan(0);
    }
  });

  it("routes every width it does not to the manual total", () => {
    const covered = new Set(griddedWidths(M, undefined, "4053"));
    const missed = griddedWidths(M, undefined, "4050").filter((w) => !covered.has(w));
    expect(missed).toHaveLength(17);
    for (const w of missed) {
      const r = specialDoorQuote({ model: M, width: w, height: "7", color: "White",
        style: "solid", track: "r12", spring: "extension", lock: "none", variant: "4053" });
      expect(r.quote, w).toBeUndefined();
      expect(r.reason, w).toMatch(/total below/);
    }
  });
});

describe("9ft and 10ft on CJ's sheet (16/10/2026)", () => {
  it("prices the torsion heights off the TORSION columns, glass over the solid door", () => {
    // 15'0" x 9'0": 1577 list; seven short single strength windows at 33 —
    // and 15'6" is that door and $200 (19/10/2026).
    // Off the 4132: the 4050 is stocked at 15'0" x 9'0" (the stock book's there).
    const r = specialDoorQuote({ model: M, variant: "4132", width: "15", height: "9", color: "White",
      style: "glass", track: "r12", spring: "torsion", lock: "none" });
    expect(r.quote?.base).toBeCloseTo(sheet(1577) + windows(7, 33), 2);
    expect(r.quote?.torsionIncluded).toBe(true);
    const odd = specialDoorQuote({ model: M, width: "15.6", height: "9", color: "White",
      style: "glass", track: "r12", spring: "torsion", lock: "none" });
    expect(odd.quote?.unitPrice).toBeCloseTo(r.quote!.unitPrice + 200, 2);
    expect(specialDoorQuote({ model: M, width: "15", height: "9", color: "White",
      style: "glass", track: "r12", spring: "torsion", lock: "none" }).quote?.unitPrice).toBe(STOCK["15"]["9"].glass);
    const ten = specialDoorQuote({ model: M, width: "10", height: "10", color: "White",
      style: "glass", track: "r12", spring: "torsion", lock: "none" });
    expect(ten.quote?.base).toBeCloseTo(sheet(1187) + windows(5, 33), 2);
    expect(specialDoorQuote({ model: M, width: "10.6", height: "10", color: "White",
      style: "glass", track: "r12", spring: "torsion", lock: "none" }).quote?.unitPrice).toBeCloseTo(ten.quote!.unitPrice + 200, 2);
  });
});

describe("special order grids, checked against the 9/30 workbook", () => {
  const q = (model: string, width: string, height: string, style: "solid" | "glass" | "inserts") =>
    specialDoorQuote({ model, width, height, style, color: "White", track: "r12", spring: "extension", lock: "none" }).quote;

  // Holes a grid is KNOWN to have, each one a sheet problem waiting on Clopay
  // or the coworker (scripts/apply_sheet_workbook.py reports them). Listed so
  // the continuity check below still catches an unexpected one — and so this
  // list fails when a hole closes, which is when its line comes off.
  // Cells the loader holds off a grid until a sheet is corrected leave a hole
  // in its 2-inch run; list them here while they last. Empty since the second
  // workbook of 12/10/2026 (the BD1 12'0" and the BD2/GD2 9'2"-9'10" rows at
  // 7FT were corrected, or loaded corrected).
  const KNOWN_HOLES: { group: string; tiers: string[]; from: number; to: number; why: string }[] = [];

  it("runs every grid in unbroken 2-inch steps, with proper width keys", () => {
    const good = /^\d+(\.(2|4|6|8|10))?$/;
    const inches = (k: string) => { const [f, i] = k.split("."); return +f * 12 + +(i ?? 0); };
    const seen = new Set<string>();
    for (const [group, tiers] of Object.entries(SPECIAL_DOORS)) {
      for (const [tier, widths] of Object.entries(tiers)) {
        const keys = Object.keys(widths);
        expect(keys.filter((k) => !good.test(k)), `${group} ${tier}ft keys`).toEqual([]);
        // The Coachman is built in 26 set widths, not every two inches; its
        // own test pins the list. The 4138's sheet prices 9FT and 10FT at the
        // whole feet alone (19/10/2026); its own test pins those too.
        if (group === "CD" || (group === "4138" && (tier === "9" || tier === "10"))) continue;
        const run = keys.map(inches).sort((a, b) => a - b);
        for (let i = 1; i < run.length; i++) {
          const hole = KNOWN_HOLES.find((h) => h.group === group && h.tiers.includes(tier) && h.from === run[i - 1] && h.to === run[i]);
          if (hole) { seen.add(`${group} ${tier}`); continue; }
          expect(run[i] - run[i - 1], `${group} ${tier}ft after ${run[i - 1]}in`).toBe(2);
        }
      }
    }
    for (const h of KNOWN_HOLES) for (const t of h.tiers) expect(seen.has(`${h.group} ${t}`), `${h.group} ${t}ft hole closed (${h.why}) — take it off KNOWN_HOLES`).toBe(true);
  });

  it("quotes the T52S at 11'0\" to 11'8\", which sat under broken keys — the 10'0\" door and 200", () => {
    for (const w of ["11", "11.2", "11.4", "11.6", "11.8"]) expect(q("T52S/T52L", w, "7", "solid")?.unitPrice, w).toBe(834.71 + 200);
  });

  it("takes the 4300 family out to 20'0\" at every height (CJ's sheet, 16/10/2026)", () => {
    for (const h of ["7", "8", "9", "10"]) expect(griddedWidths("4300/4301/4302/4305/4310", h).slice(-1)[0], h).toBe("20");
    expect(q("4300/4301/4302/4305/4310", "15", "8", "solid")?.unitPrice).toBe(sheet(1444, 0.704, 44));
    expect(q("4300/4301/4302/4305/4310", "19", "8", "solid")?.unitPrice).toBe(sheet(1871, 0.704, 44));
    // 19'10" is the 19'0" door and 200, not the row labelled 19'2" to 1910".
    expect(q("4300/4301/4302/4305/4310", "19.10", "10", "solid")?.unitPrice).toBeCloseTo(q("4300/4301/4302/4305/4310", "19", "10", "solid")!.unitPrice + 200, 2);
  });

  it("keeps the app's price where the workbook disagrees with its own TOTAL", () => {
    expect(q("T52S/T52L", "14", "7", "glass")?.unitPrice).toBe(1357.54); // sheet: 1375.54
  });
});

describe("the Modern Steel doors: the 9208/9209 and 4308/4309 pairs and the 4138 off CJ's sheets (19/10/2026)", () => {
  const q = (model: string, width: string, height: string, style: "solid" | "glass" | "inserts", variant?: string) =>
    specialDoorQuote({ model, variant, width, height, style, color: "White", track: "r12", spring: "extension", lock: "none" });
  const modern = SPECIAL["Modern Collection"].models!;

  it("keys the pairs as their sheets do, at the Modern Collection's 45%", () => {
    expect(modelGroupsOf(modern)).toEqual(["4138", "4308/4309", "9138", "9139", "9208/9209"]);
    for (const g of Object.keys(modern)) expect(modern[g].door, g).toBe(45);
    expect(hasGrid("9208/9209") && hasGrid("4308/4309") && hasGrid("4138")).toBe(true);
    expect(hasGrid("4308")).toBe(false);
  });

  it("grids the pairs 6'0\" to 20'0\" at every height, solid alone, the 9FT and 10FT doors at the sheet's one torsion column", () => {
    for (const g of ["9208/9209", "4308/4309"]) {
      for (const h of ["7", "8", "9", "10"]) {
        const widths = griddedWidths(g, h);
        expect([widths.length, widths[0], widths.slice(-1)[0]], `${g} ${h}ft`).toEqual([85, "6", "20"]);
      }
      expect(q(g, "12", "9", "solid").quote?.unitPrice).toBe(q(g, "12", "10", "solid").quote?.unitPrice);
      expect(q(g, "12", "9", "solid").quote?.unitPrice).toBeGreaterThan(q(g, "12", "8", "solid").quote!.unitPrice);
    }
    // The same list on both sheets (704 the 8'0" 7FT door), each at its own multiplier: .865 and .704.
    expect(q("9208/9209", "8", "7", "solid", "9208").quote?.unitPrice).toBe(sheet(704, 0.865, 45));
    expect(q("4308/4309", "8", "7", "solid", "4309").quote?.unitPrice).toBe(sheet(704, 0.704, 45));
    expect(q("9208/9209", "16", "8", "solid").quote?.unitPrice).toBe(sheet(1577, 0.865, 45));
    expect(q("9208/9209", "12", "8", "solid").quote?.unitPrice).toBe(sheet(1240, 0.865, 45));
    expect(q("4308/4309", "20", "10", "solid").quote?.unitPrice).toBe(sheet(2813, 0.704, 45));
    expect(q("4308/4309", "6", "7", "solid").quote?.unitPrice).toBe(sheet(814, 0.704, 45));
    // No window off the grid: the grid's GLASS column is gone, the windows are pressed into the drawing.
    expect(q("4308/4309", "8", "7", "glass").reason).toMatch(/none are placed yet/);
  });

  it("grids the 4138 6'2\" to 18'0\" at every height, at its own .776 — the 9FT and 10FT bands under 8'0\" priced since CJ's sheet of 21/10/2026", () => {
    for (const h of ["7", "8", "9", "10"]) {
      const widths = griddedWidths("4138", h);
      expect([widths.length, widths[0], widths.slice(-1)[0]], `4138 ${h}ft`).toEqual([72, "6.2", "18"]);
    }
    expect(q("4138", "6.2", "7", "solid").quote?.unitPrice).toBe(sheet(659, 0.776, 45));
    expect(q("4138", "7.6", "9", "solid").quote?.unitPrice).toBe(sheet(1116, 0.776, 45));   // 6'2" to 7'10" at 9FT and 10FT: one band
    expect(q("4138", "6.2", "10", "solid").quote?.unitPrice).toBe(sheet(1116, 0.776, 45));
    expect(q("4138", "18", "10", "solid").quote?.unitPrice).toBe(sheet(2174, 0.776, 45));
    expect(q("4138", "8", "7", "glass").reason).toMatch(/none are placed yet/);
  });

  it("prices an odd width as the whole-foot door and 200 on every one of them (19/10/2026)", () => {
    expect(q("4308/4309", "8.6", "7", "solid").quote?.unitPrice).toBeCloseTo(q("4308/4309", "8", "7", "solid").quote!.unitPrice + 200, 2);
    expect(q("4308/4309", "8.6", "7", "solid").quote?.unitPrice).toBeCloseTo(sheet(704, 0.704, 45) + 200, 2);
    expect(q("9208/9209", "19.10", "10", "solid").quote?.unitPrice).toBeCloseTo(q("9208/9209", "19", "10", "solid").quote!.unitPrice + 200, 2);
    expect(q("4138", "10.6", "9", "solid").quote?.unitPrice).toBeCloseTo(q("4138", "10", "9", "solid").quote!.unitPrice + 200, 2);
    expect(q("4138", "10.6", "7", "solid").quote?.unitPrice).toBeCloseTo(q("4138", "10", "7", "solid").quote!.unitPrice + 200, 2);
  });
});

describe("galvanized torsion springs on special orders (5/10/2026)", () => {
  const q = (width: string, height: string, spring: "extension" | "torsion" | "galvanized") =>
    specialDoorQuote({ model: M, width, height, style: "solid", color: "White", track: "r12", spring, lock: "none" }).quote!;

  it("adds $40 on a single door and $45 on a double, and says so in the description", () => {
    expect(q("8", "7", "galvanized").unitPrice).toBeCloseTo(q("8", "7", "extension").unitPrice + 40, 2);
    expect(q("16", "7", "galvanized").unitPrice).toBeCloseTo(q("16", "7", "extension").unitPrice + 45, 2);
    expect(q("8", "7", "galvanized").description).toContain("galvanized front torsion springs");
  });

  it("charges only the difference where the height already includes torsion", () => {
    expect(q("16", "9", "galvanized").unitPrice).toBeCloseTo(q("16", "9", "torsion").unitPrice + 10, 2);
  });
});

describe("long-panel inserts on the 4050 and 9130 (5/10/2026)", () => {
  it("offers the long designs the 4053 gets, because they take long windows", () => {
    for (const m of ["4050", "9130"]) {
      const ids = windowDesigns(m, "inserts", "16").map((d) => d.id);
      for (const long of ["608", "610", "612", "611", "613"]) expect(ids, `${m} ${long}`).toContain(long);
    }
    expect(windowDesigns("T50S", "inserts", "16").map((d) => d.id)).not.toContain("612"); // short windows only
  });
});

describe("special order verbiage — Brandon's examples (8/10/2026)", () => {
  const line = (o: Record<string, unknown>) => {
    const r = specialDoorQuote({ model: M, variant: "4050", width: "8", height: "7", color: "Black", style: "solid",
      track: "r12", spring: "extension", lock: "none", ...o } as never);
    if (!r.quote) throw new Error(r.reason);
    return r.quote.description.toUpperCase();
  };

  it("2. a 4050 with single strength windows and 32\" track", () => {
    expect(line({ style: "glass", track: "r32", spring: "torsion" })).toBe(
      'CLOPAY MODEL 4050, 8\'0" X 7\'0", IN THE COLOR BLACK, SINGLE STRENGTH B GRADE WINDOWS IN THE TOP SECTION, NO INSERTS, 32″ RADIUS TRACK, FRONT TORSION SPRINGS, NO LOCK',
    );
  });

  it("3. a solid 9200", () => {
    expect(line({ model: "9200/9201/9202/9203/9205", variant: "9200", width: "18", color: "White", track: "r15" })).toBe(
      'CLOPAY MODEL 9200, 18\'0" X 7\'0", IN THE COLOR WHITE, SOLID NO WINDOWS, 15″ RADIUS TRACK, EXTENSION SPRINGS, NO LOCK',
    );
  });

  it("4. a Gallery door names the collection, the grade and the insert design", () => {
    expect(line({ model: "GD1LP/GD1SP", variant: "GD1SP", width: "9", color: "White", style: "inserts", track: "r15", spring: "torsion", windesign: "ARCH1GRILLE" })).toBe(
      'CLOPAY GALLERY COLLECTION, MODEL GD1SP, 9\'0" X 7\'0", IN THE COLOR WHITE, DOUBLE STRENGTH B GRADE WINDOWS IN THE TOP SECTION, ARCH 1 GRILLE INSERTS, 15″ RADIUS TRACK, FRONT TORSION SPRINGS, NO LOCK',
    );
  });

  it("1. an angle mount reads before the radius, as the stock tab writes it", () => {
    expect(line({ style: "glass", track: "r32", spring: "torsion", trackMount: "continuous_angle" })).toContain(
      'NO INSERTS, 2" CONTINUOUS ANGLE MOUNT TRACK TO WOOD, 32″ RADIUS TRACK, FRONT TORSION SPRINGS, NO LOCK',
    );
  });
});
