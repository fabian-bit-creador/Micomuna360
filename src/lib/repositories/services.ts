import { phones } from "@/lib/data/phones";
import { procedures } from "@/lib/data/procedures";
import type {
  PhoneCategory,
  Procedure,
  ProcedureCategory,
  UsefulPhone,
} from "@/types";

/** Repositorio de trámites y teléfonos útiles. Mock en MVP. */

export async function getProcedures(
  category?: ProcedureCategory
): Promise<Procedure[]> {
  return category
    ? procedures.filter((p) => p.category === category)
    : [...procedures];
}

export async function getProcedureBySlug(
  slug: string
): Promise<Procedure | null> {
  return procedures.find((p) => p.slug === slug) ?? null;
}

export async function getUsefulPhones(
  category?: PhoneCategory
): Promise<UsefulPhone[]> {
  return category
    ? phones.filter((p) => p.category === category)
    : [...phones];
}
