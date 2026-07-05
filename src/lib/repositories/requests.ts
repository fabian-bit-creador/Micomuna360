import { requests } from "@/lib/data/requests";
import type { CitizenRequest, RequestStatus } from "@/types";

/**
 * Repositorio de solicitudes vecinales.
 *
 * En el MVP lee datos ficticios en memoria. En la Fase 3 estas funciones
 * cambian su implementación interna a consultas Supabase manteniendo la
 * misma firma, de modo que la UI no necesita modificarse.
 */

/** Solicitudes visibles públicamente (excluye sensibles y no públicas). */
export async function getPublicRequests(): Promise<CitizenRequest[]> {
  return requests.filter((r) => r.isPublic && !r.isSensitive);
}

/** Todas las solicitudes, para el panel municipal. */
export async function getAllRequests(): Promise<CitizenRequest[]> {
  return [...requests];
}

export async function getRequestById(
  id: string
): Promise<CitizenRequest | null> {
  return requests.find((r) => r.id === id) ?? null;
}

export async function getRequestsByStatus(
  status: RequestStatus
): Promise<CitizenRequest[]> {
  return requests.filter((r) => r.status === status);
}

/** Conteo de solicitudes agrupadas por una clave, para el dashboard. */
export async function countRequestsBy(
  key: "categoryId" | "status" | "locationId" | "priority"
): Promise<Record<string, number>> {
  return requests.reduce<Record<string, number>>((acc, r) => {
    const value = r[key];
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}
