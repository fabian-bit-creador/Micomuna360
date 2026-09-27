# Indicadores con contexto — La Pintana (descarga del 2026-09-27)

Genera `src/data/communes/la-pintana/indicators.ts`. Ninguna cifra se escribe
a mano: todo sale de las descargas oficiales cuyas huellas están en
`SHA256SUMS.txt`.

## Principio: contexto, no puntaje

- La comuna se compara con **su propia historia** y con el **promedio simple
  de las comunas de la Región Metropolitana con dato válido** ese año (se
  publica cuántas comunas entran en el promedio).
- No se calculan posiciones, rankings ni notas, y los gráficos no usan
  colores de «bien» o «mal».
- Cada indicador explica qué mide y qué **no** mide.

## Fuentes

| Fuente | Qué se usó | Archivo de respaldo |
|---|---|---|
| SINIM, datos municipales (exportación oficial) | Región Metropolitana completa, 2017–2025: ITPC, ISOC001, ISAL005, ISAL23, IADM75, IADM74 | `sinim-rm-2017-2025.csv` |
| MINEDUC, resumen de matrícula por establecimiento | Archivos 2020 a 2025 (corte al 30 de abril) | `mineduc-matricula-2020-2025.csv` |

Los montos de SINIM (ISAL23, IADM74) se descargaron con el factor de
actualización de SINIM activado: pesos de diciembre de 2025 (base
2009 = 100), redondeados a miles por la propia fuente.

## Reglas de validez

Un valor publicado como «No Recepcionado», «Descontinuado», vacío o fuera del
rango plausible se trata como **sin dato** (null), nunca como cero:

| Variable | Rango válido |
|---|---|
| ISAL005 cobertura de salud primaria municipal | 1 a 200 % (puede superar 100 % por inscritos de otras comunas) |
| ISAL23 gasto en salud por inscrito | $20.000 a $5.000.000 |
| IADM75 dependencia del FCM | 1 a 100 % |
| IADM74 ingresos propios permanentes por habitante | $1.000 a $5.000.000 |
| ISOC001 pobreza por ingresos CASEN | mayor que 0 y menor que 100 % |
| ITPC población | 1.000 a 10.000.000 |

## Lo que se descartó, y por qué

- **Educación municipal de SINIM (asistencia, alumnos por docente, matrícula
  municipal).** Desde el traspaso al Servicio Local de Educación Pública, La
  Pintana y muchas comunas informan 0 o valores imposibles (por ejemplo,
  1,97 alumnos por docente en 2024). La matrícula se toma de MINEDUC.
- **Médicos contratados (MTFCM).** La serie salta de 58 a 192 y a 72 entre
  años consecutivos: no es comparable.
- **Mortalidad infantil (ICAR015).** Con pocos casos por año la tasa comunal
  varía mucho y se presta a lecturas equivocadas.
- **Población antes de 2019.** Ese año cambió la proyección oficial que usa
  SINIM (de 215.543 a 188.748 habitantes); solo se muestra el último dato.
- **Seguridad.** El dato adecuado son los casos policiales por 100.000
  habitantes del CEAD (Subsecretaría de Prevención del Delito), que combina
  Carabineros y PDI. El sitio del CEAD no respondió desde el entorno de
  trabajo; lo disponible en datos.gob.cl es de 2011–2015 o solo de la PDI,
  y publicar solo la PDI daría una imagen parcial. Queda pendiente.

## Resultado (valores del último año)

| Indicador | La Pintana | Promedio comunas RM |
|---|---|---|
| Población estimada INE (2025) | 188.806 | — |
| Pobreza por ingresos, última CASEN vigente | 9,3 % | 5,0 % (52 comunas) |
| Población inscrita en salud municipal (2025) | 78,8 % | 66,7 % (40 comunas) |
| Gasto en salud por inscrito (2025) | $281.000 | $261.796 (49 comunas) |
| Dependencia del FCM sobre ingresos propios (2025) | 81,2 % | 40,7 % (52 comunas) |
| Ingresos propios permanentes por habitante (2025) | $42.000 | $213.942 (52 comunas) |
| Matrícula en colegios de la comuna, 2020 → 2025 | 35.917 → 32.706 (−8,9 %) | −3,6 % |
| Matrícula por dependencia (2025) | 84,2 % part. subvencionada · 15,8 % SLEP Del Pino | 58,5 % · 15,8 % municipal · 14,9 % part. pagada · 9,1 % SLEP · 1,7 % adm. delegada |
