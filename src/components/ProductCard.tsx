import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
}

// Map color names to CSS colors
const colorMap: Record<string, string> = {
  // Basic colors
  black: "#000000",
  white: "#FFFFFF",
  red: "#DC2626",
  blue: "#2563EB",
  navy: "#1E3A5F",
  "navy blue": "#1E3A5F",
  green: "#16A34A",
  gray: "#6B7280",
  grey: "#6B7280",
  brown: "#92400E",
  beige: "#D4C4A8",
  cream: "#FFFDD0",
  tan: "#D2B48C",
  olive: "#808000",
  burgundy: "#800020",
  maroon: "#800000",
  pink: "#EC4899",
  purple: "#9333EA",
  orange: "#EA580C",
  yellow: "#EAB308",
  gold: "#D4AF37",
  silver: "#C0C0C0",
  charcoal: "#36454F",
  // Heather variants
  heather: "#9CA3AF",
  "heather gray": "#9CA3AF",
  "heather grey": "#9CA3AF",
  "athletic heather": "#B8C0CC",
  "dark heather": "#4B5563",
  "dark grey heather": "#4B5563",
  // Extended colors - Obsidian & Smog variants
  obsidian: "#0B1215",
  smog: "#7A7D7E",
  // Extended colors
  sand: "#C2B280",
  khaki: "#C3B091",
  natural: "#F5F5DC",
  ivory: "#FFFFF0",
  oatmeal: "#D8C4A8",
  bone: "#E3DAC9",
  stone: "#928E85",
  slate: "#708090",
  "slate gray": "#708090",
  midnight: "#191970",
  "midnight blue": "#191970",
  forest: "#228B22",
  "forest green": "#228B22",
  sage: "#BCB88A",
  mint: "#98FB98",
  teal: "#008080",
  aqua: "#00FFFF",
  cyan: "#00FFFF",
  turquoise: "#40E0D0",
  coral: "#FF7F50",
  salmon: "#FA8072",
  peach: "#FFCBA4",
  rose: "#FF007F",
  "dusty rose": "#DCAE96",
  blush: "#DE5D83",
  mauve: "#E0B0FF",
  lavender: "#E6E6FA",
  lilac: "#C8A2C8",
  violet: "#8B00FF",
  plum: "#8E4585",
  indigo: "#4B0082",
  royal: "#4169E1",
  "royal blue": "#4169E1",
  sky: "#87CEEB",
  "sky blue": "#87CEEB",
  "light blue": "#ADD8E6",
  "baby blue": "#89CFF0",
  denim: "#1560BD",
  cobalt: "#0047AB",
  wine: "#722F37",
  rust: "#B7410E",
  copper: "#B87333",
  camel: "#C19A6B",
  chocolate: "#7B3F00",
  coffee: "#6F4E37",
  espresso: "#3C2415",
  mocha: "#967969",
  taupe: "#483C32",
  mushroom: "#A9A9A9",
  ash: "#B2BEB5",
  graphite: "#383838",
  onyx: "#353839",
  jet: "#343434",
  carbon: "#1C1C1C",
  "off white": "#FAF9F6",
  "off-white": "#FAF9F6",
  pearl: "#FDEEF4",
  snow: "#FFFAFA",
  chalk: "#EFEBE9",
  lemon: "#FFF44F",
  lime: "#32CD32",
  apple: "#8DB600",
  emerald: "#50C878",
  jade: "#00A86B",
  hunter: "#355E3B",
  "hunter green": "#355E3B",
  army: "#4B5320",
  "army green": "#4B5320",
  camo: "#78866B",
  camouflage: "#78866B",
  military: "#5E6952",
  seafoam: "#71EEB8",
  "sea foam": "#71EEB8",
  ocean: "#006994",
  marine: "#042E60",
  pacific: "#1CA9C9",
  atlantic: "#004C91",
};

