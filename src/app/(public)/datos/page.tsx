import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Datos" };

export default function DatosPage() {
  return (
    <ComingSoon
      title="Datos e indicadores comunales"
      description="Solicitudes por categoría, estado y sector, más indicadores comunales presentados de forma simple."
      fase="Fase 2"
    />
  );
}
