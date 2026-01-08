import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!", {
        description: "You'll be the first to know about new drops.",
        position: "top-center",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
            Sign up to stay updated
          </h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Be the first to know about new collections and special offers.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
              required
            />
            <Button 
              type="submit"
              className="bg-white text-[#1a1a1a] hover:bg-gray-100 font-medium"
            >
              Subscribe
            </Button>
          </form>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© 2026 A | M Chicago</p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
