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
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_-24px_rgba(0,70,85,0.4)] ring-1 ring-fr-border/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-22px_rgba(0,70,85,0.5),0_0_36px_-6px_rgba(142,216,95,0.5)] hover:ring-fr-lime/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fr-lime"
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
        <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-fr-ink transition-colors group-hover:text-fr-teal">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fr-muted">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fr-teal transition-colors group-hover:text-fr-lime [&_svg]:transition-transform group-hover:[&_svg]:translate-x-0.5">
          Read more <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
