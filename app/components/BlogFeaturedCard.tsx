import Link from "next/link";
import { ArrowRight } from "./Icons";
import type { BlogPostMeta } from "../lib/blog";

export default function BlogFeaturedCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card overflow-hidden hover:-translate-y-1 transition-all duration-400"
    >
      <div className={`relative h-56 md:h-64 bg-gradient-to-br ${post.coverGradient} flex items-start justify-between p-6 md:p-8 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative">
          <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-primary text-white rounded-full mb-4">
            Destacado
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-xl">
            {post.title}
          </h2>
          <p className="mt-3 text-sm text-white/80 max-w-lg leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="relative hidden sm:flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium bg-white/15 backdrop-blur-sm text-white rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{post.author.name}</span>
          <span className="w-1 h-1 rounded-full bg-muted" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="w-1 h-1 rounded-full bg-muted" />
          <span>{post.readingTime} min de lectura</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-hover group-hover:text-primary transition-colors duration-200">
          Leer
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      </div>
    </Link>
  );
}
