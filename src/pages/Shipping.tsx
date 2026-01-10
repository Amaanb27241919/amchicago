import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Truck, Clock, Globe, Package } from "lucide-react";

const shippingMethods = [
  {
    icon: Truck,
    title: "Standard Shipping",
    time: "5-7 business days",
    price: "Free on orders $100+",
    description: "Our reliable standard option for domestic orders.",
  },
  {
    icon: Clock,
    title: "Express Shipping",
    time: "2-3 business days",
    price: "$15",
    description: "Need it faster? Choose express at checkout.",
  },
  {
    icon: Globe,
    title: "International Shipping",
    time: "10-21 business days",
    price: "Varies by location",
    description: "We ship worldwide. Customs fees may apply.",
  },
];

const Shipping = () => {
  usePageMeta({
    title: "Shipping Information",
    description: "A | M Chicago shipping information - delivery times, costs, and policies.",
    canonicalPath: "/shipping",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4 gradient-brand-text">
              Shipping Information
            </h1>
            <p className="text-lg text-muted-foreground">
              Fast, reliable shipping to get your gear to you.
            </p>
          </div>

          {/* Shipping Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {shippingMethods.map((method) => (
              <div
                key={method.title}
                className="bg-card p-6 rounded-xl border border-border text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <method.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{method.title}</h3>
                <p className="text-primary font-medium mb-1">{method.time}</p>
                <p className="text-sm text-muted-foreground mb-3">{method.price}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            ))}
          </div>

          {/* Shipping Policies */}
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                Order Processing
              </h2>
              <p>
                Orders are processed within 1-2 business days. You'll receive a confirmation email 
                with tracking information once your order ships. Please note that orders placed on 
                weekends or holidays will be processed the next business day.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                Tracking Your Order
              </h2>
              <p>
                Once your order ships, you'll receive an email with a tracking number. Use this 
                number to track your package on the carrier's website. If you haven't received 
                tracking information within 3 business days, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                International Orders
              </h2>
              <p className="mb-4">
                We ship to most countries worldwide. Please note:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>International orders may be subject to customs duties and taxes</li>
                <li>These fees are the responsibility of the customer</li>
                <li>Delivery times vary by destination and customs processing</li>
                <li>Some items may have shipping restrictions to certain countries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                Shipping Issues
              </h2>
              <p>
                If your package is lost, damaged, or significantly delayed, please contact us at{" "}
                <a href="mailto:support@amthreads.shop" className="text-primary hover:underline">
                  support@amthreads.shop
                </a>
                . We'll work with the carrier to resolve the issue and ensure you receive your order.
              </p>
            </section>
          </div>

          {/* Free Shipping Banner */}
          <div className="mt-16 p-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30 text-center">
            <Package className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">Free Shipping on Orders $100+</h3>
            <p className="text-muted-foreground">
              Spend $100 or more and enjoy free standard shipping within the US.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
