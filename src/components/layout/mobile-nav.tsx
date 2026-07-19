"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

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
        <DropdownMenuContent align="end" className="w-52">
          {nav.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/nosotros">Nosotros</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">Cambiar comuna</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
