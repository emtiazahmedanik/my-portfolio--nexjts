import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Portfolio',
  description: 'Thoughts, tutorials, and insights about web development, mobile app development, software engineering, AI and more. Explore my latest articles and projects in the world of technology.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
