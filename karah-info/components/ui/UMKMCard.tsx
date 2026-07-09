"use client";

import Image from "next/image";
import {
  MapPin,
  MessageCircle,
  User,
  Navigation,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Coffee,
  Wrench,
  Shirt,
  ShoppingBasket,
  Palette,
  Store,
} from "lucide-react";
import { useState } from "react";
import { UMKM } from "@/lib/googleSheets";

// Ubah link Google Drive jadi link thumbnail langsung; kalau bukan drive link, dipakai apa adanya.
function resolveFotoUrl(url: string): string {
  if (url && url.includes("drive.google.com")) {
    const driveMatch = url.match(/[-\w]{25,}/);
    if (driveMatch) return `https://drive.google.com/thumbnail?id=${driveMatch[0]}&sz=w400`;
  }
  return url;
}

const kategoriIcon: Record<string, typeof Store> = {
  Makanan: Utensils,
  Minuman: Coffee,
  Jasa: Wrench,
  Fashion: Shirt,
  Kelontong: ShoppingBasket,
  Kerajinan: Palette,
  Umum: Store,
};

const kategoriColor: Record<string, string> = {
  Makanan: "bg-orange-100 text-orange-700",
  Minuman: "bg-blue-100 text-blue-700",
  Jasa: "bg-purple-100 text-purple-700",
  Fashion: "bg-pink-100 text-pink-700",
  Kelontong: "bg-yellow-100 text-yellow-700",
  Kerajinan: "bg-teal-100 text-teal-700",
  Umum: "bg-gray-100 text-gray-700",
};

export default function UMKMCard({ umkm }: { umkm: UMKM }) {
  const kategori = umkm.kategori || "Umum";
  const badgeClass = kategoriColor[kategori] || kategoriColor["Umum"];
  const KategoriIcon = kategoriIcon[kategori] || Store;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cuma foto yang benar-benar keisi yang dianggap valid
  const fotoList = (Array.isArray(umkm.foto) ? umkm.foto : []).filter(
    (f) => f && f.trim() !== ""
  );
  const punyaFoto = fotoList.length > 0;

  const prev = () => setCurrentIndex((i) => (i - 1 + fotoList.length) % fotoList.length);
  const next = () => setCurrentIndex((i) => (i + 1) % fotoList.length);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="relative h-48 bg-gray-100">
        {punyaFoto ? (
          <Image
            src={resolveFotoUrl(fotoList[currentIndex])}
            alt={umkm.nama_umkm}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${badgeClass}`}>
            <KategoriIcon size={56} strokeWidth={1.5} />
          </div>
        )}
        {punyaFoto && fotoList.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-10 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {fotoList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        <span className="absolute top-3 right-3 bg-primary-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {umkm.rt}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base mb-1">{umkm.nama_umkm}</h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
          <User size={12} />
          <span>{umkm.pemilik}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
          <MapPin size={12} />
          <span>{umkm.alamat}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{umkm.deskripsi}</p>
        {umkm.kategori && (
          <span className={`self-start text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${badgeClass}`}>
            {umkm.kategori}
          </span>
        )}
        <div className="flex gap-2 mt-auto">
          
            <a
            href={`https://wa.me/${umkm.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
          
            <a
            href={umkm.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-3 py-2.5 rounded-xl transition-colors"
          >
            <Navigation size={15} />
            Lokasi
          </a>
        </div>
      </div>
    </div>
  );
}
