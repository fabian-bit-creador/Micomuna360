import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/config/nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Logo />
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Principal"
        >
          {mainNav.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
          <Button size="sm" className="ml-2" asChild>
            <Link href="/reportar">Reportar</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <Button size="sm" asChild>
            <Link href="/reportar">Reportar</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
