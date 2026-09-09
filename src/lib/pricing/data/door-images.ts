// Which picture to draw for a given model and colour.
//
// Two ways a door gets rendered, and the order matters:
//
//   1. A real Clopay render, when one exists for that panel style and colour.
//      Always preferred — it is their image, not an approximation of it.
//   2. The white base for that style, multiplied by a colour. Used for the
//      painted colours nobody has captured.
//
// Black and every Ultra-Grain finish are image-only. Black is 25 ga steel where
// the painted colours are 27 ga and its render carries surface texture the white
// door does not have; measured against Clopay's own Black it fits to 10.8 mean
// error where the painted colours fit to 0.3. Ultra-Grain is wood grain, which a
// colour multiply cannot invent at all.

import { panelRunFor, type PanelRun } from "./door-geometry";

/** A door's visual family. Six stocked models share three of these. */
export type DoorStyle = "short" | "long" | "flush" | "gallery-short" | "gallery-long";

/**
 * Panel style per model.
 *
 * The 4050, 9130, 9200, 4300, T50S and T52S all render identically at this size
 * despite the price book calling some "Short Elegant" and others "Short
 * Traditional" — confirmed by eye and, for the 9203/9133 pair, by the two files
 * being byte-identical.
 */
const STYLE_OF: Record<string, DoorStyle> = {
  "4050": "short", "9130": "short", "9200": "short", "4300": "short",
  T50S: "short", T52S: "short",
  "4053": "long", "9133": "long", "9203": "long",
  "4051": "flush", "9131": "flush", "9201": "flush", "4308": "flush",
  GD1SP: "gallery-short",
  GD1LP: "gallery-long",
};

/** Colour name as the catalogue writes it -> the key used in a filename. */
const COLOUR_KEY: Record<string, string> = {
  White: "white", "Standard White": "white",
  Almond: "almond", Sandtone: "sandtone", "Desert Tan": "desert-tan",
  "Chocolate Brown": "chocolate", Chocolate: "chocolate",
  Bronze: "bronze", Black: "black",
  "Ultra-Grain Classic Medium Finish": "ug-classic-medium",
  "Ultra-Grain Classic Cherry Finish": "ug-classic-cherry",
  "Ultra-Grain Classic Walnut Finish": "ug-classic-walnut",
  "Ultra-Grain Oak Medium Finish": "ug-oak-medium",
  "Ultra-Grain Oak Dark Finish": "ug-oak-dark",
  "Ultra-Grain Oak Walnut Finish": "ug-oak-walnut",
  "Ultra-Grain Oak Slate Finish": "ug-oak-slate",
};

/** Every image actually shipped in public/doors. */
const HAVE = new Set<string>([
  "short--white", "short--almond", "short--sandtone", "short--desert-tan",
  "short--chocolate", "short--bronze", "short--black",
  "short--ug-classic-medium", "short--ug-classic-cherry", "short--ug-classic-walnut",
  "long--white", "long--black",
  "long--ug-classic-medium", "long--ug-classic-cherry", "long--ug-classic-walnut",
  "flush--white", "flush--black",
  "gallery-short--white", "gallery-short--black",
  "gallery-short--ug-oak-medium", "gallery-short--ug-oak-dark",
  "gallery-short--ug-oak-walnut", "gallery-short--ug-oak-slate",
  "gallery-long--white", "gallery-long--black",
  "gallery-long--ug-oak-medium", "gallery-long--ug-oak-dark",
  "gallery-long--ug-oak-walnut", "gallery-long--ug-oak-slate",
]);

/**
 * Tint targets, fitted against Clopay's own renders of the same door.
 *
 * NOT sampled from the colour chips in the configurator — those carry gloss and
 * came out 5 to 17 levels too bright across the board. Each of these was solved
 * for by least squares so that white-base x colour reproduces Clopay's render,
 * and each lands at 0.3 mean absolute error.
 */
const TINT: Record<string, [number, number, number]> = {
  almond: [222, 216, 201],
  sandtone: [172, 158, 142],
  "desert-tan": [183, 179, 158],
  chocolate: [48, 32, 16],
  bronze: [92, 84, 78],
};

