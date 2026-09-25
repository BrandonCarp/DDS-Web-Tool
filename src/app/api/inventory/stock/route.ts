import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { inventoryUser } from "@/lib/inventory-auth";
import { findStockItem } from "@/lib/inventory";

/** What is on hand for every part that has a barcode or a scan. */
export async function GET() {
  const user = await inventoryUser();
  if (user instanceof NextResponse) return user;
  const sums = await query<{ item_key: string; on_hand: string | number }>(
    "select item_key, sum(change) as on_hand from stock_moves group by item_key",
  );
  const codes = await query<{ code: string; item_key: string }>("select code, item_key from barcodes order by code");

  const rows = new Map<string, { onHand: number; codes: string[] }>();
  const row = (key: string) => rows.get(key) ?? rows.set(key, { onHand: 0, codes: [] }).get(key)!;
  for (const s of sums) row(s.item_key).onHand = Number(s.on_hand);
  for (const c of codes) row(c.item_key).codes.push(c.code);

  const items = [...rows].map(([key, r]) => {
    const item = findStockItem(key);
    return { key, name: item?.name ?? key, desc: item?.desc ?? "", category: item?.category ?? "", photo: item?.photo, ...r };
  });
  items.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  return NextResponse.json({ items });
}
