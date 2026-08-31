import { describe, it, expect } from "vitest";
import { OPERATOR_SECTIONS } from "./data/operators";
import { MANUAL_OPERATORS } from "./data/operators-manual";
import { OPERATOR_CATALOGUE, ALL_OPERATORS } from "./data/operator-catalogue";
import { priceKey } from "./data/operator-pricing";

const GENERATED = OPERATOR_SECTIONS.flatMap((s) => s.items);

describe("hand-added catalogue entries", () => {
  it("holds nothing the parts list has since covered", () => {
    // When gen_operators.py emits one of these off an updated
    // NEW_PARTS_LIST.xlsx, this fails — delete the entry from
    // operators-manual.ts. Leaving it produces a duplicate row in the tab, and
    // a duplicate is worse than a missing one: the counter sees the same model
    // twice and has no way to tell which is current.
    const generated = new Set(GENERATED.map((o) => priceKey(o.desc)));
    const superseded = MANUAL_OPERATORS.filter((m) => generated.has(priceKey(m.desc)));
    expect(
      superseded.map((m) => m.desc),
      "now on the parts list — remove from operators-manual.ts",
    ).toEqual([]);
  });

  it("lands every entry in a section that exists", () => {
    // A typo in the section name drops the item on the floor: the merge finds
    // no section to append it to and nothing anywhere reports a problem.
    const sections = new Set(OPERATOR_SECTIONS.map((s) => s.name));
    for (const m of MANUAL_OPERATORS) {
      expect(sections.has(m.section), `${m.desc} -> section "${m.section}"`).toBe(true);
    }
  });

  it("names a source for every entry", () => {
    for (const m of MANUAL_OPERATORS) {
      expect(m.source.length, m.desc).toBeGreaterThan(10);
      expect(m.name.length, m.desc).toBeGreaterThan(0);
    }
  });

  it("writes descriptions the join can already match", () => {
    // These are typed by a person, unlike every other description in the
    // catalogue. A stray double space or a trailing blank would not match the
    // price files and the item would read "price not set" with no error.
    for (const m of MANUAL_OPERATORS) {
      expect(priceKey(m.desc), m.desc).toBe(m.desc.replace(/\s+/g, " ").trim());
      // Sprockets are the one family the catalogue does not prefix with the
      // brand — the generated rows read "1'' SPROCKET,  50B22".
      const branded = m.desc.startsWith("LIFTMASTER") || m.desc.includes("SPROCKET");
      expect(branded, m.desc).toBe(true);
      expect(m.desc, m.desc).toContain(m.name);
    }
  });

  it("carries no duplicate descriptions", () => {
    const seen = ALL_OPERATORS.map((o) => priceKey(o.desc));
    expect(seen.length - new Set(seen).size, "duplicate catalogue rows").toBe(0);
  });

  it("merges without losing a generated row it did not mean to replace", () => {
    const replaced = MANUAL_OPERATORS.filter((m) => m.replaces);
    expect(ALL_OPERATORS.length).toBe(
      GENERATED.length + MANUAL_OPERATORS.length - replaced.length,
    );
    expect(OPERATOR_CATALOGUE.length).toBe(OPERATOR_SECTIONS.length);
    const superseded = new Set(replaced.map((m) => priceKey(m.replaces!)));
    const merged = new Set(ALL_OPERATORS.map((o) => priceKey(o.desc)));
    for (const o of GENERATED) {
      const key = priceKey(o.desc);
      expect(merged.has(key) || superseded.has(key), key).toBe(true);
    }
  });

  it("only supersedes a description the generated file actually has", () => {
    // When gen_operators.py is re-run off a corrected NEW_PARTS_LIST.xlsx the
    // named description stops existing, and this fails — which is the signal
    // that the replacement entry has done its job and can be deleted.
    const generated = new Set(GENERATED.map((o) => o.desc));
    for (const m of MANUAL_OPERATORS) {
      if (!m.replaces) continue;
      expect(
        generated.has(m.replaces),
        `nothing left to replace — remove the ${m.name} entry`,
      ).toBe(true);
    }
  });

  it("survives a gen_operators.py rewrite, which is the whole point", () => {
    // operators.ts is regenerated wholesale. The merged view must not be the
    // generated array itself, or a regenerate silently deletes these models.
    expect(OPERATOR_CATALOGUE).not.toBe(OPERATOR_SECTIONS);
    const chain = OPERATOR_CATALOGUE.find((s) => s.name === "RESIDENTIAL CHAIN DRIVES");
    expect(chain?.items.some((o) => o.name === "4690L")).toBe(true);
    expect(chain?.items.some((o) => o.name === "2240L")).toBe(true);
  });
});
