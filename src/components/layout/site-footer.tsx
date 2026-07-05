import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { WaveDivider } from "@/components/layout/wave-divider";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
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
              Secciones
            </p>
            <ul className="grid grid-cols-2 gap-1 text-sm">
              {mainNav.map((item) => (
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
                  href="/reportar"
                  className="text-brand-ivory/80 hover:text-brand-ivory hover:underline"
                >
                  Reportar
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-2 text-sm">
            <p className="text-sm font-bold tracking-wide text-brand-sky uppercase">
              Sobre el piloto
            </p>
            <p className="text-brand-ivory/70">
              Versión de demostración con datos ficticios de la comuna{" "}
              {siteConfig.demoComuna.name}. Ninguna solicitud ingresada aquí
              llega aún a un municipio real.
            </p>
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
