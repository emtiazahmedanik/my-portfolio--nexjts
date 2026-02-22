import { IBlogPost } from '@/types/blog';
import BlogListClient from '@/components/blog/BlogListClient';
import PageBox from '@/components/core/PageBox';
import SectionTitle from '@/components/common/SectionTitle';
import { initializeFirebase } from '@/lib/firebase-admin';

// Revalidate every 1 hour (3600 seconds) for ISR
export const revalidate = 3600;

async function fetchBlogs(): Promise<IBlogPost[]> {
  try {
    const adminDb = initializeFirebase();
    if (!adminDb) {
      console.error('Firebase not initialized');
      return [];
    }

    const blogsSnapshot = await adminDb
      .collection('blogs')
      .orderBy('createdAt', 'desc')
      .get();

    const blogs: IBlogPost[] = [];
    blogsSnapshot.forEach((doc: any) => {
      const data = doc.data() as any;
      blogs.push({
        id: doc.id,
        title: data?.title || '',
        content: data?.content || '',
        createdAt: data?.createdAt?.toDate?.() || new Date(),
        updatedAt: data?.updatedAt?.toDate?.() || new Date(),
      });
    });

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: "Emtiaz Ahmed's Blog",
    description: 'Web and mobile development insights',
    url: 'https://devemtiaz.tech/blog',
    author: {
      '@type': 'Person',
      name: 'Emtiaz',
      url: 'https://devemtiaz.tech',
    },
    blogPost: blogs.map((blog) => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.content.substring(0, 160),
      datePublished: new Date(blog.createdAt).toISOString(),
      dateModified: new Date(blog.updatedAt).toISOString(),
      url: `https://devemtiaz.tech/blog#${blog.id}`,
      author: {
        '@type': 'Person',
        name: 'Emtiaz',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageBox>
        <div className="w-full py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-0">
            <div className="text-center mb-12">
              <SectionTitle>Emtiaz Ahmed's Blog</SectionTitle>
              <p className="text-gray-400 mt-4 text-sm md:text-base">
                Web and mobile development insights
              </p>
            </div>

            <div className="mt-12">
              <BlogListClient blogs={blogs} />
            </div>
          </div>
        </div>
      </PageBox>
    </>
  );
}
