import type { CommunalEvent } from "@/types";

/** Agenda comunal ficticia para el MVP. */
export const events: CommunalEvent[] = [
  {
    id: "evt-1",
    title: "Feria de emprendedores locales",
    description:
      "Feria mensual de emprendedores y productores de la comuna, con música en vivo y actividades familiares.",
    startsAt: "2026-07-12T10:00:00-04:00",
    endsAt: "2026-07-12T18:00:00-04:00",
    locationId: "loc-5",
    category: "comunidad",
  },
  {
    id: "evt-2",
    title: "Reunión territorial: Villa Los Copihues",
    description:
      "Encuentro entre la junta de vecinos y el equipo municipal para priorizar mejoras del sector.",
    startsAt: "2026-07-15T19:00:00-04:00",
    endsAt: "2026-07-15T21:00:00-04:00",
    locationId: "loc-2",
    category: "participación",
  },
  {
    id: "evt-3",
    title: "Campeonato comunal de baby fútbol",
    description:
      "Fecha final del campeonato comunal en el gimnasio municipal. Entrada liberada.",
    startsAt: "2026-07-19T15:00:00-04:00",
    endsAt: "2026-07-19T20:00:00-04:00",
    locationId: "loc-1",
    category: "deporte",
  },
  {
    id: "evt-4",
    title: "Taller de huertos urbanos (sesión 2)",
    description:
      "Segunda sesión del taller gratuito de huertos urbanos en el invernadero del parque.",
    startsAt: "2026-07-11T10:30:00-04:00",
    endsAt: "2026-07-11T13:00:00-04:00",
    locationId: "loc-5",
    category: "medioambiente",
  },
  {
    id: "evt-5",
    title: "Zumba y baile entretenido para adultos mayores",
    description:
      "Clase gratuita de actividad física en la multicancha techada. Sin inscripción previa.",
    startsAt: "2026-07-14T11:00:00-04:00",
    endsAt: "2026-07-14T12:30:00-04:00",
    locationId: "loc-4",
    category: "deporte",
  },
  {
    id: "evt-6",
    title: "Cine comunitario: función familiar",
    description:
      "Proyección gratuita para toda la familia en la sede de la junta de vecinos, con palomitas incluidas.",
    startsAt: "2026-07-17T18:30:00-04:00",
    endsAt: "2026-07-17T21:00:00-04:00",
    locationId: "loc-2",
    category: "cultura",
  },
  {
    id: "evt-7",
    title: "Taller de postulación a fondos concursables",
    description:
      "Aprende a postular tu organización a fondos municipales y regionales 2026. Trae tu idea.",
    startsAt: "2026-07-22T18:00:00-04:00",
    endsAt: "2026-07-22T20:00:00-04:00",
    locationId: "loc-1",
    category: "taller",
  },
  {
    id: "evt-8",
    title: "Corrida familiar Los Aromos 5K",
    description:
      "Corrida comunal por el borde del parque. Inscripción gratuita, hidratación y medallas.",
    startsAt: "2026-07-26T09:00:00-04:00",
    endsAt: "2026-07-26T12:00:00-04:00",
    locationId: "loc-5",
    category: "deporte",
  },
];
