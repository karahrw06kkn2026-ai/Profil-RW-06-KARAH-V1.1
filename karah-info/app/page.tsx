import Link from "next/link";
import Image from "next/image";
import {
  Users, MapPin, ShoppingBag, Map, ArrowRight,
  Building2, ChevronRight
} from "lucide-react";
import profilRW from "@/data/profil-rw.json";
import { getUMKMData } from "@/lib/googleSheets";
import MapPreview from "@/components/sections/MapPreview";

// Ubah link Google Drive jadi link thumbnail langsung
function resolveFotoUrl(url: string): string {
  if (url && url.includes("drive.google.com")) {
    const driveMatch = url.match(/[-\w]{25,}/);
    if (driveMatch) return `https://drive.google.com/thumbnail?id=${driveMatch[0]}&sz=w400`;
  }
  return url;
}

export default async function HomePage() {
  const allUMKM = await getUMKMData();
  const umkmPunyaFoto = allUMKM.filter(
    (u) => Array.isArray(u.foto) && u.foto.some((f) => f && f.trim() !== "")
  );
  const featuredUMKM = umkmPunyaFoto.slice(0, 6);

  const kategoriColor: Record<string, string> = {
    Makanan: "bg-orange-100 text-orange-700",
    Minuman: "bg-blue-100 text-blue-700",
    Jasa: "bg-purple-100 text-purple-700",
    Fashion: "bg-pink-100 text-pink-700",
    Kelontong: "bg-yellow-100 text-yellow-700",
    Kerajinan: "bg-teal-100 text-teal-700",
    Umum: "bg-gray-100 text-gray-700",
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-kkn.jpeg"
            alt="Kegiatan KKN RW 6 Karah"
            fill
            className="object-cover object-[center_25%] saturate-[0.85]"
            priority
          />
          {/* Green overlay - left side stronger, right fades */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/85 to-primary-900/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-xl">
            <p className="text-green-200 text-lg mb-1">Selamat Datang di</p>
            <h1 className="text-white text-5xl sm:text-6xl font-extrabold mb-3 leading-tight">
              RW 6 KARAH
            </h1>
            <div className="w-16 h-1 bg-yellow-400 mb-4 rounded-full" />
            <p className="text-green-100 text-base leading-relaxed mb-6">
              Informasi lengkap tentang <strong className="text-white">wilayah</strong>, profil,{" "}
              <strong className="text-white">data warga</strong>,{" "}
              <strong className="text-white">UMKM</strong>, dan peta wilayah
              untuk warga dan pengunjung.
              <br />
              Bersama membangun Karah yang maju, guyub, dan sejahtera.
            </p>
            <Link
              href="/profil-rw"
              className="inline-flex items-center gap-2 bg-white text-primary-900 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition-colors"
            >
              Jelajahi Sekarang
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Stats bar overlapping hero bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-t-2xl shadow-lg px-6 py-4 flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center text-white">
                  <Users size={18} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xl">{profilRW.jumlahRT}</div>
                  <div className="text-gray-500 text-xs">RT</div>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-100 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-white">
                  <Users size={18} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xl">± {profilRW.jumlahPenduduk.toLocaleString("id-ID")}</div>
                  <div className="text-gray-500 text-xs">Penduduk</div>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-100 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-900 rounded-xl flex items-center justify-center text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{profilRW.kecamatan}</div>
                  <div className="text-gray-500 text-xs">Kecamatan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for stats bar */}
      <div className="h-20 bg-white" />

      {/* QUICK MENU SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              href: "/profil-rw",
              icon: <Building2 size={28} />,
              iconBg: "bg-primary-900",
              title: "Profil RW",
              desc: "Informasi lengkap tentang sejarah, visi misi, struktur dan data kependudukan.",
              linkText: "Lihat Profil RW",
              linkColor: "text-primary-900",
            },
            {
              href: "/profil-rt",
              icon: <Users size={28} />,
              iconBg: "bg-blue-500",
              title: "Profil RT",
              desc: "Informasi lengkap setiap RT yang ada di RW 6 Karah.",
              linkText: "Lihat Profil RT",
              linkColor: "text-blue-600",
            },
            {
              href: "/umkm",
              icon: <ShoppingBag size={28} />,
              iconBg: "bg-yellow-400",
              title: "UMKM",
              desc: "Temukan berbagai usaha lokal warga RW 6 Karah.",
              linkText: "Lihat UMKM",
              linkColor: "text-yellow-600",
            },
            {
              href: "/peta-wilayah",
              icon: <Map size={28} />,
              iconBg: "bg-purple-500",
              title: "Peta Wilayah",
              desc: "Jelajahi peta interaktif wilayah RW 6 Karah.",
              linkText: "Lihat Peta",
              linkColor: "text-purple-600",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center text-white mb-4`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.desc}</p>
              <span className={`text-sm font-medium ${item.linkColor} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                {item.linkText} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TENTANG RW + PETA side by side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tentang RW */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary-900 rounded-full inline-block" />
              Tentang RW 6 Karah
            </h2>
            <div className="flex gap-4">
              <div className="relative w-40 h-32 shrink-0 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1579492450119-80542d516179?w=300&h=200&fit=crop"
                  alt="RW 6 Karah"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {profilRW.sejarah}
                </p>
                <Link
                  href="/profil-rw"
                  className="inline-flex items-center gap-1.5 bg-primary-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-primary-800 transition-colors"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
          </div>

          {/* Peta Wilayah */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                <span className="w-1 h-6 bg-primary-900 rounded-full inline-block" />
                Peta Wilayah RW 6 Karah
              </h2>
              <Link
                href="/peta-wilayah"
                className="text-primary-900 text-sm font-medium flex items-center gap-1 hover:underline"
              >
                Lihat Peta Lengkap <ChevronRight size={14} />
              </Link>
            </div>
            <div className="h-48 rounded-xl overflow-hidden">
              <MapPreview />
            </div>
          </div>
        </div>
      </section>

      {/* UMKM UNGGULAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900 text-xl flex items-center gap-2">
            <span className="w-1 h-6 bg-primary-900 rounded-full inline-block" />
            UMKM Unggulan RW 6 Karah
          </h2>
          <Link
            href="/umkm"
            className="text-primary-900 text-sm font-medium flex items-center gap-1 hover:underline"
          >
            Lihat Semua UMKM <ChevronRight size={14} />
          </Link>
        </div>

        {/* Horizontal scroll carousel */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {featuredUMKM.map((umkm) => {
            const badgeClass = kategoriColor[umkm.kategori || "Umum"] || kategoriColor["Umum"];
            return (
              <div
                key={umkm.id}
                className="shrink-0 w-48 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-32 bg-gray-100">
                  <Image
                    src={resolveFotoUrl(umkm.foto[0])}
                    alt={umkm.nama_umkm}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-3">
                  <div className="font-semibold text-gray-900 text-sm truncate">{umkm.nama_umkm}</div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${badgeClass}`}>
                    {umkm.kategori}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
