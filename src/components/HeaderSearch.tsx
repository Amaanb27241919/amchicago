import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={handleClose}
            />

            {/* Search Modal */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 px-0"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Press Enter to search or Esc to close
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
