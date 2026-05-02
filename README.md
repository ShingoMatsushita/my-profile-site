# My Profile Site

Personal Profile & Playground Site - 自己紹介、ポートフォリオ、技術ブログをまとめたWebサイト

## 技術スタック

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **MDX** (Markdown + JSX)
- **Framer Motion** (アニメーション)
- **Lucide React** (アイコン)

## 機能

- ✅ レスポンシブデザイン
- ✅ ダークモード切り替え
- ✅ MDXブログ機能
- ✅ アニメーション
- ✅ パフォーマンス最適化

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

## プロジェクト構造

```
.
├── src/
│   ├── app/              # Next.js App Router ページ
│   │   ├── about/        # About ページ
│   │   ├── blog/         # Blog ページ
│   │   ├── contact/      # Contact ページ
│   │   ├── portfolio/    # Portfolio ページ
│   │   └── layout.tsx    # ルートレイアウト
│   ├── components/        # React コンポーネント
│   ├── content/          # MDX コンテンツ
│   │   └── blog/         # ブログ記事
│   └── lib/              # ユーティリティ関数
├── public/               # 静的ファイル
└── package.json
```

## ブログ記事の追加

`src/content/blog/` ディレクトリに `.mdx` または `.md` ファイルを追加してください。

フロントマターの例:

```markdown
---
title: '記事のタイトル'
date: '2024-01-01'
excerpt: '記事の概要'
---

記事の本文...
```

## カスタマイズ

- **テーマ**: `src/components/ThemeProvider.tsx` を編集
- **ナビゲーション**: `src/components/Navigation.tsx` を編集
- **スタイル**: `src/app/globals.css` と `tailwind.config.ts` を編集

## デプロイ

Vercelへのデプロイが推奨されています。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/my-profile-site)

## ライセンス

MIT
