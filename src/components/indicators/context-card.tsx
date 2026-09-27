import { InfoIcon } from "lucide-react";

import { TrendChart } from "@/components/data/trend-chart";
import { SourceBadge } from "@/components/shared/source-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatIndicatorValue } from "@/lib/format";
import type { ContextIndicator, DataSource } from "@/types";

interface ContextCardProps {
  indicator: ContextIndicator;
  communeName: string;
  regionLabel: string;
  source: DataSource | null;
}

/** Último año con dato válido de una serie. */
function latest(points: { year: number; value: number | null }[]) {
  for (let i = points.length - 1; i >= 0; i--) {
    if (points[i].value !== null) return points[i] as { year: number; value: number };
  }
  return null;
}

/**
 * Un indicador con contexto: la pregunta, la respuesta en una frase, la
 * comparación con el promedio regional del mismo año y, si hay historia
 * suficiente, su evolución. Nunca una posición ni una nota.
 */
export function ContextCard({
  indicator,
  communeName,
  regionLabel,
  source,
}: ContextCardProps) {
  const current = latest(indicator.series);
  if (!current) return null;

  const regionalSameYear = indicator.regional?.find(
    (r) => r.year === current.year && r.value !== null
  );
  const headline = indicator.headline
    .replace("{value}", formatIndicatorValue(current.value, indicator.unit))
    .replace("{year}", String(current.year));
  const withData = indicator.series.filter((p) => p.value !== null).length;

  return (
    <Card className="gap-0 py-6">
      <CardContent className="px-6">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {indicator.title}
        </p>
        <h3 className="mt-1 text-lg font-bold text-primary">
          {indicator.question}
        </h3>
        <p className="mt-3 text-3xl font-semibold text-foreground">
          {formatIndicatorValue(current.value, indicator.unit)}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {current.year}
          </span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{headline}</p>
        {regionalSameYear && regionalSameYear.value !== null && (
          <p className="mt-2 text-sm text-muted-foreground">
            Promedio de las comunas de la {regionLabel}:{" "}
            <strong className="text-foreground">
              {formatIndicatorValue(regionalSameYear.value, indicator.unit)}
            </strong>{" "}
            ({regionalSameYear.communes} comunas con dato).
          </p>
        )}

        {withData >= 3 && (
          <TrendChart
            className="mt-5"
            unit={indicator.unit}
            caption={`${indicator.title}: ${communeName} y promedio de las comunas de la ${regionLabel}, por año.`}
            years={indicator.series.map((p) => p.year)}
            series={[
              {
                id: "commune",
                label: communeName,
                values: indicator.series.map((p) => p.value),
                tone: "primary",
              },
              ...(indicator.regional
                ? [
                    {
                      id: "region",
                      label: `Promedio comunas ${regionLabel}`,
                      values: indicator.regional.map((p) => p.value),
                      tone: "reference" as const,
                    },
                  ]
                : []),
            ]}
          />
        )}

        <details className="mt-4 text-sm">
          <summary className="flex cursor-pointer items-center gap-1.5 font-semibold text-brand-teal">
            <InfoIcon className="size-4" />
            Cómo leer este dato
          </summary>
          <div className="mt-2 space-y-2 text-muted-foreground">
            <p>{indicator.reading}</p>
            {indicator.caveat && <p className="italic">{indicator.caveat}</p>}
          </div>
        </details>

        {source && (
          <SourceBadge source={source} className="mt-3" />
        )}
        {indicator.sourceCode && (
          <p className="mt-1 text-xs text-muted-foreground">
            Variable {indicator.sourceCode}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
