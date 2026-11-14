"use client";

import { useState } from "react";
import Link from "next/link";

import type { CommuneOutlineShape } from "@/lib/outline";
import { cn } from "@/lib/utils";

/**
 * La comuna dibujada desde su límite oficial, con sus sectores. Cada sector
 * lleva al mapa con sus lugares. `tone="plate"` va sobre la placa azul de la
 * portada; `tone="paper"`, sobre el fondo claro y con la lista de sectores
 * al lado, que es también la alternativa para teclado y lector de pantalla.
 */
export function CommuneOutline({
  shape,
  mapHref,
  communeName,
  tone = "plate",
  className,
}: {
  shape: CommuneOutlineShape;
  /** Página del mapa de la comuna (sin `#`). */
  mapHref: string;
  communeName: string;
  tone?: "plate" | "paper";
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const current = shape.sectors.find((s) => s.id === active) ?? null;
  const onPlate = tone === "plate";

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${shape.width} ${shape.height}`}
        role="group"
        aria-label={`Sectores de ${communeName}`}
        className="block h-auto w-full overflow-visible"
      >
        {shape.sectors.map((sector) => (
          <a
            key={sector.id}
            href={`${mapHref}#${sector.id}`}
            aria-label={`Sector ${sector.name}: ver sus lugares en el mapa`}
            onMouseEnter={() => setActive(sector.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(sector.id)}
            onBlur={() => setActive(null)}
            className="outline-none"
          >
            <path
              d={sector.d}
              strokeWidth="1.25"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className={cn(
                "outline-fill cursor-pointer transition-colors",
                onPlate
                  ? "fill-white/[0.07] stroke-white/55"
                  : "fill-brand-navy/[0.06] stroke-brand-navy/45 dark:fill-white/[0.06] dark:stroke-white/45",
                active === sector.id && "fill-brand-amber stroke-brand-amber"
              )}
            />
          </a>
        ))}
        <path
          d={shape.boundary}
          pathLength={1}
          fill="none"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className={cn(
            "outline-draw pointer-events-none",
            onPlate ? "stroke-white" : "stroke-brand-navy dark:stroke-white/85"
          )}
        />
      </svg>

      {onPlate ? (
        <p
          aria-hidden="true"
          className="mt-3 flex min-h-6 items-center gap-2 text-sm text-brand-ivory/80"
        >
          <span
            className={cn(
              "h-3 w-1.5 shrink-0 rounded-[1px]",
              current ? "bg-brand-amber" : "bg-white/40"
            )}
          />
          {current ? (
            <span>
              <strong className="font-semibold text-white">
                Sector {current.name}
              </strong>{" "}
              · ver sus lugares en el mapa
            </span>
          ) : (
            `${shape.sectors.length} sectores. Elige el tuyo para ver sus lugares.`
          )}
        </p>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {shape.sectors.map((sector) => (
            <li key={sector.id}>
              <Link
                href={`${mapHref}#${sector.id}`}
                onMouseEnter={() => setActive(sector.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(sector.id)}
                onBlur={() => setActive(null)}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-md border bg-card px-3 text-sm font-semibold text-primary transition-colors hover:border-primary/60",
                  active === sector.id && "border-brand-amber bg-brand-amber/25"
                )}
              >
                {sector.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
