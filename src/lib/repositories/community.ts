import { getCommuneData } from "@/data/communes";
import type {
  Organization,
  OrganizationType,
  Place,
  PlaceCategory,
} from "@/types";

/** Repositorio de comunidad por comuna: directorio y organizaciones. */

export async function getPlaces(
  communeId: string,
  category?: PlaceCategory
): Promise<Place[]> {
  const all = getCommuneData(communeId).places;
  return category ? all.filter((p) => p.category === category) : [...all];
}

export async function getOrganizations(
  communeId: string,
  type?: OrganizationType
): Promise<Organization[]> {
  const all = getCommuneData(communeId).organizations;
  return type ? all.filter((o) => o.type === type) : [...all];
}
