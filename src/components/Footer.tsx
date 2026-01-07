import { Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
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
              <span className="text-3xl font-display font-semibold gradient-brand-text">
                A | M
              </span>
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mt-1">
                Chicago
              </p>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Premium streetwear rooted in Chicago. Designed for those who dare to aspire and manifest their vision.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full border-border hover:border-primary hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-border hover:border-primary hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
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
                <button onClick={() => scrollToSection("collections")} className="hover:text-foreground transition-colors">
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
                <a href="mailto:info@amchicago.com" className="hover:text-foreground transition-colors">
                  info@amchicago.com
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
              Sign up to get updates on our launch and exclusive drops.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                className="bg-secondary border-border text-sm"
              />
              <Button className="gradient-brand text-primary-foreground shrink-0">
                →
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Coming Soon...
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Aspire | Manifest. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
