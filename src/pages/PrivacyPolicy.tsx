import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";

const PrivacyPolicy = () => {
  usePageMeta({
    title: "Privacy Policy",
    description: "A | M Chicago privacy policy - how we collect, use, and protect your information.",
    canonicalPath: "/privacy-policy",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-8 gradient-brand-text">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none space-y-8 text-muted-foreground">
            <p className="text-lg">
              Last updated: January 2025
            </p>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, subscribe to our newsletter, or contact us. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Name and contact information (email address, phone number, shipping address)</li>
                <li>Payment information (processed securely through our payment provider)</li>
                <li>Order history and preferences</li>
                <li>Communications with us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about products, services, and promotions</li>
                <li>Improve our website and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                3. Information Sharing
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties 
                except as necessary to provide our services (e.g., shipping carriers, payment processors) 
                or when required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                4. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the Internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                5. Cookies
              </h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience, 
                analyze site traffic, and personalize content. You can control cookie preferences 
                through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                6. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                7. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:am.threads.chicago@gmail.com" className="text-primary hover:underline">
                  am.threads.chicago@gmail.com
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

export default PrivacyPolicy;
