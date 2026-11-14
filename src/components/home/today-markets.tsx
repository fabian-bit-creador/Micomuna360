"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { todayInChile, weekdays } from "@/lib/weekdays";
import type { Weekday } from "@/types";

export interface TodayMarket {
  id: string;
  name: string;
  kind: "feria" | "persa";
  days: Weekday[];
  startTime: string;
  endTime: string;
  sector: string | null;
}

const noSubscribe = () => () => {};

/* «sábado 14 de noviembre», con la hora de Chile. */
function dateInChile(): string {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Santiago",
  }).format(new Date());
}

/**
 * Las ferias libres y persas de hoy. El día se calcula en el navegador con
 * la hora de Chile, igual que en la página del mapa; antes de eso se muestra
 * el enlace a las ferias de la semana.
 */
export function TodayMarkets({
  markets,
  mapHref,
  wide = false,
}: {
  markets: TodayMarket[];
  mapHref: string;
  /** Sin agenda al lado: la lista ocupa el ancho en dos columnas. */
  wide?: boolean;
}) {
  const today = useSyncExternalStore(noSubscribe, todayInChile, () => null);
  const date = useSyncExternalStore(noSubscribe, dateInChile, () => null);
  const open = today ? markets.filter((m) => m.days.includes(today)) : [];
  const dayLabel = weekdays.find((w) => w.id === today)?.label;

  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground first-letter:uppercase">
        {date ?? "Ferias libres y persas"}
      </p>
      <h3 className="mt-1 text-xl font-bold md:text-2xl">
        {!today
          ? "Qué feria hay cada día"
          : open.length === 0
            ? `Hoy ${dayLabel} no hay ferias en la comuna`
            : open.length === 1
              ? "Hoy hay una feria"
              : `Hoy hay ${open.length} ferias`}
      </h3>
      {open.length > 0 && (
        <ul
          className={cn(
            "mt-3 border-t",
            wide && "gap-x-12 md:grid md:grid-cols-2"
          )}
        >
          {open.map((m) => (
            <li key={m.id} className="border-b">
              <Link
                href={`${mapHref}#${m.id}`}
                className="group flex min-h-12 items-center gap-3 py-2"
              >
                <span className="min-w-0 flex-1">
                  <span className="block leading-snug font-semibold text-primary group-hover:underline group-hover:underline-offset-4">
                    {m.kind === "persa" ? "Persa " : ""}
                    {m.name}
                  </span>
                  {m.sector && (
                    <span className="block text-sm text-muted-foreground">
                      Sector {m.sector}
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-display text-sm font-semibold text-foreground">
                  {m.startTime}–{m.endTime}
                </span>
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`${mapHref}#ferias`}
        className="mt-3 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-brand-teal-ink underline-offset-4 hover:underline"
      >
        Ferias de toda la semana
        <ArrowRightIcon aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
