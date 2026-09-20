import { formatClp, formatClpCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface ExecutionItem {
  id: string;
  /** Partida o área, en lenguaje ciudadano. */
  label: string;
  /** Presupuesto vigente, en pesos. */
  budgeted: number;
  /** Ejecutado a la fecha del informe, en pesos. */
  executed: number;
}

interface ExecutionMeterProps {
  items: ExecutionItem[];
  caption: string;
  className?: string;
}

/** Porcentaje ejecutado, acotado para que la barra nunca se desborde. */
function share(executed: number, budgeted: number): number {
  if (budgeted <= 0) return 0;
  return (executed / budgeted) * 100;
}

/**
 * Cuánto se ha gastado de lo presupuestado, partida por partida.
 *
 * Es una razón contra un límite —no una comparación entre series—, así que
 * cada fila usa un medidor sobre el mismo riel: la parte llena es lo
 * ejecutado y el riel completo es el presupuesto vigente. Se dibuja con HTML
 * y CSS, sin JavaScript, y se puede leer como lista.
 */
export function ExecutionMeter({
  items,
  caption,
  className,
}: ExecutionMeterProps) {
  if (items.length === 0) return null;

  return (
    <figure className={cn("m-0", className)}>
      <figcaption className="sr-only">{caption}</figcaption>
      <ul className="space-y-4">
        {items.map((item) => {
          const percent = share(item.executed, item.budgeted);
          const rounded = Math.round(percent);
          /* Por sobre el 100% la barra se llena y el número lo advierte. */
          const width = Math.min(Math.max(percent, 1.5), 100);
          return (
            <li key={item.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="text-sm font-bold tabular-nums text-primary">
                  {rounded}% ejecutado
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-r bg-muted">
                <div
                  className="h-2.5 rounded-r bg-[var(--chart-2)]"
                  style={{ width: `${width}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                <span aria-hidden="true">
                  {formatClpCompact(item.executed)} de{" "}
                  {formatClpCompact(item.budgeted)}
                </span>
                <span className="sr-only">
                  {formatClp(item.executed)} ejecutados de{" "}
                  {formatClp(item.budgeted)} presupuestados
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
