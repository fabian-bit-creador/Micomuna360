import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { CommuneSilhouette } from "@/components/shared/commune-silhouette";
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

const principles = [
  {
    title: "Cada dato con su fuente",
    description:
      "La institución que lo publicó y la fecha en que lo revisamos, junto al dato.",
  },
  {
    title: "Sin cuenta ni datos personales",
    description:
      "No pedimos registro, RUT ni clave para buscar, llamar o ubicarte en el mapa.",
  },
  {
    title: "Independiente",
    description:
      "No es el sitio de ninguna municipalidad: cada trámite te lleva a su sitio oficial.",
  },
];

export default function PortalPage() {
  const communes = listPublicCommunes();

  return (
    <>
      {/* Placa del portal: el lema y, al lado, las comunas publicadas */}
      <section className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto grid max-w-6xl items-center gap-x-14 gap-y-10 px-4 pt-10 pb-12 md:pt-16 md:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div>
            <p className="text-sm font-semibold text-brand-ivory/80">
              {siteConfig.name}
            </p>
            <h1 className="mt-2 text-[clamp(2.7rem,10vw,5.5rem)] leading-[0.94] font-extrabold tracking-[-0.02em] text-white [font-stretch:76%]">
              Tu comuna en un solo lugar
            </h1>
            <span
              aria-hidden="true"
              className="mt-6 block h-1.5 w-16 bg-brand-amber"
            />
            <p className="mt-6 max-w-xl text-lg text-brand-ivory/90">
              Trámites, beneficios, teléfonos, lugares y cifras de cada
              comuna, reunidos por una plataforma ciudadana e independiente.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Elige tu comuna</h2>
            <ul className="mt-3 grid gap-2">
              {communes.map((commune) => (
                <li key={commune.id}>
                  <Link
                    href={`/${commune.id}`}
                    className="group flex items-center gap-4 rounded-lg bg-card px-4 py-4 text-card-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-white/70"
                  >
                    <CommuneSilhouette communeId={commune.id} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-2xl leading-tight font-extrabold text-primary group-hover:underline group-hover:underline-offset-4">
                        {commune.name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {commune.region}
                        {commune.isDemo ? " · datos ficticios" : ""}
                      </span>
                    </span>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-brand-ivory/80">
              ¿Quieres ver {siteConfig.name} en tu comuna?{" "}
              <Link
                href="/nosotros"
                className="font-semibold text-white underline underline-offset-4"
              >
                Conoce el proyecto
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Cómo se publica */}
      <section className="mx-auto max-w-6xl px-4 pt-12 md:pt-16">
        <h2 className="sr-only">Cómo trabajamos</h2>
        <dl className="grid gap-x-10 md:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="border-t-2 border-primary py-4">
              <dt className="font-display text-lg font-bold text-primary">
                {item.title}
              </dt>
              <dd className="mt-1 text-muted-foreground">{item.description}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/nosotros#como-trabajamos"
          className="mt-2 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-brand-teal-ink underline-offset-4 hover:underline"
        >
          Las reglas con que publicamos
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </Link>
      </section>
    </>
  );
}
