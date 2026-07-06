import { CalendarDaysIcon, MapPinIcon, WrenchIcon } from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { formatShortDate } from "@/lib/format";
import {
  getLocations,
  getPublicRequests,
  getUpcomingEvents,
} from "@/lib/repositories";
import type { RequestStatus } from "@/types";

const inProgress: RequestStatus[] = [
  "recibida",
  "en_revision",
  "asignada",
  "en_proceso",
];

const dotColors = [
  "bg-brand-teal",
  "bg-brand-sky",
  "bg-brand-terracotta",
  "bg-brand-amber",
  "bg-brand-navy",
];

/** Franja territorial: los sectores de la comuna demo con su pulso propio. */
export async function SectorsStrip() {
  const [locations, requests, events] = await Promise.all([
    getLocations(),
    getPublicRequests(),
    getUpcomingEvents(20),
  ]);

  const sectors = locations.map((location, i) => {
    const active = requests.filter(
      (r) => r.locationId === location.id && inProgress.includes(r.status)
    ).length;
    const nextEvent = events.find((e) => e.locationId === location.id);
    return { location, active, nextEvent, dot: dotColors[i % dotColors.length] };
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeader
        eyebrow="Territorio"
        title="Una comuna, cinco sectores"
        description="Tu barrio también cuenta: así se mueve cada sector de Los Aromos (datos demo)."
      />
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {sectors.map(({ location, active, nextEvent, dot }) => (
          <div
            key={location.id}
            className="min-w-56 snap-start rounded-xl border bg-card p-4 lg:min-w-0"
          >
            <p className="flex items-center gap-2 font-bold text-primary">
              <span className={`size-2.5 shrink-0 rounded-full ${dot}`} />
              {location.name}
            </p>
            <ul className="mt-2.5 space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <WrenchIcon className="size-3.5 shrink-0 text-brand-teal" />
                {active === 0
                  ? "Sin reportes en gestión"
                  : `${active} reporte${active > 1 ? "s" : ""} en gestión`}
              </li>
              <li className="flex items-center gap-1.5">
                {nextEvent ? (
                  <>
                    <CalendarDaysIcon className="size-3.5 shrink-0 text-brand-terracotta" />
                    <span className="truncate">
                      {formatShortDate(nextEvent.startsAt)} ·{" "}
                      {nextEvent.title}
                    </span>
                  </>
                ) : (
                  <>
                    <MapPinIcon className="size-3.5 shrink-0 text-brand-sky" />
                    Sector activo del piloto
                  </>
                )}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
