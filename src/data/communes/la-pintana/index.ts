import type { CommuneData } from "../types";
import { places } from "./places";
import { benefits } from "./benefits";
import { financialReports } from "./financial-reports";
import { accountingBalance } from "./transparency/accounting-balance";
import { budgetExecution } from "./transparency/budget-execution";
import { budgetDocumentIndex } from "./transparency/budget-index";
import { reportedLiabilities } from "./transparency/liabilities";
import { services } from "./services";
import { sources } from "./sources";

/**
 * Dataset del piloto La Pintana.
 *
 * REGLA: aquí solo entran datos públicos verificados, con fuente y fecha
 * (ver docs/fuentes-la-pintana.md). Mientras una sección no tenga datos
 * verificados, su arreglo permanece vacío y la funcionalidad se mantiene
 * desactivada en la configuración de la comuna.
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
  /* Ejecución al 30 de junio de 2026, conciliada contra los informes. */
  budget: budgetExecution,
  financialReports,
  budgetDocumentIndex,
  reportedLiabilities,
  accountingBalance,
  benefits,
};
