import { describe, it, expect } from "vitest";
import {
  highLiftPrice, highLiftChoices, isAngleMount,
  HIGH_LIFT_STEP, HIGH_LIFT_MAX_DOOR_FT, canTakeHighLift, maxHighLift, mountPhrase,
} from "./data/track-lift";
import { quoteResidential } from "./engine";

const at = (mount: "bracket" | "continuous_angle", incline: "straight_incline" | "breakaway" | "deg25",
            heightFt: number, inches: number, heightIn = 0) =>
  highLiftPrice({ mount, incline, heightFt, heightIn, inches });

describe("high lift — the up-to-8ft table", () => {
  it("prices the base figure at 54 inches and below", () => {
    // Every figure from TRACK OPTIONS - 4050, net book 09/15/2026.
    expect(at("bracket", "straight_incline", 7, 54).price).toBe(111.59);
    expect(at("continuous_angle", "straight_incline", 7, 54).price).toBe(143.26);
    expect(at("bracket", "breakaway", 7, 54).price).toBe(130.44);
    expect(at("continuous_angle", "breakaway", 7, 54).price).toBe(156.08);
    expect(at("bracket", "deg25", 7, 54).price).toBe(153.82);
    expect(at("continuous_angle", "deg25", 7, 54).price).toBe(179.45);
  });

  it("charges the same base anywhere below 54 inches", () => {
    for (const n of [3, 12, 24, 36, 48]) {
      expect(at("bracket", "deg25", 7, n).price, `${n}"`).toBe(153.82);
    }
  });

  it("adds the per-inch rate above 54", () => {
    // 60" on bracket/25 degree is 153.82 + 6 x 4.52.
    expect(at("bracket", "deg25", 7, 60).price).toBeCloseTo(153.82 + 6 * 4.52, 2);
    expect(at("continuous_angle", "straight_incline", 7, 66).price).toBeCloseTo(143.26 + 12 * 4.03, 2);
    expect(at("bracket", "breakaway", 7, 72).price).toBeCloseTo(130.44 + 18 * 4.00, 2);
  });

  it("treats 8'0\" exactly as the shorter table", () => {
    expect(at("bracket", "deg25", 8, 54).price).toBe(153.82);
  });
});

describe("high lift — the 8'1\" and over table", () => {
  it("is cheaper than the shorter table on every row", () => {
    // Easy to get backwards: a taller door costs LESS for high lift.
    for (const inc of ["straight_incline", "breakaway", "deg25"] as const) {
      for (const m of ["bracket", "continuous_angle"] as const) {
        const short = at(m, inc, 8, 54).price;
        const tall = at(m, inc, 9, 54).price;
        expect(tall, `${m} ${inc}`).toBeLessThan(short);
      }
    }
  });

  it("prices the figures the book gives", () => {
    expect(at("bracket", "straight_incline", 9, 54).price).toBe(58.81);
    expect(at("continuous_angle", "straight_incline", 9, 54).price).toBe(96.51);
    expect(at("bracket", "breakaway", 9, 54).price).toBe(58.81);
    expect(at("continuous_angle", "breakaway", 9, 54).price).toBe(84.45);
    expect(at("bracket", "deg25", 9, 54).price).toBe(116.87);
    expect(at("continuous_angle", "deg25", 9, 54).price).toBe(142.51);
  });

  it("switches table at 8'1\", not 9'0\"", () => {
    expect(at("bracket", "deg25", 8, 54, 0).price).toBe(153.82);
    expect(at("bracket", "deg25", 8, 54, 1).price).toBe(116.87);
  });

  it("keeps the same per-inch rates", () => {
    expect(at("bracket", "deg25", 9, 60).price).toBeCloseTo(116.87 + 6 * 4.52, 2);
  });
});

describe("high lift — what it refuses", () => {
  it("only sells in 3-inch increments", () => {
    expect(at("bracket", "deg25", 7, 3).reason).toBeUndefined();
    expect(at("bracket", "deg25", 7, 4).reason).toMatch(/increments/);
    expect(at("bracket", "deg25", 7, 55).reason).toMatch(/increments/);
  });

  it("declines a door over 14 feet", () => {
    expect(at("bracket", "deg25", 14, 54).reason).toBeUndefined();
    expect(at("bracket", "deg25", 15, 54).reason).toMatch(/14/);
    expect(at("bracket", "deg25", 14, 54, 2).reason).toMatch(/14/);
  });

  it("declines lift above 120 inches", () => {
    // Needs a door tall enough that the height cap is not what refuses first:
    // a 7-footer tops out at 81".
    expect(at("bracket", "deg25", 14, 120).reason).toBeUndefined();
    expect(at("bracket", "deg25", 14, 123).reason).toMatch(/120/);
  });

  it("returns nothing at all for no lift", () => {
    expect(at("bracket", "deg25", 7, 0)).toEqual({ price: 0, label: "" });
  });

  it("never returns a price alongside a reason", () => {
    const bad = at("bracket", "deg25", 20, 54);
    expect(bad.reason).toBeTruthy();
    expect(bad.price).toBe(0);
  });
});

