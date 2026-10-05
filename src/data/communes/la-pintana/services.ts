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
      "Revisa que la revisión técnica y el SOAP estén vigentes: el sistema los verifica antes del pago.",
      "Paga en la plataforma municipal.",
      "Descarga tu permiso en formato PDF, con firma electrónica avanzada.",
    ],
    institution: "Municipalidad de La Pintana",
    externalUrl: "https://pintana.cl/?page_id=7910",
    icon: "FileText",
    sourceId: "lp-muni-permisos",
    guide: {
      forWhom:
        "Dueños de un vehículo que sacan o renuevan su permiso en La Pintana. Si el permiso anterior es de otra comuna, el sistema te pide un formulario de traslado.",
      cost: "Depende del vehículo. El primer y el segundo permiso se calculan con la factura; desde el tercero, con la tabla de tasación que publica cada año el Servicio de Impuestos Internos.",
      where:
        "En línea, desde tu casa. En persona, en la Dirección de Tránsito.",
      deadline:
        "Al pagar en línea lo descargas al tiro. Si vienes de otra comuna, el municipio habilita tu vehículo en un plazo no superior a 48 horas.",
      placeId: "lp-pl-transito",
      hours:
        "Lunes de 8:30 a 14:00 y de 15:00 a 17:00 · Martes a viernes de 8:30 a 14:00",
      phone: "2 2389 6388",
      documents: [
        "Permiso de circulación del año anterior, pagado completo.",
        "Seguro obligatorio (SOAP) vigente para el período siguiente.",
        "Revisión técnica y análisis de gases vigentes, o certificado de homologación.",
        "Multas de tránsito pagadas, si tienes.",
        "Si vienes de otra comuna: copia escaneada del padrón y del permiso anterior.",
      ],
      warnings: [],
    },
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
      "Si tu licencia es de otra comuna, primero escribe a licenciadeconducir@pintana.cl con tus documentos de residencia; cuando los validen, podrás reservar.",
    ],
    institution: "Municipalidad de La Pintana",
    externalUrl: "https://pintana.cl/?page_id=8115",
    icon: "CalendarDays",
    sourceId: "lp-muni-licencias",
    guide: {
      forWhom:
        "Quienes viven en La Pintana, para primeras licencias, renovaciones y duplicados. La clase B se saca desde los 18 años, o a los 17 con curso de escuela de conductores y autorización notarial de ambos padres.",
      cost: null,
      where: "En la Dirección de Tránsito, con hora reservada en línea.",
      deadline:
        "Las horas del mes siguiente se abren el primer día hábil de cada mes, con cupos limitados. El examen práctico se agenda según disponibilidad.",
      placeId: "lp-pl-transito",
      hours:
        "Renovación: con hora reservada · Duplicados y otros trámites: 12:30 a 13:30, por orden de llegada · Retiro de licencias: 15:00 a 16:00",
      phone: "22 389 6386",
      documents: [
        "Cédula de identidad vigente.",
        "Algo que acredite que vives en la comuna: una cuenta impresa a tu nombre con dirección en La Pintana o la cartola del Registro Social de Hogares impresa, entre otras opciones de la página oficial.",
        "Para una primera licencia: certificado original de 8.º básico o superior.",
        "Para renovar: la licencia actual y el comprobante de pago impreso.",
      ],
      warnings: [
        "Si estás en el Registro Nacional de Deudores de Pensiones de Alimentos, no puedes sacar ni renovar la licencia hasta regularizar (Ley 21.389).",
        "Si tienes hipertensión, diabetes u otro tratamiento en curso, la Dirección recomienda llevar el Anexo 4 firmado por tu médico.",
        "El certificado de residencia de una junta de vecinos no sirve para acreditar domicilio.",
      ],
    },
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
