import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { readLoginNotice, writeLoginNotice } from "@/lib/login-notice-db";

// The sign-in notice (Brandon, 20/10/2026): read and written by the master
// admin alone, from the admin panel.
async function master() {
  const u = await getSessionUser();
  return u && u.role === "admin" ? u : null;
}

export async function GET() {
  if (!(await master())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ notice: await readLoginNotice() });
}

export async function PUT(req: Request) {
  const admin = await master();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  try {
    return NextResponse.json({ ok: true, notice: await writeLoginNotice(body, admin.username) });
  } catch {
    return NextResponse.json({ error: "Could not save the notice" }, { status: 500 });
  }
}
