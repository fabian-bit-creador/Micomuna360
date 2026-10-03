# DESIGN.md — MiComuna360

Sistema de diseño del sitio tal como está construido. Es la referencia común
para Claude, Codex, Google Stitch y cualquier herramienta que proponga
pantallas: los valores salen de `src/app/globals.css` y de los componentes
en `src/components`. Si algo aquí no coincide con el código, manda el
código y se corrige este archivo.

## Identidad

Portal ciudadano independiente que reúne la información pública de cada
comuna, con la fuente y la fecha de cada dato. Se siente cercano, claro y
confiable; nunca burocrático. Se presenta como producto en uso.

**Principios**

1. **La tarea primero.** El vecino viene a resolver algo: buscar, llamar,
   postular, llegar. Lo que ayuda a eso va arriba.
2. **Cada dato con su fuente.** Institución, fecha de consulta y estado de
   verificación junto al dato, no escondidos.
3. **Simple en un celular de gama media.** Páginas livianas, texto legible,
   objetivos táctiles cómodos.
4. **Neutral.** Sin menciones políticas, sin rankings ni notas a la comuna.

## Color

### Marca (fondos, íconos grandes, gráficos, bordes)

| Token | Hex | Uso |
|---|---|---|
| `brand-navy` | `#17375E` | Color primario: botones principales, títulos, pin del logo |
| `brand-teal` | `#1E8E89` | Acento cívico: fondos suaves (`/15`), anillos de selección, gráficos |
| `brand-sky` | `#67B7D1` | Información: fondos suaves, foco (`ring`) |
| `brand-terracotta` | `#C95B5B` | Acento cálido: etiquetas de región, avisos |
| `brand-amber` | `#E9B949` | Fechas y talleres; fondos suaves (`/20`) |
| `brand-ivory` | `#F7F7F2` | Fondo del sitio; ficha detrás de logos en modo oscuro |
| `brand-slate` | `#4B5563` | Gris de apoyo |

### Texto: usar siempre las «tintas»

Los colores de marca **no** alcanzan AA como texto chico: sobre blanco,
teal da 3,97:1, sky 2,27:1, terracota 4,09:1 y ámbar 1,83:1. Para texto se
usan estas variantes (contraste sobre marfil `#F7F7F2` / sobre fondo oscuro
`#0F2038`):

| Token | Claro | Contraste | Oscuro | Contraste |
|---|---|---|---|---|
| `brand-teal-ink` | `#136A66` | 5,96:1 | `#5CCBC4` | 8,41:1 |
| `brand-sky-ink` | `#2A7494` | 4,86:1 | `#A3D5E6` | 10,29:1 |
| `brand-terracotta-ink` | `#A94444` | 5,43:1 | `#EBA5A5` | 8,14:1 |
| `brand-amber-ink` | `#8A5A06` | 5,51:1 | `#F3D68F` | 11,55:1 |
| `foreground` | `#374151` | 9,59:1 | `#E5E7EB` | 13,21:1 |
| `muted-foreground` | `#5B6270` | 5,70:1 | `#B3B9C3` | 8,29:1 |
| `primary` (títulos) | `#17375E` | 11,2:1 | `#67B7D1` | 7,22:1 |

Patrón típico de etiqueta: fondo de marca suave + texto en tinta, p. ej.
`bg-brand-teal/15 text-brand-teal-ink`.

### Superficies

| Token | Claro | Oscuro |
|---|---|---|
| `background` | `#F7F7F2` | `#0F2038` |
| `card` | `#FFFFFF` | `#17375E` |
| `muted` | `#ECEEE7` | `#1C3A5E` |
| `accent` | `#E6F2F7` | `#1C3A5E` |
| `border` | `#E3E4DC` | blanco al 12 % |

El modo oscuro sigue la preferencia del sistema (no hay selector manual).

### Gráficos

Series: `#17375E`, `#1E8E89`, `#67B7D1`, `#C95B5B`, `#E9B949` (en oscuro,
versiones más claras: `chart-1…5`). Todo gráfico tiene una tabla
alternativa. Los marcadores del mapa usan su propia paleta validada para
distinguirse sobre OpenStreetMap: municipal `#2A78D6`, salud `#1BAF7A`,
deporte `#EB6834`, seguridad `#4A3AA7`, siempre con un glifo blanco.

## Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Títulos (`font-display`) | Bricolage Grotesque, 700 | `h1`–`h4`, cifras destacadas |
| Texto (`font-sans`) | Nunito | Cuerpo, navegación, etiquetas |

| Elemento | Tamaño |
|---|---|
| Título de portada de comuna | `text-4xl` → `md:text-6xl`, `tracking-tight` |
| Título de sección (h1 de página) | `text-2xl` → `md:text-3xl` |
| Antetítulo («eyebrow») | `text-sm`, 700, mayúsculas, tinta teal, con arco del logo |
| Cuerpo | `text-base` (16 px); bajadas `text-lg` en portadas |
| Metadatos y fuentes | `text-xs`–`text-sm`, `muted-foreground` |

