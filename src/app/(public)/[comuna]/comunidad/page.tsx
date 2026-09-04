import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PartyPopperIcon,
  UsersIcon,
} from "lucide-react";

import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNews, getOrganizations, getPlaces } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Comunidad",
  description:
    "Organizaciones, lugares útiles y buenas noticias: la vida comunitaria de tu comuna en un solo lugar.",
};

export default async function ComunidadPage({
  params,
}: PageProps<"/[comuna]/comunidad">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.community) {
    return <FeatureUnavailable commune={commune} title="Comunidad" />;
  }

  const base = `/${commune.id}`;
  const [organizations, places, goodNews] = await Promise.all([
    getOrganizations(commune.id),
    getPlaces(commune.id),
    getNews(commune.id, "buena_noticia"),
  ]);

  const doors = [
    {
      title: "Organizaciones comunitarias",
      description: `${organizations.length} juntas de vecinos, clubes, comités y fundaciones activas en la comuna demo.`,
      href: `${base}/comunidad/organizaciones`,
      icon: UsersIcon,
      chip: "bg-brand-teal/15 text-brand-teal",
    },
    {
      title: "Directorio comunal",
      description: `${places.length} lugares y servicios útiles: salud, deporte, reciclaje, biblioteca y más.`,
      href: `${base}/directorio`,
      icon: MapPinIcon,
      chip: "bg-brand-sky/20 text-brand-navy dark:text-brand-sky",
    },
    {
      title: "Buenas noticias",
      description: `${goodNews.length} historias positivas de la comunidad: logros, espacios recuperados y vecinos que se organizan.`,
      href: `${base}/noticias?tipo=buena_noticia`,
      icon: PartyPopperIcon,
      chip: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
    },
    {
      title: "Actividades y encuentros",
      description:
        "La agenda comunal: talleres, deportes, ferias y reuniones territoriales.",
      href: `${base}/actividades`,
      icon: CalendarDaysIcon,
      chip: "bg-brand-terracotta/15 text-brand-terracotta",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        level="h1"
        eyebrow="Comunidad"
        title="La comuna la hacen sus vecinos"
        description="Organizaciones, lugares que sirven y buenas noticias del territorio. Esta es la capa viva de MiComuna360."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {doors.map((door) => (
          <Link key={door.href} href={door.href} className="group">
            <Card className="h-full gap-0 py-6 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-12 items-center justify-center rounded-xl ${door.chip}`}
                  >
                    <door.icon className="size-6" />
                  </span>
                  <ArrowRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="text-xl text-primary">
                  {door.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {door.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-8 border-brand-teal/40 bg-brand-teal/5 py-5">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 px-5">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-2 bg-brand-teal/15 text-brand-teal">
              Próximamente
            </Badge>
            <p className="text-sm text-muted-foreground">
              En las próximas etapas, las organizaciones podrán registrarse y
              publicar sus actividades, y los vecinos podrán proponer
              iniciativas y sumarse a ellas — con moderación y sin colores
              políticos.
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Organizaciones, lugares y contactos son ficticios (comuna demo Los
        Aromos), creados para mostrar cómo funcionará la plataforma.
      </p>
    </div>
  );
}
