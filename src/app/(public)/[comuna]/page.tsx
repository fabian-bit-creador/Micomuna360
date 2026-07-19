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
  return {
    title: `${commune.name} — Tu comuna en un solo lugar`,
    description: commune.tagline,
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
