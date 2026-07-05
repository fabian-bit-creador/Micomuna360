import Link from "next/link";

import { NewsTypeBadge } from "@/components/news/news-type-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/types";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/noticias/${article.slug}`} className="group block h-full">
      <Card className="h-full gap-3 transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
        <CardHeader className="gap-2">
          <div className="flex items-center justify-between gap-2">
            <NewsTypeBadge type={article.type} />
            <span className="text-xs text-muted-foreground">
              {formatDate(article.publishedAt)}
            </span>
          </div>
          <CardTitle className="text-lg leading-snug text-primary group-hover:underline group-hover:decoration-brand-teal group-hover:underline-offset-4">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3 text-sm">
            {article.summary}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
