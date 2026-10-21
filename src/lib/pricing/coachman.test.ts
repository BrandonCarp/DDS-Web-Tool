import { describe, expect, it } from "vitest";
import {
  specialDoorQuote, offeredHeights, griddedWidths, griddedHeights, torsionIncluded, galvanizedPriced,
} from "./data/special-door-pricing";
import { SPECIAL_DOORS } from "./data/special-doors";
import { glassOptionsFor, panelStylesFor, isSheetGroup, sheetUltraGrain } from "./data/so-glass";
import { COACHMAN_GLASS, COACHMAN_GROUPS, COACHMAN_SECTIONS } from "./data/coachman-glass";
import { sectionCost, sectionDesignsAt, windowSectionCost, windowSectionGroup } from "./data/coachman-windows";
import { COACHMAN_ARCH, COACHMAN_GLASS_DESIGNS, COACHMAN_WINDOW_DESIGNS, windowDesigns } from "./data/inserts";
import { SPECIAL } from "./data/special-orders";
import { specialOrderColors } from "./data/catalog-meta";
import { COACHMAN_DESIGNS, COACHMAN_OVERLAY_COLORS, designBuilt, designsBuilt, designTakesWindows } from "./data/door-designs";
const coachmanDesignBuilt = (d: string, w: string, h: string) => designBuilt("CD", d, w, h);
const coachmanDesigns = (w: string, h: string) => designsBuilt("CD", w, h);
const coachmanDesignTakesWindows = (d: string) => designTakesWindows("CD", d);

// Figures straight off CJ's Coachman workbook (COACHMAN.xlsx, 13/10/2026):
// DDS cost is Clopay list x 1.193 x 0.99 / (1 - 0.0265) + 15 on every door
// cell, and the grid holds that at the Coachman's 41% door margin. A window
// door adds the design's section — the sheet's list adder over the solid
// door, by width — and then the glass by window count, as the sheet's ADD ON
// TO DOUBLE STRENGTH DOOR PRICE.
const K = 0.99 / (1 - 0.0265);
const MULT = 1.193;
const margin = SPECIAL["Coachman Collection"].models!.CD.door;
const sell = (cost: number) => Math.round((cost / (1 - margin / 100)) * 100) / 100;
const door = (list: number) => list * MULT * K + 15;
// An adder is rounded to cents on its own before the lift, as every sheet's glass is,
// and the quote rounds the sum to cents again.
const adder = (cost: number) => sell(Math.round(cost * 100) / 100);
const plus = (a: number, b: number) => Math.round((a + b) * 100) / 100;

const q = (o: Record<string, unknown>) => specialDoorQuote({
  model: "CD", variant: "CD", width: "8", height: "7", color: "White", style: "solid",
  track: "r12", spring: "torsion", lock: "none", ...o,
} as never);
// Every Coachman's springs — torsion or galvanized torsion — are priced at the
// galvanized rate (Brandon, 13/10/2026): the sheet's torsion price plus 5 on a
// single door, 10 on a double. `price` takes that off again so the figures
// below read as the sheet's; the springs have a test of their own.
const galv = (width: string) => (parseInt(width, 10) >= 12 ? 10 : 5);
const price = (o: Record<string, unknown>) => {
  const r = q(o);
  if (!r.quote) throw new Error(r.reason);
  return plus(r.quote.unitPrice, -galv(String(o.width ?? "8")));
};

