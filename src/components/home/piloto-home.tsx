import {
  ArrowRightIcon,
  ExternalLinkIcon,
  ScaleIcon,
} from "lucide-react";

import Link from "next/link";

import { BrandMark3D } from "@/components/layout/brand-mark-3d";
import { SectionHeader } from "@/components/layout/section-header";
import { SearchBox } from "@/components/search/search-box";
import {
  SectionIcon,
  type SectionIconName,
} from "@/components/shared/section-icon";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CommuneConfig } from "@/config/communes";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/format";
import { EventCard } from "@/components/events/event-card";
import { PhotoFigure } from "@/components/shared/photo-figure";
import {
  getOfficialSites,
  getSectionPhoto,
  getUpcomingEvents,
} from "@/lib/repositories";
import { buildSearchIndex } from "@/lib/search";
import { getSourceFreshness } from "@/lib/sources";

/*
 * Lo publicado se arma desde las feature flags de la comuna: cuando un módulo
 * se enciende aparece aquí solo, sin que haya que acordarse de esta lista.
 */
function availableFor(commune: CommuneConfig) {
  const { features } = commune;
  return [
    {
      title: "Servicios y trámites",
      art: "servicios" as SectionIconName,
      description:
        "Pagos, licencias, apoyos sociales y más, cada uno con su sitio oficial.",
      href: "/servicios",
      enabled: features.services,
    },
    {
      title: "¿A qué puedo postular?",
      art: "beneficios" as SectionIconName,
      description:
        "Marca tu situación y te mostramos qué beneficios revisar. Sin RUT ni clave.",
      href: "/beneficios",
      enabled: features.benefits,
    },
    {
      title: "Deporte en tu barrio",
      art: "deportes" as SectionIconName,
      description:
        "Escuelas y talleres deportivos: qué días, a qué hora y dónde, con cómo inscribirse.",
      href: "/deportes",
      enabled: features.sports,
    },
    {
      title: "Teléfonos útiles",
      art: "telefonos" as SectionIconName,
      description:
        "Emergencias, oficinas municipales, CESFAM y líneas de apoyo, para llamar con un toque.",
      href: "/telefonos",
      enabled: features.phones,
    },
    {
      title: "Agenda comunal",
      art: "agenda" as SectionIconName,
      description:
        "Teatro, deporte y actividades para la familia, con fecha, lugar y cómo entrar.",
      href: "/actividades",
      enabled: features.events,
    },
    {
      title: "Transparencia municipal",
      art: "transparencia" as SectionIconName,
      description:
        "En qué se gasta la plata de la comuna y qué puedes pedirle al municipio.",
      href: "/transparencia",
      enabled: features.transparency,
    },
    {
      title: `${commune.name} en cifras`,
      art: "datos" as SectionIconName,
      description:
        "Salud, educación y finanzas municipales, comparadas con la historia de la comuna y con la región.",
      href: "/datos",
      enabled: features.dataPage,
    },
    {
      title: "Directorio territorial",
      art: "directorio" as SectionIconName,
      description:
        "Municipio, centros de salud, recintos deportivos y emergencias, con dirección verificada y cómo llegar.",
      href: "/directorio",
      enabled: features.directory,
    },
    {
      title: "Mapa de la comuna",
      art: "mapa" as SectionIconName,
      description:
        "Los mismos lugares sobre el mapa, con coordenadas del geoportal municipal.",
      href: "/mapa",
      enabled: features.realMap,
    },
  ].filter((item) => item.enabled);
}


