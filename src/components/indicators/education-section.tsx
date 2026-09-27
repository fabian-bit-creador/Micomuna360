import { GraduationCapIcon } from "lucide-react";

import { TrendChart } from "@/components/data/trend-chart";
import { SourceBadge } from "@/components/shared/source-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import type {
  DataSource,
  EnrollmentByDependency,
  SchoolDependency,
} from "@/types";

const dependencyLabels: Record<SchoolDependency, string> = {
  slep: "Públicos (Servicio Local de Educación)",
  municipal: "Públicos municipales",
  particular_subvencionado: "Particulares subvencionados",
  particular_pagado: "Particulares pagados",
  administracion_delegada: "Administración delegada",
};

const total = (counts: Partial<Record<SchoolDependency, number>>) =>
  Object.values(counts).reduce((sum, n) => sum + (n ?? 0), 0);

const share = (part: number, whole: number) =>
  whole > 0 ? (part / whole) * 100 : 0;

const pct = (value: number) =>
  `${value.toLocaleString("es-CL", { maximumFractionDigits: 1 })} %`;

/** Variación porcentual con signo y en palabras: "9 % menos". */
function change(from: number, to: number): string {
  const delta = ((to - from) / from) * 100;
  const rounded = Math.abs(delta).toLocaleString("es-CL", {
    maximumFractionDigits: 1,
  });
  return delta < 0 ? `${rounded} % menos` : `${rounded} % más`;
}

interface EducationSectionProps {
  rows: EnrollmentByDependency[];
  communeName: string;
  regionLabel: string;
  source: DataSource | null;
}

/**
 * Educación con contexto: cuántos estudiantes hay en los colegios de la
 * comuna, cómo ha cambiado frente a la región y en qué tipo de colegio
 * estudian. Todo desde la matrícula oficial de MINEDUC.
 */
export function EducationSection({
  rows,
  communeName,
  regionLabel,
  source,
}: EducationSectionProps) {
  if (rows.length === 0) return null;
  const first = rows[0];
  const last = rows[rows.length - 1];
  const communeFirst = total(first.commune);
  const communeLast = total(last.commune);
  const regionFirst = total(first.region);
  const regionLast = total(last.region);

  /* Tipos de colegio presentes en la comuna o en la región, de mayor a menor. */
  const kinds = (Object.keys(dependencyLabels) as SchoolDependency[])
    .filter((k) => (last.commune[k] ?? 0) > 0 || (last.region[k] ?? 0) > 0)
    .sort(
      (a, b) =>
        (last.commune[b] ?? 0) - (last.commune[a] ?? 0) ||
        (last.region[b] ?? 0) - (last.region[a] ?? 0)
    );

  const transferred = last.slep && !first.slep;

  return (
    <Card className="gap-0 py-6">
      <CardContent className="px-6">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Matrícula escolar
        </p>
        <h3 className="mt-1 text-lg font-bold text-primary">
          ¿Cuántos estudiantes hay en los colegios de la comuna?
        </h3>
        <p className="mt-3 text-3xl font-semibold text-foreground">
          {formatNumber(communeLast)}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {last.year}
          </span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Estudiantes en {last.schools} establecimientos en funcionamiento.
          Desde {first.year} hay{" "}
          <strong className="text-foreground">
            {change(communeFirst, communeLast)}
          </strong>
          ; en toda la {regionLabel}, {change(regionFirst, regionLast)}.
        </p>

        <div className="mt-5 grid gap-8 lg:grid-cols-2">
          <div>
            <TrendChart
              unit="index"
              caption={`Matrícula escolar de ${communeName} y de la ${regionLabel}, como índice con ${first.year} = 100.`}
              years={rows.map((r) => r.year)}
              series={[
                {
                  id: "commune",
                  label: `${communeName} (${first.year} = 100)`,
                  values: rows.map(
                    (r) => Math.round((total(r.commune) / communeFirst) * 1000) / 10
                  ),
                  tone: "primary",
                },
                {
                  id: "region",
                  label: `${regionLabel} (${first.year} = 100)`,
                  values: rows.map(
                    (r) => Math.round((total(r.region) / regionFirst) * 1000) / 10
                  ),
                  tone: "reference",
                },
              ]}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Las dos líneas parten en 100 para comparar cómo cambian, aunque la
              región tenga muchos más estudiantes.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground">
              ¿En qué tipo de colegio estudian? ({last.year})
            </h4>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-[var(--chart-2)]" />
                {communeName}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-muted-foreground/45" />
                {regionLabel}
              </li>
            </ul>
            <figure className="m-0 mt-3">
              <figcaption className="sr-only">
                Porcentaje de estudiantes por tipo de colegio en {last.year}, en{" "}
                {communeName} y en la {regionLabel}.
              </figcaption>
              <ul className="space-y-4">
                {kinds.map((kind) => {
                  const c = share(last.commune[kind] ?? 0, communeLast);
                  const r = share(last.region[kind] ?? 0, regionLast);
                  return (
                    <li key={kind}>
                      <p className="text-sm font-semibold text-foreground">
                        {dependencyLabels[kind]}
                      </p>
                      {[
                        { value: c, label: communeName, bar: "bg-[var(--chart-2)]" },
                        { value: r, label: regionLabel, bar: "bg-muted-foreground/45" },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="mt-1 flex items-center gap-3"
                        >
                          <div className="h-2.5 flex-1 rounded-r bg-muted">
                            <div
                              className={`h-2.5 rounded-r ${row.bar}`}
                              style={{
                                width: `${row.value > 0 ? Math.max(row.value, 1) : 0}%`,
                              }}
                            />
                          </div>
                          <span className="w-14 text-right text-xs tabular-nums text-muted-foreground">
                            <span className="sr-only">{row.label}: </span>
                            {pct(row.value)}
                          </span>
                        </div>
                      ))}
                    </li>
                  );
                })}
              </ul>
            </figure>
          </div>
        </div>

        {transferred && (
          <p className="mt-5 flex items-start gap-2 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
            <GraduationCapIcon className="mt-0.5 size-4 shrink-0 text-brand-teal-ink" />
            <span>
              En {last.year}, los establecimientos públicos de la comuna ya
              figuran a cargo del Servicio Local de Educación Pública{" "}
              <strong className="text-foreground">
                {last.slep
                  ?.toLowerCase()
                  .replace(/(^|\s)\S/g, (m) => m.toUpperCase())}
              </strong>
              , y no del municipio. Por eso los indicadores de «educación
              municipal» dejaron de describir a la comuna y no los usamos.
            </span>
          </p>
        )}

        <details className="mt-4 text-sm">
          <summary className="cursor-pointer font-semibold text-brand-teal-ink">
            Cómo leer este dato
          </summary>
          <p className="mt-2 text-muted-foreground">
            Cuenta a quienes estudian en colegios ubicados en la comuna, vivan
            o no en ella, al 30 de abril de cada año. Una baja puede deberse a
            que hay menos niños y jóvenes en edad escolar o a que más familias
            eligen colegios de otras comunas; este dato por sí solo no dice
            cuál de las dos.
          </p>
        </details>
        {source && <SourceBadge source={source} className="mt-3" />}
      </CardContent>
    </Card>
  );
}
