import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  await query(
    `insert into estimates(user_id, username, model, size, style, color, unit_price, qty, total, description)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
    [
      user.id, user.username,
      String(b.model ?? ""), String(b.size ?? ""),
      b.style ? String(b.style) : null, b.color ? String(b.color) : null,
      Number(b.unitPrice) || 0, Number(b.qty) || 1, Number(b.total) || 0,
      b.description ? String(b.description) : null,
    ],
  );
  return NextResponse.json({ ok: true });
}
