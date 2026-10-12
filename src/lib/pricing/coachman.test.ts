import { describe, expect, it } from "vitest";
import {
  specialDoorQuote, offeredHeights, griddedWidths, griddedHeights, torsionIncluded, galvanizedOnly, archSectionGroup,
} from "./data/special-door-pricing";
import { SPECIAL_DOORS } from "./data/special-doors";
import { glassOptionsFor, glassTakesInserts, panelStylesFor, isSheetGroup, sheetUltraGrain } from "./data/so-glass";
import { COACHMAN_GLASS, COACHMAN_GROUPS } from "./data/coachman-glass";
import { COACHMAN_ARCH, COACHMAN_GLASS_DESIGNS, windowDesigns } from "./data/inserts";
import { SPECIAL } from "./data/special-orders";
import { specialOrderColors } from "./data/catalog-meta";
import { COACHMAN_DESIGNS, COACHMAN_OVERLAY_COLORS, designBuilt, designsBuilt, designTakesWindows } from "./data/door-designs";
const coachmanDesignBuilt = (d: string, w: string, h: string) => designBuilt("CD", d, w, h);
const coachmanDesigns = (w: string, h: string) => designsBuilt("CD", w, h);
const coachmanDesignTakesWindows = (d: string) => designTakesWindows("CD", d);

