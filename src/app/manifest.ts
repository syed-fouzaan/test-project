import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nikah Invitation — Zeba Kausar & Mohammed Yasin",
    short_name: "Zeba & Yasin",
    description:
      "You are warmly invited to the Nikah of Zeba Kausar & Mohammed Yasin on 19 December 2026 at Arsh Garden, Hubli.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF8F2",
    theme_color: "#3A5236",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
