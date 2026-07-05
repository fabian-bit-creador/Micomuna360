import type { Procedure } from "@/types";

/**
 * Trámites y beneficios ficticios (verosímiles para Chile) del MVP.
 * Los datos de lugares y horarios corresponden a la comuna demo Los Aromos.
 */
export const procedures: Procedure[] = [
  {
    id: "proc-1",
    title: "Certificado de residencia",
    slug: "certificado-residencia",
    summary:
      "Acredita tu domicilio en la comuna para postulaciones, trabajos o trámites bancarios.",
    category: "certificados",
    requirements: [
      "Cédula de identidad vigente",
      "Una cuenta de servicio (luz, agua o gas) a tu nombre, o declaración jurada simple",
    ],
    steps: [
      "Reúne tu cédula y una cuenta de servicio con tu dirección.",
      "Acércate al módulo de atención ciudadana del edificio consistorial.",
      "Entrega los documentos y firma la solicitud.",
      "Recibe tu certificado impreso en el momento.",
    ],
    cost: "Gratuito",
    duration: "Se entrega en el momento",
    place: "Edificio consistorial, módulo de atención ciudadana",
    schedule: "Lunes a viernes, 8:30–14:00",
  },
  {
    id: "proc-2",
    title: "Permiso de circulación",
    slug: "permiso-circulacion",
    summary:
      "Renueva el permiso anual de tu vehículo en la comuna, presencial o con pago en línea.",
    category: "permisos",
    requirements: [
      "Permiso de circulación anterior",
      "Revisión técnica y verificación de gases vigentes",
      "Seguro obligatorio (SOAP) vigente",
    ],
    steps: [
      "Verifica que la revisión técnica y el SOAP estén vigentes.",
      "Presenta los documentos en la Dirección de Tránsito o en el portal en línea.",
      "Paga el permiso (puede ser en dos cuotas: marzo y agosto).",
      "Descarga o retira tu permiso y guárdalo en el vehículo.",
    ],
    cost: "Variable según tasación del vehículo",
    duration: "En el momento (presencial) o 24 horas (en línea)",
    place: "Dirección de Tránsito, edificio consistorial",
    schedule: "Lunes a viernes, 8:30–14:00",
  },
  {
    id: "proc-3",
    title: "Subsidio de agua potable",
    slug: "subsidio-agua-potable",
    summary:
      "Rebaja de hasta el 100% en tu cuenta de agua para hogares que más lo necesitan.",
    category: "beneficios",
    requirements: [
      "Registro Social de Hogares en la comuna",
      "Cuenta de agua a nombre de un integrante del hogar",
      "No tener deudas impagas con la sanitaria (o convenio de pago)",
    ],
    steps: [
      "Revisa que tu Registro Social de Hogares esté actualizado.",
      "Lleva tu última cuenta de agua y tu cédula al Departamento Social.",
      "Completa la solicitud con el equipo social.",
      "Espera la resolución; el descuento aparece en tu próxima boleta.",
    ],
    cost: "Gratuito",
    duration: "Resolución en 30 días aprox.",
    place: "Departamento Social (DIDECO)",
    schedule: "Lunes a viernes, 8:30–13:30",
  },
  {
    id: "proc-4",
    title: "Registro Social de Hogares",
    slug: "registro-social-hogares",
    summary:
      "Ingresa o actualiza tu registro para acceder a beneficios del Estado y del municipio.",
    category: "social",
    requirements: [
      "Cédula de identidad de todos los integrantes del hogar",
      "Documento que acredite domicilio (cuenta de servicio o contrato)",
    ],
    steps: [
      "Reúne las cédulas del hogar y un comprobante de domicilio.",
      "Solicita atención en el Departamento Social o hazlo en línea con ClaveÚnica.",
      "Completa la encuesta con la información de tu hogar.",
      "Un encuestador visitará tu domicilio para validar los datos.",
    ],
    cost: "Gratuito",
    duration: "Actualización visible en 30–60 días",
    place: "Departamento Social (DIDECO) o registrosocial.gob.cl",
    schedule: "Lunes a viernes, 8:30–13:30",
  },
  {
    id: "proc-5",
    title: "Patente comercial para emprendedores",
    slug: "patente-comercial",
    summary:
      "Formaliza tu negocio o emprendimiento en la comuna, incluida la patente MEF para microempresa familiar.",
    category: "permisos",
    requirements: [
      "Iniciación de actividades en el SII",
      "Documento que acredite el uso del local (propiedad, arriendo o autorización)",
      "Informe de zonificación favorable",
    ],
    steps: [
      "Solicita el informe de zonificación en Obras Municipales.",
      "Presenta la solicitud de patente en Rentas Municipales.",
      "Adjunta la iniciación de actividades y el documento del local.",
      "Paga la patente semestral una vez aprobada.",
    ],
    cost: "Variable según capital declarado",
    duration: "15 días hábiles aprox.",
    place: "Rentas Municipales, edificio consistorial",
    schedule: "Lunes a viernes, 8:30–14:00",
  },
  {
    id: "proc-6",
    title: "Ayuda social en emergencias",
    slug: "ayuda-social-emergencia",
    summary:
      "Apoyo municipal en situaciones críticas: incendio, catástrofe, salud grave o pérdida de vivienda.",
    category: "social",
    requirements: [
      "Cédula de identidad",
      "Registro Social de Hogares (el equipo puede ayudarte a crearlo si no lo tienes)",
    ],
    steps: [
      "Contacta al Departamento Social o acude directamente en horario de atención.",
      "Relata tu situación a la trabajadora social de turno.",
      "El equipo evalúa el caso y realiza visita si corresponde.",
      "Recibe la ayuda definida (canasta, materiales, aporte económico u orientación).",
    ],
    cost: "Gratuito",
    duration: "Atención prioritaria según urgencia",
    place: "Departamento Social (DIDECO)",
    schedule: "Lunes a viernes, 8:30–13:30 (emergencias: teléfono 24 h)",
  },
];
