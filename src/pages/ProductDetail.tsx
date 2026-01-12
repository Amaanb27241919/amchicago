import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Loader2, Heart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { RelatedProducts } from "@/components/RelatedProducts";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { AIRecommendations } from "@/components/AIRecommendations";
import { TrustBadges } from "@/components/TrustBadges";
import { BackInStockNotification } from "@/components/BackInStockNotification";
import { PreOrderForm } from "@/components/PreOrderForm";
import { toast } from "sonner";
import { logError } from "@/lib/logger";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

// Map color names to CSS colors
const colorMap: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#DC2626",
  blue: "#2563EB",
  navy: "#1E3A5F",
  green: "#16A34A",
  gray: "#6B7280",
  grey: "#6B7280",
  brown: "#92400E",
  beige: "#D4C4A8",
  cream: "#FFFDD0",
  tan: "#D2B48C",
  olive: "#808000",
  burgundy: "#800020",
  maroon: "#800000",
  pink: "#EC4899",
  purple: "#9333EA",
  orange: "#EA580C",
  yellow: "#EAB308",
  gold: "#D4AF37",
  silver: "#C0C0C0",
  charcoal: "#36454F",
  heather: "#9CA3AF",
  "heather gray": "#9CA3AF",
  "heather grey": "#9CA3AF",
};

