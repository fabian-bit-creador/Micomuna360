import type { BudgetLine } from "@/types";

/**
 * Ejecución presupuestaria de La Pintana al 30 de junio de 2026: los cuatro
 * "Balance presupuestario ... al mes de junio del 2026" (gastos e ingresos,
 * áreas municipal y salud) publicados en Transparencia Activa.
 *
 * CÓMO SE OBTUVO: los informes de enero a junio son PDF escaneados (imagen,
 * sin texto). Se transcribieron solo las filas de total, subtítulo y algunos
 * ítems clave, en MILES de pesos tal como vienen impresos, y cada fila se
 * verifica aquí mismo contra el propio informe:
 *
 * 1. Fila por fila: vigente − comprometido = saldo impreso (exacto).
 * 2. Por columna: los subtítulos suman el total impreso (±1 mil pesos por
 *    redondeo del informe, que trabaja en miles).
 * 3. Entre informes: lo que el área municipal pagó a "servicios incorporados
 *    a su gestión" es exactamente lo que el área de salud registra como
 *    recibido de la municipalidad.
 *
 * Si alguna comprobación falla, el build se detiene: una cifra mal copiada
 * nunca llega al vecino. Detalle del control en
 * docs/fuentes/la-pintana-ejecucion-junio-2026/.
 *
 * NO SE USA la columna "devengado" de gastos: entre informes consecutivos no
 * calza (en mayo el devengado acumulado es menor que lo pagado). Se usan lo
 * comprometido (obligado) y lo pagado, que sí cuadran de un mes a otro.
 */

const SOURCE = "lp-ta-ejecucion-junio-2026";
const CUTOFF = "2026-06-30";

/** Montos en el orden impreso: inicial, vigente, saldo, comprometido, pagado. */
type Printed = [number, number, number, number, number];

function line(
  documentId: string,
  code: string,
  level: BudgetLine["level"],
  officialName: string,
  label: string,
  [initialK, currentK, balanceK, committedK, paidK]: Printed,
  note: string | null = null
): BudgetLine {
  const [, area, , , flow] = documentId.split("-");
  return {
    id: `${documentId}-${code}`,
    area: area as BudgetLine["area"],
    flow: flow as BudgetLine["flow"],
    year: 2026,
    cutoffDate: CUTOFF,
    code,
    level,
    officialName,
    label,
    initialK,
    currentK,
    committedK,
    paidK,
    balanceK,
    note,
    documentId,
    sourceId: SOURCE,
  };
}

const MUNI_GASTOS = "MU124-municipal-2026-06-gastos";
const MUNI_INGRESOS = "MU124-municipal-2026-06-ingresos";
const SALUD_GASTOS = "MU124-salud-2026-06-gastos";
const SALUD_INGRESOS = "MU124-salud-2026-06-ingresos";

const DEUDA_NOTE =
  "Son compromisos de años anteriores (deuda flotante): este año solo se pagan, por eso no aparecen como comprometidos.";

