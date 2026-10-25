import { reportForm } from "@/config/site";

/**
 * Enlace al formulario «¿Viste un dato cambiado?», ya prellenado con la
 * página y el dato. Solo viaja la ruta de la página: nunca el fragmento (#)
 * ni la consulta (?), que en herramientas como el orientador de beneficios
 * describen la situación del vecino. null si no hay formulario.
 */
export function reportFormUrl(pathname: string, source?: string): string | null {
  if (!reportForm) return null;
  const url = new URL(reportForm.url);
  url.searchParams.set("usp", "pp_url");
  url.searchParams.set(reportForm.page, pathname.split(/[?#]/)[0]);
  if (source) url.searchParams.set(reportForm.source, source);
  return url.toString();
}
