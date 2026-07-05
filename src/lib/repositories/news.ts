import { news } from "@/lib/data/news";
import type { NewsArticle, NewsType } from "@/types";

/** Repositorio de noticias y anuncios. Mock en MVP; Supabase en Fase 3. */

export async function getNews(type?: NewsType): Promise<NewsArticle[]> {
  const items = type ? news.filter((n) => n.type === type) : [...news];
  return items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getNewsBySlug(
  slug: string
): Promise<NewsArticle | null> {
  return news.find((n) => n.slug === slug) ?? null;
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  return (await getNews()).slice(0, limit);
}
