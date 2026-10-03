import {
  ArrowRightIcon,
  ExternalLinkIcon,
  PhoneIcon,
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CommuneConfig } from "@/config/communes";
import { siteConfig } from "@/config/site";
import { formatDate, telHref } from "@/lib/format";
import { EventCard } from "@/components/events/event-card";
import { PhotoFigure } from "@/components/shared/photo-figure";
import {
  getOfficialSites,
  getSectionPhoto,
  getUpcomingEvents,
  getUsefulPhones,
} from "@/lib/repositories";
import { buildSearchIndex, searchSuggestions } from "@/lib/search";
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
      priority: true,
      art: "servicios" as SectionIconName,
      description:
        "Pagos, licencias, apoyos sociales y más, cada uno con su sitio oficial.",
      href: "/servicios",
      enabled: features.services,
    },
    {
      title: "¿A qué puedo postular?",
      priority: true,
      art: "beneficios" as SectionIconName,
      description:
        "Marca tu situación y te mostramos qué beneficios revisar. Sin RUT ni clave.",
      href: "/beneficios",
      enabled: features.benefits,
    },
    {
      title: "Deporte en tu barrio",
      priority: true,
      art: "deportes" as SectionIconName,
      description:
        "Escuelas y talleres deportivos: qué días, a qué hora y dónde, con cómo inscribirse.",
      href: "/deportes",
      enabled: features.sports,
    },
    {
      title: "Teléfonos útiles",
      /* Va en la fila de emergencias, con su enlace a la página. */
      inEmergencyRow: true,
      art: "telefonos" as SectionIconName,
      description:
        "Emergencias, oficinas municipales, CESFAM y líneas de apoyo, para llamar con un toque.",
      href: "/telefonos",
      enabled: features.phones,
    },
    {
      title: "Agenda comunal",
      priority: true,
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
  const emergencies = commune.features.phones
    ? await getUsefulPhones(commune.id, "emergencia")
    : [];
  const base = `/${commune.id}`;
  const available = availableFor(commune);
  const priority = available.filter((item) => item.priority);
  const more = available.filter(
    (item) =>
      !item.priority && !(item.inEmergencyRow && emergencies.length > 0)
  );
  return (
    <>
      {/* Portada: título, buscador y, en escritorio, la comuna en una foto */}
      <section className="border-b bg-gradient-to-b from-accent to-background">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pt-10 pb-10 md:pt-16 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div className="min-w-0">
            <Badge className="mb-3 bg-brand-terracotta/15 text-brand-terracotta-ink">
              {commune.region}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              {commune.name} en
              <br />
              <span className="text-brand-teal-ink">un solo lugar</span>
            </h1>
            <p className="mt-3 max-w-xl text-lg text-muted-foreground">
              Trámites, beneficios, deporte y lugares de la comuna, con la
              fuente y la fecha de cada dato.
            </p>
            <div className="mt-6">
              <SearchBox
                entries={searchEntries}
                limit={6}
                suggestions={searchSuggestions(searchEntries)}
                placeholder="¿Qué necesitas? Ej.: licencia, CESFAM…"
              />
            </div>
            <p className="mt-5 flex max-w-xl items-start gap-2 text-sm text-muted-foreground">
              <ScaleIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brand-navy dark:text-brand-sky-ink"
              />
              <span>
                <strong className="text-foreground">
                  Sitio ciudadano independiente:
                </strong>{" "}
                no es el portal de la Municipalidad de {commune.name}. Cada
                trámite te lleva a su sitio oficial.{" "}
                <Link
                  href="/nosotros"
                  className="font-semibold whitespace-nowrap text-brand-teal-ink underline underline-offset-4"
                >
                  Cómo trabajamos
                </Link>
              </span>
            </p>
          </div>
          {homePhoto && (
            <div className="relative hidden lg:block">
              <PhotoFigure
                photo={homePhoto}
                priority
                sizes="(min-width: 1152px) 500px, 45vw"
                imageClassName="aspect-[4/3] rounded-2xl"
              />
              {homePhoto.caption && (
                <p className="pointer-events-none absolute bottom-9 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm font-semibold text-white">
                  {homePhoto.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Emergencias a un toque, sin alarmar */}
      {emergencies.length > 0 && (
        <section
          aria-labelledby="emergencias"
          className="mx-auto max-w-6xl px-4 pt-8"
        >
          <div className="rounded-2xl border bg-card px-4 py-4 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <h2
                id="emergencias"
                className="flex items-center gap-2 text-base font-bold"
              >
                <PhoneIcon
                  aria-hidden="true"
                  className="size-4 text-brand-terracotta-ink"
                />
                ¿Una emergencia? Llama con un toque
              </h2>
              <Link
                href={`${base}/telefonos`}
                className="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-brand-teal-ink hover:underline"
              >
                Todos los teléfonos útiles
                <ArrowRightIcon aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {emergencies.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={telHref(phone.number)}
                    className="flex min-h-14 items-center gap-3 rounded-xl border bg-background px-3 py-2 transition-colors hover:border-brand-terracotta/50 hover:bg-brand-terracotta/5"
                  >
                    <span className="font-display text-xl font-bold text-brand-terracotta-ink">
                      {phone.number}
                    </span>
                    <span className="text-sm leading-tight font-semibold text-foreground">
                      {phone.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Por dónde empezar: las cuatro tareas más frecuentes */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <SectionHeader
          eyebrow="Disponible hoy"
          title="¿Por dónde quieres empezar?"
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {priority.map((item) => (
            <li key={item.title} className="min-w-0">
              <Link href={`${base}${item.href}`} className="group block h-full">
                <Card className="h-full gap-0 px-4 py-4 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md sm:px-5 sm:py-5">
                  <div className="flex items-start justify-between">
                    <SectionIcon name={item.art} className="size-14 sm:size-16" />
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-4 text-brand-teal-ink transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                  <h3 className="mt-3 leading-snug font-bold text-primary sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
                    {item.description}
                  </p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>

        {more.length > 0 && (
          <>
            <h3 className="mt-10 mb-3 text-lg font-bold">
              También en {commune.name}
            </h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {more.map((item) => (
                <li key={item.title} className="min-w-0">
                  <Link
                    href={`${base}${item.href}`}
                    className="group flex h-full items-center gap-3 rounded-xl border bg-card px-3 py-2.5 transition-colors hover:bg-accent"
                  >
                    <SectionIcon name={item.art} className="size-11 rounded-xl" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-primary">
                        {item.title}
                      </span>
                      <span className="block truncate text-sm text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* En el celular la foto va después de las tareas, no antes */}
      {homePhoto && (
        <section className="mx-auto max-w-6xl px-4 pt-12 lg:hidden">
          <div className="relative">
            <PhotoFigure
              photo={homePhoto}
              sizes="100vw"
              imageClassName="aspect-[16/9] rounded-2xl"
            />
            {homePhoto.caption && (
              <p className="pointer-events-none absolute bottom-9 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm font-semibold text-white">
                {homePhoto.caption}
              </p>
            )}
          </div>
        </section>
      )}

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
        <BrandMark3D className="mx-auto mb-6 size-28 md:size-32" />
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
