import type { CommuneConfig } from "@/config/communes";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
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
      href: `${base}/servicios`,
      description: "Trámites y servicios con enlace oficial",
      enabled: commune.features.services,
    },
    {
      title: "Directorio",
      href: `${base}/directorio`,
      description: "Lugares útiles de la comuna",
      enabled: commune.features.directory && !commune.features.community,
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
      title: "Actividades",
      href: `${base}/actividades`,
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
      href: `${base}/telefonos`,
      description: "Teléfonos de emergencia y servicios",
      enabled: commune.features.phones,
    },
    {
      title: "Datos",
      href: `${base}/datos`,
      description: "Indicadores y avances comunales",
      enabled: commune.features.dataPage,
    },
  ];
  return items
    .filter((i) => i.enabled)
    .map(({ title, href, description }) => ({ title, href, description }));
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
