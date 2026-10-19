"use client";

import { placeKey, type WindowPlace } from "@/lib/pricing/data/modern-steel";

/**
 * A whole door drawn as its sections, top to bottom, each to its own height,
 * and each split into the door's panels — Clopay's stacking chart and panel
 * count for the size. Every empty panel says where to press; a press puts a
 * window in it, and the x at its top takes it out again (Brandon,
 * 19/10/2026: the commercial section's picker, for the entire door).
 */
export function DoorDiagram({
  stack, panels, windows, onToggle, widthIn, testId = "door-diagram",
}: {
  /** Section heights top to bottom, in inches. */
  stack: readonly number[];
  /** Panels across. */
  panels: number;
  /** The places with a window; null where none can be pressed in. */
  windows: ReadonlySet<string> | null;
  onToggle?: (place: WindowPlace) => void;
  /** The door's width in inches, for its proportions. */
  widthIn: number;
  testId?: string;
}) {
  const n = Math.max(1, panels);
  const total = stack.reduce((a, b) => a + b, 0) || 1;
  const ratio = widthIn > 0 ? widthIn / total : 1;
  return (
    <div className="ddiag" data-testid={testId}>
      <div className="ddiag-door" role={windows ? "group" : undefined} aria-label={windows ? "Windows by section and panel" : undefined}
        style={{ aspectRatio: `${ratio} / 1`, maxWidth: `${Math.round(ratio * 360)}px` }}>
        {stack.map((h, si) => {
          const section = si + 1;
          return (
            <div key={section} className="dsec" data-testid={`door-section-${section}`} style={{ flex: `${h} ${h} 0` }}>
              {Array.from({ length: n }, (_, i) => i + 1).map((panel) => {
                const key = placeKey({ section, panel });
                const on = !!windows?.has(key);
                const id = `door-panel-${section}-${panel}`;
                return (
                  <div key={panel} className={`dpanel${on ? " on" : ""}${windows ? "" : " static"}`} data-testid={id} data-on={on ? "true" : "false"}>
                    {windows && !on && (
                      <button type="button" className="phit" data-testid={`${id}-add`} aria-label={`Add a window to section ${section}, panel ${panel}`}
                        onClick={() => onToggle?.({ section, panel })}>
                        <span className="phint">+ Add window</span>
                      </button>
                    )}
                    {on && (
                      <>
                        <button type="button" className="premove" data-testid={`${id}-remove`} aria-label={`Remove the window from section ${section}, panel ${panel}`}
                          onClick={() => onToggle?.({ section, panel })}>×</button>
                        <div className="dglass" aria-hidden="true" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
