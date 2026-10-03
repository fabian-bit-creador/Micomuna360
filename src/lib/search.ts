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
        href: `${base}/servicios#${s.id}`,
        group: "Servicios",
        external: false,
      });
    }
  }
  if (commune.features.benefits) {
    entries.push({
      title: "¿A qué puedo postular?",
      description:
        "Marca tu situación y te mostramos qué beneficios revisar y dónde se postula. Sin RUT ni clave.",
      href: `${base}/beneficios`,
      group: "Beneficios",
      external: false,
    });
    for (const b of data.benefits) {
      /* Llega con su situación ya marcada. Va en el fragmento (#s=), que el
         navegador no envía al servidor. */
      const query = b.triggers.length > 0 ? `#s=${b.triggers[0]}` : "";
      entries.push({
        title: b.title,
        description: `${b.institution} · ${b.summary}`,
        href: `${base}/beneficios${query}`,
        group: "Beneficios",
        external: false,
      });
    }
  }
  if (commune.features.sports && data.sportsPrograms.length > 0) {
    const byDiscipline = new Map<string, number>();
    for (const p of data.sportsPrograms) {
      byDiscipline.set(p.discipline, (byDiscipline.get(p.discipline) ?? 0) + 1);
    }
    entries.push({
      title: "Escuelas y talleres deportivos",
      description: `${data.sportsPrograms.length} escuelas y talleres de la Corporación Municipal de Deportes, con días, horario y lugar.`,
      href: `${base}/deportes`,
      group: "Deportes",
      external: false,
    });
    for (const [discipline, count] of byDiscipline) {
      entries.push({
        title: discipline,
        description: `${count} ${count === 1 ? "escuela o taller" : "escuelas y talleres"} en ${commune.name}: días, horario y lugar.`,
        href: `${base}/deportes#d=${encodeURIComponent(discipline)}`,
        group: "Deportes",
        external: false,
      });
    }
  }
  if (commune.features.transparency) {
    entries.push({
      title: "Transparencia municipal",
      description:
        "Qué publica el municipio por ley, qué puedes pedir tú y en qué plazos deben responderte.",
      href: `${base}/transparencia`,
      group: "Transparencia",
      external: false,
    });
    if (data.budget.length > 0) {
      entries.push({
        title: "Presupuesto municipal: en qué se usa y de dónde viene",
        description:
          "Cuánto se ha comprometido y pagado, el Fondo Común Municipal y el presupuesto de salud.",
        href: `${base}/transparencia#presupuesto`,
        group: "Transparencia",
        external: false,
      });
    }
  }
  if (commune.features.dataPage) {
    for (const i of data.contextIndicators) {
      entries.push({
        title: i.question,
        description: `${i.title} · comparado con la historia de la comuna y con la región`,
        href: `${base}/datos`,
        group: "Datos",
        external: false,
      });
    }
    if (data.enrollment.length > 0) {
      entries.push({
        title: "¿Cuántos estudiantes hay en los colegios de la comuna?",
        description: "Matrícula escolar y tipo de colegio, según MINEDUC",
        href: `${base}/datos`,
        group: "Datos",
        external: false,
      });
    }
  }
  if (commune.features.directory) {
    for (const p of data.places) {
      /* Con mapa real, el lugar se abre en el mapa (o su ficha, si no tiene
         coordenadas), que comparten la misma página. */
      const href = !commune.features.realMap
        ? `${base}/directorio#${p.id}`
        : typeof p.lat === "number"
          ? `${base}/mapa#${p.id}`
          : `${base}/mapa#ficha-${p.id}`;
      entries.push({
        title: p.name,
        description: `${p.address} · ${p.description}`,
        href,
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
    /* En una comuna real, solo las actividades que aún no terminan. */
    const now = Date.now();
    for (const e of data.events.filter(
      (ev) => commune.isDemo || Date.parse(ev.endsAt ?? ev.startsAt) >= now
    )) {
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
  // Sitios oficiales destacados (registro único de fuentes de la comuna)
  for (const src of data.sources.filter((s) => s.featured)) {
    entries.push({
      title: src.pageName,
      description: src.description,
      href: src.url,
      group: "Sitios oficiales",
      external: true,
    });
  }

  return entries;
}

/** Normaliza para comparar sin tildes ni mayúsculas. */
function fold(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/*
 * Búsquedas frecuentes de un vecino. Solo se ofrecen las que tienen
 * resultados en la comuna: así ninguna lleva a «sin resultados».
 */
const frequentSearches = [
  "Licencia de conducir",
  "Permiso de circulación",
  "Registro Social de Hogares",
  "CESFAM",
  "Fútbol",
];

export function searchSuggestions(entries: SearchEntry[]): string[] {
  return frequentSearches.filter((term) => {
    const q = fold(term);
    return entries.some((e) => fold(`${e.title} ${e.description}`).includes(q));
  });
}
