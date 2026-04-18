import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">404</h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
        ページが見つかりませんでした
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
      >
        ホームに戻る
      </Link>
    </div>
  );
}

