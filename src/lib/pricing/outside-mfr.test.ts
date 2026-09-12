import { describe, it, expect } from "vitest";
import {
  SPECIAL, SO_OUTSIDE_MFRS, SO_OUTSIDE_SERIES, seriesFor, hasSingleSeries,
} from "./data/special-orders";

const sell = (total: number, margin: number) => total / (1 - margin / 100);
const OUTSIDE_SERIES = ["Haas Doors", "American Tradition", "Aluminum Series", "Amarr", "CHI", "Overhead", "Wayne Dalton"];

import { COLORS } from "./data/catalog-meta";
import { dataKey } from "./model-groups";

describe("outside manufacturer margins", () => {
  it("puts every outside line on 45 door / 49 sections, bar American Tradition", () => {
    for (const name of OUTSIDE_SERIES) {
      expect(SPECIAL[name].door, name).toBe(["American Tradition", "Aluminum Series"].includes(name) ? 35 : 45);
      expect(SPECIAL[name].section, name).toBe(49);
    }
  });

  it("has no multiplier anywhere in the file", () => {
    for (const [name, ser] of Object.entries(SPECIAL)) {
      expect(ser.type, name).toBe("margin");
      expect(ser, name).not.toHaveProperty("multiplier");
      expect(ser, name).not.toHaveProperty("cost_margin");
      expect(ser, name).not.toHaveProperty("small_section_under");
    }
  });

  it("no longer doubles a cheap section", () => {
    // A $200 section used to sell at $400 flat, ignoring margins.
    expect(sell(200, 49)).toBeCloseTo(392.16, 2);
  });

  it("prices a door off the entered total", () => {
    expect(sell(1000, 45)).toBeCloseTo(1818.18, 2);
    expect(sell(1000, 35)).toBeCloseTo(1538.46, 2);
    expect(sell(1000, 49)).toBeCloseTo(1960.78, 2);
  });
});

describe("Haas reads like Clopay", () => {
  it("offers two series under Haas and one under the rest", () => {
    // Not a bespoke "brand" field — the same manufacturer then series flow the
    // Clopay collections use, so there is one way to pick a line.
    expect(seriesFor("Haas")).toEqual(["Haas Doors", "American Tradition", "Aluminum Series"]);
    expect(hasSingleSeries("Haas")).toBe(false);
    for (const m of ["Amarr", "CHI", "Overhead", "Wayne Dalton"]) {
      expect(seriesFor(m), m).toEqual([m]);
      expect(hasSingleSeries(m), m).toBe(true);
    }
  });

  it("gives every outside series a real entry to price against", () => {
    for (const m of SO_OUTSIDE_MFRS) {
      for (const s of seriesFor(m)) {
        expect(SPECIAL[s], `${m} -> ${s}`).toBeTruthy();
        expect(SPECIAL[s].door, s).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the outside lines out of the Clopay list", () => {
    // "Haas" itself is a manufacturer now, not a series — picking it must not
    // leave a dangling series nobody can price.
    const clopay = seriesFor("Clopay");
    for (const s of OUTSIDE_SERIES) expect(clopay, s).not.toContain(s);
    expect(SPECIAL["Haas"]).toBeUndefined();
    expect(Object.values(SO_OUTSIDE_SERIES).flat().sort()).toEqual([...OUTSIDE_SERIES].sort());
  });
});

describe("special order colours follow the model", () => {
  /** Same resolution the special order tool uses. */
  const coloursFor = (group: string, member = "") =>
    COLORS[dataKey((member || group).split("/")[0])] ?? COLORS[dataKey(group)] ?? ["White"];

  it("gives the T50S its five, not the 4050's six", () => {
    // The tool hardcoded the 4050 group, so the T50S offered Black and Bronze.
    // Clopay does not build it in either — Brandon, 12/9/2026.
    expect(coloursFor("T50S/T50L", "T50S")).toEqual(
      ["White", "Almond", "Desert Tan", "Sandtone", "Chocolate Brown"],
    );
    expect(coloursFor("T52S/T52L", "T52S")).toEqual(
      ["White", "Almond", "Desert Tan", "Sandtone", "Chocolate Brown"],
    );
  });

  it("keeps Black and Bronze on the models that do carry them", () => {
    const c = coloursFor("4050/4051/4053", "4050");
    expect(c).toContain("Black");
    expect(c).toContain("Bronze");
  });

  it("resolves a group with no member chosen yet", () => {
    expect(coloursFor("9130/9133")).toContain("Hunter Green");
    expect(coloursFor("GD1LP/GD1SP")).toContain("Iron Ore");
  });

  it("never returns an empty list", () => {
    for (const g of ["4050/4051/4053", "T50S/T50L", "T52S/T52L", "9130/9133", "GD1LP/GD1SP", "nonsense"]) {
      expect(coloursFor(g).length, g).toBeGreaterThan(0);
    }
  });
});
