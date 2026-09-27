import Link from "next/link";
import { ArrowRightIcon, ScaleIcon } from "lucide-react";

import { EducationSection } from "@/components/indicators/education-section";
import { ContextCard } from "@/components/indicators/context-card";
import { SectionHeader } from "@/components/layout/section-header";
import type { CommuneConfig } from "@/config/communes";
import { getDataSource } from "@/lib/repositories";
import type { ContextIndicator, EnrollmentByDependency } from "@/types";

const sections: {
  area: ContextIndicator["area"];
  title: string;
  intro: string;
}[] = [
  {
    area: "comuna",
    title: "La comuna",
    intro: "Quiénes vivimos aquí, según las estimaciones oficiales.",
  },
  {
    area: "salud",
    title: "Salud",
    intro: "La atención primaria que administra el municipio.",
  },
  {
    area: "finanzas",
    title: "La plata del municipio",
    intro: "Con cuánto cuenta el municipio y de dónde viene.",
  },
];

interface ContextDataViewProps {
  commune: CommuneConfig;
  indicators: ContextIndicator[];
  enrollment: EnrollmentByDependency[];
}

/**
 * La comuna en contexto: indicadores oficiales comparados con su propia
 * historia y con el promedio de las comunas de la región. Sin posiciones,
 * sin notas, sin colores de «bien» o «mal».
 */
export async function ContextDataView({
  commune,
  indicators,
  enrollment,
}: ContextDataViewProps) {
  const sourceIds = [
    ...new Set([
      ...indicators.map((i) => i.sourceId),
      ...enrollment.map((e) => e.sourceId),
    ]),
  ];
  const sources = new Map(
    await Promise.all(
      sourceIds.map(async (id) => [id, await getDataSource(commune.id, id)] as const)
    )
  );
  const regionLabel = commune.region;

  const renderArea = (area: ContextIndicator["area"]) => {
    const items = indicators.filter((i) => i.area === area);
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((indicator) => (
          <ContextCard
            key={indicator.id}
            indicator={indicator}
            communeName={commune.name}
            regionLabel={regionLabel}
            source={sources.get(indicator.sourceId) ?? null}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        level="h1"
        icon="datos"
        eyebrow="En contexto"
        title={`${commune.name} en cifras`}
        description={`Datos oficiales de salud, educación y finanzas municipales, comparados con la historia de la comuna y con el promedio de las comunas de la ${regionLabel}.`}
      />

      <p className="-mt-4 mb-10 flex max-w-3xl items-start gap-2 rounded-lg border border-brand-sky/40 bg-brand-sky/10 px-4 py-3 text-sm">
        <ScaleIcon className="mt-0.5 size-4 shrink-0 text-brand-navy dark:text-brand-sky-ink" />
        <span>
          <strong>Contexto, no puntaje.</strong> No hacemos rankings ni ponemos
          notas: las cifras de una comuna dependen de su población, su historia
          y sus recursos. Cada dato dice qué mide, qué no mide y de dónde viene.
        </span>
      </p>

      <div className="space-y-12">
        {sections.slice(0, 2).map((section) =>
          indicators.some((i) => i.area === section.area) ? (
            <section key={section.area}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="mt-1 mb-4 text-sm text-muted-foreground">
                {section.intro}
              </p>
              {renderArea(section.area)}
            </section>
          ) : null
        )}

        {enrollment.length > 0 && (
          <section>
            <h2 className="text-xl font-bold">Educación</h2>
            <p className="mt-1 mb-4 text-sm text-muted-foreground">
              Los colegios que funcionan en la comuna, según la matrícula
              oficial.
            </p>
            <EducationSection
              rows={enrollment}
              communeName={commune.name}
              regionLabel={regionLabel}
              source={sources.get(enrollment[0].sourceId) ?? null}
            />
          </section>
        )}

        {indicators.some((i) => i.area === "finanzas") && (
          <section>
            <h2 className="text-xl font-bold">{sections[2].title}</h2>
            <p className="mt-1 mb-4 text-sm text-muted-foreground">
              {sections[2].intro}
            </p>
            {renderArea("finanzas")}
            {commune.features.transparency && (
              <Link
                href={`/${commune.id}/transparencia#presupuesto`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal-ink hover:text-primary"
              >
                Ver en qué se está usando el presupuesto de este año
                <ArrowRightIcon className="size-4" />
              </Link>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
