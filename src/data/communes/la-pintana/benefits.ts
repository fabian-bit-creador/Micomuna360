import type { BenefitOrientation } from "@/types";

/**
 * Orientaciones del "¿a qué puedo postular?" para el piloto La Pintana.
 *
 * REGLAS:
 * - Orienta, no resuelve: cada tarjeta dice qué revisar y dónde, y la
 *   decisión siempre la toma la institución responsable.
 * - No se afirman requisitos ni montos que no estén verificados. Cuando el
 *   enlace lleva a un catálogo y no a la ficha exacta, `searchHint` indica
 *   qué buscar allí.
 * - Nada aquí pide RUT, clave ni datos personales.
 */
export const benefits: BenefitOrientation[] = [
  {
    id: "ben-rsh",
    title: "Registro Social de Hogares",
    summary:
      "Es la puerta de entrada a la mayoría de los beneficios del Estado. Si no estás inscrito o tus datos cambiaron, parte por aquí.",
    institution: "Ministerio de Desarrollo Social y Familia",
    triggers: [],
    always: true,
    url: "https://www.registrosocial.gob.cl/",
    searchHint: null,
    icon: "Home",
    sourceId: "cl-registro-social",
  },
  {
    id: "ben-dideco",
    title: "Programas y apoyos de tu municipio",
    summary:
      "La Dirección de Desarrollo Comunitario atiende casos sociales y gestiona programas locales que no siempre aparecen en los catálogos nacionales.",
    institution: "DIDECO La Pintana",
    triggers: [],
    always: true,
    url: "https://www.lapintana.smartdideco.cl/",
    searchHint: null,
    icon: "HandHeart",
    sourceId: "lp-smartdideco",
  },
  {
    id: "ben-pension-mayor",
    title: "Pensiones y beneficios para personas mayores",
    summary:
      "Aportes del Estado a las pensiones y beneficios asociados a la edad. Revisa cuáles aplican a tu caso y cómo se solicitan.",
    institution: "ChileAtiende (Gobierno de Chile)",
    triggers: ["adulto_mayor"],
    url: "https://www.chileatiende.gob.cl/",
    searchHint: "Busca «pensión garantizada universal» y «personas mayores».",
    icon: "HeartHandshake",
    sourceId: "cl-chileatiende",
  },
  {
    id: "ben-escolar",
    title: "Becas y beneficios escolares",
    summary:
      "Alimentación, útiles, salud escolar y becas para estudiantes. Muchos se asignan automáticamente, pero otros hay que solicitarlos.",
    institution: "ChileAtiende (Gobierno de Chile)",
    triggers: ["estudiantes"],
    url: "https://www.chileatiende.gob.cl/",
    searchHint: "Busca «beneficios estudiantiles» y «becas JUNAEB».",
    icon: "GraduationCap",
    sourceId: "cl-chileatiende",
  },
  {
    id: "ben-empleo-bne",
    title: "Bolsa Nacional de Empleo",
    summary:
      "Ofertas de trabajo publicadas en la plataforma pública de empleo del Estado.",
    institution: "Bolsa Nacional de Empleo",
    triggers: ["empleo"],
    url: "https://www.bne.cl/",
    searchHint: null,
    icon: "Briefcase",
    sourceId: "cl-bne",
  },
  {
    id: "ben-capacitacion",
    title: "Cursos y capacitación gratuita",
    summary:
      "Cursos financiados por el Estado para aprender un oficio o mejorar tus posibilidades de empleo.",
    institution: "SENCE",
    triggers: ["empleo"],
    url: "https://www.sence.gob.cl/personas",
    searchHint: null,
    icon: "BookOpen",
    sourceId: "cl-sence",
  },
  {
    id: "ben-emprendimiento",
    title: "Apoyo para emprender",
    summary:
      "Fondos, asesorías y capacitación para quienes tienen o quieren iniciar un negocio.",
    institution: "SERCOTEC",
    triggers: ["emprendimiento"],
    url: "https://www.sercotec.cl/",
    searchHint: null,
    icon: "Store",
    sourceId: "cl-sercotec",
  },
  {
    id: "ben-agua-vivienda",
    title: "Apoyos para servicios básicos y vivienda",
    summary:
      "Subsidios que ayudan a pagar el agua potable o a postular a vivienda. Algunos se solicitan en el municipio y otros en línea.",
    institution: "ChileAtiende (Gobierno de Chile)",
    triggers: ["vivienda_servicios"],
    url: "https://www.chileatiende.gob.cl/",
    searchHint:
      "Busca «subsidio de agua potable» y «subsidio de arriendo o vivienda».",
    icon: "Droplets",
    sourceId: "cl-chileatiende",
  },
  {
    id: "ben-salud",
    title: "Atención de salud y medicamentos",
    summary:
      "Inscripción en el centro de salud que te corresponde, tramo de FONASA y beneficios asociados.",
    institution: "ChileAtiende (Gobierno de Chile)",
    triggers: ["salud"],
    url: "https://www.chileatiende.gob.cl/",
    searchHint: "Busca «FONASA» e «inscripción en CESFAM».",
    icon: "Cross",
    sourceId: "cl-chileatiende",
  },
  {
    id: "ben-discapacidad",
    title: "Credencial y apoyos por discapacidad",
    summary:
      "La credencial de discapacidad abre la puerta a ayudas técnicas, beneficios y programas de cuidado.",
    institution: "ChileAtiende (Gobierno de Chile)",
    triggers: ["discapacidad"],
    url: "https://www.chileatiende.gob.cl/",
    searchHint:
      "Busca «credencial de discapacidad» y «Registro Nacional de la Discapacidad».",
    icon: "Accessibility",
    sourceId: "cl-chileatiende",
  },
];
