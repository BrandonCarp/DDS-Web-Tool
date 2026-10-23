// How a door picture is put together (Brandon, 23/10/2026): every door in
// stock or on a special order, with its windows where they are.
//
// The picture is drawn to scale — the door's own width and its sections each
// to its chart height — out of three kinds of piece:
//
//   - the face: a Clopay render of the solid door (public/doors), cut into its
//     panels. A Premium, Value Steel or Gallery door's panels keep their size
//     and the stiles and edges share the rest of the width, as Clopay's own
//     renders do (their 7'0" Premium Steel and 9'0" Gallery); a Bridgeport's
//     units widen, columns added at each panel's middle so the bevels stay
//     sharp. A Modern Steel face has no panels: it is its render, as wide as
//     the door.
//   - the windows: a top section Clopay rendered with the windows in
//     (public/doors/bands, door-strips.ts), cut into its windows. A window is
//     a part of a set size, so it is never stretched: each is set over the
//     panel under it (Brandon, 23/10/2026) — a short window on its short
//     panel, a long window, a pair or an arch over two short panels or on
//     its long panel, two short windows on a long panel — and the face
//     between them is the strip's own plain face carried across; only where
//     a width has no room for them at their size are they drawn narrower.
//     The Premium Steel strips also serve the Bridgeport, whose windows are
//     the same architectural windows. On a Modern Steel door the window alone
//     is set into the face, where it was pressed in or across its row, the
//     face showing round it. A grain door's windows sit on its plain grain.
//   - the stack: Clopay's chart, section by section. A section is the face's
//     top, middle or bottom section drawn to its height; a row of windows is
//     a strip — in the top section, or (up to two rows) any but the bottom on
//     a Premium or Value Steel door, where it takes the joint of a middle
//     section above it. The Coachman's overlays run across its sections, so
//     its render is drawn whole, to the door's height.
//
// Every function here is pure: a layout is a list of copies, source rectangle
// to picture rectangle, which the component draws onto a canvas. Anything not
// known — a face with no render, a window count no capture shows, a colour
// with no paint for the frames — returns null: a wrong picture on an estimate
// is worse than none.

import { classicPanelsWide, coachmanWindowsWide, galleryPanelsWide } from "./door-stacks";
import { modernPanelsWide } from "./modern-steel";
import { doorArt, frameTint, frameTintNeeded, isUltraGrain, isWoodGrain, type DoorArt, type DoorStyle } from "./door-images";
import { SPAN_LONG, STRIP_SEQ, STRIP_SOURCES, type StripSource } from "./door-strips";

/** One copy: a rectangle of an image onto the picture, upside down where `flipY`. */
export interface Blit { src: string; sx: number; sy: number; sw: number; sh: number; dx: number; dy: number; dw: number; dh: number; flipY?: boolean }

/** A section's place on the picture, numbered from the floor up (top = the last). */
export interface SectionBox { section: number; y: number; h: number; inches: number }

/**
 * Where windows sit on the picture, and what their frames take: the windows
 * were captured white, and on another face the frames are painted to match.
 *   paint  the colour given, by brightness — the glass, dark, keeps its look
 *   under  the face under them (`under`), a texture's own (Lustra)
 *   grain  an Ultra-Grain door's, as Clopay draws them: the frames and grilles
 *          one flat wood tone off the grain, the face round them the grain
 *          (`under`); `whole` where the area is the window alone
 *   metal  nothing: a slim window's frame is black or silver whatever the door
 */
export interface WindowArea { x: number; y: number; w: number; h: number; mode: "paint" | "under" | "grain" | "metal"; rgb?: [number, number, number]; ref: number; whole?: boolean }

export interface DoorLayout {
  art: DoorArt;
  /** The canvas the copies land on. */
  width: number;
  height: number;
  /** The picture's size once drawn: the canvas, or the canvas scaled to the door's width (the Coachman). */
  outWidth: number;
  outHeight: number;
  /** The face, then the windows. */
  blits: Blit[];
  /** The face as it is under the windows, solid, for frames that take it. */
  under: Blit[];
  sections: SectionBox[];
  windows: WindowArea[];
  /** The face's panels across, and the windows' row across, by their middles — what lines up over what. */
  panelXs: number[];
  windowXs: number[];
}

export interface WindowPlace { section: number; panel: number }

