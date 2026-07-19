/**
 * Configuración multicomuna de MiComuna360.
 *
 * Cada comuna es una configuración + un dataset (src/data/communes/<id>).
 * Las páginas y componentes son compartidos: nunca se duplica la aplicación.
 */

export type CommuneStatus = "demo" | "piloto" | "activa";

export interface OfficialSource {
  name: string;
  url: string;
  /** Qué aporta esta fuente. */
  description: string;
  /** Última fecha en que se verificó que el enlace funciona (YYYY-MM-DD). */
  verifiedAt: string;
}

/** Funcionalidades activas por comuna (las páginas se ocultan si están off). */
export interface CommuneFeatures {
  /** Noticias y anuncios. */
  news: boolean;
  /** Agenda de actividades. */
  events: boolean;
  /** Guías de trámites. */
  procedures: boolean;
  /** Teléfonos útiles. */
  phones: boolean;
  /** Indicadores comunales. */
  dataPage: boolean;
  /** Hub comunidad (organizaciones, directorio). */
  community: boolean;
  /** Página de reportes (demo/explicativa). */
  reports: boolean;
  /** Plano ilustrado demo en la home. */
  demoMap: boolean;
  /** Mapa real Leaflet (etapa 3 del piloto). */
  realMap: boolean;
}

export interface CommuneConfig {
  /** Identificador y segmento de URL, p. ej. "los-aromos". */
  id: string;
  name: string;
  region: string;
  status: CommuneStatus;
  /** true = todos los datos son ficticios y la UI debe señalarlo. */
  isDemo: boolean;
  /** Lema corto de la comuna dentro de la plataforma. */
  tagline: string;
  /** Centro y zoom del mapa. */
  center: { lat: number; lng: number };
  zoom: number;
  /** Última actualización general del dataset (YYYY-MM-DD). */
  updatedAt: string;
  /** Fuentes oficiales del ecosistema digital de la comuna. */
  officialSources: OfficialSource[];
  features: CommuneFeatures;
}
