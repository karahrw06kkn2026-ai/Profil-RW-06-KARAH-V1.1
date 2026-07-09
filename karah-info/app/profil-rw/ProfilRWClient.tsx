"use client";

import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  Users, Home, UserCheck, Baby, Briefcase, TrendingUp, MapPin
} from "lucide-react";
import profilRW from "@/data/profil-rw.json";

const COLORS = ["#1B4332", "#40916C", "#F59E0B", "#3B82F6", "#8B5CF6", "#F97316", "#EC4899"];

export default function ProfilRWClient() {
  const demografiData = [
    { name: "Laki-laki", value: profilRW.lakiLaki },
    { name: "Perempuan", value: profilRW.perempuan },
  ];

  const kategoriData = [
    { name: "Lansia", value: profilRW.lansia, color: "#8B5CF6" },
    { name: "Balita", value: profilRW.balita, color: "#F59E0B" },
  ];

  const statsCards = [
    { icon: Home, label: "Jumlah KK", value: profilRW.jumlahKK, color: "bg-primary-900", unit: "Rumah" },
    { icon: Users, label: "Jumlah Penduduk", value: profilRW.jumlahPenduduk, color: "bg-blue-500", unit: "Jiwa" },
    { icon: UserCheck, label: "Laki-laki", value: profilRW.lakiLaki, color: "bg-indigo-500", unit: "Jiwa" },
    { icon: UserCheck, label: "Perempuan", value: profilRW.perempuan, color: "bg-pink-500", unit: "Jiwa" },
    { icon: TrendingUp, label: "Lansia (60+)", value: profilRW.lansia, color: "bg-purple-500", unit: "Jiwa" },
    { icon: Baby, label: "Balita (0–5)", value: profilRW.balita, color: "bg-yellow-500", unit: "Jiwa" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={20} className="text-green-300" />
            <span className="text-green-200 text-sm">Kel. Karah, Kec. Jambangan, Kota Surabaya</span>
          </div>
          <h1 className="text-3xl font-bold">Profil RW 6 Karah</h1>
          <p className="text-green-200 mt-2">Dashboard statistik dan informasi kependudukan</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {statsCards.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                <stat.icon size={18} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value.toLocaleString("id-ID")}
                <span className="text-sm font-normal text-gray-400 ml-1">{stat.unit}</span>
              </div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Gender Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Distribusi Jenis Kelamin</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={demografiData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`}
                >
                  <Cell fill="#1B4332" />
                  <Cell fill="#EC4899" />
                </Pie>
                <Tooltip formatter={(v) => `${v} jiwa`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Komposisi Penduduk</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={kategoriData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => `${v} jiwa`} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {kategoriData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visi Misi */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary-900 rounded-full" />
              Visi & Misi
            </h3>
            <div className="mb-3">
              <div className="text-xs font-semibold text-primary-900 uppercase tracking-wide mb-1">VISI</div>
              <p className="text-gray-700 text-sm">{profilRW.visi}</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-primary-900 uppercase tracking-wide mb-2">MISI</div>
              <ul className="space-y-2">
                {profilRW.misi.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-primary-900 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Struktur Pengurus */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary-900 rounded-full" />
              Struktur Pengurus
            </h3>
            <div className="space-y-3">
              {[
                { label: "Ketua RW", name: profilRW.ketua },

              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 bg-primary-900 rounded-full flex items-center justify-center text-white">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
