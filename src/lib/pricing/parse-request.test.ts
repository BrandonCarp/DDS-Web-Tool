import { describe, it, expect } from "vitest";
import { parseDoorRequest, isUsable, parseRequest, suggest } from "./data/parse-request";

/**
 * These are the shapes Brandon says the counter actually types. They are the
 * specification — if a real input stops parsing, one of these should fail.
 */

const p = (s: string) => parseDoorRequest(s);
const size = (s: string) => {
  const r = p(s);
  return [r.widthFt, r.widthIn, r.heightFt, r.heightIn];
};

describe("size", () => {
  it("reads every format the counter uses", () => {
    expect(size("4050 16x7 wh")).toEqual([16, 0, 7, 0]);
    expect(size("4050 16 by 7 wh")).toEqual([16, 0, 7, 0]);
    expect(size("4050 16 x 7 wh")).toEqual([16, 0, 7, 0]);
    expect(size("4050 16'0 x 7'0 wh")).toEqual([16, 0, 7, 0]);
    expect(size("4050 8x7 wh")).toEqual([8, 0, 7, 0]);
  });

  it("reads inches on either dimension", () => {
    expect(size("4050 15'6 x 7'0 wh")).toEqual([15, 6, 7, 0]);
    expect(size("4050 16x7'6 wh")).toEqual([16, 0, 7, 6]);
    expect(size("4050 8'2 x 6'9 wh")).toEqual([8, 2, 6, 9]);
  });

  it("does not read a model number as a size", () => {
    // "4050 9x7" reads as 50 x 9 unless the model is lifted out first. This is
    // the one real ambiguity in the grammar.
    const r = p("4050 9x7 almond torsion");
    expect(r.model).toBe("4050");
    expect([r.widthFt, r.heightFt]).toEqual([9, 7]);
  });

  it("leaves size undefined when none was typed", () => {
    expect(p("4050 white torsion").widthFt).toBeUndefined();
  });
});

describe("model and panel style", () => {
  it("takes an explicit model outright", () => {
    for (const m of ["4050", "4053", "9130", "GD1LP", "T50S", "T52S"]) {
      expect(p(`${m} 8x7 wh`).model, m).toBe(m);
    }
  });

  it("maps panel-style wording to candidates", () => {
    expect(p("short panel 16x7 wh").models).toEqual(["4050", "9130", "T50S", "T52S"]);
    expect(p("long panel 12x7 wh").models).toEqual(["4053", "9133"]);
    expect(p("flush 16x7 wh").models).toEqual(["4051"]);
  });

  it("prefers the longer phrase: gallery long beats long", () => {
    expect(p("gallery long panel 8x7 wh").models).toEqual(["GD1LP"]);
    expect(p("gallery short 8x7 wh").models).toEqual(["GD1SP"]);
    expect(p("gallery 8x7 wh").models).toEqual(["GD1SP", "GD1LP"]);
  });

  it("flags an ambiguous model rather than picking one", () => {
    // Four models share the short panel. Guessing would quote the wrong door.
    const r = p("stock short panel 16 by 7");
    expect(r.ambiguous).toContain("model");
    expect(r.models).toHaveLength(4);
    expect(r.model).toBeUndefined();
  });

  it("does not flag a panel style that names one model", () => {
    expect(p("gallery long 8x7 wh").ambiguous).not.toContain("model");
  });
});

