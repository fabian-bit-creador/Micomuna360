import { getCommuneData } from "@/data/communes";
import type { Category, Location, Profile } from "@/types";

/** Catálogos por comuna: categorías, sectores y perfiles demo. */

export async function getCategories(communeId: string): Promise<Category[]> {
  return getCommuneData(communeId).categories.filter((c) => c.isActive);
}

export async function getCategoryById(
  communeId: string,
  id: string
): Promise<Category | null> {
  return getCommuneData(communeId).categories.find((c) => c.id === id) ?? null;
}

export async function getLocations(communeId: string): Promise<Location[]> {
  return [...getCommuneData(communeId).locations];
}

export async function getLocationById(
  communeId: string,
  id: string
): Promise<Location | null> {
  return getCommuneData(communeId).locations.find((l) => l.id === id) ?? null;
}

export async function getProfileById(
  communeId: string,
  id: string
): Promise<Profile | null> {
  return getCommuneData(communeId).profiles.find((p) => p.id === id) ?? null;
}
