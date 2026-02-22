'use client';

import { IBlogPost } from '@/types/blog';
import { motion } from 'framer-motion';

interface BlogCardProps {
  blog: IBlogPost;
  onReadMore: (blog: IBlogPost) => void;
}

const BlogCard = ({ blog, onReadMore }: BlogCardProps) => {
  const previewText = blog.content.substring(0, 120) + '...';
  
  const getFormattedDate = (dateValue: any) => {
    try {
      const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Date unavailable';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg border border-[rgba(255,255,255,0.10)] bg-[var(--bgColor)] hover:border-[var(--primaryColor)] transition-all duration-300 cursor-pointer group"
      onClick={() => onReadMore(blog)}
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-[var(--primaryColor)] transition-colors duration-300">
          {blog.title}
        </h3>
        
        <p className="text-sm text-gray-400 line-clamp-2">
          {previewText}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
          <span className="text-xs text-gray-500">
            {getFormattedDate(blog.createdAt)}
          </span>
          
          <button className="text-xs font-semibold text-[var(--primaryColor)] hover:translate-x-1 transition-transform duration-300">
            Read More →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
