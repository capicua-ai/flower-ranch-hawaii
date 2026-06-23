import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/store-data";

/**
 * Boutique blog card matching the product-card language: cream image well,
 * mono meta line, Fraunces title, read affordance. Shared by the home blog
 * teaser and the /blog index.
 */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-fr-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-fr-forest/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fr-green"
    >
      <div className="aspect-[16/10] overflow-hidden bg-fr-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[10px] uppercase tracking-wider text-fr-muted">
          {post.date} · {post.readingTime}
        </span>
        <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-fr-ink transition-colors group-hover:text-fr-forest">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fr-muted">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fr-forest transition-colors group-hover:text-fr-green [&_svg]:transition-transform group-hover:[&_svg]:translate-x-0.5">
          Read more <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