describe("high lift — mounts and choices", () => {
  it("prices both angle mounts the same", () => {
    expect(isAngleMount("continuous_angle")).toBe(true);
    expect(isAngleMount("reverse_angle")).toBe(true);
    expect(isAngleMount("bracket")).toBe(false);
    expect(highLiftPrice({ mount: "continuous_angle", incline: "deg25", heightFt: 7, inches: 54 }).price)
      .toBe(highLiftPrice({ mount: "reverse_angle", incline: "deg25", heightFt: 7, inches: 54 }).price);
  });

  it("offers every 3-inch step to 120 when no height is given", () => {
    const c = highLiftChoices();
    expect(c[0]).toBe(HIGH_LIFT_STEP);
    expect(c[c.length - 1]).toBe(120);
    expect(c.every((n) => n % HIGH_LIFT_STEP === 0)).toBe(true);
  });

  it("caps at the door height less 3 inches", () => {
    // Above that the door is full vertical lift, a different track entirely.
    expect(maxHighLift(7, 0)).toBe(81);
    expect(maxHighLift(8, 0)).toBe(93);
    expect(maxHighLift(9, 0)).toBe(105);
    expect(highLiftChoices(7, 0).slice(-1)[0]).toBe(81);
    expect(highLiftChoices(8, 0).slice(-1)[0]).toBe(93);
  });

  it("refuses a lift above that cap", () => {
    expect(at("bracket", "deg25", 7, 81).reason).toBeUndefined();
    expect(at("bracket", "deg25", 7, 84).reason).toMatch(/full vertical/i);
  });

  it("names an angle mount the way the commercial tool does", () => {
    expect(mountPhrase("continuous_angle")).toBe('2" continuous angle mount track to wood');
    expect(mountPhrase("reverse_angle")).toBe('2" reverse angle mount track to steel');
    expect(mountPhrase("bracket")).toBe("");
  });

  it("is torsion only", () => {
    expect(canTakeHighLift("torsion")).toBe(true);
    expect(canTakeHighLift("extension")).toBe(false);
  });

  it("caps at the door height the book allows", () => {
    expect(HIGH_LIFT_MAX_DOOR_FT).toBe(14);
  });
});

describe("high lift on a quote", () => {
  const dim = { widthFt: 16, widthIn: 0, heightFt: 7, heightIn: 0 };
  const base = { style: "solid" as const, color: "White", track: "r12" as const,
                 spring: "torsion" as const, lock: "none" as const };

  it("adds a line, and only when lift was asked for", () => {
    const plain = quoteResidential("4050", dim, base);
    const lifted = quoteResidential("4050", dim, {
      ...base, trackMount: "bracket", incline: "deg25", highLiftInches: 60,
    });
    // Upcharges collapse into the base line by design — the counter should not
    // see an itemised track charge — so the difference is what to assert on.
    expect(lifted.unitPrice - plain.unitPrice).toBeCloseTo(153.82 + 6 * 4.52, 2);
  });

  it("adds nothing when the configuration cannot be built", () => {
    // 55" is not a 3-inch step, so there is no price to add.
    const plain = quoteResidential("4050", dim, base);
    const q = quoteResidential("4050", dim, {
      ...base, trackMount: "bracket", incline: "deg25", highLiftInches: 55,
    });
    expect(q.unitPrice).toBeCloseTo(plain.unitPrice, 2);
  });

  it("uses the cheaper table on a 9-foot door", () => {
    const tall = { ...dim, heightFt: 9 };
    const a = quoteResidential("4050", dim, { ...base, trackMount: "bracket", incline: "deg25", highLiftInches: 54 });
    const b = quoteResidential("4050", tall, { ...base, trackMount: "bracket", incline: "deg25", highLiftInches: 54 });
    const plainShort = quoteResidential("4050", dim, base);
    const plainTall = quoteResidential("4050", tall, base);
    expect(a.unitPrice - plainShort.unitPrice).toBeCloseTo(153.82, 2);
    expect(b.unitPrice - plainTall.unitPrice).toBeCloseTo(116.87, 2);
  });
});
