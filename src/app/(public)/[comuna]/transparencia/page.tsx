import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ClockIcon,
  CoinsIcon,
  ExternalLinkIcon,
  FileSearchIcon,
  FileTextIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { SourceBadge } from "@/components/shared/source-badge";
import { BalanceSection } from "@/components/transparency/balance-section";
import { BudgetIndexSection } from "@/components/transparency/budget-index-section";
import { LiabilitiesPreview } from "@/components/transparency/liabilities-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCommune } from "@/config/communes";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/format";
import {
  getAccountingBalance,
  getBudget,
  getBudgetDocumentIndex,
  getDataSource,
  getFinancialReports,
  getReportedLiabilities,
} from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Qué información pública puedes consultar y pedir a tu municipio, explicado en simple y con plazos claros.",
};

/** Pasos del derecho de acceso a la información (Ley de Transparencia). */
const rights = [
  {
    icon: FileSearchIcon,
    title: "Puedes pedir información sin explicar para qué",
    body: "Cualquier persona puede solicitar información pública a la municipalidad. No necesitas justificar el motivo ni ser vecino de la comuna.",
  },
  {
    icon: ClockIcon,
    title: "Tienen 20 días hábiles para responderte",
    body: "El plazo puede extenderse excepcionalmente por 10 días hábiles más, y el municipio debe avisarte antes de que venza, explicando por qué.",
  },
  {
    icon: CoinsIcon,
    title: "Es gratis",
    body: "La solicitud no tiene costo. Solo pueden cobrarte los costos directos de sacar copias, y deben informártelo antes.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Si no responden, puedes reclamar",
    body: "Si te niegan la información o no contestan, tienes 15 días hábiles para presentar un amparo ante el Consejo para la Transparencia, que es gratuito.",
  },
];

export default async function TransparenciaPage({
  params,
}: PageProps<"/[comuna]/transparencia">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.transparency) {
    return <FeatureUnavailable commune={commune} title="Transparencia" />;
  }

  const [
    budget,
    reports,
    budgetIndex,
    liabilities,
    balance,
    legalSource,
    portalSource,
    indexSource,
    liabilitiesSource,
    balanceSource,
  ] = await Promise.all([
    getBudget(commune.id),
    getFinancialReports(commune.id),
    getBudgetDocumentIndex(commune.id),
    getReportedLiabilities(commune.id),
    getAccountingBalance(commune.id),
    getDataSource(commune.id, "cl-consejo-transparencia"),
    getDataSource(commune.id, "lp-transparencia-directa"),
    getDataSource(commune.id, "lp-ta-indice-ejecucion-2026"),
    getDataSource(commune.id, "lp-ta-pasivos-julio-2026"),
    getDataSource(commune.id, "lp-ta-balance-julio-2026"),
  ]);
  const reportsSource = reports.length
    ? await getDataSource(commune.id, reports[0].sourceId)
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        level="h1"
        eyebrow="Tu derecho a saber"
        title="Transparencia, explicada en simple"
        description={`Qué publica la Municipalidad de ${commune.name} por obligación legal, qué puedes pedir tú, y en cuánto tiempo deben responderte.`}
      />

      {/* Dos caminos */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="gap-0 py-6">
          <CardContent className="px-6">
            <Badge className="mb-3 bg-brand-teal/15 text-brand-teal">
              Ya está publicado
            </Badge>
            <h2 className="text-xl font-bold text-primary">
              Transparencia Activa
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Es la información que el municipio debe publicar y mantener
              actualizada por ley, sin que nadie la pida: quiénes trabajan y
              cuánto ganan, en qué se gasta el presupuesto, qué contratos y
              compras se hicieron, qué subsidios y beneficios se entregaron.
            </p>
            {portalSource && (
              <>
                <Button asChild size="sm" className="mt-4">
                  <a
                    href={portalSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver la ficha oficial de {commune.name}
                    <ExternalLinkIcon />
                  </a>
                </Button>
                <SourceBadge source={portalSource} className="mt-3" />
              </>
            )}
          </CardContent>
        </Card>

        <Card className="gap-0 py-6">
          <CardContent className="px-6">
            <Badge className="mb-3 bg-brand-terracotta/15 text-brand-terracotta">
              Lo pides tú
            </Badge>
            <h2 className="text-xl font-bold text-primary">
              Solicitud de acceso a la información
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Si lo que buscas no está publicado, tienes derecho a pedirlo. Se
              hace en línea en el Portal de Transparencia, indicando qué
              información quieres y cómo prefieres recibirla.
            </p>
            <Button asChild size="sm" variant="outline" className="mt-4">
              <a
                href="https://www.portaltransparencia.cl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hacer una solicitud
                <ExternalLinkIcon />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Derechos y plazos */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">Lo que la ley te garantiza</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rights.map((right) => (
            <Card key={right.title} className="gap-0 py-5">
              <CardContent className="flex items-start gap-4 px-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-teal">
                  <right.icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-bold text-primary">{right.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {right.body}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {legalSource && <SourceBadge source={legalSource} className="mt-4" />}
      </section>

      <LiabilitiesPreview rows={liabilities} source={liabilitiesSource} />

      <BudgetIndexSection rows={budgetIndex} source={indexSource} />

      {/* Estados financieros publicados */}
      {reports.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">
            Las cuentas del municipio, documento por documento
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Estos son los estados financieros del ejercicio{" "}
            {reports[0].year} que la municipalidad publica en su Transparencia
            Activa. Te explicamos qué muestra cada uno y te llevamos al
            documento oficial.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <Card key={report.id} className="gap-0 py-5">
                <CardContent className="flex items-start gap-4 px-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy dark:bg-brand-sky/15 dark:text-brand-sky">
                    <FileTextIcon className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-primary">{report.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {report.summary}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Ejercicio {report.year} · informe del{" "}
                      {formatDate(report.reportDate)}
                    </p>
                    <Button asChild size="sm" variant="outline" className="mt-3">
                      <a
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abrir documento oficial
                        <ExternalLinkIcon />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {reportsSource && (
            <SourceBadge source={reportsSource} className="mt-4" />
          )}
        </section>
      )}

      <BalanceSection rows={balance} source={balanceSource} />

      {/* Presupuesto abierto */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">El presupuesto, en simple</h2>
        {budget.length === 0 ? (
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
                  ejecutado por área, con gráficos simples y comparables entre
                  períodos.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <strong className="text-foreground">
                    Todavía no podemos decir qué porcentaje del presupuesto se
                    ha ejecutado
                  </strong>
                  : esa cifra sale de leer y conciliar los informes mensuales de
                  ingresos y gastos, que por ahora publicamos como enlaces. No
                  la vamos a estimar.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </section>

      <p className="mt-12 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        {siteConfig.name} no tramita solicitudes de información ni recibe
        reclamos: te explicamos el procedimiento y te llevamos al sitio oficial
        donde se realiza. Tampoco evaluamos la gestión municipal — presentamos
        la información pública tal como la publican las instituciones
        responsables.
      </p>
    </div>
  );
}
