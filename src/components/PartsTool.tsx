"use client";

import { Fragment, useMemo, useState } from "react";
import { CopyButton, CopyPrice, priceText } from "@/components/CopyButton";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { categoryItem } from "@/lib/pricing/data/quickbooks";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import {
  partDescription,
  partPrice,
  partQuantity,
  type Part,
} from "@/lib/pricing/data/parts";
import { PARTS_TAB_CATEGORIES } from "@/lib/pricing/data/springs";
import type { PartCategory } from "@/lib/pricing/data/parts";
import type { SearchPick } from "@/lib/search";
import { entryId, feetAsQuantity, type PartsMenu } from "@/lib/pricing/data/parts-menu";
import { PartsNavigator } from "./PartsNavigator";
import { cableQuote, CABLE_GAUGES } from "@/lib/pricing/data/cables";
import { billedFeet, feetLimits, priceNotSet } from "@/lib/pricing/data/part-pricing";
import { QtyStepper } from "./QtyStepper";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CUSTOM_CABLE = "Custom cut cable";

/**
 * Counter lookup for the parts shelf.
 *
 * Two ways in, because the counter uses both: pick a category when you know
 * roughly where a part lives, or type when you know what it is called. Search
 * runs across every category at once so nobody has to guess whether a jamb seal
 * files under RETAINERS or FASTENERS.
 *
 * Everything here bills to the one QuickBooks item, PARTS. Vinyl has its own
 * tab and its own item because it is measured off a door rather than picked off
 * a shelf.
 *
 * Springs are gone from this shelf entirely — not hidden, gone. Extension
 * springs have their own tab and stock torsion springs sit under the
 * configurator on the Torsion Springs tab, so browsing AND search here run over
 * SHELF_PART_CATEGORIES. Searching "spring" on this tab finds spring bumpers
 * and nothing else; that is deliberate, so there is exactly one place to quote
 * a spring from.
 */
