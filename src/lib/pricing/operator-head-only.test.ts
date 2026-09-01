import { describe, it, expect } from "vitest";
import {
  ALL_OPERATORS,
  OPERATOR_CATALOGUE,
  HEAD_ONLY_PRICES,
  HEAD_ONLY_SKIPPED,
} from "./data/operator-catalogue";
import { HEAD_ONLY_DEDUCTION } from "./data/operator-head-only";
import { operatorPrice, priceKey } from "./data/operator-pricing";

/** Model number out of a description, the way the derivation finds it. */
const model = (desc: string) =>
  desc.replace(/^LIFTMASTER ELECTRIC OPERATOR MODEL /, "").split(",")[0].trim();

const HEAD_ONLY = ALL_OPERATORS.filter((o) => o.desc.includes("HEAD ONLY"));
const RESIDENTIAL = new Set([
  "RESIDENTIAL CHAIN DRIVES",
  "RESIDENTIAL BELT DRIVES",
  "RESIDENTIAL SIDEMOUNT",
]);

describe("HEAD ONLY operators", () => {
  it("prices the 6580L at 375.95, the worked example", () => {
    // Brandon's own worked case: 6580L is floored at 7/8/10FT, the 7FT sells
    // for 385.95, residential deducts 10.
    const head = HEAD_ONLY.find((o) => model(o.desc) === "6580L");
    // The list column shows `name`; a rail row reads "6580L, 7FT" there, so the
    // head-only row has to read "6580L, HEAD ONLY" rather than a bare model.
    expect(head?.name).toBe("6580L, HEAD ONLY");
    expect(head?.desc).toBe(
      "LIFTMASTER ELECTRIC OPERATOR MODEL 6580L,  HEAD ONLY",
    );
    expect(operatorPrice(head!)).toBe(375.95);
  });

  it("derives every row from its own shortest rail, minus the deduction", () => {
    // The real guard. Recomputes each price independently of the module that
    // produced it, so a change to the derivation has to be deliberate.
    for (const section of OPERATOR_CATALOGUE) {
      if (section.group !== "Operators") continue;
      const deduct = RESIDENTIAL.has(section.name)
        ? HEAD_ONLY_DEDUCTION.residential
        : HEAD_ONLY_DEDUCTION.commercial;
      for (const head of section.items.filter((o) => o.desc.includes("HEAD ONLY"))) {
        // The catalogue's `name` for a rail row is "MT5011U,  8FT", so both
        // sides are matched on the model parsed out of the description.
        const rails = section.items
          .filter((o) => model(o.desc) === model(head.desc) && /\d+FT/.test(o.desc))
          .map((o) => ({ ft: Number(o.desc.match(/(\d+)FT/)![1]), item: o }))
          .sort((a, b) => a.ft - b.ft);
        expect(rails.length, `${head.name} has no rail rows`).toBeGreaterThan(0);
        const base = operatorPrice(rails[0].item);
        expect(base, `${head.name} shortest rail unpriced`).not.toBeNull();
        expect(operatorPrice(head), head.desc).toBe(
          Number((base! - deduct).toFixed(2)),
        );
      }
    }
  });

  it("labels the list row HEAD ONLY where a rail row shows its length", () => {
    for (const o of HEAD_ONLY) {
      expect(o.name, o.desc).toBe(`${model(o.desc)}, HEAD ONLY`);
      expect(o.name, o.name).not.toMatch(/\d+\s*FT/);
    }
  });

  it("strips the rail length out of the wording", () => {
    for (const o of HEAD_ONLY) {
      expect(o.desc, o.desc).toMatch(
        /^LIFTMASTER ELECTRIC OPERATOR MODEL .+,  HEAD ONLY$/,
      );
      expect(o.desc, `${o.desc} still names a rail`).not.toMatch(/\d+\s*FT/);
      expect(o.desc, o.desc).not.toMatch(/RAIL/);
    }
  });

  it("gives no head-only twin to an operator that has no rail", () => {
    // A jackshaft or a Logic 5 wall mount IS the head. A "HEAD ONLY" row for
    // one would list the same product twice at two prices.
    const railless = new Set(
      OPERATOR_CATALOGUE.filter((s) => s.group === "Operators")
        .flatMap((s) => s.items)
        .filter((o) => !/\d+FT/.test(o.desc) && !o.desc.includes("HEAD ONLY"))
        .map((o) => model(o.desc)),
    );
    for (const o of HEAD_ONLY) {
      expect(railless.has(model(o.desc)), `${o.name} has no rail to remove`).toBe(false);
    }
  });

  it("skips a model whose shortest rail has no price", () => {
    // T503L5 and T753L5 are N/A on the LiftMaster sheet. Deriving a head-only
    // price off a longer rail would overcharge; leaving them out is honest.
    expect([...HEAD_ONLY_SKIPPED].sort()).toEqual(["T503L5", "T753L5"]);
    for (const skipped of HEAD_ONLY_SKIPPED) {
      expect(HEAD_ONLY.some((o) => model(o.desc) === skipped), skipped).toBe(false);
    }
  });

  it("keeps one derived price per row, and no orphans", () => {
    expect(Object.keys(HEAD_ONLY_PRICES).length).toBe(HEAD_ONLY.length);
    const keys = new Set(HEAD_ONLY.map((o) => priceKey(o.desc)));
    for (const key of Object.keys(HEAD_ONLY_PRICES)) {
      expect(keys.has(key), key).toBe(true);
    }
  });

  it("never collides with a real price file row", () => {
    // A derived price outranks every source in operatorPrice(). If a sheet ever
    // carried a HEAD ONLY row of its own it would be silently ignored.
    for (const o of HEAD_ONLY) expect(operatorPrice(o)).toBe(HEAD_ONLY_PRICES[priceKey(o.desc)]);
  });
});
