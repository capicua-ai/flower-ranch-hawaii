import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { BLOG_POSTS, getPost } from "@/lib/store-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found — Flower Ranch Hawaii" };
  return { title: `${post.title} — Flower Ranch Hawaii`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fr-muted transition-colors hover:text-fr-teal"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <span className="mt-8 block font-mono text-xs uppercase tracking-widest text-fr-teal/70">
            {post.date} · {post.readingTime}
          </span>
          <h1 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-fr-ink sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-fr-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </div>

          <div className="mt-10 flex flex-col gap-5 text-lg leading-relaxed text-fr-ink/85">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-fr-wash p-8 text-center">
            <h2 className="text-2xl font-bold text-fr-ink">Taste it for yourself</h2>
            <p className="mx-auto mt-2 max-w-md text-fr-muted">
              Fresh Hawaiian longan, shipped within a day of harvest.
            </p>
            <Link
              href="/products"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              Shop fresh longan
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
