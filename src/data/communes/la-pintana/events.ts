import type { CommunalEvent } from "@/types";

import { culturalEvents } from "./events-cultura";

/**
 * Agenda comunal. Las funciones de la Corporación Cultural salen de su
 * cartelera (events-cultura.ts, generado; se renueva cada mes con
 * docs/fuentes/la-pintana-agenda-<aaaa-mm>/). Las actividades de la
 * Corporación Municipal de Deportes se cargan aquí. Las actividades pasadas
 * dejan de mostrarse solas (getUpcomingEvents). Horas en horario de verano
 * de Chile continental (-03:00).
 */
export const events: CommunalEvent[] = [
  ...culturalEvents,
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
