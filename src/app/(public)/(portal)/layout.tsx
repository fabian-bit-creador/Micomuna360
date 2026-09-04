import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipLink } from "@/components/layout/skip-link";
import { Button } from "@/components/ui/button";

/** Chrome del nivel plataforma: portal de comunas y páginas de propósito. */
export default function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
        <SkipLink />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Logo />
          <nav className="flex items-center gap-1" aria-label="Principal">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">Comunas</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/nosotros">Nosotros</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
