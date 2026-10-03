import { notFound } from "next/navigation";

import { BottomNav } from "@/components/layout/bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCommune, listCommunes } from "@/config/communes";
import { communeNav } from "@/config/nav";

/*
 * Las páginas de cada comuna se regeneran cada hora al recibir visitas. Así
 * los estados que dependen de la fecha (p. ej. una fuente cuya revisión
 * venció) se actualizan solos, sin esperar un nuevo despliegue.
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return listCommunes().map((c) => ({ comuna: c.id }));
}

export default async function CommuneLayout({
  children,
  params,
}: LayoutProps<"/[comuna]">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();

  return (
    <>
      <SiteHeader commune={commune} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter commune={commune} />
      {/* Espacio para que la barra inferior no tape el pie en el celular. */}
      <div aria-hidden="true" className="h-14 bg-brand-navy lg:hidden" />
      <BottomNav base={`/${commune.id}`} nav={communeNav(commune)} />
    </>
  );
}
