import { NextResponse } from "next/server";
import { getSessionUser, type User } from "@/lib/auth";

/**
 * Who may use the inventory routes. The master admin only while it is being
 * tested — the Inventory tab is hidden from everyone else. The warehouse login
 * gets added here, in one place, when it exists.
 */
export async function inventoryUser(): Promise<User | NextResponse> {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Inventory is admin-only for now" }, { status: 403 });
  }
  return user;
}
