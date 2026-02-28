import { MetadataRoute } from "next";
import { initializeFirebase } from "@/lib/firebase-admin";
import { IBlogPost } from "@/types/blog";

async function getBlogs(): Promise<IBlogPost[]> {
  try {
    const adminDb = initializeFirebase();
    if (!adminDb) {
      console.error("Firebase not initialized");
      return [];
    }

    const blogsSnapshot = await adminDb
      .collection("blogs")
      .orderBy("createdAt", "desc")
      .get();

    const blogs: IBlogPost[] = [];
    blogsSnapshot.forEach((doc: any) => {
      const data = doc.data() as any;
      blogs.push({
        id: doc.id,
        title: data?.title || "",
        content: data?.content || "",
        createdAt: data?.createdAt?.toDate?.() || new Date(),
        updatedAt: data?.updatedAt?.toDate?.() || new Date(),
      });
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://devemtiaz.tech";
  const blogs = await getBlogs();

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.id}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
  ];
}