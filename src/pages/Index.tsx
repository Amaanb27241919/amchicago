import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LatestDrops } from "@/components/LatestDrops";
import { Collections } from "@/components/Collections";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { usePageMeta } from "@/hooks/usePageMeta";

const Index = () => {
  usePageMeta({
    title: "Premium Streetwear",
    description: "Premium streetwear rooted in Chicago. Shop hoodies, t-shirts, joggers and more. Designed for those who dare to aspire and manifest their vision.",
    keywords: "A M Chicago, Aspire Manifest, Chicago streetwear, premium hoodies, streetwear clothing, urban fashion",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main>
        <Hero />
        <LatestDrops />
        <Collections />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
