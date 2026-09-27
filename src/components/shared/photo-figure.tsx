import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

/** Foto real con su crédito visible: autor, licencia y enlace de origen. */
export function PhotoFigure({
  photo,
  className,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  photo: Photo;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={cn("overflow-hidden", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className={cn("h-auto w-full object-cover", imageClassName)}
      />
      <figcaption className="px-1 pt-1.5 text-[11px] text-muted-foreground">
        Foto:{" "}
        <a
          href={photo.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:text-foreground"
        >
          {photo.author}
        </a>{" "}
        ·{" "}
        <a
          href={photo.licenseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:text-foreground"
        >
          {photo.license}
        </a>
      </figcaption>
    </figure>
  );
}