export interface DoorPictureSpec {
  model: string;
  colour: string;
  widthIn: number;
  /** Section heights top to bottom, inches. */
  stack: readonly number[];
  /** windowKey() or modernWindowKey(): null for a solid door. */
  window: string | null;
  /** The section the windows are in, from the floor up; the top when not given. */
  windowRow?: number;
  /** The rows of windows where there are two (Brandon, 23/10/2026), from the floor up; takes the place of `windowRow`. */
  windowRows?: readonly number[];
  /** A Modern Steel door's windows, each where it was pressed in; `across` the places its drawing has. */
  places?: readonly WindowPlace[];
  across?: number;
  /** The Coachman's design. */
  doorDesign?: string;
}

/** Pixels an inch: Clopay's Premium Steel renders are 55 to the foot, the Gallery's 10 to the inch. */
const PPI_CLASSIC = 55 / 12;
const PPI_GALLERY = 10;
/** Down, the Premium Steel renders give a 21" section 96 rows. */
const PPI_CLASSIC_DOWN = 96 / 21;

/** A row source: a strip, or a face cut into cells. */
interface RowSource { url: string; w: number; cap: [number, number]; cells: readonly (readonly [number, number, number])[]; fill: [number, number]; wins?: readonly (readonly [number, number, number, number])[] }

/** A horizontal copy, before the rows are known. */
interface HBlit { url: string; sx: number; sw: number; dx: number; dw: number }

function stripSource(id: string): RowSource | null {
  const s: StripSource | undefined = STRIP_SOURCES[id];
  return s ? { url: `/doors/bands/${s.file}.webp`, w: s.w, cap: s.cap, cells: s.cells, fill: s.fill, wins: s.wins } : null;
}

/**
 * A cell with two windows in it (Plain Short 19 1/2" x 16", REC12, SQ22 —
 * two to a long panel's place, as Clopay draws them) cut into a cell a
 * window, each centred on its window, so each can be set over a panel.
 */
function splitCell(src: RowSource, cell: number): { src: RowSource; cell: number }[] {
  const [a, b] = src.cells[cell];
  const wins = (src.wins ?? []).filter((w) => w[0] >= a - 1 && w[2] <= b + 1).sort((p, q) => p[0] - q[0]);
  if (wins.length < 2) return [{ src, cell }];
  const cells = wins.map((w, i) => [
    i === 0 ? a : (wins[i - 1][2] + w[0]) / 2,
    i === wins.length - 1 ? b : (w[2] + wins[i + 1][0]) / 2,
    (w[0] + w[2]) / 2,
  ] as const);
  const sub: RowSource = { ...src, cells };
  return cells.map((_, i) => ({ src: sub, cell: i }));
}

/**
 * A grain face's rail over its panels, plain: the face of a section of
 * windows on a grain door, laid down the section a rail at a time, every
 * other one upside down so each meets the next at its own grain.
 */
const GRAIN_RAIL: [number, number] = [2, 15];

/**
 * The least face kept between two frames, and between a frame and the door's
 * edge: where a width has no room for its panels or windows at their size
 * (the narrowest widths of each count across), they are drawn that much
 * narrower rather than run into each other.
 */
const MIN_GAP = 6;

/** The window frames a cell holds, from its anchor: [left, right). */
function cellWindows(src: RowSource, cell: number): [number, number] {
  const [a, b, anchor] = src.cells[cell];
  const ws = (src.wins ?? []).filter((w) => w[0] >= a - 1 && w[2] <= b + 1);
  if (!ws.length) return [a - anchor, b - anchor];
  return [Math.min(...ws.map((w) => w[0])) - anchor, Math.max(...ws.map((w) => w[2] + 1)) - anchor];
}

/** How much narrower windows of these extents, at these centres, must be drawn to keep MIN_GAP between them and from the door's edges. */
function roomScale(W: number, xs: readonly number[], ex: readonly (readonly [number, number])[]): number {
  let f = 1;
  for (let i = 0; i + 1 < xs.length; i++) {
    const need = ex[i][1] - ex[i + 1][0];
    if (need > 0) f = Math.min(f, (xs[i + 1] - xs[i] - MIN_GAP) / need);
  }
  if (xs.length) {
    if (ex[0][0] < 0) f = Math.min(f, (xs[0] - MIN_GAP) / -ex[0][0]);
    const l = xs.length - 1;
    if (ex[l][1] > 0) f = Math.min(f, (W - MIN_GAP - xs[l]) / ex[l][1]);
  }
  return f;
}

/** A short panel's frame and a long panel's, in a Premium Steel render. */
const SHORT_FRAME = 100;
const LONG_FRAME = 207;
/** Short windows two to a long panel sit a short panel apart, as Clopay's render of a long panel door with short windows has them. */
const SHORT_PITCH = 107.8;

/**
 * Where n panels of a set width sit across W: Clopay's renders keep the
 * panel its size and share what is left equally between the stiles and the
 * two edges (8'0": 8 px each; their 7'0" three-panel render: the panels the
 * same size, the stiles wider).
 */
