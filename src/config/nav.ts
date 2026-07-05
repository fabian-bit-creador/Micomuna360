export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

/** Navegación pública (capa ciudadana). */
export const mainNav: NavItem[] = [
  { title: "Inicio", href: "/" },
  {
    title: "Reportar",
    href: "/reportar",
    description: "Envía una solicitud o reporte vecinal",
  },
  {
    title: "Mapa",
    href: "/mapa",
    description: "Reportes y puntos de interés de la comuna",
  },
  {
    title: "Noticias",
    href: "/noticias",
    description: "Noticias, anuncios, talleres y beneficios",
  },
  {
    title: "Datos",
    href: "/datos",
    description: "Indicadores y avances comunales",
  },
];

/** Navegación interna (capa municipal). */
export const adminNav: NavItem[] = [
  { title: "Panel", href: "/admin" },
  { title: "Solicitudes", href: "/admin/solicitudes" },
];
