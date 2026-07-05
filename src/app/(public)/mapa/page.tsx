import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Mapa" };

export default function MapaPage() {
  return (
    <ComingSoon
      title="Mapa interactivo comunal"
      description="Reportes geolocalizados, puntos verdes, obras y espacios comunitarios en un mapa territorial."
      fase="Fase 2"
    />
  );
}
