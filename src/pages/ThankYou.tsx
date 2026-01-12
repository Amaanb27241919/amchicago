import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, Mail, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/stores/cartStore";
import { usePageMeta } from "@/hooks/usePageMeta";
import confetti from "canvas-confetti";

const ThankYou = () => {
  const { clearCart } = useCartStore();

  usePageMeta({
    title: "Order Confirmed - Thank You!",
    description: "Thank you for your order from A|M Chicago. Your premium streetwear is on its way!",
  });

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart();

    // Trigger confetti celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFD700", "#FFA500", "#FF6347"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFD700", "#FFA500", "#FF6347"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [clearCart]);

  const steps = [
    {
      icon: CheckCircle,
      title: "Order Confirmed",
      description: "We've received your order and are getting it ready.",
    },
    {
      icon: Mail,
      title: "Confirmation Email",
      description: "Check your inbox for order details and tracking info.",
    },
    {
      icon: Package,
      title: "Shipping Soon",
      description: "Your items will be shipped within 1-2 business days.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-primary" />
            </motion.div>

            {/* Thank You Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl font-semibold mb-4"
            >
              Thank You!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Your order has been placed successfully. We appreciate your business!
            </motion.p>

            {/* Order Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8"
            >
              <h2 className="text-lg font-semibold mb-6">What's Next?</h2>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-4 text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Support Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-sm text-muted-foreground mb-8"
            >
              Questions about your order?{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="gradient-brand text-primary-foreground">
                <Link to="/shop">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  Back to Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
