import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLinkIcon } from "lucide-react";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { ServiceGuide } from "@/components/services/service-guide";
import { CivicIconChip } from "@/components/shared/civic-icon";
import { SourceBadge } from "@/components/shared/source-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCommune } from "@/config/communes";
import { siteConfig } from "@/config/site";
import {
  getCitizenServices,
  getDataSource,
  getPlaces,
} from "@/lib/repositories";
import { cn } from "@/lib/utils";
import type { CitizenService } from "@/types";
import { communeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]/servicios">): Promise<Metadata> {
  const { comuna } = await params;
  return communeMetadata(comuna, {
    path: "/servicios",
    title: "Servicios",
    description:
      "Trámites y servicios ciudadanos con enlace directo al sitio oficial de cada institución.",
    feature: "services",
  });
}

const groups: { category: CitizenService["category"]; title: string }[] = [
  { category: "pagos", title: "Pagos" },
  { category: "tramites", title: "Trámites" },
  { category: "social", title: "Apoyos sociales" },
  { category: "empleo", title: "Empleo y capacitación" },
  { category: "deporte_cultura", title: "Deporte y cultura" },
  { category: "transparencia", title: "Transparencia" },
];

export default async function ServiciosPage({
  params,
}: PageProps<"/[comuna]/servicios">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.services) {
    return <FeatureUnavailable commune={commune} title="Servicios" />;
  }

  const [services, places] = await Promise.all([
    getCitizenServices(commune.id),
    getPlaces(commune.id),
  ]);
  const placeOf = (id: string | null | undefined) => {
    const place = id ? places.find((p) => p.id === id) : null;
    return place
      ? {
          name: place.name,
          address: place.address,
          href: `/${commune.id}/mapa#${place.id}`,
        }
      : null;
  };
  const sources = new Map(
    await Promise.all(
      services.map(
        async (s) =>
          [s.sourceId, await getDataSource(commune.id, s.sourceId)] as const
      )
    )
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        level="h1"
        icon="servicios"
        eyebrow="Sin vueltas"
        title="Servicios y trámites, con su sitio oficial"
        description={`Qué puedes hacer y dónde se hace de verdad. ${siteConfig.name} no administra ningún trámite: cada tarjeta te lleva al sitio oficial de la institución responsable.`}
      />

      <div className="space-y-10">
        {groups.map((group) => {
          const groupServices = services.filter(
            (s) => s.category === group.category
          );
          if (groupServices.length === 0) return null;
          return (
            <section key={group.category}>
              <h2 className="mb-4 text-xl font-bold">{group.title}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {groupServices.map((service) => {
                  const source = sources.get(service.sourceId) ?? null;
                  return (
                    <Card
                      key={service.id}
                      id={service.id}
                      className={cn(
                        "scroll-mt-24 gap-0 py-5",
                        service.guide && "md:col-span-2"
                      )}
                    >
                      <CardContent className="px-5">
                        <div className="flex items-start gap-4">
                          <CivicIconChip name={service.icon} color="teal" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                              {service.institution}
                            </p>
                            <h3 className="mt-0.5 font-bold text-primary">
                              {service.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                        {service.guide ? (
                          <ServiceGuide
                            guide={service.guide}
                            steps={service.steps}
                            place={placeOf(service.guide.placeId)}
                          />
                        ) : (
                          service.steps.length > 0 && (
                          <ol className="mt-3 ml-15 list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
                            {service.steps.map((step) => (
                              <li key={step}>{step}</li>
                            ))}
                          </ol>
                          )
                        )}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <Button asChild size="sm">
                            <a
                              href={service.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ir al sitio oficial
                              <ExternalLinkIcon />
                            </a>
                          </Button>
                          <Badge variant="outline" className="text-brand-teal-ink">
                            Sitio oficial externo
                          </Badge>
                        </div>
                        {source && (
                          <SourceBadge source={source} className="mt-3" />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        {siteConfig.name} nunca te pedirá tu RUT, claves ni datos personales:
        los trámites se realizan siempre en el sitio oficial de cada
        institución. Si un enlace deja de funcionar, lo marcamos como
        pendiente de revisión.
      </p>
    </div>
  );
}
