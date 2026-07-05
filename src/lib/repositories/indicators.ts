import { indicators } from "@/lib/data/indicators";
import { events } from "@/lib/data/events";
import type { CommunalEvent, Indicator } from "@/types";

/** Repositorio de indicadores y agenda comunal. Mock en MVP. */

export async function getIndicators(area?: string): Promise<Indicator[]> {
  return area ? indicators.filter((i) => i.area === area) : [...indicators];
}

export async function getUpcomingEvents(limit = 4): Promise<CommunalEvent[]> {
  return [...events]
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    )
    .slice(0, limit);
}
