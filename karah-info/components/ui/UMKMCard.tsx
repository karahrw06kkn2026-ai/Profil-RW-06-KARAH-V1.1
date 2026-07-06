"use client";

import Image from "next/image";
import { MapPin, MessageCircle, User, Navigation, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { UMKM } from "@/lib/googleSheets";

function getImageUrl(url: string, kategori?: string): string {
  const defaultImages: Record<string, string> = {
    Makanan: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    Minuman: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
    Jasa: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
    Fashion: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    Kelontong: "https://images.unsplash.com/photo-1604719312566-8912e9c8a213?w=400&h=300&fit=crop",
    Kerajinan: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop",
    Umum: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
  };

  if (url && url.startsWith("/")) return url;

  if (url && url.includes("drive.google.com")) {
    const driveMatch = url.match(/[-\w]{25,}/);
    if (driveMatch) return `https://drive.google.com/thumbnail?id=${driveMatch[0]}&sz=w400`;
  }

  return defaultImages[kategori || "Umum"] || defaultImages["Umum"];
}

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
  const badgeClass = kategoriColor[umkm.kategori || "Umum"] || kategoriColor["Umum"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const fotoList = Array.isArray(umkm.foto) && umkm.foto.length > 0
    ? umkm.foto
    : [""];

  const prev = () => setCurrentIndex((i) => (i - 1 + fotoList.length) % fotoList.length);
  const next = () => setCurrentIndex((i) => (i + 1) % fotoList.length);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Photo Carousel */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={getImageUrl(fotoList[currentIndex], umkm.kategori)}
          alt={umkm.nama_umkm}
          fill
          className="object-cover"
          unoptimized
        />

        {fotoList.length > 1 && (
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

      {/* Content */}
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
          
            href={`https://wa.me/${umkm.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          
            <MessageCircle size={15} />
            WhatsApp
          </a>
          
            href={umkm.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-3 py-2.5 rounded-xl transition-colors"
          
            <Navigation size={15} />
            Lokasi
          </a>
        </div>
      </div>
    </div>
  );
}