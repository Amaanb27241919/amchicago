import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { logError } from "@/lib/logger";

interface RelatedProductsProps {
  currentHandle: string;
  currentTitle: string;
}

export const RelatedProducts = ({ currentHandle, currentTitle }: RelatedProductsProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const allProducts = await fetchProducts(12);
        // Filter out current product and take up to 4
        const related = allProducts
          .filter((p) => p.node.handle !== currentHandle)
          .slice(0, 4);
        setProducts(related);
      } catch (err) {
        logError("Failed to load related products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRelated();
  }, [currentHandle, currentTitle]);

  if (loading || products.length === 0) return null;

  return (
    <section className="mt-20 border-t border-border pt-16">
      <h2 className="font-display text-2xl font-semibold mb-8">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/product/${product.node.handle}`}
              className="group block"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-card mb-3">
                {product.node.images.edges[0]?.node && (
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.images.edges[0].node.altText || product.node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {product.node.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatPrice(product.node.priceRange.minVariantPrice.amount)}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
