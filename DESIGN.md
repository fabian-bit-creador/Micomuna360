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

## Dirección visual: señalética comunal

El sitio orienta, igual que las señales de la calle: la placa con el nombre,
el pictograma blanco sobre azul de una señal informativa, el tablero con el
directorio a la entrada de un edificio. De ahí salen las decisiones:

- **Campos planos.** Nada de degradados, sombras decorativas ni fondos
  translúcidos. Una ficha se distingue por su borde.
- **La placa azul** (`bg-brand-navy`, texto blanco) abre cada portada
  —portal, comuna y Nosotros— y cierra el sitio en el pie.
- **El amarillo señal** marca lo que hay que mirar: la sección activa del
  menú, la barra bajo el nombre de la comuna, el rótulo de cada sección, el
  sector elegido. No se usa como texto ni como fondo de bloques grandes.
- **El contorno de la comuna** es la firma: se dibuja desde el límite
  oficial y sus sectores (`lib/outline.ts`), en la portada de la comuna
  (cada sector lleva al mapa con sus lugares) y como emblema en el portal.
  Una comuna nueva trae su propia figura, sin ilustraciones que encargar.
- **Poco redondeo** (8 px) y **tableros con filetes** en vez de grillas de
  tarjetas sueltas, cuando los elementos son pares de una misma lista.

## Color

### Marca (fondos, pictogramas, gráficos, bordes)

| Token | Hex | Uso |
|---|---|---|
| `brand-navy` | `#17375E` | Placas (portada, pie), pictogramas, botones principales, títulos |
| `brand-teal` | `#1E8E89` | Acciones y enlaces (como tinta), anillo de foco, gráficos |
| `brand-amber` | `#F2BD27` | Amarillo señal: sección activa, rótulos, sector elegido |
| `brand-terracotta` | `#C95B5B` | Emergencias |
| `brand-sky` | `#67B7D1` | Gráficos y mapa |
| `brand-ivory` | `#F7F7F2` | Texto sobre la placa azul; círculo detrás del isotipo en fondos oscuros |
| `brand-slate` | `#4B5563` | Gris de apoyo |

Son los colores del isotipo; el amarillo se suma como color de señal.

### Texto: usar siempre las «tintas»

Los colores de marca **no** alcanzan AA como texto chico: sobre blanco,
teal da 3,97:1, sky 2,27:1, terracota 4,09:1 y amarillo 1,74:1. Para texto
se usan estas variantes (contraste sobre papel `#F2F4F6` / sobre `muted`
`#E8ECF0`, y en oscuro sobre fondo `#0B1626` / sobre ficha `#12233A`):

| Token | Claro | Contraste | Oscuro | Contraste |
|---|---|---|---|---|
| `brand-teal-ink` | `#136A66` | 5,80 / 5,39 | `#5CCBC4` | 9,33 / 8,13 |
| `brand-sky-ink` | `#236887` | 5,60 / 5,20 | `#A3D5E6` | 11,42 / 9,96 |
| `brand-terracotta-ink` | `#A43E3E` | 5,71 / 5,30 | `#EBA5A5` | 9,04 / 7,88 |
| `brand-amber-ink` | `#7A5200` | 6,28 / 5,83 | `#F3D68F` | 12,81 / 11,17 |
| `foreground` | `#1F2937` | 13,31 / 12,36 | `#E6E9EE` | 14,91 / 13,00 |
| `muted-foreground` | `#566170` | 5,70 / 5,30 | `#B1B9C5` | 9,17 / 8,00 |
| `primary` (títulos) | `#17375E` | 10,92 / 10,14 | `#8CC6DC` | 9,70 / 8,46 |

Sobre la placa azul: blanco 12,04:1, `brand-ivory/80` 7,67:1 y amarillo
6,93:1. Etiqueta típica: fondo de marca suave + texto en tinta, p. ej.
`bg-brand-teal/15 text-brand-teal-ink`.

El amarillo no alcanza 3:1 sobre blanco, así que nunca es la única pista:
la sección activa lleva además negrita y `aria-current`.

### Superficies

