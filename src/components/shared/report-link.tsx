"use client";

import { usePathname } from "next/navigation";

import { getCommune } from "@/config/communes";
import { reportFormUrl } from "@/lib/report";
import { cn } from "@/lib/utils";

/**
 * «¿Viste un dato cambiado? Avísanos»: abre el formulario con la página y,
 * si se indica, el dato. No aparece en la comuna de ejemplo (sus datos son
 * ficticios) ni mientras no haya formulario.
 */
export function ReportLink({
  source,
  separator = false,
  className,
}: {
  /** Fuente del dato, p. ej. «Municipalidad — Trámites (lp-muni-tramites)». */
  source?: string;
  /** Antepone un «·», como en la línea de la fuente. */
  separator?: boolean;
  className?: string;
}) {
  const pathname = usePathname();
  const commune = getCommune(pathname.split("/")[1] ?? "");
  const href =
    commune && !commune.isDemo ? reportFormUrl(pathname, source) : null;
  if (!href) return null;
  return (
    <>
      {separator && <span aria-hidden="true">·</span>}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "underline decoration-dotted underline-offset-2 hover:text-foreground",
          className
        )}
      >
        ¿Viste un dato cambiado? Avísanos
        <span className="sr-only"> (abre un formulario de Google)</span>
      </a>
    </>
  );
}
