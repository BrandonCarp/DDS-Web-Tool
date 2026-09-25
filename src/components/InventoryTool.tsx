"use client";

import { useEffect, useRef, useState } from "react";
import { OptionButtons, type ButtonOption } from "./OptionButtons";
import { STOCK_ITEMS, type ScanMode, type StockItem } from "@/lib/inventory";

/**
 * The Inventory tab: scan shelf parts out (pull), in (put away), or count a
 * shelf. The scanner is a keyboard — a scan types the barcode and presses
 * Enter — so the whole integration is one text box that keeps the cursor.
 */
const MODES: ButtonOption<ScanMode>[] = [
  { value: "pull", label: "Pull", icon: "boxout" },
  { value: "put_away", label: "Put away", icon: "boxin" },
  { value: "count", label: "Count", icon: "tally" },
];

/** Two scans of one barcode this close together are usually one bag scanned twice. */
const AGAIN_MS = 2000;
const JSON_HEADERS = { "content-type": "application/json" };

type StockRow = { key: string; name: string; desc: string; category: string; photo?: string; onHand: number; codes: string[] };
type Done = {
  kind: "done"; moveId: number; code: string; mode: ScanMode;
  item: StockItem; change: number; onHand: number; undone?: boolean;
};
type Result =
  | Done
  | { kind: "unlinked"; code: string }
  | { kind: "again"; code: string }
  | { kind: "error"; message: string };

async function fetchStock(): Promise<StockRow[] | null> {
  try {
    const r = await fetch("/api/inventory/stock");
    return r.ok ? ((await r.json()) as { items: StockRow[] }).items : null;
  } catch {
    return null; // the list is a convenience — scanning works without it
  }
}

function verb(d: Done): string {
  if (d.undone) return "Undone";
  if (d.mode === "count") return `Counted (${d.change >= 0 ? "+" : ""}${d.change})`;
  return `${d.mode === "pull" ? "Pulled" : "Put away"} ${Math.abs(d.change)}`;
}

