"use client";

import type { ReactNode } from "react";
import type { DoorPictureSpec } from "@/lib/pricing/data/door-layout";
import { placeKey, type WindowPlace } from "@/lib/pricing/data/modern-steel";
import { useDoorPicture } from "./use-door-picture";

/**
 * The door as it will look, its windows where they are (Brandon,
 * 23/10/2026): the same picking as the drawing, on the real door — a press
 * on a section that can take the row of windows puts them there, or (a
 * Modern Steel door) a press on a panel puts a window in it, the x at its
 * corner takes it out and ALL beside a section fills or clears its row. Each
 * section's height off the chart at its right, as the drawing has it.
 *
 * Shows `fallback` (the drawing) until the picture is drawn, and wherever it
 * cannot be: a door whose face, colour or windows are not captured.
 */
export function DoorPicture({ spec, pickRows, onPickRow, panels, alt, fallback, group, testId = "door-diagram" }: {
  spec: DoorPictureSpec | null;
  /** The sections the windows can be put in by a press. */
  pickRows?: ReadonlySet<number>;
  onPickRow?: (section: number) => void;
  /** Window by window (the Modern Steel doors): the places across, those with a window, and the presses. */
  panels?: {
    across: number;
    on: ReadonlySet<string>;
    onToggle: (place: WindowPlace) => void;
    onSetSection: (section: number, panels: number[], on: boolean) => void;
  };
  alt: string;
  fallback: ReactNode;
  /** A header to show the picture under, in a group of its own (a solid door's). */
  group?: string;
  testId?: string;
}) {
  const { layout, url } = useDoorPicture(spec);
  if (!layout || !url) return <>{fallback}</>;
  const rowPick = !panels && !!pickRows && pickRows.size > 0;
  const rows = spec?.window && !panels ? (spec.windowRows?.length ? spec.windowRows : [spec.windowRow ?? layout.sections[0]?.section]) : [];
  const across = panels ? Array.from({ length: panels.across }, (_, i) => i + 1) : [];
  const picture = (
    <div className={`ddiag dpic${rowPick ? " rowpick" : panels ? "" : " static"}`} data-testid={testId}>
      <div className="dpic-door" style={{ aspectRatio: `${layout.outWidth} / ${layout.outHeight}`, maxWidth: `${Math.round((layout.outWidth / layout.outHeight) * 480)}px` }}>
        <img src={url} alt={alt} data-testid="door-picture" />
        <div className="dpic-hits" role={rowPick || panels ? "group" : undefined}
          aria-label={rowPick ? "Windows by section" : panels ? "Windows by section and panel" : undefined}>
          {layout.sections.map(({ section, h, inches }) => {
            const pickable = rowPick && pickRows!.has(section);
            const picked = rows.includes(section);
            const full = !!panels && across.every((panel) => panels.on.has(placeKey({ section, panel })));
            return (
              <div key={section} className={`dsec${pickable ? " pickable" : ""}${pickable && picked ? " picked" : ""}`} data-testid={`door-section-${section}`} style={{ flex: `${h} ${h} 0` }}>
                {pickable && (
                  <button type="button" className="drow" data-testid={`door-section-${section}-pick`} aria-pressed={picked}
                    aria-label={`Put the windows in section ${section}`} onClick={() => onPickRow?.(section)} />
                )}
                {panels && (
                  <>
                    <button type="button" className={`dall${full ? " on" : ""}`} data-testid={`door-section-${section}-all`}
                      aria-label={full ? `Take the windows out of section ${section}` : `Put a window in every panel of section ${section}`}
                      onClick={() => panels.onSetSection(section, across, !full)}>
                      ALL
                    </button>
                    <div className="dpic-row">
                      {across.map((panel) => {
                        const on = panels.on.has(placeKey({ section, panel }));
                        const id = `door-panel-${section}-${panel}`;
                        return (
                          <div key={panel} className={`dpanel${on ? " on" : ""}`} data-testid={id} data-on={on ? "true" : "false"}>
                            {on ? (
                              <button type="button" className="dremove" data-testid={`${id}-remove`} aria-label={`Remove the window from section ${section}, panel ${panel}`}
                                onClick={() => panels.onToggle({ section, panel })}>×</button>
                            ) : (
                              <button type="button" className="phit" data-testid={`${id}-add`} aria-label={`Add a window to section ${section}, panel ${panel}`}
                                onClick={() => panels.onToggle({ section, panel })}>
                                <span className="dhint" aria-hidden="true">+</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                <span className="dheight" data-testid={`door-section-${section}-height`}>{inches}″</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  return group ? (
    <div className="ggroup gwide" data-testid="door-picture-group">
      <div className="ghdr">{group}</div>
      {picture}
    </div>
  ) : picture;
}
