import { formatClp, formatClpCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface BarRankingItem {
  /** Identificador estable para la clave de React. */
  id: string;
  /** Etiqueta en lenguaje ciudadano. */
  label: string;
  /** Monto en pesos chilenos. */
  value: number;
  /** Detalle secundario, p. ej. el código de la cuenta. */
  detail?: string;
}

interface BarRankingProps {
  items: BarRankingItem[];
  /** Describe qué mide el gráfico; se usa como resumen accesible. */
  caption: string;
  className?: string;
}

/**
 * Ranking de magnitudes en barras horizontales.
 *
 * Serie única, un solo tono (el trabajo del color es magnitud, no identidad),
 * barras finas con el extremo redondeado y anclado a la línea base, y el
 * valor rotulado en la punta. Se dibuja con HTML y CSS: sin JavaScript, sin
 * librería de gráficos, y legible como lista por un lector de pantalla.
 */
export function BarRanking({ items, caption, className }: BarRankingProps) {
  if (items.length === 0) return null;
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <figure className={cn("m-0", className)}>
      <figcaption className="sr-only">{caption}</figcaption>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <span className="text-sm font-semibold text-foreground">
                {item.label}
              </span>
              <span className="text-sm font-bold tabular-nums text-primary">
                <span aria-hidden="true">{formatClpCompact(item.value)}</span>
                {/* El lector de pantalla recibe el monto exacto, no el redondeo. */}
                <span className="sr-only">{formatClp(item.value)}</span>
              </span>
            </div>
            {item.detail && (
              <span className="block text-xs text-muted-foreground">
                {item.detail}
              </span>
            )}
            {/* Riel del 100% para que las barras se comparen entre sí. */}
            <div className="mt-1.5 h-2.5 w-full rounded-r bg-muted">
              <div
                className="h-2.5 rounded-r bg-[var(--chart-2)]"
                style={{ width: `${Math.max((item.value / max) * 100, 1.5)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
