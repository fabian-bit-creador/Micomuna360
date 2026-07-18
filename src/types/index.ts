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
  sectorId: string;
  schedule: string;
  phone: string | null;
  /** Nombre de ícono del kit cívico (components/shared/civic-icon). */
  icon: string;
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
