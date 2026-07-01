import type { Config } from "tailwindcss";

// Preflight is OFF: the internal + login screens use the tool's own CSS (scoped
// under .tool-shell / .login-shell). Tailwind stays available for utilities.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: { preflight: false },
  theme: { extend: { colors: { brand: { DEFAULT: "#500609" } } } },
  plugins: [],
} satisfies Config;
