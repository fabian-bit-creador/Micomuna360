import { getCommuneData } from "@/data/communes";
import type {
  AccountingBalanceRow,
  BudgetDocumentIndexRow,
  BudgetLine,
  FinancialReport,
  ReportedLiabilityRow,
} from "@/types";

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

/** Inventario de informes de ejecución presupuestaria (enlaces, no cifras). */
export async function getBudgetDocumentIndex(
  communeId: string
): Promise<BudgetDocumentIndexRow[]> {
  return [...getCommuneData(communeId).budgetDocumentIndex];
}

/**
 * Filas del informe de pasivos. `prefix` permite aislar una familia contable
 * (215 o 115): nunca se deben sumar entre sí.
 */
export async function getReportedLiabilities(
  communeId: string,
  prefix?: string
): Promise<ReportedLiabilityRow[]> {
  const all = getCommuneData(communeId).reportedLiabilities;
  return prefix ? all.filter((r) => r.accountPrefix === prefix) : [...all];
}

/** Balance de comprobación y saldos (vista técnica). */
export async function getAccountingBalance(
  communeId: string
): Promise<AccountingBalanceRow[]> {
  return [...getCommuneData(communeId).accountingBalance];
}
