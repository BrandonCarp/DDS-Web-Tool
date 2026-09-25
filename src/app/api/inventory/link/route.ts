import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { inventoryUser } from "@/lib/inventory-auth";
import { cleanCode, findStockItem } from "@/lib/inventory";

/**
 * Link a barcode to a shelf part. A barcode belongs to one part only: linking
 * it to a second one is refused with 409 and names the part it is on, so a
 * mis-scan during setup cannot quietly move one part's count onto another.
 */
export async function POST(req: Request) {
  const user = await inventoryUser();
  if (user instanceof NextResponse) return user;
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const code = cleanCode(b.code);
  const item = findStockItem(String(b.itemKey ?? ""));
  if (!code || !item) return NextResponse.json({ error: "Pick a part and scan its barcode" }, { status: 400 });

  const added = await query<{ code: string }>(
    `insert into barcodes (code, item_key, linked_by) values ($1, $2, $3)
     on conflict (code) do nothing returning code`,
    [code, item.key, user.username],
  );
  if (added.length) return NextResponse.json({ ok: true, code, item });

  const [existing] = await query<{ item_key: string }>("select item_key from barcodes where code = $1", [code]);
  if (existing?.item_key === item.key) return NextResponse.json({ ok: true, code, item });
  const other = existing ? findStockItem(existing.item_key) : null;
  return NextResponse.json(
    { error: `That barcode is already linked to ${other?.name ?? existing?.item_key ?? "another part"}`, linkedTo: other },
    { status: 409 },
  );
}

/** Unlink a barcode — for the one linked to the wrong part. Its scans stay. */
export async function DELETE(req: Request) {
  const user = await inventoryUser();
  if (user instanceof NextResponse) return user;
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const code = cleanCode(b.code);
  if (!code) return NextResponse.json({ error: "No barcode" }, { status: 400 });
  const gone = await query<{ code: string }>("delete from barcodes where code = $1 returning code", [code]);
  return gone.length
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "That barcode is not linked" }, { status: 404 });
}
