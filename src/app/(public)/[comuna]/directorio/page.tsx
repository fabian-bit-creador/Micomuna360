import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { PlaceDirectory } from "@/components/places/place-directory";
import { getCommune } from "@/config/communes";
import { communeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[comuna]/directorio">): Promise<Metadata> {
  const { comuna } = await params;
  return communeMetadata(comuna, {
    path: "/directorio",
    title: "Directorio comunal",
    description:
      "Lugares y servicios útiles de tu comuna: municipio, salud, deporte, seguridad y espacios comunitarios, con cómo llegar.",
    feature: "directory",
  });
}

/**
 * Directorio de lugares. En una comuna con mapa real, las fichas viven en
 * la misma página que el mapa (/mapa) y esta dirección redirige ahí; el
 * navegador conserva el #lugar, que el mapa abre. Queda como página propia
 * solo donde no hay mapa (la comuna de ejemplo).
 */
export default async function DirectorioPage({
  params,
}: PageProps<"/[comuna]/directorio">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.directory) {
    return <FeatureUnavailable commune={commune} title="Directorio comunal" />;
  }
  if (commune.features.realMap && !commune.isDemo) {
    permanentRedirect(`/${commune.id}/mapa`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {commune.features.community && (
        <Link
          href={`/${commune.id}/comunidad`}
          className="mb-6 flex w-fit items-center gap-1 text-sm font-semibold text-brand-teal-ink hover:text-primary"
        >
          <ArrowLeftIcon className="size-4" />
          Volver a Comunidad
        </Link>
      )}

      <SectionHeader
        level="h1"
        icon="directorio"
        eyebrow="Lugares que sirven"
        title="Directorio comunal"
        description={`Dónde queda y cómo llegar a cada lugar útil de ${commune.name}. Solo publicamos horarios y teléfonos verificados.`}
      />

      <PlaceDirectory commune={commune} />

      <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        {commune.isDemo
          ? "Lugares, direcciones y teléfonos ficticios (comuna demo). En la versión real de cada comuna, este directorio se construye solo con información oficial verificada."
          : "Cada lugar se publica con su fuente y fecha de verificación. Si un horario o teléfono no aparece, es porque aún no está verificado."}
      </p>
    </div>
  );
}
