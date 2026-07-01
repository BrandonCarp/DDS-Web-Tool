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
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", expires,
  });
  return res;
}
