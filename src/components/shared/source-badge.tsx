import {
  ArchiveIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  UnlinkIcon,
} from "lucide-react";

import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DataSource, SourceStatus } from "@/types";

const statusConfig: Record<
  SourceStatus,
  { label: string; icon: typeof CircleCheckIcon; className: string }
> = {
  verificado: {
    label: "Verificado",
    icon: CircleCheckIcon,
    className: "text-brand-teal",
  },
  pendiente: {
    label: "Pendiente de revisión",
    icon: CircleHelpIcon,
    className: "text-yellow-700",
  },
  enlace_caido: {
    label: "Enlace caído",
    icon: UnlinkIcon,
    className: "text-brand-terracotta",
  },
  archivado: {
    label: "Archivado",
    icon: ArchiveIcon,
    className: "text-muted-foreground",
  },
};

/**
 * Procedencia visible de un dato del piloto: institución, estado y fecha de
 * verificación, con enlace a la fuente original.
 */
export function SourceBadge({
  source,
  className,
}: {
  source: DataSource;
  className?: string;
}) {
  const config = statusConfig[source.status];
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground",
        className
      )}
    >
      <config.icon className={cn("size-3.5 shrink-0", config.className)} />
      <span className={cn("font-semibold", config.className)}>
        {config.label}
      </span>
      <span aria-hidden="true">·</span>
      <span>
        Fuente:{" "}
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:text-foreground"
        >
          {source.institution} — {source.pageName}
        </a>
      </span>
      <span aria-hidden="true">·</span>
      <span>consultado el {formatDate(source.verifiedAt)}</span>
    </p>
  );
}
