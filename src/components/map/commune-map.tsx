"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import {
  ListIcon,
  LocateFixedIcon,
  MapIcon,
  NavigationIcon,
  PhoneIcon,
  ScanEyeIcon,
} from "lucide-react";

import type { CommuneTerritory } from "@/data/communes";
import {
  distanceMeters,
  findArea,
  formatDistance,
  googleMapsUrls,
} from "@/lib/maps";
import { telHref } from "@/lib/format";
import { todayInChile } from "@/lib/weekdays";
import { cn } from "@/lib/utils";

import type { MapPlace } from "./map-view";
import { PlaceSheet } from "./place-sheet";

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
 * municipal, salud, deporte, seguridad y ferias pasan las seis
 * comprobaciones del validador de dataviz (peor par para daltonismo:
 * deporte–salud, ΔE 9,2). El resto de categorías aún no aparece en ningún
 * mapa real; al sumarlas hay que volver a validar. Cada marcador lleva
 * además un glifo propio, así que el color nunca es la única pista.
 */
const categoryColors: Record<string, string> = {
  municipal: "#2a78d6",
  deporte: "#eb6834",
  salud: "#1baf7a",
  seguridad: "#4a3aa7",
  feria: "#c2398a",
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
  feria: "Ferias",
};

/* Filtro especial: las ferias que funcionan hoy. */
const TODAY = "__hoy";

interface CommuneMapProps {
  places: MapPlace[];
  center: { lat: number; lng: number };
  zoom: number;
  /** Límite comunal oficial [lat, lng]; se dibuja como contorno. */
  boundary?: [number, number][] | null;
  /** Sectores y unidades vecinales oficiales, si la comuna los publica. */
  territory?: CommuneTerritory | null;
}

type Division = "sectors" | "units" | "none";

const noSubscribe = () => () => {};

/** Pantalla de escritorio (mapa y lista lado a lado). */
function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(min-width: 1024px)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false
  );
}

/** El teléfono pidió ahorrar datos o la conexión es muy lenta. */
function useLowData(): boolean {
  return useSyncExternalStore(
    noSubscribe,
    () => {
      const connection = (
        navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
        }
      ).connection;
      return Boolean(
        connection?.saveData ||
          connection?.effectiveType === "2g" ||
          connection?.effectiveType === "slow-2g"
      );
    },
    () => false
  );
}

const divisionLabels: Record<Division, string> = {
  sectors: "Sectores",
  units: "Unidades vecinales",
  none: "Sin divisiones",
};

const chipClass = (active: boolean) =>
  cn(
    "min-h-9 shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors",
    active
      ? "border-transparent bg-primary text-primary-foreground"
      : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
  );

type Locate =
  | { state: "idle" }
  | { state: "locating" }
  | { state: "error"; message: string }
  | { state: "ready"; position: { lat: number; lng: number } };

/**
 * Mapa con filtros por categoría, lista sincronizada (elegir un lugar en la
 * lista lo abre en el mapa y al revés), «cerca de mí» y, si la comuna los
 * publica, sectores y unidades vecinales. La ubicación del vecino se pide
 * solo al tocar el botón, se usa en su navegador para ordenar la lista y
 * decirle en qué sector está, y no se guarda ni se envía.
 */
