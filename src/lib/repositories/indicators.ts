import { getCommuneData } from "@/data/communes";
import type { CommunalEvent, Indicator } from "@/types";

/** Repositorio de indicadores y agenda comunal por comuna. */

export async function getIndicators(
  communeId: string,
  area?: string
): Promise<Indicator[]> {
  const all = getCommuneData(communeId).indicators;
  return area ? all.filter((i) => i.area === area) : [...all];
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
