import type { CitizenService } from "@/types";

/**
 * Servicios ciudadanos del piloto La Pintana. Cada servicio se resuelve en
 * el sitio oficial de la institución responsable (MiComuna360 no administra
 * ningún trámite ni solicita datos personales). Cada entrada referencia una
 * fuente verificada de sources.ts.
 */
export const services: CitizenService[] = [
  {
    id: "svc-permiso-circulacion",
    title: "Pagar el permiso de circulación",
    category: "pagos",
    description:
      "Paga en línea el permiso anual de tu vehículo con tu RUT y la patente. Después del pago puedes descargar el permiso en formato PDF.",
    steps: [
      "Ten a mano la patente y el RUT del propietario.",
      "Revisa que la revisión técnica y el SOAP estén vigentes.",
      "Paga con tarjeta en la plataforma municipal.",
      "Descarga tu permiso en formato PDF.",
    ],
    institution: "Municipalidad de La Pintana",
    externalUrl: "https://pintana.cl/?page_id=4122",
    icon: "FileText",
    sourceId: "lp-muni-permisos",
  },
  {
    id: "svc-licencia-conducir",
    title: "Reservar hora para la licencia de conducir",
    category: "tramites",
    description:
      "Agenda tu hora en línea para obtener o renovar la licencia. Los cupos del mes siguiente se abren el primer día hábil de cada mes.",
    steps: [
      "Entra a la página municipal de licencias.",
      "Sigue el enlace de reserva de horas en línea.",
      "Guarda tu comprobante de reserva.",
    ],
    institution: "Municipalidad de La Pintana",
    externalUrl: "https://pintana.cl/?page_id=8115",
    icon: "CalendarDays",
    sourceId: "lp-muni-licencias",
  },
  {
    id: "svc-tramites-municipales",
    title: "Ver todos los trámites municipales",
    category: "tramites",
    description:
      "El listado oficial de trámites de la municipalidad: qué necesitas, dónde ir y en qué horario.",
    steps: [],
    institution: "Municipalidad de La Pintana",
    externalUrl: "https://pintana.cl/?page_id=2460",
    icon: "Building2",
    sourceId: "lp-muni-tramites",
  },
  {
    id: "svc-dideco",
    title: "Acceder a programas y apoyos DIDECO",
    category: "social",
    description:
      "Programas sociales, apoyos y atenciones de la Dirección de Desarrollo Comunitario, a través de su plataforma digital.",
    steps: [],
    institution: "DIDECO La Pintana",
    externalUrl: "https://www.lapintana.smartdideco.cl/",
    icon: "HandHeart",
    sourceId: "lp-smartdideco",
  },
  {
    id: "svc-registro-social",
    title: "Registro Social de Hogares",
    category: "social",
    description:
      "Ingresa o actualiza tu Registro Social de Hogares, la puerta de entrada a los beneficios del Estado.",
    steps: [],
    institution: "Ministerio de Desarrollo Social y Familia",
    externalUrl: "https://www.registrosocial.gob.cl/",
    icon: "Home",
    sourceId: "cl-registro-social",
  },
  {
    id: "svc-deportes",
    title: "Talleres y escuelas deportivas",
    category: "deporte_cultura",
    description:
      "Conoce los talleres, escuelas deportivas y recintos de la Corporación Municipal de Deportes.",
    steps: [],
    institution: "Corporación Municipal de Deportes de La Pintana",
    externalUrl: "https://www.pintanadeportes.cl/",
    icon: "Dumbbell",
    sourceId: "lp-deportes",
  },
  {
    id: "svc-cultura",
    title: "Programación cultural",
    category: "deporte_cultura",
    description:
      "La cartelera de la Corporación Cultural: teatro municipal, talleres y actividades para toda la familia.",
    steps: [],
    institution: "Corporación Cultural de La Pintana",
    externalUrl: "https://www.culturapintana.cl/",
    icon: "Music",
    sourceId: "lp-cultura",
  },
  {
    id: "svc-chileatiende",
    title: "Trámites del Estado (ChileAtiende)",
    category: "tramites",
    description:
      "Bonos, certificados, pensiones y todos los trámites del Estado de Chile explicados paso a paso.",
    steps: [],
    institution: "ChileAtiende (Gobierno de Chile)",
    externalUrl: "https://www.chileatiende.gob.cl/",
    icon: "FileText",
    sourceId: "cl-chileatiende",
  },
  {
    id: "svc-transparencia",
    title: "Transparencia Activa municipal",
    category: "transparencia",
    description:
      "Consulta la información pública que la Municipalidad de La Pintana publica por ley: dotación, contratos, presupuesto y más, directamente en su ficha oficial.",
    steps: [],
    institution: "Municipalidad de La Pintana · Portal de Transparencia",
    externalUrl:
      "https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124",
    icon: "BookOpen",
    sourceId: "lp-transparencia-directa",
  },
];
