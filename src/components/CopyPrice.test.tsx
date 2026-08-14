// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopyPrice, priceText } from "./CopyButton";

afterEach(cleanup);

describe("priceText", () => {
  it("drops the currency symbol", () => {
    expect(priceText(33.95)).toBe("33.95");
    expect(priceText(375.95)).toBe("375.95");
  });

  it("keeps two decimals on whole numbers", () => {
    expect(priceText(375)).toBe("375.00");
    expect(priceText(0.5)).toBe("0.50");
  });

  it("still groups thousands", () => {
    expect(priceText(9142.34)).toBe("9,142.34");
  });
});

describe("CopyPrice", () => {
  let written: string[];

  beforeEach(() => {
    written = [];
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(async (t: string) => {
          written.push(t);
        }),
      },
    });
    Object.defineProperty(window, "isSecureContext", { value: true, configurable: true });
  });

  it("puts a bare number on the clipboard while the screen keeps the symbol", async () => {
    render(<CopyPrice amount={1234.5} testId="cp" />);
    fireEvent.click(screen.getByTestId("cp"));
    await waitFor(() => expect(written).toEqual(["1,234.50"]));
    expect(written[0]).not.toContain("$");
  });
});

describe("no tool copies a price with a symbol attached", () => {
  it("routes every price copy through CopyPrice", () => {
    // The rule is only worth having if it cannot be bypassed. A new tool that
    // wires up its own `<CopyButton text={fmt(total)} label="Copy price">`
    // would silently reintroduce the "$" the counter has to delete, so the
    // shape is asserted here rather than trusted.
    const dir = join(__dirname);
    const offenders: string[] = [];
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".tsx") || file.endsWith(".test.tsx")) continue;
      const src = readFileSync(join(dir, file), "utf8");
      for (const line of src.split("\n")) {
        if (line.includes("CopyButton") && /label="Copy price"/.test(line)) {
          offenders.push(`${file}: ${line.trim()}`);
        }
        if (/replace\("\$", ""\)/.test(line)) {
          offenders.push(`${file}: hand-stripped symbol — use priceText`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
