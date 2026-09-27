import type { ContextIndicator, EnrollmentByDependency } from "@/types";

/**
 * Indicadores con contexto del piloto La Pintana.
 *
 * GENERADO desde las descargas oficiales del 2026-09-27 (ver
 * docs/fuentes/la-pintana-indicadores-2026-09/): SINIM (datos municipales,
 * Región Metropolitana, 2017–2025) y MINEDUC (resumen de matrícula por
 * establecimiento, 2020–2025). No se editan cifras a mano.
 *
 * Reglas aplicadas al generar:
 * - Un valor «No Recepcionado», vacío, cero o fuera de rango plausible es
 *   null: se muestra como año sin dato, nunca como cero.
 * - El promedio regional es el promedio simple de las comunas de la región
 *   con dato válido ese año; se guarda cuántas son.
 * - Contexto, no puntaje: no se calculan posiciones ni calificaciones.
 * - Educación municipal de SINIM NO se usa: desde el traspaso al Servicio
 *   Local de Educación Pública sus valores dejaron de ser válidos (0 o
 *   cifras imposibles). La matrícula sale de MINEDUC.
 */
export const contextIndicators: ContextIndicator[] = [
  {
    id: "comuna-poblacion",
    area: "comuna",
    question: "¿Cuántas personas viven en la comuna?",
    title: "Población estimada",
    unit: "people",
    headline: "El INE estima que en {year} viven {value} personas en la comuna.",
    series: [{ year: 2025, value: 188806 }],
    regional: null,
    reading:
      "Es una proyección del Instituto Nacional de Estadísticas, no un conteo casa por casa.",
    caveat: "En 2019 cambió la proyección oficial que usa SINIM, así que solo mostramos el dato más reciente.",
    sourceCode: "ITPC",
    sourceId: "cl-sinim",
  },
  {
    id: "comuna-pobreza",
    area: "comuna",
    question: "¿Cuántas personas viven en situación de pobreza por ingresos?",
    title: "Pobreza por ingresos",
    unit: "percent",
    headline: "Según la última encuesta CASEN vigente, el {value} de las personas de la comuna vive en situación de pobreza por ingresos.",
    series: [{ year: 2025, value: 9.3 }],
    regional: [
      { year: 2025, value: 5, communes: 52 },
    ],
    reading:
      "La encuesta CASEN del Ministerio de Desarrollo Social considera en pobreza a quienes viven en hogares cuyos ingresos no alcanzan para cubrir las necesidades básicas. A nivel de comuna es una estimación estadística, con margen de error.",
    caveat: "El dato cambia solo cuando se publica una nueva CASEN: SINIM repite la última estimación vigente en los años intermedios.",
    sourceCode: "ISOC001",
    sourceId: "cl-sinim",
  },
  {
    id: "salud-cobertura",
    area: "salud",
    question: "¿Cuántos vecinos se atienden en la salud municipal?",
    title: "Población inscrita en la salud municipal",
    unit: "percent",
    headline: "El {value} de la población de la comuna está inscrita en un centro de salud municipal ({year}).",
    series: [{ year: 2017, value: 67.4 }, { year: 2018, value: 66.1 }, { year: 2019, value: 86.48 }, { year: 2020, value: 76.96 }, { year: 2021, value: 76.4 }, { year: 2022, value: 85.68 }, { year: 2023, value: null }, { year: 2024, value: 78.55 }, { year: 2025, value: 78.78 }],
    regional: [
      { year: 2017, value: 65.15, communes: 46 },
      { year: 2018, value: 65.01, communes: 46 },
      { year: 2019, value: 65.42, communes: 45 },
      { year: 2020, value: 63.75, communes: 45 },
      { year: 2021, value: 64.01, communes: 45 },
      { year: 2022, value: 64.68, communes: 43 },
      { year: 2023, value: null, communes: 0 },
      { year: 2024, value: 66.33, communes: 41 },
      { year: 2025, value: 66.73, communes: 40 },
    ],
    reading:
      "Cuenta a las personas de FONASA inscritas y validadas en los centros de salud municipales, en relación con la población comunal. Un porcentaje alto indica que mucha gente depende de la atención primaria municipal; no mide la calidad de la atención.",
    caveat: "2023 sin dato: no fue informado a SINIM. El promedio regional considera solo las comunas con dato válido; varias no administran salud primaria.",
    sourceCode: "ISAL005",
    sourceId: "cl-sinim",
  },
  {
    id: "salud-gasto-inscrito",
    area: "salud",
    question: "¿Cuánto se gasta en salud municipal por persona inscrita?",
    title: "Gasto en salud por persona inscrita",
    unit: "clp",
    headline: "En {year}, la salud municipal gastó {value} por cada persona inscrita.",
    series: [{ year: 2017, value: 199000 }, { year: 2018, value: 208000 }, { year: 2019, value: 193000 }, { year: 2020, value: 234000 }, { year: 2021, value: 226000 }, { year: 2022, value: 196000 }, { year: 2023, value: null }, { year: 2024, value: 283000 }, { year: 2025, value: 281000 }],
    regional: [
      { year: 2017, value: 204612.24, communes: 49 },
      { year: 2018, value: 228632.65, communes: 49 },
      { year: 2019, value: 219530.61, communes: 49 },
      { year: 2020, value: 235340.43, communes: 47 },
      { year: 2021, value: 260872.34, communes: 47 },
      { year: 2022, value: 243918.37, communes: 49 },
      { year: 2023, value: null, communes: 0 },
      { year: 2024, value: 277755.1, communes: 49 },
      { year: 2025, value: 261795.92, communes: 49 },
    ],
    reading:
      "Es el gasto anual del área de salud municipal dividido por la población inscrita. Gastar más no significa por sí solo atender mejor: depende de la población, sus necesidades y los programas.",
    caveat: "2023 sin dato informado. Montos en pesos de diciembre de 2025 (factor de actualización de SINIM), redondeados a miles.",
    sourceCode: "ISAL23",
    sourceId: "cl-sinim",
  },
  {
    id: "finanzas-dependencia-fcm",
    area: "finanzas",
    question: "¿Cuánto depende el municipio del Fondo Común Municipal?",
    title: "Dependencia del Fondo Común Municipal",
    unit: "percent",
    headline: "En {year}, el {value} de los ingresos propios del municipio vino del Fondo Común Municipal.",
    series: [{ year: 2017, value: 83.56 }, { year: 2018, value: 84.49 }, { year: 2019, value: 84.54 }, { year: 2020, value: 85.93 }, { year: 2021, value: 85.84 }, { year: 2022, value: 85.82 }, { year: 2023, value: 83.07 }, { year: 2024, value: 82.98 }, { year: 2025, value: 81.19 }],
    regional: [
      { year: 2017, value: 38.17, communes: 52 },
      { year: 2018, value: 37.95, communes: 52 },
      { year: 2019, value: 38.48, communes: 52 },
      { year: 2020, value: 39.96, communes: 51 },
      { year: 2021, value: 39.68, communes: 51 },
      { year: 2022, value: 39.75, communes: 52 },
      { year: 2023, value: 39.92, communes: 52 },
      { year: 2024, value: 40.22, communes: 52 },
      { year: 2025, value: 40.68, communes: 52 },
    ],
    reading:
      "El Fondo Común Municipal redistribuye recursos entre todas las comunas del país con criterios que favorecen a las que recaudan menos por su cuenta. No mide la gestión municipal: refleja cuánto se puede recaudar en la comuna.",
    caveat: null,
    sourceCode: "IADM75",
    sourceId: "cl-sinim",
  },
  {
    id: "finanzas-ingresos-propios",
    area: "finanzas",
    question: "¿Cuánto recauda el municipio por su cuenta, por habitante?",
    title: "Ingresos propios por habitante",
    unit: "clp",
    headline: "En {year}, el municipio recaudó por su cuenta {value} por habitante.",
    series: [{ year: 2017, value: 26000 }, { year: 2018, value: 25000 }, { year: 2019, value: 29000 }, { year: 2020, value: 26000 }, { year: 2021, value: 27000 }, { year: 2022, value: 27000 }, { year: 2023, value: 35000 }, { year: 2024, value: 37000 }, { year: 2025, value: 42000 }],
    regional: [
      { year: 2017, value: 181211.54, communes: 52 },
      { year: 2018, value: 193173.08, communes: 52 },
      { year: 2019, value: 182461.54, communes: 52 },
      { year: 2020, value: 160392.16, communes: 51 },
      { year: 2021, value: 173392.16, communes: 51 },
      { year: 2022, value: 177596.15, communes: 52 },
      { year: 2023, value: 201865.38, communes: 52 },
      { year: 2024, value: 209884.62, communes: 52 },
      { year: 2025, value: 213942.31, communes: 52 },
    ],
    reading:
      "Son los ingresos propios permanentes —contribuciones, patentes comerciales, permisos de circulación y derechos de aseo— divididos por la población. Dependen sobre todo de cuánta actividad económica y cuántas propiedades con contribuciones hay en la comuna.",
    caveat: "Montos en pesos de diciembre de 2025 (factor de actualización de SINIM), redondeados a miles.",
    sourceCode: "IADM74",
    sourceId: "cl-sinim",
  },
];

