import { getGithubRepos } from '@/lib/github';
import { getNotePosts } from '@/lib/note';
import { PortfolioSection } from '@/components/PortfolioSection';
import { BlogSection } from '@/components/BlogSection';
import { Hero, Marquee, About, Services, Community, Contact, Footer } from '@/components/HomeClient';

export default async function Home() {
  const [repos, notePosts] = await Promise.all([
    getGithubRepos('ShingoMatsushita'),
    getNotePosts('dapper_ivy8264'),
  ]);

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <PortfolioSection repos={repos} />
      <Services />
      <BlogSection posts={notePosts} />
      <Community />
      <Contact />
      <Footer />
    </>
  );
}
