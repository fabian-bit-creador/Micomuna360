"use client";

import { useEffect, useRef } from "react";

import L from "./leaflet-global";
import "leaflet.markercluster";

import { googleMapsUrls } from "@/lib/maps";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";

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
  /** Límite comunal oficial [lat, lng], dibujado como contorno. */
  boundary?: [number, number][] | null;
  /** Lugar elegido en la lista: el mapa lo muestra y abre su ficha. */
  selectedId?: string | null;
  /** Avisa qué lugar abrió el vecino en el mapa (para marcarlo en la lista). */
  onSelect?: (id: string | null) => void;
  /** Posición del vecino («cerca de mí»); solo vive en su navegador. */
  userPosition?: { lat: number; lng: number } | null;
}

/* Glifo blanco por categoría (trazos simples, 24×24), para no depender
   solo del color. */
const glyphs: Record<string, string> = {
  municipal:
    '<path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10h20L12 3z" stroke="#fff" stroke-width="2.2" fill="none" stroke-linejoin="round"/>',
  salud:
    '<path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/>',
  deporte:
    '<circle cx="12" cy="12" r="7" stroke="#fff" stroke-width="2.4" fill="none"/><path d="M5 12h14M12 5c3 3 3 11 0 14M12 5c-3 3-3 11 0 14" stroke="#fff" stroke-width="1.6" fill="none"/>',
  seguridad:
    '<path d="M12 3l7 3v5c0 4.4-3 7.8-7 10-4-2.2-7-5.6-7-10V6z" fill="#fff"/>',
};

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
 * (next/dynamic con ssr:false) porque Leaflet necesita el DOM. Los lugares
 * cercanos se agrupan en un círculo con el número de lugares; al acercarse
 * se separan.
 */
export default function MapView({
  places,
  center,
  zoom,
  colors,
  boundary = null,
  selectedId = null,
  onSelect,
  userPosition = null,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef(new Map<string, L.Marker>());
  const userLayerRef = useRef<L.LayerGroup | null>(null);
  /* El aviso al padre se guarda en una ref para no recrear los marcadores
     cada vez que cambia la función. */
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Crear el mapa una sola vez.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      // Evita capturar el scroll de la página al pasar por encima.
      scrollWheelZoom: false,
      zoomControl: false,
    });
    // Controles y botones en español (Leaflet los trae en inglés).
    L.control
      .zoom({ zoomInTitle: "Acercar", zoomOutTitle: "Alejar" })
      .addTo(map);
    map.on("popupopen", (e) => {
      e.popup
        .getElement()
        ?.querySelector(".leaflet-popup-close-button")
        ?.setAttribute("aria-label", "Cerrar ficha");
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    if (boundary && boundary.length > 3) {
      L.polygon(boundary, {
        color: "#17375e",
        weight: 2,
        dashArray: "6 4",
        fillColor: "#17375e",
        fillOpacity: 0.04,
        interactive: false,
      }).addTo(map);
    }
    clusterRef.current = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 44,
      spiderfyOnMaxZoom: true,
      /* Círculo azul marino con el número de lugares, en la paleta del sitio. */
      iconCreateFunction: (cluster) => {
        const n = cluster.getChildCount();
        return L.divIcon({
          className: "",
          html: `<span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:999px;background:#17375e;color:#fff;font:700 13px/1 sans-serif;box-shadow:0 0 0 3px #fff,0 1px 5px rgba(0,0,0,.45)" aria-label="${n} lugares">${n}</span>`,
          iconSize: [34, 34],
        });
      },
    }).addTo(map);
    userLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      clusterRef.current = null;
      userLayerRef.current = null;
    };
  }, [center.lat, center.lng, zoom, boundary]);

  // Redibujar marcadores cuando cambian los filtros.
  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    cluster.clearLayers();

    const markers = new Map<string, L.Marker>();
    for (const place of places) {
      const color = colors[place.category] ?? "#2a78d6";
      const glyph = glyphs[place.category] ?? "";
      const icon = L.divIcon({
        className: "",
        /* Anillo blanco de 2px: separa marcadores que se tocan. */
        html: `<span style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:999px;background:${color};box-shadow:0 0 0 2px #fff,0 1px 4px rgba(0,0,0,.45)"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">${glyph}</svg></span>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -15],
      });
      const urls = googleMapsUrls(place);
      const marker = L.marker([place.lat, place.lng], { icon, title: place.name })
        .bindPopup(
          `<div style="min-width:200px">
            <strong style="display:block;font-size:14px">${escapeHtml(place.name)}</strong>
            <span style="display:block;margin-top:2px;color:#4b5563">${escapeHtml(place.address)}</span>
            <span style="display:flex;flex-direction:column;gap:4px;margin-top:8px">
              <a href="${escapeHtml(place.href)}" style="color:#1e8e89;font-weight:700">Ver ficha en MiComuna360</a>
              <a href="${urls.llegar}" target="_blank" rel="noopener noreferrer">Cómo llegar ↗</a>
              <a href="${urls.calle}" target="_blank" rel="noopener noreferrer">Ver la calle (Street View) ↗</a>
              <a href="${urls.ver}" target="_blank" rel="noopener noreferrer">Ver en Google Maps ↗</a>
            </span>
          </div>`
        );
      marker.on("popupopen", () => onSelectRef.current?.(place.id));
      marker.on("popupclose", () => onSelectRef.current?.(null));
      cluster.addLayer(marker);
      markers.set(place.id, marker);
    }
    markersRef.current = markers;

    // Si se llegó con #id (desde el directorio), abrir ese lugar.
    const target = markers.get(decodeURIComponent(window.location.hash.slice(1)));
    if (target) {
      cluster.zoomToShowLayer(target, () => target.openPopup());
    } else if (places.length > 1 && mapRef.current) {
      // Encuadrar los marcadores visibles (y la comuna, si se conoce).
      const points = places.map((p) => [p.lat, p.lng] as [number, number]);
      mapRef.current.fitBounds(L.latLngBounds([...points, ...(boundary ?? [])]), {
        padding: [24, 24],
        maxZoom: 16,
      });
    }
  }, [places, colors, boundary]);

  // Lugar elegido desde la lista: separarlo del grupo y abrir su ficha.
  useEffect(() => {
    if (!selectedId) return;
    const marker = markersRef.current.get(selectedId);
    const cluster = clusterRef.current;
    if (!marker || !cluster || marker.isPopupOpen()) return;
    cluster.zoomToShowLayer(marker, () => marker.openPopup());
  }, [selectedId]);

  // Posición del vecino: un punto azul que no sale de su navegador.
  useEffect(() => {
    const layer = userLayerRef.current;
    const map = mapRef.current;
    if (!layer || !map) return;
    layer.clearLayers();
    if (!userPosition) return;
    L.circleMarker([userPosition.lat, userPosition.lng], {
      radius: 8,
      color: "#fff",
      weight: 3,
      fillColor: "#2a78d6",
      fillOpacity: 1,
    })
      .bindTooltip("Estás aquí")
      .addTo(layer);
    map.setView([userPosition.lat, userPosition.lng], Math.max(map.getZoom(), 15));
  }, [userPosition]);

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
