// Building a door picture at a size nobody photographed.
//
// Clopay renders every size separately, so there is no image for a 16'0" that
// is the 8'0" doubled. But the grid is identical between sizes — same panel
// pitch, same section joints, same canvas height — so a wider or taller door
// can be built from the 8'0" x 7'0" base by repeating interior cells and
// keeping the real edges.
//
// Measured against Clopay's own 16'0" x 7'0", a composite built this way lands
// at 5.53 mean absolute error. Their own left half differs from their right half
// by 6.06, so the composite is closer to their render than their render is to
// itself. What remains is a sub-pixel phase offset: they start the first panel
// at x=15, the base starts at x=10, and that cannot be removed by compositing.
//
// The slice metrics below were measured off the base images — panel pitch by
// autocorrelation (r=0.94 on the Classic canvas, 0.999 on Gallery long) and
// section joints from full-width dark rows. They are constants rather than
// runtime detection because detection picks up the grooves inside a Gallery
// panel and reports a third of the true pitch.

import type { DoorStyle } from "./door-images";

export interface SliceMetrics {
  /** Source canvas. */
  width: number;
  height: number;
  /** Panels and sections the base image itself depicts. */
  panels: number;
  sections: number;
  /** Horizontal distance between panel starts. */
  panelPitch: number;
  /** Left margin before the first panel. */
  left: number;
  /** Rows 0..header are the top edge plus the first section. */
  header: number;
  /** One interior section runs header..header+sectionPitch. */
  sectionPitch: number;
  /** Rows footerTop..height are the bottom section, cropped in the source. */
  footerTop: number;
}

export const SLICES: Record<DoorStyle, SliceMetrics> = {
  short:           { width: 440, height: 384, panels: 4, sections: 4, panelPitch: 108, left: 10, header: 113, sectionPitch: 96, footerTop: 306 },
  long:            { width: 440, height: 384, panels: 2, sections: 4, panelPitch: 215, left: 10, header: 113, sectionPitch: 96, footerTop: 306 },
  flush:           { width: 440, height: 384, panels: 4, sections: 4, panelPitch: 108, left: 10, header: 113, sectionPitch: 96, footerTop: 306 },
  "gallery-short": { width: 960, height: 840, panels: 4, sections: 4, panelPitch: 225, left: 30, header: 241, sectionPitch: 210, footerTop: 661 },
  // 450, not 480: on a two-panel door autocorrelation reports W/2 because half
  // the image trivially matches the other half. The Gallery canvas carries
  // symmetric 30px margins, so 2 panels span (960 - 60) / 2.
  "gallery-long":  { width: 960, height: 840, panels: 2, sections: 4, panelPitch: 450, left: 30, header: 241, sectionPitch: 210, footerTop: 661 },
};

/** One rectangle copied from the source onto the output. */
export interface Blit {
  sx: number; sy: number; sw: number; sh: number;
  dx: number; dy: number; dw: number; dh: number;
}

export interface Composite {
  /** Canvas to draw into, before any final scaling. */
  width: number;
  height: number;
  /** What Clopay's own render of this size would measure, for the final scale. */
  targetWidth: number;
  targetHeight: number;
  blits: Blit[];
}

/**
 * Work out every copy needed to build `panels` x `sections` from a base.
 *
 * Returns null when the base already is that size — the caller should draw the
 * image directly rather than take it apart and put it back together.
 */
export function composite(style: DoorStyle, panels: number, sections: number): Composite | null {
  const m = SLICES[style];
  if (!m) return null;
  if (panels < 1 || sections < 2) return null;
  if (panels === m.panels && sections === m.sections) return null;

  const blits: Blit[] = [];

  // When the target is a whole number of base doors, repeat the base entire
  // rather than slicing it. This matters for designs that span more than one
  // panel: the Gallery arch rises across panel 1 and falls across panel 2, so
  // copying a single interior panel gives every window the same slope. Tiling
  // whole widths keeps the pair together, and it is exact — a 16'0" really is
  // two 8'0" doors side by side.
  if (panels % m.panels === 0 && sections === m.sections) {
    const reps = panels / m.panels;
    for (let i = 0; i < reps; i++) {
      blits.push({
        sx: 0, sy: 0, sw: m.width, sh: m.height,
        dx: i * m.width, dy: 0, dw: m.width, dh: m.height,
      });
    }
    return {
      width: m.width * reps,
      height: m.height,
      targetWidth: m.width * reps,
      targetHeight: m.height,
      blits,
    };
  }

  const tailW = m.width - (m.left + (m.panels - 1) * m.panelPitch);
  const outW = m.left + (panels - 1) * m.panelPitch + tailW;
  const footerH = m.height - m.footerTop;
  const outH = m.header + Math.max(sections - 2, 0) * m.sectionPitch + footerH;

  // One horizontal strip: real left margin, a repeated interior panel, then the
  // real right-hand panel and margin. Repeating an interior cell rather than
  // stretching keeps the bevel geometry exact.
  const row = (sy: number, sh: number, dy: number) => {
    blits.push({ sx: 0, sy, sw: m.left, sh, dx: 0, dy, dw: m.left, dh: sh });
    for (let i = 0; i < panels - 1; i++) {
      blits.push({
        sx: m.left + m.panelPitch, sy, sw: m.panelPitch, sh,
        dx: m.left + i * m.panelPitch, dy, dw: m.panelPitch, dh: sh,
      });
    }
    const tailSx = m.left + (m.panels - 1) * m.panelPitch;
    blits.push({
      sx: tailSx, sy, sw: m.width - tailSx, sh,
      dx: m.left + (panels - 1) * m.panelPitch, dy, dw: m.width - tailSx, dh: sh,
    });
  };

  let dy = 0;
  row(0, m.header, dy);                       // top edge + first section
  dy += m.header;
  for (let j = 0; j < Math.max(sections - 2, 0); j++) {
    row(m.header, m.sectionPitch, dy);        // a clean interior section
    dy += m.sectionPitch;
  }
  row(m.footerTop, footerH, dy);              // the cropped bottom section

  return {
    width: outW,
    height: outH,
    // Clopay scales the canvas with the grid: twice the panels is twice the
    // width. Scaling the finished composite to that keeps proportions honest.
    targetWidth: Math.round((m.width * panels) / m.panels),
    targetHeight: Math.round((m.height * sections) / m.sections),
    blits,
  };
}
