"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDownIcon } from "lucide-react";

/**
 * Ficha plegable de un trámite. Parte cerrada para que la página no se
 * alargue; se abre sola si se llega con #<id> de la tarjeta (desde el
 * buscador, por ejemplo).
 */
export function GuideDisclosure({
  cardId,
  children,
}: {
  cardId: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const open = () => {
      if (decodeURIComponent(window.location.hash.slice(1)) === cardId) {
        ref.current?.setAttribute("open", "");
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [cardId]);

  return (
    <details ref={ref} className="group mt-4">
      <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 rounded-lg border bg-background px-3 text-sm font-semibold text-brand-teal-ink hover:bg-accent [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">
          Ver ficha: para quién, costo, dónde y plazo
        </span>
        <span className="hidden group-open:inline">Ocultar ficha</span>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 transition-transform group-open:rotate-180"
        />
      </summary>
      {children}
    </details>
  );
}
