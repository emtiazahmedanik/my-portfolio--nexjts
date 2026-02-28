import { IBlogPost } from '@/types/blog';
import PageBox from '@/components/core/PageBox';
import { initializeFirebase } from '@/lib/firebase-admin';
import { notFound } from 'next/navigation';

// Revalidate every 1 hour (3600 seconds) for ISR
export const revalidate = 3600;

async function getBlogById(id: string): Promise<IBlogPost | null> {
  try {
    const adminDb = initializeFirebase();
    if (!adminDb) {
      console.error('Firebase not initialized');
      return null;
    }

    const doc = await adminDb.collection('blogs').doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data() as any;
    return {
      id: doc.id,
      title: data?.title || '',
      content: data?.content || '',
      createdAt: data?.createdAt?.toDate?.() || new Date(),
      updatedAt: data?.updatedAt?.toDate?.() || new Date(),
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

async function getAllBlogIds(): Promise<string[]> {
  try {
    const adminDb = initializeFirebase();
    if (!adminDb) {
      return [];
    }

    const blogsSnapshot = await adminDb.collection('blogs').get();
    const ids: string[] = [];

    blogsSnapshot.forEach((doc: any) => {
      ids.push(doc.id);
    });

    return ids;
  } catch (error) {
    console.error('Error fetching blog IDs:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const ids = await getAllBlogIds();
  return ids.map((id) => ({
    id,
  }));
}

async function generateMetadata({ params }: { params: { id: string } }) {
  const blog = await getBlogById(params.id);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: blog.title,
    description: blog.content.substring(0, 160) || 'Blog post by Emtiaz',
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160),
      url: `https://devemtiaz.tech/blog/${blog.id}`,
      type: 'article',
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await getBlogById(params.id);

  if (!blog) {
    notFound();
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.content.substring(0, 160),
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
    url: `https://devemtiaz.tech/blog/${blog.id}`,
    author: {
      '@type': 'Person',
      name: 'Emtiaz',
      url: 'https://devemtiaz.tech',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageBox>
        <div className="w-full py-20">
          <div className="max-w-3xl mx-auto px-4 md:px-0">
            <article>
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {blog.title}
                </h1>
                <div className="text-gray-400 text-sm md:text-base space-y-2">
                  <p>
                    Published:{' '}
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  {blog.updatedAt && new Date(blog.updatedAt).getTime() !== new Date(blog.createdAt).getTime() && (
                    <p>
                      Updated:{' '}
                      {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </header>

              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <a
                href="/blog"
                className="inline-block text-blue-400 hover:text-blue-300 transition-colors"
              >
                ← Back to all blogs
              </a>
            </div>
          </div>
        </div>
      </PageBox>
    </>
  );
}
