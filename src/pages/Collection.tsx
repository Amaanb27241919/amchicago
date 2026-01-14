import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { getCollectionBySlug, CollectionData } from "@/lib/collectionData";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { usePageMeta } from "@/hooks/usePageMeta";
import { logError } from "@/lib/logger";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? getCollectionBySlug(slug) : undefined;
  
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  usePageMeta({
    title: collection ? `${collection.name} | A | M Chicago` : "Collection | A | M Chicago",
    description: collection?.story[0] || "Explore our curated collection of premium streetwear.",
    keywords: collection ? `${collection.name}, streetwear, Chicago fashion, ${collection.filterQuery}` : "streetwear, Chicago fashion",
    canonicalPath: slug ? `/collections/${slug}` : "/collections",
  });

  useEffect(() => {
    const loadProducts = async () => {
      if (!collection) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const allProducts = await fetchProducts(50);
        
        // Filter products based on collection query
        const filtered = allProducts.filter((product) => {
          const title = product.node.title.toLowerCase();
          const query = collection.filterQuery.toLowerCase();
          
          if (collection.filterQuery === "A | M") {
            return title.startsWith("a | m") || title.includes("a | m");
          }
          return title.includes(query);
        });
        
        setProducts(filtered);
      } catch (err) {
        logError("Error fetching collection products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [collection]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display font-semibold mb-4">Collection Not Found</h1>
          <p className="text-muted-foreground mb-8">The collection you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/shop">Browse All Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background gradient orbs */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-purple/20 blur-[120px]"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-magenta/20 blur-[100px]"
          />
          
          {/* Hero image */}
          <div className="absolute inset-0 z-0">
            <motion.img
              src={collection.heroImage}
              alt={collection.name}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`w-full h-full ${collection.heroImageClass}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          {/* Hero content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.div variants={childVariants}>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Shop
              </Link>
            </motion.div>
            
            <motion.span
              variants={childVariants}
              className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block"
            >
              Collection
            </motion.span>
            
            <motion.h1
              variants={childVariants}
              className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 gradient-brand-text"
            >
              {collection.name}
            </motion.h1>
            
            <motion.p
              variants={childVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              {collection.tagline}
            </motion.p>
          </motion.div>
        </section>
        
        {/* Story Section */}
        <section className="py-20 sm:py-28 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.span
                variants={childVariants}
                className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block"
              >
                The Story
              </motion.span>
              
              <motion.h2
                variants={childVariants}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-8"
              >
                Behind the Collection
              </motion.h2>
              
              <div className="space-y-6">
                {collection.story.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={childVariants}
                    className="text-muted-foreground text-lg leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
                Shop
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">
                The Collection
              </h2>
            </motion.div>
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found in this collection.</p>
                <Button asChild>
                  <Link to="/shop">Browse All Products</Link>
                </Button>
              </div>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={containerVariants}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                  {products.map((product, index) => (
                    <ProductCard key={product.node.id} product={product} index={index} />
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-12"
                >
                  <Button asChild variant="outline" size="lg">
                    <Link to={`/shop?collection=${encodeURIComponent(collection.filterQuery)}`} className="gap-2">
                      View All in Shop
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
