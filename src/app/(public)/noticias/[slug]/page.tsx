import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { NewsTypeBadge } from "@/components/news/news-type-badge";
import { formatDate } from "@/lib/format";
import { getNews, getNewsBySlug } from "@/lib/repositories";

export async function generateStaticParams() {
  const articles = await getNews();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Publicación no encontrada" };
  return { title: article.title, description: article.summary };
}

export default async function NoticiaDetallePage({
  params,
}: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/noticias"
        className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal hover:text-primary"
      >
        <ArrowLeftIcon className="size-4" />
        Volver a noticias
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <NewsTypeBadge type={article.type} />
        <span className="text-sm text-muted-foreground">
          {formatDate(article.publishedAt)}
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{article.summary}</p>

      <div className="mt-8 space-y-4 border-t pt-8 leading-relaxed">
        {article.body.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-10 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
        Contenido de demostración de la comuna ficticia Los Aromos.
      </p>
    </article>
  );
}
