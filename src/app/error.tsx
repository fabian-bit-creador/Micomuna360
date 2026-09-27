"use client";

import { useEffect } from "react";

import { StatusMessage } from "@/components/feedback/status-message";

/* Falla inesperada fuera de una comuna (portal, páginas generales). */
export default function RootError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="contenido" className="flex-1">
      <StatusMessage
        eyebrow="Algo falló"
        title="No pudimos mostrar esta página"
        description="Suele ser un problema pasajero de conexión. Vuelve a intentarlo; si sigue fallando, prueba en unos minutos."
        actions={[
          { label: "Reintentar", onClick: retry },
          { label: "Ver las comunas", href: "/" },
        ]}
      />
    </main>
  );
}
