import { describe, expect, it } from "vitest";
import {
  specialDoorQuote, offeredHeights, griddedWidths, griddedHeights, windowsOfferedAt, minWidthFor, excludedWidthsFor,
} from "./data/special-door-pricing";
import { SPECIAL_DOORS } from "./data/special-doors";
import { glassOptionsFor, glassTakesInserts, panelStylesFor, isSheetGroup } from "./data/so-glass";
import { BRIDGEPORT_GLASS, BRIDGEPORT_GROUPS, BRIDGEPORT_ULTRA_GRAIN } from "./data/bridgeport-glass";
import { SPECIAL } from "./data/special-orders";
import { specialOrderColors } from "./data/catalog-meta";
import { BRIDGEPORT_INLAY_DESIGNS, designsBuilt, designsFor, hasDesigns, secondColorName, secondColors, secondColorPricedAs } from "./data/door-designs";

// Figures straight off the Bridgeport workbook (BRIDGEPORT_3_LAYER.xlsx,
// 9/10/2026): DDS cost is Clopay list x the sheet's multiplier x 0.99 / (1 -
// 0.0265), and the grid holds that at the group's door margin. Each group's
// margin is the one special-orders.ts carries; a test below keeps them in step.
const K = 0.99 / (1 - 0.0265);
const margin = (group: string) => SPECIAL["Bridgeport Collection"].models![group].door;
const sellAt = (group: string, cost: number) => Math.round((cost / (1 - margin(group) / 100)) * 100) / 100;
// The script lifts the sheet's unrounded cost, so the door figure is exact to
// the cent; a glass adder is rounded to cents on its own before the lift. No
// flat on a Bridgeport: the $15 is the Coachman's only (Brandon, 12/10/2026).
const cost = (list: number, mult: number) => list * mult * K;
const glass = (list: number, mult: number) => list * mult * K;
const cents = (list: number, mult: number) => Math.round(list * mult * K * 100) / 100;

const q = (o: Record<string, unknown>) => specialDoorQuote({
  model: "BD1EU/BD1NU", variant: "BD1NU", width: "8", height: "7", color: "White", style: "solid",
  track: "r12", spring: "extension", lock: "none", ...o,
} as never);
const price = (o: Record<string, unknown>) => {
  const r = q(o);
  if (!r.quote) throw new Error(r.reason);
  return r.quote.unitPrice;
};