| Token | Claro | Oscuro |
|---|---|---|
| `background` (papel) | `#F2F4F6` | `#0B1626` |
| `card` | `#FFFFFF` | `#12233A` |
| `muted` | `#E8ECF0` | `#1A2F4B` |
| `accent` (al pasar el cursor) | `#E3EAF2` | `#1A2F4B` |
| `border` | `#D2D9E0` | blanco al 16 % |
| `input` (borde de campos, 3,09:1) | `#8794A3` | blanco al 42 % |

El modo oscuro sigue la preferencia del sistema (no hay selector manual).

### Gráficos

Series: `#17375E`, `#1E8E89`, `#67B7D1`, `#C95B5B`, `#F2BD27` (en oscuro,
versiones más claras: `chart-1…5`). Todo gráfico tiene una tabla
alternativa. Los marcadores del mapa usan su propia paleta validada para
distinguirse sobre OpenStreetMap: municipal `#2A78D6`, salud `#1BAF7A`,
deporte `#EB6834`, seguridad `#4A3AA7` y ferias `#C2398A`, siempre con un glifo
blanco.

## Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Títulos (`font-display`) | Archivo, 700–800, ancho 88 % | `h1`–`h4`, cifras destacadas, nombre de la comuna |
| Texto (`font-sans`) | Public Sans | Cuerpo, navegación, etiquetas |

Archivo (Omnibus-Type, Buenos Aires) se usa algo condensada, como el rótulo
de una señal: el ancho va en `font-stretch` (88 % en títulos, 76 % en el
nombre de la comuna). Public Sans se hizo para sitios de servicio público:
neutra y con cifras claras para teléfonos, montos y horarios. Las cifras de
`font-display` son de ancho fijo (`tabular-nums`).

| Elemento | Tamaño |
|---|---|
| Nombre de la comuna en su portada | `clamp(3rem, 13vw, 6.5rem)`, 800, blanco sobre la placa |
| Título de sección | `1.7rem` → `md:text-4xl` |
| Rótulo sobre el título | `text-sm`, 600, `muted-foreground`, con la marca amarilla |
| Cuerpo | `text-base` (16 px); bajadas `text-lg` en portadas |
| Metadatos y fuentes | `text-xs`–`text-sm`, `muted-foreground` |

Sin titulares a dos colores y sin antetítulos en mayúsculas: las mayúsculas
quedan para rótulos chicos de tablas y de institución.

## Forma y espacio

- **Radios**: base `0.5rem`. Fichas `rounded-lg`, botones y filtros de
  portada `rounded-md`, etiquetas `rounded-sm`; los filtros de las listas
  siguen `rounded-full`.
- **Ancho**: contenido en `max-w-6xl` con `px-4`; texto largo `max-w-2xl`.
- **Ritmo vertical**: páginas `py-12`; secciones de portada separadas por
  `pt-14 md:pt-20`; encabezado de sección con `mb-8`.
- **Objetivos táctiles**: mínimo 36 px de alto (`min-h-9`) en filtros,
  enlaces de acción y botones; campos del buscador y botones grandes 44–56
  px.
- **Sin sombras** en fichas y botones. Al pasar sobre una ficha que es
  enlace cambia el fondo (`hover:bg-accent`) o el borde y se subraya el
  título; nada se eleva. Solo lo que flota sobre el mapa lleva sombra.

## Iconografía e imágenes

- **Íconos de interfaz**: Lucide, 16–24 px, en tinta o `muted-foreground`.
- **Pictogramas de sección** (`SectionIcon`): figura blanca de Lucide sobre
  una placa azul con filete interior, como una señal informativa. Nueve
  disponibles: servicios, beneficios, deportes, telefonos, agenda,
  transparencia, datos, directorio, mapa. Van en el tablero de la portada,
  en el menú del celular y en el encabezado de cada sección.
- **Logo**: isotipo plano (SVG) en cabecera y pie; en fondos oscuros, sobre
  un círculo marfil. Detalle en `docs/marca.md`.
