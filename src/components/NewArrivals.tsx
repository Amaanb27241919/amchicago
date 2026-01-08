import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const NewArrivals = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch Hope V1 products for the new arrivals section
        const data = await fetchProducts(6, "Hope V1");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-[#f5f5f5]">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section id="shop" className="py-16 sm:py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold">
            <span className="text-red-600">CHECK OUT</span>{" "}
            <span className="text-[#1a1a1a]">HOPE V1</span>
          </h2>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.node.id} product={product} index={index} variant="light" />
          ))}
        </div>
      </div>
    </section>
  );
};
