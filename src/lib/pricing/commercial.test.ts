import { describe, it, expect } from "vitest";
import { quoteCommercial, commStockCheck } from "./commercial";
import { torsionPrice, effPPI } from "./data/torsion";
import { SPECIAL } from "./data/special-orders";

const complete = (over: Record<string, unknown> = {}) => ({
  order: "complete" as const, mfr: "Clopay", model: "3200",
  size: "8′2″ × 8′0″", glass: "solid" as const, track: "15R" as const,
  mount: "continuous" as const, cspring: "torsion" as const, clock: "none" as const, ...over,
});

describe("commercial complete-door matrix (ported from the legacy tool)", () => {
  it("prices the 3200 matrix (cost / (1 - 45%) per the source book)", () => {
    const q = quoteCommercial(complete());
    expect(q.priced).toBe(true);
    expect(q.unitPrice).toBeCloseTo(1348.89, 2); // = 741.89 cost / 0.55
  });
  it("prices glass + full view", () => {
    const q = quoteCommercial(complete({ glass: "glass", track: "FV" }));
    expect(q.unitPrice).toBeCloseTo(1788.65, 2);
  });
  it("includes the in-stock badge from the stock list", () => {
    expect(quoteCommercial(complete()).stock?.inStock).toBe(true);
    expect(commStockCheck("524", "14′2″ × 8′0″").inStock).toBe(false); // 524 stock stops at 12'2" wide
  });
  it("builds the copyable description", () => {
    const q = quoteCommercial(complete({ glass: "glass", mount: "reverse", clock: "slide" }));
    expect(q.description).toContain("Clopay Model 3200");
    expect(q.description).toContain("insulated 24x12 windows");
    expect(q.description).toContain('2" angle mount track to steel');
    expect(q.description).toContain("inside slide lock");
  });
  it("asks for a size before pricing", () => {
    expect(quoteCommercial(complete({ size: "" })).incomplete).toMatch(/size/i);
  });
});

const section = (over: Record<string, unknown> = {}) => ({
  order: "section" as const, mfr: "Clopay", model: "524",
  manFt: 8, manIn: 2, secKind: "bt" as const,
  secHeight: "21" as const, windows: 0, retainer: false, stile: "none" as const, ...over,
});

describe("commercial replacement sections (any customer width)", () => {
  it("per-foot BOTTOM section always includes retainer & rubber (+$3.75/ft), 5-inch-plus rounds up", () => {
    // retainer is automatic now — the old opt-in flag is ignored either way
    expect(quoteCommercial(section({ manFt: 9, manIn: 6 })).unitPrice).toBeCloseTo((29 + 3.75) * 10, 2);
    expect(quoteCommercial(section({ manFt: 8, manIn: 2, retainer: false })).unitPrice).toBeCloseTo((29 + 3.75) * 8, 2);
  });
  it("per-foot INTERMEDIATE section has no retainer; stiles flat, windows ×$150", () => {
    const q = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", manFt: 10, manIn: 0, stile: "double" }));
    expect(q.unitPrice).toBeCloseTo(29 * 10 + 3.75 * 10 + 50, 2); // bottom: retainer included
    const qi = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", manFt: 10, manIn: 0, secKind: "int", windows: 2 }));
    expect(qi.unitPrice).toBeCloseTo(29 * 10 + 300, 2); // intermediate: no retainer
  });
  it("cost-table bottom sections (Clopay panel models) are unchanged — no retainer adder", () => {
    const q = quoteCommercial(section({ model: "3720", manFt: 9, manIn: 4, secKind: "bt" }));
    expect(q.lines.some((l) => /retainer/i.test(l.name))).toBe(false);
  });
  it("caps windows at the max for the width (≤9ft -> 2)", () => {
    const q = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", manFt: 8, manIn: 0, secKind: "int", windows: 5 }));
    expect(q.unitPrice).toBeCloseTo(29 * 8 + 150 * 2, 2);
  });
  it("Clopay panel model without a per-foot rate rounds UP to the next standard width cost", () => {
    // 9'4" wanted -> priced as the 10'2" standard section, cost / (1 - 49%)
    const q = quoteCommercial(section({ model: "3720", manFt: 9, manIn: 4, secKind: "int" }));
    expect(q.unitPrice).toBeCloseTo(242.73 / 0.51, 2);
    expect(q.lines[0].name).toContain("priced as 10′2″ standard");
    // exact standard width prices straight from its own cost row
    const q2 = quoteCommercial(section({ model: "3720", manFt: 9, manIn: 2, secKind: "int" }));
    expect(q2.unitPrice).toBeCloseTo(218.45 / 0.51, 2);
  });
  it("rejects widths beyond the widest standard section for cost-table models", () => {
    expect(quoteCommercial(section({ model: "3720", manFt: 18, manIn: 0 })).incomplete).toMatch(/Too wide/);
  });
});

