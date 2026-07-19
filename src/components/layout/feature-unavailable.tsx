import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CommuneConfig } from "@/config/communes";

interface FeatureUnavailableProps {
  commune: CommuneConfig;
  title: string;
}

/** Sección aún no habilitada para esta comuna (piloto por etapas). */
export function FeatureUnavailable({
  commune,
  title,
}: FeatureUnavailableProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Card className="mx-auto max-w-xl text-center">
        <CardHeader>
          <Badge variant="secondary" className="mx-auto mb-2">
            {commune.name} · en preparación
          </Badge>
          <CardTitle asChild className="text-2xl text-primary">
            <h1>{title}</h1>
          </CardTitle>
          <CardDescription className="text-base">
            Esta sección aún no está habilitada para {commune.name}. El piloto
            avanza por etapas: publicamos cada módulo solo cuando su
            información está verificada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href={`/${commune.id}`}>
              <ArrowLeftIcon />
              Volver al inicio de {commune.name}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
