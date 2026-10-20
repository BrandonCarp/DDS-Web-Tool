"use client";

import { placeKey, type WindowPlace } from "@/lib/pricing/data/modern-steel";

/**
 * A whole door drawn as its sections, top to bottom, each to its own height,
 * and each split into the door's panels — Clopay's stacking chart and panel
 * count for the size — drawn as a garage door is: raised steel sections with
 * a joint between them, the panels marked by their seams (Brandon,
 * 19/10/2026: the commercial section's picker, for the entire door, looking
 * like a door), read from inside looking out, which the label over it says
 * (20/10/2026). A press on a panel puts a window in it, drawn as glass, and
 * the x at its corner takes it out; ALL beside a section fills the row, or
 * clears it when it is full.
 */
export function DoorDiagram({
  stack, panels, windows, onToggle, onSetSection, widthIn, testId = "door-diagram",
}: {
  /** Section heights top to bottom, in inches. */
  stack: readonly number[];
  /** Panels across. */
  panels: number;
  /** The places with a window; null where none can be pressed in. */
  windows: ReadonlySet<string> | null;
  onToggle?: (place: WindowPlace) => void;
  /** Fill a section's row with windows, or clear it. */
  onSetSection?: (section: number, panels: number[], on: boolean) => void;
  /** The door's width in inches, for its proportions. */
  widthIn: number;
  testId?: string;
}) {
  const n = Math.max(1, panels);
  const total = stack.reduce((a, b) => a + b, 0) || 1;
  const ratio = widthIn > 0 ? widthIn / total : 1;
  const across = Array.from({ length: n }, (_, i) => i + 1);
  return (
    <div className={`ddiag${windows ? "" : " static"}`} data-testid={testId}>
      <div className="plook" data-testid="door-looking-out">Inside looking out</div>
      <div className="ddiag-door" role={windows ? "group" : undefined} aria-label={windows ? "Windows by section and panel" : undefined}
        style={{ aspectRatio: `${ratio} / 1`, maxWidth: `${Math.round(ratio * 480)}px` }}>
        {stack.map((h, si) => {
          const section = si + 1;
          const full = !!windows && across.every((panel) => windows.has(placeKey({ section, panel })));
          return (
            <div key={section} className="dsec" data-testid={`door-section-${section}`} style={{ flex: `${h} ${h} 0` }}>
              {windows && (
                <button type="button" className={`dall${full ? " on" : ""}`} data-testid={`door-section-${section}-all`}
                  aria-label={full ? `Take the windows out of section ${section}` : `Put a window in every panel of section ${section}`}
                  onClick={() => onSetSection?.(section, across, !full)}>
                  ALL
                </button>
              )}
              <div className="dface">
                {across.map((panel) => {
                  const key = placeKey({ section, panel });
                  const on = !!windows?.has(key);
                  const id = `door-panel-${section}-${panel}`;
                  return (
                    <div key={panel} className={`dpanel${on ? " on" : ""}${windows ? "" : " static"}`} data-testid={id} data-on={on ? "true" : "false"}>
                      {windows && !on && (
                        <button type="button" className="phit" data-testid={`${id}-add`} aria-label={`Add a window to section ${section}, panel ${panel}`}
                          onClick={() => onToggle?.({ section, panel })}>
                          <span className="dhint" aria-hidden="true">+</span>
                        </button>
                      )}
                      {on && (
                        <>
                          <div className="dglass" aria-hidden="true" />
                          <button type="button" className="dremove" data-testid={`${id}-remove`} aria-label={`Remove the window from section ${section}, panel ${panel}`}
                            onClick={() => onToggle?.({ section, panel })}>×</button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
