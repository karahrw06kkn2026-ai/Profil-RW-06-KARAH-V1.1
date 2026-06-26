import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "RW 6 Karah - Kelurahan Karah, Kecamatan Jambangan, Kota Surabaya",
    template: "%s | RW 6 Karah",
  },
  description:
    "Website resmi RW 6 Karah, Kelurahan Karah, Kecamatan Jambangan, Kota Surabaya. Informasi lengkap tentang wilayah, profil, data warga, UMKM, dan peta wilayah.",
  keywords: ["RW 6 Karah", "Kelurahan Karah", "Jambangan", "Surabaya", "UMKM", "profil wilayah"],
  authors: [{ name: "KKN UIN Sunan Ampel Surabaya" }],
  openGraph: {
    title: "RW 6 Karah - Kelurahan Karah, Kecamatan Jambangan",
    description:
      "Website resmi RW 6 Karah. Informasi lengkap tentang wilayah, profil, data warga, UMKM, dan peta wilayah untuk warga dan pengunjung.",
    type: "website",
    locale: "id_ID",
    siteName: "RW 6 Karah",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
