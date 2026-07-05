import type { Metadata } from "next";
import {
  PhoneCallIcon,
  SirenIcon,
  Building2Icon,
  HeartPulseIcon,
  HandHeartIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/layout/section-header";
import { getUsefulPhones } from "@/lib/repositories";
import type { PhoneCategory, UsefulPhone } from "@/types";

export const metadata: Metadata = {
  title: "Teléfonos útiles",
  description:
    "Emergencias, servicios municipales, salud y líneas de apoyo, listos para llamar con un toque.",
};

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
      className="group flex min-h-14 items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 transition-colors hover:border-brand-teal/50 hover:bg-accent"
    >
      <div className="min-w-0">
        <p className="font-semibold">{phone.name}</p>
        <p className="truncate text-sm text-muted-foreground">
          {phone.description} · {phone.available}
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-teal/10 px-3.5 py-1.5 font-display text-lg font-bold whitespace-nowrap text-brand-teal transition-colors group-hover:bg-brand-teal group-hover:text-white">
        <PhoneCallIcon className="size-4" />
        {phone.number}
      </span>
    </a>
  );
}

export default async function TelefonosPage() {
  const phones = await getUsefulPhones();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SectionHeader
        eyebrow="A un toque"
        title="Teléfonos útiles"
        description="Toca cualquier número para llamar. Los números nacionales de emergencia son oficiales; los municipales corresponden a la comuna demo."
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
                <group.icon className="size-5 text-brand-terracotta" />
                {group.title}
              </h2>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {groupPhones.map((phone) => (
                  <PhoneRow key={phone.id} phone={phone} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
