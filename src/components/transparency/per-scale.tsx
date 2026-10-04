import { formatClp, formatClpCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface PerScalePart {
  id: string;
  label: string;
  /** Monto en pesos. */
  value: number;
}

/** Escala de la comparación: $100.000, una cifra que se entiende en pesos. */
export const SCALE = 100_000;
/** Los montos se redondean a $100 para leerse fácil. */
const STEP = 100;

/**
 * Reparte $100.000 entre las partes, en pasos de $100, con el método del
 * mayor resto: los montos suman exactamente $100.000, que es lo que el
 * vecino va a comprobar.
 */
export function shareOfScale<T extends { value: number }>(
  parts: T[]
): (T & { share: number })[] {
  const units = SCALE / STEP;
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  if (total <= 0) return parts.map((p) => ({ ...p, share: 0 }));
  const raw = parts.map((p) => (p.value / total) * units);
  const shares = raw.map(Math.floor);
  let missing = units - shares.reduce((a, b) => a + b, 0);
  const order = raw
    .map((r, i) => ({ i, rest: r - Math.floor(r) }))
    .sort((a, b) => b.rest - a.rest);
  for (const { i } of order) {
    if (missing <= 0) break;
    shares[i] += 1;
    missing -= 1;
  }
  return parts.map((p, i) => ({ ...p, share: shares[i] * STEP }));
}

/**
 * «De cada $100.000»: cuánto de cada $100.000 pagados se fue a cada tipo de
 * gasto. Las partes de menos de $2.000 se juntan en «Otros gastos» para que
 * la lista se lea de un vistazo. Un solo tono: el trabajo del color aquí es la
 * magnitud, y la cifra va escrita en cada fila.
 */
export function PerScale({
  parts,
  othersLabel = "Otros gastos",
  caption,
  className,
}: {
  parts: PerScalePart[];
  othersLabel?: string;
  caption: string;
  className?: string;
}) {
  const withShares = shareOfScale(parts).sort((a, b) => b.value - a.value);
  const threshold = SCALE * 0.02;
  const main = withShares.filter((p) => p.share >= threshold);
  const small = withShares.filter((p) => p.share < threshold);
  const rows =
    small.length > 1
      ? [
          ...main,
          {
            id: "otros",
            label: othersLabel,
            value: small.reduce((sum, p) => sum + p.value, 0),
            share: small.reduce((sum, p) => sum + p.share, 0),
            detail: small.map((p) => p.label).join(" · "),
          },
        ]
      : withShares;

  return (
    <figure className={cn("m-0", className)}>
      <figcaption className="sr-only">{caption}</figcaption>
      <ul className="space-y-4">
        {rows.map((row) => (
          <li
            key={row.id}
            className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
          >
            <span className="font-display text-xl leading-none font-bold text-primary tabular-nums sm:text-2xl">
              {formatClp(row.share)}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-sm font-semibold text-foreground">
                  {row.label}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  <span aria-hidden="true">{formatClpCompact(row.value)}</span>
                  <span className="sr-only">{formatClp(row.value)}</span>
                </span>
              </div>
              {"detail" in row && row.detail && (
                <span className="block text-xs text-muted-foreground">
                  {row.detail}
                </span>
              )}
              {/* Riel de $100.000: el largo de la barra es su parte. */}
              <div className="mt-1.5 h-2.5 w-full rounded-r bg-muted">
                <div
                  className="h-2.5 rounded-r bg-[var(--chart-2)]"
                  style={{ width: `${Math.max((row.share / SCALE) * 100, 1.5)}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
