import type { Profile } from "@/types";

/**
 * Usuarios ficticios para simular los tres roles del MVP.
 * En la Fase 3 esto se reemplaza por Supabase Auth + tabla profiles.
 */
export const profiles: Profile[] = [
  {
    id: "user-vecina",
    fullName: "María Contreras (demo)",
    role: "vecino",
    sectorId: "loc-2",
    createdAt: "2026-05-02T10:00:00Z",
  },
  {
    id: "user-funcionario",
    fullName: "Jorge Salinas (demo)",
    role: "funcionario",
    sectorId: null,
    createdAt: "2026-04-15T09:00:00Z",
  },
  {
    id: "user-admin",
    fullName: "Carolina Reyes (demo)",
    role: "admin",
    sectorId: null,
    createdAt: "2026-04-01T09:00:00Z",
  },
];
