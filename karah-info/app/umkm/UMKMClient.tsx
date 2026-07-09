"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { UMKM } from "@/lib/googleSheets";
import UMKMCard from "@/components/ui/UMKMCard";

const KATEGORI_LIST = [
  "Semua",
  "Makanan",
  "Minuman",
  "Jasa",
  "Fashion",
  "Kelontong",
  "Kerajinan",
  "Umum",
];

export default function UMKMClient({ initialData }: { initialData: UMKM[] }) {
  const [search, setSearch] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const filteredData = useMemo(() => {
    return initialData.filter((umkm) => {
      const cocokKategori =
        kategoriAktif === "Semua" || umkm.kategori === kategoriAktif;

      const keyword = search.trim().toLowerCase();
      const cocokSearch =
        keyword === "" ||
        umkm.nama_umkm.toLowerCase().includes(keyword) ||
        umkm.pemilik.toLowerCase().includes(keyword) ||
        umkm.alamat.toLowerCase().includes(keyword);

      return cocokKategori && cocokSearch;
    });
  }, [initialData, search, kategoriAktif]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">UMKM Warga RW 6 Karah</h1>
        <p className="text-gray-500 text-sm">
          Temukan berbagai usaha lokal warga di lingkungan RW 6 Karah.
        </p>
      </div>

      {/* Search box */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama usaha, pemilik, atau alamat..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-900/20 focus:border-primary-900"
        />
      </div>

      {/* Filter kategori */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {KATEGORI_LIST.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setKategoriAktif(kategori)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              kategoriAktif === kategori
                ? "bg-primary-900 text-white border-primary-900"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      {/* Jumlah hasil */}
      <p className="text-sm text-gray-500 mb-4">
        Menampilkan {filteredData.length} dari {initialData.length} UMKM
      </p>

      {/* Grid UMKM */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredData.map((umkm) => (
            <UMKMCard key={umkm.id} umkm={umkm} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          Tidak ada UMKM yang cocok dengan pencarian.
        </div>
      )}
    </div>
  );
}
