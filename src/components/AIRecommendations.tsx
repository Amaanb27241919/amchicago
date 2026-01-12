import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { fetchProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { logError } from "@/lib/logger";
import { toast } from "sonner";

interface AIRecommendationsProps {
  currentHandle?: string;
}

export const AIRecommendations = ({ currentHandle }: AIRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiPowered, setAiPowered] = useState(false);
  const { recentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        // Fetch all products first
        const allProducts = await fetchProducts(20);
        
        // Filter out current product
        const available = allProducts.filter(p => p.node.handle !== currentHandle);
        
        if (available.length === 0) {
          setLoading(false);
          return;
        }

        // Prepare data for AI
        const browsingHistory = recentlyViewed
          .filter(item => item.handle !== currentHandle)
          .slice(0, 5);

        const productInfos = available.map(p => ({
          handle: p.node.handle,
          title: p.node.title,
          description: p.node.description || "",
          price: formatPrice(p.node.priceRange.minVariantPrice.amount),
        }));

        try {
          // Call AI recommendations edge function
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-recommendations`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
              body: JSON.stringify({
                browsingHistory,
                allProducts: productInfos,
                currentProductHandle: currentHandle,
              }),
            }
          );

          if (!response.ok) {
            if (response.status === 429) {
              toast.error("AI recommendations temporarily unavailable", {
                description: "Showing popular items instead.",
              });
            }
            throw new Error(`AI request failed: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.recommendations && data.recommendations.length > 0) {
            // Map handles back to full product objects
            const recommendedProducts = data.recommendations
              .map((handle: string) => available.find(p => p.node.handle === handle))
              .filter(Boolean) as ShopifyProduct[];
            
            if (recommendedProducts.length > 0) {
              setRecommendations(recommendedProducts);
              setAiPowered(true);
              setLoading(false);
              return;
            }
          }
        } catch (aiError) {
          logError("AI recommendations failed, using fallback:", aiError);
        }

        // Fallback: show random products
        const shuffled = [...available].sort(() => Math.random() - 0.5);
        setRecommendations(shuffled.slice(0, 4));
        setAiPowered(false);
      } catch (err) {
        logError("Failed to load recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [currentHandle, recentlyViewed]);

  if (loading) {
    return (
      <section className="mt-20 border-t border-border pt-16">
        <div className="flex items-center gap-2 mb-8">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground">Finding personalized picks...</span>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-20 border-t border-border pt-16">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="font-display text-2xl font-semibold">Recommended For You</h2>
        {aiPowered && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            AI Powered
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {recommendations.map((product, index) => (
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
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-card mb-3 relative">
                {product.node.images.edges[0]?.node && (
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.images.edges[0].node.altText || product.node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {aiPowered && index === 0 && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded bg-primary/90 text-primary-foreground text-xs font-medium">
                    Top Pick
                  </div>
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
