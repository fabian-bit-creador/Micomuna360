import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listPublicCommunes } from "@/config/communes";
import { siteConfig } from "@/config/site";
import { portalMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...portalMetadata({
    path: "/",
    title: "MiComuna360 — Tu comuna en un solo lugar",
    description:
      "Plataforma ciudadana multicomuna: información útil de tu comuna, con fuentes verificadas y lenguaje simple.",
  }),
  title: { absolute: "MiComuna360 — Tu comuna en un solo lugar" },
};

export default function PortalPage() {
  const communes = listPublicCommunes();

  return (
    <>
      {/* Hero del portal */}
      <section className="border-b bg-gradient-to-b from-accent to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Tu comuna en <span className="text-brand-teal-ink">un solo lugar</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            {siteConfig.sublema} Una plataforma ciudadana, independiente y sin
            colores políticos, que reúne la información útil de cada comuna.
          </p>
        </div>
      </section>

      {/* Selector de comunas */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Elige tu comuna
        </h2>
        <div
          className={
            communes.length > 1
              ? "mt-8 grid gap-4 md:grid-cols-2"
              : "mx-auto mt-8 grid max-w-md gap-4"
          }
        >
          {communes.map((commune) => (
            <Link
              key={commune.id}
              href={`/${commune.id}`}
              className="group block h-full"
            >
              <Card className="h-full gap-2 py-6 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardHeader className="gap-2">
                  <Badge
                    variant="secondary"
                    className={
                      commune.isDemo
                        ? "w-fit bg-brand-teal/15 text-brand-teal-ink"
                        : "w-fit bg-brand-terracotta/15 text-brand-terracotta-ink"
                    }
                  >
                    {commune.isDemo
                      ? "Datos ficticios"
                      : "Información pública verificada"}
                  </Badge>
                  <CardTitle className="flex items-center justify-between text-2xl text-primary">
                    {commune.name}
                    <ArrowRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    {commune.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {commune.region}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          ¿Quieres ver MiComuna360 en tu comuna?{" "}
          <Link
            href="/nosotros"
            className="font-semibold text-brand-teal-ink hover:underline"
          >
            Conoce el proyecto
          </Link>
        </p>
      </section>
    </>
  );
}
