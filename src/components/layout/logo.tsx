import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Muestra solo el isotipo, sin el nombre. */
  iconOnly?: boolean;
  /** Sobre fondos oscuros (footer, panel) usa el wordmark claro. */
  variant?: "default" | "inverse";
}

/** Logo de MiComuna360: isotipo (círculo 360° + pin) y wordmark. */
export function Logo({
  className,
  iconOnly = false,
  variant = "default",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2", className)}
      aria-label="MiComuna360 — Inicio"
    >
      <Image
        src="/isotipo.svg"
        alt=""
        width={36}
        height={36}
        priority
        className={cn(
          "size-9",
          variant === "inverse" && "rounded-full bg-brand-ivory p-0.5"
        )}
      />
      {!iconOnly && (
        <span className="font-display text-xl font-bold tracking-tight">
          <span
            className={
              variant === "inverse"
                ? "text-brand-ivory"
                : "text-brand-navy dark:text-brand-ivory"
            }
          >
            MiComuna
          </span>
          <span className="text-brand-teal">360</span>
        </span>
      )}
    </Link>
  );
}
