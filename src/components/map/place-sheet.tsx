"use client";

import { useEffect, useRef } from "react";
import {
  FileTextIcon,
  NavigationIcon,
  PhoneIcon,
  ScanEyeIcon,
  XIcon,
} from "lucide-react";

import { telHref } from "@/lib/format";
import { formatDistance, googleMapsUrls } from "@/lib/maps";

import type { MapPlace } from "./map-view";

interface PlaceSheetProps {
  place: MapPlace;
  categoryLabel: string;
  color: string;
  /** Distancia desde el vecino, si activó «cerca de mí». */
  distance: number | null;
  /** Otros lugares visibles, del más cercano al más lejano. */
  nearby: { place: MapPlace; distance: number }[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

/**
 * Ficha de un lugar en el celular: sube desde abajo y deja el mapa a la
 * vista. «Cómo llegar» va primero y grande, que es lo que más se busca.
 */
export function PlaceSheet({
  place,
  categoryLabel,
  color,
  distance,
  nearby,
  onSelect,
  onClose,
}: PlaceSheetProps) {
  const urls = googleMapsUrls(place);
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* Al cambiar de lugar, el foco va al título para que se lea la ficha. */
  useEffect(() => {
    titleRef.current?.focus();
  }, [place.id]);

  return (
    <section
      aria-labelledby="ficha-lugar"
      className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-40 max-h-[62dvh] overflow-y-auto rounded-t-2xl border-t bg-card px-4 pt-2 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.18)] lg:hidden"
    >
      <span
        aria-hidden="true"
        className="mx-auto mb-2 block h-1.5 w-10 rounded-full bg-border"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-muted-foreground uppercase">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full"
              style={{ background: color }}
            />
            {categoryLabel}
          </p>
          <h2
            id="ficha-lugar"
            ref={titleRef}
            tabIndex={-1}
            className="mt-1 text-xl leading-tight font-bold text-primary outline-none"
          >
            {place.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {place.address}
            {distance !== null && (
              <>
                {" · "}
                <strong className="text-foreground">
                  a {formatDistance(distance)}
                </strong>
              </>
            )}
          </p>
          {place.sector && (
            <p className="text-sm text-muted-foreground">
              Sector {place.sector}
              {place.unit && ` · ${place.unit}`}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ficha"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      <a
        href={urls.llegar}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground"
      >
        <NavigationIcon aria-hidden="true" className="size-5" />
        Cómo llegar
        <span className="sr-only">(abre Google Maps)</span>
      </a>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {place.phone && (
          <a
            href={telHref(place.phone)}
            className="col-span-2 flex min-h-11 items-center justify-center gap-2 rounded-xl border bg-background px-3 text-sm font-semibold text-brand-teal-ink"
          >
            <PhoneIcon aria-hidden="true" className="size-4" />
            Llamar al {place.phone}
          </a>
        )}
        <a
          href={urls.calle}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border bg-background px-3 text-sm font-semibold text-brand-teal-ink"
        >
          <ScanEyeIcon aria-hidden="true" className="size-4" />
          Ver la calle
        </a>
        <a
          href={place.href}
          onClick={onClose}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border bg-background px-3 text-sm font-semibold text-brand-teal-ink"
        >
          <FileTextIcon aria-hidden="true" className="size-4" />
          Ficha completa
        </a>
      </div>

      {nearby.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-bold">Cerca de este lugar</h3>
          <ul className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
            {nearby.map(({ place: other, distance: d }) => (
              <li key={other.id} className="w-44 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelect(other.id)}
                  className="flex h-full w-full flex-col items-start rounded-xl border bg-background px-3 py-2 text-left"
                >
                  <span className="line-clamp-2 text-sm leading-snug font-semibold text-primary">
                    {other.name}
                  </span>
                  <span className="mt-auto pt-1 text-xs font-semibold text-brand-teal-ink">
                    a {formatDistance(d)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
