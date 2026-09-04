# Informe de control de calidad

## 1. Resultado de la revisión

| Archivo original | Resultado | Uso recomendado |
|---|---|---|
| Balance de comprobación y saldos agregado, julio 2026, municipal | 7 páginas; 109 cuentas; tabla extraída y totales conciliados | Análisis contable técnico, con definiciones visibles |
| Pasivos, julio 2026, municipal | 2 páginas; 67 filas; tabla extraída | Análisis preliminar, separando prefijos `115` y `215` |
| Archivo rotulado “Estado de situación financiera” | Es el mismo Balance de comprobación y saldos; solo cambia la hora de generación | Conservar como evidencia; excluir de conteos y métricas |
| Índice de ejecución presupuestaria municipal | 14 enlaces: ingresos y gastos, enero-julio 2026 | Inventario para descarga posterior |
| Índice de ejecución presupuestaria salud | 14 enlaces: ingresos y gastos, enero-julio 2026 | Inventario para descarga posterior |

## 2. Validación del Balance de comprobación y saldos

La extracción produjo 109 filas con seis columnas monetarias. La suma de las filas coincide exactamente con la línea de totales publicada:

| Columna | Total CLP |
|---|---:|
| Saldo inicial deudor | 96.321.351.617 |
| Saldo inicial acreedor | 95.792.566.823 |
| Débitos del mes | 27.896.283.359 |
| Créditos del mes | 27.898.074.876 |
| Saldo final deudor | 103.396.363.893 |
| Saldo final acreedor | 102.869.370.616 |

Estos totales corresponden a un balance de comprobación dentro de un sistema de partida doble. **No equivalen por sí solos a presupuesto disponible, gasto ejecutado o dinero pagado.**

Los nombres de algunas cuentas aparecen truncados en el propio PDF. La tabla normalizada conserva el texto publicado; no se completaron etiquetas con suposiciones.

## 3. Validación del informe “Pasivos”

- Filas extraídas: 67.
- Cuentas con prefijo `215`: 58 filas, suma técnica de montos publicados de **$1.499.437.503 CLP**.
- Cuentas con prefijo `115`: 9 filas, suma técnica de **$31.279.639 CLP**.
- Suma mecánica de todas las filas: $1.530.717.142 CLP. No usar esta cifra como indicador ciudadano porque mezcla prefijos contables diferentes.

El título del documento dice “Pasivos”, pero incluye cuentas `115`, que en la nomenclatura del informe aparecen junto a cuentas por cobrar. Antes de definir un KPI debe comprobarse la clasificación contable oficial y el significado preciso del monto publicado.

Se reconstruyeron únicamente dos continuaciones de texto que el PDF partía en una segunda línea (`PAGAD` y `PROPIEDAD`). Los importes no fueron alterados.

## 4. Duplicado/mal rotulado

Los PDF 01 y 03 tienen bytes y horas de creación distintos, pero ambos muestran:

- título interno “BALANCE DE COMPROBACION Y SALDOS”;
- periodo julio de 2026;
- área municipal;
- las mismas 109 cuentas y los mismos importes.

Después de sustituir solamente la hora de generación, el texto de ambos produce la misma huella SHA-256:

`f687d877767f91a8b022c941d99a59ddeb08e3b5cce38a08170174d8bd731b55`

Por ello, el archivo 03 se conserva como original, pero se excluye de los CSV analíticos.

## 5. Normalización de los índices del portal

Los CSV originales estaban codificados en ISO-8859-1, separados por punto y coma y guardaban cada enlace como HTML. Las versiones normalizadas:

- usan UTF-8 con BOM;
- convierten las fechas a `AAAA-MM-DD`;
- extraen la URL limpia;
- identifican área, mes y tipo de flujo (`ingresos` o `gastos`);
- conservan archivo y fila de origen;
- marcan todos los enlaces como `pendiente_descarga`.

No se verificó en este paquete el contenido remoto de los 28 enlaces.

## 6. Qué se puede mostrar ahora

Con advertencias y procedencia visibles, puede prepararse:

- cobertura documental enero-julio de 2026 por área y tipo de informe;
- un inventario navegable de los 28 enlaces;
- una vista técnica de las cuentas del Balance de julio;
- un gráfico preliminar de montos del informe “Pasivos”, filtrando y explicando el prefijo `215`.

Todavía no se puede afirmar de forma sólida:

- cuánto presupuesto anual se ha ejecutado;
- porcentaje ejecutado del presupuesto vigente;
- gasto pagado por área, programa o proveedor;
- comparación anual o interanual;
- consolidado municipal + salud.

Para eso deben descargarse, extraerse y conciliarse los balances mensuales de ingresos y gastos enlazados en los índices.
