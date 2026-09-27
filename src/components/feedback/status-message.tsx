import Link from "next/link";

import { Button } from "@/components/ui/button";

interface StatusAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Mensaje de página completa para estados de error o "no encontrada": qué
 * pasó en palabras simples y un par de caminos para seguir.
 */
export function StatusMessage({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions: StatusAction[];
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-bold tracking-wide text-brand-terracotta-ink uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-muted-foreground">{description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {actions.map((action, i) =>
          action.href ? (
            <Button
              key={action.label}
              variant={i === 0 ? "default" : "outline"}
              asChild
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button
              key={action.label}
              variant={i === 0 ? "default" : "outline"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
