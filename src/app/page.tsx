import { AppShell } from "@/components/AppShell";
import { listModels } from "@/lib/pricing/engine";
import { requireUser } from "@/lib/auth";

export default async function Home() {
  const user = await requireUser();
  return (
    <div className="tool-shell">
      <AppShell models={listModels()} user={{ username: user.username, role: user.role }} />
    </div>
  );
}
