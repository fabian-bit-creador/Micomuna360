import { ClockIcon, ExternalLinkIcon, MapPinIcon, TicketIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDay, formatMonth, formatTime, formatWeekday } from "@/lib/format";
import { getLocationById } from "@/lib/repositories";
import type { CommunalEvent } from "@/types";

const categoryLabels: Record<string, string> = {
  comunidad: "Comunidad",
  participación: "Participación",
  deporte: "Deporte",
  medioambiente: "Medioambiente",
  cultura: "Cultura",
  taller: "Taller",
};

export async function EventCard({
  event,
  communeId,
}: {
  event: CommunalEvent;
  communeId: string;
}) {
  const location = event.locationId
    ? await getLocationById(communeId, event.locationId)
    : null;
  const place = location?.name ?? event.venue ?? null;

  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex gap-4 p-4">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <span className="font-display text-2xl leading-none font-bold">
            {formatDay(event.startsAt)}
          </span>
          <span className="text-xs font-semibold uppercase">
            {formatMonth(event.startsAt)}
          </span>
        </div>
        <div className="min-w-0 space-y-1.5">
          <Badge variant="outline" className="text-brand-teal-ink">
            {categoryLabels[event.category] ?? event.category}
          </Badge>
          <h3 className="text-base leading-snug font-bold">{event.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 first-letter:uppercase">
              <ClockIcon className="size-3.5" />
              {formatWeekday(event.startsAt)} · {formatTime(event.startsAt)}
              {event.endsAt ? `–${formatTime(event.endsAt)}` : ""} h
            </span>
            {place && (
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="size-3.5" />
                {place}
              </span>
            )}
          </div>
          {event.access && (
            <p className="flex items-start gap-1 text-xs text-muted-foreground">
              <TicketIcon className="mt-0.5 size-3.5 shrink-0" />
              {event.access}
            </p>
          )}
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-brand-teal-ink hover:underline"
            >
              Ver entradas e información
              <ExternalLinkIcon className="size-3.5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
