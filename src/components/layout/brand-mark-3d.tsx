import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Isotipo en relieve (render del modelo 3D de la marca) para portadas.
 * Entra una sola vez con un giro suave y queda quieto; con «reducir
 * movimiento» aparece directo en su posición final. En cabecera, íconos y
 * tamaños chicos se usa el isotipo plano (/isotipo.svg), más legible.
 * En modo oscuro va sobre un círculo marfil, para que el pin azul marino no
 * se pierda en el fondo.
 */
export function BrandMark3D({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/isotipo-3d-960.webp"
      alt=""
      width={960}
      height={960}
      priority={priority}
      sizes="(min-width: 1024px) 320px, 200px"
      className={cn(
        "brand-intro select-none dark:rounded-full dark:bg-brand-ivory dark:p-[7%]",
        className
      )}
    />
  );
}
