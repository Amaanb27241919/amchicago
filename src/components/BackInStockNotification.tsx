import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logError } from "@/lib/logger";

interface BackInStockNotificationProps {
  productTitle: string;
  productHandle: string;
  variantTitle?: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const BackInStockNotification = ({
  productTitle,
  productHandle,
  variantTitle,
}: BackInStockNotificationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      // Store in newsletter_subscribers with a source indicating back-in-stock
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: trimmedEmail,
        source: `back-in-stock:${productHandle}${variantTitle ? `:${variantTitle}` : ""}`,
      });

      if (error) {
        if (error.code === "23505") {
          // Already subscribed
          toast.info("You're already signed up for notifications!");
          setIsSubmitted(true);
        } else {
          throw error;
        }
      } else {
        toast.success("We'll notify you when it's back in stock!");
        setIsSubmitted(true);
      }
    } catch (error) {
      logError("Back in stock notification error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <AnimatePresence mode="wait">
        {!isOpen && !isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(true)}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notify Me When Available
            </Button>
          </motion.div>
        )}

        {isOpen && !isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-secondary/50 rounded-lg p-4 border border-border"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Get Notified</h4>
                <p className="text-xs text-muted-foreground">
                  Enter your email and we'll let you know when "{productTitle}
                  {variantTitle ? ` - ${variantTitle}` : ""}" is back in stock.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gradient-brand text-primary-foreground shrink-0"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Notify Me"
                )}
              </Button>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground mt-2 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 rounded-lg p-4 border border-primary/20 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">You're on the list!</p>
              <p className="text-xs text-muted-foreground">
                We'll email you when this item is available.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
