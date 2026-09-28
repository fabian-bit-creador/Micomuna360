# Pedidos por etapa: GPT Images, Google AI Studio y Google Maps

Complementa `docs/pedidos-ia.md` (reglas comunes y quién hace qué) y sigue
las etapas de `docs/hoja-de-ruta.md`. Cada pedido está listo para copiar.

**Adjuntos que sirven de referencia** (en el repositorio):

- Logo 3D: `docs/marca/fuentes/MiComuna360-logo-original-3D-2048.png`
- Íconos actuales: `public/brand/iconos/*.webp` (estilo que deben seguir
  los nuevos)
- Capturas del sitio: tomarlas de https://micomuna360.vercel.app/la-pintana
  en el celular

Texto de estilo común para GPT Images (pegar al final de cada pedido de
ícono):

```
Mismo estilo que los íconos adjuntos: render 3D tipo arcilla, formas
redondeadas y simples, bisel suave, material satinado mate, luz de
estudio suave desde arriba a la izquierda, sombra suave, sin contornos.
Solo estos colores: #17375E, #1E8E89, #67B7D1, #C95B5B, #E9B949, #F7F7F2.
Objeto centrado, vista frontal levemente elevada, fondo blanco liso,
formato cuadrado. Sin texto, letras, números, logos ni personas.
```

## Etapa 1 · Mantener lo publicado

**GPT Images: pieza para anunciar una sección nueva** (4:5, Instagram).
Adjuntar el logo y el ícono de la sección.

```
Crea una pieza vertical 4:5 para redes de MiComuna360. Arriba, el logo
adjunto pequeño. Al centro, el ícono adjunto grande sobre un círculo
marfil. Abajo, en tipografía redondeada y gruesa, el texto exacto:
«Nuevo en MiComuna360: Deporte en tu barrio» y, más chico,
«71 escuelas y talleres en La Pintana · micomuna360.vercel.app».
Fondo #F7F7F2 con una franja #17375E abajo. Revisa que el texto quede
escrito exactamente así, sin errores.
```

**AI Studio (texto, gratis): revisar una página nueva.** Adjuntar
capturas en celular y escritorio.

```
Eres diseñadora UX de sitios de gobierno local en Latinoamérica. Revisa
esta página de MiComuna360 (capturas en celular y escritorio). Usuarios
con celulares de gama media y poca experiencia digital. En español de
Chile: tres fortalezas, los cinco problemas más importantes de
jerarquía, legibilidad o flujo con una mejora concreta cada uno, y qué
quitarías. Menciona los elementos que ves.
```

(Así se hizo `docs/revisiones/2026-09-28-portada-gemini.md`.)

## Etapa 2 · Más información pública

**GPT Images: íconos para las próximas secciones** (uno por pedido, con
el texto de estilo común y dos íconos actuales adjuntos):

| Sección | Objeto |
|---|---|
| Cultura | máscaras de teatro simples, una teal y una coral |
| Ferias libres | toldo de feria a rayas coral y marfil sobre un cajón con frutas |
| Seguridad | escudo redondeado navy con un pequeño check teal |
| Organizaciones | tres fichas redondeadas unidas por arcos, como el logo |
| Noticias | diario doblado marfil con una franja coral |
| Buscar | lupa con mango navy y cristal celeste |

**AI Studio (texto y visión, gratis): pasar documentos a tablas.** Para
cargas como ferias o talleres publicadas en PDF o imagen.

```
Transcribe la tabla del documento adjunto a CSV con estas columnas:
[nombre, dirección, días, horario]. No completes ni corrijas nada: si un
dato no se lee, déjalo vacío y márcalo en una columna «revisar». No
incluyas nombres de personas. Al final, dime cuántas filas tiene la
tabla original.
```

El resultado siempre se contrasta con la fuente antes de cargarlo (y se
guarda en `docs/fuentes/` como las demás cargas).

**AI Studio «Build»: maqueta de la portada móvil.** Adjuntar capturas de
la portada actual y la revisión de Gemini.