export function PartsTool({
  categories = PARTS_TAB_CATEGORIES,
  eyebrow = "Parts quote",
  finder = "Find a part",
  openOn,
  menu,
  group,
}: {
  /** Groups of pages, shown as buttons (the Parts and Track tabs, 6/10/2026).
      Without one the tab keeps its category list (Cables). */
  menu?: PartsMenu;
  /** Open on this group — a group tab (Tools, Angle…) opens on its own. */
  group?: string;
  /** A part chosen in the top bar's search: open on it, already picked. */
  openOn?: SearchPick;
  /** What this tab browses and searches. The Track and Cables tabs pass their
      one category; the Parts tab gets the rest of the shelf (29/9/2026). */
  categories?: PartCategory[];
  eyebrow?: string;
  finder?: string;
} = {}) {
  const start = openOn?.kind === "part" && categories.some((c) => c.name === openOn.category) ? openOn : null;
  const [catName, setCatName] = useState(start?.category ?? categories[0]?.name ?? "");
  const [pickedName, setPickedName] = useState<string | null>(start?.name ?? null);
  // The open drop-down page, as "Group|Entry". A part found by the top bar's
  // search opens the page it sits on.
  const pages = useMemo(
    () => (menu ?? []).flatMap((g) => g.entries.map((e) => ({ id: entryId(g, e), group: g.label, entry: e }))),
    [menu],
  );
  const [pageId, setPageId] = useState<string | null>(() => {
    if (start) return pages.find((pg) => pg.entry.parts.some((mp) => mp.category === start.category && mp.part.name === start.name))?.id ?? null;
    const g = menu?.find((x) => x.label === group);
    return g && g.entries.length === 1 ? entryId(g, g.entries[0]) : null;
  });
  const page = pages.find((pg) => pg.id === pageId) ?? null;
  const [groupLabel, setGroupLabel] = useState<string | null>(() => page?.group ?? (menu?.some((g) => g.label === group) ? group! : null));
  const [feet, setFeet] = useState("");
  // Cut-to-length cables: measured feet + inches, priced as a pair.
  const [cabGauge, setCabGauge] = useState(CABLE_GAUGES[0].label);
  const [cabFt, setCabFt] = useState("");
  const [cabIn, setCabIn] = useState("");
  // Torsion springs are ordered by hand — a pair is one right and one left.
  const [right, setRight] = useState(1);
  const [left, setLeft] = useState(1);

  const onCable = catName === "CABLES" && pickedName === CUSTOM_CABLE;
  const cabQ = onCable ? cableQuote(cabGauge, Number(cabFt) || 0, Number(cabIn) || 0) : null;

  // The open page's parts, or (Cables) the chosen category's. Searching is the
  // top bar's job alone since 6/10/2026.
  const results = useMemo(() => {
    if (menu) return (page?.entry.parts ?? []).map((mp) => ({ part: mp.part, category: mp.category }));
    const cat = categories.find((c) => c.name === catName);
    return (cat?.items ?? []).map((p) => ({ part: p, category: cat?.name ?? catName }));
  }, [catName, categories, menu, page]);
  // A drop-down page already says what it holds, so no headings inside it.
  const grouped = !menu && results.length > 0 && results.every((r) => r.part.sub);

  const hit = onCable ? null : results.find((r) => r.part.name === pickedName) ?? null;
  const part: Part | null = hit?.part ?? null;

  const ft = Math.max(0, Math.trunc(Number(feet) || 0));
  const needsFeet = !!part?.perFoot;
  const needsHands = !!part?.hands;
  // Raw track is sold 1FT to 24FT only (30/9/2026); outside that, no line.
  const limits = part ? feetLimits(part) : null;
  const feetOk = !limits || (ft >= limits.min && ft <= limits.max);

  const ready = onCable
    ? !!cabQ
    : !!part && (!needsFeet || (ft > 0 && feetOk)) && (!needsHands || right + left > 0);
  const description = onCable
    ? (cabQ?.description ?? "")
    : part
      ? partDescription(part, ft, right, left)
      : "";
  // A part with no price yet has no price here — never its placeholder 0 — so
  // the card says so and offers nothing to paste or add to the cart.
  const price: number | null = onCable ? (cabQ?.total ?? 0) : part ? (priceNotSet(part) ? null : partPrice(part, ft)) : 0;
  // Seals paste the feet as the quantity, at the price per foot (7/10/2026).
  const feetQty = !onCable && !!part?.perFoot && feetAsQuantity(hit?.category ?? catName, part.name);
  const qtyText = onCable ? "1" : feetQty ? `${ft} ft` : part ? String(partQuantity(part, right, left)) : "1";
  const title = onCable ? CUSTOM_CABLE : (part?.name ?? "");
  const showing = onCable || !!part;

  function pick(name: string) {
    setPickedName(name);
    setFeet("");
    setRight(1);
    setLeft(1);
  }

  /** Open a drop-down page. A page holding one part picks it straight away. */
  function openPage(id: string) {
    const pg = pages.find((x) => x.id === id);
    if (!pg) return;
    setPageId(id);
    setGroupLabel(pg.group);
    setCatName(pg.entry.parts[0]?.category ?? catName);
    if (pg.entry.parts.length === 1) pick(pg.entry.parts[0].part.name);
    else setPickedName(null);
  }

  /** Open a group: straight to its page if it has only one. */
  function openGroup(label: string) {
    const g = menu?.find((x) => x.label === label);
    if (!g) return;
    if (g.entries.length === 1) return openPage(entryId(g, g.entries[0]));
    setGroupLabel(label);
    setPageId(null);
    setPickedName(null);
  }

  function clear() {
    setPickedName(null);
    setFeet("");
    setCabFt("");
    setCabIn("");
  }

  return (
    <>
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="ggroup">
                <div className="ghdr">{finder}</div>
                <div className="gbody">
                  {menu && (
                    <div className="grow">
                      <label>Browse</label>
                      <PartsNavigator menu={menu} group={groupLabel} page={pageId}
                        onGroup={openGroup} onPage={openPage} />
                    </div>
                  )}
                  {/* One category (Cables): nothing to choose. */}
                  {categories.length > 1 && !menu && (
                  <div className="grow">
                    <label>Category</label>
                    <div className="ctl selectwrap">
                      <select
                        data-testid="parts-category"
                        value={catName}
                        onChange={(e) => {
                          setCatName(e.target.value);
                          setPickedName(null);
                                              }}
                      >
                        {categories.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} ({c.items.length})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  )}

                </div>
              </div>

              {/* The list appears once there is something to list — no prompts
                  before it (6/10/2026). */}
              {(!menu || page) && (
              <div className="ggroup" style={{ marginTop: 14 }}>
                <div className="ghdr" data-testid="parts-page">
                  {!menu ? catName
                    : page!.group === page!.entry.label ? page!.group : `${page!.group} › ${page!.entry.label}`}
                </div>
                <ul className="partlist" data-testid="parts-list">
                  {catName === "CABLES" && (
                    <li>
                      <button
                        type="button"
                        className={`partrow ${onCable ? "on" : ""}`}
                        onClick={() => pick(CUSTOM_CABLE)}
                      >
                        <span className="partname">
                          {CUSTOM_CABLE}
                          <span className="partsub">cut to length, priced per pair</span>
                        </span>
                      </button>
                    </li>
                  )}
                  {results.map(({ part: p, category }, i) => (
                    <Fragment key={`${category}-${p.name}`}>
                    {/* A list where every item has a heading (Track) shows the
                        headings as rows of their own, so a group is never
                        hidden below the fold with nothing saying it is there. */}
                    {grouped && p.sub !== results[i - 1]?.part.sub && (
                      <li className="partgroup" data-testid="parts-group">{p.sub}</li>
                    )}
                    <li>
                      <button
                        type="button"
                        className={`partrow ${!onCable && pickedName === p.name ? "on" : ""}`}
                        onClick={() => pick(p.name)}
                      >
                        <span className="partname">
                          {p.name}
                          {/* A page picked from the buttons already says what it holds. */}
                          {p.sub && !grouped && !menu && <span className="partsub">{p.sub}</span>}
                        </span>
                        <span className="partprice">
                          {priceNotSet(p) ? "Price not set" : fmt(p.price)}
                          {p.perFoot && !priceNotSet(p) && <span className="perft">/ft</span>}
                        </span>
                      </button>
                    </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
              )}
            </div>
          </div>
        </section>

        <aside className="quote">
          <div className="qcard">
            <div className="qhead">
              <div className="qeyebrow">{eyebrow}</div>
              <div className="qtitle">{showing ? title : "No part selected"}</div>
            </div>

            {!showing ? (
              <div className="empty">
                <div className="emptymsg">Pick a part from the list</div>
              </div>
            ) : (
              <>
                {onCable && (
                  <div className="gbody">
                    <div className="grow">
                      <label>Cable size</label>
                      <div className="ctl selectwrap">
                        <select
                          data-testid="cable-gauge"
                          value={cabGauge}
                          onChange={(e) => setCabGauge(e.target.value)}
                        >
                          {CABLE_GAUGES.map((g) => (
                            <option key={g.label} value={g.label}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grow">
                      <label>Length</label>
                      <div className="ctl dimrow">
                        <input
                          data-testid="cable-ft"
                          type="number"
                          min={0}
                          value={cabFt}
                          onChange={(e) => setCabFt(e.target.value)}
                          placeholder="ft"
                        />
                        <span className="u">ft</span>
                        <input
                          data-testid="cable-in"
                          type="number"
                          min={0}
                          max={11}
                          value={cabIn}
                          onChange={(e) => setCabIn(e.target.value)}
                          placeholder="in"
                        />
                        <span className="u">in</span>
                      </div>
                      <div className="muted-note" style={{ marginTop: 6 }}>
                        Sold as a pair. 5&Prime; and over rounds up to the next foot.
                      </div>
                    </div>
                  </div>
                )}

                {needsHands && (
                  <div className="gbody">
                    <div className="grow">
                      <label className="lbl">Right Wound</label>
                      <div className="ctl">
                        <QtyStepper testId="part-right" min={0} value={right} label="Right wound"
                          onChange={(v) => setRight(Math.max(0, Math.trunc(Number(v)) || 0))} />
                      </div>
                    </div>
                    <div className="grow">
                      <label className="lbl">Left Wound</label>
                      <div className="ctl">
                        <QtyStepper testId="part-left" min={0} value={left} label="Left wound"
                          onChange={(v) => setLeft(Math.max(0, Math.trunc(Number(v)) || 0))} />
                      </div>
                      <div className="muted-note" style={{ marginTop: 6 }}>
                        Priced each — the quantity carries the count
                      </div>
                    </div>
                  </div>
                )}

                {needsFeet && (
                  <div className="gbody">
                    <div className="grow">
                      <label>How many feet?</label>
                      <div className="ctl">
                        <input
                          data-testid="parts-feet"
                          type="number"
                          min={limits?.min ?? 1}
                          max={limits?.max}
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          placeholder={limits ? `${limits.min} to ${limits.max}` : "e.g. 50"}
                        />
                      </div>
                      {limits ? (
                        ft > 0 && !feetOk ? (
                          <div className="muted-note err" role="alert" style={{ marginTop: 6 }} data-testid="parts-feet-error">
                            Raw track is sold from {limits.min} to {limits.max} ft.
                          </div>
                        ) : ft > 0 ? (
                          <div className="muted-note" style={{ marginTop: 6 }} data-testid="parts-feet-note">
                            Charged as {billedFeet(part!, ft)} ft
                          </div>
                        ) : null ): null}
                    </div>
                  </div>
                )}

                {ready ? (
                  <>
                    {price == null && (
                      <div className="muted-note" style={{ margin: "0 20px 12px" }}>
                        This one has no price yet — look it up before the order goes out.
                      </div>
                    )}
                    <div className="total">
                      <span>Quantity {qtyText}</span>
                      {/* Seals show their price per foot, the rate on the line, not the run's
                          total (Brandon, 7/10/2026). */}
                      <b data-testid="parts-price">
                        {price == null ? "Price not set" : feetQty ? fmt(part!.price) : fmt(price)}
                        {feetQty && price != null && <span className="perft">/ft</span>}
                      </b>
                    </div>
                    <div className="qfoot">
                      {price != null && (
                        <CopyQuickBooks item={categoryItem(hit?.category ?? catName)} description={description}
                          {...(feetQty ? { qty: ft } : {})}
                          rate={feetQty ? part!.price : price} testId="parts-copy-qb" />
                      )}
                      <button className="btn" type="button" onClick={clear}>
                        Clear
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty">
                    <div className="emptymsg">
                      {onCable
                        ? "Enter the cable length"
                        : needsHands
                          ? "Enter how many rights and lefts"
                          : "Enter the footage to price this part"}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </div>

      {ready && (
        <QbLineDemo
          model={onCable ? "Cut cable" : (part?.name ?? "")}
          size={onCable ? `${cabQ?.gauge} · ${cabQ?.feet}′${cabQ?.inches}″` : (hit?.category ?? catName)}
          item={QB_ITEMS.parts}
          typed="PAR"
          description={description}
          qty={feetQty ? String(ft) : qtyText}
          rate={priceText(feetQty ? part!.price : (price ?? 0))}
        />
      )}
    </>
  );
}
