import { expect, test } from "./fixtures";

/*
 * Recorridos principales de un vecino en La Pintana. Las pruebas buscan por
 * lo que ve una persona (textos, roles y etiquetas), no por clases CSS.
 */

test.describe("Portada", () => {
  test("busca un trámite y llega a su ficha", async ({ page }) => {
    await page.goto("/la-pintana");
    await page
      .getByRole("searchbox", { name: "Buscador ciudadano" })
      .fill("licencia");
    const result = page
      .getByRole("link", { name: /licencia de conducir/i })
      .first();
    await expect(result).toBeVisible();
    await result.click();
    await expect(page).toHaveURL(/\/la-pintana\/servicios#/);
  });

  test("«Lo más buscado» completa el buscador", async ({ page }) => {
    await page.goto("/la-pintana");
    await page.getByRole("button", { name: "Permiso de circulación" }).click();
    await expect(
      page.getByRole("searchbox", { name: "Buscador ciudadano" })
    ).toHaveValue("Permiso de circulación");
    await expect(
      page.getByRole("link", { name: /permiso de circulación/i }).first()
    ).toBeVisible();
  });

  test("busca un lugar y lo abre en el mapa", async ({ page }) => {
    await page.goto("/la-pintana");
    await page
      .getByRole("searchbox", { name: "Buscador ciudadano" })
      .fill("Polideportivo");
    const result = page
      .getByRole("link", { name: /Polideportivo/ })
      .filter({ hasText: "Lugares" })
      .first();
    await expect(result).toHaveAttribute("href", /\/la-pintana\/mapa#/);
  });

  test("las emergencias se llaman con un toque", async ({ page }) => {
    await page.goto("/la-pintana");
    for (const number of ["131", "132", "133"]) {
      await expect(page.locator(`a[href="tel:${number}"]`).first()).toBeVisible();
    }
  });
});

test.describe("Beneficios", () => {
  test("marca una situación y ve qué revisar, sin datos en la URL", async ({
    page,
  }) => {
    await page.goto("/la-pintana/beneficios");
    await expect(
      page.getByRole("heading", { name: "Por dónde partir" })
    ).toBeVisible();
    await page.getByLabel("Hay personas de 65 años o más").check();
    await expect(
      page.getByRole("heading", { name: /Qué revisar en tu caso \(\d+\)/ })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Pensiones y beneficios para personas mayores",
      })
    ).toBeVisible();
    // Privacidad: la situación del vecino nunca va en la consulta (?).
    expect(new URL(page.url()).search).toBe("");
  });

  test("llega desde un enlace con la situación ya marcada (#s=)", async ({
    page,
  }) => {
    await page.goto("/la-pintana/beneficios#s=empleo");
    await expect(
      page.getByLabel("Alguien busca trabajo o quiere capacitarse")
    ).toBeChecked();
    await expect(
      page.getByRole("heading", { name: "Bolsa Nacional de Empleo" })
    ).toBeVisible();
  });
});

test.describe("Deportes", () => {
  test("filtra rugby los sábados", async ({ page }) => {
    await page.goto("/la-pintana/deportes");
    await page
      .getByRole("combobox", { name: "Deporte" })
      .selectOption("Rugby");
    await page.getByRole("button", { name: "sábado", exact: true }).click();
    await expect(page.getByText(/de rugby los sábados/)).toBeVisible();
    const cards = page.locator("details[open] li");
    await expect(cards.first()).toBeVisible();
    for (const card of await cards.all()) {
      await expect(card).toContainText(/sábado/i);
    }
  });
});

