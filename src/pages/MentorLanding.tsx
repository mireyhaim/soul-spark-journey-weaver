
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import HeroSection from '@/components/mentor/HeroSection';
import ValueProposition from '@/components/mentor/ValueProposition';
import HowItWorks from '@/components/mentor/HowItWorks';
import MentorApplicationForm from '@/components/mentor/MentorApplicationForm';

// Import the form type
import * as z from "zod";

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

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  
  const onSubmit = (values: MentorFormValues) => {
    console.log("Form submitted with values:", values);
    
    // Close dialog
    setDialogOpen(false);
    
    // Show success toast - Changed from Hebrew to English
    toast({
      title: "Your details were received successfully!",
      description: "We will contact you by email soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection onApplyClick={handleOpenDialog} />

        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
              Why Join As a Mentor?
            </h2>
            
            <ValueProposition />
            <HowItWorks onApplyClick={handleOpenDialog} />
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
          
          <MentorApplicationForm 
            onSubmit={onSubmit} 
            onCancel={handleCloseDialog} 
          />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MentorLanding;
