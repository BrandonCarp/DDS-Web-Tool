import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Guards against committing a half-merged file.
 *
 * `git apply --3way` writes conflict markers into the file and exits non-zero,
 * but the file is still modified — so a `git add -A` right after happily commits
 * the markers. That has broken the Vercel build twice: `tsc` and `vitest` both
 * pass because the markers land inside a data object literal that TypeScript
 * never type-checks deeply, and only `next build` parses it strictly.
 *
 * This fails in the test run instead, which is where it gets noticed.
 */
const ROOTS = ["src", "scripts", "tests"];
const SKIP = new Set(["node_modules", ".next", "dist"]);
// Split so this file does not trip its own check.
const MARKERS = ["<".repeat(7), ">".repeat(7), "=".repeat(7)];

function walk(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|css|json|py|mjs)$/.test(name)) out.push(full);
  }
  return out;
}

describe("no merge conflict markers in the tree", () => {
  it("every source file is fully merged", () => {
    const bad: string[] = [];
    for (const file of ROOTS.flatMap((r) => walk(r))) {
      if (file.endsWith("no-conflict-markers.test.ts")) continue;
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        if (MARKERS.some((m) => line.startsWith(m))) bad.push(`${file}:${i + 1}  ${line.slice(0, 40)}`);
      });
    }
    expect(bad, `conflict markers left in:\n${bad.join("\n")}`).toEqual([]);
  });
});