test.describe("Mapa", () => {
  test("en escritorio, elegir un lugar de la lista abre su ficha en el mapa", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "En el celular la ficha va en una hoja inferior");
    await page.goto("/la-pintana/mapa");
    const list = page.getByRole("region", { name: "Lugares" });
    const first = list.getByRole("listitem").first();
    // Primera línea del botón: «Categoría: Nombre» (la categoría es solo
    // para lectores de pantalla); la segunda es la dirección.
    const label = await first.getByRole("button").first().innerText();
    const name = label.split("\n")[0].split(":").pop()!.trim();
    await first.getByRole("button").first().click();
    const popup = page.locator(".leaflet-popup");
    await expect(popup).toBeVisible();
    await expect(popup).toContainText(name);
    await expect(popup.getByRole("link", { name: /Cómo llegar/ })).toHaveAttribute(
      "href",
      /google\.com\/maps\/dir\//
    );
  });

  test("en el celular, la ficha sube desde abajo y se puede ver como lista", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Solo en el celular");
    await page.goto("/la-pintana/mapa");
    await expect(page.locator(".leaflet-container")).toBeVisible();
    const list = page.getByRole("region", { name: "Lugares" });
    await list.getByRole("listitem").first().getByRole("button").first().click();
    const sheet = page.locator('section[aria-labelledby="ficha-lugar"]');
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole("link", { name: /Cómo llegar/ })).toHaveAttribute(
      "href",
      /google\.com\/maps\/dir\//
    );
    await expect(sheet.getByText("Cerca de este lugar")).toBeVisible();
    await sheet.getByRole("button", { name: "Cerrar ficha" }).click();
    await expect(page.locator("#ficha-lugar")).toHaveCount(0);

    await page.getByRole("button", { name: "Lista", exact: true }).click();
    await expect(page.locator(".leaflet-container")).toBeHidden();
    await expect(list.getByRole("listitem").first()).toBeVisible();
  });

  test("«Ver en el mapa» desde una ficha abre ese lugar", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/la-pintana/mapa");
    await expect(page.locator(".leaflet-container")).toBeVisible();
    const fichas = page.getByRole("region", { name: "Ficha de cada lugar" });
    const card = fichas.locator("[id^='ficha-']").nth(3);
    const name = (await card.getByRole("heading").innerText()).trim();
    await card.getByRole("link", { name: "Ver en el mapa" }).click();
    if (isMobile) {
      await expect(page.locator("#ficha-lugar")).toHaveText(name);
    } else {
      await expect(page.locator(".leaflet-popup")).toContainText(name);
    }
  });

  test("«Ficha» en la lista lleva a la ficha completa del lugar", async ({
    page,
  }) => {
    await page.goto("/la-pintana/mapa");
    const list = page.getByRole("region", { name: "Lugares" });
    await list.getByRole("link", { name: "Ficha", exact: true }).first().click();
    await expect(page).toHaveURL(/#ficha-/);
    const id = new URL(page.url()).hash.slice(1);
    await expect(page.locator(`[id="${id}"]`)).toBeInViewport();
  });

  test("filtra los lugares de un sector", async ({ page }) => {
    await page.goto("/la-pintana/mapa");
    const list = page.getByRole("region", { name: "Lugares" });
    const total = await list.getByRole("listitem").count();
    const select = page.getByLabel("Lugares del sector");
    const option = await select
      .locator("option")
      .filter({ hasText: /^Centro \(/ })
      .getAttribute("value");
    await select.selectOption(option!);
    const inSector = await list.getByRole("listitem").count();
    expect(inSector).toBeGreaterThan(0);
    expect(inSector).toBeLessThan(total);
  });
});

test.describe("Ferias libres", () => {
  test("las ferias de la semana se filtran por día", async ({ page }) => {
    await page.goto("/la-pintana/mapa");
    const section = page.getByRole("region", { name: "Ferias libres y persas" });
    await section.getByRole("button", { name: "Toda la semana" }).click();
    await expect(section.getByText(/^19 ferias en la semana$/)).toBeVisible();
    // El martes hay ferias; todas las que aparecen funcionan el martes.
    await section.getByRole("button", { name: /^martes/ }).click();
    const cards = section.getByRole("listitem");
    await expect(cards.first()).toBeVisible();
    for (const card of await cards.all()) {
      await expect(card).toContainText(/martes/i);
    }
  });

  test("una feria se abre en el mapa con sus días y horario", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/la-pintana/mapa");
    await expect(page.locator(".leaflet-container")).toBeVisible();
    const section = page.getByRole("region", { name: "Ferias libres y persas" });
    await section.getByRole("button", { name: "Toda la semana" }).click();
    const card = section.getByRole("listitem").filter({ hasText: "John Kennedy" });
    await card.getByRole("link", { name: "Ver en el mapa" }).click();
    const ficha = isMobile
      ? page.locator('section[aria-labelledby="ficha-lugar"]')
      : page.locator(".leaflet-popup");
    await expect(ficha).toContainText("Feria libre John Kennedy");
    await expect(ficha).toContainText(/Miércoles y sábado, de 09:00 a 14:45/);
  });

  test("el mapa ofrece las ferias de hoy", async ({ page }) => {
    await page.goto("/la-pintana/mapa");
    const chip = page.getByRole("button", { name: /^Ferias de hoy \(\d+\)$/ });
    const ferias = page.getByRole("button", { name: /^Ferias \(19\)$/ });
    await expect(ferias).toBeVisible();
    // Los lunes no funciona ninguna feria ni persa: ese día no hay filtro.
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      timeZone: "America/Santiago",
    }).format(new Date());
    if (weekday === "Monday") {
      await expect(chip).toHaveCount(0);
      return;
    }
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    const list = page.getByRole("region", { name: "Lugares" });
    expect(await list.getByRole("listitem").count()).toBeGreaterThan(0);
  });
});

