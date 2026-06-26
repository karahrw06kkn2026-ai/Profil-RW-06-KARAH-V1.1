import Image from "next/image";
import { MapPin, MessageCircle, User, Navigation, Store } from "lucide-react";
import { UMKM } from "@/lib/googleSheets";
import { getDirectDriveUrl } from "@/utils/driveImage";

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
  const badgeClass =
    kategoriColor[umkm.kategori || "Umum"] || kategoriColor["Umum"];

  const fotoUrl = getDirectDriveUrl(umkm.foto);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Photo */}
      <div className="relative h-48 bg-gray-100">
        {fotoUrl ? (
          <Image
            src={fotoUrl}
            alt={umkm.nama_umkm}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
              <Store size={28} className="text-gray-500" />
            </div>
            <p className="text-gray-500 text-xs font-medium text-center px-4 line-clamp-2">
              {umkm.nama_umkm}
            </p>
          </div>
        )}
        {/* RT Badge */}
        <span className="absolute top-3 right-3 bg-primary-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {umkm.rt}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base mb-1">
          {umkm.nama_umkm}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
          <User size={12} />
          <span>{umkm.pemilik}</span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
          <MapPin size={12} />
          <span>{umkm.alamat}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
          {umkm.deskripsi}
        </p>

        {umkm.kategori && (
          <span
            className={`self-start text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${badgeClass}`}
          >
            {umkm.kategori}
          </span>
        )}
{/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <a href={`https://wa.me/${umkm.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
            <MessageCircle size={15} />
            WhatsApp
          </a>
          <a href={umkm.maps} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-3 py-2.5 rounded-xl transition-colors">
            <Navigation size={15} />
            Lokasi
          </a>
        </div>
      </div>
    </div>
  );
}