import { getCommuneData } from "@/data/communes";
import type { CitizenRequest, RequestStatus } from "@/types";

/**
 * Repositorio de solicitudes vecinales.
 *
 * Todas las funciones reciben la comuna (multicomuna). En el MVP leen datos
 * en memoria; en la Fase 3 cambian su implementación interna a Supabase
 * manteniendo la misma firma.
 */

/** Solicitudes visibles públicamente (excluye sensibles y no públicas). */
export async function getPublicRequests(
  communeId: string
): Promise<CitizenRequest[]> {
  return getCommuneData(communeId).requests.filter(
    (r) => r.isPublic && !r.isSensitive
  );
}

/** Todas las solicitudes, para el panel municipal. */
export async function getAllRequests(
  communeId: string
): Promise<CitizenRequest[]> {
  return [...getCommuneData(communeId).requests];
}

export async function getRequestById(
  communeId: string,
  id: string
): Promise<CitizenRequest | null> {
  return getCommuneData(communeId).requests.find((r) => r.id === id) ?? null;
}

export async function getRequestsByStatus(
  communeId: string,
  status: RequestStatus
): Promise<CitizenRequest[]> {
  return getCommuneData(communeId).requests.filter(
    (r) => r.status === status
  );
}

/** Conteo de solicitudes agrupadas por una clave, para el dashboard. */
export async function countRequestsBy(
  communeId: string,
  key: "categoryId" | "status" | "locationId" | "priority"
): Promise<Record<string, number>> {
  return getCommuneData(communeId).requests.reduce<Record<string, number>>(
    (acc, r) => {
      const value = r[key];
      acc[value] = (acc[value] ?? 0) + 1;
      return acc;
    },
    {}
  );
}
