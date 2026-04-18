'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg h-full"
      >
        <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
          {post.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
          {post.date}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {post.excerpt}
        </p>
      </Link>
    </motion.div>
  );
}

