import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, SECTION } from "../../lib/constants";
import { getPostBySlug, getAllPosts } from "../../lib/blog";
import CTA from "../../components/CTA";
import { ArrowLeft } from "../../components/Icons";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | ${SITE.name}`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: `${SITE.url}/opengraph-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));

  return (
    <>
      <article>
        <div className={`relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br ${post.coverGradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="orb orb-white" style={{ width: 400, height: 400, top: "10%", right: "-5%" }} />

          <div className={SECTION.CONTAINER}>
            <Link
              href="/blog"
              className="relative inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors duration-200 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>

            <div className="relative max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/70">
                <span>{post.author.name}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{readingTime} min de lectura</span>
              </div>
            </div>
          </div>
        </div>

        <div className={SECTION.PADDING}>
          <div className={SECTION.CONTAINER}>
            <div
              className="prose-custom max-w-3xl mx-auto text-muted-foreground leading-[1.8] space-y-5 [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:mt-10 [&_h3]:mb-3 [&_p]:text-base [&_p]:leading-[1.8]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Todos los artículos
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CTA />
    </>
  );
}
