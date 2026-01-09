import { Instagram, MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logError } from "@/lib/logger";

// Email validation regex - checks for proper format with TLD
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting constants
const RATE_LIMIT_KEY = 'newsletter_last_submit';
const RATE_LIMIT_MINUTES = 5;

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Proper email validation with regex
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Client-side rate limiting to prevent spam
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < RATE_LIMIT_MINUTES * 60000) {
      toast.error("Please wait a few minutes before subscribing again");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: trimmedEmail });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        // Store timestamp for rate limiting
        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
        toast.success("Thanks for subscribing! 🎉");
        setEmail("");
      }
    } catch (error) {
      logError("Newsletter signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-3xl font-display font-semibold gradient-brand-text">A | M</span>
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mt-1">Chicago</p>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Premium streetwear rooted in Chicago. Designed for those who dare to aspire and manifest their vision.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/amthreads_chicago"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border hover:border-primary hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/company/a-m-chicago/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border hover:border-primary hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <button onClick={() => scrollToSection("shop")} className="hover:text-foreground transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("collections")}
                  className="hover:text-foreground transition-colors"
                >
                  Collections
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("shop")} className="hover:text-foreground transition-colors">
                  Hoodies & Crews
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("shop")} className="hover:text-foreground transition-colors">
                  T-Shirts
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("shop")} className="hover:text-foreground transition-colors">
                  Joggers
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Chicago, IL</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:am.threads.chicago@gmail.com" className="hover:text-foreground transition-colors">
                  am.threads.chicago@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(312) 555-0123</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Sign up to get updates on new drops and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Email address" 
                className="bg-secondary border-border text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <Button 
                type="submit"
                className="gradient-brand text-primary-foreground shrink-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "→"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Aspire | Manifest. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
            <Link to="/size-guide" className="hover:text-foreground transition-colors">
              Size Guide
            </Link>
            <Link to="/faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link to="/shipping" className="hover:text-foreground transition-colors">
              Shipping
            </Link>
            <Link to="/returns" className="hover:text-foreground transition-colors">
              Returns
            </Link>
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
