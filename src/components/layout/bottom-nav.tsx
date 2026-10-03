"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileTextIcon,
  GiftIcon,
  HouseIcon,
  MapIcon,
  PhoneIcon,
  type LucideIcon,
} from "lucide-react";

import type { NavItem } from "@/config/nav";
import { cn } from "@/lib/utils";

/* Las cinco tareas más frecuentes, con nombre corto para que quepan. */
const shortcuts: { suffix: string; label: string; Icon: LucideIcon }[] = [
  { suffix: "", label: "Inicio", Icon: HouseIcon },
  { suffix: "/servicios", label: "Trámites", Icon: FileTextIcon },
  { suffix: "/beneficios", label: "Beneficios", Icon: GiftIcon },
  { suffix: "/mapa", label: "Mapa", Icon: MapIcon },
  { suffix: "/telefonos", label: "Teléfonos", Icon: PhoneIcon },
];

/**
 * Barra inferior en el celular, al alcance del pulgar. Solo muestra las
 * secciones que la comuna tiene activas (llegan en `nav`).
 */
export function BottomNav({ base, nav }: { base: string; nav: NavItem[] }) {
  const pathname = usePathname();
  const hrefs = new Set(nav.map((item) => item.href));
  const items = shortcuts.filter((s) => hrefs.has(`${base}${s.suffix}`));
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Accesos rápidos"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto flex max-w-md">
        {items.map(({ suffix, label, Icon }) => {
          const href = `${base}${suffix}`;
          const current = suffix === "" ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold",
                  current ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon
                  aria-hidden="true"
                  className={cn("size-5", current && "text-brand-teal-ink")}
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
