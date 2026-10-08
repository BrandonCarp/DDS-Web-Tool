import { describe, expect, it } from "vitest";
import { specialDoorQuote, offeredHeights, griddedWidths, griddedHeights } from "./data/special-door-pricing";
import { SPECIAL_DOORS } from "./data/special-doors";
import { glassOptionsFor, glassTakesInserts, panelStylesFor, GALLERY_GROUP } from "./data/so-glass";
import { GALLERY_GLASS, GALLERY_ULTRA_GRAIN } from "./data/gallery-glass";

// Figures straight off Brandon's Gallery sheet, PRICING 10-8.xlsx (DDS cost),
// at the Gallery door margin of 43%: sell = cost / 0.57, each part rounded.
const M = 0.57;
const sell = (cost: number) => Math.round((cost / M) * 100) / 100;

const q = (o: Record<string, unknown>) => specialDoorQuote({
  model: GALLERY_GROUP, variant: "GD1SP", width: "8", height: "7", color: "White", style: "solid",
  track: "r12", spring: "extension", lock: "none", ...o,
} as never);
const price = (o: Record<string, unknown>) => {
  const r = q(o);
  if (!r.quote) throw new Error(r.reason);
  return r.quote.unitPrice;
};

describe("Gallery GD1SP/GD1LP special order grid (8/10/2026)", () => {
  it("prices the solid door off the width band, by height tier", () => {
    expect(price({})).toBe(sell(454.81));                       // 8'0" x 7'
    expect(price({ width: "8.2" })).toBe(sell(569.12));          // 8'2" to 8'10" band
    expect(price({ width: "16", height: "8" })).toBe(sell(1027.13));
    expect(price({ width: "15.6", height: "8" })).toBe(sell(1002.35)); // the corrected F22
    expect(price({ width: "9", height: "9" })).toBe(sell(836.09));
    expect(price({ width: "9", height: "10" })).toBe(sell(836.09)); // 9 and 10 ft share a column
  });

  it("grids 7, 8, 9 and 10 ft, and offers heights to 10'0\"", () => {
    expect(griddedHeights(GALLERY_GROUP)).toEqual(["7", "8", "9", "10"]);
    expect(offeredHeights(GALLERY_GROUP)).toContain("10");
    expect(Object.keys(SPECIAL_DOORS[GALLERY_GROUP]["7"])).toHaveLength(73); // 6'0" to 18'0" by 2"
  });

  it("includes torsion at 9 ft and up, with nothing added for picking it", () => {
    const r = q({ width: "9", height: "9", spring: "torsion" });
    expect(r.quote?.torsionIncluded).toBe(true);
    expect(r.quote?.unitPrice).toBe(sell(836.09));
    expect(q({ width: "9", height: "8", spring: "torsion" }).quote?.unitPrice).toBe(sell(599.49) + 35);
  });

  it("builds the GD1SP from 6'2\" and the GD1LP from 7'8\"", () => {
    expect(griddedWidths(GALLERY_GROUP, undefined, "GD1SP")[0]).toBe("6.2");
    expect(griddedWidths(GALLERY_GROUP, undefined, "GD1LP")[0]).toBe("7.8");
    expect(q({ variant: "GD1LP", width: "7" }).reason).toMatch(/not built narrower than 7'8"/);
  });
});

describe("Gallery glass", () => {
  it("adds up the options the way the sheet does: 8x7 GD1SP, insulated with inserts, Ultra-Grain", () => {
    // Brandon's example: base 454.81 + insulated/inserts 265.37 (4 windows), then
    // Ultra-Grain single, up to 8ft, 158.76 — each lifted by the margin. The
    // door and its glass are lifted together, the finish on its own, so the
    // cents can differ from one lift of the whole by a couple of pennies.
    const got = price({ style: "inserts", glassType: "insulated", color: "Ultra-Grain Oak Medium Finish" });
    expect(got).toBeCloseTo(sell(454.81) + sell(265.37) + sell(158.76), 0);
    expect(got).toBe(1542.02);
  });

  it("words the line as the stock tab does: the grade, then the design or NO INSERTS", () => {
    expect(q({ style: "glass" }).quote?.description).toContain("double strength b grade windows in the top section, no inserts");
    expect(q({ style: "inserts", glassType: "insulated", windesign: "ARCH1GRILLE" }).quote?.description)
      .toContain("insulated windows in the top section, Arch 1 Grille inserts");
    expect(q({ style: "inserts" }).quote?.description).toContain("double strength b grade windows in the top section, no inserts");
  });

  it("prices double strength as the base glass, with inserts on top", () => {
    expect(price({ style: "glass" })).toBe(sell(454.81 + 175.85));
    expect(price({ style: "inserts" })).toBe(sell(454.81 + 223.81));
    expect(price({ style: "glass", glassType: "dsb" })).toBe(price({ style: "glass" }));
  });

  it("prices long panel glass at the GD1LP figure and short at the GD1SP's, whichever model is picked", () => {
    // 12'0" insulated: the GD1SP table says 6 short windows, 326.12; the GD1LP
    // table says 3 long, 326.13 — a penny apart on the sheet, so the two tables
    // can be told apart by the cents.
    expect(price({ width: "12", style: "glass", glassType: "insulated", panelStyle: "short" })).toBe(sell(652.25 + 326.12));
    expect(price({ width: "12", style: "glass", glassType: "insulated", panelStyle: "long" })).toBe(sell(652.25 + 326.13));
    expect(price({ width: "12", style: "glass", glassType: "insulated", panelStyle: "long", variant: "GD1LP" })).toBe(sell(652.25 + 326.13));
    expect(price({ width: "12", style: "glass", glassType: "insulated", panelStyle: "short", variant: "GD1LP" })).toBe(sell(652.25 + 326.12));
    // Long panel inserts ride on the long glass: the GD1LP inserts column
    // (398.06 on both tables at 12'0", so the cents cannot tell them apart;
    // the adder is rounded before the lift, hence toBeCloseTo).
    expect(price({ width: "12", style: "inserts", glassType: "insulated", panelStyle: "long" })).toBeCloseTo(sell(652.25 + 398.06), 0);
    // Up to 7'6" only short windows are built (3 of them); no panel choice yet.
    expect(price({ width: "7.6", style: "glass", glassType: "insulated" })).toBe(sell(526.75 + 163.06));
  });

  it("offers long panels from 7'8\" and short only below", () => {
    expect(panelStylesFor(GALLERY_GROUP, "7.6")).toEqual(["short"]);
    expect(panelStylesFor(GALLERY_GROUP, "7.8")).toEqual(["short", "long"]);
    expect(panelStylesFor(GALLERY_GROUP, "18")).toEqual(["short", "long"]);
  });

  it("offers all fifteen types, double strength first, and no inserts on acrylic", () => {
    const ids = glassOptionsFor(GALLERY_GROUP, "short", "8").map((g) => g.id);
    expect(ids).toHaveLength(15);
    expect(ids[0]).toBe("dsb");
    expect(glassTakesInserts(GALLERY_GROUP, "short", "8", "acrylic")).toBe(false);
    expect(glassTakesInserts(GALLERY_GROUP, "long", "8", "seeded")).toBe(true);
    expect(q({ style: "inserts", glassType: "acrylic" }).reason).toMatch(/not offered/);
    expect(price({ style: "glass", glassType: "acrylic" })).toBe(sell(454.81 + 450.82));
  });

  it("matches the sheet on every band: glass is the per-window figure times the count, inserts +11.99 a short window", () => {
    for (const [id, models] of Object.entries(GALLERY_GLASS)) {
      for (const [model, bands] of Object.entries(models)) {
        const per = bands[0].glass / (model === "GD1LP" ? bands[0].windows * 2 : bands[0].windows);
        for (const b of bands) {
          const units = model === "GD1LP" ? b.windows * 2 : b.windows;
          expect(Math.abs(b.glass - per * units), `${id} ${model} ${b.lo}-${b.hi}`).toBeLessThan(0.05);
          if (b.inserts != null) expect(Math.abs(b.inserts - b.glass - 11.99 * units), `${id} ${model} inserts`).toBeLessThan(0.05);
        }
      }
    }
  });
});

describe("Gallery Ultra-Grain", () => {
  it("is single to 10'0\", double from 10'2\"; the low band to 8'0\", the high from 8'2\"", () => {
    expect(GALLERY_ULTRA_GRAIN).toEqual({ upTo8ft: { single: 158.76, double: 317.53 }, over8ft: { single: 264.61, double: 529.22 } });
    const ug = (w: string, h: string) => price({ width: w, height: h, color: "Ultra-Grain Oak Dark Finish" }) - price({ width: w, height: h });
    expect(ug("10", "8")).toBeCloseTo(sell(158.76), 2);
    expect(ug("10.2", "8")).toBeCloseTo(sell(317.53), 2);
    expect(ug("8", "8.3")).toBeCloseTo(sell(264.61), 2);
    expect(ug("16", "9")).toBeCloseTo(sell(529.22), 2);
  });

  it("charges nothing for a standard colour, and only on the Gallery", () => {
    expect(price({ color: "Almond" })).toBe(price({}));
    const r4050 = (c: string) => specialDoorQuote({ model: "4050/4051/4053", variant: "4050", width: "8", height: "7", color: c,
      style: "solid", track: "r12", spring: "extension", lock: "none" } as never).quote!.unitPrice;
    expect(r4050("Ultra-Grain Oak Medium Finish")).toBe(r4050("White")); // the 4050's own premium colours are not gridded this way
  });
});
