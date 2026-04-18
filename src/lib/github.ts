export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
    {
      next: { revalidate: 3600 }, // 1時間キャッシュ
      headers: { Accept: 'application/vnd.github.v3+json' },
    }
  );
  if (!res.ok) return [];
  const data: GithubRepo[] = await res.json();
  // forkを除外、descriptionありを優先
  return data
    .filter(r => !r.fork)
    .sort((a, b) => {
      // descriptionがある方を上位に
      if (a.description && !b.description) return -1;
      if (!a.description && b.description) return 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    })
    .slice(0, 6);
}
