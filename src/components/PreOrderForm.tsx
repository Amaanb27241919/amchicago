import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Check, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PreOrderFormProps {
  productHandle: string;
  productTitle: string;
  variantId: string;
  variantTitle: string;
  price: string;
  quantity: number;
  onClose: () => void;
}

export const PreOrderForm = ({
  productHandle,
  productTitle,
  variantId,
  variantTitle,
  price,
  quantity,
  onClose,
}: PreOrderFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const priceValue = parseFloat(price.replace(/[^0-9.]/g, ""));
      
      const { error } = await supabase.from("preorders").insert({
        email,
        name: name || null,
        phone: phone || null,
        product_handle: productHandle,
        product_title: productTitle,
        variant_id: variantId,
        variant_title: variantTitle,
        quantity,
        price_at_order: isNaN(priceValue) ? null : priceValue,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Pre-order submitted successfully!");
    } catch (error) {
      console.error("Pre-order error:", error);
      toast.error("Failed to submit pre-order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full md:max-w-md bg-background rounded-t-3xl md:rounded-2xl overflow-hidden"
        >
          {/* Mobile drag indicator */}
          <div className="flex justify-center pt-3 md:hidden">
            <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Pre-Order</h3>
                <p className="text-sm text-muted-foreground">Reserve your item</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-4 md:p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Pre-Order Confirmed!
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  We'll notify you at <span className="font-medium">{email}</span> when this item is available.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 text-left">
                  <p className="text-sm font-medium text-foreground">{productTitle}</p>
                  <p className="text-sm text-muted-foreground">{variantTitle}</p>
                  <p className="text-sm text-muted-foreground">Qty: {quantity} • {price}</p>
                </div>
                <Button onClick={onClose} className="mt-6 w-full">
                  Continue Shopping
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product details */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-foreground">{productTitle}</p>
                  <p className="text-sm text-muted-foreground">{variantTitle}</p>
                  <p className="text-sm text-muted-foreground">Qty: {quantity} • {price}</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    *Final price may vary at time of purchase
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="preorder-email">Email *</Label>
                  <Input
                    id="preorder-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="preorder-name">Name (optional)</Label>
                  <Input
                    id="preorder-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="preorder-phone">Phone (optional)</Label>
                  <Input
                    id="preorder-phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Pre-Order"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to be contacted when this item becomes available.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
