"use client";

import { useRef, useState } from "react";
import { CopyButton } from "./CopyButton";
import { quickBooksRow } from "@/lib/pricing/data/quickbooks";

export type CartLine = {
  key: string;
  name: string;
  desc: string;
  qbItem: string;
  /** The price of ONE, as QuickBooks wants the rate. */
  price: number;
  photo?: string;
  qty: number;
};

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/**
 * The Scanner tab: scan parts into a cart, then copy the lot to QuickBooks.
 *
 * A second scan of a part adds one to its line rather than a new line. Each
 * line shows its quantity and the price for one — no line totals, no grand
 * total (Brandon, 25/9/2026). QuickBooks gets one row per line, with a blank
 * row between each.
 *
 * The scanner types the barcode and presses Enter, so the whole integration is
 * one box that keeps the cursor: a click anywhere in the tab that is not on
 * another control hands it straight back.
 */
export function ScannerTool() {
  // The cart belongs to this tab. AppShell takes the tab off the page when
  // someone switches to another, and the cart goes with it: leaving the
  // Scanner empties it (Brandon, 25/9/2026). So does a reload.
  const [cart, setCart] = useState<CartLine[]>([]);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState(false);
  const [note, setNote] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const box = useRef<HTMLInputElement>(null);
  const refocus = () => setTimeout(() => box.current?.focus(), 0);
  // Scans wait here in order. Every Enter clears the box at once, so a scan
  // that lands while the last is still being looked up is neither dropped nor
  // typed onto the end of it — it just waits its turn.
  const queue = useRef<string[]>([]);
  const running = useRef(false);

  function onEnter() {
    const scanned = code.trim();
    setCode("");
    if (!scanned) return;
    queue.current.push(scanned);
    void pump();
  }

  async function pump() {
    if (running.current) return;
    running.current = true;
    setBusy(true);
    while (queue.current.length) await lookup(queue.current.shift()!);
    running.current = false;
    setBusy(false);
    refocus();
  }

  async function lookup(scanned: string) {
    try {
      const r = await fetch("/api/scanner", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code: scanned }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.status === 404 && j.notLinked) {
        setNote({ kind: "err", text: `${scanned} is not linked to a part yet — link it in Inventory.` });
      } else if (!r.ok) {
        setNote({ kind: "err", text: j.error ?? "That scan did not go through." });
      } else {
        const it = j.item as { key: string; name: string; desc: string; qbItem: string; price: number; photo?: string };
        setCart((c) =>
          c.some((l) => l.key === it.key)
            ? c.map((l) => (l.key === it.key ? { ...l, qty: l.qty + 1 } : l))
            : [...c, { key: it.key, name: it.name, desc: it.desc, qbItem: it.qbItem, price: it.price, photo: it.photo, qty: 1 }],
        );
        setNote({ kind: "ok", text: `Added ${it.name}` });
      }
    } catch {
      setNote({ kind: "err", text: "No connection — that scan was not added." });
    }
  }

  const setQty = (key: string, v: string) =>
    setCart((c) => c.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.trunc(Number(v)) || 1) } : l)));
  const remove = (key: string) => { setCart((c) => c.filter((l) => l.key !== key)); refocus(); };
  const clear = () => { setCart([]); setNote(null); refocus(); };
  // A blank line between lines leaves a blank row between them in QuickBooks —
  // the paste script moves down a row for every line break (Brandon, 25/9/2026).
  const qbText = cart.map((l) => quickBooksRow(l.qbItem, l.desc, l.qty, l.price)).join("\n\n");

  return (
    <div
      className="wrap two"
      // A click on nothing in particular sends the cursor back to the scan box.
      onMouseUp={(e) => { if (!(e.target as HTMLElement).closest("input, select, textarea, button, a")) refocus(); }}
    >
      <section className="config-col">
        <div className="panel">
          <div className="cart-head" aria-hidden="true">
            <span>Item</span><span>Qty</span><span>Price (each)</span><span />
          </div>
          {cart.length === 0 ? (
            <div className="empty"><div className="emptymsg">Scan to start</div></div>
          ) : (
            cart.map((l) => (
              <div className="cart-row" key={l.key} data-testid="cart-row">
                <span className="cart-item">
                  {l.photo && <img className="partphoto" src={l.photo} alt="" />}
                  <span className="cart-text">
                    <b>{l.name}</b>
                    <small>{l.desc}</small>
                  </span>
                </span>
                <input className="cart-qty" type="number" min={1} value={l.qty} aria-label={`Quantity of ${l.name}`}
                  data-testid="cart-qty" onChange={(e) => setQty(l.key, e.target.value)} />
                <span className="cart-price" data-testid="cart-price">{fmt(l.price)}</span>
                <button type="button" className="cart-del" aria-label={`Remove ${l.name}`} data-testid="cart-del"
                  onClick={() => remove(l.key)}>×</button>
              </div>
            ))
          )}
        </div>
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Scanner</div>
            <div className="qmodel">{cart.length} {cart.length === 1 ? "line" : "lines"}</div>
          </div>
          <div className="scanpanel">
            <label className="lbl" htmlFor="scanner-box">Barcode</label>
            <input id="scanner-box" ref={box} className="scanbox" type="text" data-testid="scanner-box"
              autoFocus autoComplete="off" spellCheck={false} placeholder=" "
              value={code} onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onEnter(); } }}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            <div className={`scanstate${focused ? " on" : ""}`}>
              {busy ? "Looking it up…" : focused ? "Ready — scan now." : "Click here, then scan."}
            </div>
            {note && <div className={`scannote ${note.kind}`} data-testid="scanner-note">{note.text}</div>}
          </div>
          <div className="qfoot">
            <CopyButton text={qbText} label="QuickBooks" primary testId="scanner-qb" />
            <button type="button" className="btn" data-testid="scanner-clear" onClick={clear}>Clear</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
