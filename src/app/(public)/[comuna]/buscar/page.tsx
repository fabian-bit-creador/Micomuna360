import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { SearchBox } from "@/components/search/search-box";
import { getCommune } from "@/config/communes";
import { buildSearchIndex } from "@/lib/search";

export const metadata: Metadata = {
  title: "Buscar",
  description:
    "Buscador ciudadano: encuentra servicios, lugares y sitios oficiales de tu comuna.",
};

export default async function BuscarPage({
  params,
}: PageProps<"/[comuna]/buscar">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.search) {
    return <FeatureUnavailable commune={commune} title="Buscador ciudadano" />;
  }

  const entries = buildSearchIndex(commune);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        level="h1"
        eyebrow="A un tecleo"
        title="¿Qué necesitas encontrar?"
        description={`Busca entre ${entries.length} servicios, lugares y sitios oficiales de ${commune.name}. Sin registro, sin vueltas.`}
      />
      <SearchBox entries={entries} />
    </div>
  );
}
