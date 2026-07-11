import { describe, it, expect } from "vitest";
import { buildEstimateIif, iifText, QB_ITEMS } from "./iif";

describe("QuickBooks IIF estimate export", () => {
  const est = {
    customer: "*WALK IN",
    date: new Date(2026, 6, 11),
    rep: "TC",
    po: "PO-123",
    job: "Route 70 job",
    lines: [{ item: QB_ITEMS.residential, desc: "Stock door — Clopay Model 4050, 8'0\" x 7'0\"", qty: 2, rate: 710.65 }],
  };

  it("keeps header and data columns aligned", () => {
    const iif = buildEstimateIif(est);
    const rows = iif.trim().split("\r\n").map((r) => r.split("\t"));
    const hTrns = rows.find((r) => r[0] === "!TRNS")!;
    const dTrns = rows.find((r) => r[0] === "TRNS")!;
    const hSpl = rows.find((r) => r[0] === "!SPL")!;
    const dSpl = rows.find((r) => r[0] === "SPL")!;
    expect(dTrns.length).toBe(hTrns.length);
    expect(dSpl.length).toBe(hSpl.length);
    expect(rows.at(-1)![0]).toBe("ENDTRNS");
  });

  it("writes ESTIMATES type, negative qty/amount on lines, positive header total", () => {
    const iif = buildEstimateIif(est);
    const spl = iif.split("\r\n").find((r) => r.startsWith("SPL"))!.split("\t");
    const trns = iif.split("\r\n").find((r) => r.startsWith("TRNS"))!.split("\t");
    expect(spl[1]).toBe("ESTIMATES");
    expect(spl[5]).toBe("-1421.30"); // amount
    expect(spl[6]).toBe("-2");       // qty
    expect(spl[7]).toBe("710.65");   // rate
    expect(trns[5]).toBe("1421.30");
    expect(trns[8]).toBe("PO-123");
    expect(trns[9]).toBe("TC");
  });

  it("sanitizes text: no tabs/newlines, em-dash and primes transliterated", () => {
    expect(iifText("A\tB\nC — 7′6″ · x")).toBe('A B C - 7\'6" - x');
    const iif = buildEstimateIif(est);
    expect(iif).not.toMatch(/\u2014/);
    const spl = iif.split("\r\n").find((r) => r.startsWith("SPL"))!.split("\t");
    expect(spl[9]).toContain("Stock door - Clopay");
  });

  it("carries the job name in the memo since IIF cannot fill custom fields", () => {
    const trns = buildEstimateIif(est).split("\r\n").find((r) => r.startsWith("TRNS"))!.split("\t");
    expect(trns[7]).toBe("JOB: Route 70 job");
  });
});
