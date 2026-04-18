'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:your.email@example.com',
    icon: Mail,
    description: 'your.email@example.com',
  },
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
    description: 'GitHubプロフィール',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
    description: '@yourusername',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
    description: 'LinkedInプロフィール',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ここでフォーム送信処理を実装
    // 例: API Routesを使用するか、Google Formsにリダイレクト
    console.log('Form submitted:', formData);
    
    // シミュレーション: 実際の実装では、APIを呼び出す
    setTimeout(() => {
      setIsSubmitting(false);
      alert('お問い合わせありがとうございます！');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Contact
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          お問い合わせやご質問がございましたら、お気軽にご連絡ください。
          お仕事のご依頼も承っております。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
            お問い合わせフォーム
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                お名前
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                メッセージ
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                '送信中...'
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  送信
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
            SNSリンク
          </h2>
          <div className="space-y-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                    <Icon className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {link.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                      {link.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

