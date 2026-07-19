import type { Place } from "@/types";

/**
 * Directorio territorial inicial del piloto La Pintana.
 *
 * SOLO datos verificados (ver sources.ts y docs/fuentes-la-pintana.md).
 * Horarios y teléfonos se publican únicamente cuando están verificados;
 * si el campo es null, la UI no muestra nada (nunca se inventa).
 */
export const places: Place[] = [
  {
    id: "lp-pl-municipalidad",
    name: "Municipalidad de La Pintana",
    category: "municipal",
    description:
      "Edificio consistorial: atención ciudadana, trámites y direcciones municipales.",
    address: "Avda. Santa Rosa N°12.975",
    sectorId: null,
    schedule: "L–J 8:30–14:00 y 15:00–17:00 · V 8:30–14:00 y 15:00–16:00",
    phone: null,
    icon: "Building2",
    sourceId: "lp-muni-direcciones",
  },
  {
    id: "lp-pl-estadio",
    name: "Estadio Municipal de La Pintana",
    category: "deporte",
    description:
      "Recinto de la Corporación Municipal de Deportes.",
    address: "Ciudad de México 1589",
    sectorId: null,
    schedule: null,
    phone: null,
    icon: "Trophy",
    sourceId: "lp-deportes-recintos",
  },
  {
    id: "lp-pl-club-campo",
    name: "Club de Campo de La Pintana",
    category: "deporte",
    description:
      "Recinto recreativo y deportivo de la Corporación Municipal de Deportes.",
    address: "Av. Santa Rosa 10812",
    sectorId: null,
    schedule: null,
    phone: null,
    icon: "TreePine",
    sourceId: "lp-deportes-recintos",
  },
  {
    id: "lp-pl-polideportivo",
    name: "Polideportivo de La Pintana",
    category: "deporte",
    description:
      "Recinto de la Corporación Municipal de Deportes; sede de competencias de los Juegos Panamericanos 2023.",
    address: "Patagonia 12980",
    sectorId: null,
    schedule: null,
    phone: null,
    icon: "Dumbbell",
    sourceId: "lp-deportes-recintos",
  },
  {
    id: "lp-pl-las-rosas",
    name: "Complejo Deportivo Las Rosas",
    category: "deporte",
    description:
      "Recinto deportivo de la Corporación Municipal de Deportes.",
    address: "Av. Gabriela 3343",
    sectorId: null,
    schedule: null,
    phone: null,
    icon: "Dumbbell",
    sourceId: "lp-deportes-recintos",
  },
];
