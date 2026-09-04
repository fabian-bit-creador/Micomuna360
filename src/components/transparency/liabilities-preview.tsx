import { InfoIcon } from "lucide-react";

import { BarRanking } from "@/components/data/bar-ranking";
import { SourceBadge } from "@/components/shared/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatClp, formatClpCompact } from "@/lib/format";
import type { DataSource, ReportedLiabilityRow } from "@/types";

/** Convierte "SERVICIOS MANTENCION DE JARDINES" en "Servicios mantención de jardines". */
function sentenceCase(text: string): string {
  const lower = text.toLocaleLowerCase("es-CL");
  return lower.charAt(0).toLocaleUpperCase("es-CL") + lower.slice(1);
}

interface LiabilitiesPreviewProps {
  rows: ReportedLiabilityRow[];
  source: DataSource | null;
  /** Cuántas cuentas se muestran en el gráfico. */
  topCount?: number;
}

/**
 * Vista preliminar del informe de pasivos: muestra en qué cuentas se
 * concentran los montos publicados, sin afirmar que sean pagos ni deuda
 * total (su clasificación contable está pendiente de confirmación).
 */
export function LiabilitiesPreview({
  rows,
  source,
  topCount = 10,
}: LiabilitiesPreviewProps) {
  const family215 = rows
    .filter((r) => r.accountPrefix === "215")
    .sort((a, b) => b.amountClp - a.amountClp);
  const family115 = rows.filter((r) => r.accountPrefix === "115");
  if (family215.length === 0) return null;

  const top = family215.slice(0, topCount);
  const total215 = family215.reduce((sum, r) => sum + r.amountClp, 0);
  const topShare = Math.round(
    (top.reduce((sum, r) => sum + r.amountClp, 0) / total215) * 100
  );

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold">
          En qué cuentas se concentran los montos del informe de pasivos
        </h2>
        <Badge variant="secondary">Vista preliminar</Badge>
      </div>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        El informe de pasivos de julio de 2026 (área municipal) registra montos
        repartidos en {family215.length + family115.length} cuentas contables.
        Estas son las {top.length} cuentas con mayor monto dentro de la familia
        215, que agrupa {family215.length} de ellas y suma{" "}
        <strong className="text-foreground">
          {formatClpCompact(total215)}
        </strong>
        . Las {top.length} que ves aquí concentran el {topShare}% de esa suma.
      </p>

      <Card className="mt-4 py-6">
        <CardContent className="px-6">
          <BarRanking
            caption={`Las ${top.length} cuentas con mayor monto publicado en el informe de pasivos de julio de 2026, área municipal, familia contable 215.`}
            items={top.map((row) => ({
              label: sentenceCase(row.accountName),
              value: row.amountClp,
              detail: `Cuenta ${row.accountCode}`,
            }))}
          />

          <details className="mt-6 border-t pt-4">
            <summary className="cursor-pointer text-sm font-semibold text-brand-teal">
              Ver las {family215.length + family115.length} cuentas del informe,
              con montos exactos
            </summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Todas las cuentas del informe de pasivos de julio de 2026,
                  separadas por familia contable.
                </caption>
                <thead className="text-xs text-muted-foreground uppercase">
                  <tr className="border-b">
                    <th scope="col" className="py-2 pr-4 font-semibold">
                      Familia
                    </th>
                    <th scope="col" className="py-2 pr-4 font-semibold">
                      Cuenta
                    </th>
                    <th scope="col" className="py-2 pr-4 font-semibold">
                      Denominación publicada
                    </th>
                    <th scope="col" className="py-2 text-right font-semibold">
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...family215, ...family115].map((row) => (
                    <tr key={row.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 tabular-nums">
                        {row.accountPrefix}
                      </td>
                      <td className="py-2 pr-4 font-mono text-xs tabular-nums">
                        {row.accountCode}
                      </td>
                      <td className="py-2 pr-4">{row.accountName}</td>
                      <td className="py-2 text-right tabular-nums">
                        {formatClp(row.amountClp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </CardContent>
      </Card>

      <Card className="mt-4 border-brand-amber/50 bg-brand-amber/10 py-5">
        <CardContent className="flex items-start gap-3 px-5">
          <InfoIcon className="mt-0.5 size-5 shrink-0 text-yellow-700 dark:text-brand-amber" />
          <div className="space-y-2 text-sm">
            <p>
              <strong>Cómo leer estas cifras.</strong> Son los montos que
              aparecen en el informe publicado por el municipio, cuenta por
              cuenta. <strong>No son pagos ya realizados</strong>, no son la
              deuda total del municipio y no equivalen al gasto del mes.
            </p>
            <p>
              El informe mezcla dos familias contables: {family215.length}{" "}
              cuentas con prefijo 215 y {family115.length} con prefijo 115.{" "}
              <strong>Sumarlas entre sí no entrega un dato válido</strong>, así
              que aquí solo graficamos la familia 215 y mostramos la 115 aparte
              en la tabla. La clasificación oficial de cada familia está
              pendiente de confirmación con el municipio.
            </p>
          </div>
        </CardContent>
      </Card>

      {source && <SourceBadge source={source} className="mt-3" />}
    </section>
  );
}
