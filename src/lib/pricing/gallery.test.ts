import { describe, expect, it } from "vitest";
import { specialDoorQuote, offeredHeights, griddedWidths, griddedHeights, windowsOfferedAt } from "./data/special-door-pricing";
import { SPECIAL_DOORS } from "./data/special-doors";
import { glassOptionsFor, glassTakesInserts, panelStylesFor, GALLERY_GROUP } from "./data/so-glass";
import { GALLERY_GLASS, GALLERY_GLASS_TYPES, GALLERY_GROUPS, GALLERY_ULTRA_GRAIN } from "./data/gallery-glass";
import { SPECIAL } from "./data/special-orders";

// Figures off CJ's GALLERY 3 LAYER workbook (12/10/2026), loaded as he has
// it: DDS cost is Clopay list x .786 x 0.99 / (1 - 0.0265) + 15 on the door
// (the $15 every door carries — Brandon), the glass at the same multiplier
// with no +15, at the Gallery door margin, 43.25% since 8/10/2026: sell =
// cost / 0.5675, each part rounded.
// The grid is generated at the margin special-orders.ts carries
// (scripts/apply_sheet_workbook.py), and a test below holds the two together.
const M = 0.5675;
const sell = (cost: number) => Math.round((cost / M) * 100) / 100;
// A door's DDS cost: Clopay list x .786 x 0.99 / (1 - 0.0265), plus the flat
// $15 every door carries (Brandon, 12/10/2026). Glass adders carry no $15.
const K = 0.99 / (1 - 0.0265);
const door = (list: number) => list * 0.786 * K + 15;

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
    expect(price({})).toBe(sell(door(569)));                       // 8'0" x 7'
    expect(price({ width: "8.2" })).toBe(sell(door(712)));          // 8'2" to 8'10" band
    expect(price({ width: "16", height: "8" })).toBe(sell(door(1285)));
    expect(price({ width: "15.6", height: "8" })).toBe(sell(door(1254))); // the corrected F22
    expect(price({ width: "9", height: "9" })).toBe(sell(door(1046)));
    expect(price({ width: "9", height: "10" })).toBe(sell(door(1046))); // 9 and 10 ft share a column
  });

  it("grids 7, 8, 9 and 10 ft, and offers heights to 10'0\"", () => {
    expect(griddedHeights(GALLERY_GROUP)).toEqual(["7", "8", "9", "10"]);
    expect(offeredHeights(GALLERY_GROUP)).toContain("10");
    expect(Object.keys(SPECIAL_DOORS[GALLERY_GROUP]["7"])).toHaveLength(73); // 6'0" to 18'0" by 2", as CJ's sheet runs
  });

  it("includes torsion at 9 ft and up, with nothing added for picking it", () => {
    const r = q({ width: "9", height: "9", spring: "torsion" });
    expect(r.quote?.torsionIncluded).toBe(true);
    expect(r.quote?.unitPrice).toBe(sell(door(1046)));
    expect(q({ width: "9", height: "8", spring: "torsion" }).quote?.unitPrice).toBe(sell(door(750)) + 35);
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
    expect(got).toBeCloseTo(sell(door(569)) + sell(265.37) + sell(158.76), 0);
  });

  it("words the line as the stock tab does: the grade, then the design or NO INSERTS", () => {
    expect(q({ style: "glass" }).quote?.description).toContain("double strength b grade windows in the top section, no inserts");
    expect(q({ style: "inserts", glassType: "insulated", windesign: "ARCH1GRILLE" }).quote?.description)
      .toContain("insulated windows in the top section, Arch 1 Grille inserts");
    expect(q({ style: "inserts" }).quote?.description).toContain("double strength b grade windows in the top section, no inserts");
  });

  it("prices double strength as the base glass, with inserts on top", () => {
    // The door and its glass are lifted separately, each rounded to cents, so
    // the sum can sit a penny off one lift of the whole.
    expect(price({ style: "glass" })).toBeCloseTo(sell(door(569) + 175.85), 1);
    expect(price({ style: "inserts" })).toBeCloseTo(sell(door(569) + 223.81), 1);
    expect(price({ style: "glass", glassType: "dsb" })).toBe(price({ style: "glass" }));
  });

  it("prices long panel glass at the GD1LP figure and short at the GD1SP's, whichever model is picked", () => {
    // 12'0" insulated: 6 short windows or 3 long come to the same money
    // (326.12 — a long window is two short ones), on either model. The sheet
    // of 8/10/2026 had them a penny apart; the workbook of 12/10/2026 computes
    // both from the list, so the two bands can no longer be told apart here.
    expect(price({ width: "12", style: "glass", glassType: "insulated", panelStyle: "short" })).toBe(sell(door(816) + 326.12));
    expect(price({ width: "12", style: "glass", glassType: "insulated", panelStyle: "long" })).toBe(sell(door(816) + 326.12));
    expect(price({ width: "12", style: "glass", glassType: "insulated", panelStyle: "long", variant: "GD1LP" })).toBe(sell(door(816) + 326.12));
    expect(price({ width: "12", style: "glass", glassType: "insulated", panelStyle: "short", variant: "GD1LP" })).toBe(sell(door(816) + 326.12));
    // The two bands differ where the counts do: up to 7'6" there is a short
    // band of 3 windows and no long band at all.
    expect(panelStylesFor(GALLERY_GROUP, "7.6")).toEqual(["short"]);
    // Long panel inserts ride on the long glass: the GD1LP inserts column
    // (398.06 on both tables at 12'0", so the cents cannot tell them apart;
    // the adder is rounded before the lift, hence toBeCloseTo).
    expect(price({ width: "12", style: "inserts", glassType: "insulated", panelStyle: "long" })).toBeCloseTo(sell(door(816) + 398.06), 0);
    // Up to 7'6" only short windows are built (3 of them); no panel choice yet.
    expect(price({ width: "7.6", style: "glass", glassType: "insulated" })).toBe(sell(door(659) + 163.06));
  });

  it("offers long panels from 7'8\" and short only below", () => {
    expect(panelStylesFor(GALLERY_GROUP, "7.6")).toEqual(["short"]);
    expect(panelStylesFor(GALLERY_GROUP, "7.8")).toEqual(["short", "long"]);
    expect(panelStylesFor(GALLERY_GROUP, "18")).toEqual(["short", "long"]);
  });

  it("offers all fifteen types, double strength first, and no inserts on acrylic", () => {
    // CJ's sheet names the block ACRYLIC (141 a short window, no inserts);
    // the app goes by his sheet (Brandon, 12/10/2026).
    const ids = glassOptionsFor(GALLERY_GROUP, "short", "8").map((g) => g.id);
    expect(ids).toHaveLength(15);
    expect(ids[0]).toBe("dsb");
    expect(ids).toContain("acrylic");
    expect(glassTakesInserts(GALLERY_GROUP, "short", "8", "acrylic")).toBe(false);
    expect(glassTakesInserts(GALLERY_GROUP, "long", "8", "seeded")).toBe(true);
    expect(q({ style: "inserts", glassType: "acrylic" }).reason).toMatch(/not offered/);
    expect(price({ style: "glass", glassType: "acrylic" })).toBeCloseTo(sell(door(569) + 450.82), 1); // 4 x 141 x .786 x k; a half-cent at 43.25%
  });

  it("matches the sheet on every band: glass is the per-window figure times the count, inserts +11.99 a short window on the GD1 pair", () => {
    for (const [group, types] of Object.entries(GALLERY_GLASS)) {
      for (const [id, panels] of Object.entries(types)) {
        const per = panels.short[0].glass / panels.short[0].windows;
        for (const panel of ["short", "long"] as const) {
          for (const b of panels[panel]) {
            const units = panel === "long" ? b.windows * 2 : b.windows; // a long window is two short ones
            expect(Math.abs(b.glass - per * units), `${group} ${id} ${panel} ${b.lo}-${b.hi}`).toBeLessThan(0.05);
          }
        }
      }
    }
    // On the GD1 pair the inserts adder is 15 list a window, 11.99 at .786.
    for (const b of GALLERY_GLASS[GALLERY_GROUP].dsb.short) expect(Math.abs(b.inserts! - b.glass - 11.99 * b.windows)).toBeLessThan(0.05);
  });
});

