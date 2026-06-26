import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://rw6karah.vercel.app", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://rw6karah.vercel.app/profil-rw", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://rw6karah.vercel.app/profil-rt", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://rw6karah.vercel.app/umkm", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://rw6karah.vercel.app/peta-wilayah", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
