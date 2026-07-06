import { gql } from "@shopify/hydrogen";
import { formatPrice } from "@/lib/format-price";
import type { Product, ProductSpec } from "@/lib/store-data";
import { staticStorefrontClient } from "@/lib/storefront-static";
import { getStorefrontClient } from "@/lib/storefront";

const PRODUCT_CARD_FIELDS = gql(`
  fragment ProductCardFields on Product {
    id
    title
    handle
    description
    featuredImage {
      url
      altText
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        id
      }
    }
    tagline: metafield(namespace: "custom", key: "tagline") {
      value
    }
    priceNote: metafield(namespace: "custom", key: "price_note") {
      value
    }
  }
`);

const PRODUCTS_QUERY = gql(
  `
    query Products {
      products(first: 50, sortKey: BEST_SELLING) {
        nodes {
          ...ProductCardFields
        }
      }
    }
  `,
  [PRODUCT_CARD_FIELDS],
);

const PRODUCT_SPEC_FIELDS = gql(`
  fragment ProductSpecFields on Metaobject {
    label: field(key: "label") {
      value
    }
    value: field(key: "value") {
      value
    }
  }
`);

export const PRODUCT_DETAIL_QUERY = gql(
  `
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          nodes {
            url
            altText
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      variants(first: 1) {
        nodes {
          id
          availableForSale
        }
      }
      selectedOrFirstAvailableVariant(
        selectedOptions: []
        ignoreUnknownOptions: true
        caseInsensitiveMatch: true
      ) {
        id
        availableForSale
      }
      tagline: metafield(namespace: "custom", key: "tagline") {
          value
        }
        priceNote: metafield(namespace: "custom", key: "price_note") {
          value
        }
        specs: metafield(namespace: "custom", key: "specs") {
          references(first: 20) {
            nodes {
              ...ProductSpecFields
            }
          }
        }
      }
    }
  `,
  [PRODUCT_SPEC_FIELDS],
);

const FALLBACK_IMAGE = "/assets/longan-fruit.png";

function parseSpecsFromMetaobjects(specsMetafield: unknown): ProductSpec[] {
  if (!specsMetafield || typeof specsMetafield !== "object") return [];

  const references =
    "references" in specsMetafield &&
    specsMetafield.references &&
    typeof specsMetafield.references === "object" &&
    "nodes" in specsMetafield.references &&
    Array.isArray(specsMetafield.references.nodes)
      ? specsMetafield.references.nodes
      : [];

  return references
    .map((node) => {
      if (!node || typeof node !== "object") return null;
      const label =
        "label" in node &&
        node.label &&
        typeof node.label === "object" &&
        "value" in node.label &&
        typeof node.label.value === "string"
          ? node.label.value.trim()
          : "";
      const value =
        "value" in node &&
        node.value &&
        typeof node.value === "object" &&
        "value" in node.value &&
        typeof node.value.value === "string"
          ? node.value.value.trim()
          : "";
      if (!label || !value) return null;
      return { label, value };
    })
    .filter((spec): spec is ProductSpec => spec !== null);
}

function toProductCard(
  node: {
    title: string;
    handle: string;
    description: string;
    featuredImage?: { url: string; altText?: string | null } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    variants?: { nodes?: { id: string }[] } | null;
    tagline?: { value: string } | null;
    priceNote?: { value: string } | null;
  },
): Product {
  return {
    slug: node.handle,
    name: node.title,
    tagline: node.tagline?.value ?? "",
    price: formatPrice(node.priceRange.minVariantPrice),
    priceNote: node.priceNote?.value ?? "",
    image: node.featuredImage?.url ?? FALLBACK_IMAGE,
    gallery: [],
    description: node.description,
    specs: [],
    inStock: true,
    merchandiseId: node.variants?.nodes?.[0]?.id,
  };
}

type ShopifyProductDetail = {
  handle: string;
  title: string;
  description: string;
  featuredImage?: { url: string; altText?: string | null } | null;
  images?: { nodes?: { url: string; altText?: string | null }[] } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants?: { nodes?: { availableForSale: boolean }[] } | null;
  selectedOrFirstAvailableVariant?: { id: string; availableForSale: boolean } | null;
  tagline?: { value: string } | null;
  priceNote?: { value: string } | null;
  specs?: unknown;
};

function toProductDetail(node: ShopifyProductDetail): Product {
  const gallery =
    node.images?.nodes?.map((img) => img.url).filter(Boolean) ??
    (node.featuredImage?.url ? [node.featuredImage.url] : [FALLBACK_IMAGE]);

  const inStock =
    node.selectedOrFirstAvailableVariant?.availableForSale ??
    node.variants?.nodes?.some((variant) => variant.availableForSale) ??
    false;

  return {
    slug: node.handle,
    name: node.title,
    tagline: node.tagline?.value ?? "",
    price: formatPrice(node.priceRange.minVariantPrice),
    priceNote: node.priceNote?.value ?? "",
    image: gallery[0] ?? FALLBACK_IMAGE,
    gallery: gallery.length > 0 ? gallery : [FALLBACK_IMAGE],
    description: node.description,
    specs: parseSpecsFromMetaobjects(node.specs),
    inStock,
    merchandiseId: node.selectedOrFirstAvailableVariant?.id,
  };
}

export async function getShopifyProducts(): Promise<Product[]> {
  const { data, errors } = await staticStorefrontClient.graphql(PRODUCTS_QUERY);
  if (errors) {
    console.error("[hydrogen] Products query failed", errors);
    return [];
  }

  return data?.products?.nodes?.map(toProductCard) ?? [];
}

export async function getShopifyProductByHandle(handle: string): Promise<{
  product: Product | null;
  errors: unknown;
}> {
  const storefront = await getStorefrontClient();
  const { data, errors } = await storefront.graphql(PRODUCT_DETAIL_QUERY, {
    variables: { handle },
  });

  const raw = data?.product ?? null;
  return {
    product: raw ? toProductDetail(raw) : null,
    errors,
  };
}
