/**
 * Tipos de dominio de MiComuna360.
 *
 * Espejan el modelo de datos que se creará en Supabase en la Fase 3
 * (ver docs/modelo-datos.md). Mientras tanto, los repositorios de
 * src/lib/repositories los alimentan con datos ficticios.
 */

export type UserRole = "vecino" | "funcionario" | "admin";

export type RequestStatus =
  | "recibida"
  | "en_revision"
  | "asignada"
  | "en_proceso"
  | "resuelta"
  | "cerrada"
  | "rechazada";

export type RequestPriority = "baja" | "media" | "alta" | "urgente";

export type TaskStatus = "pendiente" | "en_proceso" | "completada";

export type NewsType =
  | "noticia"
  | "anuncio"
  | "taller"
  | "beneficio"
  | "buena_noticia";

export type LocationType = "sector" | "barrio" | "unidad";

export interface Profile {
  id: string;
  fullName: string;
  role: UserRole;
  sectorId: string | null;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  /** Nombre de ícono de lucide-react. */
  icon: string;
  /** Color hex asociado para mapa y gráficos. */
  color: string;
  isActive: boolean;
}

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  lat: number;
  lng: number;
}

export interface CitizenRequest {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  locationId: string;
  lat: number;
  lng: number;
  status: RequestStatus;
  priority: RequestPriority;
  /** Si es false, no aparece en el mapa ni listados públicos. */
  isPublic: boolean;
  /** Denuncias sensibles: nunca se publican con ubicación exacta. */
  isSensitive: boolean;
  createdBy: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RequestPhoto {
  id: string;
  requestId: string;
  /** Ruta en Supabase Storage (Fase 3). En el MVP, ruta local o URL demo. */
  storagePath: string;
  createdAt: string;
}

export interface MunicipalTask {
  id: string;
  requestId: string;
  assignedTo: string;
  description: string;
  dueDate: string | null;
  status: TaskStatus;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  coverImage: string | null;
  type: NewsType;
  publishedAt: string;
  authorId: string;
}

export interface CommunalEvent {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string | null;
  locationId: string | null;
  category: string;
}

export interface Indicator {
  id: string;
  name: string;
  /** Área temática: demografía, presupuesto, educación, seguridad, medioambiente. */
  area: string;
  value: number;
  unit: string;
  period: string;
  /** Fuente citada (SINIM, INE, etc.). En el MVP: "Datos de demostración". */
  source: string;
}

export type ProcedureCategory =
  | "certificados"
  | "beneficios"
  | "permisos"
  | "social";

export interface Procedure {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: ProcedureCategory;
  /** Requisitos que debe reunir el vecino. */
  requirements: string[];
  /** Pasos en orden (secuencia real del trámite). */
  steps: string[];
  cost: string;
  duration: string;
  place: string;
  schedule: string;
}

export type PhoneCategory =
  | "emergencia"
  | "municipal"
  | "salud"
  | "apoyo";

export interface UsefulPhone {
  id: string;
  name: string;
  number: string;
  description: string;
  category: PhoneCategory;
  /** Horario de atención, p. ej. "24 horas" o "L-V 8:30–14:00". */
  available: string;
}

/* ── Procedencia de datos (piloto multicomuna) ──────────────────────────── */

export type SourceStatus =
  | "verificado"
  | "pendiente"
  | "enlace_caido"
  | "archivado";

/**
 * Fuente de un dato publicado en una comuna real. Todo dato del piloto debe
 * referenciar una fuente; la fuente y la fecha se muestran al ciudadano.
 */
export interface DataSource {
  id: string;
  /** Institución responsable de la información. */
  institution: string;
  /** Nombre de la página o documento consultado. */
  pageName: string;
  /** Qué aporta esta fuente, en lenguaje ciudadano. */
  description: string;
  /** true: se muestra en la portada de la comuna como sitio oficial. */
  featured: boolean;
  url: string;
  /** Fecha de publicación del contenido original, si se conoce. */
  publishedAt: string | null;
  /** Fecha de consulta y verificación (YYYY-MM-DD). */
  verifiedAt: string;
  status: SourceStatus;
  /** Hasta cuándo se considera vigente sin nueva revisión (YYYY-MM-DD). */
  validUntil: string | null;
  /** Observaciones: método de verificación, advertencias, pendientes. */
  notes: string | null;
}

/** Servicio/trámite ciudadano que se resuelve en un sitio oficial externo. */
export interface CitizenService {
  id: string;
  title: string;
  category:
    | "pagos"
    | "tramites"
    | "social"
    | "empleo"
    | "deporte_cultura"
    | "transparencia";
  /** Qué puede hacer la persona (en lenguaje ciudadano). */
  description: string;
  /** Pasos o requisitos mínimos, si se conocen de la fuente. */
  steps: string[];
  institution: string;
  externalUrl: string;
  /** Nombre de ícono del kit cívico. */
  icon: string;
  sourceId: string;
}

/**
 * Documento financiero publicado por el municipio en Transparencia Activa
 * (balance, estado de resultado, situación presupuestaria, etc.).
 */
export interface FinancialReport {
  id: string;
  /** Año del ejercicio contable al que corresponde el documento. */
  year: number;
  /** Fecha del informe publicado (YYYY-MM-DD). */
  reportDate: string;
  /** Nombre del documento tal como lo publica el municipio. */
  name: string;
  /** Qué muestra el documento, en lenguaje ciudadano. */
  summary: string;
  /** Enlace oficial al documento. */
  url: string;
  sourceId: string;
}

/**
 * Fila del inventario de informes de ejecución presupuestaria publicados en
 * Transparencia Activa. Es un enlace a un documento, NO una cifra.
 */
export interface BudgetDocumentIndexRow {
  id: string;
  /** "municipal" o "salud". */
  area: string;
  year: number;
  monthNumber: number;
  monthName: string;
  /** "ingresos" o "gastos". */
  flowType: string;
  /** Fecha en que el portal publicó el documento (YYYY-MM-DD). */
  publicationDate: string;
  /** Fecha de corte declarada en el informe (YYYY-MM-DD). */
  reportEndDate: string;
  description: string;
  url: string;
  sourceId: string;
}

/**
 * Fila del informe "Pasivos" publicado por el municipio. Los prefijos 215 y
 * 115 son familias contables distintas y no deben sumarse entre sí.
 */
export interface ReportedLiabilityRow {
  id: string;
  accountCode: string;
  accountPrefix: string;
  /** Denominación tal como fue publicada (se conservan truncados y erratas). */
  accountName: string;
  amountClp: number;
  /** Período del informe, formato AAAA-MM. */
  period: string;
  sourcePage: number;
  sourceId: string;
}

/**
 * Fila del balance de comprobación y saldos (partida doble). Sus columnas no
 * equivalen a presupuesto, gasto ejecutado ni pagos.
 */
export interface AccountingBalanceRow {
  id: string;
  accountCode: string;
  /** Primer dígito del código; no reemplaza una clasificación oficial. */
  accountClass: string;
  accountName: string;
  openingDebitClp: number;
  openingCreditClp: number;
  periodDebitsClp: number;
  periodCreditsClp: number;
  endingDebitClp: number;
  endingCreditClp: number;
  period: string;
  sourcePage: number;
  sourceId: string;
}

/**
 * Línea de presupuesto municipal publicada. Los montos van en pesos
 * chilenos y siempre provienen de un informe oficial (sourceId).
 */
export interface BudgetLine {
  id: string;
  /** Año presupuestario, p. ej. 2026. */
  year: number;
  /** Partida o área en lenguaje ciudadano, p. ej. "Salud". */
  category: string;
  /** Presupuesto vigente, en pesos. */
  budgeted: number;
  /** Ejecutado a la fecha del informe, en pesos. */
  executed: number;
  /** Período del informe, p. ej. "primer trimestre 2026". */
  period: string;
  sourceId: string;
}

export type PlaceCategory =
  | "municipal"
  | "salud"
  | "educacion"
  | "deporte"
  | "comunitario"
  | "medioambiente";

/** Lugar o servicio útil del directorio comunal. */
export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  address: string;
  /** Sector; null cuando la comuna aún no define unidades territoriales. */
  sectorId: string | null;
  /** Horario de atención; null si no está verificado (nunca inventar). */
  schedule: string | null;
  phone: string | null;
  /** Nombre de ícono del kit cívico (components/shared/civic-icon). */
  icon: string;
  /**
   * Coordenadas verificadas. Solo se completan con una fuente geográfica
   * confiable: sin ellas, el lugar no aparece en el mapa.
   */
  lat?: number | null;
  lng?: number | null;
  /** Fuente de procedencia (pilotos con datos reales). */
  sourceId?: string | null;
}

export type OrganizationType =
  | "junta_vecinos"
  | "club_deportivo"
  | "comite_vivienda"
  | "fundacion"
  | "cultural"
  | "adulto_mayor"
  | "medioambiente";

/** Organización comunitaria del territorio. */
export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  sectorId: string;
  description: string;
  /** Cuándo/dónde se reúnen o actividad principal. */
  meetingInfo: string;
  /** Contacto institucional demo (nunca datos personales). */
  contact: string | null;
  icon: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  createdAt: string;
}
