"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

/** Lugar con coordenadas verificadas, listo para dibujarse en el mapa. */
export interface MapPlace {
  id: string;
  name: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
  /** Enlace a la ficha propia dentro de MiComuna360. */
  href: string;
}

interface MapViewProps {
  places: MapPlace[];
  center: { lat: number; lng: number };
  zoom: number;
  /** Color de marca por categoría, para los marcadores. */
  colors: Record<string, string>;
}

/** Enlaces oficiales de Google Maps (Maps URLs), sin API ni contenido de Google. */
function mapsUrls(place: MapPlace) {
  const q = `${place.lat},${place.lng}`;
  return {
    ver: `https://www.google.com/maps/search/?api=1&query=${q}`,
    llegar: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  };
}

function escapeHtml(text: string): string {
  return text.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] ?? c
  );
}

/**
 * Mapa comunal sobre OpenStreetMap. Se carga solo en el navegador
 * (next/dynamic con ssr:false) porque Leaflet necesita el DOM.
 */
export default function MapView({
  places,
  center,
  zoom,
  colors,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  // Crear el mapa una sola vez.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      // Evita capturar el scroll de la página al pasar por encima.
      scrollWheelZoom: false,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, [center.lat, center.lng, zoom]);

  // Redibujar marcadores cuando cambian los filtros.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();

    for (const place of places) {
      const color = colors[place.category] ?? "#17375e";
      const icon = L.divIcon({
        className: "",
        html: `<span style="display:block;width:18px;height:18px;border-radius:999px;background:${color};box-shadow:0 0 0 4px ${color}33,0 1px 3px rgba(0,0,0,.4)"></span>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -12],
      });
      const urls = mapsUrls(place);
      L.marker([place.lat, place.lng], { icon, title: place.name })
        .bindPopup(
          `<div style="min-width:200px">
            <strong style="display:block;font-size:14px">${escapeHtml(place.name)}</strong>
            <span style="display:block;margin-top:2px;color:#4b5563">${escapeHtml(place.address)}</span>
            <span style="display:flex;flex-direction:column;gap:4px;margin-top:8px">
              <a href="${place.href}" style="color:#1e8e89;font-weight:700">Ver ficha en MiComuna360</a>
              <a href="${urls.ver}" target="_blank" rel="noopener noreferrer">Ver en Google Maps ↗</a>
              <a href="${urls.llegar}" target="_blank" rel="noopener noreferrer">Cómo llegar ↗</a>
            </span>
          </div>`
        )
        .addTo(layer);
    }

    // Encuadrar los marcadores visibles.
    if (places.length > 1 && mapRef.current) {
      mapRef.current.fitBounds(
        L.latLngBounds(places.map((p) => [p.lat, p.lng] as [number, number])),
        { padding: [40, 40], maxZoom: 16 }
      );
    }
  }, [places, colors]);

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Mapa de lugares de la comuna"
      /* z-0 aísla el apilado de Leaflet para que sus capas y fichas no
         se dibujen por encima del encabezado fijo. */
      className="relative z-0 h-[420px] w-full rounded-xl border md:h-[560px]"
    />
  );
}
