/**
 * URL pública del sitio. Se usa como `metadataBase` para que las imágenes y
 * enlaces de vista previa (WhatsApp, redes) apunten a URLs absolutas.
 * En Vercel se toma el dominio de producción del propio despliegue.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://micomuna360.vercel.app";

/** Identidad y textos oficiales de la marca (ver docs/identidad y design-brief). */
export const siteConfig = {
  name: "MiComuna360",
  appName: "MuniApp",
  lema: "Tu comuna en un solo lugar",
  sublema: "Conecta, participa y transforma tu entorno.",
  description:
    "MiComuna360 es una plataforma digital que conecta vecinos, municipios y datos comunales en un solo lugar. Hoy permite informarse sobre noticias, actividades, trámites, teléfonos útiles y datos de tu comuna; en sus próximas etapas permitirá reportar problemas, hacer solicitudes con seguimiento y participar activamente en el desarrollo del territorio.",
  porQueExiste:
    "Muchas oportunidades, beneficios y servicios existen, pero no siempre llegan a las personas de forma clara, simple y oportuna. MiComuna360 busca cerrar esa brecha, conectando información, comunidad y gestión pública para que cada vecino pueda participar mejor en el desarrollo de su comuna.",
  mision:
    "Acercar la gestión municipal a las personas mediante tecnología, datos y herramientas digitales, creando una plataforma cercana, accesible y transparente donde vecinos, municipios y organizaciones puedan informarse, participar, colaborar y tomar mejores decisiones para el desarrollo de sus comunas.",
  vision:
    "Ser una plataforma referente en Chile en gestión comunal inteligente, promoviendo municipios más transparentes, eficientes y cercanos, y ciudadanos más educados, empoderados y protagonistas del desarrollo de sus territorios, avanzando hacia una cobertura que permita llegar a todo Chile.",
  historia: [
    "MiComuna360 nació en una comuna como la tuya. Nació de ver, de cerca, que los talleres, los beneficios, los subsidios y las oportunidades existen — pero no siempre llegan a tiempo, ni de forma clara, ni a quienes más los necesitan.",
    "Cuando la información se queda en un papel pegado en una oficina o en una publicación perdida, hay familias que pierden postulaciones, vecinos que no se enteran de la hora médica, dirigentes que golpean puertas sin respuesta. Esa brecha no es falta de oportunidades: es falta de conexión.",
    "Por eso existe esta plataforma: para que la información de tu comuna te encuentre a ti, y no al revés. Porque una comunidad informada participa mejor, exige mejor, colabora mejor y crece junta.",
  ],
  noPartidista:
    "MiComuna360 no pertenece a ningún partido ni proyecto político. Es una herramienta al servicio de las personas, los territorios y las comunidades — no de un color político. La información pública se presenta de forma clara y neutral, para que cada vecino saque sus propias conclusiones.",
  noReemplaza:
    "MiComuna360 no reemplaza a tu municipalidad. El municipio decide, ejecuta y responde; la plataforma acerca la información, los servicios y la participación a las personas, y ayuda a que ese trabajo sea más visible, ordenado y cercano.",
  valores: [
    {
      name: "Cercanía",
      description:
        "La tecnología debe sentirse humana y simple: cualquier vecino puede usar esta plataforma.",
    },
    {
      name: "Transparencia",
      description:
        "La información pública se presenta clara, visual y comprensible, para saber qué ocurre en tu comuna.",
    },
    {
      name: "Participación",
      description:
        "Los vecinos no son solo receptores de información: son protagonistas del desarrollo comunal.",
    },
    {
      name: "Educación ciudadana",
      description:
        "Una comunidad informada toma mejores decisiones y aprovecha más oportunidades.",
    },
    {
      name: "Equidad territorial",
      description:
        "Visibilizar necesidades y sectores postergados, para que las oportunidades lleguen a todos por igual.",
    },
    {
      name: "Colaboración",
      description:
        "El crecimiento comunal se construye conectando vecinos, organizaciones, colegios y municipio.",
    },
  ],
  roles: [
    {
      name: "Los vecinos",
      description: "Se informan, participan, reportan y proponen.",
      color: "teal",
    },
    {
      name: "MiComuna360",
      description: "Acerca y conecta la información, los servicios y los datos.",
      color: "sky",
    },
    {
      name: "Tu municipio",
      description: "Decide, ejecuta y responde con trazabilidad.",
      color: "terracotta",
    },
  ],
} as const;
