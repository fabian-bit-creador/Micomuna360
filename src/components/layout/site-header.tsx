import Link from "next/link";

import { CommuneSwitcher } from "@/components/layout/commune-switcher";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MoreNav } from "@/components/layout/more-nav";
import { NavLink } from "@/components/layout/nav-link";
import { SkipLink } from "@/components/layout/skip-link";
import { Button } from "@/components/ui/button";
import { listPublicCommunes, type CommuneConfig } from "@/config/communes";
import { communeNav, reportHref, splitNav } from "@/config/nav";

export function SiteHeader({ commune }: { commune: CommuneConfig }) {
  const { visible, more } = splitNav(communeNav(commune));
  const report = reportHref(commune);
  const option = (c: CommuneConfig) => ({
    id: c.id,
    name: c.name,
    isDemo: c.isDemo,
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <SkipLink />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Logo href={`/${commune.id}`} compactOnMobile />
          <CommuneSwitcher
            current={option(commune)}
            communes={listPublicCommunes().map(option)}
          />
        </div>
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Principal"
        >
          {visible.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.title}
            </NavLink>
          ))}
          <MoreNav
            items={[
              ...more,
              {
                title: "Nosotros",
                href: "/nosotros",
                description: "Qué es MiComuna360",
              },
            ]}
          />
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
