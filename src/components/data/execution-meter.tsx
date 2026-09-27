import { formatClp, formatClpCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface ExecutionItem {
  id: string;
  /** Partida en lenguaje ciudadano. */
  label: string;
  /** Presupuesto vigente, en pesos: el riel completo. */
  budgeted: number;
  /** Comprometido a la fecha, en pesos. */
  committed: number;
  /** Pagado a la fecha, en pesos. */
  paid: number;
  /** Aclaración cuando la fila se presta a confusión. */
  note?: string | null;
}

interface ExecutionMeterProps {
  items: ExecutionItem[];
  caption: string;
  /**
   * Parte del año transcurrida a la fecha del informe (0–1). Se marca en el
   * riel como referencia de tiempo, no como meta.
   */
  elapsed?: number;
  className?: string;
}

function percentOf(part: number, whole: number): number {
  return whole > 0 ? (part / whole) * 100 : 0;
}

/** Ancho de relleno acotado: visible si hay algo, nunca desbordado. */
function fillWidth(percent: number): number {
  if (percent <= 0) return 0;
  return Math.min(Math.max(percent, 1.5), 100);
}

/** Leyenda compartida por todos los medidores de una figura. */
export function ExecutionLegend({ showElapsed }: { showElapsed: boolean }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
      <li className="flex items-center gap-1.5">
        <span className="size-3 rounded-sm bg-[var(--chart-2)]" />
        Pagado
      </li>
      <li className="flex items-center gap-1.5">
        <span className="size-3 rounded-sm bg-[color-mix(in_oklab,var(--chart-2)_40%,transparent)]" />
        Comprometido
      </li>
      {showElapsed && (
        <li className="flex items-center gap-1.5">
          <span className="h-3.5 w-0.5 bg-foreground/70" />
          Parte del año transcurrida
        </li>
      )}
    </ul>
  );
}

/**
 * Cuánto se ha comprometido y pagado de lo presupuestado, partida por
 * partida.
 *
 * Un medidor por fila sobre el mismo riel, con tres pasos de un solo tono:
 * el riel claro es el presupuesto vigente, el relleno medio lo comprometido y
 * el relleno fuerte lo pagado. Los porcentajes van escritos, así que el color
 * nunca es la única pista. Se dibuja con HTML y CSS y se lee como lista.
 */
export function ExecutionMeter({
  items,
  caption,
  elapsed,
  className,
}: ExecutionMeterProps) {
  if (items.length === 0) return null;
  const elapsedPercent =
    elapsed !== undefined ? Math.min(Math.max(elapsed, 0), 1) * 100 : null;

  return (
    <figure className={cn("m-0", className)}>
      <figcaption className="sr-only">{caption}</figcaption>
      <ul className="space-y-5">
        {items.map((item) => {
          const committed = percentOf(item.committed, item.budgeted);
          const paid = percentOf(item.paid, item.budgeted);
          const summary = `${item.label}: pagado ${formatClp(item.paid)} (${Math.round(paid)}%) y comprometido ${formatClp(item.committed)} (${Math.round(committed)}%) de ${formatClp(item.budgeted)} vigentes.`;
          return (
            <li key={item.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="text-sm tabular-nums text-muted-foreground">
                  <strong className="text-primary">
                    {Math.round(paid)}% pagado
                  </strong>{" "}
                  · {Math.round(committed)}% comprometido
                </span>
              </div>
              <div
                className="relative mt-1.5 h-2.5 w-full rounded-r bg-[color-mix(in_oklab,var(--chart-2)_12%,transparent)]"
                title={summary}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-r bg-[color-mix(in_oklab,var(--chart-2)_40%,transparent)]"
                  style={{ width: `${fillWidth(committed)}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-r bg-[var(--chart-2)]"
                  style={{ width: `${fillWidth(paid)}%` }}
                />
                {elapsedPercent !== null && (
                  <span
                    aria-hidden="true"
                    className="absolute -inset-y-1 w-0.5 bg-foreground/70"
                    style={{ left: `calc(${elapsedPercent}% - 1px)` }}
                  />
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                <span aria-hidden="true">
                  {formatClpCompact(item.paid)} pagados de{" "}
                  {formatClpCompact(item.budgeted)}
                </span>
                <span className="sr-only">{summary}</span>
                {item.note && (
                  <span className="mt-0.5 block italic">{item.note}</span>
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
