import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NewsType } from "@/types";

const typeConfig: Record<NewsType, { label: string; className: string }> = {
  noticia: {
    label: "Noticia",
    className: "bg-brand-navy/10 text-brand-navy dark:bg-brand-sky/20 dark:text-brand-sky",
  },
  anuncio: {
    label: "Anuncio",
    className: "bg-brand-sky/20 text-brand-navy dark:text-brand-sky",
  },
  taller: {
    label: "Taller",
    className: "bg-brand-teal/15 text-brand-teal",
  },
  beneficio: {
    label: "Beneficio",
    className: "bg-brand-amber/25 text-yellow-800 dark:text-brand-amber",
  },
};

export function NewsTypeBadge({ type }: { type: NewsType }) {
  const config = typeConfig[type];
  return (
    <Badge variant="secondary" className={cn("border-transparent", config.className)}>
      {config.label}
    </Badge>
  );
}
