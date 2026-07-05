import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Reportar" };

export default function ReportarPage() {
  return (
    <ComingSoon
      title="Solicitudes y reportes vecinales"
      description="Reporta problemas con categoría, descripción, sector, prioridad, foto y ubicación aproximada."
      fase="Fase 2"
    />
  );
}
