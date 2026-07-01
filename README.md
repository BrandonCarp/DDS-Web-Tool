# DDS Pricing — Web (Next.js)

Full-stack rebuild of the Doors Direct South pricing tool: the residential pricing engine
(verified identical to `index.html`), a matching UI + sign-in, and now a real backend —
individual logins, a master-admin, and an estimate log.

## Stack
- **Next.js** (App Router) + **React** + **TypeScript** + **Tailwind**
- **Postgres** via `pg` (works on Supabase / Vercel Postgres / local Postgres)
- **bcryptjs** password hashing + server-side sessions
- **Vitest** (unit) · **Playwright** (e2e) · ESLint · GitHub Actions CI

## Accounts & roles
`npm run db:init` seeds three logins (temp password **`ChangeMe123!`** — change them):
- **brandon** — admin
- **tom**, **cj** — users

Individual logins mean the admin can see *who* made each estimate and disable one person
without touching anyone else. **Admins** (only) get the `/admin` screen to:
- add users, enable/disable them, reset passwords, promote/demote admin
- review the **estimate log** (who quoted what, when, for how much)

Disabling a user is an instant, server-side **kill switch** — their session is dropped and
their next request/login is rejected.

## One-time setup
1. **Create a Postgres database.** Easiest is a free **Supabase** project (Project →
   Settings → Database → Connection string) or **Vercel Postgres**. Copy the connection URI.
2. Put it in `.env` (copy `.env.example`):
   ```
   DATABASE_URL="postgresql://…"
   ```
3. Install + create the tables + seed the accounts:
   ```bash
   npm install
   npm run db:init
   ```

## Run it
```bash
npm run dev        # http://localhost:3000  → sign in as brandon / ChangeMe123!
```

## Deploy (Vercel)
1. Push to a repo, import it in Vercel (Next.js auto-detected).
2. Add the **`DATABASE_URL`** environment variable (your Supabase/Vercel Postgres URI).
3. Run `npm run db:init` once against that database (locally with the prod `DATABASE_URL`,
   or via a one-off) to create the tables + seed the admin.

## Security model
- **Auth is server-side.** Every page/API re-checks the session against the DB, so access
  (and the kill switch) can't be bypassed from the browser.
- **Pricing is server-side.** `src/lib/pricing` is imported only by `/api/price`; the full
  catalog never ships to the client.
- For a **desktop shell**, an Electron thin-client can point at the deployed URL — empty
  shell, nothing local to copy.

## Structure (backend additions)
```
db/schema.sql                users, sessions, estimates
scripts/init-db.ts           applies schema + seeds accounts  (npm run db:init)
src/lib/db.ts                pg pool + query helper
src/lib/auth.ts              hashing, sessions, getSessionUser / requireUser / requireAdmin
src/app/api/login|logout     session cookie in/out
src/app/api/admin/users      create / enable-disable / reset-pw / role  (admin only)
src/app/api/estimates        log a saved estimate
src/app/admin/page.tsx       admin screen (users + estimate log)
src/components/AdminPanel.tsx
```

## Testing
```bash
npm run test        # unit (Vitest) — the pricing engine matrix (32 tests)
npm run typecheck
npm run lint
npm run test:e2e    # Playwright (needs DATABASE_URL + a seeded DB; CI provisions Postgres)
```

## Ported vs roadmap
Ported: residential quote (base + add-ons, verified vs index.html — 339 cases, 0 mismatches),
matching UI + "Select your door" flow, individual logins, master-admin + user management +
kill switch, estimate logging. Roadmap: Commercial / Torsion-Springs / Special-Order modes,
per-employee estimate filtering, QuickBooks, Electron thin-shell.
# DDS-Web-Tool
