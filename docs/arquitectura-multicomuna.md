# Arquitectura multicomuna (Piloto P1)

Decisión de producto: MiComuna360 es una **plataforma multicomuna**. Los
Aromos se mantiene como comuna demo/laboratorio; La Pintana es el primer
piloto informativo real. Nunca se mezclan datos ficticios con datos reales.

## Estructura

```
src/config/communes/        Configuración por comuna
├── types.ts                CommuneConfig, CommuneFeatures, OfficialSource
├── index.ts                getCommune(slug) · listCommunes()
├── los-aromos.ts           status: demo  (isDemo: true)
└── la-pintana.ts           status: piloto (solo fuentes verificadas)

src/data/communes/          Dataset por comuna (CommuneData)
├── types.ts                Bundle tipado de las 11 colecciones
├── index.ts                getCommuneData(communeId)
├── los-aromos/             Mocks demo (migrados intactos desde lib/data)
└── la-pintana/             Solo datos verificados; vacío hasta P2

src/app/(public)/
├── (portal)/               Nivel plataforma: "/" (selector) y /nosotros
└── [comuna]/               UN solo set de páginas para todas las comunas
    layout.tsx              Valida slug (404 si no existe) + header/footer
    page.tsx                DemoHome (demo) | PilotoHome (piloto)
    noticias/ …             Cada página: gate por commune.features.*
```

## Reglas

1. **Un solo set de páginas y componentes.** Nada se duplica por comuna: la
   comuna llega por la URL (`/[comuna]/…`), los repositorios reciben
   `communeId` y leen su dataset.
2. **Feature flags por comuna** (`CommuneFeatures`): una sección apagada se
   oculta de la navegación y su URL muestra `FeatureUnavailable` (no 404,
   con explicación honesta del piloto por etapas).
3. **Los Aromos intacto**: mismos contenidos demo, ahora bajo
   `/los-aromos/*`. Las URLs antiguas (`/noticias`, `/tramites`, …)
   redirigen 308 vía `next.config.ts`.
4. **La Pintana solo publica lo verificado**: cada fuente oficial lleva
   `verifiedAt`; el dataset parte vacío y se llena en P2 con procedencia
   (fuente, fecha, estado).
5. **Independencia declarada**: el piloto muestra en hero y footer que
   MiComuna360 no es el sitio oficial de la Municipalidad.
6. **Agregar una comuna** = crear su config + su dataset. Cero cambios en
   páginas o componentes.
