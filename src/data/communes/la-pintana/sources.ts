import type { DataSource } from "@/types";

/**
 * Registro de fuentes del piloto La Pintana.
 *
 * Espejo legible en docs/fuentes-la-pintana.md. Método de verificación de
 * esta etapa: revisión de los sitios y de su contenido indexado por
 * buscadores (el entorno de desarrollo no permite navegación directa).
 * Nada con status distinto de "verificado" se muestra como vigente.
 */
export const sources: DataSource[] = [
  {
    id: "lp-muni-home",
    institution: "Municipalidad de La Pintana",
    pageName: "Sitio oficial municipal",
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
    pageName: "Pagos online",
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
    pageName: "Sitio DIDECO",
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
    pageName: "Plataforma SmartDIDECO",
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
    pageName: "Sitio oficial de la Corporación",
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
    pageName: "Sitio oficial de la Corporación Cultural",
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
    pageName: "Portal de trámites del Estado",
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
    pageName: "Transparencia Activa municipal (enlace directo)",
    url: "https://www.portaltransparencia.cl/",
    publishedAt: null,
    verifiedAt: "2026-07-19",
    status: "pendiente",
    validUntil: null,
    notes:
      "PENDIENTE: confirmar URL exacta de la ficha de La Pintana en el Portal de Transparencia antes de publicar un enlace directo.",
  },
];

const byId = new Map(sources.map((s) => [s.id, s]));

export function getSource(id: string): DataSource | null {
  return byId.get(id) ?? null;
}
