import {
  BarChart3Icon,
  BookOpenIcon,
  CalendarDaysIcon,
  FileTextIcon,
  HandCoinsIcon,
  MapPinnedIcon,
  PhoneIcon,
  ScaleIcon,
  VolleyballIcon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

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

const glyphs: Record<SectionIconName, LucideIcon> = {
  agenda: CalendarDaysIcon,
  beneficios: HandCoinsIcon,
  datos: BarChart3Icon,
  deportes: VolleyballIcon,
  directorio: BookOpenIcon,
  mapa: MapPinnedIcon,
  servicios: FileTextIcon,
  telefonos: PhoneIcon,
  transparencia: ScaleIcon,
};

/**
 * Pictograma de sección, como una señal informativa de la calle: figura
 * blanca sobre una placa azul, con su filete interior. Es decorativo: el
 * título que lo acompaña ya dice qué es. Igual en modo claro y oscuro.
 */
export function SectionIcon({
  name,
  className,
}: {
  name: SectionIconName;
  className?: string;
}) {
  const Glyph = glyphs[name];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex size-14 shrink-0 items-center justify-center rounded-md bg-brand-navy text-white",
        className
      )}
    >
      <span className="absolute inset-[3px] rounded-[3px] border border-white/45" />
      <Glyph className="size-[48%]" strokeWidth={1.75} />
    </span>
  );
}
