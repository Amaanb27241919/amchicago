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
  black: "#000000",
  white: "#FFFFFF",
  red: "#DC2626",
  blue: "#2563EB",
  navy: "#1E3A5F",
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
  heather: "#9CA3AF",
  "heather gray": "#9CA3AF",
  "heather grey": "#9CA3AF",
};

const getColorValue = (colorName: string): string => {
  const normalized = colorName.toLowerCase().trim();
  return colorMap[normalized] || "#9CA3AF";
};

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addItem, setOpen } = useCartStore();
  const { node } = product;

  // Extract color option and its values
  const colorOption = node.options.find(
    (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour"
  );
  const colors = colorOption?.values || [];

  // Build a map of color -> image URL by finding variants with that color
  const colorImageMap = useMemo(() => {
    const map: Record<string, string> = {};
    
    if (!colorOption) return map;

    // Group variants by color and find associated images
    node.variants.edges.forEach((variantEdge, variantIndex) => {
      const variant = variantEdge.node;
      const colorOpt = variant.selectedOptions.find(
        (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour"
      );
      
      if (colorOpt && !map[colorOpt.value]) {
        // Use the corresponding image index if available
        const imageIndex = colors.indexOf(colorOpt.value);
        const image = node.images.edges[imageIndex]?.node || node.images.edges[0]?.node;
        if (image) {
          map[colorOpt.value] = image.url;
        }
      }
    });

    return map;
  }, [node.variants.edges, node.images.edges, colorOption, colors]);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors.length > 0 ? colors[0] : null
  );

  const firstImage = node.images.edges[0]?.node;
  const displayImage = selectedColor && colorImageMap[selectedColor] 
    ? colorImageMap[selectedColor] 
    : firstImage?.url;

  const firstVariant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

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
              className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
            />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick actions */}
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
          
          {/* Color swatches */}
          {colors.length > 1 && (
            <div className="flex items-center gap-1.5 pt-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={(e) => handleColorClick(e, color)}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 transition-all duration-200 hover:scale-110",
                    selectedColor === color
                      ? "border-primary ring-1 ring-primary ring-offset-1 ring-offset-background"
                      : "border-border hover:border-muted-foreground"
                  )}
                  style={{ backgroundColor: getColorValue(color) }}
                  title={color}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
