
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

// Pages
import Index from './pages/Index';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import Journeys from './pages/Journeys';
import UserJourney from './components/UserJourney';
import Blog from './pages/Blog';
import BlogArchive from './pages/BlogArchive';
import Signup from './pages/Signup';
import MentorLanding from './pages/MentorLanding';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Define Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/archive" element={<BlogArchive />} />
              <Route path="/journeys" element={<Journeys />} />
              <Route path="/journey/:id" element={<UserJourney />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/for-teachers" element={<MentorLanding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </SessionContextProvider>
  );
}

export default App;