/** The mid-tone each white base sits at, used as the tint divisor. */
export const BASE_REF: Record<DoorStyle, number> = {
  short: 216, long: 216, flush: 216, "gallery-short": 232, "gallery-long": 232,
};

export type DoorArt =
  | { kind: "image"; src: string; style: DoorStyle }
  | { kind: "tint"; src: string; style: DoorStyle; rgb: [number, number, number] };

/** Panel style for a model, or null if it is not one we draw. */
export function styleOf(model: string): DoorStyle | null {
  return STYLE_OF[model] ?? null;
}

/**
 * What to draw for a model in a colour, or null when we cannot draw it.
 *
 * Returning null is deliberate. A door shown in the wrong colour is worse than
 * no picture, so an unknown colour declines rather than falling back to white.
 */
export function doorArt(model: string, colour: string): DoorArt | null {
  const style = styleOf(model);
  const ckey = COLOUR_KEY[colour];
  if (!style || !ckey) return null;

  const key = `${style}--${ckey}`;
  if (HAVE.has(key)) return { kind: "image", src: `/doors/${key}.webp`, style };

  const rgb = TINT[ckey];
  const base = `${style}--white`;
  if (rgb && HAVE.has(base)) {
    return { kind: "tint", src: `/doors/${base}.webp`, style, rgb };
  }
  return null;
}

/** The panel run a model draws with, for doorGeometry(). */
export function runOf(model: string): PanelRun | null {
  return panelRunFor(model) ?? (styleOf(model)?.includes("long") ? "long" : styleOf(model) ? "short" : null);
}

/**
 * Window bands actually shipped in public/doors/bands.
 *
 * A band is the top section only — rows 0-95 on the Classic canvas, 0-209 on
 * Gallery. Every window image Clopay renders is byte-identical to the solid
 * door below that line, so one band composites onto any size and any colour.
 * The band tints along with the door, because the frame is painted with it.
 */
const BANDS = new Set<string>([
  "short--501", "short--503", "short--508", "short--509", "short--510",
  "short--601", "short--603", "short--608", "short--610", "short--611",
  "short--612", "short--613", "short--PLAINLONG", "short--PLAINSHORT",
  "short--505", "short--605",
  "long--601", "long--603", "long--608", "long--610", "long--611",
  "long--612", "long--613", "long--PLAINLONG",
  "flush--PLAINLONG", "flush--PLAINSHORT",
  "gallery-short--ARCHPLAIN", "gallery-short--GRILLEARCH", "gallery-short--PLAINLONG",
  "gallery-short--PLAINSHORT", "gallery-short--REC12", "gallery-short--REC14",
  "gallery-short--SQ22", "gallery-short--SQ24", "gallery-short--VERTARCH",
  "gallery-long--ARCHPLAIN", "gallery-long--GRILLEARCH", "gallery-long--PLAINLONG",
  "gallery-long--PLAINSHORT", "gallery-long--REC12", "gallery-long--REC14",
  "gallery-long--SQ22", "gallery-long--SQ24", "gallery-long--VERTARCH",
  "gallery-long--ARCH3PLAIN", "gallery-long--ARCH3GRILLE", "gallery-long--ARCH3VERT",
]);

/**
 * Styles that share top sections.
 *
 * Brandon's call, not a measurement: the top section is a separate part from
 * the panels below it, so a 4050 and a 4053 take the same glass, and so do the
 * two Gallery panels. The 4051 has no captures of its own and borrows from
 * both. If a glazed door ever shows the wrong top, this table is the line.
 *
 * Order matters — the style's own capture is tried first, then these.
 */
