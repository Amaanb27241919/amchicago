import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-8xl sm:text-9xl font-display font-bold gradient-brand-text">
              404
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-6 mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="gradient-brand text-primary-foreground font-semibold glow-brand"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/shop">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Shop
                </Link>
              </Button>
            </div>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back to previous page
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;