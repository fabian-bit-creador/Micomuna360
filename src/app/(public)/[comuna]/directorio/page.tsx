import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
  PhoneCallIcon,
} from "lucide-react";

import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { CivicIconChip, type CivicChipColor } from "@/components/shared/civic-icon";
import { Card, CardContent } from "@/components/ui/card";
import { getLocations, getPlaces } from "@/lib/repositories";
import type { PlaceCategory } from "@/types";

export const metadata: Metadata = {
  title: "Directorio comunal",
  description:
    "Lugares y servicios útiles de tu comuna: salud, deporte, educación, reciclaje y espacios comunitarios.",
};

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
];

function telHref(number: string) {
  return `tel:${number.replace(/[^\d+*]/g, "")}`;
}

export default async function DirectorioPage({
  params,
}: PageProps<"/[comuna]/directorio">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.community) {
    return <FeatureUnavailable commune={commune} title="Directorio comunal" />;
  }

  const [places, locations] = await Promise.all([
    getPlaces(commune.id),
    getLocations(commune.id),
  ]);
  const sectorName = (id: string) =>
    locations.find((l) => l.id === id)?.name ?? "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href={`/${commune.id}/comunidad`}
        className="mb-6 flex w-fit items-center gap-1 text-sm font-semibold text-brand-teal hover:text-primary"
      >
        <ArrowLeftIcon className="size-4" />
        Volver a Comunidad
      </Link>

      <SectionHeader
        eyebrow="Lugares que sirven"
        title="Directorio comunal"
        description="Dónde queda, cuándo atiende y cómo contactar cada lugar útil de la comuna demo."
      />

      <div className="space-y-10">
        {groups.map((group) => {
          const groupPlaces = places.filter(
            (p) => p.category === group.category
          );
          if (groupPlaces.length === 0) return null;
          return (
            <section key={group.category}>
              <h2 className="mb-4 text-xl font-bold">{group.title}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {groupPlaces.map((place) => (
                  <Card key={place.id} className="gap-0 py-5">
                    <CardContent className="flex gap-4 px-5">
                      <CivicIconChip name={place.icon} color={group.color} />
                      <div className="min-w-0 space-y-1">
                        <h3 className="font-bold text-primary">
                          {place.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {place.description}
                        </p>
                        <div className="space-y-1 pt-1.5 text-xs text-muted-foreground">
                          <p className="flex items-start gap-1.5">
                            <MapPinIcon className="mt-0.5 size-3.5 shrink-0 text-brand-terracotta" />
                            {place.address} · {sectorName(place.sectorId)}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <ClockIcon className="size-3.5 shrink-0 text-brand-sky" />
                            {place.schedule}
                          </p>
                        </div>
                        {place.phone && (
                          <a
                            href={telHref(place.phone)}
                            className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-brand-teal/10 px-3.5 py-1 text-sm font-bold text-brand-teal transition-colors hover:bg-brand-teal hover:text-white"
                          >
                            <PhoneCallIcon className="size-3.5" />
                            {place.phone}
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Lugares, direcciones y teléfonos ficticios (comuna demo Los Aromos).
        En la versión real de cada comuna, este directorio se construye solo
        con información oficial verificada.
      </p>
    </div>
  );
}
