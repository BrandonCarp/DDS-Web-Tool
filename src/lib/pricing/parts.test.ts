import { describe, it, expect } from "vitest";
import { PART_CATEGORIES, partDescription, partPrice, partQuantity, billedFeet, feetLimits } from "./data/parts";
import { QB_ITEMS } from "../qb/iif";

const find = (cat: string, name: string) => {
  const c = PART_CATEGORIES.find((x) => x.name === cat);
  const p = c?.items.find((i) => i.name === name);
  if (!p) throw new Error(`${cat} / ${name} not in the parts list`);
  return p;
};

describe("parts list", () => {
  it("generated every category with at least one item", () => {
    expect(PART_CATEGORIES.length).toBeGreaterThan(20);
    for (const c of PART_CATEGORIES) {
      expect(c.items.length, `${c.name} is empty`).toBeGreaterThan(0);
    }
  });

  it("never carries a zero price — those rows are headings, not stock", () => {
    for (const c of PART_CATEGORIES) {
      for (const i of c.items) {
        expect(i.price, `${c.name} / ${i.name}`).toBeGreaterThan(0);
        expect(i.desc.length, `${c.name} / ${i.name} has no description`).toBeGreaterThan(0);
      }
    }
  });

  it("writes the footage onto a per-foot description", () => {
    // The sheet leaves a trailing comma for exactly this.
    // Raw track names the stick it bills (below): 10FT asked, 12FT sold.
    expect(partDescription(find("TRACKS", '2" RAW TRACK'), 10)).toBe('2" RAW TRACK,  12FT');
    expect(partDescription(find("BRUSH SEAL / RETAINERS", '1" BRUSH SEAL'), 50)).toBe(
      '1" BRUSH SEAL,  50FT',
    );
    expect(partDescription(find("RETAINERS", '2" U RETAINER'), 8)).toBe('2"  U  RETAINER,  8FT');
  });

  it("extends a per-foot part into the rate, keeping quantity at 1", () => {
    expect(partPrice(find("TRACKS", '2" RAW TRACK'), 10)).toBe(45); // a 12FT stick x 3.75
    expect(partPrice(find("BRUSH SEAL / RETAINERS", '1" BRUSH SEAL'), 50)).toBe(137.5);
    expect(partPrice(find("RETAINERS", '2" U RETAINER'), 8)).toBe(30);
  });

  it("leaves fixed-price parts alone whatever footage is passed", () => {
    const strut = find("STRUTS", PART_CATEGORIES.find((c) => c.name === "STRUTS")!.items[0].name);
    expect(strut.perFoot).toBeFalsy();
    expect(partPrice(strut, 99)).toBe(strut.price);
    expect(partDescription(strut, 99)).toBe(strut.desc);
  });

  it("marks the per-foot families and nothing else", () => {
    const perFoot = PART_CATEGORIES.flatMap((c) =>
      c.items.filter((i) => i.perFoot).map((i) => c.name),
    );
    expect(new Set(perFoot)).toEqual(
      new Set(["BRUSH SEAL / RETAINERS", "RETAINERS", "TRACKS"]),
    );
    // Angle and struts are pre-cut at a set price, not sold by the foot.
    for (const cat of ["ANGLE", "STRUTS"]) {
      expect(find(cat, PART_CATEGORIES.find((c) => c.name === cat)!.items[0].name).perFoot).toBeFalsy();
    }
  });

  it("strips the sheet's baked-in pair off torsion springs", () => {
    const spring = find("TORSION SPRINGS", '100LBS,  2 X 218 X 23-1/4"');
    expect(spring.hands).toBe(true);
    expect(spring.desc).not.toMatch(/RIGHT|LEFT/);
    expect(spring.desc).toBe('TORSION SPRINGS,  2" ID,  218 WIRE,  23-1/4" LONG');
  });

  it("rebuilds the hand counts from what the counter enters", () => {
    const spring = find("TORSION SPRINGS", '100LBS,  2 X 218 X 23-1/4"');
    expect(partDescription(spring, 0, 1, 1)).toMatch(/\[1\] - RIGHT WOUND AND \[1\] - LEFT WOUND$/);
    expect(partDescription(spring, 0, 2, 2)).toMatch(/\[2\] - RIGHT WOUND AND \[2\] - LEFT WOUND$/);
    expect(partDescription(spring, 0, 0, 1)).toMatch(/\[1\] - LEFT WOUND$/);
    expect(partDescription(spring, 0, 2, 0)).toMatch(/\[2\] - RIGHT WOUND$/);
  });

  it("keeps springs at the single price and counts them in the quantity", () => {
    const spring = find("TORSION SPRINGS", '100LBS,  2 X 218 X 23-1/4"');
    expect(partPrice(spring)).toBe(46.95); // each, not the pair
    expect(partQuantity(spring, 1, 1)).toBe(2);
    expect(partQuantity(spring, 2, 1)).toBe(3);
    expect(partQuantity(spring, 0, 1)).toBe(1);
  });

  it("leaves quantity at 1 for everything that is not hand-ordered", () => {
    expect(partQuantity(find("TRACKS", '2" RAW TRACK'), 3, 3)).toBe(1);
    expect(partQuantity(find("EXTENSION SPRINGS", "7FT EXT KIT"), 3, 3)).toBe(1);
  });

  it("keeps the assembled track sets on a fixed price", () => {
    const set = find("TRACKS", "20R,  12' AND UP");
    expect(set.perFoot).toBeFalsy();
    expect(set.price).toBe(318);
  });
});

