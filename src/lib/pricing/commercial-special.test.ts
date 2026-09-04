import { describe, it, expect } from "vitest";
import {
  SPECIAL_COMMERCIAL, SPECIAL_COMMERCIAL_PINNED, SPECIAL_COMMERCIAL_SERIES,
  SPECIAL_COMMERCIAL_MODELS, commercialSeriesOf,
} from "./data/special-orders";

describe("commercial special order range", () => {
  it("lists the six series in the order the counter reads them", () => {
    expect(SPECIAL_COMMERCIAL_SERIES.map((s) => s.name)).toEqual([
      "Architectural Series — Aluminum Full View Doors",
      "Architectural Series",
      "Energy Series with Intellicore",
      "Energy Series",
      "Industrial Series",
    ]);
  });

  it("pins the five daily models at the top", () => {
    expect(SPECIAL_COMMERCIAL_PINNED).toEqual(["3720", "3200", "3150", "524", "524V"]);
  });

  it("keeps every pinned model in its own series too", () => {
    // The pinned entry is a shortcut, not a relocation. A model that only
    // existed at the top would vanish for anyone browsing by series.
    for (const m of SPECIAL_COMMERCIAL_PINNED) {
      expect(commercialSeriesOf(m), `${m} belongs to no series`).not.toBeNull();
    }
    expect(commercialSeriesOf("3200")).toBe("Energy Series");
    expect(commercialSeriesOf("3720")).toBe("Energy Series with Intellicore");
    expect(commercialSeriesOf("524V")).toBe("Industrial Series");
  });

  it("carries 34 distinct models across the series", () => {
    expect(SPECIAL_COMMERCIAL_MODELS).toHaveLength(34);
    expect(new Set(SPECIAL_COMMERCIAL_MODELS).size).toBe(34);
  });

  it("puts no model in two series", () => {
    const seen = new Map<string, string>();
    for (const s of SPECIAL_COMMERCIAL_SERIES) {
      for (const m of s.models) {
        expect(seen.has(m), `${m} in both ${seen.get(m)} and ${s.name}`).toBe(false);
        seen.set(m, s.name);
      }
    }
  });

  it("prices the whole range at 45 door / 49 sections", () => {
    const c = SPECIAL_COMMERCIAL.Clopay;
    expect(c.door).toBe(45);
    expect(c.section).toBe(49);
    // The terms the 3200 and 524 always had, now applied across the range.
    expect(1000 / (1 - c.door / 100)).toBeCloseTo(1818.18, 2);
    expect(1000 / (1 - c.section / 100)).toBeCloseTo(1960.78, 2);
  });

  it("still offers the two models it always did", () => {
    for (const m of ["3200", "524"]) expect(SPECIAL_COMMERCIAL.Clopay.models).toContain(m);
  });
});

describe("commercial collection dropdown", () => {
  it("lists the five models first, then the series", () => {
    const options = [...SPECIAL_COMMERCIAL_PINNED, ...SPECIAL_COMMERCIAL_SERIES.map((s) => s.name)];
    expect(options).toEqual([
      "3720", "3200", "3150", "524", "524V",
      "Architectural Series — Aluminum Full View Doors",
      "Architectural Series",
      "Energy Series with Intellicore",
      "Energy Series",
      "Industrial Series",
    ]);
  });

  it("keeps model entries and series entries tellable apart", () => {
    // One dropdown holds both, so a value has to be unambiguously one or the
    // other. A series named after a model number would silently show the wrong
    // list.
    const seriesNames = SPECIAL_COMMERCIAL_SERIES.map((s) => s.name);
    for (const m of SPECIAL_COMMERCIAL_PINNED) {
      expect(seriesNames, `${m} collides with a series name`).not.toContain(m);
    }
    for (const name of seriesNames) {
      expect(SPECIAL_COMMERCIAL_MODELS, `${name} collides with a model`).not.toContain(name);
    }
  });

  it("pins only real models, each resolvable to its series", () => {
    expect(SPECIAL_COMMERCIAL_PINNED).toHaveLength(5);
    for (const m of SPECIAL_COMMERCIAL_PINNED) {
      expect(SPECIAL_COMMERCIAL_MODELS, `${m} is not a real model`).toContain(m);
      expect(commercialSeriesOf(m), `${m} belongs to no series`).not.toBeNull();
    }
  });
});
