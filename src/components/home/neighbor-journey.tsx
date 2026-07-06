import {
  BellRingIcon,
  Building2Icon,
  LampIcon,
  SmartphoneIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { cn } from "@/lib/utils";

const journey = [
  {
    icon: LampIcon,
    color: "bg-brand-amber/25 text-yellow-700",
    title: "Doña María ve el problema",
    description:
      "La luminaria de su pasaje lleva semanas apagada y de noche da miedo salir.",
  },
  {
    icon: SmartphoneIcon,
    color: "bg-brand-teal/15 text-brand-teal",
    title: "Lo reporta en 2 minutos",
    description:
      "Desde el celular, con una foto y el punto en el mapa. Sin filas, sin papeleo.",
  },
  {
    icon: Building2Icon,
    color: "bg-brand-sky/20 text-brand-navy dark:text-brand-sky",
    title: "El municipio lo recibe y asigna",
    description:
      "El reporte llega ordenado al equipo correcto, con responsable y plazo.",
  },
  {
    icon: BellRingIcon,
    color: "bg-brand-terracotta/15 text-brand-terracotta",
    title: "María sigue el avance",
    description:
      "Recibe el aviso cuando queda resuelto: pasaje iluminado y confianza que crece.",
  },
];

/** El viaje de un vecino: cómo funcionará el reporte con seguimiento (Fase 2). */
export function NeighborJourney() {
  return (
    <section className="border-y bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="El viaje de un vecino"
          title="De un problema a una solución, paso a paso"
          description="Así funcionará el reporte vecinal cuando se active en la próxima etapa del piloto."
        />
        <ol className="grid gap-6 md:grid-cols-4 md:gap-4">
          {journey.map((step, i) => (
            <li key={step.title} className="relative">
              {/* Conector entre pasos (escritorio) */}
              {i < journey.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-[calc(50%+2rem)] hidden h-0.5 w-[calc(100%-4rem)] rounded bg-border md:block"
                />
              )}
              <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
                <div
                  className={cn(
                    "relative flex size-12 shrink-0 items-center justify-center rounded-2xl",
                    step.color
                  )}
                >
                  <step.icon className="size-6" />
                  <span className="absolute -top-1.5 -left-1.5 flex size-5 items-center justify-center rounded-full bg-primary font-display text-[11px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
