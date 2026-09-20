"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ExternalLinkIcon, SearchCheckIcon } from "lucide-react";

import { CivicIconChip } from "@/components/shared/civic-icon";
import { SourceBadge } from "@/components/shared/source-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BenefitOrientation, DataSource } from "@/types";

/** Situaciones del hogar. Ninguna identifica a la persona. */
const situations = [
  {
    id: "adulto_mayor",
    label: "Hay personas de 65 años o más",
  },
  {
    id: "estudiantes",
    label: "Hay niños, niñas o jóvenes estudiando",
  },
  {
    id: "empleo",
    label: "Alguien busca trabajo o quiere capacitarse",
  },
  {
    id: "emprendimiento",
    label: "Tienes o quieres iniciar un emprendimiento",
  },
  {
    id: "vivienda_servicios",
    label: "Cuesta pagar los servicios básicos o el arriendo",
  },
  {
    id: "salud",
    label: "Necesitas atención de salud o medicamentos",
  },
  {
    id: "discapacidad",
    label: "Hay una persona con discapacidad o que necesita cuidados",
  },
];

/*
 * El buscador ciudadano enlaza aquí con ?s=<situación> para que el vecino
 * llegue con su caso ya marcado. La URL se lee después de hidratar (el
 * servidor entrega "" ), así la página se sigue prerenderizando estática.
 */
const noSubscribe = () => () => {};
const readQuery = () => window.location.search;
const readServerQuery = () => "";

/**
 * Orientador de beneficios: marca tu situación y te muestra qué revisar.
 *
 * Todo ocurre en el navegador. No se pide RUT ni clave, no se envía nada a
 * ningún servidor y no se guarda ninguna respuesta.
 */
export function BenefitFinder({
  items,
  sources,
}: {
  items: BenefitOrientation[];
  sources: Record<string, DataSource>;
}) {
  const query = useSyncExternalStore(noSubscribe, readQuery, readServerQuery);
  const fromUrl = useMemo(
    () =>
      new URLSearchParams(query)
        .getAll("s")
        .filter((s) => situations.some((it) => it.id === s)),
    [query]
  );

  /* null = el vecino todavía no toca nada, así manda lo que traía la URL. */
  const [touched, setTouched] = useState<string[] | null>(null);
  const selected = touched ?? fromUrl;

  const toggle = (id: string) =>
    setTouched((prev) => {
      const current = prev ?? fromUrl;
      return current.includes(id)
        ? current.filter((s) => s !== id)
        : [...current, id];
    });

  const results = useMemo(() => {
    const always = items.filter((b) => b.always);
    if (selected.length === 0) return always;
    const matched = items.filter(
      (b) => !b.always && b.triggers.some((t) => selected.includes(t))
    );
    return [...matched, ...always];
  }, [items, selected]);

  return (
    <div>
      <fieldset className="rounded-xl border bg-card p-5">
        <legend className="px-2 text-sm font-bold text-primary">
          ¿Cuál de estas situaciones se parece a la tuya?
        </legend>
        <p className="mb-4 text-sm text-muted-foreground">
          Marca todas las que correspondan. Puedes marcar varias o ninguna.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {situations.map((situation) => {
            const isOn = selected.includes(situation.id);
            return (
              <label
                key={situation.id}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                  isOn
                    ? "border-brand-teal bg-brand-teal/10 font-semibold text-primary"
                    : "hover:bg-accent"
                )}
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => toggle(situation.id)}
                  className="size-4 accent-[var(--brand-teal)]"
                />
                {situation.label}
              </label>
            );
          })}
        </div>
        {selected.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-3"
            onClick={() => setTouched([])}
          >
            Limpiar selección
          </Button>
        )}
      </fieldset>

      <div className="mt-8" aria-live="polite">
        <h2 className="flex flex-wrap items-center gap-2 text-xl font-bold">
          <SearchCheckIcon className="size-5 text-brand-teal" />
          {selected.length === 0
            ? "Por dónde partir"
            : `Qué revisar en tu caso (${results.length})`}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {selected.length === 0
            ? "Estos dos sirven a cualquiera. Marca tu situación arriba para ver más."
            : "Cada tarjeta te lleva al sitio oficial donde se revisan los requisitos y se postula."}
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {results.map((benefit) => (
            <Card key={benefit.id} className="gap-0 py-5">
              <CardContent className="px-5">
                <div className="flex items-start gap-4">
                  <CivicIconChip name={benefit.icon} color="teal" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {benefit.institution}
                    </p>
                    <h3 className="mt-0.5 font-bold text-primary">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {benefit.summary}
                    </p>
                    {benefit.searchHint && (
                      <p className="mt-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                        {benefit.searchHint}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button asChild size="sm">
                    <a
                      href={benefit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ir al sitio oficial
                      <ExternalLinkIcon />
                    </a>
                  </Button>
                  <Badge variant="outline" className="text-brand-teal">
                    Sitio oficial externo
                  </Badge>
                </div>
                {sources[benefit.sourceId] && (
                  <SourceBadge
                    source={sources[benefit.sourceId]}
                    className="mt-3"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
