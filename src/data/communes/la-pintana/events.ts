import type { CommunalEvent } from "@/types";

/**
 * Agenda comunal: actividades publicadas por la Corporación Cultural y la
 * Corporación Municipal de Deportes, consultadas el 2026-09-27. Las
 * actividades pasadas dejan de mostrarse solas (getUpcomingEvents).
 * Horas en horario de verano de Chile continental (-03:00).
 */
export const events: CommunalEvent[] = [
  {
    id: "lp-ev-donde-viven-los-recuerdos",
    title: "Donde viven los recuerdos",
    description:
      "Obra de teatro familiar sobre la memoria y el cuidado: Clara nota que su abuela empieza a olvidar.",
    startsAt: "2026-09-28T12:00:00-03:00",
    endsAt: null,
    locationId: null,
    category: "cultura",
    venue: "Teatro Municipal de La Pintana",
    access: "Entrada liberada, con entrada reservada en línea. Llegar 40 minutos antes.",
    url: "https://ticket.culturapintana.cl/cartelera/donde-viven-los-recuerdos/",
    sourceId: "lp-cultura-cartelera",
  },
  {
    id: "lp-ev-romeo-y-julieta-alamala",
    title: "Romeo y Julieta Alamala",
    description:
      "Comedia de ALAMALA Teatro que parodia la obra de Shakespeare con humor de teatro popular.",
    startsAt: "2026-10-02T19:30:00-03:00",
    endsAt: null,
    locationId: null,
    category: "cultura",
    venue: "Teatro Municipal de La Pintana",
    access: "Entrada liberada, con entrada reservada en línea. Llegar 40 minutos antes.",
    url: "https://ticket.culturapintana.cl/cartelera/romeo-y-julieta-alamala/",
    sourceId: "lp-cultura-cartelera",
  },
  {
    id: "lp-ev-sombras-de-chile",
    title: "Sombras de Chile",
    description:
      "Teatro de sombras de TeAbrazo Teatro: luz, cuerpo y música para contar realidades del país.",
    startsAt: "2026-10-04T16:30:00-03:00",
    endsAt: null,
    locationId: null,
    category: "cultura",
    venue: "Teatro Municipal de La Pintana",
    access: "Entrada liberada, con entrada reservada en línea. Llegar 40 minutos antes.",
    url: "https://ticket.culturapintana.cl/cartelera/sombras-de-chile-2026/",
    sourceId: "lp-cultura-cartelera",
  },
  {
    id: "lp-ev-corrida-soy-mas-fit-2026",
    title: "Corrida Soy Más FIT La Pintana 2026",
    description:
      "Corrida de 10K y 3K, con categorías por edad y para personas con discapacidad. Entrega de kit el sábado 7 de noviembre.",
    startsAt: "2026-11-08T08:00:00-03:00",
    endsAt: "2026-11-08T13:00:00-03:00",
    locationId: null,
    category: "deporte",
    venue: "Plaza Cívica de La Pintana",
    access: "Con inscripción pagada en el sitio de la Corporación de Deportes.",
    url: "https://www.pintanadeportes.cl/tienda/corrida-soy-mas-fit-la-pintana-2026/",
    sourceId: "lp-deportes-corrida",
  },
];
