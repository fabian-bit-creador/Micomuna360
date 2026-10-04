import { z } from "zod";

import type { CommuneData } from "@/data/communes/types";
import { findArea, insideRing } from "@/lib/maps";

/**
 * Integridad de los datos publicados.
 *
 * La promesa del piloto es que ningún dato real se muestre sin fuente y sin
 * fecha. Esta validación corre al cargar el dataset (dev, build y despliegue),
 * así que un error de datos rompe el build en vez de llegar al vecino.
 */

/** Fecha YYYY-MM-DD que existe en el calendario (rechaza 2026-02-31). */
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "debe tener formato YYYY-MM-DD")
  .refine((v) => {
    const date = new Date(`${v}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(v);
  }, "no es una fecha válida");

/** URL https bien formada, con dominio y sin espacios. */
const httpsUrl = z.string().refine((v) => {
  if (/\s/.test(v)) return false;
  try {
    const url = new URL(v);
    return url.protocol === "https:" && url.hostname.includes(".");
  } catch {
    return false;
  }
}, "debe ser una URL https válida");

const hhmm = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "debe ser una hora HH:MM");

const sportsProgramSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    discipline: z.string().min(1),
    kind: z.enum(["escuela", "taller"]),
    venue: z.string().min(1).nullable(),
    address: z.string().min(1),
    placeId: z.string().min(1).nullable(),
    days: z
      .array(
        z.enum([
          "lunes",
          "martes",
          "miercoles",
          "jueves",
          "viernes",
          "sabado",
          "domingo",
        ])
      )
      .min(1),
    startTime: hhmm,
    endTime: hhmm,
    sourceId: z.string().min(1),
  })
  .refine((p) => p.startTime < p.endTime, "termina antes de empezar");

/** Fecha y hora ISO con zona horaria explícita (p. ej. -03:00). */
const isoDateTime = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?([+-]\d{2}:\d{2}|Z)$/,
    "debe ser fecha y hora ISO con zona horaria"
  )
  .refine(
    (v) => !Number.isNaN(Date.parse(v)) && isoDate.safeParse(v.slice(0, 10)).success,
    "no es una fecha válida"
  );

const eventSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    startsAt: isoDateTime,
    endsAt: isoDateTime.nullable(),
    url: httpsUrl.nullable().optional(),
  })
  .refine(
    (e) => !e.endsAt || Date.parse(e.endsAt) > Date.parse(e.startsAt),
    "termina antes de empezar"
  );

const phoneSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  /* Dígitos con espacios o paréntesis, con * o + opcional al inicio
     (*4141, 600 360 7777, (2) 2555 0100). */
  number: z
    .string()
    .regex(/^[*+]?[\d(][\d ()]{1,16}\d$/, "no parece un teléfono"),
  description: z.string().min(1),
  available: z.string().min(1).nullable(),
});

const photoSchema = z.object({
  id: z.string().min(1),
  src: z.string().regex(/^\/images\/[a-z0-9-]+\/[a-z0-9-]+\.(webp|jpg)$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(10),
  author: z.string().min(1),
  license: z.string().min(1),
  licenseUrl: httpsUrl,
  sourceUrl: httpsUrl,
  retrievedAt: isoDate,
  placeId: z.string().min(1).nullable(),
});

const sourceSchema = z.object({
  id: z.string().min(1),
  institution: z.string().min(1),
  pageName: z.string().min(1),
  description: z.string().min(1),
  featured: z.boolean(),
  url: httpsUrl,
  publishedAt: isoDate.nullable(),
  verifiedAt: isoDate,
  status: z.enum(["verificado", "pendiente", "enlace_caido", "archivado"]),
  validUntil: isoDate.nullable(),
  notes: z.string().nullable(),
});

const serviceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  institution: z.string().min(1),
  externalUrl: httpsUrl,
  sourceId: z.string().min(1),
});

const placeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  schedule: z.string().nullable(),
  phone: z.string().nullable(),
  sourceId: z.string().nullable().optional(),
  lat: z.number().min(-90).max(90).nullable().optional(),
  lng: z.number().min(-180).max(180).nullable().optional(),
  coordsSourceId: z.string().nullable().optional(),
});

/*
 * Montos en miles de pesos, enteros como en el informe. El saldo puede ser
 * negativo (se recaudó más de lo presupuestado), los demás no.
 */
const budgetSchema = z.object({
  id: z.string().min(1),
  area: z.enum(["municipal", "salud"]),
  flow: z.enum(["gastos", "ingresos"]),
  year: z.number().int().min(2000).max(2100),
  cutoffDate: isoDate,
  code: z.string().regex(/^(115|215)(-\d{2,3})*$/, "código de clasificador inválido"),
  level: z.enum(["total", "subtitulo", "item"]),
  officialName: z.string().min(1),
  label: z.string().min(1),
  initialK: z.number().int().min(0),
  currentK: z.number().int().min(0),
  committedK: z.number().int().min(0),
  paidK: z.number().int().min(0),
  balanceK: z.number().int(),
  note: z.string().min(1).nullable(),
  documentId: z.string().min(1),
  sourceId: z.string().min(1),
});

const financialReportSchema = z.object({
  id: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  reportDate: isoDate,
  name: z.string().min(1),
  summary: z.string().min(1),
  url: httpsUrl,
  sourceId: z.string().min(1),
});

const budgetIndexSchema = z.object({
  id: z.string().min(1),
  area: z.enum(["municipal", "salud"]),
  year: z.number().int().min(2000).max(2100),
  monthNumber: z.number().int().min(1).max(12),
  flowType: z.enum(["ingresos", "gastos"]),
  publicationDate: isoDate,
  reportEndDate: isoDate,
  url: httpsUrl,
  sourceId: z.string().min(1),
});

const liabilitySchema = z.object({
  id: z.string().min(1),
  accountCode: z.string().min(1),
  /* Solo las dos familias del informe; nunca deben sumarse entre sí. */
  accountPrefix: z.enum(["115", "215"]),
  accountName: z.string().min(1),
  amountClp: z.number().int(),
  period: z.string().regex(/^\d{4}-\d{2}$/, "debe tener formato AAAA-MM"),
  sourceId: z.string().min(1),
});

/*
 * Los montos pueden ser negativos: el balance original incluye asientos de
 * reversa (p. ej. una recaudación pendiente de aplicación con crédito
 * negativo). Se conservan tal como los publica el municipio.
 */
const balanceRowSchema = z.object({
  id: z.string().min(1),
  accountCode: z.string().min(1),
  accountName: z.string().min(1),
  openingDebitClp: z.number().int(),
  openingCreditClp: z.number().int(),
  periodDebitsClp: z.number().int(),
  periodCreditsClp: z.number().int(),
  endingDebitClp: z.number().int(),
  endingCreditClp: z.number().int(),
  sourceId: z.string().min(1),
});

const benefitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  institution: z.string().min(1),
  triggers: z.array(z.string()),
  url: httpsUrl,
  icon: z.string().min(1),
  sourceId: z.string().min(1),
});

const yearPoint = z.object({
  year: z.number().int().min(1990).max(2100),
  value: z.number().nullable(),
});

const contextIndicatorSchema = z.object({
  id: z.string().min(1),
  area: z.enum(["comuna", "salud", "educacion", "finanzas"]),
  question: z.string().min(1),
  title: z.string().min(1),
  unit: z.enum(["percent", "clp", "people", "index"]),
  headline: z.string().includes("{value}"),
  series: z.array(yearPoint).min(1),
  regional: z
    .array(yearPoint.extend({ communes: z.number().int().min(0) }))
    .nullable(),
  reading: z.string().min(1),
  caveat: z.string().min(1).nullable(),
  sourceCode: z.string().min(1).nullable(),
  sourceId: z.string().min(1),
});

const enrollmentSchema = z.object({
  year: z.number().int().min(1990).max(2100),
  commune: z.record(z.string(), z.number().int().min(0)),
  region: z.record(z.string(), z.number().int().min(0)),
  schools: z.number().int().min(0),
  slep: z.string().min(1).nullable(),
  sourceId: z.string().min(1),
});

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  return ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
}

/**
 * Valida el dataset de una comuna. `isDemo` relaja la exigencia de fuente:
 * los datos ficticios de la demo no la necesitan, los reales sí.
 */
export function validateCommuneData(
  communeId: string,
  data: CommuneData,
  isDemo: boolean,
  bounds?: { south: number; west: number; north: number; east: number }
): void {
  const problems: string[] = [];
  const fail = (msg: string) => problems.push(msg);

  for (const source of data.sources) {
    const result = sourceSchema.safeParse(source);
    if (!result.success) {
      fail(
        `fuente "${source.id}": ${result.error.issues
          .map((i) => `${i.path.join(".")} ${i.message}`)
          .join("; ")}`
      );
    }
  }

  const sourceIds = new Set(data.sources.map((s) => s.id));
  const dupSources = duplicates(data.sources.map((s) => s.id));
  if (dupSources.length > 0) {
    fail(`fuentes con id repetido: ${dupSources.join(", ")}`);
  }

  for (const service of data.services) {
    const result = serviceSchema.safeParse(service);
    if (!result.success) {
      fail(
        `servicio "${service.id}": ${result.error.issues
          .map((i) => `${i.path.join(".")} ${i.message}`)
          .join("; ")}`
      );
    }
    if (!sourceIds.has(service.sourceId)) {
      fail(
        `servicio "${service.id}" referencia la fuente inexistente "${service.sourceId}"`
      );
    }
  }

  for (const place of data.places) {
    const result = placeSchema.safeParse(place);
    if (!result.success) {
      fail(
        `lugar "${place.id}": ${result.error.issues
          .map((i) => `${i.path.join(".")} ${i.message}`)
          .join("; ")}`
      );
    }
    if (place.sourceId && !sourceIds.has(place.sourceId)) {
      fail(
        `lugar "${place.id}" referencia la fuente inexistente "${place.sourceId}"`
      );
    }
    // Regla de oro: en una comuna real, ningún dato se publica sin fuente.
    if (!isDemo && !place.sourceId) {
      fail(`lugar "${place.id}" no declara fuente (obligatorio fuera de la demo)`);
    }
    // Coordenadas: las dos o ninguna, dentro de la comuna y con su fuente.
    const hasLat = typeof place.lat === "number";
    const hasLng = typeof place.lng === "number";
    if (hasLat !== hasLng) {
      fail(`lugar "${place.id}" tiene solo una de sus dos coordenadas`);
    }
    if (hasLat && hasLng) {
      const lat = place.lat as number;
      const lng = place.lng as number;
      if (
        bounds &&
        (lat < bounds.south || lat > bounds.north || lng < bounds.west || lng > bounds.east)
      ) {
        fail(`lugar "${place.id}" tiene coordenadas fuera del límite comunal (${lat}, ${lng})`);
      }
      if (data.boundary && !insideRing(lat, lng, data.boundary.coordinates)) {
        fail(`lugar "${place.id}" cae fuera del límite comunal oficial (${lat}, ${lng})`);
      }
      if (!isDemo && !place.coordsSourceId) {
        fail(`lugar "${place.id}" tiene coordenadas sin fuente (obligatorio fuera de la demo)`);
      }
      if (place.coordsSourceId && !sourceIds.has(place.coordsSourceId)) {
        fail(
          `lugar "${place.id}" referencia la fuente de coordenadas inexistente "${place.coordsSourceId}"`
        );
      }
    }
  }

  const documentIds = new Set(data.budgetDocumentIndex.map((d) => d.id));
  for (const line of data.budget) {
    const result = budgetSchema.safeParse(line);
    if (!result.success) {
      fail(
        `presupuesto "${line.id}": ${result.error.issues
          .map((i) => `${i.path.join(".")} ${i.message}`)
          .join("; ")}`
      );
    }
    if (!sourceIds.has(line.sourceId)) {
      fail(
        `presupuesto "${line.id}" referencia la fuente inexistente "${line.sourceId}"`
      );
    }
    if (!documentIds.has(line.documentId)) {
      fail(
        `presupuesto "${line.id}" referencia el informe inexistente "${line.documentId}"`
      );
    }
  }

  for (const report of data.financialReports) {
    const result = financialReportSchema.safeParse(report);
    if (!result.success) {
      fail(
        `documento financiero "${report.id}": ${result.error.issues
          .map((i) => `${i.path.join(".")} ${i.message}`)
          .join("; ")}`
      );
    }
    if (!sourceIds.has(report.sourceId)) {
      fail(
        `documento financiero "${report.id}" referencia la fuente inexistente "${report.sourceId}"`
      );
    }
  }

  const traceables: [string, { id: string; sourceId: string }[], z.ZodType][] =
    [
      ["informe presupuestario", data.budgetDocumentIndex, budgetIndexSchema],
      ["pasivo reportado", data.reportedLiabilities, liabilitySchema],
      ["cuenta del balance", data.accountingBalance, balanceRowSchema],
      ["beneficio", data.benefits, benefitSchema],
      ["programa deportivo", data.sportsPrograms, sportsProgramSchema],
    ];
  for (const [label, rows, schema] of traceables) {
    for (const row of rows) {
      const result = schema.safeParse(row);
      if (!result.success) {
        fail(
          `${label} "${row.id}": ${result.error.issues
            .map((i) => `${i.path.join(".")} ${i.message}`)
            .join("; ")}`
        );
      }
      if (!sourceIds.has(row.sourceId)) {
        fail(
          `${label} "${row.id}" referencia la fuente inexistente "${row.sourceId}"`
        );
      }
    }
  }

  for (const indicator of data.contextIndicators) {
    const result = contextIndicatorSchema.safeParse(indicator);
    if (!result.success) {
      fail(
        `indicador "${indicator.id}": ${result.error.issues
          .map((i) => `${i.path.join(".")} ${i.message}`)
          .join("; ")}`
      );
    }
    if (!sourceIds.has(indicator.sourceId)) {
      fail(`indicador "${indicator.id}" referencia la fuente inexistente "${indicator.sourceId}"`);
    }
    // Serie en orden cronológico, sin años repetidos, y el regional alineado.
    const years = indicator.series.map((p) => p.year);
    if (years.some((y, i) => i > 0 && y <= years[i - 1])) {
      fail(`indicador "${indicator.id}" tiene años desordenados o repetidos`);
    }
    if (
      indicator.regional &&
      indicator.regional.map((p) => p.year).join() !== years.join()
    ) {
      fail(`indicador "${indicator.id}" tiene la serie regional desalineada`);
    }
    if (indicator.regional?.some((p) => p.value !== null && p.communes === 0)) {
      fail(`indicador "${indicator.id}" tiene un promedio regional sin comunas`);
    }
  }
  for (const row of data.enrollment) {
    const result = enrollmentSchema.safeParse(row);
    if (!result.success) {
      fail(
        `matrícula ${row.year}: ${result.error.issues
          .map((i) => `${i.path.join(".")} ${i.message}`)
          .join("; ")}`
      );
    }
    if (!sourceIds.has(row.sourceId)) {
      fail(`matrícula ${row.year} referencia la fuente inexistente "${row.sourceId}"`);
    }
  }

  const rowsWithSource: [string, { id: string; sourceId?: string | null }[], z.ZodType][] =
    [
      ["actividad", data.events, eventSchema],
      ["teléfono", data.phones, phoneSchema],
    ];
  for (const [label, rows, schema] of rowsWithSource) {
    for (const dup of duplicates(rows.map((r) => r.id))) {
      fail(`${label} con id repetido: ${dup}`);
    }
    for (const row of rows) {
      const result = schema.safeParse(row);
      if (!result.success) {
        fail(
          `${label} "${row.id}": ${result.error.issues
            .map((i) => `${i.path.join(".")} ${i.message}`)
            .join("; ")}`
        );
      }
      if (!isDemo && !row.sourceId) {
        fail(`${label} "${row.id}" no declara fuente (obligatorio fuera de la demo)`);
      }
      if (row.sourceId && !sourceIds.has(row.sourceId)) {
        fail(`${label} "${row.id}" referencia la fuente inexistente "${row.sourceId}"`);
      }
    }
  }

  const photoIds = new Set(data.photos.map((p) => p.id));
  for (const [section, id] of Object.entries(data.sectionPhotos)) {
    if (id && !photoIds.has(id)) {
      fail(`la sección "${section}" referencia la foto inexistente "${id}"`);
    }
  }

  for (const [section, id] of Object.entries(data.sectionSources)) {
    if (id && !sourceIds.has(id)) {
      fail(`la sección "${section}" referencia la fuente inexistente "${id}"`);
    }
  }

  const placeIds = new Set(data.places.map((p) => p.id));
  for (const dup of duplicates(data.sportsPrograms.map((p) => p.id))) {
    fail(`programa deportivo con id repetido: ${dup}`);
  }
  for (const program of data.sportsPrograms) {
    if (program.placeId && !placeIds.has(program.placeId)) {
      fail(
        `programa deportivo "${program.id}" referencia el lugar inexistente "${program.placeId}"`
      );
    }
  }
  for (const photo of data.photos) {
    const result = photoSchema.safeParse(photo);
    if (!result.success) {
      fail(
        `foto "${photo.id}": ${result.error.issues
          .map((i) => `${i.path.join(".")} ${i.message}`)
          .join("; ")}`
      );
    }
    if (!photo.src.startsWith(`/images/${communeId}/`)) {
      fail(`foto "${photo.id}" no está en /images/${communeId}/`);
    }
    if (photo.placeId && !placeIds.has(photo.placeId)) {
      fail(`foto "${photo.id}" referencia el lugar inexistente "${photo.placeId}"`);
    }
  }

  if (data.boundary) {
    const ring = data.boundary.coordinates;
    if (ring.length < 4) fail("el límite comunal tiene menos de 4 puntos");
    if (!sourceIds.has(data.boundary.sourceId)) {
      fail(`el límite comunal referencia la fuente inexistente "${data.boundary.sourceId}"`);
    }
    if (
      bounds &&
      ring.some(
        ([lat, lng]) =>
          lat < bounds.south || lat > bounds.north || lng < bounds.west || lng > bounds.east
      )
    ) {
      fail("el límite comunal se sale del rectángulo declarado en la configuración");
    }
  }

  if (data.territory) {
    const territory = data.territory;
    if (!sourceIds.has(territory.sourceId)) {
      fail(`el territorio referencia la fuente inexistente "${territory.sourceId}"`);
    }
    const areaIds = new Set<string>();
    for (const area of [...territory.sectors, ...territory.neighborhoodUnits]) {
      if (areaIds.has(area.id)) fail(`área territorial duplicada "${area.id}"`);
      areaIds.add(area.id);
      if (area.ring.length < 4) fail(`el área "${area.id}" tiene menos de 4 puntos`);
      if (
        bounds &&
        area.ring.some(
          ([lat, lng]) =>
            lat < bounds.south || lat > bounds.north || lng < bounds.west || lng > bounds.east
        )
      ) {
        fail(`el área "${area.id}" se sale del rectángulo declarado en la configuración`);
      }
      if (!insideRing(area.label[0], area.label[1], area.ring)) {
        fail(`el rótulo del área "${area.id}" cae fuera de su polígono`);
      }
    }
    // Cada lugar del mapa debe caer en un sector y en una unidad vecinal:
    // si no, las capas no calzan con las coordenadas publicadas.
    for (const place of data.places) {
      if (typeof place.lat !== "number" || typeof place.lng !== "number") continue;
      const point = { lat: place.lat, lng: place.lng };
      if (!findArea(point, territory.sectors)) {
        fail(`lugar "${place.id}" no cae en ningún sector`);
      }
      if (!findArea(point, territory.neighborhoodUnits)) {
        fail(`lugar "${place.id}" no cae en ninguna unidad vecinal`);
      }
    }
  }

  // Ferias: comparten el mapa con los lugares, así que sus ids no pueden
  // repetirse con los de un lugar (el #id de la URL abre uno u otro).
  const mapIds = new Set(data.places.map((p) => p.id));
  for (const market of data.streetMarkets) {
    if (mapIds.has(market.id)) fail(`feria o lugar duplicado "${market.id}"`);
    mapIds.add(market.id);
    if (!sourceIds.has(market.sourceId)) {
      fail(`feria "${market.id}" referencia la fuente inexistente "${market.sourceId}"`);
    }
    if (market.days.length === 0) fail(`feria "${market.id}" no tiene días`);
    if (
      !hhmm.safeParse(market.startTime).success ||
      !hhmm.safeParse(market.endTime).success ||
      market.endTime <= market.startTime
    ) {
      fail(`feria "${market.id}" tiene un horario inválido`);
    }
    if (market.stalls !== null && (!Number.isInteger(market.stalls) || market.stalls <= 0)) {
      fail(`feria "${market.id}" tiene una cantidad de puestos inválida`);
    }
    if (market.ring.length < 4) fail(`feria "${market.id}" tiene menos de 4 puntos`);
    if (
      bounds &&
      market.ring.some(
        ([lat, lng]) =>
          lat < bounds.south || lat > bounds.north || lng < bounds.west || lng > bounds.east
      )
    ) {
      fail(`feria "${market.id}" se sale del rectángulo de la comuna`);
    }
    const [lat, lng] = market.label;
    if (!insideRing(lat, lng, market.ring)) {
      fail(`el marcador de la feria "${market.id}" cae fuera de su tramo`);
    }
    if (data.territory && !findArea({ lat, lng }, data.territory.sectors)) {
      fail(`feria "${market.id}" no cae en ningún sector`);
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `Datos inválidos en la comuna "${communeId}":\n  - ${problems.join("\n  - ")}`
    );
  }
}
