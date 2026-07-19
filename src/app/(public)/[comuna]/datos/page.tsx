import type { Metadata } from "next";

import { RingMeter } from "@/components/data/ring-meter";
import { StatTile } from "@/components/data/stat-tile";
import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { Card, CardContent } from "@/components/ui/card";
import { getIndicators } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Datos comunales",
  description:
    "Indicadores de tu comuna presentados de forma simple: población, gestión, educación y medioambiente.",
};

const areaLabels: Record<string, string> = {
  demografía: "Nuestra comuna",
  gestión: "Gestión de solicitudes",
  presupuesto: "Presupuesto",
  educación: "Educación",
  medioambiente: "Medioambiente",
  infraestructura: "Infraestructura",
  participación: "Participación",
};

const areaOrder = [
  "demografía",
  "gestión",
  "presupuesto",
  "educación",
  "medioambiente",
  "infraestructura",
  "participación",
];

export default async function DatosPage({
  params,
}: PageProps<"/[comuna]/datos">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.dataPage) {
    return <FeatureUnavailable commune={commune} title="Datos comunales" />;
  }

  const indicators = await getIndicators(commune.id);
  const areas = areaOrder.filter((area) =>
    indicators.some((i) => i.area === area)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        eyebrow="Transparencia"
        title="Los datos de tu comuna, sin letra chica"
        description="Indicadores comunales presentados de forma simple. En la versión piloto se conectan a fuentes oficiales como SINIM, INE y MINEDUC."
      />

      <div className="space-y-10">
        {areas.map((area) => {
          const areaIndicators = indicators.filter((i) => i.area === area);
          return (
            <section key={area}>
              <h2 className="mb-4 text-xl font-bold">
                {areaLabels[area] ?? area}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {areaIndicators.map((indicator) =>
                  indicator.unit === "%" ? (
                    <Card
                      key={indicator.id}
                      className="py-4 sm:col-span-2 lg:col-span-2"
                    >
                      <CardContent className="px-4">
                        <RingMeter
                          value={indicator.value}
                          label={indicator.name}
                          detail={`${indicator.period} · ${indicator.source}`}
                        />
                      </CardContent>
                    </Card>
                  ) : (
                    <StatTile
                      key={indicator.id}
                      label={indicator.name}
                      value={indicator.value}
                      unit={indicator.unit}
                      detail={`${indicator.period} · ${indicator.source}`}
                    />
                  )
                )}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Todos los valores son ficticios (comuna demo Los Aromos). El objetivo
        de esta sección es mostrar cómo se verán los datos reales de fuentes
        oficiales cuando la plataforma se conecte en fases siguientes.
      </p>
    </div>
  );
}