- **Fotos**: solo reales, con licencia libre o permiso, con crédito visible
  (`PhotoFigure`). La IA solo para temas generales y rotulada
  (`docs/imagenes.md`).

## Componentes

| Componente | Archivo | Notas |
|---|---|---|
| Cabecera | `layout/site-header.tsx` | Fondo blanco. Logo, selector de comuna (siempre visible), 6 secciones y menú «Más»; la sección activa lleva la marca amarilla. En el celular, menú con el pictograma de cada sección |
| Barra inferior | `layout/bottom-nav.tsx` | Solo en el celular: Inicio, Trámites, Beneficios, Mapa y Teléfonos, al alcance del pulgar |
| Encabezado de sección | `layout/section-header.tsx` | Rótulo con marca amarilla, título, bajada, pictograma opcional y enlace «ver todo» |
| Placa de portada | `home/piloto-home.tsx`, portal, Nosotros | Campo azul con el nombre en blanco, la barra amarilla y la bajada. En la comuna lleva el buscador y, en escritorio, su contorno |
| Contorno de la comuna | `home/commune-outline.tsx` + `lib/outline.ts` | Límite y sectores oficiales en SVG. Cada sector es un enlace a `/mapa#<sector>`; en el celular va más abajo, con los sectores en lista |
| Tablero de secciones | `home/piloto-home.tsx` | Una sola ficha con filetes: pictograma, título, bajada y flecha por sección |
| Hoy en la comuna | `home/today-markets.tsx` | Ferias del día (calculado en el navegador con la hora de Chile) y próximas actividades |
| La comuna de un vistazo | `home/piloto-home.tsx` | Foto real y cifras de inventario que salen de los datos publicados; cada una lleva a su sección. Son cantidades, no notas |
| Tarjeta | `ui/card.tsx` | Fondo `card`, borde, `rounded-lg`, sin sombra |
| Botón | `ui/button.tsx` | `default` (navy), `secondary` (teal oscuro), `outline`, `ghost`, `link` |
| Filtro | chips `rounded-full` con `aria-pressed` | Activo: `bg-primary text-primary-foreground` |
| Procedencia | `shared/source-badge.tsx` | Estado (verificado, vencido, pendiente) + institución + fecha |
| Aviso de independencia | portada de comuna | Texto bajo el buscador, dentro de la placa, con enlace a «Cómo trabajamos» |
| Buscador | `search/search-box.tsx` | `h-12` (`h-14` sobre la placa, con `onPlate`), «Lo más buscado» (solo términos con resultados), «X de N resultados» y «ver todos» |
| Emergencias | portada de comuna | Franja blanca bajo la placa: números a un toque (`tel:`) desde `phones.ts`, sin tono alarmista |
| Foto con crédito | `shared/photo-figure.tsx` | Autor y licencia enlazados bajo la foto |
| Mapa y lugares | `map/commune-map.tsx` + `places/place-directory.tsx` | Mapa arriba y la ficha de cada lugar debajo, en la misma página. Filtros, «Cerca de mí», sectores y unidades vecinales, lista sincronizada y mapa Leaflet. En el celular: selector Mapa/Lista (lista por defecto si el teléfono ahorra datos) y ficha en hoja inferior (`map/place-sheet.tsx`) con «Cómo llegar» y lugares cercanos. Botones propios sobre el mapa, de 44 px: Ampliar (pantalla completa, un dedo mueve el mapa), acercar, alejar, ver toda la comuna y mi ubicación. Sector y divisiones en dos listas desplegables, y contador «Mostrando X de Y» con «Quitar filtros» |

## Movimiento

- Un solo momento: al cargar la portada, el contorno de la comuna se dibuja
  una vez (1,4 s) y queda quieto.
- Transiciones cortas de color al pasar el cursor. Nada se eleva ni se
  desliza al aparecer.
- Con «reducir movimiento» del sistema, animaciones y transiciones se
  anulan (`globals.css`).

## Accesibilidad

- WCAG AA en claro y oscuro: texto solo con tintas, `foreground` o
  `muted-foreground`.
- Foco visible (`ring` turquesa de 3 px; blanco sobre la placa azul).
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
