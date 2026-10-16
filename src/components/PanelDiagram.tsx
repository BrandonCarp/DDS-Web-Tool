"use client";

/**
 * A section drawn as its panels, left to right, to its own proportions — CJ's
 * RIBBED SECTIONS sheet (Brandon, 15/10/2026). Press a panel to put a window
 * in it, or take it out.
 */
export function PanelDiagram({
  panels, windows, onToggle, widthIn, heightIn = 24, testId = "comm-panels",
}: {
  panels: number;
  /** The 1-based panels with windows. */
  windows: ReadonlySet<number>;
  onToggle?: (panel: number) => void;
  /** The section's width and height in inches, for its proportions; drawn 4:1 when the width is not known. */
  widthIn?: number;
  heightIn?: number;
  testId?: string;
}) {
  const n = Math.max(1, panels);
  const ratio = widthIn && widthIn > 0 && heightIn > 0 ? widthIn / heightIn : 4;
  // As tall as 90px, and no wider than keeps it in proportion.
  const style = { aspectRatio: `${ratio} / 1`, maxWidth: `${Math.round(ratio * 90)}px` };
  return (
    <div className="pdiag" data-testid={testId}>
      <div className="pdiag-panels" role="group" aria-label="Windows by panel" style={style}>
        {Array.from({ length: n }, (_, i) => i + 1).map((p) => {
          const on = windows.has(p);
          return (
            <button key={p} type="button" className={`ppanel${on ? " on" : ""}`} data-testid={`comm-panel-${p}`}
              aria-pressed={on} aria-label={`Panel ${p}`} onClick={() => onToggle?.(p)}>
              {on && <span className="pwin" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
