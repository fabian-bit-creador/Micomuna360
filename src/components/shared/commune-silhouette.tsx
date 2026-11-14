import { communeOutline } from "@/lib/outline";
import { getCommuneBoundary } from "@/lib/repositories";
import { cn } from "@/lib/utils";

/**
 * Silueta de una comuna, dibujada desde su límite oficial: es su emblema en
 * el portal. Decorativa; sin límite verificado no se muestra nada.
 */
export async function CommuneSilhouette({
  communeId,
  className,
}: {
  communeId: string;
  className?: string;
}) {
  const boundary = await getCommuneBoundary(communeId);
  if (!boundary) return null;
  const shape = communeOutline(boundary, null, 100, 3);
  return (
    <svg
      viewBox={`0 0 ${shape.width} ${shape.height}`}
      aria-hidden="true"
      className={cn("h-16 w-auto shrink-0", className)}
    >
      <path
        d={shape.boundary}
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="fill-brand-navy/10 stroke-brand-navy dark:fill-white/10 dark:stroke-white/85"
      />
    </svg>
  );
}
