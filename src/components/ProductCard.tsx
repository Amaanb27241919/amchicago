import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addItem, setOpen } = useCartStore();
  const { node } = product;

  const firstImage = node.images.edges[0]?.node;
  const secondImage = node.images.edges[1]?.node;
  const firstVariant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success("Added to bag", {
      description: node.title,
      position: "top-center",
    });
    
    setOpen(true);
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
          {/* Primary image */}
          {firstImage && (
            <img
              src={firstImage.url}
              alt={firstImage.altText || node.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
          )}
          
          {/* Secondary image on hover */}
          {secondImage && (
            <img
              src={secondImage.url}
              alt={secondImage.altText || node.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
        <div className="space-y-1">
          <motion.h3
            className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1"
          >
            {node.title}
          </motion.h3>
          <p className="text-sm font-semibold gradient-brand-text">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
