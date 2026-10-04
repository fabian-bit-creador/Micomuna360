import type {
  AccountingBalanceRow,
  BudgetDocumentIndexRow,
  BenefitOrientation,
  BudgetLine,
  Category,
  ContextIndicator,
  EnrollmentByDependency,
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
  Photo,
  Place,
  Procedure,
  Profile,
  SportsProgram,
  StreetMarket,
  UsefulPhone,
} from "@/types";

/** Límite comunal oficial, como anillo de puntos [lat, lng]. */
export interface CommuneBoundary {
  coordinates: [number, number][];
  sourceId: string;
}

/** Área de una división territorial (sector o unidad vecinal). */
export interface TerritoryArea {
  id: string;
  /** Nombre para mostrar: «Centro», «Unidad vecinal 7». */
  name: string;
  /** Rótulo corto en el mapa (unidades vecinales: «UV 7»). */
  shortName?: string;
  /** Punto interior donde va el rótulo [lat, lng]. */
  label: [number, number];
  /** Anillo exterior [lat, lng]. */
  ring: [number, number][];
}

/** Divisiones territoriales oficiales, para ubicarse en el mapa. */
export interface CommuneTerritory {
  sourceId: string;
  sectors: TerritoryArea[];
  neighborhoodUnits: TerritoryArea[];
}

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
  /** Orientaciones de beneficios para el orientador ciudadano. */
  benefits: BenefitOrientation[];
  /** Límite comunal oficial para el mapa; null si no está verificado. */
  boundary: CommuneBoundary | null;
  /** Sectores y unidades vecinales; null si no están verificados. */
  territory: CommuneTerritory | null;
  /** Indicadores con contexto (pilotos con datos reales). */
  contextIndicators: ContextIndicator[];
  /** Matrícula escolar por dependencia (pilotos con datos reales). */
  enrollment: EnrollmentByDependency[];
  /** Escuelas y talleres deportivos. */
  sportsPrograms: SportsProgram[];
  /** Ferias libres y persas autorizadas, con su tramo de calle. */
  streetMarkets: StreetMarket[];
  /** Fotos reales con crédito (lugares y portadas de sección). */
  photos: Photo[];
  /**
   * Fuentes que una sección enlaza sin que salgan de sus filas de datos
   * (p. ej. el formulario de solicitud o la página de inscripción). Así las
   * páginas compartidas no nombran ids de una comuna.
   */
  sectionSources: SectionSources;
  /** Foto que encabeza una sección (id de `photos`), si la hay. */
  sectionPhotos: SectionPhotos;
}

export interface SectionPhotos {
  /** Portada de la comuna. */
  home?: string;
  /** Página de deportes. */
  sports?: string;
}

export interface SectionSources {
  /** Organismo que resuelve reclamos de transparencia. */
  transparencyAuthority?: string;
  /** Formulario para pedir información al municipio. */
  transparencyRequest?: string;
  /** Inscripción a escuelas deportivas. */
  sportsEnrollment?: string;
}
