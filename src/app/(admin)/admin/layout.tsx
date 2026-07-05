import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminNav } from "@/config/nav";

/**
 * Layout de la capa municipal.
 *
 * En el MVP el acceso es abierto y los roles se simulan. En la Fase 3 este
 * layout incorporará verificación de sesión y rol (funcionario/admin).
 */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-primary text-primary-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Logo iconOnly className="rounded-full bg-brand-ivory p-0.5" />
            <span className="font-bold">Panel municipal</span>
            <Badge className="bg-brand-amber text-brand-navy">Demo</Badge>
          </div>
          <nav className="flex items-center gap-1" aria-label="Panel">
            {adminNav.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <Link href="/">← Sitio ciudadano</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </>
  );
}
