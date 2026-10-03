import { test as base, expect } from "@playwright/test";

/* PNG transparente de 1×1: reemplaza las teselas del mapa. */
const blankTile = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64"
);

/**
 * Cada prueba falla si la página registra un error en la consola o lanza
 * una excepción. Las teselas de OpenStreetMap se sirven en blanco: las
 * pruebas no dependen de un servicio externo.
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await page.route(/tile\.openstreetmap\.org/, (route) =>
        route.fulfill({ contentType: "image/png", body: blankTile })
      );
      await use(errors);
      expect(errors, "errores en la consola").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
