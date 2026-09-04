/**
 * Enlace de salto: invisible hasta recibir foco con el teclado. Permite
 * llegar al contenido sin recorrer toda la navegación (WCAG 2.4.1).
 */
export function SkipLink() {
  return (
    <a
      href="#contenido"
      className="sr-only rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
    >
      Saltar al contenido
    </a>
  );
}
