import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    <>
      {/* Announcement bar */}
      <div className="bg-[#1a1a1a] text-white text-center py-2 text-sm font-medium tracking-wide">
        Aspire | Manifest
      </div>
      
      <header className="sticky top-0 z-50 bg-[#f5f5f5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left - Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={scrollToTop}
                className="text-sm font-medium text-[#1a1a1a] hover:text-red-600 transition-colors uppercase tracking-wide"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("shop")}
                className="text-sm font-medium text-[#1a1a1a] hover:text-red-600 transition-colors uppercase tracking-wide"
              >
                Catalog
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium text-[#1a1a1a] hover:text-red-600 transition-colors uppercase tracking-wide"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("footer")}
                className="text-sm font-medium text-[#1a1a1a] hover:text-red-600 transition-colors uppercase tracking-wide"
              >
                Contact
              </button>
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#1a1a1a]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <span className="text-xl sm:text-2xl font-display font-semibold tracking-wide text-[#1a1a1a]">
                  A M
                </span>
                <span className="text-[8px] sm:text-[10px] tracking-[0.2em] text-gray-500 uppercase">
                  Chicago
                </span>
              </motion.div>
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#1a1a1a] hover:text-red-600"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#1a1a1a] hover:text-red-600"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#1a1a1a] hover:text-red-600"
                onClick={() => setOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 flex items-center justify-center text-xs font-semibold text-white"
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
              className="md:hidden bg-[#f5f5f5] border-t border-gray-200"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <button
                  onClick={scrollToTop}
                  className="text-sm font-medium text-[#1a1a1a] py-2 text-left uppercase tracking-wide"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("shop")}
                  className="text-sm font-medium text-[#1a1a1a] py-2 text-left uppercase tracking-wide"
                >
                  Catalog
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm font-medium text-[#1a1a1a] py-2 text-left uppercase tracking-wide"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("footer")}
                  className="text-sm font-medium text-[#1a1a1a] py-2 text-left uppercase tracking-wide"
                >
                  Contact
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
