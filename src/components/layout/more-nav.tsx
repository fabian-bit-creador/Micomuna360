"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  navLinkActiveClass,
  navLinkClass,
} from "@/components/layout/nav-link";
import type { NavItem } from "@/config/nav";
import { cn } from "@/lib/utils";

/** Menú «Más» de la barra de escritorio, con las secciones que no caben. */
export function MoreNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const active = items.some(
    (i) => pathname === i.href || pathname.startsWith(`${i.href}/`)
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          navLinkClass,
          "cursor-pointer gap-1",
          active && navLinkActiveClass
        )}
      >
        Más
        <ChevronDownIcon aria-hidden="true" className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {items.map((item) => {
          const current =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="flex flex-col items-start gap-0"
              >
                <span className="font-semibold">{item.title}</span>
                {item.description && (
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                )}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
