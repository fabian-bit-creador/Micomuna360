import {
  getCommuneData,
  type SectionPhotos,
  type SectionSources,
} from "@/data/communes";
import type {
  BenefitOrientation,
  CitizenService,
  DataSource,
  PhoneCategory,
  Photo,
  Procedure,
  ProcedureCategory,
  SportsProgram,
  UsefulPhone,
} from "@/types";

/** Servicios ciudadanos con enlace oficial (pilotos). */
export async function getCitizenServices(
  communeId: string
): Promise<CitizenService[]> {
  return [...getCommuneData(communeId).services];
}

/** Orientaciones de beneficios para el orientador ciudadano. */
export async function getBenefitOrientations(
  communeId: string
): Promise<BenefitOrientation[]> {
  return [...getCommuneData(communeId).benefits];
}

/** Escuelas y talleres deportivos de la comuna. */
export async function getSportsPrograms(
  communeId: string
): Promise<SportsProgram[]> {
  return [...getCommuneData(communeId).sportsPrograms];
}

/** Fotos con crédito de la comuna. */
export async function getPhotos(communeId: string): Promise<Photo[]> {
  return [...getCommuneData(communeId).photos];
}

/** Sitios oficiales destacados de la comuna (registro único de fuentes). */
export async function getOfficialSites(
  communeId: string
): Promise<DataSource[]> {
  return getCommuneData(communeId).sources.filter((s) => s.featured);
}

/** Foto que encabeza una sección (ver SectionPhotos), o null. */
export async function getSectionPhoto(
  communeId: string,
  section: keyof SectionPhotos
): Promise<Photo | null> {
  const data = getCommuneData(communeId);
  const id = data.sectionPhotos[section];
  return id ? (data.photos.find((p) => p.id === id) ?? null) : null;
}

/** Fuente que una sección enlaza por su función (ver SectionSources). */
export async function getSectionSource(
  communeId: string,
  section: keyof SectionSources
): Promise<DataSource | null> {
  const id = getCommuneData(communeId).sectionSources[section];
  return id ? getDataSource(communeId, id) : null;
}

/** Fuente de procedencia por id, dentro de una comuna. */
export async function getDataSource(
  communeId: string,
  sourceId: string
): Promise<DataSource | null> {
  return (
    getCommuneData(communeId).sources.find((s) => s.id === sourceId) ?? null
  );
}

/** Repositorio de trámites y teléfonos útiles por comuna. */

export async function getProcedures(
  communeId: string,
  category?: ProcedureCategory
): Promise<Procedure[]> {
  const all = getCommuneData(communeId).procedures;
  return category ? all.filter((p) => p.category === category) : [...all];
}

export async function getProcedureBySlug(
  communeId: string,
  slug: string
): Promise<Procedure | null> {
  return (
    getCommuneData(communeId).procedures.find((p) => p.slug === slug) ?? null
  );
}

export async function getUsefulPhones(
  communeId: string,
  category?: PhoneCategory
): Promise<UsefulPhone[]> {
  const all = getCommuneData(communeId).phones;
  return category ? all.filter((p) => p.category === category) : [...all];
}
