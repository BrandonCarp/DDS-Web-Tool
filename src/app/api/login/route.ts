import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyPassword, createSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    /* ignore */
  }
  const username = String(body.username ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  const rows = await query<{ id: number; password_hash: string; active: boolean }>(
    "select id, password_hash, active from users where lower(username) = $1",
    [username],
  );
  const u = rows[0];
  if (!u || !u.active || !(await verifyPassword(password, u.password_hash))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { token, expires } = await createSession(u.id);

  // Record the login for the master-admin activity view. Location is
  // APPROXIMATE, derived from Vercel's IP-geo headers (city-level at best,
  // often just the ISP's hub) — never GPS. Failure here must never block a
  // login, and the try/catch also covers deploys made before the migration ran.
  try {
    const h = req.headers;
    const dec = (v: string | null) => {
      if (!v) return null;
      try { return decodeURIComponent(v); } catch { return v; }
    };
    const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || null;
    await query(
      "insert into login_events(user_id, ip, city, region, country) values ($1,$2,$3,$4,$5)",
      [u.id, ip, dec(h.get("x-vercel-ip-city")), dec(h.get("x-vercel-ip-country-region")), h.get("x-vercel-ip-country")],
    );
    await query("update users set last_login = now(), last_seen = now() where id = $1", [u.id]);
  } catch {
    /* activity logging is best-effort */
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", expires,
  });
  return res;
}
