import amEssentialsImage from "@/assets/am-essentials-collection.png";
import foundersSeriesImage from "@/assets/founders-series-collection.png";
import hopeV1Image from "@/assets/hope-v1-collection.png";

export interface CollectionData {
  slug: string;
  name: string;
  tagline: string;
  story: string[];
  heroImage: string;
  heroImageClass: string;
  filterQuery: string;
  accentColor: "purple" | "magenta" | "gold";
}

export const collections: Record<string, CollectionData> = {
  "founders-series": {
    slug: "founders-series",
    name: "Founders Series",
    tagline: "Premium essentials for the visionaries",
    story: [
      "The Founders Series embodies the spirit of those who dare to dream and build. Born from the streets of Chicago, this collection represents the dedication and vision that built A | M from the ground up.",
      "Crafted for the pioneers who lay the groundwork for what's next, each piece combines premium materials with timeless design. This is more than clothing—it's a statement of purpose.",
      "Every thread tells a story of ambition, every stitch a testament to the hustle. The Founders Series is for those who understand that greatness is built, not given."
    ],
    heroImage: foundersSeriesImage,
    heroImageClass: "object-cover",
    filterQuery: "Founders",
    accentColor: "purple"
  },
  "hope-v1": {
    slug: "hope-v1",
    name: "Hope V1",
    tagline: "Bold statements, timeless style",
    story: [
      "Hope V1 is a declaration. Bold typography meets premium construction in a collection that speaks to resilience and optimism. Your future is what you make it.",
      "Inspired by Chicago's relentless spirit, Hope V1 carries a message of perseverance through every design element. The clean lines and striking graphics represent clarity of vision.",
      "This collection is for those who wear their aspirations on their sleeve—literally. Hope V1 isn't just about looking good; it's about feeling unstoppable."
    ],
    heroImage: hopeV1Image,
    heroImageClass: "object-contain scale-75",
    filterQuery: "Hope",
    accentColor: "magenta"
  },
  "am-essentials": {
    slug: "am-essentials",
    name: "A | M Essentials",
    tagline: "Everyday luxury streetwear",
    story: [
      "The foundation of your wardrobe. A | M Essentials delivers everyday luxury with clean lines, premium fabrics, and the understated confidence that defines Chicago style.",
      "We believe essentials should never be basic. Each piece in this collection is designed to elevate your daily rotation while maintaining the comfort and versatility you need.",
      "From dawn to dusk, A | M Essentials moves with you. This is streetwear refined—quality you can feel, style that speaks for itself."
    ],
    heroImage: amEssentialsImage,
    heroImageClass: "object-cover",
    filterQuery: "A | M",
    accentColor: "gold"
  }
};

export const getCollectionBySlug = (slug: string): CollectionData | undefined => {
  return collections[slug];
};

export const getAllCollectionSlugs = (): string[] => {
  return Object.keys(collections);
};
