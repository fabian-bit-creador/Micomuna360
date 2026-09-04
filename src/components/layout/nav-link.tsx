"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Enlace de navegación que marca la sección activa para lectores de
 * pantalla (aria-current) y visualmente.
 */
export function NavLink({ href, children }: { href: string; children: string }) {
  const pathname = usePathname();
  // Exacto para el inicio de la comuna; por prefijo en las secciones.
  const segments = href.split("/").filter(Boolean);
  const isActive =
    segments.length <= 1
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className={cn(isActive && "bg-accent text-accent-foreground")}
    >
      <Link href={href} aria-current={isActive ? "page" : undefined}>
        {children}
      </Link>
    </Button>
  );
}
