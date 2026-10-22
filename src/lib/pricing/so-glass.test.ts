import { describe, it, expect } from "vitest";
import { specialDoorQuote } from "./data/special-door-pricing";
import {
  baseGlassFor, glassOptionsFor, hasGlass, glassAdder, glassAdderSell, glassLabel, panelStylesFor, windowCount, windowSeriesFor,
  windowsPricedAt, SO_GLASS_TYPES, isSheetGroup,
} from "./data/so-glass";
import { PREMIUM_ARCH_GLASS_TYPES, PREMIUM_GLASS_TYPES, PREMIUM_GROUPS } from "./data/premium-glass";

const G = "4050/4051/4053/4132";
const base = {
  model: G, color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const, height: "7",
};
const sell = (width: string, glassType?: string, panel: "short" | "long" = "short", inserts = false, series: "standard" | "architectural" = "standard") =>
  specialDoorQuote({
    ...base, width, style: inserts ? "inserts" : "glass", glassType, panelStyle: panel, windowSeries: series,
  }).quote?.unitPrice ?? 0;

// CJ's Premium Steel workbook (16/10/2026): a window is list x .776 x 0.99 / (1 - 0.0265) on the 4050 family.
const K = 0.99 / (1 - 0.0265);
const cost = (n: number, list: number, mult = 0.776) => Math.round(n * list * mult * K * 100) / 100;

describe("glass types", () => {
  it("offers the sheet's ten standard types wherever standard windows are priced, single strength first", () => {
    // Single strength is priced on the sheet and offered, as the grid's own
    // glass is on the Value Steel and Modern doors (Brandon, 19/10/2026).
    expect(glassOptionsFor(G, "short", "9").map((g) => g.id)).toEqual([
      "ssb", "dsb", "acrylic", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
    ]);
    expect(glassOptionsFor(G, "long", "12")).toHaveLength(10);
    expect(baseGlassFor(G)).toBe("ssb");
    expect(baseGlassFor("GD1LP/GD1SP")).toBe("dsb");
    expect(SO_GLASS_TYPES[0].id).toBe("ssb");
  });

  it("offers the architectural series' fourteen, double strength first", () => {
    expect(windowSeriesFor(G)).toEqual(["standard", "architectural"]);
    expect(windowSeriesFor("GD1LP/GD1SP")).toEqual(["standard"]);
    expect(glassOptionsFor(G, "short", "9", "architectural").map((g) => g.id)).toEqual([
      "dsb", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
      "seeded", "insulated_seeded", "midnight_gray", "insulated_midnight_gray", "tempered_midnight_gray", "insulated_tempered_midnight_gray",
    ]);
    expect(baseGlassFor(G, "architectural")).toBe("dsb");
    expect(PREMIUM_ARCH_GLASS_TYPES.some((g) => g.id === "ssb")).toBe(false);
  });

  it("prices every type above the one before it", () => {
    let last = 0;
    for (const id of ["ssb", "dsb", "acrylic", "obscure", "insulated"]) {
      const v = glassAdder(G, "short", "9", id)!;
      expect(v, id).toBeGreaterThan(last);
      last = v;
    }
  });

  it("carries the sheet's figures: the count times the price a window", () => {
    // 8'0" to 9'10": four short windows; single strength 33 list, double 35.
    expect(glassAdder(G, "short", "9", "ssb")).toBe(cost(4, 33));
    expect(glassAdder(G, "short", "9", "dsb")).toBe(cost(4, 35));
    expect(glassAdder(G, "short", "16", "ssb")).toBe(cost(8, 33));
    // The other families' windows are the same list at their own multipliers.
    expect(glassAdder("9130/9131/9132/9133", "short", "9", "ssb")).toBe(cost(4, 33, 0.912));
    expect(glassAdder("4300/4301/4302/4305/4310", "short", "9", "ssb")).toBe(cost(4, 33, 0.704));
    expect(glassAdder("9200/9201/9202/9203/9205", "short", "9", "ssb")).toBe(cost(4, 33, 0.865));
  });

  it("prices the architectural series on its own windows: 19-1/2\" x 16\" at 55, 42\" x 16\" at 110", () => {
    // 7'8" to 10'0": four short or two long; grilles add 15 and 30.
    expect(glassAdder(G, "short", "9", "dsb", false, "architectural")).toBe(cost(4, 55));
    expect(glassAdder(G, "long", "9", "dsb", false, "architectural")).toBe(cost(2, 110));
    expect(glassAdder(G, "short", "9", "dsb", true, "architectural")).toBe(cost(4, 70));
    expect(glassAdder(G, "long", "9", "dsb", true, "architectural")).toBe(cost(2, 140));
    expect(glassAdder(G, "short", "9", "seeded", false, "architectural")).toBe(cost(4, 130));
    // 19'2" to 20'0" takes ten short on the 9200 family.
    expect(windowCount("9200/9201/9202/9203/9205", "short", "20", "architectural")).toBe(10);
    expect(windowCount("9200/9201/9202/9203/9205", "long", "20", "architectural")).toBe(5);
  });
});

