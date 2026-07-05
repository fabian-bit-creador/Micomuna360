import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Noticias" };

export default function NoticiasPage() {
  return (
    <ComingSoon
      title="Noticias y anuncios comunales"
      description="Noticias, talleres, beneficios y comunicados de tu comuna, todos en un solo lugar."
      fase="Fase 2"
    />
  );
}
