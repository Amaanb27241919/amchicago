import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Collection from "./pages/Collection";
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
import AdminLogin from "./pages/admin/Login";
import ComingSoon from "./pages/ComingSoon";

const queryClient = new QueryClient();

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";
const SITE_LOCKED = true; // Site is locked until launch
const BYPASS_KEY = "am_employee_access";
const ACCESS_TOKEN_KEY = "am_access_token";

const App = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      // Check if employee has already bypassed the lock
      const bypassed = sessionStorage.getItem(BYPASS_KEY) === "true";
      const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
      
      if (!bypassed || !token) {
        setHasAccess(false);
        setIsVerifying(false);
        return;
      }

      try {
        // Verify the token server-side
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-employee-access?action=verify`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();
        
        if (data.valid) {
          setHasAccess(true);
        } else {
          // Token is invalid/expired - clear storage
          sessionStorage.removeItem(BYPASS_KEY);
          sessionStorage.removeItem(ACCESS_TOKEN_KEY);
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        // On error, still allow access if bypass flag is set (graceful degradation)
        setHasAccess(bypassed);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAccess();
  }, []);

  const handleBypass = () => {
    setHasAccess(true);
  };

  // Show nothing while verifying to prevent flash
  if (isVerifying) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-background" />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  const showComingSoon = SITE_LOCKED && !hasAccess;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showComingSoon ? (
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/preorders" element={<PreOrders />} />
              <Route path="*" element={<ComingSoon onBypass={handleBypass} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:handle" element={<ProductDetail />} />
              <Route path="/collections/:slug" element={<Collection />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/preorders" element={<PreOrders />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
