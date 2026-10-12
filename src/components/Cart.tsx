"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CopyButton } from "./CopyButton";
import { Icon } from "./Icon";
import { quickBooksRow } from "@/lib/pricing/data/quickbooks";
import { QtyStepper } from "./QtyStepper";
import { OptionButtons } from "./OptionButtons";
import { YES_NO } from "./VinylPrompt";

/** One QuickBooks invoice line in the cart. The rate is the price of ONE. */
export type CartLine = { id: number; item: string; description: string; qty: number; rate: number };
export type NewCartLine = Omit<CartLine, "id">;

type CartApi = {
  lines: CartLine[];
  add: (lines: NewCartLine[]) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartApi | null>(null);

/**
 * The cart — Brandon, 30/9/2026: invoice lines gathered from any quote in the
 * app (a door with its vinyl, then an operator, angle iron, a spring…) and
 * pasted into QuickBooks in one go from the Cart tab.
 *
 * It sits above the tabs, so it survives moving between them. Clear empties
 * it, and so does a reload.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const nextId = useRef(1);

  const add = useCallback((incoming: NewCartLine[]) => {
    setLines((current) => {
      let out = current;
      for (const line of incoming) {
        // The same line again adds to its quantity rather than a second row.
        const same = out.find((c) => c.item === line.item && c.description === line.description && c.rate === line.rate);
        out = same
          ? out.map((c) => (c === same ? { ...c, qty: c.qty + line.qty } : c))
          : [...out, { ...line, id: nextId.current++ }];
      }
      return out;
    });
  }, []);
  const setQty = useCallback((id: number, qty: number) => {
    setLines((c) => c.map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.trunc(qty) || 1) } : l)));
  }, []);
  const remove = useCallback((id: number) => setLines((c) => c.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const api = useMemo(() => ({ lines, add, setQty, remove, clear }), [lines, add, setQty, remove, clear]);
  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

/** The cart, or null outside one — a quote rendered on its own has no cart. */
export const useCart = () => useContext(CartContext);

/** "Add to cart", under the QuickBooks button: the same lines, kept for later. */
export function AddToCart({ lines, testId = "add-to-cart" }: { lines: NewCartLine[]; testId?: string }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);
  if (!cart) return null;
  return (
    <button
      type="button"
      className="btn addcart"
      data-testid={testId}
      onClick={() => {
        cart.add(lines);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      <Icon name="cart" />
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/**
 * Asked once the cart has been copied to QuickBooks: clear it now? The lines
 * are in QuickBooks, so most of the time the answer is yes and the next job
 * starts clean — but a no keeps them (Brandon, 12/10/2026). Escape, or a
 * click outside, is a no. Rendered into the app root, as the vinyl prompt is.
 */
function ClearCartPrompt({ count, onAnswer }: { count: number; onAnswer: (yes: boolean) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onAnswer(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onAnswer]);
  const dialog = (
    <div className="modal-scrim" onClick={() => onAnswer(false)}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="cart-clear-title" data-testid="cart-clear-prompt"
        onClick={(e) => e.stopPropagation()}>
        <h3 id="cart-clear-title">Clear the cart now?</h3>
        <p className="muted-note">{count} {count === 1 ? "line is" : "lines are"} copied for QuickBooks.</p>
        <OptionButtons label="Clear the cart" testid="cart-clear-ask" options={YES_NO} value={null}
          onChange={(v) => onAnswer(v === "yes")} />
      </div>
    </div>
  );
  return createPortal(dialog, document.querySelector(".tool-shell") ?? document.body);
}

/** The Cart tab: every line added, then QuickBooks and Clear. */
export function CartTool() {
  const cart = useCart();
  const [askClear, setAskClear] = useState(false);
  const answerClear = useCallback((yes: boolean) => { setAskClear(false); if (yes) cart?.clear(); }, [cart]);
  if (!cart) return null;
  const { lines, setQty, remove, clear } = cart;
  // A blank row between every line, as the door and its vinyl paste — the
  // paste script moves down a row for each line break.
  const qbText = lines.map((l) => quickBooksRow(l.item, l.description, l.qty, l.rate)).join("\n\n");

  return (
    <div className="wrap two">
      <section className="config-col">
        <div className="panel">
          <div className="cart-head" aria-hidden="true">
            <span>Item</span><span>Qty</span><span>Price (each)</span><span />
          </div>
          {lines.length === 0 ? (
            <div className="empty">
              <div className="emptymsg">The cart is empty. Press Add to cart under any quote.</div>
            </div>
          ) : (
            lines.map((l) => (
              <div className="cart-row" key={l.id} data-testid="cartline">
                <span className="cart-item">
                  <span className="cart-text">
                    <b>{l.description}</b>
                    <small>{l.item}</small>
                  </span>
                </span>
                <QtyStepper value={l.qty} testId="cartline-qty" label={`Quantity of ${l.description}`}
                  onChange={(v) => setQty(l.id, Number(v))} />
                <span className="cart-price">{fmt(l.rate)}</span>
                <button type="button" className="cart-del" data-testid="cartline-del" aria-label={`Remove ${l.description}`}
                  onClick={() => remove(l.id)}>×</button>
              </div>
            ))
          )}
        </div>
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Cart</div>
            <div className="qmodel">{lines.length} {lines.length === 1 ? "line" : "lines"}</div>
          </div>
          <div className="qfoot">
            <CopyButton text={qbText} label="QuickBooks" primary testId="cart-qb" onCopy={() => setAskClear(true)} />
            <button type="button" className="btn" data-testid="cart-clear" onClick={clear}>Clear</button>
          </div>
        </div>
      </aside>
      {askClear && <ClearCartPrompt count={lines.length} onAnswer={answerClear} />}
    </div>
  );
}
