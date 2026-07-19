import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CheckIcon,
  ClockIcon,
  CircleDollarSignIcon,
  MapPinIcon,
  CalendarClockIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCommune, listCommunes } from "@/config/communes";
import { getProcedures, getProcedureBySlug } from "@/lib/repositories";

export async function generateStaticParams() {
  const all: { comuna: string; slug: string }[] = [];
  for (const commune of listCommunes()) {
    const procedures = await getProcedures(commune.id);
    for (const procedure of procedures) {
      all.push({ comuna: commune.id, slug: procedure.slug });
    }
  }
  return all;
}

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]/tramites/[slug]">): Promise<Metadata> {
  const { comuna, slug } = await params;
  const procedure = await getProcedureBySlug(comuna, slug);
  if (!procedure) return { title: "Trámite no encontrado" };
  return { title: procedure.title, description: procedure.summary };
}

export default async function TramiteDetallePage({
  params,
}: PageProps<"/[comuna]/tramites/[slug]">) {
  const { comuna, slug } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  const procedure = await getProcedureBySlug(commune.id, slug);
  if (!procedure) notFound();

  const facts = [
    { icon: CircleDollarSignIcon, label: "Costo", value: procedure.cost },
    { icon: ClockIcon, label: "Plazo", value: procedure.duration },
    { icon: MapPinIcon, label: "Dónde", value: procedure.place },
    { icon: CalendarClockIcon, label: "Horario", value: procedure.schedule },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href={`/${commune.id}/tramites`}
        className="mb-6 flex w-fit items-center gap-1 text-sm font-semibold text-brand-teal hover:text-primary"
      >
        <ArrowLeftIcon className="size-4" />
        Volver a trámites
      </Link>

      <Badge variant="secondary" className="mb-3 flex w-fit">
        Guía ciudadana · demo
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {procedure.title}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{procedure.summary}</p>

      <Card className="mt-8 py-4">
        <CardContent className="grid gap-4 px-4 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-brand-teal">
                <fact.icon className="size-4.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  {fact.label}
                </p>
                <p className="text-sm font-medium">{fact.value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Qué necesitas</h2>
        <ul className="mt-4 space-y-2">
          {procedure.requirements.map((req) => (
            <li key={req} className="flex items-start gap-2.5">
              <CheckIcon className="mt-0.5 size-4.5 shrink-0 text-brand-teal" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Paso a paso</h2>
        <ol className="mt-4 space-y-4">
          {procedure.steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Guía de demostración con información general de referencia. Confirma
        siempre requisitos y valores vigentes con tu municipalidad.
      </p>
    </div>
  );
}
