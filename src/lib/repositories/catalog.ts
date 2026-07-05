import { categories } from "@/lib/data/categories";
import { locations } from "@/lib/data/locations";
import { profiles } from "@/lib/data/profiles";
import type { Category, Location, Profile } from "@/types";

/** Catálogos: categorías, sectores y perfiles demo. Mock en MVP. */

export async function getCategories(): Promise<Category[]> {
  return categories.filter((c) => c.isActive);
}

export async function getCategoryById(id: string): Promise<Category | null> {
  return categories.find((c) => c.id === id) ?? null;
}

export async function getLocations(): Promise<Location[]> {
  return [...locations];
}

export async function getLocationById(id: string): Promise<Location | null> {
  return locations.find((l) => l.id === id) ?? null;
}

export async function getProfileById(id: string): Promise<Profile | null> {
  return profiles.find((p) => p.id === id) ?? null;
}