test.describe("Transparencia", () => {
  test("«de cada $100.000 pagados» suma exactamente $100.000", async ({
    page,
  }) => {
    await page.goto("/la-pintana/transparencia");
    const card = page
      .locator("div")
      .filter({ has: page.getByRole("heading", { name: "¿En qué se fue cada $100.000 pagados?" }) })
      .last();
    const figure = card.getByRole("figure");
    const amounts = await figure.locator("li > span:first-child").allInnerTexts();
    expect(amounts.length).toBeGreaterThan(2);
    const total = amounts.reduce(
      (sum, a) => sum + Number(a.replace(/[^\d]/g, "")),
      0
    );
    expect(total).toBe(100_000);
    await expect(card.getByRole("heading", { name: "Antes de comparar" })).toBeVisible();
    // Toda la página usa la misma escala.
    await expect(page.getByText(/De cada \$100\.000 disponibles/)).toBeVisible();
    await expect(page.getByText(/de cada \$100(?!\.000)/)).toHaveCount(0);
  });
});

test.describe("Teléfonos y descargas", () => {
  test("los teléfonos útiles se llaman con un toque", async ({ page }) => {
    await page.goto("/la-pintana/telefonos");
    await expect(page.locator('a[href="tel:131"]').first()).toBeVisible();
    expect(await page.locator('a[href^="tel:"]').count()).toBeGreaterThan(10);
  });

  test("lugares y teléfonos se descargan con su fuente", async ({
    request,
    isMobile,
  }) => {
    test.skip(isMobile, "No depende del dispositivo");
    const csv = await request.get("/la-pintana/descargas/lugares.csv");
    expect(csv.status()).toBe(200);
    expect(csv.headers()["content-type"]).toContain("text/csv");
    const rows = (await csv.text()).replace(/^﻿/, "").trim().split("\r\n");
    expect(rows[0]).toContain("nombre;categoria;direccion");
    expect(rows[0]).toContain("fuente_url");
    expect(rows.length).toBeGreaterThan(10);

    const geojson = await (
      await request.get("/la-pintana/descargas/lugares.geojson")
    ).json();
    expect(geojson.type).toBe("FeatureCollection");
    expect(geojson.features.length).toBe(rows.length - 1);

    const phones = await request.get("/la-pintana/descargas/telefonos.csv");
    expect(await phones.text()).toContain(";131;");

    // La comuna de ejemplo tiene datos ficticios: no se descargan.
    const demo = await request.get("/los-aromos/descargas/lugares.csv");
    expect(demo.status()).toBe(404);
  });
});

test.describe("Navegación", () => {
  const sections = [
    "",
    "/servicios",
    "/beneficios",
    "/deportes",
    "/actividades",
    "/telefonos",
    "/mapa",
    "/transparencia",
    "/datos",
  ];

  for (const path of sections) {
    test(`/la-pintana${path} responde y tiene título`, async ({ page }) => {
      const response = await page.goto(`/la-pintana${path}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("el directorio quedó dentro del mapa: su dirección redirige", async ({
    page,
    request,
  }) => {
    const response = await request.get("/la-pintana/directorio", {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(308);
    expect(response.headers()["location"]).toMatch(/\/la-pintana\/mapa$/);
    await page.goto("/la-pintana/directorio");
    await expect(page).toHaveURL(/\/la-pintana\/mapa$/);
  });

  test("una sección apagada responde 404", async ({ request }) => {
    const response = await request.get("/la-pintana/noticias");
    expect(response.status()).toBe(404);
  });

  test("en el celular, la barra inferior lleva a Teléfonos", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Solo en el celular");
    await page.goto("/la-pintana");
    await page
      .getByRole("navigation", { name: "Accesos rápidos" })
      .getByRole("link", { name: "Teléfonos" })
      .click();
    await expect(page).toHaveURL(/\/la-pintana\/telefonos$/);
    await expect(
      page
        .getByRole("navigation", { name: "Accesos rápidos" })
        .getByRole("link", { name: "Teléfonos" })
    ).toHaveAttribute("aria-current", "page");
  });
});
