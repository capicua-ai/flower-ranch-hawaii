/**
 * Database seed — realistic development/production content for the storefront.
 *
 * Idempotent: every row is upserted by primary key, so running it repeatedly
 * converges to the same state without duplicating data. Safe to run against a
 * freshly-migrated database or to refresh content on an existing one.
 *
 * Run with:
 *   DATABASE_URL="postgres://..." pnpm db:seed
 *
 * The content mirrors the Chalk-editable tables (site_settings, products,
 * blog_posts, benefits, delivery_steps). After launch the owner edits these
 * from Souped → Chalk; this seed is the initial, known-good baseline.
 */
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Pass it inline when seeding.");
}

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const siteSettings = {
  id: "singleton",
  heroBadge: "Grown in Hilo, Hawaiʻi",
  heroTitle: "Fresh Hawaii Longan",
  heroSubtitle:
    "Hand-harvested on our family orchard and shipped to your door within days of picking. Taste the richness of volcanic-grown Hawaiian fruit.",
  contactEmail: "aloha@flowerranchhawaii.com",
};

const products = [
  {
    id: "prod-longan",
    slug: "fresh-longan",
    name: "Fresh Longan",
    tagline: "Grade A · Hand-harvested",
    price: "$24",
    priceNote: "per lb · ships in 1-lb clusters",
    image: "/assets/product-fresh-longan.jpg",
    description:
      "Our signature fruit — sweet, floral, and juicy. Hand-harvested at peak ripeness on the Hamakua Coast and shipped within a day of picking so it reaches you as fresh as fruit can travel.",
    inStock: true,
    order: 1,
    specs: [
      { label: "Origin", value: "Hilo, Hawaiʻi · single-orchard" },
      { label: "Harvest", value: "Hand-picked, peak ripeness" },
      { label: "Packaging", value: "1-lb fresh-fruit box" },
      { label: "Shipping", value: "2-day FedEx air, cold-chain" },
      { label: "Shelf life", value: "Up to 14 days refrigerated" },
    ],
    gallery: ["/assets/product-fresh-longan.jpg"],
  },
  {
    id: "prod-lychee",
    slug: "fresh-lychee",
    name: "Fresh Lychee",
    tagline: "Seasonal · Sweet & floral",
    price: "$26",
    priceNote: "per lb · limited season",
    image: "/assets/product-fresh-lychee.jpg",
    description:
      "A fragrant tropical cousin to longan, with a perfumed sweetness and a delicate floral note. Available in limited quantities during peak Hawaiian season.",
    inStock: true,
    order: 2,
    specs: [
      { label: "Origin", value: "Hilo, Hawaiʻi" },
      { label: "Harvest", value: "Hand-picked, seasonal" },
      { label: "Packaging", value: "1-lb fresh-fruit box" },
      { label: "Shipping", value: "2-day FedEx air, cold-chain" },
      { label: "Shelf life", value: "Up to 10 days refrigerated" },
    ],
    gallery: ["/assets/product-fresh-lychee.jpg"],
  },
  {
    id: "prod-dried",
    slug: "dried-longan",
    name: "Dried Longan",
    tagline: "Pantry · Naturally sweet",
    price: "$18",
    priceNote: "per bag · shelf-stable",
    image: "/assets/product-dried-longan.jpg",
    description:
      "Slow-dried to concentrate the fruit's natural honeyed sweetness. Shelf-stable and ready to enjoy as a snack, in teas, or in soups and desserts.",
    inStock: true,
    order: 3,
    specs: [
      { label: "Origin", value: "Hilo, Hawaiʻi" },
      { label: "Process", value: "Slow-dried, no added sugar" },
      { label: "Packaging", value: "8-oz resealable bag" },
      { label: "Shipping", value: "Standard ground" },
      { label: "Shelf life", value: "12 months sealed" },
    ],
    gallery: ["/assets/product-dried-longan.jpg"],
  },
];