## Forma y espacio

- **Radios**: base `0.75rem`. Tarjetas `rounded-xl`, fichas de ícono
  `rounded-2xl`, filtros y etiquetas `rounded-full`, botones `rounded-md`.
- **Ancho**: contenido en `max-w-6xl` con `px-4`; texto largo `max-w-2xl`.
- **Ritmo vertical**: páginas `py-12`; secciones separadas por `mt-10` a
  `mt-16`; encabezado de sección con `mb-8`.
- **Objetivos táctiles**: mínimo 36 px de alto (`min-h-9`) en filtros,
  enlaces de acción y botones; campos del buscador y botones grandes 44–48
  px (`h-11`/`h-12`).
- **Sombras**: mínimas (`shadow-xs`/`shadow-sm`); al pasar sobre una
  tarjeta, `-translate-y-0.5` y `shadow-md`.

## Iconografía e imágenes

- **Íconos de interfaz**: Lucide, 16–24 px, en tinta o `muted-foreground`.
- **Íconos de sección**: ilustraciones en relieve (Canva) sobre una ficha
  blanca redondeada de 56–64 px (`SectionIcon`), en tarjetas de la portada
  y en el encabezado de cada sección. Nueve disponibles: servicios,
  beneficios, deportes, telefonos, agenda, transparencia, datos,
  directorio, mapa (`public/brand/iconos/`).
- **Logo**: isotipo plano (SVG) en cabecera y tamaños chicos; isotipo 3D
  solo en portadas y vistas previa. Detalle en `docs/marca.md`.
- **Fotos**: solo reales, con licencia libre o permiso, con crédito visible
  (`PhotoFigure`). La IA solo para temas generales y rotulada
  (`docs/imagenes.md`).

## Componentes

| Componente | Archivo | Notas |
|---|---|---|
| Cabecera | `layout/site-header.tsx` | Logo, selector de comuna (siempre visible), 6 secciones y menú «Más»; en el celular, menú con el ícono de cada sección |
| Barra inferior | `layout/bottom-nav.tsx` | Solo en el celular: Inicio, Trámites, Beneficios, Mapa y Teléfonos, al alcance del pulgar |
| Encabezado de sección | `layout/section-header.tsx` | Antetítulo, título, bajada, ícono opcional y enlace «ver todo» |
| Tarjeta | `ui/card.tsx` | Fondo `card`, borde, `rounded-xl` |
| Botón | `ui/button.tsx` | `default` (navy), `secondary` (teal oscuro), `outline`, `ghost`, `link` |
| Filtro | chips `rounded-full` con `aria-pressed` | Activo: `bg-primary text-primary-foreground` |
| Procedencia | `shared/source-badge.tsx` | Estado (verificado, vencido, pendiente) + institución + fecha |
| Aviso de independencia | portada de comuna | Caja `bg-brand-sky/10` con borde `brand-sky/40` |
| Buscador | `search/search-box.tsx` | `h-12`, «Lo más buscado» (solo términos con resultados), «X de N resultados» y «ver todos» |
| Emergencias | portada de comuna | Fila de números a un toque (`tel:`) desde `phones.ts`, sin tono alarmista |
| Foto con crédito | `shared/photo-figure.tsx` | Autor y licencia enlazados bajo la foto |
| Mapa | `map/commune-map.tsx` | Filtros, «Cerca de mí», sectores y unidades vecinales, lista sincronizada y mapa Leaflet. En el celular: selector Mapa/Lista (lista por defecto si el teléfono ahorra datos) y ficha en hoja inferior (`map/place-sheet.tsx`) con «Cómo llegar» y lugares cercanos |

## Movimiento

- Transiciones cortas de color y elevación en tarjetas.
- El isotipo 3D entra una vez (`brand-intro`, 1,75 s) y queda quieto.
- Con «reducir movimiento» del sistema, animaciones y transiciones se
  anulan (`globals.css`).

## Accesibilidad

- WCAG AA en claro y oscuro: texto solo con tintas, `foreground` o
  `muted-foreground`.
- Foco visible (`ring` celeste de 3 px).
- Todo gráfico o mapa con alternativa en tabla o lista.
- El color nunca es la única pista: glifos en marcadores, texto en
  etiquetas, categoría en texto para lectores de pantalla.
- Enlaces externos con ↗ o ícono de salida, y `rel="noopener noreferrer"`.

## Voz

Español de Chile, cercano y directo: «¿A qué puedo postular?», «Cómo
llegar», «Ver la calle». Frases cortas, verbos concretos, sin siglas sin
explicar. Nunca «piloto», «demo» ni «en construcción»; nunca menciones
políticas.

## Para herramientas de diseño (Stitch, Codex, GPT)

- Usar los tokens de este archivo por nombre; para texto, las tintas.
- No inventar datos: usar textos y cifras del sitio publicado
  (https://micomuna360.vercel.app/la-pintana).
- Entregar capturas o HTML exportado como **referencia**; la construcción
  se hace con los componentes de `src/components`, en una rama de
  propuesta (nunca en la rama de producción).
