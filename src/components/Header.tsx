
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from '@/utils/auth-utils';
import { useToast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const session = useSession();
  const isLoggedIn = !!session;
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt to sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast("You have been signed out of your account.");
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error: any) {
      toast(error.message || "There was a problem signing out.", {
        className: "bg-destructive text-destructive-foreground"
      });
    }
  };

  return (
    <header className="py-4 px-4 md:px-6 border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full spirit-gradient flex items-center justify-center">
              <span className="text-white font-serif text-lg">I</span>
            </div>
            <span className="font-serif text-xl md:text-2xl font-semibold">InFlow</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-sm font-medium hover:text-spirit-600 transition-colors">
              Home
            </Link>
            <Link to="/journeys" className="text-sm font-medium hover:text-spirit-600 transition-colors">
              Journeys
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-spirit-600 transition-colors">
              Blog
            </Link>
            <Button 
              asChild
              variant="ghost" 
              className="text-sm font-medium bg-purple-100 text-spirit-700 hover:bg-purple-200 hover:text-spirit-800 font-medium px-4 py-2 rounded-md transition-colors"
            >
              <Link to="/mentor">For Mentors</Link>
            </Button>
          </nav>
          
          <div className="flex items-center space-x-3">
            {isLoggedIn && (
              <Link to="/profile" className="hidden md:flex hover:text-spirit-600">
                <User size={20} />
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Button variant="outline" className="hidden md:flex" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-spirit-600 hover:bg-spirit-700" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <Button 
                className="bg-spirit-600 hover:bg-spirit-700"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
