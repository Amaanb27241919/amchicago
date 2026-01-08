import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

const collections = [
  {
    name: "Founders Series",
    query: "Founders",
    filterFn: (title: string) => title.includes("Founders"),
  },
  {
    name: "Hope V1",
    query: "Hope",
    filterFn: (title: string) => title.includes("Hope"),
  },
  {
    name: "A | M Essentials",
    query: "A | M",
    filterFn: (title: string) => title.startsWith("A | M") && !title.includes("Founders"),
  },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const selectedCollection = searchParams.get("collection");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Fetch all products and filter client-side for reliable matching
        const data = await fetchProducts(50);
        
        if (selectedCollection) {
          const collection = collections.find(c => c.query === selectedCollection);
          if (collection) {
            const filtered = data.filter(product => collection.filterFn(product.node.title));
            setProducts(filtered);
          } else {
            setProducts(data);
          }
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCollection]);

  const handleCollectionChange = (collection: string | null) => {
    if (collection) {
      setSearchParams({ collection });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main className="pt-24 sm:pt-32">
        {/* Products Section */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
                Shop
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold">
                {selectedCollection 
                  ? collections.find(c => c.query === selectedCollection)?.name || selectedCollection
                  : "All Products"}
              </h1>
            </motion.div>

            {/* Filters */}
            <ProductFilters
              collections={collections.map((c) => c.query)}
              selectedCollection={selectedCollection}
              onCollectionChange={handleCollectionChange}
            />

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {products.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
