"use client";

import { entryId, slugOf, type PartsMenu } from "@/lib/pricing/data/parts-menu";

/**
 * Buttons for the Parts, group and Track tabs — Brandon, 6/10/2026: an even
 * grid of groups, and under the chosen group a row of its pages. Plain buttons
 * rather than pop-up menus, so everything is in view. A tab with one group
 * (Tools, Retainers…) shows just its pages.
 */
export function PartsNavigator({ menu, group, page, onGroup, onPage }: {
  menu: PartsMenu;
  group: string | null;
  page: string | null;
  onGroup: (label: string) => void;
  onPage: (id: string) => void;
}) {
  const alone = menu.length === 1;
  const open = alone ? menu[0] : menu.find((g) => g.label === group) ?? null;
  const pages = open && open.entries.length > 1 && (
    <div className="pnav-pages" role="group" aria-label={open.label} data-alone={alone || undefined}>
      {open.entries.map((e) => {
        const id = entryId(open, e);
        return (
          <button
            key={id}
            type="button"
            data-testid={`page-${slugOf(e.label)}`}
            className={`pnav-page${id === page ? " on" : ""}`}
            aria-pressed={id === page}
            onClick={() => onPage(id)}
          >
            {e.label}
          </button>
        );
      })}
    </div>
  );
  return (
    <div className="pnav" data-testid="parts-nav">
      {!alone && (
        <div className="pnav-groups">
          {menu.map((g) => (
            <button
              key={g.label}
              type="button"
              data-testid={`group-${slugOf(g.label)}`}
              className={`pnav-btn${g.label === group ? " on" : ""}`}
              aria-pressed={g.label === group}
              onClick={() => onGroup(g.label)}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}
      {pages}
    </div>
  );
}
