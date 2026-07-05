import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface StatTileProps {
  label: string;
  value: number;
  unit?: string;
  /** Contexto: período y/o fuente. */
  detail?: string;
  className?: string;
}

/** Tile de indicador: etiqueta + valor + contexto (sin gráfico). */
export function StatTile({
  label,
  value,
  unit,
  detail,
  className,
}: StatTileProps) {
  const isPercent = unit === "%";
  return (
    <Card className={cn("py-4", className)}>
      <CardContent className="px-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
          {formatNumber(value)}
          {isPercent && "%"}
          {!isPercent && unit && (
            <span className="ml-1.5 text-sm font-medium text-muted-foreground">
              {unit}
            </span>
          )}
        </p>
        {detail && (
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        )}
      </CardContent>
    </Card>
  );
}
