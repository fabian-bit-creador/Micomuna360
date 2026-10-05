/**
 * Avisa cada vez que el vecino navega a un `#` de la página: al cambiar el
 * fragmento y también al presionar de nuevo un enlace al `#` actual, que el
 * navegador no anuncia con `hashchange`. Con `initial`, avisa además al
 * montar si la página se abrió con un `#`. Devuelve la función para dejar
 * de escuchar.
 */
export function onHashNavigation(
  callback: (hash: string) => void,
  { initial = false }: { initial?: boolean } = {}
): () => void {
  const fire = () => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) callback(hash);
  };
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest?.("a");
    if (
      link &&
      link.hash &&
      link.hash === window.location.hash &&
      link.pathname === window.location.pathname
    ) {
      fire();
    }
  };
  window.addEventListener("hashchange", fire);
  document.addEventListener("click", onClick);
  if (initial) fire();
  return () => {
    window.removeEventListener("hashchange", fire);
    document.removeEventListener("click", onClick);
  };
}
