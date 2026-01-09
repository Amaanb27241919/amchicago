import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatPrice } from "@/lib/shopify";

interface RecentlyViewedProps {
  currentHandle?: string;
}

export const RecentlyViewed = ({ currentHandle }: RecentlyViewedProps) => {
  const { recentlyViewed } = useRecentlyViewed();

  // Filter out current product and limit to 4
  const products = recentlyViewed
    .filter((p) => p.handle !== currentHandle)
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-display text-xl font-semibold mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.handle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={`/product/${product.handle}`}
              className="group block"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-card mb-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-medium text-sm mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
                {product.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatPrice(product.price)}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
