# Fichas de trámite (octubre de 2026)

Las fichas de cuatro casillas de `/servicios` (para quién, costo, dónde,
plazo), con su paso a paso y qué llevar, salen solo de la página oficial de
cada trámite. Por ahora hay dos, las únicas con página municipal completa:

| Trámite | Fuente | Página |
|---|---|---|
| Permiso de circulación | `lp-muni-permisos` | https://pintana.cl/?page_id=7910 |
| Licencia de conducir | `lp-muni-licencias` | https://pintana.cl/?page_id=8115 |

## Cómo se llenaron

1. Se descargó cada página el 2026-10-05 y se guardó el texto del contenido
   (sin menú ni pie) en `permisos-circulacion.txt` y `licencias-conducir.txt`.
2. Cada casilla resume lo que dice la página, en lenguaje simple y sin
   agregar datos. Lo que la página no publica queda en `null` y la ficha
   dice «La página oficial no lo publica». Es el caso del valor de la
   licencia de conducir.
3. No se publican plazos legales que la página no menciona (por ejemplo,
   la fecha límite del permiso de circulación).
4. «Dónde» enlaza al lugar del directorio, la Dirección de Tránsito
   (`lp-pl-transito`).

## Diferencia entre fuentes

La página de permisos ubica la Dirección de Tránsito en Baldomero Lillo
N°1666. La página de licencias y el geoportal la ubican en el N°1966. La
ficha enlaza al lugar del directorio (N°1966). Conviene confirmarlo con el
municipio.

## Respaldo

- `permisos-circulacion.txt` y `licencias-conducir.txt`: texto de las
  páginas.
- `SHA256SUMS.txt`: huella de ambos archivos.

## Vigencia

Las dos fuentes quedan vigentes hasta el 2027-01-05. Al vencer, se repite
la descarga y se comparan los textos.
