import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LatestDrops } from "@/components/LatestDrops";
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
        <LatestDrops />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
