
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Menu, X } from 'lucide-react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from '@/utils/auth-utils';
import { useToast } from '@/hooks/use-toast';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const session = useSession();
  const isLoggedIn = !!session;
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
          <Link to="/" className="flex items-center">
            <span className="font-serif text-xl md:text-2xl font-semibold">Flow 83</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className={`text-sm font-medium hover:text-spirit-600 transition-colors ${location.pathname === '/' ? 'text-spirit-600' : ''}`}>
              Home
            </Link>
            <Link to="/journeys" className={`text-sm font-medium hover:text-spirit-600 transition-colors ${location.pathname === '/journeys' ? 'text-spirit-600' : ''}`}>
              Journeys
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium hover:text-spirit-600 transition-colors">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/blog"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Blog</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Insights and articles
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/faq"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">FAQ</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Common questions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/contact"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${location.pathname === '/contact' ? 'bg-accent text-accent-foreground' : ''}`}
                          >
                            <div className="text-sm font-medium leading-none">Contact Us</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get in touch
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button 
              asChild
              variant="ghost" 
              className="text-sm font-medium bg-purple-100 text-spirit-700 hover:bg-purple-200 hover:text-spirit-800 font-medium px-4 py-2 rounded-md transition-colors"
            >
              <Link to="/for-teachers">For Mentors</Link>
            </Button>
          </nav>
          
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-gray-500 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center space-x-3">
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
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white pt-16 px-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-lg font-medium py-2 ${location.pathname === '/' ? 'text-spirit-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/journeys" 
                className={`text-lg font-medium py-2 ${location.pathname === '/journeys' ? 'text-spirit-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Journeys
              </Link>
              <Link 
                to="/blog" 
                className={`text-lg font-medium py-2 ${location.pathname === '/blog' ? 'text-spirit-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/faq" 
                className={`text-lg font-medium py-2 ${location.pathname === '/faq' ? 'text-spirit-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className={`text-lg font-medium py-2 ${location.pathname === '/contact' ? 'text-spirit-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/for-teachers" 
                className="text-lg font-medium py-2 text-spirit-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Mentors
              </Link>
              
              {/* Mobile auth buttons */}
              <div className="pt-4 border-t mt-4">
                {isLoggedIn ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 py-2 mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                    <Button 
                      className="w-full bg-spirit-600 hover:bg-spirit-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full mb-2" 
                      asChild
                    >
                      <Link 
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </Button>
                    <Button 
                      className="w-full bg-spirit-600 hover:bg-spirit-700" 
                      asChild
                    >
                      <Link 
                        to="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
