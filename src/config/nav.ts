import type { SectionIconName } from "@/components/shared/section-icon";
import type { CommuneConfig } from "@/config/communes";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  /** Va a la vista en la barra de escritorio; el resto queda en «Más». */
  primary?: boolean;
  /** Ícono de la sección (menú del celular). */
  icon?: SectionIconName;
}

/**
 * Navegación pública de una comuna: se construye desde sus feature flags y
 * todos los enlaces quedan prefijados con el slug de la comuna.
 */
export function communeNav(commune: CommuneConfig): NavItem[] {
  const base = `/${commune.id}`;
  const items: (NavItem & { enabled: boolean })[] = [
    { title: "Inicio", href: base, enabled: true },
    {
      title: "Servicios",
      primary: true,
      href: `${base}/servicios`,
      icon: "servicios",
      description: "Trámites y servicios con enlace oficial",
      enabled: commune.features.services,
    },
    {
      title: "Beneficios",
      primary: true,
      href: `${base}/beneficios`,
      icon: "beneficios",
      description: "Orientador: ¿a qué puedo postular?",
      enabled: commune.features.benefits,
    },
    {
      title: "Deportes",
      primary: true,
      href: `${base}/deportes`,
      icon: "deportes",
      description: "Escuelas y talleres deportivos",
      enabled: commune.features.sports,
    },
    {
      title: "Directorio",
      href: `${base}/directorio`,
      icon: "directorio",
      description: "Lugares útiles de la comuna",
      /* Con mapa real, las fichas viven en la página del mapa. */
      enabled:
        commune.features.directory &&
        !commune.features.community &&
        !commune.features.realMap,
    },
    {
      title: "Mapa",
      primary: true,
      href: `${base}/mapa`,
      icon: "mapa",
      description: "Lugares de la comuna en el mapa, con su ficha",
      enabled: commune.features.realMap,
    },
    {
      title: "Transparencia",
      href: `${base}/transparencia`,
      icon: "transparencia",
      description: "Tu derecho a saber, explicado en simple",
      enabled: commune.features.transparency,
    },
    {
      title: "Buscar",
      href: `${base}/buscar`,
      description: "Buscador ciudadano",
      enabled: commune.features.search,
    },
    {
      title: "Noticias",
      href: `${base}/noticias`,
      description: "Noticias, anuncios, talleres y beneficios",
      enabled: commune.features.news,
    },
    {
      title: "Agenda",
      primary: true,
      href: `${base}/actividades`,
      icon: "agenda",
      description: "Agenda de talleres, deportes y encuentros",
      enabled: commune.features.events,
    },
    {
      title: "Comunidad",
      href: `${base}/comunidad`,
      description: "Organizaciones, directorio y buenas noticias",
      enabled: commune.features.community,
    },
    {
      title: "Trámites",
      href: `${base}/tramites`,
      description: "Guías paso a paso de trámites y beneficios",
      enabled: commune.features.procedures,
    },
    {
      title: "Teléfonos",
      primary: true,
      href: `${base}/telefonos`,
      icon: "telefonos",
      description: "Teléfonos de emergencia y servicios",
      enabled: commune.features.phones,
    },
    {
      title: "Datos",
      href: `${base}/datos`,
      icon: "datos",
      description: "La comuna en cifras, con contexto",
      enabled: commune.features.dataPage,
    },
  ];
  return items
    .filter((i) => i.enabled)
    .map(({ title, href, description, primary, icon }) => ({
      title,
      href,
      description,
      primary,
      icon,
    }));
}

/**
 * Reparte la navegación de escritorio: hasta `max` secciones a la vista
 * (primero las marcadas como principales) y el resto en el menú «Más».
 * El inicio no se incluye: lo lleva el logo.
 */
export function splitNav(
  items: NavItem[],
  max = 6
): { visible: NavItem[]; more: NavItem[] } {
  const sections = items.filter((i) => i.title !== "Inicio");
  const ranked = [
    ...sections.filter((i) => i.primary),
    ...sections.filter((i) => !i.primary),
  ];
  const chosen = new Set(ranked.slice(0, max));
  return {
    visible: sections.filter((i) => chosen.has(i)),
    more: sections.filter((i) => !chosen.has(i)),
  };
}

/** Enlace al flujo de reporte de la comuna (botón destacado). */
export function reportHref(commune: CommuneConfig): string | null {
  return commune.features.reports ? `/${commune.id}/reportar` : null;
}

/**
 * Navegación interna (capa municipal). Estructura preparada para la Fase 4:
 * su acceso en la UI pública debe mantenerse discreto (enlace en footer).
 */
export const adminNav: NavItem[] = [
  { title: "Panel", href: "/admin" },
  { title: "Solicitudes", href: "/admin/solicitudes" },
];
