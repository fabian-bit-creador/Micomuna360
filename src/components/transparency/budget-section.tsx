import { ScaleIcon } from "lucide-react";

import { ExecutionMeter } from "@/components/data/execution-meter";
import { SourceBadge } from "@/components/shared/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatClp, formatClpCompact } from "@/lib/format";
import type { BudgetLine, DataSource } from "@/types";

interface BudgetSectionProps {
  lines: BudgetLine[];
  source: DataSource | null;
}

/**
 * El presupuesto explicado: cuánto se presupuestó y cuánto se ha gastado,
 * partida por partida. Mientras no haya cifras verificadas, declara
 * explícitamente que no las publica — nunca las estima.
 */
export function BudgetSection({ lines, source }: BudgetSectionProps) {
  if (lines.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-bold">El presupuesto, en simple</h2>
        <Card className="mt-4 border-brand-sky/40 bg-brand-sky/5 py-6">
          <CardContent className="flex items-start gap-4 px-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-sky/20 text-brand-navy dark:text-brand-sky">
              <ScaleIcon className="size-6" />
            </span>
            <div>
              <Badge variant="secondary" className="mb-2">
                En preparación
              </Badge>
              <p className="text-sm text-muted-foreground">
                Estamos preparando una vista clara de en qué se gasta el
                presupuesto municipal: cuánto se presupuestó y cuánto se ha
                ejecutado por área, comparable entre períodos.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <strong className="text-foreground">
                  Todavía no podemos decir qué porcentaje del presupuesto se ha
                  ejecutado
                </strong>
                : esa cifra sale de leer y conciliar los informes mensuales de
                ingresos y gastos, que por ahora publicamos como enlaces. No la
                vamos a estimar.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  /* Con cifras cargadas: se muestra el año más reciente publicado. */
  const year = Math.max(...lines.map((l) => l.year));
  const ofYear = lines
    .filter((l) => l.year === year)
    .sort((a, b) => b.budgeted - a.budgeted);
  const totalBudgeted = ofYear.reduce((sum, l) => sum + l.budgeted, 0);
  const totalExecuted = ofYear.reduce((sum, l) => sum + l.executed, 0);
  const totalShare =
    totalBudgeted > 0 ? Math.round((totalExecuted / totalBudgeted) * 100) : 0;
  const period = ofYear[0].period;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold">El presupuesto, en simple</h2>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        Cuánto dinero tenía disponible el municipio en {year} y cuánto lleva
        gastado, según el informe de {period}. De cada $100 presupuestados,{" "}
        <strong className="text-foreground">
          se han gastado ${totalShare}
        </strong>
        .
      </p>

      <Card className="mt-4 py-6">
        <CardContent className="px-6">
          <div className="mb-6 flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b pb-4">
            <span>
              <span className="block text-xs text-muted-foreground uppercase">
                Presupuesto vigente
              </span>
              <span
                className="font-display text-2xl font-bold text-primary"
                title={formatClp(totalBudgeted)}
              >
                {formatClpCompact(totalBudgeted)}
              </span>
            </span>
            <span>
              <span className="block text-xs text-muted-foreground uppercase">
                Ejecutado
              </span>
              <span
                className="font-display text-2xl font-bold text-brand-teal"
                title={formatClp(totalExecuted)}
              >
                {formatClpCompact(totalExecuted)}
              </span>
            </span>
          </div>

          <ExecutionMeter
            caption={`Porcentaje del presupuesto ejecutado por partida en ${year}, según el informe de ${period}.`}
            items={ofYear.map((line) => ({
              id: line.id,
              label: line.category,
              budgeted: line.budgeted,
              executed: line.executed,
            }))}
          />
        </CardContent>
      </Card>

      {source && <SourceBadge source={source} className="mt-3" />}
    </section>
  );
}
