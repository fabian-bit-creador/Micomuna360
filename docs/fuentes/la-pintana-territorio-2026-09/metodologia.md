# Sectores y unidades vecinales — La Pintana (consulta del 2026-09-28)

Genera `src/data/communes/la-pintana/territory.ts`. Ningún polígono se dibuja
a mano: todos salen de las capas públicas del geoportal municipal.

## Fuente

GeoPintana (Municipalidad de La Pintana), servicios ArcGIS en
<https://services7.arcgis.com/Jc7ZuHKHcN6HGMlG/arcgis/rest/services>:

| Capa | Polígonos | Última edición | Campos usados |
|---|---|---|---|
| `SECTORES_LA_PINTANA/FeatureServer/0` | 12 | 2022-05-17 | `SECTOR` |
| `UNIDADES_VECINALES/FeatureServer/0` | 24 | 2026-06-18 | `UN_VECINAL` |

Consulta usada en las dos capas (coordenadas geográficas, simplificadas a
unos 5 metros):

```
query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&geometryPrecision=5&maxAllowableOffset=0.00005&f=geojson
```

La capa `VILLAS_POBLACIONES` también existe, pero trae estadísticas sociales
por población; no se usa.

## Cómo se transforma

1. `sectores.geojson` y `unidades-vecinales.geojson` son las respuestas de
   esa consulta, sin cambios.
2. `generar.py` las lee, comprueba que haya 12 sectores y 24 unidades
   vecinales numeradas del 1 al 24, y escribe el dataset.
3. Nombres legibles: se quita el prefijo «SECTOR» y se usa ortografía normal
   («SECTOR SANTO TOMAS» → «Santo Tomás»; «SECTOR HUERTOS JOSE MAZA DE LA
   PINTANA» → «Huertos José Maza»). Las unidades vecinales quedan como
   «Unidad vecinal 7» («UV 7» en el mapa).
4. El rótulo de cada polígono va en su punto interior más alejado de los
   bordes, para que no caiga fuera en polígonos con entrantes.
5. `resumen.csv` lista cada área con su nombre oficial, el publicado, sus
   puntos y su superficie. Las unidades vecinales suman 30,35 km² y los
   sectores 30,36 km²: las dos capas cubren la misma comuna.

## Diferencia entre capas

La capa de unidades vecinales tiene un campo `SECTOR`, pero asigna la UV 13
(9,2 km²) a Mapuhue, cuando abarca también Ex Fundo San Antonio y Ex Fundo
La Esperanza. Por eso el sector se toma siempre de la capa de sectores, y
ese campo no se usa.

## Validación

`src/lib/data-integrity.ts` comprueba al compilar que cada polígono tenga al
menos 4 puntos, quede dentro del rectángulo de la comuna y tenga su rótulo
adentro, y que cada lugar del mapa caiga en un sector y en una unidad
vecinal.

## Vigencia

La fuente se marca vigente hasta el 2026-12-28. Al renovarla, repetir la
consulta, correr `generar.py` y comparar `resumen.csv`.
