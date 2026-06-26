import type { Metadata } from "next";
import { getUMKMData } from "@/lib/googleSheets";
import PetaClient from "./PetaClient";

export const metadata: Metadata = {
  title: "Peta Wilayah",
  description: "Peta interaktif wilayah RW 6 Karah beserta lokasi UMKM.",
};

export const revalidate = 3600;

export default async function PetaWilayahPage() {
  const umkmData = await getUMKMData();
  return <PetaClient umkmData={umkmData} />;
}
