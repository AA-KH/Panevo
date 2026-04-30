import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layout
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyBottomBar } from "@/components/layout/StickyBottomBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollToTop } from "@/components/ScrollToTop";

// Pages
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import OurStory from "@/pages/OurStory";
import Nutrition from "@/pages/Nutrition";
import Subscribe from "@/pages/Subscribe";
import SubscribeThankYou from "@/pages/SubscribeThankYou";
import FindUs from "@/pages/FindUs";
import Contact from "@/pages/Contact";
import Recipes from "@/pages/Recipes";
import RecipeDetail from "@/pages/RecipeDetail";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// TODO: generate sitemap during build for Phase 2

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <a
        href="#main-content"
        className="skip-to-content sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1 w-full main-with-sticky-bar">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/our-story" component={OurStory} />
          <Route path="/nutrition" component={Nutrition} />
          <Route path="/subscribe" component={Subscribe} />
          <Route path="/subscribe/thank-you" component={SubscribeThankYou} />
          <Route path="/find-us" component={FindUs} />
          <Route path="/contact" component={Contact} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/recipes/:slug" component={RecipeDetail} />
          
          <Route path="/privacy"><Legal type="privacy" /></Route>
          <Route path="/terms"><Legal type="terms" /></Route>
          <Route path="/refund-policy"><Legal type="refund" /></Route>
          
          <Route component={NotFound} />
        </Switch>
      </main>
      <StickyBottomBar />
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
