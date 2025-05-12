
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

// Create a schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  experience: z.string().min(10, { message: "Please tell us a bit more about your experience." }),
});

type MentorFormValues = z.infer<typeof formSchema>;

const MentorLanding: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Initialize the form with validation
  const form = useForm<MentorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: ""
    }
  });

  const onSubmit = (values: MentorFormValues) => {
    console.log("Form submitted with values:", values);
    
    // Close dialog
    setDialogOpen(false);
    
    // Reset form
    form.reset();
    
    // Show success toast
    toast({
      title: "פרטיך התקבלו בהצלחה!",
      description: "ניצור איתך קשר במייל בהקדם.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-spirit-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-gradient mb-8">
                Share Your Wisdom Through InFlow
              </h1>
              <p className="text-xl text-earth-700 mb-10">
                Join our platform as a mentor and help guide others on their spiritual or personal development journey with your expertise and wisdom.
              </p>
              <Button 
                size="lg" 
                className="bg-spirit-600 hover:bg-spirit-700 text-xl py-6 px-10"
                onClick={() => setDialogOpen(true)}
              >
                Join As Mentor
              </Button>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
              Why Join As a Mentor?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card>
                <CardHeader>
                  <CardTitle>Monetize Your Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Upload your content once and earn continuously from purchases of your developmental processes, creating a sustainable income stream.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI-Enhanced Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Our AI transforms your expertise into personalized development and growth journeys for end users, maximizing the impact of your content.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Build Your GIG</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Design your offer exactly as you want it. You control your content, process, and pricing while we handle the platform and technology.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Effortless Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">We promote your processes on our platform, connecting you with users seeking your specific expertise. You focus on content, we handle discovery.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-spirit-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-spirit-600 rounded-full p-1 text-white mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-lg">You share your expertise and content with us</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-spirit-600 rounded-full p-1 text-white mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-lg">Our AI transforms it into structured development processes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-spirit-600 rounded-full p-1 text-white mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-lg">We publish and promote your GIG on our platform</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-spirit-600 rounded-full p-1 text-white mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-lg">You earn income from each purchase of your process</p>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <Button 
                  size="lg" 
                  className="bg-spirit-600 hover:bg-spirit-700 text-xl py-6 px-10"
                  onClick={() => setDialogOpen(true)}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Mentor Application Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Apply to become a mentor</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you via email
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        id="name"
                        placeholder="Your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        id="phone"
                        placeholder="Your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="experience">Your Experience</FormLabel>
                    <FormControl>
                      <Textarea 
                        id="experience"
                        placeholder="Tell us about your experience and areas of expertise..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 flex justify-end space-x-2 rtl:space-x-reverse">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-spirit-600 hover:bg-spirit-700">
                  Submit Application
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MentorLanding;
