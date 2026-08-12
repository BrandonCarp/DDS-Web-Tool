"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import {
  PART_CATEGORIES,
  partDescription,
  partPrice,
  partQuantity,
  type Part,
} from "@/lib/pricing/data/parts";
import { cableQuote, CABLE_GAUGES } from "@/lib/pricing/data/cables";

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
 */
export function PartsTool() {
  const [catName, setCatName] = useState(PART_CATEGORIES[0].name);
  const [query, setQuery] = useState("");
  const [pickedName, setPickedName] = useState<string | null>(null);
  const [feet, setFeet] = useState("");
  // Cut-to-length cables: measured feet + inches, priced as a pair.
  const [cabGauge, setCabGauge] = useState(CABLE_GAUGES[0].label);
  const [cabFt, setCabFt] = useState("");
  const [cabIn, setCabIn] = useState("");
  // Torsion springs are ordered by hand — a pair is one right and one left.
  const [right, setRight] = useState(1);
  const [left, setLeft] = useState(1);

  const searching = query.trim().length > 0;
  const onCable = catName === "CABLES" && pickedName === CUSTOM_CABLE && !searching;
  const cabQ = onCable ? cableQuote(cabGauge, Number(cabFt) || 0, Number(cabIn) || 0) : null;

  // Search spans every category; browsing stays inside the chosen one.
  const results = useMemo(() => {
    if (!searching) {
      const cat = PART_CATEGORIES.find((c) => c.name === catName);
      return (cat?.items ?? []).map((p) => ({ part: p, category: cat?.name ?? catName }));
    }
    const q = query.trim().toLowerCase();
    return PART_CATEGORIES.flatMap((c) =>
      c.items
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q) ||
            c.name.toLowerCase().includes(q),
        )
        .map((p) => ({ part: p, category: c.name })),
    ).slice(0, 60);
  }, [searching, query, catName]);

  const hit = onCable ? null : results.find((r) => r.part.name === pickedName) ?? null;
  const part: Part | null = hit?.part ?? null;

  const ft = Math.max(0, Math.trunc(Number(feet) || 0));
  const needsFeet = !!part?.perFoot;
  const needsHands = !!part?.hands;

  const ready = onCable
    ? !!cabQ
    : !!part && (!needsFeet || ft > 0) && (!needsHands || right + left > 0);
  const description = onCable
    ? (cabQ?.description ?? "")
    : part
      ? partDescription(part, ft, right, left)
      : "";
  const price = onCable ? (cabQ?.total ?? 0) : part ? partPrice(part, ft) : 0;
  const qtyText = onCable ? "1" : part ? String(partQuantity(part, right, left)) : "1";
  const title = onCable ? CUSTOM_CABLE : (part?.name ?? "");
  const showing = onCable || !!part;

  function pick(name: string) {
    setPickedName(name);
    setFeet("");
    setRight(1);
    setLeft(1);
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
                <div className="ghdr">Find a part</div>
                <div className="gbody">
                  <div className="grow">
                    <label>Category</label>
                    <div className="ctl selectwrap">
                      <select
                        data-testid="parts-category"
                        value={catName}
                        onChange={(e) => {
                          setCatName(e.target.value);
                          setPickedName(null);
                          setQuery("");
                        }}
                      >
                        {PART_CATEGORIES.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} ({c.items.length})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grow">
                    <label>Search</label>
                    <div className="ctl">
                      <input
                        data-testid="parts-search"
                        type="search"
                        placeholder="Part name or description"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setPickedName(null);
                        }}
                      />
                    </div>
                    <div className="muted-note" style={{ marginTop: 6 }}>
                      {searching
                        ? `${results.length} match${results.length === 1 ? "" : "es"} across all categories`
                        : "Searches every category at once"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ggroup" style={{ marginTop: 14 }}>
                <div className="ghdr">{searching ? "Results" : catName}</div>
                <ul className="partlist" data-testid="parts-list">
                  {catName === "CABLES" && !searching && (
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
                  {results.length === 0 && catName !== "CABLES" && (
                    <li className="partempty">Nothing matches that — try fewer letters.</li>
                  )}
                  {results.map(({ part: p, category }) => (
                    <li key={`${category}-${p.name}`}>
                      <button
                        type="button"
                        className={`partrow ${!onCable && pickedName === p.name ? "on" : ""}`}
                        onClick={() => pick(p.name)}
                      >
                        <span className="partname">
                          {p.name}
                          {p.sub && <span className="partsub">{p.sub}</span>}
                          {searching && <span className="partcat">{category}</span>}
                        </span>
                        <span className="partprice">
                          {fmt(p.price)}
                          {p.perFoot && <span className="perft">/ft</span>}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <aside className="quote">
          <div className="qcard">
            <div className="qhead">
              <div className="qeyebrow">Parts quote</div>
              <div className="qtitle">{showing ? title : "No part selected"}</div>
              {showing && <div className="qsub">QuickBooks item: {QB_ITEMS.parts}</div>}
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
                      <label className="lbl">Right springs (red)</label>
                      <div className="ctl">
                        <input
                          data-testid="part-right"
                          type="number"
                          min={0}
                          value={right}
                          onChange={(e) => setRight(Math.max(0, Math.trunc(Number(e.target.value)) || 0))}
                        />
                      </div>
                    </div>
                    <div className="grow">
                      <label className="lbl">Left springs (black)</label>
                      <div className="ctl">
                        <input
                          data-testid="part-left"
                          type="number"
                          min={0}
                          value={left}
                          onChange={(e) => setLeft(Math.max(0, Math.trunc(Number(e.target.value)) || 0))}
                        />
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
                          min={1}
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          placeholder="e.g. 50"
                        />
                      </div>
                      <div className="muted-note" style={{ marginTop: 6 }}>
                        Sold by the foot — the total goes on the line, quantity stays 1
                      </div>
                    </div>
                  </div>
                )}

                {ready ? (
                  <>
                    <div className="descbox no-print">
                      <div className="desclbl">Part description</div>
                      <div className="desctext" data-testid="parts-desc">
                        {description}
                      </div>
                    </div>
                    <div className="total">
                      <span>Quantity {qtyText}</span>
                      <b data-testid="parts-price">{fmt(price)}</b>
                    </div>
                    <div className="qfoot">
                      <CopyButton text={description} label="Copy description" primary testId="parts-copy-desc" />
                      <CopyButton text={fmt(price)} label="Copy price" testId="parts-copy-price" />
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
          qty={qtyText}
          rate={fmt(price).replace("$", "")}
        />
      )}
    </>
  );
}