export function CommuneMap({
  places,
  center,
  zoom,
  boundary = null,
  territory = null,
}: CommuneMapProps) {
  const categories = useMemo(
    () => [...new Set(places.map((p) => p.category))],
    [places]
  );
  const [active, setActive] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [locate, setLocate] = useState<Locate>({ state: "idle" });
  const position = locate.state === "ready" ? locate.position : null;
  const [division, setDivision] = useState<Division>(
    territory ? "sectors" : "none"
  );
  const [sectorId, setSectorId] = useState<string | null>(null);
  const isDesktop = useIsDesktop();
  const lowData = useLowData();
  /* En el celular se elige mapa o lista; con datos limitados parte en lista
     y el mapa (Leaflet y las teselas) no se descarga hasta pedirlo. */
  const [viewChoice, setViewChoice] = useState<"map" | "list" | null>(null);
  const view = viewChoice ?? (lowData ? "list" : "map");
  const showMap = isDesktop || view === "map";

  const sectors = useMemo(() => territory?.sectors ?? [], [territory]);
  const sector = sectors.find((s) => s.id === sectorId) ?? null;
  /* Sector y unidad vecinal del vecino: se calculan en su navegador. */
  const mySector = position ? findArea(position, sectors) : null;
  const myUnit =
    position && territory ? findArea(position, territory.neighborhoodUnits) : null;

  /* El día se lee en el navegador: la página se genera cada hora en el
     servidor y no puede saber qué día es para el vecino. */
  const today = useSyncExternalStore(noSubscribe, todayInChile, () => null);
  const todayCount = today
    ? places.filter((p) => p.days?.includes(today)).length
    : 0;

  const inCategory = useMemo(
    () =>
      active === TODAY
        ? places.filter((p) => today && p.days?.includes(today))
        : active
          ? places.filter((p) => p.category === active)
          : places,
    [places, active, today]
  );
  const visible = useMemo(
    () =>
      sector ? inCategory.filter((p) => p.sector === sector.name) : inCategory,
    [inCategory, sector]
  );
  const areas = useMemo(
    () =>
      division === "sectors"
        ? sectors
        : division === "units"
          ? (territory?.neighborhoodUnits ?? [])
          : [],
    [division, sectors, territory]
  );
  const listed = useMemo(() => {
    if (!position) return visible.map((p) => ({ place: p, distance: null }));
    return visible
      .map((p) => ({ place: p, distance: distanceMeters(position, p) }))
      .sort((a, b) => a.distance - b.distance);
  }, [visible, position]);

  const selected = visible.find((p) => p.id === selectedId) ?? null;
  const nearby = useMemo(() => {
    if (!selected) return [];
    return visible
      .filter((p) => p.id !== selected.id)
      .map((p) => ({ place: p, distance: distanceMeters(selected, p) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 6);
  }, [visible, selected]);

  /* «Ver en el mapa» desde una ficha de la misma página cambia el #: se
     abre ese lugar (sin filtros que lo oculten) y el mapa sube a la vista. */
  useEffect(() => {
    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!places.some((p) => p.id === id)) return;
      setActive(null);
      setSectorId(null);
      setViewChoice((current) => (current === "list" ? "map" : current));
      setSelectedId(id);
      document
        .getElementById("mapa-comunal")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [places]);

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
    /* Desde la lista del celular, elegir un lugar abre el mapa con su ficha. */
    if (!isDesktop && view === "list") setViewChoice("map");
    /* En el celular la lista queda bajo el mapa: subir para verlo. */
    document
      .getElementById("mapa-comunal")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {/* En el celular, filtros en una fila que se desliza de lado. */}
        <div
          className="-mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          role="group"
          aria-label="Filtrar lugares por categoría"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={chipClass(active === null)}
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
                className={cn(chipClass(isActive), "flex items-center gap-2")}
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
          {todayCount > 0 && (
            <button
              type="button"
              onClick={() => setActive(active === TODAY ? null : TODAY)}
              aria-pressed={active === TODAY}
              className={cn(chipClass(active === TODAY), "flex items-center gap-2")}
            >
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ background: categoryColors.feria }}
              />
              Ferias de hoy ({todayCount})
            </button>
          )}
        </div>
        {/* Solo en el celular: mapa o lista, a elección */}
        <div
          role="group"
          aria-label="Cómo ver los lugares"
          className="inline-flex rounded-full border bg-card p-1 lg:hidden"
        >
          {(
            [
              ["map", "Mapa", MapIcon],
              ["list", "Lista", ListIcon],
            ] as const
          ).map(([value, label, Icon]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setViewChoice(value);
                if (value === "list") setSelectedId(null);
              }}
              aria-pressed={view === value}
              className={cn(
                "flex min-h-9 items-center gap-1.5 rounded-full px-4 text-sm font-semibold",
                view === value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </button>
          ))}
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

      {territory && (
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div
            className="-mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
            role="group"
            aria-label="Divisiones de la comuna en el mapa"
          >
            {(["sectors", "units", "none"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setDivision(value)}
                aria-pressed={division === value}
                className={chipClass(division === value)}
              >
                {divisionLabels[value]}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            Lugares del sector
            <select
              value={sectorId ?? ""}
              onChange={(e) => setSectorId(e.target.value || null)}
              className="min-h-9 rounded-md border bg-card px-2 py-1.5 text-sm font-semibold text-foreground"
            >
              <option value="">Todos los sectores</option>
              {sectors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({inCategory.filter((p) => p.sector === s.name).length})
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div aria-live="polite" className="mb-3 text-sm text-muted-foreground">
        {locate.state === "error" && <p>{locate.message}</p>}
        {position && (
          <>
            {territory && (
              <p className="mb-1 font-semibold text-foreground">
                {mySector
                  ? `Estás en el sector ${mySector.name}${myUnit ? `, ${myUnit.name.toLowerCase()}` : ""}.`
                  : "Tu ubicación queda fuera de los sectores de la comuna."}
                {mySector && mySector.id !== sectorId && (
                  <button
                    type="button"
                    onClick={() => setSectorId(mySector.id)}
                    className="ml-2 inline-flex min-h-8 items-center font-semibold text-brand-teal-ink underline-offset-2 hover:underline"
                  >
                    Ver solo los lugares de mi sector
                  </button>
                )}
              </p>
            )}
            <p>
              Ordenamos los lugares por distancia en línea recta. Tu ubicación
              queda en tu teléfono: no la guardamos ni la enviamos.
            </p>
          </>
        )}
      </div>

      {!isDesktop && view === "list" && lowData && viewChoice === null && (
        <p className="mb-3 text-sm text-muted-foreground">
          Tu teléfono está ahorrando datos: mostramos la lista. El mapa se
          descarga solo si lo pides.
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-[272px_minmax(0,1fr)]">
        <div
          id="mapa-comunal"
          className={cn("scroll-mt-24 lg:order-2", !showMap && "hidden")}
        >
          {showMap && (
            <MapView
              places={visible}
              center={center}
              zoom={zoom}
              colors={categoryColors}
              boundary={boundary}
              areas={areas}
              labelMinZoom={division === "units" ? 13 : 12}
              highlight={sector ?? mySector}
              frame={sector?.ring ?? null}
              selectedId={selectedId}
              onSelect={setSelectedId}
              userPosition={position}
              sheetMode={!isDesktop}
            />
          )}
        </div>

        {/* La misma información como lista: es también la alternativa
            accesible al mapa. */}
        <section aria-label="Lugares" className="lg:order-1">
          <h2 className="sr-only">Lugares en el mapa</h2>
          {listed.length === 0 && (
            <p className="rounded-lg border bg-card px-3 py-3 text-sm text-muted-foreground">
              No hay lugares{active ? " de esta categoría" : ""} en el sector{" "}
              {sector?.name}.
            </p>
          )}
          <ul
            className={cn(
              "space-y-1.5",
              showMap && "max-h-[360px] overflow-y-auto pr-1 lg:max-h-[680px]"
            )}
          >
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
                      {place.sector && !sector && ` · Sector ${place.sector}`}
                      {distance !== null && (
                        <>
                          {" · "}
                          <strong className="text-foreground">
                            a {formatDistance(distance)}
                          </strong>
                        </>
                      )}
                    </span>
                    {place.schedule && (
                      <span className="mt-0.5 block text-xs font-semibold text-foreground">
                        {place.schedule}
                      </span>
                    )}
                  </button>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs font-semibold">
                    {place.phone && (
                      <a
                        href={telHref(place.phone)}
                        className="inline-flex min-h-8 items-center gap-1 text-brand-teal-ink hover:underline"
                      >
                        <PhoneIcon className="size-3.5" />
                        Llamar
                      </a>
                    )}
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

      {!isDesktop && showMap && selected && (
        <PlaceSheet
          place={selected}
          categoryLabel={categoryLabels[selected.category] ?? selected.category}
          color={categoryColors[selected.category] ?? "#17375e"}
          distance={position ? distanceMeters(position, selected) : null}
          nearby={nearby}
          onSelect={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
