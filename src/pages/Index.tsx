import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Collections } from "@/components/Collections";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main>
        <Hero />
        <ProductGrid />
        <Collections />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