export const budgetExecution: BudgetLine[] = [
  // ── Área municipal · gastos ─────────────────────────────────────────
  line(MUNI_GASTOS, "215", "total", "Gastos", "Total de gastos",
    [47_865_315, 64_287_585, 29_902_245, 34_385_340, 25_715_041]),
  line(MUNI_GASTOS, "215-21", "subtitulo", "Gastos en personal",
    "Sueldos del personal municipal",
    [17_242_647, 17_934_875, 10_066_172, 7_868_703, 7_868_703]),
  line(MUNI_GASTOS, "215-22", "subtitulo", "Bienes y servicios de consumo",
    "Servicios y compras: aseo, luz, agua, mantención",
    [19_907_341, 23_239_817, 5_320_783, 17_919_034, 9_105_324]),
  line(MUNI_GASTOS, "215-23", "subtitulo", "Prestaciones de seguridad social",
    "Indemnizaciones y desahucios",
    [920_000, 920_000, 529_122, 390_878, 390_878]),
  line(MUNI_GASTOS, "215-24", "subtitulo", "Transferencias corrientes",
    "Aportes a instituciones, organizaciones y ayudas sociales",
    [6_320_041, 6_907_657, 2_233_020, 4_674_637, 4_104_339]),
  line(MUNI_GASTOS, "215-24-03-101", "item",
    "A servicios incorporados a su gestión",
    "Aporte a servicios traspasados al municipio (salud)",
    [1_905_055, 1_847_240, 610_847, 1_236_393, 1_236_393]),
  line(MUNI_GASTOS, "215-25", "subtitulo", "Íntegros al fisco",
    "Reintegro de fondos no utilizados",
    [0, 2_982_340, 2_325_929, 656_411, 656_411]),
  line(MUNI_GASTOS, "215-26", "subtitulo", "Otros gastos corrientes",
    "Devoluciones, sentencias y fondos de terceros",
    [939_063, 1_068_783, 355_069, 713_714, 713_714]),
  line(MUNI_GASTOS, "215-29", "subtitulo",
    "Adquisición de activos no financieros",
    "Compra de vehículos, equipos y computadores",
    [445_932, 794_406, 411_988, 382_418, 270_977]),
  line(MUNI_GASTOS, "215-31", "subtitulo", "Iniciativas de inversión",
    "Obras y proyectos de inversión",
    [2_035_291, 8_905_332, 7_175_689, 1_729_643, 1_113_707]),
  line(MUNI_GASTOS, "215-33", "subtitulo", "Transferencias de capital",
    "Aportes a programas de vivienda (SERVIU)",
    [55_000, 80_000, 30_098, 49_902, 49_902]),
  line(MUNI_GASTOS, "215-34", "subtitulo", "Servicio de la deuda",
    "Pago de cuentas de años anteriores",
    [0, 1_454_375, 1_454_375, 0, 1_441_087], DEUDA_NOTE),

  // ── Área municipal · ingresos (comprometido = devengado; pagado = percibido)
  line(MUNI_INGRESOS, "115", "total", "Ingresos", "Total de ingresos",
    [47_865_315, 64_287_585, 23_718_535, 40_569_050, 39_448_486]),
  line(MUNI_INGRESOS, "115-03", "subtitulo",
    "Tributos sobre el uso de bienes y la realización de actividades",
    "Impuestos y derechos locales: patentes, permisos de circulación, aseo y contribuciones",
    [7_476_500, 7_556_500, 2_983_290, 4_573_210, 4_500_327]),
  line(MUNI_INGRESOS, "115-05", "subtitulo", "Transferencias corrientes",
    "Transferencias del Estado para gastos del año",
    [1_279_000, 1_279_000, 428_776, 850_224, 850_224]),
  line(MUNI_INGRESOS, "115-06", "subtitulo", "Rentas de la propiedad",
    "Intereses de depósitos",
    [640_000, 650_000, 284_411, 365_589, 365_589]),
  line(MUNI_INGRESOS, "115-07", "subtitulo", "Ingresos de operación",
    "Venta de bienes en remate",
    [0, 0, -18_311, 18_311, 18_311]),
  line(MUNI_INGRESOS, "115-08", "subtitulo", "Otros ingresos corrientes",
    "Otros ingresos corrientes (incluye el Fondo Común Municipal)",
    [37_063_315, 36_032_556, 18_908_088, 17_124_468, 16_820_104]),
  line(MUNI_INGRESOS, "115-08-03", "item",
    "Participación del Fondo Común Municipal", "Fondo Común Municipal",
    [35_707_015, 34_661_256, 18_647_650, 16_013_606, 15_907_961]),
  line(MUNI_INGRESOS, "115-12", "subtitulo", "Recuperación de préstamos",
    "Cobro de ingresos pendientes de años anteriores",
    [605_000, 898_040, 1, 898_039, 154_722]),
  line(MUNI_INGRESOS, "115-13", "subtitulo",
    "Transferencias para gastos de capital",
    "Transferencias del Estado para obras",
    [1_500, 1_535_006, 1_132_280, 402_726, 402_726]),
  line(MUNI_INGRESOS, "115-15", "subtitulo", "Saldo inicial de caja",
    "Dinero en caja al comenzar el año",
    [800_000, 16_336_483, 0, 16_336_483, 16_336_483]),

  // ── Área salud · gastos ─────────────────────────────────────────────
  line(SALUD_GASTOS, "215", "total", "Gastos", "Total de gastos",
    [46_620_125, 49_880_898, 27_044_947, 22_835_951, 22_396_160]),
  line(SALUD_GASTOS, "215-21", "subtitulo", "Gastos en personal",
    "Sueldos y honorarios de los equipos de salud",
    [35_768_487, 36_102_470, 19_783_903, 16_318_567, 16_307_747]),
  line(SALUD_GASTOS, "215-22", "subtitulo", "Bienes y servicios de consumo",
    "Insumos, materiales y servicios",
    [7_554_578, 9_183_191, 4_821_832, 4_361_359, 3_018_694]),
  line(SALUD_GASTOS, "215-23", "subtitulo", "Prestaciones de seguridad social",
    "Indemnizaciones y desahucios",
    [518_448, 1_296_728, 106_516, 1_190_212, 1_190_212]),
  line(SALUD_GASTOS, "215-24", "subtitulo", "Transferencias corrientes",
    "Premios y otras transferencias",
    [1_000, 1_000, 1_000, 0, 0]),
  line(SALUD_GASTOS, "215-26", "subtitulo", "Otros gastos corrientes",
    "Devoluciones y compensaciones",
    [673_765, 918_365, 909_190, 9_175, 9_069]),
  line(SALUD_GASTOS, "215-29", "subtitulo",
    "Adquisición de activos no financieros",
    "Compra de vehículos, equipos y programas informáticos",
    [932_759, 1_330_182, 373_544, 956_638, 822_171]),
  line(SALUD_GASTOS, "215-34", "subtitulo", "Servicio de la deuda",
    "Pago de cuentas de años anteriores",
    [900_000, 1_048_962, 1_048_962, 0, 1_048_267], DEUDA_NOTE),
  line(SALUD_GASTOS, "215-35", "subtitulo", "Saldo final de caja",
    "Reserva de caja para el cierre del año",
    [271_088, 0, 0, 0, 0]),

  // ── Área salud · ingresos ───────────────────────────────────────────
  line(SALUD_INGRESOS, "115", "total", "Ingresos", "Total de ingresos",
    [46_620_125, 49_880_898, 15_906_443, 33_974_455, 27_963_595]),
  line(SALUD_INGRESOS, "115-05", "subtitulo", "Transferencias corrientes",
    "Transferencias para la atención de salud",
    [41_485_831, 41_617_962, 15_048_062, 26_569_900, 20_802_946]),
  line(SALUD_INGRESOS, "115-05-03-006", "item", "Del Servicio de Salud",
    "Servicio de Salud (aportes del Estado)",
    [38_275_379, 38_404_818, 13_522_792, 24_882_026, 19_121_688]),
  line(SALUD_INGRESOS, "115-05-03-101", "item",
    "De la Municipalidad a servicios incorporados a su gestión",
    "Aporte del municipio",
    [1_894_209, 1_916_310, 679_917, 1_236_393, 1_236_393]),
  line(SALUD_INGRESOS, "115-06", "subtitulo", "Rentas de la propiedad",
    "Intereses de depósitos",
    [146_471, 146_471, 5_630, 140_841, 140_841]),
  line(SALUD_INGRESOS, "115-08", "subtitulo", "Otros ingresos corrientes",
    "Otros ingresos, sobre todo reembolsos de licencias médicas",
    [1_802_104, 1_802_104, 852_751, 949_353, 705_446]),
  line(SALUD_INGRESOS, "115-12", "subtitulo", "Recuperación de préstamos",
    "Cobro de ingresos pendientes de años anteriores",
    [482_266, 201_486, 0, 201_486, 201_486]),
  line(SALUD_INGRESOS, "115-15", "subtitulo", "Saldo inicial de caja",
    "Dinero en caja al comenzar el año",
    [2_703_453, 6_112_875, 0, 6_112_875, 6_112_875]),
];

