import Link from "next/link";
import { MapPin, Phone, Clock, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Alamat */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-green-300" />
              <span className="font-semibold text-sm">Alamat</span>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              RW 6 Karah<br />
              Kel. Karah, Kec. Jambangan<br />
              Kota Surabaya, Jawa Timur
            </p>
          </div>

          {/* Kontak RW */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Phone size={18} className="text-green-300" />
              <span className="font-semibold text-sm">Kontak RW</span>
            </div>
            <p className="text-green-100 text-sm">(031) 1234 5678</p>
            <p className="text-green-100 text-sm">rw6karah@gmail.com</p>
          </div>

          {/* Jam Pelayanan */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-green-300" />
              <span className="font-semibold text-sm">Jam Pelayanan</span>
            </div>
            <p className="text-green-100 text-sm">Senin – Jumat</p>
            <p className="text-green-100 text-sm">08.00 – 16.00 WIB</p>
          </div>

          {/* Ikuti Kami */}
          <div>
            <div className="font-semibold text-sm mb-4">Ikuti Kami</div>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/rw6karah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com/rw6karah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                {/* WhatsApp icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>

            {/* Surabaya skyline illustration placeholder */}
            <div className="mt-4 opacity-30">
              <svg viewBox="0 0 200 60" fill="currentColor" width="180">
                <rect x="10" y="30" width="8" height="30" rx="1"/>
                <rect x="22" y="20" width="10" height="40" rx="1"/>
                <rect x="36" y="15" width="14" height="45" rx="1"/>
                <rect x="36" y="10" width="4" height="8" rx="1"/>
                <rect x="54" y="25" width="8" height="35" rx="1"/>
                <rect x="66" y="18" width="12" height="42" rx="1"/>
                <rect x="82" y="28" width="6" height="32" rx="1"/>
                <rect x="92" y="12" width="10" height="48" rx="1"/>
                <rect x="106" y="22" width="8" height="38" rx="1"/>
                <rect x="118" y="30" width="6" height="30" rx="1"/>
                <rect x="128" y="16" width="12" height="44" rx="1"/>
                <rect x="144" y="24" width="8" height="36" rx="1"/>
                <rect x="156" y="10" width="14" height="50" rx="1"/>
                <rect x="174" y="20" width="8" height="40" rx="1"/>
                <rect x="186" y="28" width="10" height="32" rx="1"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-green-200 text-xs">
            © {new Date().getFullYear()} RW 6 Karah. Dibuat oleh KKN UIN Sunan Ampel Surabaya.
          </p>
        </div>
      </div>
    </footer>
  );
}
