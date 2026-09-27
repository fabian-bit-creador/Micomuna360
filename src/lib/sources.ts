import type { DataSource, SourceStatus } from "@/types";

/** Estado efectivo de una fuente, considerando la vigencia de la revisión. */
export type SourceFreshness = SourceStatus | "revision_vencida";

/** Fecha de hoy en Chile continental, "YYYY-MM-DD" (con horario de verano). */
export function todayInChile(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * Una fuente "verificada" cuya fecha de vigencia (validUntil) ya pasó no
 * debe mostrarse como verificada vigente: pasa a "revision_vencida". La
 * vigencia cubre el día completo de validUntil en hora de Chile.
 *
 * Las páginas se prerenderizan y se regeneran periódicamente (ver
 * `revalidate` en app/(public)/[comuna]/layout.tsx), así que el cambio de
 * estado llega al sitio sin necesidad de un nuevo despliegue.
 */
export function getSourceFreshness(
  source: DataSource,
  now: Date = new Date()
): SourceFreshness {
  if (
    source.status === "verificado" &&
    source.validUntil &&
    source.validUntil < todayInChile(now)
  ) {
    return "revision_vencida";
  }
  return source.status;
}
