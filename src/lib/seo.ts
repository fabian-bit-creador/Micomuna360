import type { Metadata } from "next";

import { getCommune, type CommuneConfig } from "@/config/communes";
import { siteConfig } from "@/config/site";

type Feature = keyof CommuneConfig["features"];

/* Tarjetas de vista previa en /og y /og/<comuna> (app/og). */
const cardSize = { width: 1200, height: 630 };

interface CommunePageMeta {
  /** Ruta dentro de la comuna, p. ej. "/servicios" ("" para la portada). */
  path: string;
  /** Nombre de la sección, p. ej. "Servicios". */
  title: string;
  description: string;
  /** Flag que habilita la sección; si está apagado, la página no se indexa. */
  feature?: Feature;
}

/**
 * Metadatos de una página de comuna: título con el nombre de la comuna, URL
 * canónica propia y la misma URL en la vista previa para redes.
 *
 * Solo se ofrecen a los buscadores las páginas con contenido real: la comuna
 * de demostración (datos ficticios) y las secciones desactivadas llevan
 * `noindex`, y tampoco aparecen en el sitemap (`app/sitemap.ts`).
 */
export function communeMetadata(
  communeId: string,
  { path, title, description, feature }: CommunePageMeta
): Metadata {
  const commune = getCommune(communeId);
  if (!commune) return {};

  const pageTitle = path
    ? `${title} · ${commune.name}`
    : `${commune.name} — ${siteConfig.lema}`;
  const fullDescription = commune.isDemo
    ? `${description} Comuna de demostración con datos ficticios.`
    : description;
  const url = `/${commune.id}${path}`;
  const indexable =
    !commune.isDemo && (feature === undefined || commune.features[feature]);

  return {
    title: pageTitle,
    description: fullDescription,
    alternates: { canonical: url },
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "es_CL",
      title: `${pageTitle} | ${siteConfig.name}`,
      description: fullDescription,
      url,
      images: [
        {
          ...cardSize,
          url: `/og/${commune.id}`,
          alt: `${commune.name} en ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${siteConfig.name}`,
      description: fullDescription,
      images: [`/og/${commune.id}`],
    },
  };
}

/** Metadatos de las páginas del portal (fuera de una comuna). */
export function portalMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "es_CL",
      title: path === "/" ? title : `${title} | ${siteConfig.name}`,
      description,
      url: path,
      images: [
        { ...cardSize, url: "/og", alt: `${siteConfig.name} — ${siteConfig.lema}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: path === "/" ? title : `${title} | ${siteConfig.name}`,
      description,
      images: ["/og"],
    },
  };
}
