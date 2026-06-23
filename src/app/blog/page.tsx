import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { getPosts } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Blog — Flower Ranch Hawaii",
  description: "Stories, recipes, and guides about Hawaiian longan from our family orchard.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-fr-teal">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <span className="font-mono text-xs uppercase tracking-widest text-fr-lime">
              From the Blog
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Longan, the Hawaiian way
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              Stories, recipes, and guides from our family orchard on the Hamakua Coast.
            </p>
          </div>
        </section>

        <section className="bg-fr-wash">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-fr-border bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-fr-teal/10"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-fr-muted">
                      {post.date} · {post.readingTime}
                    </span>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-fr-ink group-hover:text-fr-teal">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-fr-muted">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fr-teal group-hover:text-fr-lime">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