/** Gallery bands, keyed style--design--width. */
const GALLERY_BANDS = new Set<string>([
  "gallery-long--ARCH1GRILLE--16",
  "gallery-long--ARCH1GRILLE--8",
  "gallery-long--ARCH1GRILLE--9",
  "gallery-long--ARCH1PLAIN--16",
  "gallery-long--ARCH1PLAIN--8",
  "gallery-long--ARCH1PLAIN--9",
  "gallery-long--ARCH1VERT--16",
  "gallery-long--ARCH1VERT--8",
  "gallery-long--ARCH1VERT--9",
  "gallery-long--ARCH2GRILLE--8",
  "gallery-long--ARCH2GRILLE--9",
  "gallery-long--ARCH2PLAIN--8",
  "gallery-long--ARCH2PLAIN--9",
  "gallery-long--ARCH2VERT--8",
  "gallery-long--ARCH2VERT--9",
  "gallery-long--ARCH3GRILLE--16",
  "gallery-long--ARCH3PLAIN--16",
  "gallery-long--ARCH3VERT--16",
  "gallery-long--PLAINLONG--8",
  "gallery-long--PLAINLONG--9",
  "gallery-long--PLAINSHORT--8",
  "gallery-long--PLAINSHORT--9",
  "gallery-long--REC12--8",
  "gallery-long--REC12--9",
  "gallery-long--REC14--8",
  "gallery-long--REC14--9",
  "gallery-long--SQ22--8",
  "gallery-long--SQ22--9",
  "gallery-long--SQ24--8",
  "gallery-long--SQ24--9",
  "gallery-short--ARCH1GRILLE--8",
  "gallery-short--ARCH1GRILLE--9",
  "gallery-short--ARCH1PLAIN--8",
  "gallery-short--ARCH1PLAIN--9",
  "gallery-short--ARCH1VERT--8",
  "gallery-short--ARCH1VERT--9",
  "gallery-short--ARCH2GRILLE--8",
  "gallery-short--ARCH2GRILLE--9",
  "gallery-short--ARCH2PLAIN--8",
  "gallery-short--ARCH2PLAIN--9",
  "gallery-short--ARCH2VERT--8",
  "gallery-short--ARCH2VERT--9",
  "gallery-short--PLAINLONG--8",
  "gallery-short--PLAINLONG--9",
  "gallery-short--PLAINSHORT--8",
  "gallery-short--PLAINSHORT--9",
  "gallery-short--REC12--8",
  "gallery-short--REC12--9",
  "gallery-short--REC14--8",
  "gallery-short--REC14--9",
  "gallery-short--SQ22--8",
  "gallery-short--SQ22--9",
  "gallery-short--SQ24--8",
  "gallery-short--SQ24--9",
]);

const BAND_FALLBACK: Partial<Record<DoorStyle, DoorStyle[]>> = {
  short: ["long"],
  long: ["short"],
  flush: ["short", "long"],
  "gallery-short": ["gallery-long"],
  "gallery-long": ["gallery-short"],
};

/** Height of the top section, per canvas. */
export const BAND_HEIGHT: Record<DoorStyle, number> = {
  short: 96, long: 96, flush: 96, "gallery-short": 210, "gallery-long": 210,
};

/**
 * The band to lay over the base, or null when we have no image for it.
 *
 * `design` is an insert id, or "PLAINLONG"/"PLAINSHORT" for plain glass. A null
 * means the door is glazed but we cannot draw that glazing — the caller must
 * decline rather than fall back to the solid door, which would show a customer
 * a door without the windows they asked for.
 */
export function windowBand(model: string, design: string, widthCode?: string): string | null {
  const style = styleOf(model);
  if (!style || !design) return null;

  // Gallery renders each width separately — its 9'0" is 1080px wide, not a
  // scaled 960 — so its bands are stored per width and there is no fallback to
  // another width. The Classic canvas is identical at 8'0" and 9'0" (byte for
  // byte), so one band covers the whole panel-count band there.
  if (style.startsWith("gallery")) {
    if (!widthCode) return null;
    // 16'0" is exactly two 8'0" doors — 1920px against 960 — so an 8'0" band
    // tiles onto it without distortion, which is how Arch 1 already renders
    // there. 9'0" is 1080px and NOT a multiple, so it has no fallback and must
    // use its own capture.
    const widths = widthCode === "16" ? ["16", "8"] : [widthCode];
    for (const w of widths) {
      for (const st of [style, ...(BAND_FALLBACK[style] ?? [])]) {
        const key = `${st}--${design}--${w}`;
        if (GALLERY_BANDS.has(key)) return `/doors/bands/${key}.webp`;
      }
    }
    return null;
  }

  for (const st of [style, ...(BAND_FALLBACK[style] ?? [])]) {
    const key = `${st}--${design}`;
    if (BANDS.has(key)) return `/doors/bands/${key}.webp`;
  }
  return null;
}
