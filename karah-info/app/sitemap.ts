import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://profil-rw-06-karah-v1-1.vercel.app";

  const routes = [
    "",
    "/profil-rw",
    "/profil-rt",
    "/umkm",
    "/peta-wilayah",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
