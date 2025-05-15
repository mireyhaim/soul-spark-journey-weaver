
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';
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
            <Link to="/" className="text-sm font-medium hover:text-spirit-600 transition-colors">
              Home
            </Link>
            <Link to="/journeys" className="text-sm font-medium hover:text-spirit-600 transition-colors">
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
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
