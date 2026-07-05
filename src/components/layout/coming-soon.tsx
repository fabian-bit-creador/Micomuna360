import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ComingSoonProps {
  title: string;
  description: string;
  fase: string;
}

/** Placeholder para secciones que se construyen en fases posteriores. */
export function ComingSoon({ title, description, fase }: ComingSoonProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Card className="mx-auto max-w-xl text-center">
        <CardHeader>
          <Badge variant="secondary" className="mx-auto mb-2">
            En construcción · {fase}
          </Badge>
          <CardTitle className="text-2xl text-primary">{title}</CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Esta sección forma parte del roadmap del MVP y se habilitará con
          datos ficticios de demostración.
        </CardContent>
      </Card>
    </div>
  );
}
