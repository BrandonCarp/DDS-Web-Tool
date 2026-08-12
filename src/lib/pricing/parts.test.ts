import { describe, it, expect } from "vitest";
import { PART_CATEGORIES, partDescription, partPrice, partQuantity } from "./data/parts";
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
    expect(partDescription(find("TRACKS", '2" RAW TRACK'), 10)).toBe('2" RAW TRACK,  10FT');
    expect(partDescription(find("BRUSH SEAL / RETAINERS", '1" BRUSH SEAL'), 50)).toBe(
      '1" BRUSH SEAL,  50FT',
    );
    expect(partDescription(find("RETAINERS", '2" U RETAINER'), 8)).toBe('2"  U  RETAINER,  8FT');
  });

  it("extends a per-foot part into the rate, keeping quantity at 1", () => {
    expect(partPrice(find("TRACKS", '2" RAW TRACK'), 10)).toBe(37.5); // 10 x 3.75
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
    expect(partDescription(spring, 0, 1, 1)).toMatch(/\[1\] - RIGHT AND \[1\] - LEFT$/);
    expect(partDescription(spring, 0, 2, 2)).toMatch(/\[2\] - RIGHTS AND \[2\] - LEFTS$/);
    expect(partDescription(spring, 0, 0, 1)).toMatch(/\[1\] - LEFT$/);
    expect(partDescription(spring, 0, 2, 0)).toMatch(/\[2\] - RIGHTS$/);
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
