import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { doorLayout, galleryCentres, type DoorLayout, type DoorPictureSpec } from "./data/door-layout";
import { doorArt, windowKey, styleOf } from "./data/door-images";
import { STRIP_SEQ, STRIP_SOURCES } from "./data/door-strips";
import { CLASSIC_STACK_MODELS, GALLERY_STACK_MODELS, classicStack, doorStack, glazedStack, stockGalleryStack } from "./data/door-stacks";
import { STOCK_MATRIX, stockedWidths } from "./data/stock-colors";
import { designWidthCode, plainWindowsFor, stockLongAllowed, windowDesigns } from "./data/inserts";

/**
 * The door pictures (Brandon, 23/10/2026): every door in stock or on a special
 * order drawn from Clopay's renders, its windows in their row. These check the
 * layout — what goes where — not the pixels; the pixels are Clopay's.
 */

const spec = (s: Partial<DoorPictureSpec> & { model: string; widthIn: number; heightIn?: number }): DoorPictureSpec => {
  const h = s.heightIn ?? 84;
  return { colour: "White", stack: doorStack(s.model, Math.floor(h / 12), h % 12) ?? [], window: null, ...s };
};

/** Each section's rows covered across the whole width, once. */
function covered(L: DoorLayout) {
  for (const box of L.sections) {
    const cols = new Array(L.width).fill(0);
    for (const b of L.blits) {
      if (b.dy >= box.y + box.h || b.dy + b.dh <= box.y) continue;
      if (b.dy !== box.y) continue; // a section's first band
      for (let x = b.dx; x < b.dx + b.dw; x++) if (x >= 0 && x < L.width) cols[x]++;
    }
    expect(cols.every((c) => c >= 1), `section ${box.section}`).toBe(true);
  }
}

describe("door pictures — the window by its name", () => {
  it("names the plain windows by their order names", () => {
    expect(windowKey("glass", undefined, 'PLAIN SHORT 19-1/2" X 12"', "4050")).toBe("PS12");
    expect(windowKey("glass", undefined, 'PLAIN LONG 40-1/2" X 12"', "4050")).toBe("PL12");
    expect(windowKey("glass", undefined, 'PLAIN SHORT 19-1/2" X 16"', "GD1LP")).toBe("PS16");
    expect(windowKey("glass", undefined, 'PLAIN LONG 42" X 16"', "GD1LP")).toBe("PL16");
    expect(windowKey("glass", undefined, "ARCH 1", "GD1LP")).toBe("ARCH1PLAIN");
    expect(windowKey("glass", undefined, "Arch 2", "GD1LP")).toBe("ARCH2PLAIN");
    expect(windowKey("glass", undefined, undefined, "4050")).toBe("PS12");
    expect(windowKey("glass", undefined, undefined, "GD1SP")).toBe("PL16");
    expect(windowKey("glass", undefined, "black slim 37x8", "4308")).toBe("");
  });
  it("takes an insert by its id, the architectural plain windows being the 16\" ones", () => {
    expect(windowKey("inserts", "509", undefined, "4050")).toBe("509");
    expect(windowKey("inserts", "PLAINLONG", undefined, "GD1LP")).toBe("PL16");
    expect(windowKey("inserts", "PLAINSHORT", undefined, "BD1NU")).toBe("PS16");
    expect(windowKey("solid", "509", undefined, "4050")).toBeNull();
  });
});

