import { describe, it, expect } from "vitest";
import { quoteResidential, quoteResidentialSectionsOnly, SECTIONS_ONLY_FACTOR } from "./engine";
import { partPrice, partDescription, billedFeet, PART_CATEGORIES } from "./data/parts";

const ALL_PARTS = PART_CATEGORIES.flatMap((c) => c.items);
const byName = (n: string) => ALL_PARTS.find((p) => p.name === n);

const dim = { widthFt: 8, widthIn: 0, heightFt: 7, heightIn: 0 };
const plainOpts = {
  style: "solid" as const, color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const,
};

describe("SECTIONS ONLY", () => {
  it("is 90% of the plain door", () => {
    const door = quoteResidential("9133", dim, plainOpts);
    const so = quoteResidentialSectionsOnly("9133", dim, plainOpts);
    expect(door.unitPrice).toBeCloseTo(850.01, 2);
    expect(so.unitPrice).toBeCloseTo(
      Math.round(door.unitPrice * SECTIONS_ONLY_FACTOR * 100) / 100,
      2,
    );
    expect(so.unitPrice).toBeCloseTo(765.01, 2);
  });

  it("ignores track and spring choices when setting the baseline", () => {
    // The whole point: a door configured with low headroom track and torsion
    // springs must not carry those upcharges into a price for parts that
    // include neither.
    const loaded = quoteResidentialSectionsOnly("9133", dim, {
      ...plainOpts, track: "low_headroom", spring: "torsion",
    });
    const plain = quoteResidentialSectionsOnly("9133", dim, plainOpts);
    expect(loaded.unitPrice).toBe(plain.unitPrice);
  });

  it("adds a lock back at full price, on top of the 90%", () => {
    const plain = quoteResidentialSectionsOnly("9133", dim, plainOpts);
    const bar = quoteResidentialSectionsOnly("9133", dim, { ...plainOpts, lock: "lockbar_installed" });
    const slide = quoteResidentialSectionsOnly("9133", dim, { ...plainOpts, lock: "slide" });
    expect(bar.unitPrice - plain.unitPrice).toBeCloseTo(70, 2);
    expect(slide.unitPrice - plain.unitPrice).toBeCloseTo(5, 2);
  });

  it("does not promise hardware that is not shipping", () => {
    const so = quoteResidentialSectionsOnly("9133", dim, {
      ...plainOpts, track: "low_headroom", spring: "torsion",
    });
    // Ends on "sections only" so the absence of hardware is the last thing read.
    expect(so.description).toMatch(/, no lock, sections only$/);
    expect(so.description).not.toMatch(/track/i);
    expect(so.description).not.toMatch(/spring/i);
  });

  it("keeps the lock in the wording when one is fitted", () => {
    const bar = quoteResidentialSectionsOnly("9133", dim, { ...plainOpts, lock: "lockbar_installed" });
    expect(bar.description).toMatch(/, lockbar installed, sections only$/);
  });

  it("shows one line, matching the total", () => {
    const so = quoteResidentialSectionsOnly("9133", dim, { ...plainOpts, lock: "lockbar_installed" });
    expect(so.lines).toHaveLength(1);
    expect(so.lines[0].value).toBeCloseTo(so.unitPrice, 2);
  });
});

describe("upcharges never itemise", () => {
  it("folds every adder into a single line that equals the total", () => {
    const q = quoteResidential("9133", dim, {
      ...plainOpts, track: "low_headroom", spring: "torsion", lock: "lockbar_installed",
    });
    expect(q.lines).toHaveLength(1);
    expect(q.lines[0].value).toBeCloseTo(q.unitPrice, 2);
    expect(q.unitPrice).toBeCloseTo(995.01, 2);
    for (const l of q.lines) expect(l.kind).not.toBe("add");
  });
});

describe("retainer stick lengths", () => {
  const U = byName('1-3/8" U RETAINER');
  const L = byName('2" L RETAINER');

  it("bills a U retainer over 8FT as a 16FT stick", () => {
    expect(U, "U retainer not found").toBeTruthy();
    expect(billedFeet(U!, 8)).toBe(8);
    expect(billedFeet(U!, 9)).toBe(16);
    expect(billedFeet(U!, 12)).toBe(16);
    expect(partPrice(U!, 12)).toBeCloseTo(U!.price * 16, 2);
  });

  it("bills an L retainer over 10FT as an 18FT stick", () => {
    expect(L, "L retainer not found").toBeTruthy();
    expect(billedFeet(L!, 10)).toBe(10);
    expect(billedFeet(L!, 11)).toBe(18);
    expect(partPrice(L!, 14)).toBeCloseTo(L!.price * 18, 2);
  });

  it("still bills by the foot under the threshold", () => {
    expect(partPrice(U!, 7)).toBeCloseTo(U!.price * 7, 2);
    expect(partPrice(L!, 9)).toBeCloseTo(L!.price * 9, 2);
  });

  it("says the length actually sold on the QuickBooks line", () => {
    expect(partDescription(U!, 12)).toContain("16FT");
    expect(partDescription(U!, 7)).toContain("7FT");
  });
});
