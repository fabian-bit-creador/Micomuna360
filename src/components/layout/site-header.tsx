import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CommuneConfig } from "@/config/communes";
import { communeNav, reportHref } from "@/config/nav";

export function SiteHeader({ commune }: { commune: CommuneConfig }) {
  const nav = communeNav(commune);
  const report = reportHref(commune);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Logo href={`/${commune.id}`} />
          <Badge
            variant="secondary"
            className={
              commune.isDemo
                ? "hidden bg-brand-teal/15 text-brand-teal sm:inline-flex"
                : "hidden bg-brand-terracotta/15 text-brand-terracotta sm:inline-flex"
            }
          >
            {commune.name} · {commune.isDemo ? "demo" : "piloto"}
          </Badge>
        </div>
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Principal"
        >
          {nav.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/nosotros">Nosotros</Link>
          </Button>
          {report && (
            <Button size="sm" className="ml-2" asChild>
              <Link href={report}>Reportar</Link>
            </Button>
          )}
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          {report && (
            <Button size="sm" asChild>
              <Link href={report}>Reportar</Link>
            </Button>
          )}
          <MobileNav commune={commune} />
        </div>
      </div>
    </header>
  );
}
