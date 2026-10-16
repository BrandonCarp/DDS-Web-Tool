"use client";

import { STILE_FRACTIONS } from "@/lib/pricing/data/commercial-meta";

export interface StileValue { inch: string; frac: string }

/**
 * A section drawn as its panels, left to right, to its own proportions — CJ's
 * RIBBED SECTIONS sheet, laid out as Brandon drew it (15–16/10/2026). On an
 * intermediate section, once Add windows is pressed, every empty panel says
 * where to press; a press puts a window in it, shown as its size, 24x12
 * first, with the smaller size in the dropdown, and an x at the top to take
 * it out again. Where a 524 or 2415 asks for
 * its stile locations, the inches and the quarter go in the boxes under each
 * stile, left to right.
 */
export function PanelDiagram({
  panels, windows, onToggle, sizes = ["24x12"], size, onSize,
  stiles, onStile, widthIn, heightIn = 24, testId = "comm-panels",
}: {
  panels: number;
  /** The 1-based panels with windows; null where none can be pressed in (a bottom section, or Add windows not pressed). */
  windows: ReadonlySet<number> | null;
  onToggle?: (panel: number) => void;
  sizes?: readonly string[];
  size?: string;
  onSize?: (size: string) => void;
  /** One a stile, left to right; null where none are asked. */
  stiles?: readonly StileValue[] | null;
  onStile?: (index: number, patch: Partial<StileValue>) => void;
  /** The section's width and height in inches, for its proportions; drawn 4:1 when the width is not known. */
  widthIn?: number;
  heightIn?: number;
  testId?: string;
}) {
  const n = Math.max(1, panels);
  const ratio = widthIn && widthIn > 0 && heightIn > 0 ? widthIn / heightIn : 4;
  // As tall as 100px, and no wider than keeps it in proportion.
  const sizeUsed = size && sizes.includes(size) ? size : sizes[0];
  return (
    <div className="pdiag" data-testid={testId}>
      <div className="pdiag-sec" style={{ maxWidth: `${Math.round(ratio * 100)}px` }}>
        <div className="pdiag-panels" role={windows ? "group" : undefined} aria-label={windows ? "Windows by panel" : undefined} style={{ aspectRatio: `${ratio} / 1` }}>
          {Array.from({ length: n }, (_, i) => i + 1).map((p) => {
            const on = !!windows?.has(p);
            return (
              <div key={p} className={`ppanel${on ? " on" : ""}${windows ? "" : " static"}`} data-testid={`comm-panel-${p}`} data-on={on ? "true" : "false"}>
                {windows && !on && (
                  <button type="button" className="phit" data-testid={`comm-panel-${p}-add`} aria-label={`Add a window to panel ${p}`} onClick={() => onToggle?.(p)}>
                    <span className="phint">+ Add window</span>
                  </button>
                )}
                {on && (
                  <>
                    {/* The x at the top takes the window out again. */}
                    <button type="button" className="premove" data-testid={`comm-panel-${p}-remove`} aria-label={`Remove the window from panel ${p}`} onClick={() => onToggle?.(p)}>×</button>
                    <div className="pglass">
                      <div className="selectwrap">
                        <select data-testid={`comm-panel-${p}-size`} aria-label={`Panel ${p} window size`} value={sizeUsed} onChange={(e) => onSize?.(e.target.value)}>
                          {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        {stiles && stiles.length > 0 && (
          <div className="pdiag-stiles" data-testid="comm-stiles">
            {stiles.map((v, i) => (
              <div key={i} className="pstile" style={{ left: `${((i + 1) / n) * 100}%` }}>
                <input type="number" min={0} inputMode="numeric" data-testid={`comm-stile-${i + 1}`} aria-label={`Stile ${i + 1} inches`}
                  value={v.inch} onChange={(e) => onStile?.(i, { inch: e.target.value })} />
                <div className="selectwrap">
                  <select data-testid={`comm-stile-${i + 1}-frac`} aria-label={`Stile ${i + 1} fraction`} value={v.frac} onChange={(e) => onStile?.(i, { frac: e.target.value })}>
                    {STILE_FRACTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