describe("the Gallery grid and its margin agree", () => {
  it("was generated at the margin the catalogue carries", () => {
    // The grid holds sell figures at the margin it was generated with, and the
    // glass adders lift by the catalogue margin at quote time. If someone
    // changes the margin without re-running the script, the door and its
    // glass are at two different margins — this is the test that says so.
    const margin = SPECIAL["Gallery Collection"].models!["GD1LP/GD1SP"].door;
    expect(SPECIAL_DOORS[GALLERY_GROUP]["7"]["8"].solid).toBe(Math.round((door(569) / (1 - margin / 100)) * 100) / 100);
  });
});

describe("Gallery Ultra-Grain", () => {
  it("is single to 10'0\", double from 10'2\"; the low band to 8'0\", the high from 8'2\"", () => {
    for (const g of GALLERY_GROUPS) expect(GALLERY_ULTRA_GRAIN[g], g).toEqual({ upTo8ft: { single: 158.76, double: 317.53 }, over8ft: { single: 264.61, double: 529.22 } });
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

describe("Gallery widths built solid only (Clopay's note, 9/10/2026)", () => {
  it("lists them per model, the GD2 pair's wider holes included", () => {
    for (const m of ["GD1SP", "GD1LP"]) {
      expect(windowsOfferedAt(m, "14.10"), m).toBe(false);
      expect(windowsOfferedAt(m, "15.4"), m).toBe(false);
      expect(windowsOfferedAt(m, "15"), m).toBe(true);
      expect(windowsOfferedAt(m, "16.4"), m).toBe(true);
    }
    for (const m of ["GD2SP", "GD2LP"]) {
      for (const w of ["14.10", "15.4", "16.4", "17.6", "19.2", "20.2"]) expect(windowsOfferedAt(m, w), `${m} ${w}`).toBe(false);
      expect(windowsOfferedAt(m, "16.2"), m).toBe(true);
      expect(windowsOfferedAt(m, "18"), m).toBe(true);
    }
    expect(windowsOfferedAt("4050", "14.10")).toBe(true);
  });

  it("sells the solid door there but refuses glass and inserts", () => {
    expect(q({ width: "14.10" }).quote?.unitPrice).toBe(sell(door(1163)));
    expect(q({ width: "14.10", style: "glass" }).reason).toMatch(/solid only/);
    expect(q({ width: "15.4", style: "inserts", variant: "GD1LP" }).reason).toMatch(/solid only/);
    expect(q({ width: "15.6", style: "glass" }).quote).toBeTruthy();
  });
});

// The other three pairs, from CJ's GALLERY 3 LAYER workbook (12/10/2026). DDS
// cost is Clopay list x the sheet's multiplier x 0.99 / (1 - 0.0265) — the
// glass at the same multiplier as the door — and each pair sells at the margin
// special-orders.ts carries. The GD1SU/GD1LU share the GD1SP/GD1LP list and
// the GD2SU/GD2LU the GD2SP/GD2LP's; only the multiplier differs.
describe("the GD2SP/GD2LP, GD1SU/GD1LU and GD2SU/GD2LU pairs (12/10/2026)", () => {
  const margin = (group: string) => SPECIAL["Gallery Collection"].models![group].door;
  const sellAt = (group: string, cost: number) => Math.round((cost / (1 - margin(group) / 100)) * 100) / 100;
  const cost = (list: number, mult: number) => list * mult * K;   // a glass adder
  const door = (list: number, mult: number) => cost(list, mult) + 15;  // a door: the flat $15 on top
  const at = (group: string, variant: string, o: Record<string, unknown> = {}) => specialDoorQuote({
    model: group, variant, width: "8", height: "7", color: "White", style: "solid",
    track: "r12", spring: "extension", lock: "none", ...o,
  } as never);
  const priceAt = (group: string, variant: string, o: Record<string, unknown> = {}) => {
    const r = at(group, variant, o);
    if (!r.quote) throw new Error(r.reason);
    return r.quote.unitPrice;
  };

  it("prices each pair off its own multiplier, and the glass at the same one", () => {
    expect(priceAt("GD2LP/GD2SP", "GD2SP")).toBe(sellAt("GD2LP/GD2SP", door(704, 0.714)));
    expect(priceAt("GD1LU/GD1SU", "GD1SU")).toBe(sellAt("GD1LU/GD1SU", door(569, 0.898)));
    expect(priceAt("GD2LU/GD2SU", "GD2SU")).toBe(sellAt("GD2LU/GD2SU", door(704, 0.823)));
    expect(priceAt("GD2LP/GD2SP", "GD2LP", { width: "20", height: "10" })).toBe(sellAt("GD2LP/GD2SP", door(2813, 0.714)));
    // 8'0" short glass is 4 double-strength windows at 55 list.
    expect(priceAt("GD2LP/GD2SP", "GD2SP", { style: "glass" })).toBeCloseTo(sellAt("GD2LP/GD2SP", door(704, 0.714) + cost(220, 0.714)), 1);
    expect(priceAt("GD1LU/GD1SU", "GD1SU", { style: "glass" })).toBeCloseTo(sellAt("GD1LU/GD1SU", door(569, 0.898) + cost(220, 0.898)), 1);
    expect(priceAt("GD2LU/GD2SU", "GD2SU", { style: "inserts" })).toBeCloseTo(sellAt("GD2LU/GD2SU", door(704, 0.823) + cost(280, 0.823)), 1);
    expect(GALLERY_GLASS["GD2LP/GD2SP"].dsb.short[1].glass).toBe(Math.round(cost(220, 0.714) * 100) / 100);
  });

  it("grids the GD2 pairs to 20'0\" and the GD1SU/GD1LU to 18'0\", all four to 10 ft", () => {
    for (const g of GALLERY_GROUPS) expect(griddedHeights(g), g).toEqual(["7", "8", "9", "10"]);
    expect(griddedWidths("GD2LP/GD2SP", "8").slice(-1)[0]).toBe("20");
    expect(griddedWidths("GD2LU/GD2SU", "8").slice(-1)[0]).toBe("20");
    expect(griddedWidths("GD1LU/GD1SU", "8").slice(-1)[0]).toBe("18");
    expect(at("GD2LP/GD2SP", "GD2SP", { width: "9", height: "9", spring: "torsion" }).quote?.torsionIncluded).toBe(true);
  });

  it("builds the long-panel door from 7'8\" and the short from 6'2\", on every pair", () => {
    for (const [g, s, l] of [["GD2LP/GD2SP", "GD2SP", "GD2LP"], ["GD1LU/GD1SU", "GD1SU", "GD1LU"], ["GD2LU/GD2SU", "GD2SU", "GD2LU"]]) {
      expect(griddedWidths(g, undefined, s)[0], s).toBe("6.2");
      expect(griddedWidths(g, undefined, l)[0], l).toBe("7.8");
    }
  });

  it("prices the GD2 pairs' 9'2\"-9'10\" at 7 ft off a list of 991 (CJ's correction of 12/10/2026)", () => {
    // The row read 882 on both GD2 sheets, the 8'2"-8'10" row copied down. The
    // second workbook of the day corrected the GD2SU/GD2LU sheet (and the
    // BD2 sheet, whose list is the same cell for cell) to 991 and missed the
    // GD2SP/GD2LP sheet; the script loads that one as 991 too.
    for (const [g, v, m] of [["GD2LP/GD2SP", "GD2SP", 0.714], ["GD2LU/GD2SU", "GD2SU", 0.823]] as const) {
      for (const w of ["9.2", "9.4", "9.10"]) expect(at(g, v, { width: w, height: "7" }).quote?.unitPrice, `${g} ${w}`).toBe(sellAt(g, door(991, m)));
      expect(at(g, v, { width: "9.4", height: "8" }).quote?.unitPrice, g).toBe(sellAt(g, door(1224, m)));
      expect(at(g, v, { width: "9", height: "7" }).quote?.unitPrice, g).toBe(sellAt(g, door(763, m)));
    }
    expect(at("GD1LU/GD1SU", "GD1SU", { width: "9.4", height: "7" }).quote?.unitPrice).toBe(sellAt("GD1LU/GD1SU", door(807, 0.898)));
  });

  it("is solid only at the Clopay widths: the long list on the GD2SP/GD2LP, 14'10\" and 15'4\" on the Intellicore pairs", () => {
    for (const m of ["GD1SU", "GD1LU", "GD2SU", "GD2LU"]) {
      expect(windowsOfferedAt(m, "14.10"), m).toBe(false);
      expect(windowsOfferedAt(m, "15.4"), m).toBe(false);
      expect(windowsOfferedAt(m, "16.4"), m).toBe(true);
    }
    expect(windowsOfferedAt("GD2SP", "16.4")).toBe(false);
    expect(at("GD2LP/GD2SP", "GD2SP", { width: "16.4", height: "8", style: "glass" }).reason).toMatch(/solid only/);
    expect(at("GD2LU/GD2SU", "GD2SU", { width: "16.4", height: "8", style: "glass" }).quote).toBeTruthy();
  });

  it("offers the fifteen Gallery glass types, short or long, and the Ultra-Grain finishes", () => {
    for (const g of GALLERY_GROUPS) {
      expect(glassOptionsFor(g, "short", "8").map((x) => x.id), g).toEqual(GALLERY_GLASS_TYPES.map((x) => x.id));
      expect(panelStylesFor(g, "8"), g).toEqual(["short", "long"]);
      expect(glassTakesInserts(g, "short", "8", "acrylic"), g).toBe(false);
    }
    expect(GALLERY_GLASS_TYPES).toHaveLength(15);
    expect(priceAt("GD2LU/GD2SU", "GD2SU", { width: "16", height: "8", color: "Ultra-Grain Oak Dark Finish" }) - priceAt("GD2LU/GD2SU", "GD2SU", { width: "16", height: "8" }))
      .toBeCloseTo(sellAt("GD2LU/GD2SU", 317.53), 2);
  });

  it("names the collection and the model on the line", () => {
    expect(at("GD1LU/GD1SU", "GD1LU", { width: "9", style: "glass" }).quote?.description)
      .toContain("Clopay Gallery Collection, Model GD1LU, 9'0\" x 7'0\", in the color White, double strength b grade windows in the top section, no inserts");
  });

  it("were generated at the margins the catalogue carries", () => {
    expect(SPECIAL_DOORS["GD2LP/GD2SP"]["7"]["8"].solid).toBe(sellAt("GD2LP/GD2SP", door(704, 0.714)));
    expect(SPECIAL_DOORS["GD1LU/GD1SU"]["7"]["8"].solid).toBe(sellAt("GD1LU/GD1SU", door(569, 0.898)));
    expect(SPECIAL_DOORS["GD2LU/GD2SU"]["7"]["8"].solid).toBe(sellAt("GD2LU/GD2SU", door(704, 0.823)));
  });
});
