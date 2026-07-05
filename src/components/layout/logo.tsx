import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Muestra solo el isotipo, sin el nombre. */
  iconOnly?: boolean;
}

/** Logo de MiComuna360: isotipo (círculo 360° + pin) y wordmark. */
export function Logo({ className, iconOnly = false }: LogoProps) {
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
        className="size-9"
      />
      {!iconOnly && (
        <span className="text-xl font-extrabold tracking-tight">
          <span className="text-brand-navy dark:text-brand-ivory">
            MiComuna
          </span>
          <span className="text-brand-teal">360</span>
        </span>
      )}
    </Link>
  );
}
