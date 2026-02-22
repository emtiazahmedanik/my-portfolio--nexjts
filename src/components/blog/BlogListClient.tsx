'use client';

import { useState } from 'react';
import { IBlogPost } from '@/types/blog';
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';
import { motion } from 'framer-motion';

interface BlogListClientProps {
  blogs: IBlogPost[];
}

const BlogListClient = ({ blogs }: BlogListClientProps) => {
  const [selectedBlog, setSelectedBlog] = useState<IBlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlogClick = (blog: IBlogPost) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBlog(null), 300);
  };

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-gray-400 text-lg">No blogs available yet.</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 w-full"
      >
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onReadMore={handleBlogClick}
          />
        ))}
      </motion.div>

      <BlogModal
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default BlogListClient;
