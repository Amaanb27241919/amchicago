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
    </div>
  );
};
