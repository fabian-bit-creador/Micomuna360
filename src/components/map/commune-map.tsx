"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { MapPlace } from "./map-view";

/* Leaflet necesita el DOM: se carga solo en el navegador. */
const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full animate-pulse rounded-xl border bg-muted md:h-[560px]" />
  ),
});

/*
 * Color por categoría. Los marcadores van sobre el mapa base claro de
 * OpenStreetMap (que no cambia con el tema), así que la paleta se validó en
 * modo claro y con todos los pares (un mapa es un gráfico de dispersión):
 * municipal, salud, deporte y seguridad pasan las seis comprobaciones del
 * validador de dataviz. El resto de categorías aún no aparece en ningún
 * mapa real; al sumarlas hay que volver a validar. Cada marcador lleva
 * además un glifo propio, así que el color nunca es la única pista.
 */
const categoryColors: Record<string, string> = {
  municipal: "#2a78d6",
  deporte: "#eb6834",
  salud: "#1baf7a",
  seguridad: "#4a3aa7",
  educacion: "#eda100",
  comunitario: "#e87ba4",
  medioambiente: "#008300",
};

const categoryLabels: Record<string, string> = {
  municipal: "Municipal",
  salud: "Salud",
  educacion: "Educación",
  deporte: "Deporte",
  comunitario: "Comunitario",
  medioambiente: "Medioambiente",
  seguridad: "Seguridad",
};

interface CommuneMapProps {
  places: MapPlace[];
  center: { lat: number; lng: number };
  zoom: number;
  /** Límite comunal oficial [lat, lng]; se dibuja como contorno. */
  boundary?: [number, number][] | null;
}

/** Mapa con filtros por categoría y leyenda accesible. */
export function CommuneMap({
  places,
  center,
  zoom,
  boundary = null,
}: CommuneMapProps) {
  const categories = useMemo(
    () => [...new Set(places.map((p) => p.category))],
    [places]
  );
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? places.filter((p) => p.category === active) : places;

  return (
    <div>
      <div
        className="mb-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar lugares por categoría"
      >
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={cn(
            "min-h-9 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
            active === null
              ? "border-transparent bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          Todos ({places.length})
        </button>
        {categories.map((category) => {
          const count = places.filter((p) => p.category === category).length;
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(isActive ? null : category)}
              aria-pressed={isActive}
              className={cn(
                "flex min-h-9 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                isActive
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ background: categoryColors[category] ?? "#17375e" }}
              />
              {categoryLabels[category] ?? category} ({count})
            </button>
          );
        })}
      </div>

      <MapView
        places={visible}
        center={center}
        zoom={zoom}
        colors={categoryColors}
        boundary={boundary}
      />

      {/* Alternativa accesible: la misma información como lista. */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold text-brand-teal-ink">
          Ver los {visible.length} lugares como lista
        </summary>
        <ul className="mt-3 space-y-2 text-sm">
          {visible.map((place) => (
            <li key={place.id} className="flex flex-wrap items-baseline gap-2">
              <Badge variant="outline">
                {categoryLabels[place.category] ?? place.category}
              </Badge>
              <a
                href={place.href}
                className="font-semibold text-primary hover:underline"
              >
                {place.name}
              </a>
              <span className="text-muted-foreground">{place.address}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
