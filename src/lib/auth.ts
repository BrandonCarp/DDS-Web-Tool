import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { query } from "./db";

export const SESSION_COOKIE = "dds_session";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export type Role = "admin" | "semiadmin" | "user";
export interface User {
  id: number;
  username: string;
  role: Role;
  active: boolean;
}

export function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 10);
}
export function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TTL_MS);
  await query("insert into sessions(token, user_id, expires_at) values ($1,$2,$3)", [
    token,
    userId,
    expires,
  ]);
  return { token, expires };
}

export async function destroySession(token: string) {
  await query("delete from sessions where token = $1", [token]);
}

// Authoritative check on every request: valid session, not expired, user still active.
// Disabling a user (active=false) locks them out immediately.
export async function getSessionUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const rows = await query<{
    id: number; username: string; role: Role; active: boolean; expires_at: string;
  }>(
    `select u.id, u.username, u.role, u.active, s.expires_at
       from sessions s join users u on u.id = s.user_id
      where s.token = $1`,
    [token],
  );
  const r = rows[0];
  if (!r) return null;
  if (new Date(r.expires_at) < new Date()) {
    await destroySession(token);
    return null;
  }
  if (!r.active) return null;
  // Keep "last active" fresh without a write per click: at most one update
  // every 5 minutes, and never let it break auth (also covers pre-migration deploys).
  try {
    await query(
      "update users set last_seen = now() where id = $1 and (last_seen is null or last_seen < now() - interval '5 minutes')",
      [r.id],
    );
  } catch {
    /* best-effort */
  }
  return { id: r.id, username: r.username, role: r.role, active: r.active };
}

export async function requireUser(): Promise<User> {
  const u = await getSessionUser();
  if (!u) redirect("/login");
  return u;
}

// Admin Dashboard access: full admins AND semi-admins.
export async function requireAdmin(): Promise<User> {
  const u = await requireUser();
  if (u.role !== "admin" && u.role !== "semiadmin") redirect("/");
  return u;
}

// User management (create accounts, roles, passwords, enable/disable): full admins only.
export async function requireMasterAdmin(): Promise<User> {
  const u = await requireUser();
  if (u.role !== "admin") redirect("/");
  return u;
}
