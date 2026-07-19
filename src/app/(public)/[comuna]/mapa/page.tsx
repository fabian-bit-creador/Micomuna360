import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { ComingSoon } from "@/components/layout/coming-soon";
import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { getCommune } from "@/config/communes";

export const metadata: Metadata = { title: "Mapa" };

export default async function MapaPage({
  params,
}: PageProps<"/[comuna]/mapa">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.isDemo) {
    return <FeatureUnavailable commune={commune} title="Mapa comunal" />;
  }
  return (
    <ComingSoon
      title="Mapa interactivo comunal"
      description="Reportes geolocalizados, puntos verdes, obras y espacios comunitarios en un mapa territorial."
      fase="Fase 2"
    />
  );
}
