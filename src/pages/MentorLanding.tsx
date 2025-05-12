
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface MentorFormValues {
  name: string;
  email: string;
  phone: string;
  experience: string;
}

const MentorLanding: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<MentorFormValues>({
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
                Join our platform as a mentor and help guide others on their spiritual journey with your expertise and wisdom.
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
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <Input 
                id="name"
                placeholder="Your full name"
                {...form.register("name", { required: true })}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input 
                id="email"
                type="email"
                placeholder="your@email.com"
                {...form.register("email", { required: true })}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <Input 
                id="phone"
                placeholder="Your phone number"
                {...form.register("phone")}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="experience">Your Experience</FormLabel>
              <Textarea 
                id="experience"
                placeholder="Tell us about your experience and areas of expertise..."
                className="min-h-[120px]"
                {...form.register("experience", { required: true })}
              />
            </div>
            
            <div className="pt-4 flex justify-end space-x-2 rtl:space-x-reverse">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-spirit-600 hover:bg-spirit-700">
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MentorLanding;
