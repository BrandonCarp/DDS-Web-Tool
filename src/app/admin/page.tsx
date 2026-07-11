import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { AdminPanel, type AdminUser, type AdminEstimate, type LoginEvent } from "@/components/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
  const master = admin.role === "admin";
  // Extended columns exist after the login-tracking migration; fall back
  // gracefully if it hasn't been run yet.
  let users: AdminUser[];
  try {
    users = await query<AdminUser>(
      "select id, username, role, active, created_at, last_login, last_seen from users order by created_at",
    );
  } catch {
    users = await query<AdminUser>(
      "select id, username, role, active, created_at from users order by created_at",
    );
  }
  // Sign-in activity is MASTER-ADMIN only — the data never leaves the server
  // for semi-admins.
  let logins: LoginEvent[] = [];
  if (master) {
    try {
      logins = await query<LoginEvent>(
        `select e.id, e.at, e.ip, e.city, e.region, e.country, u.username
           from login_events e join users u on u.id = e.user_id
          where e.at > now() - interval '14 days'
          order by e.at desc limit 60`,
      );
    } catch {
      /* table not migrated yet */
    }
  }
  // last-31-days set powers the charts; the table shows the latest 100.
  // customer/po/job columns exist after the customers migration — fall back if not.
  const baseCols = "id, username, model, size, style, color, unit_price, qty, total, description, quote_type, created_at";
  let monthEstimates: AdminEstimate[];
  let estimates: AdminEstimate[];
  try {
    monthEstimates = await query<AdminEstimate>(
      `select ${baseCols}, customer, po_number, job_name from estimates
        where created_at > now() - interval '31 days' order by created_at desc`,
    );
    estimates = await query<AdminEstimate>(
      `select ${baseCols}, customer, po_number, job_name from estimates order by created_at desc limit 100`,
    );
  } catch {
    monthEstimates = await query<AdminEstimate>(
      `select ${baseCols} from estimates where created_at > now() - interval '31 days' order by created_at desc`,
    );
    estimates = await query<AdminEstimate>(
      `select ${baseCols} from estimates order by created_at desc limit 100`,
    );
  }
  return (
    <div className="tool-shell admin-page">
      <AdminPanel
        users={users}
        estimates={estimates}
        monthEstimates={monthEstimates}
        logins={logins}
        meId={admin.id}
        master={master}
        username={admin.username}
      />
    </div>
  );
}
