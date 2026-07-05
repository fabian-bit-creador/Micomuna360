import type { Metadata } from "next";

import { EventCard } from "@/components/events/event-card";
import { SectionHeader } from "@/components/layout/section-header";
import { getUpcomingEvents } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Actividades",
  description:
    "Agenda comunal: talleres, deportes, ferias, cultura y encuentros vecinales.",
};

export default async function ActividadesPage() {
  const events = await getUpcomingEvents(20);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        eyebrow="Agenda comunal"
        title="Actividades para participar"
        description="Talleres, deportes, ferias y encuentros vecinales del mes. Todas las actividades son gratuitas salvo que se indique lo contrario."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Agenda de demostración de la comuna ficticia Los Aromos. En la versión
        piloto, cada municipio publica y actualiza su propia agenda.
      </p>
    </div>
  );
}
