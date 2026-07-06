import Link from "next/link";
import {
  ArrowRightIcon,
  BarChart3Icon,
  CalendarDaysIcon,
  FileTextIcon,
  MegaphoneIcon,
  MessageSquarePlusIcon,
  PhoneCallIcon,
} from "lucide-react";

import { RingMeter } from "@/components/data/ring-meter";
import { StatTile } from "@/components/data/stat-tile";
import { EventCard } from "@/components/events/event-card";
import { SectionHeader } from "@/components/layout/section-header";
import { NewsCard } from "@/components/news/news-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import {
  getIndicators,
  getLatestNews,
  getUpcomingEvents,
} from "@/lib/repositories";
import { cn } from "@/lib/utils";

const accesos = [
  {
    title: "Teléfonos útiles",
    description: "Emergencias y servicios, a un toque.",
    href: "/telefonos",
    icon: PhoneCallIcon,
  },
  {
    title: "Trámites y beneficios",
    description: "Guías paso a paso, sin letra chica.",
    href: "/tramites",
    icon: FileTextIcon,
  },
  {
    title: "Actividades",
    description: "Talleres, deportes y encuentros.",
    href: "/actividades",
    icon: CalendarDaysIcon,
  },
  {
    title: "Noticias",
    description: "Anuncios y beneficios al día.",
    href: "/noticias",
    icon: MegaphoneIcon,
  },
  {
    title: "Datos comunales",
    description: "Tu comuna en cifras simples.",
    href: "/datos",
    icon: BarChart3Icon,
  },
  {
    title: "Reportar un problema",
    description: "Tu reporte, con seguimiento.",
    href: "/reportar",
    icon: MessageSquarePlusIcon,
  },
];

/** Arco 360° decorativo del hero (firma de marca). */
function HeroArc() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="pointer-events-none absolute top-1/2 -right-24 hidden w-[26rem] -translate-y-1/2 lg:block xl:-right-8"
      aria-hidden="true"
    >
      <path
        d="M60 260 A150 150 0 0 1 170 55"
        fill="none"
        stroke="var(--brand-teal)"
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.16"
      />
      <path
        d="M230 55 A150 150 0 0 1 340 260"
        fill="none"
        stroke="var(--brand-sky)"
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M310 310 A150 150 0 0 1 90 310"
        fill="none"
        stroke="var(--brand-terracotta)"
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.14"
      />
      <circle cx="200" cy="200" r="10" fill="var(--brand-teal)" opacity="0.25" />
    </svg>
  );
}

export default async function HomePage() {
  const [news, events, indicators] = await Promise.all([
    getLatestNews(3),
    getUpcomingEvents(4),
    getIndicators(),
  ]);
  const byId = (id: string) => indicators.find((i) => i.id === id);
  const resolved = byId("ind-4");
  const pulseTiles = [byId("ind-1"), byId("ind-8"), byId("ind-7")].filter(
    (i) => i !== undefined
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent to-background">
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <HeroArc />
          <div className="relative max-w-2xl">
            <Badge variant="secondary" className="mb-4">
              Portal ciudadano · piloto con datos de demostración
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Tu comuna en <span className="text-brand-teal">un solo lugar</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Teléfonos que sirven, trámites explicados simple, actividades
              gratuitas, noticias y datos de tu comuna. Sin filas, sin claves,
              sin letra chica.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/reportar">
                  <MessageSquarePlusIcon />
                  Reportar un problema
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/telefonos">
                  <PhoneCallIcon />
                  Teléfonos útiles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="Para tu día a día"
          title="¿Qué necesitas hoy?"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accesos.map((acceso) => (
            <Link key={acceso.href} href={acceso.href} className="group">
              <Card className="h-full gap-0 py-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardContent className="flex items-center gap-4 px-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-teal transition-colors group-hover:bg-brand-teal group-hover:text-white">
                    <acceso.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{acceso.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {acceso.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Pulso comunal */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <SectionHeader
            eyebrow="Pulso comunal"
            title="La comuna en movimiento"
            description="Una muestra de cómo se verá la gestión con datos reales."
            action={{ label: "Ver todos los datos", href: "/datos" }}
          />
          <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr]">
            {resolved && (
              <RingMeter
                value={resolved.value}
                label={resolved.name}
                detail={resolved.period}
                className="lg:pr-8"
              />
            )}
            <div className="grid gap-4 sm:grid-cols-3">
              {pulseTiles.map((indicator) => (
                <StatTile
                  key={indicator.id}
                  label={indicator.name}
                  value={indicator.value}
                  unit={indicator.unit}
                  detail={indicator.period}
                  className="border-0 bg-background shadow-none"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Noticias */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="Al día"
          title="Últimas noticias"
          action={{ label: "Ver todas", href: "/noticias" }}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Actividades */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <SectionHeader
          eyebrow="Agenda comunal"
          title="Próximas actividades"
          action={{ label: "Ver agenda completa", href: "/actividades" }}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Por qué existe */}
      <section className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Nuestro propósito"
                title={`¿Por qué existe ${siteConfig.name}?`}
                className="mb-4"
              />
              <p className="text-lg leading-relaxed text-muted-foreground">
                Las oportunidades de tu comuna existen: el taller, el
                subsidio, la hora médica, el fondo concursable. Pero no
                siempre llegan a tiempo, ni de forma clara, ni a quienes más
                las necesitan.{" "}
                <span className="font-semibold text-foreground">
                  {siteConfig.name} existe para cerrar esa brecha
                </span>
                : que la información de tu comuna te encuentre a ti, y no al
                revés.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {siteConfig.noReemplaza}
              </p>
              <Button variant="outline" className="mt-6" asChild>
                <Link href="/nosotros">
                  Conoce nuestra historia
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
            <div className="grid gap-3">
              {siteConfig.roles.map((rol) => (
                <div
                  key={rol.name}
                  className={cn(
                    "rounded-xl border border-l-4 bg-background p-5",
                    roleBorders[rol.color]
                  )}
                >
                  <h3 className="font-bold text-primary">{rol.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {rol.description}
                  </p>
                </div>
              ))}
              <p className="px-1 pt-2 text-sm text-muted-foreground">
                Sin colores políticos: una herramienta al servicio de las
                personas y los territorios.{" "}
                <Link
                  href="/nosotros"
                  className="font-semibold text-brand-teal hover:underline"
                >
                  Lee nuestro compromiso
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="font-display text-2xl font-bold text-primary md:text-3xl">
          {siteConfig.sublema}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Este piloto usa datos ficticios de la comuna demo{" "}
          {siteConfig.demoComuna.name}. ¿Te gustaría verlo con los datos de tu
          comuna?
        </p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/nosotros">Conoce el proyecto</Link>
        </Button>
      </section>
    </>
  );
}

const roleBorders: Record<string, string> = {
  teal: "border-l-brand-teal",
  sky: "border-l-brand-sky",
  terracotta: "border-l-brand-terracotta",
};
