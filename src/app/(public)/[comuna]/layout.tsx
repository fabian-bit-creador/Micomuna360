import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCommune, listCommunes } from "@/config/communes";

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
      <main className="flex-1">{children}</main>
      <SiteFooter commune={commune} />
    </>
  );
}
