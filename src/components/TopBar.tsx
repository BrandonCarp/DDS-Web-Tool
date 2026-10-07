"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";
import { buildIndex, searchIndex, type SearchHit } from "@/lib/search";

/**
 * The top bar: quick search on the left, the signed-in person on the right —
 * Brandon, 30/9/2026, after the layout he picked. The sidebar keeps only the
 * tabs.
 */
export function TopBar({
  tabs,
  doorModels,
  cartCount,
  cartOpen,
  onCart,
  username,
  role,
  isAdmin,
  onJump,
  onSettings,
}: {
  tabs: readonly { id: string; label: string }[];
  /** The stocked residential models, so the search can offer them. */
  doorModels: readonly string[];
  /** Lines in the cart: the Cart button glows red with the count until Clear. */
  cartCount: number;
  cartOpen: boolean;
  onCart: () => void;
  username: string;
  role: string;
  isAdmin: boolean;
  onJump: (hit: SearchHit) => void;
  onSettings: () => void;
}) {
  return (
    <header className="topbar">
      <QuickSearch tabs={tabs} doorModels={doorModels} onJump={onJump} />
      {/* The Cart, left of the signed-in name (Brandon, 7/10/2026). */}
      <button
        type="button"
        data-testid="topbar-cart"
        className={`tb-cart${cartCount ? " glow" : ""}${cartOpen ? " on" : ""}`}
        aria-label={cartCount ? `Cart, ${cartCount} ${cartCount === 1 ? "line" : "lines"}` : "Cart"}
        aria-current={cartOpen ? "page" : undefined}
        onClick={onCart}
      >
        <Icon name="cart" />
        <span className="tb-cart-label">Cart</span>
        {cartCount > 0 && <span className="tb-count" data-testid="cart-count">{cartCount}</span>}
      </button>
      <UserMenu username={username} role={role} isAdmin={isAdmin} onSettings={onSettings} />
    </header>
  );
}

function QuickSearch({ tabs, doorModels, onJump }: {
  tabs: readonly { id: string; label: string }[];
  doorModels: readonly string[];
  onJump: (hit: SearchHit) => void;
}) {
  const index = useMemo(() => buildIndex(tabs, doorModels), [tabs, doorModels]);
  const labelOf = useMemo(() => new Map(tabs.map((t) => [t.id, t.label])), [tabs]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => searchIndex(index, q), [index, q]);
  const showing = open && q.trim().length > 0;

  // Ctrl+K from anywhere, or / when not typing in a box, jumps to the search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, select, [contenteditable]");
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        box.current?.focus();
        box.current?.select();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        box.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const choose = (hit: SearchHit) => {
    onJump(hit);
    setQ("");
    setOpen(false);
    box.current?.blur();
  };

  return (
    <div className="qsearch" role="search">
      <Icon name="search" />
      <input
        ref={box}
        type="text"
        data-testid="qsearch"
        role="combobox"
        aria-label="Search the app"
        aria-autocomplete="list"
        aria-expanded={showing}
        aria-controls="qsearch-list"
        aria-activedescendant={showing && hits[active] ? `qs-${active}` : undefined}
        placeholder="Search doors, parts, springs…"
        autoComplete="off"
        spellCheck={false}
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, Math.max(hits.length - 1, 0))); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          else if (e.key === "Enter" && hits[active]) { e.preventDefault(); choose(hits[active]); }
          else if (e.key === "Escape") { setQ(""); setOpen(false); box.current?.blur(); }
        }}
      />
      <kbd className="qsearch-kbd" aria-hidden="true">Ctrl K</kbd>
      {showing && (
        <ul id="qsearch-list" role="listbox" className="qsearch-list" aria-label="Search results">
          {hits.length ? (
            hits.map((h, i) => (
              <li
                key={h.id}
                id={`qs-${i}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? "on" : undefined}
                data-testid="qsearch-hit"
                // mousedown, not click: a click would blur the box first and
                // close the list before the choice landed.
                onMouseDown={(e) => { e.preventDefault(); choose(h); }}
                onMouseEnter={() => setActive(i)}
              >
                <span className="qs-main">
                  <b>{h.label}</b>
                  <small>{h.detail}</small>
                </span>
                {h.price && <span className="qs-price">{h.price}</span>}
                <span className="qs-tab">{h.pick ? labelOf.get(h.tab) : "Tab"}</span>
              </li>
            ))
          ) : (
            <li className="qs-none" role="option" aria-selected={false} aria-disabled="true">
              Nothing matches “{q.trim()}”. Try a model number, part name or size.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

function UserMenu({ username, role, isAdmin, onSettings }: {
  username: string; role: string; isAdmin: boolean; onSettings: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // A click outside or Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div className="umenu" ref={wrap}>
      <button type="button" className="umenu-btn" data-testid="user-menu" aria-haspopup="menu" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}>
        <span className="avatar" aria-hidden="true">{username.charAt(0) || "?"}</span>
        <span className="umenu-who">
          <span className="umenu-name">{username}</span>
          {role && <span className="umenu-role">{role}</span>}
        </span>
        <Icon name="chevdown" />
      </button>
      {open && (
        <div className="umenu-pop" role="menu">
          <button type="button" role="menuitem" onClick={() => { setOpen(false); onSettings(); }}>
            <Icon name="settings" /> Settings
          </button>
          {isAdmin && (
            <a role="menuitem" href="/admin"><Icon name="dashboard" /> Admin panel</a>
          )}
          <a role="menuitem" href="/api/logout" data-testid="sign-out"><Icon name="logout" /> Sign out</a>
        </div>
      )}
    </div>
  );
}
