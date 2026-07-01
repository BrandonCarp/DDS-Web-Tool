import { NextResponse } from "next/server";
import { getSessionUser, hashPassword } from "@/lib/auth";
import { query } from "@/lib/db";

async function ensureAdmin() {
  const u = await getSessionUser();
  return u && u.role === "admin" ? u : null;
}

export async function POST(req: Request) {
  const admin = await ensureAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const username = String(b.username ?? "").trim().toLowerCase();
  const password = String(b.password ?? "");
  const role = b.role === "admin" ? "admin" : "user";
  if (!username || password.length < 6)
    return NextResponse.json({ error: "Username and a 6+ character password are required" }, { status: 400 });
  const exists = await query("select 1 from users where username = $1", [username]);
  if (exists.length) return NextResponse.json({ error: "That username already exists" }, { status: 409 });
  await query("insert into users(username, password_hash, role) values ($1,$2,$3)", [
    username, await hashPassword(password), role,
  ]);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  const admin = await ensureAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const id = Number(b.id);
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  if (id === admin.id && (b.active === false || b.role === "user"))
    return NextResponse.json({ error: "You can't disable or demote your own admin account" }, { status: 400 });

  if (typeof b.active === "boolean") {
    await query("update users set active = $1 where id = $2", [b.active, id]);
    if (!b.active) await query("delete from sessions where user_id = $1", [id]); // kick immediately
  }
  if (b.role === "admin" || b.role === "user")
    await query("update users set role = $1 where id = $2", [b.role, id]);
  if (b.password && String(b.password).length >= 6)
    await query("update users set password_hash = $1 where id = $2", [await hashPassword(String(b.password)), id]);
  return NextResponse.json({ ok: true });
}
