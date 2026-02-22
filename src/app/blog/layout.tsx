import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Dev Emtiaz - Web & Mobile Development Insights',
  description: 'Read thought-provoking articles about Flutter, Next.js, web development, mobile app development, software engineering, and cutting-edge technology trends.',
  keywords: ['blog', 'flutter', 'web development', 'mobile development', 'next.js', 'software engineering', 'technology', 'tutorial'],
  openGraph: {
    title: 'Blog | Dev Emtiaz',
    description: 'Insights and tutorials on Flutter, Next.js, and web development',
    url: 'https://devemtiaz.tech/blog',
    siteName: 'Dev Emtiaz Portfolio',
    type: 'website',
    images: [
      {
        url: 'https://devemtiaz.tech/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dev Emtiaz Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Dev Emtiaz',
    description: 'Web & Mobile Development Insights',
  },
  alternates: {
    canonical: 'https://devemtiaz.tech/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
