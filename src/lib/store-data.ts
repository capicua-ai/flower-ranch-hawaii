// Storefront content source. Hardcoded for now; Step 6.5 (Chalk audit)
// migrates products / posts / benefits to DB tables so the owner can edit
// them from Souped without a redeploy. Keep this the single source of truth
// so the migration touches one module.

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  image: string;
  gallery: string[];
  description: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readingTime: string;
  body: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "fresh-longan",
    name: "Fresh Longan",
    tagline: "Grade A · Hand-harvested",
    price: "$24",
    priceNote: "per lb · ships in 1-lb clusters",
    image: "/assets/longan-fruit.png",
    gallery: ["/assets/longan-fruit.png", "/assets/story-img-1.png", "/assets/Image product stack.png"],
    description:
      "Our signature fruit — sweet, floral, and juicy. Hand-harvested at peak ripeness on the Hamakua Coast and shipped within a day of picking so it reaches you as fresh as fruit can travel.",
    specs: [
      { label: "Origin", value: "Hilo, Hawaiʻi · single-orchard" },
      { label: "Harvest", value: "Hand-picked, peak ripeness" },
      { label: "Packaging", value: "1-lb fresh-fruit box" },
      { label: "Shipping", value: "2-day FedEx air, cold-chain" },
      { label: "Shelf life", value: "Up to 14 days refrigerated" },
    ],
    inStock: true,
  },
  {
    slug: "fresh-lychee",
    name: "Fresh Lychee",
    tagline: "Seasonal · Sweet & floral",
    price: "$26",
    priceNote: "per lb · limited season",
    image: "/assets/story-img-2.png",
    gallery: ["/assets/story-img-2.png", "/assets/story-img-1.png"],
    description:
      "A fragrant tropical cousin to longan, with a perfumed sweetness and a delicate floral note. Available in limited quantities during peak Hawaiian season.",
    specs: [
      { label: "Origin", value: "Hilo, Hawaiʻi" },
      { label: "Harvest", value: "Hand-picked, seasonal" },
      { label: "Packaging", value: "1-lb fresh-fruit box" },
      { label: "Shipping", value: "2-day FedEx air, cold-chain" },
      { label: "Shelf life", value: "Up to 10 days refrigerated" },
    ],
    inStock: true,
  },
  {
    slug: "dried-longan",
    name: "Dried Longan",
    tagline: "Pantry · Naturally sweet",
    price: "$18",
    priceNote: "per bag · shelf-stable",
    image: "/assets/story-img-3.png",
    gallery: ["/assets/story-img-3.png", "/assets/longan-fruit.png"],
    description:
      "Slow-dried to concentrate the fruit's natural honeyed sweetness. Shelf-stable and ready to enjoy as a snack, in teas, or in soups and desserts.",
    specs: [
      { label: "Origin", value: "Hilo, Hawaiʻi" },
      { label: "Process", value: "Slow-dried, no added sugar" },
      { label: "Packaging", value: "8-oz resealable bag" },
      { label: "Shipping", value: "Standard ground" },
      { label: "Shelf life", value: "12 months sealed" },
    ],
    inStock: true,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-longan",
    title: "What Is Longan? Hawaiʻi's Best-Kept Secret",
    excerpt: "Meet the dragon-eye fruit — sweet, floral, and grown in volcanic soil.",
    image: "/assets/story-img-1.png",
    date: "June 2026",
    readingTime: "4 min read",
    body: [
      "Longan — sometimes called the \"dragon eye\" for the dark seed that shows through its translucent flesh — is a tropical fruit closely related to lychee. Where lychee is bold and perfumed, longan is gentler: honey-sweet, a little floral, and remarkably refreshing.",
      "On the Hamakua Coast of Hawaiʻi's Big Island, volcanic soil and ocean trade winds give our longan a depth of flavor you won't find in imported fruit. The trees take decades to mature, and we refuse to scale beyond what the land can carry.",
      "The result is a fruit that tastes like where it's grown — and arrives at your door within days of being picked.",
    ],
  },
  {
    slug: "longan-vs-lychee",
    title: "Longan vs. Lychee: What's the Difference?",
    excerpt: "Two tropical cousins, two very different flavors. Here's how to tell them apart.",
    image: "/assets/story-img-2.png",
    date: "June 2026",
    readingTime: "3 min read",
    body: [
      "They look similar and grow on related trees, but longan and lychee are distinct. Lychee has a bumpy red shell and a bold, perfumed sweetness. Longan has a smooth tan shell and a milder, honeyed flavor.",
      "Lychee tends to be larger and juicier; longan is smaller, with a firmer bite and a cleaner finish. Both are wonderful fresh — and both are at their best when they haven't traveled halfway around the world to reach you.",
    ],
  },
  {
    slug: "ways-to-eat-longan",
    title: "5 Delicious Ways to Enjoy Fresh Longan",
    excerpt: "From fresh off the cluster to desserts and teas — simple ideas to try.",
    image: "/assets/story-img-3.png",
    date: "June 2026",
    readingTime: "5 min read",
    body: [
      "1. Fresh off the cluster. The simplest and best — chill them and peel as you go.",
      "2. In a fruit salad. Their floral sweetness balances tart fruits like pineapple and citrus.",
      "3. Frozen. Peel, freeze, and enjoy like little sorbet pearls on a hot day.",
      "4. In tea. Dried longan steeped with ginger makes a soothing, naturally sweet tea.",
      "5. In desserts. Fold them into coconut puddings, shaved ice, or panna cotta.",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
