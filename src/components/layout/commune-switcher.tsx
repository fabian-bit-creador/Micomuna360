"use client";

import Link from "next/link";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface CommuneOption {
  id: string;
  name: string;
  isDemo: boolean;
}

/**
 * Comuna actual, siempre visible en la cabecera (también en el celular). Al
 * tocarla se puede cambiar de comuna. La comuna de ejemplo lo indica.
 */
export function CommuneSwitcher({
  current,
  communes,
}: {
  current: CommuneOption;
  communes: CommuneOption[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Comuna: ${current.name}${current.isDemo ? " (ejemplo con datos ficticios)" : ""}. Cambiar comuna`}
        className={cn(
          "inline-flex min-h-9 min-w-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold whitespace-nowrap outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          current.isDemo
            ? "bg-brand-amber/20 text-brand-amber-ink hover:bg-brand-amber/30"
            : "bg-brand-teal/15 text-brand-teal-ink hover:bg-brand-teal/25"
        )}
      >
        <span className="truncate">{current.name}</span>
        {current.isDemo && (
          <>
            <span aria-hidden="true">·</span>
            <span>ejemplo</span>
          </>
        )}
        <ChevronDownIcon aria-hidden="true" className="size-3.5 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuLabel>Cambiar comuna</DropdownMenuLabel>
        {communes.map((c) => (
          <DropdownMenuItem key={c.id} asChild>
            <Link
              href={`/${c.id}`}
              aria-current={c.id === current.id ? "page" : undefined}
              className="flex items-center justify-between gap-2"
            >
              <span>{c.name}</span>
              {c.id === current.id && (
                <CheckIcon aria-hidden="true" className="size-4" />
              )}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Ver todas las comunas</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
