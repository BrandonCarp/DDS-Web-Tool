"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A page of a brochure beside a quote: a small picture of it in the quote
 * card that opens full size when pressed (Brandon, 21/10/2026 — page 3 of
 * Clopay's Modern Steel brochure, MODEL AVAILABILITY, on every Modern Steel
 * quote). Escape, a click outside or Close puts it away.
 *
 * The full-size view is rendered into the app root rather than in place: the
 * main column is a CSS container, which would pin a fixed overlay to the
 * column instead of the window.
 */
export interface BrochurePage {
  /** The small picture, in the card. */
  thumb: string;
  /** The page at reading size. */
  full: string;
  alt: string;
}

/** Page 3 of Clopay's Modern Steel brochure (RSDR-MODERNSTEELSS-15): model availability, with the colour chart. */
export const MODERN_STEEL_PAGE: BrochurePage = {
  thumb: "/brochure/modern-steel-p3-thumb.jpg",
  full: "/brochure/modern-steel-p3.jpg",
  alt: "Clopay Modern Steel model availability (brochure page 3)",
};

export function BrochurePeek({ page, testId = "brochure" }: { page: BrochurePage; testId?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const lightbox = (
    <div className="modal-scrim no-print" onClick={() => setOpen(false)}>
      <div className="modal brochure-lb" role="dialog" aria-modal="true" aria-label={page.alt} data-testid={`${testId}-lightbox`} onClick={(e) => e.stopPropagation()}>
        <img src={page.full} alt={page.alt} />
        <div className="brochure-lb-foot">
          <button type="button" className="btn" onClick={() => setOpen(false)} data-testid={`${testId}-close`}>Close</button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="brochure no-print" data-testid={testId}>
      <button type="button" className="brochure-btn" onClick={() => setOpen(true)} title="View larger" data-testid={`${testId}-open`}>
        <img src={page.thumb} alt={page.alt} />
      </button>
      {open && createPortal(lightbox, document.querySelector(".tool-shell") ?? document.body)}
    </div>
  );
}
