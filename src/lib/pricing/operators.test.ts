import { describe, it, expect } from "vitest";
import { OPERATOR_SECTIONS, OPERATOR_GROUPS } from "./data/operators";
import { QB_ITEMS } from "../qb/iif";

describe("LiftMaster operators", () => {
  it("kept every row from the sheet", () => {
    const n = OPERATOR_SECTIONS.reduce((a, s) => a + s.items.length, 0);
    expect(OPERATOR_SECTIONS.length).toBe(15);
    expect(n).toBe(143);
  });

  it("puts every section in one of the two groups", () => {
    for (const s of OPERATOR_SECTIONS) {
      expect(OPERATOR_GROUPS).toContain(s.group as (typeof OPERATOR_GROUPS)[number]);
      expect(s.items.length, `${s.name} is empty`).toBeGreaterThan(0);
    }
  });

  it("files the drives as operators and the add-ons as accessories", () => {
    const groupOf = (name: string) => OPERATOR_SECTIONS.find((s) => s.name === name)?.group;
    for (const s of ["LIFTMASTER LOGIC 5", "MAXUM OPERATORS", "RESIDENTIAL BELT DRIVES"]) {
      expect(groupOf(s), s).toBe("Operators");
    }
    for (const s of ["REMOTES", "KEYPADS", "PHOTOEYES", "BELT RAILS", "SPROCKET"]) {
      expect(groupOf(s), s).toBe("Accessories");
    }
  });

  it("carries a description for every model, and no price at all", () => {
    for (const s of OPERATOR_SECTIONS) {
      for (const o of s.items) {
        expect(o.desc.length, `${s.name} / ${o.name}`).toBeGreaterThan(0);
        // Pricing is not set — nothing here should look like a rate.
        expect(o).not.toHaveProperty("price");
      }
    }
  });

  it("bills to the OPERATORS item", () => {
    expect(QB_ITEMS.operators).toBe("OPERATORS");
  });
});
