import { ExternalLinkIcon, HeartPulseIcon, ScaleIcon } from "lucide-react";

import { BarRanking } from "@/components/data/bar-ranking";
import {
  ExecutionLegend,
  ExecutionMeter,
} from "@/components/data/execution-meter";
import { SourceBadge } from "@/components/shared/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatClp, formatClpCompact, formatDate } from "@/lib/format";
import type { BudgetDocumentIndexRow, BudgetLine, DataSource } from "@/types";

interface BudgetSectionProps {
  lines: BudgetLine[];
  documents: BudgetDocumentIndexRow[];
  source: DataSource | null;
}

/** El informe trabaja en miles de pesos; la página muestra pesos. */
const pesos = (thousands: number) => thousands * 1000;

/** "De cada $100…" sin decimales, que es como se lee en voz alta. */
const per100 = (part: number, whole: number) =>
  whole > 0 ? Math.round((part / whole) * 100) : 0;

/** Parte del año transcurrida a la fecha de corte (0–1). */
function elapsedYear(iso: string): number {
  const date = new Date(`${iso}T12:00:00Z`);
  const start = Date.UTC(date.getUTCFullYear(), 0, 1);
  const end = Date.UTC(date.getUTCFullYear() + 1, 0, 1);
  return (date.getTime() - start + 12 * 3_600_000) / (end - start);
}

