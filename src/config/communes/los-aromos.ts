import type { CommuneConfig } from "./types";

/**
 * Los Aromos: comuna ficticia de demostración y laboratorio de
 * funcionalidades de MiComuna360. Todos sus datos son inventados.
 */
export const losAromos: CommuneConfig = {
  id: "los-aromos",
  name: "Los Aromos",
  region: "Región Metropolitana (ficticia)",
  status: "demo",
  isDemo: true,
  tagline: "Comuna demo: aquí probamos todo lo que viene",
  center: { lat: -33.58, lng: -70.632 },
  zoom: 14,
  updatedAt: "2026-07-19",
  officialSources: [],
  features: {
    news: true,
    events: true,
    procedures: true,
    phones: true,
    dataPage: true,
    community: true,
    reports: true,
    demoMap: true,
    realMap: false,
  },
};