describe("colour", () => {
  it("reads the abbreviations used on work orders", () => {
    expect(p("4050 8x7 wh").color).toBe("White");
    expect(p("4050 8x7 bk").color).toBe("Black");
    expect(p("4050 8x7 al").color).toBe("Almond");
    expect(p("4050 8x7 cb").color).toBe("Chocolate Brown");
  });

  it("reads full names", () => {
    expect(p("4050 8x7 sandtone").color).toBe("Sandtone");
    expect(p("4050 8x7 chocolate brown").color).toBe("Chocolate Brown");
  });

  it("only matches colours DDS actually floors", () => {
    // Bronze, Hunter Green, Iron Ore and the Ultra-Grains are catalogue
    // colours with nothing on the floor. Matching them would fill in a colour
    // no dropdown offers, and the form would silently disagree with what the
    // counter typed.
    for (const c of ["bronze", "hunter green", "iron ore", "mocha brown"]) {
      expect(p(`4050 8x7 ${c}`).color, c).toBeUndefined();
    }
  });

  it("survives a typo", () => {
    for (const typo of ["whit", "wihte", "almnd", "sandtne"]) {
      expect(p(`4050 8x7 ${typo}`).color, typo).toBeTruthy();
    }
    expect(p("4050 8x7 whit").color).toBe("White");
  });

  it("does not invent a colour from an unrelated word", () => {
    expect(p("4050 8x7 torsion").color).toBeUndefined();
  });
});

describe("options", () => {
  it("reads track wording", () => {
    expect(p("4050 8x7 wh 12 radius").track).toBe("r12");
    expect(p("4050 8x7 wh low headroom").track).toBe("low_headroom");
    expect(p("4050 8x7 wh 15 rad").track).toBe("r15");
  });

  it("reads lock wording, longest phrase first", () => {
    expect(p("4050 8x7 wh key lock install").lock).toBe("lockbar_installed");
    expect(p("4050 8x7 wh lockbar").lock).toBe("lockbar");
    expect(p("4050 8x7 wh slide lock").lock).toBe("slide");
    expect(p("4050 8x7 wh no lock").lock).toBe("none");
  });

  it("reads springs", () => {
    expect(p("4050 8x7 wh torsion").spring).toBe("torsion");
    expect(p("4050 8x7 wh ext").spring).toBe("extension");
  });

  it("reads a design id and infers the inserts style", () => {
    const r = p("4050 16x7 wh 509");
    expect(r.windesign).toBe("509");
    expect(r.style).toBe("inserts");
    expect(p("GD1SP 8x7 wh sq24").windesign).toBe("SQ24");
  });

  it("notices the stock keyword", () => {
    expect(p("stock 4050 8x7 wh").stockOnly).toBe(true);
    expect(p("4050 8x7 wh").stockOnly).toBeUndefined();
  });
});

describe("the real examples", () => {
  it("stock short panel 16 by 7", () => {
    const r = p("stock short panel 16 by 7");
    expect([r.widthFt, r.heightFt]).toEqual([16, 7]);
    expect(r.stockOnly).toBe(true);
    expect(r.models).toHaveLength(4);
  });

  it("16x7 wh 509", () => {
    const r = p("16x7 wh 509");
    expect([r.widthFt, r.heightFt]).toEqual([16, 7]);
    expect(r.color).toBe("White");
    expect(r.windesign).toBe("509");
    expect(r.style).toBe("inserts");
    // No model was named, so there is nothing to fill in yet.
    expect(isUsable(r)).toBe(false);
  });

  it("gallery long panel 8x7 whit 12 radius key lock install", () => {
    const r = p("gallery long panel 8x7 whit 12 radius key lock install");
    expect([r.widthFt, r.heightFt]).toEqual([8, 7]);
    expect(r.models).toEqual(["GD1LP"]);
    expect(r.color).toBe("White");
    expect(r.track).toBe("r12");
    expect(r.lock).toBe("lockbar_installed");
    expect(isUsable(r)).toBe(true);
  });
});

describe("usability", () => {
  it("needs a size and a model before it is worth filling the form", () => {
    expect(isUsable(p("16x7 wh"))).toBe(false);       // no model
    expect(isUsable(p("4050 wh torsion"))).toBe(false); // no size
    expect(isUsable(p("4050 16x7 wh"))).toBe(true);
  });

  it("reports words it could not place", () => {
    const r = p("4050 8x7 wh purple sparkles");
    expect(r.unmatched.length).toBeGreaterThan(0);
  });

  it("returns something for nonsense rather than throwing", () => {
    expect(() => p("")).not.toThrow();
    expect(() => p("!!!")).not.toThrow();
    expect(isUsable(p("qwerty"))).toBe(false);
  });
});

