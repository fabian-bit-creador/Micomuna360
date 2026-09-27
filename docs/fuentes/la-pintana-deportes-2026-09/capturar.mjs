// Guarda el texto visible de la portada de pintanadeportes.cl en home.txt.
// Uso: node capturar.mjs  (requiere playwright y Chromium)
import { chromium } from "playwright";
import fs from "node:fs";

const browser = await chromium.launch();
const page = await browser.newPage({ locale: "es-CL" });
await page.goto("https://www.pintanadeportes.cl/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
fs.writeFileSync("home.txt", await page.locator("body").innerText());
await browser.close();
