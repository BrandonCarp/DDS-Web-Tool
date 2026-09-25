/**
 * Inventory: what can be counted, and what a scan does to the count.
 *
 * Shelf parts only for now. A part is identified by its category and name as
 * the price book spells them ("CATEGORY|NAME"). Barcodes live in the database,
 * not in parts.ts — that file is regenerated from the price books, and a
 * barcode typed into it would be wiped the next time.
 *
 * Nothing here touches the database, so it runs the same in the browser, the
 * API routes and the tests.
 */
import { SHELF_PART_CATEGORIES } from "@/lib/pricing/data/springs";

export type StockItem = {
  key: string; category: string; name: string; desc: string; price: number;
  /** Photo shown left of the part in the cart and the inventory lists. */
  photo?: string;
};

/** Part photos, served from public/parts — Brandon, 25/9/2026. */
const PART_PHOTOS: Record<string, string> = {
  'FASTENERS|1/4" X 3/4" TEK': "/parts/tek.webp",
  "FASTENERS|TRACK NUTS": "/parts/track-nuts.webp",
  'FASTENERS|3/8" FLAT WASHERS': "/parts/flat-washers-3-8.webp",
};

/** Every shelf part, keyed — so any of them can be switched on later. */
export const SHELF_ITEMS: StockItem[] = SHELF_PART_CATEGORIES.flatMap((c) =>
  c.items.map((p) => {
    const key = `${c.name}|${p.name}`;
    return { key, category: c.name, name: p.name, desc: p.desc, price: p.price, photo: PART_PHOTOS[key] };
  }),
);

/**
 * What is actually counted right now: three fastener bags, while the scanner is
 * tried out — Brandon, 25/9/2026. Adding a part is adding its key to this list
 * (CATEGORY|NAME exactly as parts.ts spells them; a test catches a typo).
 */
export const TRACKED_KEYS: readonly string[] = [
  'FASTENERS|1/4" X 3/4" TEK',
  "FASTENERS|TRACK NUTS",
  'FASTENERS|3/8" FLAT WASHERS',
];

export const STOCK_ITEMS: StockItem[] = SHELF_ITEMS.filter((i) => TRACKED_KEYS.includes(i.key));

const BY_KEY = new Map(STOCK_ITEMS.map((i) => [i.key, i]));

export function findStockItem(key: string): StockItem | null {
  return BY_KEY.get(key) ?? null;
}

export type ScanMode = "pull" | "put_away" | "count";
export const SCAN_MODES: readonly ScanMode[] = ["pull", "put_away", "count"];

export function isScanMode(v: unknown): v is ScanMode {
  return typeof v === "string" && (SCAN_MODES as readonly string[]).includes(v);
}

/** The scanner types the code and presses Enter; trim anything around it. */
export function cleanCode(raw: unknown): string | null {
  const c = String(raw ?? "").trim();
  return c && c.length <= 128 && !/[\r\n\t]/.test(c) ? c : null;
}

/** How many a scan moves. A count is what is on the shelf, so zero is allowed. */
export function parseQty(mode: ScanMode, raw: unknown): number | null {
  const n = Number(raw);
  if (!Number.isInteger(n)) return null;
  if (mode === "count") return n >= 0 && n <= 99999 ? n : null;
  return n >= 1 && n <= 9999 ? n : null;
}

/**
 * The line a scan adds. Pull takes away, put away adds. A count sets the shelf
 * to what was counted, so its line is the difference from what the lines so
 * far add up to — the history stays a plain sum.
 */
export function changeFor(mode: ScanMode, qty: number, onHand: number): number {
  if (mode === "pull") return -qty;
  if (mode === "put_away") return qty;
  return qty - onHand;
}
