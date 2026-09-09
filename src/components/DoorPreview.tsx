"use client";

import { useEffect, useState, useCallback } from "react";
import { doorArt, windowBand, BAND_HEIGHT } from "@/lib/pricing/data/door-images";
import { doorGeometry, panelRunFor } from "@/lib/pricing/data/door-geometry";
import { composite, SLICES } from "@/lib/pricing/data/door-composite";
import { designPanelSpan } from "@/lib/pricing/data/inserts";
import { BASE_REF } from "@/lib/pricing/data/door-images";

interface Props {
  model: string;
  color: string;
  widthFt: number;
  widthIn: number;
  heightFt: number;
  heightIn: number;
  /** "solid", "glass" or "inserts". */
  style: string;
  /** Insert design id when style is inserts; ignored otherwise. */
  design?: string;
  /** Long or short plain glass, when style is glass. */
  glassRun?: "PLAINLONG" | "PLAINSHORT";
  /** Filename stem for the download. */
  filename?: string;
}

/**
 * Draws the quoted door, or nothing.
 *
 * Renders only when all three pieces resolve — an image or tint for the model
 * and colour, a panel grid for the size, and a composite for that grid. Any of
 * them coming back null means we do not know what the door looks like, and a
 * wrong picture on an estimate is worse than no picture, so the component
 * disappears rather than approximating.
 */
