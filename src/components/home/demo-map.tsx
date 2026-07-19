import {
  Building2Icon,
  CalendarDaysIcon,
  CrossIcon,
  LightbulbIcon,
  RecycleIcon,
  ShieldAlertIcon,
  TrafficConeIcon,
  Trash2Icon,
  WrenchIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/ui/badge";
import { getLocations, getPublicRequests } from "@/lib/repositories";
import type { RequestStatus } from "@/types";
import { cn } from "@/lib/utils";

const inProgress: RequestStatus[] = [
  "recibida",
  "en_revision",
  "asignada",
  "en_proceso",
];

const sectorDots = [
  "bg-brand-navy",
  "bg-brand-teal",
  "bg-brand-sky",
  "bg-brand-terracotta",
  "bg-emerald-600",
];

/** Marcadores demo posicionados en % sobre el plano ilustrado. */
type MarkerKind = "reporte" | "actividad" | "servicio";
interface DemoMarker {
  id: string;
  kind: MarkerKind;
  label: string;
  icon: typeof WrenchIcon;
  x: number;
  y: number;
  chip: string;
}

const markers: DemoMarker[] = [
  // Reportes en gestión (de los datos demo)
  {
    id: "m-bache",
    kind: "reporte",
    label: "Bache frente al consultorio (reporte demo)",
    icon: TrafficConeIcon,
    x: 45,
    y: 56,
    chip: "text-brand-terracotta ring-brand-terracotta/50",
  },
  {
    id: "m-basural",
    kind: "reporte",
    label: "Microbasural junto al canal (reporte demo)",
    icon: Trash2Icon,
    x: 63,
    y: 20,
    chip: "text-brand-slate ring-brand-slate/40",
  },
  {
    id: "m-reja",
    kind: "reporte",
    label: "Reja del parque infantil (reporte demo)",
    icon: ShieldAlertIcon,
    x: 77,
    y: 72,
    chip: "text-brand-navy ring-brand-navy/40",
  },
  // Actividades
  {
    id: "m-feria",
    kind: "actividad",
    label: "Feria de emprendedores (actividad demo)",
    icon: CalendarDaysIcon,
    x: 76,
    y: 58,
    chip: "text-brand-teal ring-brand-teal/50",
  },
  {
    id: "m-reunion",
    kind: "actividad",
    label: "Reunión territorial (actividad demo)",
    icon: CalendarDaysIcon,
    x: 13,
    y: 58,
    chip: "text-brand-teal ring-brand-teal/50",
  },
  // Servicios
  {
    id: "m-muni",
    kind: "servicio",
    label: "Municipalidad de Los Aromos (demo)",
    icon: Building2Icon,
    x: 61,
    y: 52,
    chip: "text-brand-navy ring-brand-navy/40",
  },
  {
    id: "m-cesfam",
    kind: "servicio",
    label: "CESFAM Los Aromos (demo)",
    icon: CrossIcon,
    x: 53,
    y: 64,
    chip: "text-brand-sky ring-brand-sky/60",
  },
  {
    id: "m-punto-limpio",
    kind: "servicio",
    label: "Punto limpio (demo)",
    icon: RecycleIcon,
    x: 87,
    y: 42,
    chip: "text-emerald-600 ring-emerald-600/40",
  },
];

/** Plano base ilustrado (no geográfico) de la comuna demo Los Aromos. */
function MapCanvas() {
  return (
    <svg
      viewBox="0 0 800 520"
      className="block h-auto w-full"
      aria-hidden="true"
    >
      {/* Fondo */}
      <rect width="800" height="520" rx="20" fill="var(--brand-ivory)" />

      {/* Sectores */}
      {/* Villa Los Copihues (poniente) */}
      <path
        d="M28 150 Q30 96 90 92 L290 78 Q330 76 332 120 L336 300 Q336 336 296 338 L84 348 Q34 350 32 300 Z"
        fill="var(--brand-teal)"
        opacity="0.14"
        stroke="var(--brand-teal)"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      {/* El Estero Norte (norte) */}
      <path
        d="M360 60 Q362 34 400 34 L740 40 Q772 42 770 80 L766 150 Q764 186 724 184 L396 176 Q362 174 362 140 Z"
        fill="var(--brand-sky)"
        opacity="0.16"
        stroke="var(--brand-sky)"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      {/* Centro Cívico (centro) */}
      <path
        d="M362 210 Q362 186 396 188 L520 192 Q552 194 552 226 L548 344 Q546 374 512 372 L392 368 Q360 366 360 334 Z"
        fill="var(--brand-navy)"
        opacity="0.1"
        stroke="var(--brand-navy)"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      {/* Población Nueva Esperanza (sur-poniente) */}
      <path
        d="M34 384 Q32 360 68 362 L296 372 Q330 374 330 406 L328 462 Q328 492 292 490 L72 484 Q36 482 36 452 Z"
        fill="var(--brand-terracotta)"
        opacity="0.14"
        stroke="var(--brand-terracotta)"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      {/* Parque Los Aromos (oriente) */}
      <path
        d="M586 214 Q586 190 620 192 L744 198 Q772 200 770 232 L764 448 Q762 484 722 482 L618 476 Q584 474 584 440 Z"
        fill="#3f9142"
        opacity="0.15"
        stroke="#3f9142"
        strokeOpacity="0.4"
        strokeWidth="2"
      />

      {/* Estero (curso de agua) */}
      <path
        d="M356 96 Q480 70 570 92 Q680 118 764 96"
        fill="none"
        stroke="var(--brand-sky)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Calles principales */}
      <path
        d="M20 356 L780 330"
        stroke="#ffffff"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M20 356 L780 330"
        stroke="var(--brand-slate)"
        strokeWidth="2"
        strokeDasharray="10 12"
        opacity="0.35"
      />
      <path
        d="M348 60 L344 486"
        stroke="#ffffff"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M348 60 L344 486"
        stroke="var(--brand-slate)"
        strokeWidth="2"
        strokeDasharray="10 12"
        opacity="0.35"
      />

      {/* Plaza del centro cívico */}
      <rect
        x="430"
        y="250"
        width="56"
        height="48"
        rx="10"
        fill="var(--brand-teal)"
        opacity="0.3"
      />

      {/* Árboles del parque */}
      {[
        [640, 260],
        [700, 300],
        [660, 370],
        [720, 420],
        [620, 430],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="14" fill="#3f9142" opacity="0.35" />
          <circle cx={cx} cy={cy} r="6" fill="#3f9142" opacity="0.5" />
        </g>
      ))}

      {/* Rótulos de sectores */}
      <g
        fontFamily="var(--font-nunito), sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="var(--brand-navy)"
        opacity="0.75"
      >
        <text x="90" y="128">Villa Los Copihues</text>
        <text x="470" y="72">El Estero Norte</text>
        <text x="398" y="230">Centro Cívico</text>
        <text x="76" y="416">Pob. Nueva Esperanza</text>
        <text x="604" y="236">Parque Los Aromos</text>
      </g>

      {/* Rosa de los vientos simple */}
      <g transform="translate(756 480)" opacity="0.5">
        <circle r="14" fill="none" stroke="var(--brand-slate)" strokeWidth="1.5" />
        <path d="M0 -10 L4 4 L0 1 L-4 4 Z" fill="var(--brand-terracotta)" />
        <text
          y="-18"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="var(--brand-slate)"
        >
          N
        </text>
      </g>
    </svg>
  );
}

