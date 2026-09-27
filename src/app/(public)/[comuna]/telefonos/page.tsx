import type { Metadata } from "next";
import {
  PhoneCallIcon,
  SirenIcon,
  Building2Icon,
  HeartPulseIcon,
  HandHeartIcon,
} from "lucide-react";

import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { SourceBadge } from "@/components/shared/source-badge";
import { getDataSource, getPlaces, getUsefulPhones } from "@/lib/repositories";
import type { DataSource, PhoneCategory, UsefulPhone } from "@/types";
import { communeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]/telefonos">): Promise<Metadata> {
  const { comuna } = await params;
  return communeMetadata(comuna, {
    path: "/telefonos",
    title: "Teléfonos útiles",
    description:
      "Emergencias, servicios municipales, salud y líneas de apoyo, listos para llamar con un toque.",
    feature: "phones",
  });
}

const groups: {
  category: PhoneCategory;
  title: string;
  icon: typeof SirenIcon;
}[] = [
  { category: "emergencia", title: "Emergencias", icon: SirenIcon },
  { category: "municipal", title: "Municipalidad", icon: Building2Icon },
  { category: "salud", title: "Salud", icon: HeartPulseIcon },
  { category: "apoyo", title: "Líneas de apoyo", icon: HandHeartIcon },
];

function telHref(number: string) {
  return `tel:${number.replace(/[^\d+*]/g, "")}`;
}

function PhoneRow({ phone }: { phone: UsefulPhone }) {
  return (
    <a
      href={telHref(phone.number)}
      className="group flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 transition-colors hover:border-brand-teal/50 hover:bg-accent"
    >
      <div className="min-w-0">
        <p className="font-semibold">{phone.name}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {phone.description}
          {phone.available && ` · ${phone.available}`}
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-teal/10 px-3 py-1.5 font-display text-base font-bold whitespace-nowrap sm:gap-2 sm:px-3.5 sm:text-lg text-brand-teal-ink transition-colors group-hover:bg-brand-teal-ink group-hover:text-background">
        <PhoneCallIcon className="size-4" />
        {phone.number}
      </span>
    </a>
  );
}

export default async function TelefonosPage({
  params,
}: PageProps<"/[comuna]/telefonos">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.phones) {
    return <FeatureUnavailable commune={commune} title="Teléfonos útiles" />;
  }

  /* Los teléfonos de salud del directorio se suman aquí con su fuente, sin
     copiarlos a otro dataset. */
  const [listed, places] = await Promise.all([
    getUsefulPhones(commune.id),
    getPlaces(commune.id),
  ]);
  const fromDirectory: UsefulPhone[] = places
    .filter((p) => p.category === "salud" && p.phone)
    .map((p) => ({
      id: `dir-${p.id}`,
      name: p.name,
      number: p.phone!,
      description: p.address,
      category: "salud",
      available: p.schedule,
      sourceId: p.sourceId ?? null,
    }));
  const phones = [...listed, ...fromDirectory];
  const sourceOf = new Map<string, DataSource>();
  for (const id of new Set(phones.map((p) => p.sourceId).filter(Boolean))) {
    const source = await getDataSource(commune.id, id as string);
    if (source) sourceOf.set(source.id, source);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SectionHeader
        level="h1"
        icon="telefonos"
        eyebrow="A un toque"
        title="Teléfonos útiles"
        description={
          commune.isDemo
            ? "Toca cualquier número para llamar. Los números nacionales de emergencia son oficiales; los municipales son ficticios."
            : `Toca cualquier número para llamar. Emergencias, oficinas municipales, salud y líneas de apoyo de ${commune.name}, cada uno con su fuente.`
        }
      />
      <div className="space-y-10">
        {groups.map((group) => {
          const groupPhones = phones.filter(
            (p) => p.category === group.category
          );
          if (groupPhones.length === 0) return null;
          return (
            <section key={group.category}>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <group.icon className="size-5 text-brand-terracotta-ink" />
                {group.title}
              </h2>
              {group.category === "municipal" && !commune.isDemo && (
                <p className="-mt-2 mb-3 text-sm text-muted-foreground">
                  Atención municipal: lunes a jueves de 8:30 a 14:00 y de
                  15:00 a 17:00; viernes de 8:30 a 14:00 y de 15:00 a 16:00.
                </p>
              )}
              <div className="grid gap-2.5 sm:grid-cols-2">
                {groupPhones.map((phone) => (
                  <PhoneRow key={phone.id} phone={phone} />
                ))}
              </div>
              <div className="mt-3 space-y-1">
                {[...new Set(groupPhones.map((p) => p.sourceId))]
                  .map((id) => (id ? sourceOf.get(id) : undefined))
                  .filter((s): s is DataSource => Boolean(s))
                  .map((source) => (
                    <SourceBadge key={source.id} source={source} />
                  ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
