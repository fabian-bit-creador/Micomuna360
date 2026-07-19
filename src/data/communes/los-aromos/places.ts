import type { Place } from "@/types";

/** Directorio comunal ficticio de la comuna demo Los Aromos. */
export const places: Place[] = [
  {
    id: "pl-1",
    name: "Municipalidad de Los Aromos",
    category: "municipal",
    description:
      "Atención ciudadana, trámites, permisos y oficinas municipales.",
    address: "Av. Los Aromos 1200",
    sectorId: "loc-1",
    schedule: "L–V 8:30–14:00",
    phone: "(2) 2555 0100",
    icon: "Building2",
  },
  {
    id: "pl-2",
    name: "CESFAM Los Aromos",
    category: "salud",
    description:
      "Centro de salud familiar: horas médicas, vacunas, farmacia y urgencia leve.",
    address: "Calle El Consultorio 45",
    sectorId: "loc-1",
    schedule: "L–V 8:00–20:00, S 9:00–13:00",
    phone: "(2) 2555 0230",
    icon: "Cross",
  },
  {
    id: "pl-3",
    name: "Biblioteca municipal",
    category: "educacion",
    description:
      "Préstamo de libros, sala de estudio, computadores e internet gratis.",
    address: "Plaza Central s/n",
    sectorId: "loc-1",
    schedule: "L–V 9:00–19:00, S 10:00–14:00",
    phone: "(2) 2555 0245",
    icon: "BookOpen",
  },
  {
    id: "pl-4",
    name: "Gimnasio municipal",
    category: "deporte",
    description:
      "Multicancha techada, talleres deportivos y campeonatos comunales.",
    address: "Av. El Estero 890",
    sectorId: "loc-3",
    schedule: "L–D 9:00–22:00",
    phone: null,
    icon: "Dumbbell",
  },
  {
    id: "pl-5",
    name: "Sede Junta de Vecinos Villa Los Copihues",
    category: "comunitario",
    description:
      "Reuniones vecinales, talleres comunitarios y atención de la directiva.",
    address: "Pasaje Los Canelos 210",
    sectorId: "loc-2",
    schedule: "Mar y Jue 18:00–20:00",
    phone: null,
    icon: "Users",
  },
  {
    id: "pl-6",
    name: "Punto limpio comunal",
    category: "medioambiente",
    description:
      "Reciclaje de vidrio, cartón, plástico PET y aceite usado.",
    address: "Av. El Parque 1500",
    sectorId: "loc-5",
    schedule: "L–S 9:00–18:00",
    phone: null,
    icon: "Recycle",
  },
  {
    id: "pl-7",
    name: "Oficina de empleo (OMIL)",
    category: "municipal",
    description:
      "Bolsa de trabajo, apresto laboral y certificación para el seguro de cesantía.",
    address: "Av. Los Aromos 1240",
    sectorId: "loc-1",
    schedule: "L–V 8:30–14:00",
    phone: "(2) 2555 0160",
    icon: "FileText",
  },
  {
    id: "pl-8",
    name: "Farmacia popular",
    category: "salud",
    description:
      "Medicamentos a precio de costo para vecinos inscritos en la comuna.",
    address: "Calle El Consultorio 52",
    sectorId: "loc-1",
    schedule: "L–V 9:00–18:00",
    phone: "(2) 2555 0238",
    icon: "Cross",
  },
  {
    id: "pl-9",
    name: "Huerto comunitario Nueva Esperanza",
    category: "medioambiente",
    description:
      "Espacio vecinal de cultivo compartido, compostaje y educación ambiental.",
    address: "Pasaje La Esperanza 33",
    sectorId: "loc-4",
    schedule: "S y D 10:00–14:00",
    phone: null,
    icon: "Sprout",
  },
];