describe("routing to a tool", () => {
  const r = (s: string) => parseRequest(s);

  it("sends vinyl wording to the vinyl tab", () => {
    for (const s of ["vinyl molding", "vinyl moulding white", "door stop", "molding bronze"]) {
      expect(r(s).tool, s).toBe("vinyl");
    }
    expect(r("vinyl molding white").term).toBe("white");
  });

  it("recognises an operator model outright", () => {
    // The strongest signal there is: a model number belongs to one product.
    const x = r("gh101l5");
    expect(x.tool).toBe("operators");
    expect(x.confidence).toBe(1);
    expect(x.operator?.model).toBe("GH101L5");
    expect(x.operator?.group).toBe("LIFTMASTER LOGIC 5");
  });

  it("recognises an operator group", () => {
    const x = r("liftmaster logic 5");
    expect(x.tool).toBe("operators");
    expect(x.operator?.group).toBe("LIFTMASTER LOGIC 5");
    // The group name is not left behind as a search term.
    expect(x.term).toBeUndefined();
  });

  it("routes vaguer operator wording without inventing a model", () => {
    for (const s of ["opener", "need an opener", "liftmaster operator", "motor"]) {
      const x = r(s);
      expect(x.tool, s).toBe("operators");
      expect(x.operator?.model, s).toBeUndefined();
    }
  });

  it("sends spring wording to the right spring tab", () => {
    expect(r("torsion spring 234 x 2 x 32").tool).toBe("torsion");
    expect(r("extension springs 120lb").tool).toBe("extension");
    // The measurements survive as a term for the destination's own search.
    expect(r("torsion spring 234 x 2 x 32").term).toBe("234 x 2 x 32");
  });

  it("sends part words to parts", () => {
    for (const s of ["rollers", "cables", "hinges", "bracket"]) {
      expect(r(s).tool, s).toBe("parts");
    }
  });

  it("sends a special order to its tab, configured", () => {
    const x = r("special order 4053 12x7 wh");
    expect(x.tool).toBe("special");
    expect(x.door?.model).toBe("4053");
    expect(x.door?.widthFt).toBe(12);
  });

  it("defaults to a residential door", () => {
    const x = r("4050 16x7 wh 509");
    expect(x.tool).toBe("residential");
    expect(x.door?.windesign).toBe("509");
    expect(x.confidence).toBeGreaterThan(0.5);
  });

  it("scores low when it understood almost nothing", () => {
    // The caller should ask rather than act on these.
    expect(r("qwerty").confidence).toBeLessThan(0.5);
    expect(r("").confidence).toBe(0);
  });

  it("prefers a door word over a part word when a door is described", () => {
    // "track" is a part, but "4050 16x7 wh 12 radius track" is a door.
    const x = r("4050 16x7 wh 12 radius");
    expect(x.tool).toBe("residential");
    expect(x.door?.track).toBe("r12");
  });
});

describe("suggestions cover everything DDS sells", () => {
  const labels = (q: string) => suggest(q, 20).map((s) => s.label);
  const tools = (q: string) => new Set(suggest(q, 20).map((s) => s.tool));

  it("finds commercial models", () => {
    // Commercial was missing from the index entirely — Brandon, 12/9/2026.
    expect(labels("3720")).toContain("3720");
    expect(tools("3720")).toContain("commercial");
    expect(labels("2415")).toContain("2415V");
    expect(labels("591")).toContain("591");
    expect(labels("ts15")).toContain("TS150");
  });

  it("finds special order collections and series models", () => {
    expect(labels("gallery")).toContain("Gallery Collection");
    expect(labels("coach")).toContain("Coachman Collection");
    expect(labels("3159")).toContain("3159");
    expect(tools("3159")).toContain("special");
  });

  it("finds vinyl colours", () => {
    expect(tools("vinyl")).toContain("vinyl");
  });

  it("still finds doors, springs, parts and operators", () => {
    expect(labels("913")).toEqual(expect.arrayContaining(["9130", "9133"]));
    expect(labels("207").some((l) => l.includes("207"))).toBe(true);
    expect(tools("roller")).toContain("parts");
    expect(labels("gh101")).toContain("GH101L5");
  });
});

