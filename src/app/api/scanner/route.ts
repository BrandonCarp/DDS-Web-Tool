import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { cleanCode, findStockItem } from "@/lib/inventory";
import { categoryItem } from "@/lib/pricing/data/quickbooks";

/**
 * What a scanned barcode is, for the Scanner tab's cart: the part, its price
 * for one, and the QuickBooks item it goes under. Anyone signed in may ask —
 * the Scanner is every counter's tab. Only linked barcodes answer; linking a
 * new one stays in Inventory, which only the admin sees.
 *
 * Read-only: a cart scan does not change stock.
 */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const code = cleanCode(b.code);
  if (!code) return NextResponse.json({ error: "No barcode read" }, { status: 400 });

  const [link] = await query<{ item_key: string }>("select item_key from barcodes where code = $1", [code]);
  const item = link ? findStockItem(link.item_key) : null;
  if (!item) return NextResponse.json({ notLinked: true, code }, { status: 404 });
  return NextResponse.json({ code, item: { ...item, qbItem: categoryItem(item.category) } });
}
