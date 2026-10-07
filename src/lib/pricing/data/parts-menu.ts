/**
 * The drop-downs on the Parts and Track tabs — Brandon, 6/10/2026.
 *
 * Each drop-down is a group; each entry in it opens a page listing just those
 * parts. The groups are rules over the shelf data rather than copies of it, so
 * a price change on the sheet shows here with nothing to update.
 *
 * Nothing can go missing: a part the rules do not place lands on an "Other"
 * page in the group that covers its category, and a category no group covers
 * (a new one on the sheet) gets a drop-down of its own. parts-menu.test.ts
 * checks every part on each tab appears on exactly one page.
 *
 * To regroup something, edit a line below: the label is what the counter sees,
 * then the category it comes from, then which parts in it.
 */
import type { Part, PartCategory } from "./parts";
import { PARTS_TAB_CATEGORIES, TRACK_CATEGORIES } from "./springs";

export type MenuPart = { category: string; part: Part };
export type MenuEntry = { label: string; parts: MenuPart[] };
export type MenuGroup = { label: string; entries: MenuEntry[] };
export type PartsMenu = MenuGroup[];

type Test = (p: Part) => boolean;
const all: Test = () => true;
const name = (re: RegExp): Test => (p) => re.test(p.name);
const sub = (heading: string): Test => (p) => p.sub === heading;

/** One entry: its label, the category it draws from, and which parts. */
type Rule = [label: string, category: string, test: Test];
type Spec = { label: string; entries: Rule[] };

const cap = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

function build(specs: Spec[], categories: PartCategory[]): PartsMenu {
  const byName = new Map(categories.map((c) => [c.name, c]));
  const placed = new Set<Part>();
  const take = (category: string, test: Test): MenuPart[] => {
    const found = (byName.get(category)?.items ?? []).filter((p) => !placed.has(p) && test(p));
    found.forEach((p) => placed.add(p));
    return found.map((part) => ({ category, part }));
  };

  // The rules first, every group, so one group's leftovers cannot take parts a
  // later group names (Retainers and Seals both draw on RETAINERS).
  const menu: (MenuGroup & { cats: string[] })[] = specs.map((spec) => {
    const entries = spec.entries
      .map(([label, category, test]) => ({ label, parts: take(category, test) }))
      .filter((e) => e.parts.length > 0);
    return { label: spec.label, entries, cats: [...new Set(spec.entries.map(([, c]) => c))] };
  });

  // Then anything a group's categories still hold goes on an "Other" page there.
  for (const g of menu) {
    const left = g.cats.flatMap((c) => take(c, all));
    if (left.length) g.entries.push({ label: `Other ${g.label.toLowerCase()}`, parts: left });
  }
  const groups: PartsMenu = menu.filter((g) => g.entries.length > 0).map(({ label, entries }) => ({ label, entries }));

  // And a category no group covers gets a drop-down of its own.
  for (const c of categories) {
    const left = take(c.name, all);
    if (left.length) groups.push({ label: cap(c.name), entries: [{ label: cap(c.name), parts: left }] });
  }
  return groups;
}

