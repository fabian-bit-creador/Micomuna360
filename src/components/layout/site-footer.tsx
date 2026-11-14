import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { listPublicCommunes, type CommuneConfig } from "@/config/communes";
import { communeNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

/**
 * Footer público. Con `commune` muestra la navegación de esa comuna y su
 * aviso; sin comuna (portal, nosotros) muestra las comunas publicadas.
 */
export function SiteFooter({ commune }: { commune?: CommuneConfig }) {
  const links = commune
    ? communeNav(commune)
    : listPublicCommunes().map((c) => ({ title: c.name, href: `/${c.id}` }));

  return (
    <footer className="mt-16 border-t-4 border-brand-amber">
      <div className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-12 md:grid-cols-[1fr_1.1fr_1.3fr]">
          <div className="space-y-3">
            <Logo variant="inverse" />
            <p className="max-w-xs text-sm text-brand-ivory/75">
              {siteConfig.lema}. {siteConfig.sublema}
            </p>
          </div>
          <nav className="space-y-2" aria-label="Secciones">
            <p className="font-display text-base font-bold text-white">
              {commune ? "Secciones" : "Comunas"}
            </p>
            <ul className="grid grid-cols-2 gap-1 text-sm">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-8 items-center text-brand-ivory/85 underline-offset-4 hover:text-white hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/nosotros"
                  className="inline-flex min-h-8 items-center text-brand-ivory/85 underline-offset-4 hover:text-white hover:underline"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-2 text-sm">
            <p className="font-display text-base font-bold text-white">
              {commune && !commune.isDemo ? `Sobre ${siteConfig.name}` : "Sobre la plataforma"}
            </p>
            {commune ? (
              commune.isDemo ? (
                <p className="text-brand-ivory/75">
                  {commune.name} es una comuna de ejemplo: sus datos son
                  ficticios y sirven para probar funcionalidades. Nada de lo que
                  se ingresa aquí llega a un municipio.
                </p>
              ) : (
                <p className="text-brand-ivory/75">
                  {siteConfig.name} es un sitio ciudadano independiente: no es
                  el sitio oficial de la Municipalidad de {commune.name} ni de
                  sus corporaciones. Publicamos información pública con fuente
                  y fecha de verificación, y enlazamos a los sitios oficiales
                  para cada trámite.
                </p>
              )
            ) : (
              <p className="text-brand-ivory/75">
                Plataforma ciudadana independiente y multicomuna. Publicamos
                información pública con su fuente y fecha de verificación, y
                enlazamos a los sitios oficiales para cada trámite.
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-brand-ivory/15 py-4">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 text-xs text-brand-ivory/70">
            <span>
              {siteConfig.name} · {new Date().getFullYear()}
            </span>
            {commune?.isDemo && (
              <Link
                href="/admin"
                className="hover:text-brand-ivory/90 hover:underline"
              >
                Panel municipal de ejemplo
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
