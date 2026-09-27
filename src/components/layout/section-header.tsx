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

/** Arco 360° en miniatura: firma visual de la marca como eyebrow de sección. */
function ArcMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
      <path
        d="M3.5 14.5 A9 9 0 0 1 10 3.7"
        fill="none"
        stroke="var(--brand-teal)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 3.7 A9 9 0 0 1 20.5 14.5"
        fill="none"
        stroke="var(--brand-sky)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18.5 18.5 A9 9 0 0 1 5.5 18.5"
        fill="none"
        stroke="var(--brand-terracotta)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
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
          <p className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wide text-brand-teal-ink uppercase">
            <ArcMark />
            {eyebrow}
          </p>
          <Heading className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </Heading>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-teal-ink hover:text-primary"
        >
          {action.label}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
