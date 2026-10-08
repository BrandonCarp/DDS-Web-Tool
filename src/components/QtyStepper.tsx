"use client";

import { useState } from "react";

/**
 * The app's quantity box — Brandon, 7/10/2026: − and + either side of a box
 * that can also be typed in, as the Vinyl tab introduced. Every quantity in the
 * app uses it (a test holds new ones to it); measurements — feet, inches,
 * sizes — and prices keep plain boxes.
 *
 * The buttons never take the cursor (mousedown is held back), so a scan box
 * that keeps the cursor — Inventory, Scanner — still has it after a click.
 *
 * Typing (8/10/2026): the box holds what the person types while they type, so
 * Backspace can empty it and "5" reads 5 — not 15, which is what snapping an
 * emptied box back to 1 produced. Only a whole number at or above the lowest
 * reaches the quote; leaving the box empty or too low puts the last good
 * number back. What is typed only stands while the quote still holds the
 * number it left there: a reset from outside (Inventory clearing the count
 * after a scan, Clear) shows straight away.
 */
export function QtyStepper({
  value,
  onChange,
  min = 1,
  testId,
  id,
  label = "Quantity",
}: {
  value: number | string;
  /** The box's new text — typed, or one up or down from a button. */
  onChange: (next: string) => void;
  /** The lowest the buttons go: 1 for most, 0 where none is allowed. */
  min?: number;
  /** On the box itself; the buttons get `${testId}-minus` and `${testId}-plus`. */
  testId?: string;
  id?: string;
  label?: string;
}) {
  // What the person is typing, while they type, and the value it left the
  // quote holding; null when they are not typing.
  const [draft, setDraft] = useState<{ text: string; holds: string } | null>(null);
  const shown = draft && draft.holds === String(value) ? draft.text : value;
  const n = Math.trunc(Number(value));
  const current = Number.isFinite(n) ? n : min;
  const step = (by: number) => {
    setDraft(null);
    onChange(String(Math.max(min, current + by)));
  };
  const type = (text: string) => {
    const t = text.trim();
    const typed = Math.trunc(Number(t));
    const ok = t !== "" && Number.isFinite(typed) && typed >= min;
    setDraft({ text, holds: ok ? String(typed) : String(value) });
    if (ok) onChange(String(typed));
  };
  return (
    <span className="stepper">
      <button
        type="button"
        aria-label={`One fewer — ${label}`}
        data-testid={testId ? `${testId}-minus` : undefined}
        disabled={current <= min}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => step(-1)}
      >
        −
      </button>
      <input
        id={id}
        type="number"
        min={min}
        value={shown}
        aria-label={label}
        data-testid={testId}
        onChange={(e) => type(e.target.value)}
        onBlur={() => setDraft(null)}
      />
      <button
        type="button"
        aria-label={`One more — ${label}`}
        data-testid={testId ? `${testId}-plus` : undefined}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => step(1)}
      >
        +
      </button>
    </span>
  );
}
