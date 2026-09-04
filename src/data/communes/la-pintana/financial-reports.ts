import type { FinancialReport } from "@/types";

/**
 * Estados financieros publicados por la Municipalidad de La Pintana en su
 * Transparencia Activa (ejercicio contable 2025, informe del 16-03-2026).
 *
 * Los nombres y enlaces se toman tal como los publica el municipio; los
 * resúmenes explican en lenguaje ciudadano qué muestra cada documento.
 * MiComuna360 no reproduce el contenido de los archivos: solo los enlaza.
 */
export const financialReports: FinancialReport[] = [
  {
    id: "lp-fin-2025-situacion-presupuestaria",
    year: 2025,
    reportDate: "2026-03-16",
    name: "Estado de Situación Presupuestaria",
    summary:
      "Cuánto se presupuestó y cuánto se ejecutó realmente durante el año, en ingresos y gastos.",
    url: "https://cloud.pintana.cl/index.php/s/da2pkfJpK5ZaZBJ",
    sourceId: "lp-ta-estados-financieros",
  },
  {
    id: "lp-fin-2025-balance-general",
    year: 2025,
    reportDate: "2026-03-16",
    name: "Balance General",
    summary:
      "Qué tiene y qué debe el municipio al cerrar el año: bienes, deudas y patrimonio.",
    url: "https://cloud.pintana.cl/index.php/s/Pp4LWcsXKkq99XW",
    sourceId: "lp-ta-estados-financieros",
  },
  {
    id: "lp-fin-2025-estado-resultado",
    year: 2025,
    reportDate: "2026-03-16",
    name: "Estado de Resultado",
    summary:
      "Los ingresos y gastos del año, y si el resultado del ejercicio fue positivo o negativo.",
    url: "https://cloud.pintana.cl/index.php/s/ix2TCEQWMiwfJWF",
    sourceId: "lp-ta-estados-financieros",
  },
  {
    id: "lp-fin-2025-flujo-efectivo",
    year: 2025,
    reportDate: "2026-03-16",
    name: "Estado de Flujo de Efectivo",
    summary:
      "Por dónde entró y por dónde salió el dinero durante el año.",
    url: "https://cloud.pintana.cl/index.php/s/JppcSrGMPHEg6iJ",
    sourceId: "lp-ta-estados-financieros",
  },
  {
    id: "lp-fin-2025-cambio-patrimonio",
    year: 2025,
    reportDate: "2026-03-16",
    name: "Estado de Cambio en el Patrimonio Neto",
    summary:
      "Cómo varió el patrimonio municipal entre el inicio y el cierre del año.",
    url: "https://cloud.pintana.cl/index.php/s/cQKrwQWBanr28PZ",
    sourceId: "lp-ta-estados-financieros",
  },
  {
    id: "lp-fin-2025-notas",
    year: 2025,
    reportDate: "2026-03-16",
    name: "Notas Explicativas",
    summary:
      "Las aclaraciones contables que acompañan y explican las cifras de los estados anteriores.",
    url: "https://cloud.pintana.cl/index.php/s/2BjdYcMGZ9HKTZF",
    sourceId: "lp-ta-estados-financieros",
  },
];
