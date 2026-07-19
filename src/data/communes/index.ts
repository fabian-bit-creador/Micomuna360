import { laPintanaData } from "./la-pintana";
import { losAromosData } from "./los-aromos";
import type { CommuneData } from "./types";

export type { CommuneData } from "./types";

const datasets: Record<string, CommuneData> = {
  "los-aromos": losAromosData,
  "la-pintana": laPintanaData,
};

const empty: CommuneData = {
  categories: [],
  locations: [],
  profiles: [],
  requests: [],
  news: [],
  events: [],
  indicators: [],
  procedures: [],
  phones: [],
  places: [],
  organizations: [],
};

/** Dataset de una comuna; comuna desconocida devuelve dataset vacío. */
export function getCommuneData(communeId: string): CommuneData {
  return datasets[communeId] ?? empty;
}
