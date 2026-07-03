import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminPanel, type AdminUser, type AdminEstimate } from "@/components/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
  const users = await query<AdminUser>(
    "select id, username, role, active, created_at from users order by created_at",
  );
  // last-31-days set powers the charts; the table shows the latest 100
  const monthEstimates = await query<AdminEstimate>(
    `select id, username, model, size, style, color, unit_price, qty, total, description, quote_type, created_at
       from estimates
      where created_at > now() - interval '31 days'
      order by created_at desc`,
  );
  const estimates = await query<AdminEstimate>(
    `select id, username, model, size, style, color, unit_price, qty, total, description, quote_type, created_at
       from estimates order by created_at desc limit 100`,
  );
  return (
    <div className="tool-shell">
      <AdminPanel
        users={users}
        estimates={estimates}
        monthEstimates={monthEstimates}
        meId={admin.id}
        master={admin.role === "admin"}
        username={admin.username}
      />
    </div>
  );
}