describe("panel style", () => {
  it("changes the window count and the price at the same width", () => {
    // A 12'0" short door takes 6 windows, a long door 3 — and they cost
    // different amounts for the same glass.
    expect(windowCount(G, "short", "12")).toBe(6);
    expect(windowCount(G, "long", "12")).toBe(3);
    expect(glassAdder(G, "short", "12", "ssb")).toBe(cost(6, 33));
    expect(glassAdder(G, "long", "12", "ssb")).toBe(cost(3, 65));
  });

  it("offers long standard windows from 8'0\", and not at 14'0\" to 15'10\" (the sheet's N/A)", () => {
    for (const w of ["6.2", "7", "7.10"]) expect(panelStylesFor(G, w), w).toEqual(["short"]);
    for (const w of ["8", "12", "13.10", "16", "18"]) expect(panelStylesFor(G, w), w).toEqual(["short", "long"]);
    for (const w of ["14", "15", "15.10"]) expect(panelStylesFor(G, w), w).toEqual(["short"]);
  });

  it("offers architectural windows on the sheet's bands, which skip 10'2\" to 11'4\" and 14'8\"", () => {
    for (const w of ["6.2", "7.6"]) expect(panelStylesFor(G, w, "architectural"), w).toEqual(["short"]);
    for (const w of ["7.8", "9", "10", "11.6", "14.6", "14.10", "18"]) expect(panelStylesFor(G, w, "architectural"), w).toEqual(["short", "long"]);
    for (const w of ["10.2", "11", "11.4", "14.8"]) expect(panelStylesFor(G, w, "architectural"), w).toEqual([]);
    // Past 18'0" the standard windows stop; the 9200 and 4300 families take the architectural there.
    const wide = "9200/9201/9202/9203/9205";
    expect(panelStylesFor(wide, "19")).toEqual([]);
    expect(panelStylesFor(wide, "19", "architectural")).toEqual(["short", "long"]);
    expect(windowsPricedAt(wide, "19")).toBe(true);
    expect(windowsPricedAt(G, "10.2")).toBe(true);
  });

  it("prices a long-panel door off its own band", () => {
    // On the 4132: the 4050 at 12'0" x 7'0" is stocked, its short single
    // strength door the stock book's (21/10/2026), so the two bands cannot be
    // told apart there.
    const sell4132 = (panel: "short" | "long") =>
      specialDoorQuote({ ...base, variant: "4132", width: "12", style: "glass", glassType: "ssb", panelStyle: panel }).quote?.unitPrice ?? 0;
    expect(sell4132("long")).not.toBe(sell4132("short"));
    expect(sell4132("long") - sell4132("short")).toBeCloseTo(
      glassAdderSell(G, "long", "12", "ssb")! - glassAdderSell(G, "short", "12", "ssb")!, 2,
    );
  });
});

describe("inserts", () => {
  it("adds to a glass price rather than replacing it: 16 list a short window, 31 a long", () => {
    // Each band is rounded to the cent on its own, so the gap can be a cent off the list arithmetic.
    expect(glassAdder(G, "short", "9", "dsb", true)! - glassAdder(G, "short", "9", "dsb")!).toBeCloseTo(cost(4, 16), 1);
    expect(glassAdder(G, "long", "9", "dsb", true)! - glassAdder(G, "long", "9", "dsb")!).toBeCloseTo(cost(2, 31), 1);
    expect(glassAdder(G, "short", "9", "dsb", true)).toBe(cost(4, 51));
    expect(glassAdder(G, "long", "9", "dsb", true)).toBe(cost(2, 98));
  });

  it("charges the band's own count", () => {
    for (const [w, n] of [["6.2", 3], ["9", 4], ["12", 6], ["16", 8]] as const) {
      expect(glassAdder(G, "short", w, "ssb", true), w).toBe(cost(n, 49));
      expect(glassAdder(G, "short", w, "ssb"), w).toBe(cost(n, 33));
    }
  });

  it("shows up on the quote", () => {
    expect(sell("9", "dsb", "short", true)).toBeGreaterThan(sell("9", "dsb", "short"));
    expect(sell("9", "dsb", "short", true, "architectural")).toBeGreaterThan(sell("9", "dsb", "short", false, "architectural"));
  });

  it("names the glass and the inserts together", () => {
    const q = specialDoorQuote({
      ...base, width: "9", style: "inserts", glassType: "dsb",
      panelStyle: "short", windesign: "509",
    });
    expect(q.quote?.description).toContain("double strength b grade windows in the top section, Colonial 509 inserts");
    const arch = specialDoorQuote({
      ...base, width: "9", style: "inserts", glassType: "seeded", windowSeries: "architectural",
      panelStyle: "long", windesign: "SQ24",
    });
    expect(arch.quote?.description).toContain("seeded dsb windows in the top section, SQ24 design");
  });
});

