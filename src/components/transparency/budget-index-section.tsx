import { ArrowDownToLineIcon, ArrowUpFromLineIcon } from "lucide-react";

import { SourceBadge } from "@/components/shared/source-badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BudgetDocumentIndexRow, DataSource } from "@/types";

const areaLabels: Record<string, string> = {
  municipal: "Municipal",
  salud: "Salud",
};

interface BudgetIndexSectionProps {
  rows: BudgetDocumentIndexRow[];
  source: DataSource | null;
}

/**
 * Informes mensuales de ingresos y gastos, mes por mes. Son enlaces a los
 * documentos oficiales: de aquí no se derivan cifras ni porcentajes.
 */
export function BudgetIndexSection({ rows, source }: BudgetIndexSectionProps) {
  if (rows.length === 0) return null;

  const months = [...new Set(rows.map((r) => r.monthNumber))].sort(
    (a, b) => a - b
  );
  const areas = [...new Set(rows.map((r) => r.area))];
  const year = rows[0].year;
  const find = (month: number, area: string, flow: string) =>
    rows.find(
      (r) =>
        r.monthNumber === month && r.area === area && r.flowType === flow
    );

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold">
        Los informes de ingresos y gastos, mes por mes
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        Cada mes el municipio publica cuánto dinero entró (ingresos) y cuánto
        salió (gastos), por separado para el área municipal y el área de salud.
        Aquí están los {rows.length} informes de {year} disponibles hasta ahora,
        con enlace directo al documento oficial.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {areas.map((area) => (
          <Card key={area} className="gap-0 py-5">
            <CardContent className="px-5">
              <h3 className="font-bold text-primary">
                Área {areaLabels[area] ?? area}
              </h3>
              <ul className="mt-3 divide-y">
                {months.map((month) => {
                  const ingresos = find(month, area, "ingresos");
                  const gastos = find(month, area, "gastos");
                  const monthName = (ingresos ?? gastos)?.monthName ?? "";
                  return (
                    <li
                      key={month}
                      className="flex flex-wrap items-center justify-between gap-2 py-2"
                    >
                      <span className="text-sm font-semibold">{monthName}</span>
                      <span className="flex flex-wrap gap-2">
                        {ingresos && (
                          <a
                            href={ingresos.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 text-xs font-bold text-brand-teal hover:bg-brand-teal hover:text-white"
                          >
                            <ArrowDownToLineIcon className="size-3.5" />
                            Ingresos
                          </a>
                        )}
                        {gastos && (
                          <a
                            href={gastos.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-brand-terracotta/10 px-3 text-xs font-bold text-brand-terracotta hover:bg-brand-terracotta hover:text-white"
                          >
                            <ArrowUpFromLineIcon className="size-3.5" />
                            Gastos
                          </a>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-4 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Todavía no resumimos estos informes en cifras ni gráficos: para eso hay
        que leer los {rows.length} documentos y conciliar sus totales. Mientras
        tanto te dejamos el acceso directo, que es lo que el municipio publica
        hoy.
      </p>

      {source && <SourceBadge source={source} className="mt-3" />}
    </section>
  );
}
