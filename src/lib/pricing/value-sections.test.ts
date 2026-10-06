import { describe, expect, it } from "vitest";
import { quoteResidentialSection, listModels } from "./engine";
import { RES_SECTION_WIDTHS } from "./data/res-section-meta";
import { stockLongAllowed, windowDesigns } from "./data/inserts";
import { sectionColorInStock } from "./data/stock-colors";

const q = (model: string, widthKey: string, height: "18" | "21", kind: "bt" | "int", glazed = false) =>
  quoteResidentialSection(model, { widthKey, height, kind, glazed, color: "White" });

describe("Value Steel 1500 and 73 sections (6/10/2026)", () => {
  // Brandon's notes: [bottom, intermediate, glass] per width.
  const NOTES: Record<string, Record<string, [number, number, number]>> = {
    "1500": { "8": [303.73, 264.80, 453.29], "9": [341.69, 297.92, 486.41] },
    "73": { "8": [216.10, 176.43, 377.73], "9": [243.10, 198.49, 399.78] },
  };

  it("prices every section exactly as the notes have it, 18\" the same as 21\"", () => {
    for (const [model, widths] of Object.entries(NOTES)) {
      for (const [w, [bottom, inter, glass]] of Object.entries(widths)) {
        expect(q(model, w, "21", "bt").unitPrice, `${model} ${w}' bottom`).toBe(bottom);
        expect(q(model, w, "21", "int").unitPrice, `${model} ${w}' intermediate`).toBe(inter);
        expect(q(model, w, "21", "int", true).unitPrice, `${model} ${w}' glass`).toBe(glass);
        expect(q(model, w, "18", "bt").unitPrice, `${model} ${w}' 18" bottom`).toBe(bottom);
        expect(q(model, w, "18", "int").unitPrice, `${model} ${w}' 18" intermediate`).toBe(inter);
      }
    }
  });

  it("has no glass at 18\" for them, while other models keep theirs", () => {
    expect(q("1500", "8", "18", "int", true).priced).toBe(false);
    expect(q("73", "9", "18", "int", true).priced).toBe(false);
    expect(q("T50S", "8", "18", "int", true).priced).toBe(true);
  });

  it("comes in 8' and 9' only, in White, and is listed as a model", () => {
    expect(RES_SECTION_WIDTHS["1500"]).toEqual(["8", "9"]);
    expect(RES_SECTION_WIDTHS["73"]).toEqual(["8", "9"]);
    expect(sectionColorInStock("1500", "White")).toBe(true);
    expect(sectionColorInStock("73", "Almond")).toBe(false);
    expect(listModels()).toEqual(expect.arrayContaining(["1500", "73"]));
  });
});

describe("the stock 4050's long-panel windows and inserts (6/10/2026)", () => {
  it("are offered at 8', 9' and 16' wide only", () => {
    for (const [ft, inch, ok] of [[8, 0, true], [9, 0, true], [16, 0, true], [10, 0, false], [12, 0, false], [18, 0, false], [8, 6, false]] as const) {
      expect(stockLongAllowed("4050", ft, inch), `${ft}'${inch}"`).toBe(ok);
    }
  });

  it("do not count a width that is not chosen yet against the door", () => {
    expect(stockLongAllowed("4050", Number.NaN, 0)).toBe(true);
  });

  it("leave other models, and special orders, alone", () => {
    expect(stockLongAllowed("4053", 10, 0)).toBe(true);
    // Special Order reads the designs straight from the data, which still offers
    // the long ones at every width.
    expect(windowDesigns("4050", "inserts", "10").map((d) => d.id)).toContain("612");
  });
});
