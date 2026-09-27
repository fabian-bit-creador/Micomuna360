import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Íconos de sección en relieve, generados en Canva con la paleta de la
 * marca (public/brand/iconos; registro en docs/marca.md).
 */
export type SectionIconName =
  | "agenda"
  | "beneficios"
  | "datos"
  | "deportes"
  | "directorio"
  | "mapa"
  | "servicios"
  | "telefonos"
  | "transparencia";

/**
 * Ícono de sección en el estilo del isotipo 3D, sobre una ficha blanca (el
 * fondo de la ilustración también es blanco), igual en modo claro y oscuro.
 * Es decorativo: el título de la tarjeta ya dice qué es.
 */
export function SectionIcon({
  name,
  className,
}: {
  name: SectionIconName;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white",
        className
      )}
    >
      <Image
        src={`/brand/iconos/${name}.webp`}
        alt=""
        width={200}
        height={200}
        unoptimized
        className="size-full object-contain"
      />
    </span>
  );
}
