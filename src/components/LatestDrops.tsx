import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const LatestDrops = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch only 4 products for the homepage
        const data = await fetchProducts(4);
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <section id="shop" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
            New Arrivals
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold">
            Latest Drops
          </h2>
        </motion.div>

        {/* Product grid - 4 products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
