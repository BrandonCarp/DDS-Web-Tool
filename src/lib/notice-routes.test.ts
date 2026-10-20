import { beforeEach, describe, expect, it, vi } from "vitest";

// Not next to the routes: Next would treat a route.test.ts there as a route.
// Login and database are faked — the routes' own decisions are what is tested.
const fake = vi.hoisted(() => ({
  user: null as null | { id: number; username: string; role: string },
  calls: [] as { sql: string; params: unknown[] }[],
  replies: [] as unknown[][],
  password: true,
}));
vi.mock("@/lib/auth", () => ({
  getSessionUser: async () => fake.user,
  verifyPassword: async () => fake.password,
  createSession: async () => ({ token: "tok", expires: new Date(Date.now() + 3600_000) }),
  SESSION_COOKIE: "dds_session",
}));
vi.mock("@/lib/db", () => ({
  query: async (sql: string, params: unknown[] = []) => {
    fake.calls.push({ sql, params });
    return fake.replies.shift() ?? [];
  },
}));

const admin = await import("@/app/api/admin/notice/route");
const login = await import("@/app/api/login/route");

const req = (url: string, body: unknown, method = "PUT") =>
  new Request(`http://localhost${url}`, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

beforeEach(() => {
  fake.user = { id: 1, username: "brandon", role: "admin" };
  fake.calls = [];
  fake.replies = [];
  fake.password = true;
});

describe("the sign-in notice in the admin panel (Brandon, 20/10/2026)", () => {
  it("is the master admin's alone", async () => {
    for (const u of [null, { id: 2, username: "tom", role: "semiadmin" }, { id: 3, username: "cj", role: "user" }]) {
      fake.user = u;
      expect((await admin.GET()).status).toBe(403);
      expect((await admin.PUT(req("/api/admin/notice", { enabled: true, body: "x" }))).status).toBe(403);
    }
    expect(fake.calls).toEqual([]);
  });

  it("reads the saved notice", async () => {
    fake.replies = [[{ value: { enabled: true, title: "T", body: "B" }, updated_at: "2026-10-20T10:00:00Z", updated_by: "brandon" }]];
    expect(await (await admin.GET()).json()).toEqual({ notice: { enabled: true, title: "T", body: "B", updated_at: "2026-10-20T10:00:00Z", updated_by: "brandon" } });
  });

  it("saves what was typed, trimmed, under the admin's name", async () => {
    const r = await admin.PUT(req("/api/admin/notice", { enabled: true, title: " Heads up ", body: " Closed Friday.\n\nOpen Monday. " }));
    expect(await r.json()).toEqual({ ok: true, notice: { enabled: true, title: "Heads up", body: "Closed Friday.\n\nOpen Monday.", updated_by: "brandon" } });
    expect(fake.calls[1].params).toEqual([JSON.stringify({ enabled: true, title: "Heads up", body: "Closed Friday.\n\nOpen Monday." }), "brandon"]);
  });
});

describe("the sign-in notice at sign-in", () => {
  const user = [{ id: 1, password_hash: "h", active: true }];

  it("comes back with the sign-in when it is on", async () => {
    fake.replies = [user, [], [], [{ value: { enabled: true, title: "T", body: "B" }, updated_at: "x", updated_by: "brandon" }]];
    const r = await login.POST(req("/api/login", { username: "cj", password: "pw" }, "POST"));
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ ok: true, notice: { title: "T", body: "B" } });
    expect(r.headers.get("set-cookie")).toMatch(/dds_session=tok/);
  });

  it("is null when off, blank, or not set up", async () => {
    fake.replies = [user, [], [], [{ value: { enabled: false, title: "T", body: "B" }, updated_at: "x", updated_by: "b" }]];
    expect(await (await login.POST(req("/api/login", { username: "cj", password: "pw" }, "POST"))).json()).toEqual({ ok: true, notice: null });
    fake.replies = [user, [], [], []];
    expect(await (await login.POST(req("/api/login", { username: "cj", password: "pw" }, "POST"))).json()).toEqual({ ok: true, notice: null });
  });

  it("never reaches a wrong password", async () => {
    fake.password = false;
    fake.replies = [user];
    const r = await login.POST(req("/api/login", { username: "cj", password: "pw" }, "POST"));
    expect(r.status).toBe(401);
    expect(fake.calls).toHaveLength(1);
  });
});
