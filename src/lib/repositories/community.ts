import {
  getCommuneData,
  type CommuneBoundary,
  type CommuneTerritory,
} from "@/data/communes";
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

/** Límite comunal oficial para el mapa (null si no está verificado). */
export async function getCommuneBoundary(
  communeId: string
): Promise<CommuneBoundary | null> {
  return getCommuneData(communeId).boundary;
}

/** Sectores y unidades vecinales oficiales (null si no están verificados). */
export async function getCommuneTerritory(
  communeId: string
): Promise<CommuneTerritory | null> {
  return getCommuneData(communeId).territory;
}

export async function getOrganizations(
  communeId: string,
  type?: OrganizationType
): Promise<Organization[]> {
  const all = getCommuneData(communeId).organizations;
  return type ? all.filter((o) => o.type === type) : [...all];
}
