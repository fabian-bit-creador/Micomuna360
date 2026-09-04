import type {
  AccountingBalanceRow,
  BudgetDocumentIndexRow,
  BudgetLine,
  Category,
  FinancialReport,
  ReportedLiabilityRow,
  CitizenRequest,
  CitizenService,
  CommunalEvent,
  DataSource,
  Indicator,
  Location,
  NewsArticle,
  Organization,
  Place,
  Procedure,
  Profile,
  UsefulPhone,
} from "@/types";

/** Dataset completo de una comuna. Los repositorios leen de aquí. */
export interface CommuneData {
  categories: Category[];
  locations: Location[];
  profiles: Profile[];
  requests: CitizenRequest[];
  news: NewsArticle[];
  events: CommunalEvent[];
  indicators: Indicator[];
  procedures: Procedure[];
  phones: UsefulPhone[];
  places: Place[];
  organizations: Organization[];
  /** Servicios ciudadanos con enlace oficial (pilotos). */
  services: CitizenService[];
  /** Registro de fuentes de la comuna (pilotos). */
  sources: DataSource[];
  /** Presupuesto municipal publicado (pilotos). */
  budget: BudgetLine[];
  /** Estados financieros publicados en Transparencia Activa (pilotos). */
  financialReports: FinancialReport[];
  /** Inventario de informes de ejecución presupuestaria (enlaces, no cifras). */
  budgetDocumentIndex: BudgetDocumentIndexRow[];
  /** Filas del informe "Pasivos" publicado. */
  reportedLiabilities: ReportedLiabilityRow[];
  /** Balance de comprobación y saldos (vista técnica). */
  accountingBalance: AccountingBalanceRow[];
}
