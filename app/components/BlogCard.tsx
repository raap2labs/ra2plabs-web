import Link from "next/link";
import { ArrowRight } from "./Icons";
import type { BlogPostMeta } from "../lib/blog";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card overflow-hidden hover:-translate-y-1 transition-all duration-400"
    >
      <div className={`relative h-44 bg-gradient-to-br ${post.coverGradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex flex-wrap gap-2 px-5">
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

      <div className="p-6">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
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

        <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-primary-hover transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-primary-hover group-hover:text-primary transition-colors duration-200">
          Leer artículo
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      </div>
    </Link>
  );
}
