import { ArrowRightIcon, ArrowUpRightIcon, PhoneIcon } from "lucide-react";

import Link from "next/link";

import { EventCard } from "@/components/events/event-card";
import { CommuneOutline } from "@/components/home/commune-outline";
import {
  TodayMarkets,
  type TodayMarket,
} from "@/components/home/today-markets";
import { SectionHeader } from "@/components/layout/section-header";
import { SearchBox } from "@/components/search/search-box";
import { PhotoFigure } from "@/components/shared/photo-figure";
import {
  SectionIcon,
  type SectionIconName,
} from "@/components/shared/section-icon";
import type { CommuneConfig } from "@/config/communes";
import { siteConfig } from "@/config/site";
import { formatDate, formatNumber, telHref } from "@/lib/format";
import { findArea } from "@/lib/maps";
import { communeOutline } from "@/lib/outline";
import {
  getCommuneBoundary,
  getCommuneTerritory,
  getContextIndicators,
  getEnrollment,
  getOfficialSites,
  getPlaces,
  getSectionPhoto,
  getSportsPrograms,
  getStreetMarkets,
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
      /* Con mapa real, el directorio vive en la página del mapa. */
      enabled: features.directory && !features.realMap,
    },
    {
      title: "Mapa y lugares",
      art: "mapa" as SectionIconName,
      description:
        "Municipio, centros de salud, recintos deportivos y seguridad sobre el mapa, con la ficha de cada lugar y cómo llegar.",
      href: "/mapa",
      enabled: features.realMap,
    },
  ].filter((item) => item.enabled);
}


interface Fact {
  value: string;
  label: string;
  detail?: string;
  href: string;
}

/**
 * La comuna en cifras de inventario: cuánta gente vive, cómo se divide y
 * qué hay publicado en el sitio. Cada cifra sale de los mismos datos con
 * fuente que muestra su sección, y lleva a ella. Son cantidades, no notas.
 */
async function communeFacts(commune: CommuneConfig): Promise<Fact[]> {
  const base = `/${commune.id}`;
  const { features } = commune;
  const [indicators, enrollment, territory, places, markets, sports] =
    await Promise.all([
      features.dataPage ? getContextIndicators(commune.id) : [],
      features.dataPage ? getEnrollment(commune.id) : [],
      features.realMap ? getCommuneTerritory(commune.id) : null,
      features.realMap ? getPlaces(commune.id) : [],
      features.realMap ? getStreetMarkets(commune.id) : [],
      features.sports ? getSportsPrograms(commune.id) : [],
    ]);
  const facts: Fact[] = [];

  const population = indicators
    .find((i) => i.unit === "people")
    ?.series.findLast((p) => p.value !== null);
  if (population?.value) {
    facts.push({
      value: formatNumber(population.value),
      label: "habitantes",
      detail: `Proyección del INE para ${population.year}`,
      href: `${base}/datos`,
    });
  }
  if (territory?.sectors.length) {
    facts.push({
      value: String(territory.sectors.length),
      label: "sectores",
      detail: territory.neighborhoodUnits.length
        ? `y ${territory.neighborhoodUnits.length} unidades vecinales`
        : undefined,
      href: `${base}/mapa`,
    });
  }
  const health = places.filter(
    (p) => p.category === "salud" && typeof p.lat === "number"
  ).length;
  if (health) {
    facts.push({
      value: String(health),
      label: "centros de salud",
      detail: "en el mapa, con dirección y teléfono",
      href: `${base}/mapa#fichas`,
    });
  }
  if (markets.length) {
    const persas = markets.filter((m) => m.kind === "persa").length;
    const ferias = markets.length - persas;
    facts.push({
      value: String(ferias),
      label: "ferias libres",
      detail: persas
        ? `y ${persas} ${persas === 1 ? "persa" : "persas"}, por día de la semana`
        : "por día de la semana",
      href: `${base}/mapa#ferias`,
    });
  }
  if (sports.length) {
    facts.push({
      value: String(sports.length),
      label: "escuelas y talleres deportivos",
      detail: "con día, hora y cómo inscribirse",
      href: `${base}/deportes`,
    });
  }
  const school = enrollment.at(-1);
  if (school) {
    const students = Object.values(school.commune).reduce(
      (sum, n) => sum + (n ?? 0),
      0
    );
    facts.push({
      value: formatNumber(students),
      label: "estudiantes",
      detail: `en ${school.schools} colegios (matrícula ${school.year})`,
      href: `${base}/datos`,
    });
  }
  return facts;
}

