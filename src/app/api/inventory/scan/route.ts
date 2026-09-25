import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { inventoryUser } from "@/lib/inventory-auth";
import { changeFor, cleanCode, findStockItem, isScanMode, parseQty } from "@/lib/inventory";

/**
 * One scan: find the part the barcode belongs to, add a line to stock_moves,
 * and send back the part and what is now on hand. A barcode nobody has linked
 * yet comes back as 404 { notLinked } so the tab can offer to link it.
 */
export async function POST(req: Request) {
  const user = await inventoryUser();
  if (user instanceof NextResponse) return user;
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const code = cleanCode(b.code);
  if (!code) return NextResponse.json({ error: "No barcode read" }, { status: 400 });
  if (!isScanMode(b.mode)) return NextResponse.json({ error: "Pick pull, put away or count" }, { status: 400 });
  const qty = parseQty(b.mode, b.qty ?? 1);
  if (qty === null) return NextResponse.json({ error: "Check the quantity" }, { status: 400 });

  const [link] = await query<{ item_key: string }>("select item_key from barcodes where code = $1", [code]);
  if (!link) return NextResponse.json({ notLinked: true, code }, { status: 404 });

  // sum() of an integer column comes back from Postgres as a bigint string.
  const [row] = await query<{ on_hand: string | number }>(
    "select coalesce(sum(change), 0) as on_hand from stock_moves where item_key = $1",
    [link.item_key],
  );
  const before = Number(row?.on_hand ?? 0);
  const change = changeFor(b.mode, qty, before);
  const [move] = await query<{ id: string | number }>(
    `insert into stock_moves (item_key, change, reason, code, username)
     values ($1, $2, $3, $4, $5) returning id`,
    [link.item_key, change, b.mode, code, user.username],
  );

  return NextResponse.json({
    ok: true,
    moveId: Number(move.id),
    code,
    mode: b.mode,
    item: findStockItem(link.item_key) ?? { key: link.item_key, category: "", name: link.item_key, desc: "", price: 0 },
    change,
    onHand: before + change,
  });
}
