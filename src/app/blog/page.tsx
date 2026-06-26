import type { Metadata } from "next";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { SectionLabel } from "@/components/store/section-label";
import { PostCard } from "@/components/store/post-card";
import { CornerBotanical } from "@/components/store/corner-botanical";
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
        <section className="relative isolate -mt-[68px] overflow-hidden bg-fr-teal sm:-mt-[72px]">
          <CornerBotanical
            src="/assets/bg-asset-2.png"
            className="right-0 top-1/2 hidden md:block"
            style={{ width: "34%", maxWidth: "500px", transform: "translate(12%, -38%)" }}
          />
          <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
            <SectionLabel dark>From the Blog</SectionLabel>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Longan, the <em className="font-medium not-italic text-fr-lime">Hawaiian way</em>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              Stories, recipes, and guides from our family orchard on the Hamakua Coast.
            </p>
          </div>
        </section>

        <section className="bg-fr-wash">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="sr-only">All articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