export function slotCentres(W: number, n: number, frame: number): number[] {
  const s = (W - n * frame) / (n + 1);
  return Array.from({ length: n }, (_, k) => s + frame / 2 + k * (frame + s));
}

function divide([L, R]: [number, number], n: number): number[] {
  return Array.from({ length: n + 1 }, (_, k) => L + (k * (R - L)) / n);
}

function centres([L, R]: [number, number], n: number): number[] {
  return Array.from({ length: n }, (_, k) => L + ((k + 0.5) * (R - L)) / n);
}

/** The Gallery's groups: fixed, at 480 apart at the natural width, the extra shared by the stiles and edges alike. */
export function galleryCentres(W: number, n: number): number[] {
  const x = (W - 480 * n) / (n + 1);
  return Array.from({ length: n }, (_, k) => 240 + (k + 1) * x + 480 * k);
}

function fill(out: HBlit[], src: RowSource, dx: number, dw: number) {
  if (dw <= 0) return;
  const [fx, fw] = src.fill;
  if (fw < 8) { out.push({ url: src.url, sx: fx, sw: fw, dx, dw }); return; }
  for (let t = 0; t < dw; t += fw) out.push({ url: src.url, sx: fx, sw: Math.min(fw, dw - t), dx: dx + t, dw: Math.min(fw, dw - t) });
}

/**
 * Cells of a set size, each centred on its mark (`centre`), the face between
 * them carried across from the source's plain face; the door's edges at the
 * two ends. Used for windows, and for a face whose panels keep their size. A
 * cell is drawn narrower (`scale`) only where the door has no room for it.
 * Where two cells of windows overlap they meet halfway between their windows,
 * and the door's edge gives way to a window close to it, so no frame is cut.
 */
export function stripRow(W: number, items: { src: RowSource; cell: number; centre: number; scale?: number }[]): HBlit[] {
  const out: HBlit[] = [];
  if (!items.length) return out;
  const first = items[0].src;
  const last = items[items.length - 1].src;
  // a cell's windows on the picture, [left, right), where it has any
  const frameOf = (it: { src: RowSource; cell: number; centre: number; scale?: number }): readonly [number, number] | null => {
    if (!it.src.wins?.length) return null;
    const [lo, hi] = cellWindows(it.src, it.cell);
    const k = it.scale ?? 1;
    return [it.centre + lo * k, it.centre + hi * k];
  };
  const f0 = frameOf(items[0]);
  const capL = f0 ? Math.max(0, Math.min(first.cap[0], Math.floor(f0[0]))) : first.cap[0];
  if (capL > 0) out.push({ url: first.url, sx: 0, sw: capL, dx: 0, dw: capL });
  let cursor = capL;
  let prev = first;
  let prevBlit: HBlit | null = null;
  let prevFrame: readonly [number, number] | null = null;
  let prevScale = 1;
  for (const it of items) {
    const { src, cell, centre, scale = 1 } = it;
    const [a0, b0, anchor] = src.cells[cell];
    let a = Math.round(a0);
    const b = Math.round(b0);
    let w = b - a;
    let dw = scale === 1 ? w : Math.round(w * scale);
    let x0 = Math.round(centre - (anchor - a) * scale);
    const frame = frameOf(it);
    if (x0 < cursor && prevBlit && prevFrame && frame) {
      const meet = Math.max(x0, Math.round((prevFrame[1] + frame[0]) / 2));
      if (meet < cursor) {
        const back = cursor - meet;
        prevBlit.dw -= back;
        prevBlit.sw -= back / prevScale;
        cursor = meet;
      }
    }
    if (x0 > cursor) fill(out, prev, cursor, x0 - cursor);
    else if (x0 < cursor) { const skip = cursor - x0; a += skip / scale; w -= skip / scale; dw -= skip; x0 = cursor; }
    if (dw > 0) {
      const blit: HBlit = { url: src.url, sx: a, sw: w, dx: x0, dw };
      out.push(blit);
      cursor = x0 + dw;
      prevBlit = blit;
    } else prevBlit = null;
    prev = src;
    prevFrame = frame;
    prevScale = scale;
  }
  const fl = frameOf(items[items.length - 1]);
  const capR = fl ? Math.max(0, Math.min(last.cap[1], W - Math.ceil(fl[1]))) : last.cap[1];
  const rx = W - capR;
  if (rx > cursor) fill(out, prev, cursor, rx - cursor);
  if (capR > 0) out.push({ url: last.url, sx: last.w - capR, sw: capR, dx: rx, dw: capR });
  return out;
}

