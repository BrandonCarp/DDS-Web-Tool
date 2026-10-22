"use client";

import { placeKey, type WindowPlace } from "@/lib/pricing/data/modern-steel";

/**
 * A whole door drawn as its sections, top to bottom, each to its own height,
 * and each split into the door's panels — Clopay's stacking chart and panel
 * count for the size — drawn as a garage door is: raised steel sections with
 * a joint between them, the panels marked by their seams (Brandon,
 * 19/10/2026: the commercial section's picker, for the entire door, looking
 * like a door), read from inside looking out, which the label over it says
 * (20/10/2026), each section's height off the chart at its right. A press on
 * a panel puts a window in it, drawn as glass, and the x at its corner takes
 * it out; ALL beside a section fills the row, or clears it when it is full.
 *
 * Two more ways of working it (Brandon, 22/10/2026):
 *   - `sizes`: the window's size in a dropdown inside each glazed panel, as
 *     the commercial section's drawing has it (the stock commercial doors).
 *   - `pickRows`: whole rows only — the sections listed can be pressed, and
 *     a press puts the row of windows there; no panel can be pressed on its
 *     own (the stock Premium and Value Steel doors: the top section or the
 *     one under it; none listed on a Gallery door, whose windows stay in
 *     the top section).
 *   - `windowLabel`: what the windows are, on each one — the plain window
 *     by its order name, or the insert design; `windowLabelShort` takes its
 *     place on a window too narrow for the whole name (the name without
 *     its size).
 *
 * Sections are numbered from the floor up, as Clopay numbers them (Brandon,
 * 21/10/2026): the bottom section is 1, the top the last.
 */
export function DoorDiagram({
  stack, panels, windows, onToggle, onSetSection, sizes, size, onSize, pickRows, onPickRow, windowLabel, windowLabelShort, widthIn, testId = "door-diagram",
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
  /** The window sizes, shown in a dropdown inside each glazed panel; one size for the door. */
  sizes?: readonly string[];
  size?: string;
  onSize?: (size: string) => void;
  /** Row-pick mode: the sections a row of windows can be put in by a press. */
  pickRows?: ReadonlySet<number>;
  onPickRow?: (section: number) => void;
  /** What the windows are, shown on each window. */
  windowLabel?: string;
  /** The same without its size, for a window too narrow for the whole name. */
  windowLabelShort?: string;
  /** The door's width in inches, for its proportions. */
  widthIn: number;
  testId?: string;
}) {
  const n = Math.max(1, panels);
  const total = stack.reduce((a, b) => a + b, 0) || 1;
  const ratio = widthIn > 0 ? widthIn / total : 1;
  const across = Array.from({ length: n }, (_, i) => i + 1);
  const rowPick = !!pickRows;
  // Panels can be pressed one at a time only outside row-pick mode.
  const byPanel = !!windows && !rowPick;
  const sizeUsed = sizes && sizes.length ? (size && sizes.includes(size) ? size : sizes[0]) : undefined;
  return (
    <div className={`ddiag${windows ? "" : " static"}${rowPick ? " rowpick" : ""}`} data-testid={testId}>
      <div className="plook" data-testid="door-looking-out">Inside looking out</div>
      <div className="ddiag-door" role={windows ? "group" : undefined} aria-label={windows ? (rowPick ? "Windows by section" : "Windows by section and panel") : undefined}
        style={{ aspectRatio: `${ratio} / 1`, maxWidth: `${Math.round(ratio * 480)}px` }}>
        {stack.map((h, si) => {
          const section = stack.length - si;
          const full = !!windows && across.every((panel) => windows.has(placeKey({ section, panel })));
          const pickable = rowPick && pickRows.has(section);
          return (
            <div key={section} className={`dsec${pickable ? " pickable" : ""}${pickable && full ? " picked" : ""}`} data-testid={`door-section-${section}`} style={{ flex: `${h} ${h} 0` }}>
              {byPanel && (
                <button type="button" className={`dall${full ? " on" : ""}`} data-testid={`door-section-${section}-all`}
                  aria-label={full ? `Take the windows out of section ${section}` : `Put a window in every panel of section ${section}`}
                  onClick={() => onSetSection?.(section, across, !full)}>
                  ALL
                </button>
              )}
              {/* Row-pick mode: the whole section is the button. */}
              {pickable && (
                <button type="button" className="drow" data-testid={`door-section-${section}-pick`} aria-pressed={full}
                  aria-label={`Put the windows in section ${section}`} onClick={() => onPickRow?.(section)} />
              )}
              {/* The section's height, off Clopay's stacking chart, at its right (Brandon, 20/10/2026). */}
              <span className="dheight" data-testid={`door-section-${section}-height`}>{h}″</span>
              <div className="dface">
                {across.map((panel) => {
                  const key = placeKey({ section, panel });
                  const on = !!windows?.has(key);
                  const id = `door-panel-${section}-${panel}`;
                  return (
                    <div key={panel} className={`dpanel${on ? " on" : ""}${byPanel ? "" : " static"}`} data-testid={id} data-on={on ? "true" : "false"}>
                      {byPanel && !on && (
                        <button type="button" className="phit" data-testid={`${id}-add`} aria-label={`Add a window to section ${section}, panel ${panel}`}
                          onClick={() => onToggle?.({ section, panel })}>
                          <span className="dhint" aria-hidden="true">+</span>
                        </button>
                      )}
                      {on && (
                        <>
                          <div className="dglass" aria-hidden="true" />
                          {/* What the window is, over it (Brandon, 22/10/2026). */}
                          {windowLabel && (
                            <span className={`dwl${windowLabelShort && windowLabelShort !== windowLabel ? " dwl-full" : ""}`} data-testid={`${id}-label`}>{windowLabel}</span>
                          )}
                          {windowLabel && windowLabelShort && windowLabelShort !== windowLabel && (
                            <span className="dwl dwl-short" data-testid={`${id}-label-short`}>{windowLabelShort}</span>
                          )}
                          {/* The window's size, in the panel (the commercial doors). */}
                          {sizeUsed && (
                            <div className="dsize">
                              <div className="selectwrap">
                                <select data-testid={`${id}-size`} aria-label={`Section ${section}, panel ${panel} window size`} value={sizeUsed} onChange={(e) => onSize?.(e.target.value)}>
                                  {sizes!.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </div>
                            </div>
                          )}
                          {byPanel && (
                            <button type="button" className="dremove" data-testid={`${id}-remove`} aria-label={`Remove the window from section ${section}, panel ${panel}`}
                              onClick={() => onToggle?.({ section, panel })}>×</button>
                          )}
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
