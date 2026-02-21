import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://devemtiaz.tech",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}