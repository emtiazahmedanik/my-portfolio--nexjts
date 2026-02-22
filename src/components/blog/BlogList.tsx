'use client';

import { IBlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  blogs: IBlogPost[];
  onBlogClick: (blog: IBlogPost) => void;
  isLoading: boolean;
}

const BlogList = ({ blogs, onBlogClick, isLoading }: BlogListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[rgba(255,255,255,0.10)] border-t-[var(--primaryColor)] rounded-full animate-spin" />
          <p className="text-gray-400">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-gray-400 text-lg">No blogs available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 w-full">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onReadMore={onBlogClick}
        />
      ))}
    </div>
  );
};

export default BlogList;