describe("door pictures — the layout", () => {
  it("draws a Premium Steel door to scale, each section to its chart height", () => {
    const L = doorLayout(spec({ model: "4300", widthIn: 96, stack: classicStack(8, 0)! }))!;
    expect(L.width).toBe(440);
    expect(L.sections.map((s) => s.inches)).toEqual([21, 18, 18, 18, 21]);
    expect(L.sections.map((s) => s.section)).toEqual([5, 4, 3, 2, 1]);
    expect(L.height).toBe(Math.round(96 * 96 / 21)); // a 21" section 96 rows, as Clopay renders it
    expect(L.sections[1].h).toBeLessThan(L.sections[0].h);
    covered(L);
  });

  it("is as wide as the door: a 9'0\" is wider than an 8'0\", its windows the same size", () => {
    const a = doorLayout(spec({ model: "4300", widthIn: 96, window: "PS12" }))!;
    const b = doorLayout(spec({ model: "4300", widthIn: 108, window: "PS12" }))!;
    expect(b.width).toBe(495);
    const glassCells = (L: DoorLayout) => L.blits.filter((x) => x.src.endsWith("short--PLAINSHORT.webp") && x.sw > 50 && x.dy === 0).map((x) => x.dw);
    expect(glassCells(a)).toHaveLength(4);
    expect(glassCells(b)).toEqual(glassCells(a));
    covered(b);
  });

  it("puts the windows in the rows asked for: the top, or any but the bottom on a Premium or Value Steel door, two at most", () => {
    const stack = glazedStack(classicStack(7, 0)!, 3);
    const top = doorLayout(spec({ model: "4050", widthIn: 108, stack, window: "PS12" }))!;
    const under = doorLayout(spec({ model: "4050", widthIn: 108, stack, window: "PS12", windowRow: 3 }))!;
    expect(top.windows.map((w) => [w.y, w.y + w.h])).toEqual([[top.sections[0].y, top.sections[0].y + top.sections[0].h]]);
    // a middle section keeps its own joint, two rows deep, over the windows
    const s3 = under.sections.find((s) => s.section === 3)!;
    expect(under.windows.map((w) => [w.y, w.y + w.h])).toEqual([[s3.y + 2, s3.y + s3.h]]);
    // two rows, any but the bottom (Brandon, 23/10/2026); the bottom, or under the top on a Gallery, is not drawn
    const two = doorLayout(spec({ model: "4050", widthIn: 108, stack, window: "PS12", windowRows: [4, 2] }))!;
    expect(two.windows.map((w) => w.y)).toEqual([two.sections[0].y, two.sections[2].y + 2]);
    expect(doorLayout(spec({ model: "4050", widthIn: 108, stack, window: "PS12", windowRow: 1 }))).toBeNull();
    expect(doorLayout(spec({ model: "4050", widthIn: 108, stack, window: "PS12", windowRows: [4, 3, 2] }))).toBeNull();
    expect(doorLayout(spec({ model: "GD1LP", widthIn: 96, window: "PL16", windowRow: 3 }))).toBeNull();
  });

  it("keeps the Gallery's panels their size, the stiles taking the width — as Clopay's own 9'0\" render does", () => {
    // Clopay's 9'0" Gallery band: the two window groups centred at 280 and 800.
    expect(galleryCentres(1080, 2)).toEqual([280, 800]);
    expect(galleryCentres(960, 2)).toEqual([240, 720]);
    const L = doorLayout(spec({ model: "GD1SP", widthIn: 192, window: "ARCH3PLAIN" }))!;
    expect(L.width).toBe(1920);
    covered(L);
  });

  it("counts long windows, pairs and arches by long panels, short windows by short panels", () => {
    const n = (window: string, widthIn: number, model = "4300") => {
      const L = doorLayout(spec({ model, widthIn, window }))!;
      return L.blits.filter((b) => b.dy === 0 && b.sw > 60 && b.src.includes("/bands/")).length;
    };
    expect(n("PS12", 96)).toBe(4);
    expect(n("PS12", 192)).toBe(8);
    expect(n("PL12", 96)).toBe(2);
    expect(n("PL12", 144)).toBe(3);
    // two to a long panel's place, each over its own short panel (Brandon, 23/10/2026)
    expect(n("REC12", 96)).toBe(4);
    expect(n("REC12", 192)).toBe(8);
    expect(n("SQ22", 192)).toBe(8);
    expect(n("SQ22", 192, "4310")).toBe(8);
    expect(n("ARCH3PLAIN", 192)).toBe(4);
    expect(n("PL16", 108, "GD1LP")).toBe(2);
  });

  // The windows over the panels under them (Brandon, 23/10/2026): short over
  // short, long over long, a long window over a pair of short panels, two
  // short ones on a long panel — at every width, every design.
  const across = (L: DoorLayout) => {
    const byUrl = new Map(Object.values(STRIP_SOURCES).map((s) => [`/doors/bands/${s.file}.webp`, s]));
    const top = L.sections[0];
    const frames: [number, number][] = [];
    let cut = 0;
    for (const b of L.blits) {
      const src = byUrl.get(b.src);
      if (b.dy !== top.y || !src?.wins) continue;
      const k = b.dw / b.sw;
      for (const w of src.wins) {
        if (w[0] >= b.sx - 1e-6 && w[2] < b.sx + b.sw) frames.push([b.dx + (w[0] - b.sx) * k, b.dx + (w[2] + 1 - b.sx) * k]);
        else if (w[2] >= b.sx && w[0] < b.sx + b.sw) cut++;
      }
    }
    return { frames: frames.sort((p, q) => p[0] - q[0]), cut };
  };

  it("sets every window over the panel under it, whole, clear of the next and of the edges", () => {
    const off: string[] = [];
    const designs = Object.keys(STRIP_SEQ).filter((k) => k.startsWith("c|")).map((k) => k.slice(2));
    for (const model of ["4300", "4310"]) for (const window of designs) for (let widthIn = 96; widthIn <= 242; widthIn += 1) {
      const L = doorLayout(spec({ model, widthIn, window }));
      if (!L) continue;
      const { frames, cut } = across(L);
      const at = `${model} ${window} ${widthIn}"`;
      if (cut) off.push(`${at}: a frame cut`);
      frames.forEach(([a, b], i) => {
        if (a < 4.5 || b > L.width - 4.5) off.push(`${at}: at the edge`);
        if (i && a - frames[i - 1][1] < 4.5) off.push(`${at}: against the next`);
      });
      const P = L.panelXs;
      const c = frames.map(([a, b]) => (a + b) / 2);
      const n = P.length;
      const fit = Math.min(1, (L.width - (n + 1) * 6) / (n * 207));
      const want = c.length === n ? P
        : model === "4300" && 2 * c.length === n ? c.map((_, j) => (P[2 * j] + P[2 * j + 1]) / 2)
          : model === "4310" && c.length === 2 * n ? P.flatMap((x) => [x - 53.9 * fit, x + 53.9 * fit])
            : null;
      if (want && c.some((x, i) => Math.abs(x - want[i]) > 1.6)) off.push(`${at}: off its panels`);
    }
    expect(off).toEqual([]);
  });

  it("lines up the 18'0\" 4300's windows with its panels (Brandon, 23/10/2026)", () => {
    const P = doorLayout(spec({ model: "4300", widthIn: 216 }))!.panelXs;
    expect(P).toHaveLength(8);
    const short = doorLayout(spec({ model: "4300", widthIn: 216, window: "PS12" }))!;
    expect(short.windowXs).toEqual(P);
    const long = doorLayout(spec({ model: "4300", widthIn: 216, window: "610" }))!;
    expect(long.windowXs).toEqual([0, 2, 4, 6].map((j) => (P[j] + P[j + 1]) / 2));
    const pairs = doorLayout(spec({ model: "4310", widthIn: 216, window: "509" }))!;
    const L = doorLayout(spec({ model: "4310", widthIn: 216 }))!.panelXs;
    expect(pairs.windowXs.map((x) => Math.round(x * 10) / 10)).toEqual(L.flatMap((x) => [x - 53.9, x + 53.9]).map((x) => Math.round(x * 10) / 10));
    const sq = doorLayout(spec({ model: "4300", widthIn: 216, window: "SQ22" }))!;
    expect(sq.windowXs.map((x) => Math.round(x))).toEqual(P.map((x) => Math.round(x)));
  });

  it("gives the panels and windows room where a width has none at their size: three long panels at 11'3\"", () => {
    const L = doorLayout(spec({ model: "4310", widthIn: 135, window: "PL12" }))!;
    const P = L.panelXs;
    expect(P[1] - P[0]).toBeGreaterThanOrEqual(6 + 207 * 0.94);
    expect(P[0]).toBeGreaterThan(6);
    const { frames, cut } = across(L);
    expect(cut).toBe(0);
    expect(frames).toHaveLength(3);
    expect(frames[1][0] - frames[0][1]).toBeGreaterThanOrEqual(4.5);
  });

  it("puts a grain door's windows on its plain face, not over the panels of a solid section, their frames one flat tone as Clopay draws them", () => {
    const L = doorLayout(spec({ model: "4300", widthIn: 216, window: "PL12", colour: "Ultra-Grain Classic Cherry Finish" }))!;
    const top = L.sections[0];
    const under = L.under.filter((b) => b.dy >= top.y && b.dy < top.y + top.h);
    expect(under.length).toBeGreaterThan(0);
    // the rail over the panels, laid down the section at its own size, every other one upside down — never the rows the panels are in
    expect(under.every((b) => b.sy >= 2 && b.sy + b.sh <= 15.0001)).toBe(true);
    expect(under.every((b) => b.dh <= 14)).toBe(true);
    expect(under.some((b) => b.flipY)).toBe(true);
    const rows = [...new Set(under.map((b) => b.dy))].sort((a, b) => a - b);
    expect(rows[0]).toBe(top.y);
    expect(Math.max(...under.map((b) => b.dy + b.dh))).toBe(top.y + top.h);
    expect(L.windows.map((w) => w.mode)).toEqual(["grain"]);
    // a Lustra frame keeps its texture
    expect(doorLayout({ model: "9209", colour: "Lustra Silver", widthIn: 192, stack: [21, 21, 21, 21], window: "PL16", places: [{ section: 4, panel: 1 }], across: 4 })!.windows[0].mode).toBe("under");
  });

  it("draws a Bridgeport with the architectural windows, a Coachman with its own", () => {
    expect(doorLayout(spec({ model: "BD1NU", widthIn: 108, window: "SQ22" }))).not.toBeNull();
    expect(doorLayout(spec({ model: "BD2EU", widthIn: 192, window: "ARCH1VERT" }))).not.toBeNull();
    const cd = doorLayout(spec({ model: "CD", widthIn: 120, doorDesign: "12" }))!;
    expect(cd.outWidth).toBe(Math.round(120 * 55 / 12));
    // three across: the arches either side of the arched section's flat window (Clopay's 12' door)
    const arch = doorLayout(spec({ model: "CD", widthIn: 144, doorDesign: "12", window: "ARCH4" }))!;
    expect(arch.blits.filter((b) => b.src.includes("/bands/coachman--")).map((b) => b.src.replace(/.*coachman--/, ""))).toEqual(["ARCH4.webp", "ARC4A.webp", "ARCH4.webp"]);
    expect(doorLayout(spec({ model: "CGU", widthIn: 192, doorDesign: "21", window: "SQ24" }))).not.toBeNull();
    // the arched sections are built three and four across; designs 31 and up solid
    expect(doorLayout(spec({ model: "CD", widthIn: 96, doorDesign: "12", window: "ARC1A" }))).toBeNull();
    expect(doorLayout(spec({ model: "CD", widthIn: 192, doorDesign: "31", window: "ARCH1" }))).toBeNull();
  });

  it("declines what no capture shows rather than guess", () => {
    expect(doorLayout(spec({ model: "4050", widthIn: 96, window: "SQ23" }))).toBeNull(); // the Coachman's window, captured on no Premium Steel door
    expect(doorLayout(spec({ model: "GD1LP", widthIn: 144, window: "ARCH1PLAIN" }))).toBeNull(); // Arch 1 three across
    expect(doorLayout(spec({ model: "4300", widthIn: 96, window: "PS12", colour: "Ultra-Grain Classic Medium Finish" }))!.windows[0].mode).toBe("grain");
    expect(doorLayout(spec({ model: "4300", widthIn: 96, colour: "Ultra-Grain Classic Medium Finish" }))).not.toBeNull();
    expect(doorLayout(spec({ model: "4300", widthIn: 96, colour: "Purple" }))).toBeNull();
    expect(doorLayout(spec({ model: "GD1LP", widthIn: 84 }))).toBeNull(); // the long panel starts at 7'8"
    expect(doorLayout(spec({ model: "GD1SP", widthIn: 84 }))).not.toBeNull(); // the short panel three across (Brandon's 7'0")
    expect(doorLayout(spec({ model: "GD1SP", widthIn: 84, window: "PL16" }))).toBeNull();
  });

  it("paints the frames on a door Clopay rendered in its colour, and tints the rest", () => {
    expect(doorLayout(spec({ model: "4300", widthIn: 96, window: "PS12", colour: "Almond" }))!.windows[0]).toMatchObject({ mode: "paint", rgb: [222, 216, 201] });
    expect(doorLayout(spec({ model: "4300", widthIn: 96, window: "PS12", colour: "Black" }))!.windows[0]).toMatchObject({ mode: "paint", rgb: [26, 26, 26] });
    expect(doorLayout(spec({ model: "4300", widthIn: 96, window: "PS12", colour: "Mocha Brown" }))!.windows[0]).toMatchObject({ mode: "paint", rgb: [55, 48, 41] });
    expect(doorArt("4300", "Mocha Brown")).toMatchObject({ kind: "tint", rgb: [55, 48, 41] });
  });
});

