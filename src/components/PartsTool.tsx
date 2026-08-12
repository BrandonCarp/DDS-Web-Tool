"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { QbLineDemo } from "@/components/QbLineDemo";
import {
  PART_CATEGORIES,
  partDescription,
  partPrice,
  type Part,
} from "@/lib/pricing/data/parts";
import { vinylForDoor, VINYL_COLORS } from "@/lib/pricing/data/vinyl";
import { cableQuote, CABLE_GAUGES } from "@/lib/pricing/data/cables";

const VINYL = "VINYL";
const CUSTOM_CABLE = "Custom cut cable";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Counter lookup for the parts shelf.
 *
 * Two ways in, because the counter uses both: pick a category when you know
 * roughly where a part lives, or type when you know what it is called. Search
 * runs across every category at once so nobody has to guess whether a jamb seal
 * files under RETAINERS or FASTENERS.
 *
 * The QuickBooks item name is the category — ANGLE for angle, BATTERIES for
 * batteries — so it is shown next to the price rather than left to memory.
 */
export function PartsTool() {
  const [catName, setCatName] = useState(PART_CATEGORIES[0].name);
  const [query, setQuery] = useState("");
  const [pickedName, setPickedName] = useState<string | null>(null);
  const [feet, setFeet] = useState("");
  // Vinyl is measured off the opening, not off a length of stock.
  const [vinylW, setVinylW] = useState("");
  const [vinylH, setVinylH] = useState("");
  // Cut-to-length cables: measured feet + inches, priced as a pair.
  const [cabGauge, setCabGauge] = useState(CABLE_GAUGES[0].label);
  const [cabFt, setCabFt] = useState("");
  const [cabIn, setCabIn] = useState("");

  const onVinyl = catName === VINYL && !query.trim();
  const onCable = catName === "CABLES" && pickedName === CUSTOM_CABLE && !query.trim();
  const cabQ = onCable ? cableQuote(cabGauge, Number(cabFt) || 0, Number(cabIn) || 0) : null;
  const vinylQuote =
    onVinyl && pickedName && Number(vinylW) > 0 && Number(vinylH) > 0
      ? vinylForDoor(pickedName, Math.trunc(Number(vinylW)), Math.trunc(Number(vinylH)))
      : null;

  const searching = query.trim().length > 0;

  // Search spans every category; browsing stays inside the chosen one.
  const results = useMemo(() => {
    if (!searching) {
      const cat = PART_CATEGORIES.find((c) => c.name === catName);
      return (cat?.items ?? []).map((p) => ({ part: p, category: cat!.name }));
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

  const hit = onVinyl || onCable ? null : results.find((r) => r.part.name === pickedName) ?? null;
  const part: Part | null = hit?.part ?? null;
  const itemName = onVinyl ? VINYL : hit?.category ?? catName;

  const ft = Math.max(0, Math.trunc(Number(feet) || 0));
  const needsFeet = !!part?.perFoot;
  // Vinyl bills the other way round from every other per-foot part: the
  // QuickBooks quantity is the total footage and the rate is the per-foot
  // figure, because that is how the molding sheet is written.
  const ready = onVinyl ? !!vinylQuote : onCable ? !!cabQ : !!part && (!needsFeet || ft > 0);
  const description = onVinyl
    ? vinylQuote?.description ?? ""
    : onCable
      ? cabQ?.description ?? ""
      : part
        ? partDescription(part, ft)
        : "";
  const price = onVinyl
    ? vinylQuote?.total ?? 0
    : onCable
      ? cabQ?.total ?? 0
      : part
        ? partPrice(part, ft)
        : 0;
  // Cables bill as one pair; vinyl bills its footage.
  const qtyText = onVinyl ? String(vinylQuote?.feet ?? 0) : "1";

  function pick(name: string) {
    setPickedName(name);
    setFeet("");
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
                        <option value={VINYL}>VINYL ({VINYL_COLORS.length})</option>
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
                  {!onVinyl && results.length === 0 && (
                    <li className="partempty">Nothing matches that — try fewer letters.</li>
                  )}
                  {onVinyl &&
                    VINYL_COLORS.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          className={`partrow ${pickedName === c ? "on" : ""}`}
                          onClick={() => {
                            setPickedName(c);
                            setVinylW("");
                            setVinylH("");
                          }}
                        >
                          <span className="partname">{c}</span>
                          <span className="partprice">stop molding</span>
                        </button>
                      </li>
                    ))}
                  {!onVinyl && catName === "CABLES" && !searching && (
                    <li>
                      <button
                        type="button"
                        className={`partrow ${onCable ? "on" : ""}`}
                        onClick={() => {
                          setPickedName(CUSTOM_CABLE);
                          setCabFt("");
                          setCabIn("");
                        }}
                      >
                        <span className="partname">
                          {CUSTOM_CABLE}
                          <span className="partsub">cut to length, priced per pair</span>
                        </span>
                        <span className="partprice">from $1.00<span className="perft">/ft</span></span>
                      </button>
                    </li>
                  )}
                  {!onVinyl && results.map(({ part: p, category }) => (
                    <li key={`${category}-${p.name}`}>
                      <button
                        type="button"
                        className={`partrow ${pickedName === p.name ? "on" : ""}`}
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
              <div className="qtitle">{part ? part.name : "No part selected"}</div>
              {part && <div className="qsub">QuickBooks item: {itemName}</div>}
            </div>

            {!part && !(onVinyl && pickedName) && !onCable ? (
              <div className="empty">
                <div className="emptymsg">{onVinyl ? "Pick a color" : "Pick a part from the list"}</div>
              </div>
            ) : (
              <>
                {onVinyl && (
                  <div className="gbody">
                    <div className="grow">
                      <label>Door width (ft)</label>
                      <div className="ctl">
                        <input
                          data-testid="vinyl-w"
                          type="number"
                          min={1}
                          value={vinylW}
                          onChange={(e) => setVinylW(e.target.value)}
                          placeholder="e.g. 16"
                        />
                      </div>
                    </div>
                    <div className="grow">
                      <label>Door height (ft)</label>
                      <div className="ctl">
                        <input
                          data-testid="vinyl-h"
                          type="number"
                          min={1}
                          value={vinylH}
                          onChange={(e) => setVinylH(e.target.value)}
                          placeholder="e.g. 7"
                        />
                      </div>
                      <div className="muted-note" style={{ marginTop: 6 }}>
                        One piece across the header, two down the sides
                      </div>
                    </div>
                  </div>
                )}

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
                              {g.label} — ${g.perFoot.toFixed(2)}/ft
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
                        {cabQ
                          ? `Charged at ${cabQ.billableFeet}ft — 5″ and over rounds up`
                          : "5″ and over rounds up to the next foot"}
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
                        Sold by the foot — the total price goes on the line, quantity stays 1
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
                      {onVinyl && (
                        <CopyButton text={qtyText} label="Copy quantity" testId="parts-copy-qty" />
                      )}
                      <CopyButton text={fmt(price)} label="Copy price" testId="parts-copy-price" />
                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          setPickedName(null);
                          setFeet("");
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty">
                    <div className="emptymsg">
                      {onCable
                        ? "Enter the cable length"
                        : onVinyl
                        ? Number(vinylW) > 0 && Number(vinylH) > 0
                          ? `${pickedName} is not stocked long enough for that opening — special order it.`
                          : "Enter the door size to price the molding"
                          : "Enter the footage to price this part"}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </div>

      {ready && (part || onVinyl || onCable) && (
        <QbLineDemo
          model={onVinyl ? "Vinyl stop molding" : onCable ? "Cut cable" : itemName}
          size={onVinyl ? `${pickedName} · ${vinylW}\u2032 x ${vinylH}\u2032` : part!.name}
          item={itemName}
          typed={itemName.slice(0, 3).toUpperCase()}
          description={description}
          qty={qtyText}
          rate={fmt(onVinyl ? (vinylQuote?.pricePerFt ?? 0) : price).replace("$", "")}
        />
      )}
    </>
  );
}
