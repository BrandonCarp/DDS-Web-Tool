import { describe, expect, it } from "vitest";
import {
  OPERATORS, OPERATOR_KINDS, OPERATOR_USES, kindsFor, locate, operatorLabel, operatorUse, operatorsFor, railLabel, railLengthsFor,
} from "./data/operator-kinds";
import { OPERATOR_CATALOGUE } from "./data/operator-catalogue";

// The Operators tab's sorting (Brandon, 13/10/2026): Residential or
// Commercial, Belt / Chain / Side Mount, the rail length, the operator.
describe("operators sorted by use, kind and rail", () => {
  it("covers every operator in the Operators group once", () => {
    const all = OPERATOR_CATALOGUE.filter((s) => s.group === "Operators").flatMap((s) => s.items);
    expect(OPERATORS).toHaveLength(all.length);
    expect(new Set(OPERATORS.map((o) => o.item.desc)).size).toBe(all.length);
    for (const use of OPERATOR_USES) {
      for (const k of OPERATOR_KINDS) {
        const n = k.id === "sidemount" ? operatorsFor(use, k.id).length : railLengthsFor(use, k.id).reduce((t: number, r) => t + operatorsFor(use, k.id, r).length, 0);
        expect(n, `${use} ${k.id}`).toBe(OPERATORS.filter((o) => o.use === use && o.kind === k.id).length);
      }
    }
  });

  it("reads residential off the section name, and the kind and rail off the description", () => {
    expect(operatorUse("RESIDENTIAL BELT DRIVES")).toBe("Residential");
    expect(operatorUse("LIFTMASTER LOGIC 5")).toBe("Commercial");
    expect(operatorUse("LIGHT COMMERCIAL SIDEMOUNT")).toBe("Commercial");
    const at = (desc: string) => locate(desc)!;
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL 6580L,  7FT BELT RAIL")).toMatchObject({ use: "Residential", kind: "belt", rail: 7 });
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL 2240L,  10FT CHAIN RAIL")).toMatchObject({ use: "Residential", kind: "chain", rail: 10 });
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL 4690L,  14FT I-BEAM RAIL")).toMatchObject({ use: "Residential", kind: "chain", rail: 14 });
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL 8500")).toMatchObject({ use: "Residential", kind: "sidemount", rail: null });
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL T101L5,  12FT TROLLEY RAIL")).toMatchObject({ use: "Commercial", kind: "chain", rail: 12 });
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL GH101L5")).toMatchObject({ use: "Commercial", kind: "sidemount" });
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL JHDC12X1BMC,  EXTENDED,  1200 LBS,  30 CYCLES")).toMatchObject({ use: "Commercial", kind: "sidemount" });
    // A head-only row takes its section's kind.
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL 6690L,  HEAD ONLY")).toMatchObject({ use: "Residential", kind: "belt", rail: "head" });
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL 2240L,  HEAD ONLY")).toMatchObject({ use: "Residential", kind: "chain", rail: "head" });
    expect(at("LIFTMASTER ELECTRIC OPERATOR MODEL T101L5,  HEAD ONLY")).toMatchObject({ use: "Commercial", kind: "chain", rail: "head" });
    expect(locate("nothing")).toBeNull();
  });

  it("offers each use the kinds it has, and each belt or chain kind its rail lengths", () => {
    expect(kindsFor("Residential").map((k) => k.label)).toEqual(["Belt Operators", "Chain Operators", "Side Mount Operators"]);
    expect(kindsFor("Commercial").map((k) => k.label)).toEqual(["Chain Operators", "Side Mount Operators"]);   // no commercial belt drives on the list
    expect(railLengthsFor("Residential", "belt")).toEqual([7, 8, 10, "head"]);
    expect(railLengthsFor("Residential", "chain")).toEqual([7, 8, 10, 12, 14, "head"]);
    expect(railLengthsFor("Commercial", "chain")).toEqual([8, 10, 12, 14, 16, "head"]);
    expect(railLengthsFor("Residential", "sidemount")).toEqual([]);
    expect(railLabel(7)).toBe("7FT");
    expect(railLabel("head")).toBe("Head only");
  });

  it("lists the operators at a rail length, labelled without the brand or the rail", () => {
    const belt7 = operatorsFor("Residential", "belt", 7);
    expect(belt7.map(operatorLabel)).toEqual(["6580L", "6690L"]);
    expect(operatorsFor("Residential", "chain", 7).map(operatorLabel)).toEqual(["2220L", "2420L", "87802", "2240L", "4690L"]);
    expect(operatorsFor("Residential", "chain", 14).map(operatorLabel)).toEqual(["87802", "ATSWT", "4690L"]);
    expect(operatorsFor("Residential", "belt", "head").map(operatorLabel)).toEqual(["6580L, HEAD ONLY", "6690L, HEAD ONLY"]);
    expect(operatorsFor("Commercial", "chain", 8).map(operatorLabel)).toContain("TDC12S1BMC, STANDARD, 1200 LBS, 20 CYCLES");
    expect(operatorsFor("Commercial", "chain", 8).map(operatorLabel)).toContain("T101L5");
    expect(operatorsFor("Residential", "sidemount").map(operatorLabel)).toEqual(["8500", "98022", "98032"]);
    expect(operatorsFor("Commercial", "sidemount").map(operatorLabel)).toContain("MODEL DC7AH, MAXUM BATTERY BACK UP");
    expect(operatorsFor("Commercial", "sidemount").map(operatorLabel)).toContain("LJ8900W");
  });
});
