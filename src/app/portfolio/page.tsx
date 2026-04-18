'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: 'プロジェクト1',
    description: 'これはサンプルプロジェクトです。実際の制作物の情報に置き換えてください。',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    title: 'プロジェクト2',
    description: 'モダンなWebアプリケーションの開発事例です。',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com',
  },
  {
    title: 'プロジェクト3',
    description: 'ユーザー体験を重視したデザインと実装。',
    technologies: ['Vue.js', 'TypeScript', 'Firebase'],
    liveUrl: 'https://example.com',
  },
];

export default function Portfolio() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Portfolio
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          これまでに制作したプロジェクトの一覧です。各プロジェクトの詳細や使用技術を確認できます。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {project.title}
                </h3>
                <Code className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    ライブサイト
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

