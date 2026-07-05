# MiComuna360 / MuniApp

**Tu comuna en un solo lugar.** Conecta, participa y transforma tu entorno.

Plataforma web comunal para municipios y vecinos en Chile: solicitudes
vecinales con foto y ubicación, mapa territorial, noticias, indicadores y un
panel de gestión municipal.

> **Estado actual: Fase 0-1 (MVP en construcción).** Todo el contenido usa
> **datos ficticios** de la comuna demo "Los Aromos". No hay conexión a base
> de datos ni datos personales reales.

## Stack

| Capa | Herramienta |
| --- | --- |
| Frontend | Next.js (App Router) + TypeScript |
| UI | Tailwind CSS v4 + shadcn/ui |
| Backend / BaaS | Supabase (se conecta en Fase 3) |
| Mapas | Leaflet / React Leaflet + OpenStreetMap |
| Gráficos | Recharts |
| Deploy | Vercel |

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de producción
npm run lint      # ESLint
```

## Estructura

```
src/
├── app/
│   ├── (public)/      # Capa ciudadana: inicio, reportar, mapa, noticias, datos
│   └── (admin)/admin/ # Capa municipal: panel y gestión de solicitudes
├── components/
│   ├── ui/            # shadcn/ui
│   └── layout/        # Header, footer, logo, navegación
├── config/            # Identidad de marca y navegación
├── lib/
│   ├── data/          # Datos ficticios del MVP
│   ├── repositories/  # Acceso a datos (mock hoy, Supabase en Fase 3)
│   └── supabase/      # Clientes Supabase (Fase 3)
└── types/             # Tipos de dominio (espejo del modelo de datos)
supabase/migrations/   # SQL versionado (Fase 3)
docs/                  # Arquitectura y modelo de datos
```

Regla clave: la UI **nunca** importa `lib/data` directamente; siempre pasa por
`lib/repositories`. Así, conectar Supabase en Fase 3 no requiere tocar la UI.

## Enfoque del producto

**La comunidad primero.** El MVP prioriza la experiencia pública: cualquier
vecino entra **sin iniciar sesión** y encuentra información útil de su comuna
(noticias, beneficios, trámites, actividades, talleres, deportes, teléfonos
útiles, datos comunales, mapa y un formulario simple para reportar o pedir
ayuda). El panel municipal existe como estructura preparada y demo secundaria
— accesible de forma discreta, no como centro del producto. La gestión
interna se desarrolla en profundidad recién en la Fase 4, si el piloto
ciudadano valida el valor social del proyecto.

## Roadmap

| Fase | Alcance | Estado |
| --- | --- | --- |
| 0 | Arquitectura, scaffold, identidad visual, tipos | ✅ |
| 1 | **Portal ciudadano informativo**: rediseño 2.0, noticias y beneficios, agenda de actividades/talleres/deportes, trámites, teléfonos útiles, datos comunales | 🔜 |
| 2 | **Participación ciudadana**: formulario de reporte/solicitud simple, mapa comunal con datos demo, resumen público de gestión | — |
| 3 | Supabase: auth, tablas, storage, RLS | — |
| 4 | Panel municipal completo: derivaciones, exportación, auditoría (hasta aquí, solo estructura/demo discreta) | — |
| 5 | IA y fuentes de datos oficiales (SINIM, INE, CEAD) | — |

## Privacidad

Diseñado bajo los principios de la Ley 21.719: datos ficticios en el MVP,
distinción entre reportes públicos y denuncias sensibles, roles y RLS antes de
producción, y minimización de datos personales. Ver `docs/modelo-datos.md`.
