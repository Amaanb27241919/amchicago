import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";

const Terms = () => {
  usePageMeta({
    title: "Terms of Service",
    description: "A | M Chicago terms of service - terms and conditions for using our website and services.",
    canonicalPath: "/terms",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-8 gradient-brand-text">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none space-y-8 text-muted-foreground">
            <p className="text-lg">
              Last updated: January 2025
            </p>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the A | M Chicago website, you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                2. Products and Pricing
              </h2>
              <p>
                All products are subject to availability. We reserve the right to modify prices at any time 
                without prior notice. Prices displayed are in USD unless otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                3. Orders and Payment
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All orders are subject to acceptance and availability</li>
                <li>Payment must be received in full before orders are processed</li>
                <li>We accept major credit cards and other payment methods as displayed at checkout</li>
                <li>By placing an order, you warrant that you are legally capable of entering into binding contracts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                4. Shipping and Delivery
              </h2>
              <p>
                Shipping times and costs vary based on location and selected shipping method. 
                We are not responsible for delays caused by shipping carriers or customs processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                5. Returns and Exchanges
              </h2>
              <p>
                Please refer to our Returns Policy for detailed information about returns and exchanges. 
                Items must be unworn, unwashed, and in original condition with all tags attached.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                6. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of A | M Chicago and is protected by copyright and trademark laws. 
                Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                7. Limitation of Liability
              </h2>
              <p>
                A | M Chicago shall not be liable for any indirect, incidental, special, or consequential 
                damages arising from your use of our website or products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                8. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to the website. Your continued use constitutes acceptance 
                of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                9. Contact Information
              </h2>
              <p>
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:support@amthreads.shop" className="text-primary hover:underline">
                  support@amthreads.shop
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
