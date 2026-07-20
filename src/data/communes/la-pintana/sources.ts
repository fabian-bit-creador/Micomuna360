import type { DataSource } from "@/types";

/**
 * Registro de fuentes del piloto La Pintana.
 *
 * Espejo legible en docs/fuentes-la-pintana.md. Método de verificación de
 * esta etapa: revisión de los sitios y de su contenido indexado por
 * buscadores (el entorno de desarrollo no permite navegación directa).
 * Nada con status distinto de "verificado" se muestra como vigente.
 *
 * Totales: 16 fuentes registradas — 16 verificadas, 0 pendientes
 * (la ficha de Transparencia Activa pasó de pendiente a verificada el
 * 2026-07-19 con el enlace directo entregado desde pintana.cl).
 */
export const sources: DataSource[] = [
  {
    id: "lp-muni-home",
    institution: "Municipalidad de La Pintana",
    pageName: "Municipalidad de La Pintana (sitio oficial)",
    description:
      "Sitio oficial: noticias, trámites y direcciones municipales.",
    featured: true,
    url: "https://pintana.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes: null,
  },
  {
    id: "lp-muni-direcciones",
    institution: "Municipalidad de La Pintana",
    pageName: "Direcciones Municipales",
    description:
      "Direcciones y horarios de las oficinas municipales.",
    featured: false,
    url: "https://pintana.cl/?page_id=7033",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes:
      "Dirección del edificio consistorial (Avda. Santa Rosa N°12.975) y horarios confirmados en contenido indexado del sitio oficial.",
  },
  {
    id: "lp-muni-tramites",
    institution: "Municipalidad de La Pintana",
    pageName: "Trámites",
    description:
      "Listado oficial de trámites municipales.",
    featured: false,
    url: "https://pintana.cl/?page_id=2460",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes: null,
  },
  {
    id: "lp-muni-pagos",
    institution: "Municipalidad de La Pintana",
    pageName: "Pagos en línea municipales",
    description:
      "Pago del permiso de circulación y otros pagos municipales.",
    featured: true,
    url: "https://pintana.cl/?page_id=4122",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes:
      "Permite pagar el permiso de circulación con RUT y patente; el pago ocurre íntegramente en la plataforma municipal.",
  },
  {
    id: "lp-muni-permisos",
    institution: "Municipalidad de La Pintana",
    pageName: "Permisos de circulación",
    description:
      "Requisitos y atención del permiso de circulación.",
    featured: false,
    url: "https://pintana.cl/?page_id=7910",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes: null,
  },
  {
    id: "lp-muni-licencias",
    institution: "Municipalidad de La Pintana",
    pageName: "Licencias de conducir (reserva de hora)",
    description:
      "Reserva de hora en línea para licencias de conducir.",
    featured: false,
    url: "https://pintana.cl/?page_id=8115",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes:
      "La reserva se realiza en la plataforma externa e-com utilizada por el municipio; los cupos se abren el primer día hábil de cada mes.",
  },
  {
    id: "lp-dideco",
    institution: "DIDECO La Pintana",
    pageName: "DIDECO La Pintana",
    description:
      "Desarrollo comunitario: programas y apoyos sociales.",
    featured: true,
    url: "https://www.dideco.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes: null,
  },
  {
    id: "lp-smartdideco",
    institution: "DIDECO La Pintana",
    pageName: "SmartDIDECO",
    description:
      "Plataforma digital de programas y atenciones DIDECO.",
    featured: true,
    url: "https://www.lapintana.smartdideco.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes: "Plataforma digital de programas y atenciones DIDECO.",
  },
  {
    id: "lp-deportes",
    institution: "Corporación Municipal de Deportes de La Pintana",
    pageName: "Corporación Municipal de Deportes",
    description:
      "Recintos deportivos, talleres y escuelas deportivas.",
    featured: true,
    url: "https://www.pintanadeportes.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes:
      "Incluye páginas propias por recinto (Polideportivo, Club de Campo, talleres).",
  },
  {
    id: "lp-deportes-recintos",
    institution: "Corporación Municipal de Deportes de La Pintana",
    pageName: "Recintos deportivos (direcciones)",
    description:
      "Direcciones de los recintos deportivos comunales.",
    featured: false,
    url: "https://www.pintanadeportes.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes:
      "Direcciones de Estadio Municipal, Club de Campo, Polideportivo y Complejo Las Rosas tomadas del contenido del sitio oficial. Horarios y teléfonos no publicados aquí por no estar verificados.",
  },
  {
    id: "lp-cultura",
    institution: "Corporación Cultural de La Pintana",
    pageName: "Corporación Cultural",
    description:
      "Programación cultural y teatro municipal.",
    featured: true,
    url: "https://www.culturapintana.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes: null,
  },
  {
    id: "lp-geoportal",
    institution: "Municipalidad de La Pintana",
    pageName: "Geoportal comunal (GeoPintana)",
    description:
      "Datos geoespaciales y visores del territorio comunal.",
    featured: true,
    url: "https://geopintana-lapintana.hub.arcgis.com/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes:
      "Fuente candidata de coordenadas oficiales para el mapa (etapa P4).",
  },
  {
    id: "cl-chileatiende",
    institution: "ChileAtiende (Gobierno de Chile)",
    pageName: "ChileAtiende",
    description:
      "Trámites y beneficios del Estado de Chile.",
    featured: true,
    url: "https://www.chileatiende.gob.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2027-01-19",
    notes: null,
  },
  {
    id: "cl-registro-social",
    institution: "Ministerio de Desarrollo Social y Familia",
    pageName: "Registro Social de Hogares",
    description:
      "Registro Social de Hogares: puerta de entrada a los beneficios del Estado.",
    featured: false,
    url: "https://www.registrosocial.gob.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2027-01-19",
    notes: null,
  },
  {
    id: "cl-portal-transparencia",
    institution: "Consejo para la Transparencia",
    pageName: "Portal de Transparencia del Estado",
    description:
      "Portal general de Transparencia del Estado.",
    featured: false,
    url: "https://www.portaltransparencia.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2027-01-19",
    notes:
      "Punto de entrada a la Transparencia Activa municipal. El enlace directo a la sección de La Pintana queda pendiente de verificación.",
  },
  {
    id: "lp-transparencia-directa",
    institution: "Municipalidad de La Pintana",
    pageName: "Transparencia Activa municipal",
    description:
      "Transparencia Activa de la Municipalidad: dotación, contratos y presupuesto.",
    featured: true,
    url: "https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "verificado",
    validUntil: "2026-10-19",
    notes:
      "Enlace directo obtenido desde el acceso «Ley de Transparencia» del sitio oficial pintana.cl (verificado por el responsable del proyecto).",
  },
];

const byId = new Map(sources.map((s) => [s.id, s]));

export function getSource(id: string): DataSource | null {
  return byId.get(id) ?? null;
}
