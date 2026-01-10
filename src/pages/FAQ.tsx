import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping within the US typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery (2-3 business days).",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship to most countries worldwide. International shipping typically takes 10-21 business days depending on the destination. Additional customs fees may apply.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this to track your package on the carrier's website.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "We process orders quickly! If you need to modify or cancel, please contact us immediately at am.threads.chicago@gmail.com. We'll do our best to accommodate changes before the order ships.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with all tags attached. Final sale items cannot be returned.",
      },
      {
        q: "How do I start a return or exchange?",
        a: "Email us at support@amthreads.shop with your order number and reason for return. We'll provide you with return instructions and a prepaid shipping label.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive your return, please allow 5-7 business days for inspection and processing. Refunds will be credited to your original payment method.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        q: "How do I find my size?",
        a: "Check out our Size Guide page for detailed measurements. We recommend measuring a garment you already own and comparing it to our size charts for the best fit.",
      },
      {
        q: "What materials do you use?",
        a: "We use premium heavyweight fabrics, typically 380-450 GSM cotton blends for our hoodies and crews. Each product description includes specific material details.",
      },
      {
        q: "How should I care for my items?",
        a: "For best results, wash inside out in cold water and hang dry or tumble dry on low. Avoid bleach and ironing directly on prints or embroidery.",
      },
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Shop Pay.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. All transactions are processed through Shopify's secure checkout, which uses industry-standard SSL encryption to protect your information.",
      },
    ],
  },
];

const FAQ = () => {
  usePageMeta({
    title: "FAQ",
    description: "Frequently asked questions about A | M Chicago - shipping, returns, sizing, and more.",
    canonicalPath: "/faq",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4 gradient-brand-text">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about orders, shipping, returns, and more.
            </p>
          </div>

          <div className="space-y-10">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="font-display text-2xl font-semibold mb-4 text-foreground">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {section.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${section.category}-${index}`}
                      className="bg-card rounded-lg border border-border px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center p-8 bg-card rounded-xl border border-border">
            <h3 className="font-display text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              We're here to help. Reach out to our team for personalized assistance.
            </p>
            <a
              href="mailto:am.threads.chicago@gmail.com"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              am.threads.chicago@gmail.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