/** Portada de una comuna con datos reales: solo información verificada, con fuentes. */
export async function PilotoHome({ commune }: { commune: CommuneConfig }) {
  const searchEntries = buildSearchIndex(commune);
  const officialSites = await getOfficialSites(commune.id);
  const homePhoto = await getSectionPhoto(commune.id, "home");
  const nextEvents = commune.features.events
    ? await getUpcomingEvents(commune.id, 2)
    : [];
  const base = `/${commune.id}`;
  const available = availableFor(commune);
  return (
    <>
      {/* Portada */}
      <section className="border-b bg-gradient-to-b from-accent to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Badge className="mb-4 bg-brand-terracotta/15 text-brand-terracotta-ink">
              {commune.region}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              {commune.name} en{" "}
              <span className="text-brand-teal-ink">un solo lugar</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              La información pública de {commune.name} — trámites, beneficios,
              deporte, lugares y cifras — con fuente y fecha de verificación,
              para que la encuentres simple y sin vueltas.
            </p>
            <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-lg border border-brand-sky/40 bg-brand-sky/10 px-4 py-3 text-sm">
              <ScaleIcon className="mt-0.5 size-4 shrink-0 text-brand-navy dark:text-brand-sky-ink" />
              <span>
                <strong>{siteConfig.name} es un sitio ciudadano
                independiente</strong>
                : no es el sitio oficial de la Municipalidad de {commune.name}{" "}
                ni de sus corporaciones. Para cada trámite te llevamos al sitio
                oficial correspondiente.
              </span>
            </p>
            <div className="mt-8">
              <SearchBox
                entries={searchEntries}
                limit={6}
                placeholder={`Busca un trámite o lugar de ${commune.name}…`}
              />
            </div>
          </div>
          {/* Solo en escritorio: en el celular la portada ya es larga. */}
          <BrandMark3D className="hidden size-72 lg:block xl:size-80" />
        </div>
      </section>

      {/* La comuna en una foto real, con su crédito */}
      {homePhoto && (
        <section className="mx-auto max-w-6xl px-4 pt-10">
          <div className="relative">
            <PhotoFigure
              photo={homePhoto}
              sizes="(min-width: 1152px) 1120px, 100vw"
              imageClassName="aspect-[16/9] rounded-2xl sm:aspect-[21/8]"
            />
            {homePhoto.caption && (
              <p className="pointer-events-none absolute bottom-9 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm font-semibold text-white">
                {homePhoto.caption}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Disponible hoy */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <SectionHeader
          eyebrow="Disponible hoy"
          title="Empieza por aquí"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {available.map((item) => (
            <Link key={item.title} href={`${base}${item.href}`} className="group">
              <Card className="h-full gap-0 py-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardContent className="flex items-start gap-4 px-5">
                  <SectionIcon name={item.art} />
                  <div className="min-w-0 flex-1">
                    <h3 className="flex items-center justify-between font-bold text-primary">
                      {item.title}
                      <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>


      {/* Próximas actividades */}
      {nextEvents.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-14">
          <SectionHeader
            eyebrow="Agenda"
            title="Lo que viene en la comuna"
            action={{ label: "Ver toda la agenda", href: `${base}/actividades` }}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {nextEvents.map((event) => (
              <EventCard key={event.id} event={event} communeId={commune.id} />
            ))}
          </div>
        </section>
      )}

      {/* Fuentes oficiales */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader
            eyebrow="Sitios oficiales"
            title="Los sitios oficiales de la comuna, en un solo lugar"
            description={`El ecosistema digital de ${commune.name} está repartido en varios sitios. Aquí reunimos los principales sitios oficiales, verificados y con fecha.`}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {officialSites.map((source) => {
              const freshness = getSourceFreshness(source);
              return (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <Card className="h-full gap-2 py-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                    <CardHeader className="gap-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-primary group-hover:underline group-hover:decoration-brand-teal group-hover:underline-offset-4">
                          {source.pageName}
                        </CardTitle>
                        <ExternalLinkIcon className="mt-1 size-4 shrink-0 text-muted-foreground" />
                      </div>
                      <CardDescription>{source.description}</CardDescription>
                      <p className="pt-1 text-xs text-muted-foreground">
                        <Badge
                          variant="outline"
                          className="mr-2 text-brand-teal-ink"
                        >
                          Sitio oficial externo
                        </Badge>
                        {freshness === "verificado"
                          ? `Enlace verificado el ${formatDate(source.verifiedAt)}`
                          : freshness === "revision_vencida"
                            ? `Revisión vencida — última verificación el ${formatDate(source.verifiedAt)}`
                            : `Pendiente de revisión — consultado el ${formatDate(source.verifiedAt)}`}
                      </p>
                    </CardHeader>
                  </Card>
                </a>
              );
            })}
          </div>
          <p className="mt-6 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
            {siteConfig.name} no administra estos trámites ni servicios: cada
            enlace te lleva al sitio de la institución responsable. Si un
            enlace deja de funcionar, lo marcamos como pendiente de revisión.
          </p>
        </div>
      </section>

      {/* Cierre */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="font-display text-2xl font-bold text-primary md:text-3xl">
          {siteConfig.sublema}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Revisamos y sumamos información todo el tiempo. Última
          actualización: {formatDate(commune.updatedAt)}.
        </p>
      </section>
    </>
  );
}
