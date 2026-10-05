import {
  CircleAlertIcon,
  CircleDollarSignIcon,
  ClockIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react";

import { telHref } from "@/lib/format";
import type { ServiceGuide as Guide } from "@/types";

interface ServiceGuideProps {
  guide: Guide;
  steps: string[];
  /** Lugar donde se atiende en persona, con su enlace al mapa. */
  place: { name: string; address: string; href: string } | null;
}

/**
 * Ficha de un trámite: cuatro casillas (para quién, costo, dónde, plazo),
 * el paso a paso y qué llevar. Lo que la fuente no publica se dice tal cual,
 * sin rellenar.
 */
export function ServiceGuide({ guide, steps, place }: ServiceGuideProps) {
  const boxes = [
    { icon: UsersIcon, label: "Para quién", value: guide.forWhom },
    { icon: CircleDollarSignIcon, label: "Costo", value: guide.cost },
    { icon: MapPinIcon, label: "Dónde", value: guide.where },
    { icon: ClockIcon, label: "Plazo", value: guide.deadline },
  ];

  return (
    <div className="mt-4">
      <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {boxes.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl border bg-background px-3 py-2.5">
            <dt className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-brand-teal-ink uppercase">
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </dt>
            <dd className="mt-1 text-sm">
              {value ?? (
                <span className="text-muted-foreground">
                  La página oficial no lo publica: pregúntalo antes de ir.
                </span>
              )}
              {label === "Dónde" && place && (
                <a
                  href={place.href}
                  className="mt-1 flex min-h-9 items-center gap-1.5 font-semibold text-brand-teal-ink hover:underline"
                >
                  <MapIcon aria-hidden="true" className="size-4 shrink-0" />
                  {place.address}
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {guide.hours && (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Atención en persona:
          </span>{" "}
          {guide.hours}
        </p>
      )}
      {guide.phone && (
        <a
          href={telHref(guide.phone)}
          className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-brand-teal-ink hover:underline"
        >
          <PhoneIcon aria-hidden="true" className="size-4" />
          Llamar al {guide.phone}
        </a>
      )}

      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {steps.length > 0 && (
          <div>
            <h4 className="text-sm font-bold">Paso a paso</h4>
            <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        )}
        {guide.documents.length > 0 && (
          <div>
            <h4 className="text-sm font-bold">Qué llevar o tener a mano</h4>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {guide.documents.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {guide.warnings.length > 0 && (
        <div className="mt-4 rounded-xl border border-brand-amber/40 bg-brand-amber/10 px-4 py-3">
          <p className="flex items-center gap-1.5 text-sm font-bold">
            <CircleAlertIcon
              aria-hidden="true"
              className="size-4 text-brand-amber-ink"
            />
            Antes de ir
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm">
            {guide.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
