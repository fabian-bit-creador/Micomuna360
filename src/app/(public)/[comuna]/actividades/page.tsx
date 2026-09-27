import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventCard } from "@/components/events/event-card";
import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { SourceBadge } from "@/components/shared/source-badge";
import { getDataSource, getUpcomingEvents } from "@/lib/repositories";
import type { DataSource } from "@/types";
import { communeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]/actividades">): Promise<Metadata> {
  const { comuna } = await params;
  return communeMetadata(comuna, {
    path: "/actividades",
    title: "Actividades",
    description:
      "Agenda comunal: teatro, deporte y actividades para la familia, con fecha, lugar y cómo entrar.",
    feature: "events",
  });
}

export default async function ActividadesPage({
  params,
}: PageProps<"/[comuna]/actividades">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.events) {
    return <FeatureUnavailable commune={commune} title="Actividades" />;
  }

  const events = await getUpcomingEvents(commune.id, 20);
  /* Fuentes de la agenda (una por institución) y sitios oficiales donde
     seguir la programación completa. */
  const sources: DataSource[] = [];
  for (const id of new Set(events.map((e) => e.sourceId).filter(Boolean))) {
    const source = await getDataSource(commune.id, id as string);
    if (source) sources.push(source);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        level="h1"
        eyebrow="Agenda comunal"
        title="Actividades para participar"
        description={
          commune.isDemo
            ? "Talleres, deportes, ferias y encuentros vecinales del mes. Todas las actividades son gratuitas salvo que se indique lo contrario."
            : `Teatro, deporte y actividades para la familia en ${commune.name}, con fecha, lugar y cómo entrar. Cada actividad desaparece de la lista cuando termina.`
        }
      />
      {events.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} communeId={commune.id} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
          No hay actividades publicadas para los próximos días. Revisa la
          programación en los sitios oficiales de cultura y deporte de la
          comuna.
        </p>
      )}
      {sources.length > 0 && (
        <div className="mt-8 space-y-1.5">
          {sources.map((source) => (
            <SourceBadge key={source.id} source={source} />
          ))}
        </div>
      )}
      {commune.isDemo && (
        <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
          Agenda de demostración de la comuna ficticia {commune.name}. En una
          comuna real, la agenda sale de los canales oficiales del municipio.
        </p>
      )}
    </div>
  );
}
