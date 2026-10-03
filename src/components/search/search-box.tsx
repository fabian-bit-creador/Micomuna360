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
  /** Resultados visibles antes de "ver todos". */
  limit?: number;
  /** Búsquedas frecuentes, como botones bajo el campo. */
  suggestions?: string[];
}

/**
 * Buscador ciudadano estático: filtra en el cliente un índice construido en
 * el servidor. Sin backend, sin cookies, sin registro.
 */
export function SearchBox({
  entries,
  placeholder = "Busca un trámite, lugar, teléfono…",
  limit = 12,
  suggestions = [],
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const resultsId = useId();

  const matches = useMemo(() => {
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
      .map((r) => r.entry);
  }, [entries, query]);

  const results = showAll ? matches : matches.slice(0, limit);
  const hidden = matches.length - results.length;
  const showEmpty = query.trim().length >= 2 && matches.length === 0;

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
          onChange={(e) => {
            setQuery(e.target.value);
            setShowAll(false);
          }}
          placeholder={placeholder}
          className="h-12 rounded-xl bg-card pl-10 text-base shadow-sm"
        />
      </div>

      {suggestions.length > 0 && query.trim().length < 2 && (
        <div className="mt-3 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
          <p className="mb-2 text-sm font-semibold text-muted-foreground sm:mb-0">
            Lo más buscado:
          </p>
          {/* En el celular, una sola fila que se desliza de lado. */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {suggestions.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="min-h-9 shrink-0 rounded-full border bg-card px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap text-brand-teal-ink transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      <div id={resultsId}>
        <p aria-live="polite" className="sr-only">
          {matches.length > 0 &&
            `${matches.length} ${matches.length === 1 ? "resultado" : "resultados"}`}
        </p>
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
            {hidden > 0 && (
              <li className="flex flex-wrap items-center justify-between gap-2 bg-muted/60 px-4 py-2.5 text-sm text-muted-foreground">
                <span>
                  Mostrando {results.length} de {matches.length} resultados
                </span>
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="min-h-9 rounded-md px-2 font-semibold text-brand-teal-ink underline-offset-4 hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  Ver los {matches.length}
                </button>
              </li>
            )}
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
        <span className="text-xs font-bold tracking-wide text-brand-teal-ink uppercase">
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
