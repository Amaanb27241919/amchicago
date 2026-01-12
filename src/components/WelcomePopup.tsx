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

          {/* Popup - Mobile: slides up from bottom, Desktop: centered modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md"
          >
            <div className="bg-card border-t border-border md:border md:rounded-2xl shadow-2xl overflow-hidden rounded-t-3xl md:rounded-2xl max-h-[90vh] md:max-h-none overflow-y-auto">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 md:top-4 md:right-4 p-2 md:p-1 rounded-full bg-secondary/80 md:bg-transparent hover:bg-secondary transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Mobile drag indicator */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              {/* Gradient header - hidden on mobile for cleaner look */}
              <div className="hidden md:block h-2 gradient-brand" />

              <div className="px-5 py-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Gift className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>

                      {/* Heading */}
                      <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-2">
                        Welcome to A | M
                      </h2>
                      <p className="text-center text-muted-foreground text-sm md:text-base mb-5 md:mb-6">
                        Join our community and get{" "}
                        <span className="text-primary font-semibold">10% OFF</span>{" "}
                        your first order!
                      </p>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          className="h-12 md:h-12 text-center text-base"
                          autoComplete="email"
                          inputMode="email"
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 md:h-12 gradient-brand text-primary-foreground font-semibold text-base"
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
                      <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>

                      <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                        You're In! 🎉
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base mb-5 md:mb-6">
                        Here's your exclusive discount code:
                      </p>

                      {/* Discount Code */}
                      <div className="bg-secondary rounded-xl p-4 mb-5 md:mb-6">
                        <p className="text-xs text-muted-foreground mb-2">
                          YOUR DISCOUNT CODE
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-xl md:text-2xl font-bold tracking-wider text-primary">
                            {DISCOUNT_CODE}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleCopyCode}
                            className="shrink-0 h-10 w-10"
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
                        className="w-full h-12 gradient-brand text-primary-foreground font-semibold text-base"
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
