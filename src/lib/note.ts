export interface NotePost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string | null;
  description: string;
}

export async function getNotePosts(username: string): Promise<NotePost[]> {
  const res = await fetch(`https://note.com/${username}/rss`, {
    next: { revalidate: 3600 }, // 1時間キャッシュ
  });
  if (!res.ok) return [];

  const xml = await res.text();

  // itemタグをすべて抽出
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  return items.slice(0, 6).map(item => {
    const title     = item.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? '';
    const link      = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ?? '';
    const pubDate   = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() ?? '';
    // <media:thumbnail>URL</media:thumbnail> 形式
    const thumbnail = item.match(/<media:thumbnail[^>]*>([^<]+)<\/media:thumbnail>/)?.[1]?.trim()
      // フォールバック: url="..." 属性形式
      ?? item.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1]
      ?? null;

    // descriptionからプレーンテキストを抽出（CDATAのHTMLを除去）
    const rawDesc = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ?? '';
    const plainDesc = rawDesc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 100);

    // 日付フォーマット
    const date = new Date(pubDate);
    const formattedDate = isNaN(date.getTime())
      ? pubDate
      : date.toISOString().split('T')[0];

    return { title, link, pubDate: formattedDate, thumbnail, description: plainDesc };
  });
}
