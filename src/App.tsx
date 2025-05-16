
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

// Import the ScrollToTop component
import ScrollToTop from './components/ScrollToTop';

// Pages
import Index from './pages/Index';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import Journeys from './pages/Journeys';
import UserJourney from './components/UserJourney';
import Blog from './pages/Blog';
import BlogArchive from './pages/BlogArchive';
import BlogPost from '@/pages/BlogPost';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MentorLanding from './pages/MentorLanding';
import UserProfile from './pages/UserProfile';
import ContactUs from './pages/ContactUs';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import OurStory from './pages/OurStory';
import About from './pages/About';
import JourneyDetail from './pages/JourneyDetail';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import the supabase client directly from our client file
import { supabase } from "@/integrations/supabase/client";

// Layout component that conditionally renders Header and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Only exclude header/footer from journey detail pages
  const isJourneyPage = /^\/journey\/[^\/]+$/.test(location.pathname);
  
  if (isJourneyPage) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        {/* Add ScrollToTop component inside the Router */}
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="/journey/:id" element={<JourneyDetail />} />
            <Route path="/user-journey/:id" element={<UserJourney />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog/archive" element={<BlogArchive />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/for-teachers" element={<MentorLanding />} />
            <Route path="/mentor" element={<Navigate to="/for-teachers" replace />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </SessionContextProvider>
  );
}

export default App;