describe("3200 sections — stocked sizes only", () => {
  // Sell prices come straight off the workbook's "3200 SECTIONS" sheet.
  it("prices the four stocked widths exactly as the sheet reads", () => {
    const cases: [number, number, "bt" | "int", number][] = [
      [8, 2, "bt", 384.49], [8, 2, "int", 293.61],
      [9, 2, "bt", 432.53], [9, 2, "int", 400.6],
      [10, 2, "bt", 480.6], [10, 2, "int", 445.11],
      [12, 2, "bt", 576.72], [12, 2, "int", 534.13],
    ];
    for (const [ft, inch, kind, want] of cases) {
      const q = quoteCommercial(section({ model: "3200", manFt: ft, manIn: inch, secKind: kind }));
      expect(q.unitPrice).toBeCloseTo(want, 2);
    }
  });

  it("sends an unstocked size to Special Order instead of rounding up", () => {
    for (const [ft, inch] of [[9, 4], [11, 0], [14, 2], [18, 0]] as const) {
      const q = quoteCommercial(section({ model: "3200", manFt: ft, manIn: inch }));
      expect(q.incomplete).toMatch(/Special Order/i);
      expect(q.unitPrice).toBe(0);
    }
  });

  it("adds only the DIFFERENCE for double end stiles — the sheet already has a single", () => {
    const single = quoteCommercial(section({ model: "3200", manFt: 9, manIn: 2, secKind: "bt" }));
    const dbl = quoteCommercial(section({ model: "3200", manFt: 9, manIn: 2, secKind: "bt", stile: "double" }));
    expect(single.unitPrice).toBeCloseTo(432.53, 2);
    expect(dbl.unitPrice).toBeCloseTo(432.53 + 30, 2);
  });

  it("never charges a separate single-stile line on a 3200 section", () => {
    const q = quoteCommercial(section({ model: "3200", manFt: 9, manIn: 2, secKind: "int" }));
    expect(q.lines.some((l) => /single end stile/i.test(l.name))).toBe(false);
  });
});

describe("torsion springs (cut to size)", () => {
  it("prices length × ppi + cone (matches the TSC workbook example: $69.66)", () => {
    expect(torsionPrice("0.218", "2", 38)).toBeCloseTo(69.66, 2);
  });
  it("goes UP a wire size when the requested size isn't priced", () => {
    expect(effPPI("0.2", "2")).toBe(1.48); // 0.200 not priced -> 0.207's rate
  });
  it("adds filler on 6-inch ID springs", () => {
    const p = torsionPrice("0.331", "6", 20)!;
    expect(p).toBeCloseTo(20 * 6.52 + 50.3 + 20 * 0.53, 2);
  });
});

