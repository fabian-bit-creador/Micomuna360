import type { AddressSector } from "../types";

/**
 * Sector de las direcciones de los talleres de barrio (los que no van en
 * un recinto del directorio). Ubicadas en OpenStreetMap el 2026-10-04:
 * «numero» = la dirección exacta cae en el sector; «calle» = la calle
 * completa está dentro de un solo sector. Archivo generado por
 * docs/fuentes/la-pintana-deportes-2026-09/sectores.py.
 */
export const addressSectors: AddressSector[] = [
  { address: "Anticura 13156", sectorId: "sector-centro", method: "calle", sourceId: "osm-nominatim" },
  { address: "Apóstol Felipe 10718", sectorId: "sector-santo-tomas", method: "numero", sourceId: "osm-nominatim" },
  { address: "Bahía Catalina 10935", sectorId: "sector-santo-tomas", method: "numero", sourceId: "osm-nominatim" },
  { address: "Cabo Gutierrez 02786", sectorId: "sector-el-castillo", method: "calle", sourceId: "osm-nominatim" },
  { address: "Calle C 1140 A", sectorId: "sector-centro", method: "calle", sourceId: "osm-nominatim" },
  { address: "Edith Madge de Huneeus 0630", sectorId: "sector-santo-tomas", method: "calle", sourceId: "osm-nominatim" },
  { address: "Francisco de Zurbaran 1716", sectorId: "sector-el-roble", method: "numero", sourceId: "osm-nominatim" },
  { address: "Gabriela Figueroa 11032", sectorId: "sector-santo-tomas", method: "calle", sourceId: "osm-nominatim" },
  { address: "Gala 10735", sectorId: "sector-el-roble", method: "numero", sourceId: "osm-nominatim" },
  { address: "José Echeverría 13831", sectorId: "sector-el-castillo", method: "calle", sourceId: "osm-nominatim" },
  { address: "José Manuel Balmaceda 1413", sectorId: "sector-centro", method: "calle", sourceId: "osm-nominatim" },
  { address: "José Toribio Medina 12250", sectorId: "sector-centro", method: "calle", sourceId: "osm-nominatim" },
  { address: "La Recova 10982", sectorId: "sector-santo-tomas", method: "numero", sourceId: "osm-nominatim" },
  { address: "Los Olivillos 0905", sectorId: "sector-la-platina", method: "calle", sourceId: "osm-nominatim" },
  { address: "Los Olmecas 10650", sectorId: "sector-santo-tomas", method: "numero", sourceId: "osm-nominatim" },
  { address: "Martín Sánchez 0641", sectorId: "sector-antumapu", method: "calle", sourceId: "osm-nominatim" },
  { address: "Miguel Ángel 03611", sectorId: "sector-las-rosas", method: "numero", sourceId: "osm-nominatim" },
  { address: "Pedro Prado 12697", sectorId: "sector-centro", method: "numero", sourceId: "osm-nominatim" },
  { address: "Santa Rebeca 2079", sectorId: "sector-el-roble", method: "calle", sourceId: "osm-nominatim" },
];
