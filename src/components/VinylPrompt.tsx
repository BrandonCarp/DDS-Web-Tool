"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { OptionButtons, type ButtonOption } from "./OptionButtons";

export const YES_NO: ButtonOption<"yes" | "no">[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

/**
 * Asked when Get price is pressed: does this door get vinyl molding? A yes
 * puts the vinyl on the QuickBooks copy as a second line (Brandon, 25/9/2026).
 *
 * Rendered into the app root rather than in place: the main column is a CSS
 * container, which would pin a fixed overlay to the column instead of the
 * window. Escape, or a click outside, answers no.
 */
export function VinylPrompt({ detail, onAnswer }: { detail: string; onAnswer: (yes: boolean) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onAnswer(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onAnswer]);

  const dialog = (
    <div className="modal-scrim" onClick={() => onAnswer(false)}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vinyl-ask-title"
        data-testid="vinyl-prompt"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="vinyl-ask-title">Add vinyl molding?</h3>
        <p className="muted-note">{detail}</p>
        <OptionButtons label="Add vinyl molding" testid="vinyl-ask" options={YES_NO} value={null}
          onChange={(v) => onAnswer(v === "yes")} />
      </div>
    </div>
  );
  return createPortal(dialog, document.querySelector(".tool-shell") ?? document.body);
}
