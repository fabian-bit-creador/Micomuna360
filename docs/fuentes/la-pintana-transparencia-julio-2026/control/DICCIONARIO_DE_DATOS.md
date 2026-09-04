# Diccionario de datos

Todos los archivos de `02_DATOS_NORMALIZADOS` usan CSV con coma, codificación UTF-8 con BOM, fechas ISO y montos enteros en pesos chilenos (`CLP`). Los códigos contables deben tratarse como texto.

## Índices de ejecución presupuestaria

Archivos:

- `indice_ejecucion_presupuestaria_municipal_2026.csv`
- `indice_ejecucion_presupuestaria_salud_2026.csv`
- `indice_ejecucion_presupuestaria_municipal_y_salud_2026.csv`

| Campo | Significado |
|---|---|
| `record_id` | Identificador estable creado para MiComuna360 |
| `organism_code` | Código oficial del organismo (`MU124`) |
| `area` | `municipal` o `salud` |
| `year`, `month_number`, `month_name` | Periodo listado por el portal |
| `publication_date` | Fecha publicada en el índice |
| `report_end_date` | Fecha de corte declarada en la descripción |
| `flow_type` | `ingresos` o `gastos` |
| `document_type` | Tipo documental normalizado |
| `description` | Texto limpiado, sin caracteres espurios |
| `document_url`, `url_host` | Enlace limpio y dominio de origen |
| `source_file`, `source_row` | Procedencia dentro del CSV original |
| `download_status` | Estado actual; en este paquete es `pendiente_descarga` |

## Balance de comprobación y saldos

Archivo: `balance_comprobacion_saldos_julio_2026_municipal.csv`

| Campo | Significado |
|---|---|
| `account_code` | Código contable completo |
| `account_class` | Primer dígito del código; no reemplaza una clasificación oficial |
| `account_name_as_published` | Denominación tal como fue extraída del PDF |
| `opening_debit_clp`, `opening_credit_clp` | Saldos iniciales del mes |
| `period_debits_clp`, `period_credits_clp` | Movimientos de julio |
| `ending_debit_clp`, `ending_credit_clp` | Saldos finales del mes |
| `source_page`, `source_file` | Página y archivo original |
| `extraction_method` | Método reproducible de extracción |
| `verification_status` | Nivel de control aplicado |

## Informe “Pasivos”

Archivo: `pasivos_julio_2026_municipal.csv`

| Campo | Significado |
|---|---|
| `account_code` | Código contable completo |
| `account_prefix` | Tres primeros dígitos (`115` o `215`) |
| `account_name_as_published` | Denominación publicada; se conservaron errores ortográficos del origen |
| `amount_clp` | Monto entero publicado |
| `source_page`, `source_file` | Página y archivo original |
| `verification_status` | Advierte que falta validar la clasificación contable |

## Convenciones de procedencia recomendadas para el proyecto

Al importar estos datos, no eliminar: documento original, URL oficial, periodo, área, tipo documental, fecha de publicación, fecha de consulta, hash, página/fila, método de extracción, estado de verificación y observaciones. Un dato ciudadano debe poder rastrearse hasta su fila o página fuente.