describe("door pictures — the Modern Steel doors", () => {
  const stack = [21, 21, 21, 21];
  it("sets each window where it was pressed in, the face round it", () => {
    const L = doorLayout({ model: "9208", colour: "White", widthIn: 192, stack, window: "SLIMSILVER", places: [{ section: 4, panel: 1 }, { section: 2, panel: 3 }], across: 4 })!;
    const wins = L.blits.filter((b) => b.src.endsWith("modern--SLIMSILVER.webp"));
    expect(wins).toHaveLength(2);
    expect(L.windows.map((w) => w.mode)).toEqual(["metal", "metal"]);
    const s4 = L.sections.find((s) => s.section === 4)!;
    const s2 = L.sections.find((s) => s.section === 2)!;
    expect(wins[0].dy).toBeGreaterThan(s4.y);
    expect(wins[0].dy + wins[0].dh).toBeLessThan(s4.y + s4.h);
    expect(wins[1].dy).toBeGreaterThan(s2.y);
    expect(wins[1].dx).toBeGreaterThan(wins[0].dx + 400);
  });

  it("paints a window's frame off the door's own face — one flat tone on an Ultra-Grain, as Clopay draws it", () => {
    const L = doorLayout({ model: "9209", colour: "Ultra-Grain Cypress Walnut Finish", widthIn: 192, stack, window: "SQ24", places: [{ section: 4, panel: 2 }], across: 4 })!;
    expect(L.windows).toHaveLength(1);
    expect(L.windows[0]).toMatchObject({ mode: "grain", whole: true });
    expect(L.under.length).toBeGreaterThan(0);
    expect(L.art.src).toBe("/doors/modern-grooved--ug-cypress-walnut.webp");
  });

  it("draws the Modern doors on the Premium Steel chart — a row of windows, alone on the face", () => {
    const L = doorLayout({ model: "9205", colour: "Hunter Green", widthIn: 108, stack: glazedStack(classicStack(8, 0)!, 4), window: "PS12", windowRow: 4 })!;
    expect(L.art).toMatchObject({ kind: "tint", style: "modern-grooved" });
    expect(L.windows).toHaveLength(4);
    expect(doorLayout({ model: "4302", colour: "Iron Ore", widthIn: 96, stack: classicStack(7, 0)!, window: null })).not.toBeNull();
  });

  it("declines a window count its drawing does not have", () => {
    expect(doorLayout({ model: "9208", colour: "White", widthIn: 192, stack, window: "SLIMBLACK", places: [{ section: 4, panel: 1 }], across: 3 })).toBeNull();
  });
});

