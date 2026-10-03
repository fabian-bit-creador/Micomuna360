import Link from "next/link";
import {
  ClockIcon,
  MapIcon,
  MapPinIcon,
  NavigationIcon,
  PhoneCallIcon,
  ScanEyeIcon,
} from "lucide-react";

import {
  CivicIconChip,
  type CivicChipColor,
} from "@/components/shared/civic-icon";
import { SourceBadge } from "@/components/shared/source-badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CommuneConfig } from "@/config/communes";
import { telHref } from "@/lib/format";
import { findArea, googleMapsUrls } from "@/lib/maps";
import {
  getCommuneTerritory,
  getDataSource,
  getLocations,
  getPlaces,
} from "@/lib/repositories";
import type { PlaceCategory } from "@/types";

const groups: {
  category: PlaceCategory;
  title: string;
  color: CivicChipColor;
}[] = [
  { category: "municipal", title: "Servicios municipales", color: "navy" },
  { category: "salud", title: "Salud", color: "sky" },
  { category: "educacion", title: "Educación y cultura", color: "amber" },
  { category: "deporte", title: "Deporte", color: "terracotta" },
  { category: "comunitario", title: "Espacios comunitarios", color: "teal" },
  { category: "medioambiente", title: "Medioambiente", color: "green" },
  { category: "seguridad", title: "Seguridad y emergencias", color: "slate" },
];

/** Ancla de la ficha de un lugar cuando va en la misma página que el mapa. */
export const placeCardId = (id: string) => `ficha-${id}`;

/**
 * Fichas de los lugares de una comuna, agrupadas por categoría, con fuente,
 * horario y teléfono verificados y cómo llegar.
 *
 * `withMap`: las fichas van bajo el mapa en la misma página. Cada una se
 * ancla en `#ficha-<id>` y «Ver en el mapa» usa `#<id>`, que el mapa abre.
 * Sin mapa (comuna de ejemplo), cada ficha se ancla en `#<id>`.
 */
export async function PlaceDirectory({
  commune,
  withMap = false,
  headingLevel = "h2",
}: {
  commune: CommuneConfig;
  withMap?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const [places, locations, territory] = await Promise.all([
    getPlaces(commune.id),
    getLocations(commune.id),
    getCommuneTerritory(commune.id),
  ]);
  const placeSources = new Map(
    await Promise.all(
      places.map(
        async (p) =>
          [
            p.id,
            p.sourceId ? await getDataSource(commune.id, p.sourceId) : null,
          ] as const
      )
    )
  );
  /* Fuente de la ubicación, cuando no es la misma de la ficha. */
  const coordsSources = new Map(
    await Promise.all(
      places
        .filter((p) => p.coordsSourceId && p.coordsSourceId !== p.sourceId)
        .map(
          async (p) =>
            [p.id, await getDataSource(commune.id, p.coordsSourceId!)] as const
        )
    )
  );
  const sectorOf = (place: (typeof places)[number]): string | null => {
    if (place.sectorId) {
      return locations.find((l) => l.id === place.sectorId)?.name ?? null;
    }
    if (territory && typeof place.lat === "number" && typeof place.lng === "number") {
      const sector = findArea({ lat: place.lat, lng: place.lng }, territory.sectors);
      return sector ? `Sector ${sector.name}` : null;
    }
    return null;
  };
  const GroupHeading = headingLevel;
  const CardHeading = headingLevel === "h2" ? "h3" : "h4";

  return (
    <div className="space-y-10">
      {groups.map((group) => {
        const groupPlaces = places.filter((p) => p.category === group.category);
        if (groupPlaces.length === 0) return null;
        return (
          <section key={group.category}>
            <GroupHeading className="mb-4 text-xl font-bold">
              {group.title}
            </GroupHeading>
            <div className="grid gap-4 md:grid-cols-2">
              {groupPlaces.map((place) => {
                const hasCoords =
                  typeof place.lat === "number" && typeof place.lng === "number";
                const urls = hasCoords
                  ? googleMapsUrls({ lat: place.lat!, lng: place.lng! })
                  : null;
                const sector = sectorOf(place);
                return (
                  <Card
                    key={place.id}
                    id={withMap ? placeCardId(place.id) : place.id}
                    className="scroll-mt-24 gap-0 py-5 target:ring-2 target:ring-brand-teal"
                  >
                    <CardContent className="flex gap-4 px-5">
                      <CivicIconChip name={place.icon} color={group.color} />
                      <div className="min-w-0 space-y-1">
                        <CardHeading className="font-bold text-primary">
                          {place.name}
                        </CardHeading>
                        <p className="text-sm text-muted-foreground">
                          {place.description}
                        </p>
                        <div className="space-y-1 pt-1.5 text-xs text-muted-foreground">
                          <p className="flex items-start gap-1.5">
                            <MapPinIcon className="mt-0.5 size-3.5 shrink-0 text-brand-terracotta-ink" />
                            {place.address}
                            {sector ? ` · ${sector}` : ""}
                          </p>
                          {place.schedule && (
                            <p className="flex items-center gap-1.5">
                              <ClockIcon className="size-3.5 shrink-0 text-brand-sky-ink" />
                              {place.schedule}
                            </p>
                          )}
                        </div>
                        {placeSources.get(place.id) && (
                          <SourceBadge
                            source={placeSources.get(place.id)!}
                            className="pt-2"
                          />
                        )}
                        {coordsSources.get(place.id) && (
                          <p className="text-xs text-muted-foreground">
                            Ubicación en el mapa:{" "}
                            <a
                              href={coordsSources.get(place.id)!.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-dotted underline-offset-2 hover:text-foreground"
                            >
                              {coordsSources.get(place.id)!.pageName}
                            </a>
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {place.phone && (
                            <a
                              href={telHref(place.phone)}
                              className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-brand-teal/10 px-3.5 py-1 text-sm font-bold text-brand-teal-ink transition-colors hover:bg-brand-teal-ink hover:text-background"
                            >
                              <PhoneCallIcon className="size-3.5" />
                              {place.phone}
                            </a>
                          )}
                          {urls && (
                            <>
                              <a
                                href={urls.llegar}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                              >
                                <NavigationIcon className="size-3.5" />
                                Cómo llegar
                              </a>
                              <a
                                href={urls.calle}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                              >
                                <ScanEyeIcon className="size-3.5" />
                                Ver la calle
                              </a>
                            </>
                          )}
                          {hasCoords && withMap && (
                            /* Mismo documento: el mapa escucha el cambio de #. */
                            <a
                              href={`#${place.id}`}
                              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <MapIcon className="size-3.5" />
                              Ver en el mapa
                            </a>
                          )}
                          {hasCoords && !withMap && commune.features.realMap && (
                            <Link
                              href={`/${commune.id}/mapa#${place.id}`}
                              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <MapIcon className="size-3.5" />
                              Ver en el mapa
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
