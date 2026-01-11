import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logError } from "@/lib/logger";
import { usePageMeta } from "@/hooks/usePageMeta";

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

const categories = ["Hoodie", "T-Shirt", "Jogger", "Crew", "Bomber Jacket", "Parka", "Long Sleeve", "Zip-Polo"];

type SortOption = "newest" | "price-asc" | "price-desc";
type AvailabilityFilter = "all" | "in-stock" | "sold-out";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const selectedCollections = searchParams.get("collection")?.split(",").filter(Boolean) || [];
  const selectedCategories = searchParams.get("category")?.split(",").filter(Boolean) || [];
  const sortBy = (searchParams.get("sort") as SortOption) || "newest";
  const searchQuery = searchParams.get("q") || "";
  const availability = (searchParams.get("availability") as AvailabilityFilter) || "all";

  usePageMeta({
    title: "Shop All Products",
    description: "Browse our complete collection of premium streetwear. Hoodies, t-shirts, joggers, and more from A | M Chicago.",
    keywords: "shop streetwear, Chicago hoodies, premium t-shirts, urban joggers, streetwear collection",
    canonicalPath: "/shop",
  });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(50);
        setAllProducts(data);
      } catch (err) {
        setError("Failed to load products");
        logError("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.node.title.toLowerCase().includes(query) ||
        product.node.description.toLowerCase().includes(query)
      );
    }

    // Filter by collections (OR logic - match any selected collection)
    if (selectedCollections.length > 0) {
      result = result.filter(product => {
        return selectedCollections.some(collQuery => {
          const collection = collections.find(c => c.query === collQuery);
          return collection ? collection.filterFn(product.node.title) : false;
        });
      });
    }

    // Filter by categories (OR logic - match any selected category)
    if (selectedCategories.length > 0) {
      result = result.filter(product => {
        const title = product.node.title.toLowerCase();
        return selectedCategories.some(category => {
          const categoryLower = category.toLowerCase();
          return title.includes(categoryLower);
        });
      });
    }

    // Filter by availability
    if (availability !== "all") {
      result = result.filter(product => {
        const hasAvailableVariant = product.node.variants.edges.some(
          variant => variant.node.availableForSale
        );
        return availability === "in-stock" ? hasAvailableVariant : !hasAvailableVariant;
      });
    }

    // Sort products
    result.sort((a, b) => {
      const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
      
      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "newest":
        default:
          return 0;
      }
    });

    return result;
  }, [allProducts, searchQuery, selectedCollections, selectedCategories, availability, sortBy]);

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    setSearchParams(params);
  };

  const handleCollectionChange = (newCollections: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (newCollections.length > 0) {
      params.set("collection", newCollections.join(","));
    } else {
      params.delete("collection");
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (newCategories: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (newCategories.length > 0) {
      params.set("category", newCategories.join(","));
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const handleSortChange = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    setSearchParams(params);
  };

  const handleAvailabilityChange = (newAvailability: AvailabilityFilter) => {
    const params = new URLSearchParams(searchParams);
    if (newAvailability !== "all") {
      params.set("availability", newAvailability);
    } else {
      params.delete("availability");
    }
    setSearchParams(params);
  };

  const handleClearAll = () => {
    setSearchParams(new URLSearchParams());
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
                {selectedCollections.length > 0 
                  ? selectedCollections.map(c => collections.find(col => col.query === c)?.name || c).join(" & ")
                  : "All Products"}
              </h1>
            </motion.div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-10 bg-secondary border-border"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => handleSearchChange("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Filters */}
            <ProductFilters
              collections={collections.map((c) => c.query)}
              selectedCollections={selectedCollections}
              onCollectionChange={handleCollectionChange}
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              availability={availability}
              onAvailabilityChange={handleAvailabilityChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onClearAll={handleClearAll}
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
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
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