describe("Coachman special order grid (workbook of 12/10/2026)", () => {
  it("is a sheet-priced group at the collection's margin, with no premium finish priced", () => {
    expect(margin).toBe(41);
    expect(COACHMAN_GROUPS).toEqual(["CD"]);
    expect(isSheetGroup("CD")).toBe(true);
    expect(sheetUltraGrain("CD")).toBeNull();
    expect(specialOrderColors("CD")).not.toContain("Ultra-Grain Oak Medium Finish");
    expect(specialOrderColors("CD")).not.toContain("Iron Ore");
    expect(specialOrderColors("CD")[0]).toBe("White");
  });

  it("grids the 26 widths Clopay builds the Coachman in, and nothing between them", () => {
    const widths = ["6.2", "6.4", "7", "7.2", "7.6", "7.8", "8", "8.2", "8.6", "9", "9.2", "10", "12", "12.2", "13", "13.8",
      "14", "14.2", "15", "15.2", "15.6", "15.8", "16", "16.2", "17", "18"];
    expect(griddedWidths("CD")).toEqual(widths);
    for (const t of ["7", "8", "9", "10"]) expect(Object.keys(SPECIAL_DOORS.CD[t]).sort(), t).toEqual([...widths].sort());
    expect(q({ width: "11" }).reason).toMatch(/not on the grid/);
  });

  it("prices every height off its own column: list x 1.193 x k + 15", () => {
    expect(griddedHeights("CD")).toEqual(["7", "8", "9", "10"]);
    expect(offeredHeights("CD")).toContain("10");
    expect(price({})).toBe(sell(door(1135)));                               // 8'0" x 7'
    expect(price({ height: "8" })).toBe(sell(door(1165)));
    expect(price({ height: "9" })).toBe(sell(door(1511)));
    expect(price({ height: "8.6" })).toBe(sell(door(1511)));                // 8'6" prices off the 9' column
    expect(price({ width: "18", height: "10" })).toBe(sell(door(3180)));
    expect(price({ width: "12" })).toBe(sell(door(1617)));
    expect(price({ width: "16", height: "8" })).toBe(sell(door(2188)));
  });

  it("carries the +15 on the solid 10FT column too (the corrected workbook's formula)", () => {
    // CJ's first sheet left the +15 off that one column of eight; the corrected
    // workbook adds it there too, so the glass top section costs the same at
    // every height — as it does on every other row of the sheet.
    expect(price({ height: "10" })).toBe(sell(door(1549)));
    const win = { style: "glass", windesign: "ARCH1" };
    expect(price({ height: "10", ...win }) - price({ height: "10" })).toBe(price(win) - price({}));
  });

  it("prices 8'2\"-9'0\" at 7FT off 1184 — the book's 9' torsion figure (CJ's first sheet had the 1154 extension one)", () => {
    for (const w of ["8.2", "8.6", "9"]) {
      expect(price({ width: w }), w).toBe(sell(door(1184)));
      expect(price({ width: w, height: "8" }), w).toBe(sell(door(1215)));
      // With windows these widths are the 8'0" door plus 200 — their own test.
      expect(price({ width: w, style: "glass", windesign: "ARCH3" }), w).toBe(plus(price({ width: "8", style: "glass", windesign: "ARCH3" }), 200));
    }
  });

  it("prices the window section by design over the solid door, by width (CJ's workbook of 13/10/2026)", () => {
    expect(windowSectionGroup("CD")).toBe(true);
    expect(windowSectionGroup("GD1LP/GD1SP")).toBe(false);
    expect(Object.keys(COACHMAN_SECTIONS.CD)).toEqual(COACHMAN_WINDOW_DESIGNS.map((d) => d.id));
    // 8'0": ARCH1 is 218 list over the solid door; ARCH3 and ARCH4 twice that.
    const win = (d: string, o: Record<string, unknown> = {}) => price({ style: "glass", windesign: d, ...o });
    expect(win("ARCH1")).toBe(plus(sell(door(1135)), adder(218 * MULT * K)));
    expect(win("ARCH1", { glassType: "dsb" })).toBe(win("ARCH1"));
    expect(win("ARCH3")).toBe(plus(sell(door(1135)), adder(436 * MULT * K)));
    expect(win("ARCH4")).toBe(win("ARCH3"));
    for (const d of ["ARCH13", "ARCH14", "REC11", "REC13", "REC14", "SQ23", "SQ24"]) expect(win(d), d).toBe(win("ARCH1"));
    // The sheet's own figure for the window door, to the cent of the adder's rounding.
    expect(win("ARCH1")).toBeCloseTo(sell(door(1135 + 218)), 1);
    // 8'2" to 9'0" with windows: the 8'0" door plus 200 (16/10/2026); 9'2" to 10'0": 145 and 290.
    expect(win("REC13", { width: "8.6" })).toBe(plus(win("REC13", { width: "8" }), 200));
    expect(win("ARCH4", { width: "8.6", height: "8" })).toBe(plus(win("ARCH4", { width: "8", height: "8" }), 200));
    expect(win("SQ24", { width: "10" })).toBe(plus(sell(door(1476)), adder(145 * MULT * K)));
    expect(win("ARCH3", { width: "9.2", height: "10" })).toBe(plus(sell(door(2016)), adder(290 * MULT * K)));
    // 12'0" to 13'8": 327 on the REC and SQ designs; 14'2" to 16'2": 435; 17'0" and 18'0": 454.
    expect(win("REC11", { width: "12" })).toBe(plus(sell(door(1617)), adder(327 * MULT * K)));
    expect(win("SQ23", { width: "13.8", height: "9" })).toBe(plus(sell(door(2362)), adder(327 * MULT * K)));
    expect(win("REC14", { width: "14.2" })).toBe(plus(sell(door(2127)), adder(435 * MULT * K)));
    expect(win("REC14", { width: "16.2" })).toBe(plus(sell(door(2163)), adder(435 * MULT * K)));
    expect(win("ARCH4", { width: "16" })).toBe(plus(sell(door(2127)), adder(870 * MULT * K)));
    expect(win("SQ24", { width: "17" })).toBe(plus(sell(door(2163)), adder(454 * MULT * K)));
    expect(win("ARCH3", { width: "18", height: "10" })).toBe(plus(sell(door(3180)), adder(908 * MULT * K)));
    // The adder does not change with height — the sheet's four tables agree.
    for (const h of ["8", "9", "10"]) expect(plus(win("ARCH1", { height: h }), -price({ height: h })), h).toBe(adder(218 * MULT * K));
    expect(sectionCost("CD", "ARCH1", "8")).toBe(264.48);
    expect(sectionCost("CD", "ARCH1", "12")).toBeNull();
  });

  it("builds the window designs where the sheet prices them: no arches at 12'0\" to 13'8\", no ARCH designs there either", () => {
    const at = (w: string) => sectionDesignsAt("CD", w).map((d) => d.id);
    const ten = COACHMAN_GLASS_DESIGNS.map((d) => d.id);
    const arches = COACHMAN_ARCH.map((d) => d.id);
    expect(ten).toEqual(["ARCH1", "ARCH3", "ARCH4", "ARCH13", "ARCH14", "REC11", "REC13", "REC14", "SQ23", "SQ24"]);
    expect(arches).toEqual(["ARC13A", "ARC14A", "ARC1A", "ARC3A", "ARC4A"]);
    for (const w of ["6.2", "8", "9", "10"]) expect(at(w), w).toEqual(ten);                       // 2-window doors: no arched section
    for (const w of ["12", "12.2", "13", "13.8"]) expect(at(w), w).toEqual(["REC11", "REC13", "REC14", "SQ23", "SQ24", ...arches]);
    for (const w of ["14.2", "15", "16", "16.2", "17", "18"]) expect(at(w), w).toEqual([...ten, ...arches]);
    expect(at("14")).toEqual([]);
    expect(q({ style: "glass", windesign: "ARCH1", width: "12" }).reason).toMatch(/does not build the ARCH1 window section at 12'0"/);
    expect(q({ style: "glass", windesign: "ARC1A", width: "8" }).reason).toMatch(/does not build the ARC1A window section at 8'0"/);
    // Every name the line may carry, on plain glass; the Coachman takes no inserts.
    expect(windowDesigns("CD", "glass", "16")).toEqual(COACHMAN_WINDOW_DESIGNS);
    expect(windowDesigns("CD", "inserts", "16")).toEqual([]);
    expect(windowDesigns("GD1SP", "glass", "8")).toEqual([]);                    // plain glass names no design elsewhere
    // A design the model does not name is no design at all.
    expect(q({ style: "glass", windesign: "509" }).reason).toMatch(/Pick a window design/);
    expect(q({ style: "glass" }).reason).toMatch(/Pick a window design/);
  });

  it("prices the arched sections by width, over the solid door, on 3- and 4-window doors", () => {
    const win = (d: string, o: Record<string, unknown> = {}) => price({ style: "glass", windesign: d, ...o });
    // 654 list at 12'0" to 13'8", 870 at 14'2" to 16'2", 908 at 17'0" and 18'0" — the
    // sheet's $793.45 / $1055.50 / $1101.60 cost.
    expect(win("ARC1A", { width: "12" })).toBe(plus(sell(door(1617)), adder(793.45)));
    expect(win("ARC3A", { width: "13.8", height: "9" })).toBe(plus(sell(door(2362)), adder(793.45)));
    expect(win("ARC13A", { width: "14.2" })).toBe(plus(sell(door(2127)), adder(1055.5)));
    expect(win("ARC4A", { width: "16" })).toBe(plus(sell(door(2127)), adder(1055.5)));
    expect(win("ARC14A", { width: "18", height: "8" })).toBe(plus(sell(door(2355)), adder(1101.6)));
    // Asked for as "inserts" (the old shape of the request) it is the same window.
    expect(price({ style: "inserts", windesign: "ARC1A", width: "16" })).toBe(win("ARC1A", { width: "16" }));
    // Worded like every other design — as inserts.
    expect(q({ style: "glass", windesign: "ARC1A", width: "16" }).quote?.description)
      .toBe("Clopay Coachman Collection, Model CD, 16'0\" x 7'0\", in the color White, double strength b grade windows in the top section, ARC1A inserts, 12″ radius track, front torsion springs, no lock");
  });

  it("offers one window layout, so there is no short-or-long choice", () => {
    expect(panelStylesFor("CD", "8")).toEqual(["short"]);
    expect(COACHMAN_GLASS.CD.dsb.long).toEqual([]);
    expect(price({ style: "glass", windesign: "ARCH1", panelStyle: "short" })).toBe(price({ style: "glass", windesign: "ARCH1" }));
  });

  it("adds the special glass over the double strength door by window count, on any design", () => {
    // ADD ON TO DOUBLE STRENGTH DOOR PRICE: RAIN and FROSTED 155 / 310 / 310 list,
    // SEEDED 275 / 550 / 550, OBSCURE 40 / 80 / 80 for 2 / 3 / 4 windows — up to
    // 12FT two windows, 12FT to 15FT three, 15FT and up four.
    expect(glassOptionsFor("CD", "short", "8").map((g) => g.id)).toEqual(["dsb", "obscure", "frosted", "rain", "seeded"]);
    const win = (d: string, o: Record<string, unknown> = {}) => price({ style: "glass", windesign: d, ...o });
    expect(win("ARCH1", { glassType: "rain" })).toBe(plus(sell(door(1135)), adder(218 * MULT * K + 155 * MULT * K)));
    expect(win("ARCH1", { glassType: "rain" })).toBe(plus(sell(door(1135)), adder(452.53)));       // the figure CJ's first sheet carried
    expect(win("ARCH1", { glassType: "frosted" })).toBe(win("ARCH1", { glassType: "rain" }));
    expect(win("ARCH4", { glassType: "rain" })).toBe(plus(sell(door(1135)), adder(436 * MULT * K + 155 * MULT * K)));
    expect(win("REC13", { glassType: "rain", width: "10" })).toBe(plus(sell(door(1476)), adder(145 * MULT * K + 155 * MULT * K)));
    expect(win("REC11", { glassType: "rain", width: "12" })).toBe(plus(sell(door(1617)), adder(327 * MULT * K + 310 * MULT * K)));
    expect(win("SQ24", { glassType: "rain", width: "14.2" })).toBe(plus(sell(door(2127)), adder(435 * MULT * K + 310 * MULT * K)));   // 3 windows at the 4-window section figure
    expect(win("SQ24", { glassType: "frosted", width: "16.2" })).toBe(plus(sell(door(2163)), adder(435 * MULT * K + 310 * MULT * K)));
    expect(win("REC14", { glassType: "seeded", width: "12.2" })).toBe(plus(sell(door(1861)), adder(327 * MULT * K + 550 * MULT * K)));
    expect(win("ARCH1", { glassType: "obscure" })).toBe(plus(sell(door(1135)), adder(218 * MULT * K + 40 * MULT * K)));
    expect(win("ARCH13", { glassType: "obscure", width: "8.2" })).toBe(plus(win("ARCH13", { glassType: "obscure", width: "8" }), 200));
    // The arched sections take the glass too.
    expect(win("ARC1A", { glassType: "seeded", width: "16" })).toBe(plus(sell(door(2127)), adder(870 * MULT * K + 550 * MULT * K)));
    expect(windowSectionCost("CD", "16", "ARC1A", "seeded")).toBe(plus(1055.5, 667.27));
    expect(windowSectionCost("CD", "16", "ARC1A", "dsb")).toBe(1055.5);
    expect(windowSectionCost("CD", "14", "ARCH1", "dsb")).toBeNull();
    expect(q({ style: "glass", glassType: "rain", windesign: "ARCH1" }).quote?.description).toContain("rain dsb windows in the top section, ARCH1 inserts");
  });

  it("is solid only at 14'0\", where the sheet prices no window section; 14'2\" has three windows at the 4-window section figure", () => {
    expect(panelStylesFor("CD", "14")).toEqual([]);
    expect(price({ width: "14" })).toBe(sell(door(1861)));
    expect(q({ width: "14", style: "glass", windesign: "ARCH1" }).reason).toMatch(/solid only/);
    expect(q({ width: "14", style: "glass", glassType: "rain", windesign: "ARCH1" }).reason).toMatch(/solid only/);
    expect(q({ width: "14", style: "inserts", windesign: "ARC1A" }).reason).toMatch(/solid only/);
    expect(panelStylesFor("CD", "13.8")).toEqual(["short"]);
    expect(panelStylesFor("CD", "14.2")).toEqual(["short"]);
    expect(panelStylesFor("CD", "15")).toEqual(["short"]);
    expect(COACHMAN_GLASS.CD.rain.short.map((b) => [b.lo, b.hi, b.windows, b.glass])).toEqual([
      [74, 120, 2, 188.05], [144, 164, 3, 376.10], [170, 170, 3, 376.10], [180, 216, 4, 376.10],
    ]);
  });

  it("names the design on the line after the glass, as inserts (Brandon, 13/10/2026)", () => {
    expect(q({ style: "glass", windesign: "REC13" }).quote?.description)
      .toContain("in the color White, double strength b grade windows in the top section, REC13 inserts, 12″ radius track");
    expect(q({ style: "glass", glassType: "rain", windesign: "ARCH1", width: "16" }).quote?.description)
      .toContain("rain dsb windows in the top section, ARCH1 inserts, 12″ radius track");
    expect(q({ style: "glass", glassType: "seeded", windesign: "ARC4A", width: "18" }).quote?.description)
      .toContain("seeded dsb windows in the top section, ARC4A inserts, 12″ radius track");
  });

  it("prices a door with windows over 8'0\" up to 9'0\" as the 8'0\" door of the same build plus a flat $200 (Brandon, 14 and 16/10/2026)", () => {
    const at = (width: string, o: Record<string, unknown> = {}) => q({ style: "glass", windesign: "ARCH1", width, ...o }).quote!.unitPrice;
    // His example: an 8x7 with double strength ARCH1 is $2,812.60, so the 9x7 is $3,012.60 — and so are the 8'2" and 8'6".
    expect(at("8")).toBe(2812.6);
    expect(at("9")).toBe(3012.6);
    expect(at("8.2")).toBe(3012.6);
    expect(at("8.6")).toBe(3012.6);
    for (const width of ["8.2", "8.6", "9"]) {
      for (const o of [{ windesign: "ARCH4" }, { windesign: "REC13", glassType: "rain" }, { windesign: "SQ24", height: "8" }, { windesign: "ARCH13", height: "10", glassType: "seeded" }]) {
        expect(at(width, o), `${width} ${JSON.stringify(o)}`).toBe(plus(at("8", o), 200));
      }
    }
    // The line still says the width asked for; a solid door at these widths, and every other width, is as the sheet prices it.
    expect(q({ width: "9", style: "glass", windesign: "REC13" }).quote?.description).toContain("Model CD, 9'0\" x 7'0\", in the color White, double strength b grade windows in the top section, REC13 inserts");
    expect(q({ width: "8.6", style: "glass", windesign: "REC13" }).quote?.description).toContain("Model CD, 8'6\" x 7'0\", in the color White");
    expect(price({ width: "9" })).toBe(sell(door(1184)));
    expect(price({ width: "8.6" })).toBe(sell(door(1184)));
    expect(price({ width: "8.2" })).toBe(sell(door(1184)));
    expect(price({ width: "9.2", style: "glass", windesign: "REC13" })).toBe(plus(sell(door(1476)), adder(145 * MULT * K)));
    expect(price({ width: "8", style: "glass", windesign: "REC13" })).toBe(plus(sell(door(1135)), adder(218 * MULT * K)));
  });

  it("includes torsion springs at every height — the sheet's ALL TORSION SPRING PRICES", () => {
    expect(torsionIncluded("CD")).toBe(true);
    expect(torsionIncluded("BD1CU")).toBe(false);
    expect(q({}).quote?.torsionIncluded).toBe(true);
  });

  it("offers torsion and galvanized torsion at one price, the galvanized rate, each named on the line (Brandon, 13/10/2026)", () => {
    expect(galvanizedPriced("CD")).toBe(true);
    expect(galvanizedPriced("BD1CU")).toBe(false);
    expect(galvanizedPriced("GD1LP/GD1SP")).toBe(false);
    const unit = (o: Record<string, unknown>) => q(o).quote!.unitPrice;
    expect(unit({ spring: "galvanized" })).toBe(plus(sell(door(1135)), 5));          // 40 on a single door, less the 35 already in
    expect(unit({ spring: "galvanized", width: "16" })).toBe(plus(sell(door(2127)), 10));
    expect(unit({ spring: "torsion" })).toBe(unit({ spring: "galvanized" }));
    expect(unit({ spring: "torsion", width: "16" })).toBe(unit({ spring: "galvanized", width: "16" }));
    expect(q({ spring: "torsion" }).quote?.description).toContain(", front torsion springs, no lock");
    expect(q({ spring: "galvanized" }).quote?.description).toContain(", galvanized front torsion springs, no lock");
    // No extension on a Coachman: one asked for is torsion, at the same price.
    expect(unit({ spring: "extension" })).toBe(unit({ spring: "galvanized" }));
    expect(q({ spring: "extension" }).quote?.description).toContain(", front torsion springs, no lock");
    // Only the Coachman: a Gallery door still offers extension.
    const gd = (spring: string) => specialDoorQuote({
      model: "GD1LP/GD1SP", variant: "GD1SP", width: "8", height: "7", color: "White", style: "solid",
      track: "r12", spring, lock: "none",
    } as never).quote!;
    expect(gd("extension").description).toContain(", extension springs");
    expect(gd("torsion").unitPrice).toBeGreaterThan(gd("extension").unitPrice);
  });

  it("offers Clopay's fifteen designs, each where its size table builds it (Brandon, 12/10/2026)", () => {
    expect(COACHMAN_DESIGNS).toEqual(["11", "12", "13", "21", "22", "23", "31", "32", "33", "34", "35", "36", "41", "42", "43"]);
    expect(coachmanDesigns("", "")).toEqual(COACHMAN_DESIGNS);
    // Designs 22, 23, 34 and 35 are not built at 12'0", 12'2", 13'0" or 13'8".
    for (const w of ["12", "12.2", "13", "13.8"]) {
      expect(coachmanDesigns(w, "7"), w).toEqual(["11", "12", "13", "21", "31", "32", "33", "36", "41", "42", "43"]);
    }
    for (const w of ["6.2", "10", "14", "16", "18"]) expect(coachmanDesigns(w, "7"), w).toEqual(COACHMAN_DESIGNS);
    // Design 21 is built to 8'0" in 3" steps, then 8'6", 9'0", 9'6" and 10'0" only.
    expect(coachmanDesignBuilt("21", "8", "8.3")).toBe(false);
    expect(coachmanDesignBuilt("21", "8", "8.9")).toBe(false);
    for (const h of ["6", "6.3", "7.9", "8", "8.6", "9", "9.6", "10"]) expect(coachmanDesignBuilt("21", "8", h), h).toBe(true);
    expect(coachmanDesigns("8", "8.3")).toEqual(COACHMAN_DESIGNS.filter((d) => d !== "21"));
    // Designs 22 and 23 to 10'0" in 3" steps; the rest to 16'0".
    expect(coachmanDesignBuilt("22", "8", "10")).toBe(true);
    expect(coachmanDesignBuilt("22", "8", "10.3")).toBe(false);
    expect(coachmanDesignBuilt("12", "8", "16")).toBe(true);
    expect(coachmanDesignBuilt("99", "8", "7")).toBe(false);
    // Series 3 and 4 are solid only.
    expect(["11", "12", "13", "21", "22", "23"].every(coachmanDesignTakesWindows)).toBe(true);
    expect(["31", "36", "41", "43"].some(coachmanDesignTakesWindows)).toBe(false);
    expect(COACHMAN_OVERLAY_COLORS).toEqual(["White", "Almond", "Desert Tan", "Sandtone"]);
  });

  it("names the design and the overlay colour on the line, and refuses a design Clopay does not build that way", () => {
    expect(q({ design: "12", overlayColor: "Sandtone" }).quote?.description)
      .toBe("Clopay Coachman Collection, Model CD12, 8'0\" x 7'0\", in the color White, overlays in the color Sandtone, solid no windows, 12″ radius track, front torsion springs, no lock");
    expect(price({ design: "12", overlayColor: "Sandtone" })).toBe(price({}));   // the design and overlay change the words only
    expect(q({ design: "22", width: "12" }).reason).toMatch(/does not build design 22 at 12'0" x 7'0"/);
    expect(q({ design: "21", height: "8.3" }).reason).toMatch(/does not build design 21 at 8'0" x 8'3"/);
    expect(q({ design: "31", style: "glass" }).reason).toMatch(/series 3 and 4 designs with windows — design 31 is solid only/);
    expect(q({ design: "31" }).quote?.description).toContain("Model CD31,");
    expect(q({ design: "12", style: "glass", windesign: "SQ24", overlayColor: "White" }).quote?.description)
      .toBe("Clopay Coachman Collection, Model CD12, 8'0\" x 7'0\", in the color White, overlays in the color White, double strength b grade windows in the top section, SQ24 inserts, 12″ radius track, front torsion springs, no lock");
  });

  it("words the line as a Coachman", () => {
    expect(q({}).quote?.description)
      .toBe("Clopay Coachman Collection, Model CD, 8'0\" x 7'0\", in the color White, solid no windows, 12″ radius track, front torsion springs, no lock");
    expect(q({ style: "glass", windesign: "SQ24" }).quote?.description).toContain("double strength b grade windows in the top section, SQ24 inserts");
  });
});
