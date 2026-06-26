"use client";

import { useEffect, useRef } from "react";

export default function MapPreview() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [-7.3215, 112.7186],
        zoom: 15,
        zoomControl: true,
        dragging: false,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // RW boundary polygon
      const rwBoundary = L.polygon(
        [
          [-7.318, 112.715],
          [-7.318, 112.722],
          [-7.325, 112.722],
          [-7.325, 112.715],
        ],
        {
          color: "#1B4332",
          weight: 2,
          fillColor: "#1B4332",
          fillOpacity: 0.15,
        }
      ).addTo(map);

      // Center marker
      L.marker([-7.3215, 112.7186])
        .addTo(map)
        .bindPopup("<b>RW 6 Karah</b>")
        .openPopup();

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" style={{ minHeight: "192px" }} />;
}
