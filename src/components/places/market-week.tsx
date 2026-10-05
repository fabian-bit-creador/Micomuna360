"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { MapIcon, NavigationIcon, StoreIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { onHashNavigation } from "@/lib/hash";
import { googleMapsUrls } from "@/lib/maps";
import { cn } from "@/lib/utils";
import { formatMarketSchedule, todayInChile, weekdays } from "@/lib/weekdays";
import type { StreetMarket, Weekday } from "@/types";

export type MarketCard = Omit<StreetMarket, "ring" | "sourceId"> & {
  sector: string | null;
  /** Ancla de su ficha (la misma que usa «Ficha» en la lista del mapa). */
  cardId: string;
};

const noSubscribe = () => () => {};

/**
 * Ferias de la semana: parte en el día de hoy (calculado en el navegador,
 * con la hora de Chile) y se puede elegir otro día o verlas todas.
 */
export function MarketWeek({ markets }: { markets: MarketCard[] }) {
  const today = useSyncExternalStore(noSubscribe, todayInChile, () => null);
  const [chosen, setChosen] = useState<Weekday | "todas" | null>(null);
  const day = chosen ?? today ?? "todas";
  const shown =
    day === "todas" ? markets : markets.filter((m) => m.days.includes(day));

  /* Llegar con #ficha-<id> («Ficha» en la lista del mapa o un enlace
     compartido): si esa feria no está en el día elegido, se muestran todas
     y se baja hasta ella. */
  useEffect(
    () =>
      onHashNavigation(
        (hash) => {
          if (!markets.some((m) => m.cardId === hash)) return;
          setChosen("todas");
          requestAnimationFrame(() =>
            document.getElementById(hash)?.scrollIntoView({ block: "start" })
          );
        },
        { initial: true }
      ),
    [markets]
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Elegir día"
        className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {weekdays.map((w) => (
          <button
            key={w.id}
            type="button"
            aria-pressed={day === w.id}
            aria-label={`${w.label}${w.id === today ? " (hoy)" : ""}`}
            onClick={() => setChosen(w.id)}
            className={cn(
              "h-11 min-w-12 shrink-0 rounded-lg border px-2.5 text-sm font-semibold transition-colors",
              day === w.id
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card hover:bg-accent"
            )}
          >
            {w.id === today ? "Hoy" : w.short}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={day === "todas"}
          onClick={() => setChosen("todas")}
          className={cn(
            "h-11 shrink-0 rounded-lg border px-3 text-sm font-semibold transition-colors",
            day === "todas"
              ? "border-primary bg-primary text-primary-foreground"
              : "bg-card hover:bg-accent"
          )}
        >
          Toda la semana
        </button>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        <strong className="text-foreground">{shown.length}</strong>{" "}
        {shown.length === 1 ? "feria" : "ferias"}
        {day === "todas"
          ? " en la semana"
          : day === today
            ? " hoy"
            : ` los ${weekdays.find((w) => w.id === day)!.plural}`}
      </p>

      {shown.length === 0 ? (
        <p className="mt-3 rounded-xl border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
          Ese día no hay ferias libres ni persas autorizadas en la comuna.
        </p>
      ) : (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m) => {
            const urls = googleMapsUrls({ lat: m.label[0], lng: m.label[1] });
            return (
              <li
                key={m.id}
                id={m.cardId}
                className="flex scroll-mt-24 flex-col rounded-xl border bg-card px-4 py-3 target:ring-2 target:ring-brand-teal"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="flex items-center gap-2 font-bold text-primary">
                    <StoreIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-brand-terracotta-ink"
                    />
                    {m.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className={
                      m.kind === "feria"
                        ? "bg-brand-teal/15 text-brand-teal-ink"
                        : "bg-brand-amber/20 text-brand-amber-ink"
                    }
                  >
                    {m.kind === "feria" ? "Feria libre" : "Persa"}
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm font-semibold">
                  {formatMarketSchedule(m)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {m.location}
                  {m.sector && ` · Sector ${m.sector}`}
                </p>
                {(m.stalls || m.note) && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {m.stalls && `${m.stalls} puestos autorizados.`}
                    {m.note && ` ${m.note}`}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap gap-x-4 pt-2 text-sm font-semibold">
                  <a
                    href={`#${m.id}`}
                    className="inline-flex min-h-9 items-center gap-1.5 text-brand-teal-ink hover:underline"
                  >
                    <MapIcon aria-hidden="true" className="size-4" />
                    Ver en el mapa
                  </a>
                  <a
                    href={urls.llegar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1.5 text-brand-teal-ink hover:underline"
                  >
                    <NavigationIcon aria-hidden="true" className="size-4" />
                    Cómo llegar
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
