import { beforeEach, describe, expect, it, vi } from "vitest";
import { STOCK_ITEMS } from "./inventory";

// Not next to the route: Next would treat a route.test.ts there as a route.
const fake = vi.hoisted(() => ({
  user: null as null | { id: number; username: string; role: string },
  calls: [] as { sql: string; params: unknown[] }[],
  replies: [] as unknown[][],
}));
vi.mock("@/lib/auth", () => ({ getSessionUser: async () => fake.user }));
vi.mock("@/lib/db", () => ({
  query: async (sql: string, params: unknown[] = []) => {
    fake.calls.push({ sql, params });
    return fake.replies.shift() ?? [];
  },
}));
const { POST } = await import("@/app/api/scanner/route");

const TEK = STOCK_ITEMS[0];
const ask = (code: unknown) =>
  POST(new Request("http://localhost/api/scanner", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code }),
  }));

beforeEach(() => {
  fake.user = { id: 3, username: "tom", role: "user" };
  fake.calls = [];
  fake.replies = [];
});

describe("scanner route", () => {
  it("answers any signed-in counter, not only the admin", async () => {
    fake.replies = [[{ item_key: TEK.key }]];
    const r = await ask("012345678905");
    expect(r.status).toBe(200);
    const { item } = await r.json();
    expect(item).toMatchObject({ key: TEK.key, name: TEK.name, price: TEK.price, photo: TEK.photo });
    expect(item.qbItem).toBeTruthy();
  });

  it("turns away a signed-out request", async () => {
    fake.user = null;
    expect((await ask("012345678905")).status).toBe(401);
  });

  it("says so when a barcode is not linked yet", async () => {
    fake.replies = [[]];
    const r = await ask("999");
    expect(r.status).toBe(404);
    expect(await r.json()).toMatchObject({ notLinked: true, code: "999" });
  });

  it("only reads — a cart scan never touches stock", async () => {
    fake.replies = [[{ item_key: TEK.key }]];
    await ask("012345678905");
    expect(fake.calls.every((c) => /^\s*select/i.test(c.sql))).toBe(true);
  });
});
