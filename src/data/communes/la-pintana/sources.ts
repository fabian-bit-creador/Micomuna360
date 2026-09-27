import type { DataSource } from "@/types";

/**
 * Registro de fuentes del piloto La Pintana.
 *
 * Espejo legible en docs/fuentes-la-pintana.md. Método de verificación:
 * navegación directa a cada sitio y revisión de su contenido (desde el
 * 2026-09-27; antes, contenido indexado por buscadores). Vigencia: 3 meses
 * para sitios municipales, 6 para nacionales.
 * Nada con status distinto de "verificado" se muestra como vigente.
 *
 * Totales: 31 fuentes registradas — 30 verificadas, 1 pendiente de clasificación
 * (el informe de pasivos, cuya clasificación contable falta confirmar)
 * (la ficha de Transparencia Activa pasó de pendiente a verificada el
 * 2026-07-19 con el enlace directo entregado desde pintana.cl).
 */
export const sources: DataSource[] = [
  {
    id: "lp-muni-home",
    institution: "Municipalidad de La Pintana",
    pageName: "Municipalidad de La Pintana (sitio oficial)",
    description:
      "Sitio oficial: noticias, trámites y direcciones municipales.",
    featured: true,
    url: "https://pintana.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes: null,
  },
  {
    id: "lp-muni-direcciones",
    institution: "Municipalidad de La Pintana",
    pageName: "Direcciones Municipales",
    description:
      "Direcciones y horarios de las oficinas municipales.",
    featured: false,
    url: "https://pintana.cl/?page_id=7033",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Dirección del edificio consistorial (Avda. Santa Rosa N°12.975) y horarios (L–J 8:30–14:00 y 15:00–17:00 · V 8:30–14:00 y 15:00–16:00) confirmados navegando directo el sitio oficial el 2026-09-27.",
  },
  {
    id: "lp-muni-tramites",
    institution: "Municipalidad de La Pintana",
    pageName: "Trámites",
    description:
      "Listado oficial de trámites municipales.",
    featured: false,
    url: "https://pintana.cl/?page_id=2460",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes: null,
  },
  {
    id: "lp-muni-pagos",
    institution: "Municipalidad de La Pintana",
    pageName: "Pagos en línea municipales",
    description:
      "Pago del permiso de circulación y otros pagos municipales.",
    featured: true,
    url: "https://pintana.cl/?page_id=4122",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Permite pagar el permiso de circulación con RUT y patente; el pago ocurre íntegramente en la plataforma municipal.",
  },
  {
    id: "lp-muni-permisos",
    institution: "Municipalidad de La Pintana",
    pageName: "Permisos de circulación",
    description:
      "Requisitos y atención del permiso de circulación.",
    featured: false,
    url: "https://pintana.cl/?page_id=7910",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes: null,
  },
  {
    id: "lp-muni-licencias",
    institution: "Municipalidad de La Pintana",
    pageName: "Licencias de conducir (reserva de hora)",
    description:
      "Reserva de hora en línea para licencias de conducir.",
    featured: false,
    url: "https://pintana.cl/?page_id=8115",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "La reserva se realiza en la plataforma externa e-com utilizada por el municipio; los cupos se abren el primer día hábil de cada mes.",
  },
  {
    id: "lp-dideco",
    institution: "DIDECO La Pintana",
    pageName: "DIDECO La Pintana",
    description:
      "Desarrollo comunitario: programas y apoyos sociales.",
    featured: true,
    url: "https://www.dideco.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes: null,
  },
  {
    id: "lp-smartdideco",
    institution: "DIDECO La Pintana",
    pageName: "SmartDIDECO",
    description:
      "Plataforma digital de programas y atenciones DIDECO.",
    featured: true,
    url: "https://www.lapintana.smartdideco.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Enlace vigente según dideco.cl (verificado directo el 2026-09-27). El servidor de SmartDIDECO rechaza conexiones desde fuera de Chile, así que no se pudo abrir desde el entorno de verificación.",
  },
  {
    id: "lp-deportes",
    institution: "Corporación Municipal de Deportes de La Pintana",
    pageName: "Corporación Municipal de Deportes",
    description:
      "Recintos deportivos, talleres y escuelas deportivas.",
    featured: true,
    url: "https://www.pintanadeportes.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Incluye páginas propias por recinto (Polideportivo, Club de Campo, talleres).",
  },
  {
    id: "lp-deportes-recintos",
    institution: "Corporación Municipal de Deportes de La Pintana",
    pageName: "Recintos deportivos (direcciones)",
    description:
      "Direcciones de los recintos deportivos comunales.",
    featured: false,
    url: "https://www.pintanadeportes.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Direcciones de Estadio Municipal, Club de Campo, Polideportivo y Complejo Las Rosas tomadas del contenido del sitio oficial y re-confirmadas navegando directo el 2026-09-27. Horarios y teléfonos no publicados aquí por no estar verificados.",
  },
  {
    id: "lp-cultura",
    institution: "Corporación Cultural de La Pintana",
    pageName: "Corporación Cultural",
    description:
      "Programación cultural y teatro municipal.",
    featured: true,
    url: "https://www.culturapintana.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes: null,
  },
  {
    id: "lp-geoportal",
    institution: "Municipalidad de La Pintana",
    pageName: "Geoportal comunal (GeoPintana)",
    description:
      "Datos geoespaciales y visores del territorio comunal.",
    featured: true,
    url: "https://geopintana-lapintana.hub.arcgis.com/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Fuente candidata de coordenadas oficiales para el mapa (etapa P4).",
  },
  {
    id: "lp-muni-salud",
    institution: "Municipalidad de La Pintana",
    pageName: "Centros de Salud Familiar",
    description:
      "Los CESFAM de la comuna: dirección, teléfono, horario y requisitos de inscripción.",
    featured: false,
    url: "https://pintana.cl/?page_id=7115",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Siete CESFAM con dirección y teléfono. El CESFAM Juan Pablo II figura con la aclaración de que no pertenece a la red municipal, sino a la Red Áncora UC. No se publican nombres ni correos de directivos.",
  },
  {
    id: "lp-muni-salud-servicios",
    institution: "Municipalidad de La Pintana",
    pageName: "Programas y servicios de salud",
    description:
      "COSAM, rehabilitación, unidad oftalmológica, SAPU y SAR: qué atienden, horarios y teléfonos.",
    featured: false,
    url: "https://pintana.cl/?page_id=5229",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Horarios del SAPU y del SAR confirmados aquí. Las direcciones de cada SAPU no figuran en esta página: provienen del geoportal comunal.",
  },
  {
    id: "lp-geo-equipamiento",
    institution: "Municipalidad de La Pintana",
    pageName: "GeoPintana — capas de equipamiento comunal",
    description:
      "Capas públicas del geoportal municipal con la ubicación de centros de salud, servicios, recintos deportivos y seguridad.",
    featured: false,
    url: "https://services7.arcgis.com/Jc7ZuHKHcN6HGMlG/arcgis/rest/services",
    publishedAt: "2026-09-07",
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Capas usadas: EQUIPAMIENTO_SALUD (editada 2025-11-24), EQUIPAMIENTO_SERVICIOS (2025-12-04), EQUIPAMIENTO_SEGURIDAD (2025-11-20), EQUIPAMIENTO_DEPORTIVO (2026-09-07) y LIMITE_COMUNAL (2025-01-27). Se contrastaron con OpenStreetMap: donde ambos tienen el lugar, la diferencia es de 1 a 125 metros. No se usan capas con datos personales o tributarios (base predial, patentes, catastros sociales).",
  },
  {
    id: "osm-la-pintana",
    institution: "OpenStreetMap",
    pageName: "OpenStreetMap — La Pintana",
    description:
      "Mapa abierto y colaborativo. Se usa como mapa base y, solo cuando el geoportal no tiene el lugar, como fuente de coordenadas.",
    featured: false,
    url: "https://www.openstreetmap.org/way/1036662021",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2027-03-27",
    notes:
      "Coordenadas del Polideportivo de La Pintana (way 1036662021, con dirección Patagonia 12980, la misma que publica la Corporación de Deportes). Datos © colaboradores de OpenStreetMap, licencia ODbL.",
  },
  {
    id: "cl-sinim",
    institution: "SUBDERE — Sistema Nacional de Información Municipal (SINIM)",
    pageName: "SINIM — Datos municipales",
    description:
      "Indicadores oficiales de todos los municipios del país: salud, educación, finanzas y caracterización comunal.",
    featured: false,
    url: "https://datos.sinim.gov.cl/datos_municipales.php",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2027-03-27",
    notes:
      "Descarga del 2026-09-27, Región Metropolitana completa (52 comunas), años 2017–2025. Variables: ITPC, ISOC001, ISAL005, ISAL23, IADM75 e IADM74; los montos con el factor de actualización de SINIM (pesos de diciembre de 2025). Los datos de educación municipal no se usan porque dejaron de ser válidos tras el traspaso al SLEP.",
  },
  {
    id: "cl-mineduc-matricula",
    institution: "Ministerio de Educación — Datos Abiertos",
    pageName: "Resumen de matrícula por establecimiento educacional",
    description:
      "Matrícula oficial de cada colegio del país, con su dependencia, al 30 de abril de cada año.",
    featured: false,
    url: "https://datosabiertos.mineduc.cl/resumen-de-matricula-por-establecimiento-educacional/",
    publishedAt: "2025-10-29",
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2027-03-27",
    notes:
      "Archivos 2020 a 2025. Se suman solo establecimientos en funcionamiento. En 2025 los 14 establecimientos públicos de la comuna figuran bajo el SLEP Del Pino.",
  },
  {
    id: "cl-chileatiende",
    institution: "ChileAtiende (Gobierno de Chile)",
    pageName: "ChileAtiende",
    description:
      "Trámites y beneficios del Estado de Chile.",
    featured: true,
    url: "https://www.chileatiende.gob.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2027-03-27",
    notes: null,
  },
  {
    id: "cl-registro-social",
    institution: "Ministerio de Desarrollo Social y Familia",
    pageName: "Registro Social de Hogares",
    description:
      "Registro Social de Hogares: puerta de entrada a los beneficios del Estado.",
    featured: false,
    url: "https://www.registrosocial.gob.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2027-03-27",
    notes: null,
  },
  {
    id: "cl-portal-transparencia",
    institution: "Consejo para la Transparencia",
    pageName: "Portal de Transparencia del Estado",
    description:
      "Portal general de Transparencia del Estado.",
    featured: false,
    url: "https://www.portaltransparencia.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2027-03-27",
    notes:
      "Punto de entrada a la Transparencia Activa municipal. El enlace directo a la ficha de La Pintana está en lp-transparencia-directa.",
  },
  {
    id: "lp-ta-estados-financieros",
    institution: "Municipalidad de La Pintana",
    pageName: "Estados financieros — Transparencia Activa",
    description:
      "Balance, estado de resultado y situación presupuestaria del ejercicio contable 2025.",
    featured: false,
    url: "https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124",
    publishedAt: "2026-03-16",
    verifiedAt: "2026-09-04",
    status: "verificado",
    validUntil: "2027-03-16",
    notes:
      "Índice de 6 documentos del ejercicio 2025 descargado en CSV desde la Transparencia Activa municipal por el responsable del proyecto. Los archivos se alojan en cloud.pintana.cl. MiComuna360 enlaza los documentos, no reproduce su contenido.",
  },
  {
    id: "lp-ta-indice-ejecucion-2026",
    institution: "Municipalidad de La Pintana",
    pageName: "Balances de ejecución presupuestaria 2026 — Transparencia Activa",
    description:
      "Informes mensuales de ingresos y gastos de enero a julio de 2026, áreas municipal y salud.",
    featured: false,
    url: "https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124",
    publishedAt: "2026-08-14",
    verifiedAt: "2026-09-04",
    status: "verificado",
    validUntil: "2027-03-04",
    notes:
      "Inventario de 28 documentos (14 municipales y 14 de salud) normalizado desde los CSV del portal. Las cifras de ejecución se leyeron de los informes de junio (ver lp-ta-ejecucion-junio-2026); el resto se publica como enlace.",
  },
  {
    id: "lp-ta-ejecucion-junio-2026",
    institution: "Municipalidad de La Pintana",
    pageName:
      "Balances presupuestarios de gastos e ingresos al 30 de junio de 2026",
    description:
      "Presupuesto inicial y vigente, lo comprometido y lo pagado por subtítulo, áreas municipal y salud.",
    featured: false,
    url: "https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124",
    publishedAt: "2026-07-07",
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2027-03-27",
    notes:
      "Cuatro PDF escaneados descargados de Transparencia Activa. Se transcribieron las filas de total, subtítulo y tres ítems clave (en miles de pesos) y se verificaron contra el propio informe: saldo impreso fila por fila, suma de subtítulos contra el total (±1 mil pesos por redondeo), continuidad mayo–junio y cruce entre el aporte municipal a salud y lo recibido por salud. No se usa la columna «devengado» de gastos porque no calza entre informes consecutivos.",
  },
  {
    id: "lp-ta-balance-julio-2026",
    institution: "Municipalidad de La Pintana",
    pageName:
      "Balance de comprobación y saldos, julio 2026, área municipal",
    description:
      "Balance contable de partida doble con 109 cuentas del mes de julio de 2026.",
    featured: false,
    url: "https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124",
    publishedAt: null,
    verifiedAt: "2026-09-04",
    status: "verificado",
    validUntil: "2027-03-04",
    notes:
      "Extracción de 109 filas conciliada contra los seis totales impresos en el PDF original. Sus totales no equivalen a presupuesto, gasto ejecutado ni pagos. Algunos nombres de cuenta vienen truncados en el origen y se conservan tal cual.",
  },
  {
    id: "lp-ta-pasivos-julio-2026",
    institution: "Municipalidad de La Pintana",
    pageName: "Informe de pasivos, julio 2026, área municipal",
    description:
      "Montos por cuenta registrados en el informe de pasivos del mes de julio de 2026.",
    featured: false,
    url: "https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124",
    publishedAt: null,
    verifiedAt: "2026-09-04",
    status: "pendiente",
    validUntil: null,
    notes:
      "PENDIENTE DE CLASIFICACIÓN: el informe incluye 58 cuentas con prefijo 215 y 9 con prefijo 115, que son familias contables distintas. La suma mecánica de ambas no es un indicador válido y falta confirmar la clasificación oficial de cada familia.",
  },
  {
    id: "cl-bne",
    institution: "Bolsa Nacional de Empleo",
    pageName: "Bolsa Nacional de Empleo",
    description: "Plataforma pública de ofertas de trabajo del Estado.",
    featured: false,
    url: "https://www.bne.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-20",
    status: "verificado",
    validUntil: "2027-03-20",
    notes: null,
  },
  {
    id: "cl-sence",
    institution: "SENCE",
    pageName: "SENCE — Personas",
    description: "Cursos y capacitación gratuita financiada por el Estado.",
    featured: false,
    url: "https://www.sence.gob.cl/personas",
    publishedAt: null,
    verifiedAt: "2026-09-20",
    status: "verificado",
    validUntil: "2027-03-20",
    notes: null,
  },
  {
    id: "cl-sercotec",
    institution: "SERCOTEC",
    pageName: "SERCOTEC",
    description: "Fondos y asesorías para emprendedores y pequeñas empresas.",
    featured: false,
    url: "https://www.sercotec.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-20",
    status: "verificado",
    validUntil: "2027-03-20",
    notes: null,
  },
  {
    id: "cl-consejo-transparencia",
    institution: "Consejo para la Transparencia",
    pageName: "Consejo para la Transparencia",
    description:
      "Organismo que fiscaliza la Ley de Transparencia y resuelve los reclamos (amparos) de los ciudadanos.",
    featured: false,
    url: "https://www.consejotransparencia.cl/",
    publishedAt: null,
    verifiedAt: "2026-09-04",
    status: "verificado",
    validUntil: "2027-03-04",
    notes:
      "Fuente de los plazos del derecho de acceso a la información (Ley 20.285): respuesta en 20 días hábiles, prórroga excepcional de 10 y amparo dentro de 15 días hábiles.",
  },
  {
    id: "lp-transparencia-directa",
    institution: "Municipalidad de La Pintana",
    pageName: "Transparencia Activa municipal",
    description:
      "Transparencia Activa de la Municipalidad: dotación, contratos y presupuesto.",
    featured: true,
    url: "https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=MU124",
    publishedAt: null,
    verifiedAt: "2026-09-27",
    status: "verificado",
    validUntil: "2026-12-27",
    notes:
      "Enlace directo obtenido desde el acceso «Ley de Transparencia» del sitio oficial pintana.cl (verificado por el responsable del proyecto).",
  },
];

const byId = new Map(sources.map((s) => [s.id, s]));

export function getSource(id: string): DataSource | null {
  return byId.get(id) ?? null;
}
