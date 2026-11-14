"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/** Enlace de la barra de escritorio: la sección activa lleva la marca amarilla. */
export const navLinkClass =
  "relative inline-flex items-center px-3 text-sm font-semibold text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:bg-transparent hover:after:bg-border";
export const navLinkActiveClass =
  "font-bold text-primary after:bg-brand-amber hover:after:bg-brand-amber";

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
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(navLinkClass, isActive && navLinkActiveClass)}
    >
      {children}
    </Link>
  );
}
