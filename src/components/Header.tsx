import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { getTotalItems, setOpen } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <a href="#shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </a>
            <a href="#collections" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Collections
            </a>
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <span className="text-2xl sm:text-3xl font-display font-semibold tracking-wide gradient-brand-text">
                A | M
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground uppercase">
                Chicago
              </span>
            </motion.div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full gradient-brand flex items-center justify-center text-xs font-semibold text-primary-foreground"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#shop"
                className="text-sm font-medium text-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </a>
              <a
                href="#collections"
                className="text-sm font-medium text-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
