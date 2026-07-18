import type { Organization } from "@/types";

/**
 * Organizaciones comunitarias ficticias de la comuna demo.
 * Contactos institucionales inventados — nunca datos personales.
 */
export const organizations: Organization[] = [
  {
    id: "org-1",
    name: "Junta de Vecinos Villa Los Copihues",
    type: "junta_vecinos",
    sectorId: "loc-2",
    description:
      "Representa a las familias de la villa ante el municipio y organiza mejoras del barrio.",
    meetingInfo: "Asamblea el primer martes de cada mes, 19:00, en la sede vecinal.",
    contact: "jjvv.copihues@losaromos-demo.cl",
    icon: "Users",
  },
  {
    id: "org-2",
    name: "Club Deportivo Los Aromos FC",
    type: "club_deportivo",
    sectorId: "loc-5",
    description:
      "Fútbol formativo para niños, niñas y jóvenes, y series adultas en el campeonato comunal.",
    meetingInfo: "Entrenamientos Mar/Jue 18:30 en el gimnasio municipal.",
    contact: "clublosaromosfc@losaromos-demo.cl",
    icon: "Trophy",
  },
  {
    id: "org-3",
    name: "Comité de Vivienda Nueva Esperanza",
    type: "comite_vivienda",
    sectorId: "loc-4",
    description:
      "Agrupa a familias que postulan juntas a subsidios habitacionales y mejoramiento de barrio.",
    meetingInfo: "Reunión quincenal los sábados 11:00 en la multicancha.",
    contact: "comite.nuevaesperanza@losaromos-demo.cl",
    icon: "Home",
  },
  {
    id: "org-4",
    name: "Fundación Aprende Conmigo",
    type: "fundacion",
    sectorId: "loc-1",
    description:
      "Reforzamiento escolar gratuito y alfabetización digital para vecinos de todas las edades.",
    meetingInfo: "Talleres L–V 17:00–19:00 en la biblioteca municipal.",
    contact: "hola@aprendeconmigo-demo.cl",
    icon: "BookOpen",
  },
  {
    id: "org-5",
    name: "Conjunto Folclórico Raíces del Aromo",
    type: "cultural",
    sectorId: "loc-1",
    description:
      "Danza y música tradicional chilena; presentaciones en fiestas y ferias comunales.",
    meetingInfo: "Ensayos Vie 19:30 en el centro cultural.",
    contact: "raicesdelaromo@losaromos-demo.cl",
    icon: "Music",
  },
  {
    id: "org-6",
    name: "Club de Adulto Mayor Años Dorados",
    type: "adulto_mayor",
    sectorId: "loc-3",
    description:
      "Encuentros, gimnasia suave, paseos y talleres para personas mayores del sector.",
    meetingInfo: "Miércoles 10:30 en la sede de El Estero Norte.",
    contact: null,
    icon: "HeartHandshake",
  },
  {
    id: "org-7",
    name: "Brigada Ecológica Los Aromos",
    type: "medioambiente",
    sectorId: "loc-5",
    description:
      "Voluntariado vecinal: limpieza de espacios públicos, reciclaje y educación ambiental.",
    meetingInfo: "Operativos un sábado al mes; convocatoria en esta plataforma.",
    contact: "brigada.ecologica@losaromos-demo.cl",
    icon: "Leaf",
  },
  {
    id: "org-8",
    name: "Agrupación de Ferias Libres",
    type: "junta_vecinos",
    sectorId: "loc-4",
    description:
      "Organiza a los feriantes de la comuna y coordina las ferias de los fines de semana.",
    meetingInfo: "Feria Sáb y Dom 9:00–15:00, Av. La Esperanza.",
    contact: "ferias@losaromos-demo.cl",
    icon: "HandHeart",
  },
];
