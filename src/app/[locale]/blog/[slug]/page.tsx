import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
      <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: 'var(--muted)' }}>
        ← {locale === 'ja' ? 'ホームに戻る' : 'Back to Home'}
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>{post.title}</h1>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
          <Calendar className="w-4 h-4" />
          <time dateTime={post.date}>{post.date}</time>
        </div>
      </header>
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}
          components={{
            h2: ({ children }) => <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>,
            p:  ({ children }) => <p  className="mb-4 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="mb-4 ml-6 list-disc">{children}</ul>,
            li: ({ children }) => <li className="mb-2">{children}</li>,
            code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
              const isInline = !className;
              return isInline
                ? <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
                : <code className={className} {...props}>{children}</code>;
            },
            pre: ({ children }) => <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
            a:   ({ href, children }) => <a href={href} className="underline">{children}</a>,
          }}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
