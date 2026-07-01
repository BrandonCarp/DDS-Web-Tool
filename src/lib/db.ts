import { Pool } from "pg";

// Single shared pool (survives dev hot-reload).
const g = globalThis as unknown as { _pgPool?: Pool };
export const pool =
  g._pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") g._pgPool = pool;

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows as T[];
}
