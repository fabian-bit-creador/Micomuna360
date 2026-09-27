import { notFound } from "next/navigation";

import type { CommuneConfig } from "@/config/communes";

/**
 * Sección que la comuna no tiene publicada. Se responde como página
 * inexistente (404): el sitio muestra solo lo que está disponible, y los
 * menús ya ocultan estas secciones.
 */
export function FeatureUnavailable({}: {
  commune: CommuneConfig;
  title: string;
}): never {
  notFound();
}
