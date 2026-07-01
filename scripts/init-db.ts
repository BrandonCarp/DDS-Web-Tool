import "dotenv/config";
import { readFileSync } from "node:fs";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set (see .env)");
  const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
  await pool.query(schema);
  console.log("✓ schema applied");

  const seed: Array<[string, string, "admin" | "user"]> = [
    ["brandon", "ChangeMe123!", "admin"],
    ["tom", "ChangeMe123!", "user"],
    ["cj", "ChangeMe123!", "user"],
  ];
  for (const [username, pw, role] of seed) {
    const hash = await bcrypt.hash(pw, 10);
    await pool.query(
      `insert into users(username, password_hash, role) values ($1,$2,$3)
       on conflict (username) do nothing`,
      [username.toLowerCase(), hash, role],
    );
  }
  console.log("✓ seeded users: brandon (admin), tom, cj — temp password: ChangeMe123!");
  await pool.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
