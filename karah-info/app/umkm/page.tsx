import type { Metadata } from "next";
import { getUMKMData } from "@/lib/googleSheets";
import UMKMClient from "./UMKMClient";

export const metadata: Metadata = {
  title: "UMKM",
  description: "Temukan berbagai usaha lokal warga RW 6 Karah.",
};

export const revalidate = 3600; // ISR: 1 hour

export default async function UMKMPage() {
  const umkmData = await getUMKMData();
  return <UMKMClient initialData={umkmData} />;
}
