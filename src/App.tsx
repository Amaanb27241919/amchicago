import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import SizeGuide from "./pages/SizeGuide";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import PreOrders from "./pages/admin/PreOrders";

const queryClient = new QueryClient();

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin/preorders" element={<PreOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