function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p
        className="mt-0.5 text-2xl font-semibold text-primary"
        title={formatClp(value)}
      >
        <span aria-hidden="true">{formatClpCompact(value)}</span>
        <span className="sr-only">{formatClp(value)}</span>
      </p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function EmptyBudget() {
  return (
    <section id="presupuesto" className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-bold">El presupuesto, en simple</h2>
      <Card className="mt-4 border-brand-sky/40 bg-brand-sky/5 py-6">
        <CardContent className="flex items-start gap-4 px-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-sky/20 text-brand-navy dark:text-brand-sky-ink">
            <ScaleIcon className="size-6" />
          </span>
          <div>
            <Badge variant="secondary" className="mb-2">
              En preparación
            </Badge>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                Todavía no podemos decir qué parte del presupuesto se ha usado
              </strong>
              : esa cifra sale de leer y conciliar los informes mensuales de
              ingresos y gastos. No la vamos a estimar.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/**
 * El presupuesto explicado: cuánto había, cuánto se comprometió y cuánto se
 * pagó, de dónde viene la plata y cómo va la salud municipal. Todo sale del
 * informe más reciente con cifras verificadas; sin él, declara que no publica
 * cifras en vez de estimarlas.
 */
export function BudgetSection({ lines, documents, source }: BudgetSectionProps) {
  if (lines.length === 0) return <EmptyBudget />;

  const cutoff = lines.map((l) => l.cutoffDate).sort().at(-1)!;
  const ofCutoff = lines.filter((l) => l.cutoffDate === cutoff);
  const find = (
    area: BudgetLine["area"],
    flow: BudgetLine["flow"],
    code: string
  ) =>
    ofCutoff.find((l) => l.area === area && l.flow === flow && l.code === code);
  const rowsOf = (area: BudgetLine["area"], flow: BudgetLine["flow"]) =>
    ofCutoff.filter(
      (l) => l.area === area && l.flow === flow && l.level === "subtitulo"
    );

  const spending = find("municipal", "gastos", "215");
  const income = find("municipal", "ingresos", "115");
  if (!spending || !income) return <EmptyBudget />;

  const elapsed = elapsedYear(cutoff);
  const cutoffText = formatDate(cutoff);

  /* Crecimiento del presupuesto y cuánto de él es caja del año anterior. */
  const openingCash = find("municipal", "ingresos", "115-15");
  const growthK = spending.currentK - spending.initialK;
  const cashGrowthK = openingCash
    ? openingCash.currentK - openingCash.initialK
    : 0;

  const spendingItems = rowsOf("municipal", "gastos")
    .filter((l) => l.currentK > 0)
    .sort((a, b) => b.currentK - a.currentK)
    .map((l) => ({
      id: l.id,
      label: l.label,
      budgeted: pesos(l.currentK),
      committed: pesos(l.committedK),
      paid: pesos(l.paidK),
      note: l.note,
    }));

  /* De dónde viene: presupuesto aprobado, agrupado en lenguaje simple. */
  const fcm = find("municipal", "ingresos", "115-08-03");
  const initialOf = (code: string) =>
    find("municipal", "ingresos", code)?.initialK ?? 0;
  const origins = [
    {
      id: "fcm",
      label: "Fondo Común Municipal",
      value: fcm?.initialK ?? 0,
    },
    {
      id: "tributos",
      label: "Impuestos y derechos que se pagan en la comuna",
      value: initialOf("115-03"),
    },
    {
      id: "estado",
      label: "Transferencias del Estado",
      value: initialOf("115-05") + initialOf("115-13"),
    },
  ];
  const originsKnown = origins.reduce((sum, o) => sum + o.value, 0);
  origins.push({
    id: "resto",
    label: "Todo lo demás (multas, intereses, caja inicial y otros)",
    value: income.initialK - originsKnown,
  });
  const originItems = origins.map((o) => ({
    id: o.id,
    label: o.label,
    value: pesos(o.value),
    detail: `$${per100(o.value, income.initialK)} de cada $100`,
  }));

  /* Área de salud: presupuesto propio, con su propio origen. */
  const health = find("salud", "gastos", "215");
  const healthIncome = find("salud", "ingresos", "115");
  const fromHealthService = find("salud", "ingresos", "115-05-03-006");
  const fromMunicipality = find("salud", "ingresos", "115-05-03-101");
  const healthItems = rowsOf("salud", "gastos")
    .filter((l) => l.currentK > 0)
    .sort((a, b) => b.currentK - a.currentK)
    .map((l) => ({
      id: l.id,
      label: l.label,
      budgeted: pesos(l.currentK),
      committed: pesos(l.committedK),
      paid: pesos(l.paidK),
      note: l.note,
    }));

  const docs = [...new Set(ofCutoff.map((l) => l.documentId))]
    .map((id) => documents.find((d) => d.id === id))
    .filter((d): d is BudgetDocumentIndexRow => Boolean(d));

  return (
    <section id="presupuesto" className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-bold">El presupuesto, en simple</h2>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        Así iba la plata del municipio al {cutoffText}, cuando había pasado{" "}
        {Math.round(elapsed * 100) === 50
          ? "la mitad"
          : `el ${Math.round(elapsed * 100)}%`}{" "}
        del año. De cada $100 disponibles,{" "}
        <strong className="text-foreground">
          ya se habían comprometido ${per100(spending.committedK, spending.currentK)}
        </strong>{" "}
        y{" "}
        <strong className="text-foreground">
          pagado ${per100(spending.paidK, spending.currentK)}
        </strong>
        .
      </p>

      {/* Cifras principales */}
      <Card className="mt-4 py-6">
        <CardContent className="px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <Stat
              label="Presupuesto disponible en el año"
              value={pesos(spending.currentK)}
              detail={`Aprobado al inicio: ${formatClpCompact(pesos(spending.initialK))}`}
            />
            <Stat
              label="Comprometido"
              value={pesos(spending.committedK)}
              detail={`$${per100(spending.committedK, spending.currentK)} de cada $100`}
            />
            <Stat
              label="Pagado"
              value={pesos(spending.paidK)}
              detail={`$${per100(spending.paidK, spending.currentK)} de cada $100`}
            />
          </div>
          {growthK > 0 && (
            <p className="mt-5 border-t pt-4 text-sm text-muted-foreground">
              ¿Por qué hay más plata que la aprobada? El presupuesto se
              modifica durante el año: esta vez creció{" "}
              {formatClpCompact(pesos(growthK))}.
              {cashGrowthK > 0 &&
                ` De ese aumento, ${formatClpCompact(pesos(cashGrowthK))} es dinero que quedó en caja al terminar el año anterior.`}
            </p>
          )}
        </CardContent>
      </Card>

      {/* En qué se está usando */}
      <Card className="mt-4 py-6">
        <CardContent className="px-6">
          <h3 className="font-bold text-primary">¿En qué se está usando?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Cada barra es el presupuesto disponible para ese tipo de gasto.
          </p>
          <ExecutionLegend showElapsed />
          <ExecutionMeter
            className="mt-5"
            elapsed={elapsed}
            caption={`Presupuesto municipal comprometido y pagado por tipo de gasto al ${cutoffText}.`}
            items={spendingItems}
          />
        </CardContent>
      </Card>

      {/* De dónde viene */}
      <Card className="mt-4 py-6">
        <CardContent className="px-6">
          <h3 className="font-bold text-primary">¿De dónde viene la plata?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Origen del presupuesto aprobado para {spending.year} (
            {formatClpCompact(pesos(income.initialK))}).
          </p>
          <BarRanking
            className="mt-5"
            caption={`Origen del presupuesto municipal aprobado para ${spending.year}.`}
            items={originItems}
          />
          {fcm && (
            <p className="mt-5 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
              <strong className="text-foreground">
                ¿Qué es el Fondo Común Municipal?
              </strong>{" "}
              Es un fondo solidario entre todas las comunas de Chile: cada una
              aporta parte de lo que recauda y el fondo se reparte con
              criterios que favorecen a las que recaudan menos por su cuenta.
              Por eso las comunas con menos comercio, industria y propiedades
              con contribuciones dependen más de él.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Salud municipal */}
      {health && healthIncome && (
        <Card className="mt-4 py-6">
          <CardContent className="px-6">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal-ink">
                <HeartPulseIcon className="size-6" />
              </span>
              <div>
                <h3 className="font-bold text-primary">
                  La salud municipal tiene su propio presupuesto
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Los centros de salud que administra el municipio llevan una
                  cuenta aparte:{" "}
                  <strong className="text-foreground">
                    {formatClpCompact(pesos(health.currentK))}
                  </strong>{" "}
                  disponibles en el año, de los que al {cutoffText} se había
                  comprometido ${per100(health.committedK, health.currentK)} y
                  pagado ${per100(health.paidK, health.currentK)} de cada $100.
                </p>
                {fromHealthService && fromMunicipality && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    De cada $100 del presupuesto aprobado para salud,{" "}
                    <strong className="text-foreground">
                      ${per100(fromHealthService.initialK, healthIncome.initialK)}{" "}
                      vienen del Servicio de Salud
                    </strong>{" "}
                    (aportes del Estado) y $
                    {per100(fromMunicipality.initialK, healthIncome.initialK)}{" "}
                    los pone el municipio.
                  </p>
                )}
              </div>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-brand-teal-ink">
                Ver en qué se usa el presupuesto de salud
              </summary>
              <ExecutionLegend showElapsed />
              <ExecutionMeter
                className="mt-4"
                elapsed={elapsed}
                caption={`Presupuesto de salud municipal comprometido y pagado por tipo de gasto al ${cutoffText}.`}
                items={healthItems}
              />
            </details>
          </CardContent>
        </Card>
      )}

      {/* Cómo leer y cómo verificamos */}
      <details className="mt-4 rounded-lg border bg-card px-5 py-4">
        <summary className="cursor-pointer text-sm font-semibold">
          Cómo leer estas cifras y cómo las verificamos
        </summary>
        <div className="mt-3 space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Comprometido</strong> es lo que
            el municipio ya se obligó a pagar (un contrato firmado, una compra
            aceptada). <strong className="text-foreground">Pagado</strong> es
            lo que efectivamente salió de la caja. La marca vertical indica
            cuánto del año había pasado: sirve de referencia, no es una meta.
            Que una partida vaya baja a mitad de año no significa por sí solo
            un problema: las obras se pagan por avance y muchas compras se
            concentran en el segundo semestre.
          </p>
          <p>
            Los informes de enero a junio se publican como imagen escaneada.
            Copiamos a mano los totales y subtítulos, en miles de pesos, y cada
            cifra se comprueba contra el mismo informe antes de publicarse:
            el saldo impreso de cada fila, la suma de los subtítulos contra el
            total, la continuidad entre mayo y junio, y que lo que el
            municipio pagó a salud sea lo que salud dice haber recibido. Si
            algo no cuadra, el sitio no se publica.
          </p>
          <p>
            No usamos la columna «devengado» de gastos porque no calza entre
            informes consecutivos, y todavía no usamos julio: ese informe viene
            en un formato nuevo que solo muestra los movimientos del mes, no el
            acumulado del año.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-xs">
              <caption className="sr-only">
                Presupuesto municipal por tipo de gasto al {cutoffText}, en
                pesos.
              </caption>
              <thead className="border-b text-muted-foreground">
                <tr>
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Tipo de gasto (subtítulo)
                  </th>
                  <th scope="col" className="py-2 pr-3 text-right font-semibold">
                    Aprobado
                  </th>
                  <th scope="col" className="py-2 pr-3 text-right font-semibold">
                    Disponible
                  </th>
                  <th scope="col" className="py-2 pr-3 text-right font-semibold">
                    Comprometido
                  </th>
                  <th scope="col" className="py-2 text-right font-semibold">
                    Pagado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y tabular-nums">
                {[...rowsOf("municipal", "gastos"), spending].map((l) => (
                  <tr
                    key={l.id}
                    className={l.level === "total" ? "font-bold text-foreground" : ""}
                  >
                    <th scope="row" className="py-1.5 pr-3 font-normal">
                      {l.level === "total" ? (
                        "Total"
                      ) : (
                        <>
                          {l.officialName}{" "}
                          <span className="text-muted-foreground">
                            ({l.code.replace("215-", "")})
                          </span>
                        </>
                      )}
                    </th>
                    <td className="py-1.5 pr-3 text-right">
                      {formatClp(pesos(l.initialK))}
                    </td>
                    <td className="py-1.5 pr-3 text-right">
                      {formatClp(pesos(l.currentK))}
                    </td>
                    <td className="py-1.5 pr-3 text-right">
                      {formatClp(pesos(l.committedK))}
                    </td>
                    <td className="py-1.5 text-right">
                      {formatClp(pesos(l.paidK))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {docs.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1">
              {docs.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold hover:bg-accent"
                  >
                    {doc.flowType === "gastos" ? "Gastos" : "Ingresos"} ·{" "}
                    {doc.area === "salud" ? "Salud" : "Municipal"} ·{" "}
                    {doc.monthName}
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </details>

      {source && <SourceBadge source={source} className="mt-3" />}
    </section>
  );
}