```
Con las capturas adjuntas de la portada de MiComuna360 y la revisión de
UX, crea una maqueta web móvil (390 px) que reordene la portada así:
cabecera; título corto con el buscador justo debajo; botones rápidos de
emergencia (131, 133, 1441 seguridad municipal) y «Teléfonos útiles»;
grilla de 2 columnas con Servicios, Beneficios, Deportes y Agenda;
agenda en carrusel horizontal; mapa y directorio; transparencia y
cifras. Colores #17375E, #1E8E89, #67B7D1, #C95B5B, #E9B949, fondo
#F7F7F2. No inventes datos: usa los textos de las capturas.
```

La maqueta es referencia: se construye después con los componentes del
sitio.

## Etapa 3 · Funciones con participación

**GPT Images: ilustraciones de apoyo** (16:9, ilustración, sin texto):

- **«¿Este dato está mal?»**: una mano que señala una ficha con una
  pequeña lupa y un visto bueno; tono amable, no de error.
- **Negocio local**: fachada genérica de almacén de barrio con toldo y
  plantas (no un negocio real); para la ficha vacía de «Suma tu negocio».
- **Sin resultados**: una lupa descansando junto a un mapa plegado.

Rotular siempre como ilustración generada con IA donde se usen.

## Google Maps: qué sirve para el mapa comunal

| Opción | Costo | Encaja | Nota |
|---|---|---|---|
| Enlaces de Google Maps (ver, cómo llegar, Street View) | Gratis, sin clave | Sí, ya se usa | Abren la app o el sitio de Google con las coordenadas |
| Maps Embed API | Gratis sin límite (requiere clave) | Para una ficha de lugar | Un mapa de Google incrustado; hay que permitirlo en la CSP |
| Maps JavaScript API (mapa dinámico) | 10.000 cargas gratis al mes | Solo reemplazando el mapa actual | Rastreo de Google en cada visita; exige aviso de privacidad |
| Map Tiles (2D, Street View, 3D fotorrealista) | 100.000 llamadas gratis al mes (Essentials) | Una «vista 3D» opcional | Atractivo, pero pesado para celulares de gama media |
| Places API (horarios, fotos, reseñas) | Por uso | No | No se puede mostrar sobre un mapa que no sea de Google ni guardar (salvo el identificador del lugar): choca con nuestros datos con fuente |
| Gemini con datos de Google Maps | Requiere facturación | No por ahora | En el nivel gratuito la cuota es cero (probado el 28-09-2026) |

**Recomendación** (puntos 1 y 2 hechos el 28-09-2026): mantener el mapa propio (Leaflet con OpenStreetMap:
gratis, sin rastreo y con nuestras fuentes) y sumar lo que Google da
gratis sin clave:

1. **Botón «Ver la calle»** en cada ficha del mapa y del directorio, con el
   enlace de Street View de Google Maps en las coordenadas del lugar.
2. **Mejoras al mapa propio**, todas gratuitas: agrupar marcadores cercanos,
   capas por categoría, «cerca de mí» calculado en el navegador sin
   guardar la ubicación, y lista y mapa sincronizados.
3. **Sectores de la comuna** (idea de la revisión de Gemini): los 12
   sectores y las 24 unidades vecinales de GeoPintana, con filtro por
   sector y «estás en el sector…» calculado en el navegador.

Maps Embed o la vista 3D quedan para cuando exista una ficha propia por
lugar y se decida pedir una clave de Google Maps Platform (requiere cuenta
con facturación, aunque no se superen los tramos gratis).

## Qué hace hoy la clave de AI Studio en el entorno de Claude

Probado el 28-09-2026 en el nivel gratuito:

| Uso | Funciona |
|---|---|
| Texto y análisis de imágenes (Gemini 3.x Flash) | Sí |
| Generar imágenes (Nano Banana y Nano Banana Pro) | No: cuota cero sin facturación |
| Respuestas con datos de Google Maps | No: cuota cero sin facturación |

Con facturación activada en Google Cloud, las imágenes costarían unos
centavos de dólar cada una y Claude podría generarlas directamente.
