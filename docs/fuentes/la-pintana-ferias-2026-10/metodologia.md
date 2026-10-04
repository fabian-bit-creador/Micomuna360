# Ferias libres y persas — La Pintana (consulta del 2026-10-04)

Genera `src/data/communes/la-pintana/street-markets.ts`. Ningún tramo se
dibuja a mano: todos salen de la capa pública del geoportal municipal.

## Fuente

GeoPintana, capa `FERIAS_LIBRES/FeatureServer/1`
(<https://services7.arcgis.com/Jc7ZuHKHcN6HGMlG/arcgis/rest/services/FERIAS_LIBRES/FeatureServer/1>).
Datos editados el **2022-12-19**. La propia capa cita como fuente el
«Diagnóstico de ferias libres y persas de la comuna de La Pintana» de la
Dirección de Desarrollo Económico (2021), un correo de esa dirección del
14-11-2022 y los decretos 1900/1279 (2006), 2300/11/1763 (2020) y
00184/2021.

pintana.cl no publica los días de las ferias (su página «Ferias libres» no
tiene ese contenido), así que no hay otra fuente municipal con la que
contrastarlos. Por eso la página dice la fecha del registro y que los días
pueden cambiar.

Consulta usada (solo ferias autorizadas, en coordenadas geográficas):

```
query?where=TIPO IN ('FERIA LIBRE','FERIA PERSA')&outFields=*&returnGeometry=true&outSR=4326&geometryPrecision=6&f=geojson
```

## Qué se publica y qué no

La capa tiene 46 polígonos:

| Tipo en la capa | Polígonos | Se publica |
|---|---|---|
| FERIA LIBRE | 17 | Sí |
| FERIA PERSA | 3 | Sí |
| CACHUREO PERMISO | 12 | No: son ampliaciones de cachureo, sin tramo descrito |
| ILEGALES | 14 | No: zonas que la capa marca como no autorizadas. Publicarlas no ayuda a ir a una feria y puede perjudicar a quienes trabajan ahí |

Joaquín Edwards Bello aparece dos veces (circuitos «El Bosque» y «Santo
Tomás»), con el mismo tramo, días y horario: se publica una sola feria con
la suma de puestos (167 + 132 = 299) y una nota. Quedan 16 ferias libres y
3 persas.

## Cómo se transforma

1. `ferias.geojson` es la respuesta de la consulta, sin cambios.
2. `generar.py` comprueba que lleguen 20 polígonos, interpreta los días
   («MARTES, VIERNES Y DOMINGOS» → martes, viernes y domingo; «FESTIVOS»
   se marca aparte) y el horario («09:00-14:45»).
3. Nombres y tramos en ortografía normal, con tildes, desde una tabla por
   identificador (`READABLE`). Se corrigen erratas evidentes, contrastadas
   con OpenStreetMap: la capa escribe la misma avenida como «LA SERENA»,
   «LA SERNA» y «LA SERA» (es avenida La Serena), «OBERVATORIO»
   (Observatorio) y «ENTRE ENTRE». El texto original queda en `ferias.csv`.
4. El marcador de cada feria va en el punto de su franja más alejado del
   borde (grilla de 200 × 200), para que caiga sobre la calle.
5. El sector se calcula con la capa de sectores; coincide en las 19 ferias
   con el campo `SECTOR_` de la capa.

## Validación

`src/lib/data-integrity.ts` comprueba al compilar que cada feria tenga días,
un horario válido, puestos positivos, su franja dentro de la comuna con el
marcador adentro, que caiga en un sector y que su identificador no se repita
con el de un lugar del mapa.

## Respaldo

- `ferias.geojson`: respuesta de la capa (20 polígonos).
- `ferias.csv`: cada polígono con su texto original y el publicado.
- `SHA256SUMS.txt`: huellas de ambos.

## Vigencia

La fuente se marca vigente hasta el 2027-01-04. Al renovarla, repetir la
consulta y revisar si la capa cambió su fecha de edición.
