
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';
import { cleanupAuthState } from '@/utils/auth-utils';
import { AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      console.log("Session exists, redirecting to home", session);
      navigate('/');
    }
  }, [session, navigate]);
  
  const clearErrors = () => {
    setAuthError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setIsLoading(true);
    
    try {
      // Clean up existing auth state first to avoid conflicts
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Successful login
      toast("You have successfully logged in!");
      
      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      setAuthError(error.message || "There was a problem logging in. Please check your credentials and try again.");
      toast(error.message || "There was a problem logging in. Please check your credentials and try again.", {
        className: "bg-destructive text-destructive-foreground"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    clearErrors();
    try {
      setIsLoading(true);
      
      // Clean up existing auth state first
      cleanupAuthState();
      
      const currentOrigin = window.location.origin;
      const redirectUrl = `${currentOrigin}/`;
      
      console.log("Starting Google authentication");
      console.log("Current origin:", currentOrigin);
      console.log("Redirect URL:", redirectUrl);
      
      // Debug the Supabase client configuration
      console.log("Supabase client config:", {
        url: supabase.authUrl,
        persistSession: supabase.auth.config.persistSession,
        storage: supabase.auth.config.storage ? "localStorage" : "none"
      });
      
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
      
      // No need to navigate here as Supabase will handle the redirect
      
    } catch (error: any) {
      console.error("Google auth error:", error);
      setAuthError(error.message || "There was a problem signing in with Google.");
      toast(error.message || "There was a problem signing in with Google.", {
        className: "bg-destructive text-destructive-foreground"
      });
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow py-10 px-4 md:px-6 bg-earth-50/30">
      <div className="container mx-auto max-w-md">
        <Card className="border-spirit-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Welcome Back</CardTitle>
            <CardDescription>
              Log in to continue your spiritual journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {authError && (
                <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{authError}</p>
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-spirit-600 hover:bg-spirit-700" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
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
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign in with Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-earth-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-spirit-600 hover:text-spirit-700">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Login;
