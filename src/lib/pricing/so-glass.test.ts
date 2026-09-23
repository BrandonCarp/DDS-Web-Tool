import { describe, it, expect } from "vitest";
import { specialDoorQuote } from "./data/special-door-pricing";
import {
  glassOptionsFor, hasGlass, glassAdder, glassLabel, panelStylesFor, windowCount, SO_GLASS_TYPES,
} from "./data/so-glass";

const G = "4050/4051/4053";
const base = {
  model: G, color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const, height: "7",
};
const sell = (width: string, glassType?: string, panel: "short" | "long" = "short", inserts = false) =>
  specialDoorQuote({
    ...base, width, style: inserts ? "inserts" : "glass", glassType, panelStyle: panel,
  }).quote?.unitPrice ?? 0;

describe("glass types", () => {
  it("offers ten types wherever glass is priced", () => {
    expect(glassOptionsFor(G, "short", "9")).toHaveLength(9);
    expect(glassOptionsFor(G, "long", "12")).toHaveLength(9);
    // Single strength is not offered separately — the placeholder already is
    // single strength, and listing it twice gave the same door two prices.
    expect(SO_GLASS_TYPES.some((g) => g.id === "ssb")).toBe(false);
    expect(SO_GLASS_TYPES[0].id).toBe("dsb");
  });

  it("prices every type above the one before it", () => {
    let last = 0;
    for (const id of ["dsb", "acrylic", "obscure", "insulated"]) {
      const v = glassAdder(G, "short", "9", id)!;
      expect(v, id).toBeGreaterThan(last);
      last = v;
    }
  });

  it("carries the book figures", () => {
    // WINDOWS 4050|4051|4053|4132, 8'/9' short band, 4 windows.
    expect(glassAdder(G, "short", "9", "ssb")).toBeCloseTo(98.02, 2);
    expect(glassAdder(G, "short", "9", "dsb")).toBeCloseTo(101.04, 2);
    expect(glassAdder(G, "short", "16", "ssb")).toBeCloseTo(196.04, 2);
  });
});

describe("panel style", () => {
  it("changes the window count and the price at the same width", () => {
    // A 15'0" short door takes 7 windows, a long door 4 — and they cost
    // different amounts for the same glass.
    expect(windowCount(G, "short", "15")).toBe(7);
    expect(windowCount(G, "long", "15")).toBe(4);
    expect(glassAdder(G, "short", "15", "ssb")).toBeCloseTo(171.91, 2);
    expect(glassAdder(G, "long", "15", "ssb")).toBeCloseTo(196.04, 2);
  });

  it("offers long panels only from 8'0\"", () => {
    for (const w of ["6", "6.2", "7", "7.10"]) {
      expect(panelStylesFor(G, w), w).toEqual(["short"]);
    }
    for (const w of ["8", "12", "18"]) {
      expect(panelStylesFor(G, w), w).toEqual(["short", "long"]);
    }
  });

  it("prices a long-panel door off its own band", () => {
    // Uses a named type: single strength is not offered separately, so it goes
    // through the grid column, which has no panel distinction.
    expect(sell("15", "dsb", "long")).toBeGreaterThan(sell("15", "dsb", "short"));
  });
});

describe("inserts", () => {
  it("adds to a glass price rather than replacing it", () => {
    // Clopay prices decorative inserts as an ADD on whatever glass is chosen.
    const plain = glassAdder(G, "short", "9", "dsb")!;
    const withIns = glassAdder(G, "short", "9", "dsb", true)!;
    expect(withIns - plain).toBeCloseTo(46.74, 2);
  });

  it("charges the band's own insert rate", () => {
    for (const [w, decor] of [["6", 35.44], ["9", 46.74], ["12", 70.13], ["16", 93.50]] as const) {
      const d = glassAdder(G, "short", w, "ssb", true)! - glassAdder(G, "short", w, "ssb")!;
      expect(d, w).toBeCloseTo(decor, 2);
    }
  });

  it("shows up on the quote", () => {
    expect(sell("9", "dsb", "short", true)).toBeGreaterThan(sell("9", "dsb", "short"));
  });

  it("names the glass and the inserts together", () => {
    const q = specialDoorQuote({
      ...base, width: "9", style: "inserts", glassType: "dsb",
      panelStyle: "short", windesign: "509",
    });
    expect(q.quote?.description).toContain("double strength glass");
    expect(q.quote?.description).toContain("inserts");
  });
});

describe("what is not priced", () => {
  it("has no glass below 8'0\" on a long panel", () => {
    expect(hasGlass(G, "long", "7")).toBe(false);
    expect(glassOptionsFor(G, "long", "7")).toEqual([]);
  });

  it("covers every short width from 6'0\" to 18'0\"", () => {
    for (const w of ["6", "7.10", "9", "12", "15.10", "18"]) {
      expect(hasGlass(G, "short", w), w).toBe(true);
    }
  });

  it("has nothing for a group without a table", () => {
    expect(hasGlass("T50S/T50L", "short", "9")).toBe(false);
    expect(glassAdder("T50S/T50L", "short", "9", "dsb")).toBeNull();
  });

  it("falls back to the grid when no type is chosen", () => {
    expect(sell("8")).toBeCloseTo(897.37, 2);
  });

  it("gives every type a label", () => {
    for (const g of SO_GLASS_TYPES) expect(glassLabel(g.id), g.id).toBe(g.label);
  });
});

describe("single strength matches the grid", () => {
  const G = "4050/4051/4053";
  const b = {
    model: G, height: "7", color: "White",
    track: "r12" as const, spring: "extension" as const, lock: "none" as const,
  };
  const price = (width: string, style: "glass" | "inserts", glassType?: string) =>
    specialDoorQuote({ ...b, width, style, glassType, panelStyle: "short" }).quote?.unitPrice ?? 0;

  it("gives the same number whether or not the glass dropdown was touched", () => {
    // The grid's GLASS and INSERTS columns were built from single strength, so
    // routing it through the component tables instead produced a different
    // number at every width — about a dollar at 6'0", six at 18'0". The same
    // door must not price two ways depending on which control was used.
    for (const w of ["6", "8", "9", "12", "16", "18"]) {
      for (const st of ["glass", "inserts"] as const) {
        expect(price(w, st, "ssb"), `${w} ${st}`).toBeCloseTo(price(w, st), 2);
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
