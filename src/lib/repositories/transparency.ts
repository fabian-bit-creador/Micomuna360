import { getCommuneData } from "@/data/communes";
import type { BudgetLine, FinancialReport } from "@/types";

/** Repositorio de transparencia: presupuesto municipal publicado. */

/** Líneas de presupuesto de una comuna, opcionalmente de un año. */
export async function getBudget(
  communeId: string,
  year?: number
): Promise<BudgetLine[]> {
  const all = getCommuneData(communeId).budget;
  return year ? all.filter((b) => b.year === year) : [...all];
}

/** Estados financieros publicados, del año más reciente al más antiguo. */
export async function getFinancialReports(
  communeId: string
): Promise<FinancialReport[]> {
  return [...getCommuneData(communeId).financialReports].sort(
    (a, b) => b.year - a.year
  );
}

/** Años con presupuesto publicado, del más reciente al más antiguo. */
export async function getBudgetYears(communeId: string): Promise<number[]> {
  const years = new Set(getCommuneData(communeId).budget.map((b) => b.year));
  return [...years].sort((a, b) => b - a);
}
