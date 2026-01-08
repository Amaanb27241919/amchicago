import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

export const Hero = () => {
  const [featuredProduct, setFeaturedProduct] = useState<ShopifyProduct | null>(null);

  useEffect(() => {
    const loadFeaturedProduct = async () => {
      try {
        // Fetch Hope V1 Hoodie as the featured product
        const products = await fetchProducts(20, "Hope V1 Hoodie");
        if (products.length > 0) {
          setFeaturedProduct(products[0]);
        }
      } catch (err) {
        console.error("Failed to load featured product", err);
      }
    };
    loadFeaturedProduct();
  }, []);

  const featuredImage = featuredProduct?.node.images.edges[0]?.node.url;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f5f5]">
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-20">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            {/* Main brand text */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.9] mb-6">
              <span className="text-[#1a1a1a]">Aspire</span>
              <span className="text-[#1a1a1a]"> | </span>
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">Manifest</span>
            </h1>
            
            {/* CHICAGO text with multi-color styling */}
            <div className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide mb-8">
              <span className="text-red-600">C</span>
              <span className="text-[#1a1a1a]">H</span>
              <span className="text-green-600">I</span>
              <span className="text-red-600">C</span>
              <span className="text-[#1a1a1a]">A</span>
              <span className="text-green-600">G</span>
              <span className="text-[#1a1a1a]">O</span>
            </div>

            {/* Introducing text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <p className="text-red-600 text-lg sm:text-xl font-medium uppercase tracking-wider mb-2">
                Introducing
              </p>
              <h2 className="text-[#1a1a1a] text-3xl sm:text-4xl md:text-5xl font-display font-semibold">
                Our Newest Arrivals
              </h2>
            </motion.div>
          </motion.div>

          {/* Right side - Featured product image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {featuredImage ? (
              <div className="relative">
                <img
                  src={featuredImage}
                  alt="Featured Product"
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                />
              </div>
            ) : (
              <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-square bg-muted/20 rounded-lg animate-pulse" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
