import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { inventoryUser } from "@/lib/inventory-auth";

/**
 * Take back one scan — by its id, and only your own, so an Undo can never
 * remove someone else's scan that landed in between.
 */
export async function POST(req: Request) {
  const user = await inventoryUser();
  if (user instanceof NextResponse) return user;
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const id = Number(b.moveId);
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "Nothing to undo" }, { status: 400 });

  const [gone] = await query<{ item_key: string }>(
    "delete from stock_moves where id = $1 and username = $2 returning item_key",
    [id, user.username],
  );
  if (!gone) return NextResponse.json({ error: "That scan is not yours to undo, or is already gone" }, { status: 404 });
  const [row] = await query<{ on_hand: string | number }>(
    "select coalesce(sum(change), 0) as on_hand from stock_moves where item_key = $1",
    [gone.item_key],
  );
  return NextResponse.json({ ok: true, onHand: Number(row?.on_hand ?? 0) });
}
