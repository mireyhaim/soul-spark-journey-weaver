
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeacherPortal from "./components/TeacherPortal";
import UserJourney from "./components/UserJourney";
import Journeys from "./pages/Journeys";
import Signup from "./pages/Signup";
import MentorLanding from "./pages/MentorLanding";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogArchive from "./pages/BlogArchive";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentor" element={<MentorLanding />} />
          <Route path="/teacher" element={<TeacherPortal />} />
          <Route path="/journey/:id" element={<UserJourney />} />
          <Route path="/journeys" element={<Journeys />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/archive" element={<BlogArchive />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
