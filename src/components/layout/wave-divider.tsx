import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  /** Color de la capa final (debe coincidir con el fondo de la sección siguiente). */
  variant?: "navy" | "card";
}

/**
 * Olas superpuestas del brand board (celeste/teal/terracota) como transición
 * entre secciones. La última capa es sólida para fundirse con lo que sigue.
 */
export function WaveDivider({ className, variant = "navy" }: WaveDividerProps) {
  const finalFill = variant === "navy" ? "var(--brand-navy)" : "var(--card)";
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="block h-16 w-full md:h-24"
      >
        <path
          d="M0,70 C240,20 480,20 720,55 C960,90 1200,90 1440,45 L1440,110 L0,110 Z"
          fill="var(--brand-sky)"
          opacity="0.35"
        />
        <path
          d="M0,85 C280,40 560,35 800,60 C1040,85 1240,95 1440,60 L1440,110 L0,110 Z"
          fill="var(--brand-teal)"
          opacity="0.4"
        />
        <path
          d="M0,95 C200,105 420,70 720,78 C1020,86 1240,105 1440,80 L1440,110 L0,110 Z"
          fill="var(--brand-terracotta)"
          opacity="0.35"
        />
        <path
          d="M0,102 C260,112 520,84 780,90 C1040,96 1260,110 1440,94 L1440,110 L0,110 Z"
          fill={finalFill}
        />
      </svg>
    </div>
  );
}