/**
 * Cells laid edge to edge on the cuts given, each widened (or narrowed) by
 * columns added (or dropped) at its `mids` — the middles of its panels.
 */
export function baseRow(W: number, src: RowSource, cells: number[], cuts: number[], mids: (cell: number) => number[]): HBlit[] {
  const out: HBlit[] = [];
  const capL = src.cap[0];
  const t0 = Math.round(cuts[0]);
  if (capL > 0) out.push({ url: src.url, sx: 0, sw: Math.min(capL, t0), dx: 0, dw: Math.min(capL, t0) });
  if (t0 > capL) fill(out, src, capL, t0 - capL);
  cells.forEach((cell, j) => {
    const a = Math.round(src.cells[cell][0]);
    const b = Math.round(src.cells[cell][1]);
    const dx0 = Math.round(cuts[j]);
    const dw = Math.round(cuts[j + 1]) - dx0;
    const sw = b - a;
    const ms = mids(cell).map(Math.round).filter((m) => m > a && m < b - 1).sort((p, q) => p - q);
    if (dw === sw || !ms.length) {
      out.push({ url: src.url, sx: a, sw, dx: dx0, dw });
      return;
    }
    const delta = dw - sw;
    const share = ms.map((_, i) => Math.floor(((i + 1) * Math.abs(delta)) / ms.length) - Math.floor((i * Math.abs(delta)) / ms.length));
    let sx = a;
    let dx = dx0;
    ms.forEach((m, i) => {
      if (delta > 0) {
        // up to and including column m, then m again across the share
        out.push({ url: src.url, sx, sw: m - sx, dx, dw: m - sx });
        dx += m - sx;
        out.push({ url: src.url, sx: m, sw: 1, dx, dw: share[i] + 1 });
        dx += share[i] + 1;
        sx = m + 1;
      } else {
        const lo = m - Math.floor(share[i] / 2);
        const hi = m + Math.ceil(share[i] / 2);
        if (lo > sx) { out.push({ url: src.url, sx, sw: lo - sx, dx, dw: lo - sx }); dx += lo - sx; }
        sx = Math.max(sx, hi);
      }
    });
    if (b > sx) out.push({ url: src.url, sx, sw: b - sx, dx, dw: b - sx });
  });
  const capR = src.cap[1];
  const t1 = Math.round(cuts[cuts.length - 1]);
  if (W - capR > t1) fill(out, src, t1, W - capR - t1);
  if (capR > 0) out.push({ url: src.url, sx: src.w - capR, sw: capR, dx: W - capR, dw: capR });
  return out;
}

/** The copies of a row that land in [x0, x1), cut down to it. */
function clipRow(hb: HBlit[], x0: number, x1: number): HBlit[] {
  const out: HBlit[] = [];
  for (const b of hb) {
    const lo = Math.max(x0, b.dx);
    const hi = Math.min(x1, b.dx + b.dw);
    if (hi <= lo) continue;
    const k = b.sw / b.dw;
    out.push({ url: b.url, sx: b.sx + (lo - b.dx) * k, sw: (hi - lo) * k, dx: lo, dw: hi - lo });
  }
  return out;
}

/** Which source cell each of n cells takes: the source's own ends at the ends, its middle cells between. */
function cellOrder(n: number, k: number): number[] {
  return Array.from({ length: n }, (_, i) => {
    if (n === 1 || k === 1) return 0;
    if (i === 0) return 0;
    if (i === n - 1) return k - 1;
    return k > 2 ? 1 + ((i - 1) % (k - 2)) : i % 2;
  });
}

type Family = "classic" | "gallery" | "bridgeport" | "coachman" | "modern";

function familyOf(style: DoorStyle): Family {
  if (style === "short" || style === "long" || style === "flush") return "classic";
  if (style.startsWith("gallery")) return "gallery";
  if (style.startsWith("bridgeport")) return "bridgeport";
  if (style.startsWith("modern")) return "modern";
  return "coachman";
}

/** The face's sections in its render, rows [from, to): the top, a middle one and the bottom. */
function templates(fam: Family): { top: [number, number]; mid: [number, number]; bottom: [number, number]; joint: number } {
  return fam === "gallery"
    ? { top: [0, 210], mid: [210, 420], bottom: [630, 840], joint: 2 }
    : { top: [0, 96], mid: [96, 192], bottom: [288, 384], joint: 2 };
}

