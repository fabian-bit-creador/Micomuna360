import { getCommuneData } from "@/data/communes";
import type { NewsArticle, NewsType } from "@/types";

/** Repositorio de noticias y anuncios por comuna. */

export async function getNews(
  communeId: string,
  type?: NewsType
): Promise<NewsArticle[]> {
  const all = getCommuneData(communeId).news;
  const items = type ? all.filter((n) => n.type === type) : [...all];
  return items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getNewsBySlug(
  communeId: string,
  slug: string
): Promise<NewsArticle | null> {
  return getCommuneData(communeId).news.find((n) => n.slug === slug) ?? null;
}

export async function getLatestNews(
  communeId: string,
  limit = 3
): Promise<NewsArticle[]> {
  return (await getNews(communeId)).slice(0, limit);
}
