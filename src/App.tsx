
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

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

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import the supabase client directly from our client file
import { supabase } from "@/integrations/supabase/client";

// Layout component that conditionally renders Header and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // Check explicitly if the path is exactly /journey/ followed by any ID
  const isJourneyPage = /^\/journey\/[^\/]+$/.test(location.pathname);
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isJourneyPage && <Header />}
      <div className="flex-grow">
        {children}
      </div>
      {!isJourneyPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog/archive" element={<BlogArchive />} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="/journey/:id" element={<UserJourney />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/for-teachers" element={<MentorLanding />} />
            <Route path="/mentor" element={<Navigate to="/for-teachers" replace />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </SessionContextProvider>
  );
}

export default App;