/*
 * Conciliación automática contra los propios informes. Tolerancia por
 * columna: el informe redondea cada fila a miles de pesos, así que la suma
 * de subtítulos puede diferir del total impreso en 1.
 */
const ROUNDING_K = 1;
const columns = [
  "initialK",
  "currentK",
  "balanceK",
  "committedK",
  "paidK",
] as const;

for (const row of budgetExecution) {
  if (row.currentK - row.committedK !== row.balanceK) {
    throw new Error(
      `Ejecución presupuestaria: la fila ${row.id} no cuadra (vigente ` +
        `${row.currentK} − comprometido ${row.committedK} ≠ saldo impreso ${row.balanceK}).`
    );
  }
}

for (const documentId of [MUNI_GASTOS, MUNI_INGRESOS, SALUD_GASTOS, SALUD_INGRESOS]) {
  const rows = budgetExecution.filter((r) => r.documentId === documentId);
  const total = rows.find((r) => r.level === "total");
  if (!total) throw new Error(`Ejecución presupuestaria: ${documentId} sin total.`);
  for (const column of columns) {
    const sum = rows
      .filter((r) => r.level === "subtitulo")
      .reduce((acc, r) => acc + r[column], 0);
    if (Math.abs(sum - total[column]) > ROUNDING_K) {
      throw new Error(
        `Ejecución presupuestaria: en ${documentId} los subtítulos suman ` +
          `${sum} en "${column}" y el total impreso es ${total[column]}.`
      );
    }
  }
}

/* Lo que el municipio pagó a salud es lo que salud dice haber recibido. */
const paidToHealth = budgetExecution.find(
  (r) => r.documentId === MUNI_GASTOS && r.code === "215-24-03-101"
);
const receivedByHealth = budgetExecution.find(
  (r) => r.documentId === SALUD_INGRESOS && r.code === "115-05-03-101"
);
if (!paidToHealth || !receivedByHealth || paidToHealth.paidK !== receivedByHealth.paidK) {
  throw new Error(
    "Ejecución presupuestaria: el aporte pagado por el municipio a salud no " +
      "coincide con lo que salud registra como recibido."
  );
}
