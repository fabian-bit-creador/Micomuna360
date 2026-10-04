"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  ChevronDownIcon,
  ClockIcon,
  MapIcon,
  MapPinIcon,
  NavigationIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDays, weekdays } from "@/lib/weekdays";
import type { SportsProgram, Weekday } from "@/types";

type Kind = "todas" | SportsProgram["kind"];

/*
 * El buscador enlaza aquí con #d=<disciplina> para llegar con el deporte ya
 * elegido. Se lee después de hidratar, así la página sigue siendo estática.
 */
const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => window.location.hash.slice(1);
const readServerHash = () => "";

function directionsUrl(address: string, communeName: string) {
  const q = encodeURIComponent(`${address}, ${communeName}, Chile`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/**
 * Buscador de escuelas y talleres deportivos: por deporte, día, tipo y
 * sector. Filtra en el navegador; no guarda ni envía nada.
 */
export function SportsFinder({
  programs,
  sectorOf,
  communeId,
  communeName,
}: {
  programs: SportsProgram[];
  /** Sector de cada programa por su id; los que no tienen, no figuran. */
  sectorOf: Record<string, string>;
  communeId: string;
  communeName: string;
}) {
  const hash = useSyncExternalStore(subscribeHash, readHash, readServerHash);
  const disciplines = useMemo(
    () =>
      [...new Set(programs.map((p) => p.discipline))].sort((a, b) =>
        a.localeCompare(b, "es")
      ),
    [programs]
  );
  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const name of Object.values(sectorOf)) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b, "es"));
  }, [sectorOf]);
  const fromUrl = useMemo(() => {
    const d = new URLSearchParams(hash).get("d");
    return d && disciplines.includes(d) ? d : "";
  }, [hash, disciplines]);

  /* Lo que elige el vecino manda, salvo que llegue un enlace nuevo (#d=). */
  const [chosen, setChosen] = useState<{ hash: string; value: string } | null>(
    null
  );
  const discipline = chosen && chosen.hash === hash ? chosen.value : fromUrl;
  const [day, setDay] = useState<Weekday | "">("");
  const [kind, setKind] = useState<Kind>("todas");
  const [sector, setSector] = useState("");

  const results = useMemo(
    () =>
      programs.filter(
        (p) =>
          (!discipline || p.discipline === discipline) &&
          (!day || p.days.includes(day)) &&
          (kind === "todas" || p.kind === kind) &&
          (!sector || sectorOf[p.id] === sector)
      ),
    [programs, sectorOf, discipline, day, kind, sector]
  );
  const groups = useMemo(() => {
    const map = new Map<string, SportsProgram[]>();
    for (const p of results) {
      map.set(p.discipline, [...(map.get(p.discipline) ?? []), p]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "es"));
  }, [results]);

  const usedDays = weekdays.filter((w) =>
    programs.some((p) => p.days.includes(w.id))
  );
  const reset = () => {
    setChosen({ hash, value: "" });
    setDay("");
    setKind("todas");
    setSector("");
  };
  const filtered = Boolean(discipline || day || kind !== "todas" || sector);

  return (
    <div>
      <div className="grid gap-4 rounded-xl border bg-card p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-semibold text-primary">
            Deporte
            <select
              value={discipline}
              onChange={(e) => setChosen({ hash, value: e.target.value })}
              className="h-11 rounded-lg border bg-background px-3 text-base font-normal text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <option value="">Todos los deportes</option>
              {disciplines.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          {sectors.length > 0 && (
            <label className="grid gap-1.5 text-sm font-semibold text-primary">
              Sector
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="h-11 rounded-lg border bg-background px-3 text-base font-normal text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <option value="">Toda la comuna</option>
                {sectors.map(([name, count]) => (
                  <option key={name} value={name}>
                    {name} ({count})
                  </option>
                ))}
              </select>
            </label>
          )}
          <fieldset className="grid gap-1.5">
            <legend className="mb-1.5 text-sm font-semibold text-primary">
              Tipo
            </legend>
            <div className="flex gap-1.5">
              {(
                [
                  ["todas", "Todas"],
                  ["escuela", "Escuelas"],
                  ["taller", "Talleres"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={kind === value}
                  onClick={() => setKind(value)}
                  className={cn(
                    "h-11 flex-1 rounded-lg border px-3 text-sm font-semibold transition-colors",
                    kind === value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <fieldset>
          <legend className="mb-1.5 text-sm font-semibold text-primary">
            Día
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {usedDays.map((w) => (
              <button
                key={w.id}
                type="button"
                aria-pressed={day === w.id}
                aria-label={w.label}
                onClick={() => setDay(day === w.id ? "" : w.id)}
                className={cn(
                  "h-11 min-w-11 rounded-lg border px-2.5 text-sm font-semibold transition-colors",
                  day === w.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background hover:bg-accent"
                )}
              >
                {w.short}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div
        className="mt-5 flex flex-wrap items-center justify-between gap-2"
        aria-live="polite"
      >
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{results.length}</strong>{" "}
          {results.length === 1 ? "escuela o taller" : "escuelas y talleres"}
          {discipline &&
            ` de ${discipline === discipline.toUpperCase() ? discipline : discipline.toLowerCase()}`}
          {day && ` los ${weekdays.find((w) => w.id === day)!.plural}`}
          {sector && ` en el sector ${sector}`}
        </p>
        {filtered && (
          <Button variant="ghost" size="sm" onClick={reset}>
            Ver todos
          </Button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-4 rounded-xl border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
          No hay escuelas ni talleres con esa combinación. Prueba con otro día
          o{" "}
          <button
            type="button"
            onClick={reset}
            className="font-semibold text-brand-teal-ink underline underline-offset-4"
          >
            mira todos
          </button>
          .
        </div>
      ) : (
        /* Sin filtros, cada deporte se muestra plegado (la lista completa es
           larga en el celular); al filtrar se abren. */
        <div className="mt-4 space-y-3" key={filtered ? "abierto" : "plegado"}>
          {groups.map(([name, items]) => (
            <details
              key={name}
              open={filtered}
              className="group rounded-xl border bg-card open:bg-transparent open:border-transparent"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-4 py-2 text-lg font-bold text-primary group-open:px-0 hover:bg-accent group-open:hover:bg-transparent [&::-webkit-details-marker]:hidden">
                <span>
                  {name}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({items.length})
                  </span>
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                />
              </summary>
              <ul className="mt-1 mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <li
                    key={p.id}
                    className="flex flex-col rounded-xl border bg-card px-4 py-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-primary">{p.name}</p>
                      <Badge
                        variant="secondary"
                        className={
                          p.kind === "escuela"
                            ? "bg-brand-teal/15 text-brand-teal-ink"
                            : "bg-brand-amber/20 text-brand-amber-ink"
                        }
                      >
                        {p.kind === "escuela" ? "Escuela" : "Taller"}
                      </Badge>
                    </div>
                    <p className="mt-1.5 flex items-start gap-2 text-sm">
                      <ClockIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span>
                        {formatDays(p.days)} ·{" "}
                        <span className="whitespace-nowrap">
                          {p.startTime} a {p.endTime} h
                        </span>
                      </span>
                    </p>
                    <p className="mt-1 flex items-start gap-2 text-sm">
                      <MapPinIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span>
                        {p.venue && (
                          <span className="font-semibold">{p.venue} · </span>
                        )}
                        <span className="text-muted-foreground">
                          {p.address}
                          {sectorOf[p.id] && ` · Sector ${sectorOf[p.id]}`}
                        </span>
                      </span>
                    </p>
                    <div className="mt-auto pt-1.5">
                      {p.placeId ? (
                        <a
                          href={`/${communeId}/mapa#${p.placeId}`}
                          className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-brand-teal-ink hover:underline"
                        >
                          <MapIcon className="size-4" />
                          Ver en el mapa
                        </a>
                      ) : (
                        <a
                          href={directionsUrl(p.address, communeName)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-brand-teal-ink hover:underline"
                        >
                          <NavigationIcon className="size-4" />
                          Cómo llegar ↗
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
