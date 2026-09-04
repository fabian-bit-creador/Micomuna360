import { SourceBadge } from "@/components/shared/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatClp } from "@/lib/format";
import type { AccountingBalanceRow, DataSource } from "@/types";

interface BalanceSectionProps {
  rows: AccountingBalanceRow[];
  source: DataSource | null;
}

/**
 * Vista técnica del balance de comprobación y saldos. Se publica completa y
 * con su advertencia: son saldos contables, no presupuesto ni gasto.
 */
export function BalanceSection({ rows, source }: BalanceSectionProps) {
  if (rows.length === 0) return null;

  const sum = (field: keyof AccountingBalanceRow) =>
    rows.reduce((total, row) => total + (row[field] as number), 0);

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold">
          El detalle contable del mes (vista técnica)
        </h2>
        <Badge variant="secondary">Extracción conciliada</Badge>
      </div>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        El balance de comprobación y saldos es el registro contable del mes:
        cuánto había al empezar, cuánto se movió y cuánto quedó, cuenta por
        cuenta. Está pensado para quien sabe leer contabilidad —{" "}
        <strong className="text-foreground">
          sus totales no son el presupuesto de la comuna ni lo que el municipio
          gastó
        </strong>
        , porque en contabilidad de partida doble cada movimiento se anota dos
        veces.
      </p>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        Publicamos las {rows.length} cuentas de julio de 2026 tal como fueron
        extraídas del documento oficial. Verificamos la extracción sumando cada
        columna y comparándola con los totales impresos en el informe: todas
        calzan exactamente.
      </p>

      <Card className="mt-4 py-5">
        <CardContent className="px-5">
          <details>
            <summary className="cursor-pointer text-sm font-semibold text-brand-teal">
              Ver las {rows.length} cuentas del balance
            </summary>
            <div className="mt-3 max-h-[32rem] overflow-auto">
              <table className="w-full text-left text-xs">
                <caption className="sr-only">
                  Balance de comprobación y saldos de julio de 2026, área
                  municipal, con saldos iniciales, movimientos del mes y saldos
                  finales por cuenta.
                </caption>
                <thead className="sticky top-0 bg-card text-muted-foreground uppercase">
                  <tr className="border-b">
                    <th scope="col" className="py-2 pr-3 font-semibold">
                      Cuenta
                    </th>
                    <th scope="col" className="py-2 pr-3 font-semibold">
                      Denominación
                    </th>
                    <th scope="col" className="py-2 pr-3 text-right font-semibold">
                      Debe inicial
                    </th>
                    <th scope="col" className="py-2 pr-3 text-right font-semibold">
                      Haber inicial
                    </th>
                    <th scope="col" className="py-2 pr-3 text-right font-semibold">
                      Débitos del mes
                    </th>
                    <th scope="col" className="py-2 pr-3 text-right font-semibold">
                      Créditos del mes
                    </th>
                    <th scope="col" className="py-2 pr-3 text-right font-semibold">
                      Debe final
                    </th>
                    <th scope="col" className="py-2 text-right font-semibold">
                      Haber final
                    </th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b last:border-0">
                      <td className="py-1.5 pr-3 font-mono">
                        {row.accountCode}
                      </td>
                      <td className="py-1.5 pr-3 font-sans">
                        {row.accountName}
                      </td>
                      <td className="py-1.5 pr-3 text-right">
                        {formatClp(row.openingDebitClp)}
                      </td>
                      <td className="py-1.5 pr-3 text-right">
                        {formatClp(row.openingCreditClp)}
                      </td>
                      <td className="py-1.5 pr-3 text-right">
                        {formatClp(row.periodDebitsClp)}
                      </td>
                      <td className="py-1.5 pr-3 text-right">
                        {formatClp(row.periodCreditsClp)}
                      </td>
                      <td className="py-1.5 pr-3 text-right">
                        {formatClp(row.endingDebitClp)}
                      </td>
                      <td className="py-1.5 text-right">
                        {formatClp(row.endingCreditClp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="font-bold tabular-nums">
                  <tr className="border-t-2">
                    <td className="py-2 pr-3" colSpan={2}>
                      Totales ({rows.length} cuentas)
                    </td>
                    <td className="py-2 pr-3 text-right">
                      {formatClp(sum("openingDebitClp"))}
                    </td>
                    <td className="py-2 pr-3 text-right">
                      {formatClp(sum("openingCreditClp"))}
                    </td>
                    <td className="py-2 pr-3 text-right">
                      {formatClp(sum("periodDebitsClp"))}
                    </td>
                    <td className="py-2 pr-3 text-right">
                      {formatClp(sum("periodCreditsClp"))}
                    </td>
                    <td className="py-2 pr-3 text-right">
                      {formatClp(sum("endingDebitClp"))}
                    </td>
                    <td className="py-2 text-right">
                      {formatClp(sum("endingCreditClp"))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </details>
        </CardContent>
      </Card>

      {source && <SourceBadge source={source} className="mt-3" />}
    </section>
  );
}
