import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPinnedIcon } from "lucide-react";

import { ComingSoon } from "@/components/layout/coming-soon";
import { SectionHeader } from "@/components/layout/section-header";
import { CommuneMap } from "@/components/map/commune-map";
import type { MapPlace } from "@/components/map/map-view";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCommune } from "@/config/communes";
import { getPlaces } from "@/lib/repositories";

export const metadata: Metadata = { title: "Mapa" };

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
  const places = await getPlaces(commune.id);
  const mapPlaces: MapPlace[] = places
    .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
    .map((p) => ({
      id: p.id,
      name: p.name,
      address: p.address,
      category: p.category,
      lat: p.lat as number,
      lng: p.lng as number,
      href: `/${commune.id}/directorio#${p.id}`,
    }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        level="h1"
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
          />
          <p className="mt-4 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
            Mapa base: © colaboradores de OpenStreetMap. Solo mostramos
            lugares con coordenadas de fuente oficial verificada; cada ficha
            indica de dónde proviene el dato.
          </p>
        </>
      ) : (
        <Card className="border-brand-sky/40 bg-brand-sky/5 py-6">
          <CardContent className="flex items-start gap-4 px-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-sky/20 text-brand-navy dark:text-brand-sky">
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