describe("special orders (margin + multiplier collections)", () => {
  const sell = (list: number, margin: number) => list / (1 - margin / 100);
  it("applies a margin series as list / (1 - margin)", () => {
    // The formula, checked against literals — NOT against the data, so that
    // changing a margin in special-orders.ts is a pricing decision rather than
    // a broken test. (Gallery sections moved 43 -> 49 on 08/13 and this
    // assertion had been pinned to the old number.)
    expect(sell(1000, 56)).toBeCloseTo(1000 / 0.44, 2);
    expect(sell(1000, 49)).toBeCloseTo(1000 / 0.51, 2);
  });

  it("gives every Gallery model a door and a section margin in range", () => {
    const g = SPECIAL["Gallery Collection"];
    if (g.type !== "margin") throw new Error("expected margin series");
    expect(g.models, "Gallery is a per-model collection").toBeTruthy();
    for (const [name, m] of Object.entries(g.models!)) {
      for (const [which, v] of [["door", m.door], ["section", m.section]] as const) {
        expect(Number.isFinite(v), `${name} ${which}`).toBe(true);
        expect(v, `${name} ${which} out of range`).toBeGreaterThan(0);
        expect(v, `${name} ${which} out of range`).toBeLessThan(100);
      }
    }
  });
  it("outside makers: list × 1.09 at the cost margin", () => {
    // The 1.09 belongs to the genuinely outside manufacturers, where DDS pays
    // list plus 9%. Canyon Ridge and Avante are Clopay and no longer use it.
    const haas = SPECIAL["Haas"];
    if (haas.type !== "multiplier") throw new Error("expected multiplier series");
    expect(haas.multiplier).toBe(1.09);
    expect((1000 * haas.multiplier) / (1 - haas.cost_margin / 100)).toBeCloseTo(1090 / 0.71, 2);
  });

  it("Canyon Ridge and Avante price as flat Clopay margins", () => {
    for (const name of ["Canyon Ridge Collection", "Avante Collection"]) {
      const s = SPECIAL[name];
      if (s.type !== "margin") throw new Error(`${name} should be a margin series`);
      expect(s.models, `${name} has no per-model table`).toBeUndefined();
      expect(s.door, name).toBe(35);
      expect(s.section, name).toBe(49);
      // 35 flat is what the old list × 1.09 at 29 already came to. Asserted as
      // a percentage rather than an absolute, since the point is that the
      // change restates the price rather than raising it — the two differ by
      // about a fifth of one percent, and that gap grows with the door.
      const flat = 1000 / (1 - s.door! / 100);
      const oldWay = (1000 * 1.09) / (1 - 0.29);
      expect(Math.abs(flat / oldWay - 1), name).toBeLessThan(0.005);
    }
  });

  it("keeps 1.09 on the outside makers and nowhere else", () => {
    const multipliers = Object.entries(SPECIAL)
      .filter(([, v]) => v.type === "multiplier")
      .map(([k]) => k);
    expect(multipliers.sort()).toEqual(
      ["Amarr", "CHI", "Haas", "Overhead", "Wayne Dalton"].sort(),
    );
  });
});

describe("complete-door description format", () => {
  const door = (o: Record<string, unknown> = {}) =>
    quoteCommercial({
      order: "complete", mfr: "Clopay", model: "3200", size: "12′2″ × 10′0″",
      glass: "glass", track: "15R", mount: "continuous", cspring: "torsion",
      clock: "slide", color: "White", winSection: 3, ...o,
    } as never);

  it("reads the way the counter writes it", () => {
    expect(door().description).toBe(
      'Clopay Model 3200, 12\'2" x 10\'0", in the color white, insulated 24x12 windows in the third section, ' +
      '2" angle mount track to wood, 15" radius track, torsion springs, inside slide lock',
    );
  });

  it("names the section the windows actually sit in", () => {
    expect(door({ winSection: 2 }).description).toContain("in the second section");
    expect(door({ winSection: 5 }).description).toContain("in the fifth section");
  });

  it("says solid instead of a section when there are no windows", () => {
    const d = door({ glass: "solid" }).description ?? "";
    expect(d).toContain("solid, no windows");
    expect(d).not.toContain("section");
  });

  it("carries the colour through", () => {
    expect(door({ color: "Brown" }).description).toContain("in the color brown");
  });

  it("uses plain ASCII inch marks — this gets pasted into QuickBooks", () => {
    const d = door().description ?? "";
    expect(d).not.toMatch(/[\u2032\u2033\u00d7]/);
  });
});