/** Portada de una comuna con datos reales: solo información verificada, con fuentes. */
export async function PilotoHome({ commune }: { commune: CommuneConfig }) {
  const { features } = commune;
  const base = `/${commune.id}`;
  const searchEntries = buildSearchIndex(commune);
  const [
    officialSites,
    homePhoto,
    nextEvents,
    emergencies,
    boundary,
    territory,
    markets,
    facts,
  ] = await Promise.all([
    getOfficialSites(commune.id),
    getSectionPhoto(commune.id, "home"),
    features.events ? getUpcomingEvents(commune.id, 2) : [],
    features.phones ? getUsefulPhones(commune.id, "emergencia") : [],
    features.realMap ? getCommuneBoundary(commune.id) : null,
    features.realMap ? getCommuneTerritory(commune.id) : null,
    features.realMap ? getStreetMarkets(commune.id) : [],
    communeFacts(commune),
  ]);
  const sections = availableFor(commune);
  const outline = boundary ? communeOutline(boundary, territory) : null;
  const todayMarkets: TodayMarket[] = markets.map((m) => ({
    id: m.id,
    name: m.name,
    kind: m.kind,
    days: m.days,
    startTime: m.startTime,
    endTime: m.endTime,
    sector: territory
      ? (findArea({ lat: m.label[0], lng: m.label[1] }, territory.sectors)
          ?.name ?? null)
      : null,
  }));
  const hasToday = todayMarkets.length > 0 || nextEvents.length > 0;

  return (
    <>
      {/* Placa de la comuna: su nombre, el buscador y su contorno oficial */}
      <section className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-14 gap-y-10 px-4 pt-9 pb-10 md:pt-14 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-brand-ivory/80">
              {commune.region}
            </p>
            <h1 className="mt-1 text-[clamp(3rem,13vw,6.5rem)] leading-[0.92] font-extrabold tracking-[-0.02em] text-white [font-stretch:76%]">
              {commune.name}
            </h1>
            <span
              aria-hidden="true"
              className="mt-5 block h-1.5 w-16 bg-brand-amber"
            />
            <p className="mt-5 max-w-xl text-lg text-brand-ivory/90">
              Trámites, beneficios, deporte y lugares de la comuna en un solo
              lugar, con la fuente y la fecha de cada dato.
            </p>
            <div className="mt-6">
              <SearchBox
                onPlate
                entries={searchEntries}
                limit={6}
                suggestions={searchSuggestions(searchEntries)}
                placeholder="¿Qué necesitas? Ej.: licencia, CESFAM…"
              />
            </div>
            <p className="mt-6 max-w-xl text-sm text-brand-ivory/80">
              <strong className="font-semibold text-white">
                Sitio ciudadano independiente:
              </strong>{" "}
              no es el portal de la Municipalidad de {commune.name}. Cada
              trámite te lleva a su sitio oficial.{" "}
              <Link
                href="/nosotros#como-trabajamos"
                className="font-semibold whitespace-nowrap text-white underline underline-offset-4"
              >
                Cómo trabajamos
              </Link>
            </p>
          </div>
          {outline && (
            <CommuneOutline
              shape={outline}
              mapHref={`${base}/mapa`}
              communeName={commune.name}
              className="hidden lg:block"
            />
          )}
        </div>
      </section>

      {/* Emergencias a un toque, sin alarmar */}
      {emergencies.length > 0 && (
        <section aria-labelledby="emergencias" className="border-b bg-card">
          <div className="mx-auto max-w-6xl px-4 py-5">
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
                className="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-brand-teal-ink underline-offset-4 hover:underline"
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
                    className="flex min-h-14 items-center gap-3 rounded-md border px-3 py-2 transition-colors hover:border-brand-terracotta hover:bg-brand-terracotta/5"
                  >
                    <span className="font-display text-2xl leading-none font-extrabold text-brand-terracotta-ink">
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

      {/* Tablero de secciones, como el directorio a la entrada de un edificio */}
      <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16">
        <SectionHeader
          eyebrow={`Disponible hoy en ${commune.name}`}
          title="¿Por dónde quieres empezar?"
        />
        <div className="overflow-hidden rounded-lg border bg-card">
          {/* Filetes entre casillas; el -mb-px esconde los de la última fila. */}
          <ul className="-mb-px grid sm:grid-cols-2">
            {sections.map((item) => (
              <li key={item.title} className="border-b sm:odd:border-r">
              <Link
                href={`${base}${item.href}`}
                className="group flex h-full items-center gap-4 px-4 py-3 transition-colors hover:bg-accent sm:px-5 sm:py-4"
              >
                <SectionIcon name={item.art} className="size-12 sm:size-14" />
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg leading-snug font-bold text-primary group-hover:underline group-hover:underline-offset-4">
                    {item.title}
                  </span>
                  <span className="mt-0.5 hidden text-sm text-muted-foreground sm:block">
                    {item.description}
                  </span>
                </span>
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </Link>
            </li>
          ))}
          </ul>
        </div>
      </section>

      {/* Hoy: ferias del día y lo que viene en la agenda */}
      {hasToday && (
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
          <SectionHeader
            eyebrow="Para salir de la casa"
            title={`Hoy en ${commune.name}`}
          />
          <div
            className={
              nextEvents.length > 0 && todayMarkets.length > 0
                ? "grid gap-x-12 gap-y-10 lg:grid-cols-2"
                : undefined
            }
          >
            {todayMarkets.length > 0 && (
              <TodayMarkets
                markets={todayMarkets}
                mapHref={`${base}/mapa`}
                wide={nextEvents.length === 0}
              />
            )}
            {nextEvents.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Agenda comunal
                </p>
                <h3 className="mt-1 text-xl font-bold md:text-2xl">
                  Lo que viene en la comuna
                </h3>
                <div className="mt-3 grid gap-3">
                  {nextEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      communeId={commune.id}
                    />
                  ))}
                </div>
                <Link
                  href={`${base}/actividades`}
                  className="mt-3 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-brand-teal-ink underline-offset-4 hover:underline"
                >
                  Ver toda la agenda
                  <ArrowRightIcon aria-hidden="true" className="size-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* La comuna de un vistazo: foto real, cifras de inventario y sectores */}
      {(homePhoto || facts.length > 0) && (
        <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
          <SectionHeader
            eyebrow="La comuna"
            title={`${commune.name} de un vistazo`}
            description="Cuánta gente vive aquí, cómo se divide la comuna y qué encuentras en este sitio. Cada cifra lleva a su detalle, con la fuente."
          />
          <div className="grid items-start gap-x-12 gap-y-8 lg:grid-cols-2">
            {homePhoto && (
              <div className="relative">
                <PhotoFigure
                  photo={homePhoto}
                  sizes="(min-width: 1024px) 540px, 100vw"
                  imageClassName="aspect-[16/10] rounded-lg"
                />
                {homePhoto.caption && (
                  <p className="pointer-events-none absolute top-3 left-3 rounded-sm bg-brand-navy px-2.5 py-1 text-sm font-semibold text-white">
                    {homePhoto.caption}
                  </p>
                )}
              </div>
            )}
            {facts.length > 0 && (
              <dl className="divide-y border-y">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <Link
                      href={fact.href}
                      className="group flex min-h-16 items-baseline gap-4 py-3"
                    >
                      <dt className="order-2 min-w-0 flex-1">
                        <span className="font-semibold text-foreground group-hover:underline group-hover:underline-offset-4">
                          {fact.label}
                        </span>
                        {fact.detail && (
                          <span className="block text-sm text-muted-foreground">
                            {fact.detail}
                          </span>
                        )}
                      </dt>
                      <dd className="order-1 w-[4.4em] shrink-0 font-display text-2xl leading-none font-extrabold text-primary sm:text-right sm:text-3xl md:text-4xl">
                        {fact.value}
                      </dd>
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="order-3 size-4 shrink-0 self-center text-muted-foreground"
                      />
                    </Link>
                  </div>
                ))}
              </dl>
            )}
          </div>
          {/* En el celular el contorno va aquí, con los sectores en lista */}
          {outline && outline.sectors.length > 0 && (
            <div className="mt-10 lg:hidden">
              <h3 className="text-xl font-bold">¿En qué sector vives?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Elige tu sector y verás en el mapa sus centros de salud,
                ferias y recintos.
              </p>
              <CommuneOutline
                tone="paper"
                shape={outline}
                mapHref={`${base}/mapa`}
                communeName={commune.name}
                className="mt-4 [&>svg]:mx-auto [&>svg]:max-w-64"
              />
            </div>
          )}
        </section>
      )}

      {/* Sitios oficiales */}
      <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <SectionHeader
          eyebrow="Enlaces verificados"
          title="Los sitios oficiales de la comuna"
          description={`El ecosistema digital de ${commune.name} está repartido en varios sitios. Aquí están los principales, con la fecha en que revisamos cada enlace.`}
        />
        <div className="overflow-hidden rounded-lg border bg-card">
        <ul className="-mb-px grid md:grid-cols-2">
          {officialSites.map((source) => {
            const freshness = getSourceFreshness(source);
            return (
              <li key={source.id} className="border-b md:odd:border-r">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-3 px-4 py-3.5 transition-colors hover:bg-accent sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block leading-snug font-semibold text-primary group-hover:underline group-hover:underline-offset-4">
                      {source.pageName}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {source.description}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Sitio oficial externo ·{" "}
                      {freshness === "verificado"
                        ? `Enlace verificado el ${formatDate(source.verifiedAt)}`
                        : freshness === "revision_vencida"
                          ? `Revisión vencida — última verificación el ${formatDate(source.verifiedAt)}`
                          : `Pendiente de revisión — consultado el ${formatDate(source.verifiedAt)}`}
                    </span>
                  </span>
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary"
                  />
                </a>
              </li>
            );
          })}
        </ul>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
          {siteConfig.name} no administra estos trámites ni servicios: cada
          enlace te lleva al sitio de la institución responsable. Si un
          enlace deja de funcionar, lo marcamos como pendiente de revisión.
          Última actualización del sitio: {formatDate(commune.updatedAt)}.
        </p>
      </section>
    </>
  );
}