export default function DoorPreview({ model, color, widthFt, widthIn, heightFt, heightIn, style, design, glassRun, filename }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const art = doorArt(model, color);
  // A glazed door needs its top section swapped. No band for the chosen design
  // means we cannot draw it — showing the solid door instead would put a
  // window-less picture on a quote for a door with windows.
  const wantsGlass = style === "glass" || style === "inserts";
  const designKey = style === "inserts" ? (design ?? "") : (glassRun ?? "PLAINSHORT");
  const widthCode = widthIn === 0 ? String(widthFt) : `${widthFt}.${widthIn}`;
  const bandSrc = wantsGlass ? windowBand(model, designKey, widthCode) : null;
  const blocked = wantsGlass && !bandSrc;
  const run = panelRunFor(model) ?? (art?.style.includes("long") ? "long" : "short");
  const geo = art ? doorGeometry(widthFt, widthIn, heightFt, heightIn, run, model) : null;

  const draw = useCallback(async (): Promise<string | null> => {
    if (!art || !geo || blocked) return null;
    const slice = SLICES[art.style];
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error(art.src));
      img.src = art.src;
    });

    let band: HTMLImageElement | null = null;
    if (bandSrc) {
      band = new Image();
      band.crossOrigin = "anonymous";
      const b = band;
      await new Promise<void>((res, rej) => {
        b.onload = () => res();
        b.onerror = () => rej(new Error(bandSrc));
        b.src = bandSrc;
      });
    }

    const plan = composite(art.style, geo.panels, geo.sections);
    const w = plan ? plan.width : slice.width;
    const h = plan ? plan.height : slice.height;
    const stage = document.createElement("canvas");
    stage.width = w; stage.height = h;
    const sx = stage.getContext("2d");
    if (!sx) return null;

    if (plan) {
      for (const b of plan.blits) sx.drawImage(img, b.sx, b.sy, b.sw, b.sh, b.dx, b.dy, b.dw, b.dh);
    } else {
      sx.drawImage(img, 0, 0);
    }

    // The band replaces the top section, using the SAME horizontal slicing the
    // panels below it use. Tiling the band at its own width instead puts the
    // windows out of step with the columns underneath on any door wider than
    // the base.
    if (band) {
      const bh = BAND_HEIGHT[art.style];
      const whole = plan?.blits.length === 2 && plan.blits[0].sx === 0;
      if (!plan || whole) {
        // The base is repeated entire, so the band is too — the design's own
        // spacing comes along with it.
        const reps = plan ? plan.blits.length : 1;
        for (let i = 0; i < reps; i++) {
          sx.drawImage(band, 0, 0, band.width, bh, i * band.width, 0, band.width, bh);
        }
      } else {
        // Sliced. A window unit spans one panel for a short design and two for
        // a long one, so the band repeats at the design's pitch rather than the
        // panel pitch — otherwise a 12'0" gets five long windows instead of
        // three.
        const m = SLICES[art.style];
        const span = designPanelSpan(designKey);
        const unitW = span * m.panelPitch;
        const srcX = m.left + span * m.panelPitch;
        sx.drawImage(band, 0, 0, m.left, bh, 0, 0, m.left, bh);

        if (span === 1) {
          // One window per panel: repeat an interior cell, then the real
          // right-hand panel so the door ends the way the source does.
          for (let i = 0; i < geo.panels - 1; i++) {
            sx.drawImage(band, srcX, 0, unitW, bh, m.left + i * unitW, 0, unitW, bh);
          }
          const tailSx = m.left + (m.panels - 1) * m.panelPitch;
          sx.drawImage(band, tailSx, 0, m.width - tailSx, bh,
            m.left + (geo.panels - 1) * unitW, 0, m.width - tailSx, bh);
        } else {
          // A long window covers two panels, so a door with an odd panel count
          // gets floor(panels/2) of them and the rest stays solid — drawing a
          // tail here would leave half a window hanging off the end.
          const units = Math.floor(geo.panels / span);
          for (let i = 0; i < units; i++) {
            sx.drawImage(band, srcX, 0, unitW, bh, m.left + i * unitW, 0, unitW, bh);
          }
        }
      }
    }

    // A tint multiplies the white base: every pixel keeps its shading and takes
    // the colour. Done here rather than with a CSS filter so the downloaded
    // image carries it too.
    if (art.kind === "tint") {
      const ref = BASE_REF[art.style];
      const d = sx.getImageData(0, 0, w, h);
      const px = d.data;
      const [tr, tg, tb] = art.rgb;
      for (let i = 0; i < px.length; i += 4) {
        const k = px[i] / ref;
        px[i] = Math.min(255, k * tr);
        px[i + 1] = Math.min(255, k * tg);
        px[i + 2] = Math.min(255, k * tb);
      }
      sx.putImageData(d, 0, 0);
    }

    // Clopay scales the canvas with the grid, so the finished door is scaled to
    // the size their own render of it would be.
    const outW = plan ? plan.targetWidth : slice.width;
    const outH = plan ? plan.targetHeight : slice.height;
    const out = document.createElement("canvas");
    out.width = outW; out.height = outH;
    const ox = out.getContext("2d");
    if (!ox) return null;
    ox.imageSmoothingQuality = "high";
    ox.drawImage(stage, 0, 0, w, h, 0, 0, outW, outH);
    return out.toDataURL("image/png");
  }, [art, geo, bandSrc, blocked]);

  useEffect(() => {
    // The draw is async by construction (it awaits the image load), so state
    // never lands synchronously inside the effect.
    let live = true;
    void draw().then((u) => { if (live) setUrl(u); }).catch(() => { if (live) setUrl(null); });
    return () => { live = false; };
  }, [draw]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  if (!url) return null;
  const label = `${widthFt}'${widthIn}" x ${heightFt}'${heightIn}" ${model} ${color}`;
  const dl = `${filename ?? `${model}-${widthFt}x${heightFt}-${color}`.replace(/\s+/g, "-").toLowerCase()}.png`;

  return (
    <>
      <div className="doorthumb no-print">
        <button type="button" className="doorthumb-btn" onClick={() => setOpen(true)} title="View larger">
          <img src={url} alt={label} />
        </button>
        <a className="doorthumb-dl" href={url} download={dl}>Download image</a>
      </div>
      {open && (
        <div className="doorlb no-print" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="doorlb-inner" onClick={(e) => e.stopPropagation()}>
              <img src={url} alt={label} />
            <div className="doorlb-foot">
              <span>{label.toUpperCase()}</span>
              <a href={url} download={dl}>Download image</a>
              <button type="button" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
