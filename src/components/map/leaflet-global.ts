import L from "leaflet";

/*
 * leaflet.markercluster se registra sobre la variable global L. Este módulo
 * la define antes de importarlo (los imports se evalúan en orden).
 */
if (typeof window !== "undefined") {
  (window as unknown as { L: typeof L }).L = L;
}

export default L;
