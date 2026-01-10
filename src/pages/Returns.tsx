import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";
import { RefreshCw, CheckCircle, XCircle, HelpCircle } from "lucide-react";

const Returns = () => {
  usePageMeta({
    title: "Returns & Exchanges",
    description: "A | M Chicago returns and exchange policy - hassle-free returns within 30 days.",
    canonicalPath: "/returns",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4 gradient-brand-text">
              Returns & Exchanges
            </h1>
            <p className="text-lg text-muted-foreground">
              Not the right fit? We've got you covered.
            </p>
          </div>

          {/* Return Policy Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">30-Day Returns</h3>
              <p className="text-sm text-muted-foreground">
                Return any item within 30 days of delivery for a full refund.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Free Exchanges</h3>
              <p className="text-sm text-muted-foreground">
                Exchange for a different size or color at no extra cost.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Easy Process</h3>
              <p className="text-sm text-muted-foreground">
                Simple email-based returns with prepaid shipping labels.
              </p>
            </div>
          </div>

          {/* Detailed Policy */}
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                Return Eligibility
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-5 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-foreground">Eligible for Return</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Unworn items with original tags attached</li>
                    <li>• Items in original packaging</li>
                    <li>• Items returned within 30 days of delivery</li>
                    <li>• Items free from odors, stains, or damage</li>
                  </ul>
                </div>
                <div className="bg-card p-5 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="font-medium text-foreground">Not Eligible</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Items marked as "Final Sale"</li>
                    <li>• Items that have been worn or washed</li>
                    <li>• Items without original tags</li>
                    <li>• Items returned after 30 days</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                How to Start a Return
              </h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong className="text-foreground">Email us</strong> at{" "}
                  <a href="mailto:support@amthreads.shop" className="text-primary hover:underline">
                    support@amthreads.shop
                  </a>{" "}
                  with your order number and reason for return.
                </li>
                <li>
                  <strong className="text-foreground">Receive your return label</strong> – We'll send 
                  you a prepaid shipping label within 1-2 business days.
                </li>
                <li>
                  <strong className="text-foreground">Pack and ship</strong> – Pack items securely 
                  in original packaging and drop off at any carrier location.
                </li>
                <li>
                  <strong className="text-foreground">Get your refund</strong> – Once received and 
                  inspected, refunds are processed within 5-7 business days.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                Exchanges
              </h2>
              <p>
                Need a different size or color? We offer free exchanges! Simply mention in your 
                email what you'd like to exchange for, and we'll hold the new item for you while 
                your return is in transit. Once we receive your original item, we'll ship out the 
                replacement immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                Refund Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are credited to your original payment method</li>
                <li>Please allow 5-7 business days for processing after we receive your return</li>
                <li>Original shipping costs are non-refundable (unless the return is due to our error)</li>
                <li>You'll receive an email confirmation once your refund has been processed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                Damaged or Defective Items
              </h2>
              <p>
                Received a damaged or defective item? We're sorry! Contact us immediately at{" "}
                <a href="mailto:support@amthreads.shop" className="text-primary hover:underline">
                  support@amthreads.shop
                </a>{" "}
                with photos of the issue, and we'll make it right with a replacement or full refund, 
                including shipping costs.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;
