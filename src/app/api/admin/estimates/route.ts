import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { query } from "@/lib/db";

// Estimate management (edit / delete / clear last N) is MASTER-ADMIN only —
// same server-side rule as user management. Semi-admins see the dashboard
// but cannot change what people quoted.
async function ensureMaster() {
  const u = await getSessionUser();
  return u && u.role === "admin" ? u : null;
}

/** Edit an estimate: description, qty, unit price. Total is always recomputed
 *  server-side (unit_price × qty) so the numbers can never disagree. Model,
 *  size and style are deliberately NOT editable — if the door is wrong,
 *  re-quote it so the price comes from the engine, not from a keyboard. */
export async function PATCH(req: Request) {
  const admin = await ensureMaster();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const id = Number(b.id);
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const rows = await query<{ unit_price: string; qty: number }>(
    "select unit_price, qty from estimates where id = $1",
    [id],
  );
  if (!rows[0]) return NextResponse.json({ error: "Estimate not found" }, { status: 404 });

  const qty = b.qty !== undefined ? Math.trunc(Number(b.qty)) : rows[0].qty;
  const unit = b.unitPrice !== undefined ? Number(b.unitPrice) : Number(rows[0].unit_price);
  if (!Number.isFinite(qty) || qty < 1) return NextResponse.json({ error: "Quantity must be 1 or more" }, { status: 400 });
  if (!Number.isFinite(unit) || unit < 0) return NextResponse.json({ error: "Unit price must be a number" }, { status: 400 });

  await query(
    `update estimates
        set description = coalesce($1, description),
            qty = $2, unit_price = $3, total = $4
      where id = $5`,
    [b.description !== undefined ? String(b.description) : null, qty, unit, unit * qty, id],
  );
  return NextResponse.json({ ok: true });
}

/** Delete one estimate ({ id }) or clear the most recent N ({ last: n }, n ≤ 50). */
export async function DELETE(req: Request) {
  const admin = await ensureMaster();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  if (b.last !== undefined) {
    const n = Math.trunc(Number(b.last));
    if (!Number.isFinite(n) || n < 1 || n > 50)
      return NextResponse.json({ error: "last must be between 1 and 50" }, { status: 400 });
    const rows = await query<{ id: number }>(
      `delete from estimates
        where id in (select id from estimates order by created_at desc, id desc limit $1)
        returning id`,
      [n],
    );
    return NextResponse.json({ ok: true, deleted: rows.length });
  }

  const id = Number(b.id);
  if (!id) return NextResponse.json({ error: "id or last required" }, { status: 400 });
  const rows = await query<{ id: number }>("delete from estimates where id = $1 returning id", [id]);
  if (!rows.length) return NextResponse.json({ error: "Estimate not found" }, { status: 404 });
  return NextResponse.json({ ok: true, deleted: 1 });
}
