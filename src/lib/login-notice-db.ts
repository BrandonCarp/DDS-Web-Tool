import { query } from "./db";
import { EMPTY_NOTICE, normalizeNotice, type LoginNotice } from "./login-notice";

/**
 * The sign-in notice in the database: kept in app_settings under one key.
 * The table is made on the first save, so nothing has to be migrated by hand;
 * a database without it reads as no notice, as does a notice switched off or
 * left blank. Server only — this pulls in the database driver.
 */
export const SETTINGS_TABLE_SQL = `create table if not exists app_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text
)`;

export async function readLoginNotice(): Promise<LoginNotice> {
  try {
    const rows = await query<{ value: unknown; updated_at: string; updated_by: string | null }>(
      "select value, updated_at, updated_by from app_settings where key = 'login_notice'",
    );
    const row = rows[0];
    if (!row) return EMPTY_NOTICE;
    return { ...normalizeNotice(row.value), updated_at: String(row.updated_at), updated_by: row.updated_by ?? undefined };
  } catch {
    return EMPTY_NOTICE; // the table is not there yet: no notice
  }
}

export async function writeLoginNotice(input: unknown, by: string): Promise<LoginNotice> {
  const n = normalizeNotice(input);
  await query(SETTINGS_TABLE_SQL);
  await query(
    `insert into app_settings (key, value, updated_at, updated_by) values ('login_notice', $1::jsonb, now(), $2)
     on conflict (key) do update set value = excluded.value, updated_at = now(), updated_by = excluded.updated_by`,
    [JSON.stringify(n), by],
  );
  return { ...n, updated_by: by };
}
