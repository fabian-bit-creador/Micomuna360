<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MiComuna360

Plataforma web ciudadana y multicomuna para Chile. Reúne la información
pública de cada comuna (trámites, beneficios, lugares, presupuesto e
indicadores) con la fuente y la fecha de verificación de cada dato. El
`README.md` describe el producto, las secciones y la arquitectura.

## Estado actual

- **La Pintana** (`/la-pintana`): comuna publicada, con datos públicos
  reales y verificados. Cada dato referencia una fuente de
  `src/data/communes/la-pintana/sources.ts`.
- **Los Aromos** (`/los-aromos`): comuna de ejemplo con datos ficticios,
  usada como laboratorio de funcionalidades. Sus datos se mantienen separados
  de los reales y queda fuera de la navegación pública (`listPublicCommunes`
  en `src/config/communes`); se abre por su URL.
- **Tono del sitio**: se presenta como producto en uso, sin rótulos de
  «piloto», «demo» ni «en construcción». Lo que no está listo no se anuncia:
  su sección se apaga (responde 404) hasta que tenga datos verificados.
- **Portal ciudadano sin cuenta**: no hay login ni base de datos conectada.
  Supabase está previsto (modelo en `docs/modelo-datos.md`); conectarlo
  requiere antes diseñar el aislamiento por comuna, roles y RLS.
- **Panel municipal** (`src/app/(admin)`): estructura inicial con
  contenido de ejemplo; solo se enlaza desde la comuna de ejemplo.
- **Hoja de ruta**: `docs/hoja-de-ruta.md`. Trabajo con otras herramientas
  de IA (Codex, GPT Image, Canva, Stitch, AI Studio): `docs/pedidos-ia.md`
  y `docs/pedidos-por-etapa.md`.

## Convenciones

- **Idioma**: interfaz, contenido, commits y documentación en español de
  Chile; identificadores de código en inglés. Tono simple, cercano, no
  burocrático ni partidista (`docs/arquitectura.md`).
- **Acceso a datos**: la interfaz lee a través de `src/lib/repositories`,
  que reciben el identificador de la comuna; los datasets viven en
  `src/data/communes/<comuna>/` y las secciones se activan con los flags de
  `src/config/communes/<comuna>.ts`.
- **Datos reales**: cada registro lleva `sourceId`; horarios, teléfonos y
  cifras se publican cuando una fuente oficial los confirma (si no, `null`).
  `src/lib/data-integrity.ts` valida los datasets al cargar, así que un dato
  inconsistente aparece como error de build. Los respaldos de cada carga
  (CSV, metodología, SHA-256) van en `docs/fuentes/`, y el registro legible
  de fuentes en `docs/fuentes-la-pintana.md`.
- **Indicadores**: se presentan como contexto (historia propia y promedio
  regional), sin rankings ni calificaciones.
- **Privacidad** (Ley 21.719): no se piden ni publican datos personales ni
  nombres de funcionarios. Lo que el vecino marca en herramientas como el
  orientador de beneficios se procesa en el navegador; los parámetros que
  describen su situación van en el fragmento de la URL (`#`), no en la
  consulta (`?`). Si se agregan solicitudes vecinales, las marcadas
  `is_sensitive` no aparecen en mapas ni listados públicos.
- **Vigencia de fuentes**: `getSourceFreshness` (`src/lib/sources.ts`)
  compara `validUntil` con la fecha de Chile; las páginas de cada comuna se
  regeneran cada hora (`revalidate` en `src/app/(public)/[comuna]/layout.tsx`).
- **UI**: sistema de diseño completo en `DESIGN.md` (colores, tintas de
  texto, tipografía, componentes). Componentes shadcn/ui escritos a mano en
  `src/components/ui`.
  Colores en `src/app/globals.css`: los de marca (`brand-*`) para fondos,
  íconos y gráficos, y las tintas (`brand-*-ink`, `muted-foreground`) para
  texto, que cumplen WCAG AA en claro y oscuro. Gráficos propios en
  HTML/SVG en `src/components/data`, con tabla alternativa.
- **Metadatos y buscadores**: cada página declara sus metadatos con
  `communeMetadata` o `portalMetadata` (`src/lib/seo.ts`): título con la
  comuna, URL canónica, vista previa con imagen de `/og/<comuna>`. La comuna
  de demostración y las secciones desactivadas llevan `noindex` y quedan
  fuera de `app/sitemap.ts`.
- **Imágenes**: un lugar o negocio real se muestra con su foto real (propia,
  con licencia libre o con permiso) y su crédito; las ilustraciones con IA
  solo para temas generales y rotuladas. Detalle en `docs/imagenes.md`.
- **Mapas**: Leaflet se carga solo en el cliente (`next/dynamic` con
  `ssr: false`) sobre teselas de OpenStreetMap, con marcadores agrupados
  (leaflet.markercluster) y una lista sincronizada que es también la
  alternativa accesible. Los enlaces a Google Maps (ver, cómo llegar,
  Street View) salen de `googleMapsUrls` (`src/lib/maps.ts`): no usan API
  ni clave. «Cerca de mí» usa la ubicación solo en el navegador, sin
  guardarla ni enviarla; ahí mismo se calcula el sector y la unidad vecinal
  del vecino (`findArea`, capas oficiales en `territory.ts`). En el celular
  la ficha va en una hoja inferior, el mapa se mueve con dos dedos (un dedo
  baja la página) y hay vista de lista que no descarga Leaflet. Los lugares
  y teléfonos se descargan en CSV/GeoJSON con su fuente
  (`[comuna]/descargas/[archivo]`), solo para comunas reales.

## Despliegue

El proyecto está conectado a Vercel. La rama de producción es
`claude/micomuna360-architecture-gadm7s` (rama predeterminada del
repositorio): cada push a ella publica el sitio. Las demás ramas generan
vistas previas.

## Comandos

- `npm run dev` — desarrollo en http://localhost:3000
- `npm run lint` — ESLint
- `npm run build` — build de producción, incluida la validación de datos
- `npm run test:e2e` — pruebas de recorridos con Playwright en escritorio y
  celular (`e2e/`; requiere el build). Corren también en GitHub Actions
  (`.github/workflows/revision.yml`) en producción y en las ramas
  `propuesta-*`. Al cambiar un texto o una etiqueta que usan, actualizarlas.
