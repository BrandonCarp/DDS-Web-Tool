import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    // default env is node (pricing engine); component tests opt into jsdom
    // with a `// @vitest-environment jsdom` docblock.
    environment: "node",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // API route handlers reach `server-only` through lib/auth. Stubbed so
      // the routes can be imported and exercised directly.
      "server-only": path.resolve(__dirname, "test/stubs/server-only.ts"),
    },
  },
});
