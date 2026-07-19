import type { CommuneData } from "../types";
import { places } from "./places";
import { services } from "./services";
import { sources } from "./sources";

/**
 * Dataset del piloto La Pintana.
 *
 * REGLA: aquí solo entran datos públicos verificados, con fuente y fecha
 * (ver docs/fuentes-la-pintana.md). Mientras una sección no tenga datos
 * verificados, su arreglo permanece vacío y la funcionalidad se mantiene
 * desactivada en la configuración de la comuna.
 *
 * Etapa P1: dataset vacío a propósito. Se llena en la etapa P2.
 */
export const laPintanaData: CommuneData = {
  categories: [],
  locations: [],
  profiles: [],
  requests: [],
  news: [],
  events: [],
  indicators: [],
  procedures: [],
  phones: [],
  places,
  organizations: [],
  services,
  sources,
};
