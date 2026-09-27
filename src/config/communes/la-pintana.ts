import type { CommuneConfig } from "./types";

/**
 * La Pintana: primer piloto informativo real de MiComuna360.
 *
 * Regla de oro: aquí SOLO se publica información pública verificada, con
 * fuente y fecha. Lo no verificado queda pendiente y no se muestra como
 * vigente. MiComuna360 es un sitio ciudadano independiente: no es el sitio
 * oficial de la Municipalidad ni de sus corporaciones.
 */
export const laPintana: CommuneConfig = {
  id: "la-pintana",
  name: "La Pintana",
  region: "Región Metropolitana",
  status: "piloto",
  isDemo: false,
  tagline: "Piloto informativo: información pública, con fuente y fecha",
  /**
   * Centroide y rectángulo del límite comunal oficial (capa LIMITE_COMUNAL
   * del geoportal GeoPintana, editada el 2025-01-27). El rectángulo se
   * redondea hacia afuera, para que contenga todo el límite.
   */
  center: { lat: -33.5875, lng: -70.6371 },
  zoom: 13,
  bounds: { south: -33.628, west: -70.671, north: -33.554, east: -70.605 },
  updatedAt: "2026-09-27",
  features: {
    news: false,
    events: false,
    procedures: false,
    phones: false,
    dataPage: false,
    community: false,
    directory: true,
    services: true,
    benefits: true,
    transparency: true,
    search: true,
    reports: false,
    demoMap: false,
    realMap: true,
  },
};
