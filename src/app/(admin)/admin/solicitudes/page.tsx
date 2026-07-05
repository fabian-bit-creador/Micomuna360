import type { Metadata } from "next";

import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Gestión de solicitudes" };

export default function AdminSolicitudesPage() {
  return (
    <ComingSoon
      title="Gestión de solicitudes"
      description="Revisión, cambio de estado y asignación de responsables para las solicitudes vecinales."
      fase="Fase 2"
    />
  );
}
