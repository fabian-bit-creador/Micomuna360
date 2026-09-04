import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoHome } from "@/components/home/demo-home";
import { PilotoHome } from "@/components/home/piloto-home";
import { getCommune } from "@/config/communes";

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]">): Promise<Metadata> {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) return {};
  const title = `${commune.name} — Tu comuna en un solo lugar`;
  const description = commune.isDemo
    ? `${commune.tagline}. Datos ficticios de demostración.`
    : `Información pública de ${commune.name} con fuente y fecha de verificación: servicios, trámites y lugares útiles.`;
  return {
    title,
    description,
    alternates: { canonical: `/${commune.id}` },
    openGraph: { title, description, url: `/${commune.id}` },
    twitter: { card: "summary_large_image", title, description },
  };
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
