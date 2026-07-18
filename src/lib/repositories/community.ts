import { organizations } from "@/lib/data/organizations";
import { places } from "@/lib/data/places";
import type {
  Organization,
  OrganizationType,
  Place,
  PlaceCategory,
} from "@/types";

/** Repositorio de comunidad: directorio y organizaciones. Mock en MVP. */

export async function getPlaces(category?: PlaceCategory): Promise<Place[]> {
  return category
    ? places.filter((p) => p.category === category)
    : [...places];
}

export async function getOrganizations(
  type?: OrganizationType
): Promise<Organization[]> {
  return type
    ? organizations.filter((o) => o.type === type)
    : [...organizations];
}
