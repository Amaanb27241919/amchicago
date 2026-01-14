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
        <div className="flex items-center gap-2 flex-wrap">
          {/* Visa */}
          <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-border">
            <svg viewBox="0 0 38 24" className="h-5 w-9" xmlns="http://www.w3.org/2000/svg">
              <path fill="#1434CB" d="M15 19.5H13l1.25-7.75h2l-1.25 7.75zm-3.5-7.75l-1.9 5.3-.2-1.05-.7-3.55s-.1-.7-.75-.7h-3l-.05.2s.75.15 1.65.65l1.35 5.4h2.1l3.2-6.25h-1.7zm15.9 5.05l1.05-2.9.6 2.9h-1.65zm2.35-5.05h-1.55s-.55 0-.7.55l-3 7.2h2.1l.4-1.2h2.55l.25 1.2h1.85l-1.9-7.75zm-6.6 2.25c0-.85.7-1.4 1.85-1.4.55 0 1 .1 1.3.2l.2-1.45s-.5-.2-1.3-.2c-1.95 0-3.35 1.05-3.35 2.55 0 1.1.95 1.75 1.7 2.1.75.4 1 .65 1 1 0 .55-.6.8-1.15.8-.8 0-1.5-.25-1.5-.25l-.2 1.5s.6.25 1.6.25c2 0 3.4-1 3.4-2.6 0-1.75-2.55-1.9-2.55-2.5z"/>
            </svg>
          </div>
          {/* Mastercard */}
          <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-border">
            <svg viewBox="0 0 38 24" className="h-5 w-9" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="12" r="7" fill="#EB001B"/>
              <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
              <path d="M19 6.5a7 7 0 010 11 7 7 0 000-11z" fill="#FF5F00"/>
            </svg>
          </div>
          {/* American Express */}
          <div className="h-8 w-12 bg-[#006FCF] rounded flex items-center justify-center">
            <svg viewBox="0 0 38 24" className="h-5 w-9" xmlns="http://www.w3.org/2000/svg">
              <text x="19" y="14" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="system-ui">AMEX</text>
            </svg>
          </div>
          {/* PayPal */}
          <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-border">
            <svg viewBox="0 0 38 24" className="h-5 w-9" xmlns="http://www.w3.org/2000/svg">
              <path fill="#003087" d="M10 7h3c2 0 3.5 1 3 3.5-.3 1.8-2 3-4 3h-1l-.5 3.5H8.5L10 7z"/>
              <path fill="#009CDE" d="M15 9h3c2 0 3.5 1 3 3.5-.3 1.8-2 3-4 3h-1l-.5 3.5h-2L15 9z"/>
            </svg>
          </div>
          {/* Apple Pay */}
          <div className="h-8 w-12 bg-black rounded flex items-center justify-center">
            <svg viewBox="0 0 38 24" className="h-5 w-9" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M10.5 8c.5-.6.85-1.4.75-2.2-.75.05-1.65.5-2.15 1.1-.45.5-.9 1.35-.8 2.15.85.05 1.7-.4 2.2-1.05zm.7 1.1c-1.2-.05-2.25.7-2.8.7-.6 0-1.5-.65-2.45-.65-1.25 0-2.4.75-3.05 1.9-1.3 2.25-.35 5.6.9 7.45.65.9 1.4 1.9 2.35 1.85.95-.05 1.3-.6 2.45-.6s1.45.6 2.45.6c1 0 1.65-.95 2.25-1.85.7-1.05 1-2.05 1-2.1-.05 0-2-.75-2-3 0-1.85 1.5-2.75 1.55-2.8-.85-1.25-2.15-1.4-2.65-1.4v-.1z"/>
              <text x="27" y="15" fill="white" fontSize="6" fontWeight="500" fontFamily="system-ui">Pay</text>
            </svg>
          </div>
          {/* Google Pay */}
          <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-border">
            <svg viewBox="0 0 38 24" className="h-5 w-9" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M17.5 12.25c0-.7-.05-1.2-.15-1.7H12v3.2h3.1c-.1.6-.5 1.45-1.4 2l2.1 1.65c1.25-1.15 1.7-2.85 1.7-5.15z"/>
              <path fill="#34A853" d="M12 19c1.85 0 3.4-.6 4.55-1.65l-2.1-1.65c-.6.4-1.35.7-2.45.7-1.85 0-3.4-1.25-3.95-2.9l-2.15 1.65C7.2 17.5 9.4 19 12 19z"/>
              <path fill="#FBBC05" d="M8.05 13.5c-.15-.45-.25-.9-.25-1.4s.1-.95.25-1.4L5.9 9.05C5.35 10.1 5 11.3 5 12.6s.35 2.5.9 3.55l2.15-1.65z"/>
              <path fill="#EA4335" d="M12 7.8c1.05 0 1.95.35 2.7 1.05l2-2C15.35 5.6 13.85 5 12 5 9.4 5 7.2 6.5 5.9 8.85l2.15 1.65c.55-1.65 2.1-2.7 3.95-2.7z"/>
              <text x="27" y="14" fill="#5F6368" fontSize="5" fontWeight="500" fontFamily="system-ui">Pay</text>
            </svg>
          </div>
          {/* Shop Pay */}
          <div className="h-8 w-12 bg-[#5A31F4] rounded flex items-center justify-center">
            <svg viewBox="0 0 38 24" className="h-4 w-8" xmlns="http://www.w3.org/2000/svg">
              <text x="19" y="14" textAnchor="middle" fill="white" fontSize="5" fontWeight="600" fontFamily="system-ui">Shop</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
