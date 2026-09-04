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
   * Centro referencial de la comuna. PENDIENTE de verificación fina con
   * OSM/geoportal antes de activar el mapa real (etapa 3).
   */
  center: { lat: -33.583, lng: -70.634 },
  zoom: 13,
  updatedAt: "2026-07-19",
  features: {
    news: false,
    events: false,
    procedures: false,
    phones: false,
    dataPage: false,
    community: false,
    directory: true,
    services: true,
    transparency: true,
    search: true,
    reports: false,
    demoMap: false,
    realMap: false,
  },
};