describe("Bridgeport Steel special order grids (workbook of 12/10/2026)", () => {
  it("prices every group off its list and multiplier", () => {
    // BD1NU/BD1EU: list x .898. 8'0" x 7' is list 569.
    expect(price({})).toBe(sellAt("BD1EU/BD1NU", cost(569, 0.898)));
    expect(price({ width: "8.2" })).toBe(sellAt("BD1EU/BD1NU", cost(712, 0.898)));         // 8'2" to 8'10"
    expect(price({ width: "18", height: "9" })).toBe(sellAt("BD1EU/BD1NU", cost(2174, 0.898)));
    // BD2NU/BD2EU: the same widths, list x .823, out to 20'0".
    expect(price({ model: "BD2EU/BD2NU", variant: "BD2NU" })).toBe(sellAt("BD2EU/BD2NU", cost(704, 0.823)));
    expect(price({ model: "BD2EU/BD2NU", variant: "BD2EU", width: "20", height: "10" })).toBe(sellAt("BD2EU/BD2NU", cost(2813, 0.823)));
    // The C designs: their own list, x 1.091, 7 and 8 ft only.
    expect(price({ model: "BD1CU", variant: "BD1CU" })).toBe(sellAt("BD1CU", cost(1000, 1.091)));
    expect(price({ model: "BD2CU", variant: "BD2CU", width: "16", height: "8" })).toBe(sellAt("BD2CU", cost(2410, 1.091)));
  });

  it("grids 7 to 10 ft on the N and E designs, 7 and 8 ft only on the C", () => {
    expect(griddedHeights("BD1EU/BD1NU")).toEqual(["7", "8", "9", "10"]);
    expect(griddedHeights("BD2EU/BD2NU")).toEqual(["7", "8", "9", "10"]);
    expect(griddedHeights("BD1CU")).toEqual(["7", "8"]);
    expect(offeredHeights("BD2CU").slice(-1)[0]).toBe("8");
    expect(offeredHeights("BD1EU/BD1NU")).toContain("10");
    expect(q({ model: "BD1CU", variant: "BD1CU", height: "9" }).reason).toMatch(/Only .* are gridded/);
  });

  it("includes torsion at 9 ft and up on the tall grids", () => {
    const r = q({ width: "9", height: "9", spring: "torsion" });
    expect(r.quote?.torsionIncluded).toBe(true);
    expect(r.quote?.unitPrice).toBe(sellAt("BD1EU/BD1NU", cost(1046, 0.898)));
    expect(q({ width: "9", height: "9", spring: "galvanized" }).quote?.unitPrice).toBe(sellAt("BD1EU/BD1NU", cost(1046, 0.898)));
    expect(q({ width: "9", height: "8", spring: "torsion" }).quote?.unitPrice).toBe(sellAt("BD1EU/BD1NU", cost(750, 0.898)) + 55);
  });

  it("builds the BD2NU from 6'2\" and everything else from 7'8\", as CJ's sheet has it", () => {
    expect(minWidthFor("BD2NU")).toBe("6.2");
    for (const m of ["BD1NU", "BD1EU", "BD1CU", "BD2EU", "BD2CU"]) expect(minWidthFor(m), m).toBe("7.8");
    expect(griddedWidths("BD2EU/BD2NU", undefined, "BD2NU")[0]).toBe("6.2");
    expect(griddedWidths("BD2EU/BD2NU", undefined, "BD2EU")[0]).toBe("7.8");
    expect(q({ width: "7" }).reason).toMatch(/not built narrower than 7'8"/);
  });

  it("skips the widths Clopay does not build: 10'2\" through 11'4\", and 14'8\"", () => {
    const skipped = ["10.2", "10.4", "10.6", "10.8", "10.10", "11", "11.2", "11.4", "14.8"];
    for (const m of ["BD1NU", "BD1EU", "BD1CU", "BD2NU", "BD2EU", "BD2CU"]) expect(excludedWidthsFor(m), m).toEqual(skipped);
    const widths = griddedWidths("BD1EU/BD1NU", "7", "BD1NU");
    for (const w of skipped) expect(widths, w).not.toContain(w);
    expect(widths).toContain("10");
    expect(widths).toContain("11.6");
    expect(q({ width: "10.8" }).reason).toMatch(/not built at 10'8"/);
    expect(q({ width: "14.8", model: "BD2CU", variant: "BD2CU" }).reason).toMatch(/not built at 14'8"/);
  });

  it("prices the BD1 pair's 12'0\" and the BD2 pair's 9'2\"-9'10\" at 7 ft off CJ's corrections of 12/10/2026", () => {
    // 12'0" at 7FT on the BD1 pair reads 816 on CJ's sheet (Clopay's book has
    // 846 for the U models; the app goes by his sheet — Brandon, 12/10/2026).
    // The BD2 7FT list at 9'2"-9'10" read 882, the row above copied down; CJ
    // corrected it to 991.
    expect(q({ width: "12" }).quote?.unitPrice).toBe(sellAt("BD1EU/BD1NU", cost(816, 0.898)));
    expect(q({ width: "11.6" }).quote?.unitPrice).toBe(sellAt("BD1EU/BD1NU", cost(944, 0.898)));
    expect(q({ width: "12", height: "8" }).quote?.unitPrice).toBe(sellAt("BD1EU/BD1NU", cost(1008, 0.898)));
    expect(q({ width: "12", height: "9" }).quote?.unitPrice).toBe(sellAt("BD1EU/BD1NU", cost(1452, 0.898)));
    for (const w of ["9.2", "9.4", "9.10"]) {
      expect(q({ model: "BD2EU/BD2NU", variant: "BD2NU", width: w, height: "7" }).quote?.unitPrice, w)
        .toBe(sellAt("BD2EU/BD2NU", cost(991, 0.823)));
    }
    expect(q({ model: "BD2EU/BD2NU", variant: "BD2NU", width: "9.4", height: "8" }).quote?.unitPrice)
      .toBe(sellAt("BD2EU/BD2NU", cost(1224, 0.823)));
  });

  it("is solid only at 14'10\" and 15'4\", on every design", () => {
    for (const m of ["BD1NU", "BD1EU", "BD1CU", "BD2NU", "BD2EU", "BD2CU"]) {
      expect(windowsOfferedAt(m, "14.10"), m).toBe(false);
      expect(windowsOfferedAt(m, "15.4"), m).toBe(false);
      expect(windowsOfferedAt(m, "15"), m).toBe(true);
    }
    expect(q({ width: "14.10" }).quote?.unitPrice).toBe(sellAt("BD1EU/BD1NU", cost(1163, 0.898)));
    expect(q({ width: "14.10", style: "glass" }).reason).toMatch(/solid only/);
  });
});

describe("Bridgeport glass", () => {
  it("is a sheet-priced group, with the Gallery's fifteen types plus 1/8\" tempered, and no single strength", () => {
    for (const g of BRIDGEPORT_GROUPS) expect(isSheetGroup(g), g).toBe(true);
    expect(isSheetGroup("4050/4051/4053")).toBe(false);
    const ids = glassOptionsFor("BD1EU/BD1NU", "short", "8").map((g) => g.id);
    expect(ids).toHaveLength(16);
    expect(ids[0]).toBe("dsb");
    expect(ids).toContain("tempered"); // the block CJ's workbook added on 12/10/2026, Bridgeport only
    expect(ids).not.toContain("ssb");
    expect(glassOptionsFor("GD1LP/GD1SP", "short", "8").map((g) => g.id)).not.toContain("tempered");
    // 65 list a window, like obscure; the sheet's 6-window line is corrected to 6 x 65 as obscure's is.
    expect(BRIDGEPORT_GLASS["BD2CU"].tempered.short[1]).toEqual({ lo: 138, hi: 174, windows: 6, glass: cents(390, 1.091), inserts: cents(480, 1.091) });
  });

  it("prices double strength as the base glass at the sheet's per-window figure, inserts on top", () => {
    // 8'0" short: 4 windows at 55 list, 70 with inserts, x .898 on the N/E sheets.
    expect(price({ style: "glass" })).toBeCloseTo(sellAt("BD1EU/BD1NU", cost(569, 0.898) + glass(220, 0.898)), 1);
    expect(price({ style: "inserts" })).toBeCloseTo(sellAt("BD1EU/BD1NU", cost(569, 0.898) + glass(280, 0.898)), 1);
    expect(price({ style: "glass", glassType: "dsb" })).toBe(price({ style: "glass" }));
  });

  it("prices the C designs' glass at their own 1.091, like their doors", () => {
    const solid = price({ model: "BD1CU", variant: "BD1CU" });
    expect(price({ model: "BD1CU", variant: "BD1CU", style: "glass" }) - solid).toBeCloseTo(sellAt("BD1CU", glass(220, 1.091)), 1);
    expect(BRIDGEPORT_GLASS["BD1CU"].dsb.short[0]).toEqual({ lo: 92, hi: 120, windows: 4, glass: 244.09, inserts: 310.66 });
    expect(BRIDGEPORT_GLASS["BD1EU/BD1NU"].dsb.short[0]).toEqual({ lo: 92, hi: 120, windows: 4, glass: 200.91, inserts: 255.70 });
  });

  it("offers short or long windows on every design from 7'8\", a free choice", () => {
    expect(panelStylesFor("BD1EU/BD1NU", "7.8")).toEqual(["short", "long"]);
    expect(panelStylesFor("BD1CU", "16")).toEqual(["short", "long"]);
    expect(panelStylesFor("BD2EU/BD2NU", "20")).toEqual(["short", "long"]);
    // Long windows: half the count at the same per-window money, so 16'0"
    // long (4 windows, 110 each) and short (8 at 55) come to the same.
    const w16 = { model: "BD2EU/BD2NU", variant: "BD2EU", width: "16", height: "8", style: "glass" as const, glassType: "insulated" };
    expect(price({ ...w16, panelStyle: "long" })).toBe(price({ ...w16, panelStyle: "short" }));
    // The glass goes at the door's multiplier — .823 on the BD2 pair (12/10/2026).
    expect(price({ ...w16, panelStyle: "short" })).toBeCloseTo(sellAt("BD2EU/BD2NU", cost(1577, 0.823) + glass(544, 0.823)), 1);
  });

  it("has no window price under 7'8\" — a narrow BD2NU is solid only", () => {
    expect(panelStylesFor("BD2EU/BD2NU", "7")).toEqual([]);
    expect(q({ model: "BD2EU/BD2NU", variant: "BD2NU", width: "7" }).quote?.unitPrice).toBe(sellAt("BD2EU/BD2NU", cost(814, 0.823)));
    expect(q({ model: "BD2EU/BD2NU", variant: "BD2NU", width: "7", style: "glass" }).reason).toMatch(/no windows .* solid only/);
  });

  it("gives acrylic no inserts, and reads the obscure 6-window line at 6 x 65", () => {
    expect(glassTakesInserts("BD1EU/BD1NU", "short", "8", "acrylic")).toBe(false);
    expect(glassTakesInserts("BD2CU", "long", "8", "seeded")).toBe(true);
    expect(q({ style: "inserts", glassType: "acrylic" }).reason).toMatch(/not offered/);
    // 6 x 65 = 390 list: CJ corrected OBSCURE's line; the TEMPERED copy of it is carried the same way.
    expect(BRIDGEPORT_GLASS["BD1EU/BD1NU"].obscure.short[1]).toEqual({ lo: 138, hi: 174, windows: 6, glass: cents(390, 0.898), inserts: cents(480, 0.898) });
    expect(BRIDGEPORT_GLASS["BD2EU/BD2NU"].obscure.short[1]).toEqual({ lo: 138, hi: 174, windows: 6, glass: cents(390, 0.823), inserts: cents(480, 0.823) });
  });

  it("matches the sheet on every band: glass is the per-window figure times the count", () => {
    for (const [group, types] of Object.entries(BRIDGEPORT_GLASS)) {
      for (const [id, panels] of Object.entries(types)) {
        const perShort = panels.short[0].glass / panels.short[0].windows;
        for (const panel of ["short", "long"] as const) {
          for (const b of panels[panel]) {
            const units = panel === "long" ? b.windows * 2 : b.windows; // a long window is two short ones
            expect(Math.abs(b.glass - perShort * units), `${group} ${id} ${panel} ${b.lo}-${b.hi}`).toBeLessThan(0.05);
          }
        }
      }
    }
  });
});

describe("the Bridgeport grids and their margins agree", () => {
  it("were generated at the margins the catalogue carries", () => {
    // 8'0" x 7' on each grid: the sheet's cost at the margin special-orders.ts
    // holds today. Change a margin without re-running the script and this says so.
    expect(SPECIAL_DOORS["BD1EU/BD1NU"]["7"]["8"].solid).toBe(sellAt("BD1EU/BD1NU", cost(569, 0.898)));
    expect(SPECIAL_DOORS["BD2EU/BD2NU"]["7"]["8"].solid).toBe(sellAt("BD2EU/BD2NU", cost(704, 0.823)));
    expect(SPECIAL_DOORS["BD1CU"]["7"]["8"].solid).toBe(sellAt("BD1CU", cost(1000, 1.091)));
    expect(SPECIAL_DOORS["BD2CU"]["7"]["8"].solid).toBe(sellAt("BD2CU", cost(1135, 1.091)));
  });
});

describe("Bridgeport Ultra-Grain", () => {
  it("is the Gallery's adder on every group, single to 10'0\" and double from 10'2\"", () => {
    for (const g of ["BD1EU/BD1NU", "BD2EU/BD2NU"]) {
      expect(BRIDGEPORT_ULTRA_GRAIN[g]).toEqual({ upTo8ft: { single: 158.76, double: 317.53 }, over8ft: { single: 264.61, double: 529.22 } });
    }
    const ug = (w: string, h: string) => price({ width: w, height: h, color: "Ultra-Grain Oak Dark Finish" }) - price({ width: w, height: h });
    expect(ug("10", "8")).toBeCloseTo(sellAt("BD1EU/BD1NU", 158.76), 2);
    expect(ug("16", "8")).toBeCloseTo(sellAt("BD1EU/BD1NU", 317.53), 2);
    expect(ug("8", "8.3")).toBeCloseTo(sellAt("BD1EU/BD1NU", 264.61), 2);
    expect(price({ color: "Almond" })).toBe(price({}));
  });

  it("lists the Ultra-Grain finishes on the special order colour list for every group", () => {
    for (const key of ["BD1EU-BD1NU", "BD1CU", "BD2EU-BD2NU", "BD2CU"]) {
      expect(specialOrderColors(key), key).toContain("Ultra-Grain Oak Medium Finish");
      expect(specialOrderColors(key), key).toContain("White");
    }
  });
});

describe("Bridgeport wording", () => {
  it("names the collection and the design, as a Gallery line does", () => {
    expect(q({}).quote?.description).toBe(
      `Clopay Bridgeport Collection, Model BD1NU, 8'0" x 7'0", in the color White, solid no windows, 12″ radius track, extension springs, no lock`,
    );
    expect(q({ variant: "BD1EU", style: "glass" }).quote?.description)
      .toContain("Model BD1EU, 8'0\" x 7'0\", in the color White, double strength b grade windows in the top section, no inserts");
    expect(q({ model: "BD2CU", variant: "BD2CU", style: "inserts", glassType: "insulated", windesign: "ARCH1GRILLE" }).quote?.description)
      .toContain("Model BD2CU, 8'0\" x 7'0\", in the color White, insulated windows in the top section, Arch 1 Grille inserts");
  });

  it("names the plain window the Gallery and Bridgeport share — short, long or arch (Brandon, 14/10/2026)", () => {
    const line = (o: Record<string, unknown>) => q({ style: "glass", glassType: "dsb", ...o }).quote?.description;
    expect(line({ panelStyle: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 16"' }))
      .toContain('double strength b grade windows in the top section, plain short 19-1/2" x 16", no inserts');
    expect(line({ panelStyle: "long", plainWindow: 'PLAIN LONG 42" X 16"' }))
      .toContain('windows in the top section, plain long 42" x 16", no inserts');
    expect(line({ panelStyle: "long", plainWindow: "PLAIN ARCH 1" })).toContain("windows in the top section, plain arch 1, no inserts");
    expect(line({ panelStyle: "long", plainWindow: "Arch 2 Plain" })).toContain("windows in the top section, arch 2 plain, no inserts");
    // A window the door does not name is not written.
    expect(line({ panelStyle: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 12"' })).toContain("windows in the top section, no inserts");
    // The same on a Gallery door; the short window is priced at its short band.
    const gd = (o: Record<string, unknown>) => specialDoorQuote({
      model: "GD2LU/GD2SU", variant: "GD2SU", width: "8", height: "7", color: "White", style: "glass", glassType: "dsb",
      track: "r12", spring: "extension", lock: "none", ...o,
    } as never).quote!;
    expect(gd({ panelStyle: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 16"' }).description)
      .toContain('Model GD2SU, 8\'0" x 7\'0", in the color White, double strength b grade windows in the top section, plain short 19-1/2" x 16", no inserts');
    expect(gd({ panelStyle: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 16"' }).unitPrice).toBe(gd({ panelStyle: "short" }).unitPrice);
    expect(gd({ panelStyle: "long", plainWindow: 'PLAIN LONG 42" X 16"' }).unitPrice).toBe(gd({ panelStyle: "long" }).unitPrice);
  });
});

describe("Bridgeport Inlay designs and inlay colour (Brandon, 12/10/2026)", () => {
  const cu = (o: Record<string, unknown>) => q({ model: "BD1CU", variant: "BD1CU", ...o });

  it("offers designs A, V and X on the BD1CU and BD2CU at every size, and none on the N and E designs", () => {
    expect(BRIDGEPORT_INLAY_DESIGNS).toEqual(["A", "V", "X"]);
    for (const g of ["BD1CU", "BD2CU"]) {
      expect(hasDesigns(g), g).toBe(true);
      expect(designsFor(g), g).toEqual(["A", "V", "X"]);
      expect(designsBuilt(g, "18", "8"), g).toEqual(["A", "V", "X"]);
      expect(secondColorName(g), g).toBe("inlay");
    }
    for (const g of ["BD1EU/BD1NU", "BD2EU/BD2NU", "GD1LP/GD1SP"]) {
      expect(hasDesigns(g), g).toBe(false);
      expect(secondColorName(g), g).toBeNull();
    }
    // The inlay comes in the door's paint colours, then the four oaks; the door's own Ultra-Grain names are not inlay colours.
    expect(secondColors("BD1CU", specialOrderColors("BD1CU"))).toEqual([
      "White", "Almond", "Sandtone", "Desert Tan", "Chocolate Brown", "Bronze", "Mocha Brown", "Charcoal", "Iron Ore", "Black",
      "Medium Oak", "Dark Oak", "Walnut Oak", "Slate Oak",
    ]);
  });

  it("prices the door at the dearer of its two colours: a premium inlay on a standard door carries the adder", () => {
    const white = cu({ design: "A", overlayColor: "White" }).quote!.unitPrice;
    const ironOre = cu({ design: "A", color: "Iron Ore", overlayColor: "Iron Ore" }).quote!.unitPrice;
    expect(ironOre).toBeGreaterThan(white);
    expect(cu({ design: "A", color: "White", overlayColor: "Iron Ore" }).quote!.unitPrice).toBe(ironOre);
    expect(cu({ design: "A", color: "Iron Ore", overlayColor: "White" }).quote!.unitPrice).toBe(ironOre);
    expect(cu({ design: "A", color: "White", overlayColor: "Charcoal" }).quote!.unitPrice).toBe(white);
  });

  it("names the design and the inlay on the line, at no adder, and refuses a design it does not have", () => {
    expect(cu({ design: "A", overlayColor: "White" }).quote?.description).toBe(
      `Clopay Bridgeport Collection, Model BD1CU, Design A, 8'0" x 7'0", in the color White, inlay in the color White, solid no windows, 12″ radius track, extension springs, no lock`,
    );
    expect(cu({ design: "X", overlayColor: "Charcoal", style: "glass" }).quote?.description)
      .toContain("Model BD1CU, Design X, 8'0\" x 7'0\", in the color White, inlay in the color Charcoal, double strength");
    expect(cu({ design: "A", overlayColor: "Charcoal" }).quote?.unitPrice).toBe(cu({}).quote?.unitPrice);
    expect(cu({ design: "12" }).reason).toMatch(/does not build design 12/);
    // A design on a door without them is left off the line.
    expect(q({ design: "A", overlayColor: "White" }).quote?.description).not.toContain("Design");
  });

  it("adds torsion at 55 on a single door and 75 on a double on every Bridgeport, galvanized the same (Brandon, 12/10/2026)", () => {
    for (const [g, v] of [["BD1CU", "BD1CU"], ["BD2CU", "BD2CU"], ["BD1EU/BD1NU", "BD1NU"], ["BD2EU/BD2NU", "BD2EU"]]) {
      const at = (spring: string, o: Record<string, unknown> = {}) => q({ model: g, variant: v, spring, ...o }).quote!.unitPrice;
      expect(at("torsion"), g).toBe(at("extension") + 55);
      expect(at("galvanized"), g).toBe(at("extension") + 55);
      expect(at("torsion", { width: "16" }), g).toBe(at("extension", { width: "16" }) + 75);
      expect(at("galvanized", { width: "16" }), g).toBe(at("extension", { width: "16" }) + 75);
      expect(q({ model: g, variant: v, spring: "torsion" }).quote?.description, g).toContain(", torsion springs");
      expect(q({ model: g, variant: v, spring: "galvanized" }).quote?.description, g).toContain(", galvanized torsion springs");
    }
  });

  it("offers the four oak finishes as inlay colours, each priced as the door's Ultra-Grain finish", () => {
    const colors = secondColors("BD1CU", specialOrderColors("BD1CU"));
    expect(colors.slice(-4)).toEqual(["Medium Oak", "Dark Oak", "Walnut Oak", "Slate Oak"]);
    expect(colors).not.toContain("Ultra-Grain Oak Medium Finish");
    expect(secondColorPricedAs("Medium Oak")).toBe("Ultra-Grain Oak Medium Finish");
    expect(secondColorPricedAs("Charcoal")).toBe("Charcoal");
    const white = cu({ design: "A", overlayColor: "White" }).quote!.unitPrice;
    const ug = cu({ design: "A", color: "Ultra-Grain Oak Medium Finish", overlayColor: "Medium Oak" }).quote!.unitPrice;
    expect(ug).toBeGreaterThan(white);
    expect(cu({ design: "A", color: "White", overlayColor: "Medium Oak" }).quote!.unitPrice).toBe(ug);
    expect(cu({ design: "A", color: "White", overlayColor: "Slate Oak" }).quote?.description).toContain("in the color White, inlay in the color Slate Oak");
  });
});
