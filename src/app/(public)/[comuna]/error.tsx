"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { StatusMessage } from "@/components/feedback/status-message";

/* Falla inesperada al mostrar una sección: se mantiene la cabecera de la
   comuna y se ofrece reintentar. */
export default function CommuneError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { comuna } = useParams<{ comuna: string }>();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusMessage
      eyebrow="Algo falló"
      title="No pudimos mostrar esta página"
      description="Suele ser un problema pasajero de conexión. Vuelve a intentarlo; si sigue fallando, prueba en unos minutos."
      actions={[
        { label: "Reintentar", onClick: retry },
        { label: "Volver al inicio", href: `/${comuna}` },
      ]}
    />
  );
}
