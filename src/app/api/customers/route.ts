import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { query } from "@/lib/db";

// Type-ahead over the imported QuickBooks customer list. Names returned are
// the EXACT QB customer names, so anything quoted against them will match
// cleanly when estimates are generated for QuickBooks (IIF / Web Connector).
export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ customers: [] });
  try {
    const customers = await query<{ qb_name: string; company: string | null; phone: string | null }>(
      `select qb_name, company, phone
         from customers
        where active and (qb_name ilike $1 or company ilike $1)
        order by qb_name limit 10`,
      [`%${q}%`],
    );
    return NextResponse.json({ customers });
  } catch {
    // table not migrated yet — behave as "no matches" rather than erroring
    return NextResponse.json({ customers: [] });
  }
}
