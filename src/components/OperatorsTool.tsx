"use client";

import { useMemo, useState } from "react";
import type { SearchPick } from "@/lib/search";
import { priceText } from "@/components/CopyButton";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { QB_OPERATORS } from "@/lib/pricing/data/quickbooks";
import { QbLineDemo } from "@/components/QbLineDemo";
import { operatorPrice } from "@/lib/pricing/data/operator-pricing";
import { QB_ITEMS } from "@/lib/qb/iif";
import { OPERATOR_CATALOGUE } from "@/lib/pricing/data/operator-catalogue";
import { OPERATOR_GROUPS, type Operator } from "@/lib/pricing/data/operators";
import { slugOf } from "@/lib/pricing/data/parts-menu";

/**
 * LiftMaster operators and the accessories that hang off them.
 *
 * Same flow as the parts shelf (Brandon's wireframe, 12/10/2026): the two
 * groups as stacked buttons, then the chosen group's sections the same way,
 * then the section's list — one level showing at a time, with Back in the
 * header. One difference from the shelf: not everything is priced yet, so
 * where there is no price the card says so instead of showing a rate. Nobody
 * should be able to lift a number off this screen that the company has not set.
 */
const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function OperatorsTool({ openOn }: { openOn?: SearchPick } = {}) {
  const start = openOn?.kind === "operator" ? openOn : null;
  // The open group and section; null until chosen. A pick from the top bar's
  // search opens straight on its section.
  const [group, setGroup] = useState<string | null>(start?.group ?? null);
  const [sectionName, setSectionName] = useState<string | null>(start?.section ?? null);
  const [picked, setPicked] = useState<string | null>(start?.desc ?? null);

  const sections = OPERATOR_CATALOGUE.filter((s) => s.group === group);
  const level: 0 | 1 | 2 = sectionName ? 2 : group ? 1 : 0;

  const results = useMemo(() => {
    const s = OPERATOR_CATALOGUE.find((x) => x.name === sectionName);
    return (s?.items ?? []).map((o) => ({ item: o, section: s?.name ?? sectionName ?? "" }));
  }, [sectionName]);

  // A row is its description, not its model number. The 2240L and 4690L come
  // in several rail lengths, the TDC12X1BMC in five, and some sprockets twice,
  // all under one name — picking by name quoted the first of them whichever
  // row was clicked. Descriptions are unique (OperatorsTool.test holds them to it).
  const hit = results.find((r) => r.item.desc === picked) ?? null;
  const chosen: Operator | null = hit?.item ?? null;
  // null means DDS has not priced this one yet — a real state, not an error.
  const price = chosen ? operatorPrice(chosen) : null;
  // Names that repeat in the list show their description underneath, or three
  // identical "2240L" rows would give no way to tell them apart.
  const repeated = useMemo(() => {
    const seen = new Set<string>();
    const twice = new Set<string>();
    for (const { item } of results) (seen.has(item.name) ? twice : seen).add(item.name);
    return twice;
  }, [results]);

  function pickGroup(g: string) {
    setGroup(g);
    setSectionName(null);
    setPicked(null);
  }
  function openSection(name: string) {
    setSectionName(name);
    setPicked(null);
  }
  /** Up one level: the section's list back to the sections, those back to the groups. */
  function back() {
    setPicked(null);
    if (sectionName) setSectionName(null);
    else setGroup(null);
  }

  return (
    <>
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="ggroup">
                <div className={`ghdr${level > 0 ? " pnav-head" : ""}`}>
                  {level > 0 && (
                    <button type="button" className="btn backbtn" data-testid="op-back" onClick={back}>&lsaquo; Back</button>
                  )}
                  {level === 0 ? "Find an operator"
                    : level === 1 ? <span data-testid="op-title">{group}</span>
                    : <span data-testid="op-title">{group} › {sectionName}</span>}
                </div>
                {level === 0 && (
                  <div className="gbody pnav-body">
                    <div className="pnav stack">
                      <div className="pnav-groups">
                        {OPERATOR_GROUPS.map((g) => (
                          <button key={g} type="button" className="pnav-btn" data-testid={`op-group-${slugOf(g)}`} onClick={() => pickGroup(g)}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {level === 1 && (
                  <div className="gbody pnav-body">
                    <div className="pnav stack">
                      <div className="pnav-pages" role="group" aria-label={group ?? undefined}>
                        {sections.map((sec) => (
                          <button key={sec.name} type="button" className="pnav-page" data-testid={`op-section-${slugOf(sec.name)}`}
                            onClick={() => openSection(sec.name)}>
                            {sec.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {level === 2 && (
                <ul className="partlist" data-testid="op-list">
                  {results.map(({ item, section }) => (
                    <li key={`${section}-${item.desc}`}>
                      <button
                        type="button"
                        className={`partrow ${picked === item.desc ? "on" : ""}`}
                        onClick={() => setPicked(item.desc)}
                      >
                        <span className="partname">
                          {item.name}
                          {repeated.has(item.name) && <span className="partsub">{item.desc}</span>}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        <aside className="quote">
          <div className="qcard">
            <div className="qhead">
              <div className="qeyebrow">Operator quote</div>
              <div className="qtitle">{chosen ? chosen.name : "Nothing selected"}</div>
            </div>

            {!chosen ? (
              <div className="empty">
                <div className="emptymsg">Pick an operator or accessory</div>
              </div>
            ) : (
              <>
                <div className="total">
                  <span>Quantity 1</span>
                  {price == null ? (
                    <b className="nopricing" data-testid="op-price">
                      Price not set
                    </b>
                  ) : (
                    <b data-testid="op-price">{fmt(price)}</b>
                  )}
                </div>
                {price == null && (
                  <div className="muted-note" style={{ padding: "0 22px 4px" }}>
                    This one has no price yet — look it up before the order goes out.
                  </div>
                )}
                <div className="qfoot">
                  {price != null && (
                    <CopyQuickBooks item={QB_OPERATORS} description={chosen.desc}
                      rate={price} testId="op-copy-qb" />
                  )}
                  <button className="btn" type="button" onClick={() => setPicked(null)}>
                    Clear
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {chosen && (
        <QbLineDemo
          model={chosen.name}
          size={hit?.section ?? sectionName ?? ""}
          item={QB_ITEMS.operators}
          typed="OPE"
          description={chosen.desc}
          qty="1"
          rate={price == null ? "" : priceText(price)}
        />
      )}
    </>
  );
}
