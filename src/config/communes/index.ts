import { laPintana } from "./la-pintana";
import { losAromos } from "./los-aromos";
import type { CommuneConfig } from "./types";

export type { CommuneConfig, CommuneFeatures, CommuneStatus } from "./types";

const registry: Record<string, CommuneConfig> = {
  [losAromos.id]: losAromos,
  [laPintana.id]: laPintana,
};

/** Todas las comunas registradas, incluida la de ejemplo. */
export function listCommunes(): CommuneConfig[] {
  return [laPintana, losAromos];
}

/**
 * Comunas que se ofrecen al público (portal, selector, pie de página). La
 * comuna de ejemplo, con datos ficticios, queda fuera: se abre solo por su
 * URL, para probar funcionalidades.
 */
export function listPublicCommunes(): CommuneConfig[] {
  return listCommunes().filter((c) => !c.isDemo);
}

/** Comuna por slug de URL, o null si no existe. */
export function getCommune(slug: string): CommuneConfig | null {
  return registry[slug] ?? null;
}
