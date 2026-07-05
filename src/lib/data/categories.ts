import type { Category } from "@/types";

/** Catálogo de categorías de solicitudes (sección 8 del documento maestro). */
export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Baches y calles",
    slug: "baches",
    icon: "TrafficCone",
    color: "#c95b5b",
    isActive: true,
  },
  {
    id: "cat-2",
    name: "Luminarias",
    slug: "luminarias",
    icon: "Lightbulb",
    color: "#e9b949",
    isActive: true,
  },
  {
    id: "cat-3",
    name: "Basura y aseo",
    slug: "basura",
    icon: "Trash2",
    color: "#4b5563",
    isActive: true,
  },
  {
    id: "cat-4",
    name: "Seguridad",
    slug: "seguridad",
    icon: "ShieldAlert",
    color: "#17375e",
    isActive: true,
  },
  {
    id: "cat-5",
    name: "Vivienda",
    slug: "vivienda",
    icon: "Home",
    color: "#1e8e89",
    isActive: true,
  },
  {
    id: "cat-6",
    name: "Medioambiente",
    slug: "medioambiente",
    icon: "Leaf",
    color: "#3f9142",
    isActive: true,
  },
  {
    id: "cat-7",
    name: "Documentos y trámites",
    slug: "documentos",
    icon: "FileText",
    color: "#67b7d1",
    isActive: true,
  },
];
