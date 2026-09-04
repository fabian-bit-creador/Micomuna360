# Paquete de trabajo — Transparencia La Pintana / MiComuna360

Este paquete prepara cinco archivos obtenidos de la ficha de Transparencia Activa de la Municipalidad de La Pintana (`MU124`) para la siguiente fase de **MiComuna360: Transparencia ciudadana y presupuesto abierto**.

## Qué contiene

- `00_LEEME_PRIMERO/`: instrucciones, control de calidad, diccionario de datos y prompt de trabajo.
- `01_ORIGINALES/`: copia exacta de los cinco archivos entregados por Fabián; no se deben modificar.
- `02_DATOS_NORMALIZADOS/`: tablas CSV UTF-8 listas para analizar o importar.
- `03_EXTRACCIONES_TEXTO/`: texto de los PDF para búsquedas y comprobaciones rápidas.
- `MANIFIESTO_SHA256.csv`: tamaño y huella SHA-256 de cada archivo del paquete.

## Alcance real de los datos

1. Los dos índices presupuestarios contienen **28 enlaces**: 14 del área municipal y 14 de salud, con ingresos y gastos para enero-julio de 2026. Son un inventario de documentos, no contienen aún las cifras de esos 28 informes.
2. El Balance de comprobación y saldos contiene **109 cuentas contables** de julio de 2026 y fue conciliado contra los totales impresos.
3. El informe denominado “Pasivos” contiene **67 filas** de julio de 2026. Incluye cuentas con prefijo `115` y `215`; no debe sumarse ni presentarse automáticamente como un único total de pasivos.
4. El PDF recibido con el nombre “Estado de situación financiera” **no contiene ese estado**. Su contenido es una segunda generación del mismo Balance de comprobación y saldos, con otra hora de emisión. Se conserva por trazabilidad, pero no se volvió a normalizar ni debe contarse dos veces.

## Orden recomendado

1. Leer `INFORME_CONTROL_CALIDAD.md`.
2. Leer `DICCIONARIO_DE_DATOS.md`.
3. Revisar los originales antes de publicar cualquier interpretación.
4. Usar `PROMPT_PARA_CLAUDE.md` como instrucción de trabajo en el repositorio.

## Regla editorial esencial

No confundir saldo contable, obligación/pasivo, ejecución presupuestaria, devengado y pago efectivo. Si un concepto no está demostrado por el documento fuente, debe quedar como pendiente y no inferirse.
