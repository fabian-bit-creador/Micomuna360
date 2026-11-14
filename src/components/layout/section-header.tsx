import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import {
  SectionIcon,
  type SectionIconName,
} from "@/components/shared/section-icon";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Enlace "ver todo" opcional a la derecha. */
  action?: { label: string; href: string };
  className?: string;
  /** "h1" cuando el encabezado es el título de la página. */
  level?: "h1" | "h2";
  /** Ícono de sección en relieve, a la izquierda del título. */
  icon?: SectionIconName;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  level = "h2",
  icon,
}: SectionHeaderProps) {
  const Heading = level;
  return (
    <div
      className={cn(
        "mb-8 flex flex-wrap items-end justify-between gap-4",
        className
      )}
    >
      <div className={cn("max-w-2xl", icon && "flex items-start gap-4")}>
        {icon && <SectionIcon name={icon} className="mt-1 sm:size-16" />}
        <div>
          {/* Rótulo corto con la marca amarilla de la señalética. */}
          <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span
              aria-hidden="true"
              className="h-3 w-1.5 shrink-0 rounded-[1px] bg-brand-amber"
            />
            {eyebrow}
          </p>
          <Heading className="text-[1.7rem] leading-[1.12] font-bold md:text-4xl">
            {title}
          </Heading>
          {description && (
            <p className="mt-2.5 text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-brand-teal-ink underline-offset-4 hover:underline"
        >
          {action.label}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