export function InventoryTool() {
  // Opens on Put away: this tab is where parts are checked in (Brandon, 25/9/2026).
  const [mode, setMode] = useState<ScanMode>("put_away");
  const [qty, setQty] = useState("1");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [stock, setStock] = useState<StockRow[]>([]);
  const [filter, setFilter] = useState("");
  const [linkKey, setLinkKey] = useState("");
  // With one part tracked there is nothing to choose, so it comes preselected.
  const firstLinkKey = STOCK_ITEMS.length === 1 ? STOCK_ITEMS[0].key : "";
  const scanRef = useRef<HTMLInputElement>(null);
  const last = useRef<{ code: string; at: number } | null>(null);
  // Scans wait here in order: every Enter clears the box at once, so none is
  // dropped or typed onto the end of another. The queue pauses while a
  // question is on screen (link this barcode? count it twice?) and carries on
  // once it is answered.
  const queue = useRef<string[]>([]);
  const running = useRef(false);
  const paused = useRef(false);
  // A queued scan is sent with the mode and quantity as they are now, not as
  // they were when it was scanned — or a count would carry to the next shelf.
  const modeNow = useRef(mode);
  const qtyNow = useRef(qty);
  useEffect(() => { modeNow.current = mode; qtyNow.current = qty; }, [mode, qty]);

  // Every click elsewhere hands the cursor straight back, or the next scan
  // would type into whatever was clicked.
  const refocus = () => setTimeout(() => scanRef.current?.focus(), 0);

  const loadStock = () => {
    void fetchStock().then((items) => { if (items) setStock(items); });
  };
  useEffect(() => {
    let live = true;
    void fetchStock().then((items) => { if (live && items) setStock(items); });
    return () => { live = false; };
  }, []);

  async function send(scanned: string): Promise<"done" | "unlinked" | "error"> {
    const m = modeNow.current;
    setBusy(true);
    try {
      const r = await fetch("/api/inventory/scan", {
        method: "POST", headers: JSON_HEADERS,
        body: JSON.stringify({ code: scanned, mode: m, qty: Number(qtyNow.current) }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.status === 404 && j.notLinked) {
        setLinkKey(firstLinkKey);
        setResult({ kind: "unlinked", code: scanned });
        return "unlinked";
      }
      if (!r.ok) {
        setResult({ kind: "error", message: j.error ?? "That scan did not go through." });
        return "error";
      }
      last.current = { code: scanned, at: Date.now() };
      setResult({ kind: "done", ...j });
      // A count belongs to one shelf. Left in the box, the next shelf scanned
      // would be set to the same number.
      if (m === "count") { setQty(""); qtyNow.current = ""; }
      loadStock();
      return "done";
    } catch {
      setResult({ kind: "error", message: "No connection — that scan was not counted." });
      return "error";
    } finally {
      setBusy(false);
      refocus();
    }
  }

  function onScan() {
    const scanned = code.trim();
    setCode("");
    if (!scanned) return;
    queue.current.push(scanned);
    void pump();
  }

  async function pump() {
    if (running.current) return;
    running.current = true;
    while (queue.current.length && !paused.current) {
      const scanned = queue.current.shift()!;
      // An empty count box would send zero and empty the shelf on paper.
      if (modeNow.current === "count" && qtyNow.current.trim() === "") {
        setResult({ kind: "error", message: "Type how many are on the shelf first, then scan again." });
        continue;
      }
      const prev = last.current;
      // A second count of the same shelf changes nothing, so only pulls and
      // put-aways ask.
      if (modeNow.current !== "count" && prev && prev.code === scanned && Date.now() - prev.at < AGAIN_MS) {
        setResult({ kind: "again", code: scanned });
        paused.current = true;
        break;
      }
      if ((await send(scanned)) === "unlinked") {
        paused.current = true;
        break;
      }
    }
    running.current = false;
    refocus();
  }

  /** The question on screen is answered: carry on with any scans waiting. */
  function resume() {
    paused.current = false;
    void pump();
  }

  async function undo(d: Done) {
    try {
      const r = await fetch("/api/inventory/undo", {
        method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ moveId: d.moveId }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) setResult({ kind: "error", message: j.error ?? "Could not undo that scan." });
      else {
        last.current = null;
        setResult({ ...d, undone: true, onHand: j.onHand });
        loadStock();
      }
    } catch {
      setResult({ kind: "error", message: "No connection — nothing was undone." });
    }
    refocus();
  }

  async function link(scanned: string) {
    try {
      const r = await fetch("/api/inventory/link", {
        method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ code: scanned, itemKey: linkKey }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setResult({ kind: "error", message: j.error ?? "Could not link that barcode." });
        refocus();
        resume();
        return;
      }
      await send(scanned); // the scan that found it goes through now
    } catch {
      setResult({ kind: "error", message: "No connection — the barcode was not linked." });
      refocus();
    }
    resume();
  }

  /** Linked to the wrong part: take the scan back and free the barcode. */
  async function relink(d: Done) {
    try {
      if (!d.undone) await fetch("/api/inventory/undo", { method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ moveId: d.moveId }) });
      await fetch("/api/inventory/link", { method: "DELETE", headers: JSON_HEADERS, body: JSON.stringify({ code: d.code }) });
      last.current = null;
      setLinkKey(firstLinkKey);
      paused.current = true;
      setResult({ kind: "unlinked", code: d.code });
      loadStock();
    } catch {
      setResult({ kind: "error", message: "No connection — nothing was changed." });
    }
    refocus();
  }

  const needle = filter.trim().toLowerCase();
  const shown = needle
    ? stock.filter((s) => `${s.name} ${s.desc} ${s.category} ${s.codes.join(" ")}`.toLowerCase().includes(needle))
    : stock;

  return (
    <div className="wrap two">
      <section className="config-col">
        <div className="panel">
          <div className="step">
            <div className="step-h">
              <h3>Scan</h3>
              <span className="hint">{STOCK_ITEMS.length === 1 ? `Testing with ${STOCK_ITEMS[0].name}` : "Shelf parts"}</span>
            </div>
            <div className="field">
              <label className="lbl">What are you doing?</label>
              <OptionButtons label="Scan mode" testid="inv-mode" options={MODES} value={mode}
                onChange={(m) => {
                  // Pulls and put-aways start at one a scan; a count starts
                  // empty, because it has to be what is actually on the shelf.
                  // A new mode is a deliberate new action, so the
                  // scanned-twice check starts over.
                  setMode(m); setQty(m === "count" ? "" : "1"); setResult(null); last.current = null; refocus();
                }} />
            </div>
            <div className="field">
              <label className="lbl" htmlFor="inv-qty">
                {mode === "count" ? "How many are on the shelf" : "How many per scan"}
              </label>
              <input id="inv-qty" data-testid="inv-qty" className="invqty" type="number"
                min={mode === "count" ? 0 : 1} value={qty} onChange={(e) => setQty(e.target.value)} />
            </div>
            <div className="field">
              <label className="lbl" htmlFor="inv-scan">Barcode</label>
              <input id="inv-scan" ref={scanRef} data-testid="inv-scan" className="scanbox" type="text"
                autoFocus autoComplete="off" spellCheck={false} placeholder=" "
                value={code} onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onScan(); } }}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
              <div className={`scanstate${focused ? " on" : ""}`} data-testid="inv-ready">
                {busy ? "Saving…" : focused ? "Ready — scan now." : "Click in the box above, then scan."}
              </div>
            </div>
          </div>
        </div>

        {result?.kind === "done" && (
          <div className={`panel scanresult${result.undone ? " undone" : ""}`} data-testid="inv-result">
            <div className="sr-top">
              <span className="sr-verb">{verb(result)}</span>
              <span className="sr-code">{result.code}</span>
            </div>
            <div className="sr-item">
              {result.item.photo && <img className="partphoto big" src={result.item.photo} alt="" />}
              <div>
                <div className="sr-name">{result.item.name}</div>
                {result.item.desc && <div className="sr-desc">{result.item.desc}</div>}
              </div>
            </div>
            <div className="sr-count"><b data-testid="inv-onhand">{result.onHand}</b>on hand</div>
            {!result.undone && (
              <div className="sr-actions">
                <button type="button" className="btn" data-testid="inv-undo" onClick={() => undo(result)}>Undo</button>
                <button type="button" className="linkbtn" data-testid="inv-wrong" onClick={() => relink(result)}>
                  Wrong part? Unlink this barcode
                </button>
              </div>
            )}
          </div>
        )}
        {result?.kind === "again" && (
          <div className="panel scanresult warn" data-testid="inv-again">
            <div className="sr-name">Same barcode twice in a row</div>
            <div className="sr-desc">{result.code} was just scanned. Count it again?</div>
            <div className="sr-actions">
              <button type="button" className="btn primary" data-testid="inv-again-yes" onClick={async () => { await send(result.code); resume(); }}>Count it again</button>
              <button type="button" className="btn" data-testid="inv-again-no" onClick={() => { setResult(null); refocus(); resume(); }}>Skip</button>
            </div>
          </div>
        )}
        {result?.kind === "unlinked" && (
          <div className="panel scanresult warn" data-testid="inv-unlinked">
            <div className="sr-name">Barcode not linked yet</div>
            <div className="sr-desc">Which part is <b>{result.code}</b>? Pick it and the scan goes through.</div>
            <div className="sr-link">
              <div className="selectwrap">
                <select data-testid="inv-link-part" value={linkKey} onChange={(e) => setLinkKey(e.target.value)}>
                  {STOCK_ITEMS.length !== 1 && <option value="">Part…</option>}
                  {STOCK_ITEMS.map((i) => <option key={i.key} value={i.key}>{i.desc || i.name}</option>)}
                </select>
              </div>
            </div>
            <div className="sr-actions">
              <button type="button" className="btn primary" data-testid="inv-link" disabled={!linkKey} onClick={() => link(result.code)}>
                Link and count this scan
              </button>
              <button type="button" className="btn" onClick={() => { setResult(null); refocus(); resume(); }}>Cancel</button>
            </div>
          </div>
        )}
        {result?.kind === "error" && (
          <div className="panel scanresult err" role="alert" data-testid="inv-error">{result.message}</div>
        )}
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">On hand</div>
            <div className="qsub">Every part with a barcode or a scan</div>
          </div>
          <div className="invsearch">
            <input type="search" placeholder="Find a part or barcode" value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
          {shown.length ? (
            <ul className="partlist" data-testid="inv-stock">
              {shown.map((s) => (
                <li key={s.key}>
                  <div className="partrow static">
                    <span className="partwho">
                      {s.photo && <img className="partphoto" src={s.photo} alt="" />}
                      <span className="partname">
                        {s.name}
                        <span className="partcat">{s.category}</span>
                      </span>
                    </span>
                    <span className={`partprice${s.onHand < 0 ? " neg" : ""}`}>{s.onHand}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="partempty">{stock.length ? "No match." : "Nothing counted yet. Scan to start."}</div>
          )}
        </div>
      </aside>
    </div>
  );
}
