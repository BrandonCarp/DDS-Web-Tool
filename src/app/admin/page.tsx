import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminPanel, type AdminUser, type AdminEstimate } from "@/components/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
  const users = await query<AdminUser>(
    "select id, username, role, active, created_at from users order by created_at",
  );
  const estimates = await query<AdminEstimate>(
    `select id, username, model, size, style, color, unit_price, qty, total, created_at
       from estimates order by created_at desc limit 100`,
  );
  return (
    <div className="tool-shell">
      <header className="top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="/logo.png" alt="Doors Direct" />
        <nav className="tabs">
          <Link href="/" className="tab">‹ Back to tool</Link>
        </nav>
        <div className="right">Admin · {admin.username}</div>
      </header>
      <AdminPanel users={users} estimates={estimates} meId={admin.id} />
    </div>
  );
}
