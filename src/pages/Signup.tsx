
import React, { useState } from 'react';
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
  React.useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      setAuthError(`${error}: ${errorDescription || 'Unknown error'}`);
      toast({
        title: "Authentication error",
        description: error,
        variant: "destructive"
      });
      console.error("OAuth redirect error:", error, errorDescription);
    }
  }, [searchParams]);

  // If already logged in, redirect to home page
  React.useEffect(() => {
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
      
      toast({
        title: "Success!",
        description: "Please check your email to verify your account."
      });
      
      navigate('/login');
    } catch (error: any) {
      setAuthError(error.message || "There was a problem signing up. Please try again.");
      toast({
        title: "Error",
        description: error.message || "There was a problem signing up. Please try again.",
        variant: "destructive"
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
      toast({
        title: "Error",
        description: error.message || "There was a problem signing in with Google.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-md">
        <Card className="backdrop-blur-sm border border-purple-100 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-serif bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Join Flow 83
            </CardTitle>
            <CardDescription className="text-center text-purple-500">
              Begin your spiritual journey with us
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {authError && (
              <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{authError}</p>
              </div>
            )}
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-purple-200 focus-visible:ring-purple-400"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-purple-200 focus-visible:ring-purple-400"
                    required
                  />
                  <button 
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600"
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
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating your account...' : 'Sign up'}
              </Button>
            </form>

            <div className="relative my-4">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-purple-200 hover:bg-purple-50 transition-all"
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
              Continue with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
