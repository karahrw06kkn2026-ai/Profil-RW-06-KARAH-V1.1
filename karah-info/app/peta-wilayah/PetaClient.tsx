"use client";

import { useState } from "react";
import Image from "next/image";
import { UMKM } from "@/lib/googleSheets";

const RT_OPTIONS = ["Semua", "RT 1", "RT 2", "RT 3", "RT 4", "RT 5", "RT 6", "RT 7"];

// Path gambar peta statis per RT
const PETA_IMAGES: Record<string, string> = {
  "Semua": "/images/peta/peta-semua.png"
  "RT 1": "/images/peta/peta-rt-1.png",
  "RT 2": "/images/peta/peta-rt-2.png",
  "RT 3": "/images/peta/peta-rt-3.png",
  "RT 4": "/images/peta/peta-rt-4.png",
  "RT 5": "/images/peta/peta-rt-5.png",
  "RT 6": "/images/peta/peta-rt-6.png",
  "RT 7": "/images/peta/peta-rt-7.png",
};

export default function PetaClient({ umkmData }: { umkmData: UMKM[] }) {
const [filterRT, setFilterRT] = useState("Semua");

  const filteredUMKM =
    filterRT === "Semua" ? umkmData : umkmData.filter((u) => u.rt === filterRT);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Peta Wilayah RW 6 Karah</h1>
          <p className="text-green-200 mt-2">Peta lokasi UMKM dan batas wilayah</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* RT Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {RT_OPTIONS.map((rt) => (
            <button
              key={rt}
              onClick={() => setFilterRT(rt)}
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

        {/* Static Map Image */}
        <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative bg-white">
          <Image
            src={PETA_IMAGES[filterRT]}
            alt={`Peta Wilayah ${filterRT}`}
            width={1400}
            height={900}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Daftar UMKM sesuai filter */}
        {filteredUMKM.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUMKM.map((umkm, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <p className="font-semibold text-primary-900">{umkm.nama_umkm}</p>
                <p className="text-sm text-gray-500">{umkm.pemilik}</p>
                <p className="text-sm text-gray-500">{umkm.alamat}</p>
                <p className="text-xs text-gray-400 mt-1">{umkm.rt}</p>
                <div className="mt-2 flex gap-2">
                  
                    href={`https://wa.me/${umkm.whatsapp}`}
                    target="_blank"
                    className="bg-[#25D366] text-white px-3 py-1 rounded-md text-xs"
                  
                    WhatsApp
                  </a>
                  
                    href={umkm.maps}
                    target="_blank"
                    className="bg-primary-900 text-white px-3 py-1 rounded-md text-xs"
                  
                    Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
