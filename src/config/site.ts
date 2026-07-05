/** Identidad y textos oficiales de la marca (ver docs/identidad.md). */
export const siteConfig = {
  name: "MiComuna360",
  appName: "MuniApp",
  lema: "Tu comuna en un solo lugar",
  sublema: "Conecta, participa y transforma tu entorno.",
  description:
    "MiComuna360 es una plataforma digital que conecta vecinos, municipios y datos comunales en un solo lugar. Permite informarse, realizar solicitudes, reportar problemas, visualizar indicadores, conocer beneficios y participar activamente en el desarrollo del territorio.",
  porQueExiste:
    "Muchas oportunidades, beneficios y servicios existen, pero no siempre llegan a las personas de forma clara, simple y oportuna. MiComuna360 busca cerrar esa brecha, conectando información, comunidad y gestión pública para que cada vecino pueda participar mejor en el desarrollo de su comuna.",
  /** Comuna ficticia usada en el MVP de demostración. */
  demoComuna: {
    name: "Los Aromos",
    /** Centro aproximado del mapa demo (zona sur de Santiago, ficticio). */
    center: { lat: -33.58, lng: -70.632 },
    zoom: 14,
  },
} as const;
