import type { Metadata } from "next";
import { Users, Home, UserCheck, Baby, TrendingUp, Briefcase } from "lucide-react";
import rtData from "@/data/rt.json";

export const metadata: Metadata = {
  title: "Profil RT",
  description: "Informasi lengkap setiap RT yang ada di RW 6 Karah.",
};

export default function ProfilRTPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Profil RT</h1>
          <p className="text-green-200 mt-2">Data lengkap setiap Rukun Tetangga di RW 6 Karah</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rtData.map((rt) => (
            <div key={rt.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* RT Header */}
              <div className="bg-primary-900 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-green-200 text-xs font-medium uppercase tracking-wide">Rukun Tetangga</div>
                    <div className="text-2xl font-bold">RT {rt.nomor}</div>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Users size={22} />
                  </div>
                </div>
                <div className="mt-2 text-green-100 text-sm font-medium">{rt.ketua}</div>
                <div className="text-green-200 text-xs">Ketua RT</div>
              </div>

              {/* Stats */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Home, label: "Jumlah KK", value: rt.jumlahKK, unit: "KK", color: "text-primary-900" },
                    { icon: Users, label: "Penduduk", value: rt.jumlahPenduduk, unit: "Jiwa", color: "text-blue-600" },
                    { icon: UserCheck, label: "Laki-laki", value: rt.lakiLaki, unit: "Jiwa", color: "text-indigo-600" },
                    { icon: UserCheck, label: "Perempuan", value: rt.perempuan, unit: "Jiwa", color: "text-pink-600" },
                    { icon: Baby, label: "Balita", value: rt.balita, unit: "Jiwa", color: "text-yellow-600" },
                    { icon: TrendingUp, label: "Lansia", value: rt.lansia, unit: "Jiwa", color: "text-purple-600" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-xl p-3">
                      <div className={`${stat.color} mb-1`}>
                        <stat.icon size={14} />
                      </div>
                      <div className="font-bold text-gray-900 text-lg leading-tight">
                        {stat.value}
                        <span className="text-xs font-normal text-gray-400 ml-1">{stat.unit}</span>
                      </div>
                      <div className="text-gray-500 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Pendatang */}
                <div className="mt-3 bg-orange-50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <Briefcase size={14} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base">
                      {rt.pendatang}
                      <span className="text-xs font-normal text-gray-400 ml-1">Jiwa</span>
                    </div>
                    <div className="text-gray-500 text-xs">Pendatang / Kost</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
