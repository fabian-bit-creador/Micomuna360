import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

/**
 * Se permite el rastreo de todo el sitio. Lo que no debe aparecer en los
 * buscadores (comuna de demostración, secciones desactivadas y la capa
 * municipal) lleva `noindex` en sus metadatos; bloquearlo aquí impediría
 * que los buscadores lean esa indicación.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
