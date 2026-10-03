import { defineConfig, devices } from "@playwright/test";

/*
 * Pruebas de recorridos: lo que hace un vecino en el sitio construido
 * (`npm run build` antes). Corren en escritorio y en un celular, con la
 * hora y el idioma de Chile.
 */
const port = 3100;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL: `http://localhost:${port}`,
    locale: "es-CL",
    timezoneId: "America/Santiago",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"] } },
    { name: "celular", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npm run start -- --port ${port}`,
    url: `http://localhost:${port}/la-pintana`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
