# Control de calidad — Ejecución presupuestaria al 30 de junio de 2026

Municipalidad de La Pintana (código MU124). Transcripción y verificación
realizadas el 2026-09-27.

## Documentos

Los 28 informes mensuales del inventario (`transparency/budget-index.ts`) se
descargaron directamente desde Transparencia Activa y `cloud.pintana.cl`. Sus
huellas SHA-256 están en `SHA256SUMS.txt`. Se usaron cuatro:

| Informe | Páginas | Emitido |
|---|---|---|
| `MU124-municipal-2026-06-gastos` | 7 | 07/07/2026 |
| `MU124-municipal-2026-06-ingresos` | 3 | 07/07/2026 |
| `MU124-salud-2026-06-gastos` | 5 | 07/07/2026 |
| `MU124-salud-2026-06-ingresos` | 2 | 07/07/2026 |

Además se consultó el total de `MU124-municipal-2026-05-gastos` para el
control de continuidad.

## Qué se transcribió

Los informes de enero a junio son PDF escaneados (imagen, sin capa de texto),
así que no se pueden extraer automáticamente. Se copiaron a mano, desde las
páginas renderizadas, solo las filas de **total, subtítulo y tres ítems
clave** (Fondo Común Municipal, aporte del municipio a salud desde ambos
lados). 39 filas, en **miles de pesos** tal como vienen impresas:
`ejecucion-junio-2026.csv`.

Columnas usadas:

- Gastos: presupuesto inicial, vigente, saldo presupuestario, **obligado
  acumulado** (comprometido) y **pagado acumulado**.
- Ingresos: presupuesto inicial, vigente, saldo presupuestario, **devengado
  acumulado** y **percibido acumulado**.

## Controles (todos pasan; se ejecutan en cada build)

1. **Saldo fila por fila** — vigente − comprometido (o devengado) = saldo
   impreso, exacto en las 39 filas.
2. **Suma de subtítulos contra el total impreso**, en las cinco columnas de
   los cuatro informes. Diferencia máxima: 1 (mil pesos), por redondeo del
   informe:
   - Gastos municipal, pagado: 25.715.042 vs. 25.715.041.
   - Ingresos salud, percibido: 27.963.594 vs. 27.963.595.
3. **Cruce entre informes** — el pagado del ítem municipal 24-03-101 «A
   servicios incorporados a su gestión» (1.236.393) es idéntico al percibido
   del ítem de salud 05-03-101 «De la Municipalidad» (1.236.393).
4. **Continuidad mayo → junio (gastos municipal, total)**:
   - Pagado: 20.864.471 (mayo) + 4.850.570 (parcial junio) = 25.715.041 ✔
   - Obligado: 32.274.191 + 2.111.150 = 34.385.341 vs. 34.385.340 (redondeo) ✔

Los controles 1 a 3 están escritos como código en
`src/data/communes/la-pintana/transparency/budget-execution.ts`: si una cifra
se altera, el build falla.

## Lo que NO se usa, y por qué

- **Columna «devengado» de gastos.** No es consistente entre informes
  consecutivos: en mayo el devengado acumulado (17.930.420) es menor que el
  pagado acumulado (20.864.471), y mayo + parcial de junio (21.454.768) no
  da el devengado acumulado de junio (25.715.041). Se usan obligado y pagado,
  que sí cuadran.
- **Informes de julio.** Vienen en un formato nuevo, digital, cuyo filtro es
  01-07-2026 a 31-07-2026: muestran solo los movimientos de julio (el
  presupuesto vigente de gastos aparece como 149.487.000 pesos, que es la
  modificación del mes, no el presupuesto del año). No se suman a junio para
  no derivar cifras que el municipio no publicó.

## Observaciones para el lector técnico

- Subtítulo 34 (deuda flotante): pagado sin obligado en el año, porque se
  comprometió en el ejercicio anterior. La página lo aclara junto a la barra.
- Subtítulo 25 (íntegros al fisco) municipal: sin presupuesto inicial;
  aparece por modificación.
- Área salud, subtítulo 35 (saldo final de caja): solo presupuesto inicial
  (271.088); se incluye para que cuadre la suma del presupuesto inicial.
