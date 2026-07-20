import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ExternalLinkIcon,
  FileTextIcon,
  MapIcon,
  MapPinIcon,
  PhoneCallIcon,
  ScaleIcon,
} from "lucide-react";

import Link from "next/link";

import { SectionHeader } from "@/components/layout/section-header";
import { SearchBox } from "@/components/search/search-box";
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
import { getOfficialSites } from "@/lib/repositories";
import { buildSearchIndex } from "@/lib/search";
import { getSourceFreshness } from "@/lib/sources";

const available = [
  {
    icon: FileTextIcon,
    title: "Servicios y trámites",
    description:
      "Pagos, licencias, apoyos sociales y más, cada uno con su sitio oficial.",
    href: "/servicios",
  },
  {
    icon: MapPinIcon,
    title: "Directorio territorial",
    description:
      "Municipalidad y recintos con dirección verificada y su fuente a la vista.",
    href: "/directorio",
  },
];

const upcoming = [
  {
    icon: CalendarDaysIcon,
    title: "Agenda comunal",
    description:
      "Actividades de deporte, cultura y comunidad, reunidas desde los canales oficiales.",
  },
  {
    icon: PhoneCallIcon,
    title: "Teléfonos útiles",
    description:
      "Emergencias y servicios comunales, llamables con un toque desde el celular.",
  },
  {
    icon: MapIcon,
    title: "Mapa de la comuna",
    description:
      "Lugares con coordenadas verificadas y cómo llegar a cada uno.",
  },
];

/** Home del piloto informativo: solo información verificada, con fuentes. */
export async function PilotoHome({ commune }: { commune: CommuneConfig }) {
  const searchEntries = buildSearchIndex(commune);
  const officialSites = await getOfficialSites(commune.id);
  const base = `/${commune.id}`;
  return (
    <>
      {/* Hero piloto */}
      <section className="border-b bg-gradient-to-b from-accent to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <Badge className="mb-4 bg-brand-terracotta/15 text-brand-terracotta">
            Piloto informativo · {commune.region}
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            {commune.name} en{" "}
            <span className="text-brand-teal">un solo lugar</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Estamos reuniendo la información pública de {commune.name} —
            trámites, teléfonos, lugares y actividades — con fuente y fecha de
            verificación, para que la encuentres simple y sin vueltas.
          </p>
          <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-lg border border-brand-sky/40 bg-brand-sky/10 px-4 py-3 text-sm">
            <ScaleIcon className="mt-0.5 size-4 shrink-0 text-brand-navy" />
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
              placeholder={`Busca un trámite o lugar de ${commune.name}…`}
            />
          </div>
        </div>
      </section>

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
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal">
                    <item.icon className="size-6" />
                  </span>
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

      {/* Qué viene en el piloto */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="En preparación"
          title="Lo que viene, etapa por etapa"
          description="Cada módulo se publica solo cuando su información está verificada. Sin datos inventados, sin promesas vacías."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => (
            <Card key={item.title} className="gap-0 py-5">
              <CardContent className="flex items-start gap-4 px-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-teal">
                  <item.icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Fuentes oficiales */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader
            eyebrow="Mientras tanto"
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
                          className="mr-2 text-brand-teal"
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
          Este piloto crece por etapas junto a la comunidad. Última
          actualización: {formatDate(commune.updatedAt)}.
        </p>
      </section>
    </>
  );
}
