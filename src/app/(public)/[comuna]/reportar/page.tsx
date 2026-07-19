import type { Metadata } from "next";
import Link from "next/link";
import {
  CameraIcon,
  ClipboardListIcon,
  MapPinIcon,
  PhoneCallIcon,
  BellRingIcon,
} from "lucide-react";

import { notFound } from "next/navigation";

import { FeatureUnavailable } from "@/components/layout/feature-unavailable";
import { SectionHeader } from "@/components/layout/section-header";
import { getCommune } from "@/config/communes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Reportar",
  description:
    "Pronto podrás reportar problemas y hacer solicitudes a tu municipio con foto y ubicación.",
};

const flow = [
  {
    icon: ClipboardListIcon,
    title: "Cuéntanos qué pasa",
    description:
      "Eliges una categoría (bache, luminaria, basura…) y lo describes con tus palabras.",
  },
  {
    icon: CameraIcon,
    title: "Agrega foto y ubicación",
    description:
      "Una foto y un punto aproximado en el mapa ayudan al equipo a llegar más rápido.",
  },
  {
    icon: BellRingIcon,
    title: "Sigue el avance",
    description:
      "Tu reporte queda con seguimiento: sabrás cuándo se revisa y cuándo se resuelve.",
  },
];

export default async function ReportarPage({
  params,
}: PageProps<"/[comuna]/reportar">) {
  const { comuna } = await params;
  const commune = getCommune(comuna);
  if (!commune) notFound();
  if (!commune.features.reports) {
    return <FeatureUnavailable commune={commune} title="Reportar" />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <SectionHeader
        eyebrow="Tu voz"
        title="Reporta un problema, sin filas ni papeleo"
        description="Así funcionará el reporte vecinal cuando se active en la próxima etapa del piloto."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {flow.map((step, i) => (
          <Card key={step.title} className="py-5">
            <CardContent className="px-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-lg bg-accent text-brand-teal">
                  <step.icon className="size-6" />
                </div>
                <span className="font-display text-3xl font-bold text-brand-sky/60">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-bold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-brand-amber/50 bg-brand-amber/10 py-5">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 px-5">
          <div className="max-w-lg">
            <Badge className="mb-2 bg-brand-amber text-brand-navy">
              Disponible en la próxima etapa
            </Badge>
            <p className="text-sm">
              Mientras activamos el formulario, puedes comunicarte directamente
              con tu municipio: los teléfonos útiles están a un toque.
            </p>
          </div>
          <Button asChild>
            <Link href={`/${commune.id}/telefonos`}>
              <PhoneCallIcon />
              Ver teléfonos útiles
            </Link>
          </Button>
        </CardContent>
      </Card>

      <p className="mt-8 flex items-start gap-2 text-sm text-muted-foreground">
        <MapPinIcon className="mt-0.5 size-4 shrink-0" />
        Los reportes sensibles (seguridad, situaciones personales) tendrán un
        canal reservado y nunca se mostrarán en el mapa público.
      </p>
    </div>
  );
}