describe("door pictures — every stock door", () => {
  it("draws every stocked door, colour and window", () => {
    const missing = new Set<string>();
    for (const model of Object.keys(STOCK_MATRIX)) {
      if (!styleOf(model)) continue;
      for (const w of stockedWidths(model)) {
        const [wf, wi = 0] = w.split(".").map(Number);
        const colours = Object.entries(STOCK_MATRIX[model]).filter(([, r]) => r.widths.includes(w)).map(([c]) => c);
        const plains = plainWindowsFor(model).filter((p) => stockLongAllowed(model, wf, wi) || !/LONG/.test(p));
        const designs = windowDesigns(model, "inserts", designWidthCode(wf, wi)).filter((d) => stockLongAllowed(model, wf, wi) || d.cat !== "long");
        const stack = (GALLERY_STACK_MODELS.has(model) ? stockGalleryStack(7, 0) : CLASSIC_STACK_MODELS.has(model) ? classicStack(7, 0) : null)!;
        const windows: (string | null)[] = [null, ...(plains.length ? plains : [undefined]).map((p) => windowKey("glass", undefined, p, model)), ...designs.map((d) => windowKey("inserts", d.id, undefined, model))];
        for (const colour of colours) for (const window of windows) {
          const L = doorLayout({ model, colour, widthIn: wf * 12 + wi, stack, window });
          if (!L) missing.add(window ?? `solid ${colour}`);
        }
      }
    }
    expect([...missing].sort()).toEqual([]);
  });

  it("ships every image a layout can ask for", () => {
    const pub = path.resolve(__dirname, "../../../public");
    for (const s of Object.values(STRIP_SOURCES)) expect(fs.existsSync(path.join(pub, "doors/bands", `${s.file}.webp`)), s.file).toBe(true);
    for (const seq of Object.values(STRIP_SEQ)) for (const ids of Object.values(seq)) for (const id of ids) {
      const [src, cell] = [id.slice(0, id.lastIndexOf(":")), Number(id.slice(id.lastIndexOf(":") + 1))];
      expect(STRIP_SOURCES[src]?.cells[cell], id).toBeTruthy();
    }
    for (const m of ["4300", "4310", "4051", "GD1SP", "GD1LP", "BD1NU", "BD1EU"]) {
      const art = doorArt(m, "White")!;
      expect(fs.existsSync(path.join(pub, art.src)), art.src).toBe(true);
    }
    for (const d of ["11", "12", "21", "43"]) expect(fs.existsSync(path.join(pub, doorArt("CD", "White", d)!.src))).toBe(true);
  });
});
