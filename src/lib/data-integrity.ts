import { z } from "zod";

import type { CommuneData } from "@/data/communes/types";

/**
 * Integridad de los datos publicados.
 *
 * La promesa del piloto es que ningún dato real se muestre sin fuente y sin
 * fecha. Esta validación corre al cargar el dataset (dev, build y despliegue),
 * así que un error de datos rompe el build en vez de llegar al vecino.
 */

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "debe tener formato YYYY-MM-DD");

const httpsUrl = z
  .string()
  .refine((v) => v.startsWith("https://"), "debe ser una URL https");

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
  isDemo: boolean
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
  }

  if (problems.length > 0) {
    throw new Error(
      `Datos inválidos en la comuna "${communeId}":\n  - ${problems.join("\n  - ")}`
    );
  }
}
