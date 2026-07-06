import {
  CameraIcon,
  CheckIcon,
  LightbulbIcon,
  MapPinIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Recibido", color: "bg-brand-teal" },
  { label: "Asignado", color: "bg-brand-sky" },
  { label: "Resuelto", color: "bg-brand-terracotta" },
];

/**
 * Mockup de celular (CSS/SVG puro, sin imágenes) que muestra cómo se verá
 * un reporte vecinal con seguimiento. Contenido 100% ficticio (demo).
 */
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <figure className={cn("relative w-[270px]", className)}>
      <Badge className="absolute -top-2 -right-2 z-10 rotate-3 bg-brand-amber text-brand-navy shadow-sm">
        Ejemplo demo
      </Badge>

      {/* Marco del teléfono */}
      <div className="rounded-[2.4rem] border-[10px] border-brand-navy bg-background shadow-2xl">
        {/* Pantalla */}
        <div className="overflow-hidden rounded-[1.8rem]">
          {/* Barra de estado + header de la app */}
          <div className="bg-primary px-4 pt-2 pb-3 text-primary-foreground">
            <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-brand-ivory/25" />
            <p className="font-display text-sm font-bold">
              Mi reporte
              <span className="ml-2 rounded-full bg-brand-ivory/15 px-2 py-0.5 text-[10px] font-semibold">
                Nº 1024
              </span>
            </p>
          </div>

          <div className="space-y-3 px-4 py-4">
            {/* Categoría y título */}
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-amber/25 text-yellow-700">
                <LightbulbIcon className="size-4.5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Luminaria apagada</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MapPinIcon className="size-3" />
                  Villa Los Copihues
                </p>
              </div>
            </div>

            {/* Foto del reporte (placeholder) */}
            <div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-brand-sky/25 text-brand-navy/50">
              <CameraIcon className="size-6" />
              <span className="ml-2 text-[11px] font-medium">
                Foto del vecino
              </span>
            </div>

            {/* Línea de estados */}
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={step.label} className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full text-white",
                      step.color
                    )}
                  >
                    <CheckIcon className="size-3" />
                  </span>
                  <span
                    className={cn(
                      "text-xs",
                      i === steps.length - 1
                        ? "font-bold text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  {i === steps.length - 1 && (
                    <span className="rounded-full bg-brand-teal/15 px-2 py-0.5 text-[10px] font-bold text-brand-teal">
                      ¡Pasaje iluminado!
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Así se verá un reporte con seguimiento (demo · próxima etapa)
      </figcaption>
    </figure>
  );
}
