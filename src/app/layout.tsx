import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BOOT_SCRIPT } from "@/lib/theme";

// Archivo, served from the repo so no font request leaves the building. One
// variable file covers every weight and the width axis the headings and the
// quote total use (font-stretch). Licence: fonts/Archivo-OFL.txt.
const archivo = localFont({
  src: "./fonts/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata: Metadata = {
  title: "Doors Direct — Pricing",
  description: "Internal garage door pricing tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: BOOT_SCRIPT sets data-theme / data-sidebar on
    // <html> before React hydrates, so the server's copy never has them.
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
