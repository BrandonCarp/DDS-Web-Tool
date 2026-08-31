import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { IDLE_MINUTES, IDLE_MS } from "./session-timeout";

describe("inactivity logout window", () => {
  it("is one hour", () => {
    expect(IDLE_MINUTES).toBe(60);
    expect(IDLE_MS).toBe(60 * 60 * 1000);
  });

  it("is not written out a second time anywhere", () => {
    // This constant lived in two files with a comment asking the next person to
    // keep them in sync, which is how a client timer ends up firing at a
    // different moment than the server check. Anything that recomputes the
    // window from raw minutes instead of importing it can drift the same way.
    for (const path of ["src/lib/auth.ts", "src/components/AppShell.tsx"]) {
      const src = readFileSync(path, "utf8");
      expect(src, `${path} should import the window, not restate it`).toContain(
        "session-timeout",
      );
      expect(src, `${path} still computes its own idle window`).not.toMatch(
        /IDLE_MS\s*=\s*\d+\s*\*/,
      );
    }
  });

  it("stays inside the absolute session cap", () => {
    // TTL_MS in lib/auth.ts is the 30-day hard ceiling. An idle window at or
    // past it would mean the idle check never fires and the only logout left is
    // the absolute expiry a month later.
    const auth = readFileSync("src/lib/auth.ts", "utf8");
    const ttl = auth.match(/const TTL_MS = ([^;]+);/)?.[1];
    expect(ttl).toBeTruthy();
    const ttlMs = eval(ttl!) as number;
    expect(IDLE_MS).toBeLessThan(ttlMs);
  });
});
