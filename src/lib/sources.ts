import type { DataSource, SourceStatus } from "@/types";

/** Estado efectivo de una fuente, considerando la vigencia de la revisión. */
export type SourceFreshness = SourceStatus | "revision_vencida";

/**
 * Una fuente "verificada" cuya fecha de vigencia (validUntil) ya pasó no
 * debe mostrarse como verificada vigente: pasa a "revision_vencida". El
 * contenido puede seguir visible, pero con esa advertencia.
 */
export function getSourceFreshness(
  source: DataSource,
  now: Date = new Date()
): SourceFreshness {
  if (
    source.status === "verificado" &&
    source.validUntil &&
    new Date(`${source.validUntil}T23:59:59-04:00`) < now
  ) {
    return "revision_vencida";
  }
  return source.status;
}
