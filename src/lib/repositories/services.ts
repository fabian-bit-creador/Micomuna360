import { getCommuneData } from "@/data/communes";
import type {
  PhoneCategory,
  Procedure,
  ProcedureCategory,
  UsefulPhone,
} from "@/types";

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
