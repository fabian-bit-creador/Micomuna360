import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Panel municipal" };

export default function AdminPage() {
  return (
    <ComingSoon
      title="Panel de gestión municipal"
      description="Casos pendientes, responsables, estados y indicadores de gestión para el equipo municipal."
      fase="Fase 2"
    />
  );
}