describe("shorthand", () => {
  const first = (q: string) => suggest(q, 3)[0];

  it("expands the abbreviations the counter types", () => {
    // None of these is a product name — "lbi" means lockbar installed, and the
    // expansion is what does the searching.
    expect(first("lbi")?.label).toBe("Lockbar installed");
    expect(first("lba")?.label).toBe("Lockbar assembly");
    expect(first("isl")?.label).toBe("Inside slide lock");
    expect(first("lh")?.label).toBe("Low headroom");
  });

  it("expands part shorthand", () => {
    expect(suggest("ebp", 3).some((s) => s.label.includes("END BEARING"))).toBe(true);
    expect(suggest("ts", 3).some((s) => (s.hint ?? "").includes("TORSION"))).toBe(true);
    expect(suggest("es", 3).some((s) => (s.hint ?? "").includes("EXTENSION"))).toBe(true);
  });

  it("leaves a real product name alone", () => {
    // "lb" is shorthand, but "913" is not — expansion must not mangle it.
    expect(labelsOf("913")).toEqual(expect.arrayContaining(["9130", "9133"]));
    expect(labelsOf("3720")).toContain("3720");
  });

  function labelsOf(q: string) { return suggest(q, 20).map((s) => s.label); }
});

describe("shorthand in a typed line", () => {
  const r = (s: string) => parseDoorRequest(s);

  it("reads the line that used to be ignored", () => {
    // "4050 8x7 wh lbi 12r tor" reported lbi, 12r and tor as unrecognised: the
    // suggestion index expanded shorthand but the parser did not.
    const d = r("4050 8x7 wh lbi 12r tor");
    expect(d.lock).toBe("lockbar_installed");
    expect(d.track).toBe("r12");
    expect(d.spring).toBe("torsion");
    expect(d.unmatched).toEqual([]);
  });

  it("reads track radius written either way", () => {
    for (const [txt, want] of [["10r", "r10"], ["12r", "r12"], ["15r", "r15"], ["r12", "r12"], ["lh", "low_headroom"]] as const) {
      expect(r(`4050 8x7 wh ${txt}`).track, txt).toBe(want);
    }
  });

  it("reads lock shorthand", () => {
    expect(r("4050 8x7 wh lbi").lock).toBe("lockbar_installed");
    expect(r("4050 8x7 wh lba").lock).toBe("lockbar");
    expect(r("4050 8x7 wh isl").lock).toBe("slide");
  });

  it("reads spring shorthand", () => {
    expect(r("4050 8x7 wh tor").spring).toBe("torsion");
    expect(r("4050 8x7 wh ext").spring).toBe("extension");
  });

  it("reads the two surcharges", () => {
    const d = r("4050 16x7 wh 509 uh ho");
    expect(d.upgradedHardware).toBe(true);
    expect(d.homeowner).toBe(true);
    expect(d.unmatched).toEqual([]);
  });

  it("reads glass grade", () => {
    expect(r("4050 8x7 wh dsb 509").glass).toBe("dsb");
    expect(r("4050 8x7 wh ssb").glass).toBe("ssb");
    expect(r("4050 8x7 wh dsb").unmatched).toEqual([]);
  });

  it("leaves a real model number alone", () => {
    // Expansion must not mangle something that is already a product.
    expect(r("4050 8x7 wh").model).toBe("4050");
    expect(r("9133 8x7 wh").model).toBe("9133");
  });
});