const getColorValue = (colorName: string): string => {
  const normalized = colorName.toLowerCase().trim();
  return colorMap[normalized] || "#9CA3AF";
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showPreOrderForm, setShowPreOrderForm] = useState(false);
  const { addItem, setOpen } = useCartStore();
  const { addProduct: addToRecentlyViewed } = useRecentlyViewed();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        // Add to recently viewed
        if (data) {
          addToRecentlyViewed({
            handle: data.handle,
            title: data.title,
            image: data.images.edges[0]?.node.url || "",
            price: data.priceRange.minVariantPrice.amount,
          });
        }
      } catch (err) {
        logError("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle, addToRecentlyViewed]);

  // Dynamic SEO for product pages
  usePageMeta({
    title: product?.title || "Product",
    description: product?.description?.slice(0, 160) || "Shop premium streetwear from A | M Chicago.",
    keywords: `${product?.title || ""}, Chicago streetwear, premium clothing`,
    ogImage: product?.images?.edges?.[0]?.node?.url,
    canonicalPath: `/product/${handle}`,
  });

  // Extract color option (works with null product)
  const colorOption = product?.options.find(
    (opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour"
  );
  const colors = colorOption?.values || [];
  const images = product?.images.edges || [];

  // Build color to image index map using variant image data
  const colorImageMap = useMemo(() => {
    const map: Record<string, { url: string; index: number }> = {};
    if (!colorOption || colors.length === 0 || images.length === 0 || !product) return map;

    colors.forEach((color) => {
      // Find a variant with this color that has an image
      const variantWithImage = product.variants.edges.find((v) => {
        const hasColor = v.node.selectedOptions.some(
          (o) => (o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") && o.value === color
        );
        return hasColor && v.node.image?.url;
      });

      if (variantWithImage?.node.image?.url) {
        // Find the index of this image in the images array
        const imageIndex = images.findIndex(
          (img) => img.node.url === variantWithImage.node.image?.url || img.node.id === variantWithImage.node.image?.id
        );
        map[color] = {
          url: variantWithImage.node.image.url,
          index: imageIndex >= 0 ? imageIndex : 0,
        };
      } else {
        // Fallback to first image
        map[color] = {
          url: images[0]?.node.url || "",
          index: 0,
        };
      }
    });

    return map;
  }, [colorOption, colors, images, product]);

  // Initialize selected color
  useEffect(() => {
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display mb-4">Product not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;

  // Update image when color changes
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    
    // Find variant with this color
    const variantIndex = product.variants.edges.findIndex((v) =>
      v.node.selectedOptions.some(
        (o) => (o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") && o.value === color
      )
    );
    
    if (variantIndex >= 0) {
      setSelectedVariantIndex(variantIndex);
    }

    // Update image to match color
    if (colorImageMap[color]) {
      setSelectedImage(colorImageMap[color].index);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });

    toast.success("Added to bag", {
      description: `${product.title} × ${quantity}`,
      position: "top-center",
    });

    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main image */}
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-card">
                {images[selectedImage]?.node && (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
                {product.title}
              </h1>

              <p className="text-2xl font-semibold gradient-brand-text mb-6">
                {selectedVariant && formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </p>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Color swatches */}
              {colors.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">
                    Color: <span className="text-muted-foreground">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => {
                      const isAvailable = product.variants.edges.some(
                        (v) =>
                          v.node.availableForSale &&
                          v.node.selectedOptions.some(
                            (o) =>
                              (o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") &&
                              o.value === color
                          )
                      );
                      const swatchImage = colorImageMap[color]?.url;

                      return (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(color)}
                          className={cn(
                            "w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 relative overflow-hidden bg-muted",
                            selectedColor === color
                              ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                              : "border-border hover:border-muted-foreground",
                            !isAvailable && "opacity-50"
                          )}
                          title={color}
                          aria-label={`Select ${color} color`}
                        >
                          {swatchImage ? (
                            <img
                              src={swatchImage}
                              alt={color}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span
                              className="w-full h-full block"
                              style={{ backgroundColor: getColorValue(color) }}
                            />
                          )}
                          {!isAvailable && (
                            <span className="absolute inset-0 flex items-center justify-center bg-background/50">
                              <span className="w-full h-0.5 bg-muted-foreground rotate-45 absolute" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Other Options (Size, etc.) */}
              {product.options
                .filter((option) => option.name.toLowerCase() !== "color" && option.name.toLowerCase() !== "colour")
                .map((option) => (
                <div key={option.name} className="mb-6">
                  <label className="block text-sm font-medium mb-3">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const variantIndex = product.variants.edges.findIndex(
                        (v) => v.node.selectedOptions.some(
                          (o) => o.name === option.name && o.value === value
                        ) && (!selectedColor || v.node.selectedOptions.some(
                          (o) => (o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") && o.value === selectedColor
                        ))
                      );
                      const isSelected = selectedVariant?.selectedOptions.some(
                        (o) => o.name === option.name && o.value === value
                      );
                      const variant = product.variants.edges.find(
                        (v) => v.node.selectedOptions.some(
                          (o) => o.name === option.name && o.value === value
                        ) && (!selectedColor || v.node.selectedOptions.some(
                          (o) => (o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") && o.value === selectedColor
                        ))
                      );
                      const isAvailable = variant?.node.availableForSale ?? true;

                      return (
                        <button
                          key={value}
                          onClick={() => variantIndex >= 0 && setSelectedVariantIndex(variantIndex)}
                          className={cn(
                            "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-muted-foreground",
                            !isAvailable && "opacity-50 line-through"
                          )}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">Quantity</label>
                <div className="inline-flex items-center gap-1 bg-secondary rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to cart or Pre-order */}
              <div className="flex gap-3">
                {selectedVariant?.availableForSale ? (
                  <Button
                    size="lg"
                    className="flex-1 gradient-brand text-primary-foreground font-semibold glow-brand"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Bag
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="flex-1"
                    variant="outline"
                    onClick={() => setShowPreOrderForm(true)}
                  >
                    <Bell className="w-5 h-5 mr-2" />
                    Pre-Order
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className={`px-4 ${isInWishlist(handle || "") ? "text-red-500 border-red-500/50" : ""}`}
                  onClick={() => toggleWishlist({
                    handle: handle || "",
                    title: product.title,
                    image: images[0]?.node.url || "",
                    price: product.priceRange.minVariantPrice.amount,
                  })}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(handle || "") ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Pre-order form modal */}
              {showPreOrderForm && selectedVariant && (
                <PreOrderForm
                  productHandle={product.handle}
                  productTitle={product.title}
                  variantId={selectedVariant.id}
                  variantTitle={selectedVariant.title}
                  price={formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
                  quantity={quantity}
                  onClose={() => setShowPreOrderForm(false)}
                />
              )}

              {/* Back in stock notification for sold out items */}
              {!selectedVariant?.availableForSale && (
                <BackInStockNotification
                  productTitle={product.title}
                  productHandle={product.handle}
                  variantTitle={selectedVariant?.title !== "Default Title" ? selectedVariant?.title : undefined}
                />
              )}

              {/* Trust badges */}
              <TrustBadges />
            </motion.div>
          </div>

          {/* AI Recommendations */}
          <AIRecommendations currentHandle={handle} />

          {/* Related Products */}
          <RelatedProducts currentHandle={handle || ""} currentTitle={product.title} />
          
          {/* Recently Viewed */}
          <RecentlyViewed currentHandle={handle} />
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
