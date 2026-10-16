import { describe, it, expect } from "vitest";
import { PART_CATEGORIES, partDescription, partPrice, partQuantity, billedFeet, feetLimits } from "./data/parts";
import { JAMB_SEAL_COLORS, measuredToInch, partColors } from "./data/part-pricing";
import { SHELF_PART_CATEGORIES } from "./data/springs";
import { QB_ITEMS } from "../qb/iif";

const find = (cat: string, name: string) => {
  const c = PART_CATEGORIES.find((x) => x.name === cat);
  const p = c?.items.find((i) => i.name === name);
  if (!p) throw new Error(`${cat} / ${name} not in the parts list`);
  return p;
};
/** The same part as the shelf carries it — with the hand-kept wording and prices (springs.ts). */
const shelfPart = (cat: string, name: string) => {
  const p = SHELF_PART_CATEGORIES.find((x) => x.name === cat)?.items.find((i) => i.name === name);
  if (!p) throw new Error(`${cat} / ${name} not on the shelf`);
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
    // Raw track says the footage asked for; the stick is billed (below): 10FT asked, 12FT sold, line says 10FT.
    expect(partDescription(find("TRACKS", '2" RAW TRACK'), 10)).toBe('2" RAW TRACK,  10FT');
    expect(partDescription(find("BRUSH SEAL / RETAINERS", '1" BRUSH SEAL'), 50)).toBe(
      '1" BRUSH SEAL,  50FT',
    );
    // A U retainer counts its piece, in the shelf's wording (14/10/2026).
    expect(partDescription(shelfPart("RETAINERS", '2" U RETAINER'), 8)).toBe('2" PLASTIC U RETAINER WITH RUBBER, [1] - 8FT');
    expect(partDescription(shelfPart("RETAINERS", '1-3/8" U RETAINER'), 8.5)).toBe('1-3/8" PLASTIC U RETAINER WITH RUBBER, [1] - 8\'6"');
    // The 1-3/8" and 2" L retainers are plastic and count the piece too (16/10/2026); the 1-3/4" stays the sheet's.
    expect(partDescription(shelfPart("RETAINERS", '2" L RETAINER'), 8)).toBe('2" PLASTIC L RETAINER, [1] - 8FT');
    expect(partDescription(shelfPart("RETAINERS", '1-3/8" L RETAINER'), 8)).toBe('1-3/8" PLASTIC L RETAINER, [1] - 8FT');
    expect(partDescription(shelfPart("RETAINERS", '1-3/8" L RETAINER'), 12)).toBe('1-3/8" PLASTIC L RETAINER, [1] - 18FT');
    expect(partDescription(shelfPart("RETAINERS", '1-3/4" L RETAINER'), 8)).toBe('1-3/4"  L  RETAINER,  8FT');
    // Struts say what they are and count the piece (16/10/2026).
    expect(partDescription(shelfPart("STRUTS", "12FT STRUT"))).toBe('2-1/4" GALVANIZED STRUT, [1] - 12FT');
    expect(partDescription(shelfPart("STRUTS", "10FT STRUT"))).toBe('2-1/4" GALVANIZED STRUT, [1] - 10FT');
    expect(partDescription(shelfPart("STRUTS", '16FT STRUT - 3"'))).toBe('3" GALVANIZED STRUT, [1] - 16FT');
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

  it("says the footage asked for on the line, whatever stick it bills (12/10/2026)", () => {
    expect(partDescription(raw3(), 16)).toBe('3" RAW TRACK,  16FT');
    expect(partPrice(raw3(), 16)).toBe(24 * 8.5);
    expect(partDescription(raw2(), 7)).toBe('2" RAW TRACK,  7FT');
    expect(partPrice(raw2(), 7)).toBe(12 * 3.75);
    // A retainer still names the stick it bills.
    expect(partDescription(shelfPart("RETAINERS", '2" U RETAINER'), 12)).toBe('2" PLASTIC U RETAINER WITH RUBBER, [1] - 16FT');
    expect(partDescription(shelfPart("RETAINERS", '2" U RETAINER'), 17)).toBe('2" PLASTIC U RETAINER WITH RUBBER, [1] - 18FT');
  });

  it("is asked for in feet and inches, and the line says them", () => {
    expect(measuredToInch(raw2())).toBe(true);
    expect(measuredToInch(raw3())).toBe(true);
    expect(partDescription(raw3(), 16.5)).toBe('3" RAW TRACK,  16\'6"');
    expect(partDescription(raw2(), 7 + 3 / 12)).toBe('2" RAW TRACK,  7\'3"');
    // 12'1" is over 12 feet, so the 24FT stick; 12'0" is the 12FT one.
    expect(billedFeet(raw2(), 12 + 1 / 12)).toBe(24);
    expect(billedFeet(raw2(), 12)).toBe(12);
    expect(partPrice(raw3(), 16.5)).toBe(24 * 8.5);
  });

  it("is sold from 1FT to 24FT, and nothing else is limited", () => {
    expect(feetLimits(raw2())).toEqual({ min: 1, max: 24 });
    expect(feetLimits(raw3())).toEqual({ min: 1, max: 24 });
    expect(feetLimits(find("BRUSH SEAL / RETAINERS", '1" BRUSH SEAL'))).toBeNull();
  });
});

