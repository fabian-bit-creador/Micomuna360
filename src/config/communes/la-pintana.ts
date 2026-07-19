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
  officialSources: [
    {
      name: "Municipalidad de La Pintana",
      url: "https://pintana.cl/",
      description: "Sitio oficial: noticias, trámites y direcciones municipales.",
      verifiedAt: "2026-07-19",
    },
    {
      name: "Pagos en línea municipales",
      url: "https://pintana.cl/?page_id=4122",
      description: "Pago del permiso de circulación y otros pagos municipales.",
      verifiedAt: "2026-07-19",
    },
    {
      name: "DIDECO La Pintana",
      url: "https://www.dideco.cl/",
      description: "Desarrollo comunitario: programas y apoyos sociales.",
      verifiedAt: "2026-07-19",
    },
    {
      name: "SmartDIDECO",
      url: "https://www.lapintana.smartdideco.cl/",
      description: "Plataforma digital de programas y atenciones DIDECO.",
      verifiedAt: "2026-07-19",
    },
    {
      name: "Corporación Municipal de Deportes",
      url: "https://www.pintanadeportes.cl/",
      description: "Recintos deportivos, talleres y escuelas deportivas.",
      verifiedAt: "2026-07-19",
    },
    {
      name: "Corporación Cultural",
      url: "https://www.culturapintana.cl/",
      description: "Programación cultural y teatro municipal.",
      verifiedAt: "2026-07-19",
    },
    {
      name: "Geoportal comunal (GeoPintana)",
      url: "https://geopintana-lapintana.hub.arcgis.com/",
      description: "Datos geoespaciales y visores del territorio comunal.",
      verifiedAt: "2026-07-19",
    },
    {
      name: "ChileAtiende",
      url: "https://www.chileatiende.gob.cl/",
      description: "Trámites y beneficios del Estado de Chile.",
      verifiedAt: "2026-07-19",
    },
  ],
  features: {
    news: false,
    events: false,
    procedures: false,
    phones: false,
    dataPage: false,
    community: false,
    reports: false,
    demoMap: false,
    realMap: false,
  },
};
