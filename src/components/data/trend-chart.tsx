"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";

import { formatIndicatorValue, type IndicatorUnit } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface TrendSeries {
  id: string;
  label: string;
  /** Un valor por año (mismo orden que `years`); null = año sin dato. */
  values: (number | null)[];
  /** La comuna va en el color de marca; la referencia, en gris punteado. */
  tone: "primary" | "reference";
}

interface TrendChartProps {
  years: number[];
  series: TrendSeries[];
  unit: IndicatorUnit;
  /** Qué muestra el gráfico; se usa como título accesible y de la tabla. */
  caption: string;
  className?: string;
}

/* Ancho inicial (servidor); en el navegador se usa el ancho real, así el
   texto del gráfico conserva su tamaño en el celular. */
const DEFAULT_W = 560;
const H = 220;
const PAD = { top: 16, right: 16, bottom: 28, left: 8 };

/** Techo "redondo" del eje para que las líneas no toquen el borde. */
function niceMax(value: number): number {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * magnitude >= value * 1.1);
  return (step ?? 10) * magnitude;
}

/**
 * Evolución de un indicador: la comuna frente a una referencia.
 *
 * Eje único que parte en cero (no exagera las diferencias), línea de 2px,
 * los años sin dato quedan como un corte en la línea (nunca como cero), la
 * última cifra de cada serie va rotulada en la punta y la leyenda nombra
 * ambas series. Al pasar el puntero o el dedo, una guía vertical muestra
 * los dos valores del año. La misma información está en la tabla.
 */
