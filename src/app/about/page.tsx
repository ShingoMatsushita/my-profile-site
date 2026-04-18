'use client';

import { motion } from 'framer-motion';
import { Code, Briefcase, GraduationCap, Award } from 'lucide-react';

const timeline = [
  {
    year: '2024',
    title: '現在',
    description: 'Web開発に従事し、モダンな技術スタックを学んでいます。',
    icon: Code,
  },
  {
    year: '2023',
    title: '転職',
    description: 'Web開発のキャリアをスタートしました。',
    icon: Briefcase,
  },
  {
    year: '2020',
    title: '大学卒業',
    description: '情報工学を専攻し、ソフトウェア開発の基礎を学びました。',
    icon: GraduationCap,
  },
];

const skills = [
  { name: 'TypeScript', level: 85 },
  { name: 'React', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'Node.js', level: 75 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'Git', level: 80 },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          About Me
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          こんにちは！Web開発者として、ユーザー体験を向上させるアプリケーションの構築に情熱を注いでいます。
          モダンな技術スタックを使い、シンプルで美しいインターフェースを作ることを大切にしています。
        </p>
      </motion.div>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">経歴</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 border-4 border-white dark:border-zinc-950">
                    <Icon className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-500">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">スキルセット</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {skill.name}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="bg-zinc-900 dark:bg-zinc-100 h-2.5 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
