import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoHome } from "@/components/home/demo-home";
import { PilotoHome } from "@/components/home/piloto-home";
import { getCommune } from "@/config/communes";
import { communeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]">): Promise<Metadata> {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) return {};
  return communeMetadata(comuna, {
    path: "",
    title: commune.name,
    description: commune.isDemo
      ? `${commune.tagline}.`
      : `Información pública de ${commune.name} con fuente y fecha de verificación: servicios, beneficios, lugares, presupuesto y datos de la comuna.`,
  });
}

export default async function CommuneHomePage({
  params,
}: PageProps<"/[comuna]">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();

  return commune.isDemo ? (
    <DemoHome commune={commune} />
  ) : (
    <PilotoHome commune={commune} />
  );
}