/** The Parts tab. The first four are the ones Brandon set out; the rest follow the same idea. */
export const PARTS_MENU: PartsMenu = build(
  [
    { label: "Tools", entries: [
      ["Felco cutter", "TOOLS", name(/CABLE CUTTER/)],
      ["Multi cutter", "TOOLS", name(/^MULTI CUT$/)],
      ["Multi cutter blades", "TOOLS", name(/MULTI CUT BLADES/)],
      ["Pocket gauge", "TOOLS", name(/POCKET GAUGE/)],
      ["Torsion spring ruler", "TOOLS", name(/RULER/)],
      ["Staples", "TOOLS", name(/STAPLES/)],
      ["Spray lube", "TOOLS", name(/SPRAY LUBE/)],
      ["Winding bars", "WINDING BARS", all],
    ] },
    { label: "Angle", entries: [
      ["Galvanized", "ANGLE", name(/GALV/)],
      ["White", "ANGLE", name(/WHITE/)],
      ['2" x 2" x 10\'', "ANGLE", name(/2" X 2"/)],
    ] },
    { label: "Retainers", entries: [
      ["L retainers", "RETAINERS", name(/\bL RETAINER/)],
      ["U retainers", "RETAINERS", name(/\bU RETAINER/)],
      ["Universal bottom retainer", "RETAINERS", name(/UNIVERSAL BTM/)],
      ["Nail-on bottom wood rubber", "RETAINERS", name(/WOOD RUBBER/)],
      ["Aluminum retainers", "BRUSH SEAL / RETAINERS", name(/^ALUM/)],
    ] },
    { label: "Seals", entries: [
      ["Jamb seals", "RETAINERS", name(/JAMB SEAL/)],
      ["Rolling steel bottom seals", "RETAINERS", name(/ROLLING STEEL SEAL/)],
      ["Threshold seals", "RETAINERS", name(/THRESHOLD SEAL/)],
      ["Top header seals", "RETAINERS", name(/TOP HEADER SEAL/)],
      ["Bottom T rubbers", "RETAINERS", name(/BOTTOM T RUBBER/)],
      ["Brush seals", "BRUSH SEAL / RETAINERS", name(/BRUSH SEAL/)],
    ] },
    { label: "Drums", entries: [
      ["400 series", "DRUMS", name(/^400-/)],
      ["5250 series", "DRUMS", name(/^5250-/)],
      ["Other drums", "DRUMS", all],
    ] },
    { label: "Hinges", entries: [
      ["14 gauge", "HINGES", name(/14GA/)],
      ["11 gauge", "HINGES", name(/11GA/)],
      ["Half hinges & quick close", "HINGES", all],
    ] },
    { label: "Rollers", entries: [
      ["Short stem", "ROLLERS", name(/\bSS\b/)],
      ["Long stem", "ROLLERS", name(/\bLS\b/)],
    ] },
    { label: "Fasteners", entries: [
      ["Track bolts & nuts", "FASTENERS", name(/^TRACK (BOLTS|NUTS)/)],
      ["Eyebolts & S-hooks", "FASTENERS", name(/EYEBOLTS|S-HOOKS/)],
      ["Tek screws", "FASTENERS", name(/TEK/)],
      ["Lags", "FASTENERS", name(/LAGS/)],
      ["Bolts", "FASTENERS", name(/BOLTS/)],
      ["Nuts & washers", "FASTENERS", name(/NUTS|WASHERS/)],
    ] },
    { label: "Fixtures", entries: [
      ["Residential", "FIXTURES", name(/^RES /)],
      ["Commercial", "FIXTURES", name(/^(COMM|WD COMM) /)],
    ] },
    { label: "Pulleys", entries: [
      ["Pulleys", "PULLEYS", name(/PULLEY/)],
      ["Forks & clips", "PULLEYS", name(/FORK|CLIP/)],
    ] },
    { label: "Tube shafts", entries: [
      ["Tube shafts", "TUBE SHAFT", name(/TUBE SHAFT/)],
      ["Solid shafts", "TUBE SHAFT", name(/SOLID SHAFT/)],
      ["Collars", "COLLAR / COUPLING", name(/COLLAR/)],
      ["Couplings", "COLLAR / COUPLING", name(/COUPLING/)],
    ] },
    { label: "Bearings & plates", entries: [
      ["Bearings", "CENTER PLATES / BEARINGS", name(/BEARING|FOOTBALL/)],
      ["Anchor plates", "CENTER PLATES / BEARINGS", name(/ANCHOR PLATE/)],
      ["End bearing plates", "END BEARING PLATES", all],
    ] },
    { label: "Struts", entries: [
      ['3" struts', "STRUTS", name(/- 3"/)],
      ["Standard struts", "STRUTS", all],
    ] },
    { label: "Decorative hardware", entries: [
      ["Colonial", "DECORATIVE HARDWARE", name(/COLONIAL/)],
      ["Magnetic", "DECORATIVE HARDWARE", name(/MAGNETIC/)],
      ["Spade", "DECORATIVE HARDWARE", name(/SPADE/)],
      ["Spear", "DECORATIVE HARDWARE", name(/SPEAR/)],
      ["Twisted L", "DECORATIVE HARDWARE", name(/TWISTED L/)],
      ["Twisted T", "DECORATIVE HARDWARE", name(/TWISTED T/)],
      ["Other decorative", "DECORATIVE HARDWARE", all],
    ] },
    { label: "Jamb brackets", entries: [["Jamb brackets", "JAMB BRACKETS", all]] },
    { label: "Locks", entries: [["Locks", "LOCKS", all]] },
    { label: "Spring bumpers", entries: [["Spring bumpers", "SPRING BUMPERS", all]] },
    { label: "Spring kits", entries: [
      ["Extension kits", "EXTENSION KITS", all],
      ["Torsion kits", "TORSION KITS", all],
    ] },
    { label: "Trim nails", entries: [["Trim nails", "TRIM NAILS", all]] },
    { label: "Chain hoists", entries: [["Chain hoists", "CHAIN HOIST", all]] },
    { label: "Quick disconnect", entries: [["Quick disconnect", "QUICK DISCONNECT", all]] },
    { label: "Batteries", entries: [["Batteries", "BATTERIES", all]] },
    { label: "ARB / ORB", entries: [["ARB / ORB", "ARB", all]] },
  ],
  PARTS_TAB_CATEGORIES,
);

/**
 * The Track tab (6/10/2026): Complete track asks residential or commercial,
 * and each choice — and each of the other three buttons — then gives a
 * drop-down of its pieces.
 */
export const TRACK_MENU: PartsMenu = build(
  [
    { label: "Complete track", entries: [
      ["Residential", "TRACKS", sub("RESIDENTIAL TRACKS")],
      ["Commercial", "TRACKS", sub("COMMERCIAL TRACKS")],
    ] },
    { label: "Adder pieces", entries: [["Adder pieces", "TRACKS", sub("ADDER PIECES")]] },
    { label: "Raw track", entries: [["Raw track", "TRACKS", sub("RAW TRACK")]] },
    { label: "Pierced track", entries: [["Pierced track", "TRACKS", sub("PIERCED TRACK")]] },
  ],
  TRACK_CATEGORIES,
);

/**
 * Parts groups that are tabs of their own in the side nav, after Parts, like
 * Residential and Commercial — Brandon, 6/10/2026. The Parts tab keeps the
 * rest. Each tab shows its group's pages and searches only its own parts.
 */
export const PART_GROUP_TABS = [
  { id: "tools", group: "Tools", icon: "wrench" },
  { id: "angle", group: "Angle", icon: "angle" },
  { id: "retainers", group: "Retainers", icon: "retainer" },
  { id: "seals", group: "Seals", icon: "seal" },
  { id: "tubeshafts", group: "Tube shafts", icon: "shaft" },
  { id: "struts", group: "Struts", icon: "strut" },
] as const;

const tabbed = new Set<string>(PART_GROUP_TABS.map((t) => t.group));

/** The Parts tab's own groups: all but those with a tab of their own. */
export const PARTS_TAB_MENU: PartsMenu = PARTS_MENU.filter((g) => !tabbed.has(g.label));

/** Each group tab: its one-group menu, and a shelf of only its own parts to search. */
export const GROUP_TABS = PART_GROUP_TABS.map((t) => {
  const g = PARTS_MENU.find((x) => x.label === t.group);
  const shelf = new Map<string, Part[]>();
  for (const e of g?.entries ?? []) for (const mp of e.parts) shelf.set(mp.category, [...(shelf.get(mp.category) ?? []), mp.part]);
  return { ...t, menu: g ? [g] : [], categories: [...shelf].map(([n, items]) => ({ name: n, items })) as PartCategory[] };
});

/** The tab a shelf part is sold from: its group's own tab, or Parts. */
export function tabForPart(category: string, partName: string): string {
  const t = GROUP_TABS.find((x) => x.categories.some((c) => c.name === category && c.items.some((p) => p.name === partName)));
  return t?.id ?? "parts";
}

/** The page id the tool keeps: "Group|Entry". */
export const slugOf = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const entryId = (group: MenuGroup, entry: MenuEntry) => `${group.label}|${entry.label}`;
