"use client";

import Link from "next/link";
import { HouseIcon, MenuIcon, SearchIcon } from "lucide-react";

import { SectionIcon } from "@/components/shared/section-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CommuneConfig } from "@/config/communes";
import { communeNav } from "@/config/nav";

/* Cada sección con su ícono: ayuda a quien lee poco a reconocerla. */
export function MobileNav({ commune }: { commune: CommuneConfig }) {
  const nav = communeNav(commune);
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Abrir menú">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="max-h-[calc(100dvh-5rem)] w-72 overflow-y-auto"
        >
          {nav.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="flex min-h-11 items-center gap-3 font-semibold"
              >
                {item.icon ? (
                  <SectionIcon
                    name={item.icon}
                    className="size-9 rounded-lg"
                  />
                ) : (
                  /* Inicio y Buscar no tienen ilustración: ícono de trazo. */
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-white text-brand-navy"
                  >
                    {item.href.endsWith("/buscar") ? (
                      <SearchIcon className="size-4.5" />
                    ) : (
                      <HouseIcon className="size-4.5" />
                    )}
                  </span>
                )}
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/nosotros" className="min-h-11">
              Nosotros
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/" className="min-h-11">
              Cambiar comuna
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
