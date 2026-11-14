import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { portalMetadata } from "@/lib/seo";

export const metadata: Metadata = portalMetadata({
  path: "/nosotros",
  title: "Nosotros",
  description:
    "Qué es MiComuna360, por qué existe y cuál es su compromiso con las comunidades.",
});

/* Las reglas con que se publica cada dato (ver AGENTS.md, «Convenciones»). */
const howWeWork = [
  {
    title: "Cada dato con su fuente y su fecha",
    description:
      "Junto a cada trámite, teléfono, lugar o cifra está la institución que lo publicó y el día en que lo revisamos. Si esa revisión vence, el dato lo dice.",
  },
  {
    title: "Lo que no está confirmado no se publica",
    description:
      "Un horario, un teléfono o una cifra aparecen solo cuando una fuente oficial los confirma. Preferimos un espacio vacío a un dato aproximado.",
  },
  {
    title: "Sin cuenta, sin RUT, sin datos personales",
    description:
      "No pedimos registro. Lo que marcas en el orientador de beneficios o tu ubicación en el mapa se procesa en tu teléfono: no se guarda ni se envía.",
  },
  {
    title: "Independiente del municipio",
    description:
      "No somos el sitio oficial de ninguna municipalidad. Para hacer un trámite te llevamos al sitio de la institución responsable.",
  },
  {
    title: "Contexto, no notas",
    description:
      "Las cifras de una comuna se muestran con su historia y con el promedio de la región. No ponemos notas ni armamos listas de mejores y peores comunas.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Encabezado */}
      <section className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 md:pt-16 md:pb-16">
          <p className="text-sm font-semibold text-brand-ivory/80">
            Qué es {siteConfig.name}
          </p>
          <h1 className="mt-2 max-w-3xl text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.98] font-extrabold tracking-[-0.02em] text-white [font-stretch:80%]">
            Un puente entre tu comuna y tú
          </h1>
          <span
            aria-hidden="true"
            className="mt-6 block h-1.5 w-16 bg-brand-amber"
          />
          <p className="mt-6 max-w-2xl text-lg text-brand-ivory/90">
            {siteConfig.description}
          </p>
        </div>
      </section>

      {/* Historia de origen */}
      <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <SectionHeader
            className="mb-0 self-start"
            eyebrow="De dónde venimos"
            title="Nació en una comuna como la tuya"
          />
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
            {siteConfig.historia.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display text-2xl leading-snug font-semibold text-primary"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section
        id="como-trabajamos"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-14 md:pt-20"
      >
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <SectionHeader
            className="mb-0 self-start"
            eyebrow="Cómo trabajamos"
            title="Las reglas con que publicamos"
          />
          <dl className="max-w-2xl divide-y border-y">
            {howWeWork.map((rule) => (
              <div key={rule.title} className="py-4">
                <dt className="font-display text-lg font-bold text-primary">
                  {rule.title}
                </dt>
                <dd className="mt-1 text-muted-foreground">
                  {rule.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* No reemplaza al municipio */}
      <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <SectionHeader
            className="mb-0 self-start"
            eyebrow="Cada uno en su rol"
            title="No reemplazamos a tu municipalidad"
          />
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed">{siteConfig.noReemplaza}</p>
            <dl className="mt-6 divide-y border-y">
              {siteConfig.roles.map((rol) => (
                <div
                  key={rol.name}
                  className="grid gap-x-6 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]"
                >
                  <dt className="font-semibold text-primary">{rol.name}</dt>
                  <dd className="text-muted-foreground">{rol.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Misión, visión y valores */}
      <section className="mx-auto max-w-6xl px-4 pt-14 md:pt-20">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <SectionHeader
            className="mb-0 self-start"
            eyebrow="Lo que nos guía"
            title="Misión, visión y valores"
          />
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold">Nuestra misión</h3>
            <p className="mt-1 leading-relaxed">{siteConfig.mision}</p>
            <h3 className="mt-6 text-lg font-bold">Nuestra visión</h3>
            <p className="mt-1 leading-relaxed">{siteConfig.vision}</p>
            <h3 className="mt-6 text-lg font-bold">Nuestros valores</h3>
            <dl className="mt-2 grid gap-x-8 sm:grid-cols-2">
              {siteConfig.valores.map((valor) => (
                <div key={valor.name} className="border-t py-3">
                  <dt className="font-semibold text-primary">{valor.name}</dt>
                  <dd className="mt-0.5 text-sm text-muted-foreground">
                    {valor.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <Button size="lg" asChild>
          <Link href="/">
            Elegir tu comuna
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </>
  );
}
