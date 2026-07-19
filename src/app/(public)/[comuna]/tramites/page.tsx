import type { Metadata } from "next";
import Link from "next/link";
import {
  ClockIcon,
  CircleDollarSignIcon,
  ChevronRightIcon,
} from "lucide-react";

import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProcedures } from "@/lib/repositories";
import type { ProcedureCategory } from "@/types";

export const metadata: Metadata = {
  title: "Trámites y beneficios",
  description:
    "Guías simples, paso a paso, de los trámites y beneficios municipales.",
};

const categoryLabels: Record<ProcedureCategory, string> = {
  certificados: "Certificados",
  beneficios: "Beneficios",
  permisos: "Permisos",
  social: "Apoyo social",
};

export default async function TramitesPage({
  params,
}: PageProps<"/[comuna]/tramites">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.procedures) {
    return <FeatureUnavailable commune={commune} title="Trámites y beneficios" />;
  }

  const procedures = await getProcedures(commune.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        eyebrow="Sin vueltas"
        title="Trámites y beneficios, explicados simple"
        description="Qué necesitas, cuánto cuesta y dónde ir. Guías paso a paso escritas para personas, no para expedientes."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {procedures.map((procedure) => (
          <Link
            key={procedure.id}
            href={`/${commune.id}/tramites/${procedure.slug}`}
            className="group block h-full"
          >
            <Card className="h-full gap-3 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
              <CardHeader className="gap-2">
                <Badge variant="outline" className="text-brand-teal">
                  {categoryLabels[procedure.category]}
                </Badge>
                <CardTitle className="flex items-start justify-between gap-2 text-lg leading-snug text-primary">
                  {procedure.title}
                  <ChevronRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription>{procedure.summary}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CircleDollarSignIcon className="size-3.5" />
                  {procedure.cost}
                </span>
                <span className="inline-flex items-center gap-1">
                  <ClockIcon className="size-3.5" />
                  {procedure.duration}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Guías de demostración con requisitos generales de referencia. En la
        versión piloto, cada municipio publica sus propios requisitos, valores
        y horarios oficiales.
      </p>
    </div>
  );
}
