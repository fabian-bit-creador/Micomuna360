"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLinkIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { SearchEntry } from "@/lib/search";

/** Normaliza para búsqueda insensible a tildes y mayúsculas. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

interface SearchBoxProps {
  entries: SearchEntry[];
  placeholder?: string;
  /** Máximo de resultados visibles. */
  limit?: number;
}

/**
 * Buscador ciudadano estático: filtra en el cliente un índice construido en
 * el servidor. Sin backend, sin cookies, sin registro.
 */
export function SearchBox({
  entries,
  placeholder = "Busca un trámite, lugar, teléfono…",
  limit = 12,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const resultsId = useId();

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];
    return entries
      .map((entry) => {
        const title = normalize(entry.title);
        const description = normalize(entry.description);
        const score = title.includes(q) ? 2 : description.includes(q) ? 1 : 0;
        return { entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((r) => r.entry);
  }, [entries, query, limit]);

  const showEmpty = query.trim().length >= 2 && results.length === 0;

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        <SearchIcon
          aria-hidden="true"
          className="absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          role="searchbox"
          aria-label="Buscador ciudadano"
          aria-controls={resultsId}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-12 rounded-xl bg-card pl-10 text-base shadow-sm"
        />
      </div>

      <div id={resultsId} aria-live="polite">
        {results.length > 0 && (
          <ul className="mt-2 divide-y overflow-hidden rounded-xl border bg-card shadow-md">
            {results.map((entry) => (
              <li key={`${entry.group}-${entry.title}`}>
                {entry.external ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 hover:bg-accent"
                  >
                    <ResultBody entry={entry} />
                  </a>
                ) : (
                  <Link
                    href={entry.href}
                    className="block px-4 py-3 hover:bg-accent"
                  >
                    <ResultBody entry={entry} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
        {showEmpty && (
          <p className="mt-2 rounded-xl border bg-card px-4 py-3 text-sm text-muted-foreground shadow-md">
            Sin resultados para “{query.trim()}”. Prueba con otra palabra
            (p. ej. “permiso”, “licencia”, “deporte”).
          </p>
        )}
      </div>
    </div>
  );
}

function ResultBody({ entry }: { entry: SearchEntry }) {
  return (
    <span className="block">
      <span className="flex items-center gap-2">
        <span className="text-xs font-bold tracking-wide text-brand-teal uppercase">
          {entry.group}
        </span>
        {entry.external && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <ExternalLinkIcon className="size-3" />
            sitio oficial externo
          </span>
        )}
      </span>
      <span className="mt-0.5 block font-semibold text-primary">
        {entry.title}
      </span>
      <span className="mt-0.5 block truncate text-sm text-muted-foreground">
        {entry.description}
      </span>
    </span>
  );
}
