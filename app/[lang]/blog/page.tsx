import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, SECTION } from "../../lib/constants";
import { getAllPosts, getFeaturedPost } from "../../lib/blog";
import { getDictionary } from "../dictionaries";
import { hasLocale } from "../locales";
import SectionTitle from "../../components/SectionTitle";
import BlogCard from "../../components/BlogCard";
import BlogFeaturedCard from "../../components/BlogFeaturedCard";
import Reveal from "../../components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const blog = dict.blog as { tag: string; title: string; description: string };
  return {
    title: `${blog.tag} | ${SITE.name}`,
    description: blog.description,
    openGraph: {
      title: `${blog.tag} | ${SITE.name}`,
      description: blog.description,
      images: [{ url: `${SITE.url}/opengraph-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const blog = dict.blog as { tag: string; title: string; description: string };

  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const remaining = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent)] will-change-transform" />
        <div className="orb orb-indigo" style={{ width: 480, height: 480, top: "5%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="orb orb-purple" style={{ width: 320, height: 320, top: "35%", left: "10%" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className={SECTION.CONTAINER}>
          <SectionTitle
            tag={blog.tag}
            title={blog.title}
            description={blog.description}
          />
        </div>
      </section>

      <section className="pb-28 md:pb-36">
        <div className={SECTION.CONTAINER}>
          {featured && (
            <Reveal>
              <div className="mb-10">
                <BlogFeaturedCard post={featured} />
              </div>
            </Reveal>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((post, i) => (
              <Reveal key={post.slug}>
                <div style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "both" }}>
                  <BlogCard post={post} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
