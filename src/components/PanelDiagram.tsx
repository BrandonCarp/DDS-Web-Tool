"use client";

import { STILE_FRACTIONS } from "@/lib/pricing/data/commercial-meta";
import { PickInput, range } from "./PickInput";

export interface StileValue { inch: string; frac: string }

/**
 * A section drawn as its panels, left to right, to its own proportions — CJ's
 * RIBBED SECTIONS sheet, laid out as Brandon drew it (15–16/10/2026), and
 * read from inside looking out, which the label over it says (20/10/2026).
 * On an intermediate section, once Add windows is pressed, every empty panel
 * says where to press; a press puts a window in it, shown as its size, 24x12
 * first, with the smaller size in the dropdown, and an x at the top to take
 * it out again. The window panels are the width's; the stiles are their own
 * lines over them, white and dotted, spaced out across the section — a 524 or
 * 2415's stile locations go in the boxes under each, left to right, typed or
 * picked, with a − and + under the row (ADD STILE) that take a stile out or
 * put one in. Adding a stile — by hand, or the double end stile — adds a
 * line and a box, never a window.
 */
export function PanelDiagram({
  panels, windows, onToggle, sizes = ["24x12"], size, onSize,
  stiles, stileLines, onStile, onAddStile, onRemoveStile, canRemoveStile, widthIn, heightIn = 24, testId = "comm-panels",
}: {
  /** The window panels across, from the width. */
  panels: number;
  /** The 1-based panels with windows; null where none can be pressed in (a bottom section, or Add windows not pressed). */
  windows: ReadonlySet<number> | null;
  onToggle?: (panel: number) => void;
  sizes?: readonly string[];
  size?: string;
  onSize?: (size: string) => void;
  /** One a stile, left to right; null where none are asked. */
  stiles?: readonly StileValue[] | null;
  /** The stile lines drawn across the section — one a box unless said. */
  stileLines?: number;
  onStile?: (index: number, patch: Partial<StileValue>) => void;
  onAddStile?: () => void;
  /** Takes out the last stile added by hand. */
  onRemoveStile?: () => void;
  canRemoveStile?: boolean;
  /** The section's width and height in inches, for its proportions; drawn 4:1 when the width is not known. */
  widthIn?: number;
  heightIn?: number;
  testId?: string;
}) {
  const n = Math.max(1, panels);
  const ratio = widthIn && widthIn > 0 && heightIn > 0 ? widthIn / heightIn : 4;
  // As tall as 110px, and no wider than keeps it in proportion.
  const sizeUsed = size && sizes.includes(size) ? size : sizes[0];
  const lines = Math.max(0, stileLines ?? stiles?.length ?? 0);
  // Where a stile line sits: spaced out evenly across the section.
  const lineAt = (i: number) => `${((i + 1) / (lines + 1)) * 100}%`;
  // The boxes sit under their lines while they fit — up to four; more run left to right in a row.
  const underLines = !!stiles && stiles.length === lines && lines <= 4;
  return (
    <div className="pdiag" data-testid={testId}>
      <div className="pdiag-sec" style={{ maxWidth: `${Math.round(ratio * 110)}px` }}>
        <div className="plook" data-testid="comm-looking-out">Inside looking out</div>
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
          {stiles && Array.from({ length: lines }, (_, i) => (
            <div key={`line-${i}`} className="pstile-line" data-testid={`comm-stile-line-${i + 1}`} style={{ left: lineAt(i) }} aria-hidden="true" />
          ))}
        </div>
        {stiles && (stiles.length > 0 || onAddStile) && (
          <div className={`pdiag-stiles${underLines ? "" : " row"}`} data-testid="comm-stiles">
            {stiles.map((v, i) => (
              <div key={i} className="pstile" style={underLines ? { left: lineAt(i) } : undefined}>
                <div className="pstile-boxes">
                  <PickInput testId={`comm-stile-${i + 1}`} label={`Stile ${i + 1} inches`} min={0} inputMode="numeric" options={range(1, 240)}
                    value={v.inch} onChange={(inch) => onStile?.(i, { inch })} />
                  <div className="selectwrap">
                    <select data-testid={`comm-stile-${i + 1}-frac`} aria-label={`Stile ${i + 1} fraction`} value={v.frac} onChange={(e) => onStile?.(i, { frac: e.target.value })}>
                      {STILE_FRACTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {stiles && onAddStile && (
          <div className="padd-wrap">
            <span className="padd">
              <button type="button" data-testid="comm-remove-stile" aria-label="Take a stile out" disabled={!canRemoveStile} onClick={onRemoveStile}>−</button>
              <button type="button" data-testid="comm-add-stile" aria-label="Add a stile" onClick={onAddStile}>+</button>
            </span>
            <span className="padd-lbl">Add stile</span>
          </div>
        )}
      </div>
    </div>
  );
}