export function TrendChart({
  years,
  series,
  unit,
  caption,
  className,
}: TrendChartProps) {
  const titleId = useId();
  const [hover, setHover] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(DEFAULT_W);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      if (width > 0) setW(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /*
   * Montos y porcentajes parten en cero (no exageran diferencias). Un índice
   * se lee contra su base 100, así que el eje se ajusta a los datos y se
   * marca la línea del 100.
   */
  const [min, max] = useMemo(() => {
    const values = series.flatMap((s) =>
      s.values.filter((v): v is number => v !== null)
    );
    if (unit === "index") {
      const lo = Math.min(...values, 100);
      const hi = Math.max(...values, 100);
      return [Math.floor((lo - 3) / 5) * 5, Math.ceil((hi + 3) / 5) * 5];
    }
    return [0, niceMax(Math.max(...values))];
  }, [series, unit]);
  const guide = unit === "index" ? 100 : (min + max) / 2;

  const x = (i: number) =>
    PAD.left +
    (years.length === 1
      ? (W - PAD.left - PAD.right) / 2
      : (i * (W - PAD.left - PAD.right)) / (years.length - 1));
  const y = (v: number) =>
    PAD.top + (1 - (v - min) / (max - min)) * (H - PAD.top - PAD.bottom);

  /* Segmentos continuos: un año sin dato corta la línea. */
  const paths = series.map((s) => {
    const segments: string[] = [];
    let current = "";
    s.values.forEach((v, i) => {
      if (v === null) {
        if (current) segments.push(current);
        current = "";
        return;
      }
      current += `${current ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
    });
    if (current) segments.push(current);
    return segments.join(" ");
  });

  const lastIndex = (values: (number | null)[]) => {
    for (let i = values.length - 1; i >= 0; i--) if (values[i] !== null) return i;
    return -1;
  };

  function onPointer(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    let best = 0;
    years.forEach((_, i) => {
      if (Math.abs(x(i) - px) < Math.abs(x(best) - px)) best = i;
    });
    setHover(best);
  }

  const stroke = (tone: TrendSeries["tone"]) =>
    tone === "primary" ? "var(--chart-2)" : "var(--muted-foreground)";

  return (
    <figure className={cn("m-0", className)} aria-labelledby={titleId}>
      <figcaption id={titleId} className="sr-only">
        {caption}
      </figcaption>

      {/* Leyenda: dos series, así que siempre se nombran. */}
      <ul className="mb-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        {series.map((s) => (
          <li key={s.id} className="flex items-center gap-1.5">
            <svg width="18" height="6" aria-hidden="true">
              <line
                x1="0"
                y1="3"
                x2="18"
                y2="3"
                stroke={stroke(s.tone)}
                strokeWidth="2"
                strokeDasharray={s.tone === "reference" ? "4 3" : undefined}
              />
            </svg>
            {s.label}
          </li>
        ))}
      </ul>

      <div ref={wrapRef} className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width={W}
          height={H}
          className="block h-auto w-full touch-none overflow-visible"
          role="img"
          aria-hidden="true"
          onPointerMove={onPointer}
          onPointerDown={onPointer}
          onPointerLeave={() => setHover(null)}
        >
          {/* Línea base y guía media, recesivas. */}
          {[min, guide].map((v) => (
            <line
              key={v}
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--border)"
              strokeWidth="1"
            />
          ))}
          <text
            x={PAD.left}
            y={y(guide) - 4}
            className="fill-muted-foreground text-[11px]"
          >
            {formatIndicatorValue(guide, unit)}
          </text>

          {years.map((year, i) => {
            /* En pantallas angostas se rotula un año por medio (siempre el
               primero y el último), para que no se encimen. */
            const every = (W - PAD.left - PAD.right) / years.length < 44 ? 2 : 1;
            const last = years.length - 1;
            if (i !== 0 && i !== last && i % every !== 0) return null;
            if (every === 2 && i === last - 1) return null;
            return (
              <text
                key={year}
                x={x(i)}
                y={H - 8}
                textAnchor={
                  i === 0 ? "start" : i === years.length - 1 ? "end" : "middle"
                }
                className="fill-muted-foreground text-[11px]"
              >
                {year}
              </text>
            );
          })}

          {series.map((s, si) => (
            <path
              key={s.id}
              d={paths[si]}
              fill="none"
              stroke={stroke(s.tone)}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={s.tone === "reference" ? "5 4" : undefined}
            />
          ))}

          {/* Rótulo directo: solo la última cifra de cada serie. */}
          {series.map((s) => {
            const i = lastIndex(s.values);
            if (i < 0) return null;
            const v = s.values[i] as number;
            /* La etiqueta de la serie más alta va arriba y la otra abajo,
               para que cada cifra quede junto a su línea. */
            const others = series
              .filter((o) => o.id !== s.id)
              .map((o) => o.values[lastIndex(o.values)])
              .filter((o): o is number => o !== null && o !== undefined);
            const isTop = others.every((o) => v >= o);
            return (
              <g key={`${s.id}-end`}>
                <circle
                  cx={x(i)}
                  cy={y(v)}
                  r="4"
                  fill={stroke(s.tone)}
                  stroke="var(--card)"
                  strokeWidth="2"
                />
                <text
                  x={x(i) - 8}
                  y={y(v) + (isTop ? -10 : 18)}
                  textAnchor="end"
                  className={cn(
                    "text-[12px] font-semibold",
                    s.tone === "primary" ? "fill-foreground" : "fill-muted-foreground"
                  )}
                >
                  {formatIndicatorValue(v, unit)}
                </text>
              </g>
            );
          })}

          {hover !== null && (
            <g>
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="var(--foreground)"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              {series.map((s) =>
                s.values[hover] === null ? null : (
                  <circle
                    key={`${s.id}-hover`}
                    cx={x(hover)}
                    cy={y(s.values[hover] as number)}
                    r="4.5"
                    fill={stroke(s.tone)}
                    stroke="var(--card)"
                    strokeWidth="2"
                  />
                )
              )}
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute top-0 z-10 min-w-40 rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
            style={{
              left: `${(x(hover) / W) * 100}%`,
              transform: `translateX(${hover >= (years.length - 1) / 2 ? "-105%" : "5%"})`,
            }}
          >
            <p className="font-bold">{years[hover]}</p>
            {series.map((s) => (
              <p key={s.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-semibold tabular-nums">
                  {s.values[hover] === null
                    ? "sin dato"
                    : formatIndicatorValue(s.values[hover] as number, unit)}
                </span>
              </p>
            ))}
          </div>
        )}
      </div>

      <details className="mt-2 text-xs">
        <summary className="cursor-pointer font-semibold text-brand-teal-ink">
          Ver los datos en tabla
        </summary>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left">
            <caption className="sr-only">{caption}</caption>
            <thead className="text-muted-foreground">
              <tr>
                <th scope="col" className="py-1 pr-3 font-semibold">
                  Año
                </th>
                {series.map((s) => (
                  <th
                    key={s.id}
                    scope="col"
                    className="py-1 pr-3 text-right font-semibold"
                  >
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y tabular-nums">
              {years.map((year, i) => (
                <tr key={year}>
                  <th scope="row" className="py-1 pr-3 font-normal">
                    {year}
                  </th>
                  {series.map((s) => (
                    <td key={s.id} className="py-1 pr-3 text-right">
                      {s.values[i] === null
                        ? "sin dato"
                        : formatIndicatorValue(s.values[i] as number, unit)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
