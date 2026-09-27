"use client";

import { useParams } from "next/navigation";

import { StatusMessage } from "@/components/feedback/status-message";

/* Ficha que no existe dentro de una comuna (p. ej. un trámite que cambió de
   nombre). Se muestra con la cabecera de la comuna, para no perder el hilo. */
export default function CommuneNotFound() {
  const { comuna } = useParams<{ comuna: string }>();
  return (
    <StatusMessage
      eyebrow="Página no encontrada"
      title="Esta página ya no está aquí"
      description="Puede que haya cambiado de nombre o que el enlace esté incompleto. Prueba con el buscador o vuelve al inicio de la comuna."
      actions={[
        { label: "Buscar", href: `/${comuna}/buscar` },
        { label: "Volver al inicio", href: `/${comuna}` },
      ]}
    />
  );
}
