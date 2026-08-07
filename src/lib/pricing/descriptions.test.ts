import { describe, it, expect } from "vitest";
import { springDescription, springBase, wireCode, ID_LABELS_ASCII } from "./data/torsion";
import { quoteCommercial } from "./commercial";

describe("torsion spring description", () => {
  it("writes the spec in plain ASCII — no prime marks, no fraction ligatures", () => {
    const d = springBase("0.234", "3.75", 52);
    expect(d).toBe('3-3/4" ID, 234 WIRE, 52" LONG');
    expect(d).not.toMatch(/[″¾⅝]/);
  });

  it("drops the leading zero and the decimal point from the wire gauge", () => {
    expect(wireCode("0.234")).toBe("234");
    expect(wireCode("0.192")).toBe("192");
  });

  it("has an ASCII label for every stocked inside diameter", () => {
    for (const k of ["2", "2.625", "3.75", "6"]) {
      expect(ID_LABELS_ASCII[k]).toBeDefined();
      expect(ID_LABELS_ASCII[k]).not.toMatch(/[″¾⅝]/);
    }
  });

  it("appends nothing when both hand counts are zero", () => {
    expect(springDescription("0.234", "3.75", 52, 0, 0)).toBe('3-3/4" ID, 234 WIRE, 52" LONG');
  });

  it("lists right before left on a mixed pair, with the cone colours", () => {
    expect(springDescription("0.234", "3.75", 52, 1, 1)).toBe(
      '3-3/4" ID, 234 WIRE, 52" LONG [1] - RIGHT(RED) AND [1] - LEFT(BLACK)',
    );
  });

  it("pluralises a same-hand pair", () => {
    expect(springDescription("0.234", "3.75", 52, 0, 2)).toBe(
      '3-3/4" ID, 234 WIRE, 52" LONG [2] - LEFTS(BLACK)',
    );
  });

  it("handles a single hand on its own", () => {
    expect(springDescription("0.234", "3.75", 52, 1, 0)).toBe(
      '3-3/4" ID, 234 WIRE, 52" LONG [1] - RIGHT(RED)',
    );
  });
});

describe("commercial section description", () => {
  const base = { order: "section", mfr: "Amarr", model: "2742", secHeight: "24" } as const;

  it("describes a solid intermediate section", () => {
    const q = quoteCommercial({ ...base, manFt: 8, manIn: 2, secKind: "int", windows: 0, stile: "single", color: "White" });
    expect(q.priced).toBe(true);
    expect(q.description).toBe('Amarr Model 2742, 8\'2" x 24", solid intermediate section, in the color White, single end stiles');
  });

  it("names the window count and size when the section is glazed", () => {
    const q = quoteCommercial({ ...base, manFt: 12, manIn: 0, secKind: "int", windows: 3, stile: "single", color: "White" });
    expect(q.description).toContain("3 24x12 window section");
    expect(q.description).not.toContain("solid");
  });

  it("the description honours the window cap for the width — 8ft fits 2, not 3", () => {
    const q = quoteCommercial({ ...base, manFt: 8, manIn: 2, secKind: "int", windows: 3, stile: "single", color: "White" });
    expect(q.description).toContain("2 24x12 window section");
  });

  it("describes a bottom section and carries the colour through", () => {
    const q = quoteCommercial({ ...base, manFt: 10, manIn: 0, secKind: "bt", stile: "double", color: "Brown" });
    expect(q.description).toBe('Amarr Model 2742, 10\'0" x 24", bottom section, in the color Brown, double end stiles');
  });

  it("prices brown and white identically — colour is description-only", () => {
    const w = quoteCommercial({ ...base, manFt: 10, manIn: 0, secKind: "bt", stile: "single", color: "White" });
    const b = quoteCommercial({ ...base, manFt: 10, manIn: 0, secKind: "bt", stile: "single", color: "Brown" });
    expect(b.unitPrice).toBe(w.unitPrice);
  });
});
