import type { CommunalEvent } from "@/types";

/** Agenda comunal ficticia para el MVP. */
export const events: CommunalEvent[] = [
  {
    id: "evt-1",
    title: "Feria de emprendedores locales",
    description:
      "Feria mensual de emprendedores y productores de la comuna, con música en vivo y actividades familiares.",
    startsAt: "2026-07-12T10:00:00Z",
    endsAt: "2026-07-12T18:00:00Z",
    locationId: "loc-5",
    category: "comunidad",
  },
  {
    id: "evt-2",
    title: "Reunión territorial: Villa Los Copihues",
    description:
      "Encuentro entre la junta de vecinos y el equipo municipal para priorizar mejoras del sector.",
    startsAt: "2026-07-15T19:00:00Z",
    endsAt: "2026-07-15T21:00:00Z",
    locationId: "loc-2",
    category: "participación",
  },
  {
    id: "evt-3",
    title: "Campeonato comunal de baby fútbol",
    description:
      "Fecha final del campeonato comunal en el gimnasio municipal. Entrada liberada.",
    startsAt: "2026-07-19T15:00:00Z",
    endsAt: "2026-07-19T20:00:00Z",
    locationId: "loc-1",
    category: "deporte",
  },
  {
    id: "evt-4",
    title: "Taller de huertos urbanos (sesión 2)",
    description:
      "Segunda sesión del taller gratuito de huertos urbanos en el invernadero del parque.",
    startsAt: "2026-07-11T10:30:00Z",
    endsAt: "2026-07-11T13:00:00Z",
    locationId: "loc-5",
    category: "medioambiente",
  },
];
