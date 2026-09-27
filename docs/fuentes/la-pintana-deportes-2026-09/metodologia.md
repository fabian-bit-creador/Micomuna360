# Escuelas y talleres deportivos — La Pintana (consulta del 2026-09-27)

Genera `src/data/communes/la-pintana/sports.ts`. Ningún programa se escribe a
mano: todos salen del listado oficial.

## Fuente

Corporación Municipal de Deportes de La Pintana, portada de
<https://www.pintanadeportes.cl/>, sección «Escuelas y talleres deportivos»
(«Número de talleres o escuelas: 71»), segundo semestre 2026.

Para cada ficha se toma: nombre, dirección, días, horario y tipo («Escuelas
deportivas» o «Talleres deportivos»). **El nombre del profesor no se copia**
(dato personal, Ley 21.719).

La página de inscripción
(<https://www.pintanadeportes.cl/productos-categoria/inscripcion-escuelas/>)
se usó solo para describir cómo se inscribe: por semestre, valor según
escuela y categoría, y Registro Social de Hogares para acreditar residencia.
No se publican montos porque varían por escuela.

## Cómo se transforma

1. `capturar.mjs` guarda el texto visible de la portada en `home.txt`.
2. `generar.py home.txt` extrae las 71 fichas y comprueba que coincidan con
   el total que declara la página; si no, se detiene.
3. Nombres en ortografía normal (p. ej. «BASQUETBOL» → «Básquetbol»); la
   disciplina agrupa variantes («Atletismo lanzamiento» y «Mini atletismo»
   son «Atletismo»).
4. El sufijo del nombre se interpreta: si es un día («- SÁBADO») se descarta,
   porque los días ya están en la ficha; si es un lugar («- CLUB DE CAMPO»)
   pasa a ser el recinto.
5. Las cuatro direcciones de recintos de la Corporación que ya están en el
   directorio se enlazan a su ficha (`placeId`): Ciudad de México 1589
   (Estadio Municipal), Santa Rosa 10812 (Club de Campo), Patagonia 12980
   (Polideportivo) y Avenida Gabriela 3343 (Complejo Las Rosas).
6. Los días se normalizan («LUNES A VIERNES» → los cinco días) y los horarios
   quedan en formato HH:MM. Se publican tal como vienen, incluso si parecen
   raros (los patinajes artísticos avanzado e intermedio figuran de 18:45 a
   19:00).

`src/lib/data-integrity.ts` valida al compilar que cada programa tenga días,
horas válidas con término posterior al inicio, fuente existente y, si enlaza
un lugar, que ese lugar exista.

## Respaldo

- `programas.csv`: las 71 fichas publicadas, con el nombre oficial original.
- `SHA256SUMS.txt`: huella del CSV.

El texto completo de la página no se guarda porque incluye los nombres de
los profesores.

## Vigencia

La fuente se marca vigente hasta el 2026-12-31 (fin del semestre). Al
comenzar el primer semestre 2027 hay que repetir la captura.
