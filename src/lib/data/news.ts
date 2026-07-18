import type { NewsArticle } from "@/types";

/** Noticias, anuncios, talleres, beneficios y buenas noticias (ficticios). */
export const news: NewsArticle[] = [
  {
    id: "news-7",
    title: "El Club Los Aromos FC es campeón regional infantil",
    slug: "club-los-aromos-campeon-regional",
    summary:
      "Los niños del club deportivo comunal ganaron la final regional sub-12 y clasificaron al nacional. ¡Orgullo de toda la comuna!",
    body: "El Club Deportivo Los Aromos FC se coronó campeón regional en la categoría sub-12 tras vencer en una final vibrante disputada este fin de semana.\n\nEl equipo, formado íntegramente por niños de la comuna, clasificó al campeonato nacional de octubre. La municipalidad y la comunidad organizarán actividades para apoyar el viaje de la delegación.\n\n¿Conoces otro logro de la comuna que merezca contarse? Pronto podrás compartirlo en esta plataforma.",
    coverImage: null,
    type: "buena_noticia",
    publishedAt: "2026-07-04T10:00:00Z",
    authorId: "user-funcionario",
  },
  {
    id: "news-8",
    title: "Vecinos recuperan la ex plazoleta del canal",
    slug: "vecinos-recuperan-plazoleta",
    summary:
      "Lo que era un microbasural en El Estero Norte hoy es una plazoleta con juegos y bancas, gracias a una iniciativa vecinal apoyada por el municipio.",
    body: "Tras meses de trabajo conjunto entre la junta de vecinos, la Brigada Ecológica y cuadrillas municipales, la ex plazoleta del canal en El Estero Norte fue recuperada por completo: juegos infantiles, bancas, iluminación y árboles nativos.\n\nLa iniciativa nació de un grupo de vecinas que se organizó para postular a fondos concursables. Hoy el espacio es punto de encuentro del sector.\n\nHistorias como esta son el corazón de MiComuna360: cuando la comunidad y el municipio se conectan, el territorio cambia.",
    coverImage: null,
    type: "buena_noticia",
    publishedAt: "2026-06-27T09:00:00Z",
    authorId: "user-admin",
  },
  {
    id: "news-1",
    title: "Comienza el plan de recambio de luminarias LED",
    slug: "plan-recambio-luminarias-led",
    summary:
      "Durante julio se renovarán 450 luminarias en Villa Los Copihues y El Estero Norte, priorizando pasajes y accesos a paraderos.",
    body: "La municipalidad de Los Aromos inicia este mes la primera etapa del plan de recambio de luminarias LED. La intervención considera 450 puntos de alumbrado público en los sectores Villa Los Copihues y El Estero Norte, priorizando pasajes interiores, accesos a paraderos y entornos de establecimientos educacionales.\n\nEl cronograma de trabajos se publicará semanalmente en esta plataforma, junto con el avance por sector.",
    coverImage: null,
    type: "noticia",
    publishedAt: "2026-07-01T09:00:00Z",
    authorId: "user-admin",
  },
  {
    id: "news-2",
    title: "Taller gratuito de huertos urbanos para vecinos",
    slug: "taller-huertos-urbanos",
    summary:
      "Inscripciones abiertas para el taller de huertos urbanos en el Parque Los Aromos. Cupos limitados, sábados de julio.",
    body: "La Dirección de Medioambiente invita a las familias de la comuna al taller gratuito de huertos urbanos, que se realizará todos los sábados de julio en el invernadero del Parque Los Aromos.\n\nEl taller incluye materiales, semillas y acompañamiento posterior para instalar un huerto en casa o en la sede vecinal.",
    coverImage: null,
    type: "taller",
    publishedAt: "2026-06-28T12:00:00Z",
    authorId: "user-funcionario",
  },
  {
    id: "news-3",
    title: "Postulación a subsidio de mejoramiento de vivienda",
    slug: "postulacion-subsidio-mejoramiento",
    summary:
      "Hasta el 31 de julio están abiertas las postulaciones al programa de mejoramiento de viviendas. Revisa los requisitos.",
    body: "Se encuentran abiertas las postulaciones al programa de mejoramiento de viviendas para familias de la comuna. El beneficio cubre reparación de techumbres, instalaciones eléctricas y aislación térmica.\n\nLos requisitos y el formulario de postulación están disponibles en las oficinas de la Dirección de Vivienda y en esta plataforma.",
    coverImage: null,
    type: "beneficio",
    publishedAt: "2026-06-25T10:00:00Z",
    authorId: "user-admin",
  },
  {
    id: "news-4",
    title: "Cuenta pública 2025: los avances de la comuna",
    slug: "cuenta-publica-2025",
    summary:
      "Revisa el resumen ciudadano de la cuenta pública: inversión en obras, programas sociales y ejecución presupuestaria.",
    body: "La cuenta pública 2025 ya está disponible en formato ciudadano: un resumen visual y simple de la inversión en obras, los programas sociales ejecutados y la ejecución presupuestaria del año.\n\nEl documento completo puede descargarse desde el portal de transparencia municipal.",
    coverImage: null,
    type: "noticia",
    publishedAt: "2026-06-20T09:00:00Z",
    authorId: "user-admin",
  },
  {
    id: "news-5",
    title: "Operativo de vacunación y atención veterinaria",
    slug: "operativo-veterinario-julio",
    summary:
      "Este sábado habrá operativo gratuito de vacunación antirrábica y microchip en la Población Nueva Esperanza.",
    body: "Este sábado, entre 10:00 y 14:00 horas, se realizará un operativo gratuito de vacunación antirrábica, desparasitación e instalación de microchip para mascotas en la multicancha de la Población Nueva Esperanza.\n\nNo se requiere inscripción previa. Se atenderá por orden de llegada.",
    coverImage: null,
    type: "anuncio",
    publishedAt: "2026-06-30T15:00:00Z",
    authorId: "user-funcionario",
  },
  {
    id: "news-6",
    title: "Nueva plataforma MiComuna360: participa del piloto",
    slug: "lanzamiento-micomuna360",
    summary:
      "La comuna estrena su plataforma digital para reportar problemas, ver noticias y seguir los avances de gestión en un solo lugar.",
    body: "Los Aromos se convierte en comuna piloto de MiComuna360, la plataforma que reúne solicitudes vecinales, mapa territorial, noticias e indicadores comunales en un solo lugar.\n\nDurante el piloto, los reportes ingresados serán revisados por el equipo municipal y su avance quedará visible para toda la comunidad. Tu opinión nos ayuda a mejorar: encontrarás un formulario de sugerencias en cada sección.",
    coverImage: null,
    type: "noticia",
    publishedAt: "2026-07-03T08:00:00Z",
    authorId: "user-admin",
  },
];
