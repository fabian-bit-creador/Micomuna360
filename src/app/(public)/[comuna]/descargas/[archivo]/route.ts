import { getCommune, listCommunes, type CommuneConfig } from "@/config/communes";
import { getCommuneData } from "@/data/communes";
import { findArea } from "@/lib/maps";

/*
 * Datos abiertos para guardar en el teléfono y usar sin internet: lugares
 * (CSV y GeoJSON) y teléfonos útiles (CSV), cada fila con su fuente. Se
 * generan en el build; la comuna de ejemplo no tiene descargas porque sus
 * datos son ficticios.
 */
export const dynamicParams = false;

const files = ["lugares.csv", "lugares.geojson", "telefonos.csv"] as const;
type FileName = (typeof files)[number];

/* Cada archivo existe solo si su sección está activa: lo que no está
   verificado no se publica, tampoco como descarga. */
function enabled(commune: CommuneConfig, archivo: FileName): boolean {
  if (commune.isDemo) return false;
  return archivo === "telefonos.csv"
    ? commune.features.phones
    : commune.features.directory;
}

export function generateStaticParams() {
  return listCommunes().flatMap((c) =>
    files
      .filter((archivo) => enabled(c, archivo))
      .map((archivo) => ({ comuna: c.id, archivo }))
  );
}

/* Punto y coma y BOM: Excel en español lo abre en columnas y con tildes. */
function csv(rows: (string | number | null | undefined)[][]): string {
  const cell = (v: string | number | null | undefined) => {
    const text = v === null || v === undefined ? "" : String(v);
    return /[";\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return "﻿" + rows.map((r) => r.map(cell).join(";")).join("\r\n") + "\r\n";
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/[comuna]/descargas/[archivo]">
) {
  const { comuna, archivo } = await params;
  const commune = getCommune(comuna);
  if (
    !commune ||
    !files.includes(archivo as FileName) ||
    !enabled(commune, archivo as FileName)
  ) {
    return new Response("No encontrado", { status: 404 });
  }
  const data = getCommuneData(commune.id);
  const sources = new Map(data.sources.map((s) => [s.id, s]));
  const territory = data.territory;

  const places = data.places
    .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
    .map((p) => {
      const point = { lat: p.lat as number, lng: p.lng as number };
      const source = p.sourceId ? sources.get(p.sourceId) : undefined;
      return {
        nombre: p.name,
        categoria: p.category,
        direccion: p.address,
        telefono: p.phone,
        latitud: point.lat,
        longitud: point.lng,
        sector: territory ? (findArea(point, territory.sectors)?.name ?? null) : null,
        unidad_vecinal: territory
          ? (findArea(point, territory.neighborhoodUnits)?.name ?? null)
          : null,
        fuente: source ? `${source.institution} — ${source.pageName}` : null,
        fuente_url: source?.url ?? null,
        verificado: source?.verifiedAt ?? null,
      };
    });

  const name = `${commune.id}-${archivo}`;
  const headers = (type: string) => ({
    "Content-Type": type,
    "Content-Disposition": `attachment; filename="${name}"`,
  });

  if (archivo === "lugares.geojson") {
    const geojson = {
      type: "FeatureCollection",
      features: places.map(({ latitud, longitud, ...properties }) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [longitud, latitud] },
        properties,
      })),
    };
    return new Response(JSON.stringify(geojson, null, 2), {
      headers: headers("application/geo+json; charset=utf-8"),
    });
  }

  if (archivo === "lugares.csv") {
    const keys = Object.keys(places[0] ?? {}) as (keyof (typeof places)[number])[];
    return new Response(csv([keys, ...places.map((p) => keys.map((k) => p[k]))]), {
      headers: headers("text/csv; charset=utf-8"),
    });
  }

  const phones = data.phones.map((p) => {
    const source = p.sourceId ? sources.get(p.sourceId) : undefined;
    return [
      p.name,
      p.number,
      p.description,
      p.category,
      p.available,
      source ? `${source.institution} — ${source.pageName}` : null,
      source?.url ?? null,
      source?.verifiedAt ?? null,
    ];
  });
  return new Response(
    csv([
      ["nombre", "numero", "descripcion", "categoria", "horario", "fuente", "fuente_url", "verificado"],
      ...phones,
    ]),
    { headers: headers("text/csv; charset=utf-8") }
  );
}
