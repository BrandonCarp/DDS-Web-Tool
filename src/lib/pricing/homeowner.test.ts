import { describe, it, expect } from "vitest";
import { quoteResidential, quoteResidentialSection, homeownerMarkup, isWideBand } from "./engine";

const base = {
  style: "solid" as const, color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const,
};
const dim = (ft: number, inch = 0) => ({ widthFt: ft, widthIn: inch, heightFt: 7, heightIn: 0 });

describe("homeowner markup", () => {
  it("carries four rates, each with a narrow and wide band", () => {
    expect(homeownerMarkup(9, 0, "stock_door")).toBe(250);
    expect(homeownerMarkup(16, 0, "stock_door")).toBe(500);
    expect(homeownerMarkup(9, 0, "special_door")).toBe(400);
    expect(homeownerMarkup(16, 0, "special_door")).toBe(800);
    expect(homeownerMarkup(9, 0, "stock_section")).toBe(100);
    expect(homeownerMarkup(16, 0, "stock_section")).toBe(200);
    expect(homeownerMarkup(9, 0, "special_section")).toBe(150);
    expect(homeownerMarkup(16, 0, "special_section")).toBe(300);
  });

  it("splits the band at 9'0\", the same place upgraded hardware does", () => {
    for (const [ft, inch] of [[6, 0], [8, 0], [9, 0]] as const) {
      expect(isWideBand(ft, inch), `${ft}'${inch}"`).toBe(false);
    }
    // 9'2" and 9'4" fall between Brandon's two stated bands and take the wide
    // rate: anything over 9'0" is the larger door.
    for (const [ft, inch] of [[9, 2], [9, 4], [9, 6], [10, 0], [18, 0]] as const) {
      expect(isWideBand(ft, inch), `${ft}'${inch}"`).toBe(true);
    }
  });

  it("charges a special order more than stock, and a door more than a section", () => {
    for (const w of [9, 16]) {
      expect(homeownerMarkup(w, 0, "special_door")).toBeGreaterThan(homeownerMarkup(w, 0, "stock_door"));
      expect(homeownerMarkup(w, 0, "stock_door")).toBeGreaterThan(homeownerMarkup(w, 0, "stock_section"));
      expect(homeownerMarkup(w, 0, "special_door")).toBeGreaterThan(homeownerMarkup(w, 0, "special_section"));
    }
  });

  it("doubles from narrow to wide in every case", () => {
    for (const k of ["stock_door", "special_door", "stock_section", "special_section"] as const) {
      expect(homeownerMarkup(16, 0, k), k).toBe(homeownerMarkup(9, 0, k) * 2);
    }
  });

  it("adds exactly the markup to a residential door", () => {
    for (const [ft, add] of [[9, 250], [16, 500]] as const) {
      const off = quoteResidential("4050", dim(ft), base).unitPrice;
      const on = quoteResidential("4050", dim(ft), { ...base, homeowner: true }).unitPrice;
      expect(on - off, `${ft}'`).toBeCloseTo(add, 2);
    }
  });

  it("adds the section rate to a replacement section", () => {
    for (const [w, add] of [["9", 100], ["16", 200]] as const) {
      const off = quoteResidentialSection("4050", { widthKey: w, height: "21" as const, kind: "int" as const, color: "White" }).unitPrice;
      const on = quoteResidentialSection("4050", { widthKey: w, height: "21" as const, kind: "int" as const, color: "White", homeowner: true }).unitPrice;
      expect(on - off, w).toBeCloseTo(add, 2);
    }
  });

  it("adds nothing when it is not selected", () => {
    const a = quoteResidential("4050", dim(9), base).unitPrice;
    const b = quoteResidential("4050", dim(9), { ...base, homeowner: false }).unitPrice;
    expect(a).toBe(b);
  });

  it("stacks with upgraded hardware", () => {
    const off = quoteResidential("4050", dim(9), base).unitPrice;
    const on = quoteResidential("4050", dim(9), { ...base, homeowner: true, upgradedHardware: true }).unitPrice;
    expect(on - off).toBeCloseTo(250 + 35, 2);
  });
});

describe("which rate each tab uses", () => {
  it("puts residential on the stock rates", () => {
    // The residential tab quotes off the floor, so it takes the stock rates
    // even when the badge reads SPECIAL ORDER for a colour DDS does not stock.
    const off = quoteResidential("4050", dim(9), base).unitPrice;
    const on = quoteResidential("4050", dim(9), { ...base, homeowner: true }).unitPrice;
    expect(on - off).toBeCloseTo(homeownerMarkup(9, 0, "stock_door"), 2);
  });

  it("puts special order and commercial on the special rates", () => {
    // Both tabs are ordering from the manufacturer, so both cost more to
    // handle. Commercial is always a special order — it has no stock path.
    expect(homeownerMarkup(9, 0, "special_door")).toBe(400);
    expect(homeownerMarkup(16, 0, "special_door")).toBe(800);
    expect(homeownerMarkup(9, 0, "special_section")).toBe(150);
    expect(homeownerMarkup(16, 0, "special_section")).toBe(300);
  });

  it("keeps a door dearer than a section on the same tab", () => {
    for (const w of [9, 16]) {
      expect(homeownerMarkup(w, 0, "special_door")).toBeGreaterThan(homeownerMarkup(w, 0, "special_section"));
    }
  });

  it("falls to the narrow band when no width is known", () => {
    // A typed-in total on a special order carries no size, so 0 feet reads as
    // narrow rather than throwing or defaulting high.
    expect(homeownerMarkup(0, 0, "special_door")).toBe(400);
    expect(homeownerMarkup(0, 0, "special_section")).toBe(150);
  });
});
