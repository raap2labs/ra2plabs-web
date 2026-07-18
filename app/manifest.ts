import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RA2P Labs",
    short_name: "RA2P Labs",
    description:
      "Software, IA y Automatización para tu negocio. Soluciones tecnológicas inteligentes.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A192F",
    theme_color: "#0A192F",
    orientation: "portrait-primary",
    categories: ["business", "technology"],
    lang: "es",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
