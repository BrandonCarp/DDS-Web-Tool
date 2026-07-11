import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { query } from "@/lib/db";

// Type-ahead over the imported QuickBooks customer list. Names returned are
// the EXACT QB customer names, so anything quoted against them will match
// cleanly when estimates are generated for QuickBooks (IIF / Web Connector).
export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const raw = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  const q = raw.replace(/[%_\\]/g, ""); // literal prefix match — no wildcard injection
  try {
    // Empty query = the whole active list (click-to-browse). Otherwise PREFIX
    // match: "P" shows every customer starting with P, "PR" narrows to PR…
    // "*WALK IN" is also reachable without typing the asterisk.
    const customers = q.length === 0
      ? await query<{ qb_name: string; company: string | null; phone: string | null; bill_to: string | null }>(
          "select qb_name, company, phone, bill_to from customers where active order by qb_name limit 600",
        )
      : await query<{ qb_name: string; company: string | null; phone: string | null; bill_to: string | null }>(
          `select qb_name, company, phone, bill_to
             from customers
            where active and (qb_name ilike $1 or qb_name ilike $2)
            order by qb_name limit 600`,
          [`${q}%`, `*${q}%`],
        );
    return NextResponse.json({ customers });
  } catch {
    // table not migrated yet — behave as "no matches" rather than erroring
    return NextResponse.json({ customers: [] });
  }
}
