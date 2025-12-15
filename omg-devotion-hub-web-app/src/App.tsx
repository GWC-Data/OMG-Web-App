import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Store from "./pages/Store";
import Checkout from "./pages/Checkout";
import TempleLocator from "./pages/TempleLocator";
import SacredKnowledge from "./pages/SacredKnowledge";
import PersonalizedPooja from "./pages/PersonalizedPooja";
import DivineMusic from "./pages/DivineMusic";
import AIGuide from "./pages/AIGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/store" element={<Store />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/temples" element={<TempleLocator />} />
              <Route path="/knowledge" element={<SacredKnowledge />} />
              <Route path="/pooja" element={<PersonalizedPooja />} />
              <Route path="/music" element={<DivineMusic />} />
              <Route path="/guide" element={<AIGuide />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
