import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLinkIcon,
  MailIcon,
  MapIcon,
  MedalIcon,
  UsersIcon,
} from "lucide-react";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { CivicIconChip } from "@/components/shared/civic-icon";
import { PhotoFigure } from "@/components/shared/photo-figure";
import { SourceBadge } from "@/components/shared/source-badge";
import { SportsFinder } from "@/components/sports/sports-finder";
import { Card, CardContent } from "@/components/ui/card";
import { getCommune } from "@/config/communes";
import {
  getDataSource,
  getPhotos,
  getPlaces,
  getSectionPhoto,
  getSectionSource,
  getSportsPrograms,
} from "@/lib/repositories";
import { communeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]/deportes">): Promise<Metadata> {
  const { comuna } = await params;
  return communeMetadata(comuna, {
    path: "/deportes",
    title: "Deportes",
    description:
      "Escuelas y talleres deportivos de la comuna: qué hay, qué días, a qué hora y dónde, con cómo inscribirse.",
    feature: "sports",
  });
}

export default async function DeportesPage({
  params,
}: PageProps<"/[comuna]/deportes">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.sports) {
    return <FeatureUnavailable commune={commune} title="Deportes" />;
  }

  const [programs, photos, places, enrollment] = await Promise.all([
    getSportsPrograms(commune.id),
    getPhotos(commune.id),
    getPlaces(commune.id),
    getSectionSource(commune.id, "sportsEnrollment"),
  ]);
  const listing = programs.length
    ? await getDataSource(commune.id, programs[0].sourceId)
    : null;
  const hero = await getSectionPhoto(commune.id, "sports");
  const schools = programs.filter((p) => p.kind === "escuela").length;
  const workshops = programs.length - schools;
  const disciplines = new Set(programs.map((p) => p.discipline)).size;

  /* Recintos de la Corporación con escuelas o talleres, más concurridos primero. */
  const venues = places
    .filter((place) => programs.some((p) => p.placeId === place.id))
    .map((place) => ({
      place,
      photo: photos.find((ph) => ph.placeId === place.id) ?? null,
      count: programs.filter((p) => p.placeId === place.id).length,
    }))
    .sort((a, b) => b.count - a.count);
  const neighborhood = programs.filter((p) => !p.placeId);
  const neighborhoodText = neighborhood.every((p) => p.kind === "taller")
    ? `Los otros ${neighborhood.length} talleres`
    : `Las otras ${neighborhood.length} escuelas y talleres`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <SectionHeader
            level="h1"
            icon="deportes"
            eyebrow="Deporte en tu barrio"
            title={`Muévete en ${commune.name}`}
            description={`${programs.length} escuelas y talleres de ${disciplines} deportes, en recintos municipales y en sedes y canchas de barrio. Elige tu deporte y el día que te acomoda.`}
          />
          <dl className="grid grid-cols-3 gap-3 text-center">
            {[
              [schools, "escuelas"],
              [workshops, "talleres de barrio"],
              [disciplines, "deportes"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border bg-card px-2 py-3">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-primary">
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {hero && (
          <PhotoFigure
            photo={hero}
            priority
            imageClassName="aspect-[16/9] rounded-2xl"
          />
        )}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card className="gap-0 py-5">
          <CardContent className="flex items-start gap-4 px-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal-ink">
              <MedalIcon className="size-6" />
            </span>
            <div className="text-sm">
              <h2 className="text-base font-bold">Escuelas deportivas</h2>
              <p className="mt-1 text-muted-foreground">
                Entrenamiento por categoría y edad, con inscripción por
                semestre. Se inscribe en línea en el sitio de la Corporación
                Municipal de Deportes; el valor depende de la escuela, y quienes
                viven en {commune.name} acreditan su residencia con el Registro
                Social de Hogares.
              </p>
              {enrollment && (
                <a
                  href={enrollment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-9 items-center gap-1.5 font-semibold text-brand-teal-ink hover:underline"
                >
                  Inscribirse en una escuela
                  <ExternalLinkIcon className="size-4" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0 py-5">
          <CardContent className="flex items-start gap-4 px-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-amber/20 text-brand-amber-ink">
              <UsersIcon className="size-6" />
            </span>
            <div className="text-sm">
              <h2 className="text-base font-bold">Talleres de barrio</h2>
              <p className="mt-1 text-muted-foreground">
                Zumba, fútbol, yoga y más en sedes vecinales, canchas y
                recintos municipales. Para preguntar por cupos o cómo sumarte,
                escribe a la Corporación Municipal de Deportes.
              </p>
              <a
                href="mailto:contacto@pintanadeportes.cl"
                className="mt-2 inline-flex min-h-9 items-center gap-1.5 font-semibold text-brand-teal-ink hover:underline"
              >
                <MailIcon className="size-4" />
                contacto@pintanadeportes.cl
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="mt-14" aria-labelledby="buscar-deporte">
        <h2 id="buscar-deporte" className="mb-4 text-2xl font-bold">
          Encuentra tu escuela o taller
        </h2>
        <SportsFinder
          programs={programs}
          communeId={commune.id}
          communeName={commune.name}
        />
        {listing && <SourceBadge source={listing} className="mt-6" />}
      </section>

      {venues.length > 0 && (
        <section id="recintos" className="mt-16 scroll-mt-24">
          <SectionHeader
            eyebrow="Dónde se entrena"
            title="Recintos deportivos municipales"
            description={`Aquí se concentran las escuelas. ${neighborhoodText} se hacen en sedes y canchas de barrio: cada ficha trae su dirección.`}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {venues.map(({ place, photo, count }) => (
              <Card key={place.id} className="gap-0 overflow-hidden py-0">
                {photo ? (
                  <PhotoFigure
                    photo={photo}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    imageClassName="aspect-[16/7]"
                    className="border-b pb-1"
                  />
                ) : (
                  <div className="flex aspect-[16/7] items-center justify-center border-b bg-accent">
                    <CivicIconChip name={place.icon} color="terracotta" />
                  </div>
                )}
                <CardContent className="px-5 py-4">
                  <h3 className="font-bold text-primary">{place.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {place.address} · {count}{" "}
                    {count === 1 ? "escuela o taller" : "escuelas y talleres"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4">
                    <Link
                      href={`/${commune.id}/mapa#${place.id}`}
                      className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-brand-teal-ink hover:underline"
                    >
                      <MapIcon className="size-4" />
                      Ver en el mapa
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
