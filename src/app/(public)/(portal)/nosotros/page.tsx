import type { Metadata } from "next";
import Link from "next/link";
import {
  BuildingIcon,
  CompassIcon,
  EyeIcon,
  HandshakeIcon,
  MessageSquarePlusIcon,
  NewspaperIcon,
  ScaleIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Qué es MiComuna360, por qué existe y cuál es su compromiso con las comunidades.",
};

const roleColors: Record<string, string> = {
  teal: "border-t-brand-teal",
  sky: "border-t-brand-sky",
  terracotta: "border-t-brand-terracotta",
};

const howItWorks = [
  {
    icon: NewspaperIcon,
    chip: "bg-brand-teal/15 text-brand-teal",
    title: "Infórmate hoy",
    description:
      "Noticias, actividades, trámites explicados simple, teléfonos útiles y datos de tu comuna, ya disponibles sin registro.",
    available: true,
  },
  {
    icon: MessageSquarePlusIcon,
    chip: "bg-brand-sky/20 text-brand-navy dark:text-brand-sky",
    title: "Participa y reporta",
    description:
      "Reportes vecinales con foto, ubicación y seguimiento. Se activa en la próxima etapa del piloto.",
    available: false,
  },
  {
    icon: BuildingIcon,
    chip: "bg-brand-terracotta/15 text-brand-terracotta",
    title: "Tu municipio responde",
    description:
      "Cada reporte llegará ordenado al equipo municipal, con responsable, estado y aviso al vecino al resolverse.",
    available: false,
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Encabezado */}
      <section className="border-b bg-gradient-to-b from-accent to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <Badge variant="secondary" className="mb-4">
            Nuestro propósito
          </Badge>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            Un puente entre tu comuna y tú
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-t-4 border-t-brand-teal">
            <CardHeader>
              <div className="mb-1 flex size-11 items-center justify-center rounded-xl bg-accent text-brand-teal">
                <CompassIcon className="size-6" />
              </div>
              <CardTitle className="text-xl">Nuestra misión</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {siteConfig.mision}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-t-4 border-t-brand-sky">
            <CardHeader>
              <div className="mb-1 flex size-11 items-center justify-center rounded-xl bg-accent text-brand-sky">
                <EyeIcon className="size-6" />
              </div>
              <CardTitle className="text-xl">Nuestra visión</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {siteConfig.vision}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Historia de origen */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <SectionHeader
            eyebrow="De dónde venimos"
            title="Nació en una comuna como la tuya"
          />
          <div className="space-y-5 text-lg leading-relaxed">
            {siteConfig.historia.map((paragraph, i) => (
              <p
                key={i}
                className={cn(i === 0 && "font-semibold text-primary")}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Así funciona, en simple */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="Así funciona"
          title="En simple, paso a paso"
          description="Con total honestidad: esto es lo que ya puedes usar hoy y lo que viene en las próximas etapas del piloto."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {howItWorks.map((step, i) => (
            <Card key={step.title} className="gap-2 py-5">
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl",
                      step.chip
                    )}
                  >
                    <step.icon className="size-6" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      step.available
                        ? "bg-brand-teal/15 text-brand-teal"
                        : "bg-brand-amber/25 text-yellow-800 dark:text-brand-amber"
                    )}
                  >
                    {step.available ? "Disponible hoy" : "Próximamente"}
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  {i + 1}. {step.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-6xl border-t px-4 py-14">
        <SectionHeader
          eyebrow="Lo que nos guía"
          title="Nuestros valores, en la práctica"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.valores.map((valor) => (
            <Card key={valor.name} className="gap-2 py-5">
              <CardHeader className="gap-1">
                <CardTitle className="text-brand-teal">{valor.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {valor.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* No reemplaza al municipio */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader
            eyebrow="Cada uno en su rol"
            title="No reemplazamos a tu municipalidad"
            description={siteConfig.noReemplaza}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {siteConfig.roles.map((rol) => (
              <Card
                key={rol.name}
                className={cn("gap-2 border-t-4 py-5", roleColors[rol.color])}
              >
                <CardHeader className="gap-1">
                  <CardTitle>{rol.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {rol.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compromiso no partidista */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground md:px-14">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-ivory/10">
              <ScaleIcon className="size-7 text-brand-sky" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-ivory">
                Sin colores políticos
              </h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-brand-ivory/80">
                {siteConfig.noPartidista}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 pb-16 text-center">
        <HandshakeIcon className="mx-auto size-10 text-brand-teal" />
        <h2 className="mt-4 text-2xl font-bold md:text-3xl">
          {siteConfig.sublema}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Explora el portal de demostración y cuéntanos qué necesitaría tu
          comuna.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/">Elegir tu comuna</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/los-aromos/reportar">Ver la demo de reportes</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
