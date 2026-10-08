"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { CopyButton } from "./CopyButton";
import { Icon } from "./Icon";
import { quickBooksRow } from "@/lib/pricing/data/quickbooks";
import { QtyStepper } from "./QtyStepper";

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

/** The Cart tab: every line added, then QuickBooks and Clear. */
export function CartTool() {
  const cart = useCart();
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
            <CopyButton text={qbText} label="QuickBooks" primary testId="cart-qb" />
            <button type="button" className="btn" data-testid="cart-clear" onClick={clear}>Clear</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
