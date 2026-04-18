import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}) {
  const resolvedParams = await Promise.resolve(params);
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors"
      >
        ← ブログ一覧に戻る
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.date}>{post.date}</time>
        </div>
      </header>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">{children}</h1>,
            h2: ({ children }) => <h2 className="text-3xl font-semibold mt-6 mb-3 text-zinc-900 dark:text-zinc-100">{children}</h2>,
            h3: ({ children }) => <h3 className="text-2xl font-semibold mt-4 mb-2 text-zinc-900 dark:text-zinc-100">{children}</h3>,
            p: ({ children }) => <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>,
            ul: ({ children }) => <ul className="mb-4 ml-6 list-disc">{children}</ul>,
            ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal">{children}</ol>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
            code: ({ className, children, ...props }: any) => {
              const isInline = !className;
              return isInline ? (
                <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
            a: ({ href, children }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic my-4">{children}</blockquote>,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

