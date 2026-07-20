import { laPintana } from "./la-pintana";
import { losAromos } from "./los-aromos";
import type { CommuneConfig } from "./types";

export type { CommuneConfig, CommuneFeatures, CommuneStatus } from "./types";

const registry: Record<string, CommuneConfig> = {
  [losAromos.id]: losAromos,
  [laPintana.id]: laPintana,
};

/** Todas las comunas registradas (orden: piloto primero, demo después). */
export function listCommunes(): CommuneConfig[] {
  return [laPintana, losAromos];
}

/** Comuna por slug de URL, o null si no existe. */
export function getCommune(slug: string): CommuneConfig | null {
  return registry[slug] ?? null;
}
