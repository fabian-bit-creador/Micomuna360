import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { WaveDivider } from "@/components/layout/wave-divider";
import { listCommunes, type CommuneConfig } from "@/config/communes";
import { communeNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

/**
 * Footer público. Con `commune` muestra la navegación de esa comuna y su
 * aviso (demo o piloto); sin comuna (portal, nosotros) muestra las comunas.
 */
export function SiteFooter({ commune }: { commune?: CommuneConfig }) {
  const links = commune
    ? communeNav(commune)
    : listCommunes().map((c) => ({
        title: `${c.name} (${c.isDemo ? "demo" : "piloto"})`,
        href: `/${c.id}`,
      }));

  return (
    <footer>
      <WaveDivider variant="navy" />
      <div className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-4 pb-12 md:grid-cols-3">
          <div className="space-y-3">
            <Logo variant="inverse" />
            <p className="max-w-xs text-sm text-brand-ivory/70">
              {siteConfig.lema}. {siteConfig.sublema}
            </p>
          </div>
          <nav className="space-y-2" aria-label="Secciones">
            <p className="text-sm font-bold tracking-wide text-brand-sky uppercase">
              {commune ? "Secciones" : "Comunas"}
            </p>
            <ul className="grid grid-cols-2 gap-1 text-sm">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-brand-ivory/80 hover:text-brand-ivory hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/nosotros"
                  className="text-brand-ivory/80 hover:text-brand-ivory hover:underline"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-2 text-sm">
            <p className="text-sm font-bold tracking-wide text-brand-sky uppercase">
              {commune && !commune.isDemo ? "Sobre este piloto" : "Sobre la plataforma"}
            </p>
            {commune ? (
              commune.isDemo ? (
                <p className="text-brand-ivory/70">
                  Versión de demostración con datos ficticios de la comuna{" "}
                  {commune.name}. Ninguna solicitud ingresada aquí llega aún a
                  un municipio real.
                </p>
              ) : (
                <p className="text-brand-ivory/70">
                  {siteConfig.name} es un sitio ciudadano independiente: no es
                  el sitio oficial de la Municipalidad de {commune.name} ni de
                  sus corporaciones. Publicamos información pública con fuente
                  y fecha de verificación, y enlazamos a los sitios oficiales
                  para cada trámite.
                </p>
              )
            ) : (
              <p className="text-brand-ivory/70">
                Plataforma ciudadana independiente y multicomuna. Cada comuna
                indica si su contenido es demostrativo o información pública
                verificada.
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-brand-ivory/15 py-4">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 text-xs text-brand-ivory/60">
            <span>
              {siteConfig.name} · {new Date().getFullYear()}
            </span>
            <Link
              href="/admin"
              className="hover:text-brand-ivory/90 hover:underline"
            >
              Acceso municipal (demo)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
