import { Logo } from "@/components/layout/logo";
import { StatusMessage } from "@/components/feedback/status-message";

/* Dirección que no existe fuera de una comuna conocida (o comuna que aún no
   está en MiComuna360). */
export default function NotFound() {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
          <Logo />
        </div>
      </header>
      <main id="contenido" className="flex-1">
        <StatusMessage
          eyebrow="Página no encontrada"
          title="No encontramos esta dirección"
          description="Puede que el enlace esté incompleto, que la página haya cambiado de lugar o que tu comuna todavía no esté en MiComuna360."
          actions={[
            { label: "Ver las comunas", href: "/" },
            { label: "Qué es MiComuna360", href: "/nosotros" },
          ]}
        />
      </main>
    </>
  );
}