const getColorValue = (colorName: string): string => {
  const normalized = colorName.toLowerCase().trim();
  
  // Direct match
  if (colorMap[normalized]) {
    return colorMap[normalized];
  }
  
  // Check if any key is contained in the color name
  for (const [key, value] of Object.entries(colorMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  // Default fallback
  return "#9CA3AF";
};

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addItem, setOpen } = useCartStore();
  const { node } = product;

  // Extract color option and its values
  const colorOption = node.options.find(
    (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour"
  );
  const colors = colorOption?.values || [];

  // Build a map of color -> image URL using variant image data
  const colorImageMap = useMemo(() => {
    const map: Record<string, string> = {};
    
    if (!colorOption || colors.length === 0) return map;

    colors.forEach((color) => {
      // Find a variant with this color that has an image
      const variantWithImage = node.variants.edges.find((v) => {
        const hasColor = v.node.selectedOptions.some(
          (o) => (o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") && o.value === color
        );
        return hasColor && v.node.image?.url;
      });

      if (variantWithImage?.node.image?.url) {
        map[color] = variantWithImage.node.image.url;
      } else if (node.images.edges.length > 0) {
        // Fallback to first image if no variant image
        map[color] = node.images.edges[0].node.url;
      }
    });

    return map;
  }, [node.images.edges, node.variants.edges, colorOption, colors]);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors.length > 0 ? colors[0] : null
  );

  const firstImage = node.images.edges[0]?.node;
  const displayImage = selectedColor && colorImageMap[selectedColor] 
    ? colorImageMap[selectedColor] 
    : firstImage?.url;

  const firstVariant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  // Check if all variants are sold out
  const isSoldOut = node.variants.edges.every(
    (variant) => !variant.node.availableForSale
  );

  // Find variant matching selected color
  const selectedVariant = useMemo(() => {
    if (!selectedColor) return firstVariant;
    
    const matchingVariant = node.variants.edges.find((v) =>
      v.node.selectedOptions.some(
        (opt) =>
          (opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour") &&
          opt.value === selectedColor
      )
    );
    
    return matchingVariant?.node || firstVariant;
  }, [selectedColor, node.variants.edges, firstVariant]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedVariant) return;

    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });

    toast.success("Added to bag", {
      description: node.title,
      position: "top-center",
    });
    
    setOpen(true);
  };

  const handleColorClick = (e: React.MouseEvent, color: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/product/${node.handle}`} className="group block">
        <motion.div
          className="relative overflow-hidden rounded-lg bg-card aspect-[3/4] mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Product image */}
          {displayImage && (
            <img
              src={displayImage}
              alt={node.title}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-300",
                isSoldOut && "opacity-70"
              )}
            />
          )}

          {/* Sold Out Badge */}
          {isSoldOut && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
                Sold Out
              </span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick actions */}
          {!isSoldOut && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Button
                size="sm"
                className="flex-1 gradient-brand text-primary-foreground font-medium"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Bag
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-card/90 hover:bg-card"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Hover shine effect */}
          <div className="absolute inset-0 hover-shine pointer-events-none" />
        </motion.div>

        {/* Product info */}
        <div className="space-y-2">
          <motion.h3
            className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1"
          >
            {node.title}
          </motion.h3>
          <p className="text-sm font-semibold gradient-brand-text">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
          
          {/* Color swatches - show product thumbnails like Shopify */}
          {colors.length > 1 && (
            <div className="flex items-center gap-1.5 pt-1">
              {colors.slice(0, 5).map((color) => {
                const swatchImage = colorImageMap[color];
                return (
                  <button
                    key={color}
                    onClick={(e) => handleColorClick(e, color)}
                    className={cn(
                      "w-6 h-6 rounded-full border transition-all duration-200 hover:scale-110 overflow-hidden bg-muted",
                      selectedColor === color
                        ? "border-foreground ring-1 ring-foreground/50"
                        : "border-border hover:border-muted-foreground"
                    )}
                    title={color}
                    aria-label={`Select ${color} color`}
                  >
                    {swatchImage ? (
                      <img
                        src={swatchImage}
                        alt={color}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span 
                        className="w-full h-full block"
                        style={{ backgroundColor: getColorValue(color) }}
                      />
                    )}
                  </button>
                );
              })}
              {colors.length > 5 && (
                <span className="text-xs text-muted-foreground">
                  +{colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
