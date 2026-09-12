import { describe, it, expect, vi } from "vitest";
// price-route.test.ts is not next to "src/app/api/price/route.ts" due to Next's routing directory risking route.test.ts to be treated as a route
// The route requires a signed-in user. Authentication is not what these tests
// are about, so a session is stubbed and every case runs as a logged-in user.
vi.mock("@/lib/auth", () => ({
  getSessionUser: async () => ({ id: 1, username: "test", role: "user" }),
}));

const { POST } = await import("@/app/api/price/route");
import { quoteResidential } from "./engine";

/**
 * The price route is where a request turns into QuoteOptions.
 *
 * Everything else in this suite calls the engine directly, which means a field
 * dropped here — a rename, a typo in the destructure — would silently stop
 * applying and nothing would fail. That is the one place a bug costs real money
 * without turning the suite red, so these tests go through the route itself.
 */

const post = async (body: unknown) => {
  const res = await POST(new Request("http://localhost/api/price", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }));
  return { status: res.status, json: await res.json() };
};

const door = (extra: Record<string, unknown> = {}) => ({
  model: "4050", widthFt: 9, widthIn: 0, heightFt: 7, heightIn: 0,
  style: "solid", color: "White", track: "r12", spring: "extension", lock: "none",
  ...extra,
});

const base = { style: "solid" as const, color: "White", track: "r12" as const,
               spring: "extension" as const, lock: "none" as const };
const dim = { widthFt: 9, widthIn: 0, heightFt: 7, heightIn: 0 };

describe("price route — option threading", () => {
  it("returns the same number the engine does", async () => {
    const { json } = await post(door());
    expect(json.unitPrice).toBeCloseTo(quoteResidential("4050", dim, base).unitPrice, 2);
  });

  it("applies upgraded hardware", async () => {
    const off = (await post(door())).json.unitPrice;
    const on = (await post(door({ upgradedHardware: true }))).json.unitPrice;
    expect(on - off).toBeCloseTo(35, 2);
  });

  it("applies the home owner surcharge", async () => {
    const off = (await post(door())).json.unitPrice;
    const on = (await post(door({ homeowner: true }))).json.unitPrice;
    expect(on - off).toBeCloseTo(250, 2);
  });

  it("applies both at once", async () => {
    const off = (await post(door())).json.unitPrice;
    const on = (await post(door({ homeowner: true, upgradedHardware: true }))).json.unitPrice;
    expect(on - off).toBeCloseTo(285, 2);
  });

  it("charges the wider band above 9'0\"", async () => {
    const off = (await post(door({ widthFt: 16 }))).json.unitPrice;
    const on = (await post(door({ widthFt: 16, homeowner: true, upgradedHardware: true }))).json.unitPrice;
    expect(on - off).toBeCloseTo(500 + 45, 2);
  });

  it("treats a missing flag as off, and only `true` as on", async () => {
    const off = (await post(door())).json.unitPrice;
    for (const v of [false, "true", 1, null, undefined]) {
      const r = await post(door({ homeowner: v, upgradedHardware: v }));
      expect(r.json.unitPrice, String(v)).toBeCloseTo(off, 2);
    }
  });

  it("carries the options into the description", async () => {
    const { json } = await post(door({ homeowner: true, upgradedHardware: true }));
    expect(json.description).toContain("upgraded hardware");
  });

  it("threads track, spring, lock and colour", async () => {
    const { json } = await post(door({ track: "low_headroom", spring: "torsion", lock: "lockbar", color: "Almond" }));
    expect(json.description).toContain("Almond");
    expect(json.description).toContain("low headroom");
    expect(json.description).toContain("lockbar");
    expect(json.unitPrice).toBeCloseTo(
      quoteResidential("4050", dim, { ...base, track: "low_headroom", spring: "torsion", lock: "lockbar", color: "Almond" }).unitPrice, 2);
  });

  it("threads a window design", async () => {
    const { json } = await post(door({ style: "inserts", windesign: "509" }));
    expect(json.description).toContain("509");
  });

  it("ignores a window design it does not know", async () => {
    // Unknown ids are dropped rather than echoed into an order line.
    const { json } = await post(door({ style: "inserts", windesign: "not-a-design" }));
    expect(json.description).not.toContain("not-a-design");
  });
});

describe("price route — sections", () => {
  it("prices a replacement section", async () => {
    const { json } = await post({ model: "4050", assembly: "sections", widthKey: "9", secKind: "bt", secHeight: "21", color: "White" });
    expect(json.priced).toBe(true);
    expect(json.unitPrice).toBeGreaterThan(0);
  });

  it("rejects a width that is not a number", async () => {
    const { status, json } = await post({ model: "4050", assembly: "sections", widthKey: "9; drop" });
    expect(status).toBe(400);
    expect(json.error).toContain("width");
  });

  it("prices 18\" and 21\" the same", async () => {
    // They share one row in the book, so the height only affects wording.
    const a = await post({ model: "4050", assembly: "sections", widthKey: "9", secKind: "bt", secHeight: "18" });
    const b = await post({ model: "4050", assembly: "sections", widthKey: "9", secKind: "bt", secHeight: "21" });
    expect(a.json.unitPrice).toBeCloseTo(b.json.unitPrice, 2);
  });
});

describe("price route — validation", () => {
  it("rejects a body that is not JSON", async () => {
    const res = await POST(new Request("http://localhost/api/price", { method: "POST", body: "{{{" }));
    expect(res.status).toBe(400);
  });

  it("requires a model", async () => {
    const { status, json } = await post({ widthFt: 9, style: "solid" });
    expect(status).toBe(400);
    expect(json.error).toContain("model");
  });

  it("rejects an unknown window style", async () => {
    const { status } = await post(door({ style: "stained-glass" }));
    expect(status).toBe(400);
  });

  it("does not throw on a model it cannot price", async () => {
    const { json } = await post(door({ model: "not-a-model" }));
    expect(json.priced).toBe(false);
  });
});