const blogPosts = [
  {
    id: "post-what",
    slug: "inside-our-orchard",
    title: "Inside Our Hāmākua Orchard: A Day at Harvest",
    excerpt:
      "Sunrise on the Hāmākua Coast, baskets filling with fruit, and the hands that pick every cluster. Here is what a harvest day really looks like.",
    image: "/assets/blog-what-is-longan.jpg",
    date: "June 2026",
    readingTime: "5 min read",
    order: 1,
    body: `Harvest begins before sunrise. The air on the Hāmākua Coast is still cool and damp, and the longan trees are heavy with clusters that have spent the whole season soaking up sun and volcanic-rich soil.

We pick entirely by hand. Each cluster is cut, not pulled, so the fruit stays intact and the branch is ready to bear again next year. A trained picker can tell ripeness by color and give — a skill that takes seasons to learn and can't be rushed by a machine.

By mid-morning the baskets move to our packing shed, where fruit is sorted, cooled, and boxed the same day it leaves the tree. Speed is everything: the shorter the gap between branch and box, the sweeter what lands at your door.

What makes this orchard different isn't a secret formula — it's place and patience. Volcanic soil, Hilo rain, and a family that has learned to read these trees over many harvests.

That's the difference you taste. Not just fresh longan, but longan picked at its peak and handled like it matters — because to us, it does.`,
  },
  {
    id: "post-vs",
    slug: "how-to-store-longan",
    title: "How to Pick Ripe Longan & Keep It Fresh",
    excerpt:
      "How to spot peak-ripe longan and store it so it stays sweet and juicy for up to two weeks — plus a freezer trick for the off-season.",
    image: "/assets/blog-longan-vs-lychee.jpg",
    date: "June 2026",
    readingTime: "4 min read",
    order: 2,
    body: `Ripe longan has a smooth, tan-to-light-brown shell with a slight give when you press it — firm, never hard or shriveled. The fruit inside should be translucent and glossy, with that signature single dark seed that earns it the nickname "dragon eye."

Give the shell a sniff: peak longan smells faintly floral and sweet. If there's no aroma, it was likely picked too early.

To store, keep clusters unwashed in a breathable bag in the fridge — washing before storage traps moisture and speeds spoilage. Kept cold, fresh longan stays juicy for up to two weeks. Only rinse what you're about to eat.

Want them to last longer? Freeze them. Peel the fruit, spread it on a tray until solid, then transfer to a sealed bag. Frozen longan keeps for months and is incredible blended into smoothies or dropped into iced tea like sweet little ice cubes.

A quick rule of thumb: cool and dry to keep, room temperature to eat. Letting cold longan warm up for a few minutes before serving brings the sweetness and aroma right back.`,
  },
  {
    id: "post-ways",
    slug: "longan-coconut-chia-pudding",
    title: "Longan & Coconut Chia Pudding",
    excerpt:
      "A five-minute tropical breakfast: creamy coconut chia layered with fresh, honey-sweet longan. Make it tonight, eat it tomorrow.",
    image: "/assets/blog-ways-to-eat-longan.jpg",
    date: "June 2026",
    readingTime: "3 min read",
    order: 3,
    body: `This is the recipe we make on repeat during longan season. It comes together in five minutes the night before, and the longan does the heavy lifting — its honey-floral sweetness means you barely need any added sugar.

Ingredients (serves 2): 1 cup coconut milk, 3 tablespoons chia seeds, 1 teaspoon honey or maple syrup, a pinch of salt, and about 12 fresh longan, peeled and pitted.

Method: Whisk the coconut milk, chia, honey, and salt in a jar until there are no clumps. Wait five minutes, then whisk again — this second mix is the trick to a smooth, even pudding. Cover and refrigerate overnight.

In the morning, the chia will have set into a soft, creamy pudding. Roughly chop most of the longan and fold it through, saving a few whole for the top.

Layer it into glasses with the reserved longan and, if you like, a little toasted coconut. Light, hydrating, and just sweet enough — exactly how summer in Hawaiʻi should taste.`,
  },
];

const benefits = [
  { id: "benefit-1", title: "Immune Support", body: "Vitamin C–rich fruit that helps support a healthy immune system.", icon: "Shield", order: 1 },
  { id: "benefit-2", title: "Skin Health", body: "Antioxidants and hydration that support bright, healthy skin.", icon: "Sparkles", order: 2 },
  { id: "benefit-3", title: "Antioxidant Properties", body: "Naturally packed with polyphenols that fight oxidative stress.", icon: "Leaf", order: 3 },
  { id: "benefit-4", title: "Better Sleep", body: "Traditionally used to promote calm and restful sleep.", icon: "Moon", order: 4 },
  { id: "benefit-5", title: "Heart Health", body: "Potassium and fiber that support healthy circulation.", icon: "Heart", order: 5 },
];

const deliverySteps = [
  { id: "step-1", title: "Grown in Hilo", body: "On the Hamakua Coast, Hawaiʻi.", icon: "MapPin", order: 1 },
  { id: "step-2", title: "Hand Harvested", body: "Picked at peak ripeness for best quality.", icon: "Scissors", order: 2 },
  { id: "step-3", title: "Packaged in 1 Day", body: "Boxed within 24 hours of harvest.", icon: "Package", order: 3 },
  { id: "step-4", title: "Shipped 2-Day", body: "FedEx air, cold-chain handled.", icon: "Plane", order: 4 },
  { id: "step-5", title: "Delivered Fresh", body: "Straight to your home.", icon: "Home", order: 5 },
];

async function main() {
  await db.siteSettings.upsert({
    where: { id: siteSettings.id },
    create: siteSettings,
    update: siteSettings,
  });

  for (const p of products) {
    await db.product.upsert({ where: { id: p.id }, create: p, update: p });
  }

  for (const post of blogPosts) {
    await db.blogPost.upsert({ where: { id: post.id }, create: post, update: post });
  }

  for (const b of benefits) {
    await db.benefit.upsert({ where: { id: b.id }, create: b, update: b });
  }

  for (const s of deliverySteps) {
    await db.deliveryStep.upsert({ where: { id: s.id }, create: s, update: s });
  }

  const counts = {
    siteSettings: await db.siteSettings.count(),
    products: await db.product.count(),
    blogPosts: await db.blogPost.count(),
    benefits: await db.benefit.count(),
    deliverySteps: await db.deliveryStep.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
