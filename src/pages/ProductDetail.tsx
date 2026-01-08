import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, setOpen } = useCartStore();

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display mb-4 text-[#1a1a1a]">Product not found</h1>
          <Link to="/" className="text-red-600 hover:underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const images = product.images.edges;

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
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <CartDrawer />

      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a1a1a] mb-8 transition-colors"
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
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white">
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
                      className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors bg-white ${
                        selectedImage === index ? "border-red-600" : "border-transparent"
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
              <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4 text-[#1a1a1a]">
                {product.title}
              </h1>

              <p className="text-2xl font-semibold text-[#1a1a1a] mb-6">
                {selectedVariant && formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </p>

              <p className="text-gray-500 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Options */}
              {product.options.map((option) => (
                <div key={option.name} className="mb-6">
                  <label className="block text-sm font-medium mb-3 text-[#1a1a1a]">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const variantIndex = product.variants.edges.findIndex(
                        (v) => v.node.selectedOptions.some(
                          (o) => o.name === option.name && o.value === value
                        )
                      );
                      const isSelected = selectedVariant?.selectedOptions.some(
                        (o) => o.name === option.name && o.value === value
                      );

                      return (
                        <button
                          key={value}
                          onClick={() => variantIndex >= 0 && setSelectedVariantIndex(variantIndex)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            isSelected
                              ? "border-red-600 bg-red-50 text-red-600"
                              : "border-gray-200 hover:border-gray-400 text-[#1a1a1a]"
                          }`}
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
                <label className="block text-sm font-medium mb-3 text-[#1a1a1a]">Quantity</label>
                <div className="inline-flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-[#1a1a1a]"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-[#1a1a1a]">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-[#1a1a1a]"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to cart */}
              <Button
                size="lg"
                className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-semibold"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {selectedVariant?.availableForSale ? "Add to Bag" : "Sold Out"}
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default ProductDetail;
