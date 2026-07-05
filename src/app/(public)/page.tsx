import Link from "next/link";
import {
  BarChart3Icon,
  MapIcon,
  MegaphoneIcon,
  MessageSquarePlusIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const accesos = [
  {
    title: "Reportar un problema",
    description:
      "Envía solicitudes y reportes vecinales con seguimiento: baches, luminarias, basura, seguridad y más.",
    href: "/reportar",
    icon: MessageSquarePlusIcon,
  },
  {
    title: "Mapa comunal",
    description:
      "Visualiza problemas y oportunidades de tu comuna en un mapa territorial interactivo.",
    href: "/mapa",
    icon: MapIcon,
  },
  {
    title: "Noticias y beneficios",
    description:
      "Accede a noticias, talleres, beneficios y postulaciones en un solo lugar.",
    href: "/noticias",
    icon: MegaphoneIcon,
  },
  {
    title: "Datos de tu comuna",
    description:
      "Revisa indicadores y avances de la comuna de manera simple y visual.",
    href: "/datos",
    icon: BarChart3Icon,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-accent to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
          <Badge variant="secondary" className="mb-4">
            Piloto con datos de demostración
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Tu comuna en{" "}
            <span className="text-brand-teal">un solo lugar</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Conecta, participa y transforma tu entorno con una plataforma que
            reúne información, solicitudes, noticias, datos y gestión comunal
            en una experiencia simple y cercana.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/reportar">Reportar un problema</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/mapa">Explorar el mapa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          ¿Qué puedes hacer aquí?
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {accesos.map((acceso) => (
            <Link key={acceso.href} href={acceso.href} className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-accent text-brand-teal">
                    <acceso.icon className="size-6" />
                  </div>
                  <CardTitle className="text-primary">
                    {acceso.title}
                  </CardTitle>
                  <CardDescription>{acceso.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Por qué existe */}
      <section className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            ¿Por qué existe {siteConfig.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            {siteConfig.porQueExiste}
          </p>
        </div>
      </section>
    </>
  );
}
