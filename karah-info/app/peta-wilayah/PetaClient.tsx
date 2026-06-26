"use client";

import { useEffect, useRef, useState } from "react";
import { UMKM } from "@/lib/googleSheets";

const RT_OPTIONS = ["Semua", "RT 1", "RT 2", "RT 3", "RT 4", "RT 5", "RT 6", "RT 7"];

// Approximate coordinates for each RT within RW 6 Karah area
const RT_COORDS: Record<string, [number, number]> = {
  "RT 1": [-7.319, 112.716],
  "RT 2": [-7.320, 112.718],
  "RT 3": [-7.321, 112.716],
  "RT 4": [-7.322, 112.719],
  "RT 5": [-7.323, 112.717],
  "RT 6": [-7.321, 112.721],
  "RT 7": [-7.324, 112.720],
};

export default function PetaClient({ umkmData }: { umkmData: UMKM[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const markersRef = useRef<unknown[]>([]);
  const [filterRT, setFilterRT] = useState("Semua");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [-7.3215, 112.7186],
        zoom: 15,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // RW Boundary
      L.polygon(
        [
          [-7.317, 112.714],
          [-7.317, 112.723],
          [-7.326, 112.723],
          [-7.326, 112.714],
        ],
        { color: "#1B4332", weight: 2, fillColor: "#1B4332", fillOpacity: 0.1 }
      ).addTo(map)
        .bindPopup("<b>RW 6 Karah</b><br>Kel. Karah, Kec. Jambangan");

      mapInstanceRef.current = map;

      // Add UMKM markers
      addMarkers(L, map, umkmData, "Semua");
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addMarkers(L: typeof import("leaflet"), map: import("leaflet").Map, data: UMKM[], filter: string) {
    // Clear existing markers
    markersRef.current.forEach((m) => (m as import("leaflet").Marker).remove());
    markersRef.current = [];

    const filtered = filter === "Semua" ? data : data.filter((u) => u.rt === filter);

    filtered.forEach((umkm, i) => {
      const baseCoord = RT_COORDS[umkm.rt] || [-7.3215, 112.7186];
      const lat = baseCoord[0] + (Math.sin(i * 1.3) * 0.001);
      const lng = baseCoord[1] + (Math.cos(i * 1.7) * 0.001);

      const icon = L.divIcon({
        className: "",
        html: `<div style="background:#1B4332;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${umkm.rt?.replace("RT ", "")}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width:200px">
            <b style="color:#1B4332">${umkm.nama_umkm}</b><br>
            <small>${umkm.pemilik}</small><br>
            <small>${umkm.alamat}</small><br>
            <small style="color:#666">${umkm.rt}</small><br>
            <div style="margin-top:8px;display:flex;gap:6px">
              <a href="https://wa.me/${umkm.whatsapp}" target="_blank" style="background:#25D366;color:white;padding:4px 8px;border-radius:6px;text-decoration:none;font-size:12px">WhatsApp</a>
              <a href="${umkm.maps}" target="_blank" style="background:#1B4332;color:white;padding:4px 8px;border-radius:6px;text-decoration:none;font-size:12px">Maps</a>
            </div>
          </div>
        `);

      markersRef.current.push(marker);
    });
  }

  function handleFilter(rt: string) {
    setFilterRT(rt);
    if (mapInstanceRef.current) {
      import("leaflet").then((L) => {
        addMarkers(L, mapInstanceRef.current as import("leaflet").Map, umkmData, rt);
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Peta Wilayah RW 6 Karah</h1>
          <p className="text-green-200 mt-2">Peta interaktif lokasi UMKM dan batas wilayah</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* RT Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {RT_OPTIONS.map((rt) => (
            <button
              key={rt}
              onClick={() => handleFilter(rt)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filterRT === rt
                  ? "bg-primary-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-primary-900"
              }`}
            >
              {rt}
            </button>
          ))}
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
          style={{ height: "600px" }}
        />

        <p className="text-xs text-gray-400 mt-2">
          © OpenStreetMap contributors. Klik marker untuk info UMKM.
        </p>
      </div>
    </div>
  );
}
