import { Shield, Lock, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export const TrustBadges = () => {
  const badges = [
    { icon: Lock, label: "Secure Checkout", sublabel: "SSL Encrypted" },
    { icon: Shield, label: "Buyer Protection", sublabel: "100% Safe" },
    { icon: Truck, label: "Fast Shipping", sublabel: "2-5 Business Days" },
    { icon: RotateCcw, label: "Easy Returns", sublabel: "30-Day Policy" },
  ];

  return (
    <div className="border-t border-border pt-6 mt-6">
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <badge.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.sublabel}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Icons */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3">Accepted Payment Methods</p>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Visa */}
          <div className="h-8 px-3 bg-white rounded flex items-center justify-center border border-border">
            <svg viewBox="0 0 50 16" className="h-4" fill="#1A1F71">
              <path d="M19.13 15.34h-3.83l2.4-14.68h3.83l-2.4 14.68zm15.42-14.32c-.76-.3-1.94-.62-3.42-.62-3.77 0-6.43 2.01-6.45 4.89-.02 2.13 1.9 3.32 3.35 4.03 1.49.72 1.99 1.19 1.98 1.83-.01.99-1.19 1.44-2.29 1.44-1.53 0-2.34-.22-3.59-.77l-.49-.24-.54 3.3c.89.41 2.54.77 4.25.79 4.01 0 6.62-1.98 6.65-5.06.02-1.69-1.01-2.97-3.22-4.03-1.34-.69-2.16-1.14-2.15-1.84 0-.62.69-1.28 2.19-1.28 1.25-.02 2.16.27 2.87.57l.34.17.52-3.18zm9.8-.36h-2.95c-.91 0-1.6.26-2 1.22l-5.67 13.46h4.01l.8-2.21h4.9l.46 2.21h3.54l-3.09-14.68zm-4.71 9.48c.32-.85 1.53-4.14 1.53-4.14-.02.04.32-.86.51-1.42l.26 1.28s.74 3.54.89 4.28h-3.19zm-20.36-9.48l-3.74 10-.4-2.04c-.7-2.36-2.87-4.92-5.3-6.2l3.42 12.84h4.04l6.01-14.6h-4.03z" />
            </svg>
          </div>
          {/* Mastercard */}
          <div className="h-8 px-2 bg-white rounded flex items-center justify-center border border-border">
            <svg viewBox="0 0 40 24" className="h-5">
              <circle cx="15" cy="12" r="10" fill="#EB001B" />
              <circle cx="25" cy="12" r="10" fill="#F79E1B" />
              <path d="M20 5.3c2.2 1.7 3.6 4.3 3.6 7.2s-1.4 5.5-3.6 7.2c-2.2-1.7-3.6-4.3-3.6-7.2s1.4-5.5 3.6-7.2z" fill="#FF5F00" />
            </svg>
          </div>
          {/* Amex */}
          <div className="h-8 px-2 bg-[#006FCF] rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">AMEX</span>
          </div>
          {/* PayPal */}
          <div className="h-8 px-3 bg-white rounded flex items-center justify-center border border-border">
            <svg viewBox="0 0 100 26" className="h-4">
              <path fill="#253B80" d="M12.2 4.3H4.9c-.5 0-.9.4-1 .8L1 23.5c-.1.4.2.7.6.7h3.5c.5 0 .9-.4 1-.8l.8-5c.1-.5.5-.8 1-.8h2.2c4.5 0 7.2-2.2 7.9-6.5.3-1.9 0-3.4-.8-4.4-1-1.2-2.6-1.8-4.8-1.8l-.2-.6z" />
              <path fill="#179BD7" d="M38.4 10.7c-.3 2.1-1.8 2.1-3.3 2.1h-.8l.6-3.7c0-.2.2-.4.5-.4h.4c1 0 2 0 2.4.6.3.3.4.8.2 1.4zm-.7-4.8h-5.5c-.4 0-.8.3-.8.7l-2.2 14.2c0 .3.2.6.5.6h2.8c.3 0 .5-.2.6-.5l.6-3.9c.1-.4.4-.7.8-.7h1.9c3.9 0 6.2-1.9 6.8-5.7.3-1.6 0-2.9-.7-3.9-.8-1-2.4-1.5-4.4-1.5l-.4.7z" />
              <path fill="#253B80" d="M60.5 10.7c-.3 2.1-1.8 2.1-3.3 2.1h-.8l.6-3.7c0-.2.2-.4.5-.4h.4c1 0 2 0 2.4.6.3.3.4.8.2 1.4zm-.7-4.8H54c-.4 0-.8.3-.8.7l-2.2 14.2c0 .3.2.6.5.6h2.7c.4 0 .8-.3.8-.7l.6-3.7c.1-.4.4-.7.8-.7h1.9c3.9 0 6.2-1.9 6.8-5.7.3-1.6 0-2.9-.7-3.9-.9-1-2.4-1.5-4.5-1.5l.4.7z" />
              <path fill="#179BD7" d="M77.4 15.6l.6-3.9c0-.2.2-.4.5-.4h.4c1.8 0 3.4.4 4.3 1.3-.9 4-4 5.9-7.5 5.9h-2c-.4 0-.7.3-.8.7l-1 6.3-.3 1.8c0 .3.2.5.5.5h3.5c.4 0 .7-.3.8-.6l.3-1.7.6-4.1c.1-.4.4-.7.8-.7h.5c3.3 0 5.8-1.3 6.6-5.2.3-1.6.2-3-.7-3.9" />
            </svg>
          </div>
          {/* Apple Pay */}
          <div className="h-8 px-2 bg-black rounded flex items-center justify-center">
            <span className="text-white text-xs font-medium">Apple Pay</span>
          </div>
          {/* Google Pay */}
          <div className="h-8 px-2 bg-white rounded flex items-center justify-center border border-border">
            <span className="text-xs font-medium">G Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
};
