import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

/** El portal ciudadano es público e indexable; la capa municipal no. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
