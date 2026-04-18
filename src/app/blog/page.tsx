import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/blog';

export default async function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Blog
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          技術的な知見や考えを発信しています。Web開発、プログラミング、その他の技術トピックについて書いています。
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            まだ記事がありません。
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            src/content/blog/ ディレクトリにMDXファイルを追加してください。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg h-full group"
              >
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  続きを読む
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

