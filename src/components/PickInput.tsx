"use client";

import type { InputHTMLAttributes } from "react";

/**
 * A box that is typed in or picked from (Brandon, 20/10/2026: every typed
 * box in the tools, the search bar aside, gets a list beside it, so no one
 * who would rather not type has to). The box is an ordinary number box; the
 * chevron at its right opens the list, and a pick fills the box. The list's
 * value is never held, so the same number can be picked twice.
 */
export function PickInput({
  value, onChange, options, testId, label, className, ...rest
}: {
  value: string;
  onChange: (next: string) => void;
  /** What the list offers, in order. */
  options: readonly (string | number)[];
  /** On the box; the list gets `${testId}-pick`. */
  testId?: string;
  /** Names the list for a screen reader. */
  label?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type" | "className">) {
  return (
    <span className={`pickin${className ? ` ${className}` : ""}`}>
      <input type="number" value={value} data-testid={testId} aria-label={label} {...rest}
        onChange={(e) => onChange(e.target.value)} />
      <span className="pickin-arrow" aria-hidden="true" />
      <select className="pickin-sel" value="" tabIndex={-1} aria-label={label ? `${label} — pick` : "Pick"} data-testid={testId ? `${testId}-pick` : undefined}
        onChange={(e) => { if (e.target.value !== "") onChange(e.target.value); }}>
        <option value="">…</option>
        {options.map((o) => <option key={String(o)} value={String(o)}>{String(o)}</option>)}
      </select>
    </span>
  );
}

/** The whole numbers from `from` to `to`, for a list. */
export function range(from: number, to: number): number[] {
  return Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
}
