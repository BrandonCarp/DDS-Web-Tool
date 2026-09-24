"use client";

import { useMemo, useState } from "react";
import { parseRequest, suggest, type ParsedRequest, type ToolId } from "@/lib/pricing/data/parse-request";
import { sizeLabel } from "@/lib/pricing/data/stock-colors";

/**
 * One box that reads counter shorthand.
 *
 * "16x7 wh 509" fills the residential form; "vinyl molding" changes tab; an
 * operator model number opens Operators with that model. What it will not do is
 * price anything — it sets the same fields the dropdowns set, leaves them
 * visible, and Get price stays a deliberate act.
 *
 * Nothing is applied silently. What was understood is shown before the counter
 * presses Use, and anything ambiguous is asked about rather than guessed: four
 * models share the short panel, and picking one would quote the wrong door.
 */

const TOOL_LABEL: Record<ToolId, string> = {
  residential: "Stock Residential",
  commercial: "Stock Commercial",
  special: "Special Order",
  torsion: "Spring",
  extension: "Spring",
  parts: "Parts",
  vinyl: "Vinyl",
  operators: "Operator",
};

export interface QuickEntryProps {
  /** Switch tabs. */
  onGoTo: (tool: ToolId) => void;
  /** Apply a parsed door to the residential form. */
  onApplyDoor?: (d: NonNullable<ParsedRequest["door"]>) => void;
  /** Hand a search term to the destination tool. */
  onTerm?: (tool: ToolId, term: string) => void;
}

export function QuickEntry({ onGoTo, onApplyDoor, onTerm }: QuickEntryProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [pickedModel, setPickedModel] = useState("");

  // Type-ahead over everything DDS carries: "913" finds the 9133, "207" the
  // torsion springs on 207 wire. This answers "what could this become" while
  // the parser answers "what is this" — the two run side by side.
  const hints = useMemo(() => (text.trim() ? suggest(text, 6) : []), [text]);

  const parsed = useMemo(() => (text.trim() ? parseRequest(text) : null), [text]);
  const door = parsed?.door;
  const needsModel = !!door && !door.model && (door.models?.length ?? 0) > 1;
  const model = door?.model ?? (needsModel ? pickedModel : door?.models?.[0]) ?? "";

  const ready =
    !!parsed &&
    (parsed.tool !== "residential" || (!!model && door?.widthFt !== undefined && door?.heightFt !== undefined));

  function apply() {
    if (!parsed) return;
    if (parsed.tool === "residential" && door && model) {
      onApplyDoor?.({ ...door, model, models: [model] });
    } else {
      onGoTo(parsed.tool);
      if (parsed.term) onTerm?.(parsed.tool, parsed.term);
    }
    setText("");
    setPickedModel("");
  }

  const size =
    door?.widthFt !== undefined && door?.heightFt !== undefined
      ? `${sizeLabel(String(door.widthFt) + (door.widthIn ? "." + door.widthIn : ""))} x ${sizeLabel(String(door.heightFt) + (door.heightIn ? "." + door.heightIn : ""))}`
      : null;

  if (!open) {
    return (
      <div className="quickentry">
        <button type="button" className="qe-open" data-testid="quick-open" onClick={() => setOpen(true)}>
          <span className="qe-open-icon" aria-hidden="true">?</span>
          Need help finding a door or part?
        </button>
      </div>
    );
  }

  return (
    <div className="quickentry open">
      <div className="qe-hd">
        <span className="qe-title">What are you looking for?</span>
        <button type="button" className="qe-close" data-testid="quick-close"
          onClick={() => { setOpen(false); setText(""); setPickedModel(""); }}>Close</button>
      </div>
      <input
        data-testid="quick-entry"
        className="qe-input"
        value={text}
        placeholder={'Type a door or a tool — "16x7 wh 509", "vinyl molding", "gh101l5"'}
        onChange={(e) => { setText(e.target.value); setPickedModel(""); }}
        onKeyDown={(e) => { if (e.key === "Enter" && ready) apply(); }}
      />

      {hints.length > 0 && (
        <ul className="qe-hints" data-testid="quick-hints">
          {hints.map((h) => (
            <li key={`${h.tool}-${h.label}-${h.hint ?? ""}`}>
              <button
                type="button"
                className="qe-hint"
                onClick={() => {
                  // A door or a window design keeps building the line; anything
                  // else is a destination, so go there.
                  if (h.tool === "residential") setText((t) => `${t.trim()} ${h.term ?? h.label}`.trim());
                  else { onGoTo(h.tool); if (h.term) onTerm?.(h.tool, h.term); setOpen(false); setText(""); }
                }}
              >
                <span className="qe-hint-label">{h.label}</span>
                {h.hint && <span className="qe-hint-note">{h.hint}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}

      {parsed && parsed.confidence < 0.5 && (
        <div className="qe-read" data-testid="quick-none">Not sure what that is — try a size and a model.</div>
      )}

      {parsed && parsed.confidence >= 0.5 && (
        <div className="qe-read" data-testid="quick-read">
          <span className="qe-dest">{TOOL_LABEL[parsed.tool]}</span>
          {parsed.tool === "residential" ? (
            <>
              {model && <span className="qe-bit">{model}</span>}
              {size && <span className="qe-bit">{size}</span>}
              {door?.color && <span className="qe-bit">{door.color}</span>}
              {door?.windesign && <span className="qe-bit">{door.windesign}</span>}
              {door?.track && <span className="qe-bit">{door.track}</span>}
              {door?.spring && <span className="qe-bit">{door.spring}</span>}
              {door?.lock && door.lock !== "none" && <span className="qe-bit">{door.lock}</span>}
            </>
          ) : (
            <>
              {parsed.operator?.model && <span className="qe-bit">{parsed.operator.model}</span>}
              {!parsed.operator?.model && parsed.operator?.group && <span className="qe-bit">{parsed.operator.group}</span>}
              {parsed.term && <span className="qe-bit">{parsed.term}</span>}
            </>
          )}
        </div>
      )}

      {needsModel && (
        <div className="qe-ask" data-testid="quick-ask">
          <span>Which model?</span>
          {door!.models!.map((m) => (
            <button
              key={m}
              type="button"
              className={`qe-chip ${pickedModel === m ? "sel" : ""}`}
              onClick={() => setPickedModel(m)}
            >
              {m}
            </button>
          ))}
        </div>
      )}

      {door && door.ambiguous.includes("color") && (
        <div className="qe-note" data-testid="quick-color-note">
          That colour is not floored in this size — pick one from the list.
        </div>
      )}
      {door && door.ambiguous.includes("size") && (
        <div className="qe-note" data-testid="quick-size-note">
          Nothing is floored in that size. It will quote as a special order.
        </div>
      )}
      {door && door.unmatched.length > 0 && (
        <div className="qe-note" data-testid="quick-unmatched">
          Ignored: {door.unmatched.join(", ")}
        </div>
      )}

      {parsed && parsed.confidence >= 0.5 && (
        <button type="button" className="qe-use" data-testid="quick-use" disabled={!ready} onClick={apply}>
          {parsed.tool === "residential" ? "Fill the form" : `Go to ${TOOL_LABEL[parsed.tool]}`}
        </button>
      )}
    </div>
  );
}
