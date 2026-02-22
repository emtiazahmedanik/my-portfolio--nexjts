'use client';

import { IBlogPost } from '@/types/blog';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface BlogModalProps {
  blog: IBlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal = ({ blog, isOpen, onClose }: BlogModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!blog) return null;

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-[var(--bgColor)] rounded-xl border border-[rgba(255,255,255,0.10)] overflow-y-auto shadow-2xl"
          >
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="pr-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Published on {getFormattedDate(blog.createdAt)}
                  </p>
                </div>
                
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0 text-2xl leading-none hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                  {blog.content}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
