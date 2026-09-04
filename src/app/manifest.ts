import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Manifiesto web: permite agregar MiComuna360 a la pantalla de inicio del
 * teléfono, que es como muchos vecinos volverán a entrar.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.lema}`,
    short_name: siteConfig.name,
    description: siteConfig.sublema,
    start_url: "/",
    display: "standalone",
    lang: "es-CL",
    background_color: "#f7f7f2",
    theme_color: "#17375e",
    icons: [
      {
        src: "/isotipo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
