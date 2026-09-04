import type { MetadataRoute } from "next";

import { listCommunes } from "@/config/communes";
import { siteUrl } from "@/config/site";
import { getNews, getProcedures } from "@/lib/repositories";

/**
 * Mapa del sitio: se construye desde el registro de comunas y sus
 * funcionalidades activas, así que una comuna nueva entra sola.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
  ];

  for (const commune of listCommunes()) {
    const base = `${siteUrl}/${commune.id}`;
    const lastModified = new Date(`${commune.updatedAt}T12:00:00-04:00`);
    const { features } = commune;

    entries.push({
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    const sections: [boolean, string, number][] = [
      [features.services, "servicios", 0.9],
      [features.directory, "directorio", 0.8],
      [features.search, "buscar", 0.7],
      [features.news, "noticias", 0.8],
      [features.events, "actividades", 0.8],
      [features.procedures, "tramites", 0.8],
      [features.phones, "telefonos", 0.8],
      [features.dataPage, "datos", 0.6],
      [features.community, "comunidad", 0.7],
      [features.community, "comunidad/organizaciones", 0.6],
      [features.reports, "reportar", 0.6],
      [commune.isDemo, "mapa", 0.4],
    ];
    for (const [enabled, path, priority] of sections) {
      if (!enabled) continue;
      entries.push({
        url: `${base}/${path}`,
        lastModified,
        changeFrequency: "weekly",
        priority,
      });
    }

    if (features.news) {
      for (const article of await getNews(commune.id)) {
        entries.push({
          url: `${base}/noticias/${article.slug}`,
          lastModified: new Date(article.publishedAt),
          changeFrequency: "yearly",
          priority: 0.5,
        });
      }
    }
    if (features.procedures) {
      for (const procedure of await getProcedures(commune.id)) {
        entries.push({
          url: `${base}/tramites/${procedure.slug}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
