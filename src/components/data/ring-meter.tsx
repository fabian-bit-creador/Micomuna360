import { cn } from "@/lib/utils";

interface RingMeterProps {
  /** Porcentaje 0–100. */
  value: number;
  label: string;
  detail?: string;
  className?: string;
}

/**
 * Anillo de progreso (firma 360° de la marca). El relleno lleva el valor en
 * turquesa; la pista es un paso más claro del mismo tono.
 */
export function RingMeter({ value, label, detail, className }: RingMeterProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * circumference;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <svg
        viewBox="0 0 100 100"
        className="size-24 shrink-0 -rotate-90"
        role="img"
        aria-label={`${label}: ${clamped}%`}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--brand-teal)"
          strokeOpacity="0.18"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--brand-teal)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <div>
        <p className="text-3xl font-semibold tracking-tight text-foreground">
          {clamped}%
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {detail && (
          <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
        )}
      </div>
    </div>
  );
}
