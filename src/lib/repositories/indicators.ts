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

export async function getUpcomingEvents(
  communeId: string,
  limit = 4
): Promise<CommunalEvent[]> {
  return [...getCommuneData(communeId).events]
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    )
    .slice(0, limit);
}
