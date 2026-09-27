# MiComuna360

**Tu comuna en un solo lugar.** Plataforma web ciudadana y multicomuna para
Chile: reúne la información pública de cada comuna —trámites, beneficios,
lugares, presupuesto e indicadores— con fuente y fecha, en lenguaje simple y
sin pedir datos personales.

- Producción: <https://micomuna360.vercel.app>
- Estado (2026-09-27): **piloto informativo real en La Pintana** + comuna
  demo **Los Aromos** (datos ficticios).

> ⚠️ **Despliegue:** en Vercel la rama de producción es
> `claude/micomuna360-architecture-gadm7s`. **Todo push a esa rama se publica
> de inmediato.** La rama `piloto-la-pintana-informativo` se mantiene igual a
> ella y genera vistas previas.

## Dos comunas, un solo código

| Comuna | Ruta | Tipo | Datos |
| --- | --- | --- | --- |
| La Pintana | `/la-pintana` | Piloto (`isDemo: false`) | **Reales**, verificados, con fuente |
| Los Aromos | `/los-aromos` | Demo (`isDemo: true`) | **Ficticios**; no modificar su contenido |

Nunca se mezclan datos ficticios con reales. Cada comuna se define con una
configuración (`src/config/communes/*.ts`, con *feature flags*) y un dataset
(`src/data/communes/<comuna>/`). Todas las comunas comparten las mismas
páginas en `src/app/(public)/[comuna]/`.

## Qué tiene hoy La Pintana

| Sección | Ruta | Contenido | Fuente principal |
| --- | --- | --- | --- |
| Servicios | `/servicios` | Trámites y pagos con enlace al sitio oficial | pintana.cl, ChileAtiende |
| ¿A qué puedo postular? | `/beneficios` | Orientador de 10 beneficios según la situación del hogar; corre en el navegador, sin RUT ni envío de datos | ChileAtiende, RSH, BNE, SENCE, SERCOTEC |
| Directorio | `/directorio` | 24 lugares: municipio, 10 centros de salud, 4 recintos deportivos, 6 de seguridad y emergencias | pintana.cl, Corp. de Deportes |
| Mapa | `/mapa` | Los 24 lugares con coordenadas y el límite comunal oficial | Geoportal GeoPintana (ArcGIS), OSM |
| Transparencia | `/transparencia` | Derechos de acceso, presupuesto al 30-06-2026 (comprometido/pagado por subtítulo, origen de los ingresos, presupuesto de salud), informes mensuales, pasivos, balance, estados financieros | Transparencia Activa (MU124) |
| Datos | `/datos` | Indicadores con contexto: población, pobreza, salud, matrícula escolar, finanzas municipales | SINIM, MINEDUC |
| Buscar | `/buscar` | Buscador sobre todo lo anterior | — |

**Pendiente:** seguridad (casos policiales CEAD por 100.000 habitantes). El
CEAD no responde desde el entorno de desarrollo y hace falta el archivo
descargado desde Chile. También faltan agenda, teléfonos útiles propios y
colegios/ferias en el mapa (flags `events`, `phones` apagados).

## Reglas de datos (obligatorias)

1. **Todo dato real declara `sourceId`** del registro
   `src/data/communes/la-pintana/sources.ts` (31 fuentes, con fecha de
   verificación y vigencia). Una fuente con `validUntil` vencido se muestra
   como «Revisión vencida». Espejo legible: `docs/fuentes-la-pintana.md`.
2. **Nada se estima ni se completa a mano.** Horarios y teléfonos solo si
   una fuente oficial los confirma; si no, `null`.
3. **Validación en el build:** `src/lib/data-integrity.ts` (zod) revisa todo
   dataset al cargarse. Un dato sin fuente, una coordenada fuera del polígono
   comunal o un presupuesto que no cuadra **rompe el build**.
4. **Conciliación como código:** `transparency/budget-execution.ts` y
   `transparency/accounting-balance.ts` verifican sus cifras contra los
   totales impresos en los informes.
5. **Indicadores: contexto, no puntaje.** Se compara con la propia historia y
   con el promedio de las comunas de la región; sin rankings ni notas.
6. **Privacidad (Ley 21.719):** sin login, sin RUT, sin datos personales ni
   nombres de funcionarios. Capas del geoportal con datos personales o
   tributarios no se usan.
7. La UI lee datos solo vía `src/lib/repositories` (nunca `src/data` directo).

## Respaldo de los datos

`docs/fuentes/` guarda, por paquete, los CSV normalizados, la metodología o
control de calidad y las huellas SHA-256 de los archivos originales:

- `la-pintana-transparencia-julio-2026/` — balance, pasivos, índice de informes.
- `la-pintana-ejecucion-junio-2026/` — presupuesto transcrito de PDF escaneados.
- `la-pintana-indicadores-2026-09/` — SINIM y MINEDUC, reglas de validez y descartes.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # también ejecuta la validación de datos
```

Stack: Next.js 16 (App Router, ver `AGENTS.md`: tiene cambios respecto de
versiones anteriores), React 19, TypeScript, Tailwind CSS 4, shadcn/ui
vendorizado, Leaflet + OpenStreetMap (solo con `next/dynamic` y `ssr: false`),
zod. Gráficos hechos en HTML/SVG propios (`src/components/data/`).

```
src/
├── app/(public)/(portal)/     # portada multicomuna y /nosotros
├── app/(public)/[comuna]/     # páginas de cada comuna
├── app/(admin)/               # panel municipal (solo estructura/demo)
├── components/                # ui/, data/ (gráficos), map/, transparency/, indicators/, benefits/…
├── config/communes/           # registro de comunas y feature flags
├── data/communes/<comuna>/    # datasets (La Pintana real, Los Aromos ficticio)
├── lib/                       # repositories/, data-integrity.ts, format.ts, search.ts
└── types/                     # tipos de dominio
docs/                          # arquitectura, modelo de datos, fuentes
```

## Cómo agregar o actualizar datos reales

1. Registrar o actualizar la fuente en `sources.ts` (y su fila en
   `docs/fuentes-la-pintana.md`).
2. Agregar los datos al dataset con su `sourceId`; si vienen de un archivo,
   guardar el respaldo en `docs/fuentes/<paquete>/`.
3. Encender el flag de la sección en `src/config/communes/la-pintana.ts` solo
   cuando haya datos verificados.
4. `npm run lint && npm run build` deben pasar sin errores.

Próximas re-verificaciones: fuentes municipales vencen el **2026-12-27**,
nacionales el **2027-03-27**.

## Roadmap

| Fase | Alcance | Estado |
| --- | --- | --- |
| 0–1.9 | Arquitectura, portal ciudadano demo, auditoría visual | ✅ |
| Piloto P1–P3 | Multicomuna, servicios, fuentes, transparencia, mapa, beneficios, indicadores de La Pintana | ✅ (seguridad pendiente) |
| 2 | Participación ciudadana real (reportes) | — |
| 3 | Supabase (auth, tablas, RLS). **No conectar antes.** Modelo en `docs/modelo-datos.md` | — |
| 4 | Panel municipal completo | — |

Más contexto: `docs/arquitectura.md`, `docs/arquitectura-multicomuna.md`,
`docs/design-brief.md`, `AGENTS.md`.
