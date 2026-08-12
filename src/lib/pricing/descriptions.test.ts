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

describe("door height ceiling", () => {
  const o = { style: "solid", color: "White", track: "r12", spring: "extension", lock: "none" } as const;
  const tall = (hf: number, hi = 0) =>
    quoteResidential("T50S", { widthFt: 9, widthIn: 0, heightFt: hf, heightIn: hi }, o);

  it("prices the three tiers the workbook covers", () => {
    for (const h of [7, 8, 9]) expect(tall(h).priced).toBe(true);
  });

  it("9'0\" is the ceiling — 9'3\" and up go to Special Order", () => {
    expect(tall(9, 0).priced).toBe(true);
    expect(tall(9, 3).priced).toBe(false);
    expect(tall(16, 0).priced).toBe(false);
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

describe("commercial section width limits", () => {
  const sec = (model: string, ft: number, inch: number) =>
    quoteCommercial({ order: "section", mfr: "x", model, secHeight: "24",
      manFt: ft, manIn: inch, secKind: "bt", stile: "single", color: "White" } as never);

  it("rejects inches outside 0-11 — an 8'20\" section used to price", () => {
    expect(sec("TS150", 8, 20).priced).toBe(false);
    expect(sec("TS150", 8, 20).incomplete).toMatch(/0-11/);
    expect(sec("TS150", 8, 12).priced).toBe(false);
    expect(sec("TS150", 8, 11).priced).toBe(true);
  });

  it("holds each model to its own maximum width", () => {
    const cases: [string, number, number][] = [
      ["TS125", 18, 4], ["TS150", 26, 0], ["TS200", 28, 0],
      ["524", 28, 0], ["524V", 28, 0], ["524S", 28, 0],
      ["591", 28, 0], ["592", 28, 0], ["593", 28, 0],
      ["2415", 28, 0], ["2415V", 28, 0], ["2415S", 28, 0],
    ];
    for (const [model, ft, inch] of cases) {
      expect(sec(model, ft, inch).priced).toBe(true);          // at the limit: fine
      expect(sec(model, ft, inch + 1).priced).toBe(false);     // one inch over: blocked
    }
  });

  it("TS125 stops well before the others", () => {
    expect(sec("TS125", 20, 0).priced).toBe(false);
    expect(sec("TS200", 20, 0).priced).toBe(true);
  });

  it("names the limit so the counter knows why", () => {
    expect(sec("TS125", 19, 0).incomplete).toContain("18′4″");
  });
});

describe("section colour availability", () => {
  const sec = (model: string, color: string) =>
    quoteCommercial({ order: "section", mfr: "x", model, secHeight: "24",
      manFt: 10, manIn: 0, secKind: "bt", stile: "single", color } as never);

  it("TS125 and TS200 are white only", () => {
    for (const m of ["TS125", "TS200"]) {
      expect(sec(m, "White").priced).toBe(true);
      expect(sec(m, "Brown").priced).toBe(false);
      expect(sec(m, "Brown").incomplete).toMatch(/White only/);
    }
  });

  it("the models the table lists in brown still take brown", () => {
    for (const m of ["524", "3720", "TS150", "591", "592", "593", "2415"]) {
      expect(sec(m, "Brown").priced).toBe(true);
    }
  });

  it("brown and white cost the same where both are offered", () => {
    expect(sec("TS150", "Brown").unitPrice).toBe(sec("TS150", "White").unitPrice);
  });

  it("colour reaches the description", () => {
    expect(sec("TS150", "Brown").description).toContain("in the color Brown");
    expect(sec("TS200", "White").description).toContain("in the color White");
  });
});
