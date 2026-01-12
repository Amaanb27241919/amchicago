import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Loader2, CheckCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logError } from "@/lib/logger";

const POPUP_SHOWN_KEY = "am_welcome_popup_shown";
const POPUP_DELAY_MS = 3000; // Show after 3 seconds
const DISCOUNT_CODE = "WELCOME10";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem(POPUP_SHOWN_KEY);
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, POPUP_DELAY_MS);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(POPUP_SHOWN_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: trimmedEmail,
        source: "welcome-popup",
      });

      if (error) {
        if (error.code === "23505") {
          // Already subscribed - still show success with discount
          setIsSuccess(true);
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
      }
      
      // Mark popup as shown
      localStorage.setItem(POPUP_SHOWN_KEY, "true");
    } catch (error) {
      logError("Welcome popup signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      toast.success("Discount code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-secondary transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Gradient header */}
              <div className="h-2 gradient-brand" />

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Icon */}
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Gift className="w-8 h-8 text-primary" />
                      </div>

                      {/* Heading */}
                      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-2">
                        Welcome to A | M
                      </h2>
                      <p className="text-center text-muted-foreground mb-6">
                        Join our community and get{" "}
                        <span className="text-primary font-semibold">10% OFF</span>{" "}
                        your first order!
                      </p>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          className="h-12 text-center"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 gradient-brand text-primary-foreground font-semibold"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            "Unlock My Discount"
                          )}
                        </Button>
                      </form>

                      <p className="text-xs text-center text-muted-foreground mt-4">
                        By subscribing, you agree to receive marketing emails.
                        Unsubscribe anytime.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      {/* Success Icon */}
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-2">
                        You're In! 🎉
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Here's your exclusive discount code:
                      </p>

                      {/* Discount Code */}
                      <div className="bg-secondary rounded-xl p-4 mb-6">
                        <p className="text-xs text-muted-foreground mb-2">
                          YOUR DISCOUNT CODE
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-2xl font-bold tracking-wider text-primary">
                            {DISCOUNT_CODE}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleCopyCode}
                            className="shrink-0"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-primary" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button
                        onClick={handleClose}
                        className="w-full h-12 gradient-brand text-primary-foreground font-semibold"
                      >
                        Start Shopping
                      </Button>

                      <p className="text-xs text-muted-foreground mt-4">
                        Valid for 10% off your first order. Cannot be combined
                        with other offers.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
