import { beforeEach, describe, expect, it, vi } from "vitest";
import { SHELF_ITEMS, STOCK_ITEMS } from "./inventory";

// Not next to the routes: Next would treat a route.test.ts there as a route.
// Login and database are faked — the routes' own decisions are what is tested.
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

const scan = await import("@/app/api/inventory/scan/route");
const link = await import("@/app/api/inventory/link/route");
const undo = await import("@/app/api/inventory/undo/route");
const stock = await import("@/app/api/inventory/stock/route");

const TEK = STOCK_ITEMS.find((i) => i.name === '1/4" X 3/4" TEK')!;
const req = (body: unknown, method = "POST") =>
  new Request("http://localhost/api/inventory", {
    method, headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });

beforeEach(() => {
  fake.user = { id: 1, username: "brandon", role: "admin" };
  fake.calls = [];
  fake.replies = [];
});

describe("inventory routes — who may use them", () => {
  it("turns away a signed-out request", async () => {
    fake.user = null;
    expect((await scan.POST(req({ code: "1", mode: "pull" }))).status).toBe(401);
  });

  it("turns away everyone but the master admin while it is tested", async () => {
    fake.user = { id: 2, username: "tom", role: "semiadmin" };
    expect((await scan.POST(req({ code: "1", mode: "pull" }))).status).toBe(403);
    expect((await stock.GET()).status).toBe(403);
    expect(fake.calls).toEqual([]);
  });
});

describe("scan route", () => {
  it("says so when a barcode is not linked yet", async () => {
    fake.replies = [[]];
    const r = await scan.POST(req({ code: "012345", mode: "pull" }));
    expect(r.status).toBe(404);
    expect(await r.json()).toMatchObject({ notLinked: true, code: "012345" });
  });

  it("records a pull as minus the quantity, and returns what is left", async () => {
    fake.replies = [[{ item_key: TEK.key }], [{ on_hand: "10" }], [{ id: "7" }]];
    const j = await (await scan.POST(req({ code: "012345", mode: "pull", qty: 2 }))).json();
    expect(j).toMatchObject({ ok: true, moveId: 7, change: -2, onHand: 8 });
    expect(j.item.name).toBe(TEK.name);
    expect(fake.calls[2].params).toEqual([TEK.key, -2, "pull", "012345", "brandon"]);
  });

  it("records a count as the difference from what the shelf had", async () => {
    fake.replies = [[{ item_key: TEK.key }], [{ on_hand: "10" }], [{ id: "8" }]];
    const j = await (await scan.POST(req({ code: "012345", mode: "count", qty: 7 }))).json();
    expect(j).toMatchObject({ change: -3, onHand: 7 });
  });

  it("refuses a pull of zero before touching the database", async () => {
    expect((await scan.POST(req({ code: "012345", mode: "pull", qty: 0 }))).status).toBe(400);
    expect(fake.calls).toEqual([]);
  });
});

describe("link route", () => {
  it("links a barcode to a shelf part", async () => {
    fake.replies = [[{ code: "012345" }]];
    const r = await link.POST(req({ code: "012345", itemKey: TEK.key }));
    expect(r.status).toBe(200);
    expect(fake.calls[0].params).toEqual(["012345", TEK.key, "brandon"]);
  });

  it("refuses a barcode already on another part, and names that part", async () => {
    const other = SHELF_ITEMS.find((i) => i.key !== TEK.key)!;
    fake.replies = [[], [{ item_key: other.key }]];
    const r = await link.POST(req({ code: "012345", itemKey: TEK.key }));
    expect(r.status).toBe(409);
    expect((await r.json()).error).toContain(other.name);
  });

  it("refuses anything that is not a shelf part", async () => {
    expect((await link.POST(req({ code: "012345", itemKey: "NOPE|NOPE" }))).status).toBe(400);
  });

  it("refuses a shelf part that is not switched on yet", async () => {
    const other = SHELF_ITEMS.find((i) => i.key !== TEK.key)!;
    expect((await link.POST(req({ code: "012345", itemKey: other.key }))).status).toBe(400);
    expect(fake.calls).toEqual([]);
  });
});

describe("undo route", () => {
  it("only takes back your own scan, by its id", async () => {
    fake.replies = [[{ item_key: TEK.key }], [{ on_hand: "9" }]];
    const r = await undo.POST(req({ moveId: 7 }));
    expect(await r.json()).toEqual({ ok: true, onHand: 9 });
    expect(fake.calls[0].params).toEqual([7, "brandon"]);
  });
});

describe("stock route", () => {
  it("adds up each part and lists its barcodes", async () => {
    fake.replies = [[{ item_key: TEK.key, on_hand: "5" }], [{ code: "A", item_key: TEK.key }, { code: "B", item_key: TEK.key }]];
    const { items } = await (await stock.GET()).json();
    expect(items).toEqual([{ key: TEK.key, name: TEK.name, desc: TEK.desc, category: TEK.category, photo: TEK.photo, onHand: 5, codes: ["A", "B"] }]);
  });
});
