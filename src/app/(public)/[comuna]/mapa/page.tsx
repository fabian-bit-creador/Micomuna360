import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadIcon, MapPinnedIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";
import { SectionHeader } from "@/components/layout/section-header";
import { CommuneMap } from "@/components/map/commune-map";
import type { MapPlace } from "@/components/map/map-view";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCommune } from "@/config/communes";
import { findArea } from "@/lib/maps";
import {
  getCommuneBoundary,
  getCommuneTerritory,
  getPlaces,
} from "@/lib/repositories";
import { communeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]/mapa">): Promise<Metadata> {
  const { comuna } = await params;
  return communeMetadata(comuna, {
    path: "/mapa",
    title: "Mapa",
    description:
      "Lugares y servicios de la comuna sobre el mapa, con su ficha y cómo llegar.",
    feature: "realMap",
  });
}

export default async function MapaPage({
  params,
}: PageProps<"/[comuna]/mapa">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();

  if (commune.isDemo) {
    return (
      <ComingSoon
        title="Mapa interactivo comunal"
        description="Reportes geolocalizados, puntos verdes, obras y espacios comunitarios en un mapa territorial."
        fase="Fase 2"
      />
    );
  }

  /* Solo entran al mapa los lugares con coordenadas verificadas. */
  const [places, boundary, territory] = await Promise.all([
    getPlaces(commune.id),
    getCommuneBoundary(commune.id),
    getCommuneTerritory(commune.id),
  ]);
  const mapPlaces: MapPlace[] = places
    .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
    .map((p) => {
      const point = { lat: p.lat as number, lng: p.lng as number };
      return {
        id: p.id,
        name: p.name,
        address: p.address,
        category: p.category,
        ...point,
        href: `/${commune.id}/directorio#${p.id}`,
        phone: p.phone,
        sector: territory ? (findArea(point, territory.sectors)?.name ?? null) : null,
        unit: territory
          ? (findArea(point, territory.neighborhoodUnits)?.name ?? null)
          : null,
      };
    });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        level="h1"
        icon="mapa"
        eyebrow="Territorio"
        title={`Mapa de ${commune.name}`}
        description="Lugares y servicios de la comuna sobre el mapa abierto de OpenStreetMap, con su ficha y cómo llegar."
      />

      {mapPlaces.length > 0 ? (
        <>
          <CommuneMap
            places={mapPlaces}
            center={commune.center}
            zoom={commune.zoom}
            boundary={boundary?.coordinates ?? null}
            territory={territory}
          />
          <section
            aria-labelledby="guardar"
            className="mt-6 rounded-xl border bg-card px-5 py-4"
          >
            <h2 id="guardar" className="flex items-center gap-2 text-base font-bold">
              <DownloadIcon aria-hidden="true" className="size-4 text-brand-teal-ink" />
              Guarda los lugares para usarlos sin internet
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Nombre, dirección, teléfono, coordenadas, sector y fuente de cada
              lugar. Se abren en Excel, Google Sheets o una app de mapas.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
              <a
                href={`/${commune.id}/descargas/lugares.csv`}
                download
                className="inline-flex min-h-9 items-center text-brand-teal-ink underline underline-offset-4"
              >
                Planilla (CSV)
              </a>
              <a
                href={`/${commune.id}/descargas/lugares.geojson`}
                download
                className="inline-flex min-h-9 items-center text-brand-teal-ink underline underline-offset-4"
              >
                Mapa (GeoJSON)
              </a>
              <a
                href={`/${commune.id}/descargas/telefonos.csv`}
                download
                className="inline-flex min-h-9 items-center text-brand-teal-ink underline underline-offset-4"
              >
                Teléfonos útiles (CSV)
              </a>
            </div>
          </section>
          <p className="mt-4 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
            Mapa base: © colaboradores de OpenStreetMap. Las coordenadas
            vienen del geoportal municipal y se contrastaron con
            OpenStreetMap; cuando el geoportal no tiene un lugar, usamos
            OpenStreetMap y lo indicamos en su ficha.
            {territory &&
              " Los sectores y las unidades vecinales (el territorio de cada junta de vecinos) son las capas oficiales del mismo geoportal."}{" "}
            En una emergencia llama
            al 131 (ambulancia), 132 (bomberos) o 133 (Carabineros).
          </p>
        </>
      ) : (
        <Card className="border-brand-sky/40 bg-brand-sky/5 py-6">
          <CardContent className="flex items-start gap-4 px-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-sky/20 text-brand-navy dark:text-brand-sky-ink">
              <MapPinnedIcon className="size-6" />
            </span>
            <div>
              <Badge variant="secondary" className="mb-2">
                En preparación
              </Badge>
              <p className="text-sm text-muted-foreground">
                El mapa está construido y listo, pero todavía no publicamos
                marcadores: solo ubicamos lugares con coordenadas tomadas de
                una fuente geográfica oficial —el geoportal comunal— y esa
                carga aún no está incorporada.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Preferimos un mapa vacío antes que un mapa con ubicaciones
                aproximadas: un pin en la cuadra equivocada hace perder un
                viaje.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