/**
 * Territorio: plano ilustrado de la comuna demo con marcadores de reportes,
 * actividades y servicios, más los sectores como leyenda compacta.
 * SVG/CSS puro — el mapa interactivo real llega en la Fase 2.
 */
export async function DemoMap({ communeId }: { communeId: string }) {
  const [locations, requests] = await Promise.all([
    getLocations(communeId),
    getPublicRequests(communeId),
  ]);
  const sectors = locations.map((location, i) => ({
    location,
    dot: sectorDots[i % sectorDots.length],
    active: requests.filter(
      (r) => r.locationId === location.id && inProgress.includes(r.status)
    ).length,
  }));

  return (
    <section className="border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="Territorio"
          title="Así se ve tu comuna en un vistazo"
          description="Reportes en gestión, actividades y servicios sobre el territorio, cada barrio con su pulso propio."
        />

        <div className="relative overflow-hidden rounded-2xl border shadow-sm">
          <MapCanvas />

          {/* Marcadores demo */}
          {markers.map((marker) => (
            <span
              key={marker.id}
              role="img"
              aria-label={marker.label}
              title={marker.label}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              className={cn(
                "absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-2 transition-transform hover:scale-110 md:size-8",
                marker.chip
              )}
            >
              <marker.icon className="size-3.5 md:size-4" />
            </span>
          ))}

          {/* Luminaria destacada: el caso de doña María */}
          <span
            role="img"
            aria-label="Luminaria apagada en Villa Los Copihues — el reporte de doña María (demo)"
            title="Luminaria apagada — el reporte de doña María (demo)"
            style={{ left: "24%", top: "36%" }}
            className="absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-amber text-brand-navy shadow-lg ring-4 ring-brand-amber/35 transition-transform hover:scale-110 md:size-11"
          >
            <LightbulbIcon className="size-4.5 md:size-5.5" />
          </span>
          <span
            aria-hidden="true"
            style={{ left: "24%", top: "36%" }}
            className="absolute hidden -translate-x-1/2 -translate-y-[calc(100%+1.6rem)] rounded-lg bg-brand-navy px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-brand-ivory shadow-md sm:block"
          >
            El reporte de doña María
            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-brand-navy" />
          </span>

          {/* Etiqueta demo */}
          <Badge className="absolute right-2 bottom-2 bg-brand-navy/85 text-[10px] text-brand-ivory sm:right-3 sm:bottom-3 sm:text-xs">
            Plano ilustrado de comuna demo — mapa interactivo en próxima etapa
          </Badge>
        </div>

        {/* Leyenda accesible */}
        <ul
          aria-label="Leyenda del plano"
          className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm"
        >
          <li className="flex items-center gap-1.5">
            <span className="flex size-5 items-center justify-center rounded-full bg-white ring-2 ring-brand-terracotta/50">
              <WrenchIcon className="size-3 text-brand-terracotta" />
            </span>
            Reportes en gestión (demo)
          </li>
          <li className="flex items-center gap-1.5">
            <span className="flex size-5 items-center justify-center rounded-full bg-white ring-2 ring-brand-teal/50">
              <CalendarDaysIcon className="size-3 text-brand-teal" />
            </span>
            Actividades
          </li>
          <li className="flex items-center gap-1.5">
            <span className="flex size-5 items-center justify-center rounded-full bg-white ring-2 ring-brand-navy/40">
              <Building2Icon className="size-3 text-brand-navy" />
            </span>
            Servicios
          </li>
          <li className="flex items-center gap-1.5">
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-amber ring-2 ring-brand-amber/40">
              <LightbulbIcon className="size-3 text-brand-navy" />
            </span>
            Luminaria destacada: el caso de doña María
          </li>
        </ul>

        {/* Sectores como chips compactos */}
        <div className="mt-5 flex flex-wrap gap-2">
          {sectors.map(({ location, dot, active }) => (
            <span
              key={location.id}
              className="inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-1.5 text-xs font-semibold sm:text-sm"
            >
              <span className={cn("size-2 rounded-full", dot)} />
              {location.name}
              <span className="font-normal text-muted-foreground">
                · {active === 0 ? "sin reportes" : `${active} en gestión`}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
