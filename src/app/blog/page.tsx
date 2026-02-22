'use client';

import { useEffect, useState } from 'react';
import { IBlogPost } from '@/types/blog';
import BlogList from '@/components/blog/BlogList';
import BlogModal from '@/components/blog/BlogModal';
import PageBox from '@/components/core/PageBox';
import SectionTitle from '@/components/common/SectionTitle';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<IBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<IBlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog: IBlogPost) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBlog(null), 300);
  };

  return (
    <PageBox>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full py-20"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <SectionTitle>Blog</SectionTitle>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              Thoughts, tutorials, and insights about web development
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <BlogList
              blogs={blogs}
              onBlogClick={handleBlogClick}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </motion.div>

      <BlogModal
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </PageBox>
  );
}
