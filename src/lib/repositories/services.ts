import { getCommuneData } from "@/data/communes";
import type {
  CitizenService,
  DataSource,
  PhoneCategory,
  Procedure,
  ProcedureCategory,
  UsefulPhone,
} from "@/types";

/** Servicios ciudadanos con enlace oficial (pilotos). */
export async function getCitizenServices(
  communeId: string
): Promise<CitizenService[]> {
  return [...getCommuneData(communeId).services];
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
