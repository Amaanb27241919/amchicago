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
import amEssentialsImage from "@/assets/am-essentials-collection.png";
import foundersSeriesImage from "@/assets/founders-series-collection.png";
import hopeV1Image from "@/assets/hope-v1-collection.png";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Founders Series",
    description: "Premium essentials for the visionaries",
    query: "Founders",
    filterFn: (title: string) => title.includes("Founders"),
    image: foundersSeriesImage,
    imageClass: "object-cover",
  },
  {
    name: "Hope V1",
    description: "Bold statements, timeless style",
    query: "Hope",
    filterFn: (title: string) => title.includes("Hope"),
    image: hopeV1Image,
    imageClass: "object-contain scale-75",
  },
  {
    name: "A | M Essentials",
    description: "Everyday luxury streetwear",
    query: "A | M",
    filterFn: (title: string) => title.startsWith("A | M") && !title.includes("Founders"),
    image: amEssentialsImage,
    imageClass: "object-cover",
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
      <main className="pt-20">
        {/* Collections Section */}
        <section className="py-12 sm:py-20 bg-card/50">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
                Explore
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold">
                Collections
              </h1>
            </motion.div>

            {/* Collection cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleCollectionChange(collection.query)}
                    className={`group block relative overflow-hidden rounded-xl aspect-[4/5] hover-shine w-full text-left ${
                      selectedCollection === collection.query ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {/* Background image */}
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110 ${collection.imageClass}`}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-display text-2xl font-semibold mb-2 group-hover:gradient-brand-text transition-all">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <span>Shop Now</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold">
                {selectedCollection ? `${selectedCollection} Collection` : "All Products"}
              </h2>
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
