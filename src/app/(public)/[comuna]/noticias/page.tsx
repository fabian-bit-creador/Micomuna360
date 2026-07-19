import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { NewsCard } from "@/components/news/news-card";
import { getCommune } from "@/config/communes";
import { cn } from "@/lib/utils";
import { getNews } from "@/lib/repositories";
import type { NewsType } from "@/types";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Noticias, anuncios, talleres y beneficios de tu comuna en un solo lugar.",
};

const filters: { label: string; value?: NewsType }[] = [
  { label: "Todo" },
  { label: "Buenas noticias", value: "buena_noticia" },
  { label: "Noticias", value: "noticia" },
  { label: "Anuncios", value: "anuncio" },
  { label: "Talleres", value: "taller" },
  { label: "Beneficios", value: "beneficio" },
];

export default async function NoticiasPage({
  params,
  searchParams,
}: PageProps<"/[comuna]/noticias">) {
  const [{ comuna }, { tipo }] = await Promise.all([params, searchParams]);
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.news) {
    return <FeatureUnavailable commune={commune} title="Noticias" />;
  }

  const activeType = filters.find((f) => f.value === tipo)?.value;
  const articles = await getNews(commune.id, activeType);
  const base = `/${commune.id}/noticias`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeader
        eyebrow="Al día"
        title="Noticias y anuncios de tu comuna"
        description={`Lo que está pasando en ${commune.name}: noticias, anuncios, talleres y beneficios${commune.isDemo ? " con datos de demostración" : ""}.`}
      />

      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar por tipo"
      >
        {filters.map((filter) => {
          const isActive = filter.value === activeType;
          return (
            <Link
              key={filter.label}
              href={filter.value ? `${base}?tipo=${filter.value}` : base}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                isActive
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {articles.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No hay publicaciones de este tipo por ahora.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              communeSlug={commune.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
