// app/robots.ts

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://devemtiaz.tech/sitemap.xml",
    host: "https://devemtiaz.tech",
  };
}