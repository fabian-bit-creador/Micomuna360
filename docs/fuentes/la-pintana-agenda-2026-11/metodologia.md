# Agenda cultural — La Pintana (consulta del 2026-11-15)

Funciones del Teatro Municipal que se muestran en la agenda (`/actividades`)
y en la portada. Las pasadas se ocultan solas al terminar.

## Fuente

Cartelera de la Corporación Cultural de La Pintana
(https://ticket.culturapintana.cl/cartelera/), fuente `lp-cultura-cartelera`.
Cada función tiene su ficha, con fecha, hora de inicio y de término, lugar
y forma de entrada.

## Qué se publica y qué no

- Las funciones con fecha desde el día de la consulta: 15, 17 y 20 de
  noviembre de 2026. Las del 6, 12 y 14 de noviembre ya habían pasado. La
  cartelera, ordenada por fecha de la actividad, no tiene otras posteriores
  (`cartelera.txt`).
- Título, fecha, hora de inicio y de término, lugar, forma de entrada y
  enlace a la ficha oficial.
- La descripción es propia y breve. No nombra a personas del elenco ni de
  la dirección. El título conserva el nombre con que se anuncia la función
  (por ejemplo, el del mago o el del expositor).
- No se publica cuántas entradas quedan, porque cambia a cada rato. Si la
  ficha decía «Sin existencias», se agrega que las entradas en línea
  figuraban agotadas el día de la consulta.
- La forma de entrada se arma solo con lo que dice la ficha:
  - entrada reservada en línea, con su máximo por persona, o actividad
    gratuita y abierta a la comunidad (FestiCRIN, en el Parque Mapuhue);
  - cuántos minutos antes llegar;
  - la edad mínima, si el acceso la indica (Protocolo N.E.M.O., mayores de
    14 años).

## Cómo se transforma

1. Cada ficha se descarga con
   `curl -sS -L -A "Mozilla/5.0" <url> -o <slug>.html` en una carpeta
   aparte.
2. `capturar.py` guarda en `fichas/<slug>.txt` solo el bloque de entrada,
   fecha, hora, lugar y acceso. No guarda la descripción.
3. `generar.py` lee las fichas y escribe
   `src/data/communes/la-pintana/events-cultura.ts` y `agenda.csv`:
   - Las horas «11:00 a.m.», «12:10 p.m.» y «17:00 -03» quedan en formato
     HH:MM.
   - La zona horaria es la de Chile continental: -03:00 desde el primer
     domingo de septiembre hasta el primer domingo de abril, y -04:00 el
     resto del año.
   - El generador se detiene si cambia la cantidad de fichas, si falta el
     título o la descripción de una, o si la forma de entrada no es una de
     las conocidas.
   - Respecto de octubre, `capturar.py` guarda además la línea «Actividad
     gratuita…» y `generar.py` arma el acceso desde la ficha
     (`access_text`).

## Validación

`data-integrity.ts` revisa al compilar que cada actividad tenga fechas
ISO, que termine después de empezar, que su enlace sea https y que su
fuente exista. La prueba «la agenda no muestra actividades pasadas»
revisa que la página no muestre funciones terminadas.

## Respaldo

- `cartelera.txt`: primera página de la cartelera ordenada por fecha.
- `fichas/*.txt`: bloque de datos de cada ficha.
- `agenda.csv`: lo publicado, con el título original al lado.
- `SHA256SUMS.txt`: huella de los archivos anteriores.

## Vigencia

La fuente se marca vigente hasta el 2026-12-15. La cartelera suma
funciones durante el mes, así que conviene revisarla a principios de
diciembre. Para renovarla:
1. Crear la carpeta `la-pintana-agenda-<aaaa-mm>`.
2. Descargar las fichas nuevas y correr `capturar.py`.
3. Agregar sus textos en `generar.py` y ajustar `EXPECTED`.
