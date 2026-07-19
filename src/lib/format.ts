const TIME_ZONE = "America/Santiago";

/**
 * Los strings de solo-fecha ("2026-07-19") se interpretan como medianoche
 * UTC; anclamos al mediodía de Chile para no retroceder un día al formatear.
 */
function toDate(iso: string): Date {
  return new Date(iso.length === 10 ? `${iso}T12:00:00-04:00` : iso);
}

/** "5 de julio de 2026" */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeZone: TIME_ZONE,
  }).format(toDate(iso));
}

/** "sáb 26 jul" */
export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

/** Día del mes: "26" */
export function formatDay(iso: string): string {
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

/** Mes corto: "jul" */
export function formatMonth(iso: string): string {
  return new Intl.DateTimeFormat("es-CL", {
    month: "short",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

/** "10:00" (hora de Chile continental) */
export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

/** 98450 → "98.450" */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-CL").format(value);
}