/** Matrícula en establecimientos en funcionamiento, al 30 de abril de cada año. */
export const enrollment: EnrollmentByDependency[] = [
  {
    year: 2020,
    commune: { municipal: 5593, particular_subvencionado: 30324 },
    region: { municipal: 316612, slep: 36927, particular_subvencionado: 816987, particular_pagado: 193249, administracion_delegada: 21072 },
    schools: 72,
    slep: null,
    sourceId: "cl-mineduc-matricula",
  },
  {
    year: 2021,
    commune: { municipal: 5523, particular_subvencionado: 30126 },
    region: { municipal: 317438, slep: 35743, particular_subvencionado: 816979, particular_pagado: 188788, administracion_delegada: 21307 },
    schools: 72,
    slep: null,
    sourceId: "cl-mineduc-matricula",
  },
  {
    year: 2022,
    commune: { municipal: 5393, particular_subvencionado: 30061 },
    region: { municipal: 316501, slep: 35380, particular_subvencionado: 810865, particular_pagado: 195401, administracion_delegada: 21287 },
    schools: 71,
    slep: null,
    sourceId: "cl-mineduc-matricula",
  },
  {
    year: 2023,
    commune: { municipal: 5089, particular_subvencionado: 29632 },
    region: { municipal: 312265, slep: 34675, particular_subvencionado: 804487, particular_pagado: 194291, administracion_delegada: 21480 },
    schools: 70,
    slep: null,
    sourceId: "cl-mineduc-matricula",
  },
  {
    year: 2024,
    commune: { municipal: 4926, particular_subvencionado: 28793 },
    region: { municipal: 302890, slep: 33559, particular_subvencionado: 794041, particular_pagado: 194621, administracion_delegada: 21780 },
    schools: 70,
    slep: null,
    sourceId: "cl-mineduc-matricula",
  },
  {
    year: 2025,
    commune: { slep: 5153, particular_subvencionado: 27553 },
    region: { municipal: 211620, slep: 122152, particular_subvencionado: 780643, particular_pagado: 198808, administracion_delegada: 22138 },
    schools: 70,
    slep: "DEL PINO",
    sourceId: "cl-mineduc-matricula",
  },
];
