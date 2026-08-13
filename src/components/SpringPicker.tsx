"use client";

import { useMemo, useState } from "react";
import { springGroups, type SpringGroup } from "@/lib/pricing/data/springs";
import type { Part, PartCategory } from "@/lib/pricing/data/parts";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ALL = "ALL";

/**
 * The list half of a spring lookup: door-height chips, a search box and the
 * rows themselves.
 *
 * Shared by the Extension Springs tab and the stock block under the torsion
 * configurator, because they are the same job — the counter knows the door
 * height, or knows the colour code, and wants the row either way. Search
 * ignores the chip so a colour code always finds its spring.
 *
 * Purely a picker: the caller owns the selection and everything downstream of
 * it, which is what lets the torsion tab feed one quote card from two sources.
 */
export function SpringPicker({
  category,
  picked,
  onPick,
  testId,
  heading,
}: {
  category: PartCategory;
  picked: string | null;
  onPick: (name: string) => void;
  testId: string;
  heading: string;
}) {
  const groups: SpringGroup[] = useMemo(() => springGroups(category), [category]);
  const [group, setGroup] = useState(ALL);
  const [query, setQuery] = useState("");

  const searching = query.trim().length > 0;

  const rows: Part[] = useMemo(() => {
    if (searching) {
      const q = query.trim().toLowerCase();
      return category.items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q),
      );
    }
    if (group === ALL) return category.items;
    return groups.find((g) => g.label === group)?.items ?? [];
  }, [searching, query, group, groups, category.items]);

  return (
    <div className="step">
      <div className="ggroup">
        <div className="ghdr">{heading}</div>
        <div className="gbody">
          <div className="grow">
            <label>Door height</label>
            <div className="ctl">
              <div className="chips">
                <button
                  type="button"
                  className={`chip ${group === ALL && !searching ? "sel" : ""}`}
                  onClick={() => {
                    setGroup(ALL);
                    setQuery("");
                  }}
                >
                  All ({category.items.length})
                </button>
                {groups.map((g) => (
                  <button
                    key={g.label}
                    type="button"
                    className={`chip ${group === g.label && !searching ? "sel" : ""}`}
                    onClick={() => {
                      setGroup(g.label);
                      setQuery("");
                    }}
                  >
                    {g.label} ({g.items.length})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grow">
            <label>Search</label>
            <div className="ctl">
              <input
                data-testid={`${testId}-search`}
                type="search"
                placeholder="Colour code or size"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="muted-note" style={{ marginTop: 6 }}>
              {searching
                ? `${rows.length} match${rows.length === 1 ? "" : "es"} at every height`
                : "Searches every height at once"}
            </div>
          </div>
        </div>
      </div>

      <div className="ggroup" style={{ marginTop: 14 }}>
        <ul className="partlist" data-testid={`${testId}-list`}>
          {rows.length === 0 && (
            <li className="partempty">Nothing matches that — try fewer letters.</li>
          )}
          {rows.map((p) => (
            <li key={p.name}>
              <button
                type="button"
                className={`partrow ${picked === p.name ? "on" : ""}`}
                onClick={() => onPick(p.name)}
              >
                <span className="partname">
                  {p.name}
                  {p.sub && <span className="partsub">{p.sub}</span>}
                </span>
                <span className="partprice">{fmt(p.price)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
