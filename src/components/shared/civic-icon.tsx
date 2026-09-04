import {
  BookOpenIcon,
  Building2Icon,
  CalendarDaysIcon,
  CrossIcon,
  DumbbellIcon,
  FileTextIcon,
  HandHeartIcon,
  HeartHandshakeIcon,
  HomeIcon,
  LeafIcon,
  LightbulbIcon,
  MapPinIcon,
  MusicIcon,
  PhoneCallIcon,
  RecycleIcon,
  ShieldAlertIcon,
  SproutIcon,
  TrafficConeIcon,
  Trash2Icon,
  TreePineIcon,
  TrophyIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Kit cívico centralizado: un solo lugar donde cada categoría del mundo
 * comunal (reportes, lugares, organizaciones) tiene su ícono y su color de
 * marca. Los datos mock guardan solo el nombre del ícono como string.
 */
const iconMap: Record<string, LucideIcon> = {
  // Categorías de reportes
  Lightbulb: LightbulbIcon,
  TrafficCone: TrafficConeIcon,
  Trash2: Trash2Icon,
  ShieldAlert: ShieldAlertIcon,
  Home: HomeIcon,
  Leaf: LeafIcon,
  FileText: FileTextIcon,
  // Lugares y servicios
  Building2: Building2Icon,
  Cross: CrossIcon,
  BookOpen: BookOpenIcon,
  Dumbbell: DumbbellIcon,
  Recycle: RecycleIcon,
  TreePine: TreePineIcon,
  PhoneCall: PhoneCallIcon,
  // Organizaciones y comunidad
  Users: UsersIcon,
  Trophy: TrophyIcon,
  HeartHandshake: HeartHandshakeIcon,
  HandHeart: HandHeartIcon,
  Music: MusicIcon,
  Sprout: SproutIcon,
  CalendarDays: CalendarDaysIcon,
};

/** Chips de color por familia temática (paleta del design brief). */
export const civicChips = {
  teal: "bg-brand-teal/15 text-brand-teal",
  sky: "bg-brand-sky/20 text-brand-navy dark:text-brand-sky",
  navy: "bg-brand-navy/10 text-brand-navy dark:bg-brand-sky/15 dark:text-brand-sky",
  terracotta: "bg-brand-terracotta/15 text-brand-terracotta",
  amber: "bg-brand-amber/25 text-yellow-700 dark:text-brand-amber",
  green: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
} as const;

export type CivicChipColor = keyof typeof civicChips;

interface CivicIconProps {
  /** Nombre lucide guardado en los datos (p. ej. "Lightbulb"). */
  name: string;
  className?: string;
}

/** Ícono cívico por nombre; cae a pin de mapa si el nombre no existe. */
export function CivicIcon({ name, className }: CivicIconProps) {
  const Icon = iconMap[name] ?? MapPinIcon;
  return <Icon className={className} />;
}

interface CivicIconChipProps extends CivicIconProps {
  color: CivicChipColor;
  /** Tamaño del chip cuadrado redondeado. */
  size?: "sm" | "md";
}

/** Chip de ícono con color de marca, para tarjetas y listados. */
export function CivicIconChip({
  name,
  color,
  size = "md",
  className,
}: CivicIconChipProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        size === "md" ? "size-11" : "size-8",
        civicChips[color],
        className
      )}
    >
      <CivicIcon
        name={name}
        className={size === "md" ? "size-6" : "size-4.5"}
      />
    </span>
  );
}