/** A Modern Steel window on its own, by key: the source and its windows, which take a long place or a short one. */
const MODERN_WINDOWS: Record<string, { src: string; long: boolean }> = {
  PS16: { src: "c:ps16x", long: false }, REC12: { src: "c:rec12x", long: false }, SQ22: { src: "c:sq22", long: false },
  PL16: { src: "c:pl16", long: true }, REC14: { src: "c:rec14", long: true }, SQ24: { src: "c:sq24", long: true },
  SLIMBLACK: { src: "m:slimblack", long: true }, SLIMSILVER: { src: "m:slimsilver", long: true },
  PS12: { src: "c:ps12", long: false }, PL12: { src: "c:pl12", long: true },
};

/** A grooved face's row with no groove in it — what a window's frame takes its colour from there. */
const GROOVED_FLAT_ROW = 124;

/**
 * The picture's layout, or null when the door cannot be drawn as it is: no
 * render of the face in the colour, a width or height off the chart, or
 * windows no capture shows at the count across the door takes.
 */
export function doorLayout(spec: DoorPictureSpec): DoorLayout | null {
  const art = doorArt(spec.model, spec.colour, spec.doorDesign);
  if (!art) return null;
  const stack = spec.stack;
  if (!stack.length || !(spec.widthIn > 0)) return null;
  const fam = familyOf(art.style);
  const wf = Math.floor(spec.widthIn / 12);
  const wi = spec.widthIn - wf * 12;

  // Windows: what, where and whether the picture can show them.
  const top = stack.length;
  const key = spec.window;
  const placed = fam === "modern" && !!spec.places;
  // The rows the windows are in: the top unless others were picked — any but the bottom on a Premium or Value Steel door, two at most.
  const rows: number[] = key === null || placed ? [] : [...new Set(spec.windowRows?.length ? spec.windowRows : [spec.windowRow ?? top])];
  // How the frames take the door's colour.
  const grain = isWoodGrain(spec.colour);
  const ultra = isUltraGrain(spec.colour);
  let frameMode: Omit<WindowArea, "x" | "y" | "w" | "h" | "ref"> = { mode: "paint", rgb: art.kind === "tint" ? art.rgb : undefined };
  if (key !== null) {
    if (!key) return null;
    // the Coachman's windows are a top section of series 1 and 2 (designs 11 to 23); 31 and up are built solid
    if (fam === "coachman" && !/^[12]/.test(spec.doorDesign ?? "")) return null;
    if (!placed) {
      const anyRow = fam === "classic" || fam === "modern";
      if (rows.length > (anyRow ? 2 : 1) || rows.some((r) => !Number.isInteger(r) || r > top || (anyRow ? r < 2 : r !== top))) return null;
    }
    if (ultra) frameMode = { mode: "grain" };
    else if (fam === "modern" || grain) frameMode = { mode: "under" };
    else if (art.kind === "image" && frameTintNeeded(spec.colour)) {
      const rgb = frameTint(spec.colour);
      if (!rgb) return null;
      frameMode = { mode: "paint", rgb };
    }
  }

  // Across: the canvas and the face's cells.
  const ppi = fam === "gallery" ? PPI_GALLERY : PPI_CLASSIC_DOWN;
  let W: number;
  let outW: number;
  let face: RowSource;
  let faceRow: HBlit[];
  let windowCentres: ((m: number) => number[]) | null = null;
  // Whether m windows across line up with the panels under them, one a panel, one a pair or two a long panel.
  let windowsAlign: (m: number) => boolean = () => false;
  let windowsAcross: number | null = null;
  // The face's panels across, by their middles — what the windows line up over.
  let panels: number[] = [];
  let windowXs: number[] = [];
  // how much of their size the panels keep: all of it but where the width has no room
  let fit = 1;
  const T = templates(fam);
  if (fam === "classic" || fam === "modern") {
    const ps = classicPanelsWide(wf, wi, false);
    const pl = classicPanelsWide(wf, wi, true);
    W = outW = Math.round(spec.widthIn * PPI_CLASSIC);
    if (fam === "modern") {
      // the render as wide as the door: cut down to it, or drawn out to it past 16'0"
      face = { url: art.src, w: 880, cap: [4, 4], cells: [[4, 876, 440]], fill: [440, 2] };
      const body = W - 8;
      faceRow = [{ url: art.src, sx: 0, sw: 4, dx: 0, dw: 4 },
        { url: art.src, sx: 4, sw: Math.min(body, 872), dx: 4, dw: body },
        { url: art.src, sx: 876, sw: 4, dx: W - 4, dw: 4 }];
    } else {
      const n = art.style === "short" ? ps : art.style === "long" ? pl : 1;
      if (!n) return null;
      if (art.style === "flush") {
        face = { url: art.src, w: 440, cap: [16, 0], cells: [[16, 440, 228]], fill: [200, 2] };
        faceRow = baseRow(W, face, [0], [16, W], () => [228]);
      } else {
        // the render's panels: four short (frames 100 wide) or two long (207), each cell's centre its frame's;
        // where the width has no room for them at that size (three long panels from 11'3"), they give
        const short = art.style === "short";
        face = short
          ? { url: art.src, w: 440, cap: [4, 4], cells: [[4, 112, 57.5], [112, 220, 165.5], [220, 328, 273.5], [328, 436, 381.5]], fill: [110, 2] }
          : { url: art.src, w: 440, cap: [4, 4], cells: [[4, 219.5, 112], [219.5, 435.5, 327.5]], fill: [218, 2] };
        const frame = short ? SHORT_FRAME : LONG_FRAME;
        fit = Math.min(1, (W - (n + 1) * MIN_GAP) / (n * frame));
        panels = slotCentres(W, n, frame * fit);
        faceRow = stripRow(W, cellOrder(n, short ? 4 : 2).map((cell, i) => ({ src: face, cell, centre: panels[i], scale: fit })));
      }
    }
    if (key && !placed) {
      windowsAcross = SPAN_LONG.has(key) ? pl : ps;
      // The windows over the panels under them (Brandon, 23/10/2026): one a
      // panel on its panel; a long window, a pair or an arch over two short
      // panels; two short windows on a long panel. Where the counts do not
      // pair (a flush or Modern Steel face, a five-panel door's long windows),
      // a long window, pair or arch on a long panel's place, anything more
      // across one a short panel's.
      const below = panels;
      const short = art.style === "short";
      windowsAlign = (m) => below.length > 0 && (m === below.length || (short && m * 2 === below.length) || (!short && m === 2 * below.length));
      windowCentres = (m) => {
        if (below.length && m === below.length) return below;
        if (below.length && short && m * 2 === below.length) return Array.from({ length: m }, (_, j) => (below[2 * j] + below[2 * j + 1]) / 2);
        if (below.length && !short && m === 2 * below.length) return below.flatMap((x) => [x - (SHORT_PITCH * fit) / 2, x + (SHORT_PITCH * fit) / 2]);
        return slotCentres(W, m, SPAN_LONG.has(key) && m === pl ? LONG_FRAME : SHORT_FRAME);
      };
    }
  } else if (fam === "gallery") {
    const n = galleryPanelsWide(wf, wi, true);
    W = outW = Math.round(spec.widthIn * PPI_GALLERY);
    if (!n) {
      // under 7'8": the short panel door three short panels across, as Brandon's 7'0" capture has it — solid only
      if (art.style !== "gallery-short" || galleryPanelsWide(wf, wi, false) !== 3 || key) return null;
      face = { url: art.src, w: 960, cap: [14, 15], cells: [[14, 240, 127], [240, 465, 352.5], [495, 720, 607], [720, 945, 832.5]], fill: [467, 24] };
      const c3 = slotCentres(W, 3, 194);
      faceRow = stripRow(W, cellOrder(3, 4).map((cell, i) => ({ src: face, cell, centre: c3[i] })));
    } else {
      face = { url: art.src, w: 960, cap: [15, 17], cells: [[15, 463, 239], [495, 943, 719]], fill: [467, 24] };
      const c = galleryCentres(W, n);
      panels = c;
      faceRow = stripRow(W, cellOrder(n, 2).map((cell, i) => ({ src: face, cell, centre: c[i] })));
      if (key) { windowsAcross = n; windowCentres = (m) => galleryCentres(W, m); }
    }
  } else if (fam === "bridgeport") {
    const n = galleryPanelsWide(wf, wi, true);
    if (!n) return null;
    W = outW = Math.round(spec.widthIn * PPI_CLASSIC);
    const narrow = art.style === "bridgeport-narrow";
    face = { url: art.src, w: 880, cap: [0, 0], cells: [[0, 219.5, 110], [219.5, 439.5, 330], [439.5, 659.5, 550], [659.5, 880, 770]], fill: [218, 2] };
    faceRow = baseRow(W, face, cellOrder(n, 4), divide([0, W], n), (cell) => (narrow ? [34, 84.5, 135, 185.5] : [110]).map((x) => x + 220 * cell));
    panels = centres([0, W], n);
    if (key) {
      windowsAcross = SPAN_LONG.has(key) ? n : 2 * n;
      // over its units: one a unit, or two short ones on a unit a short panel apart
      const half = Math.min(SHORT_PITCH / 2, W / n / 4);
      windowCentres = (m) => (m === n ? panels : m === 2 * n ? panels.flatMap((x) => [x - half, x + half]) : centres([0, W], m));
    }
  } else {
    const n = coachmanWindowsWide(wf, wi);
    if (!n) return null;
    W = 220 * n;
    outW = Math.round(spec.widthIn * PPI_CLASSIC);
    face = { url: art.src, w: 880, cap: [0, 0], cells: [[0, 220, 110], [220, 440, 330], [440, 660, 550], [660, 880, 770]], fill: [218, 2] };
    faceRow = baseRow(W, face, cellOrder(n, 4), divide([0, W], n), (cell) => [110 + 220 * cell]);
    if (key) { windowsAcross = n; windowCentres = (m) => Array.from({ length: m }, (_, k) => 110 + 220 * k); }
  }

  // The windows' row, across: a strip, or (a Modern Steel face) its windows alone.
  let stripH: HBlit[] | null = null;
  let stripRows = 0;
  let rowWindows: { url: string; box: readonly [number, number, number, number]; x: number }[] = [];
  let rowScale = 1;
  if (key && !placed) {
    const m = windowsAcross;
    const fk = fam === "gallery" ? "g" : fam === "coachman" ? "k" : "c";
    const seq = m ? STRIP_SEQ[`${fk}|${key}`]?.[m] : undefined;
    if (!m || !seq || !windowCentres) return null;
    const cut = seq.map((id) => {
      const at = id.lastIndexOf(":");
      return { src: stripSource(id.slice(0, at)), cell: Number(id.slice(at + 1)) };
    });
    if (cut.some((it) => !it.src)) return null;
    let parts = cut as { src: RowSource; cell: number }[];
    // two windows to a cell: each over its own panel, where the panels count them out
    const each = parts.flatMap((it) => splitCell(it.src, it.cell));
    if (each.length > parts.length && windowsAlign(each.length)) parts = each;
    // the windows sit on as many places as the design lays across
    const cs = windowCentres(parts.length);
    windowXs = cs;
    // at their size, unless the width has no room for them (the Coachman's are its grid's)
    const scale = fam === "coachman" ? 1 : Math.min(1, roomScale(W, cs, parts.map((it) => cellWindows(it.src, it.cell))));
    if (scale < 0.8) return null;
    const ok = parts.map((it, i) => ({ ...it, centre: cs[i], scale }));
    rowScale = scale;
    stripRows = fam === "gallery" ? 210 : fam === "coachman" ? 110 : 96;
    if (fam === "modern") {
      for (const it of ok) {
        const [a, b, anchor] = it.src.cells[it.cell];
        for (const box of it.src.wins ?? []) {
          if (box[0] >= a - 1 && box[2] <= b + 1) rowWindows.push({ url: it.src.url, box, x: Math.round(it.centre + (box[0] - anchor) * scale) });
        }
      }
      if (!rowWindows.length) return null;
    } else {
      stripH = stripRow(W, ok);
    }
  }

  // A Modern Steel door's windows, each in the place it was pressed into.
  const placedWindows: { section: number; url: string; box: readonly [number, number, number, number]; x: number; metal: boolean; scale: number }[] = [];
  if (placed && key) {
    const mw = MODERN_WINDOWS[key];
    const src = mw ? stripSource(mw.src) : null;
    if (!mw || !src?.wins?.length) return null;
    const across = modernPanelsWide(wf, wi, mw.long ? "long" : "short");
    if (!across || (spec.across !== undefined && spec.across !== across)) return null;
    const bw = src.wins[0][2] - src.wins[0][0] + 1;
    // at their size, unless the width has no room for them across
    const scale = Math.min(1, (W - (across + 1) * MIN_GAP) / (across * bw));
    if (scale < 0.8) return null;
    const cs = slotCentres(W, across, bw * scale);
    for (const p of spec.places ?? []) {
      if (p.section < 1 || p.section > top || p.panel < 1 || p.panel > across) continue;
      const box = src.wins[(p.panel - 1) % src.wins.length];
      placedWindows.push({ section: p.section, url: src.url, box, x: Math.round(cs[p.panel - 1] - ((box[2] - box[0] + 1) * scale) / 2), metal: key.startsWith("SLIM"), scale });
    }
  }

  // Down: section by section, each to its height.
  const blits: Blit[] = [];
  const under: Blit[] = [];
  const windows: WindowArea[] = [];
  const sections: SectionBox[] = [];
  let inches = 0;
  let y = 0;
  const put = (hb: HBlit[], sy: number, sh: number, dy: number, dh: number, to = blits, flipY = false) => {
    if (dh <= 0 || sh <= 0) return;
    for (const b of hb) to.push({ src: b.url, sx: b.sx, sy, sw: b.sw, sh, dx: b.dx, dy, dw: b.dw, dh, ...(flipY ? { flipY } : {}) });
  };
  // A grain's plain face down a section [dy, dy + dh): its rail, every other one upside down.
  const plainGrain = (dy: number, dh: number) => {
    const band = GRAIN_RAIL[1] - GRAIN_RAIL[0];
    const step = Math.max(1, Math.round((band * dh) / 96));
    for (let k = 0, ty = dy; ty < dy + dh; k++, ty += step) {
      const h = Math.min(step, dy + dh - ty);
      const sh = (band * h) / step;
      const flip = k % 2 === 1;
      put(faceRow, T.top[0] + (flip ? GRAIN_RAIL[1] - sh : GRAIN_RAIL[0]), sh, ty, h, under, flip);
    }
  };
  const refFor = fam === "gallery" ? 232 : fam === "coachman" ? 213 : 216;
  // A window alone, centred down its section, the face under it for its frame.
  const setWindow = (url: string, whole: readonly [number, number, number, number], x0: number, secY: number, dh: number, tpl: [number, number], metal: boolean, scale: number) => {
    // a slim window's frame is its own colour: its box drawn a pixel in, so the white face it was captured on stays behind
    const box = metal ? [whole[0] + 1, whole[1] + 1, whole[2] - 1, whole[3] - 1] as const : whole;
    const x = metal ? x0 + 1 : x0;
    const bw = box[2] - box[0] + 1;
    const ww = scale === 1 ? bw : Math.round(bw * scale);
    const bh = box[3] - box[1] + 1;
    const wy = secY + Math.round((dh - bh) / 2);
    blits.push({ src: url, sx: box[0], sy: box[1], sw: bw, sh: bh, dx: x, dy: wy, dw: ww, dh: bh });
    if (metal) { windows.push({ x, y: wy, w: ww, h: bh, mode: "metal", ref: 216 }); return; }
    const cut = clipRow(faceRow, x, x + ww);
    if (art.style === "modern-grooved") put(cut, GROOVED_FLAT_ROW, 1, wy, bh, under);
    else put(cut, tpl[0] + ((wy - secY) * (tpl[1] - tpl[0])) / dh, (bh * (tpl[1] - tpl[0])) / dh, wy, bh, under);
    windows.push(ultra ? { x, y: wy, w: ww, h: bh, mode: "grain", ref: 216, whole: true } : { x, y: wy, w: ww, h: bh, mode: "under", ref: 216 });
  };
  stack.forEach((h, i) => {
    inches += h;
    const y1 = Math.round(inches * ppi);
    const dh = y1 - y;
    const section = top - i;
    const tpl = i === 0 ? T.top : i === top - 1 ? T.bottom : T.mid;
    const srcH = tpl[1] - tpl[0];
    if (fam === "coachman") {
      // the Coachman's overlays run across its sections: its render is drawn
      // whole, to the door's height, the sections marked where the chart has them
      if (i === 0) {
        const H = Math.round(stack.reduce((a, b) => a + b, 0) * ppi);
        put(faceRow, 0, 384, 0, H);
        if (stripH) {
          const gh = Math.round((stripRows * H) / 384);
          put(stripH, 0, stripRows, 0, gh);
          windows.push({ x: 0, y: 0, w: W, h: gh, ...frameMode, ref: refFor });
        }
      }
    } else if (stripH && rows.includes(section)) {
      // a grain's windows are on its plain face: the rail over the panels, laid down the section
      if (grain) plainGrain(y, dh);
      // a middle section keeps its own joint over the strip's window rows
      const j = i === 0 ? 0 : Math.max(1, Math.round((T.joint * dh) / stripRows));
      if (j) {
        put(faceRow, T.mid[0], T.joint, y, j);
        put(stripH, T.joint, stripRows - T.joint, y + j, dh - j);
      } else {
        put(stripH, 0, stripRows, y, dh);
      }
      windows.push({ x: 0, y: y + j, w: W, h: dh - j, ...frameMode, ref: refFor });
    } else {
      put(faceRow, tpl[0], srcH, y, dh);
      if (fam === "modern") {
        if (rows.includes(section)) for (const rw of rowWindows) setWindow(rw.url, rw.box, rw.x, y, dh, tpl, false, rowScale);
        for (const pw of placedWindows) if (pw.section === section) setWindow(pw.url, pw.box, pw.x, y, dh, tpl, pw.metal, pw.scale);
      }
    }
    sections.push({ section, y, h: dh, inches: h });
    y = y1;
  });

  return { art, width: W, height: y, outWidth: outW, outHeight: y, blits, under, sections, windows, panelXs: panels, windowXs };
}
