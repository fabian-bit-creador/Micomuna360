# Arquitectura

## Decisiones (Fase 0)

| # | Decisión | Motivo |
| --- | --- | --- |
| 1 | Next.js App Router con route groups `(public)` y `(admin)` | Separa la capa ciudadana de la municipal desde el día uno sin duplicar layout raíz. |
| 2 | Patrón repositorio en `src/lib/repositories` | La UI consume funciones (`getPublicRequests()`, `getNews()`…) que hoy leen mocks de `src/lib/data`. En Fase 3 solo cambia la implementación interna a Supabase. |
| 3 | Supabase diferido a Fase 3 | Validar modelo de datos y flujo de usuario antes de crear tablas (evita una base desordenada). Dependencias ya instaladas. |
| 4 | Componentes shadcn/ui vendorizados en `src/components/ui` | La red del entorno de desarrollo bloquea `ui.shadcn.com`; los componentes se escribieron siguiendo las convenciones oficiales (data-slot, cva, Tailwind v4) y son intercambiables con `npx shadcn add`. |
| 5 | Tokens de marca en `globals.css` (Tailwind v4 `@theme`) | Paleta oficial disponible como clases (`bg-brand-teal`, etc.) y mapeada a los tokens shadcn (primary = azul profundo, secondary = turquesa). |
| 6 | Tipos de dominio centralizados en `src/types` | Espejo 1:1 del modelo de datos de `docs/modelo-datos.md`. |
| 7 | Fuente Nunito | Redondeada y humanista: coherente con el tono "cercano, humano, accesible" de la marca. |
| 8 | Leaflet se cargará con `next/dynamic` y `ssr: false` | Leaflet no soporta SSR (Fase 2). |

## Identidad visual

Paleta oficial (ver `src/app/globals.css`):

| Token | Hex | Uso |
| --- | --- | --- |
| brand-navy | `#17375E` | Confianza / seguridad — primary |
| brand-teal | `#1E8E89` | Cercanía / participación — secondary |
| brand-sky | `#67B7D1` | Información / claridad — ring, info |
| brand-terracotta | `#C95B5B` | Acento / inspiración chilena — destructive |
| brand-ivory | `#F7F7F2` | Fondo / limpieza — background |
| brand-slate | `#4B5563` | Texto / equilibrio |
| brand-amber | `#E9B949` | Alertas (documento maestro, sección 13) |

Lema: **"Tu comuna en un solo lugar"** · Sublema: **"Conecta, participa y
transforma tu entorno."** Tono: simple, humano, esperanzador, profesional,
claro, ciudadano, no partidista.

Isotipo: `public/isotipo.svg` (círculo 360° segmentado + pin de ubicación),
recreado en SVG a partir del brand board oficial. Favicon: `src/app/icon.svg`.

## Flujo de datos

```
página (RSC) ──► lib/repositories ──► lib/data (mocks)   ← hoy
página (RSC) ──► lib/repositories ──► Supabase (RLS)     ← Fase 3
```

## Roles (MVP: simulados)

- **vecino**: crea solicitudes, ve contenido público.
- **funcionario**: gestiona solicitudes, publica noticias.
- **admin**: indicadores, asignaciones, auditoría.

En el MVP los roles se simulan en la interfaz (sin autenticación). La
verificación real llega en Fase 3 con Supabase Auth + RLS.
