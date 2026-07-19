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

## Estructura (multicomuna)

```
src/
├── app/
│   ├── (public)/
│   │   ├── (portal)/    # Nivel plataforma: selector de comunas y /nosotros
│   │   └── [comuna]/    # Un solo set de páginas para todas las comunas
│   └── (admin)/admin/   # Capa municipal (estructura, Fase 4)
├── components/          # ui/ (shadcn), layout/, home/, shared/ (kit cívico)
├── config/
│   ├── communes/        # Registro de comunas (demo Los Aromos, piloto La Pintana)
│   └── site.ts          # Identidad de marca
├── data/communes/       # Dataset por comuna (demo ficticio / piloto verificado)
├── lib/repositories/    # Acceso a datos por comuna (mock hoy, Supabase en Fase 3)
└── types/               # Tipos de dominio
docs/                    # Arquitectura, modelo de datos, fuentes del piloto
```

Reglas clave: la UI **nunca** importa datos directamente (siempre vía
`lib/repositories`, que reciben la comuna), y **jamás** se mezclan datos
ficticios de la demo con datos reales del piloto. Ver
`docs/arquitectura-multicomuna.md`.

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
| 1 | **Portal ciudadano informativo**: rediseño 2.0, noticias y beneficios, agenda de actividades/talleres/deportes, trámites, teléfonos útiles, datos comunales | ✅ |
| 2 | **Participación ciudadana**: formulario de reporte/solicitud simple, mapa comunal con datos demo, resumen público de gestión | 🔜 |
| 3 | Supabase: auth, tablas, storage, RLS | — |
| 4 | Panel municipal completo: derivaciones, exportación, auditoría (hasta aquí, solo estructura/demo discreta) | — |
| 5 | IA y fuentes de datos oficiales (SINIM, INE, CEAD) | — |

## Privacidad

Diseñado bajo los principios de la Ley 21.719: datos ficticios en el MVP,
distinción entre reportes públicos y denuncias sensibles, roles y RLS antes de
producción, y minimización de datos personales. Ver `docs/modelo-datos.md`.
