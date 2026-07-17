"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Home, Users, MapPin, ShoppingBag, Map } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/profil-rw", label: "Profil RW", icon: Users },
  { href: "/profil-rt", label: "Profil RT", icon: Users },
  { href: "/umkm", label: "UMKM", icon: ShoppingBag },
  { href: "/peta-wilayah", label: "Peta Wilayah", icon: Map },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-white p-1">
              <Image
                src="/images/logo-kkn.jpeg"
                alt="Logo KKN RW 6 Karah"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-primary-900 text-sm leading-tight">RW 6 KARAH</div>
              <div className="text-gray-500 text-xs leading-tight">Kel. Karah – Kec. Jambangan</div>
              <div className="text-gray-500 text-xs leading-tight">Kota Surabaya</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary-900 text-white"
                      : "text-gray-600 hover:text-primary-900 hover:bg-gray-100"
                  }`}
                >
                  <link.icon size={14} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-800 transition-colors"
            
              <Phone size={14} />
              Hubungi RW
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-900 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-primary-900 text-white rounded-xl text-sm font-medium mt-2"
            >
              <Phone size={16} />
              Hubungi RW
            </a>
          </div>
        </div>
      )}
    </header>
  );
}