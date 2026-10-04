import type { Weekday } from "@/types";

export const weekdays: {
  id: Weekday;
  short: string;
  label: string;
  plural: string;
}[] = [
  { id: "lunes", short: "Lun", label: "lunes", plural: "lunes" },
  { id: "martes", short: "Mar", label: "martes", plural: "martes" },
  { id: "miercoles", short: "Mié", label: "miércoles", plural: "miércoles" },
  { id: "jueves", short: "Jue", label: "jueves", plural: "jueves" },
  { id: "viernes", short: "Vie", label: "viernes", plural: "viernes" },
  { id: "sabado", short: "Sáb", label: "sábado", plural: "sábados" },
  { id: "domingo", short: "Dom", label: "domingo", plural: "domingos" },
];

/** "Lunes, miércoles y viernes"; cinco días seguidos, "Lunes a viernes". */
export function formatDays(days: Weekday[]): string {
  const labels = days.map((d) => weekdays.find((w) => w.id === d)!.label);
  const text =
    days.join() === "lunes,martes,miercoles,jueves,viernes"
      ? "lunes a viernes"
      : labels.length === 1
        ? labels[0]
        : `${labels.slice(0, -1).join(", ")} y ${labels[labels.length - 1]}`;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Día de la semana de hoy en Chile (las ferias siguen la hora local). */
export function todayInChile(now: Date = new Date()): Weekday {
  const name = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "America/Santiago",
  }).format(now);
  const order: Record<string, Weekday> = {
    Monday: "lunes",
    Tuesday: "martes",
    Wednesday: "miercoles",
    Thursday: "jueves",
    Friday: "viernes",
    Saturday: "sabado",
    Sunday: "domingo",
  };
  return order[name];
}

/** «Jueves y domingo, de 09:00 a 14:45» (y festivos, si corresponde). */
export function formatMarketSchedule(market: {
  days: Weekday[];
  holidays: boolean;
  startTime: string;
  endTime: string;
}): string {
  const days = formatDays(market.days);
  return `${days}${market.holidays ? " y festivos" : ""}, de ${market.startTime} a ${market.endTime}`;
}
