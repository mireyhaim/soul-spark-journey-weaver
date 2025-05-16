
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';
import { cleanupAuthState } from '@/utils/auth-utils';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const session = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check for error in URL from OAuth redirect
  useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      setAuthError(`${error}: ${errorDescription || 'Unknown error'}`);
      toast(`Authentication error: ${error}`, {
        className: "bg-destructive text-destructive-foreground"
      });
      console.error("OAuth redirect error:", error, errorDescription);
    }
  }, [searchParams]);

  // If already logged in, redirect to home page
  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);
  
  const clearErrors = () => {
    setAuthError(null);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setIsLoading(true);
    
    try {
      // Clean up existing auth state first to avoid conflicts
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
      
      toast("Please check your email to verify your account.");
      
      navigate('/login');
    } catch (error: any) {
      setAuthError(error.message || "There was a problem signing up. Please try again.");
      toast(error.message || "There was a problem signing up. Please try again.", {
        className: "bg-destructive text-destructive-foreground"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    clearErrors();
    setIsLoading(true);
    
    try {
      // Clean up existing auth state first to avoid conflicts
      cleanupAuthState();
      
      const currentURL = window.location.origin;
      // Use the site domain instead of relative path to ensure proper redirect
      const redirectUrl = `${currentURL}/`;
      
      console.log("Starting Google authentication");
      console.log("Current URL:", currentURL);
      console.log("Using redirect URL:", redirectUrl);
      
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error("Google auth initiation error:", error);
        throw error;
      }
      
      console.log("Google auth initiated successfully, data:", data);
      // No redirect needed here as Supabase will handle it
      
    } catch (error: any) {
      console.error("Google auth error:", error);
      setAuthError(error.message || "There was a problem signing in with Google.");
      toast(error.message || "There was a problem signing in with Google.", {
        className: "bg-destructive text-destructive-foreground"
      });
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-10 px-4 md:px-6 bg-gradient-to-br from-spirit-50 to-earth-50">
        <div className="w-full max-w-md">
          <Link to="/" className="flex justify-center mb-8">
            <span className="font-serif text-2xl md:text-3xl font-semibold text-center text-spirit-700">Flow 83</span>
          </Link>
          
          <Card className="border-none shadow-lg backdrop-blur-sm bg-white/90">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-serif text-center bg-gradient-to-r from-spirit-600 to-spirit-800 bg-clip-text text-transparent">Create an Account</CardTitle>
              <CardDescription className="text-center text-earth-600">
                Start your spiritual journey with us
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {authError && (
                <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{authError}</p>
                </div>
              )}
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-earth-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-500" />
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-earth-200 focus-visible:ring-spirit-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-earth-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-500" />
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 border-earth-200 focus-visible:ring-spirit-500"
                      required
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-500 hover:text-earth-700"
                    >
                      {showPassword ? 
                        <EyeOff className="h-4 w-4" /> : 
                        <Eye className="h-4 w-4" />
                      }
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-spirit-600 to-spirit-700 hover:from-spirit-700 hover:to-spirit-800 transition-all duration-300" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </Button>
              </form>

              <div className="relative my-4">
                <Separator className="bg-earth-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 text-sm text-earth-500">Or continue with</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-earth-200 hover:bg-earth-50 transition-all duration-300"
                onClick={handleGoogleSignup}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign up with Google
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <div className="text-sm text-earth-600">
                Already have an account?{' '}
                <Link to="/login" className="text-spirit-600 hover:text-spirit-700 font-medium">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center text-sm text-earth-500">
            <p>&copy; {new Date().getFullYear()} Flow 83. All rights reserved.</p>
            <div className="mt-1 flex justify-center space-x-4">
              <Link to="/terms" className="hover:text-spirit-600">Terms</Link>
              <Link to="/privacy" className="hover:text-spirit-600">Privacy</Link>
              <Link to="/contact" className="hover:text-spirit-600">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
