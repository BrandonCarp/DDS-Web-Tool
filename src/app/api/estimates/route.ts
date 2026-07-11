import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const QUOTE_TYPES = new Set(["residential", "commercial", "special", "spring"]);
  const quoteType = QUOTE_TYPES.has(String(b.quoteType)) ? String(b.quoteType) : "residential";
  const base = [
    user.id, user.username,
    String(b.model ?? ""), String(b.size ?? ""),
    b.style ? String(b.style) : null, b.color ? String(b.color) : null,
    Number(b.unitPrice) || 0, Number(b.qty) || 1, Number(b.total) || 0,
    b.description ? String(b.description) : null,
    quoteType,
  ];
  const trimmed = (v: unknown) => {
    const t = String(v ?? "").trim();
    return t ? t : null;
  };
  try {
    await query(
      `insert into estimates(user_id, username, model, size, style, color, unit_price, qty, total, description, quote_type, customer, po_number, job_name)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [...base, trimmed(b.customer), trimmed(b.poNumber), trimmed(b.jobName)],
    );
  } catch {
    // customer/PO/job columns not migrated yet — save the quote without them
    await query(
      `insert into estimates(user_id, username, model, size, style, color, unit_price, qty, total, description, quote_type)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      base,
    );
  }
  return NextResponse.json({ ok: true });
}
