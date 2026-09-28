"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { LocateFixedIcon, NavigationIcon, ScanEyeIcon } from "lucide-react";

import { distanceMeters, formatDistance, googleMapsUrls } from "@/lib/maps";
import { cn } from "@/lib/utils";

import type { MapPlace } from "./map-view";

/* Leaflet necesita el DOM: se carga solo en el navegador. */
const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] w-full animate-pulse rounded-xl border bg-muted md:h-[640px] lg:h-[680px]" />
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

type Locate =
  | { state: "idle" }
  | { state: "locating" }
  | { state: "error"; message: string }
  | { state: "ready"; position: { lat: number; lng: number } };

/**
 * Mapa con filtros por categoría, lista sincronizada (elegir un lugar en la
 * lista lo abre en el mapa y al revés) y «cerca de mí». La ubicación del
 * vecino se pide solo al tocar el botón, se usa en su navegador para ordenar
 * la lista y no se guarda ni se envía.
 */
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [locate, setLocate] = useState<Locate>({ state: "idle" });
  const position = locate.state === "ready" ? locate.position : null;

  const visible = useMemo(
    () => (active ? places.filter((p) => p.category === active) : places),
    [places, active]
  );
  const listed = useMemo(() => {
    if (!position) return visible.map((p) => ({ place: p, distance: null }));
    return visible
      .map((p) => ({ place: p, distance: distanceMeters(position, p) }))
      .sort((a, b) => a.distance - b.distance);
  }, [visible, position]);

  function findMe() {
    if (!("geolocation" in navigator)) {
      setLocate({ state: "error", message: "Tu navegador no permite ubicarte." });
      return;
    }
    setLocate({ state: "locating" });
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocate({
          state: "ready",
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        }),
      (err) =>
        setLocate({
          state: "error",
          message:
            err.code === err.PERMISSION_DENIED
              ? "No diste permiso para usar tu ubicación. Puedes activarlo en los ajustes del navegador."
              : "No pudimos obtener tu ubicación. Inténtalo de nuevo.",
        }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  }

  function choose(id: string) {
    setSelectedId(id);
    /* En el celular la lista queda bajo el mapa: subir para verlo. */
    document
      .getElementById("mapa-comunal")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div
          className="flex flex-wrap gap-2"
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
        {position ? (
          <button
            type="button"
            onClick={() => setLocate({ state: "idle" })}
            className="ml-auto flex min-h-9 items-center gap-2 rounded-full border border-brand-sky/60 bg-brand-sky/15 px-4 py-1.5 text-sm font-semibold text-brand-sky-ink"
          >
            <LocateFixedIcon className="size-4" />
            Dejar de usar mi ubicación
          </button>
        ) : (
          <button
            type="button"
            onClick={findMe}
            disabled={locate.state === "locating"}
            className="ml-auto flex min-h-9 items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-semibold text-brand-teal-ink hover:bg-accent disabled:opacity-60"
          >
            <LocateFixedIcon className="size-4" />
            {locate.state === "locating" ? "Buscando tu ubicación…" : "Cerca de mí"}
          </button>
        )}
      </div>

      <p aria-live="polite" className="mb-3 text-sm text-muted-foreground">
        {locate.state === "error" && locate.message}
        {position &&
          "Ordenamos los lugares por distancia en línea recta. Tu ubicación queda en tu teléfono: no la guardamos ni la enviamos."}
      </p>

      <div className="grid gap-4 lg:grid-cols-[272px_minmax(0,1fr)]">
        <div id="mapa-comunal" className="scroll-mt-24 lg:order-2">
          <MapView
            places={visible}
            center={center}
            zoom={zoom}
            colors={categoryColors}
            boundary={boundary}
            selectedId={selectedId}
            onSelect={setSelectedId}
            userPosition={position}
          />
        </div>

        {/* La misma información como lista: es también la alternativa
            accesible al mapa. */}
        <section aria-label="Lugares" className="lg:order-1">
          <h2 className="sr-only">Lugares en el mapa</h2>
          <ul className="max-h-[360px] space-y-1.5 overflow-y-auto pr-1 lg:max-h-[680px]">
            {listed.map(({ place, distance }) => {
              const urls = googleMapsUrls(place);
              const isSelected = selectedId === place.id;
              return (
                <li
                  key={place.id}
                  className={cn(
                    "rounded-lg border bg-card px-2.5 py-2 transition-colors",
                    isSelected && "border-brand-teal ring-2 ring-brand-teal/30"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => choose(place.id)}
                    aria-pressed={isSelected}
                    className="block w-full text-left"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="size-2.5 shrink-0 rounded-full"
                        style={{
                          background: categoryColors[place.category] ?? "#17375e",
                        }}
                      />
                      <span className="text-sm leading-snug font-semibold text-primary">
                        <span className="sr-only">
                          {categoryLabels[place.category] ?? place.category}:{" "}
                        </span>
                        {place.name}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {place.address}
                      {distance !== null && (
                        <>
                          {" · "}
                          <strong className="text-foreground">
                            a {formatDistance(distance)}
                          </strong>
                        </>
                      )}
                    </span>
                  </button>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs font-semibold">
                    <a
                      href={place.href}
                      className="inline-flex min-h-8 items-center text-brand-teal-ink hover:underline"
                    >
                      Ficha
                    </a>
                    <a
                      href={urls.llegar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-8 items-center gap-1 text-brand-teal-ink hover:underline"
                    >
                      <NavigationIcon className="size-3.5" />
                      Cómo llegar
                    </a>
                    <a
                      href={urls.calle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-8 items-center gap-1 text-brand-teal-ink hover:underline"
                    >
                      <ScanEyeIcon className="size-3.5" />
                      Ver la calle
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