describe("drums (14/10/2026)", () => {
  it("say PAIR on the line, every one of them", () => {
    const drums = SHELF_PART_CATEGORIES.find((c) => c.name === "DRUMS")!;
    expect(drums.items.map((p) => p.desc)).toContain("400-8 DRUMS,  PAIR");
    for (const p of drums.items) expect(p.desc, p.name).toMatch(/ DRUMS,  PAIR$/);
    expect(partDescription(shelfPart("DRUMS", "400-8"))).toBe("400-8 DRUMS,  PAIR");
    expect(shelfPart("DRUMS", "400-8").price).toBe(12.95);
  });
});

describe("jamb seal colours (13/10/2026)", () => {
  const seal = () => find("RETAINERS", "JAMB SEAL");

  it("is sold in white, black and brown, and nothing else takes a colour", () => {
    expect(partColors(seal())).toEqual(["White", "Black", "Brown"]);
    expect(JAMB_SEAL_COLORS).toEqual(["White", "Black", "Brown"]);
    expect(partColors(find("RETAINERS", "THRESHOLD SEAL"))).toEqual([]);
    expect(partColors(find("JAMB BRACKETS", "#1 JAMB BRACKET"))).toEqual([]);
  });

  it("leads the line with the colour chosen, at the sheet's price", () => {
    expect(partDescription(seal(), 30)).toBe("WHITE JAMB SEAL,  30FT");
    expect(partDescription(seal(), 30, 0, 0, "White")).toBe("WHITE JAMB SEAL,  30FT");
    expect(partDescription(seal(), 30, 0, 0, "Black")).toBe("BLACK JAMB SEAL,  30FT");
    expect(partDescription(seal(), 30, 0, 0, "Brown")).toBe("BROWN JAMB SEAL,  30FT");
    expect(partDescription(seal(), 30, 0, 0, "Green")).toBe("WHITE JAMB SEAL,  30FT");   // not a colour it comes in
    expect(partDescription(find("RETAINERS", "THRESHOLD SEAL"), 10, 0, 0, "Brown")).toBe("THRESHOLD SEAL,  10FT");
    expect(partPrice(seal(), 30)).toBe(37.5);
  });
});

describe("solid shafts (13/10/2026)", () => {
  // Per foot from the shelf (springs.ts marks them), where the sheet lists them each.
  const shelf = (name: string) => {
    const p = SHELF_PART_CATEGORIES.find((c) => c.name === "TUBE SHAFT")?.items.find((i) => i.name === name);
    if (!p) throw new Error(`${name} not on the shelf`);
    return p;
  };
  const one = () => shelf('1" SOLID SHAFT');
  const big = () => shelf('1-1/4" SOLID SHAFT');

  it("is sold by the foot, to the inch, 1 to 24 ft", () => {
    expect(one().perFoot).toBe(true);
    expect(big().perFoot).toBe(true);
    expect(measuredToInch(one())).toBe(true);
    expect(feetLimits(one())).toEqual({ min: 1, max: 24 });
    expect(find("TUBE SHAFT", "12FT TUBE SHAFT").perFoot).toBeUndefined();   // tube shafts are still each
  });

  it("bills the 12'6\" stick up to 12'6\" and the 24FT stick past it", () => {
    for (const [asked, billed] of [[1, 12.5], [10, 12.5], [12, 12.5], [12.5, 12.5], [12 + 7 / 12, 24], [24, 24]]) {
      expect(billedFeet(one(), asked), `${asked}`).toBe(billed);
    }
    expect(partPrice(one(), 10)).toBe(Math.round(8.5 * 12.5 * 100) / 100);        // 106.25
    expect(partPrice(one(), 12 + 7 / 12)).toBe(8.5 * 24);                           // 204
    expect(partPrice(big(), 12.5)).toBe(Math.round(11.5 * 12.5 * 100) / 100);      // 143.75
    expect(partPrice(big(), 20)).toBe(11.5 * 24);                                   // 276
  });

  it("says the length asked for on the line", () => {
    expect(partDescription(one(), 10.5)).toBe('1" SOLID SHAFT,  10\'6"');
    expect(partDescription(one(), 20)).toBe('1" SOLID SHAFT,  20FT');
    expect(partDescription(big(), 12 + 7 / 12)).toBe('1-1/4" SOLID SHAFT,  12\'7"');
  });
});
