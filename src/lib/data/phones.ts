import type { UsefulPhone } from "@/types";

/**
 * Teléfonos útiles del MVP. Los números nacionales de emergencia son reales
 * (uso público); los números municipales son ficticios (comuna demo).
 */
export const phones: UsefulPhone[] = [
  {
    id: "tel-1",
    name: "Ambulancia (SAMU)",
    number: "131",
    description: "Emergencias médicas y traslados de urgencia.",
    category: "emergencia",
    available: "24 horas",
  },
  {
    id: "tel-2",
    name: "Bomberos",
    number: "132",
    description: "Incendios, rescates y emergencias químicas.",
    category: "emergencia",
    available: "24 horas",
  },
  {
    id: "tel-3",
    name: "Carabineros",
    number: "133",
    description: "Emergencias policiales y denuncias urgentes.",
    category: "emergencia",
    available: "24 horas",
  },
  {
    id: "tel-4",
    name: "PDI",
    number: "134",
    description: "Denuncias e investigación policial.",
    category: "emergencia",
    available: "24 horas",
  },
  {
    id: "tel-5",
    name: "Seguridad municipal",
    number: "1409",
    description:
      "Patrullaje preventivo y apoyo vecinal de la comuna (demo).",
    category: "municipal",
    available: "24 horas",
  },
  {
    id: "tel-6",
    name: "Municipalidad — mesa central",
    number: "(2) 2555 0100",
    description: "Consultas generales y derivación a direcciones (demo).",
    category: "municipal",
    available: "L–V 8:30–17:30",
  },
  {
    id: "tel-7",
    name: "Emergencias municipales",
    number: "(2) 2555 0199",
    description:
      "Árboles caídos, anegamientos y emergencias comunales (demo).",
    category: "municipal",
    available: "24 horas",
  },
  {
    id: "tel-8",
    name: "CESFAM Los Aromos",
    number: "(2) 2555 0230",
    description: "Horas médicas y consultas del centro de salud (demo).",
    category: "salud",
    available: "L–V 8:00–20:00, S 9:00–13:00",
  },
  {
    id: "tel-9",
    name: "Salud Responde",
    number: "600 360 7777",
    description: "Orientación médica telefónica del MINSAL.",
    category: "salud",
    available: "24 horas",
  },
  {
    id: "tel-10",
    name: "Fono Familia (Carabineros)",
    number: "149",
    description: "Violencia intrafamiliar y protección de la familia.",
    category: "apoyo",
    available: "24 horas",
  },
  {
    id: "tel-11",
    name: "Violencia contra la mujer",
    number: "1455",
    description:
      "Orientación y ayuda de SernamEG, confidencial y gratuito.",
    category: "apoyo",
    available: "24 horas",
  },
  {
    id: "tel-12",
    name: "Fono Niñez",
    number: "147",
    description: "Denuncias por vulneración de derechos de niños y niñas.",
    category: "apoyo",
    available: "24 horas",
  },
  {
    id: "tel-13",
    name: "Salud Mental (línea *4141)",
    number: "*4141",
    description:
      "Prevención del suicidio: apoyo psicológico inmediato del MINSAL.",
    category: "apoyo",
    available: "24 horas",
  },
];
