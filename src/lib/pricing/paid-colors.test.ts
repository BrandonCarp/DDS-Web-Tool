import { describe, it, expect } from "vitest";
import { specialDoorQuote } from "./data/special-door-pricing";
import { colorKeyFor, colorTakesPremium, specialOrderColors, COLORS } from "./data/catalog-meta";
import { sheetUltraGrain, doorMargin } from "./data/so-glass";
import { PREMIUM_GROUPS, PREMIUM_ULTRA_GRAIN } from "./data/premium-glass";
import { hasGrid } from "./data/special-door-pricing";

const CYPRESS = ["Ultra-Grain Cypress Medium Finish", "Ultra-Grain Cypress Cherry Finish", "Ultra-Grain Cypress Walnut Finish", "Ultra-Grain Cypress Slate Finish"];
const LUSTRA = ["Lustra Black", "Lustra Charcoal", "Lustra Silver"];
const PLANK = ["Ultra-Grain Plank Coastal Gray Finish", "Ultra-Grain Plank Natural Finish", "Ultra-Grain Plank Cedar Finish", "Ultra-Grain Plank Kona Finish", "Ultra-Grain Plank Barnwood Finish", "Ultra-Grain Plank Espresso Finish"];

/** Brandon's list of 20/10/2026: the paid colours each model takes, and the group it is quoted under. */
const PAID: [string, string, string[]][] = [
  ["9208", "9208/9209", ["Iron Ore", ...LUSTRA, ...CYPRESS, ...PLANK]],
  ["9209", "9208/9209", ["Iron Ore", ...LUSTRA, ...CYPRESS]],
  ["9202", "9200/9201/9202/9203/9205", ["Iron Ore", ...CYPRESS]],
  ["9205", "9200/9201/9202/9203/9205", ["Iron Ore", ...CYPRESS]],
  ["4301", "4300/4301/4302/4305/4310", ["Iron Ore", ...CYPRESS]],
  ["4305", "4300/4301/4302/4305/4310", ["Iron Ore", ...CYPRESS]],
  ["4308", "4308/4309", ["Iron Ore", ...CYPRESS]],
  ["4132", "4050/4051/4053/4132", CYPRESS],
  ["9201", "9200/9201/9202/9203/9205", ["Iron Ore"]],
  ["9131", "9130/9131/9132/9133", ["Iron Ore"]],
  ["9132", "9130/9131/9132/9133", ["Iron Ore"]],
  ["9138", "9138", ["Iron Ore"]],
  ["9139", "9139", ["Iron Ore"]],
  ["4138", "4138", ["Iron Ore"]],
];

const quote = (group: string, member: string, color: string, width = "8", height = "7") =>
  specialDoorQuote({ model: group, variant: member, width, height, style: "solid", color, track: "r12", spring: "extension", lock: "none" }).quote?.unitPrice;

describe("the paid colours by model (Brandon, 20/10/2026)", () => {
  it("offers every paid colour on its model, as a premium colour", () => {
    for (const [model, , paid] of PAID) {
      const key = colorKeyFor(model);
      expect(key, model).not.toBeNull();
      const offered = specialOrderColors(key!);
      for (const c of paid) {
        expect(offered, `${model} ${c}`).toContain(c);
        expect(colorTakesPremium(key!, c), `${model} ${c}`).toBe(true);
      }
      // The paint colours too, White first.
      expect(offered[0], model).toBe("White");
      expect(offered.length, model).toBeGreaterThan(paid.length + 5);
    }
  });

  it("charges each paid colour the sheet's ULTRA COLOR block over the paint colours, single or double, lifted by the group's margin", () => {
    for (const [model, group, paid] of PAID) {
      if (!hasGrid(group)) continue;                                   // the 9138 and 9139 price on a typed total
      const ug = sheetUltraGrain(group)!;
      expect(ug, group).toBeTruthy();
      const lift = (cost: number) => Math.round((cost / (1 - (doorMargin(group) ?? 0) / 100)) * 100) / 100;
      const white = quote(group, model, "White")!;
      for (const c of paid) {
        expect(quote(group, model, c), `${model} ${c}`).toBeCloseTo(white + lift(ug.upTo8ft.single), 2);
      }
      // A double door over 8'0" takes the other band.
      const wide = griddedDouble(group);
      if (wide) expect(quote(group, model, paid[0], wide, "8.2"), `${model} double`).toBeCloseTo(quote(group, model, "White", wide, "8.2")! + lift(ug.over8ft.double), 2);
    }
  });

  it("charges a member its group's premium where it has no list of its own — the 9203 the 9200's, the 4310 the 4300's", () => {
    expect(quote("9200/9201/9202/9203/9205", "9203", "Iron Ore")).toBeCloseTo(quote("9200/9201/9202/9203/9205", "9200", "Iron Ore")!, 2);
    expect(quote("9200/9201/9202/9203/9205", "9203", "Iron Ore")!).toBeGreaterThan(quote("9200/9201/9202/9203/9205", "9203", "White")!);
    expect(colorKeyFor("4310")).toBe("4300");
    expect(colorKeyFor("4301")).toBe("4301");
    expect(colorKeyFor("9203")).toBeNull();
  });

  it("keeps the paint colours its family's: the 9202 the 9200's, the 4301 the 4300's, the 4132 the 4050's, the 9138 the 4138's", () => {
    const paint = (key: string) => COLORS[key].filter((c) => !colorTakesPremium(key, c));
    expect(paint("9202")).toEqual(paint("9200"));
    expect(paint("9131")).toEqual(paint("9130-9133"));
    expect(paint("4301")).toEqual(paint("4300"));
    expect(paint("4132")).toEqual(paint("4050-4051-4053"));
    expect(paint("9138")).toEqual(paint("4138"));
    // The 4132 takes no Iron Ore; the 4050 family takes no premium colour at all.
    expect(specialOrderColors("4132")).not.toContain("Iron Ore");
    expect(specialOrderColors("4050-4051-4053").some((c) => colorTakesPremium("4050-4051-4053", c))).toBe(false);
  });

  it("prices the 4132's Cypress finishes off the block every Premium Steel sheet carries, which is one block", () => {
    const blocks = Object.entries(PREMIUM_ULTRA_GRAIN);
    const first = blocks[0][1];
    expect(blocks.map(([g]) => g)).toEqual(PREMIUM_GROUPS.filter((g) => g !== "4050/4051/4053/4132"));   // CJ's 4050 sheet has none
    for (const [g, b] of blocks) expect(b, g).toEqual(first);
    expect(sheetUltraGrain("4050/4051/4053/4132")).toEqual(first);
    // The 4132 is not stocked: the sheet's 747.62 (the stocked 4050 is the stock book's 723.25 at this size, 21/10/2026).
    expect(quote("4050/4051/4053/4132", "4132", "White")).toBe(747.62);
    expect(quote("4050/4051/4053/4132", "4050", "White")).toBe(723.25);
    expect(quote("4050/4051/4053/4132", "4132", CYPRESS[0])).toBeCloseTo(747.62 + Math.round((first.upTo8ft.single / 0.57) * 100) / 100, 2);
  });
});

/** A double-door width the group grids at 8'2" high, for the double band. */
function griddedDouble(group: string): string | null {
  for (const w of ["16", "18"]) if (specialDoorQuote({ model: group, variant: group.split("/")[0], width: w, height: "8.2", style: "solid", color: "White", track: "r12", spring: "extension", lock: "none" }).quote) return w;
  return null;
}
