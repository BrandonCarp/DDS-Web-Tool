import type { MetadataRoute } from "next";

// Web-app manifest: gives the installed desktop/mobile app its real name,
// icon, and maroon theme (used by Edge/Chrome "Install this site as an app").
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DDS Pricing Tool",
    short_name: "DDS Pricing",
    description: "Doors Direct South internal pricing tool",
    start_url: "/",
    display: "standalone",
    background_color: "#500609",
    theme_color: "#500609",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