describe("QuickBooks item names", () => {
  it("bills every shelf part to PARTS, with vinyl and operators separate", () => {
    expect(QB_ITEMS.parts).toBe("PARTS");
    expect(QB_ITEMS.vinyl).toBe("VINYL");
    expect(QB_ITEMS.operators).toBe("OPERATORS");
  });
});

describe("lock bars cut to length (9/10/2026)", () => {
  const assembly = () => find("LOCKS", "LOCK BAR ASSEMBLY");
  const bar = () => find("LOCKS", "LOCKBAR");

  it("puts the length on the line in place of the sheet's 8FT, to the inch", () => {
    expect(partDescription(assembly(), 9.5)).toBe("9'6\" LOCKBAR ASSEMBLY");
    expect(partDescription(assembly(), 10)).toBe("10FT LOCKBAR ASSEMBLY");
    expect(partDescription(bar(), 16 + 2 / 12)).toBe("16'2\" LOCKBAR");
    expect(partDescription(assembly())).toBe("8FT LOCKBAR ASSEMBLY"); // no length given: the sheet's line
  });

  it("costs the same at any length — not sold by the foot", () => {
    expect(partPrice(bar(), 1)).toBe(bar().price);
    expect(partPrice(bar(), 18)).toBe(bar().price);
    expect(partQuantity(bar())).toBe(1);
  });

  it("is cut from 1FT to 18FT; the lock bag beside it takes no length", () => {
    expect(feetLimits(assembly())).toEqual({ min: 1, max: 18 });
    expect(feetLimits(bar())).toEqual({ min: 1, max: 18 });
    expect(feetLimits(find("LOCKS", "LOCK BAG"))).toBeNull();
    expect(partDescription(find("LOCKS", "LOCK BAG"), 9)).toBe("LOCK BAG ASSEMBLY");
  });
});

describe("raw track sticks (30/9/2026)", () => {
  const raw2 = () => find("TRACKS", '2" RAW TRACK');
  const raw3 = () => find("TRACKS", '3" RAW TRACK');

  it("bills a 12FT stick up to 12FT and a 24FT stick above", () => {
    for (const [asked, billed] of [[1, 12], [10, 12], [12, 12], [13, 24], [24, 24]]) {
      expect(billedFeet(raw2(), asked), `${asked}FT`).toBe(billed);
    }
    expect(partPrice(raw3(), 13)).toBe(24 * 8.5);
  });

  it("is sold from 1FT to 24FT, and nothing else is limited", () => {
    expect(feetLimits(raw2())).toEqual({ min: 1, max: 24 });
    expect(feetLimits(raw3())).toEqual({ min: 1, max: 24 });
    expect(feetLimits(find("BRUSH SEAL / RETAINERS", '1" BRUSH SEAL'))).toBeNull();
  });
});
