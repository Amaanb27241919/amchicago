import { ShoppingBag, Menu, X, Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderSearch } from "@/components/HeaderSearch";
export const Header = () => {
  const { getTotalItems, setOpen } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    // If not on home page, navigate home first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
            <button
              onClick={scrollToTop}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <Link
              to="/shop"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.75, y: 0 }}
              className="flex flex-col items-center"
            >
              <span className="text-lg sm:text-xl font-display font-medium tracking-wide text-muted-foreground">
                A | M
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-muted-foreground/70 uppercase">
                Chicago
              </span>
            </motion.div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-2">
            <HeaderSearch />
            <a
              href="https://www.instagram.com/a.m.threads_chicago"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/company/a-m-chicago/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Linkedin className="h-4 w-4" />
              </Button>
            </a>
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
              <button
                onClick={scrollToTop}
                className="text-sm font-medium text-foreground py-2 text-left"
              >
                Home
              </button>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground py-2 text-left"
              >
                Shop
              </Link>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium text-foreground py-2 text-left"
              >
                About
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
