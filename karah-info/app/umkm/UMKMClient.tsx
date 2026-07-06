"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { UMKM } from "@/lib/googleSheets";
import UMKMCard from "@/components/ui/UMKMCard";

const RT_OPTIONS = ["Semua", "RT 1", "RT 2", "RT 3", "RT 4", "RT 5", "RT 6", "RT 7"];
const ITEMS_PER_PAGE = 12;

export default function UMKMClient({ initialData }: { initialData: UMKM[] }) {
  const [search, setSearch] = useState("");
  const [filterRT, setFilterRT] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return initialData.filter((u) => {
      const matchSearch =
        !search ||
        u.nama_umkm.toLowerCase().includes(search.toLowerCase()) ||
        u.pemilik.toLowerCase().includes(search.toLowerCase());
      const matchRT = filterRT === "Semua" || `RT ${u.rt}` === filterRT;
      return matchSearch && matchRT;
    });
  }, [initialData, search, filterRT]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleSearch(val: string) {
    setSearch(val);
    setCurrentPage(1);
  }

  function handleFilter(rt: string) {
    setFilterRT(rt);
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">UMKM RW 6 Karah</h1>
          <p className="text-gray-500 mt-1">{initialData.length} usaha terdaftar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama UMKM atau pemilik..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-900/20 focus:border-primary-900"
            />
          </div>

          {/* RT Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-gray-400 shrink-0" />
            {RT_OPTIONS.map((rt) => (
              <button
                key={rt}
                onClick={() => handleFilter(rt)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filterRT === rt
                    ? "bg-primary-900 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-primary-900 hover:text-primary-900"
                }`}
              >
                {rt}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {(search || filterRT !== "Semua") && (
          <p className="text-sm text-gray-500 mb-4">
            Menampilkan {filtered.length} dari {initialData.length} UMKM
          </p>
        )}

        {/* UMKM Grid - 2 columns matching screenshot */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginated.map((umkm) => (
              <UMKMCard key={umkm.id} umkm={umkm} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <Search size={40} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">UMKM tidak ditemukan</p>
            <p className="text-sm mt-1">Coba ubah kata kunci atau filter RT</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary-900 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Berikutnya →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
