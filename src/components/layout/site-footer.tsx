import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            {siteConfig.lema}. {siteConfig.sublema}
          </p>
        </div>
        <nav className="space-y-2" aria-label="Secciones">
          <p className="text-sm font-semibold text-primary">Secciones</p>
          <ul className="space-y-1 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="text-sm font-semibold text-primary">Sobre el piloto</p>
          <p>
            Versión de demostración con datos ficticios de la comuna{" "}
            {siteConfig.demoComuna.name}. Ninguna solicitud ingresada aquí
            llega aún a un municipio real.
          </p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        {siteConfig.name} · {new Date().getFullYear()}
      </div>
    </footer>
  );
}
