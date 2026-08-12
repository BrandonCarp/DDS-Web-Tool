import { describe, it, expect } from "vitest";
import { PART_CATEGORIES, partDescription, partPrice } from "./data/parts";

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

  it("keeps the assembled track sets on a fixed price", () => {
    const set = find("TRACKS", "20R,  12' AND UP");
    expect(set.perFoot).toBeFalsy();
    expect(set.price).toBe(318);
  });
});
