import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NewArrivals } from "@/components/NewArrivals";
import { ProductGrid } from "@/components/ProductGrid";
import { Collections } from "@/components/Collections";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <CartDrawer />
      <main>
        <Hero />
        <NewArrivals />
        <Collections />
        <ProductGrid />
      </main>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
