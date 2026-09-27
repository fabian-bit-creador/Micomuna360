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

/**
 * Indicador comunal con contexto (pilotos con datos reales).
 *
 * REGLA: contexto, no puntaje. Se compara la comuna con su propia historia
 * y con el promedio de las comunas de su región; nunca se ordena ni se
 * califica. Cada serie declara su fuente y los años sin dato válido quedan
 * en null (se muestran como vacío, no como cero).
 */
export interface ContextIndicator {
  id: string;
  area: "comuna" | "salud" | "educacion" | "finanzas";
  /** Pregunta ciudadana que responde el indicador. */
  question: string;
  /** Nombre corto del indicador. */
  title: string;
  unit: "percent" | "clp" | "people" | "index";
  /**
   * Frase del valor más reciente, con {value} y {year} como marcadores; la
   * UI los reemplaza con el dato para que el texto nunca se desfase.
   */
  headline: string;
  /** Serie de la comuna, en orden cronológico. */
  series: { year: number; value: number | null }[];
  /** Promedio simple de las comunas de la región con dato válido. */
  regional: { year: number; value: number | null; communes: number }[] | null;
  /** Cómo leerlo, en lenguaje simple y neutral. */
  reading: string;
  /** Advertencia sobre la calidad o el alcance del dato, si la hay. */
  caveat: string | null;
  /** Código de la variable en la fuente (p. ej. "ISAL005"). */
  sourceCode: string | null;
  sourceId: string;
}

/** Matrícula escolar por dependencia en los establecimientos de la comuna. */
export interface EnrollmentByDependency {
  year: number;
  /** Estudiantes por dependencia, en la comuna y en toda la región. */
  commune: Partial<Record<SchoolDependency, number>>;
  region: Partial<Record<SchoolDependency, number>>;
  /** Establecimientos en funcionamiento en la comuna. */
  schools: number;
  /** Servicio Local de Educación Pública a cargo, si ya hubo traspaso. */
  slep: string | null;
  sourceId: string;
}

export type SchoolDependency =
  | "municipal"
  | "slep"
  | "particular_subvencionado"
  | "particular_pagado"
  | "administracion_delegada";

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
 * Orientación sobre un beneficio o programa al que una persona podría
 * postular según su situación.
 *
 * IMPORTANTE: orienta, no decide. Los requisitos y la resolución están
 * siempre en la institución responsable; MiComuna360 no evalúa postulaciones
 * ni pide datos personales.
 */
export interface BenefitOrientation {
  id: string;
  title: string;
  /** Qué es, en lenguaje ciudadano. */
  summary: string;
  institution: string;
  /** Situaciones que hacen relevante esta orientación. */
  triggers: string[];
  /** true: se muestra siempre, sin importar las respuestas. */
  always?: boolean;
  url: string;
  /** Qué buscar cuando el enlace lleva a un catálogo y no a la ficha. */
  searchHint?: string | null;
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
 * Una fila del balance presupuestario mensual del municipio, tal como la
 * imprime el informe oficial: acumulada a la fecha de corte y en MILES de
 * pesos (la UI convierte a pesos). Se guarda el saldo impreso para que la
 * transcripción se pueda verificar fila por fila.
 */
export interface BudgetLine {
  id: string;
  /** Presupuesto del área municipal o del área de salud (son distintos). */
  area: "municipal" | "salud";
  flow: "gastos" | "ingresos";
  year: number;
  /** Fecha de corte del informe (YYYY-MM-DD); los montos son acumulados. */
  cutoffDate: string;
  /**
   * Código del clasificador: "215"/"115" para el total, "215-21" para un
   * subtítulo y "115-08-03" para un ítem de detalle.
   */
  code: string;
  level: "total" | "subtitulo" | "item";
  /** Denominación oficial del clasificador presupuestario. */
  officialName: string;
  /** La misma partida en lenguaje ciudadano. */
  label: string;
  /** Presupuesto inicial (aprobado), en miles de pesos. */
  initialK: number;
  /** Presupuesto vigente (con modificaciones), en miles de pesos. */
  currentK: number;
  /**
   * Gastos: obligado acumulado (lo comprometido).
   * Ingresos: devengado acumulado (lo que se tiene derecho a cobrar).
   */
  committedK: number;
  /** Gastos: pagado acumulado. Ingresos: percibido acumulado. */
  paidK: number;
  /** Saldo presupuestario impreso: vigente menos `committedK`. */
  balanceK: number;
  /** Aclaración ciudadana cuando la fila se presta a confusión. */
  note: string | null;
  /** Informe del inventario (`BudgetDocumentIndexRow.id`) de donde sale. */
  documentId: string;
  sourceId: string;
}

export type PlaceCategory =
  | "municipal"
  | "salud"
  | "educacion"
  | "deporte"
  | "comunitario"
  | "medioambiente"
  | "seguridad";

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
  /**
   * Fuente de las coordenadas, que puede ser distinta de la del resto de la
   * ficha (p. ej. la dirección sale de pintana.cl y el punto del geoportal).
   * Obligatoria fuera de la demo cuando hay coordenadas.
   */
  coordsSourceId?: string | null;
  /** Fuente de procedencia (pilotos con datos reales). */
  sourceId?: string | null;
}

export type Weekday =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

/**
 * Escuela o taller deportivo publicado por la institución a cargo. Las
 * escuelas tienen inscripción por semestre; los talleres se hacen en sedes y
 * canchas de barrio.
 */
export interface SportsProgram {
  id: string;
  /** Nombre legible, sin recinto ni día (p. ej. "Rugby infantil"). */
  name: string;
  /** Disciplina para agrupar y filtrar (p. ej. "Rugby"). */
  discipline: string;
  kind: "escuela" | "taller";
  /** Recinto o sede, cuando la fuente lo nombra. */
  venue: string | null;
  address: string;
  /** Lugar del directorio en la misma dirección, si existe. */
  placeId: string | null;
  days: Weekday[];
  /** Hora de inicio y término, "HH:MM". */
  startTime: string;
  endTime: string;
  sourceId: string;
}

/**
 * Foto real publicada en el sitio, con su crédito. Solo fotos propias, con
 * licencia libre o con permiso escrito (docs/imagenes.md).
 */
export interface Photo {
  id: string;
  /** Ruta dentro de /public, p. ej. "/images/la-pintana/polideportivo.webp". */
  src: string;
  width: number;
  height: number;
  /** Qué se ve, en una frase (texto alternativo). */
  alt: string;
  author: string;
  /** Licencia corta, p. ej. "CC BY 4.0". */
  license: string;
  licenseUrl: string;
  /** Página de origen de la imagen. */
  sourceUrl: string;
  /** Fecha en que se descargó (YYYY-MM-DD). */
  retrievedAt: string;
  /** Lugar del directorio que muestra, si corresponde. */
  placeId: string | null;
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
