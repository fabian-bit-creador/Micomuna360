import { getCommune } from "@/config/communes";
import { validateCommuneData } from "@/lib/data-integrity";

import { laPintanaData } from "./la-pintana";
import { losAromosData } from "./los-aromos";
import type { CommuneData } from "./types";

export type { CommuneData } from "./types";

const datasets: Record<string, CommuneData> = {
  "los-aromos": losAromosData,
  "la-pintana": laPintanaData,
};

/*
 * Los datasets se validan al cargarse: un dato real sin fuente, una fuente
 * inexistente o una fecha mal formada rompen el build en vez de publicarse.
 */
for (const [id, data] of Object.entries(datasets)) {
  validateCommuneData(id, data, getCommune(id)?.isDemo ?? true);
}

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
  services: [],
  sources: [],
  budget: [],
  financialReports: [],
};

/** Dataset de una comuna; comuna desconocida devuelve dataset vacío. */
export function getCommuneData(communeId: string): CommuneData {
  return datasets[communeId] ?? empty;
}
