import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LockIcon } from "lucide-react";

import { BenefitFinder } from "@/components/benefits/benefit-finder";
import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { siteConfig } from "@/config/site";
import { getBenefitOrientations, getDataSource } from "@/lib/repositories";
import type { DataSource } from "@/types";

export const metadata: Metadata = {
  title: "¿A qué puedo postular?",
  description:
    "Marca tu situación y te mostramos qué beneficios conviene revisar y en qué sitio oficial se postula. Sin RUT, sin clave y sin guardar nada.",
};

export default async function BeneficiosPage({
  params,
}: PageProps<"/[comuna]/beneficios">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.benefits) {
    return (
      <FeatureUnavailable commune={commune} title="¿A qué puedo postular?" />
    );
  }

  const benefits = await getBenefitOrientations(commune.id);
  /* Cada orientación viaja al cliente con su procedencia ya resuelta. */
  const sources: Record<string, DataSource> = {};
  for (const id of new Set(benefits.map((b) => b.sourceId))) {
    const source = await getDataSource(commune.id, id);
    if (source) sources[id] = source;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SectionHeader
        level="h1"
        eyebrow="Orientador"
        title="¿A qué puedo postular?"
        description="Muchos beneficios se pierden simplemente porque nadie supo que existían. Marca lo que pasa en tu hogar y te mostramos qué conviene revisar y dónde se hace."
      />

      <BenefitFinder items={benefits} sources={sources} />

      <div className="mt-10 space-y-3 rounded-lg bg-muted px-4 py-4 text-sm text-muted-foreground">
        <p className="flex items-start gap-2 font-semibold text-foreground">
          <LockIcon className="mt-0.5 size-4 shrink-0 text-brand-teal" />
          Nada de lo que marcas sale de tu teléfono
        </p>
        <p>
          Esta herramienta funciona dentro de tu navegador: no te pedimos RUT ni
          clave, no enviamos tus respuestas a ningún servidor y no guardamos
          nada al cerrar la página.
        </p>
        <p>
          {siteConfig.name} orienta, no resuelve. Los requisitos, los montos y
          la decisión final dependen siempre de la institución responsable de
          cada beneficio. Si algo no te calza, acércate a la DIDECO de tu
          municipio: ahí revisan tu caso en concreto.
        </p>
      </div>
    </div>
  );
}
