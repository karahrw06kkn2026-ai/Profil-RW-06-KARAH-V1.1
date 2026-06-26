import type { Metadata } from "next";
import ProfilRWClient from "./ProfilRWClient";

export const metadata: Metadata = {
  title: "Profil RW",
  description: "Informasi lengkap tentang sejarah, visi misi, struktur dan data kependudukan RW 6 Karah.",
};

export default function ProfilRWPage() {
  return <ProfilRWClient />;
}