describe("what is not priced", () => {
  it("has no standard glass below 8'0\" on a long panel", () => {
    expect(hasGlass(G, "long", "7")).toBe(false);
    expect(glassOptionsFor(G, "long", "7")).toEqual([]);
  });

  it("covers every short width from 6'2\" to 18'0\"", () => {
    for (const w of ["6.2", "7.10", "9", "12", "15.10", "18"]) {
      expect(hasGlass(G, "short", w), w).toBe(true);
    }
  });

  it("has nothing for a group without a table", () => {
    expect(isSheetGroup("T50S/T50L")).toBe(false);
    expect(hasGlass("T50S/T50L", "short", "9")).toBe(false);
    expect(glassAdder("T50S/T50L", "short", "9", "dsb")).toBeNull();
    expect(windowSeriesFor("T50S/T50L")).toEqual(["standard"]);
  });

  it("prices the sheet's single strength when no type is chosen", () => {
    expect(sell("8")).toBe(sell("8", "ssb"));
    expect(sell("8", "dsb")).toBeGreaterThan(sell("8"));
    expect(sell("8")).toBeGreaterThan(747.62);
  });

  it("refuses a glass the series does not price, and says which windows do", () => {
    // Seeded is an architectural glass; single strength a standard one.
    const r = specialDoorQuote({ ...base, width: "9", style: "glass", glassType: "seeded", panelStyle: "short" });
    expect(r.quote).toBeUndefined();
    expect(r.reason).toMatch(/not priced on the short standard windows/);
    const a = specialDoorQuote({ ...base, width: "10.2", style: "glass", glassType: "dsb", panelStyle: "short", windowSeries: "architectural" });
    expect(a.quote).toBeUndefined();
    expect(a.reason).toContain("no architectural windows");
    expect(a.reason).toContain("standard");
  });

  it("gives every type a label", () => {
    for (const g of [...SO_GLASS_TYPES, ...PREMIUM_GLASS_TYPES, ...PREMIUM_ARCH_GLASS_TYPES]) expect(glassLabel(g.id), g.id).toBe(g.label);
  });

  it("prices all four Premium Steel groups off their sheets", () => {
    for (const g of PREMIUM_GROUPS) {
      expect(isSheetGroup(g), g).toBe(true);
      expect(windowSeriesFor(g), g).toEqual(["standard", "architectural"]);
    }
  });
});

describe("single strength is the sheet's own type", () => {
  const price = (width: string, style: "glass" | "inserts", glassType?: string) =>
    specialDoorQuote({ ...base, width, style, glassType, panelStyle: "short" }).quote?.unitPrice ?? 0;

  it("gives the same number whether or not the glass dropdown was touched", () => {
    for (const w of ["6.2", "8", "9", "12", "16", "18"]) {
      for (const st of ["glass", "inserts"] as const) {
        expect(price(w, st, "ssb"), `${w} ${st}`).toBe(price(w, st));
      }
    }
  });

  it("still charges more for a dearer glass", () => {
    for (const w of ["9", "18"]) {
      expect(price(w, "inserts", "dsb")).toBeGreaterThan(price(w, "inserts", "ssb"));
      expect(price(w, "inserts", "insulated")).toBeGreaterThan(price(w, "inserts", "dsb"));
    }
  });

  it("still adds inserts on top of glass", () => {
    for (const g of [undefined, "ssb", "dsb"]) {
      expect(price("9", "inserts", g), String(g)).toBeGreaterThan(price("9", "glass", g));
    }
  });
});
