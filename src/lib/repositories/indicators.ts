import { getCommune } from "@/config/communes";
import { getCommuneData } from "@/data/communes";
import type {
  CommunalEvent,
  ContextIndicator,
  EnrollmentByDependency,
  Indicator,
} from "@/types";

/** Repositorio de indicadores y agenda comunal por comuna. */

export async function getIndicators(
  communeId: string,
  area?: string
): Promise<Indicator[]> {
  const all = getCommuneData(communeId).indicators;
  return area ? all.filter((i) => i.area === area) : [...all];
}

/** Indicadores con contexto de la comuna (pilotos con datos reales). */
export async function getContextIndicators(
  communeId: string
): Promise<ContextIndicator[]> {
  return [...getCommuneData(communeId).contextIndicators];
}

/** Matrícula escolar por dependencia, en orden cronológico. */
export async function getEnrollment(
  communeId: string
): Promise<EnrollmentByDependency[]> {
  return [...getCommuneData(communeId).enrollment].sort(
    (a, b) => a.year - b.year
  );
}

/**
 * Próximas actividades, en orden. En una comuna real se quitan las que ya
 * terminaron (la página se regenera cada hora); la agenda ficticia de la
 * comuna de ejemplo se muestra completa.
 */
export async function getUpcomingEvents(
  communeId: string,
  limit = 4,
  now: Date = new Date()
): Promise<CommunalEvent[]> {
  const isDemo = getCommune(communeId)?.isDemo ?? true;
  return getCommuneData(communeId)
    .events.filter(
      (e) => isDemo || Date.parse(e.endsAt ?? e.startsAt) >= now.getTime()
    )
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
    .slice(0, limit);
}
