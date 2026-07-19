import type { CommuneConfig } from "@/config/communes";
import { getCommuneData } from "@/data/communes";

/** Entrada del índice del buscador ciudadano (serializable a cliente). */
export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  group: string;
  /** true cuando el enlace lleva a un sitio oficial externo. */
  external: boolean;
}

/**
 * Índice estático del buscador ciudadano, construido en el servidor desde
 * el dataset de la comuna. Sin backend: se filtra en el cliente.
 */
export function buildSearchIndex(commune: CommuneConfig): SearchEntry[] {
  const data = getCommuneData(commune.id);
  const base = `/${commune.id}`;
  const entries: SearchEntry[] = [];

  if (commune.features.services) {
    for (const s of data.services) {
      entries.push({
        title: s.title,
        description: `${s.institution} · ${s.description}`,
        href: `${base}/servicios`,
        group: "Servicios",
        external: false,
      });
    }
  }
  if (commune.features.directory) {
    for (const p of data.places) {
      entries.push({
        title: p.name,
        description: `${p.address} · ${p.description}`,
        href: `${base}/directorio`,
        group: "Lugares",
        external: false,
      });
    }
  }
  if (commune.features.phones) {
    for (const t of data.phones) {
      entries.push({
        title: `${t.name} (${t.number})`,
        description: t.description,
        href: `${base}/telefonos`,
        group: "Teléfonos",
        external: false,
      });
    }
  }
  if (commune.features.procedures) {
    for (const pr of data.procedures) {
      entries.push({
        title: pr.title,
        description: pr.summary,
        href: `${base}/tramites/${pr.slug}`,
        group: "Trámites",
        external: false,
      });
    }
  }
  if (commune.features.events) {
    for (const e of data.events) {
      entries.push({
        title: e.title,
        description: e.description,
        href: `${base}/actividades`,
        group: "Actividades",
        external: false,
      });
    }
  }
  if (commune.features.news) {
    for (const n of data.news) {
      entries.push({
        title: n.title,
        description: n.summary,
        href: `${base}/noticias/${n.slug}`,
        group: "Noticias",
        external: false,
      });
    }
  }
  if (commune.features.community) {
    for (const o of data.organizations) {
      entries.push({
        title: o.name,
        description: o.description,
        href: `${base}/comunidad/organizaciones`,
        group: "Organizaciones",
        external: false,
      });
    }
  }
  // Sitios oficiales de la comuna (siempre, si existen)
  for (const src of commune.officialSources) {
    entries.push({
      title: src.name,
      description: src.description,
      href: src.url,
      group: "Sitios oficiales",
      external: true,
    });
  }

  return entries;
}
