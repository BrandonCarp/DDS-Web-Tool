"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import {
  OPERATOR_SECTIONS,
  OPERATOR_GROUPS,
  type Operator,
} from "@/lib/pricing/data/operators";

/**
 * LiftMaster operators and the accessories that hang off them.
 *
 * Same shape as the parts shelf — pick a group and section, or search across
 * everything — with one difference: there is no pricing yet, so the card copies
 * the description and says so instead of showing a rate. Nobody should be able
 * to lift a number off this screen that the company has not set.
 */
export function OperatorsTool() {
  const [group, setGroup] = useState<string>(OPERATOR_GROUPS[0]);
  const [sectionName, setSectionName] = useState(OPERATOR_SECTIONS[0].name);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  const searching = query.trim().length > 0;
  const sections = OPERATOR_SECTIONS.filter((s) => s.group === group);

  const results = useMemo(() => {
    if (!searching) {
      const s = OPERATOR_SECTIONS.find((x) => x.name === sectionName);
      return (s?.items ?? []).map((o) => ({ item: o, section: s?.name ?? sectionName }));
    }
    const q = query.trim().toLowerCase();
    return OPERATOR_SECTIONS.flatMap((s) =>
      s.items
        .filter(
          (o) =>
            o.name.toLowerCase().includes(q) ||
            o.desc.toLowerCase().includes(q) ||
            s.name.toLowerCase().includes(q),
        )
        .map((o) => ({ item: o, section: s.name })),
    ).slice(0, 60);
  }, [searching, query, sectionName]);

  const hit = results.find((r) => r.item.name === picked) ?? null;
  const chosen: Operator | null = hit?.item ?? null;

  function pickGroup(g: string) {
    setGroup(g);
    const first = OPERATOR_SECTIONS.find((s) => s.group === g);
    if (first) setSectionName(first.name);
    setPicked(null);
    setQuery("");
  }

  return (
    <>
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="ggroup">
                <div className="ghdr">Find an operator</div>
                <div className="gbody">
                  <div className="grow">
                    <label>Type</label>
                    <div className="ctl selectwrap">
                      <select
                        data-testid="op-group"
                        value={group}
                        onChange={(e) => pickGroup(e.target.value)}
                      >
                        {OPERATOR_GROUPS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grow">
                    <label>Section</label>
                    <div className="ctl selectwrap">
                      <select
                        data-testid="op-section"
                        value={sectionName}
                        onChange={(e) => {
                          setSectionName(e.target.value);
                          setPicked(null);
                          setQuery("");
                        }}
                      >
                        {sections.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name} ({s.items.length})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grow">
                    <label>Search</label>
                    <div className="ctl">
                      <input
                        data-testid="op-search"
                        type="search"
                        placeholder="Model number or description"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setPicked(null);
                        }}
                      />
                    </div>
                    <div className="muted-note" style={{ marginTop: 6 }}>
                      {searching
                        ? `${results.length} match${results.length === 1 ? "" : "es"} across operators and accessories`
                        : "Searches every section at once"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ggroup" style={{ marginTop: 14 }}>
                <div className="ghdr">{searching ? "Results" : sectionName}</div>
                <ul className="partlist" data-testid="op-list">
                  {results.length === 0 && (
                    <li className="partempty">Nothing matches that — try fewer letters.</li>
                  )}
                  {results.map(({ item, section }) => (
                    <li key={`${section}-${item.name}`}>
                      <button
                        type="button"
                        className={`partrow ${picked === item.name ? "on" : ""}`}
                        onClick={() => setPicked(item.name)}
                      >
                        <span className="partname">
                          {item.name}
                          {searching && <span className="partcat">{section}</span>}
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
              <div className="qeyebrow">Operator quote</div>
              <div className="qtitle">{chosen ? chosen.name : "Nothing selected"}</div>
              {chosen && <div className="qsub">QuickBooks item: {QB_ITEMS.operators}</div>}
            </div>

            {!chosen ? (
              <div className="empty">
                <div className="emptymsg">Pick an operator or accessory</div>
              </div>
            ) : (
              <>
                <div className="descbox no-print">
                  <div className="desclbl">Description</div>
                  <div className="desctext" data-testid="op-desc">
                    {chosen.desc}
                  </div>
                </div>
                <div className="total">
                  <span>Quantity 1</span>
                  <b className="nopricing" data-testid="op-price">
                    Price not set
                  </b>
                </div>
                <div className="muted-note" style={{ padding: "0 22px 4px" }}>
                  Operator pricing has not been set yet — look the price up before the order goes out.
                </div>
                <div className="qfoot">
                  <CopyButton text={chosen.desc} label="Copy description" primary testId="op-copy-desc" />
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
          size={hit?.section ?? sectionName}
          item={QB_ITEMS.operators}
          typed="OPE"
          description={chosen.desc}
          qty="1"
          rate=""
        />
      )}
    </>
  );
}
