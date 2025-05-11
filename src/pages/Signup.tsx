
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      toast({
        title: "Account created",
        description: "Your account has been created successfully. Explore our journeys now!",
      });
      setIsLoading(false);
      
      // In a real app, we would redirect after successful signup
      window.location.href = '/journeys';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10 px-4 md:px-6 bg-earth-50/30">
        <div className="container mx-auto max-w-md">
          <Card className="border-spirit-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Begin Your Journey</CardTitle>
              <CardDescription>
                Sign up to discover transformative spiritual processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                    placeholder="Create a password" 
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
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-earth-600">
                Already have an account?{' '}
                <Link to="/login" className="text-spirit-600 hover:text-spirit-700">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-10">
            <div className="bg-spirit-50 p-6 rounded-lg border border-spirit-100">
              <h3 className="text-lg font-medium mb-2">Start Your Transformation Today</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-spirit-500">✓</span>
                  <span>Access to 50+ guided spiritual journeys</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-spirit-500">✓</span>
                  <span>Personal AI spiritual guide</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-spirit-500">✓</span>
                  <span>Daily practices and reflections</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-spirit-500">✓</span>
                  <span>Track your spiritual growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
