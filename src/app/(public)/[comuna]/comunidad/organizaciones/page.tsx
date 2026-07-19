import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, CalendarClockIcon, MailIcon, MapPinIcon } from "lucide-react";

import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { CivicIconChip } from "@/components/shared/civic-icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getLocations, getOrganizations } from "@/lib/repositories";
import type { OrganizationType } from "@/types";

export const metadata: Metadata = {
  title: "Organizaciones comunitarias",
  description:
    "Juntas de vecinos, clubes deportivos, comités de vivienda, fundaciones y agrupaciones de la comuna.",
};

const typeLabels: Record<OrganizationType, string> = {
  junta_vecinos: "Junta de vecinos",
  club_deportivo: "Club deportivo",
  comite_vivienda: "Comité de vivienda",
  fundacion: "Fundación",
  cultural: "Cultura",
  adulto_mayor: "Adulto mayor",
  medioambiente: "Medioambiente",
};

export default async function OrganizacionesPage({
  params,
}: PageProps<"/[comuna]/comunidad/organizaciones">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.community) {
    return (
      <FeatureUnavailable commune={commune} title="Organizaciones comunitarias" />
    );
  }

  const [organizations, locations] = await Promise.all([
    getOrganizations(commune.id),
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
        level="h1"
        eyebrow="Tejido social"
        title="Organizaciones comunitarias"
        description="Las agrupaciones que le dan vida al territorio: juntas de vecinos, clubes, comités, fundaciones y voluntariados."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {organizations.map((org) => (
          <Card key={org.id} className="gap-0 py-5">
            <CardContent className="flex gap-4 px-5">
              <CivicIconChip name={org.icon} color="teal" />
              <div className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-brand-teal">
                    {typeLabels[org.type]}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPinIcon className="size-3" />
                    {sectorName(org.sectorId)}
                  </span>
                </div>
                <h3 className="font-bold text-primary">{org.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {org.description}
                </p>
                <p className="flex items-start gap-1.5 pt-1 text-xs text-muted-foreground">
                  <CalendarClockIcon className="mt-0.5 size-3.5 shrink-0 text-brand-terracotta" />
                  {org.meetingInfo}
                </p>
                {org.contact && (
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MailIcon className="size-3.5 shrink-0 text-brand-sky" />
                    {org.contact}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-brand-amber/50 bg-brand-amber/10 py-5">
        <CardContent className="px-5">
          <Badge className="mb-2 bg-brand-amber text-brand-navy">
            Próximamente
          </Badge>
          <p className="text-sm">
            ¿Tu organización quiere aparecer aquí? En la próxima etapa podrán
            registrarse con validación municipal, publicar sus actividades y
            actualizar sus datos. Solo organizaciones sociales — sin partidos
            ni campañas políticas.
          </p>
        </CardContent>
      </Card>

      <p className="mt-6 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Organizaciones y contactos ficticios (comuna demo Los Aromos). En la
        versión real, cada organización aparecerá solo con su consentimiento y
        con contactos institucionales verificados.
      </p>
    </div>
  );
}
