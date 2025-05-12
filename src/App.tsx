
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeacherPortal from "./components/TeacherPortal";
import UserJourney from "./components/UserJourney";
import Journeys from "./pages/Journeys";
import Signup from "./pages/Signup";
import MentorLanding from "./pages/MentorLanding";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import RevenuePage from "./pages/admin/RevenuePage";
import JourneysPage from "./pages/admin/JourneysPage";
import CreatorsPage from "./pages/admin/CreatorsPage";
import TrackingPage from "./pages/admin/TrackingPage";
import InteractionsPage from "./pages/admin/InteractionsPage";

// Create a new QueryClient instance with improved configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnMount: false, // Don't refetch on every mount
    },
  },
});

const App = () => {
  console.log("Rendering App component");
  
  return (
    <ErrorBoundary>
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
              <Route path="/login" element={<Login />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route path="users" element={<UsersPage />} />
                <Route path="revenue" element={<RevenuePage />} />
                <Route path="journeys" element={<JourneysPage />} />
                <Route path="creators" element={<CreatorsPage />} />
                <Route path="tracking" element={<TrackingPage />} />
                <Route path="interactions" element={<InteractionsPage />} />
                <Route index element={<UsersPage />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
