# MiComuna360

**Tu comuna en un solo lugar.** Plataforma web ciudadana y multicomuna para
Chile que reúne la información pública de cada comuna —trámites, beneficios,
lugares, presupuesto e indicadores— en lenguaje simple, con la fuente y la
fecha de verificación de cada dato.

Sitio: <https://micomuna360.vercel.app>

## Comunas

El proyecto usa un solo conjunto de páginas para todas las comunas. Cada
comuna tiene su configuración y su propio conjunto de datos:

- **La Pintana** (`/la-pintana`): piloto con información pública real y
  verificada.
- **Los Aromos** (`/los-aromos`): comuna de demostración con datos
  ficticios, usada para probar funcionalidades.

## Funcionalidades

| Sección | Ruta | Descripción |
| --- | --- | --- |
| Inicio | `/[comuna]` | Portada con buscador y accesos a cada sección |
| Servicios | `/servicios` | Trámites y pagos con enlace al sitio oficial de cada institución |
| Beneficios | `/beneficios` | Orientador «¿A qué puedo postular?» según la situación del hogar; funciona en el navegador, sin pedir datos personales |
| Directorio | `/directorio` | Municipio, centros de salud, recintos deportivos, seguridad y emergencias, con horarios, teléfonos y cómo llegar |
| Mapa | `/mapa` | Los lugares del directorio sobre OpenStreetMap, con el límite comunal |
| Transparencia | `/transparencia` | Derecho de acceso a la información, ejecución presupuestaria, informes mensuales, pasivos, balance y estados financieros |
| Datos | `/datos` | Indicadores de la comuna (población, salud, educación, finanzas municipales) comparados con su historia y con el promedio regional |
| Buscar | `/buscar` | Buscador sobre el contenido de la comuna |
| Noticias, actividades, comunidad, trámites, teléfonos, reportar | varias | Módulos disponibles en la comuna demo |

Las secciones de cada comuna se activan con *feature flags* en
`src/config/communes/<comuna>.ts`.

## Datos y fuentes

- Cada dato real referencia una fuente del registro de la comuna
  (`src/data/communes/la-pintana/sources.ts`), con institución, enlace, fecha
  de verificación y vigencia. La interfaz muestra esa procedencia junto al
  dato. Hay un espejo legible en `docs/fuentes-la-pintana.md`.
- Fuentes principales del piloto: sitio municipal pintana.cl, Transparencia
  Activa, geoportal GeoPintana, SINIM, MINEDUC Datos Abiertos, ChileAtiende y
  OpenStreetMap.
- `docs/fuentes/` guarda los respaldos de cada carga de datos: CSV
  normalizados, metodología o control de calidad y huellas SHA-256 de los
  archivos originales.
- `src/lib/data-integrity.ts` valida los datasets con zod al cargarse (fuentes
  existentes, fechas, coordenadas dentro de la comuna, cuadratura de las
  cifras presupuestarias), de modo que un dato inconsistente se detecta en el
  build.

## Arquitectura

```
src/
├── app/(public)/(portal)/     # portada multicomuna y /nosotros
├── app/(public)/[comuna]/     # páginas de cada comuna
├── app/(admin)/               # panel municipal (estructura inicial)
├── components/                # ui/ (shadcn), data/ (gráficos), map/, transparency/,
│                              # indicators/, benefits/, home/, layout/, shared/
├── config/communes/           # registro de comunas y feature flags
├── data/communes/<comuna>/    # datasets por comuna
├── lib/                       # repositories/, data-integrity.ts, format.ts, search.ts
└── types/                     # tipos de dominio
docs/                          # arquitectura, modelo de datos, fuentes
supabase/                      # migraciones del modelo de datos
```

La interfaz accede a los datos a través de `src/lib/repositories`, que
reciben el identificador de la comuna. Más detalle en
`docs/arquitectura-multicomuna.md`, `docs/arquitectura.md`,
`docs/modelo-datos.md` y `docs/design-brief.md`.

## Stack

- Next.js 16 (App Router) y React 19 — ver `AGENTS.md` sobre las diferencias
  de esta versión
- TypeScript, Tailwind CSS 4, componentes shadcn/ui en `src/components/ui`
- Leaflet + OpenStreetMap para mapas (cargados en el cliente con
  `next/dynamic`)
- Gráficos propios en HTML/SVG (`src/components/data`)
- zod para validación de datos
- Despliegue en Vercel desde GitHub

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # build de producción (incluye la validación de datos)
```

## Agregar o actualizar datos de una comuna

1. Registrar la fuente en `sources.ts` de la comuna.
2. Agregar los datos al dataset con su `sourceId` y, si vienen de un archivo,
   guardar el respaldo en `docs/fuentes/`.
3. Activar el flag de la sección en la configuración de la comuna.
4. Correr `npm run lint` y `npm run build`.

Para una comuna nueva: crear su configuración en `src/config/communes/`, su
carpeta en `src/data/communes/` y registrarla en ambos índices.

## Estado y próximos pasos

- Piloto de La Pintana con servicios, beneficios, directorio, mapa,
  transparencia e indicadores.
- En preparación: indicadores de seguridad (CEAD), agenda comunal y teléfonos
  útiles del piloto.
- Etapas posteriores: participación ciudadana, base de datos en Supabase
  (modelo en `docs/modelo-datos.md`) y panel municipal.

## Privacidad

El sitio no requiere cuenta ni solicita datos personales. El diseño sigue los
principios de la Ley 21.719 de protección de datos personales.
