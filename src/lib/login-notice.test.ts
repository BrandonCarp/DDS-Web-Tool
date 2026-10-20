import { beforeEach, describe, expect, it, vi } from "vitest";

// The database is faked: what is written and what comes back is the test.
const fake = vi.hoisted(() => ({
  calls: [] as { sql: string; params: unknown[] }[],
  replies: [] as unknown[][],
  fail: false,
}));
vi.mock("@/lib/db", () => ({
  query: async (sql: string, params: unknown[] = []) => {
    if (fake.fail) throw new Error("relation \"app_settings\" does not exist");
    fake.calls.push({ sql, params });
    return fake.replies.shift() ?? [];
  },
}));

const { normalizeNotice, noticeToShow, EMPTY_NOTICE, NOTICE_BODY_MAX } = await import("./login-notice");
const { readLoginNotice, writeLoginNotice } = await import("./login-notice-db");

beforeEach(() => { fake.calls = []; fake.replies = []; fake.fail = false; });

describe("the sign-in notice (Brandon, 20/10/2026)", () => {
  it("takes what was typed, trimmed and cut to length, and nothing else", () => {
    expect(normalizeNotice({ enabled: true, title: "  Heads up ", body: "  line one\r\nline two  ", extra: 1 }))
      .toEqual({ enabled: true, title: "Heads up", body: "line one\nline two" });
    expect(normalizeNotice({ enabled: "yes", title: 5, body: null })).toEqual({ enabled: false, title: "5", body: "" });
    expect(normalizeNotice(null)).toEqual(EMPTY_NOTICE);
    expect(normalizeNotice({ enabled: true, body: "x".repeat(NOTICE_BODY_MAX + 50) }).body).toHaveLength(NOTICE_BODY_MAX);
  });

  it("shows only when on and saying something", () => {
    expect(noticeToShow({ enabled: true, title: "T", body: "B" })).toEqual({ title: "T", body: "B" });
    expect(noticeToShow({ enabled: false, title: "T", body: "B" })).toBeNull();
    expect(noticeToShow({ enabled: true, title: "T", body: "" })).toBeNull();
  });

  it("reads the saved notice, and reads none where the table is not there yet", async () => {
    fake.replies = [[{ value: { enabled: true, title: "T", body: "B" }, updated_at: "2026-10-20T10:00:00Z", updated_by: "brandon" }]];
    expect(await readLoginNotice()).toEqual({ enabled: true, title: "T", body: "B", updated_at: "2026-10-20T10:00:00Z", updated_by: "brandon" });
    fake.replies = [[]];
    expect(await readLoginNotice()).toEqual(EMPTY_NOTICE);
    fake.fail = true;
    expect(await readLoginNotice()).toEqual(EMPTY_NOTICE);
  });

  it("makes the table and upserts the one row on save, by whom", async () => {
    const saved = await writeLoginNotice({ enabled: true, title: " T ", body: "B" }, "brandon");
    expect(saved).toEqual({ enabled: true, title: "T", body: "B", updated_by: "brandon" });
    expect(fake.calls).toHaveLength(2);
    expect(fake.calls[0].sql).toMatch(/create table if not exists app_settings/);
    expect(fake.calls[1].sql).toMatch(/on conflict \(key\) do update/);
    expect(fake.calls[1].params).toEqual([JSON.stringify({ enabled: true, title: "T", body: "B" }), "brandon"]);
  });
});
