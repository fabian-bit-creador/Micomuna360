export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

/** Navegación pública (capa ciudadana). */
export const mainNav: NavItem[] = [
  { title: "Inicio", href: "/" },
  {
    title: "Noticias",
    href: "/noticias",
    description: "Noticias, anuncios, talleres y beneficios",
  },
  {
    title: "Actividades",
    href: "/actividades",
    description: "Agenda de talleres, deportes y encuentros",
  },
  {
    title: "Trámites",
    href: "/tramites",
    description: "Guías paso a paso de trámites y beneficios",
  },
  {
    title: "Teléfonos",
    href: "/telefonos",
    description: "Teléfonos de emergencia y servicios",
  },
  {
    title: "Datos",
    href: "/datos",
    description: "Indicadores y avances comunales",
  },
];

/**
 * Navegación interna (capa municipal). Estructura preparada para la Fase 4:
 * su acceso en la UI pública debe mantenerse discreto (enlace en footer).
 */
export const adminNav: NavItem[] = [
  { title: "Panel", href: "/admin" },
  { title: "Solicitudes", href: "/admin/solicitudes" },
];
