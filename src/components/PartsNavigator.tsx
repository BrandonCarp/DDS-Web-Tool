"use client";

import { entryId, slugOf, type MenuGroup, type PartsMenu } from "@/lib/pricing/data/parts-menu";

/**
 * The buttons of the Parts, Track and group tabs, one level at a time —
 * Brandon's wireframe, 12/10/2026. Before a group is chosen, the groups are
 * stacked one under the other with a gap between them; choosing one hides
 * the rest and stacks its pages the same way; choosing a page hides those
 * too and the part list takes their place (PartsTool draws the header with
 * the Back button above whichever level is showing). A tab with one group
 * (Tools, Retainers…) starts on its pages.
 */
export function PartsNavigator({ menu, open, page, onGroup, onPage }: {
  menu: PartsMenu;
  /** The group whose pages are showing, or null for the groups themselves. */
  open: MenuGroup | null;
  page: string | null;
  onGroup: (label: string) => void;
  onPage: (id: string) => void;
}) {
  if (open) {
    return (
      <div className="pnav stack" data-testid="parts-nav">
        <div className="pnav-pages" role="group" aria-label={open.label} data-alone={menu.length === 1 || undefined}>
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
      </div>
    );
  }
  // A long list of groups — the Parts tab's seventeen — runs two across so it
  // fits the screen (Brandon, 12/10/2026); the short lists stay one under the
  // other. Two across reads DOWN the first column and then the second, so an
  // A-to-Z list scans the way a directory does: the rows are counted out here.
  const two = menu.length > 8;
  return (
    <div className="pnav stack" data-testid="parts-nav">
      <div className={`pnav-groups${two ? " two" : ""}`} style={two ? { gridTemplateRows: `repeat(${Math.ceil(menu.length / 2)}, auto)` } : undefined}>
        {menu.map((g) => (
          <button
            key={g.label}
            type="button"
            data-testid={`group-${slugOf(g.label)}`}
            className="pnav-btn"
            onClick={() => onGroup(g.label)}
          >
            {g.label}
          </button>
        ))}
      </div>
    </div>
  );
}
