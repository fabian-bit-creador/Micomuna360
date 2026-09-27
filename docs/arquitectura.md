# Arquitectura

## Decisiones (Fase 0)

| # | Decisión | Motivo |
| --- | --- | --- |
| 1 | Next.js App Router con route groups `(public)` y `(admin)` | Separa la capa ciudadana de la municipal desde el día uno sin duplicar layout raíz. |
| 2 | Patrón repositorio en `src/lib/repositories` | La UI consume funciones (`getNews()`, `getPlaces()`…) que reciben la comuna y hoy leen los datasets de `src/data/communes/<comuna>`. Al conectar una base de datos solo cambia la implementación interna. |
| 3 | Supabase diferido a Fase 3 | Validar modelo de datos y flujo de usuario antes de crear tablas (evita una base desordenada). Dependencias ya instaladas. |
| 4 | Componentes shadcn/ui vendorizados en `src/components/ui` | La red del entorno de desarrollo bloquea `ui.shadcn.com`; los componentes se escribieron siguiendo las convenciones oficiales (data-slot, cva, Tailwind v4) y son intercambiables con `npx shadcn add`. |
| 5 | Tokens de marca en `globals.css` (Tailwind v4 `@theme`) | Paleta oficial disponible como clases (`bg-brand-teal`, etc.) y mapeada a los tokens shadcn (primary = azul profundo, secondary = turquesa). |
| 6 | Tipos de dominio centralizados en `src/types` | Espejo 1:1 del modelo de datos de `docs/modelo-datos.md`. |
| 7 | Fuente Nunito | Redondeada y humanista: coherente con el tono "cercano, humano, accesible" de la marca. |
| 8 | Leaflet se carga con `next/dynamic` y `ssr: false` | Leaflet no soporta SSR. |

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

Para texto se usan variantes de tinta (`brand-teal-ink`, `brand-terracotta-ink`,
`brand-sky-ink`, `brand-amber-ink`) y `muted-foreground`, definidas para
claro y oscuro con contraste WCAG AA (≥4,5:1). Los colores de marca quedan
para fondos, íconos y gráficos.

## Flujo de datos

```
página (RSC) ──► lib/repositories(comuna) ──► src/data/communes/<comuna>   ← hoy
página (RSC) ──► lib/repositories(comuna) ──► Supabase (RLS)              ← al conectar la base
```

## Enfoque: la comunidad primero

Decisión de producto (jul 2026): el MVP se centra en la **capa ciudadana
pública** — un portal comunal usable sin login donde el vecino encuentra
noticias, beneficios, trámites, actividades, teléfonos útiles, datos, mapa y
un formulario simple de reporte. El route group `(admin)` se conserva como
estructura preparada y demo secundaria con acceso discreto (p. ej. enlace en
el footer), y no vuelve a ser protagonista hasta la Fase 4, condicionado a la
validación del piloto ciudadano.

## Roles (MVP: simulados)

- **vecino**: crea solicitudes, ve contenido público.
- **funcionario**: gestiona solicitudes, publica noticias.
- **admin**: indicadores, asignaciones, auditoría.

En el MVP los roles se simulan en la interfaz (sin autenticación). La
verificación real llega en Fase 3 con Supabase Auth + RLS.