// Figures straight off CJ's Coachman workbook (COACHMAN.xlsx, 12/10/2026):
// DDS cost is Clopay list x 1.193 x 0.99 / (1 - 0.0265) + 15 on every door
// cell, and the grid holds that at the Coachman's 41% door margin. The glass
// top section is the gap between the sheet's two grids; the other glass and
// the arch sections are the sheet's flat cost adders over the solid door.
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
// Every Coachman is sold with galvanized torsion springs (Brandon, 12/10/2026):
// the sheet's torsion price plus 5 on a single door, 10 on a double. `price`
// takes that off again so the figures below read as the sheet's; the springs
// have a test of their own.
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
    expect(price({ height: "10", style: "glass" }) - price({ height: "10" })).toBe(price({ style: "glass" }) - price({}));
  });

  it("prices 8'2\"-9'0\" at 7FT off 1184 — the book's 9' torsion figure (CJ's first sheet had the 1154 extension one)", () => {
    for (const w of ["8.2", "8.6", "9"]) {
      expect(price({ width: w }), w).toBe(sell(door(1184)));
      expect(price({ width: w, height: "8" }), w).toBe(sell(door(1215)));
      expect(plus(price({ width: w, style: "glass" }), -price({ width: w })), w).toBe(adder(227 * MULT * K));
    }
  });

  it("prices the double strength top section as the gap between the sheet's two grids", () => {
    // 8'0": solid 1135, glass top section 1353 -> 218 list over the solid door.
    expect(price({ style: "glass" })).toBe(plus(sell(door(1135)), adder(218 * MULT * K)));
    expect(price({ style: "glass", glassType: "dsb" })).toBe(price({ style: "glass" }));
    expect(price({ style: "glass", width: "9.2" })).toBe(plus(sell(door(1476)), adder(290 * MULT * K)));
    expect(price({ style: "glass", width: "12.2", height: "8" })).toBe(plus(sell(door(1915)), adder(327 * MULT * K)));
    expect(price({ style: "glass", width: "15" })).toBe(plus(sell(door(2127)), adder(435 * MULT * K)));
    expect(price({ style: "glass", width: "18", height: "10" })).toBe(plus(sell(door(3180)), adder(454 * MULT * K)));
    // The sheet's own glass figure, to the cent of the adder's rounding.
    expect(price({ style: "glass" })).toBeCloseTo(sell(door(1353)), 1);
    expect(price({ style: "glass", width: "18", height: "10" })).toBeCloseTo(sell(door(3634)), 1);
  });

  it("offers one window layout, so there is no short-or-long choice", () => {
    expect(panelStylesFor("CD", "8")).toEqual(["short"]);
    expect(COACHMAN_GLASS.CD.dsb.long).toEqual([]);
    expect(price({ style: "glass", panelStyle: "short" })).toBe(price({ style: "glass" }));
  });

  it("adds the other glass as CJ's sheet does: one figure per window count over the solid door", () => {
    // CJ's revised sheet (12/10/2026): RAIN and FROSTED 452.53 / 772.82 / 903.85,
    // SEEDED 598.12 / 1063.99 / 1195.02, OBSCURE 313.00 / 493.79 / 624.82 cost
    // for 2 / 3 / 4 windows — the first width's window adder plus the glass
    // adder (Clopay's book would vary the window adder with the width inside a
    // count; the app goes by his sheet — Brandon, 12/10/2026).
    expect(glassOptionsFor("CD", "short", "8").map((g) => g.id)).toEqual(["dsb", "obscure", "frosted", "rain", "seeded"]);
    expect(price({ style: "glass", glassType: "rain" })).toBe(plus(sell(door(1135)), adder(452.53)));
    expect(price({ style: "glass", glassType: "frosted" })).toBe(price({ style: "glass", glassType: "rain" }));
    expect(price({ style: "glass", glassType: "rain", width: "10" })).toBe(plus(sell(door(1476)), adder(452.53)));
    expect(price({ style: "glass", glassType: "rain", width: "12" })).toBe(plus(sell(door(1617)), adder(772.82)));
    expect(price({ style: "glass", glassType: "rain", width: "13.8" })).toBe(plus(sell(door(1861)), adder(772.82)));
    expect(price({ style: "glass", glassType: "rain", width: "15" })).toBe(plus(sell(door(2127)), adder(903.85)));
    expect(price({ style: "glass", glassType: "frosted", width: "16.2" })).toBe(plus(sell(door(2163)), adder(903.85)));
    expect(price({ style: "glass", glassType: "seeded", width: "12.2" })).toBe(plus(sell(door(1861)), adder(1063.99)));
    expect(price({ style: "glass", glassType: "obscure" })).toBe(plus(sell(door(1135)), adder(313)));
    expect(price({ style: "glass", glassType: "obscure", width: "9" })).toBe(plus(sell(door(1184)), adder(313)));
    expect(q({ style: "glass", glassType: "rain" }).quote?.description).toContain("rain dsb windows in the top section, no inserts");
  });

  it("is solid only at 14'0\" and 14'2\", where the sheet has no glass top section", () => {
    for (const w of ["14", "14.2"]) {
      expect(panelStylesFor("CD", w), w).toEqual([]);
      expect(price({ width: w }), w).toBe(sell(door(w === "14" ? 1861 : 2127)));
      expect(q({ width: w, style: "glass" }).reason, w).toMatch(/solid only/);
      expect(q({ width: w, style: "glass", glassType: "rain" }).reason, w).toMatch(/solid only/);
      expect(q({ width: w, style: "inserts", windesign: "ARC1A" }).reason, w).toMatch(/solid only/);
    }
    expect(panelStylesFor("CD", "13.8")).toEqual(["short"]);
    expect(panelStylesFor("CD", "15")).toEqual(["short"]);
  });

  it("prices the arch window sections over the solid door on 3- and 4-window doors, and not on 2-window ones", () => {
    expect(archSectionGroup("CD")).toBe(true);
    expect(windowDesigns("CD", "inserts", "16")).toEqual(COACHMAN_ARCH);
    expect(COACHMAN_ARCH.map((d) => d.id)).toEqual(["ARC13A", "ARC14A", "ARC1A", "ARC3A", "ARC4A"]);
    expect(windowDesigns("CD", "glass", "16")).toEqual(COACHMAN_GLASS_DESIGNS);
    // 3-window: $793.45 cost; 4-window: $1055.50 cost — "ADD TO SOLID PRICE".
    expect(price({ style: "inserts", windesign: "ARC1A", width: "12" })).toBe(plus(sell(door(1617)), adder(793.45)));
    expect(price({ style: "inserts", windesign: "ARC3A", width: "13.8", height: "9" })).toBe(plus(sell(door(2362)), adder(793.45)));
    expect(price({ style: "inserts", windesign: "ARC4A", width: "16" })).toBe(plus(sell(door(2127)), adder(1055.5)));
    expect(price({ style: "inserts", windesign: "ARC13A", width: "18", height: "8" })).toBe(plus(sell(door(2355)), adder(1055.5)));
    // The sheet prices no arch section on a 2-window door, so none is offered there.
    expect(glassTakesInserts("CD", "short", "8", "dsb")).toBe(false);
    expect(glassTakesInserts("CD", "short", "12", "dsb")).toBe(true);
    expect(glassTakesInserts("CD", "short", "16", "rain")).toBe(false);
    expect(q({ style: "inserts", windesign: "ARC1A", width: "8" }).reason).toMatch(/does not grid that style/);
    // Worded as the window it is, not an insert over one.
    expect(q({ style: "inserts", windesign: "ARC1A", width: "16" }).quote?.description)
      .toBe("Clopay Coachman Collection, Model CD, 16'0\" x 7'0\", in the color White, ARC1A windows in the top section, 12″ radius track, galvanized torsion springs, no lock");
    expect(q({ style: "inserts", width: "16" }).quote?.description).toContain("arch windows in the top section");
  });

  it("names a design on the glass top section — ten of them, at no adder (CJ, 12/10/2026)", () => {
    expect(COACHMAN_GLASS_DESIGNS.map((d) => d.id)).toEqual(["ARCH1", "ARCH3", "ARCH4", "ARCH13", "ARCH14", "REC11", "REC13", "REC14", "SQ23", "SQ24"]);
    expect(windowDesigns("CD", "glass", "8")).toEqual(COACHMAN_GLASS_DESIGNS);
    expect(windowDesigns("GD1SP", "glass", "8")).toEqual([]);                    // plain glass names no design elsewhere
    expect(price({ style: "glass", windesign: "REC13" })).toBe(price({ style: "glass" }));
    expect(price({ style: "glass", glassType: "rain", windesign: "SQ24", width: "16" })).toBe(price({ style: "glass", glassType: "rain", width: "16" }));
    expect(q({ style: "glass", windesign: "REC13" }).quote?.description)
      .toContain("in the color White, REC13 double strength b grade windows in the top section, no inserts");
    expect(q({ style: "glass", glassType: "rain", windesign: "ARCH1", width: "16" }).quote?.description)
      .toContain("ARCH1 rain dsb windows in the top section");
    // An arch SECTION id is not a glass design, and a glass design is not an arch section.
    expect(q({ style: "glass", windesign: "ARC1A" }).quote?.description).not.toContain("ARC1A");
    expect(q({ style: "inserts", windesign: "REC13", width: "16" }).quote?.description).toContain("arch windows in the top section");
  });

  it("includes torsion springs at every height — the sheet's ALL TORSION SPRING PRICES", () => {
    expect(torsionIncluded("CD")).toBe(true);
    expect(torsionIncluded("BD1CU")).toBe(false);
    expect(q({}).quote?.torsionIncluded).toBe(true);
  });

  it("is sold with galvanized torsion only (Brandon, 12/10/2026): priced and worded as galvanized whatever is asked", () => {
    expect(galvanizedOnly("CD")).toBe(true);
    expect(galvanizedOnly("BD1CU")).toBe(false);
    expect(galvanizedOnly("GD1LP/GD1SP")).toBe(false);
    const unit = (o: Record<string, unknown>) => q(o).quote!.unitPrice;
    expect(unit({ spring: "galvanized" })).toBe(plus(sell(door(1135)), 5));          // 40 on a single door, less the 35 already in
    expect(unit({ spring: "galvanized", width: "16" })).toBe(plus(sell(door(2127)), 10));
    for (const spring of ["torsion", "extension"]) {
      expect(unit({ spring }), spring).toBe(unit({ spring: "galvanized" }));
      expect(unit({ spring, width: "16" }), spring).toBe(unit({ spring: "galvanized", width: "16" }));
      expect(q({ spring }).quote?.description, spring).toContain(", galvanized torsion springs");
    }
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
      .toBe("Clopay Coachman Collection, Model CD, Design 12, 8'0\" x 7'0\", in the color White, Sandtone overlay, solid no windows, 12″ radius track, galvanized torsion springs, no lock");
    expect(price({ design: "12", overlayColor: "Sandtone" })).toBe(price({}));   // the design and overlay change the words only
    expect(q({ design: "22", width: "12" }).reason).toMatch(/does not build design 22 at 12'0" x 7'0"/);
    expect(q({ design: "21", height: "8.3" }).reason).toMatch(/does not build design 21 at 8'0" x 8'3"/);
    expect(q({ design: "31", style: "glass" }).reason).toMatch(/series 3 and 4 designs with windows — design 31 is solid only/);
    expect(q({ design: "31" }).quote?.description).toContain("Design 31");
    expect(q({ design: "12", style: "glass" }).quote?.description).toContain("Design 12, 8'0\" x 7'0\", in the color White, double strength");
  });

  it("words the line as a Coachman", () => {
    expect(q({}).quote?.description)
      .toBe("Clopay Coachman Collection, Model CD, 8'0\" x 7'0\", in the color White, solid no windows, 12″ radius track, galvanized torsion springs, no lock");
    expect(q({ style: "glass" }).quote?.description).toContain("double strength b grade windows in the top section, no inserts");
  });
});
