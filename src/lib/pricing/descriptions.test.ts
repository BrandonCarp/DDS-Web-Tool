import { describe, it, expect } from "vitest";
import { springDescription, springBase, wireCode, ID_LABELS_ASCII } from "./data/torsion";
import { quoteCommercial } from "./commercial";
import { quoteResidential } from "./engine";

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

describe("18-foot doors: only a White 4050 is on the floor", () => {
  const o = (color: string) =>
    ({ style: "solid", color, track: "r12", spring: "extension", lock: "none" }) as const;
  const at18 = (model: string, color: string) =>
    quoteResidential(model, { widthFt: 18, widthIn: 0, heightFt: 7, heightIn: 0 }, o(color));

  it("a White 4050 at 18' is in stock", () => {
    const q = at18("4050", "White");
    expect(q.isStock).toBe(true);
    expect(q.source).toBe("stock");
  });

  it("the 4050's other stocked colours are special order at 18', at the same price", () => {
    const white = at18("4050", "White");
    for (const c of ["Almond", "Sandtone", "Chocolate Brown", "Black"]) {
      const q = at18("4050", c);
      expect(q.isStock).toBe(false);
      expect(q.unitPrice).toBe(white.unitPrice); // still prices off the stock sheet
    }
  });

  it("those same colours are still in stock at normal widths", () => {
    const q = quoteResidential("4050", { widthFt: 9, widthIn: 0, heightFt: 7, heightIn: 0 }, o("Almond"));
    expect(q.isStock).toBe(true);
  });

  it("4051 and 4053 are special order at 18' even in White", () => {
    expect(at18("4051", "White").isStock).toBe(false);
    expect(at18("4053", "White").isStock).toBe(false);
  });

  it("T50S and T52S are special order at 18'", () => {
    expect(at18("T50S", "White").isStock).toBe(false);
    expect(at18("T52S", "White").isStock).toBe(false);
  });
});

describe("doors taller than 9'0\" are not priced", () => {
  const o = { style: "solid", color: "White", track: "r12", spring: "extension", lock: "none" } as const;
  const tall = (hf: number, hi = 0) =>
    quoteResidential("T50S", { widthFt: 9, widthIn: 0, heightFt: hf, heightIn: hi }, o);

  it("still prices the three tiers it has", () => {
    for (const h of [7, 8, 9]) expect(tall(h).priced).toBe(true);
  });

  it("9'0\" is the ceiling — 9'3\" and up return no price", () => {
    expect(tall(9, 0).priced).toBe(true);
    expect(tall(9, 3).priced).toBe(false);
  });

  it("does NOT quote a tall door at the 9-ft price", () => {
    const nine = tall(9).unitPrice;
    for (const h of [10, 12, 14, 16]) {
      const q = tall(h);
      expect(q.priced).toBe(false);
      expect(q.unitPrice).not.toBe(nine);
    }
  });
});
